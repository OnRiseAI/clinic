'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ArrowRight, CheckCircle2, Globe2, Star, ShieldCheck, MapPin, BadgeCheck, Building2 } from 'lucide-react'

// Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } }
}

const floatAnimation1 = {
  hidden: { y: 0 },
  visible: { y: [-15, 10, -15], transition: { duration: 6, ease: 'easeInOut' as const, repeat: Infinity } }
}

const floatAnimation2 = {
  hidden: { y: 0 },
  visible: { y: [10, -15, 10], transition: { duration: 7, ease: 'easeInOut' as const, repeat: Infinity } }
}

// Rotation Data using listed clinics
const clinicsData = [
  {
    id: 'clinic-center',
    clinicName: 'Clinic Center',
    specialty: 'Hair Restoration',
    experience: '11+ Years',
    reviews: '450+',
    rating: 4.8,
    location: 'Istanbul, Turkey',
    hubText: 'Top Global Agency',
    savings: 'Save up to 70%',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&q=80',
    bgImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80',
    iconColor: 'text-gold',
    iconBg: 'bg-gold/20',
    borderColor: 'border-gold/50'
  },
  {
    id: 'istanbul-aesthetics',
    clinicName: 'Istanbul Aesthetics Center',
    specialty: 'Cosmetic Surgery',
    experience: '4,000+ Patients',
    reviews: '451',
    rating: 4.8,
    location: 'Istanbul, Turkey',
    hubText: 'Premium Surgery Hub',
    savings: 'Save up to 60%',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&q=80',
    bgImage: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1600&q=80',
    iconColor: 'text-teal-400',
    iconBg: 'bg-teal-500/20',
    borderColor: 'border-teal-400/50'
  },
  {
    id: 'hisar-hospital',
    clinicName: 'Hisar Intercontinental',
    specialty: 'Multi-Specialty',
    experience: 'JCI Accredited',
    reviews: '1,200+',
    rating: 4.9,
    location: 'Istanbul, Turkey',
    hubText: 'World-Class Hospital',
    savings: 'Save up to 55%',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&q=80',
    bgImage: '/images/hisar-hospital-new.jpeg',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/20',
    borderColor: 'border-blue-400/50'
  },
  {
    id: 'budapest-dental',
    clinicName: 'Budapest Dental Clinic',
    specialty: 'Dental Implants',
    experience: '20+ Years',
    reviews: '287',
    rating: 4.8,
    location: 'Budapest, Hungary',
    hubText: "Europe's Dental Capital",
    savings: 'Save up to 65%',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&q=80',
    bgImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1600&q=80',
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-500/20',
    borderColor: 'border-indigo-400/50'
  },
  {
    id: 'hairline-clinic',
    clinicName: 'Hairline Clinic',
    specialty: 'FUE & DHI Transplants',
    experience: '15+ Years',
    reviews: '312',
    rating: 4.9,
    location: 'Ankara, Turkey',
    hubText: 'Specialized Hair Center',
    savings: 'Save up to 75%',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&q=80',
    bgImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1600&q=80',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/20',
    borderColor: 'border-amber-400/50'
  },
  {
    id: 'bcn-cosmetic',
    clinicName: 'Premium Clinic Spain',
    specialty: 'Cosmetic Surgery',
    experience: 'Top Rated',
    reviews: '198',
    rating: 4.7,
    location: 'Madrid, Spain',
    hubText: 'Luxury Medical Care',
    savings: 'Save up to 40%',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=200&h=200&fit=crop&q=80',
    bgImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&q=80',
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-500/20',
    borderColor: 'border-rose-400/50'
  }
]

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % clinicsData.length)
    }, 4500) // Rotate every 4.5 seconds
    return () => clearInterval(interval)
  }, [])

  const activeData = clinicsData[currentIndex]

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-navy text-white selection:bg-gold/30 selection:text-white">

      {/* BACKGROUND SYSTEM */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-[#0F1B2D] to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent z-10" />

        {/* Blurred Medical Background with Crossfade */}
        <div className="absolute right-0 top-0 w-[70%] h-full opacity-30 mix-blend-luminosity overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeData.bgImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={activeData.bgImage}
                alt="Premium Medical Facility"
                fill
                className="object-cover blur-[8px] grayscale-[30%]"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-28 pb-16 lg:py-44">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 flex flex-col items-start max-w-2xl">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <h1 className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] font-bold tracking-tight leading-[1.05] text-white mb-6">
                Make Confident <br />
                <span className="text-white relative inline-block pb-1">
                  Medical Decisions
                  <span className="absolute bottom-1.5 left-0 w-full h-[1px] bg-gradient-to-r from-gold/30 to-transparent opacity-40" />
                </span>
              </h1>
              <p className="text-white/30 font-bold text-3xl md:text-4xl mt-0 mb-10 tracking-tight">Globally.</p>
            </motion.div>

            <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="text-lg text-cream/70 leading-relaxed font-light max-w-lg mb-12 pl-6 border-l border-gold/40">
              We connect you with leading international clinics, verified standards, and transparent comparisons — structured in one place.
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 w-full sm:w-auto mb-12 lg:mb-20">
              <Link href="/clinics" className="group relative px-8 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden shadow-lg shadow-teal-600/20 rounded-sm">
                <span>EXPLORE VERIFIED CLINICS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className="pt-8 sm:pt-10 border-t border-white/10 w-full flex flex-wrap items-center gap-8 sm:gap-10 md:gap-14">
              <div className="flex items-center gap-4">
                <Globe2 className="w-5 h-5 text-teal/40" />
                <div className="flex flex-col">
                  <span className="text-white font-bold tracking-tight text-xl leading-none">20+</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-[0.15em] mt-1.5 font-bold">Global Markets</span>
                </div>
              </div>
              <div className="w-px h-10 bg-white/15" />
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-5 h-5 text-gold/40" />
                <div className="flex flex-col">
                  <span className="text-white font-bold tracking-tight text-xl leading-none">100%</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-[0.15em] mt-1.5 font-bold">Verified Network</span>
                </div>
              </div>
            </motion.div>

            {/* MOBILE ONLY: Active Clinic Card Snapshot */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="lg:hidden w-full mt-12 relative z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-navy/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${activeData.iconBg} rounded-bl-full opacity-20 blur-2xl`} />

                  <div className="flex items-start gap-4 mb-4 relative z-10">
                    <div className={`relative w-16 h-16 rounded-full overflow-hidden border-2 ${activeData.borderColor} shrink-0`}>
                      <Image src={activeData.image} alt={activeData.clinicName} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-bold text-lg leading-tight mb-1 pr-8">{activeData.clinicName}</p>
                      <p className={`${activeData.iconColor} text-sm flex items-center gap-1.5 font-medium`}>
                        <MapPin className="w-3.5 h-3.5" /> {activeData.location}
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 bg-gold/10 text-gold text-[10px] px-2 py-1 rounded font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-gold" /> {activeData.rating}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 mt-2 relative z-10">
                    <div>
                      <span className="text-white/50 text-[10px] uppercase tracking-wider font-bold block mb-1">Specialty</span>
                      <span className="text-white text-sm font-medium">{activeData.specialty}</span>
                    </div>
                    <div>
                      <span className="text-white/50 text-[10px] uppercase tracking-wider font-bold block mb-1">Pricing vs UK</span>
                      <span className={`${activeData.iconColor} text-sm font-bold`}>{activeData.savings}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Floating UI Elements */}
          <div className="lg:col-span-5 relative h-[650px] w-full hidden lg:block perspective-[2000px]">
            <div className="relative w-full h-full transform-style-3d rotate-y-[-10deg] rotate-x-[5deg]">

              {/* Central Clinic Profile Card */}
              <motion.div
                variants={floatAnimation1}
                initial="hidden"
                animate="visible"
                className="absolute top-[20%] right-[10%] w-72 bg-navy/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 z-30 min-h-[195px] overflow-hidden"
                style={{ transform: 'translateZ(60px)' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeData.id}
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4 }}
                    className="p-5"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`relative w-12 h-12 rounded-full overflow-hidden border-2 ${activeData.borderColor}`}>
                          <Image src={activeData.image} alt={activeData.clinicName} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm leading-tight">{activeData.clinicName}</p>
                          <p className={`${activeData.iconColor} text-xs flex items-center gap-1 mt-0.5`}>
                            <Building2 className="w-3 h-3" /> Verified Partner
                          </p>
                        </div>
                      </div>
                      <div className="bg-gold/10 text-gold text-[10px] px-2 py-1 rounded font-bold flex items-center gap-1 shrink-0">
                        <Star className="w-3 h-3 fill-gold" /> {activeData.rating}
                      </div>
                    </div>
                    <div className="space-y-2 border-t border-white/5 pt-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-white/50">Specialty</span>
                        <span className="text-white font-medium">{activeData.specialty}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/50">Experience</span>
                        <span className="text-white font-medium">{activeData.experience}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/50">Verified Reviews</span>
                        <span className="text-white font-medium">{activeData.reviews}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Location & Savings Tag */}
              <motion.div
                variants={floatAnimation2}
                initial="hidden"
                animate="visible"
                className="absolute bottom-[25%] left-[5%] w-64 bg-teal-900/40 backdrop-blur-xl border border-teal-500/30 rounded-xl shadow-xl z-20 min-h-[105px] overflow-hidden"
                style={{ transform: 'translateZ(40px)' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeData.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.4 }}
                    className="p-4"
                  >
                    <div className="flex items-center gap-3 mb-2 border-b border-teal-500/20 pb-2">
                      <div className={`w-8 h-8 rounded-full ${activeData.iconBg} flex items-center justify-center`}>
                        <MapPin className={`w-4 h-4 ${activeData.iconColor}`} />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">{activeData.location}</p>
                        <p className="text-teal-200 text-xs opacity-80">{activeData.hubText}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-white/60 uppercase tracking-wider font-bold">Pricing vs UK</span>
                      <span className={`${activeData.iconColor} font-bold text-sm`}>{activeData.savings}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Accreditation Badge (Static) */}
              <motion.div
                variants={floatAnimation1}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
                className="absolute top-[10%] left-[15%] bg-navy-light/90 backdrop-blur-md border border-gold/30 rounded-full px-5 py-2.5 shadow-lg flex items-center gap-2 z-40"
                style={{ transform: 'translateZ(80px)' }}
              >
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span className="text-white text-xs font-bold tracking-wide">JCI Accredited Facility</span>
              </motion.div>

              {/* Feature Badge (Static) */}
              <motion.div
                variants={floatAnimation2}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1 }}
                className="absolute bottom-[15%] right-[5%] bg-blue-900/40 backdrop-blur-md border border-blue-400/30 rounded-full px-4 py-2 shadow-lg flex items-center gap-2 z-40"
                style={{ transform: 'translateZ(50px)' }}
              >
                <BadgeCheck className="w-4 h-4 text-blue-400" />
                <span className="text-white text-xs font-bold tracking-wide">Direct Clinic Booking</span>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
