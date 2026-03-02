/**
 * Request Helpers
 * Extract IP and User Agent safely in Next.js App Router.
 */

import { headers } from "next/headers";

/**
 * Extract the client IP address from the request headers.
 * Respects X-Forwarded-For (Cloudflare/Vercel) and other proxy headers.
 */
export async function getClientIp(): Promise<string> {
    const headerList = await headers();
    const cfIp = headerList.get("cf-connecting-ip");
    if (cfIp) return cfIp;

    const xForwardedFor = headerList.get("x-forwarded-for");
    if (xForwardedFor) return xForwardedFor.split(",")[0].trim();

    return "127.0.0.1"; // Fallback for local dev
}

/**
 * Extract the client User Agent from the request headers.
 */
export async function getClientUserAgent(): Promise<string> {
    const headerList = await headers();
    return headerList.get("user-agent") || "unknown";
}
