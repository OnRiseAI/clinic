import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: destinations, error } = await supabase
      .from('destinations')
      .select('id, country_name, country_code, slug')
      .order('country_name')

    if (error) {
      console.error('Error fetching destinations:', error)
      return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 })
    }

    return NextResponse.json(destinations || [])
  } catch (error) {
    console.error('Error in GET /api/destinations:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
