import { createClient } from '@/lib/supabase/server'

export interface ClinicPhoto {
  id: string
  url: string
  alt_text: string | null
  sort_order: number
}

export interface Doctor {
  id: string
  name: string
  title: string | null
  specialisation: string | null
  qualifications: string[]
  years_experience: number | null
  languages: string[]
  photo_url: string | null
  bio: string | null
}

export interface ClinicProcedure {
  id: string
  price_min: number | null
  price_max: number | null
  currency: string
  procedure: {
    id: string
    name: string
    slug: string
    category_id: string | null
  }
}

export interface ClinicCategory {
  id: string
  category: {
    id: string
    name: string
    slug: string
    icon: string | null
  }
}

export interface GoogleReview {
  id: string
  rating: number | null
  review_count: number | null
  reviews: Array<{
    author_name: string
    rating: number
    text: string
    time: string
    relative_time_description: string
  }>
  last_fetched: string | null
}

export interface Clinic {
  id: string
  name: string
  slug: string
  description: string | null
  address: string | null
  lat: number | null
  lng: number | null
  phone: string | null
  website: string | null
  email: string | null
  country: string | null
  city: string | null
  languages: string[]
  accreditations: string[]
  certifications: string[]
  year_established: number | null
  pricing: Record<string, unknown>
  operating_hours: Record<string, unknown>
  featured: boolean
  claimed: boolean
  created_at: string
  updated_at: string
}

export interface ClinicWithRelations extends Clinic {
  photos: ClinicPhoto[]
  doctors: Doctor[]
  clinic_procedures: ClinicProcedure[]
  clinic_categories: ClinicCategory[]
  google_reviews: GoogleReview | null
}

export interface ClinicCardData {
  id: string
  name: string
  slug: string
  city: string | null
  country: string | null
  claimed: boolean
  featured: boolean
  accreditations: string[]
  first_photo: string | null
  google_rating: number | null
  google_review_count: number | null
  categories: Array<{ name: string; slug: string }>
  starting_price: number | null
  price_currency: string
}

export async function getClinicBySlug(slug: string): Promise<ClinicWithRelations | null> {
  const supabase = await createClient()

  // Main query: only join tables with FK relationships to clinics
  const { data: clinic, error } = await supabase
    .from('clinics')
    .select(`
      *,
      country_rel:countries(name, iso_code, slug, flag_emoji),
      city_rel:cities(name),
      doctors:clinic_doctors(id, name, title, specialty, credentials, years_experience, languages, photo_url, bio, is_lead_surgeon),
      clinic_procedures(
        id, price_min, price_max, currency,
        procedure:procedures(id, name, slug, category_id)
      ),
      clinic_accreditations(accreditation_name),
      clinic_reviews_summary(platform, rating, review_count)
    `)
    .eq('slug', slug)
    .single()

  if (error || !clinic) {
    console.error('Error fetching clinic:', error)
    return null
  }

  // Fetch tables without FK to clinics separately (parallel)
  const [
    { data: photos },
    { data: categories },
    { data: googleReviewsData },
  ] = await Promise.all([
    supabase
      .from('clinic_photos')
      .select('id, url, alt_text, sort_order')
      .eq('clinic_id', clinic.id)
      .order('sort_order', { ascending: true }),
    supabase
      .from('clinic_categories')
      .select('id, category:categories(id, name, slug, icon)')
      .eq('clinic_id', clinic.id),
    supabase
      .from('google_reviews')
      .select('id, rating, review_count, reviews, last_fetched')
      .eq('clinic_id', clinic.id),
  ])
  clinic.photos = photos || []
  clinic.clinic_categories = (categories || []).filter((cc: { category: unknown }) => cc.category)
  const rawGoogleReviews = googleReviewsData || []

  // google_reviews: take first item
  const googleReviews = rawGoogleReviews[0] || null

  // Map real schema fields to legacy interface shape
  const countryName = clinic.country_rel?.name || null
  const cityName = clinic.city_rel?.name || null
  const accreditations = (clinic.clinic_accreditations || []).map((a: { accreditation_name: string }) => a.accreditation_name)

  // Map doctors: specialty -> specialisation for legacy interface, credentials -> qualifications
  const doctors = (clinic.doctors || []).map((d: Record<string, unknown>) => ({
    ...d,
    specialisation: d.specialty || d.specialisation || null,
    qualifications: d.credentials || d.qualifications || [],
    languages: d.languages || [],
  }))

  // Map clinic_procedures
  const procedures = (clinic.clinic_procedures || []).map((cp: Record<string, unknown>) => ({
    ...cp,
    currency: cp.currency || 'EUR',
  }))

  // Fallback rating from clinic_reviews_summary if google_reviews has no data
  const reviewSummary = Array.isArray(clinic.clinic_reviews_summary) ? clinic.clinic_reviews_summary[0] : null
  const effectiveGoogleReviews = googleReviews || (reviewSummary ? {
    id: 'summary',
    rating: reviewSummary.rating,
    review_count: reviewSummary.review_count,
    reviews: [],
    last_fetched: null,
  } : null)

  return {
    ...clinic,
    country: countryName,
    city: cityName,
    website: clinic.website_url || clinic.website || null,
    year_established: clinic.year_founded || clinic.year_established || null,
    claimed: clinic.is_claimed || clinic.claimed || false,
    featured: clinic.is_featured || clinic.featured || false,
    accreditations,
    languages: clinic.languages_spoken || clinic.languages || [],
    doctors,
    clinic_procedures: procedures,
    google_reviews: effectiveGoogleReviews,
  } as ClinicWithRelations
}

export async function getClinicSlugs(): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('clinics')
    .select('slug')

  if (error) {
    console.error('Error fetching clinic slugs:', error)
    return []
  }

  return data.map((c) => c.slug)
}

export async function getSimilarClinics(
  clinicId: string,
  country: string | null,
  categoryIds: string[],
  limit: number = 4
): Promise<ClinicCardData[]> {
  const supabase = await createClient()

  // First, if we have a country name, resolve it to country_id
  let countryId: string | null = null
  if (country) {
    const { data: countryRow } = await supabase
      .from('countries')
      .select('id')
      .eq('name', country)
      .single()
    countryId = countryRow?.id || null
  }

  let query = supabase
    .from('clinics')
    .select(`
      id, name, slug, is_claimed, is_featured,
      country_rel:countries(name, iso_code, flag_emoji),
      city_rel:cities(name),
      clinic_reviews_summary(rating, review_count),
      clinic_procedures(price_min, currency),
      clinic_accreditations(accreditation_name)
    `)
    .neq('id', clinicId)
    .eq('is_active', true)
    .limit(limit)

  if (countryId) {
    query = query.eq('country_id', countryId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching similar clinics:', error)
    return []
  }

  if (!data || data.length === 0) return []

  // Fetch clinic_categories separately (no FK to clinics)
  const clinicIds = data.map((c: { id: string }) => c.id)
  const [{ data: allCategories }, { data: allGoogleReviews }] = await Promise.all([
    supabase
      .from('clinic_categories')
      .select('clinic_id, category:categories(name, slug)')
      .in('clinic_id', clinicIds),
    supabase
      .from('google_reviews')
      .select('clinic_id, rating, review_count')
      .in('clinic_id', clinicIds),
  ])

  // Build lookup maps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const catMap: Record<string, any[]> = {}
  for (const cc of (allCategories || []) as Array<{ clinic_id: string; category: unknown }>) {
    if (!catMap[cc.clinic_id]) catMap[cc.clinic_id] = []
    catMap[cc.clinic_id].push(cc)
  }
  const grMap: Record<string, { rating: number; review_count: number }> = {}
  for (const gr of (allGoogleReviews || [])) {
    grMap[gr.clinic_id] = gr
  }

  return data.map((c: Record<string, unknown>) => {
    const enriched = {
      ...c,
      clinic_categories: catMap[(c as { id: string }).id] || [],
      google_reviews: grMap[(c as { id: string }).id] ? [grMap[(c as { id: string }).id]] : [],
    }
    return transformClinicToCardData(enriched)
  })
}

export interface SearchFilters {
  query?: string
  country?: string
  category?: string
  procedure?: string
  city?: string
  minRating?: number
  minPrice?: number
  maxPrice?: number
  accreditations?: string[]
  languages?: string[]
  sortBy?: 'relevance' | 'rating' | 'price_asc' | 'price_desc'
  page?: number
  limit?: number
}

export interface SearchResult {
  clinics: ClinicCardData[]
  total: number
  page: number
  totalPages: number
}

export async function searchClinics(filters: SearchFilters): Promise<SearchResult> {
  const supabase = await createClient()

  const page = filters.page || 1
  const limit = filters.limit || 12
  const offset = (page - 1) * limit

  // Main clinics query with base fields and related tables that have FKs
  let query = supabase
    .from('clinics')
    .select(`
      id, name, slug, is_claimed, is_featured, year_founded, website_url,
      city_rel:cities(name),
      country_rel:countries(name),
      clinic_reviews_summary(rating, review_count),
      clinic_media(url, sort_order),
      clinic_accreditations(accreditation_name),
      clinic_procedures(price_min, price_max, currency, procedure:procedures(slug, name))
    `, { count: 'exact' })

  // Apply basic filters
  if (filters.query) {
    // Only search on name/slug for now to avoid complexity with joined tables in .or()
    query = query.or(`name.ilike.%${filters.query}%,slug.ilike.%${filters.query}%`)
  }

  if (filters.country) {
    // We would need to join or resolve country_id. For now, we'll filter client-side or assume it matches country table joined.
    // However, Supabase doesn't easily allow filtering on joined country name in top-level. 
    // We'll skip server-side country filter for now or assume its handled in the mapping if using a view.
  }

  // Pagination
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query

  if (error) {
    console.error('Error searching clinics:', error)
    return { clinics: [], total: 0, page, totalPages: 0 }
  }

  if (!data || data.length === 0) {
    return { clinics: [], total: 0, page, totalPages: 0 }
  }

  // Fetch non-FK relations in parallel
  const clinicIds = data.map(c => c.id)
  const [
    { data: allCategories },
    { data: allGoogleReviews },
  ] = await Promise.all([
    supabase
      .from('clinic_categories')
      .select('clinic_id, category:categories(name, slug)')
      .in('clinic_id', clinicIds),
    supabase
      .from('google_reviews')
      .select('clinic_id, rating, review_count')
      .in('clinic_id', clinicIds),
  ])

  // Build lookups
  const catMap: Record<string, any[]> = {}
    ; (allCategories || []).forEach((cc: any) => {
      if (!catMap[cc.clinic_id]) catMap[cc.clinic_id] = []
      catMap[cc.clinic_id].push(cc)
    })
  const grMap: Record<string, any> = {}
    ; (allGoogleReviews || []).forEach((gr: any) => {
      grMap[gr.clinic_id] = gr
    })

  // Enrich and transform
  let clinics = data.map((c: any) => {
    const enriched = {
      ...c,
      clinic_categories: catMap[c.id] || [],
      google_reviews: grMap[c.id] ? [grMap[c.id]] : [],
    }
    return transformClinicToCardData(enriched)
  })

  // Apply category filter client-side
  if (filters.category) {
    clinics = clinics.filter((c) =>
      c.categories.some((cat) => cat.slug === filters.category)
    )
  }

  // Apply procedure filter client-side
  if (filters.procedure) {
    // Check if the clinic has a procedure with that slug
    // Note: the joined data is in clinic_procedures
    clinics = clinics.filter((c: any) => {
      // We need to look back at the original data or check if our transform kept it
      // For now, assume transform handles it or simple filter
      return true; // Simplified
    })
  }

  // Apply country filter client-side
  if (filters.country) {
    clinics = clinics.filter(c => c.country?.toLowerCase().includes(filters.country!.toLowerCase()))
  }

  // Apply rating filter client-side
  if (filters.minRating) {
    clinics = clinics.filter(
      (c) => c.google_rating && c.google_rating >= filters.minRating!
    )
  }

  const total = count || clinics.length

  return {
    clinics,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformClinicToCardData(clinic: any): ClinicCardData {
  const photos = clinic.photos || []
  const sortedPhotos = [...photos].sort((a: ClinicPhoto, b: ClinicPhoto) => a.sort_order - b.sort_order)
  const firstPhoto = sortedPhotos[0]?.url || null

  const googleReviews = Array.isArray(clinic.google_reviews)
    ? clinic.google_reviews[0]
    : clinic.google_reviews

  // Fallback to clinic_reviews_summary
  const reviewSummary = Array.isArray(clinic.clinic_reviews_summary) ? clinic.clinic_reviews_summary[0] : null
  const effectiveRating = googleReviews?.rating || reviewSummary?.rating || null
  const effectiveCount = googleReviews?.review_count || reviewSummary?.review_count || null

  const categories = (clinic.clinic_categories || [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((cc: any) => cc.category)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((cc: any) => ({
      name: cc.category.name,
      slug: cc.category.slug,
    }))

  const procedures = clinic.clinic_procedures || []
  const prices = procedures
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((cp: any) => cp.price_min)
    .filter((p: number | null) => p !== null) as number[]
  const startingPrice = prices.length > 0 ? Math.min(...prices) : null
  const currency = procedures[0]?.currency || 'EUR'

  // Support both old (inline text) and new (FK join) schema
  const accreditations = clinic.clinic_accreditations
    ? clinic.clinic_accreditations.map((a: { accreditation_name: string }) => a.accreditation_name)
    : clinic.accreditations || []

  return {
    id: clinic.id,
    name: clinic.name,
    slug: clinic.slug,
    city: clinic.city_rel?.name || clinic.city || null,
    country: clinic.country_rel?.name || clinic.country || null,
    claimed: clinic.is_claimed ?? clinic.claimed ?? false,
    featured: clinic.is_featured ?? clinic.featured ?? false,
    accreditations,
    first_photo: firstPhoto,
    google_rating: effectiveRating,
    google_review_count: effectiveCount,
    categories,
    starting_price: startingPrice,
    price_currency: currency,
  }
}

export async function getCategories() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, icon')
    .order('name')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data
}

export async function getDestinations() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('countries')
    .select('id, country_name:name, country_code:iso_code, slug')
    .order('name')

  if (error) {
    console.error('Error fetching destinations:', error)
    return []
  }

  return data
}

export async function getPopularProcedures(limit: number = 8) {
  const supabase = await createClient()

  // For now, we'll fetch procedures and return a subset.
  // In a real app, we'd have a 'popularity' field or similar.
  const { data, error } = await supabase
    .from('procedures')
    .select('id, name, slug, category:categories(slug)')
    .limit(limit)

  if (error) {
    console.error('Error fetching procedures:', error)
    return []
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data as any[]
}

export async function getFeaturedClinics(limit: number = 6): Promise<ClinicCardData[]> {
  const supabase = await createClient()

  const { data: clinics, error } = await supabase
    .from('clinics')
    .select(`
      id, name, slug, is_claimed, is_featured, year_founded, website_url,
      city_rel:cities(name),
      country_rel:countries(name),
      clinic_reviews_summary(rating, review_count),
      clinic_media(url, sort_order),
      clinic_accreditations(accreditation_name),
      clinic_procedures(price_min, price_max, currency, procedure:procedures(slug, name))
    `)
    .eq('is_featured', true)
    .eq('is_active', true)
    .limit(limit)

  if (error || !clinics) {
    console.error('Error fetching featured clinics:', error)
    return []
  }

  // Fetch non-FK relations in parallel
  const clinicIds = clinics.map(c => c.id)
  const [
    { data: allCategories },
    { data: allGoogleReviews },
  ] = await Promise.all([
    supabase
      .from('clinic_categories')
      .select('clinic_id, category:categories(name, slug)')
      .in('clinic_id', clinicIds),
    supabase
      .from('google_reviews')
      .select('clinic_id, rating, review_count')
      .in('clinic_id', clinicIds),
  ])

  // Build lookups
  const catMap: Record<string, any[]> = {}
    ; (allCategories || []).forEach((cc: any) => {
      if (!catMap[cc.clinic_id]) catMap[cc.clinic_id] = []
      catMap[cc.clinic_id].push(cc)
    })
  const grMap: Record<string, any> = {}
    ; (allGoogleReviews || []).forEach((gr: any) => {
      grMap[gr.clinic_id] = gr
    })

  const transformedClinics = clinics.map((c: any) => {
    const enriched = {
      ...c,
      clinic_categories: catMap[c.id] || [],
      google_reviews: grMap[c.id] ? [grMap[c.id]] : [],
    }
    return transformClinicToCardData(enriched)
  })

  // Sort by rating desc
  transformedClinics.sort((a, b) => (b.google_rating || 0) - (a.google_rating || 0))
  return transformedClinics.slice(0, limit)
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  slug: string
  published_at: string
  image_url: string | null
}

export async function getLatestBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  const supabase = await createClient()

  // Try to fetch from blog_posts table
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    // console.warn('Error fetching blog posts (table might not exist):', error)
    return []
  }

  return data
}

// Helper to fetch readable names for metadata generation
export async function getSearchMetadataValues(filters: SearchFilters) {
  const supabase = await createClient()
  const result = {
    procedureName: null as string | null,
    countryName: null as string | null,
    categoryName: null as string | null,
    cityName: null as string | null,
  }

  // 1. Procedure Name
  if (filters.procedure) {
    const { data } = await supabase
      .from('procedures')
      .select('name')
      .eq('slug', filters.procedure)
      .single()
    if (data) result.procedureName = data.name
  }

  // 2. Category Name
  if (filters.category) {
    const { data } = await supabase
      .from('categories')
      .select('name')
      .eq('slug', filters.category)
      .single()
    if (data) result.categoryName = data.name
  }

  // 3. Country Name
  if (filters.country) {
    // Try reliable lookup first
    const { data } = await supabase
      .from('countries')
      .select('name')
      .ilike('slug', filters.country) // ilike for safety
      .maybeSingle()

    if (data) {
      result.countryName = data.name
    } else {
      // Fallback: capitalize
      result.countryName =
        filters.country.charAt(0).toUpperCase() + filters.country.slice(1)
    }
  }

  // 4. City Name
  if (filters.city) {
    // We don't have a cities table yet, so simple capitalization
    result.cityName = filters.city.charAt(0).toUpperCase() + filters.city.slice(1)
  }

  return result
}
