import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { DentalImplantsHungaryClient } from './dental-implants-hungary-client'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from '@/lib/seo/structured-data'
import { StructuredData } from '@/components/seo/structured-data-component'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://meetyourclinic.com'

// =============================================================================
// METADATA
// =============================================================================

export const metadata: Metadata = {
  title: 'Dental Implants in Hungary — 2026 Prices, Budapest Clinics & UK Guide | MeetYourClinic',
  description:
    'Compare dental implant prices in Hungary from verified Budapest clinics. Single implants from £600, All-on-4 from £4,500. Read UK patient reviews, check accreditations, and get a free quote.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/dental-implants/hungary`,
    languages: {
      'en-GB': `${SITE_URL}/en/procedures/dental-implants/hungary`,
    },
  },
  openGraph: {
    title: 'Dental Implants in Hungary — 2026 Prices, Budapest Clinics & UK Guide',
    description:
      'Compare dental implant prices in Hungary from verified Budapest clinics. Single implants from £600, All-on-4 from £4,500. Read UK patient reviews, check accreditations, and get a free quote.',
    url: `${SITE_URL}/procedures/dental-implants/hungary`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/dental-implants-hungary.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dental Implants in Hungary - Compare Budapest Clinics and Prices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dental Implants in Hungary — 2026 Prices, Budapest Clinics & UK Guide',
    description:
      'Compare dental implant prices in Hungary from verified Budapest clinics. Single implants from £600, All-on-4 from £4,500.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const DENTAL_IMPLANTS_HUNGARY_FAQS = [
  {
    question: 'How much do dental implants cost in Hungary?',
    answer:
      'A single dental implant in Hungary costs between £600 and £1,000 including the crown. All-on-4 full-arch implants start from £4,500 per arch, and full-mouth restoration (both arches) costs £9,000–£14,000. Prices are typically all-inclusive with premium European implant brands like Straumann and Neodent.',
  },
  {
    question: 'Are dental implants in Hungary safe?',
    answer:
      'Yes, dental implants in Hungary are safe. Hungary is an EU member state, so clinics operate under strict EU Medical Device Regulation (MDR). Top Budapest clinics are ISO certified and use premium European implant brands with success rates above 97%.',
  },
  {
    question: 'How long do dental implants from Hungary last?',
    answer:
      'Dental implant posts can last a lifetime with proper care and good oral hygiene. Crowns typically last 10–15 years before needing replacement. Premium brands like Straumann, used by top Budapest clinics, offer lifetime manufacturer warranties on the implant post.',
  },
  {
    question: 'Do I need two trips to Hungary for dental implants?',
    answer:
      'Usually yes. The first visit (3–5 days) covers assessment, CBCT 3D imaging, and implant placement using computer-assisted surgery. After a healing period of 3–6 months for osseointegration, a second visit (5–10 days) is needed for permanent crown or bridge fitting. Some clinics offer immediate-load solutions.',
  },
  {
    question: 'What implant brands do Hungarian clinics use?',
    answer:
      'Top Budapest clinics predominantly use premium European implant brands including Straumann (Swiss), Neodent (Straumann subsidiary), Megagen Anyridge (Korean), and Alpha Bio (Israeli). Always confirm the brand included in your quote — premium brands carry the strongest warranties and longest clinical evidence.',
  },
  {
    question: 'Why is Budapest called the dental capital of Europe?',
    answer:
      "Budapest has Europe's highest concentration of specialist dental clinics serving international patients, anchored by Semmelweis University's world-class dental education programme (founded 1769). The city has been a leading dental tourism destination for over 20 years, with purpose-built clinics, in-house dental labs, and dedicated international patient coordinators.",
  },
  {
    question: 'Is Hungary cheaper than Turkey for dental implants?',
    answer:
      'Turkey is generally cheaper (single implants from £300 vs £600 in Hungary). However, Hungary offers EU regulation, premium European implant brands as standard, shorter UK flights (2–2.5 hours), and some clinics have London consultation offices for follow-up care.',
  },
  {
    question: 'What if something goes wrong after I return to the UK?',
    answer:
      'Reputable Budapest clinics have clear complication protocols and some maintain London offices for UK patient follow-up. Your UK dentist can manage routine aftercare with the treatment documentation provided by your Hungarian clinic. Lifetime warranties on implant posts are standard at top clinics.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Dental Implants in Hungary — 2026 Prices, Budapest Clinics & UK Guide',
  description:
    'Compare dental implant prices in Hungary from verified Budapest clinics. Prices, procedure details, and UK patient reviews.',
  url: `${SITE_URL}/procedures/dental-implants/hungary`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Dental Implant',
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Jaw',
    howPerformed:
      'A titanium post is surgically placed into the jawbone to replace a missing tooth root. After osseointegration (3–6 months), a permanent crown is fitted.',
  },
  audience: {
    '@type': 'MedicalAudience',
    audienceType: 'Patient',
    geographicArea: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
  },
  lastReviewed: '2026-02-02',
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

interface DentalImplantsHungaryPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function DentalImplantsHungaryPage({
  params,
}: DentalImplantsHungaryPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  // Generate structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Dental', url: '/dental' },
    { name: 'Dental Implants', url: '/procedures/dental-implants' },
    { name: 'Hungary' },
  ])

  const faqSchema = generateFAQSchema(DENTAL_IMPLANTS_HUNGARY_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[
          generateOrganizationSchema(),
          generateWebsiteSchema(),
          breadcrumbSchema,
          faqSchema,
          medicalWebPageSchema,
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Dental', url: '/dental' },
            { name: 'Dental Implants', url: '/procedures/dental-implants' },
            { name: 'Hungary' },
          ]}
        />
      </div>

      <DentalImplantsHungaryClient faqs={DENTAL_IMPLANTS_HUNGARY_FAQS} />
    </div>
  )
}
