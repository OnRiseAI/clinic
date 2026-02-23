import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BrowLiftPolandClient } from './brow-lift-poland-client'
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
  title: 'Brow Lift in Poland — From £2,500 EU Quality | MeetYourClinic',
  description:
    'Compare brow lift prices in Poland from £2,500. EU-standard clinics, experienced facial surgeons, comprehensive packages. Save 50-60% vs UK prices.',
  alternates: {
    canonical: `/procedures/brow-lift/poland`,
    languages: { 'en-GB': `/procedures/brow-lift/poland` },
  },
  openGraph: {
    title: 'Brow Lift in Poland — From £2,500 EU Quality',
    description: 'Compare brow lift prices in Poland from £2,500. EU standards, experienced surgeons.',
    url: `${SITE_URL}/procedures/brow-lift/poland`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const BROW_LIFT_POLAND_FAQS = [
  {
    question: 'How much does a brow lift cost in Poland?',
    answer: 'Brow lift in Poland costs £2,500–£3,500 all-inclusive. Endoscopic brow lift is £2,500–£3,000, coronal brow lift £3,000–£3,500. Packages include surgery, hospital stay, hotel, and transfers. UK prices are £5,000–£8,000.',
  },
  {
    question: 'Are Polish brow lift surgeons qualified?',
    answer: 'Yes. Polish plastic surgeons are EU-trained and certified, meeting strict European medical standards. Many have additional international training and are members of ISAPS or ESPRAS.',
  },
  {
    question: 'Is brow lift in Poland safe?',
    answer: 'Yes. Poland follows EU medical regulations and standards. Clinics are regularly inspected and must meet strict hygiene and safety requirements. Look for board-certified surgeons with facial surgery experience.',
  },
  {
    question: 'How long should I stay in Poland after a brow lift?',
    answer: 'Plan for 5–7 days. Brow lift has moderate recovery — swelling and bruising peak at days 2–3. Stitches or staples are removed at day 7–10, then fit-to-fly assessment.',
  },
  {
    question: 'What types of brow lift are available in Poland?',
    answer: 'Endoscopic brow lift (most popular), coronal brow lift, temporal brow lift, and direct brow lift. Polish surgeons can also combine with blepharoplasty or facelift for comprehensive rejuvenation.',
  },
  {
    question: 'Which city is best for brow lift in Poland?',
    answer: 'Warsaw and Krakow have excellent clinics with qualified facial surgeons. Warsaw has more options, while Krakow offers a historic city to explore during recovery. Both are easily accessible from the UK.',
  },
  {
    question: 'What is included in a brow lift package in Poland?',
    answer: 'All-inclusive packages typically include: surgery, anaesthesia, hospital stay (1 night), pre-op tests, medications, 5–7 nights hotel, airport transfers, and follow-up appointments.',
  },
  {
    question: 'What are the advantages of brow lift in Poland?',
    answer: 'EU medical standards and regulations, shorter flights from UK (2 hours), English widely spoken, easy communication, and competitive pricing with 50–60% savings vs UK.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Brow Lift in Poland — EU Quality, Experienced Surgeons',
  description: 'Compare brow lift prices in Poland. All-inclusive packages from £2,500.',
  url: `${SITE_URL}/procedures/brow-lift/poland`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Brow Lift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2026-02-03',
}

interface BrowLiftPolandPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BrowLiftPolandPage({ params }: BrowLiftPolandPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Brow Lift', url: '/procedures/brow-lift' },
    { name: 'Poland' },
  ])

  const faqSchema = generateFAQSchema(BROW_LIFT_POLAND_FAQS)

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
            { name: 'Poland' },
          ]}
        />
      </div>
      <BrowLiftPolandClient faqs={BROW_LIFT_POLAND_FAQS} />
    </div>
  )
}
