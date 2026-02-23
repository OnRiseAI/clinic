import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { getAllCountries } from '@/lib/data/content'
import { createClient } from '@/lib/supabase/server'
import {
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from '@/lib/seo/structured-data'
import { StructuredData } from '@/components/seo/structured-data-component'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'
import { InteractiveMap } from './interactive-map'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://meetyourclinic.com'

// =============================================================================
// METADATA
// =============================================================================

export const metadata: Metadata = {
  title: 'Medical Tourism Destinations — Compare Countries, Prices & Clinics | Meet Your Clinic',
  description:
    'Explore top medical tourism destinations worldwide. Compare procedure prices, clinic quality, and savings across Turkey, Hungary, Spain, Poland and more. Find the best country for your treatment abroad.',
  alternates: {
    canonical: `/destinations`,
    languages: {
      'en-GB': `/destinations`,
    },
  },
  openGraph: {
    title: 'Medical Tourism Destinations — Compare Countries & Prices',
    description:
      'Compare medical tourism destinations worldwide. Find the best country for your procedure with transparent pricing and verified clinics.',
    url: `${SITE_URL}/destinations`,
    siteName: 'Meet Your Clinic',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medical Tourism Destinations — Compare Countries & Prices',
    description:
      'Compare medical tourism destinations worldwide. Find the best country for your procedure with transparent pricing.',
  },
}

// =============================================================================
// DATA FETCHING
// =============================================================================

interface CountryStats {
  procedure_count: number
  min_price_gbp: number | null
}

async function getCountryStats(): Promise<Record<string, CountryStats>> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('destinations')
    .select('country_id, procedure_id, price_min_gbp')
    .eq('is_valid', true)

  if (error || !data) {
    console.error('Error fetching destination stats:', error)
    return {}
  }

  const statsMap: Record<string, { procedures: Set<string>; prices: number[] }> = {}

  for (const row of data) {
    if (!statsMap[row.country_id]) {
      statsMap[row.country_id] = { procedures: new Set(), prices: [] }
    }
    statsMap[row.country_id].procedures.add(row.procedure_id)
    if (row.price_min_gbp) {
      statsMap[row.country_id].prices.push(row.price_min_gbp)
    }
  }

  const result: Record<string, CountryStats> = {}
  for (const [countryId, stats] of Object.entries(statsMap)) {
    result[countryId] = {
      procedure_count: stats.procedures.size,
      min_price_gbp: stats.prices.length > 0 ? Math.min(...stats.prices) : null,
    }
  }

  return result
}

// =============================================================================
// STRUCTURED DATA
// =============================================================================

function generateItemListSchema(
  countries: Array<{ name: string; slug: string; description: string | null }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Medical Tourism Destinations',
    description: 'Top countries for medical tourism with verified clinics and transparent pricing.',
    numberOfItems: countries.length,
    itemListElement: countries.map((country, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/destinations/${country.slug}`,
      name: country.name,
      description: country.description || `Medical tourism in ${country.name}`,
    })),
  }
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

interface DestinationsPageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export default async function DestinationsPage({ params }: DestinationsPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const [countries, countryStats] = await Promise.all([
    getAllCountries(),
    getCountryStats(),
  ])

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Destinations' },
  ])

  const itemListSchema = generateItemListSchema(countries)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much can I save on medical tourism?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Patients typically save between 40% and 70% on major procedures when traveling abroad for medical care. Countries like Turkey and Hungary offer world-class treatments at a fraction of UK or US private costs, while maintaining strict JCI and ISO accreditations.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which country is best for medical tourism?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The best country depends on the specific treatment. Turkey is renowned for Hair Transplants and Cosmetic Surgery, Hungary and Poland lead in advanced Dental Implants, and Spain is highly rated for Fertility (IVF) treatments.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are medical tourism clinics safe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, when chosen carefully. Top medical tourism clinics hold international accreditations such as JCI (Joint Commission International) or ISO. Our VisQuanta Gold Standard™ ensures that listed clinics meet rigorous quality, safety, and multilingual support criteria.',
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <StructuredData
        data={[
          generateOrganizationSchema(),
          generateWebsiteSchema(),
          breadcrumbSchema,
          itemListSchema,
          faqSchema,
        ]}
      />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Destinations' },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0A1A2F] text-white pt-16 pb-20 sm:pt-24 sm:pb-32">
        {/* Abstract Premium Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-[#0A1A2F] to-primary-950/80" />
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary-600/20 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute inset-0 bg-transparent opacity-5 mix-blend-overlay" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            Medical Tourism Destinations
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl lg:text-2xl leading-relaxed font-light">
            Compare world-class healthcare destinations with transparent pricing, verified clinics,
            and savings of up to 70% compared to UK private costs. Choose the right country for
            your treatment abroad.
          </p>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-navy tracking-tight">Global Healthcare Network</h2>
            <p className="mt-2 text-navy/60 font-medium">Hover over countries to explore available treatments and pricing</p>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-teal-500"></span>
              <span className="text-navy/70">Active Destinations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500"></span>
              <span className="text-navy/70">Coming Soon</span>
            </div>
          </div>
        </div>
        <InteractiveMap countries={countries} stats={countryStats} locale={locale} />
      </section>

      {/* Bento Box Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
           <h2 className="text-3xl font-bold text-navy">All Destinations</h2>
           <p className="mt-2 text-navy/60">Compare prices, clinics, and procedures across our global network.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 auto-rows-[280px] gap-6">
          {countries.map((country, index) => {
            const stats = countryStats[country.id]
            const procedureCount = stats?.procedure_count ?? 0
            const minPrice = stats?.min_price_gbp ?? null
            const isComingSoon = country.status !== 'published'

            // Determine size based on popularity/status
            // e.g., Turkey and Spain are popular, they get larger bento blocks
            let spanClass = "md:col-span-3 lg:col-span-4" // default
            if (!isComingSoon && (country.name === 'Turkey' || country.name === 'Spain' || index === 0 || index === 1)) {
               spanClass = "md:col-span-6 lg:col-span-6" // feature size
            } else if (isComingSoon) {
               spanClass = "md:col-span-3 lg:col-span-3" // smaller size
            }

            const snippet = country.description
              ? country.description.length > 90
                ? country.description.slice(0, 87) + '...'
                : country.description
              : `Explore medical treatments in ${country.name}.`

            return (
              <Link
                key={country.id}
                href={`/${locale}/destinations/${country.slug}`}
                className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-navy/5 ${spanClass} ${isComingSoon ? 'border border-dashed border-navy/20 bg-neutral-50/50' : 'border border-navy/5 shadow-lg shadow-navy/[0.02]'}`}
              >
                {!isComingSoon && (
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 h-40 w-40 rounded-full bg-gradient-to-br from-teal-50 to-blue-50/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-3xl" />
                )}

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-navy/5 text-3xl shadow-sm">
                        {country.flag_emoji || '🌍'}
                      </span>
                      {isComingSoon && (
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-navy group-hover:text-teal-700 transition-colors">
                      {country.name}
                    </h3>
                    <p className="mt-2 text-sm text-navy/60 line-clamp-2">
                      {snippet}
                    </p>
                  </div>

                  {!isComingSoon ? (
                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-navy/5">
                      {minPrice !== null && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">Starting From</p>
                          <p className="text-lg font-bold text-teal-600">£{minPrice.toLocaleString('en-GB')}</p>
                        </div>
                      )}
                      {procedureCount > 0 && (
                        <div className="text-right">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">Treatments</p>
                          <p className="text-base font-semibold text-navy">{procedureCount}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                     <div className="mt-6 pt-4 border-t border-navy/5 flex justify-end">
                       <span className="text-sm font-medium text-navy/50 group-hover:text-navy/80 transition-colors flex items-center gap-1">
                          Join Waitlist <span className="text-lg leading-none">→</span>
                       </span>
                     </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* GEO FAQ & Quick Facts Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-navy/5">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <span className="text-sm font-bold tracking-widest text-teal-600 uppercase mb-3 block">Expert Advice</span>
            <h2 className="text-3xl font-bold text-navy mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 itemProp="name" className="text-xl font-bold text-navy mb-3">How much can I save on medical tourism?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-navy/70 leading-relaxed">
                    Patients typically save between <strong className="text-navy">40% and 70%</strong> on major procedures when traveling abroad for medical care. Countries like Turkey and Hungary offer world-class treatments at a fraction of UK or US private costs, while maintaining strict JCI and ISO accreditations.
                  </p>
                </div>
              </div>

              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 itemProp="name" className="text-xl font-bold text-navy mb-3">Which country is best for medical tourism?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-navy/70 leading-relaxed">
                    The best country depends on the specific treatment. <strong className="text-navy">Turkey</strong> is renowned for Hair Transplants and Cosmetic Surgery, <strong className="text-navy">Hungary</strong> and <strong className="text-navy">Poland</strong> lead in advanced Dental Implants, and <strong className="text-navy">Spain</strong> is highly rated for Fertility (IVF) treatments.
                  </p>
                </div>
              </div>

              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 itemProp="name" className="text-xl font-bold text-navy mb-3">Are medical tourism clinics safe?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-navy/70 leading-relaxed">
                    Yes, when chosen carefully. Top medical tourism clinics hold international accreditations such as <strong className="text-navy">JCI (Joint Commission International)</strong> or <strong className="text-navy">ISO</strong>. Our VisQuanta Gold Standard™ ensures that listed clinics meet rigorous quality, safety, and multilingual support criteria.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-navy rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px]" />
             <div className="relative z-10">
               <h3 className="text-2xl font-bold mb-6">Why Choose MeetYourClinic?</h3>
               <ul className="space-y-6">
                 <li className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                     <span className="text-teal-400 font-bold">1</span>
                   </div>
                   <div>
                     <h4 className="font-semibold text-lg mb-1">Vetted Quality</h4>
                     <p className="text-white/60 text-sm leading-relaxed">Every clinic must pass our strict 50-point inspection covering medical standards, hygiene, and patient care.</p>
                   </div>
                 </li>
                 <li className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                     <span className="text-teal-400 font-bold">2</span>
                   </div>
                   <div>
                     <h4 className="font-semibold text-lg mb-1">Transparent Pricing</h4>
                     <p className="text-white/60 text-sm leading-relaxed">No hidden fees. Compare accurate starting prices for thousands of procedures across top destinations.</p>
                   </div>
                 </li>
                 <li className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                     <span className="text-teal-400 font-bold">3</span>
                   </div>
                   <div>
                     <h4 className="font-semibold text-lg mb-1">Real Patient Reviews</h4>
                     <p className="text-white/60 text-sm leading-relaxed">Make informed decisions based on verified Google reviews and authentic patient testimonials.</p>
                   </div>
                 </li>
               </ul>
             </div>
          </div>
        </div>
      </section>

      {/* GEO FAQ & Quick Facts Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-navy/5">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <span className="text-sm font-bold tracking-widest text-teal-600 uppercase mb-3 block">Expert Advice</span>
            <h2 className="text-3xl font-bold text-navy mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 itemProp="name" className="text-xl font-bold text-navy mb-3">How much can I save on medical tourism?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-navy/70 leading-relaxed">
                    Patients typically save between <strong className="text-navy">40% and 70%</strong> on major procedures when traveling abroad for medical care. Countries like Turkey and Hungary offer world-class treatments at a fraction of UK or US private costs, while maintaining strict JCI and ISO accreditations.
                  </p>
                </div>
              </div>

              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 itemProp="name" className="text-xl font-bold text-navy mb-3">Which country is best for medical tourism?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-navy/70 leading-relaxed">
                    The best country depends on the specific treatment. <strong className="text-navy">Turkey</strong> is renowned for Hair Transplants and Cosmetic Surgery, <strong className="text-navy">Hungary</strong> and <strong className="text-navy">Poland</strong> lead in advanced Dental Implants, and <strong className="text-navy">Spain</strong> is highly rated for Fertility (IVF) treatments.
                  </p>
                </div>
              </div>

              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 itemProp="name" className="text-xl font-bold text-navy mb-3">Are medical tourism clinics safe?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-navy/70 leading-relaxed">
                    Yes, when chosen carefully. Top medical tourism clinics hold international accreditations such as <strong className="text-navy">JCI (Joint Commission International)</strong> or <strong className="text-navy">ISO</strong>. Our VisQuanta Gold Standard™ ensures that listed clinics meet rigorous quality, safety, and multilingual support criteria.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-navy rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px]" />
             <div className="relative z-10">
               <h3 className="text-2xl font-bold mb-6">Why Choose MeetYourClinic?</h3>
               <ul className="space-y-6">
                 <li className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                     <span className="text-teal-400 font-bold">1</span>
                   </div>
                   <div>
                     <h4 className="font-semibold text-lg mb-1">Vetted Quality</h4>
                     <p className="text-white/60 text-sm leading-relaxed">Every clinic must pass our strict 50-point inspection covering medical standards, hygiene, and patient care.</p>
                   </div>
                 </li>
                 <li className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                     <span className="text-teal-400 font-bold">2</span>
                   </div>
                   <div>
                     <h4 className="font-semibold text-lg mb-1">Transparent Pricing</h4>
                     <p className="text-white/60 text-sm leading-relaxed">No hidden fees. Compare accurate starting prices for thousands of procedures across top destinations.</p>
                   </div>
                 </li>
                 <li className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                     <span className="text-teal-400 font-bold">3</span>
                   </div>
                   <div>
                     <h4 className="font-semibold text-lg mb-1">Real Patient Reviews</h4>
                     <p className="text-white/60 text-sm leading-relaxed">Make informed decisions based on verified Google reviews and authentic patient testimonials.</p>
                   </div>
                 </li>
               </ul>
             </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#0A1A2F] p-8 text-white sm:p-12 lg:p-20 shadow-2xl text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-blue-600/20" />
          <div className="absolute -left-1/4 -top-1/4 h-full w-full rounded-full bg-primary-500/10 blur-[120px]" />
          <div className="absolute -bottom-1/4 -right-1/4 h-full w-full rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute inset-0 bg-transparent opacity-5 mix-blend-overlay" />
          
          <div className="relative z-10 mx-auto max-w-3xl">
            <span className="text-sm font-bold tracking-widest text-primary-200/80 uppercase mb-4 block">Take the next step</span>
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl tracking-tight">
              Not sure which destination is right for you?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl font-light leading-relaxed">
              Tell us the procedure you need and we will help you compare prices, clinics,
              and destinations to find the best fit.
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                href={`/${locale}/search`}
                className="inline-flex items-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-primary-900 shadow-xl shadow-white/10 hover:bg-neutral-100 hover:scale-105 transition-all duration-300"
              >
                Find Your Clinic
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
