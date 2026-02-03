import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { Link } from '@/i18n/navigation'
import { getBlogPost, getRelatedPosts } from '@/lib/data/blog'
import { BlogCard } from '@/components/blog/blog-card'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { generateBlogPostMetadata } from '@/lib/seo/metadata'
import { generateBlogPostSchema, generateBreadcrumbSchema } from '@/lib/seo/structured-data'
import { StructuredData } from '@/components/seo/structured-data-component'

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    }
  }

  return generateBlogPostMetadata({
    title: post.meta_title || post.title,
    slug: post.slug,
    excerpt: post.meta_description || post.excerpt,
    imageUrl: post.image_url,
    authorName: post.author_name,
    publishedAt: post.published_at,
    category: post.category || undefined,
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(slug, post.category, 3)

  const formattedDate = new Date(post.published_at).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // Generate structured data
  const blogSchema = generateBlogPostSchema({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    imageUrl: post.image_url,
    authorName: post.author_name,
    authorImage: post.author_image || undefined,
    publishedAt: post.published_at,
    updatedAt: post.updated_at,
    category: post.category || undefined,
    readingTime: post.reading_time || undefined,
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Blog', url: '/blog' },
    ...(post.category && post.category_slug
      ? [{ name: post.category, url: `/blog?category=${post.category_slug}` }]
      : []),
    { name: post.title },
  ])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <StructuredData data={[blogSchema, breadcrumbSchema]} />
      <Breadcrumb />

      <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
        <article className="max-w-3xl">
          {/* Header */}
          <header className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              {post.category && (
                <Link
                  href={`/blog?category=${post.category_slug}`}
                  className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700 hover:bg-primary-200 transition-colors"
                >
                  {post.category}
                </Link>
              )}
              <span className="text-sm text-neutral-500">
                {formattedDate} {post.reading_time && `• ${post.reading_time} min read`}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900">{post.title}</h1>
            <p className="mt-4 text-lg sm:text-xl text-neutral-600">{post.excerpt}</p>
          </header>

          {/* Featured Image */}
          {post.image_url && (
            <div className="relative mb-12 aspect-video overflow-hidden rounded-2xl bg-neutral-100">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Author */}
          <div className="mb-12 flex items-center gap-4 border-b border-neutral-200 pb-8">
            <div className="relative h-12 w-12 rounded-full bg-neutral-200 overflow-hidden">
              {post.author_image && (
                <Image
                  src={post.author_image}
                  alt={post.author_name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <p className="font-medium text-neutral-900">{post.author_name}</p>
              <p className="text-sm text-neutral-500">Medical Tourism Expert</p>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:scroll-mt-24"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share */}
          <div className="mt-12 border-t border-neutral-200 pt-8">
            <p className="mb-3 text-sm font-medium text-neutral-700">Share this article</p>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://meditravel.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-neutral-200 px-4 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-50"
              >
                Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://meditravel.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-neutral-200 px-4 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-50"
              >
                Facebook
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://meditravel.com/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-neutral-200 px-4 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-50"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents content={post.content} />
          </div>
        </aside>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-semibold text-neutral-900">Related Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <BlogCard
                key={relatedPost.id}
                title={relatedPost.title}
                slug={relatedPost.slug}
                excerpt={relatedPost.excerpt}
                imageUrl={relatedPost.image_url}
                authorName={relatedPost.author_name}
                publishedAt={relatedPost.published_at}
                readingTime={relatedPost.reading_time || undefined}
                category={relatedPost.category || undefined}
              />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mt-16 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 px-8 py-12 text-center text-white">
        <h2 className="text-2xl font-bold">Ready to Start Your Journey?</h2>
        <p className="mx-auto mt-3 max-w-xl text-primary-100">
          Compare clinics, read reviews, and get personalized quotes from top medical facilities
          worldwide.
        </p>
        <div className="mt-6">
          <Link
            href="/search"
            className="inline-block rounded-lg bg-white px-6 py-3 font-medium text-primary-600 transition-colors hover:bg-primary-50"
          >
            Find Clinics
          </Link>
        </div>
      </section>
    </div>
  )
}
