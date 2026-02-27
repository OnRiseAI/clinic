import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { getUserProfile } from '@/lib/auth/actions'
import {
  getPatientStats,
  getRecentEnquiries,
  getRecentSavedClinics,
} from '@/lib/data/patient-dashboard'
import { ClinicCard } from '@/components/clinics/clinic-card'
import { MessageSquare, Heart, Search, ArrowRight, Clock } from 'lucide-react'

interface DashboardPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata() {
  return {
    title: 'Dashboard - My Medical Journey',
  }
}

const STATUS_COLORS = {
  submitted: 'bg-neutral-100 text-neutral-700',
  viewed: 'bg-blue-100 text-blue-700',
  responded: 'bg-green-100 text-green-700',
  closed: 'bg-neutral-100 text-neutral-500',
}

const STATUS_LABELS = {
  submitted: 'Submitted',
  viewed: 'Viewed',
  responded: 'Responded',
  closed: 'Closed',
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const userProfile = await getUserProfile()

  if (!userProfile) {
    redirect(`/${locale}/auth/signin?redirect=/dashboard`)
  }

  // Fetch dashboard data
  const [stats, recentEnquiries, recentSavedClinics] = await Promise.all([
    getPatientStats(userProfile.id),
    getRecentEnquiries(userProfile.id, 3),
    getRecentSavedClinics(userProfile.id, 4),
  ])

  const firstName = userProfile.full_name?.split(' ')[0] || 'there'

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Welcome back, {firstName}!
          </h1>
          <p className="mt-1 text-neutral-600">
            Track your medical journey and manage your enquiries.
          </p>
        </div>
        <Link href="/search">
          <Button variant="primary">
            <Search className="mr-2 h-4 w-4" />
            Find Clinics
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
              <Heart className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500">Saved Clinics</p>
              <p className="text-2xl font-bold text-neutral-900">{stats.savedClinicsCount}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <MessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500">Active Enquiries</p>
              <p className="text-2xl font-bold text-neutral-900">{stats.activeEnquiriesCount}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500">Total Enquiries</p>
              <p className="text-2xl font-bold text-neutral-900">{stats.totalEnquiriesCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/search"
          className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
            <Search className="h-6 w-6 text-primary-600" />
          </div>
          <span className="font-medium text-neutral-900">Find Clinics</span>
        </Link>
        <Link
          href="/dashboard/enquiries"
          className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
            <MessageSquare className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <span className="font-medium text-neutral-900">My Enquiries</span>
            {stats.activeEnquiriesCount > 0 && (
              <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                {stats.activeEnquiriesCount} active
              </span>
            )}
          </div>
        </Link>
        <Link
          href="/dashboard/saved"
          className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
            <Heart className="h-6 w-6 text-red-600" />
          </div>
          <div className="flex-1">
            <span className="font-medium text-neutral-900">Saved Clinics</span>
            {stats.savedClinicsCount > 0 && (
              <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                {stats.savedClinicsCount}
              </span>
            )}
          </div>
        </Link>
      </div>

      <div className="grid gap-8">
        {/* Recent Enquiries */}
        <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-neutral-900">Recent Enquiries</h2>
            <Link
              href="/dashboard/enquiries"
              className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {recentEnquiries.length > 0 ? (
            <div className="divide-y divide-neutral-100">
              {recentEnquiries.map((enquiry) => (
                <Link
                  key={enquiry.id}
                  href={`/dashboard/enquiries?id=${enquiry.id}`}
                  className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-neutral-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
                    {enquiry.clinic_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-900 truncate">{enquiry.clinic_name}</p>
                    <p className="text-sm text-neutral-500 truncate">{enquiry.procedure_interest}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${STATUS_COLORS[enquiry.status]
                        }`}
                    >
                      {STATUS_LABELS[enquiry.status]}
                    </span>
                    <p className="mt-1 text-xs text-neutral-400">
                      {formatDate(enquiry.created_at)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                <MessageSquare className="h-6 w-6 text-neutral-400" />
              </div>
              <p className="text-neutral-500">No enquiries yet</p>
              <p className="mt-1 text-sm text-neutral-400">
                Submit your first enquiry to get quotes
              </p>
              <Link href="/search" className="mt-4 inline-block">
                <Button variant="primary" size="sm">
                  Find Clinics
                </Button>
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* Saved Clinics Preview */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">Saved Clinics</h2>
          {recentSavedClinics.length > 0 && (
            <Link
              href="/dashboard/saved"
              className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        {recentSavedClinics.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recentSavedClinics.map((saved) => (
              <ClinicCard
                key={saved.id}
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
                showEnquiryButton={false}
                isAuthenticated={true}
                isSaved={true}
                showSaveButton={true}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
              <Heart className="h-6 w-6 text-neutral-400" />
            </div>
            <p className="text-neutral-500">No saved clinics yet</p>
            <p className="mt-1 text-sm text-neutral-400">
              Save clinics while browsing to compare them later
            </p>
            <Link href="/search" className="mt-4 inline-block">
              <Button variant="primary" size="sm">
                Browse Clinics
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
