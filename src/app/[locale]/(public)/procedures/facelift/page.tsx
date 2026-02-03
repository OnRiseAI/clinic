import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { FaceliftClient } from './facelift-client'
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
  title: 'Facelift Abroad — Compare Prices & Clinics | medit',
  description:
    'Compare facelift prices abroad from £3,000. Find verified clinics in Turkey, Poland, Spain & Hungary. Save 50-70% vs UK prices with experienced surgeons.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/facelift`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/facelift` },
  },
  openGraph: {
    title: 'Facelift Abroad — Compare Prices & Clinics',
    description: 'Compare facelift prices abroad from £3,000. Save 50-70% vs UK.',
    url: `${SITE_URL}/procedures/facelift`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
  },
}

const FACELIFT_FAQS = [
  {
    question: 'How much does a facelift cost abroad?',
    answer: 'Facelift abroad costs £3,000–£8,000 depending on destination and procedure type. Turkey offers the lowest prices (£3,000–£5,500), Poland £4,000–£6,000, Hungary £4,500–£6,500, and Spain £5,500–£8,000. UK prices are typically £8,000–£15,000.',
  },
  {
    question: 'Is facelift surgery abroad safe?',
    answer: 'Yes, when choosing accredited clinics with qualified surgeons. Look for JCI accreditation (Turkey), EU standards (Poland, Hungary, Spain), and board-certified plastic surgeons specialising in facial procedures. Facelift requires precise technique — verify surgeon experience.',
  },
  {
    question: 'What types of facelift are available?',
    answer: 'Full facelift (addresses entire face and neck), mini facelift (lower face, less invasive), mid-facelift (cheeks and under-eyes), lower facelift (jowls and jawline), and neck lift (often combined). Surgeons recommend based on your concerns and age.',
  },
  {
    question: 'How long should I stay abroad after a facelift?',
    answer: 'Plan for 10–14 days abroad. Facelift has more visible recovery than other procedures — swelling and bruising peak at days 2–3 and take 10–14 days to become socially presentable. Stitches removed at day 7–10.',
  },
  {
    question: 'What is the recovery time for a facelift?',
    answer: 'Initial recovery: 2 weeks (visible bruising/swelling). Socially presentable: 2–3 weeks. Return to work: 2–3 weeks (desk job). Full recovery: 3–6 months. Final results: 6–12 months as tissues settle.',
  },
  {
    question: 'Which country is best for facelift surgery?',
    answer: 'Spain and Poland offer premium quality with EU standards. Turkey provides excellent value with high-volume surgeons. Hungary combines EU protections with competitive pricing. Choose based on budget, desired quality level, and surgeon expertise.',
  },
  {
    question: 'Am I a good candidate for a facelift?',
    answer: 'Ideal candidates are 40–70 years old with moderate to significant facial sagging, good skin elasticity, realistic expectations, and good overall health. Non-smokers heal better. Consultation determines the right procedure type.',
  },
  {
    question: 'How long do facelift results last?',
    answer: 'Facelift results typically last 7–10 years. You continue aging naturally but from a "younger baseline". Lifestyle factors (sun exposure, smoking, skincare) affect longevity. Some patients have a secondary lift after 10+ years.',
  },
]

const medicalProcedureSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  name: 'Facelift',
  alternateName: ['Rhytidectomy', 'Face Lift Surgery', 'Facial Rejuvenation'],
  description: 'Surgical procedure to reduce visible signs of aging in the face and neck by removing excess skin and tightening underlying tissues.',
  procedureType: 'https://schema.org/SurgicalProcedure',
  bodyLocation: 'Face',
  preparation: 'Medical consultation, stop smoking 4-6 weeks before, avoid blood thinners',
  followup: 'Wound care, avoid sun exposure, sleep elevated, follow-up appointments',
  howPerformed: 'Incisions made along hairline and around ears, underlying tissues tightened, excess skin removed',
  status: 'https://schema.org/EventScheduled',
}

interface FaceliftPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function FaceliftPage({ params }: FaceliftPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Facelift' },
  ])

  const faqSchema = generateFAQSchema(FACELIFT_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalProcedureSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Facelift' },
          ]}
        />
      </div>
      <FaceliftClient faqs={FACELIFT_FAQS} />
    </div>
  )
}
