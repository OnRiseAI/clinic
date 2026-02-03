import { createClient } from '@/lib/supabase/server'

export interface PatientStats {
  savedClinicsCount: number
  activeEnquiriesCount: number
  totalEnquiriesCount: number
}

export interface PatientEnquiry {
  id: string
  clinic_id: string
  clinic_name: string
  clinic_slug: string
  clinic_city: string | null
  clinic_country: string | null
  procedure_interest: string
  budget_range: string | null
  timeline: string
  message: string | null
  status: 'submitted' | 'viewed' | 'responded' | 'closed'
  created_at: string
  updated_at: string
}

export interface SavedClinic {
  id: string
  clinic_id: string
  saved_at: string
  clinic: {
    id: string
    name: string
    slug: string
    city: string | null
    country: string | null
    first_photo: string | null
    google_rating: number | null
    google_review_count: number | null
    accreditations: string[]
    featured: boolean
    claimed: boolean
    starting_price: number | null
    price_currency: string
    categories: Array<{ name: string; slug: string }>
  }
}

export async function getPatientStats(userId: string): Promise<PatientStats> {
  const supabase = await createClient()

  // Get counts in parallel
  const [savedClinicsResult, activeEnquiriesResult, totalEnquiriesResult] = await Promise.all([
    supabase
      .from('saved_clinics')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId),
    supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true })
      .eq('patient_user_id', userId)
      .in('status', ['submitted', 'viewed']),
    supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true })
      .eq('patient_user_id', userId),
  ])

  return {
    savedClinicsCount: savedClinicsResult.count || 0,
    activeEnquiriesCount: activeEnquiriesResult.count || 0,
    totalEnquiriesCount: totalEnquiriesResult.count || 0,
  }
}

export async function getPatientEnquiries(
  userId: string,
  options: {
    status?: string
    page?: number
    limit?: number
  } = {}
): Promise<{ enquiries: PatientEnquiry[]; total: number; totalPages: number }> {
  const supabase = await createClient()

  const page = options.page || 1
  const limit = options.limit || 20
  const offset = (page - 1) * limit

  let query = supabase
    .from('enquiries')
    .select(
      `
      id,
      clinic_id,
      procedure_interest,
      budget_range,
      timeline,
      message,
      status,
      created_at,
      updated_at,
      clinic:clinics(id, name, slug, city, country)
    `,
      { count: 'exact' }
    )
    .eq('patient_user_id', userId)

  if (options.status && options.status !== 'all') {
    if (options.status === 'active') {
      query = query.in('status', ['submitted', 'viewed'])
    } else {
      query = query.eq('status', options.status)
    }
  }

  query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1)

  const { data, error, count } = await query

  if (error) {
    console.error('Error fetching patient enquiries:', error)
    return { enquiries: [], total: 0, totalPages: 0 }
  }

  const enquiries: PatientEnquiry[] = (data || []).map((eq) => {
    const clinic = eq.clinic as unknown as {
      id: string
      name: string
      slug: string
      city: string | null
      country: string | null
    } | null

    return {
      id: eq.id,
      clinic_id: eq.clinic_id,
      clinic_name: clinic?.name || 'Unknown Clinic',
      clinic_slug: clinic?.slug || '',
      clinic_city: clinic?.city || null,
      clinic_country: clinic?.country || null,
      procedure_interest: eq.procedure_interest,
      budget_range: eq.budget_range,
      timeline: eq.timeline,
      message: eq.message,
      status: eq.status,
      created_at: eq.created_at,
      updated_at: eq.updated_at,
    }
  })

  return {
    enquiries,
    total: count || 0,
    totalPages: Math.ceil((count || 0) / limit),
  }
}

export async function getRecentEnquiries(userId: string, limit: number = 3): Promise<PatientEnquiry[]> {
  const { enquiries } = await getPatientEnquiries(userId, { limit })
  return enquiries
}

export async function getSavedClinics(
  userId: string,
  options: {
    sort?: 'date_saved' | 'rating'
    page?: number
    limit?: number
  } = {}
): Promise<{ clinics: SavedClinic[]; total: number; totalPages: number }> {
  const supabase = await createClient()

  const page = options.page || 1
  const limit = options.limit || 20
  const offset = (page - 1) * limit

  const { data, error, count } = await supabase
    .from('saved_clinics')
    .select(
      `
      id,
      clinic_id,
      created_at,
      clinic:clinics(
        id,
        name,
        slug,
        city,
        country,
        accreditations,
        featured,
        claimed,
        photos:clinic_photos(url, sort_order),
        google_reviews(rating, review_count),
        clinic_procedures(price_min, currency),
        clinic_categories(
          category:categories(name, slug)
        )
      )
    `,
      { count: 'exact' }
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching saved clinics:', error)
    return { clinics: [], total: 0, totalPages: 0 }
  }

  const clinics: SavedClinic[] = (data || []).map((item) => {
    const clinic = item.clinic as unknown as {
      id: string
      name: string
      slug: string
      city: string | null
      country: string | null
      accreditations: string[]
      featured: boolean
      claimed: boolean
      photos: Array<{ url: string; sort_order: number }>
      google_reviews: Array<{ rating: number; review_count: number }> | null
      clinic_procedures: Array<{ price_min: number | null; currency: string }>
      clinic_categories: Array<{ category: { name: string; slug: string } }>
    }

    const googleReviews = clinic.google_reviews?.[0]
    const sortedPhotos = [...(clinic.photos || [])].sort((a, b) => a.sort_order - b.sort_order)
    const firstPhoto = sortedPhotos[0]?.url || null
    const minPrice = clinic.clinic_procedures?.reduce(
      (min: number | null, proc: { price_min: number | null }) => {
        if (!proc.price_min) return min
        return min === null ? proc.price_min : Math.min(min, proc.price_min)
      },
      null
    )

    return {
      id: item.id,
      clinic_id: item.clinic_id,
      saved_at: item.created_at,
      clinic: {
        id: clinic.id,
        name: clinic.name,
        slug: clinic.slug,
        city: clinic.city,
        country: clinic.country,
        first_photo: firstPhoto,
        google_rating: googleReviews?.rating || null,
        google_review_count: googleReviews?.review_count || null,
        accreditations: clinic.accreditations || [],
        featured: clinic.featured,
        claimed: clinic.claimed,
        starting_price: minPrice,
        price_currency: clinic.clinic_procedures?.[0]?.currency || 'EUR',
        categories:
          clinic.clinic_categories?.map((cc) => ({
            name: cc.category.name,
            slug: cc.category.slug,
          })) || [],
      },
    }
  })

  // Sort by rating if requested
  if (options.sort === 'rating') {
    clinics.sort((a, b) => (b.clinic.google_rating || 0) - (a.clinic.google_rating || 0))
  }

  return {
    clinics,
    total: count || 0,
    totalPages: Math.ceil((count || 0) / limit),
  }
}

export async function getRecentSavedClinics(userId: string, limit: number = 4): Promise<SavedClinic[]> {
  const { clinics } = await getSavedClinics(userId, { limit })
  return clinics
}

export async function isClinicSaved(userId: string, clinicId: string): Promise<boolean> {
  const supabase = await createClient()

  const { data } = await supabase
    .from('saved_clinics')
    .select('id')
    .eq('user_id', userId)
    .eq('clinic_id', clinicId)
    .single()

  return !!data
}

export async function saveClinic(userId: string, clinicId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase.from('saved_clinics').insert({
    user_id: userId,
    clinic_id: clinicId,
  })

  if (error) {
    if (error.code === '23505') {
      // Already saved
      return { success: true }
    }
    console.error('Error saving clinic:', error)
    return { success: false, error: 'Failed to save clinic' }
  }

  return { success: true }
}

export async function unsaveClinic(userId: string, clinicId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('saved_clinics')
    .delete()
    .eq('user_id', userId)
    .eq('clinic_id', clinicId)

  if (error) {
    console.error('Error unsaving clinic:', error)
    return { success: false, error: 'Failed to unsave clinic' }
  }

  return { success: true }
}

export async function getUserSavedClinicIds(userId: string): Promise<string[]> {
  const supabase = await createClient()

  const { data } = await supabase
    .from('saved_clinics')
    .select('clinic_id')
    .eq('user_id', userId)

  return (data || []).map((item) => item.clinic_id)
}

export async function updatePatientProfile(
  userId: string,
  profileData: {
    fullName?: string
    phone?: string
  }
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('users')
    .update({
      full_name: profileData.fullName,
      phone: profileData.phone,
    })
    .eq('id', userId)

  if (error) {
    console.error('Error updating patient profile:', error)
    return { success: false, error: 'Failed to update profile' }
  }

  return { success: true }
}

export async function updatePatientNotifications(
  userId: string,
  notifications: {
    enquiry_email: boolean
    marketing_email: boolean
    sms_notifications: boolean
  }
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('users')
    .update({
      notification_settings: notifications,
    })
    .eq('id', userId)

  if (error) {
    console.error('Error updating notifications:', error)
    return { success: false, error: 'Failed to update notifications' }
  }

  return { success: true }
}
