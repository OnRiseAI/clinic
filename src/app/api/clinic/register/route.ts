import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { clinicRegisterSchema } from '@/lib/validations/clinic'
import { getClientIp } from '@/lib/security/request'
import { checkRateLimit } from '@/lib/security/rate-limit'
import { isDisposableEmail } from '@/lib/security/disposable-email'
import { logAbuseEvent } from '@/lib/security/audit-log'
import { verifyTurnstileToken } from '@/lib/security/turnstile'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { turnstileToken, ...rest } = body
    const validationResult = clinicRegisterSchema.safeParse(rest)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }

    const { email, password, fullName, roleInClinic } = validationResult.data
    const ip = await getClientIp()

    // 1. IP-based sign-up limit (prevent botnets/mass account creation)
    const ipCheck = await checkRateLimit("auth_signup_ip", ip, {
      window: 3600, // 1 hour
      max: 3, // 3 attempts per IP
    })
    if (!ipCheck.success) {
      return NextResponse.json({
        error: "Too many sign-up attempts from this address. Please try again later."
      }, { status: 429 })
    }

    // 2. Disposable Email Check
    if (isDisposableEmail(email)) {
      await logAbuseEvent("disposable_email", email, { ip, action: "clinic_register" })
      return NextResponse.json({
        error: "Please use a permanent business email address."
      }, { status: 400 })
    }

    // 3. Verify Turnstile Token
    const turnstile = await verifyTurnstileToken(turnstileToken, ip)
    if (!turnstile.success) {
      await logAbuseEvent("turnstile_fail", email, { ip, action: "clinic_register" })
      return NextResponse.json({ error: turnstile.error }, { status: 400 })
    }

    const supabase = await createClient()

    // Create user account with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role_in_clinic: roleInClinic,
        },
      },
    })

    if (authError) {
      console.error('Auth error:', authError)
      if (authError.message.includes('already registered')) {
        return NextResponse.json(
          { error: 'An account with this email already exists. Please sign in instead.' },
          { status: 400 }
        )
      }
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'Failed to create account' }, { status: 500 })
    }

    // Create user profile in users table with clinic role
    const { error: profileError } = await supabase.from('users').insert({
      id: authData.user.id,
      email,
      full_name: fullName,
      role: 'clinic',
    })

    if (profileError) {
      console.error('Profile error:', profileError)
      // Profile might already exist from auth trigger
    }

    // Sign in the user
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      console.error('Sign in error:', signInError)
    }

    return NextResponse.json({
      success: true,
      userId: authData.user.id,
      needsClinicSetup: true,
    })
  } catch (error) {
    console.error('Error registering clinic:', error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
