import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BrowLiftTurkeyClient } from './brow-lift-turkey-client'
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
  title: 'Brow Lift in Turkey — From £2,000 All-Inclusive | MeetYourClinic',
  description:
    'Compare brow lift prices in Turkey from £2,000. Experienced facial surgeons, JCI hospitals, all-inclusive packages. Save 60-70% vs UK prices.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/brow-lift/turkey`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/brow-lift/turkey` },
  },
  openGraph: {
    title: 'Brow Lift in Turkey — From £2,000 All-Inclusive',
    description: 'Compare brow lift prices in Turkey from £2,000. JCI hospitals, experienced surgeons.',
    url: `${SITE_URL}/procedures/brow-lift/turkey`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const BROW_LIFT_TURKEY_FAQS = [
  {
    question: 'How much does a brow lift cost in Turkey?',
    answer: 'Brow lift in Turkey costs £2,000–£3,000 all-inclusive. Endoscopic brow lift is £2,000–£2,500, coronal brow lift £2,500–£3,000. Packages include surgery, hospital stay, hotel, and transfers. UK prices are £5,000–£8,000.',
  },
  {
    question: 'Are Turkish brow lift surgeons qualified?',
    answer: 'Yes. Leading Turkish facial surgeons are board-certified, often with international training (US, UK, Europe). Many are members of ISAPS. Turkey\'s high cosmetic surgery volume means surgeons have extensive experience with facial procedures.',
  },
  {
    question: 'Is brow lift in Turkey safe?',
    answer: 'Yes, when choosing accredited facilities. Look for JCI-accredited hospitals, board-certified surgeons specialising in facial procedures, and clinics with verified before/after results. Brow lift requires precise technique for natural results.',
  },
  {
    question: 'How long should I stay in Turkey after a brow lift?',
    answer: 'Plan for 5–7 days. Brow lift has moderate recovery — swelling and bruising peak at days 2–3. Stitches or staples are removed at day 7–10, then fit-to-fly assessment.',
  },
  {
    question: 'What types of brow lift are available in Turkey?',
    answer: 'Endoscopic brow lift (most popular), coronal brow lift, temporal brow lift, and direct brow lift. Turkish surgeons can also combine with blepharoplasty or facelift for comprehensive rejuvenation.',
  },
  {
    question: 'Which city is best for brow lift in Turkey?',
    answer: 'Istanbul has the largest selection of qualified facial surgeons and JCI-accredited hospitals. For facial procedures requiring precise technique, Istanbul offers more specialist choice.',
  },
  {
    question: 'What is included in a brow lift package in Turkey?',
    answer: 'All-inclusive packages typically include: surgery, anaesthesia, hospital stay (1 night), pre-op tests, medications, 5–7 nights hotel, airport transfers, patient coordinator, and follow-up appointments.',
  },
  {
    question: 'Can I combine brow lift with other procedures in Turkey?',
    answer: 'Yes. Popular combinations include brow lift with blepharoplasty (eyelids), facelift, or fat transfer. Combining procedures saves on overall costs. Discuss safety with your surgeon.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Brow Lift in Turkey — Experienced Surgeons, JCI Hospitals',
  description: 'Compare brow lift prices in Turkey. All-inclusive packages from £2,000.',
  url: `${SITE_URL}/procedures/brow-lift/turkey`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Brow Lift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2026-02-03',
}

interface BrowLiftTurkeyPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BrowLiftTurkeyPage({ params }: BrowLiftTurkeyPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Brow Lift', url: '/procedures/brow-lift' },
    { name: 'Turkey' },
  ])

  const faqSchema = generateFAQSchema(BROW_LIFT_TURKEY_FAQS)

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
            { name: 'Turkey' },
          ]}
        />
      </div>
      <BrowLiftTurkeyClient faqs={BROW_LIFT_TURKEY_FAQS} />
    </div>
  )
}
