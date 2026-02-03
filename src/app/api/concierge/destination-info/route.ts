import { NextResponse } from 'next/server'
import { getDestinationInfoForConcierge } from '@/lib/data/concierge'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { country_slug } = body

    if (!country_slug) {
      return NextResponse.json(
        { error: 'country_slug is required', destination: null },
        { status: 400 }
      )
    }

    const result = await getDestinationInfoForConcierge(country_slug)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in concierge destination-info:', error)
    return NextResponse.json(
      { error: 'Failed to fetch destination info', destination: null },
      { status: 500 }
    )
  }
}
