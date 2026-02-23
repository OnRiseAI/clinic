import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BrowLiftClient } from './brow-lift-client'
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
  title: 'Brow Lift Abroad — Compare Prices & Clinics | MeetYourClinic',
  description:
    'Compare brow lift prices abroad from £2,000. Find verified clinics in Turkey, Poland, Spain & Hungary. Save 50-70% vs UK prices with experienced surgeons.',
  alternates: {
    canonical: `/procedures/brow-lift`,
    languages: { 'en-GB': `/procedures/brow-lift` },
  },
  openGraph: {
    title: 'Brow Lift Abroad — Compare Prices & Clinics',
    description: 'Compare brow lift prices abroad from £2,000. Save 50-70% vs UK.',
    url: `${SITE_URL}/procedures/brow-lift`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const BROW_LIFT_FAQS = [
  {
    question: 'How much does a brow lift cost abroad?',
    answer: 'Brow lift abroad costs £2,000–£4,500 depending on destination and technique. Turkey offers the lowest prices (£2,000–£3,000), Poland £2,500–£3,500, Hungary £2,800–£3,800, and Spain £3,500–£4,500. UK prices are typically £5,000–£8,000.',
  },
  {
    question: 'Is brow lift surgery abroad safe?',
    answer: 'Yes, when choosing accredited clinics with qualified surgeons. Look for JCI accreditation (Turkey), EU standards (Poland, Hungary, Spain), and board-certified plastic surgeons specialising in facial procedures. Brow lift requires precise technique to achieve natural results.',
  },
  {
    question: 'What types of brow lift are available?',
    answer: 'Endoscopic brow lift (minimally invasive, small incisions), coronal brow lift (traditional, longer incision), temporal/lateral brow lift (targets outer brow), and direct brow lift (incision above eyebrow). Endoscopic is most common today.',
  },
  {
    question: 'How long should I stay abroad after a brow lift?',
    answer: 'Plan for 5–7 days abroad. Brow lift has moderate recovery — swelling and bruising peak at days 2–3 and reduce significantly by day 5–7. Stitches or staples removed at day 7–10.',
  },
  {
    question: 'What is the recovery time for a brow lift?',
    answer: 'Initial recovery: 1–2 weeks (visible bruising/swelling). Socially presentable: 1–2 weeks. Return to work: 1–2 weeks (desk job). Full recovery: 2–3 months. Final results: 3–6 months as tissues settle.',
  },
  {
    question: 'Which country is best for brow lift surgery?',
    answer: 'Turkey offers excellent value with experienced surgeons. Poland and Hungary combine EU standards with competitive pricing. Spain offers premium quality. Choose based on budget, desired quality level, and surgeon expertise.',
  },
  {
    question: 'Am I a good candidate for a brow lift?',
    answer: 'Ideal candidates have sagging or drooping brows, deep forehead wrinkles, frown lines between eyebrows, or a tired/angry appearance due to brow position. Good skin elasticity and realistic expectations are important. Typically ages 40–65.',
  },
  {
    question: 'How long do brow lift results last?',
    answer: 'Brow lift results typically last 5–10 years. You continue aging naturally but from a more refreshed baseline. Lifestyle factors (sun exposure, smoking, skincare) affect longevity. Some patients combine with other facial procedures.',
  },
]

const medicalProcedureSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  name: 'Brow Lift',
  alternateName: ['Forehead Lift', 'Browplasty', 'Forehead Rejuvenation'],
  description: 'Surgical procedure to raise the eyebrows and reduce forehead wrinkles by removing excess skin and tightening underlying tissues.',
  procedureType: 'https://schema.org/SurgicalProcedure',
  bodyLocation: 'Forehead',
  preparation: 'Medical consultation, stop smoking 4-6 weeks before, avoid blood thinners',
  followup: 'Wound care, avoid sun exposure, sleep elevated, follow-up appointments',
  howPerformed: 'Incisions made at hairline or through small endoscopic ports, brow tissues lifted and secured in higher position',
  status: 'https://schema.org/EventScheduled',
}

interface BrowLiftPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BrowLiftPage({ params }: BrowLiftPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Brow Lift' },
  ])

  const faqSchema = generateFAQSchema(BROW_LIFT_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalProcedureSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Brow Lift' },
          ]}
        />
      </div>
      <BrowLiftClient faqs={BROW_LIFT_FAQS} />
    </div>
  )
}
