import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BreastReductionSpainClient } from './breast-reduction-spain-client'
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
  title: 'Breast Reduction in Spain — From £4,500 Premium Quality | medit',
  description:
    'Compare breast reduction prices in Spain from £4,500. Premium clinics, world-class surgeons, EU standards. Save 40-50% vs UK prices.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/breast-reduction/spain`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/breast-reduction/spain` },
  },
  openGraph: {
    title: 'Breast Reduction in Spain — From £4,500 Premium Quality',
    description: 'Compare breast reduction in Spain from £4,500. Premium clinics, world-class surgeons.',
    url: `${SITE_URL}/procedures/breast-reduction/spain`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
  },
}

const BREAST_REDUCTION_SPAIN_FAQS = [
  {
    question: 'How much does breast reduction cost in Spain?',
    answer: 'Breast reduction in Spain costs £4,500–£6,000. This includes surgery, hospital stay, and post-operative care. UK prices are £7,000–£10,000, making Spain 40-50% cheaper while offering premium quality.',
  },
  {
    question: 'Are Spanish breast reduction surgeons qualified?',
    answer: 'Yes. Spanish surgeons are EU-trained and regulated, often with international experience. Many are members of SECPRE (Spanish Society of Plastic Surgery) and ISAPS, with extensive breast surgery experience.',
  },
  {
    question: 'What are the advantages of breast reduction in Spain?',
    answer: 'Spain offers premium quality care, EU medical standards, excellent climate for recovery, short flights from the UK, and a familiar tourist destination. Many surgeons speak excellent English.',
  },
  {
    question: 'Is breast reduction in Spain safe?',
    answer: 'Yes. Spain has world-class healthcare and follows strict EU medical regulations. Private clinics are well-equipped with modern facilities and experienced surgical teams.',
  },
  {
    question: 'How long should I stay in Spain for breast reduction?',
    answer: 'Plan for 7–10 days. Day 1: surgery with overnight stay. Days 2–5: rest and recovery. Days 6–7: follow-up and fit-to-fly clearance. The pleasant climate makes recovery more comfortable.',
  },
  {
    question: 'What is included in Spanish breast reduction packages?',
    answer: 'Packages typically include: surgery, anaesthesia, 1-2 night hospital stay, pre-op tests, compression bra, follow-up appointments. Some clinics include hotel accommodation.',
  },
  {
    question: 'Which cities in Spain offer breast reduction?',
    answer: 'Barcelona and Madrid have the most clinics and experienced surgeons. Marbella and Valencia also have excellent facilities. Barcelona is particularly popular for medical tourism.',
  },
  {
    question: 'Can I combine breast reduction with a holiday in Spain?',
    answer: 'Yes, but remember recovery should be your priority. Light sightseeing after day 5 is usually fine. Avoid beaches and sun exposure on scars. Many patients enjoy a relaxed recovery in Spain\'s pleasant climate.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Breast Reduction in Spain — Premium Quality, EU Standards',
  description: 'Compare breast reduction prices in Spain. Premium clinics, world-class surgeons.',
  url: `${SITE_URL}/procedures/breast-reduction/spain`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Breast Reduction',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2025-02-03',
}

interface BreastReductionSpainPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BreastReductionSpainPage({ params }: BreastReductionSpainPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Breast Reduction', url: '/procedures/breast-reduction' },
    { name: 'Spain' },
  ])

  const faqSchema = generateFAQSchema(BREAST_REDUCTION_SPAIN_FAQS)

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
            { name: 'Spain' },
          ]}
        />
      </div>
      <BreastReductionSpainClient faqs={BREAST_REDUCTION_SPAIN_FAQS} />
    </div>
  )
}
