import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { NeckLiftHungaryClient } from './neck-lift-hungary-client'
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
  title: 'Neck Lift in Hungary — EU Quality from £3,200 | medit',
  description:
    'Compare neck lift prices in Hungary from £3,200. EU healthcare standards, Budapest medical tourism expertise, thermal spa recovery options. Save 50-55% vs UK.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/neck-lift/hungary`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/neck-lift/hungary` },
  },
  openGraph: {
    title: 'Neck Lift in Hungary — EU Quality from £3,200',
    description: 'Compare neck lift prices in Hungary from £3,200. EU standards, experienced surgeons.',
    url: `${SITE_URL}/procedures/neck-lift/hungary`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
  },
}

const NECK_LIFT_HUNGARY_FAQS = [
  {
    question: 'How much does a neck lift cost in Hungary?',
    answer: 'Neck lift in Hungary costs £3,200–£4,800. Traditional neck lift is £3,800–£4,800, neck liposuction £2,200–£3,200. This includes surgery and hospital stay. UK prices are £6,000–£10,000.',
  },
  {
    question: 'Is neck lift surgery in Hungary safe?',
    answer: 'Yes. Hungary is an EU member with healthcare regulated to European standards. Surgeons must be registered with the Hungarian Medical Chamber. Hungary has decades of medical tourism infrastructure.',
  },
  {
    question: 'Why choose Hungary for neck lift?',
    answer: 'Hungary offers EU patient protections, competitive pricing, and established medical tourism infrastructure. Budapest is beautiful for recovery, with unique thermal spa options for later healing stages.',
  },
  {
    question: 'How long should I stay in Hungary for a neck lift?',
    answer: 'Plan for 7–10 days. Stitches removed at day 5–7. The 2.5-hour flight home is comfortable after stitch removal. Budapest\'s thermal baths can aid relaxation in later recovery.',
  },
  {
    question: 'Which clinics in Hungary offer neck lift?',
    answer: 'Budapest has established cosmetic surgery clinics with experienced surgeons. Look for surgeons with specific facial surgery experience, before/after photos, and English-speaking support.',
  },
  {
    question: 'Do Hungarian facial surgeons speak English?',
    answer: 'Yes. Surgeons at international-facing clinics speak English. Hungary has decades of medical tourism experience with excellent patient coordinator support.',
  },
  {
    question: 'Can I use thermal baths after neck lift in Hungary?',
    answer: 'Not immediately. Wait until incisions are fully healed (4–6 weeks minimum) and surgeon approves. The baths can aid relaxation in later recovery stages or on a return visit.',
  },
  {
    question: 'Can I combine neck lift with facelift in Hungary?',
    answer: 'Yes. Popular combinations include neck lift with facelift, blepharoplasty, or chin liposuction. Discuss safe combinations with your surgeon during consultation.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Neck Lift in Hungary — EU Standards, Budapest',
  description: 'Compare neck lift prices in Hungary. EU healthcare standards, thermal spa recovery.',
  url: `${SITE_URL}/procedures/neck-lift/hungary`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Neck Lift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2025-02-03',
}

interface NeckLiftHungaryPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function NeckLiftHungaryPage({ params }: NeckLiftHungaryPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Neck Lift', url: '/procedures/neck-lift' },
    { name: 'Hungary' },
  ])

  const faqSchema = generateFAQSchema(NECK_LIFT_HUNGARY_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalWebPageSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Neck Lift', url: '/procedures/neck-lift' },
            { name: 'Hungary' },
          ]}
        />
      </div>
      <NeckLiftHungaryClient faqs={NECK_LIFT_HUNGARY_FAQS} />
    </div>
  )
}
