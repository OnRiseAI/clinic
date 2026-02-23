import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { VeneersTurkeyClient } from './veneers-turkey-client'
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
  title: 'Veneers in Turkey — 2026 Prices, Clinics & UK Patient Guide | MeetYourClinic',
  description:
    'Compare veneer prices in Turkey from verified clinics. E-max porcelain veneers from £200 per tooth, full sets from £2,400. Read UK patient reviews, compare materials, and get a free quote.',
  alternates: {
    canonical: `/procedures/veneers/turkey`,
    languages: {
      'en-GB': `/procedures/veneers/turkey`,
    },
  },
  openGraph: {
    title: 'Veneers in Turkey — 2026 Prices, Clinics & UK Patient Guide',
    description:
      'Compare veneer prices in Turkey from verified clinics. E-max porcelain veneers from £200 per tooth, full sets from £2,400. Read UK patient reviews, compare materials, and get a free quote.',
    url: `${SITE_URL}/procedures/veneers/turkey`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/veneers-turkey.jpg`,
        width: 1200,
        height: 630,
        alt: 'Veneers in Turkey - Compare Clinics and Prices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veneers in Turkey — 2026 Prices, Clinics & UK Patient Guide',
    description:
      'Compare veneer prices in Turkey from verified clinics. E-max porcelain veneers from £200 per tooth, full sets from £2,400.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const VENEERS_TURKEY_FAQS = [
  {
    question: 'How much do veneers cost in Turkey?',
    answer:
      'E-max porcelain veneers cost £200–£350 per tooth in Turkey. Composite veneers cost £100–£250 per tooth. A full set of 16–20 porcelain veneers typically costs £3,200–£7,000. Prices are usually all-inclusive, covering consultation, digital smile design, preparation, temporary and permanent veneers, and follow-up appointments.',
  },
  {
    question: 'Are veneers in Turkey safe?',
    answer:
      'Yes, veneers in Turkey are safe at accredited clinics using certified materials. Check for JCI or AACI accreditation and ask which veneer brand is used (e.g., IPS e.max by Ivoclar Vivadent). Thousands of UK patients get safe, successful results every year.',
  },
  {
    question: 'How long do veneers from Turkey last?',
    answer:
      'E-max porcelain veneers last 10–15 years. Zirconia veneers last 15–20 years. Composite veneers last 5–7 years. Longevity depends on material quality, oral hygiene, and avoiding habits like teeth grinding.',
  },
  {
    question: 'How many days do you need in Turkey for veneers?',
    answer:
      'Porcelain veneers require 5–7 days in Turkey. Composite veneers can be completed in 2–3 days. Unlike dental implants which require two separate trips, veneers are completed in a single visit.',
  },
  {
    question: 'Do veneers damage your teeth?',
    answer:
      'Tooth preparation for porcelain veneers involves removing a thin layer of enamel (0.3–0.7mm), which is irreversible. Composite veneers and Lumineers require minimal or no preparation. Discuss the level of preparation with your dentist beforehand.',
  },
  {
    question: 'What is the difference between E-max and composite veneers?',
    answer:
      'E-max is a porcelain ceramic — more natural-looking, stain-resistant, and durable (10–15 years) but requires tooth preparation and lab fabrication. Composite is applied directly, costs less, and lasts 5–7 years but stains more easily over time.',
  },
  {
    question: 'What are "Turkey teeth" and how do I avoid them?',
    answer:
      '"Turkey teeth" refers to an overly white, artificial-looking veneer result — usually from aggressive preparation and poor shade selection. Avoid this by choosing an accredited clinic with digital smile design, discussing shade carefully, and reviewing a wide range of before/after photos.',
  },
  {
    question: 'Can I get veneers on just my front teeth?',
    answer:
      'Yes, many patients choose veneers only on the upper front 6–8 teeth (the "social six" or "social eight"). This reduces cost and treatment time while still transforming your smile visibly.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Veneers in Turkey — 2026 Prices, Clinics & UK Patient Guide',
  description:
    'Compare veneer prices in Turkey from verified clinics. Prices, material comparisons, and UK patient reviews.',
  url: `${SITE_URL}/procedures/veneers/turkey`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Dental Veneer',
    procedureType: 'https://schema.org/TherapeuticProcedure',
    bodyLocation: 'Teeth',
    howPerformed:
      'Thin shells of porcelain or composite resin are bonded to the front surface of teeth to improve appearance. Tooth preparation involves removing 0.3–0.7mm of enamel for porcelain veneers, followed by impression-taking, lab fabrication, and bonding.',
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

interface VeneersTurkeyPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function VeneersTurkeyPage({ params }: VeneersTurkeyPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  // Generate structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Dental', url: '/dental' },
    { name: 'Veneers', url: '/procedures/veneers' },
    { name: 'Turkey' },
  ])

  const faqSchema = generateFAQSchema(VENEERS_TURKEY_FAQS)

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
            { name: 'Turkey' },
          ]}
        />
      </div>

      <VeneersTurkeyClient faqs={VENEERS_TURKEY_FAQS} />
    </div>
  )
}
