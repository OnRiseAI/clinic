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
    const { clinicId, notifications } = body

    if (!clinicId || !notifications) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify clinic ownership
    const { data: clinic, error: clinicError } = await supabase
      .from('clinics')
      .select('id, user_id')
      .eq('id', clinicId)
      .single()

    if (clinicError || !clinic) {
      return NextResponse.json({ error: 'Clinic not found' }, { status: 404 })
    }

    if (clinic.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Update notification settings
    const { error: updateError } = await supabase
      .from('clinics')
      .update({ notification_settings: notifications })
      .eq('id', clinicId)

    if (updateError) {
      console.error('Error updating notification settings:', updateError)
      return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating notification settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
