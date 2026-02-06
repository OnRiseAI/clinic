import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { getUserProfile } from '@/lib/auth/actions'
import { getClinicForUser, getDashboardMetrics, getRecentEnquiries } from '@/lib/data/clinic-dashboard'
import { calculateProfileCompletion } from '@/lib/validations/clinic'
import { ClinicDashboardClient } from './dashboard-client'
import { Check, Clock, MessageSquare, Star, TrendingUp } from 'lucide-react'

interface ClinicDashboardPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ welcome?: string }>
}

export async function generateMetadata() {
  return {
    title: 'Clinic Dashboard - MeetYourClinic',
  }
}

export default async function ClinicDashboardPage({ params, searchParams }: ClinicDashboardPageProps) {
  const { locale } = await params
  const { welcome } = await searchParams
  setRequestLocale(locale)

  const userProfile = await getUserProfile()

  if (!userProfile) {
    redirect(`/${locale}/auth/signin?redirect=/clinic`)
  }

  // Get user's clinic
  const clinic = await getClinicForUser(userProfile.id)

  if (!clinic) {
    // No clinic yet, redirect to setup
    redirect(`/${locale}/clinic/setup`)
  }

  // Get dashboard data
  const [metrics, recentEnquiries] = await Promise.all([
    getDashboardMetrics(clinic.id),
    getRecentEnquiries(clinic.id, 5),
  ])

  // Calculate profile completion
  const profileCompletion = calculateProfileCompletion({
    description: clinic.description,
    photos: clinic.photos,
    doctors: clinic.doctors,
    clinic_procedures: clinic.clinic_procedures,
    accreditations: clinic.accreditations,
    languages: clinic.languages,
  })

  // Get Google reviews data
  const googleReviews = Array.isArray(clinic.google_reviews)
    ? clinic.google_reviews[0]
    : clinic.google_reviews

  const showWelcome = welcome === 'true'

  return (
    <ClinicDashboardClient
      showWelcome={showWelcome}
      clinicName={clinic.name}
    >
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
            <p className="mt-1 text-neutral-600">
              Welcome back! Here&apos;s an overview of your clinic&apos;s performance.
            </p>
          </div>
          <Link href="/clinic/profile">
            <Button variant="primary">Edit Profile</Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                <MessageSquare className="h-5 w-5 text-primary-600" />
              </div>
              <p className="text-sm font-medium text-neutral-500">Total Enquiries</p>
            </div>
            <p className="mt-3 text-3xl font-bold text-neutral-900">{metrics.totalEnquiries}</p>
            <p className="mt-1 text-sm text-neutral-500">This month</p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <p className="text-sm font-medium text-neutral-500">Awaiting Response</p>
            </div>
            <p className="mt-3 text-3xl font-bold text-neutral-900">{metrics.pendingEnquiries}</p>
            <p className="mt-1 text-sm text-neutral-500">Needs attention</p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-sm font-medium text-neutral-500">Avg. Response Time</p>
            </div>
            <p className="mt-3 text-3xl font-bold text-neutral-900">{metrics.avgResponseTime}</p>
            <p className="mt-1 text-sm text-neutral-500">Time to respond</p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <p className="text-sm font-medium text-neutral-500">Google Rating</p>
            </div>
            <p className="mt-3 text-3xl font-bold text-neutral-900">
              {googleReviews?.rating?.toFixed(1) || '—'}
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              {googleReviews?.review_count || 0} reviews
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'View Enquiries', href: '/clinic/enquiries', icon: '📬', count: metrics.pendingEnquiries },
            { label: 'Manage Doctors', href: '/clinic/doctors', icon: '👨‍⚕️', count: clinic.doctors?.length || 0 },
            { label: 'Update Profile', href: '/clinic/profile', icon: '🏥', count: null },
            { label: 'See Reviews', href: '/clinic/reviews', icon: '⭐', count: googleReviews?.review_count || 0 },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
            >
              <span className="text-2xl">{action.icon}</span>
              <div className="flex-1">
                <span className="font-medium text-neutral-900">{action.label}</span>
                {action.count !== null && (
                  <span className="ml-2 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700">
                    {action.count}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Enquiries */}
          <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-neutral-900">Recent Enquiries</h2>
              <Link
                href="/clinic/enquiries"
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                View all
              </Link>
            </div>
            {recentEnquiries.length > 0 ? (
              <div className="divide-y divide-neutral-100">
                {recentEnquiries.map((enquiry) => (
                  <Link
                    key={enquiry.id}
                    href={`/clinic/enquiries?id=${enquiry.id}`}
                    className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-neutral-50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
                      {enquiry.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-neutral-900 truncate">{enquiry.fullName}</p>
                      <p className="text-sm text-neutral-500 truncate">{enquiry.procedureInterest}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${enquiry.status === 'submitted'
                            ? 'bg-amber-100 text-amber-700'
                            : enquiry.status === 'viewed'
                              ? 'bg-blue-100 text-blue-700'
                              : enquiry.status === 'responded'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-neutral-100 text-neutral-700'
                          }`}
                      >
                        {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                      </span>
                      <p className="mt-1 text-xs text-neutral-400">
                        {new Date(enquiry.createdAt).toLocaleDateString()}
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
                  Enquiries from patients will appear here
                </p>
              </div>
            )}
          </div>

          {/* Profile Completion */}
          <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-neutral-900">Profile Completion</h2>
            </div>
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-neutral-600">
                  Your profile is {profileCompletion.percentage}% complete
                </span>
                <span className="text-sm font-medium text-primary-600">
                  {profileCompletion.items.filter((i) => i.completed).length}/{profileCompletion.items.length} sections
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-primary-500 transition-all"
                  style={{ width: `${profileCompletion.percentage}%` }}
                />
              </div>
              <div className="mt-6 space-y-3">
                {profileCompletion.items.map((item) => (
                  <Link
                    key={item.id}
                    href={item.link}
                    className="flex items-center gap-3 rounded-lg border border-neutral-200 px-4 py-3 text-sm transition-colors hover:border-primary-200 hover:bg-primary-50"
                  >
                    {item.completed ? (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                        <Check className="h-3 w-3" />
                      </div>
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-neutral-300" />
                    )}
                    <span className={item.completed ? 'text-neutral-500 line-through' : 'text-neutral-700'}>
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClinicDashboardClient>
  )
}
