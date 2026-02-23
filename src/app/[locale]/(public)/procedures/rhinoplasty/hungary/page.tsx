import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { RhinoplastyHungaryClient } from './rhinoplasty-hungary-client'
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
  title: 'Rhinoplasty Hungary 2026: €2,200-€3,500 | Budapest Surgeons | MeetYourClinic',
  description:
    'Rhinoplasty in Hungary from €2,200. EU-standard care, internationally trained surgeons, thermal spa recovery. Compare Budapest clinics and save 40-60% vs UK.',
  alternates: {
    canonical: `/procedures/rhinoplasty/hungary`,
    languages: {
      'en-GB': `/procedures/rhinoplasty/hungary`,
    },
  },
  openGraph: {
    title: 'Rhinoplasty Hungary 2026: €2,200-€3,500 | Budapest Surgeons',
    description:
      'Rhinoplasty in Hungary from €2,200. EU-standard care, internationally trained surgeons, thermal spa recovery. Compare Budapest clinics.',
    url: `${SITE_URL}/procedures/rhinoplasty/hungary`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/rhinoplasty-hungary.jpg`,
        width: 1200,
        height: 630,
        alt: 'Rhinoplasty in Hungary - Compare Clinics and Surgeons in Budapest',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rhinoplasty Hungary 2026: €2,200-€3,500 | Budapest Surgeons',
    description:
      'Rhinoplasty in Hungary from €2,200. EU-standard care, internationally trained surgeons, thermal spa recovery.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const RHINOPLASTY_HUNGARY_FAQS = [
  {
    question: 'How much does rhinoplasty cost in Hungary compared to the UK?',
    answer:
      'Primary rhinoplasty in Hungary typically costs €2,200-€3,500 all-inclusive (approximately £1,870-£2,975), compared to £6,500-£9,500 total in the UK. This represents savings of 40-60%. Revision rhinoplasty ranges €4,000-€5,500. Prices include surgeon fees, anaesthesia, clinic facility, accommodation, and transfers.',
  },
  {
    question: 'How long should I stay in Hungary after rhinoplasty?',
    answer:
      'Plan for 7-10 days minimum. This allows for pre-operative consultation (Day 1-2), surgery (Day 3), initial recovery (Days 4-6), and splint removal with final assessment (Days 7-10). Staying longer provides additional safety margin for identifying early complications.',
  },
  {
    question: 'Do Hungarian surgeons speak English?',
    answer:
      'Most Hungarian plastic surgeons serving international patients speak fluent English. Many also speak German, and some speak additional languages. Clinics typically provide English-speaking patient coordinators. Confirm language capabilities during your initial consultation.',
  },
  {
    question: 'Is Hungary in the EU? What does this mean for medical care?',
    answer:
      'Yes, Hungary is an EU member state. This means EU healthcare directives apply, including patient rights regulations and cross-border healthcare rules. While NHS reimbursement typically does not cover elective cosmetic procedures, EU membership provides regulatory framework and legal protections.',
  },
  {
    question: 'What accreditations should Hungarian clinics have?',
    answer:
      'Look for: Hungarian Ministry of Health facility licence, ISO certification (common among quality clinics), surgeon\'s Hungarian Medical Chamber registration, and membership in MPHST (Hungarian plastic surgery society). JCI accreditation is rare in Hungary (only 1 facility) but not essential for quality care.',
  },
  {
    question: 'Can I combine rhinoplasty with thermal spa treatments?',
    answer:
      'Not immediately — thermal baths are contraindicated during initial healing (typically 4-6 weeks post-op). However, if you plan an extended stay or return visit, Budapest\'s famous thermal spas (Széchenyi, Gellért, Rudas) offer excellent relaxation. Always confirm with your surgeon before any thermal exposure.',
  },
  {
    question: 'How do I arrange follow-up care when I return to the UK?',
    answer:
      'Hungarian surgeons typically provide: detailed aftercare instructions, photo-based remote consultations via email/WhatsApp, emergency contact numbers, and medical records you can share with UK healthcare providers. For physical follow-up, contact UK plastic surgeons who offer post-operative consultations.',
  },
  {
    question: 'What are the flight options from the UK to Budapest?',
    answer:
      'Multiple daily direct flights operate from London (Heathrow, Gatwick, Stansted, Luton) to Budapest — flight time approximately 2.5 hours. Airlines include British Airways, Wizz Air, Ryanair, and easyJet. Regional UK airports also offer connections. Return flights typically cost £50-£150.',
  },
  {
    question: 'Is ultrasonic rhinoplasty available in Hungary?',
    answer:
      'Yes, select premium clinics offer ultrasonic (Piezotome) rhinoplasty from approximately €2,870. This technique is not universally available, so confirm with your chosen surgeon during consultation. Benefits include reduced bruising and more precise bone work.',
  },
  {
    question: 'What happens if I am unhappy with my results?',
    answer:
      'Discuss revision policies before booking. Most reputable surgeons offer discounted revision surgery for their own patients if results do not meet agreed expectations. Policies vary — get terms in writing. Note that minor asymmetry is normal; significant revision needs should be rare with experienced surgeons.',
  },
  {
    question: 'Can I fly home with a nasal splint still on?',
    answer:
      'Generally not recommended. Most surgeons remove the external splint at Day 7-10 before clearing patients for flight. Flying with a splint is not dangerous but not ideal — pressure changes and cabin air can cause discomfort. Plan your stay to include splint removal before departure.',
  },
  {
    question: 'Is Budapest safe for solo medical tourists?',
    answer:
      'Budapest is generally safe for tourists, including solo travellers. The city has excellent public transport, English is widely spoken in tourist areas, and medical tourism infrastructure is well-developed. Standard travel precautions apply. Clinics provide airport transfers and can recommend safe accommodation near their facilities.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Rhinoplasty in Hungary — UK Patient Guide to Nose Surgery in Budapest',
  description:
    'Comprehensive guide to rhinoplasty surgery in Hungary for UK patients. Compare prices, surgeons, EU-standard facilities, and thermal spa recovery options.',
  url: `${SITE_URL}/procedures/rhinoplasty/hungary`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Rhinoplasty',
    alternateName: ['Nose Job', 'Nose Surgery', 'Nose Reshaping', 'Septorhinoplasty'],
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Nose',
    howPerformed:
      'Rhinoplasty reshapes the nose by modifying bone and cartilage. Techniques include open, closed, ultrasonic, and preservation rhinoplasty. Surgery typically takes 1.5-3 hours under general anaesthesia.',
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

interface RhinoplastyHungaryPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function RhinoplastyHungaryPage({
  params,
}: RhinoplastyHungaryPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Rhinoplasty', url: '/procedures/rhinoplasty' },
    { name: 'Hungary' },
  ])

  const faqSchema = generateFAQSchema(RHINOPLASTY_HUNGARY_FAQS)

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
            { name: 'Hungary' },
          ]}
        />
      </div>

      <RhinoplastyHungaryClient faqs={RHINOPLASTY_HUNGARY_FAQS} />
    </div>
  )
}
