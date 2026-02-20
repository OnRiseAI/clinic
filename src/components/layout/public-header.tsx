'use client'

import { useState } from 'react'
import { Link, usePathname } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { m, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TR, MX, TH, ES, PL, HU, CR, IN } from 'country-flag-icons/react/3x2'

const categories = [
  { name: 'Dental', slug: 'dental', icon: '🦷' },
  { name: 'Cosmetic Surgery', slug: 'cosmetic-surgery', icon: '✨' },
  { name: 'Hair Transplant', slug: 'hair-transplant', icon: '💇' },
  { name: 'Eye Surgery', slug: 'eye-surgery', icon: '👁️' },
  { name: 'Orthopedics', slug: 'orthopedics', icon: '🦴' },
  { name: 'Fertility', slug: 'fertility', icon: '👶' },
  { name: 'Cardiology', slug: 'cardiology', icon: '❤️' },
  { name: 'Weight Loss', slug: 'weight-loss', icon: '⚖️' },
]

const destinations = [
  { name: 'Turkey', slug: 'turkey', flag: TR },
  // { name: 'Mexico', slug: 'mexico', flag: MX },
  // { name: 'Thailand', slug: 'thailand', flag: TH },
  { name: 'Spain', slug: 'spain', flag: ES },
  { name: 'Poland', slug: 'poland', flag: PL },
  { name: 'Hungary', slug: 'hungary', flag: HU },
  // { name: 'Costa Rica', slug: 'costa-rica', flag: CR },
  // { name: 'India', slug: 'india', flag: IN },
]

interface PublicHeaderProps {
  user?: {
    id: string
    email: string
    full_name?: string | null
    avatar_url?: string | null
    role: 'patient' | 'clinic' | 'admin'
  } | null
}

export function PublicHeader({ user }: PublicHeaderProps) {
  const t = useTranslations('navigation')
  const tCommon = useTranslations('common')
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [destinationsOpen, setDestinationsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold text-primary-700">
              {tCommon('appName')}
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-8">
          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setCategoriesOpen(!categoriesOpen)
                setDestinationsOpen(false)
              }}
              className="flex items-center gap-x-1 text-sm font-medium text-neutral-600 transition-colors hover:text-primary-600"
            >
              {t('treatments')}
              <svg className={cn('h-4 w-4 transition-transform', categoriesOpen && 'rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {categoriesOpen && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 top-full mt-2 w-64 rounded-xl bg-white p-2 shadow-lg ring-1 ring-neutral-200"
                >
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/${category.slug}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-50"
                      onClick={() => setCategoriesOpen(false)}
                    >
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </m.div>
              )}
            </AnimatePresence>
          </div>

          {/* Destinations Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setDestinationsOpen(!destinationsOpen)
                setCategoriesOpen(false)
              }}
              className="flex items-center gap-x-1 text-sm font-medium text-neutral-600 transition-colors hover:text-primary-600"
            >
              {t('destinations')}
              <svg className={cn('h-4 w-4 transition-transform', destinationsOpen && 'rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {destinationsOpen && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 top-full mt-2 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-neutral-200"
                >
                  {destinations.map((destination) => (
                    <Link
                      key={destination.slug}
                      href={`/destinations/${destination.slug}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-50"
                      onClick={() => setDestinationsOpen(false)}
                    >
                      <div className="w-5 overflow-hidden rounded-sm">
                        <destination.flag title={destination.name} />
                      </div>
                      <span>{destination.name}</span>
                    </Link>
                  ))}
                </m.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/clinics"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary-600',
              pathname.startsWith('/clinics') ? 'text-primary-700' : 'text-neutral-600'
            )}
          >
            {t('clinics')}
          </Link>

          <Link
            href="/how-it-works"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary-600',
              pathname === '/how-it-works' ? 'text-primary-700' : 'text-neutral-600'
            )}
          >
            How It Works
          </Link>

          <Link
            href="/blog"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary-600',
              pathname.startsWith('/blog') ? 'text-primary-700' : 'text-neutral-600'
            )}
          >
            {t('blog')}
          </Link>
        </div>

        {/* Desktop auth buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Link href="/auth/claim">
            <Button variant="outline" size="sm">
              List Your Clinic
            </Button>
          </Link>
          {user ? (
            <div className="flex items-center gap-x-4">
              <Link href={user.role === 'clinic' ? '/clinic/dashboard' : '/dashboard'}>
                <Button variant="ghost" size="sm">
                  {user.role === 'clinic' ? t('dashboard') : t('account')}
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm">
                  {t('login')}
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="primary" size="sm">
                  {t('signup')}
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden"
          >
            <div className="space-y-1 border-t border-border px-4 pb-3 pt-2">
              <div className="py-2">
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Treatments
                </p>
                {categories.slice(0, 4).map((category) => (
                  <Link
                    key={category.slug}
                    href={`/${category.slug}`}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
              <div className="py-2">
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Destinations
                </p>
                {destinations.slice(0, 4).map((destination) => (
                  <Link
                    key={destination.slug}
                    href={`/destinations/${destination.slug}`}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="w-5 overflow-hidden rounded-sm">
                      <destination.flag title={destination.name} />
                    </div>
                    <span>{destination.name}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-4 space-y-2 border-t border-border pt-4">
                <Link
                  href="/auth/claim"
                  className="block rounded-md px-3 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  List Your Clinic
                </Link>
                {user ? (
                  <Link
                    href={user.role === 'clinic' ? '/clinic/dashboard' : '/dashboard'}
                    className="block rounded-md bg-primary-600 px-3 py-2 text-center text-base font-medium text-white hover:bg-primary-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {user.role === 'clinic' ? 'Clinic Dashboard' : 'My Account'}
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/auth/signin"
                      className="block rounded-md px-3 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('login')}
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block rounded-md bg-primary-600 px-3 py-2 text-center text-base font-medium text-white hover:bg-primary-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('signup')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
