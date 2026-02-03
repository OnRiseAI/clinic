'use client'

import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { ClinicCard } from '@/components/clinics/clinic-card'
import { CostComparisonWidget } from '@/components/content/cost-comparison-widget'
import { FAQAccordion, type FAQItem } from '@/components/content/faq-accordion'
import type { Category, Procedure, DestinationWithStats, CostComparisonData } from '@/lib/data/content'
import type { ClinicCardData } from '@/lib/data/clinics'
import { AIAnswerBlock, generateProcedureAnswer } from '@/components/seo/ai-answer-block'

interface ProcedurePageClientProps {
  category: Category
  procedure: Procedure
  clinics: ClinicCardData[]
  destinations: DestinationWithStats[]
  costComparison: CostComparisonData[]
  relatedProcedures: Procedure[]
  stats: {
    clinicCount: number
    countryCount: number
    avgPrice: number | null
    minPrice: number | null
    maxPrice: number | null
  }
}

function formatCurrency(amount: number | null, currency: string = 'EUR'): string {
  if (!amount) return 'Contact for pricing'
  const symbols: Record<string, string> = { EUR: '€', USD: '$', GBP: '£' }
  return `${symbols[currency] || currency}${amount.toLocaleString()}`
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
}

// Generate dynamic FAQs based on procedure name
function generateProcedureFAQs(procedureName: string): FAQItem[] {
  return [
    {
      question: `How much does ${procedureName.toLowerCase()} cost abroad?`,
      answer: `${procedureName} costs abroad are typically 50-70% lower than in the UK or US. Prices vary by destination - countries like Turkey, Hungary, and Thailand offer excellent quality at competitive prices. Use our cost comparison tool to see exact prices by country.`,
    },
    {
      question: `Is it safe to get ${procedureName.toLowerCase()} abroad?`,
      answer: `Yes, when you choose accredited clinics with experienced doctors. Look for JCI or ISO certifications, check doctor qualifications and reviews, and ensure the clinic has good communication in English. Many international clinics meet or exceed Western standards.`,
    },
    {
      question: `What is the best country for ${procedureName.toLowerCase()}?`,
      answer: `The best country depends on your priorities - cost, quality, travel distance, and language. Turkey is popular for competitive prices, Spain for EU standards and ease of travel, Thailand for combining treatment with recovery in a beautiful setting. Compare clinics rather than just countries.`,
    },
    {
      question: `How long do I need to stay abroad for ${procedureName.toLowerCase()}?`,
      answer: `The required stay varies by the complexity of your treatment and individual recovery needs. Most patients stay 5-14 days, which includes consultations, the procedure, and follow-up appointments. Your clinic will provide specific guidance based on your treatment plan.`,
    },
    {
      question: `What happens if something goes wrong after ${procedureName.toLowerCase()} abroad?`,
      answer: `Reputable clinics offer warranties on their work and have protocols for follow-up care. Many have partnerships with doctors in your home country. Before treatment, ensure you have a clear aftercare plan, the clinic's contact details for emergencies, and documentation of your treatment.`,
    },
    {
      question: `How do I choose the best clinic for ${procedureName.toLowerCase()}?`,
      answer: `Research thoroughly: check accreditations (JCI, ISO), verify doctor qualifications and experience, read patient reviews, look at before/after photos, and have a video consultation before committing. Price shouldn't be the only factor - prioritize quality and safety.`,
    },
  ]
}

export function ProcedurePageClient({
  category,
  procedure,
  clinics,
  destinations,
  costComparison,
  relatedProcedures,
  stats,
}: ProcedurePageClientProps) {
  const faqs = generateProcedureFAQs(procedure.name)

  // Generate AI answer if we have price data
  const aiAnswer =
    stats.minPrice && stats.maxPrice
      ? generateProcedureAnswer({
          procedureName: procedure.name,
          definition: procedure.description?.split('.')[0] || `a popular medical procedure`,
          minPrice: stats.minPrice,
          maxPrice: stats.maxPrice,
          ukPrice: Math.round(stats.maxPrice * 2.5), // Estimate UK price as 2.5x average abroad
          savingsPercent: 60,
          topCountries: destinations.slice(0, 3).map((d) => d.country_name),
        })
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
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link
                href={`/${category.slug}`}
                className="mb-2 inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
              >
                {category.icon && <span>{category.icon}</span>}
                {category.name}
              </Link>
              <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
                {procedure.name} Abroad
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-neutral-600">
                {procedure.description ||
                  `Compare ${procedure.name.toLowerCase()} prices from accredited clinics worldwide. Save up to 70% on your treatment.`}
              </p>
            </div>

            <div className="flex gap-4">
              <Link href={`/search?procedure=${procedure.slug}`}>
                <Button variant="accent" size="lg">
                  Find Clinics
                </Button>
              </Link>
            </div>
          </div>

          {/* AI Answer Block for GEO */}
          {aiAnswer && (
            <div className="mt-8">
              <AIAnswerBlock
                question={aiAnswer.question}
                answer={aiAnswer.answer}
                entityName={procedure.name}
                entityType="MedicalProcedure"
                className="procedure-summary"
              />
            </div>
          )}

          {/* Key Stats */}
          <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4 sm:p-6 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-xl sm:text-3xl font-bold text-primary-600">
                {stats.avgPrice ? formatCurrency(stats.avgPrice) : 'Varies'}
              </p>
              <p className="text-xs sm:text-sm text-neutral-500">Average Cost</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-3xl font-bold text-neutral-900">{stats.clinicCount}+</p>
              <p className="text-xs sm:text-sm text-neutral-500">Clinics Available</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-3xl font-bold text-neutral-900">{stats.countryCount}+</p>
              <p className="text-xs sm:text-sm text-neutral-500">Countries</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-3xl font-bold text-green-600">50-70%</p>
              <p className="text-xs sm:text-sm text-neutral-500">Potential Savings</p>
            </div>
          </div>
        </div>
      </m.section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Cost Comparison Widget - Primary */}
        <m.section {...fadeInUp} className="mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-neutral-900">
              {procedure.name} Cost Comparison
            </h2>
            <p className="mt-2 text-neutral-600">
              Compare prices across popular medical tourism destinations
            </p>
          </div>

          {costComparison.length > 0 ? (
            <CostComparisonWidget
              data={costComparison}
              procedureSlug={procedure.slug}
              title={`${procedure.name} Prices by Country`}
            />
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center">
              <p className="text-neutral-500">
                Cost comparison data is being compiled. Check back soon or browse clinics directly.
              </p>
              <Link href={`/search?procedure=${procedure.slug}`} className="mt-4 inline-block">
                <Button variant="primary">Browse Clinics</Button>
              </Link>
            </div>
          )}
        </m.section>

        {/* About This Procedure */}
        <m.section {...fadeInUp} className="mb-20">
          <h2 className="mb-6 text-3xl font-bold text-neutral-900">
            About {procedure.name}
          </h2>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="prose prose-neutral max-w-none">
                {procedure.description ? (
                  <p className="text-lg leading-relaxed text-neutral-700">
                    {procedure.description}
                  </p>
                ) : (
                  <p className="text-neutral-600">
                    {procedure.name} is a popular treatment sought by medical tourists worldwide.
                    Patients choose to have this procedure abroad to access high-quality care at
                    significantly lower costs than in their home country.
                  </p>
                )}

                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900">What to Expect</h3>
                    <p className="mt-2 text-neutral-600">
                      When getting {procedure.name.toLowerCase()} abroad, you&apos;ll typically start with
                      a virtual consultation to discuss your needs and treatment plan. Once you arrive,
                      you&apos;ll have an in-person assessment before the procedure. Recovery time varies,
                      but most patients can fly home within 1-2 weeks.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900">Recovery Timeline</h3>
                    <p className="mt-2 text-neutral-600">
                      Recovery depends on the complexity of your treatment. Your clinic will provide
                      detailed aftercare instructions and typically schedule follow-up appointments
                      before you return home. Many clinics offer video consultations for post-treatment
                      check-ups.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm h-fit">
              <h3 className="text-lg font-semibold text-neutral-900">Quick Facts</h3>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-sm text-neutral-500">Typical Stay</dt>
                  <dd className="mt-1 font-medium text-neutral-900">5-14 days</dd>
                </div>
                <div>
                  <dt className="text-sm text-neutral-500">Recovery Time</dt>
                  <dd className="mt-1 font-medium text-neutral-900">Varies by case</dd>
                </div>
                <div>
                  <dt className="text-sm text-neutral-500">Category</dt>
                  <dd className="mt-1">
                    <Link
                      href={`/${category.slug}`}
                      className="font-medium text-primary-600 hover:text-primary-700"
                    >
                      {category.name}
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-neutral-500">Average Savings</dt>
                  <dd className="mt-1 font-medium text-green-600">50-70% vs UK/US</dd>
                </div>
              </dl>
              <div className="mt-6 border-t border-neutral-100 pt-6">
                <Link href={`/search?procedure=${procedure.slug}`}>
                  <Button variant="primary" className="w-full">
                    Find Clinics
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </m.section>

        {/* Top Clinics */}
        <m.section {...fadeInUp} className="mb-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900">
                Top Clinics for {procedure.name}
              </h2>
              <p className="mt-2 text-neutral-600">
                Highest-rated clinics offering {procedure.name.toLowerCase()}
              </p>
            </div>
            <Link href={`/search?procedure=${procedure.slug}`}>
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
              <p className="text-neutral-500">
                Clinics offering {procedure.name.toLowerCase()} coming soon
              </p>
            </div>
          )}
        </m.section>

        {/* Top Destinations */}
        <m.section {...fadeInUp} className="mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-neutral-900">
              Top Destinations for {procedure.name}
            </h2>
            <p className="mt-2 text-neutral-600">
              Popular countries for {procedure.name.toLowerCase()} treatment
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
                    href={`/destinations/${destination.slug}/${procedure.slug}`}
                    className="group flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
                  >
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-neutral-100">
                      {destination.hero_image_url ? (
                        <img
                          src={destination.hero_image_url}
                          alt={destination.country_name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-2xl">
                          🌍
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600">
                        {procedure.name} in {destination.country_name}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        {destination.clinic_count} clinics available
                      </p>
                    </div>
                    <span className="text-primary-500 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
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

        {/* Related Procedures */}
        {relatedProcedures.length > 0 && (
          <m.section {...fadeInUp} className="mb-20">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold text-neutral-900">
                  Related Procedures
                </h2>
                <p className="mt-2 text-neutral-600">
                  Other {category.name.toLowerCase()} procedures you might be interested in
                </p>
              </div>
              <Link href={`/${category.slug}`}>
                <Button variant="outline">View All {category.name}</Button>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProcedures.map((relProc) => (
                <Link
                  key={relProc.id}
                  href={`/${category.slug}/${relProc.slug}`}
                  className="group rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
                >
                  <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600">
                    {relProc.name}
                  </h3>
                  {relProc.description && (
                    <p className="mt-2 text-sm text-neutral-500 line-clamp-2">
                      {relProc.description}
                    </p>
                  )}
                  <span className="mt-3 inline-flex items-center text-sm text-primary-600">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          </m.section>
        )}

        {/* FAQ Section */}
        <m.section {...fadeInUp} className="mb-20">
          <FAQAccordion
            items={faqs}
            title={`${procedure.name} Abroad FAQs`}
          />
        </m.section>

        {/* CTA Section */}
        <m.section {...fadeInUp}>
          <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-8 text-center text-white sm:p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready for Your {procedure.name}?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
              Compare clinics, read reviews, and get personalized quotes from top
              specialists worldwide.
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
