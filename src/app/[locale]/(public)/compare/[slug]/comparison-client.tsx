'use client'

import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { FAQAccordion, type FAQItem } from '@/components/content/faq-accordion'
import type { Procedure, Category } from '@/lib/data/content'

interface ComparisonClientProps {
  procedureA: Procedure
  procedureB: Procedure
  categoryA: Category | null
  categoryB: Category | null
  destinationsA: Array<{ country_name: string; country_slug: string; price_avg: number }>
  destinationsB: Array<{ country_name: string; country_slug: string; price_avg: number }>
}

function formatCurrency(value: number | null | undefined): string {
  if (!value) return 'N/A'
  return `\u00a3${value.toLocaleString('en-GB')}`
}

function formatRecovery(min: number | null | undefined, max: number | null | undefined): string {
  if (!min && !max) return 'Varies'
  if (min && max) return `${min}-${max} days`
  if (min) return `${min}+ days`
  return `Up to ${max} days`
}

function formatRiskLevel(level: string | null | undefined): string {
  if (!level) return 'Consult specialist'
  return level.charAt(0).toUpperCase() + level.slice(1)
}

function getRiskColor(level: string | null | undefined): string {
  if (!level) return 'text-neutral-500'
  const l = level.toLowerCase()
  if (l === 'low') return 'text-green-600'
  if (l === 'medium' || l === 'moderate') return 'text-amber-600'
  if (l === 'high') return 'text-red-600'
  return 'text-neutral-600'
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export function ComparisonClient({
  procedureA,
  procedureB,
  categoryA,
  categoryB,
  destinationsA,
  destinationsB,
}: ComparisonClientProps) {
  // Build shared and unique destination lists
  const destMapA = new Map(destinationsA.map((d) => [d.country_slug, d]))
  const destMapB = new Map(destinationsB.map((d) => [d.country_slug, d]))

  const sharedCountries = destinationsA.filter((d) => destMapB.has(d.country_slug))
  const onlyA = destinationsA.filter((d) => !destMapB.has(d.country_slug))
  const onlyB = destinationsB.filter((d) => !destMapA.has(d.country_slug))

  const cheapestA = destinationsA.length > 0 ? Math.min(...destinationsA.map((d) => d.price_avg)) : null
  const cheapestB = destinationsB.length > 0 ? Math.min(...destinationsB.map((d) => d.price_avg)) : null

  // Generate decision factors based on procedure data
  const chooseAReasons: string[] = []
  const chooseBReasons: string[] = []

  if (
    procedureA.recovery_days_max &&
    procedureB.recovery_days_max &&
    procedureA.recovery_days_max < procedureB.recovery_days_max
  ) {
    chooseAReasons.push(`Shorter recovery time (${formatRecovery(procedureA.recovery_days_min, procedureA.recovery_days_max)})`)
    chooseBReasons.push(`You need longer-lasting results that justify extended recovery`)
  } else if (
    procedureA.recovery_days_max &&
    procedureB.recovery_days_max &&
    procedureB.recovery_days_max < procedureA.recovery_days_max
  ) {
    chooseBReasons.push(`Shorter recovery time (${formatRecovery(procedureB.recovery_days_min, procedureB.recovery_days_max)})`)
    chooseAReasons.push(`You need longer-lasting results that justify extended recovery`)
  }

  if (
    procedureA.uk_private_cost_max &&
    procedureB.uk_private_cost_max &&
    procedureA.uk_private_cost_max < procedureB.uk_private_cost_max
  ) {
    chooseAReasons.push(`Lower UK private cost (${formatCurrency(procedureA.uk_private_cost_min)} - ${formatCurrency(procedureA.uk_private_cost_max)})`)
  } else if (
    procedureA.uk_private_cost_max &&
    procedureB.uk_private_cost_max &&
    procedureB.uk_private_cost_max < procedureA.uk_private_cost_max
  ) {
    chooseBReasons.push(`Lower UK private cost (${formatCurrency(procedureB.uk_private_cost_min)} - ${formatCurrency(procedureB.uk_private_cost_max)})`)
  }

  if (cheapestA && cheapestB && cheapestA < cheapestB) {
    chooseAReasons.push(`More affordable options abroad (from ${formatCurrency(cheapestA)})`)
  } else if (cheapestA && cheapestB && cheapestB < cheapestA) {
    chooseBReasons.push(`More affordable options abroad (from ${formatCurrency(cheapestB)})`)
  }

  if (procedureA.risk_level?.toLowerCase() === 'low') {
    chooseAReasons.push('Lower risk profile')
  }
  if (procedureB.risk_level?.toLowerCase() === 'low') {
    chooseBReasons.push('Lower risk profile')
  }

  if (!procedureA.is_cosmetic && procedureB.is_cosmetic) {
    chooseAReasons.push('Medically necessary procedure with potential NHS pathway')
  }
  if (!procedureB.is_cosmetic && procedureA.is_cosmetic) {
    chooseBReasons.push('Medically necessary procedure with potential NHS pathway')
  }

  // Ensure at least one reason per procedure
  if (chooseAReasons.length === 0) {
    chooseAReasons.push(`Best suited when your goals align with what ${procedureA.name} offers`)
  }
  if (chooseBReasons.length === 0) {
    chooseBReasons.push(`Best suited when your goals align with what ${procedureB.name} offers`)
  }

  // FAQ items
  const faqItems: FAQItem[] = [
    {
      question: `What is the difference between ${procedureA.name} and ${procedureB.name}?`,
      answer: `${procedureA.name} and ${procedureB.name} differ in their approach, cost, and recovery requirements. ${procedureA.name} involves ${procedureA.anesthesia_type || 'anaesthesia'} with a recovery of ${formatRecovery(procedureA.recovery_days_min, procedureA.recovery_days_max)}, while ${procedureB.name} uses ${procedureB.anesthesia_type || 'anaesthesia'} with a recovery of ${formatRecovery(procedureB.recovery_days_min, procedureB.recovery_days_max)}. The best choice depends on your specific goals and medical advice.`,
    },
    {
      question: `Which is cheaper abroad, ${procedureA.name} or ${procedureB.name}?`,
      answer: cheapestA && cheapestB
        ? `Based on average international pricing, ${cheapestA < cheapestB ? procedureA.name : procedureB.name} tends to be more affordable abroad, starting from ${formatCurrency(Math.min(cheapestA, cheapestB))}. However, prices vary significantly by country and clinic. Compare options on MeetYourClinic for the latest pricing.`
        : `Pricing varies by country and clinic. Both procedures offer significant savings when performed abroad compared to UK private costs. Browse clinics on MeetYourClinic for current pricing.`,
    },
    {
      question: `Which procedure has a faster recovery?`,
      answer: `${procedureA.name} has a typical recovery of ${formatRecovery(procedureA.recovery_days_min, procedureA.recovery_days_max)}, while ${procedureB.name} requires ${formatRecovery(procedureB.recovery_days_min, procedureB.recovery_days_max)}. Recovery time can vary based on individual health, procedure complexity, and your surgeon's technique.`,
    },
    {
      question: `Can I combine ${procedureA.name} and ${procedureB.name} in one trip?`,
      answer: `Some patients do combine procedures during a single trip abroad to save on travel and accommodation costs. However, this depends on your overall health, the complexity of both procedures, and your surgeon's recommendation. Discuss this with your chosen clinic during your consultation.`,
    },
    {
      question: `How do I choose between ${procedureA.name} and ${procedureB.name}?`,
      answer: `Consider your primary goals, budget, available recovery time, and any medical recommendations. ${procedureA.name} may be better if you prioritise ${chooseAReasons[0]?.toLowerCase() || 'its specific benefits'}, while ${procedureB.name} suits those who value ${chooseBReasons[0]?.toLowerCase() || 'its unique advantages'}. A consultation with a qualified specialist can help you decide.`,
    },
    {
      question: `Are both procedures available at the same clinics abroad?`,
      answer: sharedCountries.length > 0
        ? `Yes, both ${procedureA.name} and ${procedureB.name} are available in ${sharedCountries.length} shared destination${sharedCountries.length > 1 ? 's' : ''}, including ${sharedCountries.slice(0, 3).map((d) => d.country_name).join(', ')}. Many international clinics offer both procedures, making it easy to compare or even combine them.`
        : `Availability varies by clinic and location. Browse MeetYourClinic to find clinics that offer both procedures in your preferred destination.`,
    },
  ]

  // Comparison table rows
  const comparisonRows = [
    {
      label: 'UK Private Cost',
      valueA:
        procedureA.uk_private_cost_min || procedureA.uk_private_cost_max
          ? `${formatCurrency(procedureA.uk_private_cost_min)} - ${formatCurrency(procedureA.uk_private_cost_max)}`
          : 'N/A',
      valueB:
        procedureB.uk_private_cost_min || procedureB.uk_private_cost_max
          ? `${formatCurrency(procedureB.uk_private_cost_min)} - ${formatCurrency(procedureB.uk_private_cost_max)}`
          : 'N/A',
    },
    {
      label: 'Cost Abroad',
      valueA: cheapestA ? `From ${formatCurrency(cheapestA)}` : 'N/A',
      valueB: cheapestB ? `From ${formatCurrency(cheapestB)}` : 'N/A',
    },
    {
      label: 'Recovery Time',
      valueA: formatRecovery(procedureA.recovery_days_min, procedureA.recovery_days_max),
      valueB: formatRecovery(procedureB.recovery_days_min, procedureB.recovery_days_max),
    },
    {
      label: 'Anaesthesia',
      valueA: procedureA.anesthesia_type || 'Consult clinic',
      valueB: procedureB.anesthesia_type || 'Consult clinic',
    },
    {
      label: 'Risk Level',
      valueA: formatRiskLevel(procedureA.risk_level),
      valueB: formatRiskLevel(procedureB.risk_level),
      colorA: getRiskColor(procedureA.risk_level),
      colorB: getRiskColor(procedureB.risk_level),
    },
    {
      label: 'Cosmetic?',
      valueA: procedureA.is_cosmetic === true ? 'Yes' : procedureA.is_cosmetic === false ? 'No' : 'Varies',
      valueB: procedureB.is_cosmetic === true ? 'Yes' : procedureB.is_cosmetic === false ? 'No' : 'Varies',
    },
  ]

  return (
    <div className="pb-16">
      {/* ================================================================ */}
      {/* HERO */}
      {/* ================================================================ */}
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-8">
        <m.div {...fadeInUp} className="text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-sm text-neutral-500">
            {categoryA && (
              <span className="rounded-full bg-primary-50 px-3 py-1 text-primary-700">
                {categoryA.name}
              </span>
            )}
            {categoryB && categoryB.id !== categoryA?.id && (
              <span className="rounded-full bg-primary-50 px-3 py-1 text-primary-700">
                {categoryB.name}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {procedureA.name}{' '}
            <span className="text-primary-600">vs</span>{' '}
            {procedureB.name}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
            Considering {procedureA.name.toLowerCase()} or {procedureB.name.toLowerCase()}?
            Compare costs, recovery times, risk levels, and international pricing to make an
            informed decision.
          </p>
        </m.div>
      </section>

      {/* ================================================================ */}
      {/* QUICK COMPARISON TABLE */}
      {/* ================================================================ */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <m.div {...fadeInUp}>
          <h2 className="mb-6 text-2xl font-bold text-neutral-900">Quick Comparison</h2>
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
            {/* Desktop header */}
            <div className="hidden sm:grid sm:grid-cols-3 border-b border-neutral-200 bg-neutral-50">
              <div className="px-6 py-4 font-semibold text-neutral-500 text-sm uppercase tracking-wide">
                Feature
              </div>
              <div className="px-6 py-4 font-semibold text-neutral-900 text-sm text-center">
                {procedureA.name}
              </div>
              <div className="px-6 py-4 font-semibold text-neutral-900 text-sm text-center">
                {procedureB.name}
              </div>
            </div>

            {/* Mobile header */}
            <div className="grid grid-cols-3 border-b border-neutral-200 bg-neutral-50 sm:hidden">
              <div className="px-3 py-3 font-semibold text-neutral-500 text-xs uppercase tracking-wide">
                Feature
              </div>
              <div className="px-3 py-3 font-semibold text-neutral-900 text-xs text-center truncate">
                {procedureA.name}
              </div>
              <div className="px-3 py-3 font-semibold text-neutral-900 text-xs text-center truncate">
                {procedureB.name}
              </div>
            </div>

            {/* Rows */}
            {comparisonRows.map((row, index) => (
              <div
                key={row.label}
                className={`grid grid-cols-3 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'
                } ${index < comparisonRows.length - 1 ? 'border-b border-neutral-100' : ''}`}
              >
                <div className="px-3 py-4 text-sm font-medium text-neutral-700 sm:px-6">
                  {row.label}
                </div>
                <div
                  className={`px-3 py-4 text-center text-sm sm:px-6 ${
                    row.colorA || 'text-neutral-900'
                  }`}
                >
                  {row.valueA}
                </div>
                <div
                  className={`px-3 py-4 text-center text-sm sm:px-6 ${
                    row.colorB || 'text-neutral-900'
                  }`}
                >
                  {row.valueB}
                </div>
              </div>
            ))}
          </div>
        </m.div>
      </section>

      {/* ================================================================ */}
      {/* ABOUT EACH PROCEDURE */}
      {/* ================================================================ */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <m.div {...fadeInUp}>
          <h2 className="mb-6 text-2xl font-bold text-neutral-900">About Each Procedure</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                {procedureA.name}
              </h3>
              {categoryA && (
                <span className="mb-3 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                  {categoryA.name}
                </span>
              )}
              <p className="text-neutral-600 leading-relaxed">
                {procedureA.description ||
                  `${procedureA.name} is a ${procedureA.is_cosmetic ? 'cosmetic' : 'medical'} procedure available at accredited clinics abroad. It typically requires ${procedureA.anesthesia_type || 'anaesthesia'} and has a recovery period of ${formatRecovery(procedureA.recovery_days_min, procedureA.recovery_days_max)}.`}
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                {procedureB.name}
              </h3>
              {categoryB && (
                <span className="mb-3 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                  {categoryB.name}
                </span>
              )}
              <p className="text-neutral-600 leading-relaxed">
                {procedureB.description ||
                  `${procedureB.name} is a ${procedureB.is_cosmetic ? 'cosmetic' : 'medical'} procedure available at accredited clinics abroad. It typically requires ${procedureB.anesthesia_type || 'anaesthesia'} and has a recovery period of ${formatRecovery(procedureB.recovery_days_min, procedureB.recovery_days_max)}.`}
              </p>
            </div>
          </div>
        </m.div>
      </section>

      {/* ================================================================ */}
      {/* COST COMPARISON BY COUNTRY */}
      {/* ================================================================ */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <m.div {...fadeInUp}>
          <h2 className="mb-6 text-2xl font-bold text-neutral-900">
            Cost Comparison by Country
          </h2>

          {/* Shared countries */}
          {sharedCountries.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-neutral-800">
                Available in Both Procedures
              </h3>
              <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                <div className="hidden sm:grid sm:grid-cols-3 border-b border-neutral-200 bg-neutral-50">
                  <div className="px-6 py-3 text-sm font-semibold text-neutral-500 uppercase tracking-wide">
                    Country
                  </div>
                  <div className="px-6 py-3 text-sm font-semibold text-neutral-900 text-center">
                    {procedureA.name}
                  </div>
                  <div className="px-6 py-3 text-sm font-semibold text-neutral-900 text-center">
                    {procedureB.name}
                  </div>
                </div>
                <div className="grid grid-cols-3 border-b border-neutral-200 bg-neutral-50 sm:hidden">
                  <div className="px-3 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                    Country
                  </div>
                  <div className="px-3 py-3 text-xs font-semibold text-neutral-900 text-center truncate">
                    {procedureA.name}
                  </div>
                  <div className="px-3 py-3 text-xs font-semibold text-neutral-900 text-center truncate">
                    {procedureB.name}
                  </div>
                </div>
                {sharedCountries.map((destA, index) => {
                  const destB = destMapB.get(destA.country_slug)
                  return (
                    <div
                      key={destA.country_slug}
                      className={`grid grid-cols-3 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'
                      } ${index < sharedCountries.length - 1 ? 'border-b border-neutral-100' : ''}`}
                    >
                      <div className="px-3 py-3 text-sm font-medium text-neutral-700 sm:px-6 sm:py-4">
                        <Link
                          href={`/destinations/${destA.country_slug}`}
                          className="text-primary-600 hover:text-primary-700 hover:underline"
                        >
                          {destA.country_name}
                        </Link>
                      </div>
                      <div className="px-3 py-3 text-center text-sm text-neutral-900 sm:px-6 sm:py-4">
                        {formatCurrency(destA.price_avg)}
                      </div>
                      <div className="px-3 py-3 text-center text-sm text-neutral-900 sm:px-6 sm:py-4">
                        {destB ? formatCurrency(destB.price_avg) : 'N/A'}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Countries only available for one procedure */}
          {(onlyA.length > 0 || onlyB.length > 0) && (
            <div className="grid gap-6 md:grid-cols-2">
              {onlyA.length > 0 && (
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-neutral-800">
                    {procedureA.name} Only
                  </h3>
                  <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                    {onlyA.map((dest, index) => (
                      <div
                        key={dest.country_slug}
                        className={`flex items-center justify-between px-4 py-3 sm:px-6 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'
                        } ${index < onlyA.length - 1 ? 'border-b border-neutral-100' : ''}`}
                      >
                        <Link
                          href={`/destinations/${dest.country_slug}`}
                          className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline"
                        >
                          {dest.country_name}
                        </Link>
                        <span className="text-sm text-neutral-900">
                          {formatCurrency(dest.price_avg)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {onlyB.length > 0 && (
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-neutral-800">
                    {procedureB.name} Only
                  </h3>
                  <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                    {onlyB.map((dest, index) => (
                      <div
                        key={dest.country_slug}
                        className={`flex items-center justify-between px-4 py-3 sm:px-6 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'
                        } ${index < onlyB.length - 1 ? 'border-b border-neutral-100' : ''}`}
                      >
                        <Link
                          href={`/destinations/${dest.country_slug}`}
                          className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline"
                        >
                          {dest.country_name}
                        </Link>
                        <span className="text-sm text-neutral-900">
                          {formatCurrency(dest.price_avg)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {destinationsA.length === 0 && destinationsB.length === 0 && (
            <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
              <p className="text-neutral-500">
                International pricing data is not yet available for these procedures. Check back
                soon or browse our clinic directory for quotes.
              </p>
            </div>
          )}
        </m.div>
      </section>

      {/* ================================================================ */}
      {/* WHICH ONE IS RIGHT FOR YOU? */}
      {/* ================================================================ */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <m.div {...fadeInUp}>
          <h2 className="mb-6 text-2xl font-bold text-neutral-900">
            Which One Is Right for You?
          </h2>
          <p className="mb-8 text-neutral-600">
            Choosing between {procedureA.name.toLowerCase()} and{' '}
            {procedureB.name.toLowerCase()} depends on your goals, budget, and personal
            circumstances. Here is a general decision framework to help guide your thinking.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Choose A */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                  A
                </span>
                Choose {procedureA.name} if...
              </h3>
              <ul className="space-y-3">
                {chooseAReasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-neutral-700">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Choose B */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                  B
                </span>
                Choose {procedureB.name} if...
              </h3>
              <ul className="space-y-3">
                {chooseBReasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-neutral-700">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </m.div>
      </section>

      {/* ================================================================ */}
      {/* FAQ SECTION */}
      {/* ================================================================ */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <m.div {...fadeInUp}>
          <FAQAccordion
            items={faqItems}
            title={`${procedureA.name} vs ${procedureB.name}: Frequently Asked Questions`}
          />
        </m.div>
      </section>

      {/* ================================================================ */}
      {/* CTA */}
      {/* ================================================================ */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <m.div {...fadeInUp}>
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-center shadow-lg sm:p-12">
            <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
              Ready to Decide?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-primary-100">
              Browse accredited clinics abroad offering {procedureA.name.toLowerCase()} and{' '}
              {procedureB.name.toLowerCase()} at a fraction of UK private costs.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={`/search?procedure=${procedureA.slug}`}>
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Find {procedureA.name} Clinics
                </Button>
              </Link>
              <Link href={`/search?procedure=${procedureB.slug}`}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full bg-white text-primary-700 hover:bg-primary-50 sm:w-auto"
                >
                  Find {procedureB.name} Clinics
                </Button>
              </Link>
            </div>
          </div>
        </m.div>
      </section>
    </div>
  )
}
