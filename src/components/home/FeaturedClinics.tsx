'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'

const featuredClinics = [
  {
    name: 'Istanbul Smile Center',
    slug: 'istanbul-smile-center',
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
    slug: 'budapest-dental-clinic',
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
    slug: 'estethica-medical-group',
    category: 'cosmetic-surgery',
    location: 'Istanbul, Turkey',
    rating: 4.9,
    reviews: 561,
    specialties: ['Hair Transplant', 'Rhinoplasty', 'Liposuction'],
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=250&fit=crop&auto=format&q=80',
    badge: 'Top Rated',
  },
  {
    name: 'Barcelona IVF Center',
    slug: 'barcelona-ivf-center',
    category: 'fertility',
    location: 'Barcelona, Spain',
    rating: 4.7,
    reviews: 198,
    specialties: ['IVF', 'Egg Freezing', 'Fertility Tests'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=250&fit=crop&auto=format&q=80',
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
            <p className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-4">
              Highly Rated
            </p>
            <h2 className="heading-serif text-3xl sm:text-4xl text-navy mb-3">
              Featured <span className="gradient-text">Clinics</span>
            </h2>
            <p className="text-navy/60 max-w-lg leading-relaxed">
              Hand-picked for excellence in care, patient satisfaction, and medical standards.
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredClinics.map((clinic, i) => (
            <motion.div
              key={clinic.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={`/clinics/${clinic.category}/${clinic.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-navy/[0.04] card-premium"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={clinic.image}
                    alt={clinic.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-teal text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {clinic.badge}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-navy mb-1 tracking-tight group-hover:text-gold-dark transition-colors">
                    {clinic.name}
                  </h3>
                  <p className="text-[11px] text-navy/60 mb-2">{clinic.location}</p>
                  <div className="flex items-center gap-1 mb-3">
                    <svg className="w-3 h-3 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-semibold text-navy/60">{clinic.rating}</span>
                    <span className="text-xs text-navy/60">({clinic.reviews})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {clinic.specialties.slice(0, 2).map((spec) => (
                      <span key={spec} className="px-2 py-0.5 text-[10px] text-navy/40 bg-navy/[0.03] rounded-full">
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
