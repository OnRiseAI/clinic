import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BreastLiftClient } from './breast-lift-client'
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
  title: 'Breast Lift Abroad — Compare Prices & Clinics | MeetYourClinic',
  description:
    'Compare breast lift (mastopexy) prices abroad from £2,500. Find verified clinics in Turkey, Poland, Spain & Hungary. Save 50-70% vs UK prices with experienced surgeons.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/breast-lift`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/breast-lift` },
  },
  openGraph: {
    title: 'Breast Lift Abroad — Compare Prices & Clinics',
    description: 'Compare breast lift prices abroad from £2,500. Save 50-70% vs UK.',
    url: `${SITE_URL}/procedures/breast-lift`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const BREAST_LIFT_FAQS = [
  {
    question: 'How much does a breast lift cost abroad?',
    answer: 'A breast lift abroad costs £2,500–£5,500 depending on destination and complexity. Turkey offers the lowest prices (£2,500–£3,500), Poland £3,000–£4,000, Hungary £3,200–£4,200, and Spain £4,000–£5,500. UK prices are typically £6,000–£9,000.',
  },
  {
    question: 'Is a breast lift abroad safe?',
    answer: 'Yes, when choosing accredited clinics with qualified surgeons. Look for JCI accreditation (Turkey), EU standards (Poland, Hungary, Spain), board-certified plastic surgeons, and verified patient reviews. Research surgeon credentials and before/after photos.',
  },
  {
    question: 'What is a breast lift (mastopexy)?',
    answer: 'A breast lift (mastopexy) is a surgical procedure that raises and reshapes sagging breasts by removing excess skin and tightening the surrounding tissue. It repositions the nipple and areola to a more youthful height without adding volume.',
  },
  {
    question: 'How long should I stay abroad after a breast lift?',
    answer: 'Plan for 7–10 days abroad. Day 1: surgery and overnight stay. Days 2–5: rest and initial recovery. Days 6–7: follow-up appointment and fit-to-fly clearance. You can sit normally on the flight home.',
  },
  {
    question: 'What is the recovery time for a breast lift?',
    answer: 'Initial recovery: 1–2 weeks before flying home. Return to desk work: 1–2 weeks. Light exercise: 4 weeks. Full exercise: 6–8 weeks. Final results: 3–6 months as swelling subsides. Support bra worn for 4–6 weeks.',
  },
  {
    question: 'Which country is best for a breast lift?',
    answer: 'Turkey offers best value with experienced surgeons. Poland and Hungary provide EU standards at mid-range prices. Spain offers premium quality at higher prices. Choose based on budget, desired quality level, and travel preferences.',
  },
  {
    question: 'Can I combine a breast lift with augmentation?',
    answer: 'Yes. Breast lift with augmentation (mastopexy augmentation) is a popular combination that lifts sagging breasts while adding volume with implants. This can be done in a single surgery abroad. Discuss options with your surgeon.',
  },
  {
    question: 'Will I have scars after a breast lift?',
    answer: 'Yes, breast lift surgery leaves scars, but they fade over time. Common incision patterns include: lollipop (around areola and vertical line down), anchor (adds horizontal line under breast), or periareolar (around areola only for minor lifts). Surgeons aim to place scars in concealed areas.',
  },
]

const medicalProcedureSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  name: 'Breast Lift',
  alternateName: ['Mastopexy', 'Breast Uplift'],
  description: 'Surgical procedure to raise and reshape sagging breasts by removing excess skin and tightening surrounding tissue.',
  procedureType: 'https://schema.org/SurgicalProcedure',
  bodyLocation: 'Breast',
  preparation: 'Medical consultation, mammogram if over 40, stop smoking 4 weeks before',
  followup: 'Support bra for 4-6 weeks, follow-up appointments, avoid heavy lifting',
  howPerformed: 'Excess skin removed and breast tissue reshaped through incisions around areola and/or vertical and horizontal lines',
  status: 'https://schema.org/EventScheduled',
}

interface BreastLiftPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BreastLiftPage({ params }: BreastLiftPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Breast Lift' },
  ])

  const faqSchema = generateFAQSchema(BREAST_LIFT_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalProcedureSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Breast Lift' },
          ]}
        />
      </div>
      <BreastLiftClient faqs={BREAST_LIFT_FAQS} />
    </div>
  )
}
