/**
 * Abuse Audit Log
 * Logs events to the server console and optionally to Supabase abuse_events table.
 */

import { createClient } from "@supabase/supabase-js"; // Direct JS client for background logging
import { getClientIp, getClientUserAgent } from "./request";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

/**
 * Log an abuse event (rate limit hit, bot trip, suspicious activity).
 * Always logs to server stdout/stderr.
 * Persists to DB if service role key is available.
 */
export async function logAbuseEvent(
    eventType: string,
    identifier?: string,
    metadata: Record<string, any> = {}
) {
    const ip = await getClientIp();
    const ua = await getClientUserAgent();

    const eventPayload = {
        event_type: eventType,
        ip_address: ip,
        identifier: identifier || null,
        user_agent: ua,
        metadata,
        created_at: new Date().toISOString(),
    };

    // 1. Always log to server logs for diagnostics
    console.warn(`[ABUSE_EVENT] ${eventType.toUpperCase()} | IP: ${ip} | ID: ${identifier || "NONE"}`, metadata);

    // 2. Persist to Supabase if we have a service role key
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
        try {
            const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
                auth: { persistSession: false },
            });

            const { error } = await supabase.from("abuse_events").insert(eventPayload);
            if (error) console.error("Error persisting abuse event to DB:", error.message);
        } catch (err) {
            console.error("Critical failure during abuse logging:", err);
        }
    }
}
