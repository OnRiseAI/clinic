import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { NeckLiftSpainClient } from './neck-lift-spain-client'
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
  title: 'Neck Lift in Spain — Premium Quality from £4,000 | medit',
  description:
    'Compare neck lift prices in Spain from £4,000. World-class facial surgeons, #1 healthcare system, Mediterranean recovery. Premium quality with EU protections.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/neck-lift/spain`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/neck-lift/spain` },
  },
  openGraph: {
    title: 'Neck Lift in Spain — Premium Quality from £4,000',
    description: 'Compare neck lift prices in Spain from £4,000. World-class surgeons, EU standards.',
    url: `${SITE_URL}/procedures/neck-lift/spain`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
  },
}

const NECK_LIFT_SPAIN_FAQS = [
  {
    question: 'How much does a neck lift cost in Spain?',
    answer: 'Neck lift in Spain costs £4,000–£5,500. Traditional neck lift is £4,500–£5,500, neck liposuction £2,500–£3,500. This reflects premium quality — world-class surgeons and top facilities. UK prices are £6,000–£10,000.',
  },
  {
    question: 'Why is Spain considered premium for neck lift?',
    answer: 'Spain has the #1 ranked healthcare system (Bloomberg). Spanish facial surgeons are known for elegant, natural results and artistic attention to facial aesthetics. Facilities meet the highest international standards.',
  },
  {
    question: 'Is neck lift surgery in Spain safe?',
    answer: 'Yes, extremely. Spain operates under strict EU healthcare regulations. Surgeons are members of SECPRE (Spanish Society of Plastic Surgery) and follow international safety protocols. Facilities are world-class.',
  },
  {
    question: 'Which cities in Spain are best for neck lift?',
    answer: 'Barcelona has world-class facial surgeons with international reputations. Marbella offers luxury clinic experiences with resort recovery. Madrid has excellent private hospitals. All have experienced surgeons.',
  },
  {
    question: 'How long should I stay in Spain after a neck lift?',
    answer: 'Plan for 7–10 days. The Mediterranean climate makes recovery pleasant. Stitches removed at day 5–7, then fit-to-fly clearance. Many patients extend their stay to enjoy the surroundings.',
  },
  {
    question: 'What makes Spanish neck lift surgeons different?',
    answer: 'Spanish surgeons are known for aesthetic sensibility — creating natural, refreshed results rather than obviously "done" looks. The Mediterranean culture values understated elegance, which influences surgical philosophy.',
  },
  {
    question: 'Do Spanish facial surgeons speak English?',
    answer: 'Yes. International-facing clinics have English-speaking surgeons and staff. Barcelona and Marbella particularly cater to international patients with full English support.',
  },
  {
    question: 'Can I combine neck lift with facelift in Spain?',
    answer: 'Yes. Spanish surgeons excel at comprehensive facial rejuvenation combining neck lift with facelift, blepharoplasty, or fat transfer. The artistic approach ensures harmonious results.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Neck Lift in Spain — Premium Quality, World-Class Surgeons',
  description: 'Compare neck lift prices in Spain. #1 healthcare system, Mediterranean recovery.',
  url: `${SITE_URL}/procedures/neck-lift/spain`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Neck Lift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2025-02-03',
}

interface NeckLiftSpainPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function NeckLiftSpainPage({ params }: NeckLiftSpainPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Neck Lift', url: '/procedures/neck-lift' },
    { name: 'Spain' },
  ])

  const faqSchema = generateFAQSchema(NECK_LIFT_SPAIN_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalWebPageSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Neck Lift', url: '/procedures/neck-lift' },
            { name: 'Spain' },
          ]}
        />
      </div>
      <NeckLiftSpainClient faqs={NECK_LIFT_SPAIN_FAQS} />
    </div>
  )
}
