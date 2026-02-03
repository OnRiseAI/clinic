import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  updateClinicProfile,
  updateClinicCategories,
  updateClinicProcedures,
} from '@/lib/data/clinic-dashboard'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id: clinicId } = await params
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify clinic ownership
    const { data: clinic, error: clinicError } = await supabase
      .from('clinics')
      .select('id, user_id, name')
      .eq('id', clinicId)
      .single()

    if (clinicError || !clinic) {
      return NextResponse.json({ error: 'Clinic not found' }, { status: 404 })
    }

    if (clinic.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()

    // Update categories if provided
    if (body.categoryIds && body.categoryIds.length > 0) {
      await updateClinicCategories(clinicId, body.categoryIds)
    }

    // Update procedures if provided
    if (body.procedures && body.procedures.length > 0) {
      await updateClinicProcedures(
        clinicId,
        body.procedures.map((p: { procedureId: string; priceMin: string; priceMax: string; currency: string }) => ({
          procedureId: p.procedureId,
          priceMin: p.priceMin ? parseFloat(p.priceMin) : undefined,
          priceMax: p.priceMax ? parseFloat(p.priceMax) : undefined,
          currency: p.currency || 'EUR',
        }))
      )
    }

    // Update profile fields
    const profileUpdates: Record<string, unknown> = {}

    if (body.description) profileUpdates.description = body.description
    if (body.yearEstablished) profileUpdates.yearEstablished = parseInt(body.yearEstablished)
    if (body.languages) profileUpdates.languages = body.languages
    if (body.accreditations) profileUpdates.accreditations = body.accreditations
    if (body.certifications) profileUpdates.certifications = body.certifications

    if (Object.keys(profileUpdates).length > 0) {
      await updateClinicProfile(clinicId, profileUpdates as Parameters<typeof updateClinicProfile>[1])
    }

    return NextResponse.json({
      success: true,
      clinicId,
      clinicName: clinic.name,
    })
  } catch (error) {
    console.error('Error publishing clinic profile:', error)
    return NextResponse.json({ error: 'Failed to publish clinic profile' }, { status: 500 })
  }
}
