import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BBLClient } from './bbl-client'
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
  title: 'BBL Abroad — Brazilian Butt Lift Prices, Safety & Top Clinics | MeetYourClinic',
  description:
    'Compare BBL prices abroad from £2,800. Brazilian Butt Lift in Turkey, Poland, Spain & Hungary — safety protocols, fat transfer techniques, verified surgeons. Free quotes from accredited clinics.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/bbl`,
    languages: {
      'en-GB': `${SITE_URL}/en/procedures/bbl`,
    },
  },
  openGraph: {
    title: 'BBL Abroad — Brazilian Butt Lift Prices, Safety & Top Clinics',
    description:
      'Compare BBL prices abroad from £2,800. Brazilian Butt Lift in Turkey, Poland, Spain & Hungary — safety protocols, fat transfer techniques, verified surgeons.',
    url: `${SITE_URL}/procedures/bbl`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/bbl-abroad.jpg`,
        width: 1200,
        height: 630,
        alt: 'BBL Abroad - Compare Prices Across 4 Destinations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BBL Abroad — Brazilian Butt Lift Prices, Safety & Top Clinics',
    description:
      'Compare BBL prices abroad from £2,800. Safety protocols, fat transfer techniques, verified surgeons.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const BBL_FAQS = [
  {
    question: 'How much does a BBL cost abroad?',
    answer:
      'BBL prices abroad range from £2,800 (Turkey) to £6,000 (Spain). All-inclusive packages typically include surgery, hospital stay, hotel, transfers, compression garments, and aftercare. This compares to £8,000–£12,000 in the UK — savings of 50–70%.',
  },
  {
    question: 'Is BBL surgery safe?',
    answer:
      'BBL has historically been one of the higher-risk cosmetic procedures due to fat embolism risk. However, modern safety protocols have dramatically reduced risks. Key safety factors: surgeon experience, proper technique (subcutaneous fat injection only, never into muscle), ultrasound guidance, and limiting fat volume. Choose surgeons who follow ISAPS/BSA safety guidelines.',
  },
  {
    question: 'What is a Brazilian Butt Lift?',
    answer:
      'A BBL (Brazilian Butt Lift) is a fat transfer procedure that enhances buttock size and shape using your own body fat. Fat is harvested via liposuction from areas like abdomen, flanks, or thighs, purified, then strategically injected into the buttocks. Results are natural-looking because it uses your own tissue.',
  },
  {
    question: 'How long does BBL recovery take?',
    answer:
      'Initial recovery is 2–3 weeks with restricted sitting. You cannot sit directly on your buttocks for 2–3 weeks (use a BBL pillow). Return to desk work: 3–4 weeks. Full recovery and final results: 3–6 months as swelling resolves and transferred fat stabilises. Plan to stay abroad 10–14 days minimum.',
  },
  {
    question: 'How much fat survives after BBL?',
    answer:
      'Typically 60–80% of transferred fat survives long-term. Survival rate depends on surgeon technique, your body\'s response, post-op care (avoiding pressure on buttocks), and maintaining stable weight. Some surgeons slightly over-correct knowing some fat will be reabsorbed.',
  },
  {
    question: 'Do I need enough fat for a BBL?',
    answer:
      'Yes, you need sufficient donor fat — typically BMI of 22+ is recommended. Common harvest areas: abdomen, flanks, back, thighs. If you don\'t have enough fat, some clinics offer buttock implants as an alternative, or a combination approach.',
  },
  {
    question: 'Which country is best for BBL?',
    answer:
      'Turkey performs the highest volume of BBLs and offers the lowest prices. Poland and Spain offer EU standards with experienced surgeons. Key factors: surgeon\'s BBL-specific experience, safety protocols followed, before/after photos of similar body types, and clinic accreditation.',
  },
  {
    question: 'Can I combine BBL with other procedures?',
    answer:
      'Yes, BBL is often combined with liposuction (the fat harvest IS liposuction), tummy tuck for a "mummy makeover", or breast augmentation. Combined procedures extend recovery time but mean one trip and one anaesthetic. Discuss safety limits with your surgeon.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'BBL Abroad — Brazilian Butt Lift Prices, Safety & Top Clinics',
  description:
    'Compare Brazilian Butt Lift prices abroad from accredited clinics in Turkey, Poland, Spain, and Hungary. Safety protocols, fat transfer techniques, and surgeon selection guidance.',
  url: `${SITE_URL}/procedures/bbl`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Brazilian Butt Lift',
    alternateName: ['BBL', 'Gluteal Fat Transfer', 'Buttock Augmentation with Fat Transfer'],
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Buttocks',
    howPerformed:
      'Brazilian Butt Lift (BBL) is a fat transfer procedure that harvests fat via liposuction from donor areas (abdomen, flanks, thighs), purifies it, then strategically injects it into the buttocks for natural-looking enhancement.',
  },
  audience: {
    '@type': 'MedicalAudience',
    audienceType: 'Patient',
    geographicArea: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
  },
  lastReviewed: '2026-02-03',
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

interface BBLPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function BBLPage({ params }: BBLPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Brazilian Butt Lift (BBL)' },
  ])

  const faqSchema = generateFAQSchema(BBL_FAQS)

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
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Brazilian Butt Lift (BBL)' },
          ]}
        />
      </div>

      <BBLClient faqs={BBL_FAQS} />
    </div>
  )
}
