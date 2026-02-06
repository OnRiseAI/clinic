import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'

interface CookiesPageProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: CookiesPageProps) {
    const t = await getTranslations({ locale: (await params).locale, namespace: 'common' })
    return {
        title: `Cookie Policy | ${t('appName')}`,
        description: 'Learn about how we use cookies to improve your experience on our website.',
    }
}

export default async function CookiesPage({ params }: CookiesPageProps) {
    const { locale } = await params
    setRequestLocale(locale)
    const t = await getTranslations('common')

    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Cookie Policy
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    Last updated: {new Date().toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <div className="mt-10 space-y-8 text-base leading-7 text-gray-600">
                    <section>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">1. What Are Cookies</h2>
                        <p className="mt-4">
                            As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience.
                            This page describes what information they gather, how we use it and why we sometimes need to store these cookies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">2. How We Use Cookies</h2>
                        <p className="mt-4">
                            We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">3. The Cookies We Set</h2>
                        <ul className="mt-4 list-disc pl-5 space-y-2">
                            <li>
                                <strong>Account related cookies:</strong> If you create an account with us then we will use cookies for the management of the signup process and general administration.
                            </li>
                            <li>
                                <strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page.
                            </li>
                            <li>
                                <strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">4. Third Party Cookies</h2>
                        <p className="mt-4">
                            In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
                        </p>
                        <ul className="mt-4 list-disc pl-5 space-y-2">
                            <li>
                                This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience.
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    )
}
