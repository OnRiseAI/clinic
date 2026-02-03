import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { clinicRegisterSchema } from '@/lib/validations/clinic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validationResult = clinicRegisterSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }

    const { email, password, fullName, roleInClinic } = validationResult.data
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
