import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { LiposuctionPolandClient } from './liposuction-poland-client'
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
  title: 'Liposuction in Poland — Prices from £500, Warsaw & Kraków Clinics | medit',
  description:
    'Compare liposuction prices in Poland from £500 per area. Warsaw, Kraków & Wrocław clinics with EU regulation, ISO accreditation, and unique N.I.L. infrasound technology. Free quotes and recovery planning.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/liposuction/poland`,
    languages: {
      'en-GB': `${SITE_URL}/en/procedures/liposuction/poland`,
    },
  },
  openGraph: {
    title: 'Liposuction in Poland — Prices from £500, Warsaw & Kraków Clinics',
    description:
      'Compare liposuction prices in Poland from £500 per area. Warsaw, Kraków & Wrocław clinics with EU regulation and unique N.I.L. infrasound technology.',
    url: `${SITE_URL}/procedures/liposuction/poland`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/liposuction-poland.jpg`,
        width: 1200,
        height: 630,
        alt: 'Liposuction in Poland - Compare Clinics in Warsaw, Kraków and Wrocław',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liposuction in Poland — Prices from £500, Warsaw & Kraków Clinics',
    description:
      'Compare liposuction prices in Poland from £500. EU-regulated clinics with N.I.L. infrasound technology.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const LIPOSUCTION_POLAND_FAQS = [
  {
    question: 'How much does liposuction cost in Poland?',
    answer:
      "From £500 per area (Wrocław, traditional technique) to £3,800 (VASER in Warsaw). N.I.L. infrasound: £1,500–£3,000. Multi-area packages from €1,900 (≈£1,600).",
  },
  {
    question: 'Is liposuction in Poland safe?',
    answer:
      "Yes. Poland is an EU member state with full EU healthcare regulation. Clinics hold ISO 9001 and ESPRAS accreditation. Surgeons are certified by the Polish Society of Plastic, Reconstructive and Aesthetic Surgery. Success rates: 85–90%.",
  },
  {
    question: 'What is N.I.L. liposuction and where can I get it?',
    answer:
      "N.I.L. (Nutational Infrasound Liposuction) is a Belgian technology using spiral cannula movement and infrasound. It's gentler than traditional methods with less pain, bruising, and faster recovery. KCM Clinic near Wrocław is Europe's leading N.I.L. centre. It's not available in the UK.",
  },
  {
    question: 'Which Polish city is best for liposuction?',
    answer:
      "Warsaw has the widest clinic selection including Centrum Liposukcji (Poland's only liposuction-dedicated clinic). Wrocław offers the lowest prices and proximity to KCM Clinic for N.I.L. Kraków provides a beautiful cultural recovery setting.",
  },
  {
    question: 'How long should I stay in Poland after liposuction?',
    answer:
      "7 days is recommended. This allows for surgery, two follow-up appointments, and fit-to-fly clearance. The 2–2.5 hour flight to London is comfortable from day 5–7.",
  },
  {
    question: 'How cheap are flights to Poland?',
    answer:
      "Return flights from UK cities to Warsaw, Kraków, and Wrocław start from £20–£40 on Ryanair and Wizz Air. Multiple daily flights available. This makes Poland one of the cheapest destinations to reach for medical tourism.",
  },
  {
    question: 'Are Polish surgeons qualified for liposuction?',
    answer:
      "Polish plastic surgeons complete extensive medical training (6-year degree + 5–6 year specialist training). They must be certified by the Polish Society of Plastic, Reconstructive and Aesthetic Surgery. Many hold international credentials including ESPRAS and EBOPRAS certification.",
  },
  {
    question: 'Can I combine liposuction with other procedures in Poland?',
    answer:
      "Yes. Common combinations include liposuction + tummy tuck, lipo 360, and multi-area contouring. Polish clinics offer competitive package pricing for combined procedures.",
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Liposuction in Poland — Prices, Clinics & N.I.L. Technology',
  description:
    'Compare liposuction prices in Poland from ISO-accredited clinics in Warsaw, Kraków, and Wrocław. EU-regulated surgeons and unique N.I.L. infrasound technology.',
  url: `${SITE_URL}/procedures/liposuction/poland`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Liposuction',
    alternateName: ['Lipoplasty', 'VASER Liposuction', 'N.I.L. Liposuction'],
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Multiple body areas including abdomen, flanks, thighs, arms, chin',
    howPerformed:
      'Liposuction removes stubborn fat deposits using a thin cannula and suction. Techniques available in Poland include traditional tumescent, VASER, and the exclusive N.I.L. (Nutational Infrasound Liposuction) technology.',
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

interface LiposuctionPolandPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function LiposuctionPolandPage({
  params,
}: LiposuctionPolandPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Liposuction', url: '/procedures/liposuction' },
    { name: 'Poland' },
  ])

  const faqSchema = generateFAQSchema(LIPOSUCTION_POLAND_FAQS)

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
            { name: 'Poland' },
          ]}
        />
      </div>

      <LiposuctionPolandClient faqs={LIPOSUCTION_POLAND_FAQS} />
    </div>
  )
}
