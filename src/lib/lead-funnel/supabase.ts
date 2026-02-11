import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client for server-side use (Server Actions / Route Handlers).
 * Uses the SERVICE_ROLE key so it bypasses RLS — keep this server-only.
 *
 * Required env vars:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const key = serviceKey || anonKey;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY env vars"
    );
  }

  if (!serviceKey) {
    console.warn(
      "[lead-funnel] SUPABASE_SERVICE_ROLE_KEY not set — using anon key (requires RLS policies on leads/lead_events)"
    );
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
