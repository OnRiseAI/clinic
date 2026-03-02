/**
 * Turnstile Verification Helper
 * Verifies Cloudflare Turnstile tokens on the server before accepting requests.
 */

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

export interface TurnstileResponse {
    success: boolean;
    "error-codes"?: string[];
    challenge_ts?: string;
    hostname?: string;
    action?: string;
    cdata?: string;
}

/**
 * Verify a Turnstile token with Cloudflare API.
 */
export async function verifyTurnstileToken(
    token: string,
    ip?: string
): Promise<{ success: boolean; error?: string }> {
    if (!token) {
        return { success: false, error: "Missing Turnstile token." };
    }

    // If secret is missing, it's a configuration error on the server
    if (!TURNSTILE_SECRET_KEY) {
        console.warn("TURNSTILE_SECRET_KEY is not defined in environment variables. Skipping server-side Turnstile check for now.");
        // In production, you would return false here to enforce security
        if (process.env.NODE_ENV === 'production') {
            return { success: false, error: "Server security misconfiguration." };
        }
        return { success: true }; // Allow in development if not configured
    }

    try {
        const formData = new FormData();
        formData.append("secret", TURNSTILE_SECRET_KEY);
        formData.append("response", token);
        if (ip) formData.append("remoteip", ip);

        const result = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                method: "POST",
                body: formData,
            }
        );

        const outcome = (await result.json()) as TurnstileResponse;

        if (!outcome.success) {
            console.error("Turnstile verification failed:", outcome["error-codes"]);
            return {
                success: false,
                error: "Bot detection failed. Please refresh and try again."
            };
        }

        return { success: true };
    } catch (err) {
        console.error("Error during Turnstile verification:", err);
        return { success: false, error: "Security check timed out. Please try again." };
    }
}
