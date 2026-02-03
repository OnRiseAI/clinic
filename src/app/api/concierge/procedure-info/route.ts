import { NextResponse } from 'next/server'
import { getProcedureInfoForConcierge } from '@/lib/data/concierge'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { procedure_slug } = body

    if (!procedure_slug) {
      return NextResponse.json(
        { error: 'procedure_slug is required', procedure: null },
        { status: 400 }
      )
    }

    const result = await getProcedureInfoForConcierge(procedure_slug)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in concierge procedure-info:', error)
    return NextResponse.json(
      { error: 'Failed to fetch procedure info', procedure: null },
      { status: 500 }
    )
  }
}
