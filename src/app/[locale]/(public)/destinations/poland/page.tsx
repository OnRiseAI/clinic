import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { PolandDestinationClient } from './poland-client'
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
  title: 'Medical Tourism Poland 2026: Costs, Clinics & Complete Guide | MeetYourClinic',
  description:
    'Poland\'s emerging medical tourism hub. 40-60% savings on cosmetic surgery, dental work & orthopaedics. EU healthcare standards, 2hr flight from London. 300,000+ patients annually.',
  alternates: {
    canonical: `${SITE_URL}/en/destinations/poland`,
    languages: {
      'en-GB': `${SITE_URL}/en/destinations/poland`,
    },
  },
  openGraph: {
    title: 'Medical Tourism in Poland: Quality EU Healthcare at Competitive Prices',
    description:
      '300,000+ medical tourists annually. EU healthcare standards. 40-60% savings. Complete guide to cosmetic surgery and medical treatment in Poland.',
    url: `${SITE_URL}/destinations/poland`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/poland-medical-tourism.jpg`,
        width: 1200,
        height: 630,
        alt: 'Medical Tourism in Poland - Warsaw skyline and modern healthcare facilities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medical Tourism Poland 2026: Costs, Clinics & Complete Guide',
    description:
      'Poland\'s emerging medical tourism hub. 40-60% savings on cosmetic surgery, dental work & orthopaedics. EU healthcare standards.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const POLAND_MEDICAL_TOURISM_FAQS = [
  {
    question: 'Is medical treatment in Poland safe?',
    answer:
      'Poland is an EU member state with healthcare regulated to European standards. Hospitals are accredited by the Ministry of Health, and many hold international certifications. Poland ranks among the top 20 globally for healthcare quality. With 300,000+ medical tourists annually and a growing reputation for cosmetic surgery, Poland has proven infrastructure for international patients.',
  },
  {
    question: 'How much cheaper is cosmetic surgery in Poland than the UK?',
    answer:
      'Cosmetic surgery in Poland typically costs 40-60% less than the UK. A rhinoplasty costing £5,000-£7,000 in the UK runs £2,000-£3,500 in Poland. Breast augmentation at £6,000-£8,000 in the UK costs £2,500-£4,000 in Poland. Packages often include accommodation and transfers.',
  },
  {
    question: 'Do Polish surgeons speak English?',
    answer:
      'Yes. Surgeons at international-facing clinics typically speak English, and all reputable facilities employ patient coordinators for seamless communication. Many Polish surgeons trained in the UK, Germany, or other Western European countries. English proficiency among younger medical professionals is very high.',
  },
  {
    question: 'Why is Poland becoming popular for medical tourism?',
    answer:
      'Poland combines EU healthcare standards with significantly lower costs than Western Europe. The country has invested heavily in modern medical facilities, particularly in cosmetic surgery and orthopaedics. Short flights from the UK (2 hours), no visa requirements, and Poland\'s growing reputation for quality make it increasingly attractive.',
  },
  {
    question: 'What\'s the difference between Poland and Turkey for cosmetic surgery?',
    answer:
      'Poland offers EU patient protections, shorter flights (2 vs 4 hours), and stricter regulatory oversight. Turkey offers lower prices and higher volumes. Poland suits patients prioritising EU standards and proximity. Turkey suits those seeking lowest prices or procedures like hair transplants where Turkey has more experience.',
  },
  {
    question: 'How long should I stay in Poland for cosmetic surgery?',
    answer:
      'Stay duration depends on procedure: rhinoplasty requires 7-10 days, breast augmentation 5-7 days, tummy tuck 10-14 days, and liposuction 5-7 days. Your surgeon will advise when you\'re safe to fly based on healing progress.',
  },
  {
    question: 'What if something goes wrong after I return to the UK?',
    answer:
      'As an EU destination, Poland\'s materials and methods are compatible with UK healthcare. Reputable clinics provide aftercare protocols and remote consultation. EU Cross-Border Healthcare Directive provides additional protections. Always get written documentation before leaving.',
  },
  {
    question: 'Do I need a visa to visit Poland?',
    answer:
      'UK citizens don\'t need a visa for stays under 90 days. A valid passport is required. Poland is an EU and Schengen member, making travel straightforward with no border controls from other Schengen countries.',
  },
  {
    question: 'Which cities in Poland are best for medical tourism?',
    answer:
      'Warsaw has the most international-standard facilities and largest selection. Kraków offers excellent clinics in a beautiful historic setting. Wrocław is known for dental work, while Gdańsk and Jelenia Góra offer specialized treatment with smaller-town charm.',
  },
  {
    question: 'What procedures is Poland best known for?',
    answer:
      'Poland excels in cosmetic surgery (42% of medical tourists), including rhinoplasty, breast procedures, and body contouring. Dental work is also popular, particularly implants and veneers. Orthopaedic procedures and IVF are other strong areas. Hair transplants are less developed compared to Turkey.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Medical Tourism in Poland: Complete 2026 Guide',
  description:
    'Comprehensive guide to medical tourism in Poland covering procedures, costs, safety, accreditation, and practical information for UK patients.',
  url: `${SITE_URL}/destinations/poland`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalBusiness',
    name: 'Medical Tourism Poland',
    areaServed: {
      '@type': 'Country',
      name: 'Poland',
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
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

interface PolandDestinationPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function PolandDestinationPage({ params }: PolandDestinationPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Destinations', url: '/destinations' },
    { name: 'Poland' },
  ])

  const faqSchema = generateFAQSchema(POLAND_MEDICAL_TOURISM_FAQS)

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
            { name: 'Poland' },
          ]}
        />
      </div>

      <PolandDestinationClient faqs={POLAND_MEDICAL_TOURISM_FAQS} />
    </div>
  )
}
