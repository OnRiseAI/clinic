import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { DentalImplantsPolandClient } from './dental-implants-poland-client'
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
  title: 'Dental Implants in Poland — Prices, Clinics & Packages from £550 | MeetYourClinic',
  description:
    'Compare dental implant prices in Poland from £550 per tooth. Browse verified clinics in Kraków & Warsaw, All-on-4 packages from £4,000, Nobel Biocare & Straumann brands, and free consultations.',
  alternates: {
    canonical: `/procedures/dental-implants/poland`,
    languages: {
      'en-GB': `/procedures/dental-implants/poland`,
    },
  },
  openGraph: {
    title: 'Dental Implants in Poland — Prices, Clinics & Packages from £550',
    description:
      'Compare dental implant prices in Poland from £550 per tooth. Browse verified clinics in Kraków & Warsaw, All-on-4 packages from £4,000, Nobel Biocare & Straumann brands.',
    url: `${SITE_URL}/procedures/dental-implants/poland`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/dental-implants-poland.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dental Implants in Poland - Compare Clinics and Prices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dental Implants in Poland — Prices, Clinics & Packages from £550',
    description:
      'Compare dental implant prices in Poland from £550 per tooth. Browse verified clinics in Kraków & Warsaw.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const DENTAL_IMPLANTS_POLAND_FAQS = [
  {
    question: 'How much do dental implants cost in Poland?',
    answer:
      'A single dental implant in Poland costs £550–£900 including the crown. All-on-4 full-arch implants start from £4,000 per jaw, and full-mouth restoration (both jaws) costs £9,000–£14,000. This represents savings of 60–70% compared to UK prices.',
  },
  {
    question: 'Are Polish dental clinics safe?',
    answer:
      'Yes. Poland is an EU member state, so dental clinics must comply with EU medical device regulations, hygiene standards, and patient rights directives. Top clinics are ISO 9001 certified and use premium implant brands like Straumann and Nobel Biocare — the same brands used in UK private practices.',
  },
  {
    question: 'How long does implant treatment take in Poland?',
    answer:
      'Treatment typically requires two trips: 3–5 days for implant placement, then a return visit in 3–6 months for crown fitting (2–3 days). All-on-4 patients can receive temporary teeth on the same day as surgery.',
  },
  {
    question: 'Which is better for implants — Poland or Turkey?',
    answer:
      'Poland offers EU regulation, MALO CLINIC-certified All-on-4 expertise, and premium European implant brands. Turkey offers lower prices and more all-inclusive holiday-style packages. Choose Poland for regulatory assurance and specialist expertise; choose Turkey for maximum savings.',
  },
  {
    question: 'What implant brands do Polish clinics use?',
    answer:
      'Top Polish clinics use Straumann (Swiss), Nobel Biocare (Swedish), Osstem (Korean), and Zimmer Biomet — the same premium brands used in UK private clinics. Always confirm which brand is included in your quote.',
  },
  {
    question: 'Do I need a bone graft for dental implants?',
    answer:
      'This depends on your bone density, which your clinic will assess via CBCT scan during consultation. Bone grafts in Poland cost £200–£500 compared to £500–£1,200 in the UK. Not all patients require bone grafting.',
  },
  {
    question: "What aftercare is available when I'm back in the UK?",
    answer:
      'Most Polish clinics offer remote follow-up via photos and video calls. INDEXMEDICA has consultation offices in the UK and Ireland for in-person follow-ups. Warranties on implants typically range from 5–10 years.',
  },
  {
    question: 'Do Polish clinics offer all-inclusive implant packages?',
    answer:
      'Yes. Most clinics offer packages including hotel accommodation, airport transfers, all dental work, and aftercare support. All-inclusive single implant packages start from approximately £800.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Dental Implants in Poland — Prices, Clinics & Packages from £550',
  description:
    'Compare dental implant prices in Poland from verified clinics in Kraków and Warsaw. Prices, procedure details, and UK patient reviews.',
  url: `${SITE_URL}/procedures/dental-implants/poland`,
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

interface DentalImplantsPolandPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function DentalImplantsPolandPage({
  params,
}: DentalImplantsPolandPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Dental', url: '/dental' },
    { name: 'Dental Implants', url: '/procedures/dental-implants' },
    { name: 'Poland' },
  ])

  const faqSchema = generateFAQSchema(DENTAL_IMPLANTS_POLAND_FAQS)

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
            { name: 'Poland' },
          ]}
        />
      </div>

      <DentalImplantsPolandClient faqs={DENTAL_IMPLANTS_POLAND_FAQS} />
    </div>
  )
}
