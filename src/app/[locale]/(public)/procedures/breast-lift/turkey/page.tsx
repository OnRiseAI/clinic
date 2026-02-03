import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BreastLiftTurkeyClient } from './breast-lift-turkey-client'
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
  title: 'Breast Lift in Turkey — From £2,500 All-Inclusive | medit',
  description:
    'Compare breast lift prices in Turkey from £2,500. JCI-accredited hospitals, experienced surgeons, all-inclusive packages. Save 60-70% vs UK prices.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/breast-lift/turkey`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/breast-lift/turkey` },
  },
  openGraph: {
    title: 'Breast Lift in Turkey — From £2,500 All-Inclusive',
    description: 'Compare breast lift in Turkey from £2,500. JCI hospitals, experienced surgeons.',
    url: `${SITE_URL}/procedures/breast-lift/turkey`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
  },
}

const BREAST_LIFT_TURKEY_FAQS = [
  {
    question: 'How much does a breast lift cost in Turkey?',
    answer: 'A breast lift in Turkey costs £2,500–£3,500 all-inclusive. This typically includes surgery, hospital stay, 5-7 nights hotel, and transfers. UK prices are £6,000–£9,000 for surgery alone.',
  },
  {
    question: 'Are Turkish breast lift surgeons qualified?',
    answer: 'Yes. Top Turkish surgeons are board-certified, members of ISAPS (International Society of Aesthetic Plastic Surgery), and perform hundreds of breast lifts annually. High volume means extensive experience. Verify credentials before booking.',
  },
  {
    question: 'What breast lift techniques are used in Turkey?',
    answer: 'Turkish clinics offer all standard techniques: periareolar (donut), lollipop (vertical), and anchor (inverted-T) lifts. Your surgeon will recommend the best technique based on your degree of sagging and goals.',
  },
  {
    question: 'Is a breast lift in Turkey safe?',
    answer: 'Yes, when choosing accredited facilities. Look for JCI-accredited hospitals (international gold standard), board-certified surgeons, and established clinics with verified reviews. Turkey performs thousands of breast lifts annually with excellent outcomes.',
  },
  {
    question: 'How long should I stay in Turkey for a breast lift?',
    answer: 'Plan for 7–10 days. Day 1: surgery with overnight hospital stay. Days 2–5: rest and recovery at hotel. Days 6–7: follow-up and fit-to-fly clearance. Flying home is comfortable as you can sit normally.',
  },
  {
    question: 'What is included in Turkish breast lift packages?',
    answer: 'All-inclusive packages typically include: surgery, anaesthesia, 1-night hospital stay, pre-op tests, support bra, 5-7 nights hotel, airport transfers, patient coordinator, and follow-up appointments.',
  },
  {
    question: 'Can I combine a breast lift with implants in Turkey?',
    answer: 'Yes. Breast lift with augmentation (mastopexy augmentation) is a popular combination that lifts sagging breasts while adding volume. Many Turkish surgeons specialise in this combined procedure.',
  },
  {
    question: 'Which city is best for a breast lift in Turkey?',
    answer: 'Istanbul has the largest selection of clinics and surgeons — 50+ options with JCI-accredited hospitals. Antalya offers resort-style recovery. Both have experienced surgeons; Istanbul has more choice.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Breast Lift in Turkey — Experienced Surgeons, Comprehensive Packages',
  description: 'Compare breast lift prices in Turkey. JCI-accredited hospitals, all-inclusive packages.',
  url: `${SITE_URL}/procedures/breast-lift/turkey`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Breast Lift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2025-02-03',
}

interface BreastLiftTurkeyPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BreastLiftTurkeyPage({ params }: BreastLiftTurkeyPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Breast Lift', url: '/procedures/breast-lift' },
    { name: 'Turkey' },
  ])

  const faqSchema = generateFAQSchema(BREAST_LIFT_TURKEY_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalWebPageSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Breast Lift', url: '/procedures/breast-lift' },
            { name: 'Turkey' },
          ]}
        />
      </div>
      <BreastLiftTurkeyClient faqs={BREAST_LIFT_TURKEY_FAQS} />
    </div>
  )
}
