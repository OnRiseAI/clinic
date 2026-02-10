'use client'

import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ClinicCardData } from '@/lib/data/clinics'
import { m } from 'framer-motion'
import { SaveClinicButton } from './save-clinic-button'

interface ClinicCardProps {
  clinic: ClinicCardData
  className?: string
  showEnquiryButton?: boolean
  isAuthenticated?: boolean
  isSaved?: boolean
  showSaveButton?: boolean
}

const ACCREDITATION_LABELS: Record<string, string> = {
  JCI: 'JCI',
  ISO: 'ISO',
  TEMOS: 'TEMOS',
  NABH: 'NABH',
}

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  const starSize = size === 'sm' ? 'text-sm' : 'text-base'

  return (
    <span className={cn('inline-flex text-yellow-500', starSize)}>
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <span key={`full-${i}`}>★</span>
        ))}
      {hasHalfStar && <span>★</span>}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <span key={`empty-${i}`} className="text-neutral-300">
            ★
          </span>
        ))}
    </span>
  )
}

function formatPrice(price: number, currency: string): string {
  const symbols: Record<string, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
    THB: '฿',
    MXN: '$',
  }
  const symbol = symbols[currency] || currency
  return `${symbol}${price.toLocaleString()}`
}

export function ClinicCard({
  clinic,
  className,
  showEnquiryButton = true,
  isAuthenticated = false,
  isSaved = false,
  showSaveButton = true,
}: ClinicCardProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'group overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md',
        className
      )}
    >
      {/* Image */}
      <Link href={`/clinics/${clinic.categories[0]?.slug || 'dental'}/${clinic.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
          {clinic.first_photo ? (
            <img
              src={clinic.first_photo}
              alt={clinic.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-4xl text-neutral-300">🏥</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {clinic.featured && (
              <span className="rounded-full bg-primary-500 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
                Featured
              </span>
            )}
            {clinic.claimed && (
              <span className="rounded-full bg-green-500 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
                Verified
              </span>
            )}
          </div>

          {/* Save Button */}
          {showSaveButton && (
            <div className="absolute right-3 top-3">
              <SaveClinicButton
                clinicId={clinic.id}
                initialSaved={isSaved}
                isAuthenticated={isAuthenticated}
                size="sm"
              />
            </div>
          )}

          {/* Accreditations */}
          {clinic.accreditations.length > 0 && (
            <div className="absolute bottom-3 left-3 flex gap-1">
              {clinic.accreditations.slice(0, 3).map((acc) => (
                <span
                  key={acc}
                  className="rounded bg-white/90 px-2 py-0.5 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur-sm"
                >
                  {ACCREDITATION_LABELS[acc] || acc}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/clinics/${clinic.categories[0]?.slug || 'dental'}/${clinic.slug}`} className="block">
          <h3 className="font-semibold text-neutral-900 transition-colors group-hover:text-primary-600">
            {clinic.name}
          </h3>

          {/* Location */}
          {(clinic.city || clinic.country) && (
            <p className="mt-1 text-sm text-neutral-500">
              📍 {[clinic.city, clinic.country].filter(Boolean).join(', ')}
            </p>
          )}

          {/* Rating */}
          {clinic.google_rating && (
            <div className="mt-2 flex items-center gap-2">
              <StarRating rating={clinic.google_rating} />
              <span className="text-sm font-medium text-neutral-900">
                {clinic.google_rating.toFixed(1)}
              </span>
              {clinic.google_review_count && (
                <span className="text-sm text-neutral-400">
                  ({clinic.google_review_count} reviews)
                </span>
              )}
            </div>
          )}

          {/* Categories */}
          {clinic.categories.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {clinic.categories.slice(0, 3).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 hover:bg-primary-100 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          {/* Price */}
          {clinic.starting_price && (
            <p className="mt-3 text-sm">
              <span className="text-neutral-500">From </span>
              <span className="font-semibold text-neutral-900">
                {formatPrice(clinic.starting_price, clinic.price_currency)}
              </span>
            </p>
          )}
        </Link>

        {/* CTA */}
        {showEnquiryButton && (
          <div className="mt-4 flex gap-2">
            <Link href={`/clinics/${clinic.categories[0]?.slug || 'dental'}/${clinic.slug}`} className="flex-1">
              <Button variant="outline" className="w-full" size="sm">
                View Profile
              </Button>
            </Link>
            <Link href={`/clinics/${clinic.categories[0]?.slug || 'dental'}/${clinic.slug}#clinic-funnel`} className="flex-1">
              <Button variant="primary" className="w-full" size="sm">
                Enquire
              </Button>
            </Link>
          </div>
        )}
      </div>
    </m.div>
  )
}

// Compact version for similar clinics section
export function ClinicCardCompact({ clinic, className }: Omit<ClinicCardProps, 'showEnquiryButton'>) {
  return (
    <m.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn('group', className)}
    >
      <Link
        href={`/clinics/${clinic.categories[0]?.slug || 'dental'}/${clinic.slug}`}
        className="flex gap-4 rounded-lg border border-neutral-200 bg-white p-3 transition-shadow hover:shadow-md"
      >
        {/* Thumbnail */}
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
          {clinic.first_photo ? (
            <img
              src={clinic.first_photo}
              alt={clinic.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-2xl text-neutral-300">🏥</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 overflow-hidden">
          <h4 className="truncate font-medium text-neutral-900 group-hover:text-primary-600">
            {clinic.name}
          </h4>
          {(clinic.city || clinic.country) && (
            <p className="mt-0.5 truncate text-sm text-neutral-500">
              {[clinic.city, clinic.country].filter(Boolean).join(', ')}
            </p>
          )}
          {clinic.google_rating && (
            <div className="mt-1 flex items-center gap-1">
              <StarRating rating={clinic.google_rating} size="sm" />
              <span className="text-xs text-neutral-500">
                {clinic.google_rating.toFixed(1)}
              </span>
            </div>
          )}
          {clinic.starting_price && (
            <p className="mt-1 text-sm">
              <span className="text-neutral-500">From </span>
              <span className="font-medium text-neutral-900">
                {formatPrice(clinic.starting_price, clinic.price_currency)}
              </span>
            </p>
          )}
        </div>
      </Link>
    </m.div>
  )
}
