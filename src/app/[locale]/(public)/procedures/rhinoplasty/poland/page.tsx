import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { RhinoplastyPolandClient } from './rhinoplasty-poland-client'
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
  title: 'Rhinoplasty Poland 2025: £2,900-£4,500 | EU Quality & Standards | medit',
  description:
    "Compare rhinoplasty in Poland with EU-trained surgeons at accredited clinics. Warsaw, Kraków, KCM Clinic specialists. EU healthcare standards, 40-60% savings vs UK prices.",
  alternates: {
    canonical: `${SITE_URL}/en/procedures/rhinoplasty/poland`,
    languages: {
      'en-GB': `${SITE_URL}/en/procedures/rhinoplasty/poland`,
    },
  },
  openGraph: {
    title: 'Rhinoplasty Poland 2025: £2,900-£4,500 | EU Quality & Standards',
    description:
      "Compare rhinoplasty in Poland with EU-trained surgeons at accredited clinics. Warsaw, Kraków, KCM Clinic specialists.",
    url: `${SITE_URL}/procedures/rhinoplasty/poland`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/rhinoplasty-poland.jpg`,
        width: 1200,
        height: 630,
        alt: 'Rhinoplasty in Poland - EU-Standard Care in Warsaw and Kraków',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rhinoplasty Poland 2025: £2,900-£4,500 | EU Quality & Standards',
    description:
      "Compare rhinoplasty in Poland with EU-trained surgeons at accredited clinics. EU healthcare standards.",
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const RHINOPLASTY_POLAND_FAQS = [
  {
    question: 'How much does rhinoplasty cost in Poland?',
    answer:
      "Primary rhinoplasty in Poland typically costs £2,900-£4,500, with revision rhinoplasty ranging from £3,800-£5,500. Piezo/ultrasonic rhinoplasty costs £3,500-£5,000. These prices usually include surgery, hospital stay, and follow-up care but exclude accommodation and flights. This represents 40-60% savings versus comparable UK prices of £6,500-£12,000.",
  },
  {
    question: 'Is rhinoplasty in Poland safe?',
    answer:
      "Yes. Poland operates under EU healthcare regulations with strict quality standards. Surgeons are trained to European standards, many with additional qualifications from Germany, Austria, or the UK. Clinics hold ISO 9001 certification and Polish National Health Fund accreditation. The Polish Society of Plastic, Reconstructive and Aesthetic Surgery (PTChPRiE) maintains rigorous membership standards.",
  },
  {
    question: 'What is KCM Clinic and why is it recommended for rhinoplasty?',
    answer:
      "KCM Clinic in Jelenia Góra is Poland's leading medical tourism facility, purpose-built for international patients. Located in a mountain resort setting, it offers dedicated recovery accommodation, English-speaking staff throughout, and comprehensive packages. Dr. Grzegorz Kierzynka, their lead rhinoplasty surgeon, has performed 1,100+ rhinoplasties with a sub-5% revision rate.",
  },
  {
    question: 'How long should I stay in Poland after rhinoplasty?',
    answer:
      "Plan for 7-10 days in Poland. This allows for pre-operative consultation (Day 1-2), surgery with overnight stay (Day 2-3), initial recovery (Days 3-6), and splint removal with surgeon review (Day 7-10). The short flight home (2-2.5 hours from Warsaw or Kraków) means comfortable travel once cleared.",
  },
  {
    question: 'Warsaw or Kraków - which is better for rhinoplasty?',
    answer:
      "Both cities offer excellent options. Warsaw has the highest concentration of surgeons and university hospital affiliations. Kraków offers historic charm and slightly lower costs. Jelenia Góra (KCM Clinic) provides a unique mountain recovery experience with purpose-built medical tourism infrastructure. Choose based on priorities: medical hub (Warsaw), cultural experience (Kraków), or dedicated recovery environment (Jelenia Góra).",
  },
  {
    question: 'Do Polish rhinoplasty surgeons speak English?',
    answer:
      "Top surgeons treating international patients speak English fluently. Clinics provide English-speaking patient coordinators, and all documentation is available in English. Poland has high English proficiency rates, especially in medical settings. Communication quality should be assessed during consultation.",
  },
  {
    question: 'What techniques are available in Poland?',
    answer:
      "Polish surgeons offer the full range of modern techniques: open and closed rhinoplasty, piezo/ultrasonic rhinoplasty, preservation rhinoplasty, septorhinoplasty (functional + aesthetic), and ethnic rhinoplasty. Many surgeons trained in Germany or Austria bring Central European precision to their work.",
  },
  {
    question: 'What are Poland healthcare standards like?',
    answer:
      "As an EU member since 2004, Poland adheres to European healthcare directives. Medical qualifications are EU-recognised, allowing Polish surgeons to practice anywhere in Europe. The healthcare system ranks competitively in EU assessments. Private clinics often exceed public sector standards with modern equipment and international accreditations.",
  },
  {
    question: 'Can I combine rhinoplasty with other procedures in Poland?',
    answer:
      "Yes, commonly combined procedures include chin augmentation (facial balancing), blepharoplasty (eyelid surgery), and otoplasty (ear correction). Polish clinics offer competitive pricing for combination procedures. Discuss with your surgeon — some combinations extend recovery time.",
  },
  {
    question: 'When will I see final rhinoplasty results?',
    answer:
      "Initial results visible when splint removed (Day 7-10). 80-90% of swelling resolved by Month 3. Final results typically emerge at 12 months when all swelling has resolved and tissues have settled. Polish surgeons are known for meticulous technique that ages well.",
  },
  {
    question: 'What if I am unhappy with my rhinoplasty results?',
    answer:
      "Discuss revision policy before booking. Most Polish clinics offer reduced-fee revision for genuine medical necessity within 12 months. Wait minimum 12 months for complete healing before considering revision — many concerns resolve as swelling subsides. EU consumer protection laws provide additional safeguards.",
  },
  {
    question: 'Why choose Poland over Turkey for rhinoplasty?',
    answer:
      "Poland offers EU healthcare standards and regulations, shorter travel distance (2 hours vs 4 hours flight), European consumer protection laws, EU-recognised medical qualifications, and Central European precision approach. Turkey offers higher volumes and lower prices. Choose Poland if EU standards and proximity are priorities; choose Turkey if maximum savings is the primary goal.",
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Rhinoplasty in Poland — EU-Standard Nose Surgery',
  description:
    'Comprehensive guide to rhinoplasty surgery in Poland for UK patients, covering EU-trained surgeons, accredited clinics, and competitive pricing in Warsaw, Kraków, and specialist centres.',
  url: `${SITE_URL}/procedures/rhinoplasty/poland`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Rhinoplasty',
    alternateName: ['Nose Job', 'Nose Surgery', 'Nose Reshaping', 'Piezo Rhinoplasty', 'Septorhinoplasty'],
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Nose',
    howPerformed:
      'Rhinoplasty in Poland follows EU medical standards with techniques including open, closed, piezo (ultrasonic), and preservation rhinoplasty. Surgery typically takes 1.5-3 hours under general anaesthesia.',
  },
  audience: {
    '@type': 'MedicalAudience',
    audienceType: 'Patient',
    geographicArea: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
  },
  lastReviewed: '2025-02-02',
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

interface RhinoplastyPolandPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function RhinoplastyPolandPage({
  params,
}: RhinoplastyPolandPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Rhinoplasty', url: '/procedures/rhinoplasty' },
    { name: 'Poland' },
  ])

  const faqSchema = generateFAQSchema(RHINOPLASTY_POLAND_FAQS)

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
            { name: 'Poland' },
          ]}
        />
      </div>

      <RhinoplastyPolandClient faqs={RHINOPLASTY_POLAND_FAQS} />
    </div>
  )
}
