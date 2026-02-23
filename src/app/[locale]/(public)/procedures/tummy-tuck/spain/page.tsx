import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { TummyTuckSpainClient } from './tummy-tuck-spain-client'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from '@/lib/seo/structured-data'
import { StructuredData } from '@/components/seo/structured-data-component'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://meetyourclinic.com'

// =============================================================================
// METADATA
// =============================================================================

export const metadata: Metadata = {
  title: 'Tummy Tuck in Spain — Prices, Top Clinics in Madrid, Barcelona & Marbella | MeetYourClinic',
  description:
    'Compare tummy tuck prices in Spain from £3,000. Browse SECPRE-accredited surgeons in Madrid, Barcelona, and Marbella. EU-regulated, premium quality, and 2hr flights from London.',
  alternates: {
    canonical: `/procedures/tummy-tuck/spain`,
    languages: {
      'en-GB': `/procedures/tummy-tuck/spain`,
    },
  },
  openGraph: {
    title: 'Tummy Tuck in Spain — Prices, Top Clinics in Madrid, Barcelona & Marbella',
    description:
      'Compare tummy tuck prices in Spain from £3,000. Browse SECPRE-accredited surgeons in Madrid, Barcelona, and Marbella. EU-regulated, premium quality.',
    url: `${SITE_URL}/procedures/tummy-tuck/spain`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/tummy-tuck-spain.jpg`,
        width: 1200,
        height: 630,
        alt: 'Tummy Tuck in Spain - Compare Clinics in Madrid, Barcelona and Marbella',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tummy Tuck in Spain — Prices, Top Clinics in Madrid, Barcelona & Marbella',
    description:
      'Compare tummy tuck prices in Spain from £3,000. SECPRE-accredited surgeons, EU-regulated, premium quality.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const TUMMY_TUCK_SPAIN_FAQS = [
  {
    question: 'How much does a tummy tuck cost in Spain?',
    answer:
      'Standard abdominoplasty costs from £3,000 in Marbella to £7,000 in Barcelona and Madrid. Tummy tuck combined with liposuction starts from £5,500. Some clinics offer all-inclusive packages with accommodation and transfers.',
  },
  {
    question: 'Why is Spain more expensive than Turkey or Hungary?',
    answer:
      "Spain's prices reflect its premium positioning — the world's top-ranked healthcare system according to the Bloomberg Global Health Index, highly experienced SECPRE-accredited surgeons, and first-class hospital facilities. Savings of 30–70% versus UK private prices are still significant.",
  },
  {
    question: 'Are Spanish plastic surgeons well-qualified?',
    answer:
      'Yes. SECPRE (Spanish Society of Plastic, Reconstructive and Aesthetic Surgery) membership requires a minimum of 5 years specialist training. Many Spanish surgeons have 20–30+ years of experience. Spain performs 450,000 cosmetic procedures annually, ensuring surgeons are highly practiced.',
  },
  {
    question: 'How long should I stay in Spain after a tummy tuck?',
    answer:
      "The recommended stay is 7–14 days depending on procedure complexity. Standard tummy tuck requires 7–10 days. Combined procedures need 10–14 days. Spain's Mediterranean climate is ideal for comfortable recovery walks.",
  },
  {
    question: 'Which city in Spain is best for a tummy tuck?',
    answer:
      'Madrid offers the widest medical choice and largest infrastructure. Barcelona has world-class premium clinics. Marbella provides the best recovery climate, competitive pricing, and the most UK-friendly environment with its large British expat community.',
  },
  {
    question: "Is Spain suitable for UK patients who don't speak Spanish?",
    answer:
      'Absolutely. Spain has the largest UK expat community in Europe, especially on the Costa del Sol. Most medical facilities in Barcelona, Madrid, and Marbella have English-speaking staff and dedicated international patient coordinators.',
  },
  {
    question: 'Can I combine a tummy tuck trip with a holiday in Spain?',
    answer:
      'Many patients extend their stay for recovery in a resort setting. Marbella and Barcelona are particularly popular for combining treatment with a relaxed recovery holiday. Just ensure your surgeon approves your activity level during recovery.',
  },
  {
    question: 'Do Spanish clinics offer all-inclusive tummy tuck packages?',
    answer:
      'Some do, especially in Marbella and at specialist international clinics like Wellness Kliniek in Barcelona. Others quote surgery only. Ask about package options when requesting quotes — MeetYourClinic can match you with clinics offering all-inclusive pricing.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Tummy Tuck in Spain — Prices, Clinics & Surgeons',
  description:
    'Compare tummy tuck prices in Spain from SECPRE-accredited surgeons in Madrid, Barcelona, and Marbella. Premium EU-regulated care.',
  url: `${SITE_URL}/procedures/tummy-tuck/spain`,
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

interface TummyTuckSpainPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function TummyTuckSpainPage({
  params,
}: TummyTuckSpainPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Tummy Tuck', url: '/procedures/tummy-tuck' },
    { name: 'Spain' },
  ])

  const faqSchema = generateFAQSchema(TUMMY_TUCK_SPAIN_FAQS)

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
            { name: 'Spain' },
          ]}
        />
      </div>

      <TummyTuckSpainClient faqs={TUMMY_TUCK_SPAIN_FAQS} />
    </div>
  )
}
