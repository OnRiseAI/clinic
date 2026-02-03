import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const verifyCodeSchema = z.object({
  clinicId: z.string().uuid(),
  code: z.string().length(6),
  token: z.string(),
})

// Simple in-memory store (shared with send-verification route in same process)
// In production, use Redis or database
const verificationCodes = new Map<string, { code: string; expires: number }>()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validationResult = verifyCodeSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const { clinicId, code, token } = validationResult.data
    const supabase = await createClient()

    // Verify the token matches the clinic
    const { data: clinic, error: clinicError } = await supabase
      .from('clinics')
      .select('id, claim_token, claimed')
      .eq('id', clinicId)
      .single()

    if (clinicError || !clinic) {
      return NextResponse.json({ error: 'Clinic not found' }, { status: 404 })
    }

    if (clinic.claim_token !== token) {
      return NextResponse.json({ error: 'Invalid claim token' }, { status: 403 })
    }

    if (clinic.claimed) {
      return NextResponse.json({ error: 'Clinic already claimed' }, { status: 400 })
    }

    // Check verification code (try both email and phone)
    const emailKey = `${clinicId}-email`
    const phoneKey = `${clinicId}-phone`

    const emailVerification = verificationCodes.get(emailKey)
    const phoneVerification = verificationCodes.get(phoneKey)

    let verified = false
    let method = ''

    if (emailVerification && emailVerification.code === code && emailVerification.expires > Date.now()) {
      verified = true
      method = 'email'
      verificationCodes.delete(emailKey)
    } else if (phoneVerification && phoneVerification.code === code && phoneVerification.expires > Date.now()) {
      verified = true
      method = 'phone'
      verificationCodes.delete(phoneKey)
    }

    if (!verified) {
      return NextResponse.json({ error: 'Invalid or expired verification code' }, { status: 400 })
    }

    // Store verified status in session or return a verification token
    // For simplicity, we'll trust the flow and allow account creation
    return NextResponse.json({ success: true, verified: true, method })
  } catch (error) {
    console.error('Error verifying code:', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}

export { verificationCodes }
