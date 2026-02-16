// =============================================================================
// STRUCTURED DATA GENERATORS FOR SEO, GEO & AEO
// =============================================================================

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://meetyourclinic.com'
const SITE_NAME = 'Meet Your Clinic'

// =============================================================================
// ORGANIZATION SCHEMA
// =============================================================================

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Meet Your Clinic helps patients find world-class healthcare abroad. Compare clinics, read reviews, and get personalized recommendations.',
    sameAs: [
      'https://twitter.com/meetyourclinic',
      'https://facebook.com/meetyourclinic',
      'https://instagram.com/meetyourclinic',
      'https://linkedin.com/company/meetyourclinic',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
  }
}

// =============================================================================
// WEBSITE SCHEMA
// =============================================================================

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Compare 1,000+ medical tourism clinics across 50+ countries. Get personalized recommendations from our AI advisor.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/clinics?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// =============================================================================
// CLINIC / MEDICAL BUSINESS SCHEMA
// =============================================================================

export interface ClinicSchemaData {
  name: string
  slug: string
  categorySlug: string
  description: string | null
  address: string | null
  city: string | null
  country: string | null
  lat: number | null
  lng: number | null
  phone: string | null
  email: string | null
  website: string | null
  photos: Array<{ url: string }>
  rating: number | null
  reviewCount: number | null
  accreditations: string[]
  specialties: string[]
  procedures: Array<{ name: string; priceMin: number | null; priceMax: number | null; currency: string }>
  doctors: Array<{ name: string; title: string | null; specialisation: string | null }>
  yearEstablished: number | null
  languages: string[]
}

export function generateClinicSchema(clinic: ClinicSchemaData) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'LocalBusiness'],
    '@id': `${SITE_URL}/clinics/${clinic.categorySlug}/${clinic.slug}`,
    name: clinic.name,
    description: clinic.description || `${clinic.name} is a medical clinic offering treatments abroad.`,
    url: `${SITE_URL}/clinics/${clinic.categorySlug}/${clinic.slug}`,
    telephone: clinic.phone,
    email: clinic.email,
  }

  if (clinic.website) {
    schema.sameAs = [clinic.website]
  }

  if (clinic.address || clinic.city || clinic.country) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: clinic.address,
      addressLocality: clinic.city,
      addressCountry: clinic.country,
    }
  }

  if (clinic.lat && clinic.lng) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: clinic.lat,
      longitude: clinic.lng,
    }
  }

  if (clinic.photos.length > 0) {
    schema.image = clinic.photos.map((p) => p.url)
  }

  if (clinic.rating && clinic.reviewCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: clinic.rating.toFixed(1),
      reviewCount: clinic.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    }
  }

  if (clinic.specialties.length > 0) {
    schema.medicalSpecialty = clinic.specialties
  }

  if (clinic.procedures.length > 0) {
    schema.availableService = clinic.procedures.map((p) => ({
      '@type': 'MedicalProcedure',
      name: p.name,
      ...(p.priceMin && {
        offers: {
          '@type': 'Offer',
          price: p.priceMin,
          priceCurrency: p.currency,
          priceSpecification: p.priceMax
            ? {
              '@type': 'PriceSpecification',
              minPrice: p.priceMin,
              maxPrice: p.priceMax,
              priceCurrency: p.currency,
            }
            : undefined,
        },
      }),
    }))
  }

  if (clinic.accreditations.length > 0) {
    schema.hasCredential = clinic.accreditations.map((acc) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'accreditation',
      name: acc,
    }))
  }

  if (clinic.yearEstablished) {
    schema.foundingDate = clinic.yearEstablished.toString()
  }

  if (clinic.languages.length > 0) {
    schema.knowsLanguage = clinic.languages
  }

  return schema
}

// =============================================================================
// PHYSICIAN / DOCTOR SCHEMA
// =============================================================================

export interface DoctorSchemaData {
  name: string
  title: string | null
  specialisation: string | null
  yearsExperience: number | null
  qualifications: string[]
  photoUrl: string | null
  clinicName: string
  clinicSlug: string
  clinicCategorySlug?: string
}

export function generateDoctorSchema(doctor: DoctorSchemaData) {
  const clinicPath = doctor.clinicCategorySlug
    ? `/clinics/${doctor.clinicCategorySlug}/${doctor.clinicSlug}`
    : `/clinics/dental/${doctor.clinicSlug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name,
    jobTitle: doctor.title,
    medicalSpecialty: doctor.specialisation,
    image: doctor.photoUrl,
    worksFor: {
      '@type': 'MedicalBusiness',
      name: doctor.clinicName,
      url: `${SITE_URL}${clinicPath}`,
    },
    ...(doctor.yearsExperience && {
      hasOccupation: {
        '@type': 'Occupation',
        name: doctor.specialisation || 'Medical Doctor',
        experienceRequirements: `${doctor.yearsExperience}+ years experience`,
      },
    }),
    ...(doctor.qualifications.length > 0 && {
      hasCredential: doctor.qualifications.map((q) => ({
        '@type': 'EducationalOccupationalCredential',
        name: q,
      })),
    }),
  }
}

// =============================================================================
// MEDICAL PROCEDURE SCHEMA
// =============================================================================

export interface ProcedureSchemaData {
  name: string
  slug: string
  description: string | null
  category: string | null
  costComparison?: Array<{
    country: string
    avgCost: number
    currency: string
  }>
}

export function generateProcedureSchema(procedure: ProcedureSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    '@id': `${SITE_URL}/procedures/${procedure.slug}`,
    name: procedure.name,
    description: procedure.description || `${procedure.name} is a medical procedure available at clinics abroad.`,
    procedureType: procedure.category ? `${procedure.category} Procedure` : 'Medical Procedure',
    url: `${SITE_URL}/procedures/${procedure.slug}`,
  }
}

// =============================================================================
// FAQ SCHEMA
// =============================================================================

export interface FAQItem {
  question: string
  answer: string
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// =============================================================================
// BREADCRUMB SCHEMA
// =============================================================================

export interface BreadcrumbItem {
  name: string
  url?: string
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}` }),
    })),
  }
}

// =============================================================================
// HOWTO SCHEMA
// =============================================================================

export interface HowToStep {
  name: string
  text: string
  image?: string
}

export function generateHowToSchema(
  name: string,
  description: string,
  steps: HowToStep[],
  totalTime?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(totalTime && { totalTime }),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  }
}

// =============================================================================
// SPEAKABLE SCHEMA (for GEO)
// =============================================================================

export function generateSpeakableSchema(url: string, cssSelectors: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  }
}

// =============================================================================
// BLOG POST / ARTICLE SCHEMA
// =============================================================================

export interface BlogPostSchemaData {
  title: string
  slug: string
  excerpt: string
  content?: string
  imageUrl: string | null
  authorName: string
  authorImage?: string
  publishedAt: string
  updatedAt?: string
  category?: string
  readingTime?: number
}

export function generateBlogPostSchema(post: BlogPostSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blog/${post.slug}`,
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl || `${SITE_URL}/og-default.jpg`,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.authorName,
      ...(post.authorImage && { image: post.authorImage }),
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    ...(post.category && { articleSection: post.category }),
    ...(post.readingTime && { timeRequired: `PT${post.readingTime}M` }),
  }
}

// =============================================================================
// DESTINATION / PLACE SCHEMA
// =============================================================================

export interface DestinationSchemaData {
  name: string
  slug: string
  countryCode: string
  description: string | null
  clinicCount: number
  topSpecialties: string[]
}

export function generateDestinationSchema(destination: DestinationSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Country',
    '@id': `${SITE_URL}/destinations/${destination.slug}`,
    name: destination.name,
    description: destination.description || `${destination.name} is a popular medical tourism destination.`,
    url: `${SITE_URL}/destinations/${destination.slug}`,
    ...(destination.topSpecialties.length > 0 && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `Medical Services in ${destination.name}`,
        itemListElement: destination.topSpecialties.map((specialty) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: specialty,
          },
        })),
      },
    }),
  }
}

// =============================================================================
// REVIEW SCHEMA
// =============================================================================

export interface ReviewSchemaData {
  authorName: string
  rating: number
  reviewBody: string
  datePublished: string
  itemReviewed: {
    type: 'MedicalBusiness' | 'MedicalProcedure'
    name: string
    url: string
  }
}

export function generateReviewSchema(review: ReviewSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.authorName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished,
    itemReviewed: {
      '@type': review.itemReviewed.type,
      name: review.itemReviewed.name,
      url: review.itemReviewed.url,
    },
  }
}

// =============================================================================
// HELPER: Combine multiple schemas into a single array
// =============================================================================

export function combineSchemas(...schemas: Record<string, unknown>[]) {
  return schemas
}

// =============================================================================
// HELPER: Render schema as JSON-LD script
// =============================================================================

export function renderSchemaScript(schema: Record<string, unknown> | Record<string, unknown>[]) {
  return JSON.stringify(schema)
}
