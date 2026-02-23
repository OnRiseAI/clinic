import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { TummyTuckClient } from './tummy-tuck-client'
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
  title: 'Tummy Tuck Abroad — Compare Prices by Country & Clinic | MeetYourClinic',
  description:
    'Compare tummy tuck prices abroad from £1,750. Turkey, Hungary, Poland, Spain — see real prices, recovery timelines, verified surgeons, and get free quotes from accredited clinics.',
  alternates: {
    canonical: `/procedures/tummy-tuck`,
    languages: {
      'en-GB': `/procedures/tummy-tuck`,
    },
  },
  openGraph: {
    title: 'Tummy Tuck Abroad — Compare Prices by Country & Clinic',
    description:
      'Compare tummy tuck prices abroad from £1,750. Turkey, Hungary, Poland, Spain — see real prices, recovery timelines, verified surgeons.',
    url: `${SITE_URL}/procedures/tummy-tuck`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/tummy-tuck-abroad.jpg`,
        width: 1200,
        height: 630,
        alt: 'Tummy Tuck Abroad - Compare Prices Across 4 Destinations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tummy Tuck Abroad — Compare Prices by Country & Clinic',
    description:
      'Compare tummy tuck prices abroad from £1,750. Turkey, Hungary, Poland, Spain — verified surgeons and accredited clinics.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const TUMMY_TUCK_FAQS = [
  {
    question: 'How much does a tummy tuck cost abroad?',
    answer:
      'Standard abdominoplasty costs from £1,750 in Hungary to £7,000 in Spain. Turkey averages £2,900–£4,200. All-inclusive packages typically include surgery, hospital stay, hotel accommodation, and airport transfers.',
  },
  {
    question: 'Is it safe to get a tummy tuck abroad?',
    answer:
      'Yes, when you choose accredited clinics and board-certified surgeons. Look for JCI, ISO 9001, or equivalent national accreditation. Complication rates at top international clinics are comparable to UK private hospitals when proper due diligence is followed.',
  },
  {
    question: 'How long do I need to stay abroad after a tummy tuck?',
    answer:
      'Most patients need 7–10 days in their destination. Hospital stay is typically 1–2 nights, with follow-up appointments on days 3–5 and 7. Fit-to-fly clearance is usually given on day 6–9, with day 7 being the median.',
  },
  {
    question: 'Can I fly after a tummy tuck?',
    answer:
      'Most surgeons clear patients to fly after 7 days. Short-haul flights of 2–4 hours are preferred. Wear compression stockings, stay hydrated, and walk in the aisle periodically. Long-haul flights may require waiting 10–14 days.',
  },
  {
    question: 'Which is the best country for a tummy tuck abroad?',
    answer:
      'Turkey offers the most competitive prices and largest clinic selection. Hungary has the lowest starting prices in Europe. Poland and Spain offer EU-regulated options with strong medical infrastructure. The best choice depends on your priorities — budget, proximity, or premium quality.',
  },
  {
    question: "What's the difference between a tummy tuck and liposuction?",
    answer:
      'Liposuction removes fat but not excess skin. A tummy tuck removes excess skin AND tightens abdominal muscles. Many patients combine both — liposuction to contour flanks and waist, tummy tuck to address loose skin and muscle separation.',
  },
  {
    question: 'Can I combine a tummy tuck with other procedures?',
    answer:
      "Yes. Common combinations include tummy tuck with liposuction (most popular), tummy tuck with breast lift or augmentation (known as a 'mummy makeover'), and tummy tuck with BBL. Combining procedures can reduce overall cost and recovery time compared to separate surgeries.",
  },
  {
    question: 'Will I have a visible scar after a tummy tuck?',
    answer:
      'All tummy tucks leave a scar. Full abdominoplasty scars run hip-to-hip below the bikini line and around the navel. Mini tummy tuck scars are shorter. Scars fade significantly over 12–18 months. Most surgeons place incisions to be hidden by underwear or swimwear.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Tummy Tuck Abroad — Compare Prices by Country & Clinic',
  description:
    'Compare tummy tuck (abdominoplasty) prices abroad from accredited clinics in Turkey, Hungary, Poland, and Spain. Procedure details, recovery timelines, and surgeon selection guidance.',
  url: `${SITE_URL}/procedures/tummy-tuck`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Abdominoplasty',
    alternateName: 'Tummy Tuck',
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Abdomen',
    howPerformed:
      'Abdominoplasty removes excess skin and fat from the abdominal area, tightens weakened or separated abdominal muscles (diastasis recti), and creates a flatter, firmer profile. The procedure involves a hip-to-hip incision below the bikini line.',
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

interface TummyTuckPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function TummyTuckPage({ params }: TummyTuckPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Tummy Tuck' },
  ])

  const faqSchema = generateFAQSchema(TUMMY_TUCK_FAQS)

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
            { name: 'Tummy Tuck' },
          ]}
        />
      </div>

      <TummyTuckClient faqs={TUMMY_TUCK_FAQS} />
    </div>
  )
}
