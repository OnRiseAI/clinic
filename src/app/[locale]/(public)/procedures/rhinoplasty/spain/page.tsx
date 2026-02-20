import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { RhinoplastySpainClient } from './rhinoplasty-spain-client'
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
  title: 'Rhinoplasty Spain 2026: €4,500-€7,500 | Ultrasonic Specialists | MeetYourClinic',
  description:
    "Compare rhinoplasty in Spain with ultrasonic & preservation technique specialists. Premium European care, Mediterranean recovery. Save 40-60% vs UK prices.",
  alternates: {
    canonical: `${SITE_URL}/en/procedures/rhinoplasty/spain`,
    languages: {
      'en-GB': `${SITE_URL}/en/procedures/rhinoplasty/spain`,
    },
  },
  openGraph: {
    title: 'Rhinoplasty Spain 2026: €4,500-€7,500 | Ultrasonic Specialists',
    description:
      "Compare rhinoplasty in Spain with ultrasonic & preservation technique specialists. Premium European care, Mediterranean recovery.",
    url: `${SITE_URL}/procedures/rhinoplasty/spain`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/rhinoplasty-spain.jpg`,
        width: 1200,
        height: 630,
        alt: 'Rhinoplasty in Spain - Ultrasonic Technique Specialists in Barcelona and Madrid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rhinoplasty Spain 2026: €4,500-€7,500 | Ultrasonic Specialists',
    description:
      "Compare rhinoplasty in Spain with ultrasonic & preservation technique specialists. Premium European care.",
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const RHINOPLASTY_SPAIN_FAQS = [
  {
    question: 'How much does rhinoplasty cost in Spain?',
    answer:
      "Primary rhinoplasty in Spain typically costs €4,500-€7,500, with ultrasonic rhinoplasty ranging from €4,000-€10,000. Revision rhinoplasty costs €5,500-€9,000. Premium specialists (Dr. Marco Romeo, Dr. Tintoré) may charge €7,000-€10,000 for complex cases. These prices include surgery, hospital stay, and follow-up care but typically exclude accommodation and flights. This represents 40-60% savings versus comparable UK prices.",
  },
  {
    question: 'What is ultrasonic rhinoplasty and why is Spain known for it?',
    answer:
      "Ultrasonic rhinoplasty uses a Piezotome device with high-frequency vibrations (25-30 kHz) to precisely sculpt nasal bone without damaging surrounding soft tissue. Spain leads in this technique with surgeons like Dr. Tintoré and Dr. Marco Romeo specialising in the method. Benefits include minimal bruising, faster recovery (7 days vs 2-3 weeks), no nasal packing, and more predictable results.",
  },
  {
    question: 'What is preservation rhinoplasty?',
    answer:
      "Preservation rhinoplasty reshapes the nose by working within existing structures rather than removing and reconstructing them. Surgeons maintain the nasal bridge's support framework, resulting in noses that look and feel more natural long-term. Spanish specialists like Dr. Fernández Blanco and Dr. Francisco Bravo are leading practitioners of this advanced approach.",
  },
  {
    question: 'How long should I stay in Spain after rhinoplasty?',
    answer:
      "Plan for 7-10 days in Spain. This allows for pre-operative consultation (Day 2), surgery with overnight stay (Day 3-4), initial recovery (Days 5-7), and splint removal with surgeon review (Day 7-10). The short flight home (2-2.5 hours) means you can travel comfortably once cleared.",
  },
  {
    question: 'Madrid or Barcelona - which is better for rhinoplasty?',
    answer:
      "Both cities offer excellent options. Madrid has the highest concentration of premium surgeons and hospital-based care (Ruber Internacional, Vithas). Barcelona offers aesthetic clinic innovation (Clínica Planas) and lifestyle appeal. Marbella provides a resort-style recovery experience. Choose based on your priorities: hospital infrastructure (Madrid), innovation focus (Barcelona), or luxury recovery (Marbella).",
  },
  {
    question: 'Is rhinoplasty in Spain safe?',
    answer:
      "Yes. Spain's healthcare system ranked 7th globally in WHO's World Health Report and has the highest life expectancy in the EU (84 years). Premium hospitals meet strict European standards. Ultrasonic technique further improves safety with reduced bleeding, less tissue trauma, and faster healing. Key safety factors: choose SECPRE-certified surgeons and accredited facilities.",
  },
  {
    question: 'Do Spanish rhinoplasty surgeons speak English?',
    answer:
      "Top surgeons treating international patients speak English fluently. Dr. Marco Romeo speaks five languages. Clinics provide English-speaking patient coordinators, and all documentation is available in English. Communication quality should be assessed during consultation — choose a surgeon you can communicate clearly with.",
  },
  {
    question: 'What is the recovery like with ultrasonic rhinoplasty in Spain?',
    answer:
      "Significantly easier than traditional rhinoplasty. Minimal to no bruising (vs 14-21 days traditional), no nasal packing required, visible improvement by Day 5-7, and return to social activities within 7-10 days. Pain is mild — most patients describe pressure or tightness rather than significant discomfort.",
  },
  {
    question: 'Can I combine rhinoplasty with other procedures in Spain?',
    answer:
      "Yes, commonly combined with chin augmentation, blepharoplasty (eyelid surgery), or facelift for comprehensive facial harmony. Spanish surgeons like Dr. Marco Romeo offer combination procedures. Discuss with your surgeon — some combinations extend recovery time.",
  },
  {
    question: 'When will I see final rhinoplasty results?',
    answer:
      "Initial results visible when splint removed (Day 7-10). 80-90% of swelling resolved by Month 3. Final results emerge at 12 months when all swelling has resolved and tissues have settled. Ultrasonic technique shows results faster due to reduced swelling.",
  },
  {
    question: 'What if I am unhappy with my rhinoplasty results?',
    answer:
      "Discuss revision policy before booking. Most Spanish surgeons offer reduced-fee revision for genuine medical necessity. Wait minimum 12 months for complete healing before considering revision — many concerns resolve as swelling subsides. Spanish surgeons are experienced with revision cases from other countries.",
  },
  {
    question: 'Why choose Spain over Turkey for rhinoplasty?',
    answer:
      "Spain offers technique innovation (ultrasonic, preservation leadership), European healthcare standards, closer proximity to UK (2 hours vs 4), and premium quality positioning. Turkey offers higher volumes and lower prices. Choose Spain if advanced technique and European standards are priorities; choose Turkey if maximum savings is the primary goal.",
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Rhinoplasty in Spain — Premium European Nose Surgery',
  description:
    'Comprehensive guide to rhinoplasty surgery in Spain for UK patients, covering ultrasonic and preservation techniques at premium European clinics.',
  url: `${SITE_URL}/procedures/rhinoplasty/spain`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Rhinoplasty',
    alternateName: ['Nose Job', 'Ultrasonic Rhinoplasty', 'Preservation Rhinoplasty', 'Piezo Rhinoplasty'],
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Nose',
    howPerformed:
      'Rhinoplasty in Spain emphasises ultrasonic (Piezotome) and preservation techniques. Ultrasonic vibrations sculpt nasal bone precisely while preserving soft tissue. Surgery typically takes 1.5-3 hours under general anaesthesia.',
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

interface RhinoplastySpainPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function RhinoplastySpainPage({
  params,
}: RhinoplastySpainPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Rhinoplasty', url: '/procedures/rhinoplasty' },
    { name: 'Spain' },
  ])

  const faqSchema = generateFAQSchema(RHINOPLASTY_SPAIN_FAQS)

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
            { name: 'Spain' },
          ]}
        />
      </div>

      <RhinoplastySpainClient faqs={RHINOPLASTY_SPAIN_FAQS} />
    </div>
  )
}
