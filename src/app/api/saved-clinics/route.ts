import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { saveClinic, getUserSavedClinicIds } from '@/lib/data/patient-dashboard'

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const savedClinicIds = await getUserSavedClinicIds(user.id)

    return NextResponse.json({ clinicIds: savedClinicIds })
  } catch (error) {
    console.error('Error fetching saved clinics:', error)
    return NextResponse.json({ error: 'Failed to fetch saved clinics' }, { status: 500 })
  }
}

export async function POST(request: Request) {
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
    const { clinic_id } = body

    if (!clinic_id) {
      return NextResponse.json({ error: 'Clinic ID is required' }, { status: 400 })
    }

    const result = await saveClinic(user.id, clinic_id)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving clinic:', error)
    return NextResponse.json({ error: 'Failed to save clinic' }, { status: 500 })
  }
}
