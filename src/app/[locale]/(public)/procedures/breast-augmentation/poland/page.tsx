import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BreastAugmentationPolandClient } from './breast-augmentation-poland-client'
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
  title: 'Breast Augmentation in Poland — EU Standards from £3,000 | medit',
  description:
    'Compare breast augmentation prices in Poland from £3,000. Premium implants with EU protections, short flights from UK, natural results focus. Save 50-60% vs UK.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/breast-augmentation/poland`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/breast-augmentation/poland` },
  },
  openGraph: {
    title: 'Breast Augmentation in Poland — EU Standards from £3,000',
    description: 'Compare breast augmentation in Poland from £3,000. EU protections, premium implants.',
    url: `${SITE_URL}/procedures/breast-augmentation/poland`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
  },
}

const BREAST_AUG_POLAND_FAQS = [
  {
    question: 'How much does breast augmentation cost in Poland?',
    answer: 'Breast augmentation in Poland costs £3,000–£4,500. This includes surgery, premium implants (Mentor, Allergan, Motiva), and hospital stay. Accommodation packages available. UK prices are £6,000–£10,000.',
  },
  {
    question: 'Is breast augmentation in Poland safe?',
    answer: 'Yes. Poland operates under EU healthcare regulations — the same standards that applied in the UK pre-Brexit. Surgeons must be registered with the Polish Medical Chamber. All implants are CE-marked and EU-approved.',
  },
  {
    question: 'Why choose Poland for breast augmentation?',
    answer: 'Poland offers EU patient protections, premium implants at mid-range prices, and short 2-hour flights from the UK. Polish surgeons are known for natural, proportionate results rather than extreme augmentation.',
  },
  {
    question: 'How long should I stay in Poland for breast augmentation?',
    answer: 'Plan for 5–7 days. Day 1: surgery with overnight stay. Days 2–4: rest at hotel. Days 5–6: follow-up and fit-to-fly clearance. The short 2-hour flight home is comfortable.',
  },
  {
    question: 'What implant brands are used in Poland?',
    answer: 'Polish clinics use EU-approved premium brands: Mentor, Allergan Natrelle, Motiva, Sebbin, and Polytech. All come with manufacturer warranties. Surgeons help you choose based on your goals.',
  },
  {
    question: 'Which cities in Poland offer breast augmentation?',
    answer: 'Warsaw has the most options with modern private clinics. Kraków also has excellent cosmetic surgery clinics in a beautiful historic setting. Both cities are well-connected with UK flights.',
  },
  {
    question: 'Do Polish surgeons speak English?',
    answer: 'Yes. Surgeons at international-facing clinics speak fluent English. Patient coordinators provide full support throughout your journey. Communication is straightforward.',
  },
  {
    question: 'Can I combine breast augmentation with other procedures?',
    answer: 'Yes. Popular combinations include breast augmentation with lift (mastopexy augmentation), or with liposuction. Discuss options with your surgeon to determine what\'s safe and appropriate.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Breast Augmentation in Poland — EU Standards, Premium Implants',
  description: 'Compare breast augmentation prices in Poland. EU healthcare standards, short flights from UK.',
  url: `${SITE_URL}/procedures/breast-augmentation/poland`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Breast Augmentation',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2025-02-03',
}

interface BreastAugmentationPolandPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BreastAugmentationPolandPage({ params }: BreastAugmentationPolandPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Breast Augmentation', url: '/procedures/breast-augmentation' },
    { name: 'Poland' },
  ])

  const faqSchema = generateFAQSchema(BREAST_AUG_POLAND_FAQS)

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
            { name: 'Poland' },
          ]}
        />
      </div>
      <BreastAugmentationPolandClient faqs={BREAST_AUG_POLAND_FAQS} />
    </div>
  )
}
