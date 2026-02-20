import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BBLSpainClient } from './bbl-spain-client'
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
  title: 'BBL in Spain — Premium Quality, World-Class Surgeons | MeetYourClinic',
  description:
    'Compare BBL prices in Spain from £4,500. Brazilian Butt Lift at world-class Barcelona & Marbella clinics. #1 healthcare system, premium recovery experience.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/bbl/spain`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/bbl/spain` },
  },
  openGraph: {
    title: 'BBL in Spain — Premium Quality, World-Class Surgeons',
    description: 'Compare BBL prices in Spain from £4,500. World-class surgeons, premium recovery.',
    url: `${SITE_URL}/procedures/bbl/spain`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const BBL_SPAIN_FAQS = [
  {
    question: 'How much does a BBL cost in Spain?',
    answer: 'BBL in Spain costs £4,500–£6,500. This is higher than Turkey or Poland but reflects premium facilities and world-class surgeons. Spain offers 40–50% savings compared to UK prices of £8,000–£12,000.',
  },
  {
    question: 'Why choose Spain for BBL?',
    answer: 'Spain has the #1 ranked healthcare system (Bloomberg). Spanish surgeons are world-class with conservative, natural aesthetics. The Mediterranean climate is ideal for recovery. Choose Spain if quality and experience matter more than maximum savings.',
  },
  {
    question: 'Is BBL in Spain safe?',
    answer: 'Yes. Spain\'s healthcare is among the world\'s best. Surgeons follow strict EU regulations and international safety protocols. Many are members of SECPRE (Spanish Society of Plastic Surgery) with extensive training.',
  },
  {
    question: 'Which cities in Spain offer BBL?',
    answer: 'Barcelona has world-class cosmetic surgeons and hospitals. Marbella/Costa del Sol offers premium clinics with luxury recovery. Madrid has excellent options. All have strong international patient infrastructure.',
  },
  {
    question: 'How long should I stay in Spain for BBL?',
    answer: 'Plan for 10–14 days. The 2–2.5 hour flight home is manageable with a BBL pillow. Spain\'s climate and resort options make extended recovery pleasant.',
  },
  {
    question: 'What results can I expect from BBL in Spain?',
    answer: 'Spanish surgeons are known for elegant, natural-looking results. Expect sophisticated body contouring rather than extreme augmentation. Discuss your goals during consultation to ensure alignment.',
  },
  {
    question: 'Can I combine BBL with other procedures in Spain?',
    answer: 'Yes. Spanish surgeons offer comprehensive body contouring including BBL + tummy tuck, BBL + breast surgery. Premium facilities can safely handle combination procedures.',
  },
  {
    question: 'Do Spanish surgeons speak English?',
    answer: 'Yes. Surgeons at international clinics speak English fluently. Barcelona and Marbella have particularly strong English proficiency due to tourism. Patient coordinators provide full support.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'BBL in Spain — Premium Brazilian Butt Lift',
  description: 'Compare BBL prices in Spain from world-class clinics in Barcelona and Marbella.',
  url: `${SITE_URL}/procedures/bbl/spain`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Brazilian Butt Lift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2026-02-03',
}

interface BBLSpainPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BBLSpainPage({ params }: BBLSpainPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'BBL', url: '/procedures/bbl' },
    { name: 'Spain' },
  ])

  const faqSchema = generateFAQSchema(BBL_SPAIN_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalWebPageSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'BBL', url: '/procedures/bbl' },
            { name: 'Spain' },
          ]}
        />
      </div>
      <BBLSpainClient faqs={BBL_SPAIN_FAQS} />
    </div>
  )
}
