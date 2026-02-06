import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { Mail, MessageCircle, FileQuestion } from 'lucide-react'

interface SupportPageProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: SupportPageProps) {
    const t = await getTranslations({ locale: (await params).locale, namespace: 'common' })
    return {
        title: `Support | ${t('appName')}`,
        description: 'Get help with your medical travel journey. Contact our support team.',
    }
}

export default async function SupportPage({ params }: SupportPageProps) {
    const { locale } = await params
    setRequestLocale(locale)

    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        How can we help you?
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Our team is here to support you at every step of your medical journey.
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-4xl grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* FAQ Card */}
                    <div className="rounded-2xl border border-gray-200 p-8 text-center hover:border-primary-300 transition-colors">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-50">
                            <FileQuestion className="h-6 w-6 text-primary-600" />
                        </div>
                        <h3 className="mt-6 text-lg font-semibold text-gray-900">FAQ</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Find answers to common questions about treatments, clinics, and travel.
                        </p>
                        <Link href="/faq" className="mt-6 inline-block">
                            <Button variant="outline">View FAQ</Button>
                        </Link>
                    </div>

                    {/* Contact Card */}
                    <div className="rounded-2xl border border-gray-200 p-8 text-center hover:border-primary-300 transition-colors">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-50">
                            <Mail className="h-6 w-6 text-primary-600" />
                        </div>
                        <h3 className="mt-6 text-lg font-semibold text-gray-900">Email Support</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Send us a message and we'll get back to you within 24 hours.
                        </p>
                        <Link href="/contact" className="mt-6 inline-block">
                            <Button variant="outline">Contact Us</Button>
                        </Link>
                    </div>

                    {/* Live Chat Card */}
                    <div className="rounded-2xl border border-gray-200 p-8 text-center hover:border-primary-300 transition-colors">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-50">
                            <MessageCircle className="h-6 w-6 text-primary-600" />
                        </div>
                        <h3 className="mt-6 text-lg font-semibold text-gray-900">Live Chat</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Chat with a medical travel coordinator (Mon-Fri, 9am-6pm).
                        </p>
                        <Button variant="outline" className="mt-6" disabled>
                            Coming Soon
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
