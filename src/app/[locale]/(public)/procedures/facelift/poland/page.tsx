import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { FaceliftPolandClient } from './facelift-poland-client'
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
  title: 'Facelift in Poland — EU Standards from £4,000 | MeetYourClinic',
  description:
    'Compare facelift prices in Poland from £4,000. EU healthcare standards, short flights from UK, natural results focus. Save 50-60% vs UK prices.',
  alternates: {
    canonical: `/procedures/facelift/poland`,
    languages: { 'en-GB': `/procedures/facelift/poland` },
  },
  openGraph: {
    title: 'Facelift in Poland — EU Standards from £4,000',
    description: 'Compare facelift prices in Poland from £4,000. EU standards, experienced surgeons.',
    url: `${SITE_URL}/procedures/facelift/poland`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const FACELIFT_POLAND_FAQS = [
  {
    question: 'How much does a facelift cost in Poland?',
    answer: 'Facelift in Poland costs £4,000–£6,000. Full facelift is £5,000–£6,000, mini facelift £4,000–£5,000. This includes surgery and hospital stay. Accommodation packages available. UK prices are £8,000–£15,000.',
  },
  {
    question: 'Is facelift surgery in Poland safe?',
    answer: 'Yes. Poland operates under EU healthcare regulations. Surgeons must be registered with the Polish Medical Chamber. Facilities meet EU standards. Polish surgeons are known for careful, natural-looking results.',
  },
  {
    question: 'Why choose Poland for facelift?',
    answer: 'Poland offers EU patient protections, short 2-hour flights from UK, and surgeons known for natural results. The combination of quality, convenience, and value makes Poland attractive for facial rejuvenation.',
  },
  {
    question: 'How long should I stay in Poland after a facelift?',
    answer: 'Plan for 10–14 days. Stitches are typically removed at day 7–10. The short 2-hour flight home is manageable after stitch removal, though some visible bruising may remain.',
  },
  {
    question: 'Which cities in Poland offer facelift surgery?',
    answer: 'Warsaw has the most options with experienced facial surgeons. Kraków also has reputable clinics. Both cities have modern facilities and are well-connected with UK flights.',
  },
  {
    question: 'What facelift techniques do Polish surgeons use?',
    answer: 'Polish surgeons offer full facelift, mini facelift, SMAS facelift, and deep plane techniques. They\'re known for conservative approaches that avoid the "pulled" look, favouring natural rejuvenation.',
  },
  {
    question: 'Do Polish facelift surgeons speak English?',
    answer: 'Yes. Surgeons at international-facing clinics speak fluent English. Patient coordinators provide full support. Communication is straightforward.',
  },
  {
    question: 'Can I combine facelift with other procedures in Poland?',
    answer: 'Yes. Popular combinations include facelift with blepharoplasty (eyelids), neck lift, or fat transfer. Polish surgeons can advise on safe combinations during consultation.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Facelift in Poland — EU Standards, Natural Results',
  description: 'Compare facelift prices in Poland. EU healthcare standards, short flights from UK.',
  url: `${SITE_URL}/procedures/facelift/poland`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Facelift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2026-02-03',
}

interface FaceliftPolandPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function FaceliftPolandPage({ params }: FaceliftPolandPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Facelift', url: '/procedures/facelift' },
    { name: 'Poland' },
  ])

  const faqSchema = generateFAQSchema(FACELIFT_POLAND_FAQS)

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
            { name: 'Poland' },
          ]}
        />
      </div>
      <FaceliftPolandClient faqs={FACELIFT_POLAND_FAQS} />
    </div>
  )
}
