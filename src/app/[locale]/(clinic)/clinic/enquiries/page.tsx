import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getUserProfile } from '@/lib/auth/actions'
import { getClinicForUser, getClinicEnquiries } from '@/lib/data/clinic-dashboard'
import { EnquiriesClient } from './enquiries-client'

interface ClinicEnquiriesPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ status?: string; page?: string; id?: string }>
}

export async function generateMetadata() {
  return {
    title: 'Enquiries - Clinic Dashboard',
  }
}

export default async function ClinicEnquiriesPage({ params, searchParams }: ClinicEnquiriesPageProps) {
  const { locale } = await params
  const { status = 'all', page = '1', id } = await searchParams
  setRequestLocale(locale)

  const userProfile = await getUserProfile()

  if (!userProfile) {
    redirect(`/${locale}/auth/signin?redirect=/clinic/enquiries`)
  }

  const clinic = await getClinicForUser(userProfile.id)

  if (!clinic) {
    redirect(`/${locale}/clinic/setup`)
  }

  // Fetch enquiries
  const { enquiries, totalPages } = await getClinicEnquiries(clinic.id, {
    status: status === 'all' ? undefined : status,
    page: parseInt(page),
    limit: 20,
  })

  // Get counts for each status
  const [allCount, submittedCount, viewedCount, respondedCount, closedCount] = await Promise.all([
    getClinicEnquiries(clinic.id, { limit: 1 }).then((r) => r.total),
    getClinicEnquiries(clinic.id, { status: 'submitted', limit: 1 }).then((r) => r.total),
    getClinicEnquiries(clinic.id, { status: 'viewed', limit: 1 }).then((r) => r.total),
    getClinicEnquiries(clinic.id, { status: 'responded', limit: 1 }).then((r) => r.total),
    getClinicEnquiries(clinic.id, { status: 'closed', limit: 1 }).then((r) => r.total),
  ])

  return (
    <EnquiriesClient
      enquiries={enquiries}
      totalPages={totalPages}
      currentPage={parseInt(page)}
      currentStatus={status}
      selectedEnquiryId={id}
      statusCounts={{
        all: allCount,
        submitted: submittedCount,
        viewed: viewedCount,
        responded: respondedCount,
        closed: closedCount,
      }}
    />
  )
}
