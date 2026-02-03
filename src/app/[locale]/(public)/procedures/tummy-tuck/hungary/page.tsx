import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { TummyTuckHungaryClient } from './tummy-tuck-hungary-client'
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
  title: 'Tummy Tuck in Hungary — Prices from £1,750, Budapest Clinics & Packages | medit',
  description:
    'Compare tummy tuck prices in Hungary from £1,750 — the lowest in Europe. Browse verified Budapest clinics, EU-regulated surgeons, all-inclusive packages, and get free consultations.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/tummy-tuck/hungary`,
    languages: {
      'en-GB': `${SITE_URL}/en/procedures/tummy-tuck/hungary`,
    },
  },
  openGraph: {
    title: 'Tummy Tuck in Hungary — Prices from £1,750, Budapest Clinics & Packages',
    description:
      'Compare tummy tuck prices in Hungary from £1,750 — the lowest in Europe. Browse verified Budapest clinics, EU-regulated surgeons.',
    url: `${SITE_URL}/procedures/tummy-tuck/hungary`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/tummy-tuck-hungary.jpg`,
        width: 1200,
        height: 630,
        alt: 'Tummy Tuck in Hungary - Compare Budapest Clinics and Prices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tummy Tuck in Hungary — Prices from £1,750, Budapest Clinics & Packages',
    description:
      'Compare tummy tuck prices in Hungary from £1,750 — the lowest in Europe. EU-regulated Budapest clinics.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const TUMMY_TUCK_HUNGARY_FAQS = [
  {
    question: 'How much does a tummy tuck cost in Hungary?',
    answer:
      'Standard abdominoplasty costs from £1,750 — the lowest starting price in Europe. Tummy tuck with liposuction starts from £3,200. All-inclusive packages with hotel accommodation and airport transfers are available at most Budapest clinics.',
  },
  {
    question: 'Are Hungarian clinics safe for tummy tuck surgery?',
    answer:
      'Yes. Hungary is a full EU member state — clinics must comply with EU medical device regulations and safety standards. Leading Budapest clinics hold ISO 9001 certification. Published complication rates are as low as 3.1% at top facilities.',
  },
  {
    question: 'How long should I stay in Budapest after a tummy tuck?',
    answer:
      'The minimum recommended stay is 7–10 days. Some clinics recommend 15 days for optimal monitoring, particularly for extended procedures or patients with higher BMI. Hospital stay is typically 1–2 nights, with follow-up appointments through day 7.',
  },
  {
    question: 'Why is tummy tuck so cheap in Hungary?',
    answer:
      'Lower operating costs and cost of living — not lower quality. Hungarian surgeons are trained to EU standards, many holding international certifications from institutions like Semmelweis University. The cost advantage is structural, not quality-related.',
  },
  {
    question: 'Is Hungary cheaper than Turkey for a tummy tuck?',
    answer:
      "Hungary's starting prices are lower (from £1,750 vs Turkey's £2,900). However, Turkey's all-inclusive packages often include more services such as longer hotel stays and VIP transfers. Total out-of-pocket cost may be similar depending on what's included.",
  },
  {
    question: 'Do Budapest surgeons speak English?',
    answer:
      'At clinics treating international patients, yes. Most surgeons speak English or consult through English-speaking coordinators. All recommended clinics on medit have English-speaking teams to support UK patients throughout their stay.',
  },
  {
    question: 'What qualifications should I look for in a Hungarian plastic surgeon?',
    answer:
      'Look for Hungarian Medical Chamber registration, European Board certification (EBOPRAS), ISAPS membership, and ISO 9001 clinic certification. Training at Semmelweis University — one of Europe\'s oldest medical schools — is a strong credential.',
  },
  {
    question: 'Can I combine a tummy tuck with other procedures in Hungary?',
    answer:
      "Yes. Common combinations include tummy tuck with liposuction, and tummy tuck with breast surgery (known as a 'mummy makeover'). Combining procedures saves on travel and accommodation costs while reducing total recovery time.",
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Tummy Tuck in Hungary — Prices, Clinics & Packages',
  description:
    'Compare tummy tuck prices in Hungary from verified Budapest clinics. The lowest abdominoplasty prices in Europe with EU regulation.',
  url: `${SITE_URL}/procedures/tummy-tuck/hungary`,
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

interface TummyTuckHungaryPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function TummyTuckHungaryPage({
  params,
}: TummyTuckHungaryPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Tummy Tuck', url: '/procedures/tummy-tuck' },
    { name: 'Hungary' },
  ])

  const faqSchema = generateFAQSchema(TUMMY_TUCK_HUNGARY_FAQS)

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
            { name: 'Hungary' },
          ]}
        />
      </div>

      <TummyTuckHungaryClient faqs={TUMMY_TUCK_HUNGARY_FAQS} />
    </div>
  )
}
