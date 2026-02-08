'use client'

import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { ClinicCard } from '@/components/clinics/clinic-card'
import { FAQAccordion, generateProcedureDestinationFAQs } from '@/components/content/faq-accordion'
import type { Destination, Procedure } from '@/lib/data/content'
import type { ClinicCardData } from '@/lib/data/clinics'

interface DestinationProcedureStats {
  clinicCount: number
  avgPrice: number | null
  minPrice: number | null
  maxPrice: number | null
}

interface DestinationProcedurePageClientProps {
  destination: Destination
  procedure: Procedure
  clinics: ClinicCardData[]
  stats: DestinationProcedureStats
}

// Country flags
const COUNTRY_FLAGS: Record<string, string> = {
  turkey: '🇹🇷',
  spain: '🇪🇸',
  mexico: '🇲🇽',
  thailand: '🇹🇭',
  hungary: '🇭🇺',
  poland: '🇵🇱',
  'czech-republic': '🇨🇿',
  brazil: '🇧🇷',
  india: '🇮🇳',
  'south-korea': '🇰🇷',
  germany: '🇩🇪',
  portugal: '🇵🇹',
  greece: '🇬🇷',
  croatia: '🇭🇷',
  'united-arab-emirates': '🇦🇪',
  colombia: '🇨🇴',
  'costa-rica': '🇨🇷',
  malaysia: '🇲🇾',
  singapore: '🇸🇬',
  israel: '🇮🇱',
}

// Estimated UK/US prices for comparison (in EUR)
const UK_US_PRICES: Record<string, { uk: number; us: number }> = {
  'dental-implants': { uk: 2500, us: 4500 },
  'all-on-4': { uk: 12000, us: 25000 },
  'dental-veneers': { uk: 900, us: 1500 },
  'teeth-whitening': { uk: 400, us: 600 },
  'dental-crowns': { uk: 800, us: 1200 },
  'root-canal': { uk: 600, us: 1000 },
  rhinoplasty: { uk: 6500, us: 8500 },
  'breast-augmentation': { uk: 7000, us: 10000 },
  liposuction: { uk: 5000, us: 7500 },
  'tummy-tuck': { uk: 7500, us: 12000 },
  facelift: { uk: 9000, us: 15000 },
  'hair-transplant': { uk: 8000, us: 15000 },
  'fue-hair-transplant': { uk: 8000, us: 15000 },
  ivf: { uk: 6000, us: 15000 },
  'egg-freezing': { uk: 4000, us: 8000 },
  'gastric-sleeve': { uk: 10000, us: 18000 },
  'gastric-bypass': { uk: 12000, us: 25000 },
  'hip-replacement': { uk: 12000, us: 40000 },
  'knee-replacement': { uk: 10000, us: 35000 },
  lasik: { uk: 2500, us: 4000 },
  'dental-bridges': { uk: 1050, us: 2000 },
  'full-mouth-dental-implants': { uk: 15000, us: 30000 },
  'root-canal-treatment': { uk: 550, us: 1100 },
  dentures: { uk: 1000, us: 1400 },
  'gum-treatment': { uk: 700, us: 1000 },
  orthodontics: { uk: 4250, us: 5500 },
  'smile-makeover': { uk: 10000, us: 16500 },
  'wisdom-tooth-extraction': { uk: 350, us: 450 },
  'breast-lift': { uk: 6250, us: 8000 },
  'breast-reduction': { uk: 6750, us: 9000 },
  bbl: { uk: 8000, us: 11500 },
  blepharoplasty: { uk: 4000, us: 6000 },
  'brow-lift': { uk: 5000, us: 7500 },
  'neck-lift': { uk: 6500, us: 9000 },
  otoplasty: { uk: 3250, us: 4500 },
  'mummy-makeover': { uk: 14000, us: 20000 },
  'gynaecomastia-surgery': { uk: 4500, us: 6000 },
  'dhi-hair-transplant': { uk: 9000, us: 15000 },
  'beard-transplant': { uk: 5500, us: 7500 },
  'eyebrow-transplant': { uk: 4000, us: 5500 },
  'gastric-band': { uk: 6500, us: 11500 },
  'gastric-balloon': { uk: 4000, us: 6000 },
  'ivf-treatment': { uk: 6500, us: 18500 },
  'egg-donation-ivf': { uk: 10000, us: 30000 },
  'iui-treatment': { uk: 2000, us: 3000 },
  'embryo-freezing': { uk: 3250, us: 4500 },
  'pgt-genetic-testing': { uk: 4000, us: 4500 },
  'acl-reconstruction': { uk: 8000, us: 22500 },
  'spinal-surgery': { uk: 18500, us: 55000 },
  'shoulder-surgery': { uk: 8000, us: 22500 },
  'lasik-eye-surgery': { uk: 3250, us: 4000 },
  'lens-replacement': { uk: 4000, us: 6000 },
  'cataract-surgery': { uk: 3250, us: 4750 },
  'health-check-up': { uk: 1250, us: 3000 },
  'dermatology-treatment': { uk: 1250, us: 1500 },
  'physiotherapy-rehabilitation': { uk: 500, us: 800 },
  'stem-cell-therapy': { uk: 8500, us: 10000 },
  'varicose-vein-treatment': { uk: 3000, us: 4500 },
}

function formatCurrency(amount: number | null, currency: string = 'EUR'): string {
  if (!amount) return 'Contact for pricing'
  const symbols: Record<string, string> = { EUR: '€', USD: '$', GBP: '£' }
  return `${symbols[currency] || currency}${amount.toLocaleString()}`
}

function calculateSavings(localPrice: number | null, ukPrice: number): number | null {
  if (!localPrice || localPrice >= ukPrice) return null
  return Math.round(((ukPrice - localPrice) / ukPrice) * 100)
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
}

export function DestinationProcedurePageClient({
  destination,
  procedure,
  clinics,
  stats,
}: DestinationProcedurePageClientProps) {
  const flag = COUNTRY_FLAGS[destination.slug] || '🌍'
  const ukUsPrice = UK_US_PRICES[procedure.slug]
  const savings = ukUsPrice ? calculateSavings(stats.avgPrice, ukUsPrice.uk) : null
  const faqs = generateProcedureDestinationFAQs(procedure.name, destination.country_name)

  return (
    <>
      {/* Hero Section */}
      <m.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white pb-8"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 text-sm text-primary-600">
                <span className="text-xl">{flag}</span>
                <Link href={`/destinations/${destination.slug}`} className="hover:underline">
                  {destination.country_name}
                </Link>
                <span className="text-neutral-400">/</span>
                <span>{procedure.category?.name || 'Treatment'}</span>
              </div>

              <h1 className="mt-4 text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
                {procedure.name} in {destination.country_name}
              </h1>

              <p className="mt-4 text-lg text-neutral-600">
                {procedure.description ||
                  `Compare prices and find the best clinics for ${procedure.name.toLowerCase()} in ${destination.country_name}. Save up to ${savings || 70}% compared to UK/US prices.`}
              </p>

              {/* Price Comparison Cards */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {/* Local Price */}
                <div className="rounded-xl border-2 border-primary-200 bg-primary-50 p-5 text-center">
                  <p className="text-sm font-medium text-primary-600">{destination.country_name}</p>
                  <p className="mt-2 text-3xl font-bold text-primary-700">
                    {stats.avgPrice ? formatCurrency(stats.avgPrice) : 'From €XXX'}
                  </p>
                  {stats.minPrice && stats.maxPrice && stats.minPrice !== stats.maxPrice && (
                    <p className="mt-1 text-sm text-primary-600">
                      Range: {formatCurrency(stats.minPrice)} - {formatCurrency(stats.maxPrice)}
                    </p>
                  )}
                </div>

                {/* UK Price */}
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 text-center">
                  <p className="text-sm font-medium text-neutral-500">UK Average</p>
                  <p className="mt-2 text-3xl font-bold text-neutral-400 line-through">
                    {ukUsPrice ? formatCurrency(ukUsPrice.uk, 'GBP') : '£X,XXX'}
                  </p>
                </div>

                {/* Savings */}
                <div className="rounded-xl border-2 border-green-200 bg-green-50 p-5 text-center">
                  <p className="text-sm font-medium text-green-600">You Save</p>
                  <p className="mt-2 text-3xl font-bold text-green-600">
                    {savings ? `${savings}%` : '50-70%'}
                  </p>
                  {ukUsPrice && stats.avgPrice && (
                    <p className="mt-1 text-sm text-green-600">
                      ~{formatCurrency(ukUsPrice.uk - stats.avgPrice)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* CTA Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Get a Free Quote
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600">
                    Compare prices from {stats.clinicCount > 0 ? stats.clinicCount : 'verified'} clinics
                    offering {procedure.name.toLowerCase()} in {destination.country_name}.
                  </p>

                  <div className="mt-6 space-y-3">
                    <Link
                      href={`/search?destination=${destination.slug}&procedure=${procedure.slug}`}
                      className="block"
                    >
                      <Button variant="accent" className="w-full">
                        Compare All Clinics
                      </Button>
                    </Link>
                    <Link href="/contact" className="block">
                      <Button variant="outline" className="w-full">
                        Talk to an Expert
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Quick Benefits */}
                <div className="rounded-xl border border-neutral-200 bg-white p-6">
                  <h4 className="font-semibold text-neutral-900">
                    Why Get {procedure.name} in {destination.country_name}?
                  </h4>
                  <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary-500">✓</span>
                      Save {savings ? `${savings}%` : '50-70%'} compared to UK/US
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary-500">✓</span>
                      JCI-accredited facilities
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary-500">✓</span>
                      English-speaking doctors
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary-500">✓</span>
                      No waiting lists
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary-500">✓</span>
                      All-inclusive packages available
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </m.section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* What to Expect Section */}
        <m.section {...fadeInUp} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-neutral-900">
            What to Expect: {procedure.name} in {destination.country_name}
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-xl">
                1
              </div>
              <h3 className="font-semibold text-neutral-900">Before You Travel</h3>
              <p className="mt-2 text-sm text-neutral-600">
                Have a virtual consultation with your chosen clinic. They&apos;ll review your case,
                provide a detailed quote, and help plan your trip including accommodation
                recommendations.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-xl">
                2
              </div>
              <h3 className="font-semibold text-neutral-900">During Your Stay</h3>
              <p className="mt-2 text-sm text-neutral-600">
                Many clinics offer airport pickup. You&apos;ll have an in-person consultation,
                your {procedure.name.toLowerCase()} procedure, and follow-up appointments all
                during your stay.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-xl">
                3
              </div>
              <h3 className="font-semibold text-neutral-900">After You Return</h3>
              <p className="mt-2 text-sm text-neutral-600">
                Receive aftercare instructions and maintain contact with your clinic. Many offer
                video follow-ups and can connect you with local doctors if needed.
              </p>
            </div>
          </div>
        </m.section>

        {/* All Clinics */}
        <m.section {...fadeInUp} className="mb-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                {stats.clinicCount > 0
                  ? `${stats.clinicCount} Clinics Offering ${procedure.name}`
                  : `Clinics for ${procedure.name}`} in {destination.country_name}
              </h2>
              <p className="mt-2 text-neutral-600">
                Compare prices, read reviews, and find the best clinic for you
              </p>
            </div>
            {clinics.length > 8 && (
              <Link href={`/search?destination=${destination.slug}&procedure=${procedure.slug}`}>
                <Button variant="outline">View All</Button>
              </Link>
            )}
          </div>

          {clinics.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {clinics.slice(0, 12).map((clinic) => (
                <ClinicCard key={clinic.id} clinic={clinic} showEnquiryButton={true} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-8 py-16 text-center">
              <p className="text-neutral-500">
                We&apos;re currently adding clinics for {procedure.name.toLowerCase()} in{' '}
                {destination.country_name}.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <Link href={`/destinations/${destination.slug}`}>
                  <Button variant="outline">View All {destination.country_name} Clinics</Button>
                </Link>
                <Link href={`/search?procedure=${procedure.slug}`}>
                  <Button variant="primary">Find {procedure.name} Elsewhere</Button>
                </Link>
              </div>
            </div>
          )}
        </m.section>

        {/* Treatment Info Grid */}
        <m.section {...fadeInUp} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-neutral-900">
            {procedure.name} Treatment Information
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <h3 className="font-semibold text-neutral-900">Typical Stay Duration</h3>
              <p className="mt-2 text-neutral-600">
                Most patients stay 5-14 days in {destination.country_name} for{' '}
                {procedure.name.toLowerCase()}. This includes initial consultations, the procedure
                itself, and follow-up appointments. Your clinic will advise on the exact timeline
                based on your treatment plan.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <h3 className="font-semibold text-neutral-900">What&apos;s Usually Included</h3>
              <ul className="mt-2 space-y-2 text-neutral-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary-500">•</span>
                  Initial consultation and treatment planning
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500">•</span>
                  The {procedure.name.toLowerCase()} procedure
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500">•</span>
                  Follow-up appointments and aftercare
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500">•</span>
                  Many clinics include transfers and accommodation
                </li>
              </ul>
            </div>
          </div>
        </m.section>

        {/* FAQ Section */}
        <m.section {...fadeInUp} className="mb-16">
          <FAQAccordion
            items={faqs}
            title={`${procedure.name} in ${destination.country_name} FAQs`}
          />
        </m.section>

        {/* CTA Section */}
        <m.section {...fadeInUp}>
          <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-8 text-center text-white sm:p-12">
            <div className="mb-4 text-5xl">{flag}</div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready for Your {procedure.name} in {destination.country_name}?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
              Compare clinics, check prices, and get personalized quotes.
              Save {savings ? `${savings}%` : 'up to 70%'} on your treatment.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={`/search?destination=${destination.slug}&procedure=${procedure.slug}`}>
                <Button variant="secondary" size="lg">
                  Compare Clinics
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
