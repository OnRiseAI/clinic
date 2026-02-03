import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://meditravel.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
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
    .eq('is_active', true)

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
    .from('clinic_procedures')
    .select(`
      procedure:procedures!inner(slug, is_active),
      clinic:clinics!inner(
        country:countries!inner(slug, is_active)
      )
    `)
    .limit(1000)

  const destProcSet = new Set<string>()
  const destProcPages: MetadataRoute.Sitemap = []

  if (destProcs) {
    for (const dp of destProcs) {
      const proc = dp.procedure as unknown as { slug: string; is_active: boolean } | null
      const clinic = dp.clinic as unknown as { country: { slug: string; is_active: boolean } | null } | null

      if (proc?.is_active && clinic?.country?.is_active) {
        const key = `${clinic.country.slug}/${proc.slug}`
        if (!destProcSet.has(key)) {
          destProcSet.add(key)
          destProcPages.push({
            url: `${SITE_URL}/destinations/${clinic.country.slug}/${proc.slug}`,
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
    .from('procedure_categories')
    .select('slug')

  const categoryPages: MetadataRoute.Sitemap = (categories || []).map((cat) => ({
    url: `${SITE_URL}/procedures/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...procedurePages,
    ...destinationPages,
    ...clinicPages,
    ...destProcPages,
    ...blogPages,
    ...categoryPages,
  ]
}
