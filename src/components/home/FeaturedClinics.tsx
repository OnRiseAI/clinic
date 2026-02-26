'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'

const featuredClinics = [
  {
    name: 'Istanbul Smile Center',
    slug: 'hisar-hospital-intercontinental',
    category: 'dental',
    location: 'Istanbul, Turkey',
    rating: 4.9,
    reviews: 432,
    specialties: ['Dental Veneers', 'Implants', 'Whitening'],
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=250&fit=crop&auto=format&q=80',
    badge: 'JCI Accredited',
  },
  {
    name: 'Budapest Dental Clinic',
    slug: 'hairline-clinic',
    category: 'dental',
    location: 'Budapest, Hungary',
    rating: 4.8,
    reviews: 287,
    specialties: ['Dental Implants', 'Crowns', 'Bridges'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop&auto=format&q=80',
    badge: 'ISO 9001',
  },
  {
    name: 'Estethica Medical Group',
    slug: 'istanbul-aesthetics-center',
    category: 'cosmetic-surgery',
    location: 'Istanbul, Turkey',
    rating: 4.9,
    reviews: 561,
    specialties: ['Hair Transplant', 'Rhinoplasty', 'Liposuction'],
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=250&fit=crop&auto=format&q=80',
    badge: 'Top Rated',
  },
  {
    name: 'KCM Clinic',
    slug: 'clinic-center',
    category: 'bariatric-surgery',
    location: 'Warsaw, Poland',
    rating: 4.9,
    reviews: 843,
    specialties: ['Bariatric Surgery', 'Orthopedics', 'Plastic Surgery'],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=250&fit=crop&auto=format&q=80',
    badge: 'Verified',
  },
]

export function FeaturedClinics() {
  return (
    <section className="py-24 sm:py-32 relative border-y border-navy/[0.04]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6"
        >
          <div>
            <p className="text-xs font-bold text-navy/40 uppercase tracking-[0.2em] mb-4">
              Verified Listings
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy mb-3">
              Selected <span className="text-gold-dark">Providers</span>
            </h2>
            <p className="text-navy/60 max-w-lg leading-relaxed font-light">
              Verified for accreditation, medical standards, and patient safety protocols.
            </p>
          </div>
          <Link
            href="/clinics"
            className="group flex items-center gap-2 font-semibold text-gold-dark hover:text-gold transition-colors"
          >
            View all featured clinics
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Spotlight Clinic (First Item) */}
          {featuredClinics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-3"
            >
              <Link
                href={`/clinics/${featuredClinics[0].category}/${featuredClinics[0].slug}`}
                className="group flex flex-col md:flex-row bg-navy rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(15,27,45,0.12)] border border-white/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(15,27,45,0.2)] hover:border-gold/30"
              >
                <div className="relative w-full md:w-1/2 lg:w-3/5 h-64 md:h-auto overflow-hidden">
                  <Image
                    src={featuredClinics[0].image}
                    alt={featuredClinics[0].name}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-navy via-navy/50 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-gold text-navy text-[11px] font-bold rounded-sm uppercase tracking-wider shadow-lg shadow-black/20">
                    Clinic of the Month
                  </div>
                </div>
                
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-center bg-navy text-white relative">
                  <div className="absolute top-8 right-8 px-3 py-1 border border-white/10 text-white/70 text-[10px] font-semibold rounded-sm uppercase tracking-wider">
                    {featuredClinics[0].badge}
                  </div>
                  
                  <div className="flex items-center gap-1.5 mb-4">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-semibold text-white">{featuredClinics[0].rating}</span>
                    <span className="text-sm text-white/50">({featuredClinics[0].reviews} verified reviews)</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 group-hover:text-gold transition-colors">
                    {featuredClinics[0].name}
                  </h3>
                  <p className="text-white/60 mb-6 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {featuredClinics[0].location}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featuredClinics[0].specialties.map((spec) => (
                      <span key={spec} className="px-3 py-1 text-xs font-medium text-white/80 bg-white/10 rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wide">
                    View Clinic Profile
                    <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Standard Clinic Cards */}
          {featuredClinics.slice(1).map((clinic, i) => (
            <motion.div
              key={clinic.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: (i + 1) * 0.1,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={`/clinics/${clinic.category}/${clinic.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(15,27,45,0.04)] ring-1 ring-slate-900/5 border border-transparent transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,27,45,0.08)] hover:border-gold/30"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={clinic.image}
                    alt={clinic.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-navy text-[10px] font-semibold rounded-sm uppercase tracking-wider border border-navy/5">
                    {clinic.badge}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-navy mb-1 tracking-tight group-hover:text-gold-dark transition-colors">
                    {clinic.name}
                  </h3>
                  <p className="text-[11px] text-navy/60 mb-3">{clinic.location}</p>
                  <div className="flex items-center gap-1 mb-4">
                    <svg className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-semibold text-navy/60">{clinic.rating}</span>
                    <span className="text-xs text-navy/60">({clinic.reviews})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {clinic.specialties.slice(0, 2).map((spec) => (
                      <span key={spec} className="px-2 py-0.5 text-[10px] font-medium text-navy/60 bg-navy/[0.03] rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
