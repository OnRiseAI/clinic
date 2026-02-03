import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PUT(request: Request) {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { email, fullName } = body

    // Update user profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ full_name: fullName })
      .eq('id', user.id)

    if (profileError) {
      console.error('Error updating profile:', profileError)
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
    }

    // Update email if changed (requires email confirmation)
    if (email && email !== user.email) {
      const { error: emailError } = await supabase.auth.updateUser({
        email,
      })

      if (emailError) {
        console.error('Error updating email:', emailError)
        return NextResponse.json({
          error: 'Failed to update email. Please try again.',
        }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        message: 'Profile updated. Check your email to confirm the new address.',
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating account:', error)
    return NextResponse.json({ error: 'Failed to update account' }, { status: 500 })
  }
}
