
/**
 * RalfyIndex API Client
 * Server-only library for interacting with https://api.ralfyindex.com
 */

export class RalfyIndexError extends Error {
    code?: number;
    constructor(message: string, code?: number) {
        super(message);
        this.name = 'RalfyIndexError';
        this.code = code;
    }
}

const API_BASE = 'https://api.ralfyindex.com';
const API_KEY = process.env.RALFYINDEX_API_KEY;

/**
 * Normalizes URLs according to requirements:
 * - Trims whitespace
 * - De-duplicates
 * - Throws if a string contains multiple https:// occurrences (catch concatenated URLs)
 */
function normalizeUrls(urls: string[]): string[] {
    const seen = new Set<string>();
    const normalized: string[] = [];

    for (const rawUrl of urls) {
        const trimmed = rawUrl.trim();
        if (!trimmed) continue;

        // Catch concatenated URLs (more than one https://)
        const matches = trimmed.match(/https?:\/\//g);
        if (matches && matches.length > 1) {
            throw new Error(`Invalid URL: Multiple protocol occurrences found in "${trimmed}"`);
        }

        if (!seen.has(trimmed)) {
            seen.add(trimmed);
            normalized.push(trimmed);
        }
    }

    return normalized;
}

/**
 * Sanitizes project name:
 * - Allowed chars: a-zA-Z0-9 _.-
 * - Replace others with _
 * - Max 80 chars
 */
function sanitizeProjectName(name: string): string {
    const sanitized = name
        .replace(/[^a-zA-Z0-9 _.-]/g, '_')
        .substring(0, 80);
    return sanitized || 'unnamed_project';
}

async function ralfyRequest<T>(endpoint: string, body: Record<string, any>): Promise<T> {
    if (!API_KEY) {
        throw new Error('RALFYINDEX_API_KEY is not configured');
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...body,
            apikey: API_KEY,
        }),
    });

    const data = await response.json();

    if (!response.ok || (data.status !== 'ok' && data.errorCode)) {
        throw new RalfyIndexError(
            data.message || 'Unknown RalfyIndex error',
            data.errorCode || response.status
        );
    }

    return data as T;
}

export async function ralfyStatus() {
    return ralfyRequest<{ status: string }>('/status', {});
}

export async function ralfyBalance() {
    return ralfyRequest<{ status: string; balance: number }>('/balance', {});
}

export async function ralfyCreateProject(params: { projectName?: string; urls: string[] }) {
    const normalizedUrls = normalizeUrls(params.urls);
    const sanitizedName = params.projectName ? sanitizeProjectName(params.projectName) : undefined;

    return ralfyRequest<{ status: string; creditsUsed: number }>('/project', {
        projectName: sanitizedName,
        urls: normalizedUrls,
    });
}
