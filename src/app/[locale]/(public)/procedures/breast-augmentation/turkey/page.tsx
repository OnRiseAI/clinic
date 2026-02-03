import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BreastAugmentationTurkeyClient } from './breast-augmentation-turkey-client'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from '@/lib/seo/structured-data'
import { StructuredData } from '@/components/seo/structured-data-component'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://medit.com'

export const metadata: Metadata = {
  title: 'Breast Augmentation in Turkey — From £2,500 All-Inclusive | medit',
  description:
    'Compare breast augmentation prices in Turkey from £2,500. Premium implants (Mentor, Allergan, Motiva), JCI hospitals, all-inclusive packages. Save 60-70% vs UK.',
  alternates: {
    canonical: `${SITE_URL}/en/procedures/breast-augmentation/turkey`,
    languages: { 'en-GB': `${SITE_URL}/en/procedures/breast-augmentation/turkey` },
  },
  openGraph: {
    title: 'Breast Augmentation in Turkey — From £2,500 All-Inclusive',
    description: 'Compare breast augmentation in Turkey from £2,500. Premium implants, JCI hospitals.',
    url: `${SITE_URL}/procedures/breast-augmentation/turkey`,
    siteName: 'medit',
    type: 'website',
    locale: 'en_GB',
  },
}

const BREAST_AUG_TURKEY_FAQS = [
  {
    question: 'How much does breast augmentation cost in Turkey?',
    answer: 'Breast augmentation in Turkey costs £2,500–£4,000 all-inclusive. This typically includes surgery, premium implants (Mentor/Allergan/Motiva), hospital stay, 5-7 nights hotel, and transfers. UK prices are £6,000–£10,000 for surgery alone.',
  },
  {
    question: 'Are Turkish breast augmentation surgeons qualified?',
    answer: 'Yes. Top Turkish surgeons are board-certified, members of ISAPS (International Society of Aesthetic Plastic Surgery), and perform 200+ breast augmentations annually. High volume means extensive experience. Verify credentials before booking.',
  },
  {
    question: 'What implant brands are used in Turkey?',
    answer: 'Turkish clinics use the same premium brands as UK: Mentor (Johnson & Johnson), Allergan Natrelle, Motiva Ergonomix, and Sebbin. All are FDA/CE approved with 10-year or lifetime warranties. Avoid clinics offering unknown brands.',
  },
  {
    question: 'Is breast augmentation in Turkey safe?',
    answer: 'Yes, when choosing accredited facilities. Look for JCI-accredited hospitals (international gold standard), board-certified surgeons, and established clinics with verified reviews. Turkey performs 100,000+ breast surgeries annually with excellent outcomes.',
  },
  {
    question: 'How long should I stay in Turkey for breast augmentation?',
    answer: 'Plan for 7–10 days. Day 1: surgery with overnight hospital stay. Days 2–5: rest and recovery at hotel. Days 6–7: follow-up and fit-to-fly clearance. Flying home is comfortable as you can sit normally.',
  },
  {
    question: 'What is included in Turkish breast augmentation packages?',
    answer: 'All-inclusive packages typically include: surgery, anaesthesia, premium implants with warranty, 1-night hospital stay, pre-op tests, compression bra, 5-7 nights hotel, airport transfers, patient coordinator, and follow-up appointments.',
  },
  {
    question: 'Can I choose my implant size in Turkey?',
    answer: 'Yes. During consultation (often via video call), surgeons use 3D imaging to help you visualise results. You can choose size (cc), shape (round/teardrop), profile (low/moderate/high), and placement. Final sizing confirmed in person.',
  },
  {
    question: 'Which city is best for breast augmentation in Turkey?',
    answer: 'Istanbul has the largest selection of clinics and surgeons — 50+ options with JCI-accredited hospitals. Antalya offers resort-style recovery. Both have experienced surgeons; Istanbul has more choice.',
  },
]

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Breast Augmentation in Turkey — Premium Implants, Experienced Surgeons',
  description: 'Compare breast augmentation prices in Turkey. Premium implants from Mentor, Allergan, Motiva.',
  url: `${SITE_URL}/procedures/breast-augmentation/turkey`,
  inLanguage: 'en-GB',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Breast Augmentation',
    procedureType: 'https://schema.org/SurgicalProcedure',
  },
  lastReviewed: '2025-02-03',
}

interface BreastAugmentationTurkeyPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BreastAugmentationTurkeyPage({ params }: BreastAugmentationTurkeyPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Breast Augmentation', url: '/procedures/breast-augmentation' },
    { name: 'Turkey' },
  ])

  const faqSchema = generateFAQSchema(BREAST_AUG_TURKEY_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalWebPageSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Breast Augmentation', url: '/procedures/breast-augmentation' },
            { name: 'Turkey' },
          ]}
        />
      </div>
      <BreastAugmentationTurkeyClient faqs={BREAST_AUG_TURKEY_FAQS} />
    </div>
  )
}
