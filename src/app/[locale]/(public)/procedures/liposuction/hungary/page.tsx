import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { LiposuctionHungaryClient } from './liposuction-hungary-client'
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
  title: 'Liposuction in Hungary — Prices from £1,165, Budapest Clinics & EU Quality | medit',
  description:
    'Compare liposuction prices in Hungary from £1,165 per area — the lowest in the EU. Budapest clinics with ISO 9001 accreditation, EU-regulated surgeons, and full aftercare. Free quotes.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/liposuction/hungary`,
    languages: {
      'en-GB': `${SITE_URL}/en/procedures/liposuction/hungary`,
    },
  },
  openGraph: {
    title: 'Liposuction in Hungary — Prices from £1,165, Budapest Clinics & EU Quality',
    description:
      'Compare liposuction prices in Hungary from £1,165 per area — the lowest in the EU. Budapest clinics with ISO 9001 accreditation.',
    url: `${SITE_URL}/procedures/liposuction/hungary`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/liposuction-hungary.jpg`,
        width: 1200,
        height: 630,
        alt: 'Liposuction in Hungary - Compare Clinics in Budapest',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liposuction in Hungary — Prices from £1,165, Budapest Clinics & EU Quality',
    description:
      'Compare liposuction prices in Hungary from £1,165 — the lowest in the EU. ISO 9001 accredited clinics.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const LIPOSUCTION_HUNGARY_FAQS = [
  {
    question: 'How much does liposuction cost in Hungary?',
    answer:
      "From £1,165 per area — the lowest starting price in the EU. Two areas from £1,900. VASER from £1,500. Multi-area discounts reduce per-area cost by 30–40%.",
  },
  {
    question: 'Is liposuction in Hungary safe?',
    answer:
      "Yes. Hungary is an EU member state with full EU healthcare regulation. Clinics hold ISO 9001 certification and MPHEST accreditation. Surgeons are registered with the Hungarian Medical Chamber (MOK). Success rates: 85–90%.",
  },
  {
    question: 'Why is liposuction so cheap in Hungary?',
    answer:
      "Lower cost of living reduces clinic overheads (staff, facilities, rent). The concentration of 60 clinics in Budapest creates price competition. Surgeons are equally qualified — many trained in Germany, Austria, or the UK — but operating costs are a fraction of Western Europe.",
  },
  {
    question: 'How long should I stay in Budapest after liposuction?',
    answer:
      "Recommended 7 days. This allows for surgery, two follow-up appointments, and fit-to-fly clearance. The 2.5-hour flight to London is well-tolerated from day 5–7.",
  },
  {
    question: 'Do Budapest clinics offer VASER liposuction?',
    answer:
      "Yes. Several Budapest clinics offer VASER alongside traditional and laser techniques. VASER pricing in Hungary (from £1,500/area) is significantly cheaper than UK VASER rates (£4,700–£11,200).",
  },
  {
    question: 'Are Hungarian surgeons qualified?',
    answer:
      "Hungarian plastic surgeons complete a minimum 6-year medical degree plus 5–6 years of specialist training. They must be registered with MOK and typically hold MPHEST membership. Many have international training credentials including EBOPRAS certification.",
  },
  {
    question: 'Can I use my EHIC/GHIC card for liposuction in Hungary?',
    answer:
      "No. The European Health Insurance Card covers emergency and medically necessary treatment at public hospitals, not elective cosmetic surgery at private clinics. You'll need separate travel insurance that covers medical tourism.",
  },
  {
    question: 'What currency is used and can I pay in GBP?',
    answer:
      "Hungary uses the Hungarian Forint (HUF), but most clinics quote in Euros and accept Euros directly. Some also accept GBP. Credit/debit card payments are standard.",
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Liposuction in Hungary — Prices, Budapest Clinics & EU Quality',
  description:
    'Compare liposuction prices in Hungary from ISO 9001 accredited clinics in Budapest. EU-regulated surgeons and the lowest prices in the European Union.',
  url: `${SITE_URL}/procedures/liposuction/hungary`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Liposuction',
    alternateName: ['Lipoplasty', 'VASER Liposuction'],
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Multiple body areas including abdomen, flanks, thighs, arms, chin',
    howPerformed:
      'Liposuction removes stubborn fat deposits using a thin cannula and suction. Techniques available in Hungary include traditional tumescent, VASER, and laser lipolysis.',
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

interface LiposuctionHungaryPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function LiposuctionHungaryPage({
  params,
}: LiposuctionHungaryPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Liposuction', url: '/procedures/liposuction' },
    { name: 'Hungary' },
  ])

  const faqSchema = generateFAQSchema(LIPOSUCTION_HUNGARY_FAQS)

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
            { name: 'Liposuction', url: '/procedures/liposuction' },
            { name: 'Hungary' },
          ]}
        />
      </div>

      <LiposuctionHungaryClient faqs={LIPOSUCTION_HUNGARY_FAQS} />
    </div>
  )
}
