import { NextResponse } from 'next/server'
import { createConciergeSession, updateConciergeSession } from '@/lib/data/concierge'
import { createClient } from '@/lib/supabase/server'

// Create a new session
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { session_id, mode } = body

    if (!session_id || !mode) {
      return NextResponse.json(
        { error: 'session_id and mode are required' },
        { status: 400 }
      )
    }

    // Try to get user ID if authenticated
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const result = await createConciergeSession(session_id, mode, user?.id)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error creating concierge session:', error)
    return NextResponse.json(
      { error: 'Failed to create session', success: false },
      { status: 500 }
    )
  }
}

// Update an existing session
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { session_id, ...updates } = body

    if (!session_id) {
      return NextResponse.json(
        { error: 'session_id is required' },
        { status: 400 }
      )
    }

    const result = await updateConciergeSession(session_id, updates)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error updating concierge session:', error)
    return NextResponse.json(
      { error: 'Failed to update session', success: false },
      { status: 500 }
    )
  }
}
