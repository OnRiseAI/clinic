import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { VeneersPolandClient } from './veneers-poland-client'
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
  title: 'Veneers in Poland 2025: £70-£400/tooth | Krakow & Warsaw Clinics | medit',
  description:
    'Dental veneers in Poland from £70/tooth. EU-standard care, German materials, English-speaking dentists. Compare Krakow and Warsaw clinics and save 50-70% vs UK prices.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/veneers/poland`,
    languages: {
      'en-GB': `${SITE_URL}/en/procedures/veneers/poland`,
    },
  },
  openGraph: {
    title: 'Veneers in Poland 2025: £70-£400/tooth | Krakow & Warsaw Clinics',
    description:
      'Dental veneers in Poland from £70/tooth. EU-standard care, German materials, English-speaking dentists. Compare Krakow and Warsaw clinics.',
    url: `${SITE_URL}/procedures/veneers/poland`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/veneers-poland.jpg`,
        width: 1200,
        height: 630,
        alt: 'Veneers in Poland - Compare Clinics and Prices in Krakow and Warsaw',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veneers in Poland 2025: £70-£400/tooth | Krakow & Warsaw Clinics',
    description:
      'Dental veneers in Poland from £70/tooth. EU-standard care, German materials, English-speaking dentists.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const VENEERS_POLAND_FAQS = [
  {
    question: 'How much do veneers cost in Poland compared to the UK?',
    answer:
      'Composite veneers in Poland cost £70-£180 per tooth (UK: £250-£500). Porcelain veneers cost £200-£250 per tooth (UK: £600-£1,000). E-max veneers cost £250-£400 per tooth (UK: £800-£1,200). A full set of 20 E-max veneers costs £5,000-£8,000 in Poland versus £16,000-£24,000 in the UK — savings of 50-70%.',
  },
  {
    question: 'Is Poland in the EU? What does this mean for dental care?',
    answer:
      'Yes, Poland is an EU member state. This means Polish dental clinics must comply with EU medical device regulations, hygiene standards, and patient safety directives. UK patients benefit from EU cross-border healthcare protections and can seek recourse through EU consumer protection frameworks if issues arise.',
  },
  {
    question: 'How long do I need to stay in Poland for veneers?',
    answer:
      'Porcelain and E-max veneers typically require 5-7 days: Day 1 for consultation and preparation, Days 2-5 for lab fabrication, and Days 6-7 for fitting and adjustments. Composite veneers can be completed in 2-3 days as they are applied directly without lab work.',
  },
  {
    question: 'Do Polish dentists speak English?',
    answer:
      'Most Polish dentists serving international patients speak fluent English — many trained or completed courses in the UK, Germany, or the US. Clinics catering to British patients typically have English-speaking coordinators. Confirm language capabilities during your initial consultation.',
  },
  {
    question: 'What materials do Polish clinics use for veneers?',
    answer:
      'Reputable Polish clinics use premium materials including IPS e.max by Ivoclar Vivadent (the global gold standard for porcelain veneers), German ceramics, and Vita shade guides. Ask your clinic to confirm the specific brand and provide a material certificate.',
  },
  {
    question: 'Which Polish city is best for dental veneers?',
    answer:
      'Krakow is the most popular destination for UK dental tourists — it has the highest concentration of international-focused clinics, excellent transport links, and competitive pricing. Warsaw offers more clinics but slightly higher prices. Both cities have direct flights from multiple UK airports.',
  },
  {
    question: 'What warranty do Polish clinics offer on veneers?',
    answer:
      'Most reputable Polish clinics offer 5-10 year warranties on porcelain and E-max veneers, and 2-3 years on composite veneers. Warranties typically cover manufacturing defects and premature failure but not damage from accidents or poor oral hygiene. Get warranty terms in writing before treatment.',
  },
  {
    question: 'How do I arrange follow-up care when I return to the UK?',
    answer:
      'Polish clinics provide detailed aftercare instructions and typically offer remote consultations via email, WhatsApp, or video call for the first few months. For physical follow-up, your UK dentist can provide routine care. Some Polish clinics have partner practices in the UK for complications.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Veneers in Poland — UK Patient Guide to Dental Veneers in Krakow & Warsaw',
  description:
    'Comprehensive guide to dental veneers in Poland for UK patients. Compare prices, clinics, EU-standard facilities, and treatment timelines.',
  url: `${SITE_URL}/procedures/veneers/poland`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Dental Veneer',
    procedureType: 'https://schema.org/TherapeuticProcedure',
    bodyLocation: 'Teeth',
    howPerformed:
      'Thin shells of porcelain or composite resin are bonded to the front surface of teeth to improve appearance. Tooth preparation involves removing 0.3-0.7mm of enamel for porcelain veneers, followed by impression-taking, lab fabrication, and bonding.',
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

interface VeneersPolandPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function VeneersPolandPage({ params }: VeneersPolandPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Dental', url: '/dental' },
    { name: 'Veneers', url: '/procedures/veneers' },
    { name: 'Poland' },
  ])

  const faqSchema = generateFAQSchema(VENEERS_POLAND_FAQS)

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
            { name: 'Veneers', url: '/procedures/veneers' },
            { name: 'Poland' },
          ]}
        />
      </div>

      <VeneersPolandClient faqs={VENEERS_POLAND_FAQS} />
    </div>
  )
}
