import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BrowLiftSpainClient } from './brow-lift-spain-client'
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
  title: 'Brow Lift in Spain — From £3,500 Premium Quality | medit',
  description:
    'Compare brow lift prices in Spain from £3,500. Premium EU clinics, renowned facial surgeons, luxury recovery. Save 40-50% vs UK prices.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/brow-lift/spain`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/brow-lift/spain` },
  },
  openGraph: {
    title: 'Brow Lift in Spain — From £3,500 Premium Quality',
    description: 'Compare brow lift prices in Spain from £3,500. Premium EU clinics, renowned surgeons.',
    url: `${SITE_URL}/procedures/brow-lift/spain`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
  },
}

const BROW_LIFT_SPAIN_FAQS = [
  {
    question: 'How much does a brow lift cost in Spain?',
    answer: 'Brow lift in Spain costs £3,500–£4,500 all-inclusive. Endoscopic brow lift is £3,500–£4,000, coronal brow lift £4,000–£4,500. Packages include surgery, hospital stay, hotel, and transfers. UK prices are £5,000–£8,000.',
  },
  {
    question: 'Are Spanish brow lift surgeons qualified?',
    answer: 'Yes. Spanish plastic surgeons are EU-trained and certified, with many recognised internationally. Spain has a long tradition of cosmetic surgery excellence, with surgeons often presenting at international conferences.',
  },
  {
    question: 'Is brow lift in Spain safe?',
    answer: 'Yes. Spain has excellent healthcare infrastructure meeting strict EU standards. Many clinics are internationally accredited and equipped with the latest technology for facial procedures.',
  },
  {
    question: 'How long should I stay in Spain after a brow lift?',
    answer: 'Plan for 5–7 days. Brow lift has moderate recovery — swelling and bruising peak at days 2–3. Stitches or staples are removed at day 7–10, then fit-to-fly assessment.',
  },
  {
    question: 'What types of brow lift are available in Spain?',
    answer: 'Endoscopic brow lift (most popular), coronal brow lift, temporal brow lift, and direct brow lift. Spanish surgeons can also combine with blepharoplasty or facelift for comprehensive rejuvenation.',
  },
  {
    question: 'Which city is best for brow lift in Spain?',
    answer: 'Barcelona and Madrid have excellent clinics with renowned facial surgeons. Barcelona is particularly popular for medical tourism with its combination of world-class healthcare and Mediterranean lifestyle.',
  },
  {
    question: 'What is included in a brow lift package in Spain?',
    answer: 'All-inclusive packages typically include: surgery, anaesthesia, hospital stay (1 night), pre-op tests, medications, 5–7 nights hotel, airport transfers, and follow-up appointments.',
  },
  {
    question: 'What are the advantages of brow lift in Spain?',
    answer: 'Premium EU medical standards, renowned surgeons, excellent climate for recovery, short flights from UK (2–2.5 hours), English widely spoken in medical settings, and pleasant recovery environment.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Brow Lift in Spain — Premium Quality, Renowned Surgeons',
  description: 'Compare brow lift prices in Spain. All-inclusive packages from £3,500.',
  url: `${SITE_URL}/procedures/brow-lift/spain`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Brow Lift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2025-02-03',
}

interface BrowLiftSpainPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BrowLiftSpainPage({ params }: BrowLiftSpainPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Brow Lift', url: '/procedures/brow-lift' },
    { name: 'Spain' },
  ])

  const faqSchema = generateFAQSchema(BROW_LIFT_SPAIN_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalWebPageSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Brow Lift', url: '/procedures/brow-lift' },
            { name: 'Spain' },
          ]}
        />
      </div>
      <BrowLiftSpainClient faqs={BROW_LIFT_SPAIN_FAQS} />
    </div>
  )
}
