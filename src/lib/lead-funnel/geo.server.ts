import { headers } from "next/headers";

/**
 * Detect visitor country server-side.
 *
 * Priority:
 *  1. x-vercel-ip-country header (Vercel Edge, Cloudflare, etc.)
 *  2. cf-ipcountry header (Cloudflare)
 *  3. Returns null (caller should fall back to client-side heuristic)
 */
export async function detectCountryServer(): Promise<string | null> {
  try {
    const h = await headers();
    const vercel = h.get("x-vercel-ip-country");
    if (vercel) return vercel.toUpperCase();

    const cf = h.get("cf-ipcountry");
    if (cf && cf !== "XX") return cf.toUpperCase();

    return null;
  } catch {
    return null;
  }
}
