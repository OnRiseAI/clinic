import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { CostGuideClient } from './cost-guide-client'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOrganizationSchema,
} from '@/lib/seo/structured-data'
import { StructuredData } from '@/components/seo/structured-data-component'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://meetyourclinic.com'

// =============================================================================
// METADATA
// =============================================================================

export const metadata: Metadata = {
  title: 'How Much Do Dental Implants Cost Abroad? 2026 Price Guide by Country | MeetYourClinic',
  description:
    "Compare dental implant prices in 8+ countries. Single implants from £250 in Turkey to £1,200 in Spain. See what's included, why prices differ, and how UK patients save 50–80%. Updated for 2026.",
  alternates: {
    canonical: `${SITE_URL}/blog/dental-implants-abroad-cost-guide`,
    languages: {
      'en-GB': `${SITE_URL}/en/blog/dental-implants-abroad-cost-guide`,
    },
  },
  openGraph: {
    title: 'How Much Do Dental Implants Cost Abroad? 2026 Price Guide by Country',
    description:
      "Compare dental implant prices in 8+ countries. Single implants from £250 in Turkey to £1,200 in Spain. See what's included, why prices differ, and how UK patients save 50–80%.",
    url: `${SITE_URL}/blog/dental-implants-abroad-cost-guide`,
    siteName: 'MeetYourClinic',
    type: 'article',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/dental-implants-cost-guide.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dental Implants Cost Abroad - Complete Price Guide',
      },
    ],
    publishedTime: '2026-02-01T00:00:00Z',
    modifiedTime: '2026-02-01T00:00:00Z',
    authors: ['MeetYourClinic Research Team'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Do Dental Implants Cost Abroad? 2026 Price Guide',
    description:
      'Compare dental implant prices in 8+ countries. Single implants from £250 in Turkey. Save 50–80% vs UK prices.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const COST_GUIDE_FAQS = [
  {
    question: 'How much do dental implants cost abroad?',
    answer:
      'Single dental implants abroad range from £250 to £1,200 depending on the country. Turkey is the most affordable at £250–£700. All-on-4 full-arch restorations start from £1,800 in Turkey and £4,500 in Hungary.',
  },
  {
    question: 'Why are dental implants so much cheaper abroad?',
    answer:
      'Lower operating costs (rent, salaries, overhead), government incentives for medical tourism, and high competition between clinics. Clinics abroad use the same implant brands as UK practices — the implant itself costs the same globally.',
  },
  {
    question: 'Which country is the cheapest for dental implants?',
    answer:
      'Turkey offers the lowest prices for dental implants in Europe and the Middle East, with single implants from £250 and All-on-4 from £1,800. India offers comparable prices but requires longer travel from the UK.',
  },
  {
    question: 'Are cheap dental implants abroad safe?',
    answer:
      'Yes, when you choose accredited clinics. Look for JCI or ISO 9001 accreditation, qualified implantologists, and internationally recognised implant brands like Straumann and Nobel Biocare. Success rates at top clinics abroad are 95–98%.',
  },
  {
    question: 'What is included in a dental implant package abroad?',
    answer:
      'Most packages include the implant, abutment, crown, consultation, X-rays, hotel accommodation, and airport transfers. Bone grafting, sinus lifts, and flights are usually extra.',
  },
  {
    question: 'How long do I need to stay abroad for dental implants?',
    answer:
      'Single implants typically require 3–5 days. Two-stage procedures may need two trips of 3–5 days each, spaced 3–6 months apart. All-on-4 can be completed in 5–7 days.',
  },
  {
    question: 'Can I get dental implants on the NHS?',
    answer:
      'The NHS very rarely covers dental implants as they are considered cosmetic in most cases. NHS Band 3 is currently £319.10, which covers dentures but not implants. Most UK patients pay privately.',
  },
  {
    question: 'Do I need travel insurance for dental treatment abroad?',
    answer:
      'Yes. Standard travel insurance does not cover elective medical treatment. You need specialist dental tourism or medical travel insurance, which typically costs £30–£80 for a short trip.',
  },
  {
    question: 'What if something goes wrong after I return to the UK?',
    answer:
      'Reputable clinics offer written guarantees (often 5–10 years on implants). Many have UK-based partner dentists for follow-up care. Confirm the guarantee terms and aftercare arrangements in writing before booking.',
  },
  {
    question: 'Is it worth getting dental implants abroad?',
    answer:
      'For most patients, yes. Savings of 50–80% make dental tourism financially compelling, especially for multiple implants or full-mouth work. The key is choosing an accredited clinic with verified credentials and transparent pricing.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How Much Do Dental Implants Cost Abroad? The Complete 2026 Price Guide',
  description:
    "Compare dental implant prices in 8+ countries. Single implants from £250 in Turkey to £1,200 in Spain. See what's included, why prices differ, and how UK patients save 50–80%.",
  author: {
    '@type': 'Organization',
    name: 'MeetYourClinic Research Team',
    url: `${SITE_URL}/about`,
  },
  publisher: {
    '@type': 'Organization',
    name: 'MeetYourClinic',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
    },
  },
  datePublished: '2026-02-01',
  dateModified: '2026-02-01',
  mainEntityOfPage: `${SITE_URL}/blog/dental-implants-abroad-cost-guide`,
  about: {
    '@type': 'MedicalProcedure',
    name: 'Dental Implant',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

interface CostGuidePageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function CostGuidePage({ params }: CostGuidePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'Dental Implants Abroad: Cost Guide' },
  ])

  const faqSchema = generateFAQSchema(COST_GUIDE_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), articleSchema, breadcrumbSchema, faqSchema]}
      />

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Blog', url: '/blog' },
            { name: 'Dental Implants Abroad: Cost Guide' },
          ]}
        />
      </div>

      <CostGuideClient faqs={COST_GUIDE_FAQS} />
    </div>
  )
}
