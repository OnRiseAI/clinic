import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Creates a Supabase client safe for use in generateStaticParams and other
 * build-time contexts where cookies are not available.
 * Uses the anon key — only for public read queries.
 */
export function createStaticClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
