import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const claimSchema = z.object({
  clinicId: z.string().uuid(),
  token: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2),
  roleInClinic: z.string().min(1),
  verificationMethod: z.enum(['email', 'phone', 'manual']).optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validationResult = claimSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }

    const { clinicId, token, email, password, fullName, roleInClinic, verificationMethod } =
      validationResult.data

    const supabase = await createClient()

    // Verify the token matches the clinic
    const { data: clinic, error: clinicError } = await supabase
      .from('clinics')
      .select('id, name, claim_token, claimed')
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

    // Create user profile in users table
    const { error: profileError } = await supabase.from('users').insert({
      id: authData.user.id,
      email,
      full_name: fullName,
      role: 'clinic',
    })

    if (profileError) {
      console.error('Profile error:', profileError)
      // Continue anyway - profile might already exist from auth trigger
    }

    // Claim the clinic
    const { error: claimError } = await supabase
      .from('clinics')
      .update({
        claimed: true,
        user_id: authData.user.id,
        claim_token: null, // Invalidate the token
      })
      .eq('id', clinicId)

    if (claimError) {
      console.error('Claim error:', claimError)
      return NextResponse.json({ error: 'Failed to claim clinic' }, { status: 500 })
    }

    // If manual verification, flag for review (in production, create a review queue entry)
    if (verificationMethod === 'manual') {
      // Log for manual review - in production, send to admin dashboard
      console.log(`Manual verification requested for clinic ${clinicId} by user ${authData.user.id}`)
    }

    return NextResponse.json({
      success: true,
      clinicId,
      userId: authData.user.id,
      clinicName: clinic.name,
    })
  } catch (error) {
    console.error('Error claiming clinic:', error)
    return NextResponse.json({ error: 'Failed to claim clinic' }, { status: 500 })
  }
}
