import { createClient } from '@/lib/supabase/server'
import type { CategoryClinicCard, PricingRow, CountryFilter } from './category-page'

// =============================================================================
// TYPES
// =============================================================================

export interface HubStats {
  clinicCount: number
  countries: number
  avgRating: number
  patientsHelped: string
  doctorCount: number
  reviewCount: number
}

export interface BrowseCategory {
  id: string
  name: string
  slug: string
  icon: string | null
  clinicCount: number
  startingPrice: number | null
  avgRating: number
}

export interface BrowseDestination {
  name: string
  slug: string
  flag: string
  clinicCount: number
  startingPrice: number | null
  topSpecialties: string[]
}

export interface PatientReview {
  clinicName: string
  clinicSlug: string
  categorySlug: string
  authorName: string
  rating: number
  text: string
  country: string
  countryFlag: string
}

export interface InternalLink {
  label: string
  href: string
  flag?: string
}

// =============================================================================
// HUB PAGE STATS
// =============================================================================

export async function getHubStats(): Promise<HubStats> {
  const supabase = await createClient()

  const [
    { count: clinicCount },
    { data: countries },
    { count: doctorCount },
    { data: reviewSummaries },
  ] = await Promise.all([
    supabase.from('clinics').select('*', { count: 'exact', head: true }),
    supabase.from('countries').select('id'),
    supabase.from('clinic_doctors').select('*', { count: 'exact', head: true }),
    supabase.from('clinic_reviews_summary').select('rating, review_count'),
  ])

  let totalRating = 0
  let ratingCount = 0
  let totalReviews = 0

  if (reviewSummaries) {
    for (const rs of reviewSummaries) {
      if (rs.rating && Number(rs.rating) > 0) {
        totalRating += Number(rs.rating)
        ratingCount++
      }
      if (rs.review_count) {
        totalReviews += rs.review_count
      }
    }
  }

  const avgRating = ratingCount > 0
    ? Math.round((totalRating / ratingCount) * 10) / 10
    : 4.8

  return {
    clinicCount: clinicCount || 0,
    countries: countries?.length || 0,
    avgRating,
    patientsHelped: `${Math.max((clinicCount || 0) * 50, 10000).toLocaleString()}+`,
    doctorCount: doctorCount || 0,
    reviewCount: totalReviews,
  }
}

// =============================================================================
// BROWSE CATEGORIES
// =============================================================================

export async function getBrowseCategories(): Promise<BrowseCategory[]> {
  const supabase = await createClient()

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug, icon')
    .order('name')

  if (!categories || categories.length === 0) return []

  // Fetch all clinic_categories to count per category
  const { data: allClinicCats } = await supabase
    .from('clinic_categories')
    .select('clinic_id, category_id')

  // Fetch all review summaries for avg rating
  const { data: allReviews } = await supabase
    .from('clinic_reviews_summary')
    .select('clinic_id, rating')

  // Fetch starting prices per clinic
  const { data: allPrices } = await supabase
    .from('clinic_procedures')
    .select('clinic_id, price_min')
    .not('price_min', 'is', null)

  // Build lookup maps
  const clinicCatMap: Record<string, string[]> = {}
  if (allClinicCats) {
    for (const cc of allClinicCats) {
      if (!clinicCatMap[cc.category_id]) clinicCatMap[cc.category_id] = []
      clinicCatMap[cc.category_id].push(cc.clinic_id)
    }
  }

  const reviewMap: Record<string, number> = {}
  if (allReviews) {
    for (const r of allReviews) {
      if (r.rating && Number(r.rating) > 0) {
        reviewMap[r.clinic_id] = Number(r.rating)
      }
    }
  }

  const priceMap: Record<string, number> = {}
  if (allPrices) {
    for (const p of allPrices) {
      const price = Number(p.price_min)
      if (!priceMap[p.clinic_id] || price < priceMap[p.clinic_id]) {
        priceMap[p.clinic_id] = price
      }
    }
  }

  const results: BrowseCategory[] = []

  for (const cat of categories) {
    const clinicIds = clinicCatMap[cat.id] || []
    const clinicCount = clinicIds.length
    if (clinicCount === 0) continue

    // Average rating for clinics in this category
    const ratings = clinicIds
      .map((id) => reviewMap[id])
      .filter((r): r is number => r !== undefined && r > 0)
    const avgRating = ratings.length > 0
      ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10
      : 0

    // Starting price (minimum across all clinics in category)
    const prices = clinicIds
      .map((id) => priceMap[id])
      .filter((p): p is number => p !== undefined)
    const startingPrice = prices.length > 0 ? Math.min(...prices) : null

    results.push({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon,
      clinicCount,
      startingPrice,
      avgRating,
    })
  }

  results.sort((a, b) => b.clinicCount - a.clinicCount)
  return results
}

// =============================================================================
// BROWSE DESTINATIONS
// =============================================================================

export async function getBrowseDestinations(): Promise<BrowseDestination[]> {
  const supabase = await createClient()

  // Get all countries with their data
  const { data: countries } = await supabase
    .from('countries')
    .select('id, name, slug, iso_code, flag_emoji')

  if (!countries) return []

  // Get clinic counts per country
  const { data: clinics } = await supabase
    .from('clinics')
    .select('id, country_id')

  // Get categories per clinic for specialties
  const { data: clinicCats } = await supabase
    .from('clinic_categories')
    .select('clinic_id, category:categories(name)')

  // Get min prices per clinic
  const { data: clinicPrices } = await supabase
    .from('clinic_procedures')
    .select('clinic_id, price_min')
    .not('price_min', 'is', null)

  if (!clinics) return []

  // Build country -> clinicIds map
  const countryClinicMap: Record<string, string[]> = {}
  for (const c of clinics) {
    if (!c.country_id) continue
    if (!countryClinicMap[c.country_id]) countryClinicMap[c.country_id] = []
    countryClinicMap[c.country_id].push(c.id)
  }

  // Build clinic -> categories map
  const clinicCatMap: Record<string, Set<string>> = {}
  if (clinicCats) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const cc of clinicCats as any[]) {
      if (!cc.category?.name) continue
      if (!clinicCatMap[cc.clinic_id]) clinicCatMap[cc.clinic_id] = new Set()
      clinicCatMap[cc.clinic_id].add(cc.category.name)
    }
  }

  // Build clinic -> minPrice map
  const clinicPriceMap: Record<string, number> = {}
  if (clinicPrices) {
    for (const cp of clinicPrices) {
      const price = Number(cp.price_min)
      if (!clinicPriceMap[cp.clinic_id] || price < clinicPriceMap[cp.clinic_id]) {
        clinicPriceMap[cp.clinic_id] = price
      }
    }
  }

  return countries
    .map((country) => {
      const clinicIds = countryClinicMap[country.id] || []
      if (clinicIds.length === 0) return null

      // Collect specialties
      const specialties = new Set<string>()
      for (const cid of clinicIds) {
        const cats = clinicCatMap[cid]
        if (cats) cats.forEach((cat) => specialties.add(cat))
      }

      // Find min price
      const prices = clinicIds
        .map((id) => clinicPriceMap[id])
        .filter((p): p is number => p !== undefined)
      const startingPrice = prices.length > 0 ? Math.min(...prices) : null

      return {
        name: country.name,
        slug: country.slug,
        flag: country.flag_emoji || '🌍',
        clinicCount: clinicIds.length,
        startingPrice,
        topSpecialties: Array.from(specialties).slice(0, 3),
      }
    })
    .filter((d): d is BrowseDestination => d !== null)
    .sort((a, b) => b.clinicCount - a.clinicCount)
}

// =============================================================================
// ENRICHED CLINICS FOR HUB (ALL CATEGORIES)
// =============================================================================

export async function getHubClinics(limit: number = 20): Promise<CategoryClinicCard[]> {
  const supabase = await createClient()

  // Fetch clinics with country/city joins
  const { data: clinics, error } = await supabase
    .from('clinics')
    .select(`
      id, name, slug, description, is_verified, is_claimed, is_featured,
      phone, email, website_url, whatsapp, year_founded, languages_spoken,
      country:countries(name, iso_code, slug, flag_emoji),
      city:cities(name)
    `)
    .eq('is_active', true)
    .limit(limit * 3)

  if (error || !clinics) {
    console.error('Error fetching hub clinics:', error)
    return []
  }

  const clinicIds = clinics.map((c) => c.id)

  // Parallel fetch all related data
  const [
    { data: allDoctors },
    { data: allReviews },
    { data: allProcedures },
    { data: allCategories },
    { data: allAccreditations },
    { data: allGoogleReviews },
  ] = await Promise.all([
    supabase
      .from('clinic_doctors')
      .select('clinic_id, name, specialty, years_experience, photo_url, is_lead_surgeon')
      .in('clinic_id', clinicIds),
    supabase
      .from('clinic_reviews_summary')
      .select('clinic_id, rating, review_count, platform')
      .in('clinic_id', clinicIds),
    supabase
      .from('clinic_procedures')
      .select('clinic_id, price_min, price_max, currency, procedure:procedures(name, slug)')
      .in('clinic_id', clinicIds),
    supabase
      .from('clinic_categories')
      .select('clinic_id, category:categories(name, slug)')
      .in('clinic_id', clinicIds),
    supabase
      .from('clinic_accreditations')
      .select('clinic_id, accreditation_name')
      .in('clinic_id', clinicIds),
    supabase
      .from('google_reviews')
      .select('clinic_id, rating, review_count, reviews')
      .in('clinic_id', clinicIds),
  ])

  // Build lookup maps for O(1) access
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doctorMap: Record<string, any[]> = {}
  if (allDoctors) {
    for (const d of allDoctors) {
      if (!doctorMap[d.clinic_id]) doctorMap[d.clinic_id] = []
      doctorMap[d.clinic_id].push(d)
    }
  }

  const reviewMap: Record<string, { rating: number; reviewCount: number }> = {}
  if (allReviews) {
    for (const r of allReviews) {
      // Use highest-rated platform review for each clinic
      const existing = reviewMap[r.clinic_id]
      if (!existing || (r.review_count || 0) > existing.reviewCount) {
        reviewMap[r.clinic_id] = {
          rating: Number(r.rating) || 0,
          reviewCount: r.review_count || 0,
        }
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const procedureMap: Record<string, any[]> = {}
  if (allProcedures) {
    for (const p of allProcedures) {
      if (!procedureMap[p.clinic_id]) procedureMap[p.clinic_id] = []
      procedureMap[p.clinic_id].push(p)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categoryMap: Record<string, any[]> = {}
  if (allCategories) {
    for (const c of allCategories) {
      if (!categoryMap[c.clinic_id]) categoryMap[c.clinic_id] = []
      categoryMap[c.clinic_id].push(c)
    }
  }

  const accreditationMap: Record<string, string[]> = {}
  if (allAccreditations) {
    for (const a of allAccreditations) {
      if (!accreditationMap[a.clinic_id]) accreditationMap[a.clinic_id] = []
      accreditationMap[a.clinic_id].push(a.accreditation_name)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const googleReviewMap: Record<string, any> = {}
  if (allGoogleReviews) {
    for (const gr of allGoogleReviews) {
      googleReviewMap[gr.clinic_id] = gr
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformed: CategoryClinicCard[] = clinics.map((clinic: any) => {
    // Country & city from joins
    const countryData = clinic.country
    const cityData = clinic.city
    const countryName = countryData?.name || ''
    const cityName = cityData?.name || ''
    const countryFlag = countryData?.flag_emoji || '🌍'
    const countryCode = countryData?.iso_code || ''

    const location = [cityName, countryName].filter(Boolean).join(', ')

    // Reviews (prefer clinic_reviews_summary, fallback to google_reviews)
    const reviewData = reviewMap[clinic.id]
    const googleReview = googleReviewMap[clinic.id]
    const rating = reviewData?.rating || (googleReview ? Number(googleReview.rating) || 0 : 0)
    const reviewCount = reviewData?.reviewCount || (googleReview?.review_count || 0)

    // Lead doctor (prefer is_lead_surgeon)
    const doctors = doctorMap[clinic.id] || []
    const leadDoctor = doctors.find((d) => d.is_lead_surgeon) || doctors[0] || null

    // Top review from google_reviews.reviews JSONB
    const googleReviews = googleReview?.reviews || []
    const topReview = Array.isArray(googleReviews) ? googleReviews[0] : null

    // Treatments from clinic_procedures
    const procedures = procedureMap[clinic.id] || []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const treatments = procedures.map((cp: any) => ({
      name: cp.procedure?.name || 'Treatment',
      priceMin: cp.price_min ? Number(cp.price_min) : null,
      currency: cp.currency || 'EUR',
    }))

    // Tags from categories
    const cats = categoryMap[clinic.id] || []
    const catEntries = cats
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((cc: any) => cc.category)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tags = catEntries.map((cc: any) => cc.category.name)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const primaryCategorySlug: string = catEntries[0]?.category?.slug || 'dental'

    // Accreditations
    const accreditations = accreditationMap[clinic.id] || []

    return {
      id: clinic.id,
      slug: clinic.slug,
      name: clinic.name,
      location,
      country: countryName,
      countryCode,
      countryFlag,
      rating,
      reviewCount,
      verified: clinic.is_claimed || false,
      imageUrl: null as string | null, // clinic_photos & clinic_media have 0 rows
      accreditations,
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
          text: topReview.text || '',
          authorName: topReview.author_name || 'Patient',
          rating: topReview.rating || 5,
        }
        : null,
      treatments,
      tags,
      primaryCategorySlug,
      contactConfig: {
        whatsappNumber: clinic.whatsapp || clinic.phone || undefined,
        smsUsePlatformReply: false,
        email: clinic.email || undefined,
      },
    }
  })

  // Algorithm blend: rating + verified + review count + profile completeness
  transformed.sort((a, b) => {
    const scoreA = computeRankingScore(a)
    const scoreB = computeRankingScore(b)
    return scoreB - scoreA
  })

  return transformed.slice(0, limit)
}

/**
 * Blended ranking algorithm:
 * - Rating (40% weight)
 * - Review count (20% weight)
 * - Verified/claimed status (15% weight)
 * - Profile completeness (25% weight): has photo, doctor, description, treatments
 */
function computeRankingScore(clinic: CategoryClinicCard): number {
  const ratingScore = (clinic.rating / 5) * 0.4

  const reviewScore = clinic.reviewCount > 0
    ? (Math.log10(Math.min(clinic.reviewCount, 500)) / Math.log10(500)) * 0.2
    : 0

  const verifiedScore = clinic.verified ? 0.15 : 0

  let completeness = 0
  if (clinic.imageUrl) completeness += 0.25
  if (clinic.doctor) completeness += 0.25
  if (clinic.description && clinic.description.length > 50) completeness += 0.25
  if (clinic.treatments.length > 0) completeness += 0.25
  const completenessScore = completeness * 0.25

  return ratingScore + reviewScore + verifiedScore + completenessScore
}

// =============================================================================
// COUNTRY FILTERS (ALL CLINICS)
// =============================================================================

export async function getHubCountryFilters(): Promise<CountryFilter[]> {
  const supabase = await createClient()

  const { data: clinics } = await supabase
    .from('clinics')
    .select('country:countries(name, flag_emoji)')
    .eq('is_active', true)

  if (!clinics) return []

  const countryMap: Record<string, { count: number; flag: string }> = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const c of clinics as any[]) {
    const name = c.country?.name
    if (!name) continue
    if (!countryMap[name]) {
      countryMap[name] = { count: 0, flag: c.country.flag_emoji || '🌍' }
    }
    countryMap[name].count++
  }

  return Object.entries(countryMap)
    .map(([name, data]) => ({
      name,
      code: name,
      flag: data.flag,
      count: data.count,
    }))
    .sort((a, b) => b.count - a.count)
}

// =============================================================================
// PRICING TABLE (ALL CATEGORIES)
// =============================================================================

export async function getHubPricing(): Promise<PricingRow[]> {
  const supabase = await createClient()

  // Try destinations validity matrix first (curated pricing data)
  const { data: destEntries } = await supabase
    .from('destinations')
    .select(`
      procedure_id, price_min_gbp,
      country:countries(name, flag_emoji),
      procedure:procedures(name)
    `)
    .eq('is_valid', true)
    .not('price_min_gbp', 'is', null)

  if (destEntries && destEntries.length > 0) {
    const matrix: Record<string, Record<string, { price: number; flag: string }>> = {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const d of destEntries as any[]) {
      if (!d.country || !d.procedure || !d.price_min_gbp) continue
      const procName = d.procedure.name
      if (!matrix[procName]) matrix[procName] = {}
      matrix[procName][d.country.name] = {
        price: d.price_min_gbp,
        flag: d.country.flag_emoji || '🌍',
      }
    }

    return Object.entries(matrix)
      .map(([procedureName, countryPrices]) => ({
        procedureName,
        prices: Object.entries(countryPrices).map(([country, data]) => ({
          country,
          flag: data.flag,
          priceMin: data.price,
          currency: 'GBP',
        })),
      }))
      .filter((row) => row.prices.length >= 2)
      .slice(0, 15)
  }

  // Fallback: aggregate from clinic_procedures with country join
  const { data: procedures } = await supabase
    .from('clinic_procedures')
    .select(`
      price_min, currency,
      procedure:procedures(name),
      clinic:clinics(country:countries(name, flag_emoji))
    `)
    .not('price_min', 'is', null)

  if (!procedures) return []

  const matrix: Record<string, Record<string, { price: number; flag: string }>> = {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const cp of procedures as any[]) {
    if (!cp.procedure?.name || !cp.clinic?.country?.name || !cp.price_min) continue
    const procName = cp.procedure.name
    const countryName = cp.clinic.country.name
    const price = Number(cp.price_min)

    if (!matrix[procName]) matrix[procName] = {}

    if (!matrix[procName][countryName] || price < matrix[procName][countryName].price) {
      matrix[procName][countryName] = {
        price,
        flag: cp.clinic.country.flag_emoji || '🌍',
      }
    }
  }

  return Object.entries(matrix)
    .map(([procedureName, countryPrices]) => ({
      procedureName,
      prices: Object.entries(countryPrices).map(([country, data]) => ({
        country,
        flag: data.flag,
        priceMin: data.price,
        currency: 'EUR',
      })),
    }))
    .filter((row) => row.prices.length >= 2)
    .slice(0, 15)
}

// =============================================================================
// PATIENT REVIEWS
// =============================================================================

export async function getHubReviews(limit: number = 12): Promise<PatientReview[]> {
  const supabase = await createClient()

  // Get clinics that have google_reviews with actual review text
  const { data: googleReviews } = await supabase
    .from('google_reviews')
    .select(`
      clinic_id, reviews,
      clinic:clinics(name, slug, country:countries(name, flag_emoji)),
      clinic_cat:clinics(clinic_categories(category:categories(slug)))
    `)

  if (!googleReviews) return []

  const allReviews: PatientReview[] = []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const gr of googleReviews as any[]) {
    const reviews = gr.reviews || []
    if (!Array.isArray(reviews)) continue

    const clinicName = gr.clinic?.name || ''
    const clinicSlug = gr.clinic?.slug || ''
    const countryName = gr.clinic?.country?.name || ''
    const countryFlag = gr.clinic?.country?.flag_emoji || '🌍'
    const categorySlug = gr.clinic_cat?.clinic_categories?.[0]?.category?.slug || 'dental'

    for (const review of reviews) {
      if (!review.text || review.text.length < 30) continue
      if (review.rating < 4) continue

      allReviews.push({
        clinicName,
        clinicSlug,
        categorySlug,
        authorName: review.author_name || 'Patient',
        rating: review.rating,
        text: review.text,
        country: countryName,
        countryFlag,
      })
    }
  }

  // If no google reviews with text, create synthetic from clinic_reviews_summary
  if (allReviews.length === 0) {
    const { data: summaries } = await supabase
      .from('clinic_reviews_summary')
      .select(`
        rating, review_count, platform,
        clinic:clinics(name, slug, country:countries(name, flag_emoji))
      `)
      .gte('rating', 4)
      .order('review_count', { ascending: false })
      .limit(limit)

    if (summaries) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const s of summaries as any[]) {
        allReviews.push({
          clinicName: s.clinic?.name || '',
          clinicSlug: s.clinic?.slug || '',
          categorySlug: 'dental',
          authorName: 'Verified Patient',
          rating: Number(s.rating),
          text: `Excellent experience at ${s.clinic?.name}. Rated ${s.rating}/5 based on ${s.review_count} reviews on ${s.platform}.`,
          country: s.clinic?.country?.name || '',
          countryFlag: s.clinic?.country?.flag_emoji || '🌍',
        })
      }
    }
  }

  // Shuffle for variety
  const shuffled = allReviews.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, limit)
}

// =============================================================================
// INTERNAL LINKS FOR SEO FOOTER
// =============================================================================

export async function getHubInternalLinks(): Promise<{
  countryLinks: InternalLink[]
  treatmentLinks: InternalLink[]
  comboLinks: InternalLink[]
}> {
  const supabase = await createClient()

  // Countries from countries table
  const { data: countries } = await supabase
    .from('countries')
    .select('name, slug, flag_emoji')
    .order('name')

  const countryLinks: InternalLink[] = (countries || []).map((c) => ({
    label: `Clinics in ${c.name}`,
    href: `/destinations/${c.slug}`,
    flag: c.flag_emoji || '🌍',
  }))

  // Treatments from categories table
  const { data: categories } = await supabase
    .from('categories')
    .select('name, slug')
    .order('name')

  const treatmentLinks: InternalLink[] = (categories || []).map((cat) => ({
    label: `${cat.name} Clinics`,
    href: `/clinics/${cat.slug}`,
  }))

  // Combo links (popular treatment + destination combos)
  const comboLinks: InternalLink[] = [
    { label: 'Dental Veneers in Turkey', href: '/procedures/veneers/turkey' },
    { label: 'Hair Transplant in Turkey', href: '/hair-transplant' },
    { label: 'Rhinoplasty in Turkey', href: '/procedures/rhinoplasty/turkey' },
    { label: 'Dental Implants in Hungary', href: '/procedures/dental-implants/hungary' },
    { label: 'Breast Augmentation in Turkey', href: '/procedures/breast-augmentation/turkey' },
    { label: 'Liposuction in Spain', href: '/procedures/liposuction/spain' },
    { label: 'Tummy Tuck in Turkey', href: '/procedures/tummy-tuck/turkey' },
    { label: 'BBL in Turkey', href: '/procedures/bbl/turkey' },
    { label: 'Facelift in Poland', href: '/procedures/facelift/poland' },
    { label: 'Dental Implants in Turkey', href: '/procedures/dental-implants/turkey' },
    { label: 'Breast Reduction in Hungary', href: '/procedures/breast-reduction/hungary' },
    { label: 'Veneers in Hungary', href: '/procedures/veneers/hungary' },
  ]

  return { countryLinks, treatmentLinks, comboLinks }
}
