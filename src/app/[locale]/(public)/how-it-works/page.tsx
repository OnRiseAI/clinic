import { setRequestLocale } from 'next-intl/server'
import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

interface HowItWorksPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata() {
  return {
    title: 'How It Works - Your Medical Journey Made Simple',
    description: 'Learn how MediTravel helps you find, compare, and book medical treatments abroad. From discovery to recovery, we guide you every step.',
  }
}

export default async function HowItWorksPage({ params }: HowItWorksPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const steps = [
    {
      number: '01',
      title: 'Discover',
      description: 'Browse our curated selection of accredited clinics and procedures. Use filters to find the perfect match for your needs and budget.',
    },
    {
      number: '02',
      title: 'Compare',
      description: 'Review detailed clinic profiles, verified patient reviews, and transparent pricing. See real photos and credentials.',
    },
    {
      number: '03',
      title: 'Connect',
      description: 'Submit enquiries to multiple clinics with one form. Our AI assistant can help answer questions 24/7.',
    },
    {
      number: '04',
      title: 'Plan',
      description: 'Receive personalized treatment plans and quotes. Clinics compete for your care with their best offers.',
    },
    {
      number: '05',
      title: 'Travel',
      description: 'Book your treatment with confidence. Many clinics offer packages including accommodation and airport transfers.',
    },
    {
      number: '06',
      title: 'Recover',
      description: 'Enjoy your recovery knowing our team and your clinic are just a message away for any follow-up needs.',
    },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb />

      {/* Hero */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">How It Works</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
          Your medical journey abroad, simplified. We guide you from discovery to recovery with
          transparency and support at every step.
        </p>
      </div>

      {/* Steps */}
      <section className="mb-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="text-4xl font-bold text-primary-200">{step.number}</span>
              <h3 className="mt-4 text-xl font-semibold text-neutral-900">{step.title}</h3>
              <p className="mt-3 text-neutral-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-20">
        <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">Why Choose MediTravel?</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: '✓', title: 'Verified Clinics', desc: 'Every clinic is vetted for quality and accreditation' },
            { icon: '💰', title: 'Save 50-70%', desc: 'Access world-class care at a fraction of home prices' },
            { icon: '🌍', title: 'Global Network', desc: 'Clinics in 30+ countries across 4 continents' },
            { icon: '🤖', title: 'AI Assistance', desc: '24/7 voice concierge to answer your questions' },
          ].map((benefit) => (
            <div key={benefit.title} className="text-center">
              <span className="text-3xl">{benefit.icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">{benefit.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-20">
        <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">Frequently Asked Questions</h2>
        <div className="mx-auto max-w-3xl rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-12 py-16 text-center">
          <p className="text-neutral-500">FAQ accordion coming soon</p>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 px-8 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">Ready to Start Your Journey?</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
          Join thousands of patients who have saved money and received excellent care through MediTravel.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/search">
            <Button variant="secondary" size="lg">
              Browse Clinics
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
