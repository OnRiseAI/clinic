import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Creates a Supabase client safe for use in generateStaticParams and other
 * build-time contexts where cookies are not available.
 * Uses the anon key — only for public read queries.
 */
export function createStaticClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error('Missing Supabase environment variables in createStaticClient')
    console.error('URL:', url ? 'Defined' : 'Missing')
    console.error('KEY:', key ? 'Defined' : 'Missing')
    // Don't throw immediately, but the client might fail
  }

  return createSupabaseClient(
    url!,
    key!
  )
}
