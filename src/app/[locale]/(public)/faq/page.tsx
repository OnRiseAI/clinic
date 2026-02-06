import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import { FAQSection } from '@/components/seo/faq-section'

interface FAQPageProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: FAQPageProps) {
    const t = await getTranslations({ locale: (await params).locale, namespace: 'common' })
    return {
        title: `Frequently Asked Questions | ${t('appName')}`,
        description: 'Find answers to common questions about medical tourism, our platform, and traveling for treatment.',
    }
}

const FAQS = [
    {
        question: 'How does medical tourism work?',
        answer: 'Medical tourism involves traveling to another country for medical care. You browse accredited clinics, request quotes, and plan your trip. We help streamline this process by connecting you with verified providers.',
    },
    {
        question: 'Are the clinics accredited?',
        answer: 'Yes, we prioritize clinics with international accreditations such as JCI, ISO, and TEMOS. We verify licenses and doctors credentials to ensure high standards of safety and care.',
    },
    {
        question: 'How much can I save?',
        answer: 'Savings typically range from 30% to 70% compared to UK or US prices, depending on the procedure and destination. This is due to lower operating costs and living expenses in those countries, not lower quality.',
    },
    {
        question: 'What if something goes wrong?',
        answer: 'Reputable clinics have insurance and protocols for complications. We recommend purchasing specialized medical travel insurance. Before booking, always ask about the clinics warranty and revision policy.',
    },
    {
        question: 'Do I need a visa?',
        answer: 'Visa requirements depend on your citizenship and the destination country. For many popular destinations like Turkey or Spain, short-term tourist visits are visa-free or e-visa for UK/EU/US citizens. Always check the official government travel advice.',
    },
    {
        question: 'Does the staff speak English?',
        answer: 'Yes, the clinics listed on our platform are experienced with international patients and provide English-speaking doctors and staff. Many also offer interpreters for other languages.',
    },
]

export default async function FAQPage({ params }: FAQPageProps) {
    const { locale } = await params
    setRequestLocale(locale)
    const t = await getTranslations('common')

    return (
        <div className="bg-neutral-50 min-h-screen py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Frequently Asked Questions
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Everything you need to know about finding and booking medical treatment abroad.
                    </p>
                </div>

                <div className="mt-16 mx-auto max-w-3xl">
                    <FAQSection faqs={FAQS} title="" />
                </div>
            </div>
        </div>
    )
}
