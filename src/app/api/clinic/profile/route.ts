import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClinicProfile, getClinicForUser } from '@/lib/data/clinic-dashboard'
import { basicInfoSchema } from '@/lib/validations/clinic'

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

    // Check if user already has a clinic
    const existingClinic = await getClinicForUser(user.id)
    if (existingClinic) {
      return NextResponse.json(
        { error: 'You already have a clinic profile', clinicId: existingClinic.id },
        { status: 400 }
      )
    }

    const body = await request.json()
    const validationResult = basicInfoSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }

    const { name, city, country, address, phone, website, email } = validationResult.data

    // Create the clinic profile
    const result = await createClinicProfile(user.id, {
      name,
      city,
      country,
      address,
      phone,
      website,
      email,
    })

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      id: result.data.id,
      slug: result.data.slug,
      name: result.data.name,
    })
  } catch (error) {
    console.error('Error creating clinic profile:', error)
    return NextResponse.json({ error: 'Failed to create clinic profile' }, { status: 500 })
  }
}

export async function GET() {
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

    // Get user's clinic
    const clinic = await getClinicForUser(user.id)

    if (!clinic) {
      return NextResponse.json({ error: 'Clinic not found' }, { status: 404 })
    }

    return NextResponse.json(clinic)
  } catch (error) {
    console.error('Error fetching clinic profile:', error)
    return NextResponse.json({ error: 'Failed to fetch clinic profile' }, { status: 500 })
  }
}
