import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BreastAugmentationHungaryClient } from './breast-augmentation-hungary-client'
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
  title: 'Breast Augmentation in Hungary — EU Quality from £3,200 | MeetYourClinic',
  description:
    'Compare breast augmentation prices in Hungary from £3,200. Premium implants with EU standards, Budapest medical tourism expertise. Save 50-55% vs UK prices.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/breast-augmentation/hungary`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/breast-augmentation/hungary` },
  },
  openGraph: {
    title: 'Breast Augmentation in Hungary — EU Quality from £3,200',
    description: 'Compare breast augmentation in Hungary from £3,200. EU standards, premium implants.',
    url: `${SITE_URL}/procedures/breast-augmentation/hungary`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const BREAST_AUG_HUNGARY_FAQS = [
  {
    question: 'How much does breast augmentation cost in Hungary?',
    answer: 'Breast augmentation in Hungary costs £3,200–£4,800. This includes surgery, premium implants (Mentor, Allergan, Motiva), and hospital stay. Accommodation packages available. UK prices are £6,000–£10,000.',
  },
  {
    question: 'Is breast augmentation in Hungary safe?',
    answer: 'Yes. Hungary is an EU member with healthcare regulated to European standards. Surgeons must be registered with the Hungarian Medical Chamber. Hungary has decades of medical tourism experience.',
  },
  {
    question: 'Why choose Hungary for breast augmentation?',
    answer: 'Hungary offers EU patient protections, good value pricing, and extensive medical tourism infrastructure built from decades of dental tourism. Budapest is beautiful and affordable for extended recovery.',
  },
  {
    question: 'How long should I stay in Hungary for breast augmentation?',
    answer: 'Plan for 5–7 days. The 2.5-hour flight home is comfortable. Budapest\'s thermal baths can aid relaxation during later recovery (after incisions heal).',
  },
  {
    question: 'What implant brands are used in Hungary?',
    answer: 'Hungarian clinics use EU-approved premium brands: Mentor, Allergan Natrelle, Motiva, Sebbin, and Polytech. All come with manufacturer warranties. Same brands as UK clinics.',
  },
  {
    question: 'Which clinics in Hungary offer breast augmentation?',
    answer: 'Budapest has established cosmetic surgery clinics with experienced surgeons. Look for clinics with English-speaking staff, verified reviews, and before/after photos of similar cases.',
  },
  {
    question: 'Do Hungarian surgeons speak English?',
    answer: 'Yes. Surgeons at international-facing clinics speak English. Hungary has decades of medical tourism experience from dental work, with excellent patient coordinator support.',
  },
  {
    question: 'Can I combine breast augmentation with thermal spa recovery?',
    answer: 'Yes, but not immediately. Wait until incisions are fully healed (4–6 weeks) before using thermal baths. The baths can aid relaxation in later recovery stages or on a return visit.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Breast Augmentation in Hungary — EU Standards, Budapest',
  description: 'Compare breast augmentation prices in Hungary. EU healthcare standards, premium implants.',
  url: `${SITE_URL}/procedures/breast-augmentation/hungary`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Breast Augmentation',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2026-02-03',
}

interface BreastAugmentationHungaryPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BreastAugmentationHungaryPage({ params }: BreastAugmentationHungaryPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Breast Augmentation', url: '/procedures/breast-augmentation' },
    { name: 'Hungary' },
  ])

  const faqSchema = generateFAQSchema(BREAST_AUG_HUNGARY_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalWebPageSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Breast Augmentation', url: '/procedures/breast-augmentation' },
            { name: 'Hungary' },
          ]}
        />
      </div>
      <BreastAugmentationHungaryClient faqs={BREAST_AUG_HUNGARY_FAQS} />
    </div>
  )
}
