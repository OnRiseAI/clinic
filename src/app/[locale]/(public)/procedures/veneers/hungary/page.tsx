import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { VeneersHungaryClient } from './veneers-hungary-client'
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
  title: 'Veneers in Hungary — Prices, Clinics & Packages from Budapest | MeetYourClinic',
  description:
    'Compare dental veneer prices in Hungary from £105–£565 per tooth. Browse verified Budapest clinics, porcelain and E-max options, all-inclusive packages, and free consultations.',
  alternates: {
    canonical: `/procedures/veneers/hungary`,
    languages: {
      'en-GB': `/procedures/veneers/hungary`,
    },
  },
  openGraph: {
    title: 'Veneers in Hungary — Prices, Clinics & Packages from Budapest',
    description:
      'Compare dental veneer prices in Hungary from £105–£565 per tooth. Browse verified Budapest clinics, porcelain and E-max options, all-inclusive packages.',
    url: `${SITE_URL}/procedures/veneers/hungary`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/veneers-hungary.jpg`,
        width: 1200,
        height: 630,
        alt: 'Veneers in Hungary - Compare Budapest Clinics and Prices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veneers in Hungary — Prices, Clinics & Packages from Budapest',
    description:
      'Compare dental veneer prices in Hungary from £105–£565 per tooth. Browse verified Budapest clinics.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const VENEERS_HUNGARY_FAQS = [
  {
    question: 'How much do veneers cost in Hungary?',
    answer:
      'Composite veneers cost from £105 per tooth in Hungary. Porcelain veneers range from £200–£350, and premium E-max veneers cost £250–£450 per tooth. A full set of 8 porcelain veneers typically costs £1,600–£2,800 — a saving of 40–65% compared to UK prices.',
  },
  {
    question: 'Are Hungarian dental clinics safe?',
    answer:
      "Yes. Hungary is an EU member state, so dental clinics must comply with EU medical device regulations, hygiene standards, and patient rights directives. Many dentists trained at Semmelweis University, one of Europe's oldest and most respected medical schools. Budapest has a 30+ year track record treating international dental patients.",
  },
  {
    question: 'How long does veneer treatment take in Budapest?',
    answer:
      'Porcelain and E-max veneers typically require 4–5 days across two visits to the clinic. Composite and nanoceramic veneers can often be completed in a single day using same-day digital design and fabrication technology.',
  },
  {
    question: 'Which is better for veneers — Hungary or Turkey?',
    answer:
      'Hungary offers EU regulation, shorter flights (2.5 hours from London), and 30+ years of dental tourism heritage. Turkey offers lower prices and more all-inclusive holiday-style packages. Choose Hungary if you prioritise EU consumer protections; choose Turkey for maximum savings.',
  },
  {
    question: "What's the difference between E-max and porcelain veneers?",
    answer:
      'E-max is a premium type of porcelain made from lithium disilicate ceramic. It offers higher translucency and a more natural appearance than standard porcelain, with a 15–20 year lifespan versus 10–15 years for standard porcelain. E-max typically costs £50–£100 more per tooth.',
  },
  {
    question: 'Do I need a second trip to Hungary for veneers?',
    answer:
      'Usually not. Most porcelain veneer treatments are completed in a single trip of 4–5 days. Only complex cases combining implants with veneers may require two separate visits to Budapest.',
  },
  {
    question: "What aftercare is available when I'm back in the UK?",
    answer:
      'Most Budapest clinics offer remote follow-up via photos and video calls. Some clinics have UK partner dentists for in-person checks if needed. Warranties on veneers typically range from 2–5 years depending on the clinic and material.',
  },
  {
    question: 'Do Hungarian clinics offer all-inclusive veneer packages?',
    answer:
      'Yes. Most Budapest clinics offer packages including 3–5 nights in a 4-star hotel, airport transfers, all dental work, and aftercare support. All-inclusive packages for 8 veneers start from approximately £2,500.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Veneers in Hungary — Prices, Clinics & Packages from Budapest',
  description:
    'Compare dental veneer prices in Hungary from verified Budapest clinics. Porcelain, E-max, and composite options with all-inclusive packages.',
  url: `${SITE_URL}/procedures/veneers/hungary`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Dental Veneer',
    procedureType: 'https://schema.org/TherapeuticProcedure',
    bodyLocation: 'Teeth',
    howPerformed:
      'Thin shells of porcelain or composite resin are bonded to the front surface of teeth to improve appearance. Treatment typically involves tooth preparation, impression-taking, lab fabrication, and bonding over 4–5 days.',
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

interface VeneersHungaryPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function VeneersHungaryPage({ params }: VeneersHungaryPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Dental', url: '/dental' },
    { name: 'Veneers', url: '/procedures/veneers' },
    { name: 'Hungary' },
  ])

  const faqSchema = generateFAQSchema(VENEERS_HUNGARY_FAQS)

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
            { name: 'Hungary' },
          ]}
        />
      </div>

      <VeneersHungaryClient faqs={VENEERS_HUNGARY_FAQS} />
    </div>
  )
}
