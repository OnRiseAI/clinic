import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { CosmeticSurgeryLandingClient } from './cosmetic-surgery-landing-client'
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

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://medit.com'

// =============================================================================
// METADATA
// =============================================================================

export const metadata: Metadata = {
  title: 'Cosmetic Surgery Abroad — Compare Clinics, Prices & Destinations | medit',
  description:
    'Explore cosmetic surgery abroad from the UK. Compare verified clinics, real prices and patient reviews for rhinoplasty, liposuction, tummy tuck and more in Turkey, Poland, Spain and Hungary.',
  alternates: {
    canonical: `${SITE_URL}/cosmetic-surgery`,
  },
  openGraph: {
    title: 'Cosmetic Surgery Abroad — Compare Clinics, Prices & Destinations',
    description:
      'Explore cosmetic surgery abroad from the UK. Compare verified clinics, real prices and patient reviews for rhinoplasty, liposuction, tummy tuck and more.',
    url: `${SITE_URL}/cosmetic-surgery`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/cosmetic-surgery-abroad.jpg`,
        width: 1200,
        height: 630,
        alt: 'Cosmetic Surgery Abroad - Compare Clinics and Prices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cosmetic Surgery Abroad — Compare Clinics, Prices & Destinations',
    description:
      'Explore cosmetic surgery abroad from the UK. Compare verified clinics, real prices and patient reviews.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const COSMETIC_SURGERY_FAQS = [
  {
    question: 'Is cosmetic surgery abroad safe?',
    answer:
      'Yes, cosmetic surgery abroad is safe when you choose an accredited clinic with qualified surgeons. Look for JCI, ISO, or TEMOS certification. Many surgeons abroad trained in the UK, Germany, or USA and perform hundreds of procedures annually. Always verify surgeon credentials, read verified reviews, and ensure the clinic has proper aftercare protocols.',
  },
  {
    question: 'How much does cosmetic surgery cost abroad?',
    answer:
      'Cosmetic surgery abroad typically costs 40–70% less than in the UK. Rhinoplasty costs £2,000–£3,500 abroad versus £5,000–£7,000 in the UK. A tummy tuck runs £2,500–£4,500 abroad compared to £6,000–£9,000 in the UK. Liposuction costs £1,500–£3,000 abroad versus £4,000–£6,000 in the UK. Prices include surgeon fees, facility costs, and often accommodation.',
  },
  {
    question: 'Which country is best for cosmetic surgery?',
    answer:
      'Turkey leads for volume and value, offering the lowest prices with experienced surgeons. Poland offers excellent quality with EU protections and shorter flights. Spain provides premium experiences with world-class healthcare. Hungary has growing expertise in facial procedures. Choose based on your specific procedure, budget, and comfort with travel distance.',
  },
  {
    question: 'How long do I need to stay abroad after cosmetic surgery?',
    answer:
      'Recovery time varies by procedure: rhinoplasty requires 7–10 days, tummy tuck needs 10–14 days, liposuction requires 5–7 days, and breast augmentation needs 5–7 days. Your surgeon will advise when it\'s safe to fly based on your healing progress. Plan for follow-up appointments before departure.',
  },
  {
    question: 'What about aftercare when I return to the UK?',
    answer:
      'Reputable clinics provide comprehensive aftercare plans including detailed documentation for UK doctors, remote consultations via video call, 24/7 emergency contact, and clear instructions for post-operative care. Some clinics have partnerships with UK medical professionals for follow-up appointments if needed.',
  },
  {
    question: 'Can I combine multiple procedures?',
    answer:
      'Yes, combining procedures is common and can be cost-effective. Popular combinations include "mummy makeover" (tummy tuck + liposuction + breast surgery) and facial rejuvenation packages (facelift + eyelid surgery). However, combined surgeries have longer recovery times and slightly higher risk. Your surgeon will advise what\'s safe to combine.',
  },
  {
    question: 'What qualifications should I look for in a cosmetic surgeon abroad?',
    answer:
      'Look for board certification in plastic surgery, membership in international societies (ISAPS, EBOPRAS), years of experience in your specific procedure, before/after photos of similar cases, and training at recognised institutions. Many top surgeons abroad trained in UK, Germany, or USA.',
  },
  {
    question: 'Do I need travel insurance for cosmetic surgery abroad?',
    answer:
      'Standard travel insurance does not cover elective cosmetic surgery. You need specialist medical travel insurance that covers your specific procedure, potential complications, extended stays if required, and emergency repatriation. Get quotes before booking and read the policy carefully.',
  },
]

// =============================================================================
// PAGE COMPONENT
// =============================================================================

interface CosmeticSurgeryPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function CosmeticSurgeryPage({ params }: CosmeticSurgeryPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  // Fetch cosmetic surgery category data
  const category = await getCategoryBySlug('cosmetic-surgery')
  const [procedures, clinics] = await Promise.all([
    category ? getProceduresByCategory(category.id) : Promise.resolve([]),
    getClinicsByCategory('cosmetic-surgery', 12),
  ])

  // Generate structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery Abroad' },
  ])

  const faqSchema = generateFAQSchema(COSMETIC_SURGERY_FAQS)

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/cosmetic-surgery`,
    name: 'Cosmetic Surgery Abroad: Your Complete Guide to Treatment Overseas',
    description:
      'Explore cosmetic surgery abroad from the UK. Compare verified clinics, real prices and patient reviews for rhinoplasty, liposuction, tummy tuck and more in Turkey, Poland, Spain and Hungary.',
    url: `${SITE_URL}/cosmetic-surgery`,
    isPartOf: {
      '@id': `${SITE_URL}#website`,
    },
    about: {
      '@type': 'MedicalSpecialty',
      name: 'Plastic Surgery',
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
        <Breadcrumbs items={[{ name: 'Cosmetic Surgery Abroad' }]} />
      </div>

      <CosmeticSurgeryLandingClient
        procedures={procedures}
        clinics={clinics}
        faqs={COSMETIC_SURGERY_FAQS}
      />
    </div>
  )
}
