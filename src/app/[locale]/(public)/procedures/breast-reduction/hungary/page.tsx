import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BreastReductionHungaryClient } from './breast-reduction-hungary-client'
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
  title: 'Breast Reduction in Hungary — From £3,800 Quality Focus | medit',
  description:
    'Compare breast reduction prices in Hungary from £3,800. Quality-focused clinics, experienced surgeons, EU standards. Save 50-55% vs UK prices.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/breast-reduction/hungary`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/breast-reduction/hungary` },
  },
  openGraph: {
    title: 'Breast Reduction in Hungary — From £3,800 Quality Focus',
    description: 'Compare breast reduction in Hungary from £3,800. Quality-focused clinics, EU standards.',
    url: `${SITE_URL}/procedures/breast-reduction/hungary`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
  },
}

const BREAST_REDUCTION_HUNGARY_FAQS = [
  {
    question: 'How much does breast reduction cost in Hungary?',
    answer: 'Breast reduction in Hungary costs £3,800–£5,200. This includes surgery, hospital stay, and post-operative care. UK prices are £7,000–£10,000, making Hungary 50-55% cheaper.',
  },
  {
    question: 'Are Hungarian breast reduction surgeons qualified?',
    answer: 'Yes. Hungarian surgeons are EU-trained and regulated, with many having trained at prestigious European institutions. Hungary has a strong tradition of medical excellence and many surgeons are ISAPS members.',
  },
  {
    question: 'What are the advantages of breast reduction in Hungary?',
    answer: 'Hungary offers excellent quality-to-price ratio, EU medical standards, a long tradition of medical tourism, beautiful Budapest for recovery, and experienced surgeons with international training.',
  },
  {
    question: 'Is breast reduction in Hungary safe?',
    answer: 'Yes. Hungary follows EU medical regulations and has a well-established medical tourism industry. Clinics are modern and well-equipped, with experienced surgical teams.',
  },
  {
    question: 'How long should I stay in Hungary for breast reduction?',
    answer: 'Plan for 7–10 days. Day 1: surgery with overnight stay. Days 2–5: rest and recovery in Budapest. Days 6–7: follow-up and fit-to-fly clearance.',
  },
  {
    question: 'What is included in Hungarian breast reduction packages?',
    answer: 'Packages typically include: surgery, anaesthesia, 1-2 night hospital stay, pre-op tests, compression bra, follow-up appointments. Hotel and transfers often included.',
  },
  {
    question: 'Why is Hungary known for medical tourism?',
    answer: 'Hungary has been a medical tourism hub for decades, particularly for dental and cosmetic procedures. The country combines excellent medical training, EU standards, and competitive prices.',
  },
  {
    question: 'Is Budapest a good place to recover?',
    answer: 'Yes. Budapest offers excellent hotels, thermal baths (after recovery), good restaurants, and a relaxed atmosphere. The city is well-connected with easy UK flights and has good tourist infrastructure.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Breast Reduction in Hungary — Quality Focus, EU Standards',
  description: 'Compare breast reduction prices in Hungary. Quality-focused clinics, experienced surgeons.',
  url: `${SITE_URL}/procedures/breast-reduction/hungary`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Breast Reduction',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2025-02-03',
}

interface BreastReductionHungaryPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BreastReductionHungaryPage({ params }: BreastReductionHungaryPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Breast Reduction', url: '/procedures/breast-reduction' },
    { name: 'Hungary' },
  ])

  const faqSchema = generateFAQSchema(BREAST_REDUCTION_HUNGARY_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalWebPageSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Breast Reduction', url: '/procedures/breast-reduction' },
            { name: 'Hungary' },
          ]}
        />
      </div>
      <BreastReductionHungaryClient faqs={BREAST_REDUCTION_HUNGARY_FAQS} />
    </div>
  )
}
