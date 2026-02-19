import { setRequestLocale } from 'next-intl/server'
import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata() {
  return {
    title: 'About Us - Our Mission to Transform Healthcare Access',
    description: 'Learn about MeetYourClinic\'s mission to make quality healthcare accessible worldwide. Meet our team and discover our values.',
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb />

      {/* Hero */}
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">About MeetYourClinic</h1>
        <p className="mt-6 max-w-3xl text-xl text-neutral-600 font-light leading-relaxed">
          MeetYourClinic is a global directory of reviewed clinics and treatment providers. We connect patients with accredited medical facilities through a structured, transparent platform.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-serif text-neutral-900">Why We Exist</h2>
            <p className="mt-4 text-lg text-neutral-600 font-light">
              We aim to present information clearly so individuals can make informed decisions.
            </p>
            <p className="mt-4 text-neutral-600 font-light leading-relaxed">
              Navigating international healthcare can be complex. We provide clarity and consistency by verifying accreditations, structuring clinic profiles standardly, and offering direct access to providers without hidden broker fees.
            </p>
          </div>
          <div className="aspect-video rounded-2xl bg-neutral-100" />
        </div>
      </section>

      {/* Values */}
      <section className="mb-20">
        <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">Our Values</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: 'Structure',
              description: 'We present every clinic with the same structured format, allowing for fair and easy comparison.',
            },
            {
              title: 'Verification',
              description: 'We confirm the existence and basic accreditation of listed providers to ensure a safe baseline.',
            },
            {
              title: 'Neutrality',
              description: 'We function as a directory, not a sales agency. We do not offer medical advice or steer decisions.',
            },
          ].map((value) => (
            <div
              key={value.title}
              className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-neutral-900">{value.title}</h3>
              <p className="mt-3 text-neutral-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mb-20 rounded-2xl bg-neutral-50 border border-neutral-100 px-8 py-12 sm:px-12">
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[
            { number: '500+', label: 'Verified Listings' },
            { number: '30+', label: 'Destinations' },
            { number: '50K+', label: 'Patient Inquiries' },
            { number: '100+', label: 'Treatment Types' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-serif text-navy">{stat.number}</p>
              <p className="mt-2 text-sm uppercase tracking-wide text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-20">
        <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">Our Team</h2>
        <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-12 py-16 text-center">
          <p className="text-neutral-500">Team members grid coming soon</p>
        </div>
      </section>

      {/* Press/Partners */}
      <section className="mb-20">
        <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">As Featured In</h2>
        <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-12 py-12 text-center">
          <p className="text-neutral-500">Press logos coming soon</p>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-neutral-200 bg-white px-8 py-16 text-center">
        <h2 className="text-3xl font-serif text-neutral-900">Explore the Directory</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-500 font-light">
          Browse verified clinics by treatment or destination.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/search">
            <Button variant="primary" size="lg" className="bg-navy hover:bg-navy/90 text-white min-w-[160px]">
              Find a Clinic
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="min-w-[160px]">
              For Clinics
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
