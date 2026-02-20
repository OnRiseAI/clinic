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
      {/* ===================================================================
          SECTION A: HERO
          =================================================================== */}
      <section className="relative overflow-hidden bg-[#0A1A2F] text-white">
        {/* Abstract Premium Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-[#0A1A2F] to-primary-950/80" />
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary-600/20 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/images/patterns/medical-pattern.svg')] opacity-5 mix-blend-overlay" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <m.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-4xl text-center"
          >
            {category.icon && (
              <span className="mb-6 inline-block text-5xl drop-shadow-lg">{category.icon}</span>
            )}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              {category.name} Abroad: <br/>
              <span className="bg-gradient-to-r from-blue-200 to-primary-200 bg-clip-text text-transparent font-light">Your Complete Guide to Treatment Overseas</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl lg:text-2xl leading-relaxed font-light">
              {category.description ||
                `Compare ${category.name.toLowerCase()} treatment options from accredited clinics worldwide. Save up to 70% while receiving world-class care.`}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={`/search?category=${category.slug}`}>
                <Button size="lg" className="w-full sm:w-auto bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base shadow-xl shadow-white/10">
                  Find Clinics
                </Button>
              </Link>
              <Link href="#procedures">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full text-neutral-300 hover:text-white hover:bg-white/5 sm:w-auto rounded-full transition-all duration-300"
                >
                  View Procedures
                </Button>
              </Link>
            </div>
          </m.div>

          {/* Premium Glassmorphism Trust Bar */}
          <m.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-16 sm:mt-24 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-8 divide-x divide-white/10 sm:grid-cols-4">
              <div className="text-center px-4">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl text-white">{procedures.length}+</p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-primary-200/80">Procedures</p>
              </div>
              <div className="text-center px-4">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl text-white">{clinics.length}+</p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-primary-200/80">Top Clinics</p>
              </div>
              <div className="text-center px-4">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl text-white">{destinations.length}+</p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-primary-200/80">Destinations</p>
              </div>
              <div className="text-center px-4 border-l border-white/10 sm:border-l">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl text-white">50-70%</p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-primary-200/80">Average Savings</p>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Procedures Grid */}
        <m.section {...fadeInUp} id="procedures" className="mb-24 scroll-mt-24 sm:mb-32">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl tracking-tight">
              {category.name} Procedures
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Compare prices and find the right treatment for you
            </p>
          </div>

          {procedures.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {procedures.map((procedure, index) => (
                <m.div
                  key={procedure.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <Link
                    href={`/${category.slug}/${procedure.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/60 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-900/5"
                  >
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary-50 to-primary-100/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-2xl" />
                    
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-neutral-900 transition-colors group-hover:text-primary-700">
                        {procedure.name}
                      </h3>
                      {procedure.description && (
                        <p className="mt-3 line-clamp-2 flex-1 text-sm text-neutral-600 leading-relaxed">
                          {procedure.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="relative z-10 mt-6 space-y-3 rounded-xl bg-neutral-50 p-4 border border-neutral-100">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-neutral-500">Starting at</span>
                        <span className="font-semibold text-neutral-900">
                          {formatPrice(procedure.starting_price, procedure.price_currency)}
                        </span>
                      </div>
                      {procedure.clinic_count > 0 && (
                        <div className="flex justify-between items-center text-sm border-t border-neutral-200/60 pt-3">
                          <span className="font-medium text-neutral-500">Available in</span>
                          <span className="text-sm font-semibold text-primary-600">
                            {procedure.clinic_count} clinics
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <span className="relative z-10 mt-6 inline-flex items-center text-sm font-semibold text-primary-600 transition-colors group-hover:text-primary-800">
                      View procedure details
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </Link>
                </m.div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-8 py-16 text-center mt-10">
              <p className="text-neutral-500">Procedures coming soon</p>
            </div>
          )}
        </m.section>

        {/* Top Destinations */}
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="max-w-2xl text-center mx-auto mb-12">
            <span className="text-sm font-bold tracking-widest text-primary-600 uppercase">Destinations</span>
            <h2 className="mt-4 text-3xl font-bold text-neutral-900 sm:text-4xl tracking-tight">
              Top Destinations for {category.name}
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
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
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={`/destinations/${destination.slug}`}
                    className="group relative flex h-[280px] items-end overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:shadow-primary-900/10"
                  >
                    {destination.hero_image_url && (
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${destination.hero_image_url})` }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                    
                    <div className="relative text-white z-10 w-full">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="text-3xl font-bold tracking-tight">{destination.country_name}</h3>
                          <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-md">
                            {destination.clinic_count} clinics
                          </div>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md transform translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                          <span className="text-white">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </m.div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-8 py-16 text-center">
              <p className="text-neutral-500">Destination data coming soon</p>
            </div>
          )}
        </m.section>

        {/* Top Clinics */}
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-neutral-200/60 pb-6 mb-10">
            <div>
              <span className="text-sm font-bold tracking-widest text-primary-600 uppercase">Featured</span>
              <h2 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl tracking-tight">
                Top {category.name} Clinics
              </h2>
              <p className="mt-3 text-lg text-neutral-600">
                Highest-rated clinics specializing in {category.name.toLowerCase()}
              </p>
            </div>
            <Link href={`/search?category=${category.slug}`}>
              <Button variant="outline" className="group rounded-full border-neutral-300 hover:bg-neutral-50 hover:text-primary-700 transition-all duration-300">
                View All Clinics <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Button>
            </Link>
          </div>

          {clinics.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {clinics.slice(0, 8).map((clinic) => (
                <div key={clinic.id} className="transition-all duration-500 hover:-translate-y-1">
                  <ClinicCard clinic={clinic} showEnquiryButton={false} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-8 py-16 text-center">
              <p className="text-neutral-500">Clinics coming soon</p>
            </div>
          )}
        </m.section>

        {/* Cost Comparison Widget */}
        {topProcedure && costComparison.length > 0 && (
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-neutral-900 tracking-tight sm:text-4xl">
                {topProcedure.name} Cost Comparison
              </h2>
              <p className="mt-4 text-lg text-neutral-600">
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
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="mx-auto max-w-4xl">
              <FAQAccordion
                items={faqs}
                title={`${category.name} Treatment FAQs`}
              />
            </div>
          </m.section>
        )}

        {/* CTA Section */}
        <m.section {...fadeInUp} className="pb-12">
          <div className="relative overflow-hidden rounded-3xl bg-[#0A1A2F] p-8 text-white sm:p-12 lg:p-20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-blue-600/20" />
            <div className="absolute -left-1/4 -top-1/4 h-full w-full rounded-full bg-primary-500/10 blur-[120px]" />
            <div className="absolute -bottom-1/4 -right-1/4 h-full w-full rounded-full bg-blue-500/10 blur-[120px]" />
            <div className="absolute inset-0 bg-[url('/images/patterns/medical-pattern.svg')] opacity-5 mix-blend-overlay" />
            
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <span className="text-sm font-bold tracking-widest text-primary-200/80 uppercase mb-4 block">Take the next step</span>
              <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl tracking-tight">
                Ready to Start Your {category.name} Journey?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl lg:text-2xl font-light leading-relaxed">
                Compare clinics, read reviews, and get personalized quotes from top
                {' '}{category.name.toLowerCase()} specialists worldwide.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href={`/search?category=${category.slug}`}>
                  <Button size="lg" className="w-full sm:w-auto bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base shadow-xl shadow-white/10">
                    Find Clinics
                  </Button>
                </Link>
                <Link href={`/contact?procedure=${category.slug}`}>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base backdrop-blur-md"
                  >
                    Talk to an Expert
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </m.section>
      </div>
    </>
  )
}
