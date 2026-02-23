'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { CheckCircle2, Globe2, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ComingSoonPlaceholderProps {
  type: 'destination' | 'category'
  name: string
  subtitleText?: string
}

export function ComingSoonPlaceholder({ type, name, subtitleText }: ComingSoonPlaceholderProps) {
  const isDest = type === 'destination'
  const titlePrefix = isDest ? 'World-Class Care in' : 'World-Class'
  
  const defaultSubtitle = isDest
    ? `We are currently vetting the top clinics and specialists in ${name} to ensure they meet our rigorous VisQuanta Gold Standard™ for safety, quality, and patient care.`
    : `We are currently vetting the top ${name.toLowerCase()} clinics to ensure they meet our rigorous VisQuanta Gold Standard™ for safety, quality, and patient care.`

  const subtitle = subtitleText || defaultSubtitle

  return (
    <div className="relative min-h-[80vh] flex items-center bg-[#fafafa] overflow-hidden pt-20 pb-24">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(15, 27, 45, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 27, 45, 0.05) 1px, transparent 1px)', 
          backgroundSize: '40px 40px',
          backgroundPosition: '-1px -1px' 
        }} 
      />
      
      {/* Subtle Glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold-dark text-xs font-bold uppercase tracking-wider mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Coming Soon to {name}
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-navy mb-6 leading-[1.1]">
              {titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark via-gold to-gold-light">{name}</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-navy/60 leading-relaxed font-light mb-10">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/list-your-clinic" className="inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-14 px-8 text-base bg-navy hover:bg-navy-light text-white rounded-xl shadow-[0_8px_20px_rgba(15,27,45,0.15)] hover:shadow-[0_15px_30px_rgba(15,27,45,0.2)] hover:-translate-y-0.5">
                  List Your Clinic <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link href={isDest ? "/clinics" : "/destinations"} className="inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-14 px-8 text-base border border-navy/10 hover:border-navy/20 hover:bg-navy/5 text-navy rounded-xl">
                  Explore Active {isDest ? "Destinations" : "Treatments"}
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-8 border-t border-navy/5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy text-sm">Vetted Clinics</h4>
                  <p className="text-xs text-navy/50 mt-0.5">Rigorous 50-point inspection</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Globe2 className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy text-sm">Local Experts</h4>
                  <p className="text-xs text-navy/50 mt-0.5">Multilingual support teams</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-lg"
          >
            {/* The Browser Window Mockup */}
            <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(15,27,45,0.08)] border border-navy/[0.03] overflow-hidden">
              {/* Browser Header */}
              <div className="px-4 py-3 border-b border-navy/[0.03] flex items-center gap-1.5 bg-neutral-50/50">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <div className="ml-auto w-24 h-2 rounded-full bg-navy/[0.03]" />
              </div>
              
              {/* Browser Body Skeleton */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Title Skeleton */}
                <div className="w-3/4 h-8 bg-navy/5 rounded-lg" />
                
                {/* Cards Skeleton */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 rounded-xl bg-navy/[0.02] border border-navy/[0.03]" />
                  <div className="h-32 rounded-xl bg-navy/[0.02] border border-navy/[0.03]" />
                </div>
                
                {/* Text Skeleton */}
                <div className="space-y-3 pt-4">
                  <div className="w-full h-3 bg-navy/[0.02] rounded-full" />
                  <div className="w-5/6 h-3 bg-navy/[0.02] rounded-full" />
                  <div className="w-4/6 h-3 bg-navy/[0.02] rounded-full" />
                </div>
                
                {/* Bottom Avatars Skeleton */}
                <div className="flex gap-2 pt-6">
                  <div className="w-8 h-8 rounded-full bg-navy/[0.03]" />
                  <div className="w-8 h-8 rounded-full bg-navy/[0.03]" />
                  <div className="w-8 h-8 rounded-full bg-navy/[0.03]" />
                </div>
              </div>
            </div>

            {/* Floating Status Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 sm:bottom-8 sm:-right-8 bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-[0_20px_40px_rgba(15,27,45,0.1)] border border-white flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-gold-dark" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-navy/40 uppercase tracking-widest mb-0.5">{isDest ? "Destination" : "Category"} Status</p>
                <p className="font-bold text-navy text-sm">Vetting In Progress</p>
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </div>
  )
}
