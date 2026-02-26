import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import {
  getCategoryBySlug,
  getProcedureBySlug,
  getClinicsByProcedure,
  getTopDestinationsForProcedure,
  getProcedureCostComparison,
  getRelatedProcedures,
} from '@/lib/data/content'
import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { ProcedurePageClient } from './procedure-page-client'
import { generateProcedureMetadata } from '@/lib/seo/metadata'
import {
  generateProcedureSchema,
  generateBreadcrumbSchema,
  generateSpeakableSchema,
} from '@/lib/seo/structured-data'
import { StructuredData } from '@/components/seo/structured-data-component'

interface ProcedurePageProps {
  params: Promise<{ locale: string; category: string; procedure: string }>
}

export async function generateMetadata({ params }: ProcedurePageProps): Promise<Metadata> {
  const { procedure: procedureSlug } = await params
  const [procedure, clinics] = await Promise.all([
    getProcedureBySlug(procedureSlug),
    getClinicsByProcedure(procedureSlug, 1),
  ])

  if (!procedure) {
    return { title: 'Procedure Not Found' }
  }

  const prices = clinics.map((c) => c.starting_price).filter((p): p is number => p !== null)

  return generateProcedureMetadata({
    name: procedure.name,
    slug: procedure.slug,
    categorySlug: categorySlug,
    description: procedure.description,
    category: procedure.category?.name || null,
    minPrice: prices.length > 0 ? Math.min(...prices) : null,
    maxPrice: prices.length > 0 ? Math.max(...prices) : null,
    clinicCount: clinics.length,
  })
}

export const revalidate = 3600

export default async function ProcedurePage({ params }: ProcedurePageProps) {
  const { locale, category: categorySlug, procedure: procedureSlug } = await params
  setRequestLocale(locale)

  // Fetch category and procedure
  const [category, procedure] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getProcedureBySlug(procedureSlug),
  ])

  if (!category || !procedure) {
    notFound()
  }

  // Verify the procedure belongs to this category
  if (procedure.category_id !== category.id && procedure.category?.slug !== categorySlug) {
    notFound()
  }

  // Fetch remaining data in parallel
  const [clinics, destinations, costComparison, relatedProcedures] = await Promise.all([
    getClinicsByProcedure(procedureSlug, 8),
    getTopDestinationsForProcedure(procedureSlug, 6),
    getProcedureCostComparison(procedureSlug),
    getRelatedProcedures(procedure.id, procedure.category_id, 6),
  ])

  // Calculate stats
  const countryCount = new Set(clinics.map((c) => c.country).filter(Boolean)).size
  const prices = clinics.map((c) => c.starting_price).filter((p): p is number => p !== null)
  const avgPrice = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : null
  const minPrice = prices.length > 0 ? Math.min(...prices) : null
  const maxPrice = prices.length > 0 ? Math.max(...prices) : null

  // Generate structured data
  const procedureSchema = generateProcedureSchema({
    name: procedure.name,
    slug: procedure.slug,
    description: procedure.description,
    category: category.name,
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Procedures', url: '/procedures' },
    { name: category.name, url: `/${category.slug}` },
    { name: procedure.name },
  ])

  const speakableSchema = generateSpeakableSchema(`/${categorySlug}/${procedureSlug}`, [
    '.procedure-summary',
    'h1',
  ])

  return (
    <div className="min-h-screen bg-neutral-50">
      <StructuredData data={[procedureSchema, breadcrumbSchema, speakableSchema]} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb />
      </div>

      <ProcedurePageClient
        category={category}
        procedure={procedure}
        clinics={clinics}
        destinations={destinations}
        costComparison={costComparison}
        relatedProcedures={relatedProcedures}
        stats={{
          clinicCount: clinics.length,
          countryCount,
          avgPrice,
          minPrice,
          maxPrice,
        }}
      />
    </div>
  )
}
