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

export async function PUT(request: Request, { params }: RouteParams) {
  return handleProfileUpdate(request, params)
}

export async function PATCH(request: Request, { params }: RouteParams) {
  return handleProfileUpdate(request, params)
}

async function handleProfileUpdate(request: Request, params: Promise<{ id: string }>) {
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
      .select('id, user_id')
      .eq('id', clinicId)
      .single()

    if (clinicError || !clinic) {
      return NextResponse.json({ error: 'Clinic not found' }, { status: 404 })
    }

    if (clinic.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()

    // Handle category updates
    if (body.categoryIds) {
      await updateClinicCategories(clinicId, body.categoryIds)
    }

    // Handle procedure updates
    if (body.procedures) {
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

    // Handle profile field updates
    const profileFields = [
      'name',
      'description',
      'address',
      'city',
      'country',
      'phone',
      'website',
      'email',
      'yearEstablished',
      'languages',
      'accreditations',
      'certifications',
      'operatingHours',
      'insuranceAccepted',
    ]

    const profileUpdates: Record<string, unknown> = {}
    for (const field of profileFields) {
      if (body[field] !== undefined) {
        profileUpdates[field] = body[field]
      }
    }

    if (Object.keys(profileUpdates).length > 0) {
      const result = await updateClinicProfile(clinicId, profileUpdates as Parameters<typeof updateClinicProfile>[1])
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating clinic profile:', error)
    return NextResponse.json({ error: 'Failed to update clinic profile' }, { status: 500 })
  }
}
