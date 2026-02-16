// =============================================================================
// CATEGORY CONFIGURATION MAP
// =============================================================================
// Per-category content (hero text, FAQs, SEO, hero image). This is the only
// place category-specific copy lives. Components read from this config.
// =============================================================================

export interface CategoryFaq {
  question: string
  answer: string
}

export interface SeoBlock {
  heading: string
  body: string // HTML-safe plain text (rendered via dangerouslySetInnerHTML or as text)
}

export interface RelatedTreatment {
  name: string
  slug: string
}

export interface CountryLink {
  name: string
  flag: string // ISO code (e.g., 'TR')
  slug: string
}

export interface CategoryConfig {
  slug: string
  name: string // "Dental", "Hair Transplant"
  namePlural: string // "Dental Clinics", "Hair Transplant Clinics"
  heroTitle: string // "Discover the best {highlight} worldwide"
  heroHighlight: string // "dental clinics" (gradient text)
  heroSubtitle: string
  heroImage: string
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  faqs: CategoryFaq[]
  seoBlocks: SeoBlock[]
  relatedTreatments: RelatedTreatment[]
  countryLinks: CountryLink[]
  pricingHeading: string // "What's the cost of dental treatment procedures?"
  pricingCta: string // "Get the best dental treatment option for your budget"
  faqIntro: string // "Everything you need to know about getting dental treatment abroad."
  blogSubtitle: string // "Expert guides to help you plan your dental journey"
  countryLinksHeading: string // "Countries for dental treatment"
  specialtiesHeading: string // "All dental specialties"
}

// =============================================================================
// DENTAL CONFIG (fully populated — migrated from hardcoded components)
// =============================================================================

const dentalConfig: CategoryConfig = {
  slug: 'dental',
  name: 'Dental',
  namePlural: 'Dental Clinics',
  heroTitle: 'Discover the best',
  heroHighlight: 'dental clinics',
  heroSubtitle:
    'Compare verified dental clinics for implants, veneers, and cosmetic dentistry. Transparent pricing, real patient reviews, and direct contact\u2014no middleman fees.',
  heroImage:
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=700&h=500&fit=crop&auto=format',
  metaTitle: 'Compare Trusted Dental Clinics | Verified Clinics & Pricing | medit',
  metaDescription:
    'Compare verified dental clinics offering implants, veneers, cosmetic dentistry and more. Transparent pricing, real patient reviews, and direct contact \u2014 no obligation.',
  metaKeywords:
    'dental clinics, best dental clinics, dental treatment clinics, compare dental clinics, dental implants abroad, veneers abroad, dental tourism',
  pricingHeading: "What\u2019s the cost of dental treatment procedures?",
  pricingCta: 'Get the best dental treatment option for your budget',
  faqIntro:
    "Everything you need to know about getting dental treatment abroad. Can\u2019t find the answer you\u2019re looking for? Contact us directly.",
  blogSubtitle: 'Expert guides to help you plan your dental journey',
  countryLinksHeading: 'Countries for dental treatment',
  specialtiesHeading: 'All dental specialties',
  faqs: [
    {
      question: 'How much does dental treatment abroad typically cost?',
      answer:
        'Costs vary by treatment and destination. Dental implants typically range from $250\u2013$1,500 per tooth, while porcelain veneers range from $150\u2013$600 per tooth. Most patients save 40\u201370% compared to US or UK prices for equivalent materials and techniques.',
    },
    {
      question: 'How are clinics verified on this platform?',
      answer:
        'We verify clinics based on accreditation (ISO, JCI, or national equivalents), practitioner credentials, patient reviews, and facility standards. Verified clinics display a badge on their listing. Verification is reviewed annually.',
    },
    {
      question: 'How long does dental treatment usually take?',
      answer:
        'Simple procedures like veneers or crowns take 5\u20137 days. Dental implants may require 3\u20135 days for placement, with a follow-up visit 3\u20136 months later for the final crown. All-on-4 full-arch restorations can often be completed in a single trip of 5\u20137 days.',
    },
    {
      question: 'Is there any obligation when I contact a clinic?',
      answer:
        'No. Contacting a clinic through our platform is free and carries no obligation. You can compare quotes from multiple clinics before making any decision.',
    },
    {
      question: 'What happens after I verify my number?',
      answer:
        "After verification, you choose your preferred contact method (WhatsApp, SMS, or email). The clinic receives a summary of what you\u2019re looking for and will respond directly. You control the conversation from there.",
    },
  ],
  seoBlocks: [
    {
      heading: 'What clinics are considered the best ones by international patients?',
      body: 'Top dental clinics in the world are listed on this page. The ranking is based on patient reviews, expert evaluations, and verified credentials. International patients consider these dental clinics among the best for high-quality procedures, experienced dentists with over 15 years of practice, and cost-effective treatment that meets international standards.',
    },
    {
      heading: 'How to choose the best dental clinic?',
      body: "To pick the most appropriate dental care clinic, pay attention to the clinic\u2019s reputation and accreditations (JCI, ISO 9001), dentists\u2019 experience and CVs, the range of dental options available, and real patient reviews with before & after photos.",
    },
    {
      heading: 'What procedures are applied in the best dental clinics in the world?',
      body: 'Top dental clinics offer dental implants (including All-on-4/6/8), porcelain and composite veneers, zirconia and porcelain crowns, root canal treatment, teeth whitening, and orthodontics including Invisalign clear aligners.',
    },
    {
      heading: 'What diagnostics are used in top dental clinics?',
      body: 'Leading dental clinics use Dental Cone Beam CT for 3D imaging, Panorex X-ray machines, 3D modeling including digital smile design, and intraoral scanners that replace traditional impressions.',
    },
    {
      heading: 'How to book a top dental clinic through our platform?',
      body: 'Submit a request on our website, our patient coordinator contacts you and helps select a dental center. Your records are sent for preliminary assessment, the doctor creates a treatment plan with transparent cost estimate, and your coordinator arranges the dental trip with 24/7 support.',
    },
  ],
  relatedTreatments: [
    { name: 'Dental Implants', slug: 'dental-implants' },
    { name: 'Porcelain Veneers', slug: 'porcelain-veneers' },
    { name: 'All-on-4', slug: 'all-on-4' },
    { name: 'Dental Crowns', slug: 'dental-crowns' },
    { name: 'Teeth Whitening', slug: 'teeth-whitening' },
    { name: 'Root Canal', slug: 'root-canal' },
    { name: 'Orthodontics', slug: 'orthodontics' },
    { name: 'Hollywood Smile', slug: 'hollywood-smile' },
    { name: 'Dental Bridges', slug: 'dental-bridges' },
    { name: 'Invisalign', slug: 'invisalign' },
    { name: 'Cosmetic Dentistry', slug: 'cosmetic-dentistry' },
    { name: 'Full Mouth Restoration', slug: 'full-mouth-restoration' },
  ],
  countryLinks: [
    { name: 'Turkey', flag: 'TR', slug: 'turkey' },
    { name: 'Mexico', flag: 'MX', slug: 'mexico' },
    { name: 'Hungary', flag: 'HU', slug: 'hungary' },
    { name: 'Thailand', flag: 'TH', slug: 'thailand' },
    { name: 'Poland', flag: 'PL', slug: 'poland' },
    { name: 'Costa Rica', flag: 'CR', slug: 'costa-rica' },
    { name: 'Colombia', flag: 'CO', slug: 'colombia' },
    { name: 'Croatia', flag: 'HR', slug: 'croatia' },
    { name: 'Spain', flag: 'ES', slug: 'spain' },
    { name: 'India', flag: 'IN', slug: 'india' },
    { name: 'Germany', flag: 'DE', slug: 'germany' },
    { name: 'Brazil', flag: 'BR', slug: 'brazil' },
    { name: 'Czech Republic', flag: 'CZ', slug: 'czech-republic' },
    { name: 'Romania', flag: 'RO', slug: 'romania' },
    { name: 'Portugal', flag: 'PT', slug: 'portugal' },
    { name: 'United Arab Emirates', flag: 'AE', slug: 'uae' },
    { name: 'South Korea', flag: 'KR', slug: 'south-korea' },
    { name: 'Dominican Republic', flag: 'DO', slug: 'dominican-republic' },
    { name: 'Egypt', flag: 'EG', slug: 'egypt' },
    { name: 'United Kingdom', flag: 'GB', slug: 'united-kingdom' },
    { name: 'United States', flag: 'US', slug: 'united-states' },
    { name: 'Italy', flag: 'IT', slug: 'italy' },
    { name: 'Greece', flag: 'GR', slug: 'greece' },
  ],
}

// =============================================================================
// TEMPLATE CONFIG (for categories that don't have custom copy yet)
// =============================================================================

function createTemplateConfig(
  slug: string,
  name: string,
  namePlural: string,
): CategoryConfig {
  return {
    slug,
    name,
    namePlural,
    heroTitle: 'Discover the best',
    heroHighlight: `${namePlural.toLowerCase()}`,
    heroSubtitle: `Compare verified ${namePlural.toLowerCase()} worldwide. Transparent pricing, real patient reviews, and direct contact\u2014no middleman fees.`,
    heroImage:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&h=500&fit=crop&auto=format',
    metaTitle: `Compare Trusted ${namePlural} | Verified Clinics & Pricing | medit`,
    metaDescription: `Compare verified ${namePlural.toLowerCase()} worldwide. Transparent pricing, real patient reviews, and direct contact \u2014 no obligation.`,
    metaKeywords: `${name.toLowerCase()} clinics, best ${name.toLowerCase()} clinics, ${name.toLowerCase()} abroad, medical tourism ${name.toLowerCase()}`,
    pricingHeading: `What\u2019s the cost of ${name.toLowerCase()} procedures?`,
    pricingCta: `Get the best ${name.toLowerCase()} treatment option for your budget`,
    faqIntro: `Everything you need to know about getting ${name.toLowerCase()} treatment abroad. Can\u2019t find the answer you\u2019re looking for? Contact us directly.`,
    blogSubtitle: `Expert guides to help you plan your ${name.toLowerCase()} journey`,
    countryLinksHeading: `Countries for ${name.toLowerCase()} treatment`,
    specialtiesHeading: `All ${name.toLowerCase()} specialties`,
    faqs: [
      {
        question: `How much does ${name.toLowerCase()} treatment abroad typically cost?`,
        answer: `Costs vary by treatment and destination. Most patients save 40\u201370% compared to US or UK prices for equivalent quality. Contact clinics through our platform for exact quotes.`,
      },
      {
        question: 'How are clinics verified on this platform?',
        answer:
          'We verify clinics based on accreditation (ISO, JCI, or national equivalents), practitioner credentials, patient reviews, and facility standards. Verified clinics display a badge on their listing.',
      },
      {
        question: 'Is there any obligation when I contact a clinic?',
        answer:
          'No. Contacting a clinic through our platform is free and carries no obligation. You can compare quotes from multiple clinics before making any decision.',
      },
      {
        question: 'What happens after I verify my number?',
        answer:
          "After verification, you choose your preferred contact method (WhatsApp, SMS, or email). The clinic receives a summary of what you\u2019re looking for and will respond directly.",
      },
    ],
    seoBlocks: [
      {
        heading: `What makes a great ${name.toLowerCase()} clinic?`,
        body: `The best ${namePlural.toLowerCase()} combine experienced specialists, international accreditations, modern equipment, and transparent pricing. Our platform helps you compare verified clinics across multiple countries.`,
      },
      {
        heading: `How to choose the right ${name.toLowerCase()} clinic abroad?`,
        body: `Check the clinic\u2019s accreditations (JCI, ISO), review doctor credentials, read patient testimonials, and compare pricing across destinations before making your decision.`,
      },
    ],
    relatedTreatments: [],
    countryLinks: [],
  }
}

// =============================================================================
// ALL CATEGORY CONFIGS
// =============================================================================

export const CATEGORY_CONFIGS: Record<string, CategoryConfig> = {
  dental: dentalConfig,
  'hair-transplant': createTemplateConfig('hair-transplant', 'Hair Transplant', 'Hair Transplant Clinics'),
  'hair-restoration': createTemplateConfig('hair-restoration', 'Hair Restoration', 'Hair Restoration Clinics'),
  'cosmetic-surgery': createTemplateConfig('cosmetic-surgery', 'Cosmetic Surgery', 'Cosmetic Surgery Clinics'),
  bariatric: createTemplateConfig('bariatric', 'Bariatric', 'Bariatric Surgery Clinics'),
  'bariatric-surgery': createTemplateConfig('bariatric-surgery', 'Bariatric Surgery', 'Bariatric Surgery Clinics'),
  orthopedic: createTemplateConfig('orthopedic', 'Orthopedic', 'Orthopedic Clinics'),
  'orthopaedic-surgery': createTemplateConfig('orthopaedic-surgery', 'Orthopaedic Surgery', 'Orthopaedic Surgery Clinics'),
  'eye-surgery': createTemplateConfig('eye-surgery', 'Eye Surgery', 'Eye Surgery Clinics'),
  fertility: createTemplateConfig('fertility', 'Fertility', 'Fertility Clinics'),
  cardiology: createTemplateConfig('cardiology', 'Cardiology', 'Cardiology Clinics'),
  dermatology: createTemplateConfig('dermatology', 'Dermatology', 'Dermatology Clinics'),
  oncology: createTemplateConfig('oncology', 'Oncology', 'Oncology Clinics'),
  'stem-cell': createTemplateConfig('stem-cell', 'Stem Cell', 'Stem Cell Clinics'),
  wellness: createTemplateConfig('wellness', 'Wellness', 'Wellness & Longevity Clinics'),
  'other-treatments': createTemplateConfig('other-treatments', 'Other Treatments', 'Medical Clinics'),
}

// =============================================================================
// LOOKUP FUNCTION
// =============================================================================

export function getCategoryConfig(slug: string): CategoryConfig | null {
  return CATEGORY_CONFIGS[slug] ?? null
}
