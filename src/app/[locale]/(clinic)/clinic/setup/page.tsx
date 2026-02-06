import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getUserProfile } from '@/lib/auth/actions'
import { getClinicForUser } from '@/lib/data/clinic-dashboard'
import { getCategories, getDestinations } from '@/lib/data/clinics'
import { ProfileSetupWizard } from '@/components/clinic/profile-setup-wizard'
import { createClient } from '@/lib/supabase/server'

interface SetupPageProps {
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: 'Set Up Your Clinic Profile - MeetYourClinic',
  description: 'Complete your clinic profile to start receiving patient enquiries.',
}

export default async function SetupPage({ params }: SetupPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const userProfile = await getUserProfile()

  if (!userProfile) {
    redirect(`/${locale}/auth/signin?redirect=/clinic/setup`)
  }

  if (userProfile.role !== 'clinic') {
    redirect(`/${locale}/dashboard`)
  }

  // Check if clinic already exists
  const existingClinic = await getClinicForUser(userProfile.id)

  if (existingClinic) {
    // Clinic exists, redirect to dashboard
    redirect(`/${locale}/clinic`)
  }

  // Fetch categories and countries for the wizard
  const categories = await getCategories()
  const destinations = await getDestinations()

  // Fetch procedures for procedure selection
  const supabase = await createClient()
  const { data: procedures } = await supabase
    .from('procedures')
    .select('id, name, slug, category_id')
    .order('name')

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="mx-auto max-w-3xl px-4">
        <ProfileSetupWizard
          userId={userProfile.id}
          categories={categories || []}
          procedures={procedures || []}
          countries={destinations?.map((d) => d.country_name) || []}
        />
      </div>
    </div>
  )
}
