'use client'

import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { FAQSection } from '@/components/seo/faq-section'
import {
  CheckCircle,
  Shield,
  Star,
  FileText,
  Plane,
  Clock,
  MapPin,
  Building2,
  GraduationCap,
  CreditCard,
  Globe,
  Languages,
  ArrowRight,
  BadgeCheck,
  Palette,
  Sparkles,
  Award,
  Eye,
  AlertTriangle,
} from 'lucide-react'
import { HU, TR } from 'country-flag-icons/react/3x2'

// =============================================================================
// TYPES
// =============================================================================

interface VeneersHungaryClientProps {
  faqs: Array<{ question: string; answer: string }>
}

// =============================================================================
// STATIC DATA — PRICING TABLES
// =============================================================================

const VENEER_PRICES = [
  {
    type: 'Composite Veneers',
    hungaryPrice: '£105–£180',
    ukPrice: '£150–£400',
    saving: 'Up to 60%',
  },
  {
    type: 'Porcelain/Ceramic Veneers',
    hungaryPrice: '£200–£350',
    ukPrice: '£500–£1,000',
    saving: 'Up to 65%',
  },
  {
    type: 'E-max Veneers',
    hungaryPrice: '£250–£450',
    ukPrice: '£600–£1,200',
    saving: 'Up to 63%',
  },
  {
    type: 'Zirconia Veneers',
    hungaryPrice: '£200–£400',
    ukPrice: '£500–£1,000',
    saving: 'Up to 60%',
  },
  {
    type: 'Lumineers (No-Prep)',
    hungaryPrice: '£350–£565',
    ukPrice: '£700–£1,200',
    saving: 'Up to 53%',
  },
]

const PACKAGE_PRICES = [
  {
    package: '8 Porcelain Veneers (upper front)',
    hungaryPrice: '£1,600–£2,800',
    ukPrice: '£4,000–£8,000',
    saving: '£2,400–£5,200',
  },
  {
    package: '16 Porcelain Veneers (upper + lower)',
    hungaryPrice: '£3,200–£5,600',
    ukPrice: '£8,000–£16,000',
    saving: '£4,800–£10,400',
  },
  {
    package: '20 E-max Veneers (full smile)',
    hungaryPrice: '£5,000–£9,000',
    ukPrice: '£12,000–£24,000',
    saving: '£7,000–£15,000',
  },
]

// =============================================================================
// STATIC DATA — VENEER TYPES
// =============================================================================

const VENEER_TYPES = [
  {
    name: 'Composite Veneers',
    price: '£105–£180/tooth',
    lifespan: '5–7 years',
    description:
      'Applied directly to teeth in a single visit using composite resin. The most affordable option, ideal for minor cosmetic improvements. Prone to staining over time and less durable than porcelain alternatives.',
    bestFor: 'Minor cosmetic fixes, budget-conscious patients, single-visit treatment',
  },
  {
    name: 'Porcelain Veneers',
    price: '£200–£350/tooth',
    lifespan: '10–15 years',
    description:
      'Lab-crafted ceramic shells requiring 2 visits over 3–5 days. Superior aesthetics and excellent stain resistance. The most popular choice for international patients seeking a natural-looking smile transformation.',
    bestFor: 'Full smile makeovers, long-lasting results, stain resistance',
  },
  {
    name: 'E-max Veneers',
    price: '£250–£450/tooth',
    lifespan: '15–20 years',
    description:
      'Premium lithium disilicate ceramic with the best translucency and most natural appearance. 95% success rate over 10 years in clinical studies. The gold standard for aesthetic dentistry.',
    bestFor: 'Maximum aesthetics, premium longevity, natural light transmission',
  },
  {
    name: 'Zirconia Veneers',
    price: '£200–£400/tooth',
    lifespan: '15–20 years',
    description:
      'The strongest veneer option, withstanding up to 900 MPa of pressure. Ideal for patients with bruxism (teeth grinding). Slightly less translucent than E-max but extremely durable. 91% success rate over 10 years.',
    bestFor: 'Teeth grinders, maximum durability, posterior teeth',
  },
  {
    name: 'Lumineers (No-Prep)',
    price: '£350–£565/tooth',
    lifespan: '10–20 years',
    description:
      'Ultra-thin veneers (0.2–0.5mm) requiring minimal or no tooth filing, preserving natural enamel. Reversible in some cases. Best for patients with minor cosmetic issues who want to preserve tooth structure.',
    bestFor: 'Minimal invasiveness, enamel preservation, minor corrections',
  },
]

// =============================================================================
// STATIC DATA — TREATMENT TIMELINE
// =============================================================================

const TIMELINE_STEPS = [
  {
    day: 'Before You Fly',
    title: 'Free Online Consultation',
    description:
      'Send photos and/or a panoramic X-ray (OPG) for assessment. Receive a detailed treatment plan and quote. Book your clinic, flights, and accommodation — or choose an all-inclusive package.',
  },
  {
    day: 'Day 1',
    title: 'Arrival & Consultation',
    description:
      'Airport transfer to your hotel or clinic (most clinics include this). Comprehensive examination with 3D CBCT scan. Treatment plan finalisation and shade selection. Tooth preparation (filing) and temporary veneers fitted.',
  },
  {
    day: 'Days 2–3',
    title: 'Lab Fabrication',
    description:
      "Your veneers are crafted in the clinic's on-site lab or partner laboratory. You're free to explore Budapest — visit the thermal baths, walk along the Danube, or enjoy the city's restaurants and ruin bars.",
  },
  {
    day: 'Days 4–5',
    title: 'Fitting & Departure',
    description:
      'Veneers are trial-fitted, adjusted if needed, then permanently bonded. Post-care instructions provided. Final check-up before airport transfer home. Aftercare support continues remotely.',
  },
]

// =============================================================================
// STATIC DATA — CLINICS
// =============================================================================

const FEATURED_CLINICS = [
  {
    name: 'Evergreen Dental',
    location: 'Budapest',
    rating: 4.9,
    reviews: 850,
    highlight: '#1 rated in Budapest by Global Clinic Rating',
    specialties: 'Veneers, Implants, Full Mouth Reconstruction',
  },
  {
    name: 'Rosental Dental',
    location: 'Buda Hills, Budapest',
    rating: 4.9,
    reviews: 120,
    highlight: 'In-house X-ray, CT, and 8 patient apartments on-site',
    specialties: 'Cosmetic Dentistry, Veneers, Crowns',
  },
  {
    name: 'Smile Terminal Dental Care',
    location: 'Budapest',
    rating: 4.8,
    reviews: 340,
    highlight: '1,700+ international patients per year',
    specialties: 'Veneers, Smile Makeovers, Whitening',
  },
  {
    name: 'Implant4Life by Smilefactory',
    location: 'Budapest',
    rating: 4.8,
    reviews: 280,
    highlight: 'Nobel Biocare All-on-4 Clinic of Excellence 2024',
    specialties: 'Implants, Veneers, Digital Workflow',
  },
  {
    name: 'MDental Hungary',
    location: 'Budapest',
    rating: 4.7,
    reviews: 210,
    highlight: '8 quality certificates, specialised care',
    specialties: 'Implants, Crowns, Veneers',
  },
  {
    name: 'Budapest Dental Solutions',
    location: 'Central Budapest',
    rating: 4.8,
    reviews: 175,
    highlight: 'Single-specialty dental clinic with procedure guarantees',
    specialties: 'Veneers, Cosmetic Dentistry',
  },
]

// =============================================================================
// STATIC DATA — HUNGARY VS TURKEY COMPARISON
// =============================================================================

const COMPARISON_DATA = [
  { factor: 'Price per porcelain veneer', hungary: '£200–£350', turkey: '£130–£350' },
  { factor: 'Flight time from London', hungary: '2.5 hours', turkey: '3.5–4 hours' },
  { factor: 'EU regulation', hungary: '✓ Yes — full EU member', turkey: '✗ No' },
  { factor: 'Dental tourism heritage', hungary: '30+ years', turkey: '10–15 years' },
  { factor: 'All-inclusive packages', hungary: 'Common (hotel + transfers)', turkey: 'Very common (hotel + transfers + tours)' },
  { factor: 'Best for', hungary: 'Quality-first, EU proximity, repeat visits', turkey: 'Maximum savings, holiday combo' },
]

// =============================================================================
// STATIC DATA — PRACTICAL INFO
// =============================================================================

const PRACTICAL_INFO = [
  {
    icon: Plane,
    title: 'Flights',
    content: 'Ryanair, Wizz Air, and BA operate from London, Manchester, and Edinburgh. Budget fares from £25–£80 return. Flight time: 2.5 hours.',
  },
  {
    icon: FileText,
    title: 'Visa',
    content: 'Not required for UK citizens (stays under 90 days). Valid passport needed.',
  },
  {
    icon: CreditCard,
    title: 'Currency',
    content: 'Hungarian Forint (HUF). Cards widely accepted. Many clinics quote in GBP or EUR for international patients.',
  },
  {
    icon: Building2,
    title: 'Accommodation',
    content: 'Many clinics offer all-inclusive packages with 4-star hotels. Independent hotels from £40–£80/night in central Budapest.',
  },
  {
    icon: Shield,
    title: 'Insurance',
    content: "Standard travel insurance won't cover elective dental work. Specialist medical travel insurance recommended.",
  },
  {
    icon: Languages,
    title: 'Language',
    content: 'Hungarian is the local language. English is widely spoken at dental clinics and in tourist areas of Budapest.',
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

export function VeneersHungaryClient({ faqs }: VeneersHungaryClientProps) {
  return (
    <>
      {/* =====================================================================
          SECTION A: HERO
          ===================================================================== */}
      <section className="relative overflow-hidden bg-[#0A1A2F] text-white pt-20 pb-24 sm:pt-32 sm:pb-40">
        <div className="absolute inset-0 bg-transparent opacity-[0.03] mix-blend-overlay" />
        
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
              <span className="text-primary-200 text-sm font-bold tracking-[0.3em] uppercase">The Dental Capital of Europe</span>
            </m.div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-8 leading-[1.1]">
              Veneers in <span className="bg-gradient-to-r from-white via-primary-100 to-white/80 bg-clip-text text-transparent">Hungary</span>
            </h1>
            
            <p className="text-lg text-neutral-300 sm:text-xl lg:text-2xl leading-relaxed font-light mb-10 max-w-3xl">
              Compare verified Budapest clinics, premium materials, and all-inclusive packages. 
              Save up to 65% with EU-regulated clinical excellence.
            </p>

            <div className="flex flex-col gap-5 sm:flex-row">
              <Link href="/search?procedure=veneers&country=hungary">
                <Button size="lg" className="w-full sm:w-auto bg-primary-600 text-white hover:bg-primary-500 hover:scale-105 transition-all duration-300 rounded-full px-10 py-7 text-lg font-medium shadow-xl shadow-primary-900/20">
                  Browse Clinics
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
              { icon: Shield, text: "Verified Clinics" },
              { icon: Globe, text: "EU-Regulated" },
              { icon: Plane, text: "2.5hr from London" },
              { icon: CheckCircle, text: "Free Consultations" }
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
            SECTION B: WHY HUNGARY FOR VENEERS
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
                  Why Choose Hungary for Veneers?
                </h2>
                <p className="mt-8 text-lg text-neutral-600 font-light leading-relaxed">
                  As the "Dental Capital of Europe," Hungary offers a unique combination of 
                  historical expertise and modern clinical excellence.
                </p>
                
                <div className="mt-10 p-8 rounded-[2rem] bg-neutral-50 border border-neutral-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-primary-100/50 blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  <GraduationCap className="h-10 w-10 text-primary-600 mb-6 relative z-10" />
                  <h3 className="text-xl font-bold text-neutral-900 mb-4 relative z-10">Academic Excellence</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed relative z-10">
                    Home to Semmelweis University, one of Europe's oldest and most respected medical schools, 
                    producing world-class dental specialists.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-12">
              {[
                {
                  title: "Europe's Dental Hub",
                  content: "Budapest hosts over 500 specialized dental facilities, creating a competitive environment that drives up clinical standards while keeping prices accessible."
                },
                {
                  title: "Strict EU Compliance",
                  content: "As a full EU member, Hungarian clinics must adhere to the highest European standards for hygiene, medical devices, and patient safety protocols."
                },
                {
                  title: "Decades of Experience",
                  content: "Hungary has been the primary destination for European dental tourism for over 30 years, with highly developed infrastructure for international patients."
                },
                {
                  title: "Seamless Travel",
                  content: "With a flight time of just 2.5 hours from London and multiple daily budget routes, Budapest is one of the most practical locations for treatment."
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
                  Veneer Costs in Hungary
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
                            <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">Hungary</th>
                            <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">UK Price</th>
                            <th className="p-6 text-sm font-bold text-primary-600 uppercase tracking-widest text-right">Saving</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                          {VENEER_PRICES.map((row, i) => (
                            <tr key={i} className="group hover:bg-neutral-50 transition-colors">
                              <td className="p-6 font-bold text-neutral-900">{row.type}</td>
                              <td className="p-6 text-primary-600 font-bold">{row.hungaryPrice}</td>
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
                            <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">Package Deals</th>
                            <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">Hungary</th>
                            <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest text-right">You Save</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                          {PACKAGE_PRICES.map((row, i) => (
                            <tr key={i} className="group hover:bg-neutral-50 transition-colors">
                              <td className="p-6 font-bold text-neutral-900">{row.package}</td>
                              <td className="p-6 text-primary-600 font-bold">{row.hungaryPrice}</td>
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
                        "Initial Consultation",
                        "Digital Smile Design",
                        "Temporary Veneers",
                        "Premium Materials",
                        "Local Transfers",
                        "Follow-up Care"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-neutral-300 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 rounded-3xl bg-primary-600 shadow-xl shadow-primary-900/20">
                    <h3 className="text-xl font-bold text-white mb-4">Request a Quote</h3>
                    <p className="text-primary-100 text-sm mb-8 leading-relaxed">
                      Get a personalized treatment plan and fixed-price quote from Budapest's top clinics.
                    </p>
                    <Link href="/contact">
                      <Button className="w-full bg-white text-primary-700 hover:bg-neutral-100 rounded-xl py-6 font-bold">
                        Get Free Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION D: TYPES OF VENEERS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Material Guide</span>
              <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Veneer Options in Budapest
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Budapest clinics offer the full range of veneer materials to suit every budget and goal.
              </p>
            </div>
            <div className="h-px flex-1 bg-neutral-100 hidden md:block mx-8 mb-4" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {VENEER_TYPES.map((type, i) => (
              <m.div
                key={type.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex flex-col rounded-[2.5rem] border border-neutral-200/60 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary-300 hover:shadow-2xl hover:shadow-primary-900/10"
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary-50 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl group-hover:scale-150" />
                
                <div className="relative z-10 flex-1">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    {i === 0 ? <Palette className="h-6 w-6" /> : i === 1 ? <Sparkles className="h-6 w-6" /> : i === 2 ? <Award className="h-6 w-6" /> : i === 3 ? <Shield className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary-700 transition-colors">
                    {type.name}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed font-light mb-8 text-sm">
                    {type.description}
                  </p>
                </div>

                <div className="relative z-10 space-y-4 pt-6 border-t border-neutral-100">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-neutral-400 uppercase tracking-widest">Lifespan</span>
                    <span className="font-bold text-neutral-900">{type.lifespan}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-neutral-400 uppercase tracking-widest">Est. Price</span>
                    <span className="font-bold text-primary-600">{type.price}</span>
                  </div>
                </div>
              </m.div>
            ))}
          </div>

          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 rounded-[2.5rem] bg-amber-50 border border-amber-100 relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-amber-200/20 blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-amber-900 mb-2">Veneers vs Crowns — Know the Difference</h4>
                <p className="text-amber-800 font-light leading-relaxed">
                  Many "Turkey teeth" cases involve crowns marketed as veneers. Veneers are thin shells
                  bonded to the front of teeth (0.2–0.7mm preparation). Reputable Budapest clinics are transparent about
                  which treatment they recommend. If a clinic suggests extensive filing, ask whether crowns are actually being proposed.
                </p>
              </div>
            </div>
          </m.div>
        </m.section>

        {/* =====================================================================
            SECTION E: TREATMENT TIMELINE
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="max-w-3xl mb-16">
            <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">The Journey</span>
            <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
              Your Treatment Timeline
            </h2>
            <p className="mt-4 text-lg text-neutral-600 font-light">
              A typical porcelain or E-max veneer treatment in Budapest takes 4–5 days.
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-neutral-100 hidden md:block" />

            <div className="space-y-12">
              {TIMELINE_STEPS.map((step, i) => (
                <m.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative md:pl-24"
                >
                  <div className="absolute left-0 top-0 hidden md:flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-neutral-100 shadow-sm z-10">
                    <span className="text-xl font-black text-primary-600">{i + 1}</span>
                  </div>
                  <div className="bg-white rounded-[2rem] border border-neutral-100 p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-neutral-900 flex items-center gap-4">
                        <span className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 text-lg font-bold">{i + 1}</span>
                        {step.title}
                      </h3>
                      <span className="px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-widest">
                        {step.day}
                      </span>
                    </div>
                    <p className="text-neutral-600 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </m.div>
              ))}
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
                <Clock className="h-8 w-8 text-primary-300" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Same-Day Option Available</h4>
                <p className="text-primary-100 font-light leading-relaxed">
                  Composite and nanoceramic veneers can often be completed in a single day using
                  same-day digital design and fabrication. Ideal for patients with limited time.
                </p>
              </div>
            </div>
          </m.div>
        </m.section>

        {/* =====================================================================
            SECTION F: TOP CLINICS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Providers</span>
              <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Top Veneer Clinics in Budapest
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Highest-rated medical facilities vetted for international quality standards.
              </p>
            </div>
            <Link href="/search?procedure=veneers&country=hungary">
              <Button variant="outline" className="group rounded-full border-neutral-200 px-8 py-6 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-all duration-300">
                View All Clinics <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {FEATURED_CLINICS.map((clinic, i) => (
              <m.div
                key={clinic.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative flex flex-col rounded-[2.5rem] border border-neutral-200/60 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary-300 hover:shadow-2xl hover:shadow-primary-900/10"
              >
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">{clinic.name}</h3>
                    <div className="flex items-center gap-2 text-primary-600 font-medium">
                      <MapPin className="h-4 w-4" />
                      {clinic.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-50 text-green-700">
                    <Star className="h-4 w-4 fill-green-500 text-green-500" />
                    <span className="text-sm font-bold">{clinic.rating}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-widest mb-4">
                    {clinic.highlight}
                  </div>
                  <p className="text-neutral-500 text-sm font-light leading-relaxed">
                    {clinic.specialties}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-neutral-400 text-sm font-medium">{clinic.reviews} Verified Reviews</span>
                  <Link href={`/search?procedure=veneers&clinic=${clinic.name.toLowerCase()}`} className="text-sm font-bold text-primary-600 group-hover:text-primary-700 transition-colors flex items-center gap-2">
                    View Profile <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
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
                <Link href="/search?procedure=veneers&country=hungary">
                  <Button className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white rounded-2xl px-8 py-6 font-bold shadow-lg shadow-primary-200">
                    Browse Vetted Clinics
                  </Button>
                </Link>
              </div>
            </div>
          </m.div>
        </m.section>

        {/* =====================================================================
            SECTION G: HUNGARY VS TURKEY COMPARISON
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">Market Analysis</span>
            <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
              Hungary vs Turkey
            </h2>
            <p className="mt-4 text-lg text-neutral-600 font-light">
              Comparing Europe's two leading dental tourism destinations.
            </p>
          </div>

          <div className="bg-white rounded-[3rem] border border-neutral-200/60 p-2 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left">
                    <th className="p-8 text-sm font-bold text-neutral-400 uppercase tracking-widest">Factor</th>
                    <th className="p-8 text-sm font-bold text-primary-600 uppercase tracking-widest bg-primary-50/50">Hungary</th>
                    <th className="p-8 text-sm font-bold text-neutral-700 uppercase tracking-widest">Turkey</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {COMPARISON_DATA.map((row, i) => (
                    <tr key={i} className="group hover:bg-neutral-50 transition-colors">
                      <td className="p-8 font-bold text-neutral-900">{row.factor}</td>
                      <td className="p-8 text-primary-700 font-black bg-primary-50/30">{row.hungary}</td>
                      <td className="p-8 text-neutral-600 font-light">{row.turkey}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12 p-8 rounded-[2rem] bg-neutral-900 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-6 w-6 text-primary-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold mb-1">The Bottom Line</h4>
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                Choose Hungary if you prioritize EU consumer protections, shorter travel, and long-standing dental heritage. 
                Choose Turkey if you're looking for maximum savings or want to combine treatment with a holiday.
              </p>
            </div>
            <Link href="/procedures/veneers/turkey">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl px-6">
                View Turkey Guide
              </Button>
            </Link>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION H: PRACTICAL INFORMATION
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="max-w-3xl mb-16">
            <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">Travel Guide</span>
            <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
              Practical Information
            </h2>
            <p className="mt-4 text-lg text-neutral-600 font-light">
              Everything you need to know about your dental trip to Budapest.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICAL_INFO.map((info, i) => (
              <m.div
                key={info.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-8 rounded-[2rem] border border-neutral-100 bg-white hover:border-primary-100 transition-colors"
              >
                <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 mb-6">
                  <info.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-4">{info.title}</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">{info.content}</p>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION I: FAQ
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">Common Questions</span>
              <h2 className="text-4xl font-bold text-neutral-900 tracking-tight sm:text-5xl">
                Budapest Veneers FAQs
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
            SECTION J: CTA / CONVERSION BLOCK
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
            <div className="absolute inset-0 bg-transparent opacity-[0.03] mix-blend-overlay" />
            
            <div className="relative z-10 mx-auto max-w-4xl">
              <span className="text-sm font-bold tracking-[0.3em] text-primary-300 uppercase mb-6 block">Ready to begin?</span>
              <h2 className="text-4xl font-bold sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] mb-8">
                Your New Smile <br/>Starts in <span className="text-primary-400">Budapest</span>
              </h2>
              <p className="mx-auto mt-8 max-w-2xl text-xl text-neutral-300 font-light leading-relaxed">
                Join thousands of UK patients who have transformed their smiles in Hungary. 
                Get your personalized treatment plan today.
              </p>
              
              <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
                <Link href="/search?procedure=veneers&country=hungary" className="w-full sm:w-auto">
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
                  EU-Regulated
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary-400" />
                  Verified Pricing
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
            <Link href="/procedures/veneers/turkey" className="text-neutral-600 hover:text-primary-600 transition-colors">
              Veneers in Turkey
            </Link>
            <Link href="/destinations/hungary" className="text-neutral-600 hover:text-primary-600 transition-colors">
              Medical Tourism Hungary
            </Link>
          </div>
        </m.section>
      </div>
    </>
  )
}
