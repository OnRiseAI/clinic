import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BlepharoplastyTurkeyClient } from './blepharoplasty-turkey-client'
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
  title: 'Blepharoplasty in Turkey — Eyelid Surgery from £1,200 | medit',
  description:
    'Compare blepharoplasty prices in Turkey from £1,200. Eyelid surgery with experienced surgeons, JCI hospitals, all-inclusive packages. Save 60-70% vs UK.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/blepharoplasty/turkey`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/blepharoplasty/turkey` },
  },
  openGraph: {
    title: 'Blepharoplasty in Turkey — Eyelid Surgery from £1,200',
    description: 'Compare eyelid surgery prices in Turkey from £1,200. JCI hospitals, experienced surgeons.',
    url: `${SITE_URL}/procedures/blepharoplasty/turkey`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
  },
}

const BLEPH_TURKEY_FAQS = [
  {
    question: 'How much does blepharoplasty cost in Turkey?',
    answer: 'Blepharoplasty in Turkey costs £1,200–£2,500. Upper eyelids £1,200–£1,500, lower eyelids £1,500–£2,000, upper and lower combined £2,000–£2,500. Packages include surgery, hotel, and transfers. UK prices are £3,000–£7,000.',
  },
  {
    question: 'Are Turkish eyelid surgeons qualified?',
    answer: 'Yes. Leading Turkish surgeons are board-certified plastic surgeons or oculoplastic specialists. Many have international training. Turkey\'s high cosmetic surgery volume means surgeons have extensive experience.',
  },
  {
    question: 'Is blepharoplasty in Turkey safe?',
    answer: 'Yes, when choosing accredited facilities. Look for JCI-accredited hospitals, board-certified surgeons, and clinics with verified before/after results. Eyelid surgery is well-established with excellent safety.',
  },
  {
    question: 'How long should I stay in Turkey for blepharoplasty?',
    answer: 'Plan for 5–7 days. Stitches are removed at day 5–7. You can fly home after stitch removal wearing sunglasses to cover any residual bruising. Most swelling resolves quickly.',
  },
  {
    question: 'What is included in Turkish blepharoplasty packages?',
    answer: 'All-inclusive packages typically include: surgery, anaesthesia, hospital or clinic stay, pre-op tests, medications, 3–5 nights hotel, airport transfers, patient coordinator, and follow-up appointments.',
  },
  {
    question: 'Can I combine blepharoplasty with other procedures in Turkey?',
    answer: 'Yes. Popular combinations include blepharoplasty with facelift, brow lift, or rhinoplasty. Combining procedures saves on overall costs. Discuss safe combinations with your surgeon.',
  },
  {
    question: 'Which city is best for blepharoplasty in Turkey?',
    answer: 'Istanbul has the largest selection of qualified eyelid surgeons and JCI-accredited hospitals. Some surgeons in Antalya also perform blepharoplasty. Istanbul offers more specialist choice.',
  },
  {
    question: 'Will there be visible scars after blepharoplasty?',
    answer: 'Scars are well-hidden. Upper eyelid incisions are placed in the natural crease — invisible when eyes are open. Lower eyelid incisions are just below the lash line. Scars fade to nearly invisible.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Blepharoplasty in Turkey — Eyelid Surgery, Experienced Surgeons',
  description: 'Compare blepharoplasty prices in Turkey. All-inclusive packages from £1,200.',
  url: `${SITE_URL}/procedures/blepharoplasty/turkey`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Blepharoplasty',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2025-02-03',
}

interface BlepharoplastyTurkeyPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BlepharoplastyTurkeyPage({ params }: BlepharoplastyTurkeyPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Blepharoplasty', url: '/procedures/blepharoplasty' },
    { name: 'Turkey' },
  ])

  const faqSchema = generateFAQSchema(BLEPH_TURKEY_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalWebPageSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Blepharoplasty', url: '/procedures/blepharoplasty' },
            { name: 'Turkey' },
          ]}
        />
      </div>
      <BlepharoplastyTurkeyClient faqs={BLEPH_TURKEY_FAQS} />
    </div>
  )
}
