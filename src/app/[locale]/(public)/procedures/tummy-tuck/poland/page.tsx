import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { TummyTuckPolandClient } from './tummy-tuck-poland-client'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from '@/lib/seo/structured-data'
import { StructuredData } from '@/components/seo/structured-data-component'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://medit.com'

// =============================================================================
// METADATA
// =============================================================================

export const metadata: Metadata = {
  title: 'Tummy Tuck in Poland — Prices from £2,370, Top Clinics & EU Quality | medit',
  description:
    'Compare tummy tuck prices in Poland from £2,370. Browse ISO-certified clinics in Warsaw, Kraków and Wrocław, EU-regulated surgeons, all-inclusive packages, and free consultations.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/tummy-tuck/poland`,
    languages: {
      'en-GB': `${SITE_URL}/en/procedures/tummy-tuck/poland`,
    },
  },
  openGraph: {
    title: 'Tummy Tuck in Poland — Prices from £2,370, Top Clinics & EU Quality',
    description:
      'Compare tummy tuck prices in Poland from £2,370. Browse ISO-certified clinics in Warsaw, Kraków and Wrocław, EU-regulated surgeons.',
    url: `${SITE_URL}/procedures/tummy-tuck/poland`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/tummy-tuck-poland.jpg`,
        width: 1200,
        height: 630,
        alt: 'Tummy Tuck in Poland - Compare Clinics in Warsaw, Kraków and Wrocław',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tummy Tuck in Poland — Prices from £2,370, Top Clinics & EU Quality',
    description:
      'Compare tummy tuck prices in Poland from £2,370. EU-regulated clinics in Warsaw, Kraków and Wrocław.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const TUMMY_TUCK_POLAND_FAQS = [
  {
    question: 'How much does a tummy tuck cost in Poland?',
    answer:
      'Standard abdominoplasty costs from £2,370 in Poland. Tummy tuck combined with liposuction starts from £4,500. All-inclusive packages with hotel accommodation and airport transfers are available at most Polish clinics.',
  },
  {
    question: 'Are Polish clinics safe for cosmetic surgery?',
    answer:
      'Yes. Poland is a full EU member state — clinics must comply with EU medical device regulations and safety standards. ISO 9001 and ESPRAS accreditations are common among top clinics. Polish surgeons typically hold European Board certifications (EBOPRAS).',
  },
  {
    question: 'How long should I stay in Poland after a tummy tuck?',
    answer:
      'Polish clinics typically recommend 10–15 days, which is longer than some other destinations. This more conservative approach to recovery monitoring reflects higher care standards. Hospital stay is 1–2 nights, with regular follow-up appointments through day 10–15.',
  },
  {
    question: 'Which city in Poland is best for tummy tuck?',
    answer:
      'Warsaw offers the widest medical infrastructure. Kraków offers a tourist-friendly recovery environment with its historic old town. Wrocław has established specialist clinics like ClinicForYou (operating since 1995). The best choice depends on your priorities.',
  },
  {
    question: 'Why choose Poland over Turkey for a tummy tuck?',
    answer:
      'Poland offers full EU regulation, shorter flights from the UK (2–2.5 hours vs 3.5–4 hours), and competitive pricing. Turkey offers more comprehensive all-inclusive packages and the highest volume of cosmetic surgery experience. Both are excellent choices with different strengths.',
  },
  {
    question: 'Do Polish surgeons speak English?',
    answer:
      'At clinics treating international patients, yes. Most Polish plastic surgeons speak English or German fluently. All recommended clinics on medit have dedicated English-speaking patient coordinators to support you throughout your stay.',
  },
  {
    question: 'What qualifications do Polish plastic surgeons have?',
    answer:
      'Polish plastic surgeons typically hold European Board certification (EBOPRAS), Polish Medical Chamber registration, and membership of the Polish Society of Plastic, Reconstructive and Aesthetic Surgery. Many have trained internationally in Western Europe or North America.',
  },
  {
    question: 'Is Poland a good destination for medical tourism?',
    answer:
      "Yes. Poland's medical tourism sector grows approximately 20% annually. Over 100,000 international patients visit yearly. The combination of EU regulation, modern infrastructure, internationally trained surgeons, and competitive pricing makes Poland increasingly popular.",
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Tummy Tuck in Poland — Prices, Clinics & Packages',
  description:
    'Compare tummy tuck prices in Poland from ISO-certified clinics in Warsaw, Kraków and Wrocław. EU-regulated surgeons and all-inclusive packages.',
  url: `${SITE_URL}/procedures/tummy-tuck/poland`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Abdominoplasty',
    alternateName: 'Tummy Tuck',
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Abdomen',
    howPerformed:
      'Abdominoplasty removes excess skin and fat from the abdominal area, tightens weakened or separated abdominal muscles (diastasis recti), and creates a flatter, firmer profile through an incision below the bikini line.',
  },
  audience: {
    '@type': 'MedicalAudience',
    audienceType: 'Patient',
    geographicArea: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
  },
  lastReviewed: '2026-02-02',
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

interface TummyTuckPolandPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function TummyTuckPolandPage({
  params,
}: TummyTuckPolandPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Tummy Tuck', url: '/procedures/tummy-tuck' },
    { name: 'Poland' },
  ])

  const faqSchema = generateFAQSchema(TUMMY_TUCK_POLAND_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[
          generateOrganizationSchema(),
          generateWebsiteSchema(),
          breadcrumbSchema,
          faqSchema,
          medicalWebPageSchema,
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Tummy Tuck', url: '/procedures/tummy-tuck' },
            { name: 'Poland' },
          ]}
        />
      </div>

      <TummyTuckPolandClient faqs={TUMMY_TUCK_POLAND_FAQS} />
    </div>
  )
}
