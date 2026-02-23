import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { NeckLiftPolandClient } from './neck-lift-poland-client'
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
  title: 'Neck Lift in Poland — EU Standards from £3,000 | MeetYourClinic',
  description:
    'Compare neck lift prices in Poland from £3,000. EU healthcare standards, short flights from UK, natural results focus. Save 50-60% vs UK prices.',
  alternates: {
    canonical: `/procedures/neck-lift/poland`,
    languages: { 'en-GB': `/procedures/neck-lift/poland` },
  },
  openGraph: {
    title: 'Neck Lift in Poland — EU Standards from £3,000',
    description: 'Compare neck lift prices in Poland from £3,000. EU standards, experienced surgeons.',
    url: `${SITE_URL}/procedures/neck-lift/poland`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const NECK_LIFT_POLAND_FAQS = [
  {
    question: 'How much does a neck lift cost in Poland?',
    answer: 'Neck lift in Poland costs £3,000–£4,500. Traditional neck lift is £3,500–£4,500, neck liposuction £2,000–£3,000. This includes surgery and hospital stay. Accommodation packages available. UK prices are £6,000–£10,000.',
  },
  {
    question: 'Is neck lift surgery in Poland safe?',
    answer: 'Yes. Poland operates under EU healthcare regulations. Surgeons must be registered with the Polish Medical Chamber. Facilities meet EU standards. Polish surgeons are known for careful, natural-looking results.',
  },
  {
    question: 'Why choose Poland for neck lift?',
    answer: 'Poland offers EU patient protections, short 2-hour flights from UK, and surgeons known for natural results. The combination of quality, convenience, and value makes Poland attractive for facial rejuvenation.',
  },
  {
    question: 'How long should I stay in Poland after a neck lift?',
    answer: 'Plan for 7–10 days. Stitches are typically removed at day 5–7. The short 2-hour flight home is manageable after stitch removal, though some visible bruising may remain.',
  },
  {
    question: 'Which cities in Poland offer neck lift surgery?',
    answer: 'Warsaw has the most options with experienced facial surgeons. Krakow also has reputable clinics. Both cities have modern facilities and are well-connected with UK flights.',
  },
  {
    question: 'What neck lift techniques do Polish surgeons use?',
    answer: 'Polish surgeons offer traditional neck lift, platysmaplasty, cervicoplasty, and neck liposuction. They\'re known for conservative approaches that avoid obvious surgery signs.',
  },
  {
    question: 'Do Polish neck lift surgeons speak English?',
    answer: 'Yes. Surgeons at international-facing clinics speak fluent English. Patient coordinators provide full support. Communication is straightforward.',
  },
  {
    question: 'Can I combine neck lift with facelift in Poland?',
    answer: 'Yes. Popular combinations include neck lift with facelift, blepharoplasty (eyelids), or chin liposuction. Polish surgeons can advise on safe combinations during consultation.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Neck Lift in Poland — EU Standards, Natural Results',
  description: 'Compare neck lift prices in Poland. EU healthcare standards, short flights from UK.',
  url: `${SITE_URL}/procedures/neck-lift/poland`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Neck Lift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2026-02-03',
}

interface NeckLiftPolandPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function NeckLiftPolandPage({ params }: NeckLiftPolandPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Neck Lift', url: '/procedures/neck-lift' },
    { name: 'Poland' },
  ])

  const faqSchema = generateFAQSchema(NECK_LIFT_POLAND_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalWebPageSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Neck Lift', url: '/procedures/neck-lift' },
            { name: 'Poland' },
          ]}
        />
      </div>
      <NeckLiftPolandClient faqs={NECK_LIFT_POLAND_FAQS} />
    </div>
  )
}
