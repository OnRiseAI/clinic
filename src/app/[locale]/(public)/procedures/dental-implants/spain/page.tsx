import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { DentalImplantsSpainClient } from './dental-implants-spain-client'
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
  title: 'Dental Implants in Spain — Prices, Clinics & Packages from Barcelona | MeetYourClinic',
  description:
    'Compare dental implant prices in Spain from £900 per tooth. Browse JCI-accredited Barcelona clinics, All-on-4 packages from £8,000, Straumann & Nobel Biocare brands, and free consultations.',
  alternates: {
    canonical: `/procedures/dental-implants/spain`,
    languages: {
      'en-GB': `/procedures/dental-implants/spain`,
    },
  },
  openGraph: {
    title: 'Dental Implants in Spain — Prices, Clinics & Packages from Barcelona',
    description:
      'Compare dental implant prices in Spain from £900 per tooth. Browse JCI-accredited Barcelona clinics, All-on-4 packages from £8,000, Straumann & Nobel Biocare brands.',
    url: `${SITE_URL}/procedures/dental-implants/spain`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/dental-implants-spain.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dental Implants in Spain - Compare Barcelona Clinics and Prices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dental Implants in Spain — Prices, Clinics & Packages from Barcelona',
    description:
      'Compare dental implant prices in Spain from £900 per tooth. Browse JCI-accredited Barcelona clinics.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const DENTAL_IMPLANTS_SPAIN_FAQS = [
  {
    question: 'How much do dental implants cost in Spain?',
    answer:
      'A single dental implant in Spain costs £900–£1,400 including the crown. All-on-4 full-arch implants start from £5,500 per jaw, with premium packages ranging from £8,000–£14,000. This represents savings of 50–70% compared to UK prices.',
  },
  {
    question: 'Are Spanish dental clinics safe?',
    answer:
      "Yes. Spain is an EU member state with strict healthcare regulation. Centro Médico Teknon in Barcelona holds JCI accreditation — the global gold standard for international healthcare — and was named in Newsweek's \"World's Best Hospitals 2021.\" Spanish dentists hold 5-year EU degrees and must be registered with the Spanish Dental Association.",
  },
  {
    question: 'How long does implant treatment take in Spain?',
    answer:
      'Treatment typically requires two trips: 5–7 days for implant placement, then a return visit in 3–6 months for crown fitting (3–5 days). All-on-4 patients receive temporary fixed teeth on the same day as surgery.',
  },
  {
    question: 'Is Spain more expensive than Turkey for implants?',
    answer:
      'Yes, Spain is typically 40–60% more expensive than Turkey. However, Spain offers JCI hospital accreditation, full EU regulation, 2-hour flights from London, and Euro currency. The premium reflects proximity, infrastructure quality, and regulatory standards.',
  },
  {
    question: 'What implant brands do Spanish clinics use?',
    answer:
      'Top Spanish clinics use Straumann (Swiss), Nobel Biocare (Swedish), and MIS (Israeli) — the same premium brands used in UK private practices. Always confirm which brand is included in your quote.',
  },
  {
    question: 'Can I combine dental treatment with a holiday in Spain?',
    answer:
      'Yes. Barcelona, Costa del Sol, and the Canary Islands offer excellent recovery environments. Many patients treat the healing period as a short Mediterranean holiday, making the recovery experience far more pleasant than staying at home.',
  },
  {
    question: "What aftercare is available when I'm back in the UK?",
    answer:
      'Most Spanish clinics offer remote follow-up via photos and video calls. 24/7 patient support is common at Barcelona clinics. Warranties on implants typically range from 5–10 years.',
  },
  {
    question: 'Do Spanish clinics offer all-inclusive packages?',
    answer:
      'Yes. Packages typically include 3D scans, surgery, temporary and permanent prostheses, VIP airport transfers, and follow-up appointments. All-on-4 all-inclusive packages start from approximately £10,000.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Dental Implants in Spain — Prices, Clinics & Packages from Barcelona',
  description:
    'Compare dental implant prices in Spain from JCI-accredited Barcelona clinics. Prices, procedure details, and UK patient reviews.',
  url: `${SITE_URL}/procedures/dental-implants/spain`,
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

interface DentalImplantsSpainPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function DentalImplantsSpainPage({
  params,
}: DentalImplantsSpainPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Dental', url: '/dental' },
    { name: 'Dental Implants', url: '/procedures/dental-implants' },
    { name: 'Spain' },
  ])

  const faqSchema = generateFAQSchema(DENTAL_IMPLANTS_SPAIN_FAQS)

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
            { name: 'Spain' },
          ]}
        />
      </div>

      <DentalImplantsSpainClient faqs={DENTAL_IMPLANTS_SPAIN_FAQS} />
    </div>
  )
}
