'use client'

import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { FAQAccordion, type FAQItem } from '@/components/content/faq-accordion'
import type { CountryGuideData } from '@/lib/data/content'

interface CountryGuideClientProps {
  data: CountryGuideData
  faqItems: FAQItem[]
}

function formatGBP(value: number): string {
  return `\u00A3${value.toLocaleString()}`
}

function formatNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)}k`
  }
  return value.toLocaleString()
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
}

export function CountryGuideClient({ data, faqItems }: CountryGuideClientProps) {
  const { country, procedures, stats } = data

  // Group procedures by category
  const grouped = procedures.reduce<
    Record<string, { name: string; slug: string | null; items: typeof procedures }>
  >((acc, proc) => {
    const key = proc.category_slug || '_uncategorised'
    if (!acc[key]) {
      acc[key] = { name: proc.category_name || 'Other Procedures', slug: proc.category_slug, items: [] }
    }
    acc[key].items.push(proc)
    return acc
  }, {})

  const categoryGroups = Object.values(grouped).sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                */}
      {/* ------------------------------------------------------------------ */}
      <m.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-primary-700 to-primary-900 text-white"
      >
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex items-start gap-4">
            {country.flag_emoji && (
              <span className="text-5xl sm:text-6xl">{country.flag_emoji}</span>
            )}
            <div>
              <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                Medical Tourism in {country.name}: Complete Guide
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-primary-100 sm:text-xl">
                {country.description ||
                  `Your comprehensive guide to medical tourism in ${country.name}. Compare prices, understand the healthcare system, and plan your treatment journey.`}
              </p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <p className="text-3xl font-bold">{stats.procedure_count}</p>
              <p className="text-sm text-primary-200">Procedures Available</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.avg_savings}%</p>
              <p className="text-sm text-primary-200">Avg Savings vs UK</p>
            </div>
            {country.jci_hospitals_count != null && country.jci_hospitals_count > 0 && (
              <div>
                <p className="text-3xl font-bold">{country.jci_hospitals_count}</p>
                <p className="text-sm text-primary-200">JCI Hospitals</p>
              </div>
            )}
            {country.annual_medical_tourists != null && country.annual_medical_tourists > 0 && (
              <div>
                <p className="text-3xl font-bold">
                  {formatNumber(country.annual_medical_tourists)}+
                </p>
                <p className="text-sm text-primary-200">Annual Medical Tourists</p>
              </div>
            )}
          </div>
        </div>
      </m.section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* ---------------------------------------------------------------- */}
        {/* AT A GLANCE                                                       */}
        {/* ---------------------------------------------------------------- */}
        <m.section {...fadeInUp} className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-neutral-900">
            {country.name} at a Glance
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Currency */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
              <dt className="text-sm font-medium text-neutral-500">Currency</dt>
              <dd className="mt-1 text-lg font-semibold text-neutral-900">
                {country.currency || 'N/A'}
                {country.currency_symbol ? ` (${country.currency_symbol})` : ''}
              </dd>
            </div>

            {/* Language */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
              <dt className="text-sm font-medium text-neutral-500">Language</dt>
              <dd className="mt-1 text-lg font-semibold text-neutral-900">
                {country.language || 'N/A'}
              </dd>
            </div>

            {/* Flight time */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
              <dt className="text-sm font-medium text-neutral-500">
                Flight Time from London
              </dt>
              <dd className="mt-1 text-lg font-semibold text-neutral-900">
                {country.flight_time_from_london_hrs != null
                  ? `~${country.flight_time_from_london_hrs} hours`
                  : 'N/A'}
              </dd>
            </div>

            {/* Visa */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
              <dt className="text-sm font-medium text-neutral-500">
                Visa Required (UK)
              </dt>
              <dd className="mt-1 text-lg font-semibold text-neutral-900">
                {country.visa_required_uk != null
                  ? country.visa_required_uk
                    ? 'Yes'
                    : 'No'
                  : 'Check latest requirements'}
              </dd>
            </div>

            {/* Healthcare rating */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
              <dt className="text-sm font-medium text-neutral-500">
                Healthcare Rating
              </dt>
              <dd className="mt-1 text-lg font-semibold text-neutral-900">
                {country.healthcare_rating != null
                  ? `${country.healthcare_rating}/10`
                  : 'N/A'}
              </dd>
            </div>

            {/* Region / Time zone */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
              <dt className="text-sm font-medium text-neutral-500">Region</dt>
              <dd className="mt-1 text-lg font-semibold text-neutral-900">
                {country.region || 'N/A'}
              </dd>
            </div>
          </div>
        </m.section>

        {/* ---------------------------------------------------------------- */}
        {/* WHY CHOOSE {COUNTRY}                                              */}
        {/* ---------------------------------------------------------------- */}
        <m.section {...fadeInUp} className="mb-20">
          <h2 className="mb-6 text-3xl font-bold text-neutral-900">
            Why Choose {country.name} for Medical Tourism?
          </h2>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Specialties list */}
            {country.specialties && country.specialties.length > 0 && (
              <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-neutral-900">
                  Top Medical Specialties
                </h3>
                <ul className="space-y-3">
                  {country.specialties.map((specialty, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
                        {idx + 1}
                      </span>
                      <span className="text-neutral-700">{specialty}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* General benefits */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-neutral-900">
                Key Benefits
              </h3>
              <ul className="space-y-3">
                {[
                  `Save an average of ${stats.avg_savings}% compared to UK private prices`,
                  `${stats.procedure_count} procedures available across ${stats.category_count} specialties`,
                  country.jci_hospitals_count
                    ? `${country.jci_hospitals_count} JCI-accredited hospitals ensuring international standards`
                    : 'Internationally accredited hospitals and clinics',
                  country.flight_time_from_london_hrs
                    ? `Just ${country.flight_time_from_london_hrs} hours flying time from London`
                    : 'Accessible from major UK airports',
                  'English-speaking medical staff at international clinics',
                  'Comprehensive treatment packages including accommodation and transfers',
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600"
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
                    <span className="text-neutral-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </m.section>

        {/* ---------------------------------------------------------------- */}
        {/* AVAILABLE PROCEDURES                                              */}
        {/* ---------------------------------------------------------------- */}
        <m.section {...fadeInUp} id="procedures" className="mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-neutral-900">
              Available Procedures in {country.name}
            </h2>
            <p className="mt-2 text-neutral-600">
              {stats.procedure_count} treatments across {stats.category_count} categories
              &mdash; prices in GBP
            </p>
          </div>

          {categoryGroups.length > 0 ? (
            <div className="space-y-10">
              {categoryGroups.map((group) => (
                <div key={group.name}>
                  <h3 className="mb-4 text-xl font-semibold text-neutral-900">
                    {group.name}
                  </h3>

                  {/* Responsive table / card grid */}
                  {/* Desktop table */}
                  <div className="hidden overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm md:block">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50">
                          <th className="px-4 py-3 font-semibold text-neutral-700">
                            Procedure
                          </th>
                          <th className="px-4 py-3 font-semibold text-neutral-700">
                            Price in {country.name}
                          </th>
                          <th className="px-4 py-3 font-semibold text-neutral-700">
                            UK Private Price
                          </th>
                          <th className="px-4 py-3 text-right font-semibold text-neutral-700">
                            Savings
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {group.items.map((proc) => (
                          <tr
                            key={proc.slug}
                            className="transition-colors hover:bg-neutral-50"
                          >
                            <td className="px-4 py-3">
                              <Link
                                href={`/destinations/${country.slug}/${proc.slug}`}
                                className="font-medium text-primary-600 hover:text-primary-700 hover:underline"
                              >
                                {proc.name}
                              </Link>
                            </td>
                            <td className="px-4 py-3 text-neutral-700">
                              {proc.price_min > 0
                                ? `${formatGBP(proc.price_min)}${proc.price_max > proc.price_min ? ` - ${formatGBP(proc.price_max)}` : ''}`
                                : 'Contact for price'}
                            </td>
                            <td className="px-4 py-3 text-neutral-500">
                              {proc.uk_cost_min != null && proc.uk_cost_min > 0
                                ? `${formatGBP(proc.uk_cost_min)}${proc.uk_cost_max != null && proc.uk_cost_max > proc.uk_cost_min ? ` - ${formatGBP(proc.uk_cost_max)}` : ''}`
                                : '-'}
                            </td>
                            <td className="px-4 py-3 text-right">
                              {proc.savings_percent > 0 ? (
                                <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-sm font-semibold text-green-700">
                                  {proc.savings_percent}%
                                </span>
                              ) : (
                                <span className="text-neutral-400">&mdash;</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile cards */}
                  <div className="space-y-3 md:hidden">
                    {group.items.map((proc) => (
                      <Link
                        key={proc.slug}
                        href={`/destinations/${country.slug}/${proc.slug}`}
                        className="block rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-primary-600">
                            {proc.name}
                          </h4>
                          {proc.savings_percent > 0 && (
                            <span className="flex-shrink-0 rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                              Save {proc.savings_percent}%
                            </span>
                          )}
                        </div>
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <div>
                            <span className="text-neutral-500">From </span>
                            <span className="font-semibold text-neutral-900">
                              {proc.price_min > 0 ? formatGBP(proc.price_min) : 'TBC'}
                            </span>
                          </div>
                          {proc.uk_cost_min != null && proc.uk_cost_min > 0 && (
                            <div className="text-neutral-400">
                              UK: {formatGBP(proc.uk_cost_min)}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-8 py-16 text-center">
              <p className="text-neutral-500">
                Procedure listings for {country.name} coming soon
              </p>
            </div>
          )}
        </m.section>

        {/* ---------------------------------------------------------------- */}
        {/* COST SAVINGS OVERVIEW                                             */}
        {/* ---------------------------------------------------------------- */}
        <m.section {...fadeInUp} className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-neutral-900">
            Cost Savings Overview
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm text-center">
              <p className="text-sm font-medium text-neutral-500">
                Prices Start From
              </p>
              <p className="mt-2 text-3xl font-bold text-primary-600">
                {stats.min_price != null ? formatGBP(stats.min_price) : 'N/A'}
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                Lowest procedure price
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm text-center">
              <p className="text-sm font-medium text-neutral-500">
                Average Savings vs UK
              </p>
              <p className="mt-2 text-3xl font-bold text-green-600">
                {stats.avg_savings}%
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                Compared to UK private prices
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm text-center">
              <p className="text-sm font-medium text-neutral-500">
                Procedures Available
              </p>
              <p className="mt-2 text-3xl font-bold text-neutral-900">
                {stats.procedure_count}
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                Across {stats.category_count} categories
              </p>
            </div>
          </div>
        </m.section>

        {/* ---------------------------------------------------------------- */}
        {/* PRACTICAL INFORMATION                                             */}
        {/* ---------------------------------------------------------------- */}
        <m.section {...fadeInUp} className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-neutral-900">
            Practical Information
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Getting there */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                <svg
                  className="h-5 w-5 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                Getting There
              </h3>
              <p className="text-sm text-neutral-600">
                {country.flight_time_from_london_hrs != null
                  ? `Direct flights from London take approximately ${country.flight_time_from_london_hrs} hours. Most major UK airports offer regular services. Many clinics arrange airport transfers as part of treatment packages.`
                  : `${country.name} is accessible from major UK airports. Many clinics arrange airport transfers as part of treatment packages. Check with your clinic for the nearest international airport.`}
              </p>
            </div>

            {/* Currency & payments */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                <svg
                  className="h-5 w-5 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                Currency &amp; Payments
              </h3>
              <p className="text-sm text-neutral-600">
                The local currency is{' '}
                {country.currency
                  ? `${country.currency}${country.currency_symbol ? ` (${country.currency_symbol})` : ''}`
                  : 'varied'}
                . Most international clinics accept credit cards and bank transfers in GBP, EUR, or USD. ATMs are widely available. Consider a travel-friendly debit card to avoid conversion fees.
              </p>
            </div>

            {/* Language */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                <svg
                  className="h-5 w-5 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                Language &amp; Communication
              </h3>
              <p className="text-sm text-neutral-600">
                {country.language
                  ? `The primary language is ${country.language}. `
                  : ''}
                Doctors and staff at international clinics typically speak excellent English. Many clinics provide dedicated patient coordinators who handle communication throughout your treatment journey.
              </p>
            </div>

            {/* Travel insurance */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                <svg
                  className="h-5 w-5 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                Travel Insurance
              </h3>
              <p className="text-sm text-neutral-600">
                Always purchase comprehensive medical travel insurance that covers your planned procedure, potential complications, and extended stays. Specialist medical tourism insurers offer tailored policies. Confirm your cover before travelling.
              </p>
            </div>

            {/* Post-treatment follow-up */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                <svg
                  className="h-5 w-5 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                Post-Treatment Follow-Up
              </h3>
              <p className="text-sm text-neutral-600">
                Before travelling, agree a follow-up plan with your clinic. Many facilities offer virtual consultations after you return home. Request a detailed treatment summary and medical records in English for your GP. Some clinics partner with doctors in the UK for local aftercare.
              </p>
            </div>

            {/* Visa info */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                <svg
                  className="h-5 w-5 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                Visa &amp; Entry Requirements
              </h3>
              <p className="text-sm text-neutral-600">
                {country.visa_required_uk != null
                  ? country.visa_required_uk
                    ? `UK citizens typically require a visa to enter ${country.name}. Check the latest requirements with the embassy or consulate. Your chosen clinic may provide a medical invitation letter to support your application.`
                    : `UK citizens do not usually need a visa for short stays in ${country.name}, making it easy to plan your medical trip. Always verify the latest entry requirements before booking, as rules can change.`
                  : `Check the latest visa and entry requirements for ${country.name} before travelling. Requirements can vary by nationality and length of stay.`}
              </p>
            </div>
          </div>
        </m.section>

        {/* ---------------------------------------------------------------- */}
        {/* FAQ                                                               */}
        {/* ---------------------------------------------------------------- */}
        {faqItems.length > 0 && (
          <m.section {...fadeInUp} className="mb-20">
            <FAQAccordion
              items={faqItems}
              title={`Medical Tourism in ${country.name}: FAQs`}
            />
          </m.section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* CTA                                                               */}
        {/* ---------------------------------------------------------------- */}
        <m.section {...fadeInUp}>
          <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-8 text-center text-white sm:p-12">
            {country.flag_emoji && (
              <div className="mb-4 text-5xl">{country.flag_emoji}</div>
            )}
            <h2 className="text-2xl font-bold sm:text-3xl">
              Find Your Clinic in {country.name}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
              Compare accredited clinics, read verified patient reviews, and get personalised
              quotes for your treatment in {country.name}.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={`/destinations/${country.slug}`}>
                <Button variant="secondary" size="lg">
                  Browse Clinics in {country.name}
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10"
                >
                  Speak to an Advisor
                </Button>
              </Link>
            </div>
          </div>
        </m.section>
      </div>
    </>
  )
}
