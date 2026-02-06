import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { Link } from '@/i18n/navigation'
import { getBlogPost, getRelatedPosts } from '@/lib/data/blog'
import { BlogCard } from '@/components/blog/blog-card'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { marked } from 'marked'
import { generateBlogPostMetadata } from '@/lib/seo/metadata'
import { generateBlogPostSchema, generateBreadcrumbSchema } from '@/lib/seo/structured-data'
import { StructuredData } from '@/components/seo/structured-data-component'
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Twitter,
  Facebook,
  Linkedin
} from 'lucide-react'

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

// Share buttons component
function ShareButtons({ title, url }: { title: string; url: string }) {
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 text-neutral-600 hover:bg-[#1DA1F2] hover:text-white transition-all duration-300"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 text-neutral-600 hover:bg-[#4267B2] hover:text-white transition-all duration-300"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 text-neutral-600 hover:bg-[#0077B5] hover:text-white transition-all duration-300"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>
    </div>
  )
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(slug, post.category, 3)

  // Format date with fallback for invalid dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    // Check if date is valid (not epoch time or invalid)
    if (isNaN(date.getTime()) || date.getFullYear() < 2000) {
      return null
    }
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const formattedDate = formatDate(post.published_at)

  const postUrl = `https://meetyourclinic.com/blog/${post.slug}`

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

  // Convert markdown to HTML, skipping the first H1 (shown in hero)
  const contentLines = post.content.split('\n')
  const firstH1Index = contentLines.findIndex((line: string) => line.trim().startsWith('# '))
  if (firstH1Index !== -1) contentLines.splice(firstH1Index, 1)

  const rawHtml = marked.parse(contentLines.join('\n')) as string

  // Add IDs to headings for TOC navigation
  const htmlContent = rawHtml.replace(
    /<h([2-6])>(.*?)<\/h\1>/g,
    (_match: string, level: string, text: string) => {
      const plainText = text.replace(/<[^>]+>/g, '')
      const id = plainText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      return `<h${level} id="${id}">${text}</h${level}>`
    }
  )

  return (
    <>
      <StructuredData data={[blogSchema, breadcrumbSchema]} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-neutral-100">
        {/* Decorative Background Elements */}
        {post.image_url ? (
          <div className="absolute inset-0 z-0">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover opacity-20 filter blur-[2px]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/80 to-white" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-100/30 blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-50/40 blur-[100px]" />
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)', backgroundSize: '40px 40px', opacity: 0.2 }} />
          </div>
        )}

        <div className="relative z-10 mx-auto max-w-5xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb - Centered */}
          <div className="mb-8 flex justify-center">
            <Breadcrumb items={[
              { href: '/blog', label: 'Blog' },
              { href: `/blog/${post.slug}`, label: post.title, isLast: true }
            ]} className="mb-0" />
          </div>

          {/* Category Badge */}
          {post.category && (
            <div className="mb-6">
              <Link
                href={`/blog?category=${post.category_slug}`}
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold tracking-wide uppercase hover:bg-primary-100 transition-colors border border-primary-100"
              >
                {post.category}
              </Link>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 leading-tight mb-12 tracking-tight max-w-4xl mx-auto text-balance">
            {post.title}
          </h1>

          {/* Meta Info - Centered Pills */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white shadow-sm border border-neutral-200">
              <div className="relative h-10 w-10 rounded-full overflow-hidden bg-neutral-100">
                {post.author_image ? (
                  <Image src={post.author_image} alt={post.author_name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 font-bold">
                    {post.author_name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-neutral-900 leading-none">{post.author_name}</p>
                <p className="text-[11px] text-neutral-500 uppercase tracking-wider mt-1 font-medium">Author</p>
              </div>
            </div>

            <div className="flex items-center gap-6 px-6 py-3 rounded-full bg-neutral-50 border border-neutral-200 text-sm font-medium text-neutral-600 shadow-sm">
              {formattedDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary-500" />
                  <span>{formattedDate}</span>
                </div>
              )}
              {post.reading_time && (
                <div className="flex items-center gap-2">
                  {formattedDate && <span className="hidden sm:inline text-neutral-300">•</span>}
                  <Clock className="w-4 h-4 text-primary-500" />
                  <span>{post.reading_time} min read</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16">
          {/* Article Content */}
          <article className="mx-auto max-w-3xl lg:mx-0">
            {/* Blog Content */}
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-1">Share this article</p>
                  <p className="text-sm text-neutral-500">Help others discover valuable insights</p>
                </div>
                <ShareButtons title={post.title} url={postUrl} />
              </div>
            </div>

            {/* Author Bio Card */}
            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100/50 border border-primary-100">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden bg-white ring-4 ring-white shadow-lg flex-shrink-0">
                  {post.author_image ? (
                    <Image
                      src={post.author_image}
                      alt={post.author_name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 font-bold text-xl">
                      {post.author_name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-lg text-neutral-900">{post.author_name}</p>
                  <p className="text-primary-600 font-medium text-sm mb-2">Medical Tourism Expert</p>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    Passionate about helping patients access quality healthcare worldwide.
                    With extensive experience in medical tourism, I provide expert guidance
                    on procedures, destinations, and what to expect on your medical journey.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents */}
              <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
                <TableOfContents content={post.content} />
              </div>

              {/* Quick Share */}
              <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Share2 className="w-4 h-4 text-neutral-500" />
                  <h4 className="text-sm font-semibold text-neutral-900">Share Article</h4>
                </div>
                <ShareButtons title={post.title} url={postUrl} />
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">Related Articles</h2>
                <p className="text-neutral-600 mt-1">Continue exploring medical tourism insights</p>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
              >
                View all articles
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
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

        {/* Newsletter CTA */}
        <section className="mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative px-8 py-16 sm:px-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Start Your Medical Journey? 🌍
            </h2>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
              Compare clinics, read reviews, and get personalized quotes from top medical facilities worldwide.
              Save up to 70% on your treatment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Find Clinics
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/10 transition-all duration-300"
              >
                How It Works
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
