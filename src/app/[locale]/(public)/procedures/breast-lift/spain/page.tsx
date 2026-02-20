import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BreastLiftSpainClient } from './breast-lift-spain-client'
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
  title: 'Breast Lift in Spain — Premium Quality from £4,000 | MeetYourClinic',
  description:
    'Compare breast lift prices in Spain from £4,000. World-class surgeons, #1 healthcare system, Mediterranean recovery. Premium quality with EU protections.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/breast-lift/spain`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/breast-lift/spain` },
  },
  openGraph: {
    title: 'Breast Lift in Spain — Premium Quality from £4,000',
    description: 'Compare breast lift in Spain from £4,000. World-class surgeons, EU standards.',
    url: `${SITE_URL}/procedures/breast-lift/spain`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const BREAST_LIFT_SPAIN_FAQS = [
  {
    question: 'How much does a breast lift cost in Spain?',
    answer: 'A breast lift in Spain costs £4,000–£5,500. This reflects premium quality — world-class surgeons, top facilities, and luxury recovery settings. UK prices are £6,000–£9,000, so savings are 40-50%.',
  },
  {
    question: 'Why is Spain considered premium for breast lifts?',
    answer: 'Spain has the #1 ranked healthcare system (Bloomberg). Spanish surgeons are known for elegant, natural results with meticulous attention to scarring. Facilities meet the highest international standards.',
  },
  {
    question: 'Is a breast lift in Spain safe?',
    answer: 'Yes, extremely. Spain operates under strict EU healthcare regulations. Surgeons are members of SECPRE (Spanish Society of Plastic Surgery) and follow international safety protocols. Facilities are world-class.',
  },
  {
    question: 'Which cities in Spain are best for a breast lift?',
    answer: 'Barcelona is the medical tourism capital with world-class cosmetic surgeons. Marbella offers luxury clinic experiences with resort recovery. Madrid has excellent private hospitals. All have experienced surgeons.',
  },
  {
    question: 'How long should I stay in Spain for a breast lift?',
    answer: 'Plan for 7–10 days. The Mediterranean climate makes recovery pleasant. Short 2–2.5 hour flights from UK make travel easy. Many patients extend their stay to enjoy the surroundings.',
  },
  {
    question: 'What breast lift techniques do Spanish surgeons use?',
    answer: 'Spanish surgeons offer all techniques: periareolar, lollipop, and anchor lifts. They are known for refined technique, minimal visible scarring, and natural-looking results that suit your body proportions.',
  },
  {
    question: 'Do Spanish surgeons speak English?',
    answer: 'Yes. International-facing clinics have English-speaking surgeons and staff. Barcelona and Marbella particularly cater to international patients with full English support.',
  },
  {
    question: 'What makes Spanish surgeons different?',
    answer: 'Spanish surgeons are known for aesthetic sensibility — creating natural, elegant results with attention to detail. The Mediterranean culture values understated beauty, which influences surgical philosophy.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Breast Lift in Spain — Premium Quality, World-Class Surgeons',
  description: 'Compare breast lift prices in Spain. #1 healthcare system, Mediterranean recovery.',
  url: `${SITE_URL}/procedures/breast-lift/spain`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Breast Lift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2026-02-03',
}

interface BreastLiftSpainPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BreastLiftSpainPage({ params }: BreastLiftSpainPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Breast Lift', url: '/procedures/breast-lift' },
    { name: 'Spain' },
  ])

  const faqSchema = generateFAQSchema(BREAST_LIFT_SPAIN_FAQS)

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
            { name: 'Spain' },
          ]}
        />
      </div>
      <BreastLiftSpainClient faqs={BREAST_LIFT_SPAIN_FAQS} />
    </div>
  )
}
