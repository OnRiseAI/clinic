import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { updateDoctor, deleteDoctor } from '@/lib/data/clinic-dashboard'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id: doctorId } = await params
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

    if (!clinicId) {
      return NextResponse.json({ error: 'Clinic ID is required' }, { status: 400 })
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

    // Update doctor
    const result = await updateDoctor(doctorId, clinicId, {
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
    console.error('Error updating doctor:', error)
    return NextResponse.json({ error: 'Failed to update doctor' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id: doctorId } = await params
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
    const { clinicId } = body

    if (!clinicId) {
      return NextResponse.json({ error: 'Clinic ID is required' }, { status: 400 })
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

    // Delete doctor
    const result = await deleteDoctor(doctorId, clinicId)

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting doctor:', error)
    return NextResponse.json({ error: 'Failed to delete doctor' }, { status: 500 })
  }
}
