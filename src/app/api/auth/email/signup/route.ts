/**
 * Protected Auth Sign-Up Route
 * Enforces Turnstile + IP-based rate limits + Disposable email blocks.
 */

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import { getClientIp } from "@/lib/security/request";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { AUTH_SIGNUP_LIMIT } from "@/lib/security/limits";
import { logAbuseEvent } from "@/lib/security/audit-log";
import { isDisposableEmail } from "@/lib/security/disposable-email";

export async function POST(req: Request) {
    try {
        const { email, password, turnstileToken, options } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
        }

        const ip = await getClientIp();

        // 1. IP-based sign-up limit (prevent botnets/mass account creation)
        const ipCheck = await checkRateLimit("auth_signup_ip", ip, {
            window: AUTH_SIGNUP_LIMIT.WINDOW,
            max: AUTH_SIGNUP_LIMIT.MAX_ATTEMPTS,
        });
        if (!ipCheck.success) {
            return NextResponse.json({
                error: "Too many sign-up attempts from this address. Please try again later."
            }, { status: 429 });
        }

        // 2. Disposable Email Check
        if (isDisposableEmail(email)) {
            await logAbuseEvent("disposable_email", email, { ip, action: "signup" });
            return NextResponse.json({
                error: "Please use a permanent email address to sign up."
            }, { status: 400 });
        }

        // 3. Verify Turnstile Token
        const turnstile = await verifyTurnstileToken(turnstileToken, ip);
        if (!turnstile.success) {
            await logAbuseEvent("turnstile_fail", email, { ip, action: "signup" });
            return NextResponse.json({ error: turnstile.error }, { status: 400 });
        }

        // 4. Proxy to Supabase Auth
        const supabase = await createClient();
        const { data: { user }, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                ...options,
                emailRedirectTo: options?.emailRedirectTo || `${new URL(req.url).origin}/auth/callback`,
                data: {
                    full_name: options?.data?.full_name || null,
                },
            },
        });

        if (error) {
            console.error(`[AUTH] Failed sign-up for ${email}: ${error.message}`);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        // 5. Create user profile in 'users' table if account created
        if (user) {
            try {
                const { error: profileError } = await supabase.from('users').insert({
                    id: user.id,
                    email: user.email!,
                    full_name: options?.data?.full_name || 'User',
                    role: 'patient', // Default role for public signups
                });

                if (profileError && profileError.code !== '23505') {
                    console.error('[AUTH] Critical profile creation error:', profileError);
                }
            } catch (err) {
                console.error('[AUTH] Profile insertion exception:', err);
            }
        }

        return NextResponse.json({
            success: true,
            message: "Please check your email for a confirmation link."
        });
    } catch (err) {
        console.error("[AUTH] Unexpected error in sign-up route:", err);
        return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
    }
}
