import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { DentalImplantsClient } from './dental-implants-client'
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
  title: 'Dental Implants Abroad — Compare Prices by Country & Clinic | medit',
  description:
    'Compare dental implant prices abroad from £300 per implant. Turkey, Hungary, Poland, Spain — see real prices, browse verified clinics, and get free quotes from top-rated destinations.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/dental-implants`,
    languages: {
      'en-GB': `${SITE_URL}/en/procedures/dental-implants`,
    },
  },
  openGraph: {
    title: 'Dental Implants Abroad — Compare Prices by Country & Clinic',
    description:
      'Compare dental implant prices abroad from £300 per implant. Turkey, Hungary, Poland, Spain — see real prices, browse verified clinics, and get free quotes.',
    url: `${SITE_URL}/procedures/dental-implants`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/dental-implants-abroad.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dental Implants Abroad - Compare Prices and Clinics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dental Implants Abroad — Compare Prices by Country & Clinic',
    description:
      'Compare dental implant prices abroad from £300 per implant. Turkey, Hungary, Poland, Spain — see real prices.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const DENTAL_IMPLANTS_ABROAD_FAQS = [
  {
    question: 'How much do dental implants cost abroad?',
    answer:
      'A single dental implant costs £300–£800 abroad compared to £2,000–£2,500 in the UK. All-on-4 full arch implants cost £2,500–£5,500 abroad versus £8,000–£15,000 in the UK. Turkey offers the lowest prices, while Hungary and Poland provide EU-regulated alternatives at competitive rates.',
  },
  {
    question: 'Which country is best for dental implants?',
    answer:
      'Turkey offers the lowest prices and highest volume of dental implant procedures. Hungary has 30+ years of dental tourism heritage with EU regulation. Poland provides EU standards with shorter flights. Spain combines EU protections with a familiar holiday destination. The best choice depends on your priorities: savings, proximity, or regulatory standards.',
  },
  {
    question: 'Are dental implants abroad safe?',
    answer:
      'Yes, at accredited clinics using premium implant brands. Top international clinics use the same implants (Straumann, Nobel Biocare, Osstem) as UK practices and hold JCI or ISO accreditation. Always verify clinic credentials, check independent reviews, and confirm which implant brand will be used.',
  },
  {
    question: 'How many trips do I need for dental implants abroad?',
    answer:
      'Traditional implants require two trips: 5–7 days for implant placement, then return in 3–6 months for crown fitting. Same-day (immediate load) implants and All-on-4 can sometimes be completed in a single trip of 7–10 days, though this depends on bone quality and clinical assessment.',
  },
  {
    question: 'What implant brands do clinics abroad use?',
    answer:
      'Reputable clinics use premium brands including Straumann (Swiss), Nobel Biocare (Swedish), Osstem (Korean), and MegaGen (Korean). Budget clinics may use lesser-known brands. Always ask which brand will be used and verify it has a strong clinical track record. Avoid clinics that cannot specify the implant brand.',
  },
  {
    question: 'What is All-on-4 and is it available abroad?',
    answer:
      'All-on-4 is a full arch restoration using just 4 implants to support a complete set of fixed teeth. It is widely available abroad, particularly in Turkey and Hungary, at 60–70% less than UK prices. The procedure can often be completed in a single trip with immediate temporary teeth.',
  },
  {
    question: 'What happens if my implant fails after I return home?',
    answer:
      'Reputable clinics offer 5–10 year warranties on implants. Most provide remote follow-up via X-rays and video calls. Some clinics have UK partner dentists for in-person checks. Implant failure rates at quality clinics are comparable to the UK (2–5%). Clarify warranty and aftercare arrangements before booking.',
  },
  {
    question: 'Do I need a bone graft for dental implants?',
    answer:
      'Not always. Bone grafting is needed when there is insufficient bone to support the implant, often due to long-term tooth loss. Many clinics abroad offer bone grafting at £150–£400 compared to £400–£800 in the UK. Your dentist will assess bone quality via CT scan before confirming your treatment plan.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Dental Implants Abroad — Compare Prices by Country & Clinic',
  description:
    'Compare dental implant prices abroad from £300 per implant. Multi-destination comparison across Turkey, Hungary, Poland, and Spain.',
  url: `${SITE_URL}/procedures/dental-implants`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Dental Implant',
    alternateName: ['Tooth Implant', 'Dental Implant Surgery'],
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Jaw',
    howPerformed:
      'A titanium post is surgically placed into the jawbone to replace a missing tooth root. After osseointegration (3–6 months), an abutment and crown are attached. Full arch solutions like All-on-4 use 4–6 implants to support a complete set of teeth.',
  },
  audience: {
    '@type': 'MedicalAudience',
    audienceType: 'Patient',
    geographicArea: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
  },
  lastReviewed: '2025-02-03',
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

interface DentalImplantsPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function DentalImplantsPage({ params }: DentalImplantsPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Dental', url: '/dental' },
    { name: 'Dental Implants' },
  ])

  const faqSchema = generateFAQSchema(DENTAL_IMPLANTS_ABROAD_FAQS)

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
            { name: 'Dental Implants' },
          ]}
        />
      </div>

      <DentalImplantsClient faqs={DENTAL_IMPLANTS_ABROAD_FAQS} />
    </div>
  )
}
