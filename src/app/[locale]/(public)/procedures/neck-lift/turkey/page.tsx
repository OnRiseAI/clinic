import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { NeckLiftTurkeyClient } from './neck-lift-turkey-client'
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
  title: 'Neck Lift in Turkey — From £2,500 All-Inclusive | medit',
  description:
    'Compare neck lift prices in Turkey from £2,500. Experienced facial surgeons, JCI hospitals, all-inclusive packages. Save 60-70% vs UK prices.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/neck-lift/turkey`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/neck-lift/turkey` },
  },
  openGraph: {
    title: 'Neck Lift in Turkey — From £2,500 All-Inclusive',
    description: 'Compare neck lift prices in Turkey from £2,500. JCI hospitals, experienced surgeons.',
    url: `${SITE_URL}/procedures/neck-lift/turkey`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
  },
}

const NECK_LIFT_TURKEY_FAQS = [
  {
    question: 'How much does a neck lift cost in Turkey?',
    answer: 'Neck lift in Turkey costs £2,500–£4,000 all-inclusive. Traditional neck lift is £3,000–£4,000, neck liposuction alone £1,500–£2,500. Packages include surgery, hospital stay, hotel, and transfers. UK prices are £6,000–£10,000.',
  },
  {
    question: 'Are Turkish neck lift surgeons qualified?',
    answer: 'Yes. Leading Turkish facial surgeons are board-certified, often with international training (US, UK, Europe). Many are members of ISAPS. Turkey\'s high cosmetic surgery volume means surgeons have extensive experience.',
  },
  {
    question: 'Is neck lift in Turkey safe?',
    answer: 'Yes, when choosing accredited facilities. Look for JCI-accredited hospitals, board-certified surgeons specialising in facial procedures, and clinics with verified before/after results. Neck lift requires precise technique.',
  },
  {
    question: 'How long should I stay in Turkey after a neck lift?',
    answer: 'Plan for 7–10 days. Neck lift has visible recovery — swelling and bruising peak at days 2–3. Stitches are removed at day 5–7, then fit-to-fly assessment.',
  },
  {
    question: 'Can I combine neck lift with facelift in Turkey?',
    answer: 'Yes. Combining neck lift with facelift is common and provides comprehensive rejuvenation. Turkish surgeons offer combined packages at significant savings compared to separate procedures in the UK.',
  },
  {
    question: 'Which city is best for neck lift in Turkey?',
    answer: 'Istanbul has the largest selection of qualified facial surgeons and JCI-accredited hospitals. For facial procedures requiring precise technique, Istanbul offers more specialist choice.',
  },
  {
    question: 'What is included in a neck lift package in Turkey?',
    answer: 'All-inclusive packages typically include: surgery, anaesthesia, hospital stay (1 night), pre-op tests, medications, 5–7 nights hotel, airport transfers, patient coordinator, and follow-up appointments.',
  },
  {
    question: 'What neck lift techniques are available in Turkey?',
    answer: 'Turkish surgeons offer traditional neck lift, platysmaplasty (muscle tightening), cervicoplasty (skin removal), and neck liposuction. They can also combine with facelift or chin augmentation.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Neck Lift in Turkey — Experienced Surgeons, JCI Hospitals',
  description: 'Compare neck lift prices in Turkey. All-inclusive packages from £2,500.',
  url: `${SITE_URL}/procedures/neck-lift/turkey`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Neck Lift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2025-02-03',
}

interface NeckLiftTurkeyPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function NeckLiftTurkeyPage({ params }: NeckLiftTurkeyPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Neck Lift', url: '/procedures/neck-lift' },
    { name: 'Turkey' },
  ])

  const faqSchema = generateFAQSchema(NECK_LIFT_TURKEY_FAQS)

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
            { name: 'Turkey' },
          ]}
        />
      </div>
      <NeckLiftTurkeyClient faqs={NECK_LIFT_TURKEY_FAQS} />
    </div>
  )
}
