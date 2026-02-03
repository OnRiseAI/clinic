import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getUserProfile } from '@/lib/auth/actions'
import { getClinicForUser } from '@/lib/data/clinic-dashboard'
import { createClient } from '@/lib/supabase/server'
import { ProfileClient } from './profile-client'

interface ClinicProfilePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata() {
  return {
    title: 'Edit Clinic Profile - MediTravel',
  }
}

export default async function ClinicProfilePage({ params }: ClinicProfilePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const userProfile = await getUserProfile()

  if (!userProfile) {
    redirect(`/${locale}/auth/signin?redirect=/clinic/profile`)
  }

  const clinic = await getClinicForUser(userProfile.id)

  if (!clinic) {
    redirect(`/${locale}/clinic/setup`)
  }

  // Fetch categories and procedures for the form
  const supabase = await createClient()

  const [categoriesResult, proceduresResult] = await Promise.all([
    supabase
      .from('categories')
      .select('id, name, slug, icon')
      .order('name'),
    supabase
      .from('procedures')
      .select('id, name, slug, category_id')
      .order('name'),
  ])

  const categories = categoriesResult.data || []
  const procedures = proceduresResult.data || []

  return (
    <ProfileClient
      clinic={{
        id: clinic.id,
        name: clinic.name,
        slug: clinic.slug,
        description: clinic.description,
        address: clinic.address,
        city: clinic.city,
        country: clinic.country,
        phone: clinic.phone,
        email: clinic.email,
        website: clinic.website,
        year_established: clinic.year_established,
        languages: clinic.languages || [],
        accreditations: clinic.accreditations || [],
        certifications: clinic.certifications || [],
        photos: clinic.photos || [],
        clinic_procedures: clinic.clinic_procedures || [],
        clinic_categories: clinic.clinic_categories || [],
      }}
      categories={categories}
      procedures={procedures}
    />
  )
}
