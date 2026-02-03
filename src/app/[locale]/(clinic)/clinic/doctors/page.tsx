import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getUserProfile } from '@/lib/auth/actions'
import { getClinicForUser, getClinicDoctors } from '@/lib/data/clinic-dashboard'
import { DoctorsClient } from './doctors-client'

interface DoctorsPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata() {
  return {
    title: 'Manage Doctors - Clinic Dashboard',
  }
}

export default async function DoctorsPage({ params }: DoctorsPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const userProfile = await getUserProfile()

  if (!userProfile) {
    redirect(`/${locale}/auth/signin?redirect=/clinic/doctors`)
  }

  const clinic = await getClinicForUser(userProfile.id)

  if (!clinic) {
    redirect(`/${locale}/clinic/setup`)
  }

  const doctors = await getClinicDoctors(clinic.id)

  return <DoctorsClient doctors={doctors} clinicId={clinic.id} />
}
