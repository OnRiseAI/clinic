import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BlepharoplastyPolandClient } from './blepharoplasty-poland-client'
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
  title: 'Blepharoplasty in Poland — EU Standards from £1,800 | MeetYourClinic',
  description:
    'Compare blepharoplasty prices in Poland from £1,800. Eyelid surgery with EU healthcare standards, short flights from UK. Save 50-60% vs UK prices.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/blepharoplasty/poland`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/blepharoplasty/poland` },
  },
  openGraph: {
    title: 'Blepharoplasty in Poland — EU Standards from £1,800',
    description: 'Compare eyelid surgery prices in Poland from £1,800. EU standards, experienced surgeons.',
    url: `${SITE_URL}/procedures/blepharoplasty/poland`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const BLEPH_POLAND_FAQS = [
  {
    question: 'How much does blepharoplasty cost in Poland?',
    answer: 'Blepharoplasty in Poland costs £1,800–£2,800. Upper eyelids £1,800–£2,200, lower eyelids £2,000–£2,500, upper and lower combined £2,500–£2,800. UK prices are £3,000–£7,000.',
  },
  {
    question: 'Is blepharoplasty in Poland safe?',
    answer: 'Yes. Poland operates under EU healthcare regulations. Surgeons must be registered with the Polish Medical Chamber. Facilities meet EU standards. Blepharoplasty is a well-established procedure with excellent safety.',
  },
  {
    question: 'Why choose Poland for blepharoplasty?',
    answer: 'Poland offers EU patient protections, short 2-hour flights from UK, and natural results focus. The combination of quality, convenience, and value makes Poland attractive for eyelid surgery.',
  },
  {
    question: 'How long should I stay in Poland for blepharoplasty?',
    answer: 'Plan for 5–7 days. Stitches removed at day 5–7. The short 2-hour flight home is easy after stitch removal. Wear sunglasses to cover any residual bruising.',
  },
  {
    question: 'Which cities in Poland offer blepharoplasty?',
    answer: 'Warsaw has the most options with experienced eyelid surgeons. Kraków also has reputable clinics. Both cities have modern facilities and short flights from UK.',
  },
  {
    question: 'Do Polish eyelid surgeons speak English?',
    answer: 'Yes. Surgeons at international-facing clinics speak fluent English. Patient coordinators provide full support. Communication is straightforward.',
  },
  {
    question: 'Can I combine blepharoplasty with other procedures in Poland?',
    answer: 'Yes. Popular combinations include blepharoplasty with facelift, brow lift, or other facial procedures. Polish surgeons can advise on safe combinations.',
  },
  {
    question: 'What is recovery like after blepharoplasty in Poland?',
    answer: 'Quick recovery. Swelling peaks at days 2–3, stitches out at day 5–7, socially presentable in 2 weeks. The short flight home is very manageable.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Blepharoplasty in Poland — EU Standards, Natural Results',
  description: 'Compare blepharoplasty prices in Poland. EU healthcare standards, short flights from UK.',
  url: `${SITE_URL}/procedures/blepharoplasty/poland`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Blepharoplasty',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2026-02-03',
}

interface BlepharoplastyPolandPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BlepharoplastyPolandPage({ params }: BlepharoplastyPolandPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Blepharoplasty', url: '/procedures/blepharoplasty' },
    { name: 'Poland' },
  ])

  const faqSchema = generateFAQSchema(BLEPH_POLAND_FAQS)

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
            { name: 'Poland' },
          ]}
        />
      </div>
      <BlepharoplastyPolandClient faqs={BLEPH_POLAND_FAQS} />
    </div>
  )
}
