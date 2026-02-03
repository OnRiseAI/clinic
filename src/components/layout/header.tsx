'use client'

import { useState } from 'react'
import { Link, usePathname } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { m } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'treatments', href: '/treatments' },
  { name: 'destinations', href: '/destinations' },
  { name: 'clinics', href: '/clinics' },
  { name: 'blog', href: '/blog' },
]

interface HeaderProps {
  user?: {
    id: string
    email: string
    full_name?: string | null
    avatar_url?: string | null
    role: 'patient' | 'clinic' | 'admin'
  } | null
}

export function Header({ user }: HeaderProps) {
  const t = useTranslations('navigation')
  const tCommon = useTranslations('common')
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary-600',
                pathname === item.href
                  ? 'text-primary-700'
                  : 'text-neutral-600'
              )}
            >
              {t(item.name)}
            </Link>
          ))}
        </div>

        {/* Desktop auth buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {user ? (
            <div className="flex items-center gap-x-4">
              <Link
                href="/saved"
                className="text-sm font-medium text-neutral-600 hover:text-primary-600"
              >
                {t('savedClinics')}
              </Link>
              <Link
                href={user.role === 'clinic' ? '/dashboard' : '/account'}
                className="text-sm font-medium text-neutral-600 hover:text-primary-600"
              >
                {user.role === 'clinic' ? t('dashboard') : t('account')}
              </Link>
              <form action="/auth/signout" method="post">
                <Button type="submit" variant="ghost" size="sm">
                  {t('logout')}
                </Button>
              </form>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  {t('login')}
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" size="sm">
                  {t('signup')}
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <m.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden"
        >
          <div className="space-y-1 border-t border-border px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block rounded-md px-3 py-2 text-base font-medium',
                  pathname === item.href
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-neutral-600 hover:bg-neutral-50'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.name)}
              </Link>
            ))}
            <div className="mt-4 space-y-2 border-t border-border pt-4">
              {user ? (
                <>
                  <Link
                    href="/saved"
                    className="block rounded-md px-3 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('savedClinics')}
                  </Link>
                  <Link
                    href={user.role === 'clinic' ? '/dashboard' : '/account'}
                    className="block rounded-md px-3 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {user.role === 'clinic' ? t('dashboard') : t('account')}
                  </Link>
                  <form action="/auth/signout" method="post">
                    <button
                      type="submit"
                      className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-neutral-600 hover:bg-neutral-50"
                    >
                      {t('logout')}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block rounded-md px-3 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('login')}
                  </Link>
                  <Link
                    href="/signup"
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
    </header>
  )
}
