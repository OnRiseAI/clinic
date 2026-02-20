import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BreastReductionPolandClient } from './breast-reduction-poland-client'
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
  title: 'Breast Reduction in Poland — From £3,500 EU Standards | MeetYourClinic',
  description:
    'Compare breast reduction prices in Poland from £3,500. EU-regulated clinics, experienced surgeons, quality care. Save 50-60% vs UK prices.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/breast-reduction/poland`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/breast-reduction/poland` },
  },
  openGraph: {
    title: 'Breast Reduction in Poland — From £3,500 EU Standards',
    description: 'Compare breast reduction in Poland from £3,500. EU-regulated clinics, experienced surgeons.',
    url: `${SITE_URL}/procedures/breast-reduction/poland`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const BREAST_REDUCTION_POLAND_FAQS = [
  {
    question: 'How much does breast reduction cost in Poland?',
    answer: 'Breast reduction in Poland costs £3,500–£5,000. This typically includes surgery, hospital stay, and post-operative care. UK prices are £7,000–£10,000 for surgery alone, making Poland 50-60% cheaper.',
  },
  {
    question: 'Are Polish breast reduction surgeons qualified?',
    answer: 'Yes. Polish surgeons are EU-trained and regulated, often with qualifications from leading European medical schools. Many are members of ISAPS and perform hundreds of breast reductions annually.',
  },
  {
    question: 'What are the advantages of breast reduction in Poland?',
    answer: 'Poland offers EU medical standards, short flight times from the UK (2-3 hours), excellent English proficiency among medical staff, and significant cost savings. Many surgeons trained in Germany or the UK.',
  },
  {
    question: 'Is breast reduction in Poland safe?',
    answer: 'Yes. Poland follows EU medical regulations and standards. Clinics are regularly inspected, surgeons are board-certified, and facilities meet European healthcare requirements.',
  },
  {
    question: 'How long should I stay in Poland for breast reduction?',
    answer: 'Plan for 7–10 days. Day 1: surgery with overnight stay. Days 2–5: rest and recovery, drain removal. Days 6–7: follow-up and fit-to-fly clearance. Short flight home makes recovery comfortable.',
  },
  {
    question: 'What is included in Polish breast reduction packages?',
    answer: 'Packages typically include: surgery, anaesthesia, 1-2 night hospital stay, pre-op tests, compression bra, follow-up appointments. Hotel and transfers may be separate or bundled.',
  },
  {
    question: 'Which cities in Poland offer breast reduction?',
    answer: 'Warsaw and Krakow have the most clinics and experienced surgeons. Wroclaw and Gdansk also have excellent facilities. Warsaw offers the largest selection.',
  },
  {
    question: 'Do Polish clinics offer aftercare in the UK?',
    answer: 'Many Polish clinics have partnerships with UK-based nurses or can arrange video consultations for follow-up. The short flight also makes return visits practical if needed.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Breast Reduction in Poland — EU Standards, Experienced Surgeons',
  description: 'Compare breast reduction prices in Poland. EU-regulated clinics, experienced surgeons.',
  url: `${SITE_URL}/procedures/breast-reduction/poland`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Breast Reduction',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2026-02-03',
}

interface BreastReductionPolandPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BreastReductionPolandPage({ params }: BreastReductionPolandPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Breast Reduction', url: '/procedures/breast-reduction' },
    { name: 'Poland' },
  ])

  const faqSchema = generateFAQSchema(BREAST_REDUCTION_POLAND_FAQS)

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
            { name: 'Poland' },
          ]}
        />
      </div>
      <BreastReductionPolandClient faqs={BREAST_REDUCTION_POLAND_FAQS} />
    </div>
  )
}
