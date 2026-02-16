import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ProceduresListClient } from './procedures-list-client'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://medit.com'

export const metadata: Metadata = {
    title: 'Medical Procedures & Treatments Abroad | Compare Prices | medit',
    description:
        'Explore detailed guides for medical procedures abroad. Compare prices for rhinoplasty, dental implants, hair transplants, and more across top destinations like Turkey, Spain, and Hungary.',
    alternates: {
        canonical: `${SITE_URL}/procedures`,
    },
}

interface ProceduresPageProps {
    params: Promise<{ locale: string }>
}

export default async function ProceduresPage({ params }: ProceduresPageProps) {
    const { locale } = await params
    setRequestLocale(locale)

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <Breadcrumbs
                    items={[
                        { name: 'Home', url: '/' },
                        { name: 'Procedures' },
                    ]}
                />
            </div>

            <ProceduresListClient />
        </div>
    )
}
