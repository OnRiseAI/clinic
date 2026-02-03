import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getUserProfile } from '@/lib/auth/actions'
import { getClinicForUser } from '@/lib/data/clinic-dashboard'
import { Star, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ReviewsPageProps {
  params: Promise<{ locale: string }>
}

interface GoogleReview {
  author_name: string
  rating: number
  text: string
  time: number
  relative_time_description?: string
  profile_photo_url?: string
}

interface GoogleReviewsData {
  id: string
  rating: number
  review_count: number
  reviews: GoogleReview[]
  last_fetched: string
}

export async function generateMetadata() {
  return {
    title: 'Reviews - Clinic Dashboard',
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : star - 0.5 <= rating
                ? 'fill-yellow-400/50 text-yellow-400'
                : 'fill-neutral-200 text-neutral-200'
          }`}
        />
      ))}
    </div>
  )
}

function formatReviewDate(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return `${weeks} week${weeks !== 1 ? 's' : ''} ago`
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30)
    return `${months} month${months !== 1 ? 's' : ''} ago`
  } else {
    const years = Math.floor(diffDays / 365)
    return `${years} year${years !== 1 ? 's' : ''} ago`
  }
}

export default async function ReviewsPage({ params }: ReviewsPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const userProfile = await getUserProfile()

  if (!userProfile) {
    redirect(`/${locale}/auth/signin?redirect=/clinic/reviews`)
  }

  const clinic = await getClinicForUser(userProfile.id)

  if (!clinic) {
    redirect(`/${locale}/clinic/setup`)
  }

  // Get Google reviews data
  const googleReviewsRaw = Array.isArray(clinic.google_reviews)
    ? clinic.google_reviews[0]
    : clinic.google_reviews

  const googleReviews = googleReviewsRaw as GoogleReviewsData | null
  const reviews = (googleReviews?.reviews || []) as GoogleReview[]
  const rating = googleReviews?.rating || 0
  const reviewCount = googleReviews?.review_count || 0

  // Calculate rating breakdown
  const ratingBreakdown = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => Math.round(r.rating) === stars).length
    const percentage = reviewCount > 0 ? (count / reviews.length) * 100 : 0
    return { stars, count, percentage }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Reviews</h1>
          <p className="mt-1 text-neutral-600">
            View your Google reviews. Reviews are synced automatically.
          </p>
        </div>
        {clinic.google_place_id && (
          <a
            href={`https://search.google.com/local/writereview?placeid=${clinic.google_place_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">
              <ExternalLink className="mr-2 h-4 w-4" />
              View on Google
            </Button>
          </a>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-neutral-500">Overall Rating</p>
          <div className="mt-1 flex items-baseline gap-2">
            <p className="text-3xl font-bold text-neutral-900">
              {rating > 0 ? rating.toFixed(1) : '—'}
            </p>
            <StarRating rating={rating} />
          </div>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-neutral-500">Total Reviews</p>
          <p className="mt-1 text-3xl font-bold text-neutral-900">{reviewCount}</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-neutral-500">5-Star Reviews</p>
          <p className="mt-1 text-3xl font-bold text-neutral-900">
            {reviews.filter((r) => r.rating === 5).length}
          </p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-neutral-500">Last Synced</p>
          <p className="mt-1 text-xl font-semibold text-neutral-900">
            {googleReviews?.last_fetched
              ? new Date(googleReviews.last_fetched).toLocaleDateString()
              : '—'}
          </p>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Rating Breakdown</h2>
        <div className="space-y-3">
          {ratingBreakdown.map(({ stars, count, percentage }) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="w-16 text-sm text-neutral-600">{stars} stars</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-yellow-400 transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 text-right text-sm text-neutral-500">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-neutral-900">Recent Reviews</h2>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
                    {review.profile_photo_url ? (
                      <img
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      review.author_name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">{review.author_name}</p>
                    <div className="flex items-center gap-2">
                      <StarRating rating={review.rating} />
                      <span className="text-sm text-neutral-400">
                        • {review.relative_time_description || formatReviewDate(review.time)}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">
                  Google
                </span>
              </div>
              {review.text && (
                <p className="mt-4 text-neutral-600 whitespace-pre-wrap">{review.text}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
          <div className="px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-3xl">
              ⭐
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">No reviews yet</h3>
            <p className="mt-2 max-w-md mx-auto text-neutral-500">
              Your Google reviews will appear here once they&apos;re synced.
              Make sure your clinic has a Google Business Profile.
            </p>
            <a
              href="https://business.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block"
            >
              <Button variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" />
                Google Business Profile
              </Button>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
