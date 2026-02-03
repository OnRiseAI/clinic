import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BreastLiftHungaryClient } from './breast-lift-hungary-client'
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
  title: 'Breast Lift in Hungary — EU Quality from £3,200 | medit',
  description:
    'Compare breast lift prices in Hungary from £3,200. EU healthcare standards, Budapest medical tourism expertise. Save 50-55% vs UK prices.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/breast-lift/hungary`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/breast-lift/hungary` },
  },
  openGraph: {
    title: 'Breast Lift in Hungary — EU Quality from £3,200',
    description: 'Compare breast lift in Hungary from £3,200. EU standards, quality focus.',
    url: `${SITE_URL}/procedures/breast-lift/hungary`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
  },
}

const BREAST_LIFT_HUNGARY_FAQS = [
  {
    question: 'How much does a breast lift cost in Hungary?',
    answer: 'A breast lift in Hungary costs £3,200–£4,200. This includes surgery, hospital stay, and follow-up care. Accommodation packages available. UK prices are £6,000–£9,000.',
  },
  {
    question: 'Is a breast lift in Hungary safe?',
    answer: 'Yes. Hungary is an EU member with healthcare regulated to European standards. Surgeons must be registered with the Hungarian Medical Chamber. Hungary has decades of medical tourism experience.',
  },
  {
    question: 'Why choose Hungary for a breast lift?',
    answer: 'Hungary offers EU patient protections, good value pricing, and extensive medical tourism infrastructure built from decades of dental tourism. Budapest is beautiful and affordable for extended recovery.',
  },
  {
    question: 'How long should I stay in Hungary for a breast lift?',
    answer: 'Plan for 5–7 days. The 2.5-hour flight home is comfortable. Budapest\'s thermal baths can aid relaxation during later recovery (after incisions heal).',
  },
  {
    question: 'What breast lift techniques are used in Hungary?',
    answer: 'Hungarian clinics offer all standard techniques: periareolar, lollipop, and anchor lifts. Surgeons take a conservative approach, focusing on natural-looking results with minimal visible scarring.',
  },
  {
    question: 'Which clinics in Hungary offer breast lifts?',
    answer: 'Budapest has established cosmetic surgery clinics with experienced surgeons. Look for clinics with English-speaking staff, verified reviews, and before/after photos of similar cases.',
  },
  {
    question: 'Do Hungarian surgeons speak English?',
    answer: 'Yes. Surgeons at international-facing clinics speak English. Hungary has decades of medical tourism experience from dental work, with excellent patient coordinator support.',
  },
  {
    question: 'Can I combine a breast lift with thermal spa recovery?',
    answer: 'Yes, but not immediately. Wait until incisions are fully healed (4–6 weeks) before using thermal baths. The baths can aid relaxation in later recovery stages or on a return visit.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Breast Lift in Hungary — EU Standards, Budapest',
  description: 'Compare breast lift prices in Hungary. EU healthcare standards, quality focus.',
  url: `${SITE_URL}/procedures/breast-lift/hungary`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Breast Lift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2025-02-03',
}

interface BreastLiftHungaryPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BreastLiftHungaryPage({ params }: BreastLiftHungaryPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Breast Lift', url: '/procedures/breast-lift' },
    { name: 'Hungary' },
  ])

  const faqSchema = generateFAQSchema(BREAST_LIFT_HUNGARY_FAQS)

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
            { name: 'Hungary' },
          ]}
        />
      </div>
      <BreastLiftHungaryClient faqs={BREAST_LIFT_HUNGARY_FAQS} />
    </div>
  )
}
