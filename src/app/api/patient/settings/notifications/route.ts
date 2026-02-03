import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { updatePatientNotifications } from '@/lib/data/patient-dashboard'

export async function PUT(request: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { enquiry_email, marketing_email, sms_notifications } = body

    const result = await updatePatientNotifications(user.id, {
      enquiry_email: enquiry_email ?? true,
      marketing_email: marketing_email ?? false,
      sms_notifications: sms_notifications ?? false,
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating notifications:', error)
    return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 })
  }
}
