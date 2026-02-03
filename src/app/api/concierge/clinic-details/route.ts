import { NextResponse } from 'next/server'
import { getClinicDetailsForConcierge } from '@/lib/data/concierge'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { clinic_slug } = body

    if (!clinic_slug) {
      return NextResponse.json(
        { error: 'clinic_slug is required', clinic: null },
        { status: 400 }
      )
    }

    const result = await getClinicDetailsForConcierge(clinic_slug)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in concierge clinic-details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch clinic details', clinic: null },
      { status: 500 }
    )
  }
}
