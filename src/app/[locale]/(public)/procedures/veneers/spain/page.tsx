import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { VeneersSpainClient } from './veneers-spain-client'
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
  title: 'Veneers in Spain — Prices, Clinics & Packages from Barcelona | MeetYourClinic',
  description:
    'Compare dental veneer prices in Spain from £250 per tooth. Browse JCI-accredited Barcelona clinics, porcelain and E-max options, smile makeover packages, and free consultations.',
  alternates: {
    canonical: `/procedures/veneers/spain`,
    languages: {
      'en-GB': `/procedures/veneers/spain`,
    },
  },
  openGraph: {
    title: 'Veneers in Spain — Prices, Clinics & Packages from Barcelona',
    description:
      'Compare dental veneer prices in Spain from £250 per tooth. Browse JCI-accredited Barcelona clinics, porcelain and E-max options, smile makeover packages.',
    url: `${SITE_URL}/procedures/veneers/spain`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/veneers-spain.jpg`,
        width: 1200,
        height: 630,
        alt: 'Veneers in Spain - Compare Barcelona Clinics and Prices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veneers in Spain — Prices, Clinics & Packages from Barcelona',
    description:
      'Compare dental veneer prices in Spain from £250 per tooth. Browse JCI-accredited Barcelona clinics.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const VENEERS_SPAIN_FAQS = [
  {
    question: 'How much do veneers cost in Spain?',
    answer:
      'Composite veneers in Spain cost from £250 per tooth, porcelain veneers £450–£700, and E-max veneers £600–£850 per tooth. A full set of 8 porcelain veneers starts from £3,600. This represents savings of 40–45% compared to UK prices.',
  },
  {
    question: 'Are Spanish dental clinics safe for veneers?',
    answer:
      "Yes. Spain is an EU member state with strict healthcare regulation. Centro Médico Teknon in Barcelona holds JCI accreditation — the global gold standard for international healthcare — and was named in Newsweek's \"World's Best Hospitals 2021.\" Spanish dentists hold 5-year EU degrees and must be registered with the Spanish Dental Association.",
  },
  {
    question: 'How long does veneer treatment take in Spain?',
    answer:
      'Porcelain and E-max veneers typically require 4–5 days in one trip: Day 1 for preparation and temporaries, Days 2–3 for fabrication while you enjoy Barcelona, and Days 4–5 for fitting and bonding. Composite veneers can be completed in 1–2 days.',
  },
  {
    question: 'Is Spain more expensive than Turkey for veneers?',
    answer:
      'Yes, significantly. Porcelain veneers cost £450–£700 in Spain vs £130–£350 in Turkey per tooth. However, Spain offers JCI hospital accreditation, 2-hour flights from London, full EU regulation, Euro currency, and the best recovery environment. The premium reflects proximity, infrastructure quality, and regulatory standards.',
  },
  {
    question: 'Why choose Spain over Hungary or Poland for veneers?',
    answer:
      'Spain offers the shortest flight from the UK (2 hours vs 2.5 hours), JCI hospital accreditation (rare for dental tourism), Euro currency (no conversion needed), and the Mediterranean as your recovery backdrop. Hungary and Poland offer greater savings but with longer travel and currency conversion.',
  },
  {
    question: 'Can I combine veneers with a holiday in Barcelona?',
    answer:
      'Absolutely. The 4–5 day treatment timeline fits perfectly with a short Barcelona break. You will have 2–3 days of downtime between preparation and fitting to explore the city — Sagrada Família, Las Ramblas, Gothic Quarter, and Barceloneta beach are all within easy reach.',
  },
  {
    question: "What aftercare is available when I'm back in the UK?",
    answer:
      'Barcelona clinics offer remote follow-up via photos and video calls. 24/7 patient support is common at international clinics. Warranties on veneers vary by clinic and material, typically ranging from 5–10 years for porcelain and E-max.',
  },
  {
    question: 'Do Spanish clinics use the same materials as UK dentists?',
    answer:
      'Yes. Top Spanish clinics use E-max (Ivoclar Vivadent), premium porcelain, and zirconia — identical materials to UK private practices. Always confirm which materials are included in your quote.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Veneers in Spain — Prices, Clinics & Packages from Barcelona',
  description:
    'Compare dental veneer prices in Spain from JCI-accredited Barcelona clinics. Prices, procedure details, and UK patient reviews.',
  url: `${SITE_URL}/procedures/veneers/spain`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Dental Veneer',
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Teeth',
    howPerformed:
      'Thin shells of porcelain or composite material are bonded to the front surface of teeth to improve appearance. Tooth preparation involves minimal enamel removal, followed by impressions and custom fabrication.',
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

interface VeneersSpainPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function VeneersSpainPage({
  params,
}: VeneersSpainPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Dental', url: '/dental' },
    { name: 'Veneers', url: '/procedures/veneers' },
    { name: 'Spain' },
  ])

  const faqSchema = generateFAQSchema(VENEERS_SPAIN_FAQS)

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
            { name: 'Dental', url: '/dental' },
            { name: 'Veneers', url: '/procedures/veneers' },
            { name: 'Spain' },
          ]}
        />
      </div>

      <VeneersSpainClient faqs={VENEERS_SPAIN_FAQS} />
    </div>
  )
}
