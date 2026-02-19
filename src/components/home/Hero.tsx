'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ArrowRight, CheckCircle2, Globe2, MapPin } from 'lucide-react'

// Variants for restrained, premium motion
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } }
}

const mapLineVariant = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 0.35, transition: { duration: 2, ease: 'easeInOut' as const, delay: 0.5 } }
}

const nodeVariant = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' as const } }
}

export function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-navy text-white selection:bg-gold/30 selection:text-white">
      {/* 
        BACKGROUND SYSTEM 
        - Deep Navy Base
        - Architectural Grid
        - Faint World Map 
      */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-[#0F1B2D] to-[#0A121E]" />

        {/* Architectural Grid */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Ambient Glows - Highly Restrained */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 opacity-30 mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-20 mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32 lg:py-44">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center">

          {/* LEFT COLUMN: Messaging Hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start max-w-2xl">

            {/* Headline */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <h1 className="font-serif text-[3rem] sm:text-[3.5rem] md:text-[4.5rem] leading-[1.0] tracking-tight text-white mb-6">
                Make Confident <br />
                <span className="text-white relative inline-block pb-1">
                  Medical Decisions
                  {/* Subtle Underline */}
                  <span className="absolute bottom-1.5 left-0 w-full h-[1px] bg-gradient-to-r from-gold/30 to-transparent opacity-40" />
                </span>
              </h1>
              <p className="text-white/30 font-serif text-3xl md:text-4xl mt-0 mb-10 tracking-tight">
                Globally.
              </p>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="text-lg text-cream/70 leading-relaxed font-light max-w-lg mb-12 pl-6 border-l border-white/10"
            >
              We connect you with leading international clinics, verified standards, and transparent comparisons — structured in one place.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 w-full sm:w-auto mb-20"
            >
              <Link
                href="/clinics"
                className="group relative px-8 py-3.5 bg-gold hover:bg-gold-dark text-navy font-bold text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden shadow-lg shadow-gold/5 rounded-sm"
              >
                <span>EXPLORE VERIFIED CLINICS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/how-it-works"
                className="group px-6 py-3 bg-transparent text-white/60 hover:text-white font-medium text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
              >
                How It Works
              </Link>
            </motion.div>

            {/* Trust Indicators - Architectural Layout */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="pt-10 border-t border-white/10 w-full flex items-center gap-10 md:gap-14"
            >
              <div className="flex items-center gap-4">
                <Globe2 className="w-5 h-5 text-teal/40" />
                <div className="flex flex-col">
                  <span className="text-white font-serif text-xl leading-none">20+</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-[0.15em] mt-1.5 font-bold">Global Markets</span>
                </div>
              </div>

              <div className="w-px h-10 bg-white/15" />

              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-5 h-5 text-gold/40" />
                <div className="flex flex-col">
                  <span className="text-white font-serif text-xl leading-none">100%</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-[0.15em] mt-1.5 font-bold">Verified Network</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Global Network Visual */}
          <div className="lg:col-span-5 relative h-[650px] w-full hidden lg:block perspective-[2500px]">
            <div className="relative w-full h-full transform-style-3d rotate-y-[-6deg] rotate-x-[3deg]">

              {/* World Map Hint - Increased Presence */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none translate-z-[-60px]">
                <svg width="130%" height="130%" viewBox="0 0 1000 500">
                  <path d="M150,200 Q250,150 400,200 T700,180 T900,250" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M100,300 Q300,350 500,300 T800,320" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M200,100 T500,120 M700,400 T900,350" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
                </svg>
              </div>

              {/* SVG Connections Overlay - Sharper Definition */}
              <svg className="absolute inset-0 z-0 pointer-events-none w-full h-full text-white/40 overflow-visible">
                <motion.path
                  d="M120,130 Q250,200 350,280"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  variants={mapLineVariant}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path
                  d="M350,280 Q250,400 180,480"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  variants={mapLineVariant}
                  initial="hidden"
                  animate="visible"
                />
              </svg>

              {/* NODE 1: ISTANBUL */}
              <motion.div
                variants={nodeVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
                className="absolute top-[5%] left-[0%] w-56 aspect-[4/5] bg-navy-light rounded-sm overflow-hidden shadow-2xl border border-white/[0.04] group hover:z-30 transition-all duration-500"
                style={{ transform: 'translateZ(30px)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent z-10" />
                <Image
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=500&fit=crop&q=80"
                  alt="Istanbul Clinic"
                  fill
                  className="object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-700 grayscale-[40%]"
                />
                <div className="absolute bottom-5 left-5 z-20">
                  <div className="flex items-center gap-2 mb-2 opacity-60">
                    <MapPin className="w-3 h-3 text-gold" />
                    <p className="text-[9px] text-white tracking-[0.2em] font-bold uppercase">Istanbul</p>
                  </div>
                  <p className="text-sm text-white/80 font-serif leading-tight">Advanced Dental<br />Center</p>
                </div>
              </motion.div>

              {/* NODE 2: BARCELONA - Refined Dominance */}
              <motion.div
                variants={nodeVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.7 }}
                className="absolute top-[20%] right-[-5%] w-72 aspect-[3/4] bg-navy-light rounded-sm overflow-hidden shadow-2xl shadow-black/50 border border-white/[0.04] z-20 group hover:scale-[1.01] transition-transform duration-500"
                style={{ transform: 'translateZ(60px)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent z-10" />
                <Image
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=700&fit=crop&q=80"
                  alt="Barcelona Institute"
                  fill
                  className="object-cover opacity-50 group-hover:opacity-75 transition-opacity duration-700 grayscale-[25%]"
                />
                <div className="absolute bottom-8 left-8 z-20">
                  <div className="flex items-center gap-2 mb-2.5 opacity-70">
                    <MapPin className="w-3.5 h-3.5 text-teal" />
                    <p className="text-[10px] text-white tracking-[0.25em] font-bold uppercase">Barcelona</p>
                  </div>
                  <p className="text-2xl text-white font-serif leading-tight">Fertility<br />Specialists</p>
                  <div className="w-8 h-px bg-gold/30 mt-4" />
                </div>
              </motion.div>

              {/* NODE 3: MEXICO CITY */}
              <motion.div
                variants={nodeVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.9 }}
                className="absolute bottom-[5%] left-[15%] w-52 aspect-square bg-navy-light rounded-sm overflow-hidden shadow-2xl border border-white/[0.04] group transition-all duration-500"
                style={{ transform: 'translateZ(40px)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent z-10" />
                <Image
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=400&fit=crop&q=80"
                  alt="Facility Room"
                  fill
                  className="object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-700 grayscale-[40%]"
                />
                <div className="absolute bottom-5 left-5 z-20">
                  <div className="flex items-center gap-2 mb-1.5 opacity-60">
                    <MapPin className="w-3 h-3 text-white/40" />
                    <p className="text-[9px] text-white tracking-[0.2em] font-bold uppercase">Mexico City</p>
                  </div>
                  <p className="text-xs text-white/70 font-serif">Regenerative<br />Surgery Unit</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
