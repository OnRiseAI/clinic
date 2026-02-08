'use client'

import { useState, useMemo } from 'react'
import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { FAQAccordion, type FAQItem } from '@/components/content/faq-accordion'
import type { ProcedureCostGuideData } from '@/lib/data/content'

interface CostGuideClientProps {
  data: ProcedureCostGuideData
  categorySlug: string
  faqItems: FAQItem[]
}

type SortKey = 'price' | 'savings' | 'flight'

function formatPrice(amount: number): string {
  return `£${amount.toLocaleString()}`
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
}

export function CostGuideClient({ data, categorySlug, faqItems }: CostGuideClientProps) {
  const { procedure, category, destinations } = data
  const [sortBy, setSortBy] = useState<SortKey>('price')

  const sortedDestinations = useMemo(() => {
    const sorted = [...destinations]
    switch (sortBy) {
      case 'price':
        sorted.sort((a, b) => a.price_avg - b.price_avg)
        break
      case 'savings':
        sorted.sort((a, b) => b.savings_vs_uk - a.savings_vs_uk)
        break
      case 'flight':
        sorted.sort((a, b) => (a.flight_hours ?? 99) - (b.flight_hours ?? 99))
        break
    }
    return sorted
  }, [destinations, sortBy])

  // Compute hero stats
  const ukAvg = Math.round((data.uk_private_cost_min + data.uk_private_cost_max) / 2)
  const cheapest = destinations.length > 0 ? destinations[0] : null
  const maxSavings = destinations.length > 0
    ? Math.max(...destinations.map((d) => d.savings_vs_uk))
    : 0

  return (
    <>
      {/* Hero Section */}
      <m.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white pb-12"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2">
            <Link
              href={`/${categorySlug}/${procedure.slug}`}
              className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {procedure.name}
            </Link>
            <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
              {procedure.name} Cost Guide 2026
            </h1>
            <p className="mt-3 max-w-3xl text-lg text-neutral-600">
              Compare {procedure.name.toLowerCase()} prices across {destinations.length} countries.
              See how much you could save compared to UK private healthcare costs.
            </p>
          </div>

          {/* Key Stats Bar */}
          <div className="mt-8 grid grid-cols-2 gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 sm:grid-cols-4 sm:gap-6 sm:p-6">
            <div className="text-center">
              <p className="text-xl font-bold text-neutral-900 sm:text-3xl">
                {ukAvg > 0 ? formatPrice(ukAvg) : 'N/A'}
              </p>
              <p className="text-xs text-neutral-500 sm:text-sm">UK Average Price</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-primary-600 sm:text-3xl">
                {cheapest ? formatPrice(cheapest.price_min) : 'N/A'}
              </p>
              <p className="text-xs text-neutral-500 sm:text-sm">Cheapest Abroad</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-green-600 sm:text-3xl">
                {maxSavings > 0 ? `${maxSavings}%` : 'N/A'}
              </p>
              <p className="text-xs text-neutral-500 sm:text-sm">Max Savings</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-neutral-900 sm:text-3xl">
                {destinations.length}
              </p>
              <p className="text-xs text-neutral-500 sm:text-sm">Countries Compared</p>
            </div>
          </div>
        </div>
      </m.section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Cost Comparison Table */}
            <m.section {...fadeInUp} className="mb-16">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                    {procedure.name} Prices by Country
                  </h2>
                  <p className="mt-2 text-neutral-600">
                    Compare costs across popular medical tourism destinations
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSortBy('price')}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      sortBy === 'price'
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    Price
                  </button>
                  <button
                    onClick={() => setSortBy('savings')}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      sortBy === 'savings'
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    Savings
                  </button>
                  <button
                    onClick={() => setSortBy('flight')}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      sortBy === 'flight'
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    Flight Time
                  </button>
                </div>
              </div>

              {sortedDestinations.length > 0 ? (
                <>
                  {/* Desktop Table */}
                  <div className="hidden overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm md:block">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50">
                          <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-700">
                            Country
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-700">
                            Price Range
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-700">
                            Savings vs UK
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-700">
                            Flight Time
                          </th>
                          <th className="px-6 py-3" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {sortedDestinations.map((dest, index) => (
                          <tr
                            key={dest.country_code}
                            className="transition-colors hover:bg-neutral-50"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{dest.flag_emoji || '🌍'}</span>
                                <span className="font-medium text-neutral-900">
                                  {dest.country_name}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-semibold text-neutral-900">
                                {formatPrice(dest.price_min)} - {formatPrice(dest.price_max)}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              {dest.savings_vs_uk > 0 ? (
                                <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-sm font-semibold text-green-700">
                                  {dest.savings_vs_uk}% cheaper
                                </span>
                              ) : (
                                <span className="text-sm text-neutral-500">N/A</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-neutral-600">
                              {dest.flight_hours
                                ? `${dest.flight_hours}h from London`
                                : 'Varies'}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <Link
                                href={`/destinations/${dest.country_slug}/${procedure.slug}`}
                                className="text-sm font-medium text-primary-600 hover:text-primary-700"
                              >
                                View clinics
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="space-y-3 md:hidden">
                    {sortedDestinations.map((dest, index) => (
                      <m.div
                        key={dest.country_code}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={`/destinations/${dest.country_slug}/${procedure.slug}`}
                          className="block rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{dest.flag_emoji || '🌍'}</span>
                              <span className="font-semibold text-neutral-900">
                                {dest.country_name}
                              </span>
                            </div>
                            {dest.savings_vs_uk > 0 && (
                              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                                Save {dest.savings_vs_uk}%
                              </span>
                            )}
                          </div>
                          <div className="mt-3 flex items-center justify-between text-sm">
                            <span className="font-semibold text-neutral-900">
                              {formatPrice(dest.price_min)} - {formatPrice(dest.price_max)}
                            </span>
                            <span className="text-neutral-500">
                              {dest.flight_hours
                                ? `${dest.flight_hours}h flight`
                                : ''}
                            </span>
                          </div>
                        </Link>
                      </m.div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center">
                  <p className="text-neutral-500">
                    Cost comparison data is being compiled. Check back soon or search for clinics directly.
                  </p>
                  <Link href={`/search?procedure=${procedure.slug}`} className="mt-4 inline-block">
                    <Button variant="primary">Browse Clinics</Button>
                  </Link>
                </div>
              )}
            </m.section>

            {/* UK vs Abroad Section */}
            <m.section {...fadeInUp} className="mb-16">
              <h2 className="mb-6 text-2xl font-bold text-neutral-900 sm:text-3xl">
                UK Private vs Abroad
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* UK Card */}
                <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-2xl">🇬🇧</span>
                    <h3 className="text-lg font-semibold text-neutral-900">UK Private Cost</h3>
                  </div>
                  <p className="text-3xl font-bold text-neutral-900">
                    {data.uk_private_cost_min > 0 && data.uk_private_cost_max > 0
                      ? `${formatPrice(data.uk_private_cost_min)} - ${formatPrice(data.uk_private_cost_max)}`
                      : 'Contact for pricing'}
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">
                    Average UK private hospital rate
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-neutral-400">-</span>
                      Long NHS waiting lists
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-neutral-400">-</span>
                      High private costs
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-neutral-400">-</span>
                      Limited appointment availability
                    </li>
                  </ul>
                </div>

                {/* Abroad Card */}
                <div className="rounded-xl border-2 border-green-200 bg-green-50/50 p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-2xl">🌍</span>
                    <h3 className="text-lg font-semibold text-neutral-900">Abroad Cost</h3>
                  </div>
                  <p className="text-3xl font-bold text-green-700">
                    {cheapest
                      ? `${formatPrice(cheapest.price_min)} - ${formatPrice(
                          sortedDestinations[sortedDestinations.length - 1]?.price_max ??
                            cheapest.price_max
                        )}`
                      : 'Contact for pricing'}
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">
                    Across {destinations.length} countries
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-green-500">+</span>
                      Save up to {maxSavings > 0 ? `${maxSavings}%` : '70%'} on treatment
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-green-500">+</span>
                      No waiting lists
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-green-500">+</span>
                      All-inclusive packages available
                    </li>
                  </ul>
                </div>
              </div>

              {maxSavings > 0 && ukAvg > 0 && cheapest && (
                <div className="mt-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200 p-4 text-center">
                  <p className="text-lg font-semibold text-green-800">
                    You could save up to{' '}
                    <span className="text-2xl font-bold">
                      {formatPrice(ukAvg - cheapest.price_avg)}
                    </span>{' '}
                    by going abroad for {procedure.name.toLowerCase()}
                  </p>
                </div>
              )}
            </m.section>

            {/* What's Included Section */}
            <m.section {...fadeInUp} className="mb-16">
              <h2 className="mb-6 text-2xl font-bold text-neutral-900 sm:text-3xl">
                What&apos;s Typically Included
              </h2>
              <p className="mb-6 text-neutral-600">
                Most international clinics offer comprehensive packages. Here is what you can
                generally expect to be included when getting {procedure.name.toLowerCase()} abroad.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: 'Initial Consultation',
                    description:
                      'Pre-procedure consultation with your specialist, often available via video call before you travel.',
                    icon: '🩺',
                  },
                  {
                    title: 'The Procedure',
                    description:
                      'The treatment itself performed at an accredited facility by qualified specialists.',
                    icon: '🏥',
                  },
                  {
                    title: 'Hospital Stay',
                    description:
                      'Post-procedure hospital stay as required, typically in a private or semi-private room.',
                    icon: '🛏️',
                  },
                  {
                    title: 'Aftercare & Follow-up',
                    description:
                      'Post-procedure check-ups, medication, and follow-up appointments before you fly home.',
                    icon: '💊',
                  },
                  {
                    title: 'Local Transfers',
                    description:
                      'Airport pick-up and drop-off, plus transfers between your hotel and the clinic.',
                    icon: '🚗',
                  },
                  {
                    title: 'Patient Coordinator',
                    description:
                      'A dedicated English-speaking coordinator to guide you through every step of the process.',
                    icon: '👤',
                  },
                ].map((item, index) => (
                  <m.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
                  >
                    <div className="mb-3 text-2xl">{item.icon}</div>
                    <h3 className="font-semibold text-neutral-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-neutral-600">{item.description}</p>
                  </m.div>
                ))}
              </div>
              <p className="mt-4 text-sm text-neutral-500">
                Package inclusions vary by clinic. Always confirm exactly what is covered before booking.
              </p>
            </m.section>

            {/* FAQ Section */}
            <m.section {...fadeInUp} className="mb-16">
              <FAQAccordion
                items={faqItems}
                title={`${procedure.name} Cost FAQs`}
              />
            </m.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Procedure Quick Facts */}
              <m.div
                {...fadeInUp}
                className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-neutral-900">Procedure Quick Facts</h3>
                <dl className="mt-4 space-y-4">
                  {procedure.recovery_days_min != null && procedure.recovery_days_max != null && (
                    <div>
                      <dt className="text-sm text-neutral-500">Recovery Time</dt>
                      <dd className="mt-1 font-medium text-neutral-900">
                        {procedure.recovery_days_min === procedure.recovery_days_max
                          ? `${procedure.recovery_days_min} days`
                          : `${procedure.recovery_days_min}-${procedure.recovery_days_max} days`}
                      </dd>
                    </div>
                  )}
                  {procedure.anesthesia_type && (
                    <div>
                      <dt className="text-sm text-neutral-500">Anaesthesia Type</dt>
                      <dd className="mt-1 font-medium text-neutral-900 capitalize">
                        {procedure.anesthesia_type}
                      </dd>
                    </div>
                  )}
                  {procedure.risk_level && (
                    <div>
                      <dt className="text-sm text-neutral-500">Risk Level</dt>
                      <dd className="mt-1">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium capitalize ${
                            procedure.risk_level === 'low'
                              ? 'bg-green-50 text-green-700'
                              : procedure.risk_level === 'medium'
                                ? 'bg-yellow-50 text-yellow-700'
                                : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {procedure.risk_level}
                        </span>
                      </dd>
                    </div>
                  )}
                  {procedure.is_cosmetic != null && (
                    <div>
                      <dt className="text-sm text-neutral-500">Type</dt>
                      <dd className="mt-1 font-medium text-neutral-900">
                        {procedure.is_cosmetic ? 'Cosmetic' : 'Medical'}
                      </dd>
                    </div>
                  )}
                  {procedure.is_elective != null && (
                    <div>
                      <dt className="text-sm text-neutral-500">Elective</dt>
                      <dd className="mt-1 font-medium text-neutral-900">
                        {procedure.is_elective ? 'Yes' : 'No'}
                      </dd>
                    </div>
                  )}
                  {category && (
                    <div>
                      <dt className="text-sm text-neutral-500">Category</dt>
                      <dd className="mt-1">
                        <Link
                          href={`/${categorySlug}`}
                          className="font-medium text-primary-600 hover:text-primary-700"
                        >
                          {category.name}
                        </Link>
                      </dd>
                    </div>
                  )}
                </dl>
              </m.div>

              {/* Quick Links */}
              <m.div
                {...fadeInUp}
                className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-neutral-900">Explore</h3>
                <nav className="mt-4 space-y-2">
                  <Link
                    href={`/${categorySlug}/${procedure.slug}`}
                    className="block rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-primary-600"
                  >
                    {procedure.name} Overview
                  </Link>
                  <Link
                    href={`/search?procedure=${procedure.slug}`}
                    className="block rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-primary-600"
                  >
                    Find {procedure.name} Clinics
                  </Link>
                  <Link
                    href={`/${categorySlug}`}
                    className="block rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-primary-600"
                  >
                    All {category?.name || 'Procedures'}
                  </Link>
                </nav>
              </m.div>

              {/* Sidebar CTA */}
              <m.div
                {...fadeInUp}
                className="rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 text-white shadow-sm"
              >
                <h3 className="text-lg font-semibold">Get Your Free Quote</h3>
                <p className="mt-2 text-sm text-primary-100">
                  Compare prices from verified clinics and get personalised quotes for
                  your {procedure.name.toLowerCase()}.
                </p>
                <Link href={`/search?procedure=${procedure.slug}`} className="mt-4 block">
                  <Button variant="secondary" className="w-full">
                    Compare Clinics
                  </Button>
                </Link>
              </m.div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <m.section {...fadeInUp} className="mt-16">
          <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-8 text-center text-white sm:p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Get Your Free {procedure.name} Quote
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
              Compare prices from accredited clinics across {destinations.length} countries.
              Save up to {maxSavings > 0 ? `${maxSavings}%` : '70%'} on your treatment.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={`/search?procedure=${procedure.slug}`}>
                <Button variant="secondary" size="lg">
                  Find Clinics
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                  Talk to an Expert
                </Button>
              </Link>
            </div>
          </div>
        </m.section>
      </div>
    </>
  )
}
