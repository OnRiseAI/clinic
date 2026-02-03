import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import {
  getCategoryBySlug,
  getProceduresByCategory,
  getClinicsByCategory,
  getTopDestinationsForCategory,
  getProcedureCostComparison,
} from '@/lib/data/content'
import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { CategoryPageClient } from './category-page-client'

interface CategoryPageProps {
  params: Promise<{ locale: string; category: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  const category = await getCategoryBySlug(categorySlug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: category.meta_title || `${category.name} Treatments Abroad - Prices & Clinics`,
    description: category.meta_description || `Compare ${category.name.toLowerCase()} treatment prices at top clinics worldwide. Find accredited clinics, read patient reviews, and save up to 70%.`,
  }
}

export const revalidate = 3600 // Revalidate every hour

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, category: categorySlug } = await params
  setRequestLocale(locale)

  const category = await getCategoryBySlug(categorySlug)

  if (!category) {
    notFound()
  }

  // Fetch all data in parallel
  const [procedures, clinics, destinations] = await Promise.all([
    getProceduresByCategory(category.id),
    getClinicsByCategory(categorySlug, 8),
    getTopDestinationsForCategory(categorySlug, 6),
  ])

  // Get cost comparison for the most popular procedure
  const topProcedure = procedures[0]
  const costComparison = topProcedure
    ? await getProcedureCostComparison(topProcedure.slug)
    : []

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb />
      </div>

      <CategoryPageClient
        category={category}
        procedures={procedures}
        clinics={clinics}
        destinations={destinations}
        costComparison={costComparison}
        topProcedure={topProcedure || null}
      />
    </div>
  )
}
