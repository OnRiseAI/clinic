import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BlepharoplastySpainClient } from './blepharoplasty-spain-client'
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
  title: 'Blepharoplasty in Spain — Premium Quality from £2,500 | medit',
  description:
    'Compare blepharoplasty prices in Spain from £2,500. Eyelid surgery with world-class surgeons, #1 healthcare system, Mediterranean recovery. EU protections.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/blepharoplasty/spain`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/blepharoplasty/spain` },
  },
  openGraph: {
    title: 'Blepharoplasty in Spain — Premium Quality from £2,500',
    description: 'Compare eyelid surgery prices in Spain from £2,500. World-class surgeons, EU standards.',
    url: `${SITE_URL}/procedures/blepharoplasty/spain`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
  },
}

const BLEPH_SPAIN_FAQS = [
  {
    question: 'How much does blepharoplasty cost in Spain?',
    answer: 'Blepharoplasty in Spain costs £2,500–£3,500. Upper eyelids £2,500–£3,000, lower eyelids £2,800–£3,200, upper and lower combined £3,200–£3,500. This reflects premium quality. UK prices are £3,000–£7,000.',
  },
  {
    question: 'Why is Spain considered premium for blepharoplasty?',
    answer: 'Spain has the #1 ranked healthcare system (Bloomberg). Spanish surgeons are known for elegant, natural results and artistic attention to facial aesthetics. Facilities meet the highest international standards.',
  },
  {
    question: 'Is blepharoplasty in Spain safe?',
    answer: 'Yes, extremely. Spain operates under strict EU healthcare regulations. Surgeons are members of SECPRE (Spanish Society of Plastic Surgery). Facilities are world-class.',
  },
  {
    question: 'Which cities in Spain are best for blepharoplasty?',
    answer: 'Barcelona has world-class facial surgeons. Marbella offers luxury clinic experiences. Madrid has excellent private hospitals. All have experienced surgeons who perform eyelid surgery regularly.',
  },
  {
    question: 'How long should I stay in Spain for blepharoplasty?',
    answer: 'Plan for 5–7 days. Stitches removed at day 5–7. The Mediterranean climate makes recovery pleasant. Short 2–2.5 hour flights from UK make travel easy.',
  },
  {
    question: 'What makes Spanish blepharoplasty surgeons different?',
    answer: 'Spanish surgeons are known for aesthetic sensibility — creating natural, refreshed eyes rather than obviously "done" looks. The Mediterranean culture values understated elegance.',
  },
  {
    question: 'Do Spanish eyelid surgeons speak English?',
    answer: 'Yes. International-facing clinics have English-speaking surgeons and staff. Barcelona and Marbella particularly cater to international patients.',
  },
  {
    question: 'Can I combine blepharoplasty with other procedures in Spain?',
    answer: 'Yes. Spanish surgeons excel at combining blepharoplasty with facelift, brow lift, or other facial procedures for comprehensive rejuvenation with harmonious results.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Blepharoplasty in Spain — Premium Quality, World-Class Surgeons',
  description: 'Compare blepharoplasty prices in Spain. #1 healthcare system, Mediterranean recovery.',
  url: `${SITE_URL}/procedures/blepharoplasty/spain`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Blepharoplasty',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2025-02-03',
}

interface BlepharoplastySpainPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BlepharoplastySpainPage({ params }: BlepharoplastySpainPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Blepharoplasty', url: '/procedures/blepharoplasty' },
    { name: 'Spain' },
  ])

  const faqSchema = generateFAQSchema(BLEPH_SPAIN_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalWebPageSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Blepharoplasty', url: '/procedures/blepharoplasty' },
            { name: 'Spain' },
          ]}
        />
      </div>
      <BlepharoplastySpainClient faqs={BLEPH_SPAIN_FAQS} />
    </div>
  )
}
