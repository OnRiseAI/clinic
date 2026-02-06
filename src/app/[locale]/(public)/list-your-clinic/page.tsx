import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/ui/fade-in'
import { Check, Globe, Users, TrendingUp, Shield, Clock, HeartHandshake } from 'lucide-react'

interface ListYourClinicPageProps {
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: 'List Your Clinic - Get Found by Patients Worldwide | MeetYourClinic',
  description:
    'Join thousands of clinics on MeetYourClinic. Receive qualified patient enquiries, control your profile, and grow your international patient base. Free to list.',
}

const features = [
  {
    icon: Globe,
    title: 'Global Visibility',
    description: 'Get discovered by patients searching for medical treatments worldwide.',
  },
  {
    icon: Users,
    title: 'Qualified Leads',
    description: 'Receive enquiries from patients who are ready to book treatment.',
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Practice',
    description: 'Expand your international patient base with zero marketing effort.',
  },
  {
    icon: Shield,
    title: 'Build Trust',
    description: 'Showcase accreditations, reviews, and doctor profiles to build credibility.',
  },
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Manage all enquiries in one place with our easy-to-use dashboard.',
  },
  {
    icon: HeartHandshake,
    title: 'Premium Support',
    description: 'Our team is here to help you succeed with dedicated clinic support.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Create Your Account',
    description: 'Sign up in minutes with your clinic email address.',
  },
  {
    number: '02',
    title: 'Build Your Profile',
    description: 'Add photos, doctors, procedures, and pricing to attract patients.',
  },
  {
    number: '03',
    title: 'Start Receiving Enquiries',
    description: 'Get notified instantly when patients want to learn more about your services.',
  },
]

const stats = [
  { value: '1,500+', label: 'Clinics Listed' },
  { value: '45+', label: 'Countries' },
  { value: '50,000+', label: 'Patient Enquiries' },
  { value: '24h', label: 'Average Response Time' },
]

export default async function ListYourClinicPage({ params }: ListYourClinicPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-20 lg:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
              Free to list — No hidden fees
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Get Found by Patients Worldwide
            </h1>
            <p className="mt-6 text-xl text-primary-100">
              Join 1,500+ clinics already receiving qualified patient enquiries through MeetYourClinic.
              List your clinic for free and grow your international patient base.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/clinic-register">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  List Your Clinic — It&apos;s Free
                </Button>
              </Link>
              <Link href="/clinics">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full text-white hover:bg-white/10 sm:w-auto"
                >
                  Browse Listed Clinics
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-neutral-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <FadeIn key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary-600 lg:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-neutral-600">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-neutral-900 lg:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              MeetYourClinic provides the tools and visibility you need to attract international
              patients.
            </p>
          </FadeIn>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FadeIn key={feature.title} className="group" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="rounded-2xl border border-neutral-200 bg-white p-8 transition-all hover:border-primary-200 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-neutral-900">{feature.title}</h3>
                  <p className="mt-2 text-neutral-600">{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-neutral-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-neutral-900 lg:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-neutral-600">
              Get your clinic listed in three simple steps.
            </p>
          </FadeIn>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {steps.map((step, index) => (
              <FadeIn key={step.number} className="relative" style={{ transitionDelay: `${index * 150}ms` }}>
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-12 hidden h-0.5 w-full -translate-x-0 bg-primary-200 lg:block" />
                )}
                <div className="relative rounded-2xl bg-white p-8 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-lg font-bold text-white">
                    {step.number}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-neutral-900">{step.title}</h3>
                  <p className="mt-2 text-neutral-600">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <h2 className="text-3xl font-bold text-neutral-900 lg:text-4xl">
                Your Clinic Dashboard
              </h2>
              <p className="mt-4 text-lg text-neutral-600">
                Manage your entire presence from one powerful dashboard. Update your profile,
                respond to enquiries, and track your performance.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Full control over your clinic profile and photos',
                  'Real-time notifications for new patient enquiries',
                  'Doctor profiles to showcase your team',
                  'Procedure listings with custom pricing',
                  'Performance analytics and insights',
                  'Direct messaging with potential patients',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link href="/auth/clinic-register">
                  <Button variant="accent" size="lg">
                    Get Started — Free
                  </Button>
                </Link>
              </div>
            </FadeIn>

            <FadeIn className="relative">
              <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl">
                {/* Mock Dashboard Preview */}
                <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <div className="h-4 w-32 rounded bg-neutral-200" />
                    <div className="mt-2 h-3 w-48 rounded bg-neutral-100" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="rounded-xl bg-primary-50 p-4">
                        <div className="h-8 w-8 rounded bg-primary-200" />
                        <div className="mt-3 h-6 w-12 rounded bg-primary-300" />
                        <div className="mt-1 h-3 w-16 rounded bg-primary-100" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4 rounded-lg bg-neutral-50 p-3">
                        <div className="h-10 w-10 rounded-full bg-neutral-200" />
                        <div className="flex-1">
                          <div className="h-3 w-24 rounded bg-neutral-200" />
                          <div className="mt-1 h-2 w-32 rounded bg-neutral-100" />
                        </div>
                        <div className="h-6 w-16 rounded-full bg-primary-100" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white lg:text-4xl">
              Ready to Grow Your Clinic?
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Join thousands of clinics already connecting with patients worldwide. It&apos;s free
              to list.
            </p>
            <div className="mt-10">
              <Link href="/auth/clinic-register">
                <Button variant="secondary" size="lg">
                  List Your Clinic Now
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-primary-200">
              Already have a profile?{' '}
              <Link href="/auth/signin" className="font-medium text-white underline">
                Sign in
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
