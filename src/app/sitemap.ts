import { MetadataRoute } from 'next'
import { createStaticClient } from '@/lib/supabase/static'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://meetyourclinic.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createStaticClient()
  const now = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/procedures`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/destinations`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/clinics`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Fetch all procedures
  const { data: procedures } = await supabase
    .from('procedures')
    .select('slug, updated_at')
    .eq('is_active', true)

  const procedurePages: MetadataRoute.Sitemap = (procedures || []).map((proc) => ({
    url: `${SITE_URL}/procedures/${proc.slug}`,
    lastModified: proc.updated_at ? new Date(proc.updated_at) : now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Fetch all countries (destinations)
  const { data: countries } = await supabase
    .from('countries')
    .select('slug, updated_at')
    .eq('status', 'published')

  const destinationPages: MetadataRoute.Sitemap = (countries || []).map((country) => ({
    url: `${SITE_URL}/destinations/${country.slug}`,
    lastModified: country.updated_at ? new Date(country.updated_at) : now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Fetch all clinics
  const { data: clinics } = await supabase
    .from('clinics')
    .select('slug, updated_at')
    .eq('is_active', true)
    .eq('is_verified', true)

  const clinicPages: MetadataRoute.Sitemap = (clinics || []).map((clinic) => ({
    url: `${SITE_URL}/clinics/${clinic.slug}`,
    lastModified: clinic.updated_at ? new Date(clinic.updated_at) : now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Fetch destination + procedure combinations
  const { data: destProcs } = await supabase
    .from('destinations')
    .select(`
      country:countries!inner(slug),
      procedure:procedures!inner(slug)
    `)
    .eq('is_valid', true)

  const destProcSet = new Set<string>()
  const destProcPages: MetadataRoute.Sitemap = []

  if (destProcs) {
    for (const dp of destProcs) {
      const countrySlug = (dp.country as any)?.slug
      const procSlug = (dp.procedure as any)?.slug
      if (countrySlug && procSlug) {
        const key = `${countrySlug}/${procSlug}`
        if (!destProcSet.has(key)) {
          destProcSet.add(key)
          destProcPages.push({
            url: `${SITE_URL}/destinations/${countrySlug}/${procSlug}`,
            lastModified: now,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          })
        }
      }
    }
  }

  // Fetch blog posts
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('status', 'published')

  const blogPages: MetadataRoute.Sitemap = (posts || []).map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Fetch procedure categories
  const { data: categories } = await supabase
    .from('categories')
    .select('slug')

  const categoryPages: MetadataRoute.Sitemap = (categories || []).map((cat) => ({
    url: `${SITE_URL}/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Fetch category + procedure URLs (also used for cost-guide and nhs-wait-times)
  const { data: categoryProcs } = await supabase
    .from('procedures')
    .select('slug, nhs_wait_weeks, category:categories(slug)')

  const categoryProcPages: MetadataRoute.Sitemap = (categoryProcs || [])
    .filter((p: any) => p.category?.slug)
    .map((p: any) => ({
      url: `${SITE_URL}/${p.category.slug}/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  // Cost guide pages (/{category}/{procedure}/cost-guide)
  const costGuidePages: MetadataRoute.Sitemap = (categoryProcs || [])
    .filter((p: any) => p.category?.slug)
    .map((p: any) => ({
      url: `${SITE_URL}/${p.category.slug}/${p.slug}/cost-guide`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  // NHS wait time pages (only for procedures with nhs_wait_weeks data)
  const nhsWaitPages: MetadataRoute.Sitemap = (categoryProcs || [])
    .filter((p: any) => p.category?.slug && p.nhs_wait_weeks && p.nhs_wait_weeks > 0)
    .map((p: any) => ({
      url: `${SITE_URL}/${p.category.slug}/${p.slug}/nhs-wait-times`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  // Country guide pages (/destinations/{country}/guide)
  const countryGuidePages: MetadataRoute.Sitemap = (countries || []).map((country) => ({
    url: `${SITE_URL}/destinations/${country.slug}/guide`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Procedure comparison pages (/compare/{procedure-a}-vs-{procedure-b})
  // Generate pairs of procedures within the same category
  const comparisonPages: MetadataRoute.Sitemap = []
  const procsByCategory: Record<string, string[]> = {}
  ;(categoryProcs || []).forEach((p: any) => {
    const catSlug = p.category?.slug
    if (catSlug) {
      if (!procsByCategory[catSlug]) procsByCategory[catSlug] = []
      procsByCategory[catSlug].push(p.slug)
    }
  })
  for (const slugs of Object.values(procsByCategory)) {
    slugs.sort()
    for (let i = 0; i < slugs.length; i++) {
      for (let j = i + 1; j < slugs.length; j++) {
        comparisonPages.push({
          url: `${SITE_URL}/compare/${slugs[i]}-vs-${slugs[j]}`,
          lastModified: now,
          changeFrequency: 'monthly' as const,
          priority: 0.5,
        })
      }
    }
  }

  return [
    ...staticPages,
    ...procedurePages,
    ...destinationPages,
    ...clinicPages,
    ...destProcPages,
    ...blogPages,
    ...categoryPages,
    ...categoryProcPages,
    ...costGuidePages,
    ...nhsWaitPages,
    ...countryGuidePages,
    ...comparisonPages,
  ]
}
