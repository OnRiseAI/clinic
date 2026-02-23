import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { RhinoplastyTurkeyClient } from './rhinoplasty-turkey-client'
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
  title: 'Rhinoplasty Turkey 2026: £2,450-£4,500 | Top Surgeons & Clinics | MeetYourClinic',
  description:
    "Compare rhinoplasty in Turkey from JCI-accredited clinics. Piezo & traditional techniques, all-inclusive packages, verified surgeons. Save 50-70% vs UK prices.",
  alternates: {
    canonical: `/procedures/rhinoplasty/turkey`,
    languages: {
      'en-GB': `/procedures/rhinoplasty/turkey`,
    },
  },
  openGraph: {
    title: 'Rhinoplasty Turkey 2026: £2,450-£4,500 | Top Surgeons & Clinics',
    description:
      "Compare rhinoplasty in Turkey from JCI-accredited clinics. Piezo & traditional techniques, all-inclusive packages, verified surgeons.",
    url: `${SITE_URL}/procedures/rhinoplasty/turkey`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/rhinoplasty-turkey.jpg`,
        width: 1200,
        height: 630,
        alt: 'Rhinoplasty in Turkey - Compare Clinics and Surgeons in Istanbul',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rhinoplasty Turkey 2026: £2,450-£4,500 | Top Surgeons & Clinics',
    description:
      "Compare rhinoplasty in Turkey from JCI-accredited clinics. Piezo & traditional techniques, all-inclusive packages.",
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const RHINOPLASTY_TURKEY_FAQS = [
  {
    question: 'How much does rhinoplasty cost in Turkey for UK patients?',
    answer:
      "Primary rhinoplasty all-inclusive packages typically range from £2,450-£4,000, covering surgery, accommodation, transfers, and follow-up care. Revision rhinoplasty costs £3,500-£6,000. Premium surgeons may charge £5,000-£9,000. Flights are additional (£80-£250 return). This represents 50-70% savings compared to UK private clinics where equivalent procedures cost £6,500-£16,000.",
  },
  {
    question: 'Is rhinoplasty in Turkey safe for UK patients?',
    answer:
      "Yes, when performed at JCI-accredited facilities by board-certified surgeons. Turkey has 46 JCI-accredited hospitals (2nd highest globally) and ranks 2nd worldwide for plastic surgeons. Complication rates at accredited centres (1.2% major) are comparable to international standards. Key safety factors: verify surgeon credentials, choose JCI-accredited facilities, follow all pre/post-operative instructions.",
  },
  {
    question: 'How long should I stay in Turkey after rhinoplasty?',
    answer:
      "Most patients stay 7-10 days for primary rhinoplasty. This allows for pre-operative consultation (Day 2), surgery (Day 3), initial recovery (Days 4-6), splint removal and clearance to fly (Day 7-10). Revision cases may require 9-12 days. Book return flights for Day 8-11 to allow flexibility.",
  },
  {
    question: 'What is piezo/ultrasonic rhinoplasty and is it worth the extra cost?',
    answer:
      "Piezo rhinoplasty uses ultrasonic vibrations to sculpt bone without damaging soft tissue. Benefits include 40-60% less bruising/swelling, faster recovery (Day 5 vs Day 10-12 improvement), and more precise results. The £400-£700 add-on cost is often justified by improved recovery experience and outcomes, particularly for patients prioritising minimal downtime.",
  },
  {
    question: 'Can I combine rhinoplasty with other procedures in Turkey?',
    answer:
      "Yes, commonly combined procedures include chin augmentation (for facial balance), blepharoplasty (eyelid surgery), and facelift. Combined procedures must be carefully planned for safety. Discuss with your surgeon — some combinations extend recovery time. Septorhinoplasty (functional + aesthetic) is routinely performed together.",
  },
  {
    question: 'What is the difference between open and closed rhinoplasty?',
    answer:
      "Open rhinoplasty involves a small external incision (faint scar that fades) providing full visibility — preferred for complex cases. Closed rhinoplasty uses internal incisions only (no visible scar) with faster recovery — suitable for minor refinements. Your surgeon recommends the approach based on your anatomy and goals.",
  },
  {
    question: 'When will I see final rhinoplasty results?',
    answer:
      "Initial results visible when splint removed (Day 7-10). 80-90% of swelling resolves by Month 3. Final results typically emerge at 12 months when all swelling has resolved and tissues have settled. Patience is essential — noses continue refining for a full year.",
  },
  {
    question: 'What if I am unhappy with my rhinoplasty results?',
    answer:
      "Reputable clinics have revision policies (typically covering surgical fees for medically necessary revision within 12 months). Before booking, confirm the policy in writing. If dissatisfied, wait 12+ months for complete healing before considering revision — many concerns resolve as swelling subsides.",
  },
  {
    question: 'Do Turkish surgeons speak English?',
    answer:
      "Most surgeons treating international patients speak English. Clinics also provide medical translators/coordinators throughout your stay. All documentation is typically provided in English. Communication quality is a key factor in surgeon selection — if you cannot communicate clearly, choose another surgeon.",
  },
  {
    question: 'How do I verify a Turkish rhinoplasty surgeon credentials?',
    answer:
      "Request registration numbers for TSPRAS (Turkish plastic surgery board), Turkish Ministry of Health, and any international memberships (ISAPS, EBOPRAS). Cross-reference with official directories. Legitimate surgeons welcome verification and provide documentation readily.",
  },
  {
    question: 'Can I fly home the day my splint is removed?',
    answer:
      "Possible but not recommended. Allow 1-2 days after splint removal for surgeon review and any adjustments. This also provides buffer if removal is delayed. Most surgeons clear patients for flying 24-48 hours after splint removal if recovery is progressing well.",
  },
  {
    question: 'Will I need someone to accompany me to Turkey for rhinoplasty?',
    answer:
      "Not essential but recommended for comfort and support. Companions can assist during initial recovery, provide emotional support, and help with logistics. If travelling alone, ensure clinic provides adequate support and choose a hotel close to the clinic.",
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Rhinoplasty in Turkey — Complete UK Patient Guide',
  description:
    'Comprehensive guide to rhinoplasty surgery in Turkey for UK patients. Compare prices, surgeons, techniques, and JCI-accredited clinics.',
  url: `${SITE_URL}/procedures/rhinoplasty/turkey`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Rhinoplasty',
    alternateName: ['Nose Job', 'Nose Surgery', 'Nose Reshaping', 'Piezo Rhinoplasty', 'Septorhinoplasty'],
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Nose',
    howPerformed:
      'Rhinoplasty reshapes the nose by modifying bone and cartilage. Techniques include open, closed, piezo (ultrasonic), and preservation rhinoplasty. Surgery typically takes 1.5-3 hours under general anaesthesia.',
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

interface RhinoplastyTurkeyPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function RhinoplastyTurkeyPage({
  params,
}: RhinoplastyTurkeyPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Rhinoplasty', url: '/procedures/rhinoplasty' },
    { name: 'Turkey' },
  ])

  const faqSchema = generateFAQSchema(RHINOPLASTY_TURKEY_FAQS)

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
            { name: 'Rhinoplasty', url: '/procedures/rhinoplasty' },
            { name: 'Turkey' },
          ]}
        />
      </div>

      <RhinoplastyTurkeyClient faqs={RHINOPLASTY_TURKEY_FAQS} />
    </div>
  )
}
