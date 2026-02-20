import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BreastAugmentationClient } from './breast-augmentation-client'
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
  title: 'Breast Augmentation Abroad — Compare Prices & Clinics | MeetYourClinic',
  description:
    'Compare breast augmentation prices abroad from £2,500. Find verified clinics in Turkey, Poland, Spain & Hungary. Save 50-70% vs UK prices with quality implants.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/breast-augmentation`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/breast-augmentation` },
  },
  openGraph: {
    title: 'Breast Augmentation Abroad — Compare Prices & Clinics',
    description: 'Compare breast augmentation prices abroad from £2,500. Save 50-70% vs UK.',
    url: `${SITE_URL}/procedures/breast-augmentation`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const BREAST_AUGMENTATION_FAQS = [
  {
    question: 'How much does breast augmentation cost abroad?',
    answer: 'Breast augmentation abroad costs £2,500–£5,500 depending on destination and implant type. Turkey offers the lowest prices (£2,500–£4,000), Poland £3,000–£4,500, Hungary £3,200–£4,800, and Spain £4,000–£5,500. UK prices are typically £6,000–£10,000.',
  },
  {
    question: 'Is breast augmentation abroad safe?',
    answer: 'Yes, when choosing accredited clinics with qualified surgeons. Look for JCI accreditation (Turkey), EU standards (Poland, Hungary, Spain), board-certified plastic surgeons, and FDA/CE-approved implants (Mentor, Allergan, Motiva). Research surgeon credentials and patient reviews.',
  },
  {
    question: 'What types of breast implants are available?',
    answer: 'Clinics abroad offer the same premium implants as UK: silicone gel (most popular), saline, and structured/gummy bear implants. Leading brands include Mentor, Allergan Natrelle, Motiva, and Sebbin. Round or teardrop (anatomical) shapes available.',
  },
  {
    question: 'How long should I stay abroad after breast augmentation?',
    answer: 'Plan for 7–10 days abroad. Day 1: surgery and overnight stay. Days 2–5: rest and initial recovery. Days 6–7: follow-up appointment and fit-to-fly clearance. The flight home is comfortable as you can sit normally.',
  },
  {
    question: 'What is the recovery time for breast augmentation?',
    answer: 'Initial recovery: 1–2 weeks (avoid lifting). Return to desk work: 1 week. Light exercise: 4 weeks. Full exercise: 6–8 weeks. Final results: 3–6 months as implants settle. Compression bra worn for 4–6 weeks.',
  },
  {
    question: 'Which country is best for breast augmentation?',
    answer: 'Turkey offers best value with high volume and experienced surgeons. Poland and Hungary provide EU standards at mid-range prices. Spain offers premium quality at higher prices. Choose based on budget, desired quality level, and travel preferences.',
  },
  {
    question: 'Can I choose my implant size and shape?',
    answer: 'Yes. During consultation, surgeons use 3D imaging and sizers to help you visualise results. You can choose size (measured in cc), shape (round vs teardrop), profile (low, moderate, high), and placement (over or under muscle).',
  },
  {
    question: 'What should I look for in a breast augmentation surgeon abroad?',
    answer: 'Look for: board certification in plastic surgery, specialisation in breast procedures, before/after photos of similar cases, minimum 5+ years experience, hospital privileges at accredited facilities, and clear communication in English.',
  },
]

const medicalProcedureSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  name: 'Breast Augmentation',
  alternateName: ['Breast Implants', 'Augmentation Mammoplasty', 'Boob Job'],
  description: 'Surgical procedure to increase breast size using implants or fat transfer.',
  procedureType: 'https://schema.org/SurgicalProcedure',
  bodyLocation: 'Breast',
  preparation: 'Medical consultation, mammogram if over 40, stop smoking 4 weeks before',
  followup: 'Compression bra for 4-6 weeks, follow-up appointments, avoid heavy lifting',
  howPerformed: 'Implants placed through incision (inframammary, periareolar, or axillary) either over or under the pectoral muscle',
  status: 'https://schema.org/EventScheduled',
}

interface BreastAugmentationPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BreastAugmentationPage({ params }: BreastAugmentationPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Breast Augmentation' },
  ])

  const faqSchema = generateFAQSchema(BREAST_AUGMENTATION_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalProcedureSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Breast Augmentation' },
          ]}
        />
      </div>
      <BreastAugmentationClient faqs={BREAST_AUGMENTATION_FAQS} />
    </div>
  )
}
