import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'

interface PrivacyPageProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PrivacyPageProps) {
    const t = await getTranslations({ locale: (await params).locale, namespace: 'common' })
    return {
        title: `Privacy Policy | ${t('appName')}`,
        description: 'Read our Privacy Policy to understand how we collect, use, and protect your personal information.',
    }
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
    const { locale } = await params
    setRequestLocale(locale)
    const t = await getTranslations('common')

    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Privacy Policy
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    Last updated: {new Date().toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <div className="mt-10 space-y-8 text-base leading-7 text-gray-600">
                    <section>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">1. Introduction</h2>
                        <p className="mt-4">
                            At {t('appName')}, we respect your privacy and are committed to protecting your personal data.
                            This privacy policy will inform you as to how we look after your personal data when you visit our website
                            (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">2. The Data We Collect</h2>
                        <p className="mt-4">
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul className="mt-4 list-disc pl-5 space-y-2">
                            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                            <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
                            <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">3. How We Use Your Data</h2>
                        <p className="mt-4">
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="mt-4 list-disc pl-5 space-y-2">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal or regulatory obligation.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">4. Data Security</h2>
                        <p className="mt-4">
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">5. Contact Us</h2>
                        <p className="mt-4">
                            If you have any questions about this privacy policy, please contact us via our support page or email.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
