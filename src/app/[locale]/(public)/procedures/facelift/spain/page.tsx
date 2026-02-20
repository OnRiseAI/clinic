import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { FaceliftSpainClient } from './facelift-spain-client'
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
  title: 'Facelift in Spain — Premium Quality from £5,500 | MeetYourClinic',
  description:
    'Compare facelift prices in Spain from £5,500. World-class facial surgeons, #1 healthcare system, Mediterranean recovery. Premium quality with EU protections.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/facelift/spain`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/facelift/spain` },
  },
  openGraph: {
    title: 'Facelift in Spain — Premium Quality from £5,500',
    description: 'Compare facelift prices in Spain from £5,500. World-class surgeons, EU standards.',
    url: `${SITE_URL}/procedures/facelift/spain`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const FACELIFT_SPAIN_FAQS = [
  {
    question: 'How much does a facelift cost in Spain?',
    answer: 'Facelift in Spain costs £5,500–£8,000. Full facelift is £7,000–£8,000, mini facelift £5,500–£6,500. This reflects premium quality — world-class surgeons and top facilities. UK prices are £8,000–£15,000.',
  },
  {
    question: 'Why is Spain considered premium for facelift?',
    answer: 'Spain has the #1 ranked healthcare system (Bloomberg). Spanish facial surgeons are known for elegant, natural results and artistic attention to facial aesthetics. Facilities meet the highest international standards.',
  },
  {
    question: 'Is facelift surgery in Spain safe?',
    answer: 'Yes, extremely. Spain operates under strict EU healthcare regulations. Surgeons are members of SECPRE (Spanish Society of Plastic Surgery) and follow international safety protocols. Facilities are world-class.',
  },
  {
    question: 'Which cities in Spain are best for facelift?',
    answer: 'Barcelona has world-class facial surgeons with international reputations. Marbella offers luxury clinic experiences with resort recovery. Madrid has excellent private hospitals. All have experienced surgeons.',
  },
  {
    question: 'How long should I stay in Spain after a facelift?',
    answer: 'Plan for 10–14 days. The Mediterranean climate makes recovery pleasant. Stitches removed at day 7–10, then fit-to-fly clearance. Many patients extend their stay to enjoy the surroundings.',
  },
  {
    question: 'What makes Spanish facelift surgeons different?',
    answer: 'Spanish surgeons are known for aesthetic sensibility — creating natural, refreshed results rather than obviously "done" looks. The Mediterranean culture values understated elegance, which influences surgical philosophy.',
  },
  {
    question: 'Do Spanish facial surgeons speak English?',
    answer: 'Yes. International-facing clinics have English-speaking surgeons and staff. Barcelona and Marbella particularly cater to international patients with full English support.',
  },
  {
    question: 'Can I combine facelift with other procedures in Spain?',
    answer: 'Yes. Spanish surgeons excel at comprehensive facial rejuvenation combining facelift with blepharoplasty, brow lift, neck lift, or fat transfer. The artistic approach ensures harmonious results.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Facelift in Spain — Premium Quality, World-Class Surgeons',
  description: 'Compare facelift prices in Spain. #1 healthcare system, Mediterranean recovery.',
  url: `${SITE_URL}/procedures/facelift/spain`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Facelift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2026-02-03',
}

interface FaceliftSpainPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function FaceliftSpainPage({ params }: FaceliftSpainPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Facelift', url: '/procedures/facelift' },
    { name: 'Spain' },
  ])

  const faqSchema = generateFAQSchema(FACELIFT_SPAIN_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalWebPageSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Facelift', url: '/procedures/facelift' },
            { name: 'Spain' },
          ]}
        />
      </div>
      <FaceliftSpainClient faqs={FACELIFT_SPAIN_FAQS} />
    </div>
  )
}
