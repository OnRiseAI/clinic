'use client'

import { useState, useEffect, useRef } from 'react'
import { Link, usePathname } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { m, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TR, ES, PL, HU } from 'country-flag-icons/react/3x2'
import {
  ChevronDown,
  Menu,
  X,
  Stethoscope,
  Sparkles,
  Scissors,
  Eye,
  Bone,
  Baby,
  Heart,
  Scale,
  MapPin,
  ArrowRight,
  Building2,
  Search,
  Globe2
} from 'lucide-react'

const categories = [
  { name: 'Dental', slug: 'dental', icon: Stethoscope },
  { name: 'Cosmetic Surgery', slug: 'cosmetic-surgery', icon: Sparkles },
  { name: 'Hair Transplant', slug: 'hair-transplant', icon: Scissors },
  { name: 'Eye Surgery', slug: 'eye-surgery', icon: Eye },
  { name: 'Orthopedics', slug: 'orthopedics', icon: Bone },
  { name: 'Fertility', slug: 'fertility', icon: Baby },
  { name: 'Cardiology', slug: 'cardiology', icon: Heart },
  { name: 'Weight Loss', slug: 'weight-loss', icon: Scale },
]

const destinations = [
  { name: 'Turkey', slug: 'turkey', flag: TR, tagline: 'Medical capital' },
  { name: 'Spain', slug: 'spain', flag: ES, tagline: 'EU excellence' },
  { name: 'Poland', slug: 'poland', flag: PL, tagline: 'High value' },
  { name: 'Hungary', slug: 'hungary', flag: HU, tagline: 'Dental hub' },
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
  const [scrolled, setScrolled] = useState(false)
  
  const categoriesRef = useRef<HTMLDivElement>(null)
  const destinationsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false)
      }
      if (destinationsRef.current && !destinationsRef.current.contains(e.target as Node)) {
        setDestinationsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-500',
        scrolled
          ? 'bg-navy/95 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20 py-2'
          : 'bg-navy border-b border-white/10 py-3'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-gold shadow-lg shadow-gold/20 transition-transform group-hover:scale-105 duration-300">
              <span className="text-lg font-bold text-navy">M</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
              MeetYour<span className="text-gold">Clinic</span>
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-2">
          {/* Categories Dropdown */}
          <div className="relative" ref={categoriesRef}>
            <button
              onClick={() => {
                setCategoriesOpen(!categoriesOpen)
                setDestinationsOpen(false)
              }}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
                categoriesOpen
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              )}
            >
              {t('treatments')}
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-300', categoriesOpen && 'rotate-180 text-gold')} />
            </button>
            <AnimatePresence>
              {categoriesOpen && (
                <>
                  <div className="fixed inset-0 top-[4.5rem] z-40" onClick={() => setCategoriesOpen(false)} />
                  <m.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -left-6 top-full z-50 mt-4 w-[340px] origin-top-left rounded-xl border border-white/10 bg-[#0A121E]/95 backdrop-blur-xl p-2 shadow-2xl shadow-black/50"
                  >
                    <div className="grid grid-cols-1 gap-1">
                      {categories.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/${category.slug}`}
                          className="group/item flex items-center gap-3.5 rounded-lg px-3 py-3 transition-colors hover:bg-white/5"
                          onClick={() => setCategoriesOpen(false)}
                        >
                          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-white/5 text-white/50 transition-colors group-hover/item:bg-gold/10 group-hover/item:text-gold border border-white/5">
                            <category.icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium text-white/80 group-hover/item:text-white transition-colors">
                            {category.name}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-2 border-t border-white/5 pt-2">
                      <Link
                        href="/procedures"
                        className="group flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-gold/90 transition-colors hover:bg-gold/10 hover:text-gold"
                        onClick={() => setCategoriesOpen(false)}
                      >
                        Explore all procedures
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </m.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Destinations Dropdown */}
          <div className="relative" ref={destinationsRef}>
            <button
              onClick={() => {
                setDestinationsOpen(!destinationsOpen)
                setCategoriesOpen(false)
              }}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
                destinationsOpen
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              )}
            >
              {t('destinations')}
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-300', destinationsOpen && 'rotate-180 text-gold')} />
            </button>
            <AnimatePresence>
              {destinationsOpen && (
                <>
                  <div className="fixed inset-0 top-[4.5rem] z-40" onClick={() => setDestinationsOpen(false)} />
                  <m.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -left-6 top-full z-50 mt-4 w-[300px] origin-top-left rounded-xl border border-white/10 bg-[#0A121E]/95 backdrop-blur-xl p-2 shadow-2xl shadow-black/50"
                  >
                    <div className="grid grid-cols-1 gap-1">
                      {destinations.map((destination) => (
                        <Link
                          key={destination.slug}
                          href={`/destinations/${destination.slug}`}
                          className="group/item flex items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-white/5"
                          onClick={() => setDestinationsOpen(false)}
                        >
                          <div className="w-8 overflow-hidden rounded shadow-sm ring-1 ring-white/10 opacity-80 group-hover/item:opacity-100 transition-opacity">
                            <destination.flag title={destination.name} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white/80 group-hover/item:text-white transition-colors">
                              {destination.name}
                            </p>
                            <p className="text-[11px] text-white/40 tracking-wide uppercase font-semibold mt-0.5 group-hover/item:text-gold/70 transition-colors">
                              {destination.tagline}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-2 border-t border-white/5 pt-2">
                      <Link
                        href="/destinations"
                        className="group flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-gold/90 transition-colors hover:bg-gold/10 hover:text-gold"
                        onClick={() => setDestinationsOpen(false)}
                      >
                        All global destinations
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </m.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/clinics"
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
              pathname.startsWith('/clinics') 
                ? 'text-white bg-white/10' 
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            )}
            onClick={() => { setCategoriesOpen(false); setDestinationsOpen(false) }}
          >
            {t('clinics')}
          </Link>

          <Link
            href="/how-it-works"
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
              pathname === '/how-it-works' 
                ? 'text-white bg-white/10' 
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            )}
            onClick={() => { setCategoriesOpen(false); setDestinationsOpen(false) }}
          >
            How It Works
          </Link>

          <Link
            href="/blog"
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
              pathname.startsWith('/blog') 
                ? 'text-white bg-white/10' 
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            )}
            onClick={() => { setCategoriesOpen(false); setDestinationsOpen(false) }}
          >
            {t('blog')}
          </Link>
        </div>

        {/* Desktop auth buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-3">
          <Link href="/auth/claim" className="group flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors">
            <Building2 className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
            <span>List Clinic</span>
          </Link>

          <div className="h-5 w-px bg-white/10 mx-1" />

          {user ? (
            <Link href={user.role === 'clinic' ? '/clinic/dashboard' : '/dashboard'}>
              <Button
                className="bg-gold hover:bg-gold-dark text-navy font-bold tracking-wide rounded-sm shadow-[0_0_15px_rgba(198,169,108,0.2)] hover:shadow-[0_0_20px_rgba(198,169,108,0.3)] transition-all px-6 border-none"
              >
                {user.role === 'clinic' ? t('dashboard') : t('account')}
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth/signin" className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
                {t('login')}
              </Link>
              <Link href="/auth/signup">
                <Button
                  className="bg-gold hover:bg-gold-dark text-navy font-bold tracking-wide rounded-sm shadow-[0_0_15px_rgba(198,169,108,0.2)] hover:shadow-[0_0_20px_rgba(198,169,108,0.3)] transition-all px-6 border-none"
                >
                  {t('signup')}
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* ================================================================
          MOBILE MENU — Premium Dark Drawer
          ================================================================ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 lg:hidden top-[4.5rem]"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)} />

            {/* Menu panel */}
            <m.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 right-0 w-full max-w-sm bg-navy border-l border-white/10 shadow-2xl"
            >
              <div className="flex h-full flex-col overflow-y-auto">
                {/* Search */}
                <div className="px-6 pt-8 pb-4">
                  <Link
                    href="/search"
                    className="flex items-center gap-3 rounded-lg bg-white/5 border border-white/10 px-4 py-3.5 transition-colors hover:bg-white/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Search className="h-4 w-4 text-white/50" />
                    <span className="text-sm text-white/50 font-medium tracking-wide">Search clinics...</span>
                  </Link>
                </div>

                {/* Navigation Links */}
                <div className="px-4 py-2">
                  <div className="space-y-1">
                    <Link
                      href="/clinics"
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-white hover:bg-white/5 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Building2 className="h-4 w-4 text-gold" />
                      Explore Clinics
                    </Link>
                    <Link
                      href="/how-it-works"
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-white hover:bg-white/5 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Sparkles className="h-4 w-4 text-teal" />
                      How It Works
                    </Link>
                  </div>
                </div>

                {/* Treatments */}
                <div className="px-6 pt-6">
                  <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">
                    Treatments
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.slice(0, 6).map((category) => (
                      <Link
                        key={category.slug}
                        href={`/${category.slug}`}
                        className="flex items-center gap-2.5 rounded-lg px-2 py-2.5 transition-colors hover:bg-white/5 group/m"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded border border-white/5 bg-white/5 text-white/50 group-hover/m:text-gold group-hover/m:border-gold/30 transition-colors">
                          <category.icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-sm font-medium text-white/80 group-hover/m:text-white">
                          {category.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Destinations */}
                <div className="px-6 pt-8 pb-6">
                  <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">
                    Destinations
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {destinations.map((destination) => (
                      <Link
                        key={destination.slug}
                        href={`/destinations/${destination.slug}`}
                        className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-white/5 group/d"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="w-6 overflow-hidden rounded-sm shadow-sm ring-1 ring-white/10 opacity-80 group-hover/d:opacity-100">
                          <destination.flag title={destination.name} />
                        </div>
                        <span className="text-sm font-medium text-white/80 group-hover/d:text-white">
                          {destination.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Auth section */}
                <div className="mt-auto border-t border-white/10 bg-[#0A121E] p-6">
                  {user ? (
                    <Link
                      href={user.role === 'clinic' ? '/clinic/dashboard' : '/dashboard'}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        className="w-full bg-gold hover:bg-gold-dark text-navy font-bold tracking-wide rounded-sm py-6 border-none"
                      >
                        {user.role === 'clinic' ? 'Clinic Dashboard' : 'My Account'}
                      </Button>
                    </Link>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        href="/auth/signup"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button
                          className="w-full bg-gold hover:bg-gold-dark text-navy font-bold tracking-wide rounded-sm py-6 border-none shadow-[0_0_15px_rgba(198,169,108,0.2)]"
                        >
                          Sign Up Free
                        </Button>
                      </Link>
                      <div className="flex items-center gap-3">
                        <Link
                          href="/auth/signin"
                          className="flex-1 text-center py-3 text-sm font-medium text-white/70 hover:text-white transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {t('login')}
                        </Link>
                        <div className="w-px h-4 bg-white/10" />
                        <Link
                          href="/auth/claim"
                          className="flex-1 text-center py-3 text-sm font-medium text-white/70 hover:text-white transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          List Clinic
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
