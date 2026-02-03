'use client'

import { cn } from '@/lib/utils'

interface AIAnswerBlockProps {
  question: string
  answer: string
  entityName?: string
  entityType?: string
  className?: string
  showQuestion?: boolean
}

/**
 * AIAnswerBlock - Core GEO (Generative Engine Optimisation) Component
 *
 * This component renders a concise, self-contained answer block that AI models
 * (ChatGPT, Perplexity, Claude, Google AI Overviews) can easily extract and cite.
 *
 * Best practices:
 * - Answer should be 40-60 words, factual, no fluff
 * - Include entity name and key stats inline
 * - Self-contained - makes sense without additional context
 */
export function AIAnswerBlock({
  question,
  answer,
  entityName,
  entityType,
  className,
  showQuestion = false,
}: AIAnswerBlockProps) {
  // Generate Q&A structured data
  const qaSchema = {
    '@context': 'https://schema.org',
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
    ...(entityName && {
      about: {
        '@type': entityType || 'Thing',
        name: entityName,
      },
    }),
  }

  return (
    <section
      className={cn(
        'ai-answer-block rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 p-4 sm:p-6 border border-primary-100',
        className
      )}
      role="region"
      aria-label="Summary"
    >
      {showQuestion && (
        <h2 className="text-lg font-semibold text-primary-900 mb-3">
          {question}
        </h2>
      )}
      <p className="text-neutral-700 leading-relaxed procedure-summary clinic-summary cost-summary">
        {answer}
      </p>

      {/* Hidden structured data for AI models */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qaSchema) }}
      />
    </section>
  )
}

// =============================================================================
// PREBUILT ANSWER GENERATORS
// =============================================================================

interface ProcedureAnswerData {
  procedureName: string
  definition: string
  minPrice: number
  maxPrice: number
  ukPrice: number
  savingsPercent: number
  topCountries: string[]
  currency?: string
}

export function generateProcedureAnswer(data: ProcedureAnswerData): { question: string; answer: string } {
  const symbol = data.currency === 'EUR' || !data.currency ? '€' : data.currency
  const countries = data.topCountries.slice(0, 3).join(', ')

  return {
    question: `What is ${data.procedureName} and how much does it cost abroad?`,
    answer: `${data.procedureName} is ${data.definition}. Prices range from ${symbol}${data.minPrice.toLocaleString()} to ${symbol}${data.maxPrice.toLocaleString()} abroad, compared to £${data.ukPrice.toLocaleString()} in the UK — a saving of up to ${data.savingsPercent}%. Top destinations include ${countries}.`,
  }
}

interface DestinationAnswerData {
  countryName: string
  clinicCount: number
  topProcedures: string[]
  avgSavingsPercent: number
}

export function generateDestinationAnswer(data: DestinationAnswerData): { question: string; answer: string } {
  const procedures = data.topProcedures.slice(0, 3).join(', ')

  return {
    question: `Why choose ${data.countryName} for medical tourism?`,
    answer: `${data.countryName} is a leading medical tourism destination with ${data.clinicCount}+ accredited clinics. Popular treatments include ${procedures}. Patients save an average of ${data.avgSavingsPercent}% compared to UK prices.`,
  }
}

interface DestinationProcedureAnswerData {
  procedureName: string
  countryName: string
  minPrice: number
  maxPrice: number
  ukPrice: number
  clinicCount: number
  avgRating: number | null
  currency?: string
}

export function generateDestinationProcedureAnswer(data: DestinationProcedureAnswerData): { question: string; answer: string } {
  const symbol = data.currency === 'EUR' || !data.currency ? '€' : data.currency
  const ratingText = data.avgRating ? `, with an average rating of ${data.avgRating.toFixed(1)} stars` : ''

  return {
    question: `How much does ${data.procedureName} cost in ${data.countryName}?`,
    answer: `${data.procedureName} in ${data.countryName} costs between ${symbol}${data.minPrice.toLocaleString()} and ${symbol}${data.maxPrice.toLocaleString()}, compared to £${data.ukPrice.toLocaleString()} in the UK. ${data.countryName} has ${data.clinicCount} accredited clinics offering ${data.procedureName}${ratingText}.`,
  }
}

interface ClinicAnswerData {
  clinicName: string
  city: string
  country: string
  accreditations: string[]
  specialties: string[]
  rating: number | null
  reviewCount: number | null
  startingPrice: number | null
  currency?: string
}

export function generateClinicAnswer(data: ClinicAnswerData): { question: string; answer: string } {
  const symbol = data.currency === 'EUR' || !data.currency ? '€' : data.currency
  const accreditationText = data.accreditations.length > 0
    ? `${data.accreditations.slice(0, 2).join(' and ')}-accredited`
    : 'accredited'
  const specialtiesText = data.specialties.slice(0, 3).join(', ')
  const ratingText = data.rating && data.reviewCount
    ? `Rated ${data.rating.toFixed(1)} stars from ${data.reviewCount} reviews.`
    : ''
  const priceText = data.startingPrice
    ? `Treatments start from ${symbol}${data.startingPrice.toLocaleString()}.`
    : ''

  return {
    question: `What is ${data.clinicName} and what do they specialise in?`,
    answer: `${data.clinicName} is a ${accreditationText} clinic in ${data.city}, ${data.country}, specialising in ${specialtiesText}. ${ratingText} ${priceText}`.trim(),
  }
}

interface CategoryAnswerData {
  categoryName: string
  procedures: string[]
  savingsRange: { min: number; max: number }
  topCountries: string[]
}

export function generateCategoryAnswer(data: CategoryAnswerData): { question: string; answer: string } {
  const procedures = data.procedures.slice(0, 4).join(', ')
  const countries = data.topCountries.slice(0, 3).join(', ')

  return {
    question: `What ${data.categoryName.toLowerCase()} treatments can you get abroad?`,
    answer: `${data.categoryName} abroad includes ${procedures}, and more. Patients typically save ${data.savingsRange.min}–${data.savingsRange.max}% compared to UK prices. Top destinations for ${data.categoryName.toLowerCase()} include ${countries}.`,
  }
}
