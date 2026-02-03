import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { SpainDestinationClient } from './spain-client'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from '@/lib/seo/structured-data'
import { StructuredData } from '@/components/seo/structured-data-component'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://medit.com'

// =============================================================================
// METADATA
// =============================================================================

export const metadata: Metadata = {
  title: 'Medical Tourism Spain 2025: World #1 Healthcare | medit',
  description:
    'World\'s healthiest nation. Europe\'s IVF leader. Premium cosmetic surgery & dental care. Discover why 120,000+ patients choose Spain for world-class treatment.',
  alternates: {
    canonical: `${SITE_URL}/en/destinations/spain`,
    languages: {
      'en-GB': `${SITE_URL}/en/destinations/spain`,
    },
  },
  openGraph: {
    title: 'Medical Tourism in Spain: World-Class Healthcare in the Sun',
    description:
      'Europe\'s #1 for IVF. Ranked healthiest nation globally. EU healthcare excellence. Complete guide to medical treatment in Spain.',
    url: `${SITE_URL}/destinations/spain`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/spain-medical-tourism.jpg`,
        width: 1200,
        height: 630,
        alt: 'Medical Tourism in Spain - Barcelona skyline with modern healthcare facilities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medical Tourism Spain 2025: World #1 Healthcare',
    description:
      'World\'s healthiest nation. Europe\'s IVF leader. Premium cosmetic surgery & dental care.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const SPAIN_MEDICAL_TOURISM_FAQS = [
  {
    question: 'Is medical tourism in Spain safe?',
    answer:
      'Spain has the world\'s #1 ranked healthcare system according to the Bloomberg Healthiest Country Index, ahead of the UK (#19) and USA (#35). As an EU member, healthcare is regulated to European standards. Spanish hospitals are modern, well-equipped, and staffed by highly trained professionals. Over 120,000 medical tourists choose Spain annually.',
  },
  {
    question: 'How much does treatment cost in Spain vs the UK?',
    answer:
      'Spain offers moderate savings of 20–40% compared to the UK, depending on procedure. Dental and fertility treatments show the best savings. Spain\'s value proposition is premium quality rather than maximum savings — choose Turkey or Poland if budget is the primary concern.',
  },
  {
    question: 'Why is Spain #1 for IVF in Europe?',
    answer:
      'Spain leads Europe in fertility treatment due to progressive legislation allowing anonymous egg donation (not available in UK), excellent egg quality from Spanish donors, no waiting lists for donor eggs, world-class clinics like IVI and Eugin, and high success rates. The relaxed Mediterranean environment also helps reduce stress.',
  },
  {
    question: 'Do Spanish doctors speak English?',
    answer:
      'Yes. Medical professionals in international-facing clinics speak English fluently. Barcelona and Madrid have particularly strong English proficiency. Many surgeons trained or worked in UK/USA. Communication is rarely an issue at established medical tourism providers.',
  },
  {
    question: 'Which Spanish city is best for medical tourism?',
    answer:
      'Barcelona is Spain\'s medical tourism capital with world-class hospitals and fertility clinics. Madrid offers comprehensive services and complex procedures. Marbella/Costa del Sol is ideal for cosmetic surgery with luxury recovery. Choose based on your specific treatment needs.',
  },
  {
    question: 'Is Spain good for cosmetic surgery?',
    answer:
      'Yes. Spain has world-class plastic surgeons and modern facilities. However, savings are modest (30–40%) compared to Turkey (50–70%). Spain suits patients prioritising surgical excellence and premium recovery experience over maximum cost savings.',
  },
  {
    question: 'What\'s Spain\'s healthcare system ranked?',
    answer:
      'Spain ranks #1 on the Bloomberg Healthiest Country Index, ahead of the UK (#19) and USA (#35). It also ranks #4 globally on the Medical Tourism Index. Spanish healthcare combines excellent public universal coverage with premium private facilities.',
  },
  {
    question: 'How long should I stay in Spain for treatment?',
    answer:
      'Depends on procedure: IVF requires 3–5 days for egg retrieval. Cosmetic surgery needs 7–14 days. Dental work varies from 3–7 days. Your specialist will advise minimum stay and when it\'s safe to fly home.',
  },
  {
    question: 'What if something goes wrong after I return to the UK?',
    answer:
      'Spanish clinics provide aftercare protocols and remote follow-up. As EU-standard facilities, materials and methods are fully compatible with UK healthcare. Get comprehensive documentation before leaving. Many clinics offer guarantees on work performed.',
  },
  {
    question: 'Do I need a visa to visit Spain?',
    answer:
      'UK citizens don\'t need a visa for stays under 90 days. A valid passport is required. Spain is an EU and Schengen member, making travel straightforward with excellent flight connections from the UK.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Medical Tourism in Spain: World-Class Healthcare in the Sun',
  description:
    'Complete guide to medical tourism in Spain. World #1 healthcare ranking, Europe\'s IVF leader, premium cosmetic surgery. Discover why 120,000+ patients choose Spain.',
  url: `${SITE_URL}/destinations/spain`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalBusiness',
    name: 'Medical Tourism Spain',
    areaServed: {
      '@type': 'Country',
      name: 'Spain',
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

interface SpainDestinationPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function SpainDestinationPage({ params }: SpainDestinationPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Destinations', url: '/destinations' },
    { name: 'Spain' },
  ])

  const faqSchema = generateFAQSchema(SPAIN_MEDICAL_TOURISM_FAQS)

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
            { name: 'Spain' },
          ]}
        />
      </div>

      <SpainDestinationClient faqs={SPAIN_MEDICAL_TOURISM_FAQS} />
    </div>
  )
}
