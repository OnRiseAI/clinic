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

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://meetyourclinic.com'

// =============================================================================
// METADATA
// =============================================================================

export const metadata: Metadata = {
  title: 'Medical Tourism Destinations — Compare Countries, Prices & Clinics | Meet Your Clinic',
  description:
    'Explore top medical tourism destinations worldwide. Compare procedure prices, clinic quality, and savings across Turkey, Hungary, Spain, Poland and more. Find the best country for your treatment abroad.',
  alternates: {
    canonical: `${SITE_URL}/en/destinations`,
    languages: {
      'en-GB': `${SITE_URL}/en/destinations`,
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

  return (
    <div className="min-h-screen bg-neutral-50">
      <StructuredData
        data={[
          generateOrganizationSchema(),
          generateWebsiteSchema(),
          breadcrumbSchema,
          itemListSchema,
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
        <div className="absolute inset-0 bg-[url('/images/patterns/medical-pattern.svg')] opacity-5 mix-blend-overlay" />
        
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

      {/* Country Cards Grid */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {countries.map((country) => {
            const stats = countryStats[country.id]
            const procedureCount = stats?.procedure_count ?? 0
            const minPrice = stats?.min_price_gbp ?? null

            // Truncate description to ~120 chars for the card
            const snippet = country.description
              ? country.description.length > 120
                ? country.description.slice(0, 117) + '...'
                : country.description
              : `Explore medical treatments in ${country.name}.`

            return (
              <Link
                key={country.id}
                href={`/${locale}/destinations/${country.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/60 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-900/5"
              >
                <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary-50 to-primary-100/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-2xl" />

                {/* Flag & Name */}
                <div className="relative z-10 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-50 border border-neutral-100 text-3xl shadow-sm">
                    {country.flag_emoji || '🌍'}
                  </span>
                  <h2 className="text-xl font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                    {country.name}
                  </h2>
                </div>

                {/* Description Snippet */}
                <div className="relative z-10 mt-4 flex-1">
                  <p className="text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                    {snippet}
                  </p>
                </div>

                {/* Stats Row */}
                <div className="relative z-10 mt-6 space-y-3 rounded-xl bg-neutral-50 p-4 border border-neutral-100">
                  {procedureCount > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-neutral-500">Treatments</span>
                      <span className="font-semibold text-neutral-900">
                        {procedureCount} available
                      </span>
                    </div>
                  )}
                  {minPrice !== null && (
                    <div className="flex justify-between items-center text-sm border-t border-neutral-200/60 pt-3">
                      <span className="font-medium text-neutral-500">Starting from</span>
                      <span className="text-base font-bold text-green-600">
                        £{minPrice.toLocaleString('en-GB')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Specialties Tags */}
                {country.specialties && country.specialties.length > 0 && (
                  <div className="relative z-10 mt-6 flex flex-wrap gap-2">
                    {country.specialties.slice(0, 3).map((specialty) => (
                      <span
                        key={specialty}
                        className="inline-block rounded-lg bg-primary-50/50 border border-primary-100 px-2.5 py-1 text-xs font-medium text-primary-700"
                      >
                        {specialty}
                      </span>
                    ))}
                    {country.specialties.length > 3 && (
                      <span className="inline-block rounded-lg bg-neutral-50 border border-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-600">
                        +{country.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Arrow indicator */}
                <div className="relative z-10 mt-6 inline-flex items-center text-sm font-semibold text-primary-600 transition-colors group-hover:text-primary-800">
                  Explore {country.name}
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#0A1A2F] p-8 text-white sm:p-12 lg:p-20 shadow-2xl text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-blue-600/20" />
          <div className="absolute -left-1/4 -top-1/4 h-full w-full rounded-full bg-primary-500/10 blur-[120px]" />
          <div className="absolute -bottom-1/4 -right-1/4 h-full w-full rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('/images/patterns/medical-pattern.svg')] opacity-5 mix-blend-overlay" />
          
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
