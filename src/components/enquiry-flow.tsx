"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, Check, ShieldCheck, MapPin, Star, AlertCircle, ArrowRight, Mic } from "lucide-react"
import { OpenChatWrapper } from "@/components/ui/open-chat-wrapper"

interface ClinicProps {
  id: string
  name: string
  slug: string
  city: string | null
  country: string | null
  rating: number | null
  photoUrl: string | null
}

interface ProcedureProps {
  id: string
  name: string
  slug: string
  price_min: number | null
  currency: string
}

interface EnquiryFlowProps {
  clinic: ClinicProps
  procedures: ProcedureProps[]
}

function VoiceAssistantPrompt() {
  return (
    <OpenChatWrapper className="mt-3 block">
      <button
        type="button"
        className="group w-full rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-50 to-white px-4 py-3 text-left shadow-sm transition-all hover:border-teal-300 hover:shadow-md"
      >
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-full border border-teal-200 bg-white">
            <img
              src="/voice-agent-headshot.png"
              alt="AI concierge assistant"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              Faster Option
            </p>
            <p className="truncate text-sm font-bold text-slate-900">
              Talk to our concierge now
            </p>
            <p className="text-xs text-slate-600">Get guided help in voice mode</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white transition-colors group-hover:bg-teal-700">
            <Mic className="h-4 w-4" />
          </div>
        </div>
      </button>
    </OpenChatWrapper>
  )
}

const steps = [
  "Intent",
  "Treatment",
  "Timeline",
  "Country",
  "Contact",
  "Confirmation",
]

export default function EnquiryFlow({ clinic, procedures }: EnquiryFlowProps) {
  const searchParams = useSearchParams()
  const initialTreatment = searchParams.get("treatment") || ""
  const sourcePage = searchParams.get("ref") || ""

  const [step, setStep] = useState(0)
  
  // Form State
  const [intentLevel, setIntentLevel] = useState<"high" | "low" | null>(null)
  const [selectedProcedures, setSelectedProcedures] = useState<string[]>(
    initialTreatment ? [initialTreatment] : []
  )
  const [timeline, setTimeline] = useState<string>("")
  const [country, setCountry] = useState<string>("")
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showExitWarning, setShowExitWarning] = useState(false)

  // Exit intent for desktop
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && step >= 2 && step < steps.length - 1) {
        setShowExitWarning(true)
      }
    }
    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [step])

  // Try auto-detect country on mount
  useEffect(() => {
    try {
      const userLocale = navigator.language || "en-US"
      const regionNames = new Intl.DisplayNames([userLocale], { type: "region" })
      // Rough estimation - ideal would be ip-based geo, but we use locale region if possible
      const regionCode = new Intl.Locale(userLocale).region
      if (regionCode) {
        const countryName = regionNames.of(regionCode)
        if (countryName && !country) {
          setCountry(countryName)
        }
      }
    } catch (e) {
      // ignore
    }
  }, [])

  const handleNext = async () => {
    if (step === steps.length - 1) return

    setStep(step + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBack = () => {
    if (step === 0 || step === steps.length - 1) return
    setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const timelineMap: Record<string, "within_1_month" | "1_3_months" | "3_6_months" | "researching"> = {
        "As soon as possible": "within_1_month",
        "Within 1–3 months": "1_3_months",
        "Within 3–6 months": "3_6_months",
        "I'm just researching for now": "researching",
      }
      const mappedTimeline = timelineMap[timeline] || "researching"
      const willingToTravel = intentLevel === "high" ? "ready" : "researching"
      const normalizedPhone = contact.phone.trim() || "Not provided"

      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clinicId: clinic.id,
          procedureInterest: selectedProcedures.join(", "),
          willingToTravel,
          preferredDestinations: [],
          timeline: mappedTimeline,
          fullName: contact.name,
          email: contact.email,
          phone: normalizedPhone,
          message: [
            contact.message?.trim() || "",
            country ? `Country of residence: ${country}` : "",
            sourcePage ? `Source page: ${sourcePage}` : "",
          ]
            .filter(Boolean)
            .join("\n\n"),
        }),
      })

      const responseData = await response.json()
      if (!response.ok) {
        throw new Error(responseData.error || "Something went wrong. Please try again.")
      }

      setStep(5) // Move to confirmation
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = (step / (steps.length - 2)) * 100 // -2 because Step 5 is confirmation
  const formatPrice = (price: number | null, currency: string) => {
    if (!price) return null
    return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(price)
  }

  // Animation Variants
  const slideVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white lg:bg-slate-50 relative overflow-hidden">
      
      {/* Exit Intent Toast */}
      <AnimatePresence>
        {showExitWarning && step < 5 && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-teal-800 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 font-medium text-sm"
          >
            <AlertCircle className="w-5 h-5 text-gold" />
            You're almost done! Finish to get your free quote.
            <button 
              onClick={() => setShowExitWarning(false)} 
              className="ml-2 text-teal-200 hover:text-white"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT COLUMN: Clinic Context (Desktop) & Top Header (Mobile) */}
      <div className="lg:w-[400px] xl:w-[480px] lg:bg-white lg:border-r border-slate-200 flex-shrink-0 lg:p-10 p-4 border-b lg:border-b-0 sticky top-0 z-10 bg-white">
        <div className="max-w-md mx-auto lg:h-full flex flex-col">
          {/* Mobile Back Button (only show if not on first or last step) */}
          <div className="flex items-center justify-between lg:hidden mb-4">
            {step > 0 && step < 5 ? (
              <button onClick={handleBack} className="p-2 -ml-2 text-slate-500 active:bg-slate-100 rounded-full">
                <ChevronLeft className="w-6 h-6" />
              </button>
            ) : <div className="w-10" />}
            <span className="text-xs font-bold tracking-widest uppercase text-slate-400">Secure Enquiry</span>
            <div className="w-10" />
          </div>

          <div className="lg:mt-12 flex items-center gap-4 lg:flex-col lg:items-start lg:gap-6">
            {clinic.photoUrl && (
              <div className="w-16 h-16 lg:w-32 lg:h-32 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                <img src={clinic.photoUrl} alt={clinic.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <h2 className="text-lg lg:text-2xl font-display font-bold text-teal-900 leading-tight">
                {clinic.name}
              </h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 lg:mt-2 text-sm text-slate-600">
                {(clinic.city || clinic.country) && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {[clinic.city, clinic.country].filter(Boolean).join(", ")}
                  </span>
                )}
                {clinic.rating && (
                  <span className="flex items-center gap-1 text-amber-600 font-medium">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {clinic.rating.toFixed(1)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Trust Signals */}
          <div className="hidden lg:block mt-12 space-y-4">
            <div className="flex items-center gap-3 text-slate-600 text-sm">
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Privacy Secured</p>
                <p>Your details are never shared</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-600 text-sm">
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Free & No Obligation</p>
                <p>Compare quotes at zero cost</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: The Flow */}
      <div className="flex-1 flex flex-col relative min-h-[calc(100vh-140px)] lg:min-h-screen">
        
        {/* Top Progress Bar */}
        {step < 5 && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100">
            <motion.div 
              className="h-full bg-teal-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        {/* Desktop Back Button */}
        {step > 0 && step < 5 && (
          <div className="hidden lg:block absolute top-8 left-8 z-10">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-500 hover:text-teal-700 font-medium text-sm px-4 py-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col w-full max-w-[600px] mx-auto px-4 py-8 lg:py-20 lg:px-8 justify-center">
          <AnimatePresence mode="wait" initial={false}>
            
            {/* STEP 1: Intent */}
            {step === 0 && (
              <motion.div
                key="step0"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <h1 className="text-2xl lg:text-3xl font-display font-bold text-slate-900 mb-2">
                  Are you actively looking for treatment at {clinic.name}?
                </h1>
                <p className="text-slate-500 mb-8 lg:text-lg">
                  Let us know where you are in your journey.
                </p>

                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setIntentLevel("high")
                      handleNext()
                    }}
                    className="w-full text-left p-5 rounded-2xl border-2 border-slate-200 hover:border-teal-600 hover:bg-teal-50 transition-all focus:outline-none focus:ring-4 focus:ring-teal-500/20 active:scale-[0.98] group flex justify-between items-center"
                  >
                    <div>
                      <span className="block font-bold text-slate-900 text-lg mb-1 group-hover:text-teal-800">Yes, I am</span>
                      <span className="text-slate-500 text-sm">I want to get a free quote and proceed.</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-teal-600" />
                  </button>
                  <button
                    onClick={() => {
                      setIntentLevel("low")
                      handleNext()
                    }}
                    className="w-full text-left p-5 rounded-2xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all focus:outline-none focus:ring-4 focus:ring-slate-500/20 active:scale-[0.98] group flex justify-between items-center"
                  >
                    <div>
                      <span className="block font-bold text-slate-900 text-lg mb-1 group-hover:text-slate-900">Not exactly, just exploring</span>
                      <span className="text-slate-500 text-sm">I'm still researching my options.</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500" />
                  </button>
                </div>
                <div className="mt-8 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Your information is secure and will never be shared.
                </div>
              </motion.div>
            )}

            {/* STEP 2: Treatment Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col h-full"
              >
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-display font-bold text-slate-900 mb-2">
                    Which treatment are you interested in?
                  </h1>
                  <p className="text-slate-500 mb-8 lg:text-lg">
                    Select one or more procedures to get an accurate quote.
                  </p>

                  {procedures.length > 0 ? (
                    <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 pb-4 -mr-2 scrollbar-thin">
                      {procedures.map((p) => {
                        const isSelected = selectedProcedures.includes(p.slug)
                        return (
                          <button
                            key={p.slug}
                            onClick={() => {
                              setSelectedProcedures(prev => 
                                isSelected ? prev.filter(s => s !== p.slug) : [...prev, p.slug]
                              )
                            }}
                            className={`w-full text-left p-4 lg:p-5 rounded-2xl border-2 transition-all flex justify-between items-center active:scale-[0.99]
                              ${isSelected 
                                ? 'border-teal-600 bg-teal-50 shadow-sm' 
                                : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                          >
                            <div>
                              <span className={`block font-bold text-lg mb-1 ${isSelected ? 'text-teal-900' : 'text-slate-800'}`}>
                                {p.name}
                              </span>
                              {p.price_min && (
                                <span className={`text-sm font-medium ${isSelected ? 'text-teal-700' : 'text-slate-500'}`}>
                                  from {formatPrice(p.price_min, p.currency)}
                                </span>
                              )}
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                              ${isSelected ? 'border-teal-600 bg-teal-600' : 'border-slate-300'}`}>
                              {isSelected && <Check className="w-4 h-4 text-white" />}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
                      <p className="text-slate-600 mb-4">We couldn't load the exact procedure list for this clinic. Please type what you're looking for below:</p>
                      <input 
                        type="text" 
                        placeholder="E.g. Hair Transplant, IVF..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/20"
                        value={selectedProcedures[0] || ""}
                        onChange={(e) => setSelectedProcedures([e.target.value])}
                      />
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-auto">
                  <button
                    onClick={handleNext}
                    disabled={selectedProcedures.length === 0}
                    className="w-full bg-teal-700 text-white font-bold text-lg py-4 rounded-xl hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Continue <ArrowRight className="w-5 h-5" />
                  </button>
                  <VoiceAssistantPrompt />
                </div>
              </motion.div>
            )}

            {/* STEP 3: Timeline */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <h1 className="text-2xl lg:text-3xl font-display font-bold text-slate-900 mb-2">
                  When are you hoping to have treatment?
                </h1>
                <p className="text-slate-500 mb-8 lg:text-lg">
                  This helps the clinic check their availability.
                </p>

                <div className="space-y-3">
                  {[
                    "As soon as possible",
                    "Within 1–3 months",
                    "Within 3–6 months",
                    "I'm just researching for now"
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setTimeline(option)
                        handleNext()
                      }}
                      className="w-full text-left p-5 rounded-2xl border-2 border-slate-200 hover:border-teal-600 hover:bg-teal-50 transition-all focus:outline-none focus:ring-4 focus:ring-teal-500/20 active:scale-[0.98] flex justify-between items-center group"
                    >
                      <span className="font-bold text-slate-800 text-lg group-hover:text-teal-900">{option}</span>
                      <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-teal-600" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 4: Country */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <h1 className="text-2xl lg:text-3xl font-display font-bold text-slate-900 mb-2">
                  Where are you based?
                </h1>
                <p className="text-slate-500 mb-8 lg:text-lg">
                  Clinics need this to accurately estimate travel and treatment packages.
                </p>

                <div className="mb-8">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Select your country</label>
                  <select 
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/20 text-lg font-medium text-slate-800 bg-white appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a country...</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="France">France</option>
                    <option value="Spain">Spain</option>
                    <option value="Italy">Italy</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleNext}
                    disabled={!country}
                    className="w-full bg-teal-700 text-white font-bold text-lg py-4 rounded-xl hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Continue <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Contact Details */}
            {step === 4 && (
              <motion.form
                key="step4"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="w-full flex flex-col h-full"
              >
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-display font-bold text-slate-900 mb-2">
                    Almost done — how should the clinic reach you?
                  </h1>
                  <p className="text-slate-500 mb-8 lg:text-lg">
                    {clinic.name} will respond within 24 hours. Free & no obligation.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                      <input
                        id="name"
                        type="text"
                        required
                        autoFocus
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/20 text-base"
                        placeholder="e.g. Sarah Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/20 text-base"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-1.5">Phone / WhatsApp (Optional)</label>
                      <input
                        id="phone"
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/20 text-base"
                        placeholder="+44 7700 900077"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-1.5">Message (Optional)</label>
                      <textarea
                        id="message"
                        rows={3}
                        value={contact.message}
                        onChange={(e) => setContact({ ...contact, message: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/20 text-base resize-none"
                        placeholder="Any questions or details you'd like to share with the doctor?"
                      />
                    </div>
                  </div>
                  
                  {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      {error}
                    </div>
                  )}
                </div>

                <div className="pt-8 mt-auto">
                  <VoiceAssistantPrompt />
                  <button
                    type="submit"
                    disabled={isSubmitting || !contact.name || !contact.email}
                    className="w-full bg-[#b8960c] text-white font-bold text-lg py-4 rounded-xl hover:bg-[#a08209] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(184,150,12,0.25)] active:scale-[0.98]"
                  >
                    {isSubmitting ? "Sending..." : "Send My Free Quote"}
                    {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                  </button>
                  
                  <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-teal-600" /> Verified Leads</span>
                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-teal-600" /> No Spam Guarantee</span>
                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-teal-600" /> Privacy Secured</span>
                  </div>
                </div>
              </motion.form>
            )}

            {/* STEP 6: Confirmation */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-full text-center py-8"
              >
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-teal-600" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4">
                  You're all set! 🎉
                </h1>
                <p className="text-lg text-slate-600 mb-10 max-w-md mx-auto">
                  <strong className="text-slate-900">{clinic.name}</strong> has received your enquiry and will get back to you within 24 hours.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left max-w-md mx-auto mb-10 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-200 pb-3">Enquiry Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Treatments</span>
                      <span className="font-medium text-slate-900 text-right">{selectedProcedures.join(", ") || "General Enquiry"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Timeline</span>
                      <span className="font-medium text-slate-900 text-right">{timeline}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-slate-200">
                      <span className="text-slate-500">Contact Email</span>
                      <span className="font-medium text-slate-900 text-right">{contact.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/clinics"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-700 text-white font-bold rounded-xl hover:bg-teal-800 transition-colors"
                  >
                    Browse more clinics
                  </a>
                  <a 
                    href={`/compare/${selectedProcedures[0] || 'all'}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-colors"
                  >
                    Compare prices
                  </a>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
