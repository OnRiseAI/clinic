import { z } from 'zod'

// Claim verification schema
export const claimVerificationSchema = z.object({
  clinicId: z.string().uuid(),
  method: z.enum(['email', 'phone']),
  code: z.string().length(6, 'Verification code must be 6 digits'),
})

// Claim account creation schema
export const claimAccountSchema = z.object({
  clinicId: z.string().uuid(),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  roleInClinic: z.string().min(1, 'Please select your role'),
})

// Self-registration account schema
export const clinicRegisterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  roleInClinic: z.string().min(1, 'Please select your role'),
})

// Profile wizard step schemas
export const basicInfoSchema = z.object({
  name: z.string().min(2, 'Clinic name must be at least 2 characters'),
  address: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  email: z.string().email().optional().or(z.literal('')),
})

export const specialtiesSchema = z.object({
  categoryIds: z.array(z.string().uuid()).min(1, 'Select at least one specialty'),
})

export const proceduresSchema = z.object({
  procedures: z.array(
    z.object({
      procedureId: z.string().uuid(),
      priceMin: z.number().min(0).optional(),
      priceMax: z.number().min(0).optional(),
      currency: z.string().default('EUR'),
    })
  ),
})

export const aboutSchema = z.object({
  description: z.string().max(5000).optional(),
  yearEstablished: z.number().min(1800).max(new Date().getFullYear()).optional(),
  languages: z.array(z.string()),
})

export const photosSchema = z.object({
  photos: z.array(
    z.object({
      url: z.string().url(),
      altText: z.string().optional(),
      sortOrder: z.number(),
    })
  ),
})

export const doctorSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  title: z.string().optional(),
  specialisation: z.string().optional(),
  qualifications: z.array(z.string()),
  yearsExperience: z.number().min(0).optional(),
  languages: z.array(z.string()),
  bio: z.string().max(2000).optional(),
  photoUrl: z.string().url().optional().or(z.literal('')),
})

export const accreditationsSchema = z.object({
  accreditations: z.array(z.string()),
  certifications: z.array(z.string()),
})

// Complete profile schema
export const clinicProfileSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  address: z.string().optional(),
  city: z.string().min(1),
  country: z.string().min(1),
  phone: z.string().optional(),
  website: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  yearEstablished: z.number().optional(),
  languages: z.array(z.string()),
  accreditations: z.array(z.string()),
  certifications: z.array(z.string()),
  operatingHours: z.record(z.string(), z.string()).optional(),
  insuranceAccepted: z.array(z.string()),
})

// Type exports
export type ClaimVerificationData = z.infer<typeof claimVerificationSchema>
export type ClaimAccountData = z.infer<typeof claimAccountSchema>
export type ClinicRegisterData = z.infer<typeof clinicRegisterSchema>
export type BasicInfoData = z.infer<typeof basicInfoSchema>
export type SpecialtiesData = z.infer<typeof specialtiesSchema>
export type ProceduresData = z.infer<typeof proceduresSchema>
export type AboutData = z.infer<typeof aboutSchema>
export type PhotosData = z.infer<typeof photosSchema>
export type DoctorData = z.infer<typeof doctorSchema>
export type AccreditationsData = z.infer<typeof accreditationsSchema>
export type ClinicProfileData = z.infer<typeof clinicProfileSchema>

// Role options for clinic staff
export const CLINIC_ROLE_OPTIONS = [
  { value: 'owner', label: 'Owner' },
  { value: 'manager', label: 'Manager' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'admin', label: 'Administrator' },
  { value: 'other', label: 'Other' },
] as const

// Common languages
export const LANGUAGE_OPTIONS = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Turkish',
  'Arabic',
  'Russian',
  'Chinese',
  'Japanese',
  'Korean',
  'Thai',
  'Hindi',
  'Polish',
  'Dutch',
  'Greek',
  'Hungarian',
  'Czech',
  'Romanian',
] as const

// Common accreditations
export const ACCREDITATION_OPTIONS = [
  { value: 'JCI', label: 'Joint Commission International (JCI)' },
  { value: 'ISO', label: 'ISO 9001' },
  { value: 'TEMOS', label: 'TEMOS International' },
  { value: 'NABH', label: 'NABH (India)' },
  { value: 'DNV', label: 'DNV Healthcare' },
  { value: 'ACHC', label: 'ACHC' },
  { value: 'AACI', label: 'AACI' },
] as const

// Profile completion calculation
export interface ProfileCompletionItem {
  id: string
  label: string
  completed: boolean
  link: string
}

export function calculateProfileCompletion(clinic: {
  description?: string | null
  photos?: { length: number }
  doctors?: { length: number }
  clinic_procedures?: { length: number }
  accreditations?: string[]
  languages?: string[]
}): { percentage: number; items: ProfileCompletionItem[] } {
  const items: ProfileCompletionItem[] = [
    {
      id: 'description',
      label: 'Add clinic description',
      completed: !!clinic.description && clinic.description.length > 50,
      link: '/clinic/profile#description',
    },
    {
      id: 'photos',
      label: 'Upload clinic photos',
      completed: (clinic.photos?.length || 0) >= 3,
      link: '/clinic/profile#photos',
    },
    {
      id: 'doctors',
      label: 'Add doctor profiles',
      completed: (clinic.doctors?.length || 0) >= 1,
      link: '/clinic/doctors',
    },
    {
      id: 'procedures',
      label: 'Add procedures & pricing',
      completed: (clinic.clinic_procedures?.length || 0) >= 1,
      link: '/clinic/profile#procedures',
    },
    {
      id: 'accreditations',
      label: 'Add accreditations',
      completed: (clinic.accreditations?.length || 0) >= 1,
      link: '/clinic/profile#accreditations',
    },
    {
      id: 'languages',
      label: 'Add languages spoken',
      completed: (clinic.languages?.length || 0) >= 1,
      link: '/clinic/profile#languages',
    },
  ]

  const completedCount = items.filter((item) => item.completed).length
  const percentage = Math.round((completedCount / items.length) * 100)

  return { percentage, items }
}
