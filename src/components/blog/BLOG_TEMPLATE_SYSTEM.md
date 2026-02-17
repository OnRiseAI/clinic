# MeetYourClinic Blog Template System

## Architecture Overview

This is a **modular blog template system** for MeetYourClinic. It replaces the current plain Markdown rendering with a premium, conversion-optimised layout while keeping content in Supabase as Markdown.

### How It Works

Content stays in Supabase `blog_posts.content` as Markdown. The template system **enhances rendering** by:

1. Parsing the Markdown into sections (split on `## ` headings)
2. Wrapping each section in a `<BlogSection>` with fade-in animation
3. Rendering special blocks (cost tables, timelines, checklists, testimonials, FAQs) as rich UI components instead of plain text
4. Adding strategic CTAs, trust signals, and navigation elements around the content

### File Structure

```
components/blog/
├── BlogLayout.tsx          — Main layout wrapper (hero, sidebar TOC, article, footer)
├── BlogHero.tsx            — Full-width gradient hero with breadcrumbs, meta, CTA
├── BlogTrustStrip.tsx      — Trust badges bar (JCI, patient count, guarantees, rating)
├── BlogAuthorCard.tsx      — Author/editorial team card with credentials
├── BlogSummaryBox.tsx      — Quick summary highlight box
├── BlogTableOfContents.tsx — Desktop sticky sidebar TOC + mobile drawer TOC
├── BlogCostTable.tsx       — Cost comparison cards (UK vs Turkey with savings badges)
├── BlogTimeline.tsx        — Visual day-by-day timeline with icons
├── BlogChecklist.tsx       — Checkmark list items in card grid
├── BlogTestimonials.tsx    — Patient review cards with stars, avatars, treatment badges
├── BlogFaqAccordion.tsx    — Expandable FAQ with smooth animation
├── BlogCta.tsx             — CTA blocks (dark gradient + light variants)
├── BlogWarningBox.tsx      — Warning/important callout boxes (amber, red variants)
├── BlogVeneerCards.tsx     — Veneer type comparison cards (reusable for any comparison)
├── BlogSection.tsx         — Fade-in wrapper for content sections
├── BlogFloatingWidgets.tsx — WhatsApp, back-to-top, mobile sticky CTA bar
├── BlogMarkdownRenderer.tsx— Enhanced react-markdown with styled prose
├── blog-styles.css         — Tailwind @apply classes for blog typography
└── types.ts                — TypeScript interfaces for all blog data
```

### Data Flow

```
Supabase blog_posts table
  ├── title, slug, meta_title, meta_description
  ├── content (Markdown string)
  ├── excerpt
  ├── category, tags, keywords
  ├── reading_time
  ├── author
  ├── schema_json (Article schema)
  ├── faq_schema (JSONB array)
  └── featured_image (optional URL)
          │
          ▼
  [slug]/page.tsx (Server Component)
  — Fetches from Supabase
  — Passes data to BlogLayout
          │
          ▼
  BlogLayout (Client Component)
  — Renders hero, trust strip, sidebar, article
  — Parses Markdown sections
  — Maps special blocks to rich components
  — Injects CTAs at strategic positions
```

### Markdown Convention for Rich Blocks

To trigger rich component rendering, use these Markdown patterns in blog content:

#### Cost Table
```markdown
<!-- cost-table -->
| Type | UK Price | Turkey Price | Savings |
|------|----------|-------------|---------|
| E-max | £600–1,200 | £180–300 | 75% |
<!-- /cost-table -->
```

#### Timeline
```markdown
<!-- timeline -->
- **Day 1: Arrival & Assessment** — Airport collection, hotel check-in, examination
- **Day 2: Preparation** — Tooth prep, temporary veneers fitted
- **Days 3–5: Fabrication** — Lab work, free time for sightseeing
<!-- /timeline -->
```

#### Testimonial
```markdown
> "The clinic was more modern than my NHS dentist..." — **Sarah M., Manchester** (16 E-max Veneers, 2024)
```

#### Checklist
```markdown
<!-- checklist -->
- JCI or ISO 9001 accreditation
- Named brand materials (IPS E-max)
- Digital smile design preview
<!-- /checklist -->
```

#### Warning/Important Box
```markdown
<!-- warning -->
**Important: Irreversibility**
Veneers require removing enamel from your natural teeth...
<!-- /warning -->
```

#### FAQ (auto-detected from faq_schema JSONB)
FAQs render from the `faq_schema` column, not from Markdown content.

### Integration Instructions for Claude Code

1. Copy all files from `components/blog/` into `src/components/blog/`
2. Add Google Fonts (Source Serif 4 + DM Sans) to `next.config.js` or `app/layout.tsx`
3. Add blog CSS variables to your global styles or Tailwind config
4. Update the `[slug]/page.tsx` to use `BlogLayout` instead of raw Markdown rendering
5. Existing blog content continues to work — the Markdown conventions above are **progressive enhancement** (plain Markdown still renders fine, but adding the comment markers enables rich components)

### Design Tokens

```css
/* Blog-specific design tokens */
--blog-navy: #0f1b2d;
--blog-teal: #0d9488;
--blog-teal-dark: #0f766e;
--blog-teal-light: #14b8a6;
--blog-warm-bg: #faf9f7;
--blog-warm-border: #eae6e1;
--blog-text-primary: #1a1a1a;
--blog-text-body: #5c5650;
--blog-text-muted: #9a9590;
--blog-green-bg: #f0fdfa;
--blog-green-border: #ccfbf1;
--blog-serif: 'Source Serif 4', Georgia, serif;
--blog-sans: 'DM Sans', system-ui, sans-serif;
```

### Tailwind Config Additions

```js
// tailwind.config.js extend
colors: {
  blog: {
    navy: '#0f1b2d',
    teal: { DEFAULT: '#0d9488', dark: '#0f766e', light: '#14b8a6' },
    warm: { bg: '#faf9f7', border: '#eae6e1' },
    text: { primary: '#1a1a1a', body: '#5c5650', muted: '#9a9590' },
  }
},
fontFamily: {
  'blog-serif': ['"Source Serif 4"', 'Georgia', 'serif'],
  'blog-sans': ['"DM Sans"', 'system-ui', 'sans-serif'],
}
```
