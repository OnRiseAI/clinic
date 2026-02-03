'use client'

import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { ClinicCard } from '@/components/clinics/clinic-card'
import { CostComparisonWidget } from '@/components/content/cost-comparison-widget'
import { FAQAccordion, CATEGORY_FAQS } from '@/components/content/faq-accordion'
import type { Category, ProcedureWithStats, DestinationWithStats, CostComparisonData } from '@/lib/data/content'
import type { ClinicCardData } from '@/lib/data/clinics'

interface CategoryPageClientProps {
  category: Category
  procedures: ProcedureWithStats[]
  clinics: ClinicCardData[]
  destinations: DestinationWithStats[]
  costComparison: CostComparisonData[]
  topProcedure: ProcedureWithStats | null
}

const CATEGORY_IMAGES: Record<string, string> = {
  dental: '/images/categories/dental-hero.jpg',
  cosmetic: '/images/categories/cosmetic-hero.jpg',
  fertility: '/images/categories/fertility-hero.jpg',
  orthopedic: '/images/categories/orthopedic-hero.jpg',
  bariatric: '/images/categories/bariatric-hero.jpg',
  'hair-transplant': '/images/categories/hair-hero.jpg',
}

function formatPrice(price: number | null, currency: string = 'EUR'): string {
  if (!price) return 'Contact for pricing'
  const symbols: Record<string, string> = { EUR: '€', USD: '$', GBP: '£' }
  return `From ${symbols[currency] || currency}${price.toLocaleString()}`
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
}

export function CategoryPageClient({
  category,
  procedures,
  clinics,
  destinations,
  costComparison,
  topProcedure,
}: CategoryPageClientProps) {
  const faqs = CATEGORY_FAQS[category.slug] || []
  const heroImage = CATEGORY_IMAGES[category.slug]

  return (
    <>
      {/* Hero Section */}
      <m.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-primary-700 to-primary-900 text-white"
      >
        {heroImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        )}
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          {category.icon && (
            <span className="mb-4 inline-block text-5xl">{category.icon}</span>
          )}
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
            {category.name} Abroad
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100 sm:text-xl">
            {category.description ||
              `Compare ${category.name.toLowerCase()} treatment options from accredited clinics worldwide. Save up to 70% while receiving world-class care.`}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/search">
              <Button variant="secondary" size="lg">
                Find Clinics
              </Button>
            </Link>
            <Link href="#procedures">
              <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                View Procedures
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <p className="text-3xl font-bold">{procedures.length}+</p>
              <p className="text-sm text-primary-200">Procedures</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{clinics.length}+</p>
              <p className="text-sm text-primary-200">Top Clinics</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{destinations.length}+</p>
              <p className="text-sm text-primary-200">Destinations</p>
            </div>
            <div>
              <p className="text-3xl font-bold">50-70%</p>
              <p className="text-sm text-primary-200">Average Savings</p>
            </div>
          </div>
        </div>
      </m.section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Procedures Grid */}
        <m.section {...fadeInUp} id="procedures" className="mb-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900">
                {category.name} Procedures
              </h2>
              <p className="mt-2 text-neutral-600">
                Compare prices and find the right treatment for you
              </p>
            </div>
          </div>

          {procedures.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {procedures.map((procedure, index) => (
                <m.div
                  key={procedure.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/${category.slug}/${procedure.slug}`}
                    className="group block rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
                  >
                    <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600">
                      {procedure.name}
                    </h3>
                    {procedure.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                        {procedure.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-primary-600">
                        {formatPrice(procedure.starting_price, procedure.price_currency)}
                      </span>
                      {procedure.clinic_count > 0 && (
                        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
                          {procedure.clinic_count} clinics
                        </span>
                      )}
                    </div>
                  </Link>
                </m.div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-8 py-16 text-center">
              <p className="text-neutral-500">Procedures coming soon</p>
            </div>
          )}
        </m.section>

        {/* Top Destinations */}
        <m.section {...fadeInUp} className="mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-neutral-900">
              Top Destinations for {category.name}
            </h2>
            <p className="mt-2 text-neutral-600">
              Popular countries for {category.name.toLowerCase()} treatments
            </p>
          </div>

          {destinations.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((destination, index) => (
                <m.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/destinations/${destination.slug}`}
                    className="group relative flex h-48 items-end overflow-hidden rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 p-6"
                  >
                    {destination.hero_image_url && (
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105"
                        style={{ backgroundImage: `url(${destination.hero_image_url})` }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="relative text-white">
                      <h3 className="text-xl font-bold">{destination.country_name}</h3>
                      <p className="mt-1 text-sm text-white/80">
                        {destination.clinic_count} clinics
                      </p>
                    </div>
                  </Link>
                </m.div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-8 py-16 text-center">
              <p className="text-neutral-500">Destination data coming soon</p>
            </div>
          )}
        </m.section>

        {/* Top Clinics */}
        <m.section {...fadeInUp} className="mb-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900">
                Top {category.name} Clinics
              </h2>
              <p className="mt-2 text-neutral-600">
                Highest-rated clinics specializing in {category.name.toLowerCase()}
              </p>
            </div>
            <Link href={`/search?category=${category.slug}`}>
              <Button variant="outline">View All Clinics</Button>
            </Link>
          </div>

          {clinics.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {clinics.slice(0, 8).map((clinic) => (
                <ClinicCard key={clinic.id} clinic={clinic} showEnquiryButton={false} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-8 py-16 text-center">
              <p className="text-neutral-500">Clinics coming soon</p>
            </div>
          )}
        </m.section>

        {/* Cost Comparison Widget */}
        {topProcedure && costComparison.length > 0 && (
          <m.section {...fadeInUp} className="mb-20">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-neutral-900">
                {topProcedure.name} Cost Comparison
              </h2>
              <p className="mt-2 text-neutral-600">
                Compare {topProcedure.name.toLowerCase()} prices across popular destinations
              </p>
            </div>
            <CostComparisonWidget
              data={costComparison}
              procedureSlug={topProcedure.slug}
              title={`${topProcedure.name} Prices by Country`}
            />
          </m.section>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <m.section {...fadeInUp} className="mb-20">
            <FAQAccordion
              items={faqs}
              title={`${category.name} Treatment FAQs`}
            />
          </m.section>
        )}

        {/* CTA Section */}
        <m.section {...fadeInUp}>
          <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-8 text-center text-white sm:p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to Start Your {category.name} Journey?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
              Compare clinics, read reviews, and get personalized quotes from top
              {' '}{category.name.toLowerCase()} specialists worldwide.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/search">
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
