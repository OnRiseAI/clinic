
import { NextRequest, NextResponse } from 'next/server';
import { ralfyBalance, RalfyIndexError } from '@/lib/ralfyindex';

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
        const result = await ralfyBalance();
        return NextResponse.json({ ok: true, ...result });
    } catch (error) {
        if (error instanceof RalfyIndexError) {
            return NextResponse.json(
                { ok: false, provider: 'ralfyindex', error: error.message, errorCode: error.code },
                { status: 502 }
            );
        }
        return NextResponse.json(
            { ok: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
