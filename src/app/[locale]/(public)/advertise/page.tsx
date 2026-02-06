import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'

interface AdvertisePageProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: AdvertisePageProps) {
    const t = await getTranslations({ locale: (await params).locale, namespace: 'common' })
    return {
        title: `Advertise With Us | ${t('appName')}`,
        description: 'Promote your clinic to thousands of international patients.',
    }
}

export default async function AdvertisePage({ params }: AdvertisePageProps) {
    const { locale } = await params
    setRequestLocale(locale)
    const t = await getTranslations('common')

    return (
        <div className="bg-white">
            {/* Hero */}
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Grow Your Medical Practice
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                        Connect with thousands of international patients seeking high-quality care.
                        Join our network of accredited clinics and hospitals.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link href="/list-your-clinic">
                            <Button size="lg" variant="secondary" className="font-semibold">
                                List Your Clinic
                            </Button>
                        </Link>
                        <Link href="/contact" className="text-sm font-semibold leading-6 text-white">
                            Contact Sales <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Benefits */}
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-primary-600">Why Partner With Us?</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Everything you need to attract international patients
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            <div className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    Global Reach
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">Access patients from the UK, USA, Europe, and GCC countries actively searching for treatments.</p>
                                </dd>
                            </div>
                            <div className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    Verified Leads
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">Receive high-intent inquiries with complete medical history and preferences.</p>
                                </dd>
                            </div>
                            <div className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    Premium Branding
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">Showcase your doctors, facilities, and accreditations on a world-class platform.</p>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}
