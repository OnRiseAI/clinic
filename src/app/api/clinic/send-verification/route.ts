import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email/resend'
import { sendSms } from '@/lib/sms/twilio'
import { z } from 'zod'
import { getClientIp } from '@/lib/security/request'
import { checkRateLimit, checkOtpCooldown, trackOtpSent } from '@/lib/security/rate-limit'
import { logAbuseEvent } from '@/lib/security/audit-log'
import { verifyTurnstileToken } from '@/lib/security/turnstile'
import { CLINIC_VERIFY_LIMIT } from '@/lib/security/limits'

const sendVerificationSchema = z.object({
  clinicId: z.string().uuid(),
  method: z.enum(['email', 'phone']),
  claimToken: z.string(),
  turnstileToken: z.string(),
})

// Store verification codes temporarily (in production, use Redis or database)
// For now, we'll store in a simple Map (note: won't persist across server restarts)
const verificationCodes = new Map<string, { code: string; expires: number }>()

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validationResult = sendVerificationSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const { clinicId, method, claimToken, turnstileToken } = validationResult.data
    const ip = await getClientIp()

    // 1. Check Rate Limit (IP-based)
    const ipCheck = await checkRateLimit("clinic_verify_ip", ip, {
      window: CLINIC_VERIFY_LIMIT.WINDOW,
      max: CLINIC_VERIFY_LIMIT.MAX_ATTEMPTS,
    })
    if (!ipCheck.success) {
      return NextResponse.json({
        error: "Too many attempts. Please try again later."
      }, { status: 429 })
    }

    // 2. Check OTP Cooldown (Per Clinic+Method)
    const cooldownCheck = await checkOtpCooldown(`${clinicId}:${method}`, CLINIC_VERIFY_LIMIT.COOLDOWN)
    if (!cooldownCheck.allowed) {
      return NextResponse.json({
        error: `Please wait ${cooldownCheck.secondsRemaining} seconds before requesting a new code.`
      }, { status: 429 })
    }

    // 3. Verify Turnstile Token
    const turnstile = await verifyTurnstileToken(turnstileToken, ip)
    if (!turnstile.success) {
      await logAbuseEvent("turnstile_fail", clinicId, { ip, action: "send_verification" })
      return NextResponse.json({ error: turnstile.error }, { status: 400 })
    }

    const supabase = await createClient()

    // Verify the claim token matches the clinic
    const { data: clinic, error: clinicError } = await supabase
      .from('clinics')
      .select('id, name, email, phone, claimed, claim_token')
      .eq('id', clinicId)
      .single()

    if (clinicError || !clinic) {
      return NextResponse.json({ error: 'Clinic not found' }, { status: 404 })
    }

    // Verify the claim token
    if (clinic.claim_token !== claimToken) {
      return NextResponse.json({ error: 'Invalid claim token' }, { status: 403 })
    }

    if (clinic.claimed) {
      return NextResponse.json({ error: 'Clinic already claimed' }, { status: 400 })
    }

    // Generate verification code
    const code = generateCode()
    const codeKey = `${clinicId}-${method}`

    // Store code with 10-minute expiry
    verificationCodes.set(codeKey, {
      code,
      expires: Date.now() + 10 * 60 * 1000,
    })

    // Send the verification code
    if (method === 'email' && clinic.email) {
      await sendEmail({
        to: clinic.email,
        subject: 'Verify Your Clinic on MeetYourClinic',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
          </head>
          <body style="font-family: sans-serif; padding: 20px;">
            <h2>Verify Your Clinic</h2>
            <p>Hello,</p>
            <p>Your verification code for claiming <strong>${clinic.name}</strong> on MeetYourClinic is:</p>
            <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px;">${code}</span>
            </div>
            <p>This code expires in 10 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Best regards,<br>MeetYourClinic Team</p>
          </body>
          </html>
        `,
      })
    } else if (method === 'phone' && clinic.phone) {
      await sendSms({
        to: clinic.phone,
        message: `Your MeetYourClinic verification code is: ${code}. This code expires in 10 minutes.`,
      })
    } else {
      return NextResponse.json({ error: 'Contact method not available' }, { status: 400 })
    }

    // 4. Track OTP Sent (DB-backed cooldown)
    await trackOtpSent(`${clinicId}:${method}`)

    return NextResponse.json({ success: true, method })
  } catch (error) {
    console.error('Error sending verification:', error)
    return NextResponse.json({ error: 'Failed to send verification' }, { status: 500 })
  }
}

// Export for use in verify-code route
export { verificationCodes }
