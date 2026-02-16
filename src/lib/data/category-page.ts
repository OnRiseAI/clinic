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
  primaryCategorySlug: string
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
  // flag is now ISO code
  prices: Array<{ country: string; flag: string; priceMin: number; currency: string }>
}

function getCountryFlag(countryName: string | null): string {
  if (!countryName) return 'UNKNOWN'
  // Try to match by name to known ISO codes
  const nameToCode: Record<string, string> = {
    turkey: 'TR', hungary: 'HU', mexico: 'MX', thailand: 'TH', poland: 'PL',
    'costa rica': 'CR', colombia: 'CO', croatia: 'HR', spain: 'ES', india: 'IN',
    germany: 'DE', brazil: 'BR', 'czech republic': 'CZ', romania: 'RO',
    portugal: 'PT', 'united arab emirates': 'AE', 'south korea': 'KR',
    'united kingdom': 'GB', 'united states': 'US', italy: 'IT', greece: 'GR',
  }
  const code = nameToCode[countryName.toLowerCase()]
  return code || 'UNKNOWN'
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

  // Fetch clinics with direct FKs
  const { data: clinics, error } = await supabase
    .from('clinics')
    .select(`
      id, name, slug, description, website_url, phone, email,
      is_claimed, is_featured, year_founded,
      city:cities(name),
      country:countries(name),
      clinic_reviews_summary(rating, review_count),
      doctors:clinic_doctors(name, specialty, years_experience, photo_url),
      clinic_accreditations(accreditation_name),
      clinic_media(url, sort_order, media_type),
      clinic_procedures(
        price_min, price_max, price_currency_original,
        procedure:procedures(name, slug)
      )
    `)
    .in('id', clinicIds)
    .limit(limit * 2)

  if (error || !clinics) {
    console.error('Error fetching enriched clinics for category:', error)
    return []
  }

  // Fetch non-FK relations in parallel
  const [
    { data: allClinicCategories },
    { data: allGoogleReviews },
  ] = await Promise.all([
    supabase
      .from('clinic_categories')
      .select('clinic_id, category:categories(name, slug)')
      .in('clinic_id', clinicIds),
    supabase
      .from('google_reviews')
      .select('clinic_id, rating, review_count, reviews')
      .in('clinic_id', clinicIds),
  ])

  // Create lookups
  const catMap: Record<string, any[]> = {}
    ; (allClinicCategories || []).forEach((cc: any) => {
      if (!catMap[cc.clinic_id]) catMap[cc.clinic_id] = []
      catMap[cc.clinic_id].push(cc)
    })

  const grMap: Record<string, any> = {}
    ; (allGoogleReviews || []).forEach((gr: any) => {
      grMap[gr.clinic_id] = gr
    })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformed: CategoryClinicCard[] = clinics.map((clinic: any) => {
    const photos = (clinic.clinic_media || []).filter((m: any) => m.media_type === 'image' || !m.media_type)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortedPhotos = [...photos].sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
    const firstPhoto = sortedPhotos[0]?.url || null

    const googleReviews = grMap[clinic.id] || null
    const reviewSummary = Array.isArray(clinic.clinic_reviews_summary)
      ? clinic.clinic_reviews_summary[0]
      : clinic.clinic_reviews_summary

    const rating = googleReviews?.rating || reviewSummary?.rating || 0
    const reviewCount = googleReviews?.review_count || reviewSummary?.review_count || 0

    const reviews = googleReviews?.reviews || []
    const topReview = Array.isArray(reviews) ? reviews[0] : null

    // Pick first doctor
    const doctorsList = clinic.doctors || []
    const leadDoctor = doctorsList[0] || null

    // Treatments from clinic_procedures
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const treatments = (clinic.clinic_procedures || []).map((cp: any) => ({
      name: cp.procedure?.name || 'Treatment',
      priceMin: cp.price_min,
      currency: cp.price_currency_original || 'EUR',
    }))

    const countryName = clinic.country?.name || ''
    const cityName = clinic.city?.name || ''
    const location = [cityName, countryName].filter(Boolean).join(', ')
    const flag = getCountryFlag(countryName)

    // Tags from categories
    const catEntries = (catMap[clinic.id] || [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((cc: any) => cc.category)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tags = catEntries.map((cc: any) => cc.category.name)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const primaryCategorySlug = catEntries[0]?.category?.slug || 'dental'

    const accreditations = (clinic.clinic_accreditations || []).map((a: any) => a.accreditation_name)

    return {
      id: clinic.id,
      slug: clinic.slug,
      name: clinic.name,
      location,
      country: countryName,
      countryCode: '',
      countryFlag: flag, // This is now the ISO code due to getCountryFlag update
      rating,
      reviewCount,
      verified: clinic.is_claimed || false,
      imageUrl: firstPhoto,
      accreditations: accreditations,
      yearEstablished: clinic.year_founded,
      description: clinic.description,
      doctor: leadDoctor
        ? {
          name: leadDoctor.name,
          specialty: leadDoctor.specialty || 'General',
          yearsExperience: leadDoctor.years_experience || 0,
          photoUrl: leadDoctor.photo_url,
        }
        : null,
      review: topReview
        ? {
          text: topReview.text || topReview.content || '',
          authorName: topReview.author_name || 'Patient',
          rating: topReview.rating || 5,
        }
        : null,
      treatments,
      tags,
      primaryCategorySlug,
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
    .select('country:countries(name), clinic_reviews_summary(rating)')
    .in('id', clinicIds)

  // Fetch google ratings separately
  const { data: googleRatings } = await supabase
    .from('google_reviews')
    .select('clinic_id, rating')
    .in('clinic_id', clinicIds)

  if (!clinics) {
    return { clinicCount: clinicIds.length, countries: 0, avgRating: 0, patientsHelped: '0' }
  }

  const grMap: Record<string, number> = {}
    ; (googleRatings || []).forEach(gr => { grMap[gr.clinic_id] = gr.rating })

  const countries = new Set(clinics.map((c: any) => c.country?.name).filter(Boolean))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ratingsList = (clinics as any[]).map((c: any) => {
    const grRating = grMap[c.id] || 0
    const rs = Array.isArray(c.clinic_reviews_summary) ? c.clinic_reviews_summary[0] : c.clinic_reviews_summary
    return grRating || rs?.rating || 0
  }).filter((r: number) => r > 0)

  const avgRating = ratingsList.length > 0
    ? Math.round((ratingsList.reduce((a: number, b: number) => a + b, 0) / ratingsList.length) * 10) / 10
    : 4.8

  return {
    clinicCount: clinicIds.length,
    countries: countries.size,
    avgRating,
    patientsHelped: `${(clinicIds.length * 45).toLocaleString()}+`,
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
    .select('country:countries(name)')
    .in('id', clinicIds)

  if (!clinics) return []

  // Aggregate by country
  const countryMap: Record<string, number> = {}
  for (const c of clinics as any[]) {
    const cName = c.country?.name
    if (cName) {
      countryMap[cName] = (countryMap[cName] || 0) + 1
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
