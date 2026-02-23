'use client'

import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { FAQSection } from '@/components/seo/faq-section'
import {
  CheckCircle,
  Plane,
  Shield,
  Clock,
  BadgeCheck,
  FileText,
  Star,
  MapPin,
  ArrowRight,
  Sparkles,
  Eye,
  Zap,
  Building2,
  Users,
  Award,
  Globe,
  Euro,
  Palette,
} from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

interface VeneersPolandClientProps {
  faqs: Array<{ question: string; answer: string }>
}

// =============================================================================
// STATIC DATA — PRICING TABLES
// =============================================================================

const PRICE_PER_TOOTH = [
  {
    treatment: 'Composite veneers',
    polandPrice: '£70–£180',
    ukPrice: '£250–£500',
    saving: '60–72%',
  },
  {
    treatment: 'Porcelain veneers',
    polandPrice: '£200–£250',
    ukPrice: '£600–£1,000',
    saving: '67–75%',
  },
  {
    treatment: 'E-max veneers',
    polandPrice: '£250–£400',
    ukPrice: '£800–£1,200',
    saving: '67–69%',
  },
]

const FULL_SET_PRICES = [
  {
    treatment: 'Full set — composite (20 teeth)',
    polandPrice: '£1,400–£3,600',
    ukPrice: '£5,000–£10,000',
    saving: '64–72%',
  },
  {
    treatment: 'Full set — porcelain (20 teeth)',
    polandPrice: '£4,000–£5,000',
    ukPrice: '£12,000–£20,000',
    saving: '67–75%',
  },
  {
    treatment: 'Full set — E-max (20 teeth)',
    polandPrice: '£5,000–£8,000',
    ukPrice: '£16,000–£24,000',
    saving: '67–69%',
  },
]

// =============================================================================
// STATIC DATA — WHY POLAND
// =============================================================================

const WHY_POLAND_POINTS = [
  {
    icon: Shield,
    title: 'EU standards and protections',
    description:
      'As an EU member state, Poland adheres to strict European medical device regulations, hygiene standards, and patient safety directives. UK patients benefit from EU cross-border healthcare protections.',
  },
  {
    icon: Award,
    title: 'Strong dental heritage',
    description:
      'Poland has a long tradition of quality dentistry. Polish dental schools are highly regarded, and many Polish dentists complete additional training in Germany, the UK, or Scandinavia.',
  },
  {
    icon: Euro,
    title: 'Significant cost savings',
    description:
      'Save 50-70% compared to UK prices while receiving the same premium materials (IPS e.max, German ceramics) and modern equipment found in top UK practices.',
  },
  {
    icon: Globe,
    title: 'English-speaking dentists',
    description:
      'Most Polish dentists serving international patients speak fluent English. Many trained abroad or hold international certifications, making communication straightforward.',
  },
  {
    icon: Plane,
    title: 'Easy access from the UK',
    description:
      'Direct flights from multiple UK airports to Krakow and Warsaw. Flight time is just 2-2.5 hours, with budget airlines offering returns from £30-£100.',
  },
  {
    icon: Building2,
    title: 'Modern facilities',
    description:
      'Polish dental clinics feature state-of-the-art equipment including CAD/CAM technology, digital smile design, and in-house laboratories for faster turnaround.',
  },
]

// =============================================================================
// STATIC DATA — VENEER TYPES
// =============================================================================

const VENEER_TYPES = [
  {
    name: 'Composite Veneers',
    description:
      'Applied directly to the tooth surface and sculpted by hand in a single session. No lab fabrication needed — can be completed in 2-3 hours per arch. Less expensive than porcelain but more prone to staining and chipping over time.',
    lifespan: '5–7 years',
    polandPrice: '£70–£180 per tooth',
    bestFor: 'Budget-conscious patients, younger patients, or those wanting a reversible option',
  },
  {
    name: 'Porcelain Veneers',
    description:
      'Traditional feldspathic porcelain veneers crafted in a dental laboratory. Excellent aesthetics with good translucency. Requires tooth preparation and 2-3 appointments over 5-7 days.',
    lifespan: '10–15 years',
    polandPrice: '£200–£250 per tooth',
    bestFor: 'Patients seeking durable, natural-looking results at a moderate price point',
  },
  {
    name: 'E-max Veneers',
    description:
      'The gold standard in modern cosmetic dentistry. Made from lithium disilicate ceramic (IPS e.max by Ivoclar Vivadent), offering exceptional strength, translucency, and aesthetics. The same material used by top UK practices.',
    lifespan: '15–20 years',
    polandPrice: '£250–£400 per tooth',
    bestFor: 'Patients who want the best available material with optimal longevity and aesthetics',
  },
]

// =============================================================================
// STATIC DATA — PROCEDURE TIMELINE
// =============================================================================

const PROCEDURE_STEPS = {
  beforeTravel: [
    'Remote consultation via WhatsApp, video call, or email',
    'Share photos of your teeth (front, side, smile view)',
    'Discuss goals: shade, shape, number of teeth',
    'Receive treatment plan and cost estimate',
    'Book flights and accommodation',
  ],
  day1: {
    title: 'Day 1 — Consultation & Preparation',
    steps: [
      'Comprehensive dental examination and X-rays',
      'Digital smile design (DSD): preview your new smile',
      'Shade selection using Vita shade guide',
      'Tooth preparation: thin layer of enamel removed (0.3–0.7mm)',
      'Impressions or digital scan for the laboratory',
      'Temporary veneers fitted to protect prepared teeth',
    ],
  },
  labDays: {
    title: 'Days 2–5 — Lab Fabrication',
    description:
      'Your permanent veneers are crafted in the dental laboratory — typically 3-4 days for porcelain/E-max. Many Polish clinics have in-house CAD/CAM labs for faster turnaround. You\'re free to explore Krakow or Warsaw, relax, or work remotely. Temporary veneers allow you to eat and speak normally.',
  },
  finalDays: {
    title: 'Days 6–7 — Fitting & Final Adjustments',
    steps: [
      'Temporary veneers removed',
      'Permanent veneers tried in and checked for fit, colour, and bite',
      'Adjustments made if needed',
      'Veneers bonded permanently using dental-grade adhesive',
      'Final bite adjustment and polishing',
      'Aftercare instructions and warranty documentation provided',
    ],
  },
}

// =============================================================================
// STATIC DATA — FEATURED CLINICS
// =============================================================================

const FEATURED_CLINICS = [
  {
    name: 'HALDENT',
    location: 'Krakow',
    highlights: [
      'Specialist cosmetic dentistry centre',
      'In-house CAD/CAM laboratory',
      'German and Swiss materials',
      '10-year warranty on E-max veneers',
    ],
    priceRange: 'E-max from £280/tooth',
    speciality: 'Premium aesthetic dentistry',
  },
  {
    name: 'Jesionowa Dental Clinic',
    location: 'Krakow',
    highlights: [
      'Multi-specialist clinic with 15+ dentists',
      'Digital smile design suite',
      'English, German, and Russian spoken',
      'Airport transfers included',
    ],
    priceRange: 'Porcelain from £200/tooth',
    speciality: 'Comprehensive dental care',
  },
  {
    name: 'INDEXMEDICA',
    location: 'Krakow',
    highlights: [
      'JCI-accredited facility',
      'Over 20 years serving international patients',
      'On-site dental laboratory',
      'Dedicated patient coordinator',
    ],
    priceRange: 'E-max from £300/tooth',
    speciality: 'International dental tourism',
  },
  {
    name: 'Smile Dentica',
    location: 'Warsaw',
    highlights: [
      'Modern clinic in central Warsaw',
      'Ivoclar Vivadent materials',
      'Digital workflow',
      '5-year warranty on all veneers',
    ],
    priceRange: 'Composite from £90/tooth',
    speciality: 'Cosmetic transformations',
  },
  {
    name: 'Luxdentica',
    location: 'Warsaw',
    highlights: [
      'Premium boutique clinic',
      'Hollywood smile specialists',
      'Celebrity clientele',
      'Luxury patient experience',
    ],
    priceRange: 'E-max from £350/tooth',
    speciality: 'Luxury cosmetic dentistry',
  },
  {
    name: 'Perfect Dental Care',
    location: 'Krakow',
    highlights: [
      'Family-run clinic with personal service',
      'Competitive pricing',
      'Same-day composite veneers available',
      'Free consultation for UK patients',
    ],
    priceRange: 'Composite from £70/tooth',
    speciality: 'Affordable quality care',
  },
]

// =============================================================================
// STATIC DATA — COUNTRY COMPARISON
// =============================================================================

const COUNTRY_COMPARISON = [
  {
    feature: 'E-max veneer (per tooth)',
    poland: '£250–£400',
    turkey: '£200–£350',
    hungary: '£250–£350',
    uk: '£800–£1,200',
  },
  {
    feature: 'Full set E-max (20 teeth)',
    poland: '£5,000–£8,000',
    turkey: '£3,200–£7,000',
    hungary: '£5,000–£7,000',
    uk: '£16,000–£24,000',
  },
  {
    feature: 'Flight time from London',
    poland: '2–2.5 hours',
    turkey: '3.5–4 hours',
    hungary: '2.5 hours',
    uk: 'N/A',
  },
  {
    feature: 'EU member state',
    poland: 'Yes',
    turkey: 'No',
    hungary: 'Yes',
    uk: 'No',
  },
  {
    feature: 'Currency',
    poland: 'PLN (złoty)',
    turkey: 'TRY (lira)',
    hungary: 'HUF (forint)',
    uk: 'GBP',
  },
  {
    feature: 'English proficiency',
    poland: 'High',
    turkey: 'Moderate',
    hungary: 'Moderate',
    uk: 'Native',
  },
  {
    feature: 'Typical warranty',
    poland: '5–10 years',
    turkey: '5–15 years',
    hungary: '5–10 years',
    uk: '1–5 years',
  },
]

// =============================================================================
// STATIC DATA — DESTINATIONS
// =============================================================================

const DESTINATIONS = [
  {
    city: 'Krakow',
    description:
      'Poland\'s most popular dental tourism destination. Historic city centre (UNESCO World Heritage), excellent restaurant scene, and the highest concentration of international-focused dental clinics. Direct flights from London, Manchester, Edinburgh, Bristol, and more.',
    highlight: 'Most popular for UK patients',
    flights: 'From £30 return',
  },
  {
    city: 'Warsaw',
    description:
      'Poland\'s capital offers the widest range of clinics and styles. Modern city with excellent infrastructure, diverse dining, and cultural attractions. Slightly higher prices than Krakow but more options. Direct flights from multiple UK airports.',
    highlight: 'Largest clinic selection',
    flights: 'From £40 return',
  },
]

// =============================================================================
// STATIC DATA — PRACTICAL INFO
// =============================================================================

const PRACTICAL_INFO = [
  {
    title: 'Flights',
    content: 'Direct flights from London, Manchester, Edinburgh, Bristol, Birmingham, and other UK airports. Wizz Air, Ryanair, easyJet, and LOT Polish Airlines operate regular services. Flight time: 2-2.5 hours. Returns typically £30-£100.',
  },
  {
    title: 'Accommodation',
    content: 'Krakow and Warsaw offer excellent value accommodation. Budget hotels from £25/night, mid-range from £50/night, premium from £100/night. Many clinics can recommend partner hotels or arrange accommodation as part of a package.',
  },
  {
    title: 'Currency',
    content: 'Poland uses the Polish złoty (PLN). Cards widely accepted. Current rate approximately 5 PLN = £1. Some clinics quote and accept payment in GBP or EUR.',
  },
  {
    title: 'Language',
    content: 'Polish is the official language, but English is widely spoken in tourist areas, hotels, restaurants, and dental clinics serving international patients.',
  },
  {
    title: 'Safety',
    content: 'Poland is generally very safe for tourists. Krakow and Warsaw have low crime rates and well-developed tourist infrastructure. Standard travel precautions apply.',
  },
  {
    title: 'Best time to visit',
    content: 'Poland can be visited year-round. Spring (April-May) and autumn (September-October) offer pleasant weather and fewer tourists. Winter can be cold but Christmas markets are magical.',
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

export function VeneersPolandClient({ faqs }: VeneersPolandClientProps) {
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
              <span className="text-primary-200 text-sm font-bold tracking-[0.3em] uppercase">EU-Standard Dental Care</span>
            </m.div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-8 leading-[1.1]">
              Veneers in <span className="bg-gradient-to-r from-white via-primary-100 to-white/80 bg-clip-text text-transparent">Poland</span>
            </h1>
            
            <p className="text-lg text-neutral-300 sm:text-xl lg:text-2xl leading-relaxed font-light mb-10 max-w-3xl">
              EU-standard dental care, German materials, and savings of 50-70%. 
              Experience the regulatory protections of EU membership with significant cost savings.
            </p>

            <div className="flex flex-col gap-5 sm:flex-row">
              <Link href="/search?procedure=veneers&country=poland">
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
              { icon: Shield, text: "EU-Regulated Clinics" },
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
            SECTION B: WHY POLAND
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
                  Why UK Patients Choose Poland for Veneers
                </h2>
                <p className="mt-8 text-lg text-neutral-600 font-light leading-relaxed">
                  Poland offers a compelling combination of quality, value, and accessibility, 
                  underpinned by strict EU medical regulations.
                </p>
                
                <div className="mt-10 p-8 rounded-[2rem] bg-neutral-50 border border-neutral-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-primary-100/50 blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  <Shield className="h-10 w-10 text-primary-600 mb-6 relative z-10" />
                  <h3 className="text-xl font-bold text-neutral-900 mb-4 relative z-10">EU Standards</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed relative z-10">
                    Polish clinics adhere to strict European medical device regulations and 
                    patient safety directives, offering UK patients peace of mind.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid gap-8 sm:grid-cols-2">
              {WHY_POLAND_POINTS.map((point, i) => (
                <m.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group p-8 rounded-[2rem] border border-neutral-100 bg-white hover:shadow-2xl hover:shadow-primary-900/5 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 mb-6">
                    <point.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">{point.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-light">{point.description}</p>
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
                  Veneer Costs in Poland
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
                            <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">Poland</th>
                            <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">UK Price</th>
                            <th className="p-6 text-sm font-bold text-primary-600 uppercase tracking-widest text-right">Saving</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                          {PRICE_PER_TOOTH.map((row, i) => (
                            <tr key={i} className="group hover:bg-neutral-50 transition-colors">
                              <td className="p-6 font-bold text-neutral-900">{row.treatment}</td>
                              <td className="p-6 text-primary-600 font-bold">{row.polandPrice}</td>
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
                            <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">Full Set (20 Teeth)</th>
                            <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">Poland</th>
                            <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest text-right">Saving</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                          {FULL_SET_PRICES.map((row, i) => (
                            <tr key={i} className="group hover:bg-neutral-50 transition-colors">
                              <td className="p-6 font-bold text-neutral-900">{row.treatment}</td>
                              <td className="p-6 text-primary-600 font-bold">{row.polandPrice}</td>
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
            SECTION D: TYPES OF VENEERS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Material Guide</span>
              <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Veneer Options in Poland
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                From budget-friendly composite to premium E-max, choose the material that fits your goals.
              </p>
            </div>
            <div className="h-px flex-1 bg-neutral-100 hidden md:block mx-8 mb-4" />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
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
                    {i === 0 ? <Palette className="h-6 w-6" /> : i === 1 ? <Sparkles className="h-6 w-6" /> : <Shield className="h-6 w-6" />}
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
                    <span className="font-bold text-primary-600">{type.polandPrice}</span>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
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
              Poland's efficient clinical workflows allow for full transformations in a single visit.
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
                  <ul className="grid md:grid-cols-2 gap-4">
                    {PROCEDURE_STEPS.beforeTravel.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-600 font-light text-sm">
                        <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                        {step}
                      </li>
                    ))}
                  </ul>
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
                  <ul className="grid md:grid-cols-2 gap-4">
                    {PROCEDURE_STEPS.day1.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-600 font-light text-sm">
                        <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                        {step}
                      </li>
                    ))}
                  </ul>
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
                  <ul className="grid md:grid-cols-2 gap-4">
                    {PROCEDURE_STEPS.finalDays.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-600 font-light text-sm">
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
                  in the same session, typically completed in 2-3 days total. No lab fabrication is
                  needed — the composite is sculpted directly onto the tooth.
                </p>
              </div>
            </div>
          </m.div>
        </m.section>

        {/* =====================================================================
            SECTION F: FEATURED CLINICS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Providers</span>
              <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Top Veneer Clinics in Poland
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Vetted facilities in Krakow and Warsaw specializing in international patient care.
              </p>
            </div>
            <Link href="/search?procedure=veneers&country=poland">
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
                  <div className="px-4 py-2 rounded-xl bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-widest">
                    {clinic.speciality}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <ul className="space-y-3">
                    {clinic.highlights.slice(0, 2).map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-neutral-600 font-light">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-3">
                    {clinic.highlights.slice(2).map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-neutral-600 font-light">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-primary-700 font-bold">{clinic.priceRange}</span>
                  <Link href={`/search?procedure=veneers&clinic=${clinic.name.toLowerCase()}`} className="text-sm font-bold text-neutral-400 group-hover:text-primary-600 transition-colors flex items-center gap-2">
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
                <Link href="/search?procedure=veneers&country=poland">
                  <Button className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white rounded-2xl px-8 py-6 font-bold shadow-lg shadow-primary-200">
                    Browse Vetted Clinics
                  </Button>
                </Link>
              </div>
            </div>
          </m.div>
        </m.section>

        {/* =====================================================================
            SECTION G: COUNTRY COMPARISON
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">Market Analysis</span>
            <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
              Regional Comparison
            </h2>
            <p className="mt-4 text-lg text-neutral-600 font-light">
              How Poland compares to other leading dental tourism destinations.
            </p>
          </div>

          <div className="bg-white rounded-[3rem] border border-neutral-200/60 p-2 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left">
                    <th className="p-8 text-sm font-bold text-neutral-400 uppercase tracking-widest">Feature</th>
                    <th className="p-8 text-sm font-bold text-primary-600 uppercase tracking-widest bg-primary-50/50">Poland</th>
                    <th className="p-8 text-sm font-bold text-neutral-700 uppercase tracking-widest">Turkey</th>
                    <th className="p-8 text-sm font-bold text-neutral-700 uppercase tracking-widest">Hungary</th>
                    <th className="p-8 text-sm font-bold text-neutral-400 uppercase tracking-widest">UK</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {COUNTRY_COMPARISON.map((row, i) => (
                    <tr key={i} className="group hover:bg-neutral-50 transition-colors">
                      <td className="p-8 font-bold text-neutral-900">{row.feature}</td>
                      <td className="p-8 text-primary-700 font-black bg-primary-50/30">{row.poland}</td>
                      <td className="p-8 text-neutral-600 font-light">{row.turkey}</td>
                      <td className="p-8 text-neutral-600 font-light">{row.hungary}</td>
                      <td className="p-8 text-neutral-400 font-light">{row.uk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              { title: "Choose Poland if:", text: "You prioritize EU regulatory protections, shorter flights, and high English proficiency." },
              { title: "Consider Turkey if:", text: "Lowest cost is your primary driver and you're comfortable with a non-EU destination." },
              { title: "Consider Hungary if:", text: "You want EU standards and a destination with a long-standing dental heritage." }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-neutral-50 border border-neutral-100">
                <h4 className="font-bold text-neutral-900 mb-4">{item.title}</h4>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
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

          <div className="grid gap-8 lg:grid-cols-2">
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
                <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                  <div className="flex items-center gap-2 text-sm text-neutral-400 font-medium">
                    <Plane className="h-4 w-4" />
                    {dest.flights}
                  </div>
                  <Link href={`/search?procedure=veneers&location=${dest.city.toLowerCase()}`} className="inline-flex items-center text-primary-600 font-bold hover:text-primary-700 transition-colors group/link">
                    View Clinics
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION I: PRACTICAL INFORMATION
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="max-w-3xl mb-16">
            <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">Travel Guide</span>
            <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
              Practical Information
            </h2>
            <p className="mt-4 text-lg text-neutral-600 font-light">
              Everything you need to know about your dental trip to Poland.
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
                <h3 className="text-lg font-bold text-neutral-900 mb-4">{info.title}</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">{info.content}</p>
              </m.div>
            ))}
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
                Poland Veneers FAQs
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
            <div className="absolute inset-0 bg-transparent opacity-[0.03] mix-blend-overlay" />
            
            <div className="relative z-10 mx-auto max-w-4xl">
              <span className="text-sm font-bold tracking-[0.3em] text-primary-300 uppercase mb-6 block">Ready to begin?</span>
              <h2 className="text-4xl font-bold sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] mb-8">
                Your New Smile <br/>Starts in <span className="text-primary-400">Poland</span>
              </h2>
              <p className="mx-auto mt-8 max-w-2xl text-xl text-neutral-300 font-light leading-relaxed">
                Experience world-class dental care with EU regulatory protections. 
                Get your personalized treatment plan today.
              </p>
              
              <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
                <Link href="/search?procedure=veneers&country=poland" className="w-full sm:w-auto">
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
            <Link href="/destinations/poland" className="text-neutral-600 hover:text-primary-600 transition-colors">
              Medical Tourism Poland
            </Link>
          </div>
        </m.section>
      </div>
    </>
  )
}
