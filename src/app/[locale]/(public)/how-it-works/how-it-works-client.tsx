'use client'

import { m, useScroll, useTransform } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { 
  Search, 
  ShieldCheck, 
  MessageSquare, 
  ClipboardList, 
  Plane, 
  HeartPulse, 
  Star, 
  Globe, 
  Bot,
  ArrowRight,
  CheckCircle2,
  FileText
} from 'lucide-react'
import { useRef } from 'react'

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
}

const slideInLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
}

const slideInRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
}

// =============================================================================
// DATA & MOCKUPS
// =============================================================================

const STEPS = [
  {
    number: '01',
    title: 'Discover & Search',
    description: 'Browse our curated selection of internationally accredited clinics. Use advanced filters to find the perfect match for your specific medical needs, destination preferences, and budget constraints.',
    icon: Search,
    iconColor: 'text-blue-600',
  },
  {
    number: '02',
    title: 'Compare Options',
    description: 'Review detailed clinic profiles, verified patient reviews, and transparent pricing models side-by-side. See real before-and-after photos and verify doctor credentials before making a choice.',
    icon: ShieldCheck,
    iconColor: 'text-emerald-600',
  },
  {
    number: '03',
    title: 'Connect & Consult',
    description: 'Submit enquiries to multiple top-tier clinics simultaneously. Our 24/7 AI concierge and dedicated human team are available instantly to answer questions and facilitate consultations.',
    icon: MessageSquare,
    iconColor: 'text-purple-600',
  },
  {
    number: '04',
    title: 'Plan Your Treatment',
    description: 'Receive personalized treatment plans and itemized quotes directly from the clinics. They compete for your care, ensuring you get the absolute best offer without any hidden fees.',
    icon: ClipboardList,
    iconColor: 'text-amber-600',
  },
  {
    number: '05',
    title: 'Travel with Confidence',
    description: 'Book your treatment securely. Most of our partner clinics offer comprehensive VIP packages that include luxury accommodation, VIP airport transfers, and translation services.',
    icon: Plane,
    iconColor: 'text-teal-600',
  },
  {
    number: '06',
    title: 'Recover & Return',
    description: 'Enjoy your recovery knowing our team and your chosen clinic are just a message away for any follow-up needs. Your health records and warranties remain securely accessible.',
    icon: HeartPulse,
    iconColor: 'text-rose-600',
  },
]

// Custom UI Mockups for each step to give that $15k SaaS feel
const StepVisual = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return (
        <div className="relative aspect-square sm:aspect-auto sm:h-[450px] w-full rounded-[40px] bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200/60 p-8 overflow-hidden flex items-center justify-center group">
          <div className="w-full max-w-sm rounded-3xl bg-white shadow-2xl shadow-neutral-200/50 border border-neutral-100 p-6 transform transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2">
            <div className="flex items-center gap-4 border-b border-neutral-100 pb-5">
              <Search className="h-5 w-5 text-neutral-400" />
              <div className="h-3 w-1/2 bg-neutral-100 rounded-full" />
            </div>
            <div className="pt-5 flex flex-wrap gap-2">
              <div className="h-8 w-24 bg-blue-50 text-blue-600 rounded-full border border-blue-100 flex items-center justify-center text-xs font-medium">Dental</div>
              <div className="h-8 w-20 bg-neutral-50 text-neutral-400 rounded-full border border-neutral-100 flex items-center justify-center text-xs">Turkey</div>
              <div className="h-8 w-28 bg-neutral-50 text-neutral-400 rounded-full border border-neutral-100 flex items-center justify-center text-xs">Top Rated</div>
            </div>
            <div className="mt-8 space-y-4">
              <div className="h-16 w-full rounded-2xl bg-neutral-50 flex items-center px-4 gap-4">
                <div className="h-8 w-8 rounded-full bg-neutral-200" />
                <div className="space-y-2 flex-1">
                  <div className="h-2 w-1/3 bg-neutral-200 rounded-full" />
                  <div className="h-2 w-1/4 bg-neutral-200 rounded-full" />
                </div>
              </div>
              <div className="h-16 w-full rounded-2xl bg-neutral-50 flex items-center px-4 gap-4 opacity-50">
                <div className="h-8 w-8 rounded-full bg-neutral-200" />
                <div className="space-y-2 flex-1">
                  <div className="h-2 w-1/3 bg-neutral-200 rounded-full" />
                  <div className="h-2 w-1/4 bg-neutral-200 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-400/20 blur-[80px] rounded-full" />
        </div>
      )
    case 1:
      return (
        <div className="relative aspect-square sm:aspect-auto sm:h-[450px] w-full rounded-[40px] bg-[#0A1A2F] border border-neutral-800 p-8 overflow-hidden flex items-center justify-center group">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full" />
          
          {/* Card 1 (Back) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] w-72 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 transform -rotate-6 transition-transform duration-700 group-hover:-rotate-12 group-hover:-translate-x-[60%]">
            <div className="flex gap-4 items-center">
              <div className="h-12 w-12 rounded-2xl bg-white/10" />
              <div className="space-y-2 flex-1">
                <div className="h-3 w-3/4 bg-white/20 rounded-full" />
                <div className="h-2 w-1/2 bg-white/10 rounded-full" />
              </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <div className="h-6 w-16 bg-white/10 rounded-full" />
              <div className="flex gap-1 text-white/20"><Star size={14}/><Star size={14}/><Star size={14}/></div>
            </div>
          </div>

          {/* Card 2 (Front) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[35%] w-72 rounded-3xl bg-white shadow-2xl border border-neutral-200 p-6 transform rotate-3 transition-transform duration-700 group-hover:rotate-6 group-hover:-translate-x-[40%]">
            <div className="flex gap-4 items-center">
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600"><CheckCircle2 size={24}/></div>
              <div className="space-y-2 flex-1">
                <div className="h-3 w-3/4 bg-neutral-200 rounded-full" />
                <div className="h-2 w-1/2 bg-neutral-100 rounded-full" />
              </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <div className="h-6 w-20 bg-emerald-50 text-emerald-700 rounded-full text-xs flex items-center justify-center font-bold">99% Match</div>
              <div className="flex gap-1 text-yellow-400"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
            </div>
          </div>
        </div>
      )
    case 2:
      return (
        <div className="relative aspect-square sm:aspect-auto sm:h-[450px] w-full rounded-[40px] bg-purple-50 border border-purple-100/50 p-8 overflow-hidden flex flex-col justify-end group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/50 blur-[80px] rounded-full" />
          
          <div className="w-full max-w-sm mx-auto space-y-6 mb-4 relative z-10">
            {/* AI Bubble */}
            <div className="flex items-end gap-3 transform transition-transform duration-500 group-hover:-translate-y-2">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-lg"><Bot size={20}/></div>
              <div className="bg-white p-5 rounded-3xl rounded-bl-sm shadow-xl shadow-purple-900/5 border border-purple-100/50 w-4/5">
                <div className="h-2 w-full bg-neutral-100 rounded-full mb-3" />
                <div className="h-2 w-4/5 bg-neutral-100 rounded-full mb-3" />
                <div className="h-2 w-2/3 bg-neutral-100 rounded-full" />
              </div>
            </div>
            {/* User Bubble */}
            <div className="flex items-end justify-end gap-3 transform transition-transform duration-500 delay-100 group-hover:-translate-y-2">
              <div className="bg-purple-600 p-5 rounded-3xl rounded-br-sm shadow-xl shadow-purple-900/10 w-3/4">
                <div className="h-2 w-full bg-purple-400/40 rounded-full mb-3" />
                <div className="h-2 w-3/4 bg-purple-400/40 rounded-full" />
              </div>
            </div>
            {/* Typing indicator */}
            <div className="flex items-center gap-1 pl-14 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
               <div className="w-2 h-2 rounded-full bg-purple-300 animate-bounce" />
               <div className="w-2 h-2 rounded-full bg-purple-300 animate-bounce delay-100" />
               <div className="w-2 h-2 rounded-full bg-purple-300 animate-bounce delay-200" />
            </div>
          </div>
        </div>
      )
    case 3:
      return (
        <div className="relative aspect-square sm:aspect-auto sm:h-[450px] w-full rounded-[40px] bg-neutral-900 border border-neutral-800 p-8 overflow-hidden flex items-center justify-center group">
          <div className="absolute top-0 right-0 w-full h-full bg-transparent opacity-5" />
          
          <div className="w-full max-w-sm bg-neutral-800/80 backdrop-blur-md rounded-3xl border border-neutral-700 shadow-2xl p-8 relative z-10 transform transition-all duration-700 group-hover:scale-105 group-hover:border-amber-500/30">
            <div className="flex justify-between items-start mb-8">
              <div className="h-10 w-10 bg-amber-500/20 text-amber-500 rounded-xl flex items-center justify-center"><FileText size={20}/></div>
              <div className="h-6 w-20 bg-neutral-700 rounded-full" />
            </div>
            
            <div className="space-y-4 mb-8">
               <div className="flex justify-between items-center">
                 <div className="h-3 w-1/3 bg-neutral-600 rounded-full" />
                 <div className="h-3 w-16 bg-neutral-700 rounded-full" />
               </div>
               <div className="flex justify-between items-center">
                 <div className="h-3 w-1/2 bg-neutral-600 rounded-full" />
                 <div className="h-3 w-16 bg-neutral-700 rounded-full" />
               </div>
               <div className="flex justify-between items-center">
                 <div className="h-3 w-1/4 bg-neutral-600 rounded-full" />
                 <div className="h-3 w-16 bg-neutral-700 rounded-full" />
               </div>
            </div>
            
            <div className="pt-6 border-t border-neutral-700 flex justify-between items-center">
               <div className="h-4 w-1/4 bg-neutral-500 rounded-full" />
               <div className="h-6 w-1/3 bg-amber-500 rounded-full" />
            </div>
          </div>
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full" />
        </div>
      )
    case 4:
      return (
        <div className="relative aspect-square sm:aspect-auto sm:h-[450px] w-full rounded-[40px] bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100/50 p-8 overflow-hidden flex items-center justify-center group">
          {/* Flight Ticket Mockup */}
          <div className="w-full max-w-sm flex shadow-2xl shadow-teal-900/5 rounded-3xl transform transition-transform duration-700 group-hover:-translate-y-4">
            {/* Left side */}
            <div className="flex-1 bg-white p-6 rounded-l-3xl border border-neutral-100 border-r-0 relative">
               <div className="absolute right-0 top-0 bottom-0 w-px border-r-2 border-dashed border-neutral-200" />
               <div className="flex justify-between items-center mb-6">
                 <div>
                   <p className="text-xs text-neutral-400 font-medium">LHR</p>
                   <p className="text-2xl font-bold text-neutral-900">10:45</p>
                 </div>
                 <Plane className="text-teal-500 h-6 w-6" />
                 <div className="text-right">
                   <p className="text-xs text-neutral-400 font-medium">IST</p>
                   <p className="text-2xl font-bold text-neutral-900">16:30</p>
                 </div>
               </div>
               <div className="h-2 w-full bg-neutral-100 rounded-full mb-3" />
               <div className="h-2 w-2/3 bg-neutral-100 rounded-full" />
            </div>
            {/* Right side */}
            <div className="w-24 bg-teal-600 rounded-r-3xl p-6 flex flex-col justify-center items-center relative">
               <div className="absolute -left-3 top-[-12px] h-6 w-6 bg-cyan-50 rounded-full" />
               <div className="absolute -left-3 bottom-[-12px] h-6 w-6 bg-cyan-50 rounded-full" />
               <div className="w-8 h-8 border-2 border-teal-400 rounded-lg" />
            </div>
          </div>
          <div className="absolute inset-0 bg-transparent opacity-5 mix-blend-overlay" />
        </div>
      )
    case 5:
      return (
        <div className="relative aspect-square sm:aspect-auto sm:h-[450px] w-full rounded-[40px] bg-[#FAFAF7] border border-neutral-200/60 p-8 overflow-hidden flex items-center justify-center group">
          {/* Recovery ring mockup */}
          <div className="relative w-64 h-64 rounded-full border-[16px] border-neutral-100 flex items-center justify-center">
             <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
               <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-rose-500 stroke-[8px] transition-all duration-1000 ease-out" strokeDasharray="264" strokeDashoffset="60" />
             </svg>
             <div className="text-center transform transition-transform duration-500 group-hover:scale-110">
               <HeartPulse className="h-10 w-10 text-rose-500 mx-auto mb-2" />
               <p className="text-4xl font-bold text-neutral-900">100%</p>
               <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest mt-1">Recovered</p>
             </div>
          </div>
          <div className="absolute top-10 left-10 h-16 w-16 bg-rose-100 rounded-2xl transform rotate-12 group-hover:rotate-45 transition-transform duration-700" />
          <div className="absolute bottom-10 right-10 h-12 w-12 bg-blue-100 rounded-full transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-700" />
        </div>
      )
    default:
      return null
  }
}

export function HowItWorksClient() {
  return (
    <div className="bg-white">
      {/* ===================================================================
          SECTION A: IMMERSIVE HERO
          =================================================================== */}
      <section className="relative min-h-[75vh] flex flex-col items-center pt-32 sm:pt-48 pb-20 overflow-hidden bg-white">
        <div className="relative z-10 w-full max-w-[1000px] px-4 mx-auto text-center flex-1 flex flex-col items-center">
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex flex-col items-center w-full"
          >
            <div className="mb-10">
              <span className="inline-block py-1.5 px-4 rounded-full bg-[#FAFAFA] border border-[#E5E5E5] text-[#555555] text-xs font-semibold tracking-[0.15em] uppercase shadow-sm">
                HOW IT WORKS
              </span>
            </div>
            
            <h1 className="text-[64px] sm:text-[88px] lg:text-[110px] font-bold tracking-tighter text-[#111111] leading-[0.95] mb-8 w-full">
              Medical care, <br />
              <span className="text-[#a39e93]">without borders.</span>
            </h1>
            
            <p className="mt-6 text-[19px] sm:text-[22px] text-[#666666] max-w-[700px] mx-auto font-normal leading-[1.6] tracking-tight">
              Your complete journey to world-class healthcare abroad. <br className="hidden sm:block" />
              Hand-picked clinics, transparent pricing, and concierge <br className="hidden sm:block" />
              support at every step.
            </p>
          </m.div>
        </div>

        {/* Faint vertical line connecting to the next section */}
        <m.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 120, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="w-px bg-gradient-to-b from-transparent via-neutral-200 to-neutral-200 mt-16"
        />
      </section>

      {/* ===================================================================
          SECTION B: THE ZIG-ZAG TIMELINE
          =================================================================== */}
      <section id="steps" className="py-24 sm:py-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative bg-white">
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-neutral-100 hidden lg:block" />
        
        <div className="space-y-32 sm:space-y-48">
          {STEPS.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={step.number} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                
                {/* Text Content */}
                <m.div 
                  variants={isEven ? slideInLeft : slideInRight}
                  initial="initial"
                  whileInView="whileInView"
                  className="flex-1 relative w-full lg:w-1/2"
                >
                  <div className={`h-16 w-16 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-neutral-100 flex items-center justify-center mb-8 ${step.iconColor}`}>
                    <step.icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight mb-6 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-lg sm:text-xl text-[#71717A] leading-relaxed">
                    {step.description}
                  </p>
                </m.div>

                {/* Visual Mockup */}
                <m.div 
                  variants={isEven ? slideInRight : slideInLeft}
                  initial="initial"
                  whileInView="whileInView"
                  className="flex-1 w-full lg:w-1/2"
                >
                  <StepVisual index={index} />
                </m.div>

              </div>
            )
          })}
        </div>
      </section>

      {/* ===================================================================
          SECTION C: PREMIUM BENTO BOX (WHY CHOOSE US)
          =================================================================== */}
      <section className="py-32 bg-[#FAFAF7] relative border-t border-neutral-200/50">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
               The platform built <br className="hidden sm:block"/>for your peace of mind.
             </h2>
             <p className="mt-6 text-xl text-[#71717A]">Everything you need to travel for medical care with confidence.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Card 1 */}
             <m.div {...fadeInUp} className="rounded-[32px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-200/60 p-10 flex flex-col relative overflow-hidden group">
                <div className="relative z-10">
                   <ShieldCheck className="h-10 w-10 text-[#1A1A1A] mb-6" />
                   <h3 className="text-2xl font-bold text-[#1A1A1A] tracking-tight mb-4">Verified Clinics Only</h3>
                   <p className="text-[#71717A] leading-relaxed">Every clinic is rigorously vetted for international accreditation (JCI, ISO), doctor credentials, and proven patient outcomes.</p>
                </div>
             </m.div>

             {/* Card 2 */}
             <m.div {...fadeInUp} transition={{ delay: 0.1, duration: 0.8 }} className="rounded-[32px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-200/60 p-10 flex flex-col relative overflow-hidden group">
                <div className="relative z-10">
                   <div className="flex items-center gap-2 mb-6 text-[#1A1A1A]">
                     <span className="text-4xl font-bold tracking-tighter">50-70%</span>
                     <span className="text-sm font-medium uppercase tracking-widest">Savings</span>
                   </div>
                   <h3 className="text-2xl font-bold text-[#1A1A1A] tracking-tight mb-4">Unbeatable Value</h3>
                   <p className="text-[#71717A] leading-relaxed">Access world-class care at a fraction of local private healthcare costs, without compromising on quality or safety.</p>
                </div>
             </m.div>

             {/* Card 3 */}
             <m.div {...fadeInUp} transition={{ delay: 0.2, duration: 0.8 }} className="rounded-[32px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-200/60 p-10 flex flex-col relative overflow-hidden group">
                <div className="relative z-10">
                  <Globe className="h-10 w-10 text-[#1A1A1A] mb-6" />
                  <h3 className="text-2xl font-bold text-[#1A1A1A] tracking-tight mb-4">Global Network</h3>
                  <p className="text-[#71717A] leading-relaxed">Connect directly with top-rated medical facilities across major health tourism destinations including Turkey, Spain, Hungary, and Poland.</p>
                </div>
             </m.div>

             {/* Card 4 */}
             <m.div {...fadeInUp} transition={{ delay: 0.3, duration: 0.8 }} className="rounded-[32px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-200/60 p-10 flex flex-col relative overflow-hidden group">
                <div className="relative z-10">
                  <Bot className="h-10 w-10 text-[#1A1A1A] mb-6" />
                  <h3 className="text-2xl font-bold text-[#1A1A1A] tracking-tight mb-4">24/7 AI Concierge</h3>
                  <p className="text-[#71717A] leading-relaxed">Get instant answers about procedures, travel logistics, and clinic details from our intelligent medical travel assistant, day or night.</p>
                </div>
             </m.div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION D: MASSIVE CTA
          =================================================================== */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <m.div 
          {...fadeInUp} 
          className="relative max-w-[1000px] mx-auto overflow-hidden rounded-[32px] bg-[#1A1A1A] p-16 sm:p-24 text-center text-white shadow-[0_20px_40px_rgba(0,0,0,0.2)] border border-white/5"
        >
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl lg:text-[64px] font-bold tracking-tight mb-6">
              Ready to begin?
            </h2>
            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-[#A1A1AA] font-normal leading-relaxed mb-12 tracking-tight">
              Join thousands of patients who have safely saved money and received excellent care through MeetYourClinic.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/search">
                <Button className="h-14 bg-white text-[#1A1A1A] hover:bg-neutral-100 transition-colors duration-300 rounded-full px-8 text-[15px] font-medium shadow-[0_4px_14px_rgba(255,255,255,0.25)] border-0">
                  Browse Clinics
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  className="h-14 bg-transparent text-white border border-white/15 hover:bg-white/5 transition-colors duration-300 rounded-full px-8 text-[15px] font-medium"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Subtle Ambient Glows to match the image precisely */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          <div className="absolute -right-[20%] -top-[20%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[100px] pointer-events-none" />
        </m.div>
      </section>
    </div>
  )
}

