/**
 * DB-Backed Rate Limiting
 * Uses Supabase rate_limit_hit() and otp_cooldown_check() for precision.
 */

import { createClient } from "@supabase/supabase-js";
import { getClientIp } from "./request";
import { logAbuseEvent } from "./audit-log";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

/**
 * Perform a rate limit check by hitting the DB.
 */
export async function checkRateLimit(
    action: string,
    identifier: string,
    options: { window: number; max: number }
): Promise<{ success: boolean; current?: number; reset?: string }> {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        console.warn("SUPABASE_SERVICE_ROLE_KEY is not defined. Skipping server-side rate limit check.");
        return { success: true }; // Allow in development if not configured
    }

    try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
            auth: { persistSession: false },
        });

        const key = `rl:${action}:${identifier}`;
        const { data, error } = await supabase.rpc("rate_limit_hit", {
            p_key: key,
            p_window_seconds: options.window,
            p_limit: options.max,
        });

        if (error) {
            console.error("Rate limit RPC error:", error.message);
            return { success: true }; // Fail open for rate limiting if DB fails
        }

        const { current_count, exceeded, reset_at } = data[0];

        if (exceeded) {
            const ip = await getClientIp();
            await logAbuseEvent("rate_limit", identifier, {
                action,
                ip,
                count: current_count,
                limit: options.max,
            });
            return { success: false, current: current_count, reset: reset_at };
        }

        return { success: true, current: current_count, reset: reset_at };
    } catch (err) {
        console.error("Unexpected failure in rate limit check:", err);
        return { success: true }; // Fail open
    }
}

/**
 * Check if an identifier is currently in an OTP cooldown period.
 */
export async function checkOtpCooldown(
    identifier: string,
    cooldownSeconds: number
): Promise<{ allowed: boolean; secondsRemaining: number }> {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return { allowed: true, secondsRemaining: 0 };

    try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
            auth: { persistSession: false },
        });

        const { data, error } = await supabase.rpc("otp_cooldown_check", {
            p_identifier: identifier,
            p_cooldown_seconds: cooldownSeconds,
        });

        if (error) return { allowed: true, secondsRemaining: 0 };

        const { allowed, seconds_remaining } = data[0];
        return { allowed, secondsRemaining: seconds_remaining };
    } catch (err) {
        return { allowed: true, secondsRemaining: 0 };
    }
}

/**
 * Log a sent OTP, updating its timestamp for cooldown checks.
 */
export async function trackOtpSent(identifier: string) {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return;

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
    });

    await supabase.from("otp_cooldowns").upsert({
        identifier,
        last_sent_at: new Date().toISOString(),
    });
}
