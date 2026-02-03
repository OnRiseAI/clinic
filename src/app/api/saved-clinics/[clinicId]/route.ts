import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { unsaveClinic, isClinicSaved } from '@/lib/data/patient-dashboard'

interface RouteParams {
  params: Promise<{ clinicId: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { clinicId } = await params
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const saved = await isClinicSaved(user.id, clinicId)

    return NextResponse.json({ saved })
  } catch (error) {
    console.error('Error checking saved clinic:', error)
    return NextResponse.json({ error: 'Failed to check saved status' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { clinicId } = await params
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await unsaveClinic(user.id, clinicId)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error unsaving clinic:', error)
    return NextResponse.json({ error: 'Failed to unsave clinic' }, { status: 500 })
  }
}
