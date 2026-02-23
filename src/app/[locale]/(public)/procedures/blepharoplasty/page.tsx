import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { BlepharoplastyClient } from './blepharoplasty-client'
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
  title: 'Blepharoplasty Abroad — Eyelid Surgery Prices & Clinics | MeetYourClinic',
  description:
    'Compare blepharoplasty prices abroad from £1,200. Eyelid surgery in Turkey, Poland, Spain & Hungary. Save 50-70% vs UK prices with experienced surgeons.',
  alternates: {
    canonical: `/procedures/blepharoplasty`,
    languages: { 'en-GB': `/procedures/blepharoplasty` },
  },
  openGraph: {
    title: 'Blepharoplasty Abroad — Eyelid Surgery Prices & Clinics',
    description: 'Compare eyelid surgery prices abroad from £1,200. Save 50-70% vs UK.',
    url: `${SITE_URL}/procedures/blepharoplasty`,
    siteName: 'MeetYourClinic',
    type: 'website',
    locale: 'en_GB',
  },
}

const BLEPHAROPLASTY_FAQS = [
  {
    question: 'How much does blepharoplasty cost abroad?',
    answer: 'Blepharoplasty abroad costs £1,200–£3,500 depending on destination and whether upper, lower, or both eyelids. Turkey offers £1,200–£2,500, Poland £1,800–£2,800, Hungary £2,000–£3,000, Spain £2,500–£3,500. UK prices are £3,000–£7,000.',
  },
  {
    question: 'Is eyelid surgery abroad safe?',
    answer: 'Yes, when choosing qualified surgeons. Look for board-certified plastic surgeons or oculoplastic surgeons (ophthalmologists specialising in eyelid surgery). Eyelid surgery is technically precise — verify surgeon experience and see before/after photos.',
  },
  {
    question: 'What types of blepharoplasty are available?',
    answer: 'Upper blepharoplasty (removes excess skin causing hooding), lower blepharoplasty (addresses bags and wrinkles), and combined upper and lower (comprehensive rejuvenation). Some patients also benefit from brow lift or fat repositioning.',
  },
  {
    question: 'How long should I stay abroad after blepharoplasty?',
    answer: 'Plan for 5–7 days abroad. Stitches are typically removed at day 5–7. Bruising and swelling peak at days 2–3 but settle quickly. You can fly home after stitch removal with sunglasses to cover residual bruising.',
  },
  {
    question: 'What is the recovery time for blepharoplasty?',
    answer: 'Faster than many procedures. Days 1–3: swelling and bruising peak. Day 5–7: stitches removed. Week 2: most bruising resolved, socially presentable. Week 4: back to normal activities. Final results: 3–6 months.',
  },
  {
    question: 'Which country is best for blepharoplasty?',
    answer: 'Turkey offers best value with high-volume surgeons. Poland provides EU standards at mid-range prices. Spain offers premium quality. Choose based on budget and whether you prefer value or premium positioning.',
  },
  {
    question: 'Am I a good candidate for blepharoplasty?',
    answer: 'Good candidates have excess upper eyelid skin (hooding), under-eye bags, puffy eyelids, or droopy lower lids. Age typically 35+, though some younger patients benefit. Non-smokers heal better. Eye health must be good.',
  },
  {
    question: 'Will blepharoplasty scars be visible?',
    answer: 'Scars are well-hidden. Upper eyelid incisions are placed in the natural crease — invisible when eyes are open. Lower eyelid incisions are just below the lash line or inside the eyelid (transconjunctival). Scars fade to nearly invisible.',
  },
]

const medicalProcedureSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  name: 'Blepharoplasty',
  alternateName: ['Eyelid Surgery', 'Eyelid Lift', 'Eye Lift'],
  description: 'Surgical procedure to improve the appearance of the eyelids by removing excess skin, muscle, and fat.',
  procedureType: 'https://schema.org/SurgicalProcedure',
  bodyLocation: 'Eyelids',
  preparation: 'Eye examination, stop blood thinners, arrange transport home',
  followup: 'Cold compresses, eye drops, avoid straining, protect from sun',
  howPerformed: 'Incisions in natural eyelid crease (upper) or below lash line (lower), excess tissue removed, incisions closed with fine sutures',
  status: 'https://schema.org/EventScheduled',
}

interface BlepharoplastyPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function BlepharoplastyPage({ params }: BlepharoplastyPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
    { name: 'Blepharoplasty' },
  ])

  const faqSchema = generateFAQSchema(BLEPHAROPLASTY_FAQS)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={[generateOrganizationSchema(), generateWebsiteSchema(), breadcrumbSchema, faqSchema, medicalProcedureSchema]}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Cosmetic Surgery', url: '/cosmetic-surgery' },
            { name: 'Blepharoplasty' },
          ]}
        />
      </div>
      <BlepharoplastyClient faqs={BLEPHAROPLASTY_FAQS} />
    </div>
  )
}
