import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { VeneersClient } from './veneers-client'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from '@/lib/seo/structured-data'
import { StructuredData } from '@/components/seo/structured-data-component'
import CategoryHero from '@/components/category/CategoryHero'
import type { CategoryConfig } from '@/lib/categories/config'
import type { CategoryPageStats } from '@/lib/data/category-page'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://meetyourclinic.com'

// =============================================================================
// METADATA
// =============================================================================

export const metadata: Metadata = {
  title: 'Veneers Abroad — Compare Prices by Country, Material & Clinic | MeetYourClinic',
  description:
    'Compare dental veneer prices abroad from £105/tooth. Turkey, Hungary, Spain — see real prices by material type, browse verified clinics, and get free quotes from top-rated destinations.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/veneers`,
    languages: {
      'en-GB': `${SITE_URL}/en/procedures/veneers`,
    },
  },
  openGraph: {
    title: 'Veneers Abroad — Compare Prices by Country, Material & Clinic',
    description:
      'Compare dental veneer prices abroad from £105/tooth. Turkey, Hungary, Spain — see real prices by material type, browse verified clinics, and get free quotes.',
    url: `${SITE_URL}/procedures/veneers`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/veneers-abroad.jpg`,
        width: 1200,
        height: 630,
        alt: 'Veneers Abroad - Compare Prices and Clinics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veneers Abroad — Compare Prices by Country, Material & Clinic',
    description:
      'Compare dental veneer prices abroad from £105/tooth. Turkey, Hungary, Spain — see real prices by material.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const VENEERS_ABROAD_FAQS = [
  {
    question: 'How much do veneers cost abroad?',
    answer:
      'Composite veneers cost from £100 per tooth abroad. Porcelain veneers range from £130–£350, and E-max veneers cost £180–£450 per tooth depending on the country. A full set of 8 porcelain veneers starts from approximately £1,040 in Turkey.',
  },
  {
    question: 'Which country is best for veneers?',
    answer:
      'Turkey offers the lowest prices and largest dental tourism industry with all-inclusive packages. Hungary provides EU regulation and 30+ years of dental heritage. Spain and Poland offer EU standards with shorter flights. The best choice depends on your priorities: savings, proximity, or regulatory standards.',
  },
  {
    question: 'Are veneers abroad as good as the UK?',
    answer:
      'Yes, at accredited clinics. Top international clinics use the same materials (IPS e.max, Ivoclar Vivadent) and equipment (CEREC, 3D CBCT) as UK practices. Many dentists trained in Europe or the UK. Always verify clinic accreditation and dentist credentials before booking.',
  },
  {
    question: 'How long do I need to stay abroad for veneers?',
    answer:
      'Porcelain and E-max veneers typically require 4–5 days abroad across two clinic visits. Composite veneers can be completed in 1–2 days. Most clinics include hotel accommodation in all-inclusive packages.',
  },
  {
    question: "What's the difference between veneers and crowns?",
    answer:
      'Veneers are thin shells bonded to the front of teeth, requiring 0.3–0.7mm of enamel removal. Crowns cover the entire tooth and require 1.5–2mm of tooth reduction. Some clinics abroad market crowns as veneers — always confirm which treatment you are receiving before booking.',
  },
  {
    question: 'Do I need a second trip for veneers?',
    answer:
      'Usually not. Most veneer treatments are completed in a single trip of 4–5 days. Only complex cases combining dental implants with veneers may require two separate visits.',
  },
  {
    question: "What happens if my veneers break after I'm home?",
    answer:
      'Reputable clinics offer 2–5 year warranties on veneers. Most provide remote follow-up via photos and video calls. Some clinics have UK partner dentists for in-person checks if needed.',
  },
  {
    question: 'Is it safe to get dental veneers abroad?',
    answer:
      'Yes, with proper due diligence. Choose JCI or ISO-accredited clinics, verify dentist credentials and experience, read independent reviews on Google and Trustpilot, and ensure you receive a written treatment plan before travelling.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Veneers Abroad — Compare Prices by Country, Material & Clinic',
  description:
    'Compare dental veneer prices abroad from £105/tooth. Multi-destination comparison across Turkey, Hungary, Spain, and Poland.',
  url: `${SITE_URL}/procedures/veneers`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Dental Veneer',
    procedureType: 'https://schema.org/TherapeuticProcedure',
    bodyLocation: 'Teeth',
    howPerformed:
      'Thin shells of porcelain or composite resin are bonded to the front surface of teeth to improve appearance. Treatment typically involves consultation, tooth preparation, impression-taking, lab fabrication, and bonding.',
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
// PAGE CONFIGURATION (ADAPTER)
// =============================================================================

const veneersConfig: CategoryConfig = {
  slug: 'veneers',
  name: 'Veneers',
  namePlural: 'Veneer Clinics',
  heroTitle: 'Transform your smile with',
  heroHighlight: 'dental veneers',
  heroSubtitle:
    'Compare verified dental clinics for porcelain and composite veneers. Save 40–70% in Turkey, Hungary, and Spain with all-inclusive packages.',
  heroImage:
    'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1974&auto=format&fit=crop',
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
  faqs: [],
  seoBlocks: [],
  relatedTreatments: [],
  countryLinks: [],
  pricingHeading: '',
  pricingCta: '',
  faqIntro: '',
  blogSubtitle: '',
  countryLinksHeading: '',
  specialtiesHeading: '',
}

const veneersStats: CategoryPageStats = {
  clinicCount: 42,
  countries: 5,
  avgRating: 4.9,
  patientsHelped: '3,000+',
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

interface VeneersPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function VeneersPage({ params }: VeneersPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Dental', url: '/dental' },
    { name: 'Veneers' },
  ])

  const faqSchema = generateFAQSchema(VENEERS_ABROAD_FAQS)

  return (
    <div className="min-h-screen bg-slate-50">
      <StructuredData
        data={[
          generateOrganizationSchema(),
          generateWebsiteSchema(),
          breadcrumbSchema,
          faqSchema,
          medicalWebPageSchema,
        ]}
      />

      <CategoryHero config={veneersConfig} stats={veneersStats} />

      <VeneersClient faqs={VENEERS_ABROAD_FAQS} />
    </div>
  )
}
