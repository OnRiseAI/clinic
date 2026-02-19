'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'

const procedures = [
  {
    name: 'Dental Veneers',
    slug: 'veneers',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop&auto=format&q=80',
    fallbackGradient: 'from-sky-100 to-blue-50',
    icon: '\u{1F9B7}',
    startingPrice: '\u20AC280',
    rating: 4.9,
    reviews: 1240,
    clinics: 186,
    tag: 'Most Popular',
  },
  {
    name: 'Hair Transplant',
    slug: 'hair-transplant',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&h=400&fit=crop&auto=format&q=80',
    fallbackGradient: 'from-amber-50 to-orange-50',
    icon: '\u{1F487}',
    startingPrice: '\u20AC1,500',
    rating: 4.8,
    reviews: 892,
    clinics: 134,
    tag: 'Trending',
  },
  {
    name: 'Rhinoplasty',
    slug: 'rhinoplasty',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=400&fit=crop&auto=format&q=80',
    fallbackGradient: 'from-rose-50 to-pink-50',
    icon: '\u{1F443}',
    startingPrice: '\u20AC2,200',
    rating: 4.9,
    reviews: 567,
    clinics: 98,
  },
  {
    name: 'Breast Augmentation',
    slug: 'breast-augmentation',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop&auto=format&q=80',
    fallbackGradient: 'from-purple-50 to-violet-50',
    icon: '\u{1F3E5}',
    startingPrice: '\u20AC2,800',
    rating: 4.7,
    reviews: 423,
    clinics: 76,
  },
  {
    name: 'Weight Loss Surgery',
    slug: 'bariatric-surgery',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&auto=format&q=80',
    fallbackGradient: 'from-green-50 to-emerald-50',
    icon: '\u2696\uFE0F',
    startingPrice: '\u20AC3,500',
    rating: 4.8,
    reviews: 312,
    clinics: 64,
  },
  {
    name: 'IVF Treatment',
    slug: 'ivf',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&h=400&fit=crop&auto=format&q=80',
    fallbackGradient: 'from-teal-50 to-cyan-50',
    icon: '\u{1F476}',
    startingPrice: '\u20AC3,000',
    rating: 4.9,
    reviews: 278,
    clinics: 52,
  },
]

function Stars({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-gold' : 'text-navy/10'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-xs font-semibold text-navy/60">{rating}</span>
      <span className="text-xs text-navy/60">({reviews})</span>
    </div>
  )
}

export function PopularProcedures() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold text-navy/40 uppercase tracking-[0.2em] mb-4">
            Treatment Directory
          </p>
          <h2 className="heading-serif text-3xl sm:text-4xl md:text-5xl text-navy mb-5">
            Common <span className="text-teal-600">Procedures</span>
          </h2>
          <p className="text-navy/60 max-w-lg mx-auto leading-relaxed font-light">
            Compare accredited providers by treatment type and destination.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {procedures.map((proc, i) => (
            <motion.div
              key={proc.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={`/procedures/${proc.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-navy/[0.04] card-premium"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${proc.fallbackGradient}`} />
                  <Image
                    src={proc.image}
                    alt={proc.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />

                  {proc.tag && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-navy text-[11px] font-semibold rounded-sm uppercase tracking-wider border border-navy/5">
                      {proc.tag}
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-lg">
                    {proc.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-navy mb-2 tracking-tight group-hover:text-gold-dark transition-colors">
                    {proc.name}
                  </h3>

                  <Stars rating={proc.rating} reviews={proc.reviews} />

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-navy/[0.04]">
                    <div>
                      <p className="text-[10px] text-navy/40 uppercase tracking-wider mb-0.5">Guide Price From</p>
                      <p className="text-lg font-bold text-teal-700">{proc.startingPrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-navy/40 uppercase tracking-wider mb-0.5">Providers</p>
                      <p className="text-sm font-semibold text-navy">{proc.clinics}+</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gold-dark group-hover:text-gold transition-colors">
                    View Clinics
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/clinics"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-navy-light transition-all duration-300 tracking-wide"
          >
            Browse All Treatments
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
