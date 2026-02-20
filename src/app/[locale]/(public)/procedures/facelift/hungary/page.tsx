import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { FaceliftHungaryClient } from './facelift-hungary-client'
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
  title: 'Facelift in Hungary — EU Quality from £4,500 | MeetYourClinic',
  description:
    'Compare facelift prices in Hungary from £4,500. EU healthcare standards, Budapest medical tourism expertise, thermal spa recovery options. Save 45-55% vs UK.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/facelift/hungary`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/facelift/hungary` },
  },
  openGraph: {
    title: 'Facelift in Hungary — EU Quality from £4,500',
    description: 'Compare facelift prices in Hungary from £4,500. EU standards, experienced surgeons.',
    url: `${SITE_URL}/procedures/facelift/hungary`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const FACELIFT_HUNGARY_FAQS = [
  {
    question: 'How much does a facelift cost in Hungary?',
    answer: 'Facelift in Hungary costs £4,500–£6,500. Full facelift is £5,500–£6,500, mini facelift £4,500–£5,500. This includes surgery and hospital stay. UK prices are £8,000–£15,000.',
  },
  {
    question: 'Is facelift surgery in Hungary safe?',
    answer: 'Yes. Hungary is an EU member with healthcare regulated to European standards. Surgeons must be registered with the Hungarian Medical Chamber. Hungary has decades of medical tourism infrastructure.',
  },
  {
    question: 'Why choose Hungary for facelift?',
    answer: 'Hungary offers EU patient protections, competitive pricing, and established medical tourism infrastructure. Budapest is beautiful for extended recovery, with unique thermal spa options for later healing stages.',
  },
  {
    question: 'How long should I stay in Hungary for a facelift?',
    answer: 'Plan for 10–14 days. Stitches removed at day 7–10. The 2.5-hour flight home is comfortable after stitch removal. Budapest\'s thermal baths can aid relaxation in later recovery.',
  },
  {
    question: 'Which clinics in Hungary offer facelift?',
    answer: 'Budapest has established cosmetic surgery clinics with experienced surgeons. Look for surgeons with specific facial surgery experience, before/after photos, and English-speaking support.',
  },
  {
    question: 'Do Hungarian facial surgeons speak English?',
    answer: 'Yes. Surgeons at international-facing clinics speak English. Hungary has decades of medical tourism experience with excellent patient coordinator support.',
  },
  {
    question: 'Can I use thermal baths after facelift in Hungary?',
    answer: 'Not immediately. Wait until incisions are fully healed (4–6 weeks minimum) and surgeon approves. The baths can aid relaxation in later recovery stages or on a return visit.',
  },
  {
    question: 'Can I combine facelift with other procedures in Hungary?',
    answer: 'Yes. Popular combinations include facelift with blepharoplasty, neck lift, or fat transfer. Discuss safe combinations with your surgeon during consultation.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Facelift in Hungary — EU Standards, Budapest',
  description: 'Compare facelift prices in Hungary. EU healthcare standards, thermal spa recovery.',
  url: `${SITE_URL}/procedures/facelift/hungary`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Facelift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2026-02-03',
}

interface FaceliftHungaryPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function FaceliftHungaryPage({ params }: FaceliftHungaryPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Facelift', url: '/procedures/facelift' },
    { name: 'Hungary' },
  ])

  const faqSchema = generateFAQSchema(FACELIFT_HUNGARY_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalWebPageSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Facelift', url: '/procedures/facelift' },
            { name: 'Hungary' },
          ]}
        />
      </div>
      <FaceliftHungaryClient faqs={FACELIFT_HUNGARY_FAQS} />
    </div>
  )
}
