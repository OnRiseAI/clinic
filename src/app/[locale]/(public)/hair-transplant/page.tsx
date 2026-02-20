import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { HairTransplantClient } from './hair-transplant-client'
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
  title: 'Hair Transplant Abroad — Compare Prices, Techniques & Top Clinics | MeetYourClinic',
  description:
    'Save 50-80% on hair transplant abroad. Compare FUE, DHI & sapphire techniques in Turkey, Spain, Hungary, Poland — real prices, verified clinics, recovery guidance.',
  alternates: {
    canonical: `${SITE_URL}/en/hair-transplant`,
    languages: {
      'en-GB': `${SITE_URL}/en/hair-transplant`,
    },
  },
  openGraph: {
    title: 'Hair Transplant Abroad — Compare Prices, Techniques & Top Clinics',
    description:
      'Save 50-80% on hair transplant abroad. FUE, DHI & sapphire techniques in Turkey, Spain, Hungary, Poland. Real prices, verified clinics.',
    url: `${SITE_URL}/hair-transplant`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${SITE_URL}/images/og/hair-transplant-abroad.jpg`,
        width: 1200,
        height: 630,
        alt: 'Hair Transplant Abroad - Compare Prices and Techniques in Turkey, Spain, Hungary, Poland',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hair Transplant Abroad — Compare Prices, Techniques & Top Clinics',
    description:
      'Save 50-80% on hair transplant abroad. FUE, DHI & sapphire techniques. Real prices, verified clinics.',
  },
}

// =============================================================================
// FAQ DATA FOR STRUCTURED DATA
// =============================================================================

const HAIR_TRANSPLANT_FAQS = [
  {
    question: 'How much does a hair transplant cost abroad?',
    answer:
      'Turkey offers the best value: £1,500–£2,800 for FUE/DHI all-inclusive packages (flights, hotel, transfers). Spain and Hungary range £2,500–£4,500; Poland £2,200–£4,000. UK prices typically run £8,000–£15,000 for the same procedure — meaning you can save 50–80% by going abroad. Turkey performs over 750,000 hair transplants annually and is the world leader in both volume and expertise.',
  },
  {
    question: 'Is Turkey safe for hair transplants?',
    answer:
      'Yes. Turkey has become the global hub for hair transplants, with hundreds of JCI-accredited clinics and thousands of experienced surgeons. Top clinics maintain 90–95% success rates and strict hygiene protocols. Choose clinics with JCI accreditation, verified reviews, and transparent before/after galleries. Avoid budget clinics that cut corners — the price difference between mid-range and budget can be small, but quality varies significantly.',
  },
  {
    question: "What's the difference between FUE and DHI?",
    answer:
      'FUE (Follicular Unit Extraction) harvests individual follicles from the donor area using a punch tool, then creates recipient incisions before implantation. DHI (Direct Hair Implantation) uses a Choi pen to extract and implant in one step — no pre-made incisions, so the surgeon controls angle and density in real time. DHI often yields denser packing and faster healing. Both are minimally invasive with no linear scars. Sapphire FUE uses sapphire blades instead of steel for finer incisions and faster healing.',
  },
  {
    question: 'How many grafts do I need?',
    answer:
      'It depends on your degree of hair loss and desired density. Norwood scale: Stage II–III (early) typically 1,500–2,500 grafts; Stage IV–V (moderate) 3,000–4,500 grafts; Stage VI–VII (advanced) 4,500–6,000+ grafts. A consultation with photos will give you an accurate estimate. Overharvesting can thin the donor area — reputable clinics assess donor capacity and recommend a safe graft count.',
  },
  {
    question: 'What is sapphire FUE?',
    answer:
      'Sapphire FUE uses blades made from medical-grade sapphire instead of steel. Sapphire blades are sharper and create finer incisions, which can reduce trauma, speed healing, and improve graft survival. Some clinics charge a premium for sapphire FUE. It is widely available in Turkey and increasingly in Spain and Hungary.',
  },
  {
    question: 'How long do I need to stay abroad?',
    answer:
      'Typically 3–5 days. Day 1: consultation and procedure (6–10 hours depending on graft count). Days 2–3: first wash and check-up. Day 4–5: final check and fit-to-fly clearance. Turkey packages often include 3–4 nights accommodation. You can return to normal activities within a week, though the scalp will remain sensitive and scabs will shed over 10–14 days.',
  },
  {
    question: 'When will I see results?',
    answer:
      'Transplanted hair sheds 2–4 weeks after surgery (this is normal). New growth begins around 3–4 months. Visible results at 6–12 months; final density and texture at 12–18 months. Patience is essential — hair grows in cycles. Most patients see meaningful improvement by month 8–10.',
  },
  {
    question: 'What about aftercare when I return to the UK?',
    answer:
      'Reputable clinics provide a detailed aftercare pack and 24/7 support. You will receive special shampoo, instructions for washing, and guidance on avoiding sun, swimming, and strenuous exercise for the first few weeks. Many clinics offer remote follow-up via WhatsApp or video. Some partner with UK clinics for in-person check-ups. Ask about aftercare before booking.',
  },
  {
    question: 'Can women get hair transplants?',
    answer:
      'Yes. Female hair loss (often diffuse thinning rather than receding hairline) is increasingly treated with FUE/DHI. Women typically need fewer grafts (1,500–3,000) but require careful donor assessment — female pattern loss can affect the donor area. Consultations should evaluate cause (hormonal, genetic, stress) and suitability. Many clinics have specific female hair transplant programmes.',
  },
  {
    question: "What's the success rate?",
    answer:
      'At reputable clinics, graft survival is 90–95%. Success depends on surgeon skill, clinic hygiene, patient health, and aftercare. Cheap clinics with high-volume, low-skill operations can have lower survival rates. Look for clinics that publish verified before/after results and have consistent reviews.',
  },
  {
    question: 'Are hair transplant results permanent?',
    answer:
      'Yes. Transplanted hair is taken from the permanent donor zone (sides and back of the head) and retains its genetic resistance to DHT, the hormone that causes male pattern baldness. It will not fall out from pattern baldness. However, existing non-transplanted hair may continue to thin — some patients need a second procedure years later for additional coverage. Finasteride/minoxidil can help preserve existing hair.',
  },
  {
    question: 'How do I choose the right clinic?',
    answer:
      'Check: JCI or EU accreditation, verified before/after galleries, real patient reviews (Trustpilot, Google), surgeon qualifications and experience, transparent pricing (all-inclusive), and aftercare support. Avoid clinics that pressure you to book immediately or offer unrealistic graft counts. Video consultations let you assess communication and ask about technique (FUE, DHI, sapphire), graft estimates, and revision policies.',
  },
]

// =============================================================================
// STRUCTURED DATA SCHEMAS
// =============================================================================

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Hair Transplant Abroad — Compare Prices, Techniques & Top Clinics',
  description:
    'Comprehensive guide to hair transplant abroad for UK patients. Compare FUE, DHI, and sapphire techniques across Turkey, Spain, Hungary, and Poland with real prices and verified clinics.',
  url: `${SITE_URL}/hair-transplant`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Hair Transplant',
    alternateName: [
      'FUE Hair Transplant',
      'DHI Hair Transplant',
      'Sapphire FUE',
      'Follicular Unit Extraction',
      'Direct Hair Implantation',
    ],
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Scalp',
    howPerformed:
      'Hair transplant involves extracting individual hair follicles from the donor area (typically the back and sides of the head) and implanting them into thinning or bald areas. Techniques include FUE (Follicular Unit Extraction), DHI (Direct Hair Implantation), and sapphire FUE. The procedure typically takes 6-10 hours depending on graft count.',
  },
  audience: {
    '@type': 'MedicalAudience',
    audienceType: 'Patient',
    geographicArea: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
  },
  lastReviewed: '2026-02-21',
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

interface HairTransplantPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600 // Revalidate every hour

export default async function HairTransplantPage({
  params,
}: HairTransplantPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Hair Transplant' },
  ])

  const faqSchema = generateFAQSchema(HAIR_TRANSPLANT_FAQS)

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
            { name: 'Hair Transplant' },
          ]}
        />
      </div>

      <HairTransplantClient faqs={HAIR_TRANSPLANT_FAQS} />
    </div>
  )
}
