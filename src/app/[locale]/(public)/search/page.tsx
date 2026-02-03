import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { searchClinics, getCategories, getDestinations, type SearchFilters } from '@/lib/data/clinics'
import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { SearchPageClient } from './search-page-client'

interface SearchPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const metadata: Metadata = {
  title: 'Search Clinics & Procedures',
  description: 'Find the perfect clinic for your medical journey. Filter by procedure, destination, price, and ratings.',
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { locale } = await params
  const search = await searchParams
  setRequestLocale(locale)

  // Parse search params into filters
  const filters: SearchFilters = {
    query: typeof search.q === 'string' ? search.q : undefined,
    country: typeof search.country === 'string' ? search.country : undefined,
    category: typeof search.category === 'string' ? search.category : undefined,
    procedure: typeof search.procedure === 'string' ? search.procedure : undefined,
    minRating: typeof search.rating === 'string' ? parseFloat(search.rating) : undefined,
    minPrice: typeof search.minPrice === 'string' ? parseFloat(search.minPrice) : undefined,
    maxPrice: typeof search.maxPrice === 'string' ? parseFloat(search.maxPrice) : undefined,
    accreditations: typeof search.accreditations === 'string'
      ? search.accreditations.split(',')
      : Array.isArray(search.accreditations)
        ? search.accreditations
        : undefined,
    languages: typeof search.languages === 'string'
      ? search.languages.split(',')
      : Array.isArray(search.languages)
        ? search.languages
        : undefined,
    sortBy: ['relevance', 'rating', 'price_asc', 'price_desc'].includes(search.sort as string)
      ? (search.sort as SearchFilters['sortBy'])
      : 'relevance',
    page: typeof search.page === 'string' ? parseInt(search.page, 10) : 1,
    limit: 12,
  }

  // Fetch data in parallel
  const [searchResult, categories, destinations] = await Promise.all([
    searchClinics(filters),
    getCategories(),
    getDestinations(),
  ])

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb />
      </div>

      <SearchPageClient
        initialClinics={searchResult.clinics}
        totalResults={searchResult.total}
        currentPage={searchResult.page}
        totalPages={searchResult.totalPages}
        initialFilters={filters}
        categories={categories}
        destinations={destinations}
      />
    </div>
  )
}
