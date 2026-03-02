/**
 * Protected Auth Sign-In Route
 * Enforces Turnstile + DB-backed rate limits before calling Supabase Auth.
 */

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import { getClientIp } from "@/lib/security/request";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { AUTH_SIGNIN_LIMIT } from "@/lib/security/limits";
import { logAbuseEvent } from "@/lib/security/audit-log";

export async function POST(req: Request) {
    try {
        const { email, password, turnstileToken } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
        }

        const ip = await getClientIp();

        // 1. Check Rate Limit (IP-based)
        const ipCheck = await checkRateLimit("auth_signin_ip", ip, {
            window: AUTH_SIGNIN_LIMIT.WINDOW,
            max: AUTH_SIGNIN_LIMIT.MAX_ATTEMPTS,
        });
        if (!ipCheck.success) {
            return NextResponse.json({
                error: "Too many attempts. Please try again later."
            }, { status: 429 });
        }

        // 2. Check Rate Limit (Email-based)
        const emailCheck = await checkRateLimit("auth_signin_email", email, {
            window: AUTH_SIGNIN_LIMIT.WINDOW,
            max: AUTH_SIGNIN_LIMIT.MAX_ATTEMPTS,
        });
        if (!emailCheck.success) {
            return NextResponse.json({
                error: "Too many attempts. Please try again later."
            }, { status: 429 });
        }

        // 3. Verify Turnstile Token
        const turnstile = await verifyTurnstileToken(turnstileToken, ip);
        if (!turnstile.success) {
            await logAbuseEvent("turnstile_fail", email, { ip, action: "signin" });
            return NextResponse.json({ error: turnstile.error }, { status: 400 });
        }

        // 4. Proxy to Supabase Auth
        const supabase = await createClient();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            // Neutralize error response (prevent account enumeration)
            // Realistically, Supabase signInWithPassword returns neutral messages like "Invalid login credentials"
            // but we log the specific failure for internal auditing.
            console.log(`[AUTH] Failed sign-in attempt for ${email}: ${error.message}`);
            return NextResponse.json({
                error: "Invalid email or password. Please try again."
            }, { status: 401 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[AUTH] Unexpected error in sign-in route:", err);
        return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
    }
}
