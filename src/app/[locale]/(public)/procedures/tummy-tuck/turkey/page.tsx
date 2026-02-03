import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { TummyTuckTurkeyClient } from './tummy-tuck-turkey-client'
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
  title: 'Tummy Tuck in Turkey — Prices from £2,900, Top Clinics & Packages | medit',
  description:
    'Compare tummy tuck prices in Turkey from £2,900 all-inclusive. Browse JCI-accredited Istanbul and Antalya clinics, real before/after results, recovery timelines, and free consultations.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/tummy-tuck/turkey`,
    languages: {
      'en-GB': `${SITE_URL}/en/procedures/tummy-tuck/turkey`,
    },
  },
  openGraph: {
    title: 'Tummy Tuck in Turkey — Prices from £2,900, Top Clinics & Packages',
    description:
      'Compare tummy tuck prices in Turkey from £2,900 all-inclusive. Browse JCI-accredited Istanbul and Antalya clinics, real before/after results.',
    url: `${SITE_URL}/procedures/tummy-tuck/turkey`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/tummy-tuck-turkey.jpg`,
        width: 1200,
        height: 630,
        alt: 'Tummy Tuck in Turkey - Compare Istanbul and Antalya Clinics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tummy Tuck in Turkey — Prices from £2,900, Top Clinics & Packages',
    description:
      'Compare tummy tuck prices in Turkey from £2,900 all-inclusive. JCI-accredited Istanbul and Antalya clinics.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const TUMMY_TUCK_TURKEY_FAQS = [
  {
    question: 'How much does a tummy tuck cost in Turkey?',
    answer:
      'Standard abdominoplasty costs £2,900–£4,200 all-inclusive. Mini tummy tuck starts from £2,500, and extended tummy tuck from £3,800. All-inclusive packages include surgery, hospital stay (1–2 nights), hotel accommodation (5–7 nights), transfers, and aftercare.',
  },
  {
    question: 'Are tummy tuck clinics in Turkey safe?',
    answer:
      'Yes. Turkey has more JCI-accredited hospitals than any country outside the US. Top hospital groups including Acıbadem, Memorial, and Medicana meet international safety standards. Turkey performs over 45,000 abdominoplasties annually, giving surgeons extensive experience.',
  },
  {
    question: 'How long should I stay in Turkey after a tummy tuck?',
    answer:
      'The recommended stay is 7–10 days. Most clinics design 8-day packages as standard. Hospital stay is 1–2 nights, with follow-up appointments on days 3–5 and 7. Fit-to-fly clearance is typically given on day 7.',
  },
  {
    question: 'Can I combine a tummy tuck with liposuction in Turkey?',
    answer:
      'Yes, this is the most popular combination procedure. Tummy tuck with liposuction packages start from £3,500. Adding liposuction may extend your recovery and stay by 1–2 days.',
  },
  {
    question: "What's included in a Turkish tummy tuck package?",
    answer:
      "Standard all-inclusive packages include: surgeon's fee, general anaesthesia, hospital stay (1–2 nights), hotel accommodation (5–7 nights at 4–5 star hotels), VIP airport and clinic transfers, compression garment, medications, and post-operative follow-up appointments.",
  },
  {
    question: 'Which city in Turkey is best for tummy tuck surgery?',
    answer:
      'Istanbul offers the widest choice of JCI-accredited hospitals and experienced surgeons — recommended for first-time patients prioritising safety. Antalya offers slightly lower prices and a beach/resort recovery setting for those wanting to combine treatment with a holiday.',
  },
  {
    question: 'Do Turkish surgeons speak English?',
    answer:
      'At international-facing clinics, surgeons typically speak English or consult through an English-speaking assistant. All major clinics provide dedicated English-speaking patient coordinators who support you throughout your entire stay.',
  },
  {
    question: "What if there's a complication after I return to the UK?",
    answer:
      'Reputable clinics offer remote follow-up via photos and video calls. Some have UK partner clinics for in-person checks if needed. Complication insurance is included in many packages. Always clarify the aftercare policy before booking.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Tummy Tuck in Turkey — Prices, Clinics & Packages',
  description:
    'Compare tummy tuck prices in Turkey from JCI-accredited clinics in Istanbul and Antalya. Procedure details, recovery timelines, and UK patient information.',
  url: `${SITE_URL}/procedures/tummy-tuck/turkey`,
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

interface TummyTuckTurkeyPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function TummyTuckTurkeyPage({
  params,
}: TummyTuckTurkeyPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Tummy Tuck', url: '/procedures/tummy-tuck' },
    { name: 'Turkey' },
  ])

  const faqSchema = generateFAQSchema(TUMMY_TUCK_TURKEY_FAQS)

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
            { name: 'Turkey' },
          ]}
        />
      </div>

      <TummyTuckTurkeyClient faqs={TUMMY_TUCK_TURKEY_FAQS} />
    </div>
  )
}
