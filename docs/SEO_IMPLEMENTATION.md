# SEO/GEO/AEO Implementation Guide

This document outlines the SEO infrastructure implemented for MediTravel, optimised for both traditional search engines AND AI models (ChatGPT, Perplexity, Google AI Overviews, Claude).

## Components Created

### 1. Structured Data (`src/lib/seo/structured-data.ts`)

Comprehensive JSON-LD schema generators for:
- **Organization Schema** - Site-wide organisation info
- **Website Schema** - SearchAction for sitelinks search box
- **Clinic Schema** - MedicalBusiness + LocalBusiness with ratings, services, credentials
- **Doctor Schema** - Physician with credentials and experience
- **Procedure Schema** - MedicalProcedure with pricing
- **FAQ Schema** - FAQPage for answer boxes
- **Breadcrumb Schema** - BreadcrumbList for navigation
- **HowTo Schema** - Step-by-step guides
- **Speakable Schema** - For voice assistants (GEO)
- **Blog Post Schema** - BlogPosting with author and dates
- **Destination Schema** - Country with offer catalog
- **Review Schema** - Individual reviews with ratings

### 2. Metadata Generators (`src/lib/seo/metadata.ts`)

Dynamic metadata generators with OG/Twitter cards for:
- Clinic pages
- Procedure pages
- Destination pages
- Destination + procedure combinations
- Blog posts
- Category pages
- Static pages (home, about, contact, etc.)

### 3. GEO Components

#### AIAnswerBlock (`src/components/seo/ai-answer-block.tsx`)
Self-contained answer blocks that AI models can easily extract and cite.

Includes answer generators for:
- Procedure answers (cost comparison)
- Destination answers (why choose X)
- Destination + procedure answers
- Clinic answers
- Category answers

**Best practices:**
- 40-60 words, factual, no fluff
- Include entity name and key stats inline
- Self-contained - makes sense without context

#### StatBlock (`src/components/seo/stat-block.tsx`)
Key statistics display optimised for AI extraction:
- Single stat blocks with optional trends
- Grid layout for multiple stats
- Generators for procedure, clinic, and destination stats

### 4. AEO Components

#### FAQSection (`src/components/seo/faq-section.tsx`)
FAQ accordion with automatic JSON-LD injection:
- Standard FAQ accordion
- "People Also Ask" style component
- FAQ generators for procedures, clinics, and destinations

### 5. Navigation

#### Breadcrumbs (`src/components/seo/breadcrumbs.tsx`)
SEO-optimised breadcrumbs with:
- JSON-LD BreadcrumbList schema
- Generators for clinic, procedure, destination, and blog paths

### 6. Blog Infrastructure

#### Data Layer (`src/lib/data/blog.ts`)
- `getBlogPosts()` - Paginated with category filter
- `getBlogPost()` - Single post by slug
- `getRelatedPosts()` - Related articles by category
- `getBlogCategories()` - With post counts
- `getFeaturedPosts()` - Featured articles
- `getRecentPosts()` - Latest articles

#### Components
- `BlogCard` - Article card with image, meta, category
- `TableOfContents` - Auto-generated from headings with scroll tracking

#### Pages (Enhanced)
- `/blog` - Index with featured post, categories, pagination
- `/blog/[slug]` - Article with TOC, related posts, social sharing

### 7. Technical SEO

#### robots.txt (`public/robots.txt`)
Comprehensive crawler permissions including:
- GPTBot (ChatGPT)
- Google-Extended (Bard/Gemini)
- anthropic-ai, Claude-Web
- PerplexityBot
- CCBot (Common Crawl)
- Applebot (Siri)
- Traditional search engines (Googlebot, Bingbot, etc.)

Blocks private areas: `/api/`, `/admin/`, `/dashboard/`, `/patient/`, `/clinic-portal/`

#### Dynamic Sitemap (`src/app/sitemap.ts`)
Auto-generates sitemap from database:
- Static pages
- All procedures
- All destinations
- All clinics
- Destination + procedure combinations
- Blog posts
- Procedure categories

### 8. Error Pages

- `not-found.tsx` - Custom 404 with navigation links
- `error.tsx` - Error boundary with retry
- `global-error.tsx` - Root error boundary

### 9. Cookie Consent (`src/components/cookie-consent.tsx`)
GDPR-compliant consent banner with:
- Three consent levels: Essential, Analytics, All
- Cookie settings expansion
- GA4 consent mode integration

### 10. Database Migration (`supabase/migrations/004_blog_tables.sql`)
- `blog_categories` - Category taxonomy
- `blog_posts` - Articles with SEO meta fields
- `blog_tags` - Tag taxonomy
- `blog_post_tags` - Many-to-many relation
- RLS policies for public read access

## Usage Examples

### Adding Structured Data to a Page

```tsx
import { StructuredData, generateClinicSchema } from '@/components/seo'

export default function ClinicPage({ clinic }) {
  const schema = generateClinicSchema(clinic)

  return (
    <>
      <StructuredData data={schema} />
      {/* Page content */}
    </>
  )
}
```

### Adding an AI Answer Block

```tsx
import { AIAnswerBlock, generateProcedureAnswer } from '@/components/seo'

const { question, answer } = generateProcedureAnswer({
  procedureName: 'Dental Veneers',
  definition: 'thin shells bonded to teeth to improve appearance',
  minPrice: 250,
  maxPrice: 600,
  ukPrice: 900,
  savingsPercent: 70,
  topCountries: ['Turkey', 'Mexico', 'Thailand'],
})

<AIAnswerBlock
  question={question}
  answer={answer}
  entityName="Dental Veneers"
  entityType="MedicalProcedure"
/>
```

### Adding FAQ Section

```tsx
import { FAQSection, generateProcedureFAQs } from '@/components/seo'

const faqs = generateProcedureFAQs({
  procedureName: 'Hair Transplant',
  minPrice: 1500,
  maxPrice: 4000,
  ukPrice: 12000,
  topCountries: ['Turkey', 'Hungary', 'Poland'],
  recoveryTime: '7-10 days',
})

<FAQSection faqs={faqs} />
```

### Adding Breadcrumbs

```tsx
import { Breadcrumbs, generateClinicBreadcrumbs } from '@/components/seo'

const items = generateClinicBreadcrumbs(
  'Smile Dental Istanbul',
  'smile-dental-istanbul',
  'Turkey',
  'turkey'
)

<Breadcrumbs items={items} />
```

## GEO Best Practices

1. **Citability**: Use AIAnswerBlock to create self-contained snippets AI can quote
2. **Structure**: Use semantic HTML and JSON-LD for machine readability
3. **Authority**: Include stats, accreditations, and review data
4. **Freshness**: Update sitemap and meta tags regularly
5. **Crawler Access**: Allow AI crawlers in robots.txt

## Cross-Linking Implementation

The following internal cross-links are implemented for SEO:

### Clinic Pages (`/clinics/[slug]`)
- **Breadcrumb**: Home → Clinics → [Country] → [Clinic Name]
- **Similar Clinics**: 4 clinics with same specialties
- **More Clinics in [Country]**: 4 other clinics in the same country with "View all →" link to destination
- **Specialty Links**: Category tags linking to procedure category pages
- **Procedure Links**: Each procedure links to its procedure page

### Procedure Pages (`/[category]/[procedure]`)
- **Breadcrumb**: Home → Procedures → [Category] → [Procedure]
- **Category Link**: Back to parent category
- **Top Clinics**: 8 clinics offering this procedure
- **Top Destinations**: 6 countries with links to `/destinations/[country]/[procedure]`
- **Related Procedures**: 6 procedures in the same category
- **AI Answer Block**: GEO-optimised summary for AI extraction

### Destination Pages (`/destinations/[country]`)
- **Breadcrumb**: Home → Destinations → [Country]
- **Top Clinics**: Clinics in this country
- **Available Procedures**: Procedures offered in this country with links
- **Cost Comparison**: Links to specific procedure pages

### Blog Pages (`/blog`, `/blog/[slug]`)
- **Category Filtering**: Links between blog categories
- **Related Posts**: 3 related articles by category
- **Table of Contents**: Internal page navigation

## Structured Data Integration

Structured data is now injected on key pages:

| Page Type | Schemas Included |
|-----------|------------------|
| Clinic | MedicalBusiness, LocalBusiness, Breadcrumb, Speakable |
| Procedure | MedicalProcedure, Breadcrumb, Speakable |
| Destination | Country, Breadcrumb |
| Blog Post | BlogPosting, Breadcrumb |

## Monitoring

- Google Search Console for traditional SEO
- Track citations in ChatGPT, Perplexity using brand monitoring
- Monitor robots.txt logs for AI crawler activity
