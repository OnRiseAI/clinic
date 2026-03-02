/**
 * Protected Google OAuth Start Route
 * Enforces Turnstile + IP limits before creating an OAuth flow.
 */

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import { getClientIp } from "@/lib/security/request";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { GOOGLE_OAUTH_LIMIT } from "@/lib/security/limits";
import { logAbuseEvent } from "@/lib/security/audit-log";

export async function POST(req: Request) {
    try {
        const { next, turnstileToken } = await req.json();
        const ip = await getClientIp();

        // 1. Check IP-based OAuth start limit
        const ipCheck = await checkRateLimit("google_oauth_ip", ip, {
            window: GOOGLE_OAUTH_LIMIT.WINDOW,
            max: GOOGLE_OAUTH_LIMIT.MAX_ATTEMPTS,
        });
        if (!ipCheck.success) {
            return NextResponse.json({
                error: "Too many login attempts. Please try again soon."
            }, { status: 429 });
        }

        // 2. Verify Turnstile Token
        const turnstile = await verifyTurnstileToken(turnstileToken, ip);
        if (!turnstile.success) {
            await logAbuseEvent("turnstile_fail", "google_oauth_bot", { ip, action: "google_oauth" });
            return NextResponse.json({ error: turnstile.error }, { status: 400 });
        }

        // 3. Create OAuth Flow via Supabase
        const supabase = await createClient();
        const { data: { url }, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${new URL(req.url).origin}/auth/callback${next ? `?next=${encodeURIComponent(next)}` : ""}`,
            },
        });

        if (error) {
            console.error("[AUTH] Google OAuth initialization failed:", error.message);
            return NextResponse.json({ error: "Could not start Google login. Please try again." }, { status: 500 });
        }

        return NextResponse.json({ url });
    } catch (err) {
        console.error("[AUTH] Unexpected error in Google OAuth start route:", err);
        return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
    }
}
