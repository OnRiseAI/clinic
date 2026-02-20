import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { DentalLandingClient } from './dental-landing-client'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateWebsiteSchema,
  generateOrganizationSchema,
} from '@/lib/seo/structured-data'
import { StructuredData } from '@/components/seo/structured-data-component'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'
import {
  getClinicsByCategory,
  getProceduresByCategory,
  getCategoryBySlug,
} from '@/lib/data/content'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://meetyourclinic.com'

// =============================================================================
// METADATA
// =============================================================================

export const metadata: Metadata = {
  title: 'Dental Work Abroad — Compare Clinics, Prices & Destinations | MeetYourClinic',
  description:
    'Explore dental treatment abroad from the UK. Compare verified clinics, real prices and patient reviews for implants, veneers and crowns in Turkey, Hungary, Poland and Spain.',
  alternates: {
    canonical: `${SITE_URL}/dental`,
  },
  openGraph: {
    title: 'Dental Work Abroad — Compare Clinics, Prices & Destinations',
    description:
      'Explore dental treatment abroad from the UK. Compare verified clinics, real prices and patient reviews for implants, veneers and crowns in Turkey, Hungary, Poland and Spain.',
    url: `${SITE_URL}/dental`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/dental-abroad.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dental Work Abroad - Compare Clinics and Prices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dental Work Abroad — Compare Clinics, Prices & Destinations',
    description:
      'Explore dental treatment abroad from the UK. Compare verified clinics, real prices and patient reviews.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const DENTAL_FAQS = [
  {
    question: 'Is dental tourism safe?',
    answer:
      'Yes, dental tourism is safe when you choose an accredited clinic. Look for clinics with JCI (Joint Commission International), ISO, or TEMOS certification. These international standards ensure the clinic meets rigorous safety and quality requirements. Always verify dentist credentials and read verified patient reviews before booking.',
  },
  {
    question: 'How much do dental implants cost abroad?',
    answer:
      'Dental implants cost between £300 and £800 per implant in Turkey, compared to £2,000–£2,500 in the UK. Hungary and Poland typically range from £500–£900 per implant. Prices include the implant, abutment, and crown. All-on-4 full mouth restorations cost £1,600–£3,200 abroad versus £8,000–£15,000 in the UK.',
  },
  {
    question: 'Which country is best for dental work?',
    answer:
      'Turkey is the most popular destination for dental tourism, offering the lowest prices and highest volume of international patients. Hungary is renowned for quality and has decades of dental tourism experience. Poland offers excellent value with shorter flights from the UK. Spain suits patients wanting EU standards with familiar surroundings.',
  },
  {
    question: "What about aftercare when I'm back in the UK?",
    answer:
      'Reputable clinics provide comprehensive aftercare plans. Many have partnerships with UK dentists for follow-up appointments. Remote consultations via video call are standard. The General Dental Council advises keeping all treatment records. Ensure your clinic provides detailed documentation and a clear aftercare protocol before you travel.',
  },
  {
    question: 'Can I get veneers abroad?',
    answer:
      'Yes, veneers are one of the most popular treatments abroad. Turkey is the leading destination for cosmetic dental work. Important: many clinics fit porcelain crowns but market them as veneers. True veneers are thin shells bonded to the front of teeth, preserving more natural tooth structure. Always clarify exactly what treatment you are receiving.',
  },
  {
    question: 'Do I need travel insurance for dental treatment abroad?',
    answer:
      'Standard travel insurance typically does not cover elective dental procedures. You need specialist medical travel insurance that covers your specific treatment. This should include cover for complications, extended stays if required, and emergency repatriation. Get quotes before booking your treatment.',
  },
  {
    question: 'How long do I need to stay for dental implants?',
    answer:
      'Traditional dental implants require two trips: 5–7 days for implant placement, then return in 3–6 months for the permanent crowns once the implants have integrated with the bone. Some clinics offer same-day implants with immediate loading, allowing completion in a single 7–10 day trip.',
  },
  {
    question: 'Why is dental work so much cheaper abroad?',
    answer:
      'Lower operating costs (rent, wages, overheads), government subsidies for medical tourism, high patient volumes creating economies of scale, and intense competition between clinics. The quality of materials and dentist training is comparable to the UK — the cost difference is not due to lower standards.',
  },
]

// =============================================================================
// PAGE COMPONENT
// =============================================================================

interface DentalPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function DentalPage({ params }: DentalPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  // Fetch dental category data
  const category = await getCategoryBySlug('dental')
  const [procedures, clinics] = await Promise.all([
    category ? getProceduresByCategory(category.id) : Promise.resolve([]),
    getClinicsByCategory('dental', 12),
  ])

  // Generate structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Dental Work Abroad' },
  ])

  const faqSchema = generateFAQSchema(DENTAL_FAQS)

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/dental`,
    name: 'Dental Work Abroad: Your Complete Guide to Treatment Overseas',
    description:
      'Explore dental treatment abroad from the UK. Compare verified clinics, real prices and patient reviews for implants, veneers and crowns in Turkey, Hungary, Poland and Spain.',
    url: `${SITE_URL}/dental`,
    isPartOf: {
      '@id': `${SITE_URL}#website`,
    },
    about: {
      '@type': 'MedicalSpecialty',
      name: 'Dentistry',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.ai-answer-block', '.faq-section', 'h1'],
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[
          generateOrganizationSchema(),
          generateWebsiteSchema(),
          breadcrumbSchema,
          faqSchema,
          webPageSchema,
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ name: 'Dental Work Abroad' }]}
        />
      </div>

      <DentalLandingClient
        procedures={procedures}
        clinics={clinics}
        faqs={DENTAL_FAQS}
      />
    </div>
  )
}
