import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { NeckLiftClient } from './neck-lift-client'
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
  title: 'Neck Lift Abroad — Compare Prices & Clinics | MeetYourClinic',
  description:
    'Compare neck lift prices abroad from £2,500. Find verified clinics in Turkey, Poland, Spain & Hungary. Save 50-70% vs UK prices with experienced surgeons.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/neck-lift`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/neck-lift` },
  },
  openGraph: {
    title: 'Neck Lift Abroad — Compare Prices & Clinics',
    description: 'Compare neck lift prices abroad from £2,500. Save 50-70% vs UK.',
    url: `${SITE_URL}/procedures/neck-lift`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const NECK_LIFT_FAQS = [
  {
    question: 'How much does a neck lift cost abroad?',
    answer: 'Neck lift abroad costs £2,500–£5,500 depending on destination and procedure complexity. Turkey offers the lowest prices (£2,500–£4,000), Poland £3,000–£4,500, Hungary £3,200–£4,800, and Spain £4,000–£5,500. UK prices are typically £6,000–£10,000.',
  },
  {
    question: 'Is neck lift surgery abroad safe?',
    answer: 'Yes, when choosing accredited clinics with qualified surgeons. Look for JCI accreditation (Turkey), EU standards (Poland, Hungary, Spain), and board-certified plastic surgeons specialising in facial procedures. Neck lift requires precise technique — verify surgeon experience.',
  },
  {
    question: 'What does a neck lift address?',
    answer: 'Neck lift (lower rhytidectomy) addresses turkey neck, neck bands (platysma muscles), excess fat under the chin, loose/sagging neck skin, and jowls. It creates a more defined jawline and smoother, tighter neck contour.',
  },
  {
    question: 'How long should I stay abroad after a neck lift?',
    answer: 'Plan for 7–10 days abroad. Neck lift has visible recovery — swelling and bruising peak at days 2–3 and take 7–10 days to become presentable. Stitches removed at day 5–7, then fit-to-fly assessment.',
  },
  {
    question: 'What is the recovery time for a neck lift?',
    answer: 'Initial recovery: 1–2 weeks (visible bruising/swelling). Socially presentable: 2 weeks. Return to work: 1–2 weeks (desk job). Full recovery: 2–3 months. Final results: 3–6 months as tissues settle.',
  },
  {
    question: 'Which country is best for neck lift surgery?',
    answer: 'Turkey provides excellent value with high-volume surgeons. Poland and Hungary offer EU standards with competitive pricing. Spain provides premium quality. Choose based on budget, desired quality level, and surgeon expertise.',
  },
  {
    question: 'Am I a good candidate for a neck lift?',
    answer: 'Ideal candidates are 40–70 years old with moderate to significant neck sagging, turkey neck, or neck bands. Good skin elasticity helps results. Non-smokers heal better. Often combined with facelift for comprehensive rejuvenation.',
  },
  {
    question: 'How long do neck lift results last?',
    answer: 'Neck lift results typically last 10–15 years. The neck ages more slowly than the face after surgery. Lifestyle factors (sun exposure, weight fluctuations, smoking) affect longevity. Results are long-lasting with proper care.',
  },
]

const medicalProcedureSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  name: 'Neck Lift',
  alternateName: ['Lower Rhytidectomy', 'Cervicoplasty', 'Platysmaplasty', 'Neck Rejuvenation'],
  description: 'Surgical procedure to improve visible signs of aging in the neck by removing excess skin, tightening muscles, and eliminating fat deposits.',
  procedureType: 'https://schema.org/SurgicalProcedure',
  bodyLocation: 'Neck',
  preparation: 'Medical consultation, stop smoking 4-6 weeks before, avoid blood thinners',
  followup: 'Wound care, wear compression garment, avoid sun exposure, follow-up appointments',
  howPerformed: 'Incisions made behind ears and under chin, platysma muscles tightened, excess skin removed, liposuction if needed',
  status: 'https://schema.org/EventScheduled',
}

interface NeckLiftPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function NeckLiftPage({ params }: NeckLiftPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Neck Lift' },
  ])

  const faqSchema = generateFAQSchema(NECK_LIFT_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalProcedureSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Neck Lift' },
          ]}
        />
      </div>
      <NeckLiftClient faqs={NECK_LIFT_FAQS} />
    </div>
  )
}
