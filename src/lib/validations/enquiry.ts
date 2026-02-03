import { z } from 'zod'

// Enum values for form options
export const TRAVEL_READINESS_OPTIONS = [
  { value: 'ready', label: "Yes, I'm ready" },
  { value: 'researching', label: "I'm still researching" },
  { value: 'planned', label: "I've already planned my trip" },
] as const

export const BUDGET_OPTIONS = [
  { value: 'under_1000', label: 'Under €1,000' },
  { value: '1000_5000', label: '€1,000–€5,000' },
  { value: '5000_15000', label: '€5,000–€15,000' },
  { value: '15000_plus', label: '€15,000+' },
  { value: 'not_sure', label: 'Not sure yet' },
] as const

export const TIMELINE_OPTIONS = [
  { value: 'within_1_month', label: 'Within 1 month' },
  { value: '1_3_months', label: '1–3 months' },
  { value: '3_6_months', label: '3–6 months' },
  { value: 'researching', label: 'Just researching' },
] as const

// Travel readiness enum values
const travelReadinessValues = ['ready', 'researching', 'planned'] as const
type TravelReadiness = (typeof travelReadinessValues)[number]

// Timeline enum values
const timelineValues = ['within_1_month', '1_3_months', '3_6_months', 'researching'] as const
type Timeline = (typeof timelineValues)[number]

// Step 1: Procedure Interest
export const procedureInterestSchema = z.object({
  procedureInterest: z.string().min(1, 'Please select or enter a procedure'),
})

// Step 2: Travel Readiness
export const travelReadinessSchema = z.object({
  willingToTravel: z.enum(travelReadinessValues, {
    message: 'Please select your travel readiness',
  }),
})

// Step 3: Preferred Destinations
export const preferredDestinationsSchema = z.object({
  preferredDestinations: z.array(z.string()).default([]),
  noPreference: z.boolean().default(false),
})

// Step 4: Budget
export const budgetSchema = z.object({
  budgetRange: z.string().optional(),
})

// Step 5: Timeline
export const timelineSchema = z.object({
  timeline: z.enum(timelineValues, {
    message: 'Please select your timeline',
  }),
})

// Step 6: Contact Details
export const contactDetailsSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
})

// Step 7: Additional Message
export const additionalMessageSchema = z.object({
  message: z.string().max(2000, 'Message must be less than 2000 characters').optional(),
})

// Complete enquiry schema
export const enquirySchema = z.object({
  clinicId: z.string().uuid('Invalid clinic ID'),
  procedureInterest: z.string().min(1, 'Please select or enter a procedure'),
  willingToTravel: z.enum(travelReadinessValues),
  preferredDestinations: z.array(z.string()).default([]),
  budgetRange: z.string().optional(),
  timeline: z.enum(timelineValues),
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(8),
  message: z.string().max(2000).optional(),
})

export type EnquiryFormData = z.infer<typeof enquirySchema>

// Types for each step
export type ProcedureInterestData = z.infer<typeof procedureInterestSchema>
export type TravelReadinessData = z.infer<typeof travelReadinessSchema>
export type PreferredDestinationsData = z.infer<typeof preferredDestinationsSchema>
export type BudgetData = z.infer<typeof budgetSchema>
export type TimelineData = z.infer<typeof timelineSchema>
export type ContactDetailsData = z.infer<typeof contactDetailsSchema>
export type AdditionalMessageData = z.infer<typeof additionalMessageSchema>

// Export types for external use
export type { TravelReadiness, Timeline }

// API response types
export interface EnquiryResponse {
  id: string
  status: 'submitted' | 'viewed' | 'responded' | 'closed'
  createdAt: string
}

export interface Destination {
  id: string
  country_name: string
  country_code: string
  slug: string
}

export interface ClinicProcedureOption {
  id: string
  name: string
}
