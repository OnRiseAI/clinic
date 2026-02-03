import { createClient } from '@/lib/supabase/server'

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image_url: string | null
  author_name: string
  author_image: string | null
  published_at: string
  updated_at: string
  status: 'draft' | 'published' | 'archived'
  category: string | null
  category_slug: string | null
  reading_time: number | null
  meta_title: string | null
  meta_description: string | null
}

export interface BlogCategory {
  slug: string
  name: string
  description: string | null
  post_count: number
}

export async function getBlogPosts(options?: {
  limit?: number
  offset?: number
  categorySlug?: string
}): Promise<{ posts: BlogPost[]; total: number }> {
  const supabase = await createClient()
  const { limit = 12, offset = 0, categorySlug } = options || {}

  let query = supabase
    .from('blog_posts')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (categorySlug) {
    query = query.eq('category_slug', categorySlug)
  }

  const { data, error, count } = await query.range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching blog posts:', error)
    return { posts: [], total: 0 }
  }

  return {
    posts: data as BlogPost[],
    total: count || 0,
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return data as BlogPost
}

export async function getRelatedPosts(
  currentSlug: string,
  category: string | null,
  limit = 3
): Promise<BlogPost[]> {
  const supabase = await createClient()

  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .neq('slug', currentSlug)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching related posts:', error)
    return []
  }

  return data as BlogPost[]
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blog_categories')
    .select('slug, name, description')
    .order('name')

  if (error) {
    console.error('Error fetching blog categories:', error)
    return []
  }

  // Get post counts for each category
  const categories: BlogCategory[] = []
  for (const cat of data || []) {
    const { count } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published')
      .eq('category_slug', cat.slug)

    categories.push({
      ...cat,
      post_count: count || 0,
    })
  }

  return categories
}

export async function getFeaturedPosts(limit = 3): Promise<BlogPost[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }

  return data as BlogPost[]
}

export async function getRecentPosts(limit = 5): Promise<BlogPost[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent posts:', error)
    return []
  }

  return data as BlogPost[]
}

// Calculate reading time from content
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}
