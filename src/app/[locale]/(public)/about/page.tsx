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
        <p className="mt-6 max-w-3xl text-xl text-neutral-600">
          We believe everyone deserves access to quality healthcare, regardless of where they live.
          MeetYourClinic connects patients with world-class medical facilities around the globe.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900">Our Mission</h2>
            <p className="mt-4 text-lg text-neutral-600">
              To empower patients with transparent information, verified options, and seamless
              support throughout their medical journey abroad.
            </p>
            <p className="mt-4 text-neutral-600">
              Healthcare shouldn&apos;t be limited by geography or finances. We&apos;re building the most
              trusted platform for medical tourism, where quality meets accessibility.
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
              title: 'Transparency',
              description: 'Real reviews, verified credentials, and clear pricing. No hidden fees, no surprises.',
            },
            {
              title: 'Quality',
              description: 'We partner only with accredited clinics and board-certified doctors who meet our standards.',
            },
            {
              title: 'Support',
              description: 'From your first search to post-treatment follow-up, our team is here to help 24/7.',
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
      <section className="mb-20 rounded-2xl bg-neutral-50 px-8 py-12 sm:px-12">
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[
            { number: '500+', label: 'Verified Clinics' },
            { number: '30+', label: 'Countries' },
            { number: '50K+', label: 'Happy Patients' },
            { number: '100+', label: 'Procedures' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold text-primary-600">{stat.number}</p>
              <p className="mt-2 text-neutral-600">{stat.label}</p>
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
      <section className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 px-8 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">Join Our Mission</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
          Whether you&apos;re a patient seeking care or a clinic looking to expand your reach,
          we&apos;d love to hear from you.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/search">
            <Button variant="secondary" size="lg">
              Find Care
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
              Partner With Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
