import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getUserProfile } from '@/lib/auth/actions'
import { SettingsClient } from './settings-client'

interface SettingsPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata() {
  return {
    title: 'Settings - Dashboard',
  }
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const userProfile = await getUserProfile()

  if (!userProfile) {
    redirect(`/${locale}/auth/signin?redirect=/dashboard/settings`)
  }

  return (
    <SettingsClient
      user={{
        id: userProfile.id,
        email: userProfile.email,
        full_name: userProfile.full_name,
        phone: userProfile.phone,
        notification_settings: userProfile.notification_settings,
      }}
    />
  )
}
