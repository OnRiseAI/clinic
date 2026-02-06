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
  Linkedin,
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════════ */
interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>
}

/* ═══════════════════════════════════════════════════════════════════════
   METADATA
   ═══════════════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════════════
   SHARE BUTTONS
   ═══════════════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════════════
   TRUST BADGES STRIP
   ═══════════════════════════════════════════════════════════════════════ */
function TrustBadges({ post }: { post: any }) {
  const badges: { icon: any; label: string }[] = []

  // Count cited sources from markdown [[n]](#sources) pattern
  const sourcesMatch = post.content.match(/\[\[?\d+\]?\]\(#sources\)/g)
  const sourceCount = sourcesMatch
    ? new Set(sourcesMatch.map((m: string) => m.match(/\d+/)?.[0])).size
    : 0
  if (sourceCount > 0) {
    badges.push({ icon: BookOpen, label: `${sourceCount} Sources Cited` })
  }

  // Check for medical review mention
  if (
    post.content.toLowerCase().includes('medically reviewed') ||
    post.content.toLowerCase().includes('medical review')
  ) {
    badges.push({ icon: ShieldCheck, label: 'Medically Reviewed' })
  }

  // Updated date
  const updatedDate = new Date(post.updated_at)
  if (!isNaN(updatedDate.getTime()) && updatedDate.getFullYear() >= 2024) {
    badges.push({
      icon: CheckCircle2,
      label: `Updated ${updatedDate.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`,
    })
  }

  if (badges.length === 0) return null

  return (
    <div className="border-b border-neutral-100 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          {badges.map((badge, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 border border-emerald-100"
            >
              <badge.icon className="w-3.5 h-3.5" />
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   AUTHOR + REVIEWER CARD (E-E-A-T)
   ═══════════════════════════════════════════════════════════════════════ */
function AuthorReviewerCard({ post }: { post: any }) {
  // Try to extract reviewer from content disclaimer text
  const reviewerMatch = post.content.match(
    /medically reviewed[^.]*?(?:by\s+)?(Dr\.?\s+[\w\s\-]+?)(?:,\s*(.+?))?(?:\.|for accuracy)/i
  )
  const reviewerName = reviewerMatch?.[1]?.trim()
  const reviewerCredentials = reviewerMatch?.[2]?.trim()

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 rounded-xl bg-neutral-50 border border-neutral-200 p-5 mb-8">
      {/* Written By */}
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2">
          Written By
        </p>
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-full overflow-hidden bg-primary-100 flex-shrink-0">
            {post.author_image ? (
              <Image
                src={post.author_image}
                alt={post.author_name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-primary-600 font-bold text-sm">
                {post.author_name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">{post.author_name}</p>
            <p className="text-xs text-neutral-500">Medical Tourism Research Team</p>
          </div>
        </div>
      </div>

      {/* Medically Reviewed By (if found in content) */}
      {reviewerName && (
        <div className="flex-1 min-w-0 border-t sm:border-t-0 sm:border-l border-neutral-200 pt-4 sm:pt-0 sm:pl-6">
          <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Medically Reviewed By
          </p>
          <div>
            <p className="text-sm font-semibold text-neutral-900">{reviewerName}</p>
            {reviewerCredentials && (
              <p className="text-xs text-neutral-500">{reviewerCredentials}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   EDITORIAL DISCLAIMER
   ═══════════════════════════════════════════════════════════════════════ */
function EditorialDisclaimer({ content }: { content: string }) {
  // Look for the italic disclaimer block we add to blog posts
  // Pattern: *This article was researched...*
  const disclaimerMatch = content.match(/\*This article was researched[\s\S]*?\*/)
  if (!disclaimerMatch) return null

  // Clean up the markdown formatting
  const text = disclaimerMatch[0].replace(/^\*|\*$/g, '').trim()

  return (
    <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 mb-8">
      <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1.5">
        Editorial Transparency
      </p>
      <p className="text-sm leading-relaxed text-amber-800">{text}</p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   MID-ARTICLE CTA
   ═══════════════════════════════════════════════════════════════════════ */
function MidArticleCta({ category }: { category?: string }) {
  const procedureName = category || 'treatment'

  return (
    <div className="my-12 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative px-8 py-10 sm:px-10 text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
          Ready to Compare Clinics?
        </h3>
        <p className="text-primary-200 text-sm sm:text-base max-w-lg mx-auto mb-6">
          Get free, verified quotes from top-rated {procedureName.toLowerCase()} clinics.
          No pressure, no obligation.
        </p>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-primary-700 shadow-lg hover:shadow-xl hover:bg-primary-50 transition-all duration-300"
        >
          Compare Clinics Now
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   CONTENT PROCESSOR
   Injects mid-article CTA after ~40% of H2 sections
   Strips the italic disclaimer block from rendered content
   (it's shown separately in the EditorialDisclaimer component)
   ═══════════════════════════════════════════════════════════════════════ */
function processContent(rawMarkdown: string): { htmlContent: string; ctaInsertIndex: number } {
  const lines = rawMarkdown.split('\n')

  // Remove first H1 (shown in hero)
  const firstH1Index = lines.findIndex((line: string) => line.trim().startsWith('# '))
  if (firstH1Index !== -1) lines.splice(firstH1Index, 1)

  // Remove the italic disclaimer paragraph (rendered separately)
  const disclaimerStart = lines.findIndex((line: string) =>
    line.trim().startsWith('*This article was researched')
  )
  if (disclaimerStart !== -1) {
    // Find where the italic block ends (next line starting with *)
    let disclaimerEnd = disclaimerStart
    for (let i = disclaimerStart; i < lines.length; i++) {
      if (lines[i].includes('*') && i > disclaimerStart) {
        disclaimerEnd = i
        break
      }
      if (i === disclaimerStart && lines[i].trim().endsWith('*')) {
        disclaimerEnd = i
        break
      }
    }
    lines.splice(disclaimerStart, disclaimerEnd - disclaimerStart + 1)
  }

  // Count H2s to figure out where to inject CTA
  const h2Indices: number[] = []
  lines.forEach((line: string, i: number) => {
    if (line.trim().startsWith('## ')) h2Indices.push(i)
  })
  const ctaAfterH2 = Math.max(1, Math.floor(h2Indices.length * 0.4))
  const ctaInsertIndex = h2Indices[ctaAfterH2] || -1

  const markdown = lines.join('\n')
  const rawHtml = marked.parse(markdown) as string

  // Add IDs to headings for TOC navigation
  const htmlContent = rawHtml.replace(
    /<h([2-6])>(.*?)<\/h\1>/g,
    (_match: string, level: string, text: string) => {
      const plainText = text.replace(/<[^>]+>/g, '')
      const id = plainText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      return `<h${level} id="${id}">${text}</h${level}>`
    }
  )

  return { htmlContent, ctaInsertIndex }
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const post = await getBlogPost(slug)
  if (!post) notFound()

  const relatedPosts = await getRelatedPosts(slug, post.category, 3)

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (isNaN(date.getTime()) || date.getFullYear() < 2000) return null
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const formattedDate = formatDate(post.published_at)
  const postUrl = `https://meetyourclinic.com/blog/${post.slug}`

  // Structured data
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

  // Process content
  const { htmlContent } = processContent(post.content)

  // Split HTML at mid-point H2 to inject CTA
  // Find all H2 tags in the processed HTML
  const h2Regex = /<h2[^>]*>/g
  const h2Matches = [...htmlContent.matchAll(h2Regex)]
  const ctaPosition = Math.max(1, Math.floor(h2Matches.length * 0.4))
  const ctaSplitMatch = h2Matches[ctaPosition]

  let contentBefore = htmlContent
  let contentAfter = ''

  if (ctaSplitMatch && ctaSplitMatch.index !== undefined) {
    contentBefore = htmlContent.substring(0, ctaSplitMatch.index)
    contentAfter = htmlContent.substring(ctaSplitMatch.index)
  }

  return (
    <>
      <StructuredData data={[blogSchema, breadcrumbSchema]} />

      {/* ── HERO SECTION ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-neutral-900">
        {/* Background image with dark overlay */}
        {post.image_url ? (
          <>
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-neutral-900/30" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-neutral-900 to-neutral-800" />
        )}

        <div className="relative z-10 mx-auto max-w-4xl px-4 pt-12 pb-16 sm:pt-16 sm:pb-20 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            {post.category && (
              <>
                <span className="mx-2">›</span>
                <Link
                  href={`/blog?category=${post.category_slug}`}
                  className="hover:text-white transition-colors"
                >
                  {post.category}
                </Link>
              </>
            )}
          </nav>

          {/* Category badge */}
          {post.category && (
            <Link
              href={`/blog?category=${post.category_slug}`}
              className="inline-flex items-center mb-6 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs font-semibold uppercase tracking-wider border border-white/10 hover:bg-white/20 transition-colors"
            >
              {post.category}
            </Link>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight max-w-3xl text-balance mb-8">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg text-neutral-300 max-w-2xl mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
            {/* Author pill */}
            <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-full pl-1.5 pr-4 py-1.5 border border-white/10">
              <div className="relative h-8 w-8 rounded-full overflow-hidden bg-primary-100 flex-shrink-0">
                {post.author_image ? (
                  <Image
                    src={post.author_image}
                    alt={post.author_name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary-600 font-bold text-xs">
                    {post.author_name.charAt(0)}
                  </div>
                )}
              </div>
              <span className="text-white/90 font-medium text-sm">{post.author_name}</span>
            </div>

            {formattedDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary-400" />
                {formattedDate}
              </span>
            )}

            {post.reading_time && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary-400" />
                {post.reading_time} min read
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ──────────────────────────────────────────── */}
      <TrustBadges post={post} />

      {/* ── MAIN CONTENT GRID ─────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-16">
          {/* ARTICLE COLUMN */}
          <article className="mx-auto max-w-3xl lg:mx-0 lg:max-w-none">
            {/* E-E-A-T: Author + Reviewer card */}
            <AuthorReviewerCard post={post} />

            {/* E-E-A-T: Editorial disclaimer */}
            <EditorialDisclaimer content={post.content} />

            {/* Blog content — first half */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: contentBefore }}
            />

            {/* Mid-article CTA */}
            {contentAfter && <MidArticleCta category={post.category || undefined} />}

            {/* Blog content — second half */}
            {contentAfter && (
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: contentAfter }}
              />
            )}

            {/* ── Share Section ──────────────────────────────────── */}
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-1">
                    Share this article
                  </p>
                  <p className="text-sm text-neutral-500">
                    Help others discover valuable insights
                  </p>
                </div>
                <ShareButtons title={post.title} url={postUrl} />
              </div>
            </div>

            {/* ── Author Bio Card ────────────────────────────────── */}
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
                  <p className="font-semibold text-lg text-neutral-900">
                    {post.author_name}
                  </p>
                  <p className="text-primary-600 font-medium text-sm mb-2">
                    Medical Tourism Research Team
                  </p>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    The MeetYourClinic editorial team researches procedures,
                    clinics, and destinations to provide evidence-based guides
                    for patients considering treatment abroad. Every article is
                    fact-checked against peer-reviewed sources and verified
                    clinic data.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* SIDEBAR */}
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
                  <h4 className="text-sm font-semibold text-neutral-900">
                    Share Article
                  </h4>
                </div>
                <ShareButtons title={post.title} url={postUrl} />
              </div>
            </div>
          </aside>
        </div>

        {/* ── Related Posts ────────────────────────────────────────── */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Related Articles
                </h2>
                <p className="text-neutral-600 mt-1">
                  Continue exploring medical tourism insights
                </p>
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

        {/* ── Bottom CTA ──────────────────────────────────────────── */}
        <section className="mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="relative px-8 py-16 sm:px-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Start Your Medical Journey?
            </h2>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
              Compare clinics, read verified reviews, and get personalised
              quotes from top medical facilities worldwide. Save up to 70% on
              your treatment.
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
