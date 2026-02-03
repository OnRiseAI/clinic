import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { Link } from '@/i18n/navigation'
import { getBlogPosts, getFeaturedPosts, getBlogCategories } from '@/lib/data/blog'
import { BlogCard, BlogCardSkeleton } from '@/components/blog/blog-card'
import { blogIndexMetadata } from '@/lib/seo/metadata'
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo/structured-data'
import { StructuredData } from '@/components/seo/structured-data-component'

interface BlogPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string; page?: string }>
}

export async function generateMetadata() {
  return blogIndexMetadata
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params
  const { category, page } = await searchParams
  setRequestLocale(locale)

  const currentPage = parseInt(page || '1', 10)
  const postsPerPage = 12

  const [{ posts, total }, featuredPosts, categories] = await Promise.all([
    getBlogPosts({
      limit: postsPerPage,
      offset: (currentPage - 1) * postsPerPage,
      categorySlug: category,
    }),
    getFeaturedPosts(1),
    getBlogCategories(),
  ])

  const featuredPost = featuredPosts[0]
  const totalPages = Math.ceil(total / postsPerPage)

  // Generate structured data
  const schemas = [
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    generateBreadcrumbSchema([{ name: 'Blog', url: '/blog' }]),
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <StructuredData data={schemas} />
      <Breadcrumb />

      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">Medical Tourism Blog</h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-600">
          Expert advice, patient stories, and guides to help you plan your medical journey.
        </p>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-16">
          <Link href={`/blog/${featuredPost.slug}`}>
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-video bg-neutral-100 lg:aspect-auto lg:min-h-[300px]">
                  {featuredPost.image_url && (
                    <Image
                      src={featuredPost.image_url}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-8 lg:p-12">
                  <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
                    Featured
                  </span>
                  <h2 className="mt-4 text-2xl font-bold text-neutral-900">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 text-neutral-600 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <p className="mt-6 text-sm text-neutral-500">
                    {new Date(featuredPost.published_at).toLocaleDateString('en-GB', {
                      month: 'long',
                      year: 'numeric',
                    })}{' '}
                    {featuredPost.reading_time && `• ${featuredPost.reading_time} min read`}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Categories */}
      <section className="mb-12">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/blog"
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              !category
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-500 hover:text-primary-600'
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog?category=${cat.slug}`}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                category === cat.slug
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-500 hover:text-primary-600'
              }`}
            >
              {cat.name} ({cat.post_count})
            </Link>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold text-neutral-900">
          {category ? `${categories.find((c) => c.slug === category)?.name || 'Category'} Articles` : 'Latest Articles'}
        </h2>
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                imageUrl={post.image_url}
                authorName={post.author_name}
                publishedAt={post.published_at}
                readingTime={post.reading_time || undefined}
                category={post.category || undefined}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-12 py-24 text-center">
            <p className="text-lg font-medium text-neutral-500">No articles found</p>
            <p className="mt-2 text-sm text-neutral-400">
              Check back soon for new content
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {currentPage > 1 && (
              <Link
                href={`/blog?${category ? `category=${category}&` : ''}page=${currentPage - 1}`}
                className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                Previous
              </Link>
            )}
            <span className="px-4 py-2 text-sm text-neutral-600">
              Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
              <Link
                href={`/blog?${category ? `category=${category}&` : ''}page=${currentPage + 1}`}
                className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 px-8 py-12 text-white sm:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold">Stay Informed</h2>
          <p className="mt-3 text-primary-100">
            Get the latest medical tourism news, tips, and exclusive offers delivered to your inbox.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-lg px-4 py-3 text-neutral-900 placeholder:text-neutral-500 sm:w-80"
            />
            <button className="rounded-lg bg-white px-6 py-3 font-medium text-primary-600 transition-colors hover:bg-primary-50">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
