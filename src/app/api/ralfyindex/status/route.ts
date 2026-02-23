
import { NextResponse } from 'next/server';
import { ralfyStatus, RalfyIndexError } from '@/lib/ralfyindex';

export const runtime = 'nodejs';

export async function POST() {
    try {
        const result = await ralfyStatus();
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
