import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BrowLiftHungaryClient } from './brow-lift-hungary-client'
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
  title: 'Brow Lift in Hungary — From £2,800 Quality Focus | MeetYourClinic',
  description:
    'Compare brow lift prices in Hungary from £2,800. EU-standard clinics, quality-focused surgeons, comprehensive packages. Save 50-55% vs UK prices.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/brow-lift/hungary`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/brow-lift/hungary` },
  },
  openGraph: {
    title: 'Brow Lift in Hungary — From £2,800 Quality Focus',
    description: 'Compare brow lift prices in Hungary from £2,800. EU standards, quality-focused surgeons.',
    url: `${SITE_URL}/procedures/brow-lift/hungary`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const BROW_LIFT_HUNGARY_FAQS = [
  {
    question: 'How much does a brow lift cost in Hungary?',
    answer: 'Brow lift in Hungary costs £2,800–£3,800 all-inclusive. Endoscopic brow lift is £2,800–£3,300, coronal brow lift £3,300–£3,800. Packages include surgery, hospital stay, hotel, and transfers. UK prices are £5,000–£8,000.',
  },
  {
    question: 'Are Hungarian brow lift surgeons qualified?',
    answer: 'Yes. Hungarian plastic surgeons are EU-trained and certified. Hungary has a strong tradition in medical education and many surgeons have additional international training. Quality is prioritised.',
  },
  {
    question: 'Is brow lift in Hungary safe?',
    answer: 'Yes. Hungary follows EU medical regulations and standards. Clinics are regularly inspected and must meet strict hygiene and safety requirements. Look for board-certified surgeons with facial surgery experience.',
  },
  {
    question: 'How long should I stay in Hungary after a brow lift?',
    answer: 'Plan for 5–7 days. Brow lift has moderate recovery — swelling and bruising peak at days 2–3. Stitches or staples are removed at day 7–10, then fit-to-fly assessment.',
  },
  {
    question: 'What types of brow lift are available in Hungary?',
    answer: 'Endoscopic brow lift (most popular), coronal brow lift, temporal brow lift, and direct brow lift. Hungarian surgeons can also combine with blepharoplasty or facelift for comprehensive rejuvenation.',
  },
  {
    question: 'Which city is best for brow lift in Hungary?',
    answer: 'Budapest is the main destination for cosmetic surgery in Hungary. The capital has excellent clinics, qualified surgeons, and is known for combining quality medical care with the famous thermal bath culture.',
  },
  {
    question: 'What is included in a brow lift package in Hungary?',
    answer: 'All-inclusive packages typically include: surgery, anaesthesia, hospital stay (1 night), pre-op tests, medications, 5–7 nights hotel, airport transfers, and follow-up appointments.',
  },
  {
    question: 'What are the advantages of brow lift in Hungary?',
    answer: 'EU medical standards and protections, quality-focused approach, competitive pricing with 50–55% savings, famous thermal spas for relaxation, short flights from UK (2.5 hours), and English widely spoken in medical settings.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Brow Lift in Hungary — Quality Focus, EU Standards',
  description: 'Compare brow lift prices in Hungary. All-inclusive packages from £2,800.',
  url: `${SITE_URL}/procedures/brow-lift/hungary`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Brow Lift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2026-02-03',
}

interface BrowLiftHungaryPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BrowLiftHungaryPage({ params }: BrowLiftHungaryPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Brow Lift', url: '/procedures/brow-lift' },
    { name: 'Hungary' },
  ])

  const faqSchema = generateFAQSchema(BROW_LIFT_HUNGARY_FAQS)

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
            { name: 'Hungary' },
          ]}
        />
      </div>
      <BrowLiftHungaryClient faqs={BROW_LIFT_HUNGARY_FAQS} />
    </div>
  )
}
