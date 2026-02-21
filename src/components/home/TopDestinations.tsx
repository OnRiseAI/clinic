'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'

const destinations = [
  {
    country: 'Turkey',
    city: 'Istanbul',
    slug: 'turkey',
    flag: '\u{1F1F9}\u{1F1F7}',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=500&fit=crop&auto=format&q=80',
    specialties: ['Dental', 'Hair Transplant', 'Cosmetic'],
    clinics: 320,
    startingPrice: '\u20AC280',
  },
  {
    country: 'Hungary',
    city: 'Budapest',
    slug: 'hungary',
    flag: '\u{1F1ED}\u{1F1FA}',
    image: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800&h=500&fit=crop&auto=format&q=80',
    specialties: ['Dental', 'Orthopedics', 'Fertility'],
    clinics: 145,
    startingPrice: '\u20AC350',
  },
  {
    country: 'Mexico',
    city: 'Canc\u00FAn',
    slug: 'mexico',
    flag: '\u{1F1F2}\u{1F1FD}',
    image: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=800&h=500&fit=crop&auto=format&q=80',
    specialties: ['Dental', 'Bariatric', 'Cosmetic'],
    clinics: 210,
    startingPrice: '\u20AC350',
  },
  {
    country: 'Spain',
    city: 'Barcelona',
    slug: 'spain',
    flag: '\u{1F1EA}\u{1F1F8}',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=500&fit=crop&auto=format&q=80',
    specialties: ['Fertility', 'Dental', 'Cosmetic'],
    clinics: 178,
    startingPrice: '\u20AC400',
  },
  {
    country: 'Poland',
    city: 'Warsaw',
    slug: 'poland',
    flag: '\u{1F1F5}\u{1F1F1}',
    image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=800&h=500&fit=crop&auto=format&q=80',
    specialties: ['Dental', 'Cosmetic', 'Orthopedics'],
    clinics: 120,
    startingPrice: '\u20AC300',
  },
]

export function TopDestinations() {
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
            Global Coverage
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-navy mb-5">
            Medical Travel{' '}
            <span className="text-teal-600">Destinations</span>
          </h2>
          <p className="text-navy/60 max-w-lg mx-auto leading-relaxed font-light">
            Browse accredited clinics across established medical destinations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((dest, i) => {
            // Bento Grid Layout Classes
            const bentoClasses = [
              'md:col-span-2 md:row-span-2 h-[400px] md:h-[624px]', // Turkey - Massive Hero
              'md:col-span-1 md:row-span-1 h-[300px]', // Hungary - Square
              'md:col-span-1 md:row-span-1 h-[300px]', // Mexico - Square
              'md:col-span-1 md:row-span-1 h-[300px]', // Spain - Square
              'md:col-span-2 md:row-span-1 h-[300px]', // Poland - Wide
            ]

            return (
              <DestinationCard 
                key={dest.slug} 
                dest={dest} 
                index={i} 
                className={bentoClasses[i]} 
              />
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-navy-light transition-all duration-300 tracking-wide"
          >
            Explore All Destinations
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

function DestinationCard({ 
  dest, 
  index,
  className = "h-72" 
}: { 
  dest: (typeof destinations)[number]; 
  index: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      <Link
        href={`/destinations/${dest.slug}`}
        className="group block relative rounded-2xl overflow-hidden h-full shadow-[0_8px_30px_rgba(15,27,45,0.04)] ring-1 ring-slate-900/5 border border-transparent transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,27,45,0.08)] hover:border-gold/30"
      >
        <Image
          src={dest.image}
          alt={`${dest.country} - ${dest.city}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{dest.flag}</span>
            <h3 className="text-xl font-bold text-white">{dest.country}</h3>
          </div>
          <p className="text-white/60 text-sm mb-3">{dest.city}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {dest.specialties.map((spec) => (
              <span
                key={spec}
                className="px-2.5 py-0.5 text-[10px] font-semibold text-white/90 bg-white/15 rounded-full backdrop-blur-sm uppercase tracking-wider"
              >
                {spec}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
              </svg>
              <span>{dest.clinics} providers</span>
            </div>
            <span className="text-white/70 font-medium text-sm">from {dest.startingPrice}</span>
            <svg className="w-5 h-5 text-white/50 group-hover:text-gold group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
