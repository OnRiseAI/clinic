import { NextResponse } from 'next/server'
import { searchClinicsForConcierge } from '@/lib/data/concierge'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { procedure, country, budget_max, language, accreditation, limit } = body

    const result = await searchClinicsForConcierge({
      procedure,
      country,
      budget_max: budget_max ? Number(budget_max) : undefined,
      language,
      accreditation,
      limit: limit ? Number(limit) : 5,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in concierge search-clinics:', error)
    return NextResponse.json(
      { error: 'Failed to search clinics', clinics: [], total: 0 },
      { status: 500 }
    )
  }
}
