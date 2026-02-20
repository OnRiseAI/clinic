import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BreastReductionTurkeyClient } from './breast-reduction-turkey-client'
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
  title: 'Breast Reduction in Turkey — From £3,000 All-Inclusive | MeetYourClinic',
  description:
    'Compare breast reduction prices in Turkey from £3,000. Experienced surgeons, JCI hospitals, all-inclusive packages. Save 60-70% vs UK prices.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/breast-reduction/turkey`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/breast-reduction/turkey` },
  },
  openGraph: {
    title: 'Breast Reduction in Turkey — From £3,000 All-Inclusive',
    description: 'Compare breast reduction in Turkey from £3,000. JCI hospitals, experienced surgeons.',
    url: `${SITE_URL}/procedures/breast-reduction/turkey`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const BREAST_REDUCTION_TURKEY_FAQS = [
  {
    question: 'How much does breast reduction cost in Turkey?',
    answer: 'Breast reduction in Turkey costs £3,000–£4,500 all-inclusive. This typically includes surgery, hospital stay, 5-7 nights hotel, and transfers. UK prices are £7,000–£10,000 for surgery alone.',
  },
  {
    question: 'Are Turkish breast reduction surgeons qualified?',
    answer: 'Yes. Top Turkish surgeons are board-certified, members of ISAPS (International Society of Aesthetic Plastic Surgery), and perform hundreds of breast reductions annually. High volume means extensive experience. Verify credentials before booking.',
  },
  {
    question: 'What techniques are used for breast reduction in Turkey?',
    answer: 'Turkish surgeons use all standard techniques: anchor (inverted-T) for large reductions, lollipop (vertical) for moderate reductions, and liposuction-assisted for minor reductions. The technique depends on your breast size and goals.',
  },
  {
    question: 'Is breast reduction in Turkey safe?',
    answer: 'Yes, when choosing accredited facilities. Look for JCI-accredited hospitals (international gold standard), board-certified surgeons, and established clinics with verified reviews. Turkey performs thousands of breast reductions annually with excellent outcomes.',
  },
  {
    question: 'How long should I stay in Turkey for breast reduction?',
    answer: 'Plan for 7–10 days. Day 1: surgery with overnight hospital stay. Days 2–5: rest and recovery at hotel, drain removal. Days 6–7: follow-up and fit-to-fly clearance. Flying home is comfortable as sitting is not affected.',
  },
  {
    question: 'What is included in Turkish breast reduction packages?',
    answer: 'All-inclusive packages typically include: surgery, anaesthesia, 1-2 night hospital stay, pre-op tests, compression bra, 5-7 nights hotel, airport transfers, patient coordinator, and follow-up appointments.',
  },
  {
    question: 'Will I have scars after breast reduction in Turkey?',
    answer: 'Yes, scarring is inevitable but surgeons use techniques to minimise visibility. Scars typically fade significantly over 12-18 months. Your surgeon will discuss the incision pattern based on your reduction needs.',
  },
  {
    question: 'Which city is best for breast reduction in Turkey?',
    answer: 'Istanbul has the largest selection of clinics and surgeons — 50+ options with JCI-accredited hospitals. Antalya offers resort-style recovery. Both have experienced surgeons; Istanbul has more choice.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Breast Reduction in Turkey — Experienced Surgeons, Comprehensive Care',
  description: 'Compare breast reduction prices in Turkey. JCI-accredited hospitals, experienced surgeons.',
  url: `${SITE_URL}/procedures/breast-reduction/turkey`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Breast Reduction',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2026-02-03',
}

interface BreastReductionTurkeyPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BreastReductionTurkeyPage({ params }: BreastReductionTurkeyPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Breast Reduction', url: '/procedures/breast-reduction' },
    { name: 'Turkey' },
  ])

  const faqSchema = generateFAQSchema(BREAST_REDUCTION_TURKEY_FAQS)

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
            { name: 'Turkey' },
          ]}
        />
      </div>
      <BreastReductionTurkeyClient faqs={BREAST_REDUCTION_TURKEY_FAQS} />
    </div>
  )
}
