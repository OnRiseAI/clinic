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

  const { data: clinic, error } = await supabase
    .from('clinics')
    .select(`
      *,
      photos:clinic_photos(id, url, alt_text, sort_order),
      doctors(id, name, title, specialisation, qualifications, years_experience, languages, photo_url, bio),
      clinic_procedures(
        id, price_min, price_max, currency,
        procedure:procedures(id, name, slug, category_id)
      ),
      clinic_categories(
        id,
        category:categories(id, name, slug, icon)
      ),
      google_reviews(id, rating, review_count, reviews, last_fetched)
    `)
    .eq('slug', slug)
    .single()

  if (error || !clinic) {
    console.error('Error fetching clinic:', error)
    return null
  }

  // Sort photos by sort_order
  if (clinic.photos) {
    clinic.photos.sort((a: ClinicPhoto, b: ClinicPhoto) => a.sort_order - b.sort_order)
  }

  // google_reviews comes as an array from the query, take first item
  const googleReviews = Array.isArray(clinic.google_reviews)
    ? clinic.google_reviews[0] || null
    : clinic.google_reviews

  return {
    ...clinic,
    google_reviews: googleReviews,
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

  let query = supabase
    .from('clinics')
    .select(`
      id, name, slug, city, country, claimed, featured, accreditations,
      photos:clinic_photos(url, sort_order),
      google_reviews(rating, review_count),
      clinic_categories(category:categories(name, slug)),
      clinic_procedures(price_min, currency)
    `)
    .neq('id', clinicId)
    .limit(limit)

  if (country) {
    query = query.eq('country', country)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching similar clinics:', error)
    return []
  }

  return data.map(transformClinicToCardData)
}

export interface SearchFilters {
  query?: string
  country?: string
  category?: string
  procedure?: string
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

  let query = supabase
    .from('clinics')
    .select(`
      id, name, slug, city, country, claimed, featured, accreditations, languages,
      photos:clinic_photos(url, sort_order),
      google_reviews(rating, review_count),
      clinic_categories(category:categories(name, slug)),
      clinic_procedures(price_min, price_max, currency, procedure:procedures(slug))
    `, { count: 'exact' })

  // Apply filters
  if (filters.query) {
    query = query.or(`name.ilike.%${filters.query}%,city.ilike.%${filters.query}%,country.ilike.%${filters.query}%`)
  }

  if (filters.country) {
    query = query.ilike('country', `%${filters.country}%`)
  }

  if (filters.accreditations && filters.accreditations.length > 0) {
    query = query.overlaps('accreditations', filters.accreditations)
  }

  if (filters.languages && filters.languages.length > 0) {
    query = query.overlaps('languages', filters.languages)
  }

  // Sorting
  switch (filters.sortBy) {
    case 'rating':
      // Will need to sort client-side due to nested relation
      break
    case 'price_asc':
    case 'price_desc':
      // Will need to sort client-side due to nested relation
      break
    default:
      query = query.order('featured', { ascending: false }).order('name')
  }

  // Pagination
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query

  if (error) {
    console.error('Error searching clinics:', error)
    return { clinics: [], total: 0, page, totalPages: 0 }
  }

  let clinics = data.map(transformClinicToCardData)

  // Apply category/procedure filters client-side (due to nested relations)
  if (filters.category) {
    clinics = clinics.filter((c) =>
      c.categories.some((cat) => cat.slug === filters.category)
    )
  }

  // Apply rating filter client-side
  if (filters.minRating) {
    clinics = clinics.filter(
      (c) => c.google_rating && c.google_rating >= filters.minRating!
    )
  }

  // Apply price filters client-side
  if (filters.minPrice !== undefined) {
    clinics = clinics.filter(
      (c) => c.starting_price && c.starting_price >= filters.minPrice!
    )
  }
  if (filters.maxPrice !== undefined) {
    clinics = clinics.filter(
      (c) => c.starting_price && c.starting_price <= filters.maxPrice!
    )
  }

  // Client-side sorting for rating and price
  if (filters.sortBy === 'rating') {
    clinics.sort((a, b) => (b.google_rating || 0) - (a.google_rating || 0))
  } else if (filters.sortBy === 'price_asc') {
    clinics.sort((a, b) => (a.starting_price || 999999) - (b.starting_price || 999999))
  } else if (filters.sortBy === 'price_desc') {
    clinics.sort((a, b) => (b.starting_price || 0) - (a.starting_price || 0))
  }

  const total = count || 0

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

  return {
    id: clinic.id,
    name: clinic.name,
    slug: clinic.slug,
    city: clinic.city,
    country: clinic.country,
    claimed: clinic.claimed,
    featured: clinic.featured,
    accreditations: clinic.accreditations || [],
    first_photo: firstPhoto,
    google_rating: googleReviews?.rating || null,
    google_review_count: googleReviews?.review_count || null,
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
    .from('destinations')
    .select('id, country_name, country_code, slug')
    .order('country_name')

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
  const { data, error } = await supabase
    .from('clinics')
    .select(`
      id, name, slug, city, country, claimed, featured, accreditations,
      photos:clinic_photos(url, sort_order),
      google_reviews(rating, review_count),
      clinic_categories(category:categories(name, slug)),
      clinic_procedures(price_min, price_max, currency)
    `)
    .limit(50)
  // Fetch more to sort

  if (error) {
    console.error('Error fetching featured clinics:', error)
    return []
  }

  const clinics = data.map(transformClinicToCardData)
  // Sort by rating desc
  clinics.sort((a, b) => (b.google_rating || 0) - (a.google_rating || 0))
  return clinics.slice(0, limit)
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
