import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'

interface GuidePageProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: GuidePageProps) {
    const t = await getTranslations({ locale: (await params).locale, namespace: 'common' })
    return {
        title: `Patient Guide | ${t('appName')}`,
        description: 'A comprehensive guide to planning your medical treatment abroad.',
    }
}

export default async function GuidePage({ params }: GuidePageProps) {
    const { locale } = await params
    setRequestLocale(locale)

    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Medical Travel Guide
                </h1>
                <p className="mt-6 text-xl text-gray-600">
                    Your step-by-step resource for a safe and successful medical journey.
                </p>

                <div className="mt-12 space-y-12">
                    <section>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white font-bold">1</div>
                        <h2 className="mt-4 text-2xl font-bold text-gray-900">Research & Consultation</h2>
                        <p className="mt-2 text-gray-600">
                            Start by researching your procedure and potential destinations. Use our search tool to compare accredited clinics.
                            Once you shortlist a few, request free quotes and schedule initial video consultations to meet the doctors.
                        </p>
                    </section>

                    <section>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white font-bold">2</div>
                        <h2 className="mt-4 text-2xl font-bold text-gray-900">Booking & Travel</h2>
                        <p className="mt-2 text-gray-600">
                            After selecting a clinic, confirm your treatment dates. Book your flights and accommodation (many clinics offer package deals that include hotels and transfers).
                            Ensure your passport is valid and check if you need a visa.
                        </p>
                    </section>

                    <section>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white font-bold">3</div>
                        <h2 className="mt-4 text-2xl font-bold text-gray-900">Treatment & Recovery</h2>
                        <p className="mt-2 text-gray-600">
                            Arrive a day or two before your procedure for final pre-op tests. Follow all doctor instructions.
                            Plan for sufficient recovery time in the destination before flying home.
                        </p>
                    </section>

                    <section>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white font-bold">4</div>
                        <h2 className="mt-4 text-2xl font-bold text-gray-900">Aftercare</h2>
                        <p className="mt-2 text-gray-600">
                            Maintain contact with your clinic after returning home. Follow the post-op care plan strictly.
                            If you have any concerns, use our support channels or contact your local GP.
                        </p>
                    </section>
                </div>

                <div className="mt-16 text-center">
                    <Link href="/search">
                        <Button size="lg" className="rounded-full px-8">Start Your Journey</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
