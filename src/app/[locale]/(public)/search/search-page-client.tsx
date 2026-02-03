'use client'

import { useState, useCallback, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { m, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ClinicCard } from '@/components/clinics/clinic-card'
import { cn } from '@/lib/utils'
import type { ClinicCardData, SearchFilters } from '@/lib/data/clinics'

interface Category {
  id: string
  name: string
  slug: string
  icon: string | null
}

interface Destination {
  id: string
  country_name: string
  country_code: string
  slug: string
}

interface SearchPageClientProps {
  initialClinics: ClinicCardData[]
  totalResults: number
  currentPage: number
  totalPages: number
  initialFilters: SearchFilters
  categories: Category[]
  destinations: Destination[]
}

const ACCREDITATIONS = [
  { value: 'JCI', label: 'JCI Accredited' },
  { value: 'ISO', label: 'ISO Certified' },
  { value: 'TEMOS', label: 'TEMOS Certified' },
  { value: 'NABH', label: 'NABH Accredited' },
]

const LANGUAGES = [
  'English',
  'Spanish',
  'German',
  'French',
  'Arabic',
  'Russian',
  'Chinese',
  'Portuguese',
]

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Recommended' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
]

export function SearchPageClient({
  initialClinics,
  totalResults,
  currentPage,
  totalPages,
  initialFilters,
  categories,
  destinations,
}: SearchPageClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Local filter state
  const [filters, setFilters] = useState<SearchFilters>(initialFilters)

  // Build URL from filters
  const buildUrl = useCallback((newFilters: SearchFilters) => {
    const params = new URLSearchParams()

    if (newFilters.query) params.set('q', newFilters.query)
    if (newFilters.country) params.set('country', newFilters.country)
    if (newFilters.category) params.set('category', newFilters.category)
    if (newFilters.procedure) params.set('procedure', newFilters.procedure)
    if (newFilters.minRating) params.set('rating', newFilters.minRating.toString())
    if (newFilters.minPrice) params.set('minPrice', newFilters.minPrice.toString())
    if (newFilters.maxPrice) params.set('maxPrice', newFilters.maxPrice.toString())
    if (newFilters.accreditations?.length) {
      params.set('accreditations', newFilters.accreditations.join(','))
    }
    if (newFilters.languages?.length) {
      params.set('languages', newFilters.languages.join(','))
    }
    if (newFilters.sortBy && newFilters.sortBy !== 'relevance') {
      params.set('sort', newFilters.sortBy)
    }
    if (newFilters.page && newFilters.page > 1) {
      params.set('page', newFilters.page.toString())
    }

    const queryString = params.toString()
    return queryString ? `/search?${queryString}` : '/search'
  }, [])

  // Apply filters
  const applyFilters = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters)
    startTransition(() => {
      router.push(buildUrl({ ...newFilters, page: 1 }))
    })
    setMobileFiltersOpen(false)
  }, [router, buildUrl])

  // Update single filter
  const updateFilter = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
  }

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters: SearchFilters = { sortBy: 'relevance', page: 1, limit: 12 }
    applyFilters(clearedFilters)
  }

  // Toggle accreditation
  const toggleAccreditation = (acc: string) => {
    const current = filters.accreditations || []
    const newAccreditations = current.includes(acc)
      ? current.filter((a) => a !== acc)
      : [...current, acc]
    updateFilter('accreditations', newAccreditations.length > 0 ? newAccreditations : undefined)
  }

  // Toggle language
  const toggleLanguage = (lang: string) => {
    const current = filters.languages || []
    const newLanguages = current.includes(lang)
      ? current.filter((l) => l !== lang)
      : [...current, lang]
    updateFilter('languages', newLanguages.length > 0 ? newLanguages : undefined)
  }

  // Pagination
  const goToPage = (page: number) => {
    startTransition(() => {
      router.push(buildUrl({ ...filters, page }))
    })
  }

  // Count active filters
  const activeFilterCount = [
    filters.country,
    filters.category,
    filters.minRating,
    filters.minPrice || filters.maxPrice,
    filters.accreditations?.length,
    filters.languages?.length,
  ].filter(Boolean).length

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Search Query */}
      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Search
        </label>
        <input
          type="text"
          value={filters.query || ''}
          onChange={(e) => updateFilter('query', e.target.value || undefined)}
          placeholder="Clinic name or keyword..."
          className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Category
        </label>
        <select
          value={filters.category || ''}
          onChange={(e) => updateFilter('category', e.target.value || undefined)}
          className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Destination */}
      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Destination
        </label>
        <select
          value={filters.country || ''}
          onChange={(e) => updateFilter('country', e.target.value || undefined)}
          className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value="">All Countries</option>
          {destinations.map((dest) => (
            <option key={dest.id} value={dest.country_name}>
              {dest.country_name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Price Range
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={filters.minPrice || ''}
            onChange={(e) => updateFilter('minPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
            placeholder="Min"
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          <input
            type="number"
            value={filters.maxPrice || ''}
            onChange={(e) => updateFilter('maxPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
            placeholder="Max"
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Minimum Rating
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => updateFilter('minRating', filters.minRating === star ? undefined : star)}
              className={cn(
                'text-2xl transition-colors',
                (filters.minRating || 0) >= star ? 'text-yellow-500' : 'text-neutral-300 hover:text-yellow-400'
              )}
            >
              ★
            </button>
          ))}
        </div>
        {filters.minRating && (
          <p className="mt-1 text-xs text-neutral-500">
            {filters.minRating}+ stars
          </p>
        )}
      </div>

      {/* Accreditations */}
      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Accreditations
        </label>
        <div className="space-y-2">
          {ACCREDITATIONS.map((acc) => (
            <label key={acc.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.accreditations?.includes(acc.value) || false}
                onChange={() => toggleAccreditation(acc.value)}
                className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">{acc.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Languages Spoken
        </label>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => toggleLanguage(lang)}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                filters.languages?.includes(lang)
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              )}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-neutral-200">
        <Button
          variant="primary"
          onClick={() => applyFilters(filters)}
          disabled={isPending}
          className="flex-1"
        >
          {isPending ? 'Searching...' : 'Apply Filters'}
        </Button>
        <Button variant="ghost" onClick={clearFilters} disabled={isPending}>
          Clear
        </Button>
      </div>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Find Your Perfect Clinic</h1>
        {filters.query && (
          <p className="mt-2 text-neutral-600">
            Showing results for &quot;{filters.query}&quot;
          </p>
        )}
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden w-72 flex-shrink-0 lg:block">
          <div className="sticky top-24 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-neutral-900">Filters</h2>
            <FilterSidebar />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sort Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="text-sm text-neutral-600">
                Showing <span className="font-semibold">{totalResults}</span> clinics
              </p>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 lg:hidden"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
                {activeFilterCount > 0 && (
                  <span className="rounded-full bg-primary-500 px-2 py-0.5 text-xs text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            <select
              value={filters.sortBy || 'relevance'}
              onChange={(e) => {
                const newFilters = { ...filters, sortBy: e.target.value as SearchFilters['sortBy'] }
                applyFilters(newFilters)
              }}
              className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  Sort by: {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Results */}
          {initialClinics.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {initialClinics.map((clinic, index) => (
                    <m.div
                      key={clinic.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ClinicCard clinic={clinic} />
                    </m.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1 || isPending}
                  >
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let page: number
                      if (totalPages <= 5) {
                        page = i + 1
                      } else if (currentPage <= 3) {
                        page = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        page = totalPages - 4 + i
                      } else {
                        page = currentPage - 2 + i
                      }

                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          disabled={isPending}
                          className={cn(
                            'h-10 w-10 rounded-lg text-sm font-medium transition-colors',
                            page === currentPage
                              ? 'bg-primary-500 text-white'
                              : 'bg-white text-neutral-700 hover:bg-neutral-100'
                          )}
                        >
                          {page}
                        </button>
                      )
                    })}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages || isPending}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-8 py-16 text-center"
            >
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-neutral-100 p-4 text-3xl">
                🔍
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">No clinics found</h3>
              <p className="mt-2 text-neutral-500">
                Try adjusting your filters or search terms to find more results.
              </p>
              <Button variant="primary" onClick={clearFilters} className="mt-6">
                Clear All Filters
              </Button>
            </m.div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <m.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white p-6 shadow-xl lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-neutral-900">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="h-[calc(100vh-120px)] overflow-y-auto">
                <FilterSidebar />
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      {isPending && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-white/50">
          <div className="rounded-lg bg-white p-4 shadow-lg">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
          </div>
        </div>
      )}
    </div>
  )
}
