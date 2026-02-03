import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getUserProfile } from '@/lib/auth/actions'
import { getClinicForUser } from '@/lib/data/clinic-dashboard'
import { SettingsClient } from './settings-client'

interface ClinicSettingsPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata() {
  return {
    title: 'Settings - Clinic Dashboard',
  }
}

export default async function ClinicSettingsPage({ params }: ClinicSettingsPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const userProfile = await getUserProfile()

  if (!userProfile) {
    redirect(`/${locale}/auth/signin?redirect=/clinic/settings`)
  }

  const clinic = await getClinicForUser(userProfile.id)

  if (!clinic) {
    redirect(`/${locale}/clinic/setup`)
  }

  return (
    <SettingsClient
      user={{
        id: userProfile.id,
        email: userProfile.email || '',
        full_name: userProfile.full_name,
      }}
      clinic={{
        id: clinic.id,
        name: clinic.name,
        notification_settings: clinic.notification_settings,
      }}
    />
  )
}
