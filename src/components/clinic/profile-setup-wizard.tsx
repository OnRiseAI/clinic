'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { m, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Check, ChevronLeft, ChevronRight, Loader2, Building2 } from 'lucide-react'
import { LANGUAGE_OPTIONS, ACCREDITATION_OPTIONS } from '@/lib/validations/clinic'

interface Category {
  id: string
  name: string
  slug: string
  icon?: string | null
}

interface Procedure {
  id: string
  name: string
  slug: string
  category_id: string | null
}

interface ProfileSetupWizardProps {
  userId: string
  categories: Category[]
  procedures: Procedure[]
  countries: string[]
}

interface WizardData {
  // Step 1: Basic Info
  name: string
  address: string
  city: string
  country: string
  phone: string
  website: string
  email: string
  // Step 2: Specialties
  categoryIds: string[]
  // Step 3: Procedures
  procedures: Array<{
    procedureId: string
    priceMin: string
    priceMax: string
    currency: string
  }>
  // Step 4: About
  description: string
  yearEstablished: string
  languages: string[]
  // Step 5: Photos (handled separately)
  // Step 6: Doctors (handled separately)
  // Step 7: Accreditations
  accreditations: string[]
  certifications: string[]
}

const STEPS = [
  { id: 1, title: 'Basic Info', description: 'Clinic details' },
  { id: 2, title: 'Specialties', description: 'Treatment categories' },
  { id: 3, title: 'Procedures', description: 'Services & pricing' },
  { id: 4, title: 'About', description: 'Description & languages' },
  { id: 5, title: 'Photos', description: 'Clinic images' },
  { id: 6, title: 'Doctors', description: 'Your team' },
  { id: 7, title: 'Accreditations', description: 'Certifications' },
  { id: 8, title: 'Review', description: 'Confirm details' },
]

export function ProfileSetupWizard({
  userId,
  categories,
  procedures,
  countries,
}: ProfileSetupWizardProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [clinicId, setClinicId] = useState<string | null>(null)

  const [data, setData] = useState<WizardData>({
    name: '',
    address: '',
    city: '',
    country: '',
    phone: '',
    website: '',
    email: '',
    categoryIds: [],
    procedures: [],
    description: '',
    yearEstablished: '',
    languages: [],
    accreditations: [],
    certifications: [],
  })

  // Load saved progress from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(`clinic-setup-${userId}`)
    const savedStep = localStorage.getItem(`clinic-setup-step-${userId}`)
    const savedClinicId = localStorage.getItem(`clinic-setup-clinicId-${userId}`)

    if (savedData) {
      try {
        setData(JSON.parse(savedData))
      } catch {
        // Invalid data
      }
    }
    if (savedStep) {
      setCurrentStep(parseInt(savedStep))
    }
    if (savedClinicId) {
      setClinicId(savedClinicId)
    }
  }, [userId])

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(`clinic-setup-${userId}`, JSON.stringify(data))
    localStorage.setItem(`clinic-setup-step-${userId}`, currentStep.toString())
    if (clinicId) {
      localStorage.setItem(`clinic-setup-clinicId-${userId}`, clinicId)
    }
  }, [data, currentStep, clinicId, userId])

  const updateData = (updates: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return data.name.length >= 2 && data.city.length > 0 && data.country.length > 0
      case 2:
        return data.categoryIds.length > 0
      default:
        return true
    }
  }

  const handleNext = async () => {
    if (!validateStep(currentStep)) {
      setError('Please fill in all required fields')
      return
    }

    setError('')

    // Save clinic after step 1
    if (currentStep === 1 && !clinicId) {
      setIsLoading(true)
      try {
        const response = await fetch('/api/clinic/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            address: data.address,
            city: data.city,
            country: data.country,
            phone: data.phone,
            website: data.website,
            email: data.email,
          }),
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Failed to create clinic')
        }

        setClinicId(result.id)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save')
        return
      } finally {
        setIsLoading(false)
      }
    }

    // Update clinic data on subsequent steps
    if (currentStep > 1 && clinicId) {
      setIsLoading(true)
      try {
        await fetch(`/api/clinic/profile/${clinicId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(getStepData(currentStep)),
        })
      } catch {
        // Continue even if auto-save fails
      } finally {
        setIsLoading(false)
      }
    }

    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    setError('')
  }

  const handleFinish = async () => {
    setIsLoading(true)
    setError('')

    try {
      // Final save and publish
      const response = await fetch(`/api/clinic/profile/${clinicId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to publish clinic')
      }

      // Clear saved progress
      localStorage.removeItem(`clinic-setup-${userId}`)
      localStorage.removeItem(`clinic-setup-step-${userId}`)
      localStorage.removeItem(`clinic-setup-clinicId-${userId}`)

      // Redirect to dashboard with welcome modal
      router.push('/clinic?welcome=true')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to publish')
    } finally {
      setIsLoading(false)
    }
  }

  const getStepData = (step: number) => {
    switch (step) {
      case 2:
        return { categoryIds: data.categoryIds }
      case 3:
        return { procedures: data.procedures }
      case 4:
        return {
          description: data.description,
          yearEstablished: data.yearEstablished ? parseInt(data.yearEstablished) : null,
          languages: data.languages,
        }
      case 7:
        return {
          accreditations: data.accreditations,
          certifications: data.certifications,
        }
      default:
        return {}
    }
  }

  const filteredProcedures = procedures.filter(
    (p) => !p.category_id || data.categoryIds.includes(p.category_id)
  )

  const slideVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100">
          <Building2 className="h-8 w-8 text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900">Set Up Your Clinic Profile</h1>
        <p className="mt-2 text-neutral-600">
          Complete your profile to start receiving patient enquiries
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex min-w-max justify-center gap-2">
          {STEPS.map((step, index) => (
            <button
              key={step.id}
              onClick={() => index < currentStep && setCurrentStep(step.id)}
              disabled={index >= currentStep}
              className={cn(
                'flex flex-col items-center px-3 py-2',
                index < currentStep && 'cursor-pointer'
              )}
            >
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors',
                  currentStep === step.id
                    ? 'bg-primary-600 text-white'
                    : index < currentStep
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-neutral-100 text-neutral-400'
                )}
              >
                {index < currentStep ? <Check className="h-4 w-4" /> : step.id}
              </div>
              <span
                className={cn(
                  'mt-1 text-xs',
                  currentStep === step.id ? 'font-medium text-primary-600' : 'text-neutral-500'
                )}
              >
                {step.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <AnimatePresence mode="wait">
          <m.div
            key={currentStep}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <StepBasicInfo data={data} updateData={updateData} countries={countries} />
            )}
            {currentStep === 2 && (
              <StepSpecialties data={data} updateData={updateData} categories={categories} />
            )}
            {currentStep === 3 && (
              <StepProcedures data={data} updateData={updateData} procedures={filteredProcedures} />
            )}
            {currentStep === 4 && <StepAbout data={data} updateData={updateData} />}
            {currentStep === 5 && <StepPhotos clinicId={clinicId} />}
            {currentStep === 6 && <StepDoctors clinicId={clinicId} />}
            {currentStep === 7 && <StepAccreditations data={data} updateData={updateData} />}
            {currentStep === 8 && (
              <StepReview data={data} categories={categories} procedures={procedures} />
            )}
          </m.div>
        </AnimatePresence>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">{error}</p>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-neutral-100 pt-6">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 1 || isLoading}
            className={cn(currentStep === 1 && 'invisible')}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>

          {currentStep < STEPS.length ? (
            <Button onClick={handleNext} variant="primary" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  {currentStep === 1 ? 'Save & Continue' : 'Continue'}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          ) : (
            <Button onClick={handleFinish} variant="accent" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                'Publish Clinic'
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Skip for now */}
      {currentStep > 1 && currentStep < STEPS.length && (
        <p className="mt-4 text-center text-sm text-neutral-500">
          <button
            onClick={handleNext}
            className="text-primary-600 hover:text-primary-700 hover:underline"
          >
            Skip this step for now
          </button>
        </p>
      )}
    </div>
  )
}

// Step Components

function StepBasicInfo({
  data,
  updateData,
  countries,
}: {
  data: WizardData
  updateData: (updates: Partial<WizardData>) => void
  countries: string[]
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">Basic Information</h2>
        <p className="mt-1 text-neutral-600">Tell us about your clinic</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Clinic Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => updateData({ name: e.target.value })}
          className="w-full rounded-xl border-2 border-neutral-200 px-4 py-3 focus:border-primary-500 focus:outline-none"
          placeholder="Enter clinic name"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => updateData({ city: e.target.value })}
            className="w-full rounded-xl border-2 border-neutral-200 px-4 py-3 focus:border-primary-500 focus:outline-none"
            placeholder="City"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            value={data.country}
            onChange={(e) => updateData({ country: e.target.value })}
            className="w-full rounded-xl border-2 border-neutral-200 px-4 py-3 focus:border-primary-500 focus:outline-none"
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">Address</label>
        <input
          type="text"
          value={data.address}
          onChange={(e) => updateData({ address: e.target.value })}
          className="w-full rounded-xl border-2 border-neutral-200 px-4 py-3 focus:border-primary-500 focus:outline-none"
          placeholder="Street address"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">Phone</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            className="w-full rounded-xl border-2 border-neutral-200 px-4 py-3 focus:border-primary-500 focus:outline-none"
            placeholder="+1 234 567 8900"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className="w-full rounded-xl border-2 border-neutral-200 px-4 py-3 focus:border-primary-500 focus:outline-none"
            placeholder="clinic@example.com"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">Website</label>
        <input
          type="url"
          value={data.website}
          onChange={(e) => updateData({ website: e.target.value })}
          className="w-full rounded-xl border-2 border-neutral-200 px-4 py-3 focus:border-primary-500 focus:outline-none"
          placeholder="https://www.example.com"
        />
      </div>
    </div>
  )
}

function StepSpecialties({
  data,
  updateData,
  categories,
}: {
  data: WizardData
  updateData: (updates: Partial<WizardData>) => void
  categories: Category[]
}) {
  const toggleCategory = (id: string) => {
    const newIds = data.categoryIds.includes(id)
      ? data.categoryIds.filter((c) => c !== id)
      : [...data.categoryIds, id]
    updateData({ categoryIds: newIds })
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">Specialties</h2>
        <p className="mt-1 text-neutral-600">
          Select the treatment categories your clinic offers
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={cn(
              'flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all',
              data.categoryIds.includes(category.id)
                ? 'border-primary-600 bg-primary-50'
                : 'border-neutral-200 hover:border-neutral-300'
            )}
          >
            <div
              className={cn(
                'flex h-5 w-5 items-center justify-center rounded border',
                data.categoryIds.includes(category.id)
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-neutral-300'
              )}
            >
              {data.categoryIds.includes(category.id) && <Check className="h-3 w-3" />}
            </div>
            <span className="flex items-center gap-2">
              {category.icon && <span>{category.icon}</span>}
              <span className="font-medium">{category.name}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function StepProcedures({
  data,
  updateData,
  procedures,
}: {
  data: WizardData
  updateData: (updates: Partial<WizardData>) => void
  procedures: Procedure[]
}) {
  const addProcedure = (procedureId: string) => {
    if (!data.procedures.find((p) => p.procedureId === procedureId)) {
      updateData({
        procedures: [
          ...data.procedures,
          { procedureId, priceMin: '', priceMax: '', currency: 'EUR' },
        ],
      })
    }
  }

  const removeProcedure = (procedureId: string) => {
    updateData({
      procedures: data.procedures.filter((p) => p.procedureId !== procedureId),
    })
  }

  const updateProcedurePrice = (
    procedureId: string,
    field: 'priceMin' | 'priceMax',
    value: string
  ) => {
    updateData({
      procedures: data.procedures.map((p) =>
        p.procedureId === procedureId ? { ...p, [field]: value } : p
      ),
    })
  }

  const selectedIds = data.procedures.map((p) => p.procedureId)
  const availableProcedures = procedures.filter((p) => !selectedIds.includes(p.id))

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">Procedures & Pricing</h2>
        <p className="mt-1 text-neutral-600">Add the procedures you offer and optional pricing</p>
      </div>

      {/* Selected Procedures */}
      {data.procedures.length > 0 && (
        <div className="space-y-3">
          {data.procedures.map((proc) => {
            const procedure = procedures.find((p) => p.id === proc.procedureId)
            if (!procedure) return null

            return (
              <div
                key={proc.procedureId}
                className="rounded-xl border border-neutral-200 bg-neutral-50 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{procedure.name}</span>
                  <button
                    onClick={() => removeProcedure(proc.procedureId)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm text-neutral-500">Price range (EUR):</span>
                  <input
                    type="number"
                    value={proc.priceMin}
                    onChange={(e) => updateProcedurePrice(proc.procedureId, 'priceMin', e.target.value)}
                    placeholder="Min"
                    className="w-24 rounded-lg border border-neutral-200 px-2 py-1 text-sm"
                  />
                  <span className="text-neutral-400">—</span>
                  <input
                    type="number"
                    value={proc.priceMax}
                    onChange={(e) => updateProcedurePrice(proc.procedureId, 'priceMax', e.target.value)}
                    placeholder="Max"
                    className="w-24 rounded-lg border border-neutral-200 px-2 py-1 text-sm"
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Available Procedures */}
      {availableProcedures.length > 0 && (
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">Add Procedures</label>
          <div className="max-h-64 overflow-y-auto rounded-xl border border-neutral-200">
            {availableProcedures.map((procedure) => (
              <button
                key={procedure.id}
                onClick={() => addProcedure(procedure.id)}
                className="flex w-full items-center justify-between border-b border-neutral-100 px-4 py-3 text-left transition-colors last:border-0 hover:bg-neutral-50"
              >
                <span>{procedure.name}</span>
                <span className="text-sm text-primary-600">+ Add</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {data.procedures.length === 0 && availableProcedures.length === 0 && (
        <p className="text-center text-neutral-500">
          Select specialties first to see available procedures
        </p>
      )}
    </div>
  )
}

function StepAbout({
  data,
  updateData,
}: {
  data: WizardData
  updateData: (updates: Partial<WizardData>) => void
}) {
  const toggleLanguage = (lang: string) => {
    const newLangs = data.languages.includes(lang)
      ? data.languages.filter((l) => l !== lang)
      : [...data.languages, lang]
    updateData({ languages: newLangs })
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">About Your Clinic</h2>
        <p className="mt-1 text-neutral-600">Tell patients what makes your clinic special</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">Description</label>
        <textarea
          value={data.description}
          onChange={(e) => updateData({ description: e.target.value })}
          rows={5}
          className="w-full rounded-xl border-2 border-neutral-200 px-4 py-3 focus:border-primary-500 focus:outline-none"
          placeholder="Describe your clinic, facilities, and what sets you apart..."
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">Year Established</label>
        <input
          type="number"
          value={data.yearEstablished}
          onChange={(e) => updateData({ yearEstablished: e.target.value })}
          min="1900"
          max={new Date().getFullYear()}
          className="w-full rounded-xl border-2 border-neutral-200 px-4 py-3 focus:border-primary-500 focus:outline-none sm:w-40"
          placeholder="e.g., 2010"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">Languages Spoken</label>
        <div className="flex flex-wrap gap-2">
          {LANGUAGE_OPTIONS.map((lang) => (
            <button
              key={lang}
              onClick={() => toggleLanguage(lang)}
              className={cn(
                'rounded-full px-3 py-1.5 text-sm transition-colors',
                data.languages.includes(lang)
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              )}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function StepPhotos({ clinicId }: { clinicId: string | null }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">Clinic Photos</h2>
        <p className="mt-1 text-neutral-600">
          Add photos of your clinic to attract patients
        </p>
      </div>

      <div className="rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
          <span className="text-2xl">📷</span>
        </div>
        <p className="text-neutral-600">Drag and drop photos here, or click to browse</p>
        <p className="mt-2 text-sm text-neutral-400">PNG, JPG up to 5MB. Recommended: 1200x800px</p>
        <Button variant="outline" className="mt-4">
          Upload Photos
        </Button>
      </div>

      {!clinicId && (
        <p className="text-center text-sm text-amber-600">
          Complete basic info first to enable photo uploads
        </p>
      )}
    </div>
  )
}

function StepDoctors({ clinicId }: { clinicId: string | null }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">Doctor Profiles</h2>
        <p className="mt-1 text-neutral-600">Showcase your medical team</p>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
          <span className="text-2xl">👨‍⚕️</span>
        </div>
        <p className="text-neutral-600">Add profiles for your doctors and medical staff</p>
        <Button variant="outline" className="mt-4">
          Add Doctor
        </Button>
      </div>

      {!clinicId && (
        <p className="text-center text-sm text-amber-600">
          Complete basic info first to add doctors
        </p>
      )}
    </div>
  )
}

function StepAccreditations({
  data,
  updateData,
}: {
  data: WizardData
  updateData: (updates: Partial<WizardData>) => void
}) {
  const toggleAccreditation = (value: string) => {
    const newAccs = data.accreditations.includes(value)
      ? data.accreditations.filter((a) => a !== value)
      : [...data.accreditations, value]
    updateData({ accreditations: newAccs })
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">Accreditations & Certifications</h2>
        <p className="mt-1 text-neutral-600">Add your quality certifications</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {ACCREDITATION_OPTIONS.map((acc) => (
          <button
            key={acc.value}
            onClick={() => toggleAccreditation(acc.value)}
            className={cn(
              'flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all',
              data.accreditations.includes(acc.value)
                ? 'border-primary-600 bg-primary-50'
                : 'border-neutral-200 hover:border-neutral-300'
            )}
          >
            <div
              className={cn(
                'flex h-5 w-5 items-center justify-center rounded border',
                data.accreditations.includes(acc.value)
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-neutral-300'
              )}
            >
              {data.accreditations.includes(acc.value) && <Check className="h-3 w-3" />}
            </div>
            <span className="font-medium">{acc.label}</span>
          </button>
        ))}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Other Certifications
        </label>
        <input
          type="text"
          value={data.certifications.join(', ')}
          onChange={(e) =>
            updateData({
              certifications: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
            })
          }
          className="w-full rounded-xl border-2 border-neutral-200 px-4 py-3 focus:border-primary-500 focus:outline-none"
          placeholder="Enter other certifications, separated by commas"
        />
      </div>
    </div>
  )
}

function StepReview({
  data,
  categories,
  procedures,
}: {
  data: WizardData
  categories: Category[]
  procedures: Procedure[]
}) {
  const selectedCategories = categories.filter((c) => data.categoryIds.includes(c.id))
  const selectedProcedures = data.procedures
    .map((p) => {
      const proc = procedures.find((pr) => pr.id === p.procedureId)
      return proc ? { ...proc, priceMin: p.priceMin, priceMax: p.priceMax } : null
    })
    .filter(Boolean)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">Review Your Profile</h2>
        <p className="mt-1 text-neutral-600">
          Make sure everything looks good before publishing
        </p>
      </div>

      {/* Basic Info */}
      <div className="rounded-xl border border-neutral-200 p-4">
        <h3 className="font-semibold text-neutral-900">Basic Information</h3>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-neutral-500">Name</dt>
            <dd className="font-medium">{data.name || '—'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">Location</dt>
            <dd className="font-medium">
              {[data.city, data.country].filter(Boolean).join(', ') || '—'}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">Phone</dt>
            <dd className="font-medium">{data.phone || '—'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">Email</dt>
            <dd className="font-medium">{data.email || '—'}</dd>
          </div>
        </dl>
      </div>

      {/* Specialties */}
      {selectedCategories.length > 0 && (
        <div className="rounded-xl border border-neutral-200 p-4">
          <h3 className="font-semibold text-neutral-900">Specialties</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedCategories.map((cat) => (
              <span
                key={cat.id}
                className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700"
              >
                {cat.icon} {cat.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Procedures */}
      {selectedProcedures.length > 0 && (
        <div className="rounded-xl border border-neutral-200 p-4">
          <h3 className="font-semibold text-neutral-900">
            Procedures ({selectedProcedures.length})
          </h3>
          <ul className="mt-3 space-y-1 text-sm">
            {selectedProcedures.slice(0, 5).map((proc) => (
              <li key={proc!.id} className="flex justify-between">
                <span>{proc!.name}</span>
                {proc!.priceMin && (
                  <span className="text-neutral-500">
                    €{proc!.priceMin}
                    {proc!.priceMax && ` — €${proc!.priceMax}`}
                  </span>
                )}
              </li>
            ))}
            {selectedProcedures.length > 5 && (
              <li className="text-neutral-500">+{selectedProcedures.length - 5} more</li>
            )}
          </ul>
        </div>
      )}

      {/* Languages & Accreditations */}
      <div className="grid gap-4 sm:grid-cols-2">
        {data.languages.length > 0 && (
          <div className="rounded-xl border border-neutral-200 p-4">
            <h3 className="font-semibold text-neutral-900">Languages</h3>
            <p className="mt-2 text-sm text-neutral-600">{data.languages.join(', ')}</p>
          </div>
        )}
        {data.accreditations.length > 0 && (
          <div className="rounded-xl border border-neutral-200 p-4">
            <h3 className="font-semibold text-neutral-900">Accreditations</h3>
            <p className="mt-2 text-sm text-neutral-600">{data.accreditations.join(', ')}</p>
          </div>
        )}
      </div>

      <div className="rounded-xl bg-primary-50 p-4">
        <p className="text-sm text-primary-800">
          <strong>Note:</strong> You can always edit your profile later from your dashboard.
        </p>
      </div>
    </div>
  )
}
