import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BBLPolandClient } from './bbl-poland-client'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from '@/lib/seo/structured-data'
import { StructuredData } from '@/components/seo/structured-data-component'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://medit.com'

export const metadata: Metadata = {
  title: 'BBL in Poland — Prices from £3,500, EU Standards & Top Clinics | medit',
  description:
    'Compare BBL prices in Poland from £3,500. Brazilian Butt Lift with EU patient protections, natural results focus. Warsaw & Kraków clinics with safety-first approach.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/bbl/poland`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/bbl/poland` },
  },
  openGraph: {
    title: 'BBL in Poland — Prices from £3,500, EU Standards & Top Clinics',
    description: 'Compare BBL prices in Poland from £3,500. EU standards, natural results focus.',
    url: `${SITE_URL}/procedures/bbl/poland`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
  },
}

const BBL_POLAND_FAQS = [
  {
    question: 'How much does a BBL cost in Poland?',
    answer: 'BBL in Poland costs £3,500–£5,500. Packages typically include surgery, hospital stay, and aftercare. Accommodation and transfers may be separate or bundled. This compares to £8,000–£12,000 in the UK — savings of 50–60%.',
  },
  {
    question: 'Is BBL in Poland safe?',
    answer: 'Yes. Poland operates under EU healthcare regulations with strict safety standards. Polish surgeons tend towards conservative, natural-looking results. Key: verify surgeon\'s BBL experience, ensure they follow international safety guidelines (subcutaneous injection only).',
  },
  {
    question: 'Why choose Poland for BBL over Turkey?',
    answer: 'Poland offers EU patient protections, shorter flights (2 hours vs 4), and surgeons known for conservative, natural results. Turkey offers lower prices and higher volume. Choose Poland if EU standards and natural aesthetics are priorities.',
  },
  {
    question: 'How long should I stay in Poland for BBL?',
    answer: 'Plan for 10–14 days. The short flight home (2 hours) is easier than longer flights during early recovery. You\'ll still need a BBL pillow and cannot sit normally for 2–3 weeks.',
  },
  {
    question: 'Which cities in Poland offer BBL?',
    answer: 'Warsaw has the most options with experienced cosmetic surgeons. Kraków also has reputable clinics. Both cities have good international patient infrastructure and short flights from most UK airports.',
  },
  {
    question: 'Do Polish surgeons speak English?',
    answer: 'Yes. Surgeons at international-facing clinics speak English. Many trained in Western Europe. Clinics typically provide English-speaking coordinators throughout your journey.',
  },
  {
    question: 'What results can I expect from BBL in Poland?',
    answer: 'Polish surgeons are known for natural-looking results rather than extreme augmentation. Expect enhanced shape and modest volume increase. If you want dramatic results, discuss expectations during consultation.',
  },
  {
    question: 'Can I combine BBL with other procedures in Poland?',
    answer: 'Yes. Popular combinations include BBL + liposuction 360, BBL + tummy tuck. Polish surgeons will advise what\'s safe to combine based on your health and goals.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'BBL in Poland — Brazilian Butt Lift with EU Standards',
  description: 'Compare BBL prices in Poland from clinics in Warsaw and Kraków. EU patient protections.',
  url: `${SITE_URL}/procedures/bbl/poland`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Brazilian Butt Lift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2025-02-03',
}

interface BBLPolandPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BBLPolandPage({ params }: BBLPolandPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'BBL', url: '/procedures/bbl' },
    { name: 'Poland' },
  ])

  const faqSchema = generateFAQSchema(BBL_POLAND_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalWebPageSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'BBL', url: '/procedures/bbl' },
            { name: 'Poland' },
          ]}
        />
      </div>
      <BBLPolandClient faqs={BBL_POLAND_FAQS} />
    </div>
  )
}
