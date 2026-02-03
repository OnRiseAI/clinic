'use client'

import { useState, useEffect } from 'react'
import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { PhotoGallery } from '@/components/clinics/photo-gallery'
import { WhatsAppButton, WhatsAppFloatingButton } from '@/components/clinics/whatsapp-button'
import { ClinicCardCompact } from '@/components/clinics/clinic-card'
import { EnquiryModal } from '@/components/enquiry'
import { SaveClinicButton } from '@/components/clinics/save-clinic-button'
import type { ClinicWithRelations, ClinicCardData } from '@/lib/data/clinics'
import type { Destination } from '@/lib/validations/enquiry'

interface ClinicProfileClientProps {
  clinic: ClinicWithRelations
  similarClinics: ClinicCardData[]
  clinicsInCountry: ClinicCardData[]
  isAuthenticated: boolean
  isSaved: boolean
}

const ACCREDITATION_INFO: Record<string, { name: string; description: string }> = {
  JCI: {
    name: 'Joint Commission International',
    description: 'Gold standard in global healthcare accreditation',
  },
  ISO: {
    name: 'ISO 9001 Certified',
    description: 'International quality management standards',
  },
  TEMOS: {
    name: 'TEMOS International',
    description: 'Quality in international patient care',
  },
  NABH: {
    name: 'NABH Accredited',
    description: 'National Accreditation Board for Hospitals & Healthcare',
  },
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  const sizes = { sm: 'text-base', md: 'text-xl', lg: 'text-2xl' }

  return (
    <span className={`inline-flex text-yellow-500 ${sizes[size]}`}>
      {Array(fullStars).fill(0).map((_, i) => <span key={`f-${i}`}>★</span>)}
      {hasHalfStar && <span>★</span>}
      {Array(emptyStars).fill(0).map((_, i) => <span key={`e-${i}`} className="text-neutral-300">★</span>)}
    </span>
  )
}

function formatPrice(min: number | null, max: number | null, currency: string): string {
  const symbols: Record<string, string> = { EUR: '€', USD: '$', GBP: '£', THB: '฿', MXN: '$' }
  const symbol = symbols[currency] || currency
  if (min && max && min !== max) {
    return `${symbol}${min.toLocaleString()}–${symbol}${max.toLocaleString()}`
  }
  if (min) return `${symbol}${min.toLocaleString()}`
  if (max) return `${symbol}${max.toLocaleString()}`
  return 'Contact for pricing'
}

export function ClinicProfileClient({
  clinic,
  similarClinics,
  clinicsInCountry,
  isAuthenticated,
  isSaved,
}: ClinicProfileClientProps) {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false)
  const [destinations, setDestinations] = useState<Destination[]>([])

  const location = [clinic.city, clinic.country].filter(Boolean).join(', ')
  const googleReviews = clinic.google_reviews
  const hasPhone = !!clinic.phone

  // Fetch destinations on mount
  useEffect(() => {
    async function fetchDestinations() {
      try {
        const response = await fetch('/api/destinations')
        if (response.ok) {
          const data = await response.json()
          setDestinations(data)
        }
      } catch (error) {
        console.error('Failed to fetch destinations:', error)
      }
    }
    fetchDestinations()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <m.section {...fadeInUp} className="bg-white pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* Clinic Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                {clinic.claimed ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    ✓ Verified Clinic
                  </span>
                ) : (
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                    Unclaimed
                  </span>
                )}
                {clinic.accreditations.slice(0, 3).map((acc) => (
                  <span
                    key={acc}
                    className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700"
                    title={ACCREDITATION_INFO[acc]?.description}
                  >
                    {ACCREDITATION_INFO[acc]?.name || acc}
                  </span>
                ))}
              </div>

              <h1 className="mt-4 text-3xl font-bold text-neutral-900 sm:text-4xl">
                {clinic.name}
              </h1>

              {location && (
                <p className="mt-2 flex items-center gap-2 text-lg text-neutral-600">
                  <span>📍</span> {location}
                </p>
              )}

              {/* Rating */}
              {googleReviews?.rating && (
                <div className="mt-4 flex items-center gap-3">
                  <StarRating rating={googleReviews.rating} size="lg" />
                  <span className="text-2xl font-bold text-neutral-900">
                    {googleReviews.rating.toFixed(1)}
                  </span>
                  <span className="text-neutral-500">
                    ({googleReviews.review_count} Google reviews)
                  </span>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <div className="flex gap-3">
                <Button
                  variant="accent"
                  size="lg"
                  className="flex-1 sm:flex-none"
                  onClick={() => setIsEnquiryModalOpen(true)}
                >
                  Send Enquiry
                </Button>
                <SaveClinicButton
                  clinicId={clinic.id}
                  initialSaved={isSaved}
                  isAuthenticated={isAuthenticated}
                  variant="button"
                  className="h-12"
                />
              </div>
              {hasPhone && (
                <WhatsAppButton
                  phone={clinic.phone!}
                  clinicName={clinic.name}
                  variant="outline"
                  size="lg"
                />
              )}
            </div>
          </div>
        </div>
      </m.section>

      {/* Photo Gallery */}
      <m.section
        {...fadeInUp}
        transition={{ delay: 0.1 }}
        className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"
      >
        <PhotoGallery photos={clinic.photos} clinicName={clinic.name} />
      </m.section>

      {/* Unclaimed Banner */}
      {!clinic.claimed && (
        <m.div
          {...fadeInUp}
          transition={{ delay: 0.15 }}
          className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8"
        >
          <div className="rounded-xl border border-primary-200 bg-primary-50 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-primary-900">Is this your clinic?</h3>
                <p className="mt-1 text-sm text-primary-700">
                  Claim your profile to update information, add photos, and start receiving patient enquiries.
                </p>
              </div>
              <Link href={`/auth/claim/${clinic.id}`}>
                <Button variant="primary">Claim This Clinic</Button>
              </Link>
            </div>
          </div>
        </m.div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-12 lg:col-span-2">
            {/* About Section */}
            <m.section {...fadeInUp} transition={{ delay: 0.2 }}>
              <h2 className="mb-6 text-2xl font-bold text-neutral-900">About This Clinic</h2>
              <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                {clinic.description ? (
                  <p className="whitespace-pre-wrap text-neutral-700 leading-relaxed">
                    {clinic.description}
                  </p>
                ) : (
                  <p className="text-neutral-500 italic">
                    Description not yet available.
                  </p>
                )}

                <div className="mt-6 grid gap-4 border-t border-neutral-100 pt-6 sm:grid-cols-3">
                  {clinic.year_established && (
                    <div>
                      <p className="text-sm text-neutral-500">Established</p>
                      <p className="mt-1 font-semibold text-neutral-900">
                        {clinic.year_established}
                      </p>
                    </div>
                  )}
                  {clinic.languages.length > 0 && (
                    <div>
                      <p className="text-sm text-neutral-500">Languages</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {clinic.languages.map((lang) => (
                          <span
                            key={lang}
                            className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {clinic.operating_hours && Object.keys(clinic.operating_hours).length > 0 && (
                    <div>
                      <p className="text-sm text-neutral-500">Hours</p>
                      <p className="mt-1 text-sm text-neutral-700">
                        Contact for availability
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </m.section>

            {/* Procedures & Pricing */}
            <m.section {...fadeInUp} transition={{ delay: 0.25 }}>
              <h2 className="mb-6 text-2xl font-bold text-neutral-900">Procedures & Pricing</h2>
              <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
                {clinic.clinic_procedures.length > 0 ? (
                  <div className="divide-y divide-neutral-100">
                    {clinic.clinic_procedures.map((cp) => (
                      <div
                        key={cp.id}
                        className="flex items-center justify-between p-4 transition-colors hover:bg-neutral-50"
                      >
                        <div>
                          <Link
                            href={`/${cp.procedure.category_id ? 'category' : 'procedures'}/${cp.procedure.slug}`}
                            className="font-medium text-neutral-900 hover:text-primary-600"
                          >
                            {cp.procedure.name}
                          </Link>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-neutral-900">
                            {formatPrice(cp.price_min, cp.price_max, cp.currency)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-neutral-500">
                      Procedures and pricing not yet available.
                    </p>
                    {!clinic.claimed && (
                      <p className="mt-2 text-sm text-neutral-400">
                        Claim this clinic to add procedures.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </m.section>

            {/* Doctors */}
            <m.section {...fadeInUp} transition={{ delay: 0.3 }}>
              <h2 className="mb-6 text-2xl font-bold text-neutral-900">Our Doctors</h2>
              {clinic.doctors.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {clinic.doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex gap-4">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-neutral-100">
                          {doctor.photo_url ? (
                            <img
                              src={doctor.photo_url}
                              alt={doctor.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-2xl text-neutral-400">
                              👨‍⚕️
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-neutral-900">{doctor.name}</h3>
                          {doctor.title && (
                            <p className="text-sm text-primary-600">{doctor.title}</p>
                          )}
                          {doctor.specialisation && (
                            <p className="mt-1 text-sm text-neutral-600">
                              {doctor.specialisation}
                            </p>
                          )}
                          {doctor.years_experience && (
                            <p className="mt-1 text-xs text-neutral-500">
                              {doctor.years_experience}+ years experience
                            </p>
                          )}
                        </div>
                      </div>
                      {doctor.qualifications.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {doctor.qualifications.slice(0, 3).map((qual, i) => (
                            <span
                              key={i}
                              className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600"
                            >
                              {qual}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center">
                  <p className="text-neutral-500">Doctor information not yet available.</p>
                  {!clinic.claimed && (
                    <p className="mt-2 text-sm text-neutral-400">
                      Claim this clinic to add your team.
                    </p>
                  )}
                </div>
              )}
            </m.section>

            {/* Accreditations */}
            {clinic.accreditations.length > 0 && (
              <m.section {...fadeInUp} transition={{ delay: 0.35 }}>
                <h2 className="mb-6 text-2xl font-bold text-neutral-900">
                  Accreditations & Certifications
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {clinic.accreditations.map((acc) => {
                    const info = ACCREDITATION_INFO[acc]
                    return (
                      <div
                        key={acc}
                        className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-xl">
                          🏆
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">
                            {info?.name || acc}
                          </p>
                          {info?.description && (
                            <p className="text-sm text-neutral-500">{info.description}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </m.section>
            )}

            {/* Google Reviews */}
            <m.section {...fadeInUp} transition={{ delay: 0.4 }}>
              <h2 className="mb-6 text-2xl font-bold text-neutral-900">Google Reviews</h2>
              <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
                {googleReviews?.rating ? (
                  <>
                    {/* Rating Summary */}
                    <div className="flex items-center gap-6 border-b border-neutral-100 p-6">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-neutral-900">
                          {googleReviews.rating.toFixed(1)}
                        </p>
                        <StarRating rating={googleReviews.rating} />
                        <p className="mt-1 text-sm text-neutral-500">
                          {googleReviews.review_count} reviews
                        </p>
                      </div>
                      <div className="h-16 w-px bg-neutral-200" />
                      <div>
                        <img
                          src="/images/google-logo.png"
                          alt="Google Reviews"
                          className="h-8 w-auto"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                        <p className="mt-1 text-xs text-neutral-400">Powered by Google</p>
                      </div>
                    </div>

                    {/* Review List */}
                    {googleReviews.reviews && googleReviews.reviews.length > 0 ? (
                      <div className="divide-y divide-neutral-100">
                        {googleReviews.reviews.slice(0, 5).map((review, index) => (
                          <div key={index} className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 font-semibold text-neutral-600">
                                  {review.author_name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-medium text-neutral-900">
                                    {review.author_name}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <StarRating rating={review.rating} size="sm" />
                                    <span className="text-xs text-neutral-400">
                                      {review.relative_time_description}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {review.text && (
                              <p className="mt-3 text-neutral-600 leading-relaxed">
                                {review.text}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-neutral-500">No review excerpts available.</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-neutral-500">No Google reviews yet.</p>
                  </div>
                )}
              </div>
            </m.section>

            {/* Location & Map */}
            <m.section {...fadeInUp} transition={{ delay: 0.45 }}>
              <h2 className="mb-6 text-2xl font-bold text-neutral-900">Location</h2>
              <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
                {/* Map Placeholder */}
                <div className="aspect-[16/9] bg-neutral-100">
                  {clinic.lat && clinic.lng ? (
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${clinic.lat},${clinic.lng}`}
                      className="h-full w-full border-0"
                      loading="lazy"
                      allowFullScreen
                      title={`${clinic.name} location`}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="text-center">
                        <span className="text-4xl">📍</span>
                        <p className="mt-2 text-neutral-500">Map view coming soon</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div className="p-6">
                  {clinic.address ? (
                    <>
                      <p className="text-neutral-700">{clinic.address}</p>
                      <p className="text-neutral-600">{location}</p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          clinic.address + ', ' + location
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
                      >
                        Get Directions →
                      </a>
                    </>
                  ) : (
                    <p className="text-neutral-500">
                      {location || 'Address not available'}
                    </p>
                  )}
                </div>
              </div>
            </m.section>

            {/* Enquiry CTA */}
            <m.section {...fadeInUp} transition={{ delay: 0.5 }} id="enquiry">
              <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-8 text-white sm:p-12">
                <h2 className="text-2xl font-bold sm:text-3xl">Interested in This Clinic?</h2>
                <p className="mt-3 max-w-xl text-primary-100">
                  Send an enquiry and they&apos;ll get back to you within 24 hours with a
                  personalized treatment plan and quote.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setIsEnquiryModalOpen(true)}
                  >
                    Send Enquiry
                  </Button>
                  {hasPhone && (
                    <WhatsAppButton
                      phone={clinic.phone!}
                      clinicName={clinic.name}
                      variant="outline"
                      size="lg"
                      className="border-white/30 text-white hover:bg-white/10"
                    />
                  )}
                </div>
              </div>
            </m.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Contact Card */}
              <m.div
                {...fadeInUp}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-neutral-900">Quick Contact</h3>
                <div className="mt-4 space-y-4">
                  <Button
                    variant="accent"
                    className="w-full"
                    onClick={() => setIsEnquiryModalOpen(true)}
                  >
                    Send Enquiry
                  </Button>
                  {hasPhone && (
                    <WhatsAppButton
                      phone={clinic.phone!}
                      clinicName={clinic.name}
                      variant="outline"
                      className="w-full"
                    />
                  )}
                </div>

                {/* Contact Info */}
                <div className="mt-6 space-y-3 border-t border-neutral-100 pt-6">
                  {clinic.phone && (
                    <a
                      href={`tel:${clinic.phone}`}
                      className="flex items-center gap-3 text-neutral-600 hover:text-primary-600"
                    >
                      <span>📞</span>
                      <span className="text-sm">{clinic.phone}</span>
                    </a>
                  )}
                  {clinic.email && (
                    <a
                      href={`mailto:${clinic.email}`}
                      className="flex items-center gap-3 text-neutral-600 hover:text-primary-600"
                    >
                      <span>✉️</span>
                      <span className="text-sm">{clinic.email}</span>
                    </a>
                  )}
                  {clinic.website && (
                    <a
                      href={clinic.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-neutral-600 hover:text-primary-600"
                    >
                      <span>🌐</span>
                      <span className="text-sm">Visit Website</span>
                    </a>
                  )}
                </div>
              </m.div>

              {/* Categories */}
              {clinic.clinic_categories.length > 0 && (
                <m.div
                  {...fadeInUp}
                  transition={{ delay: 0.25 }}
                  className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-neutral-900">Specialties</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {clinic.clinic_categories.map((cc) => (
                      <Link
                        key={cc.id}
                        href={`/${cc.category.slug}`}
                        className="rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-100"
                      >
                        {cc.category.icon && <span className="mr-1">{cc.category.icon}</span>}
                        {cc.category.name}
                      </Link>
                    ))}
                  </div>
                </m.div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Clinics */}
        {similarClinics.length > 0 && (
          <m.section {...fadeInUp} transition={{ delay: 0.55 }} className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-neutral-900">Similar Clinics</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {similarClinics.map((c) => (
                <ClinicCardCompact key={c.id} clinic={c} />
              ))}
            </div>
          </m.section>
        )}

        {/* More Clinics in Country */}
        {clinicsInCountry.length > 0 && clinic.country && (
          <m.section {...fadeInUp} transition={{ delay: 0.6 }} className="mt-12 pb-16">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">
                More Clinics in {clinic.country}
              </h2>
              <Link
                href={`/destinations/${clinic.country.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                View all →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {clinicsInCountry.map((c) => (
                <ClinicCardCompact key={c.id} clinic={c} />
              ))}
            </div>
          </m.section>
        )}
      </div>

      {/* Floating WhatsApp Button (Mobile) */}
      {hasPhone && (
        <WhatsAppFloatingButton phone={clinic.phone!} clinicName={clinic.name} />
      )}

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        clinic={clinic}
        destinations={destinations}
      />
    </>
  )
}
