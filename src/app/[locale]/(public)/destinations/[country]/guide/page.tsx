import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { createStaticClient } from '@/lib/supabase/static'
import { getCountryGuideData } from '@/lib/data/content'
import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { StructuredData } from '@/components/seo/structured-data-component'
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo/structured-data'
import { CountryGuideClient } from './country-guide-client'

interface CountryGuidePageProps {
  params: Promise<{ locale: string; country: string }>
}

export async function generateStaticParams() {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from('countries')
    .select('slug')
    .eq('status', 'published')
  return (data || []).map((c) => ({ country: c.slug }))
}

export async function generateMetadata({ params }: CountryGuidePageProps): Promise<Metadata> {
  const { country: countrySlug } = await params
  const data = await getCountryGuideData(countrySlug)

  if (!data) {
    const countryName = countrySlug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
    return {
      title: `Medical Tourism in ${countryName}: Complete Guide 2026 | MeetYourClinic`,
      description: `Everything you need to know about medical tourism in ${countryName}. Costs, procedures, travel tips, and accredited clinics.`,
    }
  }

  const { country } = data
  return {
    title: `Medical Tourism in ${country.name}: Complete Guide 2026 | MeetYourClinic`,
    description:
      country.meta_description ||
      `Complete guide to medical tourism in ${country.name}. Compare ${data.stats.procedure_count} procedures, save up to ${data.stats.avg_savings}% vs UK prices, and find JCI-accredited clinics.`,
  }
}

export const revalidate = 3600

export default async function CountryGuidePage({ params }: CountryGuidePageProps) {
  const { locale, country: countrySlug } = await params
  setRequestLocale(locale)

  const data = await getCountryGuideData(countrySlug)

  if (!data) {
    notFound()
  }

  const { country } = data

  // Generate FAQ items for structured data
  const faqItems = [
    {
      question: `Is medical treatment in ${country.name} safe?`,
      answer: `Yes, ${country.name} is a well-established medical tourism destination with internationally accredited hospitals and clinics. Look for JCI or ISO certifications when choosing a facility, verify doctor qualifications, and read patient reviews.`,
    },
    {
      question: `How much can I save on treatment in ${country.name}?`,
      answer: `Patients typically save ${data.stats.avg_savings}% on medical procedures in ${country.name} compared to UK private prices. Savings vary by procedure, with some treatments costing up to 70% less than in the UK.`,
    },
    {
      question: `Do I need a visa to travel to ${country.name} for medical treatment?`,
      answer: country.visa_required_uk
        ? `UK citizens may need a visa to travel to ${country.name}. Check the latest entry requirements before booking your treatment, as visa rules can change. Your clinic may be able to provide a medical invitation letter.`
        : `UK citizens do not typically need a visa for short medical tourism stays in ${country.name}. However, always check the latest entry requirements before travelling, as rules can change.`,
    },
    {
      question: `What procedures are most popular in ${country.name}?`,
      answer: `${country.name} offers ${data.stats.procedure_count} medical procedures across ${data.stats.category_count} categories. ${country.specialties && country.specialties.length > 0 ? `The country is particularly known for ${country.specialties.slice(0, 3).join(', ')}.` : 'Popular treatments include dental, cosmetic surgery, and fertility procedures.'}`,
    },
    {
      question: `How long should I stay in ${country.name} for medical treatment?`,
      answer: `The length of stay depends on your procedure. Simple treatments like dental work may require 3-5 days, while cosmetic surgery typically needs 7-14 days for recovery before flying home. Your clinic will provide specific guidance based on your treatment plan.`,
    },
    {
      question: `Do doctors in ${country.name} speak English?`,
      answer: `Yes, doctors at international clinics and hospitals in ${country.name} typically speak excellent English. Many have trained abroad and are experienced in treating international patients. Clinics often also provide translator services.`,
    },
  ]

  const faqSchema = generateFAQSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Destinations', url: '/destinations' },
    { name: country.name, url: `/destinations/${country.slug}` },
    { name: 'Guide' },
  ])

  return (
    <div className="min-h-screen bg-neutral-50">
      <StructuredData data={[faqSchema, breadcrumbSchema]} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb />
      </div>

      <CountryGuideClient data={data} faqItems={faqItems} />
    </div>
  )
}
