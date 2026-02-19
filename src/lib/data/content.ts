import { createStaticClient } from '@/lib/supabase/static'
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
  // Extended fields from actual schema
  uk_private_cost_min?: number | null
  uk_private_cost_max?: number | null
  us_cost_min?: number | null
  us_cost_max?: number | null
  nhs_wait_weeks?: number | null
  recovery_days_min?: number | null
  recovery_days_max?: number | null
  risk_level?: string | null
  anesthesia_type?: string | null
  is_cosmetic?: boolean | null
  is_elective?: boolean | null
  keywords?: string[] | null
}

// Legacy interface — kept for backwards compatibility with client components
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

// Actual countries table schema
export interface Country {
  id: string
  name: string
  slug: string
  iso_code: string
  region: string | null
  currency: string | null
  currency_symbol: string | null
  language: string | null
  visa_required_uk: boolean | null
  visa_required_us: boolean | null
  flight_time_from_london_hrs: number | null
  healthcare_rating: number | null
  jci_hospitals_count: number | null
  mti_ranking: number | null
  annual_medical_tourists: number | null
  tier: number | null
  specialties: string[] | null
  uk_relevant: boolean | null
  us_relevant: boolean | null
  description: string | null
  meta_title: string | null
  meta_description: string | null
  flag_emoji: string | null
  status: string | null
}

// Validity matrix row (destinations table in live DB)
export interface DestinationEntry {
  id: string
  procedure_id: string
  country_id: string
  city_id: string | null
  price_min_gbp: number | null
  price_max_gbp: number | null
  price_min_usd: number | null
  price_max_usd: number | null
  clinic_count: number
  avg_rating: number | null
  is_valid: boolean
  uk_relevant: boolean
  us_relevant: boolean
  status: string | null
  meta_title: string | null
  meta_description: string | null
  faq_json: unknown | null
  schema_json: unknown | null
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
// ADAPTER: Country → Destination (backwards compatibility)
// =============================================================================

export function countryToDestination(country: Country): Destination {
  return {
    id: country.id,
    country_name: country.name,
    country_code: country.iso_code,
    slug: country.slug,
    description: country.description,
    meta_title: country.meta_title,
    meta_description: country.meta_description,
    hero_image_url: null,
  }
}

// =============================================================================
// COUNTRY DATA FETCHING
// =============================================================================

export async function getAllCountries(): Promise<Country[]> {
  const supabase = createStaticClient()

  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .eq('status', 'published')
    .order('name')

  if (error || !data) {
    console.error('Error fetching countries:', error)
    return []
  }

  return data as Country[]
}

export async function getCountryBySlug(slug: string): Promise<Country | null> {
  const supabase = createStaticClient()

  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    console.error('Error fetching country:', error)
    return null
  }

  return data as Country
}

// =============================================================================
// CATEGORY DATA FETCHING
// =============================================================================

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = createStaticClient()

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

export async function getAllCategories(): Promise<Category[]> {
  const supabase = createStaticClient()

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error || !data) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data
}

export async function getProceduresByCategory(categoryId: string): Promise<ProcedureWithStats[]> {
  const supabase = createStaticClient()

  // Get procedures in this category
  const { data: procedures, error } = await supabase
    .from('procedures')
    .select('*')
    .eq('category_id', categoryId)

  if (error || !procedures) {
    console.error('Error fetching procedures by category:', error)
    return []
  }

  // Get pricing from validity matrix
  const procIds = procedures.map((p) => p.id)
  const { data: destEntries } = await supabase
    .from('destinations')
    .select('procedure_id, price_min_gbp')
    .in('procedure_id', procIds)
    .eq('is_valid', true)

  // Build price map
  const priceMap: Record<string, number[]> = {}
  destEntries?.forEach((d: { procedure_id: string; price_min_gbp: number | null }) => {
    if (!priceMap[d.procedure_id]) priceMap[d.procedure_id] = []
    if (d.price_min_gbp) priceMap[d.procedure_id].push(d.price_min_gbp)
  })

  return procedures.map((proc) => {
    const prices = priceMap[proc.id] || []
    return {
      ...proc,
      clinic_count: prices.length, // number of country offerings
      starting_price: prices.length > 0 ? Math.min(...prices) : null,
      price_currency: 'GBP',
    }
  })
}

export async function getClinicsByCategory(
  categorySlug: string,
  limit: number = 8
): Promise<ClinicCardData[]> {
  const supabase = createStaticClient()

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
    .limit(limit * 2)

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
  const supabase = createStaticClient()

  // Get category ID
  const { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single()

  if (!category) return []

  // Get procedures in this category
  const { data: procs } = await supabase
    .from('procedures')
    .select('id')
    .eq('category_id', category.id)

  if (!procs || procs.length === 0) return []

  const procIds = procs.map((p) => p.id)

  // Get validity matrix entries for these procedures, joined with countries
  const { data: destEntries } = await supabase
    .from('destinations')
    .select(`
      country_id,
      country:countries(*)
    `)
    .in('procedure_id', procIds)
    .eq('is_valid', true)

  if (!destEntries) return []

  // Aggregate by country
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const countryMap: Record<string, { country: any; count: number }> = {}
  destEntries.forEach((d: { country_id: string; country: unknown }) => {
    if (!d.country) return
    const cid = d.country_id
    if (!countryMap[cid]) {
      countryMap[cid] = { country: d.country, count: 0 }
    }
    countryMap[cid].count++
  })

  return Object.values(countryMap)
    .map(({ country, count }) => ({
      ...countryToDestination(country as Country),
      clinic_count: count,
      top_categories: [],
    }))
    .sort((a, b) => b.clinic_count - a.clinic_count)
    .slice(0, limit)
}

// =============================================================================
// PROCEDURE DATA FETCHING
// =============================================================================

export async function getProcedureBySlug(slug: string): Promise<Procedure | null> {
  const supabase = createStaticClient()

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
  const supabase = createStaticClient()

  let query = supabase
    .from('procedures')
    .select(`
      *,
      category:categories(*)
    `)
    .neq('id', currentProcedureId)
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
  const supabase = createStaticClient()

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
  const supabase = createStaticClient()

  // Get procedure ID
  const { data: procedure } = await supabase
    .from('procedures')
    .select('id')
    .eq('slug', procedureSlug)
    .single()

  if (!procedure) return []

  // Get validity matrix entries for this procedure, joined with countries
  const { data: destEntries } = await supabase
    .from('destinations')
    .select(`
      country_id, price_min_gbp,
      country:countries(*)
    `)
    .eq('procedure_id', procedure.id)
    .eq('is_valid', true)

  if (!destEntries) return []

  // Aggregate by country
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const countryMap: Record<string, { country: any; count: number }> = {}
  destEntries.forEach((d: { country_id: string; country: unknown }) => {
    if (!d.country) return
    const cid = d.country_id
    if (!countryMap[cid]) {
      countryMap[cid] = { country: d.country, count: 0 }
    }
    countryMap[cid].count++
  })

  return Object.values(countryMap)
    .map(({ country, count }) => ({
      ...countryToDestination(country as Country),
      clinic_count: count,
      top_categories: [],
    }))
    .sort((a, b) => b.clinic_count - a.clinic_count)
    .slice(0, limit)
}

export async function getProcedureCostComparison(
  procedureSlug: string
): Promise<CostComparisonData[]> {
  const supabase = createStaticClient()

  // Get procedure with UK/US cost baselines
  const { data: procedure } = await supabase
    .from('procedures')
    .select('id, uk_private_cost_min, uk_private_cost_max, us_cost_min, us_cost_max')
    .eq('slug', procedureSlug)
    .single()

  if (!procedure) return []

  // Get validity matrix entries for this procedure with country info
  const { data: destEntries } = await supabase
    .from('destinations')
    .select(`
      price_min_gbp, price_max_gbp, clinic_count,
      country:countries(name, iso_code)
    `)
    .eq('procedure_id', procedure.id)
    .eq('is_valid', true)

  if (!destEntries) return []

  const ukBaseline = Math.round(
    ((procedure.uk_private_cost_min || 0) + (procedure.uk_private_cost_max || 0)) / 2
  ) || 5000
  const usBaseline = Math.round(
    ((procedure.us_cost_min || 0) + (procedure.us_cost_max || 0)) / 2
  ) || 8000

  return destEntries
    .filter((d: { country: unknown; price_min_gbp: number | null }) => d.country && d.price_min_gbp)
    .map((d: { price_min_gbp: number | null; price_max_gbp: number | null; clinic_count: number; country: unknown }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const country = d.country as any
      const avgCost = Math.round(((d.price_min_gbp || 0) + (d.price_max_gbp || 0)) / 2)

      return {
        country: country.name,
        country_code: country.iso_code,
        avg_cost: avgCost,
        currency: 'GBP',
        clinic_count: d.clinic_count || 0,
        savings_vs_uk: ukBaseline > 0 ? Math.round((1 - avgCost / ukBaseline) * 100) : 0,
        savings_vs_us: usBaseline > 0 ? Math.round((1 - avgCost / usBaseline) * 100) : 0,
      }
    })
    .filter((d) => d.avg_cost > 0 && d.savings_vs_uk > 0)
    .sort((a, b) => a.avg_cost - b.avg_cost)
}

// =============================================================================
// DESTINATION DATA FETCHING (uses countries table via adapter)
// =============================================================================

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const country = await getCountryBySlug(slug)
  if (!country) return null
  return countryToDestination(country)
}

export async function getClinicsByCountry(
  countrySlug: string,
  limit: number = 8
): Promise<ClinicCardData[]> {
  const supabase = createStaticClient()

  // Get country name for matching against clinics table
  const country = await getCountryBySlug(countrySlug)
  if (!country) return []

  const { data: clinics, error } = await supabase
    .from('clinics')
    .select(`
      id, name, slug, city, country, claimed, featured, accreditations,
      photos:clinic_photos(url, sort_order),
      google_reviews(rating, review_count),
      clinic_categories(category:categories(name, slug)),
      clinic_procedures(price_min, currency)
    `)
    .ilike('country', `%${country.name}%`)
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
  countrySlug: string,
  limit: number = 12
): Promise<ProcedureWithStats[]> {
  const supabase = createStaticClient()

  // Get country ID
  const { data: country } = await supabase
    .from('countries')
    .select('id')
    .eq('slug', countrySlug)
    .single()

  if (!country) return []

  // Query validity matrix joined with procedures
  const { data: destEntries, error } = await supabase
    .from('destinations')
    .select(`
      price_min_gbp, price_max_gbp, clinic_count,
      procedure:procedures(*)
    `)
    .eq('country_id', country.id)
    .eq('is_valid', true)

  if (error || !destEntries) {
    console.error('Error fetching procedures in country:', error)
    return []
  }

  return destEntries
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((d: any) => d.procedure)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((d: any) => ({
      ...d.procedure,
      clinic_count: d.clinic_count || 0,
      starting_price: d.price_min_gbp,
      price_currency: 'GBP',
    }))
    .sort((a: ProcedureWithStats, b: ProcedureWithStats) =>
      (b.clinic_count || 0) - (a.clinic_count || 0)
    )
    .slice(0, limit)
}

export async function getDestinationCostComparison(
  countrySlug: string
): Promise<Array<{ procedure: string; local_cost: number; uk_cost: number; us_cost: number; savings: number }>> {
  const supabase = createStaticClient()

  const { data: country } = await supabase
    .from('countries')
    .select('id')
    .eq('slug', countrySlug)
    .single()

  if (!country) return []

  // Get validity matrix entries with procedure UK/US pricing
  const { data: destEntries } = await supabase
    .from('destinations')
    .select(`
      price_min_gbp, price_max_gbp,
      procedure:procedures(name, uk_private_cost_min, uk_private_cost_max, us_cost_min, us_cost_max)
    `)
    .eq('country_id', country.id)
    .eq('is_valid', true)

  if (!destEntries) return []

  return destEntries
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((d: any) => d.procedure && d.price_min_gbp)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((d: any) => {
      const localAvg = Math.round(((d.price_min_gbp || 0) + (d.price_max_gbp || 0)) / 2)
      const ukAvg = Math.round(
        ((d.procedure.uk_private_cost_min || 0) + (d.procedure.uk_private_cost_max || 0)) / 2
      )
      const usAvg = Math.round(
        ((d.procedure.us_cost_min || 0) + (d.procedure.us_cost_max || 0)) / 2
      )
      return {
        procedure: d.procedure.name,
        local_cost: localAvg,
        uk_cost: ukAvg || localAvg * 2.5,
        us_cost: usAvg || localAvg * 3,
        savings: ukAvg > 0 ? Math.round((1 - localAvg / ukAvg) * 100) : 60,
      }
    })
    .filter((d) => d.savings > 0)
    .sort((a, b) => b.savings - a.savings)
    .slice(0, 8)
}

// =============================================================================
// DESTINATION + PROCEDURE DATA FETCHING
// =============================================================================

export async function getClinicsByCountryAndProcedure(
  countrySlug: string,
  procedureSlug: string,
  limit: number = 20
): Promise<ClinicCardData[]> {
  const supabase = createStaticClient()

  // Get country name and procedure ID
  const [country, procedureData] = await Promise.all([
    getCountryBySlug(countrySlug),
    supabase.from('procedures').select('id').eq('slug', procedureSlug).single(),
  ])

  if (!country || !procedureData.data) return []

  // Get clinic IDs that offer this procedure
  const { data: clinicProcedures } = await supabase
    .from('clinic_procedures')
    .select('clinic_id')
    .eq('procedure_id', procedureData.data.id)

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
    .ilike('country', `%${country.name}%`)
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
  countrySlug: string,
  procedureSlug: string
): Promise<{ clinic_count: number; avg_cost: number; min_cost: number; max_cost: number; savings_percent: number }> {
  const supabase = createStaticClient()
  const DEFAULT = { clinic_count: 0, avg_cost: 0, min_cost: 0, max_cost: 0, savings_percent: 0 }

  const [countryResult, procedureResult] = await Promise.all([
    supabase.from('countries').select('id').eq('slug', countrySlug).single(),
    supabase.from('procedures').select('id, uk_private_cost_min, uk_private_cost_max').eq('slug', procedureSlug).single(),
  ])

  if (!countryResult.data || !procedureResult.data) return DEFAULT

  const { data: dest } = await supabase
    .from('destinations')
    .select('price_min_gbp, price_max_gbp, clinic_count')
    .eq('country_id', countryResult.data.id)
    .eq('procedure_id', procedureResult.data.id)
    .eq('is_valid', true)
    .single()

  if (!dest) return DEFAULT

  const minCost = dest.price_min_gbp || 0
  const maxCost = dest.price_max_gbp || 0
  const avgCost = Math.round((minCost + maxCost) / 2)
  const ukBaseline = Math.round(
    ((procedureResult.data.uk_private_cost_min || 0) + (procedureResult.data.uk_private_cost_max || 0)) / 2
  )
  const savingsPercent = ukBaseline > 0
    ? Math.round((1 - avgCost / ukBaseline) * 100)
    : 60

  return {
    clinic_count: dest.clinic_count || 0,
    avg_cost: avgCost,
    min_cost: minCost,
    max_cost: maxCost,
    savings_percent: Math.min(Math.max(savingsPercent, 0), 90),
  }
}

// =============================================================================
// PROCEDURE COST GUIDE DATA
// =============================================================================

export interface ProcedureCostGuideData {
  procedure: Procedure
  category: Category | null
  destinations: Array<{
    country_name: string
    country_code: string
    country_slug: string
    flag_emoji: string | null
    price_min: number
    price_max: number
    price_avg: number
    savings_vs_uk: number
    savings_vs_us: number
    flight_hours: number | null
  }>
  uk_private_cost_min: number
  uk_private_cost_max: number
  us_cost_min: number
  us_cost_max: number
}

export async function getProcedureCostGuideData(procedureSlug: string): Promise<ProcedureCostGuideData | null> {
  const supabase = createStaticClient()

  const { data: procedure } = await supabase
    .from('procedures')
    .select('*, category:categories(*)')
    .eq('slug', procedureSlug)
    .single()

  if (!procedure) return null

  const { data: destEntries } = await supabase
    .from('destinations')
    .select(`
      price_min_gbp, price_max_gbp,
      country:countries(name, iso_code, slug, flag_emoji, flight_time_from_london_hrs)
    `)
    .eq('procedure_id', procedure.id)
    .eq('is_valid', true)

  const destinations = (destEntries || [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((d: any) => d.country && d.price_min_gbp)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((d: any) => {
      const priceMin = d.price_min_gbp || 0
      const priceMax = d.price_max_gbp || priceMin
      const priceAvg = Math.round((priceMin + priceMax) / 2)
      const ukAvg = Math.round(((procedure.uk_private_cost_min || 0) + (procedure.uk_private_cost_max || 0)) / 2)
      const usAvg = Math.round(((procedure.us_cost_min || 0) + (procedure.us_cost_max || 0)) / 2)

      return {
        country_name: d.country.name,
        country_code: d.country.iso_code,
        country_slug: d.country.slug,
        flag_emoji: d.country.flag_emoji,
        price_min: priceMin,
        price_max: priceMax,
        price_avg: priceAvg,
        savings_vs_uk: ukAvg > 0 ? Math.round((1 - priceAvg / ukAvg) * 100) : 60,
        savings_vs_us: usAvg > 0 ? Math.round((1 - priceAvg / usAvg) * 100) : 70,
        flight_hours: d.country.flight_time_from_london_hrs,
      }
    })
    .sort((a: { price_avg: number }, b: { price_avg: number }) => a.price_avg - b.price_avg)

  return {
    procedure,
    category: procedure.category || null,
    destinations,
    uk_private_cost_min: procedure.uk_private_cost_min || 0,
    uk_private_cost_max: procedure.uk_private_cost_max || 0,
    us_cost_min: procedure.us_cost_min || 0,
    us_cost_max: procedure.us_cost_max || 0,
  }
}

// =============================================================================
// NHS WAIT TIME DATA
// =============================================================================

export interface NHSWaitTimeData {
  procedure: Procedure
  category: Category | null
  nhs_wait_weeks: number
  destinations: Array<{
    country_name: string
    country_code: string
    country_slug: string
    flag_emoji: string | null
    price_min: number
    price_max: number
    flight_hours: number | null
  }>
}

export async function getNHSWaitTimeData(procedure_slug: string): Promise<NHSWaitTimeData | null> {
  const supabase = createStaticClient()

  const { data: procedure } = await supabase
    .from('procedures')
    .select('*, category:categories(*)')
    .eq('slug', procedure_slug)
    .single()

  if (!procedure || !procedure.nhs_wait_weeks) return null

  const { data: destEntries } = await supabase
    .from('destinations')
    .select(`
      price_min_gbp, price_max_gbp,
      country:countries(name, iso_code, slug, flag_emoji, flight_time_from_london_hrs)
    `)
    .eq('procedure_id', procedure.id)
    .eq('is_valid', true)
    .eq('uk_relevant', true)

  const destinations = (destEntries || [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((d: any) => d.country && d.price_min_gbp)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((d: any) => ({
      country_name: d.country.name,
      country_code: d.country.iso_code,
      country_slug: d.country.slug,
      flag_emoji: d.country.flag_emoji,
      price_min: d.price_min_gbp,
      price_max: d.price_max_gbp || d.price_min_gbp,
      flight_hours: d.country.flight_time_from_london_hrs,
    }))
    .sort((a: { price_min: number }, b: { price_min: number }) => a.price_min - b.price_min)

  return {
    procedure,
    category: procedure.category || null,
    nhs_wait_weeks: procedure.nhs_wait_weeks,
    destinations,
  }
}

// =============================================================================
// ALL PROCEDURES WITH NHS DATA (for listing pages)
// =============================================================================

export async function getAllProceduresWithNHSWait(): Promise<Procedure[]> {
  const supabase = createStaticClient()

  const { data, error } = await supabase
    .from('procedures')
    .select('*, category:categories(*)')
    .not('nhs_wait_weeks', 'is', null)
    .gt('nhs_wait_weeks', 0)
    .order('nhs_wait_weeks', { ascending: false })

  if (error || !data) return []
  return data
}

// =============================================================================
// COUNTRY GUIDE DATA
// =============================================================================

export interface CountryGuideData {
  country: Country
  procedures: Array<{
    name: string
    slug: string
    category_name: string | null
    category_slug: string | null
    price_min: number
    price_max: number
    uk_cost_min: number | null
    uk_cost_max: number | null
    savings_percent: number
  }>
  stats: {
    procedure_count: number
    category_count: number
    min_price: number | null
    avg_savings: number
  }
}

export async function getCountryGuideData(countrySlug: string): Promise<CountryGuideData | null> {
  const country = await getCountryBySlug(countrySlug)
  if (!country) return null

  const supabase = createStaticClient()

  const { data: destEntries } = await supabase
    .from('destinations')
    .select(`
      price_min_gbp, price_max_gbp,
      procedure:procedures(name, slug, category_id, uk_private_cost_min, uk_private_cost_max,
        category:categories(name, slug)
      )
    `)
    .eq('country_id', country.id)
    .eq('is_valid', true)

  const procedures = (destEntries || [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((d: any) => d.procedure)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((d: any) => {
      const ukAvg = Math.round(((d.procedure.uk_private_cost_min || 0) + (d.procedure.uk_private_cost_max || 0)) / 2)
      const localAvg = Math.round(((d.price_min_gbp || 0) + (d.price_max_gbp || 0)) / 2)
      return {
        name: d.procedure.name,
        slug: d.procedure.slug,
        category_name: d.procedure.category?.name || null,
        category_slug: d.procedure.category?.slug || null,
        price_min: d.price_min_gbp || 0,
        price_max: d.price_max_gbp || 0,
        uk_cost_min: d.procedure.uk_private_cost_min,
        uk_cost_max: d.procedure.uk_private_cost_max,
        savings_percent: ukAvg > 0 ? Math.round((1 - localAvg / ukAvg) * 100) : 60,
      }
    })
    .sort((a: { savings_percent: number }, b: { savings_percent: number }) => b.savings_percent - a.savings_percent)

  const categories = new Set(procedures.map((p: { category_slug: string | null }) => p.category_slug).filter(Boolean))
  const allPrices = procedures.map((p: { price_min: number }) => p.price_min).filter((p: number) => p > 0)
  const allSavings = procedures.map((p: { savings_percent: number }) => p.savings_percent).filter((s: number) => s > 0)

  return {
    country,
    procedures,
    stats: {
      procedure_count: procedures.length,
      category_count: categories.size,
      min_price: allPrices.length > 0 ? Math.min(...allPrices) : null,
      avg_savings: allSavings.length > 0 ? Math.round(allSavings.reduce((a: number, b: number) => a + b, 0) / allSavings.length) : 60,
    },
  }
}

// =============================================================================
// PROCEDURE COMPARISON DATA
// =============================================================================

export interface ProcedureComparisonData {
  procedureA: Procedure
  procedureB: Procedure
  categoryA: Category | null
  categoryB: Category | null
  destinationsA: Array<{ country_name: string; country_slug: string; price_avg: number }>
  destinationsB: Array<{ country_name: string; country_slug: string; price_avg: number }>
}

export async function getProcedureComparisonData(
  slugA: string,
  slugB: string
): Promise<ProcedureComparisonData | null> {
  const [procA, procB] = await Promise.all([
    getProcedureBySlug(slugA),
    getProcedureBySlug(slugB),
  ])

  if (!procA || !procB) return null

  const supabase = createStaticClient()

  const [destsA, destsB] = await Promise.all([
    supabase
      .from('destinations')
      .select('price_min_gbp, price_max_gbp, country:countries(name, slug)')
      .eq('procedure_id', procA.id)
      .eq('is_valid', true),
    supabase
      .from('destinations')
      .select('price_min_gbp, price_max_gbp, country:countries(name, slug)')
      .eq('procedure_id', procB.id)
      .eq('is_valid', true),
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapDests = (entries: any[]) =>
    entries
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((d: any) => d.country && d.price_min_gbp)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((d: any) => ({
        country_name: d.country.name,
        country_slug: d.country.slug,
        price_avg: Math.round(((d.price_min_gbp || 0) + (d.price_max_gbp || 0)) / 2),
      }))
      .sort((a: { price_avg: number }, b: { price_avg: number }) => a.price_avg - b.price_avg)

  return {
    procedureA: procA,
    procedureB: procB,
    categoryA: procA.category || null,
    categoryB: procB.category || null,
    destinationsA: mapDests(destsA.data || []),
    destinationsB: mapDests(destsB.data || []),
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
