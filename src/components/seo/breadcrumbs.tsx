'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { generateBreadcrumbSchema, type BreadcrumbItem } from '@/lib/seo/structured-data'

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Breadcrumbs - SEO-optimised breadcrumb navigation
 *
 * Renders breadcrumbs with proper schema.org BreadcrumbList markup.
 * Helps search engines understand site hierarchy.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const breadcrumbSchema = generateBreadcrumbSchema(items)

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center text-sm text-neutral-600', className)}
    >
      <ol className="flex items-center flex-wrap gap-1">
        <li className="flex items-center">
          <Link
            href="/"
            className="hover:text-primary-600 transition-colors"
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={index} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1 text-neutral-400" />
              {isLast || !item.url ? (
                <span
                  className="text-neutral-900 font-medium"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="hover:text-primary-600 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </nav>
  )
}

// =============================================================================
// BREADCRUMB GENERATORS
// =============================================================================

export function generateClinicBreadcrumbs(
  clinicName: string,
  clinicSlug: string,
  countryName?: string,
  countrySlug?: string
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: 'Clinics', url: '/clinics' },
  ]

  if (countryName && countrySlug) {
    items.push({ name: countryName, url: `/destinations/${countrySlug}` })
  }

  items.push({ name: clinicName, url: `/clinics/${clinicSlug}` })

  return items
}

export function generateProcedureBreadcrumbs(
  procedureName: string,
  procedureSlug: string,
  categoryName?: string,
  categorySlug?: string
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: 'Procedures', url: '/procedures' },
  ]

  if (categoryName && categorySlug) {
    items.push({ name: categoryName, url: `/procedures/category/${categorySlug}` })
  }

  items.push({ name: procedureName, url: `/procedures/${procedureSlug}` })

  return items
}

export function generateDestinationBreadcrumbs(
  countryName: string,
  countrySlug: string,
  procedureName?: string,
  procedureSlug?: string
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: 'Destinations', url: '/destinations' },
    { name: countryName, url: `/destinations/${countrySlug}` },
  ]

  if (procedureName && procedureSlug) {
    items.push({
      name: procedureName,
      url: `/destinations/${countrySlug}/${procedureSlug}`,
    })
  }

  return items
}

export function generateBlogBreadcrumbs(
  postTitle: string,
  postSlug: string,
  categoryName?: string,
  categorySlug?: string
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: 'Blog', url: '/blog' },
  ]

  if (categoryName && categorySlug) {
    items.push({ name: categoryName, url: `/blog/category/${categorySlug}` })
  }

  items.push({ name: postTitle, url: `/blog/${postSlug}` })

  return items
}
