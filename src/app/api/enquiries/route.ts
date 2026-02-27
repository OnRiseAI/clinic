import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { enquirySchema } from '@/lib/validations/enquiry'
import { sendEmail } from '@/lib/email/resend'
import { clinicNotificationTemplate, patientConfirmationTemplate } from '@/lib/email/templates'
import { sendSms, formatClinicNotificationSms } from '@/lib/sms/twilio'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
const LEAD_TEST_RECIPIENT_EMAIL = process.env.LEAD_TEST_RECIPIENT_EMAIL?.trim() || ''
const LEAD_TEST_MODE = process.env.LEAD_TEST_MODE === 'true'
const LEAD_CC_EMAILS = (process.env.LEAD_CC_EMAILS || 'jon@meetyourclinic.com')
  .split(',')
  .map((email) => email.trim())
  .filter(Boolean)

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const getErrorMessage = (error: unknown) =>
  error && typeof error === 'object' && 'message' in error ? String(error.message) : String(error || '')

const parseMissingColumn = (error: unknown): string | null => {
  const message = getErrorMessage(error)
  const match = message.match(/Could not find the '([^']+)' column/i)
  return match?.[1] || null
}

async function insertEnquiryAdaptive(
  supabase: Awaited<ReturnType<typeof createClient>>,
  payload: Record<string, unknown>
) {
  let workingPayload = { ...payload }

  for (let attempt = 0; attempt < 8; attempt++) {
    const { data, error } = await supabase
      .from('enquiries')
      .insert(workingPayload)
      .select('id, created_at')
      .single()

    if (!error && data) {
      return { data, error: null }
    }

    const missingColumn = parseMissingColumn(error)
    if (missingColumn && missingColumn in workingPayload) {
      delete workingPayload[missingColumn]
      continue
    }

    return { data: null, error }
  }

  return { data: null, error: new Error('Adaptive enquiry insert exceeded retry attempts') }
}

async function sendSmsWithRetry(to: string, message: string, attempts = 3) {
  let lastError: unknown = null
  for (let i = 1; i <= attempts; i++) {
    try {
      await sendSms({ to, message })
      return
    } catch (error) {
      lastError = error
      if (i < attempts) {
        await sleep(500 * i)
      }
    }
  }
  throw lastError
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const validationResult = enquirySchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }

    const data = validationResult.data
    const supabase = await createClient()

    // Get current user (if logged in)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Keep anonymous submissions anonymous to avoid RLS violations on users table.
    // If authenticated, we link the enquiry to the logged-in user id.
    const patientUserId = user?.id || null

    // Get clinic details for notifications
    const { data: clinic, error: clinicError } = await supabase
      .from('clinics')
      .select('id, name, email, phone')
      .eq('id', data.clinicId)
      .single()

    if (clinicError || !clinic) {
      return NextResponse.json({ error: 'Clinic not found' }, { status: 404 })
    }

    const canonicalPayload = {
      patient_user_id: patientUserId,
      clinic_id: data.clinicId,
      procedure_interest: data.procedureInterest,
      willing_to_travel: data.willingToTravel,
      preferred_destinations: data.preferredDestinations,
      budget_range: data.budgetRange || null,
      timeline: data.timeline,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      message: data.message || null,
    }

    const legacyPayload = {
      patient_user_id: patientUserId,
      clinic_id: data.clinicId,
      procedure: data.procedureInterest,
      timeline: data.timeline,
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      message: data.message || null,
      type: 'form',
      intent_level: data.willingToTravel === 'ready' ? 'high' : 'low',
      source_page: request.headers.get('referer') || null,
    }

    let enquiryResult = await insertEnquiryAdaptive(supabase, canonicalPayload)
    if (enquiryResult.error && parseMissingColumn(enquiryResult.error)) {
      enquiryResult = await insertEnquiryAdaptive(supabase, legacyPayload)
    }
    const enquiry = enquiryResult.data
    const enquiryError = enquiryResult.error

    if (enquiryError) {
      console.error('Error creating enquiry:', enquiryError)
      return NextResponse.json(
        {
          error: 'Failed to create enquiry',
          detail: getErrorMessage(enquiryError),
        },
        { status: 500 }
      )
    }

    if (!enquiry) {
      return NextResponse.json(
        {
          error: 'Failed to create enquiry',
          detail: 'Enquiry insert returned no data',
        },
        { status: 500 }
      )
    }

    const clinicLeadRecipient = LEAD_TEST_MODE
      ? LEAD_TEST_RECIPIENT_EMAIL || clinic.email
      : clinic.email

    // Required delivery channel: clinic email must succeed for a successful submission response.
    if (!clinicLeadRecipient) {
      return NextResponse.json(
        {
          error: 'Lead saved in portal, but clinic email is not configured',
          code: 'CLINIC_EMAIL_NOT_CONFIGURED',
          enquiryId: enquiry.id,
          leadSavedInPortal: true,
        },
        { status: 424 }
      )
    }

    try {
      await sendEmail({
        to: clinicLeadRecipient,
        cc: LEAD_CC_EMAILS.length > 0 ? LEAD_CC_EMAILS : undefined,
        subject: `New Patient Enquiry — ${data.procedureInterest} from ${data.fullName}`,
        html: clinicNotificationTemplate({
          patientName: data.fullName,
          patientEmail: data.email,
          patientPhone: data.phone,
          procedureInterest: data.procedureInterest,
          willingToTravel: data.willingToTravel,
          preferredDestinations: data.preferredDestinations,
          budgetRange: data.budgetRange,
          timeline: data.timeline,
          message: data.message,
          clinicName: clinic.name,
          dashboardUrl: `${BASE_URL}/clinic/enquiries/${enquiry.id}`,
        }),
      })
      console.log('Clinic notification email sent')
    } catch (error) {
      console.error('Failed to send clinic notification email:', error)
      return NextResponse.json(
        {
          error: 'Lead saved in portal, but clinic email delivery failed',
          code: 'CLINIC_EMAIL_DELIVERY_FAILED',
          enquiryId: enquiry.id,
          leadSavedInPortal: true,
        },
        { status: 424 }
      )
    }

    // SMS to clinic is eventual delivery: run async with retries.
    if (clinic.phone) {
      void sendSmsWithRetry(clinic.phone, formatClinicNotificationSms(data.fullName, data.procedureInterest))
        .then(() => {
          console.log('Clinic SMS notification sent')
        })
        .catch((error) => {
          console.error('Failed to send clinic SMS:', error)
        })
    }

    // Patient confirmation email remains best-effort and non-blocking.
    void sendEmail({
      to: data.email,
      subject: `Your enquiry has been sent to ${clinic.name}`,
      html: patientConfirmationTemplate({
        patientName: data.fullName,
        clinicName: clinic.name,
        procedureInterest: data.procedureInterest,
        willingToTravel: data.willingToTravel,
        preferredDestinations: data.preferredDestinations,
        budgetRange: data.budgetRange,
        timeline: data.timeline,
        message: data.message,
        enquiriesUrl: `${BASE_URL}/dashboard/enquiries`,
        browseUrl: `${BASE_URL}/clinics`,
      }),
    })
      .then(() => {
        console.log('Patient confirmation email sent')
      })
      .catch((error) => {
        console.error('Failed to send patient confirmation email:', error)
      })

    return NextResponse.json({
      id: enquiry.id,
      status: 'submitted',
      createdAt: enquiry.created_at,
    })
  } catch (error) {
    console.error('Error in POST /api/enquiries:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user role
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')
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
        updated_at,
        clinic:clinics(id, name, slug, city, country)
      `,
        { count: 'exact' }
      )

    // Filter based on user role
    if (userData.role === 'patient') {
      query = query.eq('patient_user_id', user.id)
    } else if (userData.role === 'clinic') {
      // Get clinics owned by this user
      const { data: userClinics } = await supabase
        .from('clinics')
        .select('id')
        .eq('user_id', user.id)

      if (!userClinics || userClinics.length === 0) {
        return NextResponse.json({ enquiries: [], total: 0, page, totalPages: 0 })
      }

      const clinicIds = userClinics.map((c) => c.id)
      query = query.in('clinic_id', clinicIds)
    } else if (userData.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Apply status filter
    if (status && ['submitted', 'viewed', 'responded', 'closed'].includes(status)) {
      query = query.eq('status', status)
    }

    // Apply pagination and ordering
    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1)

    const { data: enquiries, error: queryError, count } = await query

    if (queryError) {
      console.error('Error fetching enquiries:', queryError)
      return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 })
    }

    return NextResponse.json({
      enquiries: enquiries || [],
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    })
  } catch (error) {
    console.error('Error in GET /api/enquiries:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
