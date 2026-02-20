import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { TurkeyDestinationClient } from './turkey-client'
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
  title: 'Medical Tourism Turkey 2026: Costs, Safety & Top Clinics | MeetYourClinic',
  description:
    'Complete guide to medical tourism in Turkey. Compare costs (50-70% savings), find JCI-accredited hospitals, and discover why 1.5M patients choose Turkey annually.',
  alternates: {
    canonical: `${SITE_URL}/en/destinations/turkey`,
    languages: {
      'en-GB': `${SITE_URL}/en/destinations/turkey`,
    },
  },
  openGraph: {
    title: 'Medical Tourism in Turkey: The Complete 2026 Guide',
    description:
      '1.5 million patients. 50+ JCI hospitals. 50-70% cost savings. Everything you need to know about medical treatment in Turkey.',
    url: `${SITE_URL}/destinations/turkey`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/turkey-medical-tourism.jpg`,
        width: 1200,
        height: 630,
        alt: 'Medical Tourism in Turkey - Istanbul skyline with modern hospitals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medical Tourism Turkey 2026: Costs, Safety & Top Clinics',
    description:
      'Complete guide to medical tourism in Turkey. Compare costs (50-70% savings), find JCI-accredited hospitals.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const TURKEY_MEDICAL_TOURISM_FAQS = [
  {
    question: 'Is Turkey safe for medical tourism?',
    answer:
      'Turkey is one of the world\'s safest medical tourism destinations. With 50+ JCI-accredited hospitals and government-regulated health tourism, standards match Western Europe. The key is choosing accredited facilities with verified surgeon credentials. Over 1.5 million international patients receive treatment in Turkey annually with high satisfaction rates.',
  },
  {
    question: 'How much cheaper is surgery in Turkey than the UK?',
    answer:
      'Most procedures cost 50-70% less in Turkey than the UK. A hair transplant costing £10,000+ in London runs £1,500-£2,800 in Istanbul. Dental implants at £2,000+ each in the UK cost £250-£400 in Turkey. Packages often include accommodation and transfers, increasing overall savings.',
  },
  {
    question: 'Do Turkish surgeons speak English?',
    answer:
      'Yes. Surgeons at international-facing clinics typically speak English, and all reputable facilities employ dedicated patient coordinators who handle communication throughout your journey. Many Turkish surgeons trained in the UK, USA, or Germany.',
  },
  {
    question: 'What if something goes wrong after I return to the UK?',
    answer:
      'Reputable clinics provide aftercare protocols and remote consultation via WhatsApp or video call. Some partner with UK clinics for in-person follow-up. Travel insurance covering medical tourism is essential. Always get written discharge documents and surgeon contact details before leaving.',
  },
  {
    question: 'How long should I stay in Turkey for surgery?',
    answer:
      'Stay duration depends on procedure: dental veneers require 5-7 days, hair transplants 3-5 days, rhinoplasty 7-10 days, and tummy tuck 10-14 days. Your surgeon will advise when you\'re safe to fly based on healing progress.',
  },
  {
    question: 'Are Turkish hospitals accredited?',
    answer:
      'Yes. Turkey has 50+ hospitals accredited by Joint Commission International (JCI), ranking second globally behind the USA. JCI accreditation means facilities meet the same quality and safety standards as top American and European hospitals. Verify accreditation at jci.org.',
  },
  {
    question: 'What\'s included in Turkey medical tourism packages?',
    answer:
      'All-inclusive packages typically cover: the procedure, hospital fees, surgeon fees, anaesthesia, accommodation (3-7 nights), airport transfers, medications, and post-op check-ups. Flights are usually booked separately. Always confirm exactly what\'s included in writing.',
  },
  {
    question: 'Can I combine treatment with a holiday?',
    answer:
      'Yes, many patients extend their stay for tourism. Antalya offers beach resorts, while Istanbul has world-class sightseeing. However, plan activities around your recovery — strenuous tourism isn\'t recommended immediately post-surgery.',
  },
  {
    question: 'How do I choose the right clinic in Turkey?',
    answer:
      'Check for JCI accreditation or Turkish Ministry of Health approval, verify surgeon credentials independently, read reviews on Google/Trustpilot (not clinic\'s site), request before/after photos of similar cases, and have a video consultation before booking.',
  },
  {
    question: 'What\'s the "Turkey teeth" issue I\'ve heard about?',
    answer:
      '"Turkey teeth" refers to cases where healthy teeth were over-prepared for veneers, causing damage. This happens at budget clinics using aggressive techniques. Reputable clinics use minimal-prep methods. Always see a detailed treatment plan, ask about preparation technique, and choose quality over price.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Medical Tourism in Turkey: Complete 2026 Guide',
  description:
    'Comprehensive guide to medical tourism in Turkey covering procedures, costs, safety, accreditation, and practical information for UK patients.',
  url: `${SITE_URL}/destinations/turkey`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalBusiness',
    name: 'Medical Tourism Turkey',
    areaServed: {
      '@type': 'Country',
      name: 'Turkey',
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
  lastReviewed: '2026-02-03',
  mainContentOfPage: {
    '@type': 'WebPageElement',
    cssSelector: 'main',
  },
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

interface TurkeyDestinationPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function TurkeyDestinationPage({ params }: TurkeyDestinationPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Destinations', url: '/destinations' },
    { name: 'Turkey' },
  ])

  const faqSchema = generateFAQSchema(TURKEY_MEDICAL_TOURISM_FAQS)

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
            { name: 'Turkey' },
          ]}
        />
      </div>

      <TurkeyDestinationClient faqs={TURKEY_MEDICAL_TOURISM_FAQS} />
    </div>
  )
}
