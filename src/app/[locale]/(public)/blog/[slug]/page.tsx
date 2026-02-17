import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { getBlogPost, getRelatedPosts } from '@/lib/data/blog'
import {
  BlogCard,
  BlogHero,
  BlogTrustStrip,
  BlogAuthorCard,
  BlogSummaryBox,
  BlogTableOfContents,
  BlogSection,
  BlogCta,
  BlogFaqAccordion,
  BlogCostTable,
  BlogTimeline,
  BlogChecklist,
  BlogTestimonials,
  BlogWarningBox,
  BlogFloatingWidgets,
} from '@/components/blog'
import type { TocItem, FaqItem, CostRow, TimelineStep, Testimonial } from '@/components/blog/types'
import { marked } from 'marked'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

/* ═══════════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════════ */
interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  image_url: string | null
  author_name: string | null
  author_image?: string | null
  published_at: string
  updated_at: string
  reading_time?: number | null
  category?: string | null
  category_slug?: string | null
  meta_title?: string | null
  meta_description?: string | null
}

/* ═══════════════════════════════════════════════════════════════════════
   SITE CONFIG
   ═══════════════════════════════════════════════════════════════════════ */
const SITE_URL = 'https://meetyourclinic.com'
const SITE_NAME = 'MeetYourClinic'

/* ═══════════════════════════════════════════════════════════════════════
   METADATA (Dynamic per post)
   ═══════════════════════════════════════════════════════════════════════ */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    }
  }

  const title = post.meta_title || post.title
  const description = post.meta_description || post.excerpt
  const url = `${SITE_URL}/blog/${post.slug}`

  return {
    title: title.length > 70 ? `${title.slice(0, 67)}...` : title,
    description: description.length > 155 ? `${description.slice(0, 152)}...` : description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: post.image_url
        ? [{ url: post.image_url, width: 1200, height: 630, alt: post.title }]
        : [],
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: [post.author_name],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.image_url ? [post.image_url] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   STRUCTURED DATA GENERATORS
   ═══════════════════════════════════════════════════════════════════════ */

function generateArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    image: post.image_url
      ? { '@type': 'ImageObject', url: post.image_url, width: 1200, height: 630 }
      : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { '@type': 'Organization', name: post.author_name || SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
    inLanguage: 'en',
    isAccessibleForFree: true,
    ...(post.reading_time && { timeRequired: `PT${post.reading_time}M` }),
    ...(post.category && { articleSection: post.category }),
  }
}

function extractAndGenerateFAQSchema(content: string) {
  const faqPairs: FaqItem[] = []
  const faqMatch = content.match(
    /## Frequently Asked Questions\s*\n([\s\S]*?)(?=\n## [^#]|\n---|\n\*\*\[|$)/i
  )
  if (!faqMatch) return { schema: null, faqs: [] }

  const faqContent = faqMatch[1]
  const questionBlocks = faqContent.split(/(?=### )/)
  for (const block of questionBlocks) {
    const qMatch = block.match(/^### (.+?)\n([\s\S]+?)$/)
    if (qMatch) {
      const question = qMatch[1].trim()
      const answer = qMatch[2]
        .trim()
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/\n+/g, ' ')
        .trim()
      if (question && answer) faqPairs.push({ question, answer })
    }
  }

  if (faqPairs.length === 0) return { schema: null, faqs: [] }

  return {
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqPairs.map((pair) => ({
        '@type': 'Question',
        name: pair.question,
        acceptedAnswer: { '@type': 'Answer', text: pair.answer },
      })),
    },
    faqs: faqPairs,
  }
}

function generateBreadcrumbSchema(post: BlogPost) {
  const items: { name: string; url?: string }[] = [
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
  ]
  if (post.category && post.category_slug) {
    items.push({ name: post.category, url: `${SITE_URL}/blog?category=${post.category_slug}` })
  }
  items.push({ name: post.title })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  }
}

function StructuredData({ schemas }: { schemas: (object | null)[] }) {
  const validSchemas = schemas.filter(Boolean)
  if (validSchemas.length === 0) return null
  return (
    <>
      {validSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   CONTENT EXTRACTORS — parse markdown comment blocks into structured data
   ═══════════════════════════════════════════════════════════════════════ */

function extractCostTable(content: string): { rows: CostRow[]; remaining: string } {
  const regex = /<!-- cost-table -->\s*\n([\s\S]*?)<!-- \/cost-table -->/g
  const rows: CostRow[] = []
  let remaining = content

  let match: RegExpExecArray | null
  while ((match = regex.exec(content)) !== null) {
    const tableContent = match[1]
    const lines = tableContent.trim().split('\n').filter((l: string) => l.trim() && !l.startsWith('|--') && !l.startsWith('| Type'))
    for (const line of lines) {
      const cells = line.split('|').map((c: string) => c.trim()).filter(Boolean)
      if (cells.length >= 4) {
        rows.push({
          type: cells[0],
          ukPrice: cells[1],
          turkeyPrice: cells[2],
          savings: cells[3],
          popular: cells[0].toLowerCase().includes('e-max') || cells[0].toLowerCase().includes('popular'),
        })
      }
    }
    remaining = remaining.replace(match[0], '')
  }

  return { rows, remaining }
}

function extractTimeline(content: string): { steps: TimelineStep[]; remaining: string } {
  const regex = /<!-- timeline -->\s*\n([\s\S]*?)<!-- \/timeline -->/g
  const steps: TimelineStep[] = []
  let remaining = content

  const iconMap: Record<string, TimelineStep['icon']> = {
    arrival: 'plane', fly: 'plane', airport: 'plane',
    prep: 'tooth', dental: 'tooth', teeth: 'tooth', tooth: 'tooth',
    lab: 'lab', fabricat: 'lab', ceramic: 'lab',
    reveal: 'smile', smile: 'smile', result: 'smile', final: 'smile',
    follow: 'check', aftercare: 'check', home: 'check',
  }

  let match: RegExpExecArray | null
  while ((match = regex.exec(content)) !== null) {
    const lines = match[1].trim().split('\n').filter((l: string) => l.trim().startsWith('-'))
    for (const line of lines) {
      const m = line.match(/- \*\*(.+?):\s*(.+?)\*\*\s*[—–-]\s*(.+)/)
      if (m) {
        const combined = (m[1] + ' ' + m[2]).toLowerCase()
        let icon: TimelineStep['icon'] = 'check'
        for (const [keyword, iconVal] of Object.entries(iconMap)) {
          if (combined.includes(keyword)) { icon = iconVal; break }
        }
        steps.push({ day: m[1].trim(), title: m[2].trim(), description: m[3].trim(), icon })
      }
    }
    remaining = remaining.replace(match[0], '')
  }

  return { steps, remaining }
}

function extractChecklist(content: string): { items: string[]; remaining: string } {
  const regex = /<!-- checklist -->\s*\n([\s\S]*?)<!-- \/checklist -->/g
  const items: string[] = []
  let remaining = content

  let match: RegExpExecArray | null
  while ((match = regex.exec(content)) !== null) {
    const lines = match[1].trim().split('\n').filter((l: string) => l.trim().startsWith('-'))
    for (const line of lines) {
      items.push(line.replace(/^-\s*/, '').trim())
    }
    remaining = remaining.replace(match[0], '')
  }

  return { items, remaining }
}

function extractWarnings(content: string): { warnings: { variant: 'amber' | 'red'; title: string; text: string }[]; remaining: string } {
  const regex = /<!-- warning -->\s*\n([\s\S]*?)<!-- \/warning -->/g
  const warnings: { variant: 'amber' | 'red'; title: string; text: string }[] = []
  let remaining = content

  let match: RegExpExecArray | null
  while ((match = regex.exec(content)) !== null) {
    const block = match[1].trim()
    const titleMatch = block.match(/^\*\*(.+?)\*\*\s*\n([\s\S]*)/)
    if (titleMatch) {
      const variant = titleMatch[1].toLowerCase().includes('critical') || titleMatch[1].toLowerCase().includes('danger') ? 'red' as const : 'amber' as const
      warnings.push({ variant, title: titleMatch[1], text: titleMatch[2].trim() })
    } else {
      warnings.push({ variant: 'amber', title: 'Important', text: block })
    }
    remaining = remaining.replace(match[0], '')
  }

  return { warnings, remaining }
}

function extractTestimonials(content: string): Testimonial[] {
  const testimonials: Testimonial[] = []
  // Pattern: > "quote text" — **Name, City** (Treatment, Year)
  const regex = />\s*"(.+?)"\s*[—–-]\s*\*\*(.+?),\s*(.+?)\*\*\s*\((.+?),\s*(\d{4})\)/g
  let match: RegExpExecArray | null
  while ((match = regex.exec(content)) !== null) {
    testimonials.push({
      text: match[1].trim(),
      name: match[2].trim(),
      city: match[3].trim(),
      treatment: match[4].trim(),
      year: match[5],
      rating: 5,
    })
  }
  return testimonials
}

function extractTocItems(htmlContent: string): TocItem[] {
  const items: TocItem[] = []
  const regex = /<h([23])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h\1>/g
  let match: RegExpExecArray | null
  while ((match = regex.exec(htmlContent)) !== null) {
    const plainText = match[3].replace(/<[^>]+>/g, '')
    items.push({ id: match[2], label: plainText, level: parseInt(match[1]) })
  }
  return items
}

/* ═══════════════════════════════════════════════════════════════════════
   CONTENT PROCESSOR
   ═══════════════════════════════════════════════════════════════════════ */
function processContent(rawMarkdown: string) {
  const lines = rawMarkdown.split('\n')

  // Remove first H1 (shown in hero)
  const firstH1Index = lines.findIndex((line: string) => line.trim().startsWith('# '))
  if (firstH1Index !== -1) lines.splice(firstH1Index, 1)

  // Remove the italic disclaimer paragraph (rendered separately)
  const disclaimerStart = lines.findIndex((line: string) =>
    line.trim().startsWith('*This article was researched')
  )
  if (disclaimerStart !== -1) {
    let disclaimerEnd = disclaimerStart
    for (let i = disclaimerStart; i < lines.length; i++) {
      if (lines[i].includes('*') && i > disclaimerStart) { disclaimerEnd = i; break }
      if (i === disclaimerStart && lines[i].trim().endsWith('*')) { disclaimerEnd = i; break }
    }
    lines.splice(disclaimerStart, disclaimerEnd - disclaimerStart + 1)
  }

  const markdown = lines.join('\n')
  let rawHtml = marked.parse(markdown) as string

  // Add IDs to headings for TOC navigation
  rawHtml = rawHtml.replace(
    /<h([2-6])>(.*?)<\/h\1>/g,
    (_match: string, level: string, text: string) => {
      const plainText = text.replace(/<[^>]+>/g, '')
      const id = plainText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      return `<h${level} id="${id}">${text}</h${level}>`
    }
  )

  // Remove FAQ section from HTML (rendered as BlogFaqAccordion component instead)
  rawHtml = rawHtml.replace(
    /(<h2[^>]*id="frequently-asked-questions"[^>]*>.*?<\/h2>)([\s\S]*?)(?=<h2|<hr|$)/i,
    ''
  )

  // Make external links open in new tab
  rawHtml = rawHtml.replace(
    /<a\s+href="(https?:\/\/[^"]+)"/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer"'
  )

  return rawHtml
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

  // Generate all structured data
  const articleSchema = generateArticleSchema(post)
  const { schema: faqSchema, faqs } = extractAndGenerateFAQSchema(post.content)
  const breadcrumbSchema = generateBreadcrumbSchema(post)

  // Extract rich blocks from markdown before processing
  let contentForProcessing = post.content
  const { rows: costRows, remaining: afterCost } = extractCostTable(contentForProcessing)
  contentForProcessing = afterCost
  const { steps: timelineSteps, remaining: afterTimeline } = extractTimeline(contentForProcessing)
  contentForProcessing = afterTimeline
  const { items: checklistItems, remaining: afterChecklist } = extractChecklist(contentForProcessing)
  contentForProcessing = afterChecklist
  const { warnings, remaining: afterWarnings } = extractWarnings(contentForProcessing)
  contentForProcessing = afterWarnings
  const testimonials = extractTestimonials(post.content)

  // Process content to HTML
  const htmlContent = processContent(contentForProcessing)

  // Extract TOC items from processed HTML
  const tocItems = extractTocItems(htmlContent)

  // Split HTML at ~40% for mid-article CTA injection
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

  // Build breadcrumbs for BlogHero
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    ...(post.category && post.category_slug
      ? [{ label: post.category, href: `/blog?category=${post.category_slug}` }]
      : []),
    { label: post.title },
  ]

  const procedureName = post.category || 'treatment'

  return (
    <>
      {/* ── STRUCTURED DATA ──────────────────────────────────── */}
      <StructuredData schemas={[articleSchema, faqSchema, breadcrumbSchema]} />

      {/* ── FLOATING WIDGETS (progress bar, back-to-top, WhatsApp, mobile CTA) */}
      <BlogFloatingWidgets />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <BlogHero
        title={post.title}
        excerpt={post.excerpt || ''}
        category={post.category || 'Guide'}
        readingTime={post.reading_time || 5}
        updatedAt={post.updated_at}
        breadcrumbs={breadcrumbs}
      />

      {/* ── TRUST STRIP ──────────────────────────────────────── */}
      <BlogTrustStrip />

      {/* ── MAIN CONTENT AREA ────────────────────────────────── */}
      <div className="bg-blog-warm-bg min-h-screen">
        <div className="mx-auto max-w-[1080px] px-5 py-14 lg:py-16 lg:flex lg:gap-12">
          {/* TABLE OF CONTENTS — Desktop sidebar */}
          {tocItems.length > 0 && <BlogTableOfContents items={tocItems} />}

          {/* ARTICLE COLUMN */}
          <article className="flex-1 min-w-0 max-w-[720px] font-blog-sans">
            {/* Author card */}
            <BlogSection>
              <BlogAuthorCard
                name={post.author_name || 'MeetYourClinic Editorial Team'}
                subtitle="Medical Tourism Research"
                updatedDate={post.updated_at}
              />
            </BlogSection>

            {/* Quick Summary */}
            {post.excerpt && post.excerpt.length >= 50 && (
              <BlogSection delay={0.1}>
                <BlogSummaryBox>
                  <p>{post.excerpt}</p>
                </BlogSummaryBox>
              </BlogSection>
            )}

            {/* Warnings (extracted from <!-- warning --> blocks) */}
            {warnings.map((w, i) => (
              <BlogSection key={`warning-${i}`} delay={0.1}>
                <BlogWarningBox variant={w.variant} title={w.title}>
                  <p>{w.text}</p>
                </BlogWarningBox>
              </BlogSection>
            ))}

            {/* Blog content — first half */}
            <BlogSection delay={0.15}>
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: contentBefore }}
              />
            </BlogSection>

            {/* Cost Table (extracted from <!-- cost-table --> blocks) */}
            {costRows.length > 0 && (
              <BlogSection>
                <BlogCostTable rows={costRows} />
              </BlogSection>
            )}

            {/* Mid-article CTA */}
            {contentAfter && (
              <BlogCta
                variant="dark"
                headline="Ready to Compare Clinics?"
                subheadline="Free & No Obligation"
                description={`Get verified quotes from top-rated ${procedureName.toLowerCase()} clinics. Compare prices and reviews in minutes.`}
                buttonText="Compare Clinics Now"
                buttonHref="/search"
              />
            )}

            {/* Blog content — second half */}
            {contentAfter && (
              <BlogSection>
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: contentAfter }}
                />
              </BlogSection>
            )}

            {/* Timeline (extracted from <!-- timeline --> blocks) */}
            {timelineSteps.length > 0 && (
              <BlogSection>
                <h2 className="font-blog-serif text-[clamp(20px,3vw,26px)] font-bold text-blog-text-primary mb-5">
                  Your Treatment Timeline
                </h2>
                <BlogTimeline steps={timelineSteps} />
              </BlogSection>
            )}

            {/* Checklist (extracted from <!-- checklist --> blocks) */}
            {checklistItems.length > 0 && (
              <BlogSection>
                <h2 className="font-blog-serif text-[clamp(20px,3vw,26px)] font-bold text-blog-text-primary mb-5">
                  What to Bring
                </h2>
                <BlogChecklist items={checklistItems} />
              </BlogSection>
            )}

            {/* Testimonials (extracted from blockquote patterns) */}
            {testimonials.length > 0 && (
              <BlogSection>
                <h2 className="font-blog-serif text-[clamp(20px,3vw,26px)] font-bold text-blog-text-primary mb-5">
                  Patient Reviews
                </h2>
                <BlogTestimonials testimonials={testimonials} />
              </BlogSection>
            )}

            {/* FAQ Accordion */}
            {faqs.length > 0 && (
              <BlogSection>
                <h2 className="font-blog-serif text-[clamp(20px,3.5vw,28px)] font-bold text-blog-text-primary mb-5">
                  Frequently Asked Questions
                </h2>
                <BlogFaqAccordion faqs={faqs} />
              </BlogSection>
            )}

            {/* Bottom CTA */}
            <BlogCta
              variant="light"
              headline="Ready to Start Your Medical Journey?"
              description="Compare clinics, read verified reviews, and get personalised quotes from top medical facilities worldwide. Save up to 70% on your treatment."
              buttonText="Find Clinics"
              buttonHref="/search"
            />
          </article>
        </div>

        {/* ── Related Posts ──────────────────────────────────── */}
        {relatedPosts.length > 0 && (
          <section className="mx-auto max-w-[1080px] px-5 pb-24">
            <div className="pt-14 border-t border-blog-warm-border">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-blog-teal mb-2 font-blog-sans">
                    Keep Reading
                  </p>
                  <h2 className="font-blog-serif text-[clamp(22px,3vw,28px)] font-bold text-blog-text-primary">
                    Related Articles
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="hidden sm:inline-flex items-center gap-2 text-sm text-blog-teal font-semibold hover:text-blog-teal-dark transition-colors font-blog-sans"
                >
                  View all articles
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost: any) => (
                  <BlogCard
                    key={relatedPost.id}
                    title={relatedPost.title}
                    slug={relatedPost.slug}
                    excerpt={relatedPost.excerpt}
                    imageUrl={relatedPost.image_url}
                    authorName={relatedPost.author_name || 'Medical Team'}
                    publishedAt={relatedPost.published_at}
                    readingTime={relatedPost.reading_time || undefined}
                    category={relatedPost.category || undefined}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
