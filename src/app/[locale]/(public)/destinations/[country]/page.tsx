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
      title: `Medical Tourism in ${countryName} - Top Clinics & Procedures`,
      description: `Discover why ${countryName} is a top medical tourism destination. Find accredited clinics, compare prices, and read patient reviews.`,
    }
  }

  return {
    title: destination.meta_title || `Medical Tourism in ${destination.country_name} - Top Clinics & Procedures`,
    description: destination.meta_description || `Discover why ${destination.country_name} is a top medical tourism destination. Find accredited clinics, compare prices, and read patient reviews.`,
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

  return (
    <div className="min-h-screen bg-neutral-50">
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
