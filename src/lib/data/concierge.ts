import { createClient } from '@/lib/supabase/server'

// =============================================================================
// TYPES FOR CONCIERGE RESPONSES
// =============================================================================

export interface ConciergeClinic {
  id: string
  name: string
  slug: string
  city: string | null
  country: string | null
  rating: number | null
  review_count: number | null
  price_range: string | null
  accreditations: string[]
  categories: string[]
  category_slug: string | null
  profile_url: string
}

export interface ConciergeProcedure {
  id: string
  name: string
  slug: string
  description: string | null
  category: string | null
  cost_comparison: Array<{
    country: string
    avg_cost: number
    currency: string
  }>
}

export interface ConciergeDestination {
  id: string
  country_name: string
  country_code: string
  slug: string
  description: string | null
  clinic_count: number
  top_specialties: string[]
}

// =============================================================================
// SEARCH CLINICS
// =============================================================================

export interface SearchClinicsParams {
  procedure?: string
  country?: string
  budget_max?: number
  language?: string
  accreditation?: string
  limit?: number
}

export async function searchClinicsForConcierge(
  params: SearchClinicsParams
): Promise<{ clinics: ConciergeClinic[]; total: number }> {
  const supabase = await createClient()
  const limit = params.limit || 5

  // Build the query
  let query = supabase
    .from('clinics')
    .select(`
      id, name, slug, city, country, accreditations, languages,
      google_reviews(rating, review_count),
      clinic_categories(category:categories(name, slug)),
      clinic_procedures(
        price_min, price_max, currency,
        procedure:procedures(name, slug)
      )
    `, { count: 'exact' })

  // Filter by country
  if (params.country) {
    query = query.ilike('country', `%${params.country}%`)
  }

  // Filter by language
  if (params.language) {
    query = query.contains('languages', [params.language])
  }

  // Filter by accreditation
  if (params.accreditation) {
    query = query.contains('accreditations', [params.accreditation])
  }

  const { data, error, count } = await query.limit(50)

  if (error || !data) {
    console.error('Error searching clinics for concierge:', error)
    return { clinics: [], total: 0 }
  }

  // Transform and filter by procedure and budget client-side
  let clinics: ConciergeClinic[] = data
    .map((clinic) => {
      const googleReviews = Array.isArray(clinic.google_reviews)
        ? clinic.google_reviews[0]
        : clinic.google_reviews

      const categoryEntries = (clinic.clinic_categories || [])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((cc: any) => cc.category)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const categories = categoryEntries.map((cc: any) => cc.category.name)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const firstCat = categoryEntries[0]?.category as any
      const categorySlug: string | null = (Array.isArray(firstCat) ? firstCat[0]?.slug : firstCat?.slug) || null

      const procedures = clinic.clinic_procedures || []

      // Check if clinic offers the requested procedure
      if (params.procedure) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hasProc = procedures.some((cp: any) => {
          const procName = cp.procedure?.name?.toLowerCase() || ''
          const procSlug = cp.procedure?.slug?.toLowerCase() || ''
          const search = params.procedure!.toLowerCase()
          return procName.includes(search) || procSlug.includes(search)
        })
        if (!hasProc) return null
      }

      // Get price range
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const prices = procedures.map((cp: any) => cp.price_min).filter((p: number | null): p is number => p !== null)
      const minPrice = prices.length > 0 ? Math.min(...prices) : null
      const maxPrice = prices.length > 0 ? Math.max(...prices) : null
      const currency = procedures[0]?.currency || 'EUR'

      // Check budget constraint
      if (params.budget_max && minPrice && minPrice > params.budget_max) {
        return null
      }

      const priceRange = minPrice
        ? maxPrice && maxPrice !== minPrice
          ? `${currency === 'EUR' ? '€' : currency}${minPrice.toLocaleString()}-${maxPrice.toLocaleString()}`
          : `From ${currency === 'EUR' ? '€' : currency}${minPrice.toLocaleString()}`
        : null

      return {
        id: clinic.id,
        name: clinic.name,
        slug: clinic.slug,
        city: clinic.city,
        country: clinic.country,
        rating: googleReviews?.rating || null,
        review_count: googleReviews?.review_count || null,
        price_range: priceRange,
        accreditations: clinic.accreditations || [],
        categories,
        category_slug: categorySlug,
        profile_url: categorySlug ? `/clinics/${categorySlug}/${clinic.slug}` : `/clinics/dental/${clinic.slug}`,
      }
    })
    .filter((c): c is ConciergeClinic => c !== null)

  // Sort by rating
  clinics.sort((a, b) => (b.rating || 0) - (a.rating || 0))

  return {
    clinics: clinics.slice(0, limit),
    total: count || clinics.length,
  }
}

// =============================================================================
// GET CLINIC DETAILS
// =============================================================================

export async function getClinicDetailsForConcierge(
  clinicSlug: string
): Promise<{
  clinic: {
    id: string
    name: string
    slug: string
    description: string | null
    city: string | null
    country: string | null
    address: string | null
    year_established: number | null
    languages: string[]
    accreditations: string[]
    rating: number | null
    review_count: number | null
    doctors: Array<{
      name: string
      title: string | null
      specialisation: string | null
      years_experience: number | null
    }>
    procedures: Array<{
      name: string
      price_min: number | null
      price_max: number | null
      currency: string
    }>
    profile_url: string
  } | null
}> {
  const supabase = await createClient()

  const { data: clinic, error } = await supabase
    .from('clinics')
    .select(`
      id, name, slug, description, city, country, address,
      year_established, languages, accreditations,
      doctors(name, title, specialisation, years_experience),
      google_reviews(rating, review_count),
      clinic_categories(category:categories(slug)),
      clinic_procedures(
        price_min, price_max, currency,
        procedure:procedures(name)
      )
    `)
    .eq('slug', clinicSlug)
    .single()

  if (error || !clinic) {
    console.error('Error fetching clinic details for concierge:', error)
    return { clinic: null }
  }

  const googleReviews = Array.isArray(clinic.google_reviews)
    ? clinic.google_reviews[0]
    : clinic.google_reviews

  return {
    clinic: {
      id: clinic.id,
      name: clinic.name,
      slug: clinic.slug,
      description: clinic.description,
      city: clinic.city,
      country: clinic.country,
      address: clinic.address,
      year_established: clinic.year_established,
      languages: clinic.languages || [],
      accreditations: clinic.accreditations || [],
      rating: googleReviews?.rating || null,
      review_count: googleReviews?.review_count || null,
      doctors: (clinic.doctors || []).map((d) => ({
        name: d.name,
        title: d.title,
        specialisation: d.specialisation,
        years_experience: d.years_experience,
      })),
      procedures: (clinic.clinic_procedures || []).map((cp) => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name: (cp.procedure as any)?.name || 'Unknown',
        price_min: cp.price_min,
        price_max: cp.price_max,
        currency: cp.currency,
      })),
      profile_url: (() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cats = (clinic.clinic_categories || []) as any[]
        const catSlug = cats[0]?.category?.slug || 'dental'
        return `/clinics/${catSlug}/${clinic.slug}`
      })(),
    },
  }
}

// =============================================================================
// GET PROCEDURE INFO
// =============================================================================

export async function getProcedureInfoForConcierge(
  procedureSlug: string
): Promise<{ procedure: ConciergeProcedure | null }> {
  const supabase = await createClient()

  const { data: procedure, error } = await supabase
    .from('procedures')
    .select(`
      id, name, slug, description, avg_costs,
      category:categories(name)
    `)
    .eq('slug', procedureSlug)
    .single()

  if (error || !procedure) {
    console.error('Error fetching procedure for concierge:', error)
    return { procedure: null }
  }

  // Also get actual costs from clinic_procedures
  const { data: clinicProcedures } = await supabase
    .from('clinic_procedures')
    .select(`
      price_min, currency,
      clinic:clinics(country)
    `)
    .eq('procedure_id', procedure.id)

  // Aggregate by country
  const countryPrices: Record<string, { prices: number[]; currency: string }> = {}

  if (clinicProcedures) {
    clinicProcedures.forEach((cp) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const country = (cp.clinic as any)?.country
      if (!country || !cp.price_min) return

      if (!countryPrices[country]) {
        countryPrices[country] = { prices: [], currency: cp.currency }
      }
      countryPrices[country].prices.push(cp.price_min)
    })
  }

  const costComparison = Object.entries(countryPrices)
    .map(([country, data]) => ({
      country,
      avg_cost: Math.round(data.prices.reduce((a, b) => a + b, 0) / data.prices.length),
      currency: data.currency,
    }))
    .sort((a, b) => a.avg_cost - b.avg_cost)

  return {
    procedure: {
      id: procedure.id,
      name: procedure.name,
      slug: procedure.slug,
      description: procedure.description,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      category: (procedure.category as any)?.name || null,
      cost_comparison: costComparison,
    },
  }
}

// =============================================================================
// GET DESTINATION INFO
// =============================================================================

export async function getDestinationInfoForConcierge(
  countrySlug: string
): Promise<{ destination: ConciergeDestination | null }> {
  const supabase = await createClient()

  const { data: destination, error } = await supabase
    .from('destinations')
    .select('*')
    .eq('slug', countrySlug)
    .single()

  if (error || !destination) {
    console.error('Error fetching destination for concierge:', error)
    return { destination: null }
  }

  // Get clinic count
  const { count: clinicCount } = await supabase
    .from('clinics')
    .select('*', { count: 'exact', head: true })
    .ilike('country', `%${destination.country_name}%`)

  // Get top specialties
  const { data: clinics } = await supabase
    .from('clinics')
    .select(`
      clinic_categories(category:categories(name))
    `)
    .ilike('country', `%${destination.country_name}%`)

  const categoryCount: Record<string, number> = {}

  if (clinics) {
    clinics.forEach((clinic) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (clinic.clinic_categories || []).forEach((cc: any) => {
        const catName = cc.category?.name
        if (catName) {
          categoryCount[catName] = (categoryCount[catName] || 0) + 1
        }
      })
    })
  }

  const topSpecialties = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name]) => name)

  return {
    destination: {
      id: destination.id,
      country_name: destination.country_name,
      country_code: destination.country_code,
      slug: destination.slug,
      description: destination.description,
      clinic_count: clinicCount || 0,
      top_specialties: topSpecialties,
    },
  }
}

// =============================================================================
// ANALYTICS
// =============================================================================

export interface ConciergeSessionData {
  session_id: string
  user_id?: string
  mode: 'voice' | 'text'
  turns: number
  clinics_recommended: string[]
  resulted_in_enquiry: boolean
  started_at: string
  ended_at?: string
}

export async function createConciergeSession(
  sessionId: string,
  mode: 'voice' | 'text',
  userId?: string
): Promise<{ success: boolean }> {
  const supabase = await createClient()

  const { error } = await supabase.from('concierge_sessions').insert({
    session_id: sessionId,
    user_id: userId || null,
    mode,
    turns: 0,
    clinics_recommended: [],
    resulted_in_enquiry: false,
    started_at: new Date().toISOString(),
  })

  if (error) {
    console.error('Error creating concierge session:', error)
    return { success: false }
  }

  return { success: true }
}

export async function updateConciergeSession(
  sessionId: string,
  updates: Partial<{
    turns: number
    clinics_recommended: string[]
    resulted_in_enquiry: boolean
    ended_at: string
  }>
): Promise<{ success: boolean }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('concierge_sessions')
    .update(updates)
    .eq('session_id', sessionId)

  if (error) {
    console.error('Error updating concierge session:', error)
    return { success: false }
  }

  return { success: true }
}
