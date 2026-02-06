import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'

interface TermsPageProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: TermsPageProps) {
    const t = await getTranslations({ locale: (await params).locale, namespace: 'common' })
    return {
        title: `Terms of Service | ${t('appName')}`,
        description: 'Read our Terms of Service regarding the use of our medical tourism platform.',
    }
}

export default async function TermsPage({ params }: TermsPageProps) {
    const { locale } = await params
    setRequestLocale(locale)
    const t = await getTranslations('common')

    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Terms of Service
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    Last updated: {new Date().toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <div className="mt-10 space-y-8 text-base leading-7 text-gray-600">
                    <section>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">1. Agreement to Terms</h2>
                        <p className="mt-4">
                            By accessing or using our website, you agree to be bound by these Terms of Service and our Privacy Policy.
                            If you disagree with any part of the terms, then you may not access the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">2. Medical Disclaimer</h2>
                        <p className="mt-4">
                            {t('appName')} is a platform that connects patients with medical clinics. We are not a medical provider and do not provide medical advice, diagnosis, or treatment.
                            All content provided on this site is for informational purposes only. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">3. User Accounts</h2>
                        <p className="mt-4">
                            When you create an account with us, you must provide us information that is accurate, complete, and current at all times.
                            Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">4. Limitation of Liability</h2>
                        <p className="mt-4">
                            In no event shall {t('appName')}, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">5. Governing Law</h2>
                        <p className="mt-4">
                            These Terms shall be governed and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
