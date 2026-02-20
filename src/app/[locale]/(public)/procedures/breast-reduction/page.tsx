import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BreastReductionClient } from './breast-reduction-client'
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
  title: 'Breast Reduction Abroad — Compare Prices & Clinics | MeetYourClinic',
  description:
    'Compare breast reduction prices abroad from £3,000. Find verified clinics in Turkey, Poland, Spain & Hungary. Save 50-70% vs UK prices with experienced surgeons.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/breast-reduction`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/breast-reduction` },
  },
  openGraph: {
    title: 'Breast Reduction Abroad — Compare Prices & Clinics',
    description: 'Compare breast reduction prices abroad from £3,000. Save 50-70% vs UK.',
    url: `${SITE_URL}/procedures/breast-reduction`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const BREAST_REDUCTION_FAQS = [
  {
    question: 'How much does breast reduction cost abroad?',
    answer: 'Breast reduction abroad costs £3,000–£6,000 depending on destination and complexity. Turkey offers the lowest prices (£3,000–£4,500), Poland £3,500–£5,000, Hungary £3,800–£5,200, and Spain £4,500–£6,000. UK prices are typically £7,000–£10,000.',
  },
  {
    question: 'Is breast reduction abroad safe?',
    answer: 'Yes, when choosing accredited clinics with qualified surgeons. Look for JCI accreditation (Turkey), EU standards (Poland, Hungary, Spain), board-certified plastic surgeons, and hospitals with proper surgical facilities. Research surgeon credentials and patient reviews.',
  },
  {
    question: 'What is the recovery time for breast reduction?',
    answer: 'Initial recovery takes 1-2 weeks. Return to desk work in 1-2 weeks. Light exercise after 4 weeks. Full exercise after 6-8 weeks. Swelling continues to reduce for 3-6 months. A compression bra is worn for 4-6 weeks post-surgery.',
  },
  {
    question: 'How long should I stay abroad after breast reduction?',
    answer: 'Plan for 7–10 days abroad. Day 1: surgery with overnight stay. Days 2–5: rest and initial recovery. Days 6–7: follow-up appointment and fit-to-fly clearance. You can fly home comfortably as sitting is not affected.',
  },
  {
    question: 'Will I have scars after breast reduction?',
    answer: 'Yes, but scarring techniques have improved significantly. Common patterns are anchor (inverted-T), lollipop (vertical), or periareolar. Scars fade over 12-18 months. Surgeons use techniques to minimise visible scarring.',
  },
  {
    question: 'Which country is best for breast reduction?',
    answer: 'Turkey offers best value with high volume and experienced surgeons. Poland and Hungary provide EU standards at mid-range prices. Spain offers premium quality at higher prices. Choose based on budget, desired quality level, and travel preferences.',
  },
  {
    question: 'Can breast reduction be combined with a breast lift?',
    answer: 'Yes, breast reduction naturally includes lifting elements as excess tissue is removed and the breast is reshaped. Many surgeons combine reduction with additional lift techniques for optimal positioning. This is very common and can be done in one procedure.',
  },
  {
    question: 'How much breast tissue can be removed?',
    answer: 'The amount removed depends on your goals and body proportions. Surgeons typically remove 200-800 grams per breast, sometimes more. During consultation, you\'ll discuss desired cup size and surgeons will advise what\'s achievable for your body type.',
  },
]

const medicalProcedureSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  name: 'Breast Reduction',
  alternateName: ['Reduction Mammoplasty', 'Breast Reduction Surgery', 'Mammoplasty'],
  description: 'Surgical procedure to reduce breast size by removing excess tissue, fat, and skin.',
  procedureType: 'https://schema.org/SurgicalProcedure',
  bodyLocation: 'Breast',
  preparation: 'Medical consultation, mammogram if over 40, stop smoking 4 weeks before',
  followup: 'Compression bra for 4-6 weeks, follow-up appointments, avoid heavy lifting',
  howPerformed: 'Excess breast tissue, fat, and skin removed through incisions, nipple repositioned, breast reshaped',
  status: 'https://schema.org/EventScheduled',
}

interface BreastReductionPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BreastReductionPage({ params }: BreastReductionPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Breast Reduction' },
  ])

  const faqSchema = generateFAQSchema(BREAST_REDUCTION_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalProcedureSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Breast Reduction' },
          ]}
        />
      </div>
      <BreastReductionClient faqs={BREAST_REDUCTION_FAQS} />
    </div>
  )
}
