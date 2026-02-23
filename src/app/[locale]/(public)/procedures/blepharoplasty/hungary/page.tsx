import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BlepharoplastyHungaryClient } from './blepharoplasty-hungary-client'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from '@/lib/seo/structured-data'
import { StructuredData } from '@/components/seo/structured-data-component'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://meetyourclinic.com'

export const metadata: Metadata = {
  title: 'Blepharoplasty in Hungary — EU Quality from £2,000 | MeetYourClinic',
  description:
    'Compare blepharoplasty prices in Hungary from £2,000. Eyelid surgery with EU healthcare standards, Budapest medical tourism expertise. Save 45-55% vs UK.',
  alternates: {
    canonical: `/procedures/blepharoplasty/hungary`,
    languages: { 'en-GB': `/procedures/blepharoplasty/hungary` },
  },
  openGraph: {
    title: 'Blepharoplasty in Hungary — EU Quality from £2,000',
    description: 'Compare eyelid surgery prices in Hungary from £2,000. EU standards, experienced surgeons.',
    url: `${SITE_URL}/procedures/blepharoplasty/hungary`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const BLEPH_HUNGARY_FAQS = [
  {
    question: 'How much does blepharoplasty cost in Hungary?',
    answer: 'Blepharoplasty in Hungary costs £2,000–£3,000. Upper eyelids £2,000–£2,400, lower eyelids £2,200–£2,600, upper and lower combined £2,700–£3,000. UK prices are £3,000–£7,000.',
  },
  {
    question: 'Is blepharoplasty in Hungary safe?',
    answer: 'Yes. Hungary is an EU member with healthcare regulated to European standards. Surgeons must be registered with the Hungarian Medical Chamber. Hungary has decades of medical tourism experience.',
  },
  {
    question: 'Why choose Hungary for blepharoplasty?',
    answer: 'Hungary offers EU patient protections, competitive pricing, and established medical tourism infrastructure. Budapest is beautiful for recovery, with unique thermal spa options for later relaxation.',
  },
  {
    question: 'How long should I stay in Hungary for blepharoplasty?',
    answer: 'Plan for 5–7 days. Stitches removed at day 5–7. The 2.5-hour flight home is easy after stitch removal. Wear sunglasses to cover any residual bruising.',
  },
  {
    question: 'Which clinics in Hungary offer blepharoplasty?',
    answer: 'Budapest has established cosmetic surgery clinics with experienced surgeons. Look for surgeons with specific eyelid surgery experience, before/after photos, and English-speaking support.',
  },
  {
    question: 'Do Hungarian eyelid surgeons speak English?',
    answer: 'Yes. Surgeons at international-facing clinics speak English. Hungary has decades of medical tourism experience with excellent patient coordinator support.',
  },
  {
    question: 'Can I use thermal baths after blepharoplasty?',
    answer: 'Not immediately. Wait until incisions are fully healed (3–4 weeks minimum). The baths can aid relaxation in later recovery or on a return visit to Budapest.',
  },
  {
    question: 'Can I combine blepharoplasty with other procedures in Hungary?',
    answer: 'Yes. Popular combinations include blepharoplasty with facelift, brow lift, or other facial procedures. Discuss safe combinations with your surgeon.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Blepharoplasty in Hungary — EU Standards, Budapest',
  description: 'Compare blepharoplasty prices in Hungary. EU healthcare standards, thermal spa recovery.',
  url: `${SITE_URL}/procedures/blepharoplasty/hungary`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Blepharoplasty',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2026-02-03',
}

interface BlepharoplastyHungaryPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BlepharoplastyHungaryPage({ params }: BlepharoplastyHungaryPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Blepharoplasty', url: '/procedures/blepharoplasty' },
    { name: 'Hungary' },
  ])

  const faqSchema = generateFAQSchema(BLEPH_HUNGARY_FAQS)

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
            { name: 'Hungary' },
          ]}
        />
      </div>
      <BlepharoplastyHungaryClient faqs={BLEPH_HUNGARY_FAQS} />
    </div>
  )
}
