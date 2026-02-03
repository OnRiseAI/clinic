import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const updateEnquirySchema = z.object({
  status: z.enum(['submitted', 'viewed', 'responded', 'closed']),
})

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()

    // Validate input
    const validationResult = updateEnquirySchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }

    const { status } = validationResult.data
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user role
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get the enquiry
    const { data: enquiry, error: enquiryError } = await supabase
      .from('enquiries')
      .select('id, clinic_id')
      .eq('id', id)
      .single()

    if (enquiryError || !enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 })
    }

    // Check permissions
    if (userData.role === 'clinic') {
      // Verify the clinic belongs to this user
      const { data: clinic } = await supabase
        .from('clinics')
        .select('id')
        .eq('id', enquiry.clinic_id)
        .eq('user_id', user.id)
        .single()

      if (!clinic) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    } else if (userData.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Update the enquiry status
    const { data: updatedEnquiry, error: updateError } = await supabase
      .from('enquiries')
      .update({ status })
      .eq('id', id)
      .select('id, status, updated_at')
      .single()

    if (updateError) {
      console.error('Error updating enquiry:', updateError)
      return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 })
    }

    return NextResponse.json({
      id: updatedEnquiry.id,
      status: updatedEnquiry.status,
      updatedAt: updatedEnquiry.updated_at,
    })
  } catch (error) {
    console.error('Error in PATCH /api/enquiries/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user role
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get the enquiry with clinic details
    const { data: enquiry, error: enquiryError } = await supabase
      .from('enquiries')
      .select(
        `
        id,
        patient_user_id,
        procedure_interest,
        willing_to_travel,
        preferred_destinations,
        budget_range,
        timeline,
        full_name,
        email,
        phone,
        message,
        status,
        created_at,
        updated_at,
        clinic:clinics(id, name, slug, city, country, email, phone)
      `
      )
      .eq('id', id)
      .single()

    if (enquiryError || !enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 })
    }

    // Check permissions
    if (userData.role === 'patient') {
      if (enquiry.patient_user_id !== user.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    } else if (userData.role === 'clinic') {
      // Verify the clinic belongs to this user
      // Supabase returns arrays for relations, but single() returns one object
      const clinic = enquiry.clinic as unknown as { id: string } | null
      if (!clinic) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }

      const { data: userClinic } = await supabase
        .from('clinics')
        .select('id')
        .eq('id', clinic.id)
        .eq('user_id', user.id)
        .single()

      if (!userClinic) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }

      // Auto-mark as viewed if clinic is viewing for first time
      if (enquiry.status === 'submitted') {
        await supabase.from('enquiries').update({ status: 'viewed' }).eq('id', id)
        // Update local variable for response
        ;(enquiry as { status: string }).status = 'viewed'
      }
    } else if (userData.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json(enquiry)
  } catch (error) {
    console.error('Error in GET /api/enquiries/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
