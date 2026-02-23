import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { LiposuctionTurkeyClient } from './liposuction-turkey-client'
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
  title: 'Liposuction in Turkey — Prices from £1,500, Top Clinics & VASER Packages | MeetYourClinic',
  description:
    'Compare liposuction prices in Turkey from £1,500 all-inclusive. VASER, laser & 360 lipo at JCI-accredited Istanbul clinics. Real before/after results, recovery timelines, and free consultations.',
  alternates: {
    canonical: `/procedures/liposuction/turkey`,
    languages: {
      'en-GB': `/procedures/liposuction/turkey`,
    },
  },
  openGraph: {
    title: 'Liposuction in Turkey — Prices from £1,500, Top Clinics & VASER Packages',
    description:
      'Compare liposuction prices in Turkey from £1,500 all-inclusive. VASER, laser & 360 lipo at JCI-accredited Istanbul clinics.',
    url: `${SITE_URL}/procedures/liposuction/turkey`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/liposuction-turkey.jpg`,
        width: 1200,
        height: 630,
        alt: 'Liposuction in Turkey - Compare Clinics in Istanbul and Antalya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liposuction in Turkey — Prices from £1,500, Top Clinics & VASER Packages',
    description:
      'Compare liposuction prices in Turkey from £1,500. VASER, laser & 360 lipo at JCI-accredited clinics.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const LIPOSUCTION_TURKEY_FAQS = [
  {
    question: 'How much does liposuction cost in Turkey?',
    answer:
      "From £1,500 per area (traditional) to £4,600 (VASER). Lipo 360 averages £1,900–£4,000. All-inclusive packages include surgery, hotel, transfers, and aftercare — typically 60–70% less than UK private prices.",
  },
  {
    question: 'Is liposuction in Turkey safe?',
    answer:
      "Yes, when you choose JCI-accredited hospitals and board-certified surgeons. Turkey performs 45,000+ liposuction procedures annually. Complication rate with board-certified surgeons: 2.62% overall, 0.2% major. Top clinics like Carely report under 0.5% complication rates.",
  },
  {
    question: 'What is the best liposuction technique in Turkey?',
    answer:
      "Depends on your goals. VASER is most popular for precise contouring and faster recovery. Traditional is best for large-volume removal on a budget. Laser lipo suits smaller areas like chin and arms. A consultation will determine the right technique for your body.",
  },
  {
    question: 'How long do I need to stay in Turkey after liposuction?',
    answer:
      "Most patients stay 7–10 days. Fit-to-fly clearance is typically day 5–7. Your package includes 4–7 nights hotel and 2 follow-up appointments.",
  },
  {
    question: 'Which is better — Istanbul or Antalya for liposuction?',
    answer:
      "Istanbul has the largest concentration of specialist clinics (400+) and JCI hospitals. Antalya is slightly cheaper and offers a beach-resort recovery setting. For specialist techniques like HD lipo or VASER, Istanbul has more options.",
  },
  {
    question: 'Can I combine liposuction with a tummy tuck in Turkey?',
    answer:
      "Yes — it's the most popular combination, often called a 'mummy makeover.' Combining procedures saves 20–30% vs separate surgeries and means one trip, one recovery. Expect to stay 10–14 days for the combined procedure.",
  },
  {
    question: "What's included in a liposuction package in Turkey?",
    answer:
      "Standard packages include: surgery + surgeon fee, hospital stay, anaesthesia, pre-op tests, compression garment, 4–7 nights hotel, airport transfers, post-op medications, follow-up appointments, and a personal patient coordinator. International flights are typically not included.",
  },
  {
    question: 'Will I see results immediately after liposuction?',
    answer:
      "You'll see some improvement immediately, but significant swelling is normal for 8–12 weeks. Many patients look larger before they look smaller (the 'liposuction swell'). True results emerge at 3 months, with final results at 6 months.",
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Liposuction in Turkey — Prices, Clinics & VASER Packages',
  description:
    'Compare liposuction prices in Turkey from JCI-accredited clinics in Istanbul and Antalya. VASER, laser, 360, and HD techniques with recovery timelines.',
  url: `${SITE_URL}/procedures/liposuction/turkey`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Liposuction',
    alternateName: ['Lipoplasty', 'VASER Liposuction', 'Lipo 360'],
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Multiple body areas including abdomen, flanks, thighs, arms, chin',
    howPerformed:
      'Liposuction removes stubborn fat deposits using a thin cannula and suction. Techniques available in Turkey include traditional tumescent, VASER (ultrasound-assisted), laser lipolysis, power-assisted (PAL), lipo 360, and HD liposuction.',
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

interface LiposuctionTurkeyPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function LiposuctionTurkeyPage({
  params,
}: LiposuctionTurkeyPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Liposuction', url: '/procedures/liposuction' },
    { name: 'Turkey' },
  ])

  const faqSchema = generateFAQSchema(LIPOSUCTION_TURKEY_FAQS)

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
            { name: 'Turkey' },
          ]}
        />
      </div>

      <LiposuctionTurkeyClient faqs={LIPOSUCTION_TURKEY_FAQS} />
    </div>
  )
}
