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
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">
          Medical Tourism Destinations
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-neutral-600">
          Compare world-class healthcare destinations with transparent pricing, verified clinics,
          and savings of up to 70% compared to UK private costs. Choose the right country for
          your treatment abroad.
        </p>
      </section>

      {/* Country Cards Grid */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
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
                className="group rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:border-primary-300 hover:shadow-md"
              >
                {/* Flag & Name */}
                <div className="flex items-center gap-3">
                  <span className="text-4xl" role="img" aria-label={`${country.name} flag`}>
                    {country.flag_emoji || '🌍'}
                  </span>
                  <h2 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                    {country.name}
                  </h2>
                </div>

                {/* Description Snippet */}
                <p className="mt-3 text-sm text-neutral-600 line-clamp-3">
                  {snippet}
                </p>

                {/* Stats Row */}
                <div className="mt-4 flex items-center gap-4 border-t border-neutral-100 pt-4">
                  {procedureCount > 0 && (
                    <div className="text-sm">
                      <span className="font-semibold text-neutral-900">{procedureCount}</span>
                      <span className="ml-1 text-neutral-500">
                        {procedureCount === 1 ? 'procedure' : 'procedures'}
                      </span>
                    </div>
                  )}
                  {minPrice !== null && (
                    <div className="text-sm">
                      <span className="text-neutral-500">From </span>
                      <span className="font-semibold text-primary-600">
                        £{minPrice.toLocaleString('en-GB')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Specialties Tags */}
                {country.specialties && country.specialties.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {country.specialties.slice(0, 3).map((specialty) => (
                      <span
                        key={specialty}
                        className="inline-block rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-700"
                      >
                        {specialty}
                      </span>
                    ))}
                    {country.specialties.length > 3 && (
                      <span className="inline-block rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-500">
                        +{country.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center text-sm font-medium text-primary-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Explore {country.name}
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white border border-neutral-200 px-8 py-12 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Not sure which destination is right for you?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-600">
            Tell us the procedure you need and we will help you compare prices, clinics,
            and destinations to find the best fit.
          </p>
          <div className="mt-8">
            <Link
              href={`/${locale}/search`}
              className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-primary-700 transition-colors"
            >
              Find Your Clinic
              <svg
                className="ml-2 h-4 w-4"
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
      </section>
    </div>
  )
}
