import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BreastLiftPolandClient } from './breast-lift-poland-client'
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
  title: 'Breast Lift in Poland — EU Standards from £3,000 | medit',
  description:
    'Compare breast lift prices in Poland from £3,000. EU healthcare standards, short flights from UK, natural results focus. Save 50-60% vs UK prices.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/breast-lift/poland`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/breast-lift/poland` },
  },
  openGraph: {
    title: 'Breast Lift in Poland — EU Standards from £3,000',
    description: 'Compare breast lift in Poland from £3,000. EU protections, natural results.',
    url: `${SITE_URL}/procedures/breast-lift/poland`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
  },
}

const BREAST_LIFT_POLAND_FAQS = [
  {
    question: 'How much does a breast lift cost in Poland?',
    answer: 'A breast lift in Poland costs £3,000–£4,000. This includes surgery, hospital stay, and follow-up care. Accommodation packages available. UK prices are £6,000–£9,000.',
  },
  {
    question: 'Is a breast lift in Poland safe?',
    answer: 'Yes. Poland operates under EU healthcare regulations — the same standards that apply across Europe. Surgeons must be registered with the Polish Medical Chamber with specialist certification in plastic surgery.',
  },
  {
    question: 'Why choose Poland for a breast lift?',
    answer: 'Poland offers EU patient protections, experienced surgeons, and short 2-hour flights from the UK. Polish surgeons are known for natural, elegant results rather than dramatic transformations.',
  },
  {
    question: 'How long should I stay in Poland for a breast lift?',
    answer: 'Plan for 5–7 days. Day 1: surgery with overnight stay. Days 2–4: rest at hotel. Days 5–6: follow-up and fit-to-fly clearance. The short 2-hour flight home is comfortable.',
  },
  {
    question: 'What breast lift techniques are used in Poland?',
    answer: 'Polish clinics offer all standard techniques: periareolar, lollipop, and anchor lifts. Surgeons are known for precise technique and attention to scarring, aiming for natural-looking results.',
  },
  {
    question: 'Which cities in Poland offer breast lifts?',
    answer: 'Warsaw has the most options with modern private clinics. Krakow also has excellent cosmetic surgery clinics in a beautiful historic setting. Both cities are well-connected with UK flights.',
  },
  {
    question: 'Do Polish surgeons speak English?',
    answer: 'Yes. Surgeons at international-facing clinics speak fluent English. Patient coordinators provide full support throughout your journey. Communication is straightforward.',
  },
  {
    question: 'Can I combine a breast lift with other procedures in Poland?',
    answer: 'Yes. Popular combinations include breast lift with implants (mastopexy augmentation), or with liposuction or tummy tuck as part of a mummy makeover. Discuss options with your surgeon.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Breast Lift in Poland — EU Standards, Natural Results',
  description: 'Compare breast lift prices in Poland. EU healthcare standards, short flights from UK.',
  url: `${SITE_URL}/procedures/breast-lift/poland`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Breast Lift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2025-02-03',
}

interface BreastLiftPolandPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BreastLiftPolandPage({ params }: BreastLiftPolandPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Breast Lift', url: '/procedures/breast-lift' },
    { name: 'Poland' },
  ])

  const faqSchema = generateFAQSchema(BREAST_LIFT_POLAND_FAQS)

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
            { name: 'Poland' },
          ]}
        />
      </div>
      <BreastLiftPolandClient faqs={BREAST_LIFT_POLAND_FAQS} />
    </div>
  )
}
