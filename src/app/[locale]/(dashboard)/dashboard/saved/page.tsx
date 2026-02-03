import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getUserProfile } from '@/lib/auth/actions'
import { getSavedClinics } from '@/lib/data/patient-dashboard'
import { SavedClinicsClient } from './saved-clinics-client'

interface SavedClinicsPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata() {
  return {
    title: 'Saved Clinics - My Dashboard',
  }
}

export default async function SavedClinicsPage({ params }: SavedClinicsPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const userProfile = await getUserProfile()

  if (!userProfile) {
    redirect(`/${locale}/auth/signin?redirect=/dashboard/saved`)
  }

  const { clinics } = await getSavedClinics(userProfile.id, { limit: 100 })

  return <SavedClinicsClient initialClinics={clinics} />
}
