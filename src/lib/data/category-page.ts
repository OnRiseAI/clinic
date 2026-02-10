import { createClient } from '@/lib/supabase/server'
import { getClinicBySlug, type ClinicWithRelations } from './clinics'
import { getClinicsByCategory, getTopDestinationsForCategory, getCategoryBySlug, getProceduresByCategory } from './content'
import type { ClinicCardData } from './clinics'
import type { ClinicContactConfig } from '@/lib/lead-funnel/types'

// =============================================================================
// TYPES
// =============================================================================

export interface CategoryClinicCard {
  id: string
  slug: string
  name: string
  location: string // "Istanbul, Turkey"
  country: string
  countryCode: string
  countryFlag: string
  rating: number
  reviewCount: number
  verified: boolean
  imageUrl: string | null
  accreditations: string[]
  yearEstablished: number | null
  description: string | null
  doctor: {
    name: string
    specialty: string
    yearsExperience: number
    photoUrl: string | null
  } | null
  review: {
    text: string
    authorName: string
    rating: number
  } | null
  treatments: Array<{ name: string; priceMin: number | null; currency: string }>
  tags: string[]
  contactConfig: ClinicContactConfig
}

export interface CategoryPageStats {
  clinicCount: number
  countries: number
  avgRating: number
  patientsHelped: string
}

export interface CountryFilter {
  name: string
  code: string
  flag: string
  count: number
}

export interface PricingRow {
  procedureName: string
  prices: Array<{ country: string; flag: string; priceMin: number; currency: string }>
}

// =============================================================================
// COUNTRY FLAG MAP (ISO code → emoji)
// =============================================================================

const FLAG_MAP: Record<string, string> = {
  TR: '\uD83C\uDDF9\uD83C\uDDF7', HU: '\uD83C\uDDED\uD83C\uDDFA', MX: '\uD83C\uDDF2\uD83C\uDDFD',
  TH: '\uD83C\uDDF9\uD83C\uDDED', PL: '\uD83C\uDDF5\uD83C\uDDF1', CR: '\uD83C\uDDE8\uD83C\uDDF7',
  CO: '\uD83C\uDDE8\uD83C\uDDF4', HR: '\uD83C\uDDED\uD83C\uDDF7', ES: '\uD83C\uDDEA\uD83C\uDDF8',
  IN: '\uD83C\uDDEE\uD83C\uDDF3', DE: '\uD83C\uDDE9\uD83C\uDDEA', BR: '\uD83C\uDDE7\uD83C\uDDF7',
  CZ: '\uD83C\uDDE8\uD83C\uDDFF', RO: '\uD83C\uDDF7\uD83C\uDDF4', PT: '\uD83C\uDDF5\uD83C\uDDF9',
  AE: '\uD83C\uDDE6\uD83C\uDDEA', KR: '\uD83C\uDDF0\uD83C\uDDF7', GB: '\uD83C\uDDEC\uD83C\uDDE7',
  US: '\uD83C\uDDFA\uD83C\uDDF8', IT: '\uD83C\uDDEE\uD83C\uDDF9', GR: '\uD83C\uDDEC\uD83C\uDDF7',
}

function getCountryFlag(countryName: string | null): string {
  if (!countryName) return '\uD83C\uDF0D'
  // Try to match by name to known ISO codes
  const nameToCode: Record<string, string> = {
    turkey: 'TR', hungary: 'HU', mexico: 'MX', thailand: 'TH', poland: 'PL',
    'costa rica': 'CR', colombia: 'CO', croatia: 'HR', spain: 'ES', india: 'IN',
    germany: 'DE', brazil: 'BR', 'czech republic': 'CZ', romania: 'RO',
    portugal: 'PT', 'united arab emirates': 'AE', 'south korea': 'KR',
    'united kingdom': 'GB', 'united states': 'US', italy: 'IT', greece: 'GR',
  }
  const code = nameToCode[countryName.toLowerCase()]
  return code ? (FLAG_MAP[code] || '\uD83C\uDF0D') : '\uD83C\uDF0D'
}

// =============================================================================
// ENRICHED CLINIC DATA FOR DIRECTORY PAGE
// =============================================================================

export async function getClinicsForCategory(
  categorySlug: string,
  limit: number = 20,
): Promise<CategoryClinicCard[]> {
  const supabase = await createClient()

  // Get category ID
  const category = await getCategoryBySlug(categorySlug)
  if (!category) return []

  // Get clinic IDs in this category
  const { data: clinicCategories } = await supabase
    .from('clinic_categories')
    .select('clinic_id')
    .eq('category_id', category.id)

  if (!clinicCategories || clinicCategories.length === 0) return []

  const clinicIds = clinicCategories.map((cc) => cc.clinic_id)

  // Fetch enriched clinic data
  const { data: clinics, error } = await supabase
    .from('clinics')
    .select(`
      id, name, slug, description, city, country, claimed, accreditations, year_established,
      phone, email, website,
      photos:clinic_photos(url, sort_order),
      google_reviews(rating, review_count, reviews),
      doctors(name, specialisation, years_experience, photo_url),
      clinic_categories(category:categories(name, slug)),
      clinic_procedures(
        price_min, price_max, currency,
        procedure:procedures(name, slug)
      )
    `)
    .in('id', clinicIds)
    .limit(limit * 2)

  if (error || !clinics) {
    console.error('Error fetching enriched clinics for category:', error)
    return []
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformed: CategoryClinicCard[] = clinics.map((clinic: any) => {
    const photos = clinic.photos || []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortedPhotos = [...photos].sort((a: any, b: any) => a.sort_order - b.sort_order)
    const firstPhoto = sortedPhotos[0]?.url || null

    const googleReviews = Array.isArray(clinic.google_reviews)
      ? clinic.google_reviews[0]
      : clinic.google_reviews

    const rating = googleReviews?.rating || 0
    const reviewCount = googleReviews?.review_count || 0

    // Pick first doctor
    const doctors = clinic.doctors || []
    const leadDoctor = doctors[0] || null

    // Pick first Google review
    const reviews = googleReviews?.reviews || []
    const topReview = reviews[0] || null

    // Treatments from clinic_procedures
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const treatments = (clinic.clinic_procedures || []).map((cp: any) => ({
      name: cp.procedure?.name || 'Treatment',
      priceMin: cp.price_min,
      currency: cp.currency || 'EUR',
    }))

    // Tags from categories
    const tags = (clinic.clinic_categories || [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((cc: any) => cc.category)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((cc: any) => cc.category.name)

    const location = [clinic.city, clinic.country].filter(Boolean).join(', ')
    const flag = getCountryFlag(clinic.country)

    return {
      id: clinic.id,
      slug: clinic.slug,
      name: clinic.name,
      location,
      country: clinic.country || '',
      countryCode: '',
      countryFlag: flag,
      rating,
      reviewCount,
      verified: clinic.claimed || false,
      imageUrl: firstPhoto,
      accreditations: clinic.accreditations || [],
      yearEstablished: clinic.year_established,
      description: clinic.description,
      doctor: leadDoctor
        ? {
            name: leadDoctor.name,
            specialty: leadDoctor.specialisation || 'General',
            yearsExperience: leadDoctor.years_experience || 0,
            photoUrl: leadDoctor.photo_url,
          }
        : null,
      review: topReview
        ? {
            text: topReview.text || '',
            authorName: topReview.author_name || 'Patient',
            rating: topReview.rating || 5,
          }
        : null,
      treatments,
      tags,
      contactConfig: {
        whatsappNumber: clinic.phone || undefined,
        smsUsePlatformReply: false,
        email: clinic.email || undefined,
      },
    }
  })

  // Sort by rating descending
  transformed.sort((a, b) => b.rating - a.rating)
  return transformed.slice(0, limit)
}

// =============================================================================
// CATEGORY PAGE STATS
// =============================================================================

export async function getCategoryPageStats(
  categorySlug: string,
): Promise<CategoryPageStats> {
  const supabase = await createClient()

  const category = await getCategoryBySlug(categorySlug)
  if (!category) {
    return { clinicCount: 0, countries: 0, avgRating: 0, patientsHelped: '0' }
  }

  // Get clinic IDs in this category
  const { data: clinicCategories } = await supabase
    .from('clinic_categories')
    .select('clinic_id')
    .eq('category_id', category.id)

  if (!clinicCategories || clinicCategories.length === 0) {
    return { clinicCount: 0, countries: 0, avgRating: 0, patientsHelped: '0' }
  }

  const clinicIds = clinicCategories.map((cc) => cc.clinic_id)

  // Get clinic details for stats
  const { data: clinics } = await supabase
    .from('clinics')
    .select('country, google_reviews(rating)')
    .in('id', clinicIds)

  if (!clinics) {
    return { clinicCount: clinicIds.length, countries: 0, avgRating: 0, patientsHelped: '0' }
  }

  const countries = new Set(clinics.map((c) => c.country).filter(Boolean))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ratings = clinics.map((c: any) => {
    const gr = Array.isArray(c.google_reviews) ? c.google_reviews[0] : c.google_reviews
    return gr?.rating || 0
  }).filter((r: number) => r > 0)

  const avgRating = ratings.length > 0
    ? Math.round((ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length) * 10) / 10
    : 0

  return {
    clinicCount: clinicIds.length,
    countries: countries.size,
    avgRating,
    patientsHelped: `${Math.max(clinicIds.length * 100, 1000).toLocaleString()}+`,
  }
}

// =============================================================================
// COUNTRY FILTERS FOR DIRECTORY
// =============================================================================

export async function getCountryFiltersForCategory(
  categorySlug: string,
): Promise<CountryFilter[]> {
  const supabase = await createClient()

  const category = await getCategoryBySlug(categorySlug)
  if (!category) return []

  const { data: clinicCategories } = await supabase
    .from('clinic_categories')
    .select('clinic_id')
    .eq('category_id', category.id)

  if (!clinicCategories || clinicCategories.length === 0) return []

  const clinicIds = clinicCategories.map((cc) => cc.clinic_id)

  const { data: clinics } = await supabase
    .from('clinics')
    .select('country')
    .in('id', clinicIds)

  if (!clinics) return []

  // Aggregate by country
  const countryMap: Record<string, number> = {}
  for (const c of clinics) {
    if (c.country) {
      countryMap[c.country] = (countryMap[c.country] || 0) + 1
    }
  }

  return Object.entries(countryMap)
    .map(([name, count]) => ({
      name,
      code: name,
      flag: getCountryFlag(name),
      count,
    }))
    .sort((a, b) => b.count - a.count)
}

// =============================================================================
// PRICING DATA FOR CATEGORY
// =============================================================================

export async function getPricingForCategory(
  categorySlug: string,
): Promise<PricingRow[]> {
  const supabase = await createClient()

  const category = await getCategoryBySlug(categorySlug)
  if (!category) return []

  // Get procedures in this category
  const { data: procedures } = await supabase
    .from('procedures')
    .select('id, name')
    .eq('category_id', category.id)

  if (!procedures || procedures.length === 0) return []

  const procIds = procedures.map((p) => p.id)

  // Get pricing from validity matrix
  const { data: destEntries } = await supabase
    .from('destinations')
    .select(`
      procedure_id, price_min_gbp,
      country:countries(name, flag_emoji)
    `)
    .in('procedure_id', procIds)
    .eq('is_valid', true)

  if (!destEntries) return []

  // Build pricing matrix: procedure -> country -> price
  const procNameMap = new Map(procedures.map((p) => [p.id, p.name]))
  const matrix: Record<string, Record<string, { price: number; flag: string }>> = {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const d of destEntries as any[]) {
    if (!d.country || !d.price_min_gbp) continue
    const procName = procNameMap.get(d.procedure_id)
    if (!procName) continue

    if (!matrix[procName]) matrix[procName] = {}
    matrix[procName][d.country.name] = {
      price: d.price_min_gbp,
      flag: d.country.flag_emoji || getCountryFlag(d.country.name),
    }
  }

  return Object.entries(matrix).map(([procedureName, countryPrices]) => ({
    procedureName,
    prices: Object.entries(countryPrices).map(([country, data]) => ({
      country,
      flag: data.flag,
      priceMin: data.price,
      currency: 'GBP',
    })),
  }))
}

// =============================================================================
// RE-EXPORTS for convenience
// =============================================================================

export { getClinicBySlug, type ClinicWithRelations }
export { getClinicsByCategory, getTopDestinationsForCategory }
