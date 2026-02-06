'use client'

import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface BreadcrumbProps {
  className?: string
  items?: { href: string; label: string; isLast?: boolean }[]
}

export function Breadcrumb({ className, items: customItems }: BreadcrumbProps) {
  const pathname = usePathname()

  // Don't show breadcrumb on homepage
  if (pathname === '/') return null

  // Build breadcrumb items if not provided
  const items = customItems || pathname.split('/').filter(Boolean).map((segment, index, segments) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    const isLast = index === segments.length - 1

    return { href, label, isLast }
  })

  return (
    <nav aria-label="Breadcrumb" className={cn('mb-6', className)}>
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link
            href="/"
            className="text-neutral-500 transition-colors hover:text-primary-600"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center space-x-2">
            <svg
              className="h-4 w-4 text-neutral-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            {item.isLast ? (
              <span className="font-medium text-neutral-900">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-neutral-500 transition-colors hover:text-primary-600"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
