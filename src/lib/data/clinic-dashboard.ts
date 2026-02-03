import { createClient } from '@/lib/supabase/server'

export interface DashboardMetrics {
  profileViews: number
  totalEnquiries: number
  pendingEnquiries: number
  avgResponseTime: string
}

export interface RecentEnquiry {
  id: string
  fullName: string
  procedureInterest: string
  status: 'submitted' | 'viewed' | 'responded' | 'closed'
  createdAt: string
  timeline: string
  budgetRange: string | null
}

export async function getClinicForUser(userId: string) {
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
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Error fetching clinic for user:', error)
    return null
  }

  // Sort photos by sort_order
  if (clinic?.photos) {
    clinic.photos.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
  }

  return clinic
}

export async function getDashboardMetrics(clinicId: string): Promise<DashboardMetrics> {
  const supabase = await createClient()

  // Get this month's date range
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  // Get total enquiries this month
  const { count: totalEnquiries } = await supabase
    .from('enquiries')
    .select('*', { count: 'exact', head: true })
    .eq('clinic_id', clinicId)
    .gte('created_at', startOfMonth)

  // Get pending enquiries (submitted or viewed, not responded/closed)
  const { count: pendingEnquiries } = await supabase
    .from('enquiries')
    .select('*', { count: 'exact', head: true })
    .eq('clinic_id', clinicId)
    .in('status', ['submitted', 'viewed'])

  // Profile views - for now return a placeholder (would need analytics tracking)
  const profileViews = 0

  // Average response time - calculate from responded enquiries
  const { data: respondedEnquiries } = await supabase
    .from('enquiries')
    .select('created_at, updated_at')
    .eq('clinic_id', clinicId)
    .eq('status', 'responded')
    .limit(50)

  let avgResponseTime = '—'
  if (respondedEnquiries && respondedEnquiries.length > 0) {
    const totalHours = respondedEnquiries.reduce((acc, eq) => {
      const created = new Date(eq.created_at)
      const responded = new Date(eq.updated_at)
      return acc + (responded.getTime() - created.getTime()) / (1000 * 60 * 60)
    }, 0)
    const avgHours = totalHours / respondedEnquiries.length
    if (avgHours < 24) {
      avgResponseTime = `${Math.round(avgHours)}h`
    } else {
      avgResponseTime = `${Math.round(avgHours / 24)}d`
    }
  }

  return {
    profileViews,
    totalEnquiries: totalEnquiries || 0,
    pendingEnquiries: pendingEnquiries || 0,
    avgResponseTime,
  }
}

export async function getRecentEnquiries(clinicId: string, limit: number = 5): Promise<RecentEnquiry[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('enquiries')
    .select('id, full_name, procedure_interest, status, created_at, timeline, budget_range')
    .eq('clinic_id', clinicId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent enquiries:', error)
    return []
  }

  return data.map((eq) => ({
    id: eq.id,
    fullName: eq.full_name,
    procedureInterest: eq.procedure_interest,
    status: eq.status,
    createdAt: eq.created_at,
    timeline: eq.timeline,
    budgetRange: eq.budget_range,
  }))
}

export async function getClinicEnquiries(
  clinicId: string,
  options: {
    status?: string
    page?: number
    limit?: number
  } = {}
) {
  const supabase = await createClient()

  const page = options.page || 1
  const limit = options.limit || 20
  const offset = (page - 1) * limit

  let query = supabase
    .from('enquiries')
    .select(
      `
      id,
      procedure_interest,
      willing_to_travel,
      preferred_destinations,
      budget_range,
      timeline,
      full_name,
      email,
      phone,
      message,
      status,
      created_at,
      updated_at
    `,
      { count: 'exact' }
    )
    .eq('clinic_id', clinicId)

  if (options.status && options.status !== 'all') {
    query = query.eq('status', options.status)
  }

  query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1)

  const { data, error, count } = await query

  if (error) {
    console.error('Error fetching clinic enquiries:', error)
    return { enquiries: [], total: 0, page, totalPages: 0 }
  }

  return {
    enquiries: data || [],
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  }
}

export async function updateEnquiryStatus(enquiryId: string, status: string, clinicId: string) {
  const supabase = await createClient()

  // Verify the enquiry belongs to this clinic
  const { data: enquiry } = await supabase
    .from('enquiries')
    .select('id')
    .eq('id', enquiryId)
    .eq('clinic_id', clinicId)
    .single()

  if (!enquiry) {
    return { error: 'Enquiry not found' }
  }

  const { error } = await supabase
    .from('enquiries')
    .update({ status })
    .eq('id', enquiryId)

  if (error) {
    console.error('Error updating enquiry status:', error)
    return { error: 'Failed to update status' }
  }

  return { success: true }
}

export async function getClinicDoctors(clinicId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .eq('clinic_id', clinicId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching doctors:', error)
    return []
  }

  return data
}

export async function createDoctor(
  clinicId: string,
  doctorData: {
    name: string
    title?: string
    specialisation?: string
    qualifications?: string[]
    yearsExperience?: number
    languages?: string[]
    bio?: string
    photoUrl?: string
  }
) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('doctors')
    .insert({
      clinic_id: clinicId,
      name: doctorData.name,
      title: doctorData.title || null,
      specialisation: doctorData.specialisation || null,
      qualifications: doctorData.qualifications || [],
      years_experience: doctorData.yearsExperience || null,
      languages: doctorData.languages || [],
      bio: doctorData.bio || null,
      photo_url: doctorData.photoUrl || null,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating doctor:', error)
    return { error: 'Failed to create doctor' }
  }

  return { data }
}

export async function updateDoctor(
  doctorId: string,
  clinicId: string,
  doctorData: {
    name?: string
    title?: string
    specialisation?: string
    qualifications?: string[]
    yearsExperience?: number
    languages?: string[]
    bio?: string
    photoUrl?: string
  }
) {
  const supabase = await createClient()

  // Verify the doctor belongs to this clinic
  const { data: existing } = await supabase
    .from('doctors')
    .select('id')
    .eq('id', doctorId)
    .eq('clinic_id', clinicId)
    .single()

  if (!existing) {
    return { error: 'Doctor not found' }
  }

  const { data, error } = await supabase
    .from('doctors')
    .update({
      name: doctorData.name,
      title: doctorData.title,
      specialisation: doctorData.specialisation,
      qualifications: doctorData.qualifications,
      years_experience: doctorData.yearsExperience,
      languages: doctorData.languages,
      bio: doctorData.bio,
      photo_url: doctorData.photoUrl,
    })
    .eq('id', doctorId)
    .select()
    .single()

  if (error) {
    console.error('Error updating doctor:', error)
    return { error: 'Failed to update doctor' }
  }

  return { data }
}

export async function deleteDoctor(doctorId: string, clinicId: string) {
  const supabase = await createClient()

  // Verify the doctor belongs to this clinic
  const { data: existing } = await supabase
    .from('doctors')
    .select('id')
    .eq('id', doctorId)
    .eq('clinic_id', clinicId)
    .single()

  if (!existing) {
    return { error: 'Doctor not found' }
  }

  const { error } = await supabase.from('doctors').delete().eq('id', doctorId)

  if (error) {
    console.error('Error deleting doctor:', error)
    return { error: 'Failed to delete doctor' }
  }

  return { success: true }
}

export async function updateClinicProfile(
  clinicId: string,
  profileData: {
    name?: string
    description?: string
    address?: string
    city?: string
    country?: string
    phone?: string
    website?: string
    email?: string
    yearEstablished?: number
    languages?: string[]
    accreditations?: string[]
    certifications?: string[]
    operatingHours?: Record<string, string>
    insuranceAccepted?: string[]
  }
) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('clinics')
    .update({
      name: profileData.name,
      description: profileData.description,
      address: profileData.address,
      city: profileData.city,
      country: profileData.country,
      phone: profileData.phone,
      website: profileData.website,
      email: profileData.email,
      year_established: profileData.yearEstablished,
      languages: profileData.languages,
      accreditations: profileData.accreditations,
      certifications: profileData.certifications,
      operating_hours: profileData.operatingHours,
      insurance_accepted: profileData.insuranceAccepted,
    })
    .eq('id', clinicId)
    .select()
    .single()

  if (error) {
    console.error('Error updating clinic profile:', error)
    return { error: 'Failed to update profile' }
  }

  return { data }
}

export async function getClinicByClaimToken(token: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('clinics')
    .select('id, name, address, city, country, email, phone, claimed')
    .eq('claim_token', token)
    .single()

  if (error) {
    console.error('Error fetching clinic by claim token:', error)
    return null
  }

  return data
}

export async function claimClinic(clinicId: string, userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('clinics')
    .update({
      claimed: true,
      user_id: userId,
      claim_token: null, // Invalidate the claim token
    })
    .eq('id', clinicId)
    .select()
    .single()

  if (error) {
    console.error('Error claiming clinic:', error)
    return { error: 'Failed to claim clinic' }
  }

  return { data }
}

export async function createClinicProfile(
  userId: string,
  profileData: {
    name: string
    city: string
    country: string
    address?: string
    phone?: string
    website?: string
    email?: string
    description?: string
  }
) {
  const supabase = await createClient()

  // Generate slug from name
  const baseSlug = profileData.name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

  // Check for existing slugs and make unique
  const { data: existingSlugs } = await supabase
    .from('clinics')
    .select('slug')
    .ilike('slug', `${baseSlug}%`)

  let slug = baseSlug
  if (existingSlugs && existingSlugs.length > 0) {
    const slugNumbers = existingSlugs
      .map((c) => {
        const match = c.slug.match(new RegExp(`^${baseSlug}-(\\d+)$`))
        return match ? parseInt(match[1]) : 0
      })
      .filter((n) => n > 0)

    if (existingSlugs.some((c) => c.slug === baseSlug) || slugNumbers.length > 0) {
      const maxNumber = slugNumbers.length > 0 ? Math.max(...slugNumbers) : 0
      slug = `${baseSlug}-${maxNumber + 1}`
    }
  }

  const { data, error } = await supabase
    .from('clinics')
    .insert({
      name: profileData.name,
      slug,
      city: profileData.city,
      country: profileData.country,
      address: profileData.address || null,
      phone: profileData.phone || null,
      website: profileData.website || null,
      email: profileData.email || null,
      description: profileData.description || null,
      user_id: userId,
      claimed: true,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating clinic profile:', error)
    return { error: 'Failed to create clinic' }
  }

  return { data }
}

export async function updateClinicCategories(clinicId: string, categoryIds: string[]) {
  const supabase = await createClient()

  // Delete existing categories
  await supabase.from('clinic_categories').delete().eq('clinic_id', clinicId)

  if (categoryIds.length === 0) {
    return { success: true }
  }

  // Insert new categories
  const { error } = await supabase.from('clinic_categories').insert(
    categoryIds.map((categoryId) => ({
      clinic_id: clinicId,
      category_id: categoryId,
    }))
  )

  if (error) {
    console.error('Error updating clinic categories:', error)
    return { error: 'Failed to update categories' }
  }

  return { success: true }
}

export async function updateClinicProcedures(
  clinicId: string,
  procedures: Array<{
    procedureId: string
    priceMin?: number
    priceMax?: number
    currency?: string
  }>
) {
  const supabase = await createClient()

  // Delete existing procedures
  await supabase.from('clinic_procedures').delete().eq('clinic_id', clinicId)

  if (procedures.length === 0) {
    return { success: true }
  }

  // Insert new procedures
  const { error } = await supabase.from('clinic_procedures').insert(
    procedures.map((proc) => ({
      clinic_id: clinicId,
      procedure_id: proc.procedureId,
      price_min: proc.priceMin || null,
      price_max: proc.priceMax || null,
      currency: proc.currency || 'EUR',
    }))
  )

  if (error) {
    console.error('Error updating clinic procedures:', error)
    return { error: 'Failed to update procedures' }
  }

  return { success: true }
}
