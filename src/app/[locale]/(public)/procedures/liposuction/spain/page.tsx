import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { LiposuctionSpainClient } from './liposuction-spain-client'
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
  title: 'Liposuction in Spain — Prices from £2,400, Barcelona & Marbella Clinics | MeetYourClinic',
  description:
    "Compare liposuction prices in Spain from £2,400. VASER, HD lipo & lipo 360 at world-class Barcelona, Madrid & Marbella clinics. EU-regulated, Quirónsalud hospitals. 40–60% savings vs UK. Free quotes.",
  alternates: {
    canonical: `${SITE_URL}/en/procedures/liposuction/spain`,
    languages: {
      'en-GB': `${SITE_URL}/en/procedures/liposuction/spain`,
    },
  },
  openGraph: {
    title: 'Liposuction in Spain — Prices from £2,400, Barcelona & Marbella Clinics',
    description:
      "Compare liposuction prices in Spain from £2,400. VASER, HD lipo & lipo 360 at world-class Barcelona, Madrid & Marbella clinics. EU-regulated, Quirónsalud hospitals.",
    url: `${SITE_URL}/procedures/liposuction/spain`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/liposuction-spain.jpg`,
        width: 1200,
        height: 630,
        alt: 'Liposuction in Spain - Compare Clinics in Barcelona, Madrid and Marbella',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liposuction in Spain — Prices from £2,400, Barcelona & Marbella Clinics',
    description:
      "Compare liposuction prices in Spain from £2,400. Premium EU clinics with Quirónsalud hospitals.",
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const LIPOSUCTION_SPAIN_FAQS = [
  {
    question: 'How much does liposuction cost in Spain?',
    answer:
      "From £2,400 per area (traditional) to £6,000+ (HD lipo). Lipo 360: £3,600–£6,000. Barcelona and Madrid have the widest range of options. Marbella is positioned as premium. Prices include 21% VAT.",
  },
  {
    question: 'Is liposuction in Spain safe?',
    answer:
      "Yes. Spain is ranked #1 globally for health. Clinics operate under EU medical regulation. Quirónsalud hospitals meet Newsweek's 'World's Best' standards. Surgeons are SECPRE-certified. Spain performs 450,000 cosmetic procedures annually with success rates of 85–95%.",
  },
  {
    question: 'Why is liposuction in Spain more expensive than Turkey or Hungary?',
    answer:
      "Spain's pricing reflects its premium hospital infrastructure (Quirónsalud, HM Hospitales), EU regulatory costs, and higher surgeon credentials. You're paying for Newsweek-rated hospitals, SECPRE-certified surgeons, and one of the world's best healthcare systems. The savings vs UK (40–60%) are still substantial.",
  },
  {
    question: 'Which Spanish city is best for liposuction?',
    answer:
      "Barcelona has the widest clinic selection and most competitive pricing. Madrid offers capital-city quality and the University Clinic of Navarra. Marbella is ideal for combining surgery with a Costa del Sol holiday. Valencia is the most affordable coastal option.",
  },
  {
    question: 'How long should I stay in Spain after liposuction?',
    answer:
      "7 days is recommended. Hospital stay is typically 1 night, with follow-ups on days 2–3 and 5–7. The 2–2.5 hour flight to London is comfortable from day 5–7.",
  },
  {
    question: 'Does Spain offer HD liposuction and ab etching?',
    answer:
      "Yes. Spain's elite clinics in Barcelona and Madrid specialise in HD lipo and ab etching — advanced techniques that sculpt around muscle groups for visible definition. Instituto de Benito and Quirónsalud are among the top providers.",
  },
  {
    question: 'Can I combine liposuction with a tummy tuck in Spain?',
    answer:
      "Yes. Combined liposuction + tummy tuck ('mummy makeover') is popular. Costs for the combination range from £5,000–£10,000 in Spain vs £8,000–£16,000 in the UK. Recovery requires 10–14 days.",
  },
  {
    question: 'Is the 21% Spanish VAT included in clinic prices?',
    answer:
      "At most reputable clinics (e.g., Wellness Kliniek Barcelona), the 21% VAT is included in the quoted all-inclusive price. Always confirm whether VAT is included when comparing quotes between clinics.",
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Liposuction in Spain — Premium EU Clinics & Prices',
  description:
    'Compare liposuction prices in Spain from SECPRE-certified surgeons in Barcelona, Madrid, and Marbella. EU-regulated hospitals and premium quality care.',
  url: `${SITE_URL}/procedures/liposuction/spain`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Liposuction',
    alternateName: ['Lipoplasty', 'VASER Liposuction', 'HD Liposuction', 'Lipo 360'],
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Multiple body areas including abdomen, flanks, thighs, arms, chin',
    howPerformed:
      'Liposuction removes stubborn fat deposits using a thin cannula and suction. Advanced techniques available in Spain include VASER, HD liposuction, ab etching, lipo 360, and SWT (Skin Wave Technology).',
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

interface LiposuctionSpainPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function LiposuctionSpainPage({
  params,
}: LiposuctionSpainPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Liposuction', url: '/procedures/liposuction' },
    { name: 'Spain' },
  ])

  const faqSchema = generateFAQSchema(LIPOSUCTION_SPAIN_FAQS)

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
            { name: 'Spain' },
          ]}
        />
      </div>

      <LiposuctionSpainClient faqs={LIPOSUCTION_SPAIN_FAQS} />
    </div>
  )
}
