import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import {
  getDestinationBySlug,
  getProcedureBySlug,
  getClinicsByCountryAndProcedure,
  getDestinationProcedureStats,
} from '@/lib/data/content'
import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { DestinationProcedurePageClient } from './destination-procedure-page-client'

interface DestinationProcedurePageProps {
  params: Promise<{ locale: string; country: string; procedure: string }>
}

export async function generateMetadata({ params }: DestinationProcedurePageProps): Promise<Metadata> {
  const { country: countrySlug, procedure: procedureSlug } = await params

  const [destination, procedure] = await Promise.all([
    getDestinationBySlug(countrySlug),
    getProcedureBySlug(procedureSlug),
  ])

  if (!destination || !procedure) {
    // Fallback for missing data
    const countryName = countrySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    const procedureName = procedureSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    return {
      title: `${procedureName} in ${countryName} - Prices, Clinics & Reviews`,
      description: `Get ${procedureName.toLowerCase()} in ${countryName}. Compare prices from top clinics, read patient reviews, and save up to 70%.`,
    }
  }

  return {
    title: `${procedure.name} in ${destination.country_name} - Prices, Clinics & Reviews`,
    description: `Get ${procedure.name.toLowerCase()} in ${destination.country_name}. Compare prices from ${destination.country_name}'s top clinics, read patient reviews, and save up to 70% on your treatment.`,
  }
}

export const revalidate = 3600

export default async function DestinationProcedurePage({ params }: DestinationProcedurePageProps) {
  const { locale, country: countrySlug, procedure: procedureSlug } = await params
  setRequestLocale(locale)

  const [destination, procedure] = await Promise.all([
    getDestinationBySlug(countrySlug),
    getProcedureBySlug(procedureSlug),
  ])

  if (!destination || !procedure) {
    notFound()
  }

  // Fetch remaining data
  const [clinics, rawStats] = await Promise.all([
    getClinicsByCountryAndProcedure(destination.country_name, procedureSlug, 20),
    getDestinationProcedureStats(destination.country_name, procedureSlug),
  ])

  // Transform stats to match client component interface
  const stats = {
    clinicCount: rawStats.clinic_count,
    avgPrice: rawStats.avg_cost || null,
    minPrice: rawStats.min_cost || null,
    maxPrice: rawStats.max_cost || null,
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb />
      </div>

      <DestinationProcedurePageClient
        destination={destination}
        procedure={procedure}
        clinics={clinics}
        stats={stats}
      />
    </div>
  )
}
