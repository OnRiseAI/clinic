'use client'

import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { FAQSection } from '@/components/seo/faq-section'
import {
  CheckCircle,
  AlertTriangle,
  Plane,
  Shield,
  Clock,
  BadgeCheck,
  FileText,
  Star,
  MapPin,
  ArrowRight,
  Sparkles,
  Palette,
  Eye,
  Zap,
} from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

interface VeneersTurkeyClientProps {
  faqs: Array<{ question: string; answer: string }>
}

// =============================================================================
// STATIC DATA — PRICING TABLES
// =============================================================================

const PRICE_PER_TOOTH = [
  {
    treatment: 'Composite veneers',
    turkeyPrice: '£100–£250',
    ukPrice: '£250–£500',
    saving: '50–60%',
  },
  {
    treatment: 'E-max porcelain veneers',
    turkeyPrice: '£200–£350',
    ukPrice: '£600–£1,200',
    saving: '65–75%',
  },
  {
    treatment: 'Zirconia veneers',
    turkeyPrice: '£150–£200',
    ukPrice: '£400–£800',
    saving: '60–75%',
  },
  {
    treatment: 'Porcelain (feldspathic) veneers',
    turkeyPrice: '£200–£450',
    ukPrice: '£500–£1,000',
    saving: '55–60%',
  },
  {
    treatment: 'Lumineers / ultra-thin veneers',
    turkeyPrice: '£250–£400',
    ukPrice: '£700–£1,200',
    saving: '60–67%',
  },
]

const FULL_SET_PRICES = [
  {
    treatment: 'Full set — composite (16–20 teeth)',
    turkeyPrice: '£1,600–£5,000',
    ukPrice: '£4,000–£10,000',
    saving: '50–60%',
  },
  {
    treatment: 'Full set — E-max porcelain (16–20 teeth)',
    turkeyPrice: '£3,200–£7,000',
    ukPrice: '£9,600–£24,000',
    saving: '65–71%',
  },
  {
    treatment: 'Full set — zirconia (16–20 teeth)',
    turkeyPrice: '£2,400–£4,000',
    ukPrice: '£6,400–£16,000',
    saving: '60–75%',
  },
]

// =============================================================================
// STATIC DATA — VENEER TYPES
// =============================================================================

const VENEER_TYPES = [
  {
    name: 'E-max Porcelain Veneers',
    description:
      'The gold standard for cosmetic veneers worldwide. Made from lithium disilicate ceramic (IPS e.max by Ivoclar Vivadent). Exceptional translucency that mimics natural tooth enamel. Strong enough for front and back teeth.',
    lifespan: '10–15 years with proper care',
    bestFor: 'Patients who want the most natural-looking, durable result',
  },
  {
    name: 'Zirconia Veneers',
    description:
      'Made from zirconium dioxide — extremely strong and chip-resistant. Slightly less translucent than E-max, but newer "multi-layered" zirconia is closing the gap. Often recommended for patients who grind their teeth (bruxism).',
    lifespan: '15–20 years',
    bestFor: 'Patients who prioritise durability and strength, or who have bruxism',
  },
  {
    name: 'Composite Veneers',
    description:
      'Applied directly to the tooth surface and sculpted by hand. No lab fabrication needed — can be completed in a single session of 2–3 hours. Less expensive than porcelain but more prone to staining and chipping.',
    lifespan: '5–7 years',
    bestFor: 'Budget-conscious patients, younger patients, or those wanting a reversible option',
  },
  {
    name: 'Lumineers / Ultra-Thin Veneers',
    description:
      'A brand-name type of ultra-thin porcelain veneer (0.2mm–0.5mm) that requires minimal or no tooth preparation. The tooth structure underneath is largely preserved, making this option more reversible than traditional veneers. However, they may not be suitable for heavily discoloured teeth.',
    lifespan: '10–20 years',
    bestFor: 'Patients who want to preserve their natural tooth structure',
  },
]

// =============================================================================
// STATIC DATA — MATERIAL COMPARISON
// =============================================================================

const MATERIAL_COMPARISON = [
  { feature: 'Appearance', porcelain: 'Highly natural, translucent', composite: 'Good but less natural' },
  { feature: 'Durability', porcelain: '10–20 years', composite: '5–7 years' },
  { feature: 'Stain resistance', porcelain: 'Excellent', composite: 'Moderate (stains over time)' },
  { feature: 'Tooth preparation', porcelain: 'Moderate (0.3–0.7mm removed)', composite: 'Minimal or none' },
  { feature: 'Treatment time', porcelain: '5–7 days (lab fabrication)', composite: '2–3 days (chairside)' },
  { feature: 'Cost (Turkey)', porcelain: '£200–£450/tooth', composite: '£100–£250/tooth' },
  { feature: 'Reversibility', porcelain: 'Generally irreversible', composite: 'Partially reversible' },
]

// =============================================================================
// STATIC DATA — PROCEDURE STEPS
// =============================================================================

const PROCEDURE_STEPS = {
  beforeTravel: [
    'Remote consultation (WhatsApp, video call, or email)',
    'Share photos of your teeth (front, side, and smile view)',
    'Discuss goals: shade, shape, number of teeth',
    'Receive digital smile design preview and treatment plan',
    'Book flights and accommodation (or use clinic package)',
  ],
  day1: {
    title: 'Day 1 — Consultation & Preparation',
    steps: [
      'Comprehensive dental examination and X-rays',
      'Digital smile design (DSD): see a preview of your new smile before any work begins',
      "Shade selection: choose a natural shade with your dentist's guidance",
      'Tooth preparation: a thin layer of enamel is removed (0.3–0.7mm for porcelain)',
      'Impressions or digital scan sent to the in-house lab',
      'Temporary veneers fitted to protect prepared teeth',
    ],
  },
  labDays: {
    title: 'Days 2–5 — Lab Fabrication',
    description:
      "The dental lab crafts your veneers — typically 2–4 days for porcelain. Some clinics have in-house CAD/CAM labs that can produce veneers in 24–48 hours. You're free to explore the city, relax, or enjoy your hotel. Temporary veneers allow you to eat and speak normally.",
  },
  finalDays: {
    title: 'Day 5–7 — Fitting & Final Adjustments',
    steps: [
      'Temporary veneers removed',
      'Permanent veneers tried in and checked for fit, colour, and bite',
      'Veneers bonded permanently using dental-grade adhesive',
      'Final bite adjustment and polishing',
      'Aftercare instructions provided (care guide, what to avoid in first 48 hours)',
    ],
  },
}

// =============================================================================
// STATIC DATA — CLINIC SELECTION CRITERIA
// =============================================================================

const CLINIC_CHECKLIST = [
  {
    icon: Shield,
    title: 'Check accreditations',
    description:
      'Look for JCI (Joint Commission International), AACI, ISO certifications, or Turkish Ministry of Health registration. These mean the clinic meets internationally audited standards for hygiene, equipment, and patient safety.',
  },
  {
    icon: FileText,
    title: 'Demand material transparency',
    description:
      'Ask which brand and type of porcelain the clinic uses. Reputable clinics will name the specific material (e.g., "IPS e.max by Ivoclar Vivadent") and provide a material certificate.',
  },
  {
    icon: Eye,
    title: 'Require digital smile design',
    description:
      "A good cosmetic clinic will show you a digital preview of your result before touching your teeth. If a clinic doesn't offer DSD, consider it a red flag.",
  },
  {
    icon: Sparkles,
    title: 'Review before/after portfolios',
    description:
      'Ask to see a wide range of cases — not just the most dramatic transformations. Look for natural-looking results, not just ultra-white "Hollywood" smiles.',
  },
  {
    icon: BadgeCheck,
    title: 'Verify dentist credentials',
    description:
      'Look for membership in cosmetic dentistry associations (e.g., AACD, Turkish Academy of Aesthetic Dentistry). Ask how many veneer cases the dentist completes per year.',
  },
  {
    icon: Star,
    title: 'Check warranties',
    description:
      'Reputable clinics offer 5–15 year warranties on porcelain veneers. Check what the warranty covers and whether it includes replacement or just repair.',
  },
]

// =============================================================================
// STATIC DATA — DESTINATIONS
// =============================================================================

const DESTINATIONS = [
  {
    city: 'Antalya',
    description:
      "Turkey's cosmetic dentistry capital and the most popular destination for veneer tourists. Highest concentration of purpose-built dental clinics catering to international patients. Mediterranean climate — combine your treatment with a beach holiday. Flights from UK: 4–4.5 hours, from ~£100 return.",
    highlight: 'Most popular, best value',
  },
  {
    city: 'Istanbul',
    description:
      'The largest city with the widest range of clinics and styles. Ideal for patients who want to combine their dental trip with world-class sightseeing, food, and culture. Slightly higher clinic overheads can mean marginally higher prices, but the selection and competition keep quality high.',
    highlight: 'Most clinic options, city break',
  },
  {
    city: 'Izmir',
    description:
      'Emerging cosmetic dentistry destination on the Aegean coast. Quieter and more relaxed than Antalya or Istanbul. Competitive pricing and a growing reputation for quality cosmetic work. Good option for patients who prefer a less touristy experience.',
    highlight: 'Quieter, competitive pricing',
  },
]

// =============================================================================
// STATIC DATA — RISKS
// =============================================================================

const RISKS = [
  {
    risk: 'Over-preparation of teeth',
    description: 'The biggest risk. Some clinics aggressively shave down healthy teeth to stumps, which is irreversible and can lead to sensitivity, nerve damage, or the need for root canals later.',
    mitigation:
      'Choose a clinic that uses minimal-prep techniques and shows you the preparation plan beforehand.',
  },
  {
    risk: 'Poor shade matching',
    description: "Ending up with veneers that look unnaturally white or don't match your remaining teeth.",
    mitigation:
      'Discuss shade carefully with your dentist, look at shade samples in natural light, and ask for a digital smile design preview.',
  },
  {
    risk: 'Bonding failure',
    description: "Veneers can debond if the adhesive application isn't precise.",
    mitigation:
      'Reputable clinics use rubber dam isolation and follow manufacturer protocols exactly. Ask about their bonding process.',
  },
  {
    risk: 'Sensitivity',
    description: 'Some tooth sensitivity is normal for 1–2 weeks after preparation. Prolonged sensitivity may indicate over-preparation or nerve involvement.',
    mitigation:
      'Choose a clinic that prioritises conservative preparation techniques.',
  },
  {
    risk: 'Unqualified clinics',
    description: "Turkey's dental tourism boom has attracted clinics that prioritise volume over quality.",
    mitigation:
      "Always verify accreditation, ask for the clinic's Turkish Ministry of Health registration number, and check independent reviews (Google, Trustpilot).",
  },
]

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
}

// =============================================================================
// COMPONENT
// =============================================================================

export function VeneersTurkeyClient({ faqs }: VeneersTurkeyClientProps) {
  return (
    <>
      {/* =====================================================================
          SECTION A: HERO
          ===================================================================== */}
      <section className="relative overflow-hidden bg-[#0A1A2F] text-white pt-20 pb-24 sm:pt-32 sm:pb-40">
        <div className="absolute inset-0 bg-[url('/images/patterns/dental-pattern.svg')] opacity-[0.03] mix-blend-overlay" />
        
        {/* Abstract Premium Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A2F] via-[#0A1A2F]/95 to-primary-900/50" />
        
        {/* Animated Glowing Orbs */}
        <m.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary-600/20 blur-[120px]" 
        />
        <m.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -70, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-blue-600/10 blur-[120px]" 
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <m.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-12 bg-primary-400" />
              <span className="text-primary-200 text-sm font-bold tracking-[0.3em] uppercase">Premium Dental Care</span>
            </m.div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-8 leading-[1.1]">
              Veneers in <span className="bg-gradient-to-r from-white via-primary-100 to-white/80 bg-clip-text text-transparent">Turkey</span>
            </h1>
            
            <p className="text-lg text-neutral-300 sm:text-xl lg:text-2xl leading-relaxed font-light mb-10 max-w-3xl">
              Save 60–75% on world-class smile transformations. Compare accredited clinics, 
              verified 2026 pricing, and UK patient reviews.
            </p>

            <div className="flex flex-col gap-5 sm:flex-row">
              <Link href="/search?procedure=veneers&country=turkey">
                <Button size="lg" className="w-full sm:w-auto bg-primary-600 text-white hover:bg-primary-500 hover:scale-105 transition-all duration-300 rounded-full px-10 py-7 text-lg font-medium shadow-xl shadow-primary-900/20">
                  Get a Free Quote
                </Button>
              </Link>
              <Link href="#pricing">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-full px-10 py-7 text-lg font-medium backdrop-blur-md transition-all duration-300"
                >
                  View 2026 Prices
                </Button>
              </Link>
            </div>
          </m.div>

          {/* Trust Bar */}
          <m.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 sm:mt-28 grid grid-cols-2 gap-8 sm:grid-cols-4 border-t border-white/10 pt-12"
          >
            {[
              { icon: Shield, text: "Accredited Clinics Only" },
              { icon: CheckCircle, text: "Verified 2026 Pricing" },
              { icon: Star, text: "UK Patient Reviews" },
              { icon: FileText, text: "Material Certificates" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center sm:items-start gap-3">
                <item.icon className="h-6 w-6 text-primary-400" />
                <span className="text-sm font-medium text-neutral-300 tracking-wide">{item.text}</span>
              </div>
            ))}
          </m.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* =====================================================================
            SECTION B: WHY UK PATIENTS CHOOSE TURKEY
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="grid gap-16 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <m.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "80px" }}
                  viewport={{ once: true }}
                  className="h-1.5 bg-primary-600 rounded-full mb-8"
                />
                <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                  Why UK Patients Choose Turkey for Veneers
                </h2>
                <p className="mt-8 text-lg text-neutral-600 font-light leading-relaxed">
                  Turkey has established itself as the global hub for cosmetic dentistry, 
                  combining clinical excellence with unmatched value.
                </p>
                
                <div className="mt-10 p-8 rounded-[2rem] bg-neutral-50 border border-neutral-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-primary-100/50 blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  <Shield className="h-10 w-10 text-primary-600 mb-6 relative z-10" />
                  <h3 className="text-xl font-bold text-neutral-900 mb-4 relative z-10">Safe & Regulated</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed relative z-10">
                    All dental facilities catering to international patients must be registered 
                    with the Turkish Ministry of Health and follow strict EU-aligned protocols.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-12">
              {[
                {
                  title: "Exceptional Cost Savings",
                  content: "E-max porcelain veneers cost £200–£350 per tooth in Turkey, compared to £600–£1,200 in the UK. A full set typically saves patients between 60% and 75%, even after travel expenses."
                },
                {
                  title: "World-Class Materials",
                  content: "Clinics use identical materials to top Harley Street practices, including IPS e.max by Ivoclar Vivadent and premium Zirconia from German manufacturers."
                },
                {
                  title: "Rapid Treatment Timelines",
                  content: "While UK treatments can take weeks, Turkish clinics utilize in-house CAD/CAM labs to complete full smile transformations in just 5–7 days."
                },
                {
                  title: "Specialized Expertise",
                  content: "Turkish cosmetic dentists perform a high volume of veneer cases, often placing thousands per year, leading to a level of clinical precision that is hard to match."
                }
              ].map((item, i) => (
                <m.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-lg text-neutral-600 font-light leading-relaxed">
                    {item.content}
                  </p>
                  <div className="mt-8 h-px w-full bg-neutral-100 group-last:hidden" />
                </m.div>
              ))}
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION C: PRICING
            ===================================================================== */}
        <m.section {...fadeInUp} id="pricing" className="mb-32 scroll-mt-20">
          <div className="bg-neutral-900 rounded-[3rem] p-8 sm:p-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-600/10 blur-[120px]" />
            
            <div className="relative z-10">
              <div className="max-w-2xl mb-16">
                <span className="text-sm font-bold tracking-[0.2em] text-primary-400 uppercase mb-4 block">2026 Price Guide</span>
                <h2 className="text-4xl font-bold text-white tracking-tight sm:text-5xl mb-6">
                  Veneer Costs in Turkey
                </h2>
                <p className="text-lg text-neutral-400 font-light">
                  Transparent pricing updated for February 2026. All prices in GBP (£).
                </p>
              </div>

              <div className="grid lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-8 space-y-8">
                  {/* Price Tables */}
                  <div className="bg-white rounded-3xl p-2 shadow-2xl">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="text-left">
                            <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">Material</th>
                            <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">Turkey</th>
                            <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">UK Price</th>
                            <th className="p-6 text-sm font-bold text-primary-600 uppercase tracking-widest text-right">Saving</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                          {PRICE_PER_TOOTH.map((row, i) => (
                            <tr key={i} className="group hover:bg-neutral-50 transition-colors">
                              <td className="p-6 font-bold text-neutral-900">{row.treatment}</td>
                              <td className="p-6 text-primary-600 font-bold">{row.turkeyPrice}</td>
                              <td className="p-6 text-neutral-500 line-through decoration-neutral-300">{row.ukPrice}</td>
                              <td className="p-6 text-right font-black text-green-600">{row.saving}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-2 shadow-2xl">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="text-left">
                            <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">Full Set (16-20 Teeth)</th>
                            <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">Turkey</th>
                            <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest text-right">Saving</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                          {FULL_SET_PRICES.map((row, i) => (
                            <tr key={i} className="group hover:bg-neutral-50 transition-colors">
                              <td className="p-6 font-bold text-neutral-900">{row.treatment}</td>
                              <td className="p-6 text-primary-600 font-bold">{row.turkeyPrice}</td>
                              <td className="p-6 text-right font-black text-green-600">{row.saving}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary-400" />
                      What's Included
                    </h3>
                    <ul className="space-y-4">
                      {[
                        "Digital Smile Design (DSD)",
                        "All Consultation Fees",
                        "Temporary Veneers",
                        "Premium Materials",
                        "Local Transfers",
                        "Aftercare Kit"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-neutral-300 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 rounded-3xl bg-primary-600 shadow-xl shadow-primary-900/20">
                    <h3 className="text-xl font-bold text-white mb-4">Need a custom quote?</h3>
                    <p className="text-primary-100 text-sm mb-8 leading-relaxed">
                      Send us a photo of your smile for a free clinical assessment and 
                      personalized price breakdown.
                    </p>
                    <Link href="/contact">
                      <Button className="w-full bg-white text-primary-700 hover:bg-neutral-100 rounded-xl py-6 font-bold">
                        Request Free Assessment
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION D: "TURKEY TEETH" CONVERSATION
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="rounded-[3rem] bg-gradient-to-br from-amber-500 to-amber-600 p-1 overflow-hidden shadow-2xl shadow-amber-200/50">
            <div className="rounded-[2.8rem] bg-white p-8 sm:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-amber-50 blur-3xl" />
              
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 mb-8 shadow-inner">
                    <AlertTriangle className="h-8 w-8" />
                  </div>
                  <h2 className="text-4xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6">
                    The "Turkey Teeth" <br/>Conversation
                  </h2>
                  <p className="text-lg text-neutral-600 font-light leading-relaxed mb-8">
                    The term "Turkey Teeth" has become a viral phenomenon, but it's important to 
                    distinguish between social media trends and clinical reality.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
                      <h4 className="font-bold text-neutral-900 mb-2">What it actually means</h4>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        It describes overly uniform, ultra-white, artificial-looking results. 
                        This is usually caused by aggressive tooth preparation and poor shade selection.
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
                      <h4 className="font-bold text-neutral-900 mb-2">How we prevent it</h4>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        We only partner with clinics that prioritize conservative preparation and 
                        use Digital Smile Design to ensure natural-looking results.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="prose prose-neutral">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-6">How to avoid the "Artificial" look:</h3>
                    <ul className="space-y-4 list-none p-0">
                      {[
                        { title: "Demand DSD", desc: "Digital Smile Design allows you to see and approve your smile before any work begins." },
                        { title: "Choose Natural Shades", desc: "Opt for B1 or BL1 shades rather than the 'Hollywood White' 0M1 for a realistic look." },
                        { title: "Minimal-Prep Focus", desc: "Prioritize clinics that aim to preserve as much natural tooth structure as possible." },
                        { title: "Review Real Portfolios", desc: "Look for clinics that showcase a variety of natural transformations, not just high-contrast marketing shots." }
                      ].map((item, i) => (
                        <li key={i} className="flex gap-4 items-start">
                          <div className="mt-1.5 h-2 w-2 rounded-full bg-amber-500 flex-shrink-0" />
                          <div>
                            <span className="font-bold text-neutral-900 block">{item.title}</span>
                            <span className="text-neutral-600 text-sm font-light">{item.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-8 rounded-3xl bg-amber-50 border border-amber-100 italic text-amber-900 font-medium">
                    "The 'Turkey Teeth' phenomenon is a result of poor clinical choices, not a 
                    reflection of the entire Turkish dental industry. Thousands of patients receive 
                    world-class, natural results every month."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION E: TYPES OF VENEERS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Material Guide</span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Types of Veneers Available
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Choosing the right material is essential for achieving your desired aesthetic and durability.
              </p>
            </div>
            <div className="h-px flex-1 bg-neutral-100 hidden md:block mx-8 mb-4" />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {VENEER_TYPES.map((type, i) => (
              <m.div
                key={type.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex flex-col rounded-[2rem] border border-neutral-200/60 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary-300 hover:shadow-2xl hover:shadow-primary-900/10"
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary-50 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl group-hover:scale-150" />
                
                <div className="relative z-10 flex-1">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    {i === 0 ? <Sparkles className="h-6 w-6" /> : i === 1 ? <Shield className="h-6 w-6" /> : i === 2 ? <Palette className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary-700 transition-colors">
                    {type.name}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed font-light mb-8">
                    {type.description}
                  </p>
                </div>

                <div className="relative z-10 space-y-4 pt-6 border-t border-neutral-100">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-neutral-400 uppercase tracking-widest">Lifespan</span>
                    <span className="font-bold text-neutral-900">{type.lifespan}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-neutral-400 uppercase tracking-widest">Best For</span>
                    <span className="font-bold text-primary-600 text-right max-w-[60%]">{type.bestFor}</span>
                  </div>
                </div>
              </m.div>
            ))}
          </div>

          {/* Quick Comparison Table */}
          <div className="mt-16 bg-neutral-50 rounded-[2.5rem] p-8 sm:p-12 border border-neutral-100">
            <h3 className="text-2xl font-bold text-neutral-900 mb-10 text-center">Porcelain vs Composite Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left">
                    <th className="pb-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">Feature</th>
                    <th className="pb-6 text-sm font-bold text-primary-600 uppercase tracking-widest">Porcelain (E-max)</th>
                    <th className="pb-6 text-sm font-bold text-neutral-500 uppercase tracking-widest">Composite</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {MATERIAL_COMPARISON.map((row, i) => (
                    <tr key={i} className="group">
                      <td className="py-5 font-bold text-neutral-900">{row.feature}</td>
                      <td className="py-5 text-neutral-700 font-medium">{row.porcelain}</td>
                      <td className="py-5 text-neutral-500 font-light">{row.composite}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION F: PROCEDURE STEP BY STEP
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="max-w-3xl mb-16">
            <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">The Journey</span>
            <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
              Your Treatment Timeline
            </h2>
            <p className="mt-4 text-lg text-neutral-600 font-light">
              Unlike complex surgeries, veneers are completed in a single efficient trip.
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-neutral-100 hidden md:block" />

            <div className="space-y-16">
              {/* Step 1 */}
              <m.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative md:pl-24"
              >
                <div className="absolute left-0 top-0 hidden md:flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-neutral-100 shadow-sm z-10">
                  <span className="text-2xl font-black text-primary-600">01</span>
                </div>
                <div className="bg-white rounded-[2rem] border border-neutral-100 p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-4">
                    <span className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 text-lg font-bold">01</span>
                    Before You Travel
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <ul className="space-y-4">
                      {PROCEDURE_STEPS.beforeTravel.slice(0, 3).map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-neutral-600 font-light">
                          <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                          {step}
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-4">
                      {PROCEDURE_STEPS.beforeTravel.slice(3).map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-neutral-600 font-light">
                          <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </m.div>

              {/* Step 2 */}
              <m.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative md:pl-24"
              >
                <div className="absolute left-0 top-0 hidden md:flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-neutral-100 shadow-sm z-10">
                  <span className="text-2xl font-black text-primary-600">02</span>
                </div>
                <div className="bg-white rounded-[2rem] border border-neutral-100 p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-4">
                    <span className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 text-lg font-bold">02</span>
                    {PROCEDURE_STEPS.day1.title}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <ul className="space-y-4">
                      {PROCEDURE_STEPS.day1.steps.slice(0, 3).map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-neutral-600 font-light">
                          <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                          {step}
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-4">
                      {PROCEDURE_STEPS.day1.steps.slice(3).map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-neutral-600 font-light">
                          <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </m.div>

              {/* Step 3 */}
              <m.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative md:pl-24"
              >
                <div className="absolute left-0 top-0 hidden md:flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-neutral-100 shadow-sm z-10">
                  <span className="text-2xl font-black text-primary-600">03</span>
                </div>
                <div className="bg-white rounded-[2rem] border border-neutral-100 p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-4">
                    <span className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 text-lg font-bold">03</span>
                    {PROCEDURE_STEPS.labDays.title}
                  </h3>
                  <p className="text-lg text-neutral-600 font-light leading-relaxed">
                    {PROCEDURE_STEPS.labDays.description}
                  </p>
                </div>
              </m.div>

              {/* Step 4 */}
              <m.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative md:pl-24"
              >
                <div className="absolute left-0 top-0 hidden md:flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-neutral-100 shadow-sm z-10">
                  <span className="text-2xl font-black text-primary-600">04</span>
                </div>
                <div className="bg-white rounded-[2rem] border border-neutral-100 p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-4">
                    <span className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 text-lg font-bold">04</span>
                    {PROCEDURE_STEPS.finalDays.title}
                  </h3>
                  <ul className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                    {PROCEDURE_STEPS.finalDays.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-600 font-light">
                        <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </m.div>
            </div>
          </div>

          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 rounded-[2.5rem] bg-primary-900 text-white relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-primary-600/20 blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
                <Zap className="h-8 w-8 text-primary-300" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Composite Veneers — Faster Timeline</h4>
                <p className="text-primary-100 font-light leading-relaxed">
                  For composite veneers, the process is simpler: preparation and application happen
                  in the same session, typically completed in 2–3 days total. No lab fabrication is
                  needed — the composite is sculpted directly onto the tooth.
                </p>
              </div>
            </div>
          </m.div>
        </m.section>

        {/* =====================================================================
            SECTION G: CHOOSING A CLINIC
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">Selection Criteria</span>
            <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
              Choosing a Reputable Clinic
            </h2>
            <p className="mt-4 text-lg text-neutral-600 font-light">
              Your choice of clinic determines your result. Use this checklist to evaluate your options.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {CLINIC_CHECKLIST.map((item, i) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group p-8 rounded-[2rem] border border-neutral-100 bg-white hover:shadow-2xl hover:shadow-primary-900/5 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 mb-6">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{item.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-light">{item.description}</p>
              </m.div>
            ))}
          </div>

          <m.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-16 p-10 rounded-[3rem] bg-gradient-to-br from-primary-50 to-white border border-primary-100 relative overflow-hidden"
          >
            <div className="absolute right-0 bottom-0 -mb-10 -mr-10 h-40 w-40 rounded-full bg-primary-200/20 blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-shrink-0">
                <div className="h-20 w-20 rounded-3xl bg-primary-600 flex items-center justify-center shadow-xl shadow-primary-200">
                  <Shield className="h-10 w-10 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary-900 mb-4">The MeetYourClinic Advantage</h3>
                <p className="text-lg text-primary-800/80 font-light leading-relaxed">
                  Every clinic on our platform undergoes a rigorous 50-point vetting process. 
                  We verify clinical accreditations, material authenticity, and genuine patient 
                  outcomes so you can book with absolute confidence.
                </p>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <Link href="/search?procedure=veneers&country=turkey">
                  <Button className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white rounded-2xl px-8 py-6 font-bold shadow-lg shadow-primary-200">
                    Browse Vetted Clinics
                  </Button>
                </Link>
              </div>
            </div>
          </m.div>
        </m.section>

        {/* =====================================================================
            SECTION H: DESTINATIONS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Locations</span>
              <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Where to Get Veneers
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Discover the most popular cities for UK patients seeking dental transformations.
              </p>
            </div>
            <div className="h-px flex-1 bg-neutral-100 hidden md:block mx-8 mb-4" />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {DESTINATIONS.map((dest, i) => (
              <m.div
                key={dest.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative flex flex-col rounded-[2.5rem] border border-neutral-200/60 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary-300 hover:shadow-2xl hover:shadow-primary-900/10"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-neutral-900">{dest.city}</h3>
                  <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                    <MapPin className="h-5 w-5" />
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest mb-6">
                  {dest.highlight}
                </span>
                <p className="text-neutral-600 font-light leading-relaxed mb-8 flex-1">
                  {dest.description}
                </p>
                <Link href={`/search?procedure=veneers&location=${dest.city.toLowerCase()}`} className="inline-flex items-center text-primary-600 font-bold hover:text-primary-700 transition-colors group/link">
                  View {dest.city} Clinics
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION I: RISKS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="max-w-3xl mb-16">
            <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">Safety First</span>
            <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
              Risks & Mitigation
            </h2>
            <p className="mt-4 text-lg text-neutral-600 font-light">
              Every cosmetic procedure carries some risk. Here's how we help you minimize them.
            </p>
          </div>

          <div className="grid gap-6">
            {RISKS.map((item, i) => (
              <m.div
                key={item.risk}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
              >
                <div className="grid md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-5">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">{item.risk}</h3>
                    <p className="text-neutral-500 text-sm font-light leading-relaxed">{item.description}</p>
                  </div>
                  <div className="md:col-span-7">
                    <div className="flex gap-4 p-6 rounded-2xl bg-green-50/50 border border-green-100">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-sm font-bold text-green-900 uppercase tracking-widest mb-1">How we mitigate</span>
                        <p className="text-green-800 text-sm font-medium leading-relaxed">{item.mitigation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </m.div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-[2rem] bg-neutral-900 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-6 w-6 text-primary-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold mb-1">Aftercare at Home</h4>
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                Your UK dentist can provide routine care. For clinical issues, all our partner clinics 
                have established complication protocols and many have UK-based partner practices.
              </p>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION J: FAQ
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">Common Questions</span>
              <h2 className="text-4xl font-bold text-neutral-900 tracking-tight sm:text-5xl">
                Turkey Veneers FAQs
              </h2>
            </div>
            <div className="bg-white rounded-[2.5rem] border border-neutral-200/60 p-4 sm:p-10 shadow-xl shadow-neutral-100">
              <FAQSection
                faqs={faqs}
                title=""
                className="faq-section-custom"
              />
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION K: CTA / CONVERSION BLOCK
            ===================================================================== */}
        <m.section {...fadeInUp} className="pb-12">
          <div className="relative overflow-hidden rounded-[3rem] bg-[#0A1A2F] p-12 text-white sm:p-20 lg:p-32 shadow-2xl text-center">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 via-transparent to-blue-600/30" />
            <m.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -left-1/4 -top-1/4 h-full w-full rounded-full bg-primary-500/10 blur-[120px]" 
            />
            <div className="absolute inset-0 bg-[url('/images/patterns/dental-pattern.svg')] opacity-[0.03] mix-blend-overlay" />
            
            <div className="relative z-10 mx-auto max-w-4xl">
              <span className="text-sm font-bold tracking-[0.3em] text-primary-300 uppercase mb-6 block">Ready to begin?</span>
              <h2 className="text-4xl font-bold sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] mb-8">
                Your New Smile <br/>Starts in <span className="text-primary-400">Turkey</span>
              </h2>
              <p className="mx-auto mt-8 max-w-2xl text-xl text-neutral-300 font-light leading-relaxed">
                Join 5,000+ UK patients who have transformed their smiles with MeetYourClinic. 
                Get your personalized treatment plan today.
              </p>
              
              <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
                <Link href="/search?procedure=veneers&country=turkey" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-12 py-8 text-lg font-bold shadow-xl shadow-white/10">
                    Get My Free Quote
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-full px-12 py-8 text-lg font-bold backdrop-blur-md"
                  >
                    Speak to an Advisor
                  </Button>
                </Link>
              </div>
              
              <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-8 text-sm font-medium text-neutral-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary-400" />
                  Verified Clinics
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary-400" />
                  Best Price Guarantee
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary-400" />
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            INTERNAL LINKS — HUB PAGE CONNECTION
            ===================================================================== */}
        <m.section {...fadeInUp} className="mt-20 border-t border-neutral-100 pt-12">
          <div className="flex flex-wrap gap-x-8 gap-y-4 items-center justify-center text-sm font-medium">
            <span className="text-neutral-400 uppercase tracking-widest text-xs">Related Guides:</span>
            <Link href="/dental" className="text-neutral-600 hover:text-primary-600 transition-colors">
              Dental Work Abroad
            </Link>
            <Link href="/procedures/dental-implants/turkey" className="text-neutral-600 hover:text-primary-600 transition-colors">
              Dental Implants in Turkey
            </Link>
            <Link href="/destinations/turkey" className="text-neutral-600 hover:text-primary-600 transition-colors">
              Medical Tourism Turkey
            </Link>
          </div>
        </m.section>
      </div>
    </>
  )
}
