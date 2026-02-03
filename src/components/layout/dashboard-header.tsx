'use client'

import { useState } from 'react'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Overview', icon: '🏠' },
  { href: '/dashboard/saved', label: 'Saved Clinics', icon: '❤️' },
  { href: '/dashboard/enquiries', label: 'My Enquiries', icon: '📋' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
]

export function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white lg:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-primary-600">
          MediTravel
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="border-t border-neutral-200 bg-white px-4 py-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                )}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}

          <div className="mt-4 border-t border-neutral-200 pt-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            >
              <span>🌐</span>
              Back to Site
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
