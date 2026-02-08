'use client'

import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { FAQAccordion, type FAQItem } from '@/components/content/faq-accordion'
import type { Category, Procedure } from '@/lib/data/content'

interface NHSWaitTimesClientProps {
  procedure: Procedure
  category: Category
  nhsWaitWeeks: number
  destinations: Array<{
    country_name: string
    country_code: string
    country_slug: string
    flag_emoji: string | null
    price_min: number
    price_max: number
    flight_hours: number | null
  }>
  faqItems: FAQItem[]
}

function formatPrice(amount: number): string {
  return `£${amount.toLocaleString()}`
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
}

export function NHSWaitTimesClient({
  procedure,
  category,
  nhsWaitWeeks,
  destinations,
  faqItems,
}: NHSWaitTimesClientProps) {
  const nhsMonths = Math.round(nhsWaitWeeks / 4.3)
  const ukPrivateMin = procedure.uk_private_cost_min
  const ukPrivateMax = procedure.uk_private_cost_max
  const lowestAbroadPrice = destinations.length > 0
    ? Math.min(...destinations.map((d) => d.price_min))
    : null
  const savingsPercent = ukPrivateMin && lowestAbroadPrice
    ? Math.round((1 - lowestAbroadPrice / ukPrivateMin) * 100)
    : null

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
              href={`/${category.slug}/${procedure.slug}`}
              className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to {procedure.name}
            </Link>

            <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
              {procedure.name}: NHS Wait Times vs Going Abroad
            </h1>

            <p className="mt-4 max-w-3xl text-lg text-neutral-600">
              The current NHS wait for {procedure.name.toLowerCase()} is{' '}
              <span className="font-semibold text-red-600">{nhsWaitWeeks} weeks ({nhsMonths} months)</span>.
              {' '}Thousands of UK patients are choosing to skip the queue and get treated abroad
              {lowestAbroadPrice ? ` from as little as ${formatPrice(lowestAbroadPrice)}` : ''}.
            </p>
          </div>

          {/* Key Stats Grid */}
          <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4 sm:p-6 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-xl sm:text-3xl font-bold text-red-600">
                {nhsWaitWeeks} weeks
              </p>
              <p className="text-xs sm:text-sm text-neutral-500">NHS Wait Time</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-3xl font-bold text-neutral-900">
                {ukPrivateMin && ukPrivateMax
                  ? `${formatPrice(ukPrivateMin)}-${formatPrice(ukPrivateMax)}`
                  : 'N/A'}
              </p>
              <p className="text-xs sm:text-sm text-neutral-500">Private UK Cost</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-3xl font-bold text-green-600">
                {lowestAbroadPrice ? `From ${formatPrice(lowestAbroadPrice)}` : 'Compare'}
              </p>
              <p className="text-xs sm:text-sm text-neutral-500">Abroad From</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-3xl font-bold text-primary-600">
                {nhsMonths > 1 ? `${nhsMonths - 1}+ months` : 'Weeks'}
              </p>
              <p className="text-xs sm:text-sm text-neutral-500">Time Saved</p>
            </div>
          </div>
        </div>
      </m.section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* NHS Wait Time Visual */}
        <m.section {...fadeInUp} className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-neutral-900">
            How Long Will You Really Wait?
          </h2>

          <div className="space-y-6">
            {/* NHS Timeline */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
                  NHS
                </span>
                <h3 className="text-lg font-semibold text-neutral-900">NHS Waiting List</h3>
                <span className="ml-auto text-sm font-medium text-red-600">
                  {nhsWaitWeeks} weeks
                </span>
              </div>
              <div className="relative h-8 w-full overflow-hidden rounded-full bg-neutral-100">
                <m.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-red-400 to-red-600"
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                  {nhsWaitWeeks} weeks ({nhsMonths} months) waiting
                </div>
              </div>
              <div className="mt-3 flex justify-between text-xs text-neutral-400">
                <span>GP Referral</span>
                <span>Waiting...</span>
                <span>Waiting...</span>
                <span>Treatment</span>
              </div>
            </div>

            {/* Abroad Timeline */}
            <div className="rounded-xl border border-green-200 bg-green-50/30 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  GO
                </span>
                <h3 className="text-lg font-semibold text-neutral-900">Going Abroad</h3>
                <span className="ml-auto text-sm font-medium text-green-600">
                  2-4 weeks
                </span>
              </div>
              <div className="relative h-8 w-full overflow-hidden rounded-full bg-neutral-100">
                <m.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.max(5, Math.round((3 / nhsWaitWeeks) * 100))}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-medium text-white">
                  2-4 weeks total
                </div>
              </div>
              <div className="mt-3 flex text-xs text-neutral-400">
                <span>Enquiry</span>
                <span className="ml-4">Consultation</span>
                <span className="ml-4">Treatment</span>
              </div>
            </div>

            <p className="text-center text-sm text-neutral-500">
              That is up to{' '}
              <span className="font-semibold text-neutral-900">{nhsWaitWeeks - 3} weeks sooner</span>{' '}
              you could have your {procedure.name.toLowerCase()} done.
            </p>
          </div>
        </m.section>

        {/* Cost Comparison / Destination Cards */}
        {destinations.length > 0 && (
          <m.section {...fadeInUp} className="mb-20">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-neutral-900">
                Where Can You Get {procedure.name} Abroad?
              </h2>
              <p className="mt-2 text-neutral-600">
                Compare prices and flight times from London for {procedure.name.toLowerCase()} at accredited clinics
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((dest, index) => {
                const savings = ukPrivateMin
                  ? Math.round((1 - dest.price_min / ukPrivateMin) * 100)
                  : null

                return (
                  <m.div
                    key={dest.country_slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={`/destinations/${dest.country_slug}/${procedure.slug}`}
                      className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{dest.flag_emoji || '🌍'}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600">
                            {dest.country_name}
                          </h3>
                          {dest.flight_hours && (
                            <p className="text-xs text-neutral-500">
                              {dest.flight_hours}h flight from London
                            </p>
                          )}
                        </div>
                        <span className="text-primary-500 group-hover:translate-x-1 transition-transform">
                          &rarr;
                        </span>
                      </div>

                      <div className="flex items-end justify-between border-t border-neutral-100 pt-3">
                        <div>
                          <p className="text-xs text-neutral-500">Price range</p>
                          <p className="text-lg font-bold text-neutral-900">
                            {formatPrice(dest.price_min)}-{formatPrice(dest.price_max)}
                          </p>
                        </div>
                        {savings && savings > 0 && (
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                            Save {savings}%
                          </span>
                        )}
                      </div>

                      <div className="mt-3">
                        <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                          Treatment within 2-3 weeks
                        </span>
                      </div>
                    </Link>
                  </m.div>
                )
              })}
            </div>
          </m.section>
        )}

        {/* The Numbers Don't Lie Section */}
        <m.section {...fadeInUp} className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-neutral-900">
            The Numbers Don&apos;t Lie
          </h2>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* NHS Path */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                </span>
                <h3 className="text-lg font-semibold text-neutral-900">NHS Path</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-medium text-red-600">1</div>
                  <div>
                    <p className="font-medium text-neutral-900">GP Referral</p>
                    <p className="text-sm text-neutral-500">Join the waiting list</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-medium text-red-600">2</div>
                  <div>
                    <p className="font-medium text-red-600">{nhsWaitWeeks} weeks wait</p>
                    <p className="text-sm text-neutral-500">Living with your condition</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-medium text-red-600">3</div>
                  <div>
                    <p className="font-medium text-neutral-900">Treatment</p>
                    <p className="text-sm text-neutral-500">Finally receive care</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-medium text-red-600">4</div>
                  <div>
                    <p className="font-medium text-neutral-900">Recovery at home</p>
                    <p className="text-sm text-neutral-500">NHS follow-up appointments</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t border-neutral-100 pt-4">
                <p className="text-sm text-neutral-500">Cost</p>
                <p className="text-lg font-bold text-neutral-900">Free (funded by NHS)</p>
                <p className="text-sm text-red-600">But {nhsMonths}+ months waiting</p>
              </div>
            </div>

            {/* Private UK Path */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                </span>
                <h3 className="text-lg font-semibold text-neutral-900">Private UK</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-50 text-xs font-medium text-amber-600">1</div>
                  <div>
                    <p className="font-medium text-neutral-900">Book consultation</p>
                    <p className="text-sm text-neutral-500">Usually within 1-2 weeks</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-50 text-xs font-medium text-amber-600">2</div>
                  <div>
                    <p className="font-medium text-neutral-900">Treatment</p>
                    <p className="text-sm text-neutral-500">Within 2-6 weeks</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-50 text-xs font-medium text-amber-600">3</div>
                  <div>
                    <p className="font-medium text-neutral-900">Recovery at home</p>
                    <p className="text-sm text-neutral-500">Private follow-up included</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t border-neutral-100 pt-4">
                <p className="text-sm text-neutral-500">Cost</p>
                <p className="text-lg font-bold text-neutral-900">
                  {ukPrivateMin && ukPrivateMax
                    ? `${formatPrice(ukPrivateMin)}-${formatPrice(ukPrivateMax)}`
                    : 'Varies'}
                </p>
                <p className="text-sm text-amber-600">Faster, but expensive</p>
              </div>
            </div>

            {/* Going Abroad Path */}
            <div className="rounded-xl border-2 border-primary-200 bg-primary-50/30 p-6 shadow-sm relative overflow-hidden">
              <div className="absolute -right-3 top-3 rotate-12 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Best Value
              </div>
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                </span>
                <h3 className="text-lg font-semibold text-neutral-900">Going Abroad</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-50 text-xs font-medium text-green-600">1</div>
                  <div>
                    <p className="font-medium text-neutral-900">Free consultation</p>
                    <p className="text-sm text-neutral-500">Virtual call within days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-50 text-xs font-medium text-green-600">2</div>
                  <div>
                    <p className="font-medium text-green-600">Treatment in 2-3 weeks</p>
                    <p className="text-sm text-neutral-500">At an accredited clinic</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-50 text-xs font-medium text-green-600">3</div>
                  <div>
                    <p className="font-medium text-neutral-900">Recovery holiday</p>
                    <p className="text-sm text-neutral-500">Recover in comfort abroad</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-50 text-xs font-medium text-green-600">4</div>
                  <div>
                    <p className="font-medium text-neutral-900">GP follow-up at home</p>
                    <p className="text-sm text-neutral-500">Full records provided</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t border-primary-100 pt-4">
                <p className="text-sm text-neutral-500">Cost</p>
                <p className="text-lg font-bold text-neutral-900">
                  {lowestAbroadPrice ? `From ${formatPrice(lowestAbroadPrice)}` : 'Compare prices'}
                </p>
                {savingsPercent && savingsPercent > 0 && (
                  <p className="text-sm text-green-600">Save up to {savingsPercent}% vs UK private</p>
                )}
              </div>
            </div>
          </div>
        </m.section>

        {/* Is It Safe? Section */}
        <m.section {...fadeInUp} className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-neutral-900">
            Is Getting {procedure.name} Abroad Safe?
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">JCI-Accredited Hospitals</h3>
              <p className="mt-2 text-neutral-600">
                Joint Commission International (JCI) is the gold standard for healthcare accreditation worldwide.
                JCI-accredited hospitals meet the same rigorous safety standards as top NHS and private hospitals.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Internationally Trained Surgeons</h3>
              <p className="mt-2 text-neutral-600">
                Many surgeons at international clinics trained at leading institutions in the UK, US, and Europe.
                They often have extensive experience performing {procedure.name.toLowerCase()} with thousands of
                successful cases.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Full Medical Documentation</h3>
              <p className="mt-2 text-neutral-600">
                Reputable clinics provide comprehensive medical records in English, including operative reports,
                discharge summaries, and aftercare instructions that your GP can use for follow-up care.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Ongoing Aftercare Support</h3>
              <p className="mt-2 text-neutral-600">
                Leading international clinics offer warranties on procedures, 24/7 WhatsApp support, and
                remote video follow-ups. Many have partnerships with UK-based specialists for continued care.
              </p>
            </div>
          </div>
        </m.section>

        {/* FAQ Section */}
        <m.section {...fadeInUp} className="mb-20">
          <FAQAccordion
            items={faqItems}
            title={`${procedure.name} NHS Wait Time FAQs`}
          />
        </m.section>

        {/* CTA Section */}
        <m.section {...fadeInUp}>
          <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-8 text-center text-white sm:p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Skip the {nhsWaitWeeks}-Week NHS Wait
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
              Compare accredited clinics abroad, read verified patient reviews, and get your{' '}
              {procedure.name.toLowerCase()} done in weeks, not months.
              {savingsPercent && savingsPercent > 0
                ? ` Save up to ${savingsPercent}% compared to private UK prices.`
                : ''}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={`/search?procedure=${procedure.slug}`}>
                <Button variant="secondary" size="lg">
                  Find Clinics Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                  Talk to an Advisor
                </Button>
              </Link>
            </div>
          </div>
        </m.section>
      </div>
    </>
  )
}
