import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createDoctor } from '@/lib/data/clinic-dashboard'

export async function POST(request: Request) {
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
    const { clinicId, name, title, specialisation, qualifications, yearsExperience, languages, bio, photoUrl } = body

    if (!clinicId || !name) {
      return NextResponse.json({ error: 'Clinic ID and name are required' }, { status: 400 })
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

    // Create doctor
    const result = await createDoctor(clinicId, {
      name,
      title,
      specialisation,
      qualifications,
      yearsExperience,
      languages,
      bio,
      photoUrl,
    })

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({ doctor: result.data })
  } catch (error) {
    console.error('Error creating doctor:', error)
    return NextResponse.json({ error: 'Failed to create doctor' }, { status: 500 })
  }
}
