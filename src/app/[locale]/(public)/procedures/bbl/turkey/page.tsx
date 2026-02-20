import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BBLTurkeyClient } from './bbl-turkey-client'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from '@/lib/seo/structured-data'
import { StructuredData } from '@/components/seo/structured-data-component'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://meetyourclinic.com'

export const metadata: Metadata = {
  title: 'BBL in Turkey — Prices from £2,800, Top Clinics & Safety | MeetYourClinic',
  description:
    'Compare BBL prices in Turkey from £2,800 all-inclusive. Brazilian Butt Lift at JCI-accredited Istanbul clinics. Safety protocols, before/after results, and free consultations.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/bbl/turkey`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/bbl/turkey` },
  },
  openGraph: {
    title: 'BBL in Turkey — Prices from £2,800, Top Clinics & Safety',
    description: 'Compare BBL prices in Turkey from £2,800. Brazilian Butt Lift at JCI-accredited clinics.',
    url: `${SITE_URL}/procedures/bbl/turkey`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const BBL_TURKEY_FAQS = [
  {
    question: 'How much does a BBL cost in Turkey?',
    answer: 'BBL in Turkey costs £2,800–£5,000 all-inclusive. Packages include surgery, hospital stay, hotel (5–7 nights), airport transfers, compression garments, and aftercare. This compares to £8,000–£12,000 in the UK — savings of 60–70%.',
  },
  {
    question: 'Is BBL in Turkey safe?',
    answer: 'BBL in Turkey is safe when choosing JCI-accredited hospitals and experienced surgeons. Turkey performs thousands of BBLs annually. Key safety factors: surgeon follows ISAPS guidelines, subcutaneous injection only, ultrasound guidance, and overnight hospital monitoring. Verify the surgeon\'s BBL-specific experience.',
  },
  {
    question: 'Which city is best for BBL in Turkey?',
    answer: 'Istanbul has the highest concentration of experienced BBL surgeons and JCI-accredited hospitals. Antalya offers similar quality with a resort recovery setting. Both cities have excellent international patient infrastructure.',
  },
  {
    question: 'How long should I stay in Turkey for BBL?',
    answer: 'Plan for 10–14 days minimum. You cannot sit normally for 2+ weeks, making long flights difficult. Most packages include 7 nights hotel. Fit-to-fly clearance is typically day 10–14 with a BBL pillow for the flight.',
  },
  {
    question: 'What\'s included in a BBL package in Turkey?',
    answer: 'Standard packages include: BBL surgery + liposuction, hospital stay (1–2 nights), anaesthesia, pre-op tests, compression garment, BBL pillow, 5–7 nights hotel, airport transfers, medications, and follow-up appointments. Flights are usually separate.',
  },
  {
    question: 'How much fat can be transferred in a BBL in Turkey?',
    answer: 'Typically 400–800cc per buttock (800–1600cc total). Volume depends on available donor fat and safe limits. Turkish surgeons prioritise safety over maximum volume. Some fat (20–40%) will be naturally reabsorbed.',
  },
  {
    question: 'Can I combine BBL with other procedures in Turkey?',
    answer: 'Yes. Popular combinations include BBL + tummy tuck ("mummy makeover"), BBL + breast augmentation, or BBL + arm lift. Combined procedures extend recovery but mean one trip. Discuss safety limits with your surgeon.',
  },
  {
    question: 'What is the recovery like after BBL in Turkey?',
    answer: 'Days 1–3: Rest at hotel, no sitting on buttocks. Days 4–7: Light walking, use BBL pillow. Week 2: More movement, prepare for travel home. You\'ll need a BBL pillow for the flight and for 3–4 weeks after returning to the UK.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'BBL in Turkey — Brazilian Butt Lift Prices & Clinics',
  description: 'Compare BBL prices in Turkey from JCI-accredited clinics in Istanbul and Antalya.',
  url: `${SITE_URL}/procedures/bbl/turkey`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Brazilian Butt Lift',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2026-02-03',
}

interface BBLTurkeyPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BBLTurkeyPage({ params }: BBLTurkeyPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'BBL', url: '/procedures/bbl' },
    { name: 'Turkey' },
  ])

  const faqSchema = generateFAQSchema(BBL_TURKEY_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalWebPageSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'BBL', url: '/procedures/bbl' },
            { name: 'Turkey' },
          ]}
        />
      </div>
      <BBLTurkeyClient faqs={BBL_TURKEY_FAQS} />
    </div>
  )
}
