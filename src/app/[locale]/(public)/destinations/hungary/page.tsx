import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { HungaryDestinationClient } from './hungary-client'
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
  title: 'Dental Tourism Hungary 2025: Costs, Clinics & Guide | MeetYourClinic',
  description:
    'Europe\'s dental capital. 40-60% savings on implants, veneers & crowns. EU healthcare standards, 2.5hr flight from London. 100,000+ patients choose Hungary yearly.',
  alternates: {
    canonical: `/destinations/hungary`,
    languages: {
      'en-GB': `/destinations/hungary`,
    },
  },
  openGraph: {
    title: 'Medical Tourism in Hungary: Europe\'s Dental Capital',
    description:
      '100,000+ dental tourists annually. EU healthcare standards. 40-60% savings. Complete guide to dental and medical treatment in Hungary.',
    url: `${SITE_URL}/destinations/hungary`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/hungary-dental-tourism.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dental Tourism in Hungary - Budapest Parliament and modern dental clinics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dental Tourism Hungary 2025: Costs, Clinics & Guide',
    description:
      'Europe\'s dental capital. 40-60% savings on implants, veneers & crowns. EU healthcare standards.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const HUNGARY_MEDICAL_TOURISM_FAQS = [
  {
    question: 'Is dental treatment in Hungary safe?',
    answer:
      'Hungary is an EU member state with regulated healthcare meeting European standards. Dental clinics are licensed by the Hungarian Ministry of Health, and many hold ISO certification. With 30+ years as Europe\'s dental tourism leader and 100,000+ patients annually, Hungary has extensive experience treating international patients.',
  },
  {
    question: 'How much cheaper is dental work in Hungary than the UK?',
    answer:
      'Dental treatment in Hungary typically costs 40-60% less than the UK. A single dental implant costing £1,500-£2,500 in the UK runs £400-£800 in Hungary. Full mouth restorations show similar savings, even including flights and accommodation.',
  },
  {
    question: 'Do Hungarian dentists speak English?',
    answer:
      'Yes. Dental clinics serving international patients employ English-speaking staff and dentists. German is also widely spoken due to Hungary\'s long history with Austrian and German patients. Communication is rarely an issue at established clinics.',
  },
  {
    question: 'Why is Hungary called the "Dental Capital of Europe"?',
    answer:
      'Hungary pioneered dental tourism over 30 years ago, initially serving German and Austrian patients. Today it attracts 100,000+ dental tourists annually, has 3,000+ dental clinics, and the border town Mosonmagyaróvár holds the world record for highest dental clinic density per capita.',
  },
  {
    question: 'What\'s the difference between Hungary and Turkey for dental work?',
    answer:
      'Hungary offers EU patient protections, shorter flights (2.5 vs 4 hours), and thermal spa recovery. Turkey offers lower prices and wider procedure range including cosmetics and hair transplants. Hungary suits patients prioritising EU standards and dental-focused trips.',
  },
  {
    question: 'How long should I stay in Hungary for dental implants?',
    answer:
      'For single implants, 3-5 days is typical. All-on-4 procedures require 5-7 days. Complex restorations may need two trips: one for implant placement and one for final restorations after healing (3-6 months later).',
  },
  {
    question: 'Can I combine treatment with thermal spa visits?',
    answer:
      'Yes — it\'s one of Hungary\'s unique advantages. Budapest has famous thermal baths like Széchenyi and Gellért. Most dentists recommend waiting 24-48 hours post-procedure before bathing. The warm mineral waters aid relaxation and recovery.',
  },
  {
    question: 'What if something goes wrong after I return to the UK?',
    answer:
      'Reputable clinics provide aftercare protocols and remote consultation. As an EU-standard destination, materials and methods are compatible with UK dental practices. Always get written documentation and X-rays before leaving. Many clinics offer guarantees on work performed.',
  },
  {
    question: 'Do I need a visa to visit Hungary?',
    answer:
      'UK citizens don\'t need a visa for stays under 90 days. A valid passport is required. Hungary is an EU and Schengen member, making travel straightforward.',
  },
  {
    question: 'What dental implant brands do Hungarian clinics use?',
    answer:
      'Quality Hungarian clinics use internationally recognised brands: Nobel Biocare, Straumann, Alpha Bio, Camlog, and Zimmer. Bulk purchasing from these manufacturers contributes to Hungary\'s competitive pricing without compromising quality.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Medical Tourism in Hungary: Europe\'s Dental Capital',
  description:
    'Complete guide to dental and medical tourism in Hungary. Compare costs, find quality clinics, and discover why 100,000+ patients choose Hungary annually.',
  url: `${SITE_URL}/destinations/hungary`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalBusiness',
    name: 'Medical Tourism Hungary',
    areaServed: {
      '@type': 'Country',
      name: 'Hungary',
    },
  },
  audience: {
    '@type': 'MedicalAudience',
    audienceType: 'Patient',
    geographicArea: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
  },
  lastReviewed: '2025-02-03',
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

interface HungaryDestinationPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function HungaryDestinationPage({ params }: HungaryDestinationPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Destinations', url: '/destinations' },
    { name: 'Hungary' },
  ])

  const faqSchema = generateFAQSchema(HUNGARY_MEDICAL_TOURISM_FAQS)

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
            { name: 'Destinations', url: '/destinations' },
            { name: 'Hungary' },
          ]}
        />
      </div>

      <HungaryDestinationClient faqs={HUNGARY_MEDICAL_TOURISM_FAQS} />
    </div>
  )
}
