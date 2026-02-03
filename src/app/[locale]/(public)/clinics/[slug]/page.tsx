import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getClinicBySlug, getClinicSlugs, getSimilarClinics } from '@/lib/data/clinics'
import { getClinicsByCountry } from '@/lib/data/content'
import { getUser } from '@/lib/auth/actions'
import { isClinicSaved } from '@/lib/data/patient-dashboard'
import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { ClinicProfileClient } from './clinic-profile-client'
import { generateClinicMetadata } from '@/lib/seo/metadata'
import {
  generateClinicSchema,
  generateBreadcrumbSchema,
  generateSpeakableSchema,
} from '@/lib/seo/structured-data'
import { StructuredData } from '@/components/seo/structured-data-component'

interface ClinicPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: ClinicPageProps): Promise<Metadata> {
  const { slug } = await params
  const clinic = await getClinicBySlug(slug)

  if (!clinic) {
    return { title: 'Clinic Not Found' }
  }

  return generateClinicMetadata({
    name: clinic.name,
    slug: clinic.slug,
    description: clinic.description,
    city: clinic.city,
    country: clinic.country,
    rating: clinic.google_reviews?.rating || null,
    reviewCount: clinic.google_reviews?.review_count || null,
    specialties: clinic.clinic_categories.map((cc) => cc.category.name),
    imageUrl: clinic.photos[0]?.url,
  })
}

// Static params generation disabled - using dynamic rendering
// To enable static generation, implement a non-cookie-based fetch in getClinicSlugs
// export async function generateStaticParams() {
//   const slugs = await getClinicSlugs()
//   return slugs.map((slug) => ({ slug }))
// }

export const revalidate = 3600 // Revalidate every hour

export default async function ClinicPage({ params }: ClinicPageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const clinic = await getClinicBySlug(slug)

  if (!clinic) {
    notFound()
  }

  // Get similar clinics, clinics in same country, and auth status in parallel
  const categoryIds = clinic.clinic_categories.map((cc) => cc.category.id)
  const [similarClinics, allClinicsInCountry, user] = await Promise.all([
    getSimilarClinics(clinic.id, clinic.country, categoryIds, 4),
    clinic.country ? getClinicsByCountry(clinic.country, 8) : Promise.resolve([]),
    getUser(),
  ])

  // Filter out current clinic from country list
  const clinicsInCountry = allClinicsInCountry
    .filter((c) => c.id !== clinic.id)
    .slice(0, 4)

  // Check if clinic is saved (only if user is authenticated)
  const isSaved = user ? await isClinicSaved(user.id, clinic.id) : false

  // Generate structured data
  const clinicSchema = generateClinicSchema({
    name: clinic.name,
    slug: clinic.slug,
    description: clinic.description,
    address: clinic.address,
    city: clinic.city,
    country: clinic.country,
    lat: clinic.lat,
    lng: clinic.lng,
    phone: clinic.phone,
    email: clinic.email,
    website: clinic.website,
    photos: clinic.photos,
    rating: clinic.google_reviews?.rating || null,
    reviewCount: clinic.google_reviews?.review_count || null,
    accreditations: clinic.accreditations,
    specialties: clinic.clinic_categories.map((cc) => cc.category.name),
    procedures: clinic.clinic_procedures.map((cp) => ({
      name: cp.procedure.name,
      priceMin: cp.price_min,
      priceMax: cp.price_max,
      currency: cp.currency,
    })),
    doctors: clinic.doctors.map((d) => ({
      name: d.name,
      title: d.title,
      specialisation: d.specialisation,
    })),
    yearEstablished: clinic.year_established,
    languages: clinic.languages,
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Clinics', url: '/clinics' },
    ...(clinic.country
      ? [{ name: clinic.country, url: `/destinations/${clinic.country.toLowerCase().replace(/\s+/g, '-')}` }]
      : []),
    { name: clinic.name },
  ])

  const speakableSchema = generateSpeakableSchema(`/clinics/${slug}`, [
    '.clinic-summary',
    'h1',
  ])

  return (
    <div className="min-h-screen bg-neutral-50">
      <StructuredData data={[clinicSchema, breadcrumbSchema, speakableSchema]} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb />
      </div>

      <ClinicProfileClient
        clinic={clinic}
        similarClinics={similarClinics}
        clinicsInCountry={clinicsInCountry}
        isAuthenticated={!!user}
        isSaved={isSaved}
      />
    </div>
  )
}
