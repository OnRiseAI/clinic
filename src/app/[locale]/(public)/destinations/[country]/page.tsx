import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import {
  getDestinationBySlug,
  getClinicsByCountry,
  getProceduresInCountry,
  getDestinationCostComparison,
} from '@/lib/data/content'
import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { DestinationPageClient } from './destination-page-client'
import { StructuredData } from '@/components/seo/structured-data-component'
import {
  generateDestinationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/lib/seo/structured-data'

interface DestinationPageProps {
  params: Promise<{ locale: string; country: string }>
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { country: countrySlug } = await params
  const destination = await getDestinationBySlug(countrySlug)

  if (!destination) {
    // Fallback for destinations not yet in database
    const countryName = countrySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    return {
      title: `Medical Tourism in ${countryName} | Accredited Clinics & Specialists`,
      description: `Find accredited clinics in ${countryName}. Compare specialists, read patient reviews, and verify credentials for dental, cosmetic and medical treatments.`,
    }
  }

  return {
    title: destination.meta_title || `Medical Tourism in ${destination.country_name} | Accredited Clinics & Specialists`,
    description: destination.meta_description || `Find accredited clinics in ${destination.country_name}. Compare specialists, read patient reviews, and verify credentials for dental, cosmetic and medical treatments.`,
  }
}

export const revalidate = 3600

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { locale, country: countrySlug } = await params
  setRequestLocale(locale)

  const destination = await getDestinationBySlug(countrySlug)

  if (!destination) {
    notFound()
  }

  // Fetch all data in parallel
  const [clinics, procedures, costComparison] = await Promise.all([
    getClinicsByCountry(destination.country_name, 8),
    getProceduresInCountry(destination.country_name, 12),
    getDestinationCostComparison(destination.country_name),
  ])

  // Calculate stats
  const categoryCount = new Set(procedures.map((p) => p.category_id).filter(Boolean)).size

  // Generate structured data
  const destinationSchema = generateDestinationSchema({
    name: destination.country_name,
    slug: destination.slug,
    countryCode: destination.country_code || '',
    description: destination.description,
    clinicCount: clinics.length,
    topSpecialties: procedures.slice(0, 5).map((p) => p.name),
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Destinations', url: '/destinations' },
    { name: destination.country_name },
  ])

  // Generate FAQ schema from destination FAQs
  const destinationFAQs = [
    {
      question: `Is medical treatment in ${destination.country_name} safe?`,
      answer: `Yes, ${destination.country_name} has many internationally accredited hospitals and clinics that meet or exceed Western standards. Look for JCI or ISO certifications, verify doctor qualifications, and read patient reviews.`,
    },
    {
      question: `How much can I save on medical treatment in ${destination.country_name}?`,
      answer: `Patients typically save 40-70% on medical procedures in ${destination.country_name} compared to UK or US prices. The exact savings depend on the procedure type and clinic.`,
    },
    {
      question: `Do doctors in ${destination.country_name} speak English?`,
      answer: `Yes, doctors at international clinics and hospitals in ${destination.country_name} typically speak excellent English. Many have trained abroad and are experienced in treating international patients.`,
    },
    {
      question: `How do I choose a clinic in ${destination.country_name}?`,
      answer: `Research thoroughly: check international accreditations (JCI, ISO), verify doctor qualifications and experience, read patient reviews, and have a video consultation before traveling.`,
    },
  ]
  const faqSchema = generateFAQSchema(destinationFAQs)

  return (
    <div className="min-h-screen bg-neutral-50">
      <StructuredData data={[destinationSchema, breadcrumbSchema, faqSchema]} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb />
      </div>

      <DestinationPageClient
        destination={destination}
        clinics={clinics}
        procedures={procedures}
        costComparison={costComparison}
        stats={{
          clinicCount: clinics.length,
          procedureCount: procedures.length,
          categoryCount,
        }}
      />
    </div>
  )
}
