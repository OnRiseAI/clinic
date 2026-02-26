import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ComingSoonPlaceholder } from '@/components/ui/coming-soon-placeholder'
import { CATEGORY_CONFIGS } from '@/lib/categories/config'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

interface ProcedurePageProps {
    params: Promise<{ locale: string; slug: string }>
}

function findTreatmentNameBySlug(slug: string): string | null {
    for (const config of Object.values(CATEGORY_CONFIGS)) {
        const treatment = config.relatedTreatments.find((t) => t.slug === slug)
        if (treatment) {
            return treatment.name
        }
    }
    return null
}

export async function generateMetadata({ params }: ProcedurePageProps): Promise<Metadata> {
    const { slug } = await params
    const treatmentName = findTreatmentNameBySlug(slug) || slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

    return {
        title: `${treatmentName} | MeetYourClinic`,
        description: `Learn more about ${treatmentName} and find the best clinics abroad.`,
    }
}

export default async function ProcedureDynamicPage({ params }: ProcedurePageProps) {
    const { locale, slug } = await params
    setRequestLocale(locale)

    const treatmentName = findTreatmentNameBySlug(slug)

    // If the slug is completely unknown, we might want to return a 404,
    // but since we are catching links from config.ts, it will find a match.
    // We can just format the slug if not found.
    const displayName = treatmentName || slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

    return (
        <>
            <div className="bg-white border-b border-slate-100">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <Breadcrumbs
                        items={[
                            { name: 'Home', url: '/' },
                            { name: 'Procedures', url: '/procedures' },
                            { name: displayName },
                        ]}
                    />
                </div>
            </div>
            <ComingSoonPlaceholder
                type="category"
                name={displayName}
                subtitleText={`We are currently vetting the top clinics specializing in ${displayName} to ensure they meet our rigorous standards for safety, quality, and patient care.`}
            />
        </>
    )
}
