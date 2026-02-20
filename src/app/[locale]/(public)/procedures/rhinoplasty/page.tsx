import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { RhinoplastyClient } from './rhinoplasty-client'
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
  title: 'Rhinoplasty Abroad — Compare Prices, Techniques & Top Surgeons | MeetYourClinic',
  description:
    "Compare rhinoplasty prices abroad from £2,000. Piezo, ultrasonic & preservation techniques in Turkey, Spain, Hungary, Poland — real prices, verified surgeons, recovery guidance. Save 40–70% vs UK.",
  alternates: {
    canonical: `${SITE_URL}/en/procedures/rhinoplasty`,
    languages: {
      'en-GB': `${SITE_URL}/en/procedures/rhinoplasty`,
    },
  },
  openGraph: {
    title: 'Rhinoplasty Abroad — Compare Prices, Techniques & Top Surgeons',
    description:
      "Compare rhinoplasty prices abroad from £2,000. Piezo, ultrasonic & preservation techniques in Turkey, Spain, Hungary, Poland. Save 40–70% vs UK.",
    url: `${SITE_URL}/procedures/rhinoplasty`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/rhinoplasty-abroad.jpg`,
        width: 1200,
        height: 630,
        alt: 'Rhinoplasty Abroad - Compare Prices and Techniques in Turkey, Spain, Hungary, Poland',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rhinoplasty Abroad — Compare Prices, Techniques & Top Surgeons',
    description:
      "Compare rhinoplasty prices abroad from £2,000. Piezo, ultrasonic & preservation techniques. Save 40–70% vs UK.",
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const RHINOPLASTY_FAQS = [
  {
    question: 'How much does rhinoplasty cost abroad?',
    answer:
      "From £2,000 (Hungary) to £9,000 (Spain). Turkey averages £2,450–£4,000 for primary rhinoplasty including accommodation. Piezo/ultrasonic techniques cost more. All-inclusive packages vary by destination — Turkey includes hotel and transfers, EU destinations typically focus on surgery with accommodation arranged separately.",
  },
  {
    question: "What's the difference between piezo and traditional rhinoplasty?",
    answer:
      "Piezo (piezotome) uses ultrasonic vibrations to sculpt bone with minimal soft tissue trauma — resulting in dramatically less bruising (often none), faster recovery (7 vs 14 days), and no nasal packing. Traditional methods use chisels and rasps that cause more tissue trauma. Piezo is more expensive but offers significant recovery advantages.",
  },
  {
    question: 'Is rhinoplasty abroad safe?',
    answer:
      "Yes, when you choose accredited clinics and board-certified surgeons. Top international clinics have complication rates comparable to UK private hospitals — under 5% overall, under 1% for serious complications. Look for JCI accreditation (Turkey), ISO 9001 (EU), and ISAPS membership.",
  },
  {
    question: 'How long do I need to stay abroad after rhinoplasty?',
    answer:
      "Most patients need 7–10 days in the destination. Splint removal is typically Day 7–10, after which fit-to-fly clearance is given. Turkey packages often include 10–14 days; EU destinations typically 7–10 days.",
  },
  {
    question: 'What is preservation rhinoplasty?',
    answer:
      "Preservation rhinoplasty reshapes nasal bone without breaking it, maintaining natural support structures. The result is a nose that looks and feels natural — it bends and moves normally. Spain leads in preservation techniques. It's best for patients wanting subtle, natural-feeling results rather than dramatic transformation.",
  },
  {
    question: 'Can I combine rhinoplasty with other procedures?',
    answer:
      "Yes. Common combinations include: rhinoplasty + chin augmentation (facial balancing), rhinoplasty + blepharoplasty (eyelid surgery), rhinoplasty + lip filler (facial harmony). Combining procedures can reduce overall costs and total recovery time but increases surgical time and requires careful planning.",
  },
  {
    question: 'How long until I see final rhinoplasty results?',
    answer:
      "Swelling evolution: 80% resolved by 4–6 weeks, 90% by 3 months, final results at 12–18 months. Tip swelling is last to resolve. Most patients are happy with their nose after splint removal, but refinement continues for over a year. Patience is essential.",
  },
  {
    question: 'What if I am unhappy with my rhinoplasty results?',
    answer:
      "Wait 12–18 months for full healing before considering revision. Minor asymmetries often resolve as swelling subsides. If genuine issues remain, revision rhinoplasty can address them — but choose a revision specialist, not the same surgeon if the issue was surgical error. Most reputable clinics have revision policies.",
  },
  {
    question: 'Is piezo rhinoplasty available in all destinations?',
    answer:
      "Piezo/ultrasonic rhinoplasty is widely available in Turkey (standard at top clinics) and Spain (leaders in technique). Hungary and Poland offer piezo at select clinics — confirm availability when booking. Traditional rhinoplasty is available everywhere.",
  },
  {
    question: 'Can rhinoplasty fix my breathing problems?',
    answer:
      "Yes. Septorhinoplasty combines cosmetic reshaping with functional correction of a deviated septum. If breathing issues are your primary concern, ensure your surgeon has functional rhinoplasty experience — some cosmetic surgeons focus only on aesthetics. Turkey and Spain have strong functional rhinoplasty expertise.",
  },
  {
    question: "What's the best country for rhinoplasty abroad?",
    answer:
      "Depends on priorities: Turkey for maximum savings and widest surgeon choice; Spain for technique innovation (preservation, ultrasonic) and premium quality; Hungary for EU value; Poland for EU protections with meticulous approach. All four destinations have excellent surgeons — the 'best' depends on your budget, priorities, and desired technique.",
  },
  {
    question: 'Do I need a consultation before booking rhinoplasty abroad?',
    answer:
      "Absolutely. Reputable clinics offer video consultations where you discuss goals, share photos, and receive preliminary recommendations. Never book surgery without a consultation — this is a major red flag. Use consultations to assess communication, understand the surgeon's approach, and confirm technique availability.",
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Rhinoplasty Abroad — Compare Prices, Techniques & Top Surgeons',
  description:
    'Comprehensive guide to rhinoplasty abroad for UK patients. Compare piezo, ultrasonic, and preservation techniques across Turkey, Spain, Hungary, and Poland with real prices and verified surgeons.',
  url: `${SITE_URL}/procedures/rhinoplasty`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Rhinoplasty',
    alternateName: ['Nose Job', 'Nose Reshaping', 'Nose Surgery', 'Piezo Rhinoplasty', 'Ultrasonic Rhinoplasty', 'Preservation Rhinoplasty'],
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Nose',
    howPerformed:
      'Rhinoplasty reshapes the nose by modifying bone and cartilage. Techniques include traditional open/closed, piezo (ultrasonic), and preservation methods. Surgery typically takes 1.5-3 hours under general anaesthesia.',
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

interface RhinoplastyPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function RhinoplastyPage({
  params,
}: RhinoplastyPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Rhinoplasty' },
  ])

  const faqSchema = generateFAQSchema(RHINOPLASTY_FAQS)

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
            { name: 'Rhinoplasty' },
          ]}
        />
      </div>

      <RhinoplastyClient faqs={RHINOPLASTY_FAQS} />
    </div>
  )
}
