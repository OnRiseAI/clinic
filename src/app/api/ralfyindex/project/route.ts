
import { NextRequest, NextResponse } from 'next/server';
import { ralfyCreateProject, RalfyIndexError } from '@/lib/ralfyindex';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
    const submitToken = process.env.RALFYINDEX_SUBMIT_TOKEN;

    if (submitToken) {
        const authHeader = req.headers.get('authorization');
        if (authHeader !== `Bearer ${submitToken}`) {
            return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
        }
    }

    try {
        const body = await req.json();

        if (!body.urls || !Array.isArray(body.urls) || body.urls.length === 0) {
            return NextResponse.json(
                { ok: false, error: 'Invalid request', details: ['Missing or empty urls array'] },
                { status: 400 }
            );
        }

        const result = await ralfyCreateProject({
            projectName: body.projectName,
            urls: body.urls,
        });

        return NextResponse.json({ ok: true, ...result });
    } catch (error: any) {
        if (error instanceof RalfyIndexError) {
            return NextResponse.json(
                { ok: false, provider: 'ralfyindex', error: error.message, errorCode: error.code },
                { status: 502 }
            );
        }

        // Check for URL validation error from normalizeUrls
        if (error instanceof Error && error.message.includes('Invalid URL')) {
            return NextResponse.json(
                { ok: false, error: 'Invalid request', details: [error.message] },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { ok: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
