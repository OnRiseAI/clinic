import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { LiposuctionClient } from './liposuction-client'
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
  title: 'Liposuction Abroad — Compare Prices, Techniques & Clinics | MeetYourClinic',
  description:
    'Compare liposuction prices abroad from £1,165. VASER, laser & traditional lipo in Turkey, Hungary, Poland, Spain — real prices, recovery timelines, verified surgeons. Free quotes from accredited clinics.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/liposuction`,
    languages: {
      'en-GB': `${SITE_URL}/en/procedures/liposuction`,
    },
  },
  openGraph: {
    title: 'Liposuction Abroad — Compare Prices, Techniques & Clinics',
    description:
      'Compare liposuction prices abroad from £1,165. VASER, laser & traditional lipo in Turkey, Hungary, Poland, Spain — real prices, recovery timelines, verified surgeons.',
    url: `${SITE_URL}/procedures/liposuction`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/liposuction-abroad.jpg`,
        width: 1200,
        height: 630,
        alt: 'Liposuction Abroad - Compare Prices Across 4 Destinations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liposuction Abroad — Compare Prices, Techniques & Clinics',
    description:
      'Compare liposuction prices abroad from £1,165. VASER, laser & traditional lipo — verified surgeons and accredited clinics.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const LIPOSUCTION_FAQS = [
  {
    question: 'How much does liposuction cost abroad?',
    answer:
      "From £1,165 per area (Hungary) to £5,500 (Spain). Turkey averages £1,500–£4,600 per area depending on technique. All-inclusive packages typically include surgery, hospital stay, hotel, transfers, and compression garment.",
  },
  {
    question: "What's the difference between VASER and traditional liposuction?",
    answer:
      "VASER uses ultrasound energy to liquefy fat before removal — less bruising, faster recovery, better skin tightening, and higher fat graft viability for BBL. Traditional lipo uses mechanical breakdown and suction — more affordable, proven results, best for larger-volume removal.",
  },
  {
    question: 'Is liposuction abroad safe?',
    answer:
      "Yes, when you choose accredited clinics and board-certified surgeons. Complication rates at top international clinics are comparable to UK private hospitals — under 3% overall, under 0.5% for serious complications. Look for JCI, ISO 9001, or equivalent accreditation.",
  },
  {
    question: 'How long do I need to stay abroad after liposuction?',
    answer:
      "Most patients need 5–7 days in the destination. Liposuction is often a day-case procedure, with follow-up appointments on days 2–3 and 5–7. Fit-to-fly clearance is typically day 5–7.",
  },
  {
    question: 'How many areas can be treated in one session?',
    answer:
      "Most surgeons treat 2–4 areas in a single session. Lipo 360 (abdomen + flanks + back) is a common single-session approach. The maximum safe fat removal is typically 4–5 litres. More areas may require a longer procedure and overnight hospital stay.",
  },
  {
    question: 'Can I fly after liposuction?',
    answer:
      "Most surgeons clear patients to fly after 5–7 days. Wear your compression garment, stay hydrated, walk in the aisle periodically, and avoid alcohol during the flight. Short-haul flights (2–4 hours) are preferred in the first week.",
  },
  {
    question: 'What is lipo 360?',
    answer:
      "Lipo 360 treats the entire torso circumference — abdomen, flanks/love handles, and lower back — in one session. It provides balanced, proportional contouring rather than targeting isolated pockets. Costs abroad range from £1,900 (Turkey) to £6,000 (Spain).",
  },
  {
    question: 'Can liposuction be combined with other procedures?',
    answer:
      "Yes. The most popular combinations are: liposuction + tummy tuck ('mummy makeover'), liposuction + BBL (fat is transferred to buttocks), liposuction + breast fat transfer, and lipo 360 + skin tightening. Combining procedures can reduce overall cost and total recovery time.",
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Liposuction Abroad — Compare Prices, Techniques & Clinics',
  description:
    'Compare liposuction prices abroad from accredited clinics in Turkey, Hungary, Poland, and Spain. VASER, laser, and traditional techniques with recovery timelines and surgeon selection guidance.',
  url: `${SITE_URL}/procedures/liposuction`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Liposuction',
    alternateName: ['Lipoplasty', 'Suction-Assisted Lipectomy', 'VASER Liposuction'],
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Multiple body areas including abdomen, flanks, thighs, arms, chin',
    howPerformed:
      'Liposuction removes stubborn fat deposits from specific areas of the body using a thin tube (cannula) and suction. Techniques include traditional tumescent, VASER (ultrasound-assisted), laser lipolysis, and power-assisted liposuction (PAL).',
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

interface LiposuctionPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function LiposuctionPage({ params }: LiposuctionPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Liposuction' },
  ])

  const faqSchema = generateFAQSchema(LIPOSUCTION_FAQS)

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
            { name: 'Liposuction' },
          ]}
        />
      </div>

      <LiposuctionClient faqs={LIPOSUCTION_FAQS} />
    </div>
  )
}
