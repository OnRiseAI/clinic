'use client'

import { useState, useCallback, useEffect } from 'react'
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import { X, ChevronLeft, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ClinicWithRelations } from '@/lib/data/clinics'
import type { Destination, ClinicProcedureOption } from '@/lib/validations/enquiry'

// Step components
import { StepProcedure } from './steps/step-procedure'
import { StepTravelReadiness } from './steps/step-travel-readiness'
import { StepDestinations } from './steps/step-destinations'
import { StepBudget } from './steps/step-budget'
import { StepTimeline } from './steps/step-timeline'
import { StepContact } from './steps/step-contact'
import { StepMessage } from './steps/step-message'
import { StepSuccess } from './steps/step-success'

interface EnquiryModalProps {
  isOpen: boolean
  onClose: () => void
  clinic: ClinicWithRelations
  destinations: Destination[]
}

export interface EnquiryFormState {
  procedureInterest: string
  willingToTravel: 'ready' | 'researching' | 'planned' | ''
  preferredDestinations: string[]
  noPreference: boolean
  budgetRange: string
  timeline: 'within_1_month' | '1_3_months' | '3_6_months' | 'researching' | ''
  fullName: string
  email: string
  phone: string
  message: string
}

const TOTAL_STEPS = 7

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
}

export function EnquiryModal({ isOpen, onClose, clinic, destinations }: EnquiryModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [submittedEnquiryId, setSubmittedEnquiryId] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<EnquiryFormState>({
    procedureInterest: '',
    willingToTravel: '',
    preferredDestinations: clinic.country ? [clinic.country] : [],
    noPreference: false,
    budgetRange: '',
    timeline: '',
    fullName: '',
    email: '',
    phone: '',
    message: '',
  })

  // Get procedures from clinic
  const clinicProcedures: ClinicProcedureOption[] = clinic.clinic_procedures.map((cp) => ({
    id: cp.procedure.id,
    name: cp.procedure.name,
  }))

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1)
      setDirection(0)
      setIsComplete(false)
      setSubmittedEnquiryId(null)
      setErrors({})
      setFormData({
        procedureInterest: '',
        willingToTravel: '',
        preferredDestinations: clinic.country ? [clinic.country] : [],
        noPreference: false,
        budgetRange: '',
        timeline: '',
        fullName: '',
        email: '',
        phone: '',
        message: '',
      })
    }
  }, [isOpen, clinic.country])

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const updateFormData = useCallback((data: Partial<EnquiryFormState>) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setErrors({})
  }, [])

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.procedureInterest.trim()) {
          newErrors.procedureInterest = 'Please select or enter a procedure'
        }
        break
      case 2:
        if (!formData.willingToTravel) {
          newErrors.willingToTravel = 'Please select your travel readiness'
        }
        break
      case 5:
        if (!formData.timeline) {
          newErrors.timeline = 'Please select your timeline'
        }
        break
      case 6:
        if (!formData.fullName.trim()) {
          newErrors.fullName = 'Please enter your name'
        } else if (formData.fullName.length < 2) {
          newErrors.fullName = 'Name must be at least 2 characters'
        }
        if (!formData.email.trim()) {
          newErrors.email = 'Please enter your email'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address'
        }
        if (!formData.phone.trim()) {
          newErrors.phone = 'Please enter your phone number'
        } else if (formData.phone.length < 8) {
          newErrors.phone = 'Please enter a valid phone number'
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      setDirection(1)
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
    }
  }

  const goToPrevStep = () => {
    setDirection(-1)
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    setErrors({})
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clinicId: clinic.id,
          procedureInterest: formData.procedureInterest,
          willingToTravel: formData.willingToTravel,
          preferredDestinations: formData.noPreference ? [] : formData.preferredDestinations,
          budgetRange: formData.budgetRange || undefined,
          timeline: formData.timeline,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit enquiry')
      }

      setSubmittedEnquiryId(data.id)
      setIsComplete(true)
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Failed to submit enquiry. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    // Confirm close if form is partially filled
    const hasData =
      formData.procedureInterest ||
      formData.willingToTravel ||
      formData.fullName ||
      formData.email

    if (hasData && !isComplete) {
      if (window.confirm('Are you sure you want to close? Your progress will be lost.')) {
        onClose()
      }
    } else {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <LazyMotion features={domAnimation}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal */}
        <m.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'relative z-10 w-full bg-white shadow-2xl',
            'max-h-[100dvh] overflow-hidden',
            // Mobile: full screen
            'sm:max-h-[90vh] sm:max-w-[600px] sm:rounded-2xl'
          )}
        >
          {/* Header */}
          {!isComplete && (
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                {currentStep > 1 && (
                  <button
                    onClick={goToPrevStep}
                    className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900">Send Enquiry</h2>
                  <p className="text-sm text-neutral-500">{clinic.name}</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Progress Indicator */}
          {!isComplete && (
            <div className="px-4 pt-4 sm:px-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">
                  Step {currentStep} of {TOTAL_STEPS}
                </span>
                <div className="flex gap-1.5">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'h-1.5 w-6 rounded-full transition-colors',
                        i + 1 <= currentStep ? 'bg-primary-600' : 'bg-neutral-200'
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step Content */}
          <div className="overflow-y-auto px-4 py-6 sm:px-6" style={{ maxHeight: 'calc(100dvh - 200px)' }}>
            {errors.submit && (
              <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {errors.submit}
              </div>
            )}

            <AnimatePresence mode="wait" custom={direction}>
              {isComplete ? (
                <m.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <StepSuccess
                    clinicName={clinic.name}
                    enquiryId={submittedEnquiryId}
                    onClose={onClose}
                  />
                </m.div>
              ) : (
                <m.div
                  key={currentStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {currentStep === 1 && (
                    <StepProcedure
                      value={formData.procedureInterest}
                      onChange={(value) => updateFormData({ procedureInterest: value })}
                      procedures={clinicProcedures}
                      error={errors.procedureInterest}
                    />
                  )}
                  {currentStep === 2 && (
                    <StepTravelReadiness
                      value={formData.willingToTravel}
                      onChange={(value) =>
                        updateFormData({ willingToTravel: value as EnquiryFormState['willingToTravel'] })
                      }
                      error={errors.willingToTravel}
                    />
                  )}
                  {currentStep === 3 && (
                    <StepDestinations
                      selectedDestinations={formData.preferredDestinations}
                      noPreference={formData.noPreference}
                      onDestinationsChange={(destinations) =>
                        updateFormData({ preferredDestinations: destinations })
                      }
                      onNoPreferenceChange={(noPreference) =>
                        updateFormData({ noPreference, preferredDestinations: noPreference ? [] : formData.preferredDestinations })
                      }
                      destinations={destinations}
                      clinicCountry={clinic.country}
                    />
                  )}
                  {currentStep === 4 && (
                    <StepBudget
                      value={formData.budgetRange}
                      onChange={(value) => updateFormData({ budgetRange: value })}
                    />
                  )}
                  {currentStep === 5 && (
                    <StepTimeline
                      value={formData.timeline}
                      onChange={(value) =>
                        updateFormData({ timeline: value as EnquiryFormState['timeline'] })
                      }
                      error={errors.timeline}
                    />
                  )}
                  {currentStep === 6 && (
                    <StepContact
                      fullName={formData.fullName}
                      email={formData.email}
                      phone={formData.phone}
                      onFullNameChange={(value) => updateFormData({ fullName: value })}
                      onEmailChange={(value) => updateFormData({ email: value })}
                      onPhoneChange={(value) => updateFormData({ phone: value })}
                      errors={errors}
                    />
                  )}
                  {currentStep === 7 && (
                    <StepMessage
                      value={formData.message}
                      onChange={(value) => updateFormData({ message: value })}
                    />
                  )}
                </m.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer with navigation */}
          {!isComplete && (
            <div className="border-t border-neutral-200 px-4 py-4 sm:px-6">
              {currentStep < TOTAL_STEPS ? (
                <Button onClick={goToNextStep} variant="accent" className="w-full">
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  variant="accent"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Enquiry'
                  )}
                </Button>
              )}
            </div>
          )}
        </m.div>
      </div>
    </LazyMotion>
  )
}
