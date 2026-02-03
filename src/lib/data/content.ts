import { createClient } from '@/lib/supabase/server'
import type { ClinicCardData } from './clinics'

// =============================================================================
// TYPES
// =============================================================================

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  meta_title: string | null
  meta_description: string | null
}

export interface Procedure {
  id: string
  name: string
  slug: string
  description: string | null
  category_id: string | null
  avg_costs: Record<string, { min: number; max: number; currency: string }> | null
  meta_title: string | null
  meta_description: string | null
  category?: Category | null
}

export interface Destination {
  id: string
  country_name: string
  country_code: string
  slug: string
  description: string | null
  meta_title: string | null
  meta_description: string | null
  hero_image_url: string | null
}

export interface ProcedureWithStats extends Procedure {
  clinic_count: number
  starting_price: number | null
  price_currency: string
}

export interface DestinationWithStats extends Destination {
  clinic_count: number
  top_categories: string[]
}

export interface CostComparisonData {
  country: string
  country_code: string
  avg_cost: number
  currency: string
  clinic_count: number
  savings_vs_uk: number
  savings_vs_us: number
}

// =============================================================================
// CATEGORY DATA FETCHING
// =============================================================================

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching category:', error)
    return null
  }

  return data
}

export async function getProceduresByCategory(categoryId: string): Promise<ProcedureWithStats[]> {
  const supabase = await createClient()

  const { data: procedures, error } = await supabase
    .from('procedures')
    .select(`
      *,
      clinic_procedures(price_min, currency)
    `)
    .eq('category_id', categoryId)

  if (error) {
    console.error('Error fetching procedures by category:', error)
    return []
  }

  return procedures.map((proc) => {
    const clinicProcs = proc.clinic_procedures || []
    const prices = clinicProcs
      .map((cp: { price_min: number | null }) => cp.price_min)
      .filter((p: number | null): p is number => p !== null)

    return {
      ...proc,
      clinic_count: clinicProcs.length,
      starting_price: prices.length > 0 ? Math.min(...prices) : null,
      price_currency: clinicProcs[0]?.currency || 'EUR',
    }
  })
}

export async function getClinicsByCategory(
  categorySlug: string,
  limit: number = 8
): Promise<ClinicCardData[]> {
  const supabase = await createClient()

  // First get the category ID
  const { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single()

  if (!category) return []

  // Get clinic IDs that have this category
  const { data: clinicCategories } = await supabase
    .from('clinic_categories')
    .select('clinic_id')
    .eq('category_id', category.id)

  if (!clinicCategories || clinicCategories.length === 0) return []

  const clinicIds = clinicCategories.map((cc) => cc.clinic_id)

  // Fetch clinics
  const { data: clinics, error } = await supabase
    .from('clinics')
    .select(`
      id, name, slug, city, country, claimed, featured, accreditations,
      photos:clinic_photos(url, sort_order),
      google_reviews(rating, review_count),
      clinic_categories(category:categories(name, slug)),
      clinic_procedures(price_min, currency)
    `)
    .in('id', clinicIds)
    .limit(limit * 2) // Fetch more to sort

  if (error || !clinics) {
    console.error('Error fetching clinics by category:', error)
    return []
  }

  const transformed = clinics.map(transformClinicToCardData)
  transformed.sort((a, b) => (b.google_rating || 0) - (a.google_rating || 0))
  return transformed.slice(0, limit)
}

export async function getTopDestinationsForCategory(
  categorySlug: string,
  limit: number = 6
): Promise<DestinationWithStats[]> {
  const supabase = await createClient()

  // Get category ID
  const { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single()

  if (!category) return []

  // Get clinics in this category with their countries
  const { data: clinicCategories } = await supabase
    .from('clinic_categories')
    .select('clinic:clinics(country)')
    .eq('category_id', category.id)

  if (!clinicCategories) return []

  // Count clinics per country
  const countryCount: Record<string, number> = {}
  clinicCategories.forEach((cc) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const country = (cc.clinic as any)?.country
    if (country) {
      countryCount[country] = (countryCount[country] || 0) + 1
    }
  })

  // Get destinations and enrich with counts
  const { data: destinations } = await supabase
    .from('destinations')
    .select('*')

  if (!destinations) return []

  const enriched = destinations
    .map((dest) => ({
      ...dest,
      clinic_count: countryCount[dest.country_name] || 0,
      top_categories: [],
    }))
    .filter((d) => d.clinic_count > 0)
    .sort((a, b) => b.clinic_count - a.clinic_count)
    .slice(0, limit)

  return enriched
}

// =============================================================================
// PROCEDURE DATA FETCHING
// =============================================================================

export async function getProcedureBySlug(slug: string): Promise<Procedure | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('procedures')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching procedure:', error)
    return null
  }

  return data
}

export async function getRelatedProcedures(
  currentProcedureId: string,
  categoryId: string | null,
  limit: number = 6
): Promise<Procedure[]> {
  const supabase = await createClient()

  let query = supabase
    .from('procedures')
    .select(`
      *,
      category:categories(*)
    `)
    .neq('id', currentProcedureId)
    .eq('is_active', true)
    .limit(limit)

  // Prioritize same category
  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching related procedures:', error)
    return []
  }

  return data || []
}

export async function getClinicsByProcedure(
  procedureSlug: string,
  limit: number = 8
): Promise<ClinicCardData[]> {
  const supabase = await createClient()

  // Get procedure ID
  const { data: procedure } = await supabase
    .from('procedures')
    .select('id')
    .eq('slug', procedureSlug)
    .single()

  if (!procedure) return []

  // Get clinic IDs that offer this procedure
  const { data: clinicProcedures } = await supabase
    .from('clinic_procedures')
    .select('clinic_id')
    .eq('procedure_id', procedure.id)

  if (!clinicProcedures || clinicProcedures.length === 0) return []

  const clinicIds = clinicProcedures.map((cp) => cp.clinic_id)

  // Fetch clinics
  const { data: clinics, error } = await supabase
    .from('clinics')
    .select(`
      id, name, slug, city, country, claimed, featured, accreditations,
      photos:clinic_photos(url, sort_order),
      google_reviews(rating, review_count),
      clinic_categories(category:categories(name, slug)),
      clinic_procedures(price_min, currency)
    `)
    .in('id', clinicIds)
    .limit(limit * 2)

  if (error || !clinics) {
    console.error('Error fetching clinics by procedure:', error)
    return []
  }

  const transformed = clinics.map(transformClinicToCardData)
  transformed.sort((a, b) => (b.google_rating || 0) - (a.google_rating || 0))
  return transformed.slice(0, limit)
}

export async function getTopDestinationsForProcedure(
  procedureSlug: string,
  limit: number = 6
): Promise<DestinationWithStats[]> {
  const supabase = await createClient()

  // Get procedure ID
  const { data: procedure } = await supabase
    .from('procedures')
    .select('id')
    .eq('slug', procedureSlug)
    .single()

  if (!procedure) return []

  // Get clinics offering this procedure with their countries
  const { data: clinicProcedures } = await supabase
    .from('clinic_procedures')
    .select('clinic:clinics(country)')
    .eq('procedure_id', procedure.id)

  if (!clinicProcedures) return []

  // Count clinics per country
  const countryCount: Record<string, number> = {}
  clinicProcedures.forEach((cp) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const country = (cp.clinic as any)?.country
    if (country) {
      countryCount[country] = (countryCount[country] || 0) + 1
    }
  })

  // Get destinations
  const { data: destinations } = await supabase
    .from('destinations')
    .select('*')

  if (!destinations) return []

  const enriched = destinations
    .map((dest) => ({
      ...dest,
      clinic_count: countryCount[dest.country_name] || 0,
      top_categories: [],
    }))
    .filter((d) => d.clinic_count > 0)
    .sort((a, b) => b.clinic_count - a.clinic_count)
    .slice(0, limit)

  return enriched
}

export async function getProcedureCostComparison(
  procedureSlug: string
): Promise<CostComparisonData[]> {
  const supabase = await createClient()

  // Get procedure with avg_costs
  const { data: procedure } = await supabase
    .from('procedures')
    .select('id, avg_costs')
    .eq('slug', procedureSlug)
    .single()

  if (!procedure) return []

  // Get clinic_procedures for this procedure with country info
  const { data: clinicProcedures } = await supabase
    .from('clinic_procedures')
    .select(`
      price_min, price_max, currency,
      clinic:clinics(country)
    `)
    .eq('procedure_id', procedure.id)

  if (!clinicProcedures) return []

  // Aggregate by country
  const countryData: Record<string, { prices: number[]; currency: string; count: number }> = {}

  clinicProcedures.forEach((cp) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const country = (cp.clinic as any)?.country
    if (!country) return

    if (!countryData[country]) {
      countryData[country] = { prices: [], currency: cp.currency, count: 0 }
    }

    if (cp.price_min) {
      countryData[country].prices.push(cp.price_min)
    }
    countryData[country].count++
  })

  // Also use avg_costs from procedure if available
  const avgCosts = procedure.avg_costs as Record<string, { min: number; max: number; currency: string }> | null
  if (avgCosts) {
    Object.entries(avgCosts).forEach(([country, data]) => {
      if (!countryData[country]) {
        countryData[country] = { prices: [data.min], currency: data.currency, count: 1 }
      }
    })
  }

  // Get destinations for country codes
  const { data: destinations } = await supabase
    .from('destinations')
    .select('country_name, country_code')

  const countryCodeMap: Record<string, string> = {}
  destinations?.forEach((d) => {
    countryCodeMap[d.country_name] = d.country_code
  })

  // Reference prices (UK and US baselines)
  const UK_BASELINE = 4000 // Example: £4000 for veneers in UK
  const US_BASELINE = 5000 // Example: $5000 for veneers in US

  // Build comparison data
  const comparison: CostComparisonData[] = Object.entries(countryData)
    .map(([country, data]) => {
      const avgCost = data.prices.length > 0
        ? Math.round(data.prices.reduce((a, b) => a + b, 0) / data.prices.length)
        : 0

      return {
        country,
        country_code: countryCodeMap[country] || '',
        avg_cost: avgCost,
        currency: data.currency,
        clinic_count: data.count,
        savings_vs_uk: avgCost > 0 ? Math.round((1 - avgCost / UK_BASELINE) * 100) : 0,
        savings_vs_us: avgCost > 0 ? Math.round((1 - avgCost / US_BASELINE) * 100) : 0,
      }
    })
    .filter((d) => d.avg_cost > 0)
    .sort((a, b) => a.avg_cost - b.avg_cost)

  return comparison
}

// =============================================================================
// DESTINATION DATA FETCHING
// =============================================================================

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching destination:', error)
    return null
  }

  return data
}

export async function getClinicsByCountry(
  countryName: string,
  limit: number = 8
): Promise<ClinicCardData[]> {
  const supabase = await createClient()

  const { data: clinics, error } = await supabase
    .from('clinics')
    .select(`
      id, name, slug, city, country, claimed, featured, accreditations,
      photos:clinic_photos(url, sort_order),
      google_reviews(rating, review_count),
      clinic_categories(category:categories(name, slug)),
      clinic_procedures(price_min, currency)
    `)
    .ilike('country', `%${countryName}%`)
    .limit(limit * 2)

  if (error || !clinics) {
    console.error('Error fetching clinics by country:', error)
    return []
  }

  const transformed = clinics.map(transformClinicToCardData)
  transformed.sort((a, b) => (b.google_rating || 0) - (a.google_rating || 0))
  return transformed.slice(0, limit)
}

export async function getProceduresInCountry(
  countryName: string,
  limit: number = 12
): Promise<ProcedureWithStats[]> {
  const supabase = await createClient()

  // Get clinics in this country
  const { data: clinics } = await supabase
    .from('clinics')
    .select('id')
    .ilike('country', `%${countryName}%`)

  if (!clinics || clinics.length === 0) return []

  const clinicIds = clinics.map((c) => c.id)

  // Get procedures offered by these clinics
  const { data: clinicProcedures } = await supabase
    .from('clinic_procedures')
    .select(`
      procedure_id, price_min, currency,
      procedure:procedures(*)
    `)
    .in('clinic_id', clinicIds)

  if (!clinicProcedures) return []

  // Aggregate by procedure
  const procedureMap: Record<string, { procedure: Procedure; prices: number[]; currency: string; count: number }> = {}

  clinicProcedures.forEach((cp) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const proc = cp.procedure as any
    if (!proc) return

    if (!procedureMap[proc.id]) {
      procedureMap[proc.id] = { procedure: proc, prices: [], currency: cp.currency, count: 0 }
    }

    if (cp.price_min) {
      procedureMap[proc.id].prices.push(cp.price_min)
    }
    procedureMap[proc.id].count++
  })

  return Object.values(procedureMap)
    .map(({ procedure, prices, currency, count }) => ({
      ...procedure,
      clinic_count: count,
      starting_price: prices.length > 0 ? Math.min(...prices) : null,
      price_currency: currency,
    }))
    .sort((a, b) => b.clinic_count - a.clinic_count)
    .slice(0, limit)
}

export async function getDestinationCostComparison(
  countryName: string
): Promise<Array<{ procedure: string; local_cost: number; uk_cost: number; us_cost: number; savings: number }>> {
  const supabase = await createClient()

  // Get clinics in this country
  const { data: clinics } = await supabase
    .from('clinics')
    .select('id')
    .ilike('country', `%${countryName}%`)

  if (!clinics || clinics.length === 0) return []

  const clinicIds = clinics.map((c) => c.id)

  // Get procedures and prices
  const { data: clinicProcedures } = await supabase
    .from('clinic_procedures')
    .select(`
      price_min,
      procedure:procedures(name)
    `)
    .in('clinic_id', clinicIds)

  if (!clinicProcedures) return []

  // Aggregate by procedure
  const procedurePrices: Record<string, number[]> = {}
  clinicProcedures.forEach((cp) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const name = (cp.procedure as any)?.name
    if (!name || !cp.price_min) return

    if (!procedurePrices[name]) {
      procedurePrices[name] = []
    }
    procedurePrices[name].push(cp.price_min)
  })

  // Example baseline costs (would be from a config in production)
  const baselines: Record<string, { uk: number; us: number }> = {
    'Dental Veneers': { uk: 800, us: 1500 },
    'Dental Implants': { uk: 2500, us: 4000 },
    'Hair Transplant': { uk: 8000, us: 15000 },
    'Rhinoplasty': { uk: 6000, us: 10000 },
    'Tummy Tuck': { uk: 7000, us: 12000 },
  }

  return Object.entries(procedurePrices)
    .map(([procedure, prices]) => {
      const avgCost = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
      const baseline = baselines[procedure] || { uk: avgCost * 2, us: avgCost * 2.5 }

      return {
        procedure,
        local_cost: avgCost,
        uk_cost: baseline.uk,
        us_cost: baseline.us,
        savings: Math.round((1 - avgCost / baseline.uk) * 100),
      }
    })
    .sort((a, b) => b.savings - a.savings)
    .slice(0, 6)
}

// =============================================================================
// DESTINATION + PROCEDURE DATA FETCHING
// =============================================================================

export async function getClinicsByCountryAndProcedure(
  countryName: string,
  procedureSlug: string,
  limit: number = 20
): Promise<ClinicCardData[]> {
  const supabase = await createClient()

  // Get procedure ID
  const { data: procedure } = await supabase
    .from('procedures')
    .select('id')
    .eq('slug', procedureSlug)
    .single()

  if (!procedure) return []

  // Get clinic IDs that offer this procedure
  const { data: clinicProcedures } = await supabase
    .from('clinic_procedures')
    .select('clinic_id')
    .eq('procedure_id', procedure.id)

  if (!clinicProcedures || clinicProcedures.length === 0) return []

  const clinicIds = clinicProcedures.map((cp) => cp.clinic_id)

  // Fetch clinics in this country that offer this procedure
  const { data: clinics, error } = await supabase
    .from('clinics')
    .select(`
      id, name, slug, city, country, claimed, featured, accreditations,
      photos:clinic_photos(url, sort_order),
      google_reviews(rating, review_count),
      clinic_categories(category:categories(name, slug)),
      clinic_procedures(price_min, currency)
    `)
    .in('id', clinicIds)
    .ilike('country', `%${countryName}%`)
    .limit(limit)

  if (error || !clinics) {
    console.error('Error fetching clinics by country and procedure:', error)
    return []
  }

  const transformed = clinics.map(transformClinicToCardData)
  transformed.sort((a, b) => (b.google_rating || 0) - (a.google_rating || 0))
  return transformed
}

export async function getDestinationProcedureStats(
  countryName: string,
  procedureSlug: string
): Promise<{ clinic_count: number; avg_cost: number; min_cost: number; max_cost: number; savings_percent: number }> {
  const supabase = await createClient()

  // Get procedure ID
  const { data: procedure } = await supabase
    .from('procedures')
    .select('id')
    .eq('slug', procedureSlug)
    .single()

  if (!procedure) {
    return { clinic_count: 0, avg_cost: 0, min_cost: 0, max_cost: 0, savings_percent: 0 }
  }

  // Get clinics in this country
  const { data: clinics } = await supabase
    .from('clinics')
    .select('id')
    .ilike('country', `%${countryName}%`)

  if (!clinics || clinics.length === 0) {
    return { clinic_count: 0, avg_cost: 0, min_cost: 0, max_cost: 0, savings_percent: 0 }
  }

  const clinicIds = clinics.map((c) => c.id)

  // Get procedure pricing from these clinics
  const { data: clinicProcedures } = await supabase
    .from('clinic_procedures')
    .select('price_min, price_max')
    .eq('procedure_id', procedure.id)
    .in('clinic_id', clinicIds)

  if (!clinicProcedures || clinicProcedures.length === 0) {
    return { clinic_count: 0, avg_cost: 0, min_cost: 0, max_cost: 0, savings_percent: 0 }
  }

  const prices = clinicProcedures
    .map((cp) => cp.price_min)
    .filter((p): p is number => p !== null)

  const avgCost = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0
  const minCost = prices.length > 0 ? Math.min(...prices) : 0
  const maxCost = prices.length > 0 ? Math.max(...prices) : 0

  // Estimate savings vs UK (would come from config in production)
  const UK_BASELINE = avgCost * 2.5
  const savingsPercent = avgCost > 0 ? Math.round((1 - avgCost / UK_BASELINE) * 100) : 0

  return {
    clinic_count: clinicProcedures.length,
    avg_cost: avgCost,
    min_cost: minCost,
    max_cost: maxCost,
    savings_percent: Math.min(savingsPercent, 80), // Cap at 80%
  }
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformClinicToCardData(clinic: any): ClinicCardData {
  const photos = clinic.photos || []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortedPhotos = [...photos].sort((a: any, b: any) => a.sort_order - b.sort_order)
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
    .filter((p: number | null): p is number => p !== null)
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
