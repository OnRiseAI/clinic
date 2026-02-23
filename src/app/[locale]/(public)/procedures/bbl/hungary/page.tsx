import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BBLHungaryClient } from './bbl-hungary-client'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from '@/lib/seo/structured-data'
import { StructuredData } from '@/components/seo/structured-data-component'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://meetyourclinic.com'

export const metadata: Metadata = {
  title: 'BBL in Hungary — EU Quality, Competitive Prices | MeetYourClinic',
  description:
    'Compare BBL prices in Hungary from £3,200. Brazilian Butt Lift in Budapest with EU standards, thermal spa recovery. Growing expertise in body contouring.',
  alternates: {
    canonical: `/procedures/bbl/hungary`,
    languages: { 'en-GB': `/procedures/bbl/hungary` },
  },
  openGraph: {
    title: 'BBL in Hungary — EU Quality, Competitive Prices',
    description: 'Compare BBL prices in Hungary from £3,200. EU standards, thermal spa recovery.',
    url: `${SITE_URL}/procedures/bbl/hungary`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const BBL_HUNGARY_FAQS = [
  {
    question: 'How much does a BBL cost in Hungary?',
    answer: 'BBL in Hungary costs £3,200–£5,000. Packages vary — some include accommodation, others are surgery-only. This compares to £8,000–£12,000 in the UK — savings of 55–65%.',
  },
  {
    question: 'Is BBL in Hungary safe?',
    answer: 'Yes. Hungary is an EU member with healthcare regulated to European standards. Surgeons must be registered with the Hungarian Medical Chamber. Key: verify surgeon\'s BBL-specific experience as Hungary is better known for dental than body contouring.',
  },
  {
    question: 'Why choose Hungary for BBL?',
    answer: 'Hungary offers EU patient protections, good value pricing, and unique thermal spa recovery options. Budapest is beautiful for extended recovery stays. However, Hungary has less BBL volume than Turkey — verify surgeon experience.',
  },
  {
    question: 'How long should I stay in Hungary for BBL?',
    answer: 'Plan for 10–14 days. The 2.5-hour flight home is manageable with a BBL pillow. Budapest\'s thermal baths can aid relaxation during recovery (check with surgeon on timing).',
  },
  {
    question: 'Can I use thermal baths after BBL in Hungary?',
    answer: 'Not immediately. You\'ll need to wait at least 4–6 weeks until incisions are fully healed and surgeon approves. However, being near the baths for later in your recovery journey is a unique Hungary benefit.',
  },
  {
    question: 'Which clinics in Hungary offer BBL?',
    answer: 'Budapest has clinics offering BBL, though fewer than Turkey or Poland. Key clinics include those with experienced cosmetic surgeons who have specific BBL training. Research surgeon credentials carefully.',
  },
  {
    question: 'Do Hungarian surgeons speak English?',
    answer: 'Yes. Surgeons at international-facing clinics speak English. Hungary has decades of medical tourism experience from dental work. Patient coordinators provide full English support.',
  },
  {
    question: 'Can I combine BBL with other procedures in Hungary?',
    answer: 'Yes. BBL can be combined with liposuction, tummy tuck, or other body contouring. Discuss options and safety with your surgeon during consultation.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'BBL in Hungary — Brazilian Butt Lift in Budapest',
  description: 'Compare BBL prices in Hungary from clinics in Budapest. EU standards, thermal spa recovery.',
  url: `${SITE_URL}/procedures/bbl/hungary`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Brazilian Butt Lift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2026-02-03',
}

interface BBLHungaryPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BBLHungaryPage({ params }: BBLHungaryPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'BBL', url: '/procedures/bbl' },
    { name: 'Hungary' },
  ])

  const faqSchema = generateFAQSchema(BBL_HUNGARY_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalWebPageSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'BBL', url: '/procedures/bbl' },
            { name: 'Hungary' },
          ]}
        />
      </div>
      <BBLHungaryClient faqs={BBL_HUNGARY_FAQS} />
    </div>
  )
}
