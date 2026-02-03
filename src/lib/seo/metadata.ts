import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://meditravel.com'
const SITE_NAME = 'MediTravel'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`

interface BaseMetadataParams {
  title: string
  description: string
  path: string
  ogImage?: string
  noIndex?: boolean
}

/**
 * Generate base metadata for any page
 */
export function generateBaseMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: BaseMetadataParams): Metadata {
  const url = `${SITE_URL}${path}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_GB',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

// =============================================================================
// PAGE-SPECIFIC METADATA GENERATORS
// =============================================================================

interface ClinicMetadataParams {
  name: string
  slug: string
  description: string | null
  city: string | null
  country: string | null
  rating: number | null
  reviewCount: number | null
  specialties: string[]
  imageUrl?: string
}

export function generateClinicMetadata(clinic: ClinicMetadataParams): Metadata {
  const location = [clinic.city, clinic.country].filter(Boolean).join(', ')
  const ratingText = clinic.rating ? ` | ${clinic.rating.toFixed(1)}★` : ''
  const reviewText = clinic.reviewCount ? ` (${clinic.reviewCount} reviews)` : ''
  const specialtiesText = clinic.specialties.slice(0, 3).join(', ')

  const title = `${clinic.name} - ${location}${ratingText}`
  const description =
    clinic.description?.slice(0, 155) ||
    `${clinic.name} in ${location} specialises in ${specialtiesText || 'medical treatments'}. Read reviews, compare prices, and book your consultation.${reviewText}`

  return generateBaseMetadata({
    title,
    description,
    path: `/clinics/${clinic.slug}`,
    ogImage: clinic.imageUrl || DEFAULT_OG_IMAGE,
  })
}

interface ProcedureMetadataParams {
  name: string
  slug: string
  description: string | null
  category: string | null
  minPrice: number | null
  maxPrice: number | null
  clinicCount: number
}

export function generateProcedureMetadata(procedure: ProcedureMetadataParams): Metadata {
  const priceRange =
    procedure.minPrice && procedure.maxPrice
      ? `€${procedure.minPrice.toLocaleString()} - €${procedure.maxPrice.toLocaleString()}`
      : null

  const title = priceRange
    ? `${procedure.name} Abroad | ${priceRange}`
    : `${procedure.name} Abroad | Compare Prices & Clinics`

  const description =
    procedure.description?.slice(0, 155) ||
    `Compare ${procedure.clinicCount}+ clinics offering ${procedure.name} abroad.${priceRange ? ` Prices from ${priceRange}.` : ''} Read reviews, check accreditations, and get free quotes.`

  return generateBaseMetadata({
    title,
    description,
    path: `/procedures/${procedure.slug}`,
  })
}

interface DestinationMetadataParams {
  name: string
  slug: string
  description: string | null
  clinicCount: number
  topProcedures: string[]
}

export function generateDestinationMetadata(destination: DestinationMetadataParams): Metadata {
  const procedures = destination.topProcedures.slice(0, 3).join(', ')

  const title = `Medical Tourism in ${destination.name} | ${destination.clinicCount}+ Clinics`
  const description =
    destination.description?.slice(0, 155) ||
    `Explore ${destination.clinicCount}+ accredited clinics in ${destination.name}. Popular treatments: ${procedures || 'dental, cosmetic surgery, and more'}. Compare prices and read verified reviews.`

  return generateBaseMetadata({
    title,
    description,
    path: `/destinations/${destination.slug}`,
  })
}

interface DestinationProcedureMetadataParams {
  procedureName: string
  procedureSlug: string
  countryName: string
  countrySlug: string
  minPrice: number | null
  maxPrice: number | null
  clinicCount: number
}

export function generateDestinationProcedureMetadata(
  params: DestinationProcedureMetadataParams
): Metadata {
  const priceRange =
    params.minPrice && params.maxPrice
      ? `€${params.minPrice.toLocaleString()} - €${params.maxPrice.toLocaleString()}`
      : null

  const title = priceRange
    ? `${params.procedureName} in ${params.countryName} | ${priceRange}`
    : `${params.procedureName} in ${params.countryName} | Compare Clinics`

  const description = `Compare ${params.clinicCount}+ clinics offering ${params.procedureName} in ${params.countryName}.${priceRange ? ` Prices from ${priceRange}.` : ''} Read reviews and get free quotes.`

  return generateBaseMetadata({
    title,
    description,
    path: `/destinations/${params.countrySlug}/${params.procedureSlug}`,
  })
}

interface BlogPostMetadataParams {
  title: string
  slug: string
  excerpt: string
  imageUrl: string | null
  authorName: string
  publishedAt: string
  category?: string
}

export function generateBlogPostMetadata(post: BlogPostMetadataParams): Metadata {
  const title = `${post.title} | MediTravel Blog`

  return {
    ...generateBaseMetadata({
      title,
      description: post.excerpt.slice(0, 155),
      path: `/blog/${post.slug}`,
      ogImage: post.imageUrl || DEFAULT_OG_IMAGE,
    }),
    openGraph: {
      title,
      description: post.excerpt.slice(0, 155),
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: SITE_NAME,
      type: 'article',
      locale: 'en_GB',
      publishedTime: post.publishedAt,
      authors: [post.authorName],
      ...(post.category && { section: post.category }),
      images: [
        {
          url: post.imageUrl || DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}

interface CategoryMetadataParams {
  name: string
  slug: string
  description: string | null
  procedureCount: number
}

export function generateCategoryMetadata(category: CategoryMetadataParams): Metadata {
  const title = `${category.name} Abroad | Compare ${category.procedureCount}+ Procedures`
  const description =
    category.description?.slice(0, 155) ||
    `Browse ${category.procedureCount}+ ${category.name.toLowerCase()} procedures available abroad. Compare prices across countries and find accredited clinics.`

  return generateBaseMetadata({
    title,
    description,
    path: `/procedures/category/${category.slug}`,
  })
}

// =============================================================================
// STATIC PAGE METADATA
// =============================================================================

export const homeMetadata: Metadata = generateBaseMetadata({
  title: 'MediTravel | Compare Medical Tourism Clinics Worldwide',
  description:
    'Find world-class healthcare abroad. Compare 1,000+ accredited clinics across 50+ countries. Save up to 70% on dental, cosmetic surgery, fertility, and more.',
  path: '/',
})

export const proceduresIndexMetadata: Metadata = generateBaseMetadata({
  title: 'Medical Procedures Abroad | Compare Prices & Clinics',
  description:
    'Browse 200+ medical procedures available abroad. From dental veneers to hair transplants, compare prices and find the best clinics worldwide.',
  path: '/procedures',
})

export const destinationsIndexMetadata: Metadata = generateBaseMetadata({
  title: 'Medical Tourism Destinations | 50+ Countries',
  description:
    'Explore medical tourism destinations worldwide. Turkey, Mexico, Thailand, and more. Compare clinics, prices, and patient reviews by country.',
  path: '/destinations',
})

export const clinicsIndexMetadata: Metadata = generateBaseMetadata({
  title: 'Medical Clinics Abroad | 1,000+ Verified Clinics',
  description:
    'Browse 1,000+ verified medical clinics worldwide. Filter by procedure, country, rating, and accreditation. Read real patient reviews.',
  path: '/clinics',
})

export const blogIndexMetadata: Metadata = generateBaseMetadata({
  title: 'Medical Tourism Blog | Guides, Tips & Insights',
  description:
    'Expert guides on medical tourism. Learn about procedures, destinations, and how to plan your medical travel safely.',
  path: '/blog',
})

export const aboutMetadata: Metadata = generateBaseMetadata({
  title: 'About MediTravel | Your Medical Tourism Partner',
  description:
    'MediTravel helps patients find world-class healthcare abroad. Learn about our mission, team, and commitment to patient safety.',
  path: '/about',
})

export const contactMetadata: Metadata = generateBaseMetadata({
  title: 'Contact Us | MediTravel',
  description:
    'Get in touch with the MediTravel team. We\'re here to help you plan your medical travel.',
  path: '/contact',
})

export const privacyMetadata: Metadata = generateBaseMetadata({
  title: 'Privacy Policy | MediTravel',
  description:
    'Read the MediTravel privacy policy. Learn how we collect, use, and protect your personal information.',
  path: '/privacy',
})

export const termsMetadata: Metadata = generateBaseMetadata({
  title: 'Terms of Service | MediTravel',
  description:
    'Read the MediTravel terms of service. Understand your rights and responsibilities when using our platform.',
  path: '/terms',
})
