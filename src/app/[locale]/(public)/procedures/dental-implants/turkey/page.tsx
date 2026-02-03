import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { DentalImplantsTurkeyClient } from './dental-implants-turkey-client'
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
  title: 'Dental Implants in Turkey — 2026 Prices, Clinics & UK Patient Guide | medit',
  description:
    'Compare dental implant prices in Turkey from verified clinics. Single implants from £300, full-mouth from £1,600. Read UK patient reviews, check clinic accreditations, and get a free quote.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/dental-implants/turkey`,
    languages: {
      'en-GB': `${SITE_URL}/en/procedures/dental-implants/turkey`,
    },
  },
  openGraph: {
    title: 'Dental Implants in Turkey — 2026 Prices, Clinics & UK Patient Guide',
    description:
      'Compare dental implant prices in Turkey from verified clinics. Single implants from £300, full-mouth from £1,600. Read UK patient reviews, check clinic accreditations, and get a free quote.',
    url: `${SITE_URL}/procedures/dental-implants/turkey`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/dental-implants-turkey.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dental Implants in Turkey - Compare Clinics and Prices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dental Implants in Turkey — 2026 Prices, Clinics & UK Patient Guide',
    description:
      'Compare dental implant prices in Turkey from verified clinics. Single implants from £300, full-mouth from £1,600.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const DENTAL_IMPLANTS_TURKEY_FAQS = [
  {
    question: 'How much do dental implants cost in Turkey?',
    answer:
      'A single dental implant in Turkey costs between £300 and £800 including the crown. All-on-4 full-arch implants start from £1,600 per arch, and full-mouth restoration (both arches) costs £4,000–£8,000. Prices are typically all-inclusive, covering consultation, 3D imaging, the implant, abutment, crown, and follow-up appointments.',
  },
  {
    question: 'Are dental implants in Turkey safe?',
    answer:
      'Yes, dental implants in Turkey are safe when you choose an accredited clinic. Top clinics hold JCI or AACI accreditation and use internationally certified implant brands like Straumann and Nobel Biocare. The success rate at accredited Turkish clinics is comparable to the UK at 95–97%.',
  },
  {
    question: 'How long do dental implants from Turkey last?',
    answer:
      'Dental implant posts can last a lifetime with proper care and good oral hygiene. The crowns typically last 10–15 years before needing replacement. Premium implant brands used at accredited Turkish clinics have success rates exceeding 97% over 10 years.',
  },
  {
    question: 'Do I need two trips to Turkey for dental implants?',
    answer:
      'Usually yes. The first visit (3–7 days) covers assessment, imaging, and implant placement. After a healing period of 3–6 months for osseointegration, a second visit (3–5 days) is needed for permanent crown or bridge fitting. Some clinics offer same-day implant solutions where temporary teeth are placed immediately after surgery.',
  },
  {
    question: 'What implant brands do Turkish clinics use?',
    answer:
      'Top Turkish clinics use internationally recognised implant brands including Straumann (Switzerland), Nobel Biocare (Sweden), Astra Tech, Osstem, and Alpha Bio. Always ask which brand is included in your quote, as premium brands have the strongest clinical evidence and longest track records.',
  },
  {
    question: 'Is dental treatment in Turkey covered by insurance?',
    answer:
      'Dental implants in Turkey are generally not covered by NHS or standard UK health insurance as they are considered elective procedures. Some private dental insurance policies may contribute towards the cost. You should also purchase specialist travel insurance that covers medical treatment abroad.',
  },
  {
    question: 'What if something goes wrong after I return to the UK?',
    answer:
      'Reputable Turkish clinics have clear complication protocols and may cover the cost of return visits for issues related to their work. Many clinics partner with UK dentists for local follow-up care. Your UK dentist can manage routine aftercare and monitor healing.',
  },
  {
    question: 'Dental implants in Turkey vs the UK — which is better?',
    answer:
      'Turkey offers significant cost savings (60–75%) with comparable quality at accredited clinics using the same premium implant brands. The UK offers convenience and local aftercare. The right choice depends on your budget, comfort level with travel, and the complexity of your treatment needs.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Dental Implants in Turkey — 2026 Prices, Clinics & UK Patient Guide',
  description:
    'Compare dental implant prices in Turkey from verified clinics. Prices, procedure details, and UK patient reviews.',
  url: `${SITE_URL}/procedures/dental-implants/turkey`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Dental Implant',
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Jaw',
    howPerformed:
      'A titanium post is surgically placed into the jawbone to replace a missing tooth root. After osseointegration (3–6 months), a permanent crown is fitted.',
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

interface DentalImplantsTurkeyPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function DentalImplantsTurkeyPage({
  params,
}: DentalImplantsTurkeyPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  // Generate structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Dental', url: '/dental' },
    { name: 'Dental Implants', url: '/procedures/dental-implants' },
    { name: 'Turkey' },
  ])

  const faqSchema = generateFAQSchema(DENTAL_IMPLANTS_TURKEY_FAQS)

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
            { name: 'Dental Implants', url: '/procedures/dental-implants' },
            { name: 'Turkey' },
          ]}
        />
      </div>

      <DentalImplantsTurkeyClient faqs={DENTAL_IMPLANTS_TURKEY_FAQS} />
    </div>
  )
}
