'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { ClinicCard } from '@/components/clinics/clinic-card'
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import { Heart, Search, SlidersHorizontal } from 'lucide-react'

interface SavedClinic {
  id: string
  clinic_id: string
  saved_at: string
  clinic: {
    id: string
    name: string
    slug: string
    city: string | null
    country: string | null
    first_photo: string | null
    google_rating: number | null
    google_review_count: number | null
    accreditations: string[]
    featured: boolean
    claimed: boolean
    starting_price: number | null
    price_currency: string
    categories: Array<{ name: string; slug: string }>
  }
}

interface SavedClinicsClientProps {
  initialClinics: SavedClinic[]
}

export function SavedClinicsClient({ initialClinics }: SavedClinicsClientProps) {
  const router = useRouter()
  const [clinics, setClinics] = useState<SavedClinic[]>(initialClinics)
  const [sortBy, setSortBy] = useState<'date_saved' | 'rating'>('date_saved')
  const [removingId, setRemovingId] = useState<string | null>(null)

  const handleRemove = async (clinicId: string) => {
    setRemovingId(clinicId)

    try {
      const res = await fetch(`/api/saved-clinics/${clinicId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        // Animate removal
        setTimeout(() => {
          setClinics((prev) => prev.filter((c) => c.clinic_id !== clinicId))
          setRemovingId(null)
        }, 300)
      } else {
        setRemovingId(null)
      }
    } catch {
      setRemovingId(null)
    }
  }

  const handleSortChange = (newSort: 'date_saved' | 'rating') => {
    setSortBy(newSort)
    const sorted = [...clinics]
    if (newSort === 'rating') {
      sorted.sort((a, b) => (b.clinic.google_rating || 0) - (a.clinic.google_rating || 0))
    } else {
      sorted.sort((a, b) => new Date(b.saved_at).getTime() - new Date(a.saved_at).getTime())
    }
    setClinics(sorted)
  }

  // Get unique categories and countries for filters
  const uniqueCountries = [...new Set(clinics.map((c) => c.clinic.country).filter(Boolean))]

  return (
    <LazyMotion features={domAnimation}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Saved Clinics</h1>
            <p className="mt-1 text-neutral-600">
              {clinics.length} clinic{clinics.length !== 1 ? 's' : ''} saved for comparison.
            </p>
          </div>
          <Link href="/search">
            <Button variant="primary">
              <Search className="mr-2 h-4 w-4" />
              Find More Clinics
            </Button>
          </Link>
        </div>

        {/* Filters */}
        {clinics.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as 'date_saved' | 'rating')}
              className="rounded-lg border border-neutral-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="date_saved">Recently Saved</option>
              <option value="rating">Highest Rating</option>
            </select>
            {uniqueCountries.length > 1 && (
              <select className="rounded-lg border border-neutral-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                <option value="">All Destinations</option>
                {uniqueCountries.map((country) => (
                  <option key={country} value={country || ''}>
                    {country}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* Clinics Grid */}
        {clinics.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {clinics.map((saved) => (
                <m.div
                  key={saved.id}
                  layout
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                  animate={
                    removingId === saved.clinic_id
                      ? { opacity: 0.5, scale: 0.95 }
                      : { opacity: 1, scale: 1 }
                  }
                  className="relative"
                >
                  <ClinicCard
                    clinic={{
                      id: saved.clinic.id,
                      name: saved.clinic.name,
                      slug: saved.clinic.slug,
                      city: saved.clinic.city,
                      country: saved.clinic.country,
                      first_photo: saved.clinic.first_photo,
                      google_rating: saved.clinic.google_rating,
                      google_review_count: saved.clinic.google_review_count,
                      accreditations: saved.clinic.accreditations,
                      featured: saved.clinic.featured,
                      claimed: saved.clinic.claimed,
                      starting_price: saved.clinic.starting_price,
                      price_currency: saved.clinic.price_currency,
                      categories: saved.clinic.categories,
                    }}
                    isAuthenticated={true}
                    isSaved={true}
                    showSaveButton={true}
                  />
                  {/* Remove Button Overlay */}
                  <button
                    onClick={() => handleRemove(saved.clinic_id)}
                    disabled={removingId === saved.clinic_id}
                    className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-red-600 shadow-md transition-colors hover:bg-red-50"
                  >
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    Remove
                  </button>
                </m.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
            <div className="px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                <Heart className="h-8 w-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">No saved clinics yet</h3>
              <p className="mt-2 max-w-md mx-auto text-neutral-500">
                Save clinics while browsing to compare them later and keep track of your favorites.
              </p>
              <div className="mt-6">
                <Link href="/search">
                  <Button variant="primary">
                    <Search className="mr-2 h-4 w-4" />
                    Browse Clinics
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </LazyMotion>
  )
}
