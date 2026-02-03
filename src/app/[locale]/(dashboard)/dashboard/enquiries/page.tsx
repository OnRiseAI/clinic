import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getUserProfile } from '@/lib/auth/actions'
import { getPatientEnquiries } from '@/lib/data/patient-dashboard'
import { EnquiriesClient } from './enquiries-client'

interface EnquiriesPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ status?: string; id?: string }>
}

export async function generateMetadata() {
  return {
    title: 'My Enquiries - Dashboard',
  }
}

export default async function EnquiriesPage({ params, searchParams }: EnquiriesPageProps) {
  const { locale } = await params
  const { status = 'all', id } = await searchParams
  setRequestLocale(locale)

  const userProfile = await getUserProfile()

  if (!userProfile) {
    redirect(`/${locale}/auth/signin?redirect=/dashboard/enquiries`)
  }

  // Fetch enquiries with current filter
  const { enquiries } = await getPatientEnquiries(userProfile.id, {
    status: status === 'all' ? undefined : status,
    limit: 50,
  })

  // Get counts for each status
  const [allResult, activeResult, respondedResult, closedResult] = await Promise.all([
    getPatientEnquiries(userProfile.id, { limit: 1 }),
    getPatientEnquiries(userProfile.id, { status: 'active', limit: 1 }),
    getPatientEnquiries(userProfile.id, { status: 'responded', limit: 1 }),
    getPatientEnquiries(userProfile.id, { status: 'closed', limit: 1 }),
  ])

  const statusCounts = {
    all: allResult.total,
    active: activeResult.total,
    responded: respondedResult.total,
    closed: closedResult.total,
  }

  return (
    <EnquiriesClient
      enquiries={enquiries}
      statusCounts={statusCounts}
      currentStatus={status}
      selectedEnquiryId={id}
    />
  )
}
