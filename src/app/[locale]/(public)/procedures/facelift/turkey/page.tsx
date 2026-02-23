import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { FaceliftTurkeyClient } from './facelift-turkey-client'
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
  title: 'Facelift in Turkey — From £3,000 All-Inclusive | MeetYourClinic',
  description:
    'Compare facelift prices in Turkey from £3,000. Experienced facial surgeons, JCI hospitals, all-inclusive packages. Save 60-70% vs UK prices.',
  alternates: {
    canonical: `/procedures/facelift/turkey`,
    languages: { 'en-GB': `/procedures/facelift/turkey` },
  },
  openGraph: {
    title: 'Facelift in Turkey — From £3,000 All-Inclusive',
    description: 'Compare facelift prices in Turkey from £3,000. JCI hospitals, experienced surgeons.',
    url: `${SITE_URL}/procedures/facelift/turkey`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const FACELIFT_TURKEY_FAQS = [
  {
    question: 'How much does a facelift cost in Turkey?',
    answer: 'Facelift in Turkey costs £3,000–£5,500 all-inclusive. Full facelift is £4,500–£5,500, mini facelift £3,000–£4,000. Packages include surgery, hospital stay, hotel, and transfers. UK prices are £8,000–£15,000.',
  },
  {
    question: 'Are Turkish facelift surgeons qualified?',
    answer: 'Yes. Leading Turkish facial surgeons are board-certified, often with international training (US, UK, Europe). Many are members of ISAPS. Turkey\'s high cosmetic surgery volume means surgeons have extensive experience.',
  },
  {
    question: 'Is facelift in Turkey safe?',
    answer: 'Yes, when choosing accredited facilities. Look for JCI-accredited hospitals, board-certified surgeons specialising in facial procedures, and clinics with verified before/after results. Facelift requires precise technique.',
  },
  {
    question: 'How long should I stay in Turkey after a facelift?',
    answer: 'Plan for 10–14 days. Facelift has more visible recovery than other procedures — swelling and bruising peak at days 2–3. Stitches are removed at day 7–10, then fit-to-fly assessment.',
  },
  {
    question: 'What types of facelift are available in Turkey?',
    answer: 'Full facelift, mini facelift, lower facelift, mid-facelift, neck lift, and deep plane facelift. Turkish surgeons can also combine with blepharoplasty, brow lift, or fat transfer for comprehensive rejuvenation.',
  },
  {
    question: 'Which city is best for facelift in Turkey?',
    answer: 'Istanbul has the largest selection of qualified facial surgeons and JCI-accredited hospitals. Some surgeons in Antalya also perform facelifts. Istanbul offers more specialist choice for facial procedures.',
  },
  {
    question: 'What is included in a facelift package in Turkey?',
    answer: 'All-inclusive packages typically include: surgery, anaesthesia, hospital stay (1–2 nights), pre-op tests, medications, 7–10 nights hotel, airport transfers, patient coordinator, and follow-up appointments.',
  },
  {
    question: 'Can I combine facelift with other procedures in Turkey?',
    answer: 'Yes. Popular combinations include facelift with neck lift, blepharoplasty (eyelids), brow lift, or fat transfer. Combining procedures saves on overall costs. Discuss safety with your surgeon.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Facelift in Turkey — Experienced Surgeons, JCI Hospitals',
  description: 'Compare facelift prices in Turkey. All-inclusive packages from £3,000.',
  url: `${SITE_URL}/procedures/facelift/turkey`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Facelift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2026-02-03',
}

interface FaceliftTurkeyPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function FaceliftTurkeyPage({ params }: FaceliftTurkeyPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Facelift', url: '/procedures/facelift' },
    { name: 'Turkey' },
  ])

  const faqSchema = generateFAQSchema(FACELIFT_TURKEY_FAQS)

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
            { name: 'Turkey' },
          ]}
        />
      </div>
      <FaceliftTurkeyClient faqs={FACELIFT_TURKEY_FAQS} />
    </div>
  )
}
