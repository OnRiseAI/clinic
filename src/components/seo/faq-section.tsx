'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { generateFAQSchema } from '@/lib/seo/structured-data'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQItem[]
  title?: string
  className?: string
}

/**
 * FAQSection - AEO-optimised FAQ component
 *
 * Renders FAQs with proper schema.org markup for answer engines.
 * Uses accordion pattern for UX with semantic HTML for accessibility.
 */
export function FAQSection({ faqs, title = 'Frequently Asked Questions', className }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqSchema = generateFAQSchema(faqs)

  return (
    <section
      className={cn('faq-section', className)}
      aria-labelledby="faq-title"
    >
      <h2 id="faq-title" className="text-2xl font-bold text-neutral-900 mb-6">
        {title}
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-neutral-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-neutral-50 transition-colors"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-medium text-neutral-900 pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-neutral-500 transition-transform flex-shrink-0',
                  openIndex === index && 'rotate-180'
                )}
              />
            </button>
            <div
              id={`faq-answer-${index}`}
              className={cn(
                'overflow-hidden transition-all duration-200',
                openIndex === index ? 'max-h-96' : 'max-h-0'
              )}
              role="region"
              aria-labelledby={`faq-question-${index}`}
            >
              <div className="p-4 pt-0 text-neutral-700 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  )
}

// =============================================================================
// PEOPLE ALSO ASK COMPONENT
// =============================================================================

interface PeopleAlsoAskProps {
  questions: FAQItem[]
  title?: string
  className?: string
}

/**
 * PeopleAlsoAsk - Google-style "People Also Ask" section
 *
 * Optimised for featured snippets and answer boxes.
 */
export function PeopleAlsoAsk({
  questions,
  title = 'People Also Ask',
  className,
}: PeopleAlsoAskProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set())

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const faqSchema = generateFAQSchema(questions)

  return (
    <section
      className={cn('people-also-ask', className)}
      aria-labelledby="paa-title"
    >
      <h2 id="paa-title" className="text-xl font-semibold text-neutral-900 mb-4">
        {title}
      </h2>

      <div className="divide-y divide-neutral-200 border border-neutral-200 rounded-lg">
        {questions.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-50 transition-colors"
              aria-expanded={openIndices.has(index)}
              aria-controls={`paa-answer-${index}`}
            >
              <span className="text-neutral-900 pr-4">{item.question}</span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-neutral-400 transition-transform flex-shrink-0',
                  openIndices.has(index) && 'rotate-180'
                )}
              />
            </button>
            <div
              id={`paa-answer-${index}`}
              className={cn(
                'overflow-hidden transition-all duration-200',
                openIndices.has(index) ? 'max-h-96' : 'max-h-0'
              )}
            >
              <div className="px-4 pb-4 text-neutral-600 text-sm leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  )
}

// =============================================================================
// FAQ GENERATORS
// =============================================================================

interface ProcedureFAQData {
  procedureName: string
  minPrice: number
  maxPrice: number
  ukPrice: number
  topCountries: string[]
  recoveryTime?: string
  duration?: string
}

export function generateProcedureFAQs(data: ProcedureFAQData): FAQItem[] {
  const countries = data.topCountries.slice(0, 3).join(', ')
  const savings = Math.round(((data.ukPrice - data.minPrice) / data.ukPrice) * 100)

  return [
    {
      question: `How much does ${data.procedureName} cost abroad?`,
      answer: `${data.procedureName} costs between €${data.minPrice.toLocaleString()} and €${data.maxPrice.toLocaleString()} abroad, compared to approximately £${data.ukPrice.toLocaleString()} in the UK. This represents savings of up to ${savings}%.`,
    },
    {
      question: `Where is the best place to get ${data.procedureName} abroad?`,
      answer: `Popular destinations for ${data.procedureName} include ${countries}. The best choice depends on your budget, preferred travel distance, and specific requirements. All clinics on MediTravel are accredited and verified.`,
    },
    {
      question: `Is it safe to have ${data.procedureName} abroad?`,
      answer: `Yes, when you choose an accredited clinic. MediTravel only lists clinics with international accreditations (JCI, ISO, etc.) and verified patient reviews. We recommend thoroughly researching your chosen clinic and surgeon.`,
    },
    {
      question: `What is included in ${data.procedureName} packages abroad?`,
      answer: `Most clinics offer all-inclusive packages that include the procedure, hospital stay, medications, airport transfers, and sometimes accommodation. Check individual clinic listings for specific package details.`,
    },
    ...(data.recoveryTime
      ? [
          {
            question: `How long is recovery after ${data.procedureName}?`,
            answer: `Recovery time for ${data.procedureName} is typically ${data.recoveryTime}. Your clinic will provide detailed aftercare instructions and many offer follow-up support remotely.`,
          },
        ]
      : []),
  ]
}

interface ClinicFAQData {
  clinicName: string
  city: string
  country: string
  accreditations: string[]
  languages: string[]
}

export function generateClinicFAQs(data: ClinicFAQData): FAQItem[] {
  const accreds = data.accreditations.slice(0, 3).join(', ') || 'internationally accredited'
  const langs = data.languages.slice(0, 3).join(', ') || 'English'

  return [
    {
      question: `Is ${data.clinicName} accredited?`,
      answer: `Yes, ${data.clinicName} holds the following accreditations: ${accreds}. These certifications ensure the clinic meets international standards for patient safety and care quality.`,
    },
    {
      question: `What languages are spoken at ${data.clinicName}?`,
      answer: `Staff at ${data.clinicName} speak ${langs}. The clinic provides multilingual patient coordinators to assist international patients throughout their treatment journey.`,
    },
    {
      question: `How do I book a consultation at ${data.clinicName}?`,
      answer: `You can request a free consultation through MediTravel. Click the "Get a Quote" button on the clinic's profile to submit your enquiry. The clinic typically responds within 24-48 hours.`,
    },
    {
      question: `Does ${data.clinicName} offer accommodation packages?`,
      answer: `Many clinics offer accommodation as part of their treatment packages. Contact ${data.clinicName} directly through our enquiry form to ask about available packages and included services.`,
    },
  ]
}

interface DestinationFAQData {
  countryName: string
  clinicCount: number
  topProcedures: string[]
  avgSavings: number
}

export function generateDestinationFAQs(data: DestinationFAQData): FAQItem[] {
  const procedures = data.topProcedures.slice(0, 3).join(', ')

  return [
    {
      question: `Why choose ${data.countryName} for medical tourism?`,
      answer: `${data.countryName} offers world-class healthcare at significantly lower prices than the UK, with average savings of ${data.avgSavings}%. The country has ${data.clinicCount}+ accredited clinics and is particularly known for ${procedures}.`,
    },
    {
      question: `How many accredited clinics are in ${data.countryName}?`,
      answer: `MediTravel lists ${data.clinicCount}+ verified and accredited clinics in ${data.countryName}. All clinics are vetted for quality and patient safety.`,
    },
    {
      question: `What procedures is ${data.countryName} known for?`,
      answer: `${data.countryName} is a popular destination for ${procedures}, among other treatments. The country has developed centres of excellence in these specialties.`,
    },
    {
      question: `Do I need a visa to travel to ${data.countryName} for medical treatment?`,
      answer: `Visa requirements depend on your nationality. Many countries offer visa-free entry or e-visas for medical tourists. Check with the ${data.countryName} embassy or your travel agent for current requirements.`,
    },
  ]
}
