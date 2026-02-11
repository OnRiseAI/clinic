'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'

const POPULAR_SEARCHES = [
  { label: 'Dental Veneers in Turkey', href: '/clinics?procedure=veneers&country=turkey' },
  { label: 'Hair Transplant in Istanbul', href: '/clinics?procedure=hair-transplant&city=istanbul' },
  { label: 'IVF in Spain', href: '/clinics?procedure=ivf&country=spain' },
  { label: 'Rhinoplasty in Mexico', href: '/clinics?procedure=rhinoplasty&country=mexico' },
]

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop&auto=format&q=80',
    alt: 'Modern dental clinic',
    label: 'Dental Clinic',
  },
  {
    src: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=300&fit=crop&auto=format&q=80',
    alt: 'Medical consultation',
    label: 'Expert Consultation',
  },
  {
    src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop&auto=format&q=80',
    alt: 'Modern hospital corridor',
    label: 'World-Class Facilities',
  },
  {
    src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop&auto=format&q=80',
    alt: 'Dental treatment',
    label: 'Dental Veneers',
  },
]

export function Hero() {
  const router = useRouter()
  const [treatment, setTreatment] = useState('')
  const [destination, setDestination] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const searchParams = new URLSearchParams()
    if (treatment) searchParams.set('query', treatment)
    if (destination) searchParams.set('country', destination)
    router.push(`/clinics?${searchParams.toString()}`)
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream-warm to-cream" />
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-bl from-gold/[0.04] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-gradient-to-tr from-teal/[0.03] via-transparent to-transparent" />
      </div>

      <div className="absolute top-32 right-[12%] w-80 h-80 bg-gold/[0.04] animate-blob" />
      <div className="absolute bottom-24 left-[8%] w-64 h-64 bg-teal/[0.04] animate-blob animation-delay-2000" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text + Search */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-gold/20 bg-gold/[0.04] text-[13px] font-medium text-navy/60 mb-8 tracking-wide"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              Trusted by 50,000+ patients worldwide
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="heading-serif text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] text-navy leading-[1.08] tracking-tight mb-6"
            >
              Save Up to 80% on{' '}
              <span className="gradient-text">World-Class Healthcare</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-navy/45 max-w-xl mb-10 leading-relaxed"
            >
              Compare accredited dental clinics, cosmetic surgeons, hair transplant
              specialists and more across 20+ countries. Verified reviews,
              transparent pricing, direct booking.
            </motion.p>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl p-2 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_16px_64px_rgba(0,0,0,0.06)] border border-navy/[0.04]"
            >
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Dental veneers, hair transplant..."
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-cream/60 rounded-xl text-navy text-sm placeholder:text-navy/25 outline-none focus:bg-cream transition-colors"
                  />
                </div>
                <div className="flex-1 relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-cream/60 rounded-xl text-navy text-sm appearance-none outline-none focus:bg-cream transition-colors cursor-pointer"
                  >
                    <option value="">Any Destination</option>
                    <option value="turkey">Turkey</option>
                    <option value="spain">Spain</option>
                    <option value="mexico">Mexico</option>
                    <option value="thailand">Thailand</option>
                    <option value="hungary">Hungary</option>
                    <option value="poland">Poland</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="px-7 py-3.5 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-navy-light transition-all duration-300 whitespace-nowrap tracking-wide"
                >
                  Search Clinics
                </button>
              </form>
            </motion.div>

            {/* Popular searches */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-2 mt-6"
            >
              <span className="text-xs text-navy/25 font-medium uppercase tracking-widest">Popular</span>
              <span className="text-navy/10 mx-1">|</span>
              {POPULAR_SEARCHES.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3.5 py-1.5 text-xs text-navy/40 border border-navy/[0.06] rounded-full hover:border-gold/30 hover:text-gold-dark transition-all duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Right - Medical Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              {heroImages.map((img, i) => (
                <motion.div
                  key={img.alt}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className={`relative rounded-2xl overflow-hidden group ${
                    i === 0 ? 'row-span-2 h-full min-h-[320px]' : 'h-40'
                  }`}
                >
                  <div className="absolute inset-0 bg-navy/20" />
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading={i < 2 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-white text-xs font-semibold tracking-wide bg-navy/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                      {img.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating trust badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-3 shadow-lg border border-navy/[0.04] flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">100% Verified</p>
                <p className="text-[11px] text-navy/40">All clinics accreditation-checked</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
