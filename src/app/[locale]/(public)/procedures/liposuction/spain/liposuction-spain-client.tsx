'use client'

import { m } from 'framer-motion'
import Link from 'next/link'

import {
  CheckCircle,
  Star,
  MapPin,
  ArrowRight,
  Shield,
  Zap,
  Clock,
  Activity,
  Heart,
  Sparkles,
  Award,
  Palette,
  Eye,
  Plane,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FAQSection } from '@/components/seo/faq-section'

// =============================================================================
// CONSTANTS
// =============================================================================

const HERO_STATS = [
  { label: 'From', value: '£2,400', sub: 'per area' },
  { label: 'Save', value: '40–60%', sub: 'vs UK prices' },
  { label: 'Surgeons', value: '~900', sub: 'SECPRE-certified' },
  { label: 'Annual', value: '450,000+', sub: 'procedures' },
]

const WHY_SPAIN_POINTS = [
  {
    title: 'World\'s Healthiest Nation',
    text: 'Spain was ranked the world\'s healthiest nation by the Bloomberg Global Health Index. The healthcare system is one of the most advanced in Europe, with universal coverage and world-class private hospitals. For patients prioritising quality of care above maximum savings, Spain represents the premium tier of cosmetic surgery abroad.',
  },
  {
    title: 'Unmatched Hospital Infrastructure',
    text: 'Quirónsalud operates 47 hospitals across Spain — the largest private healthcare group in the country. Their Marbella facility was named one of Newsweek\'s "World\'s Best Hospitals" in 2021. Spain\'s plastic surgeons are regulated by SECPRE (Sociedad Española de Cirugía Plástica, Reparadora y Estética), requiring specialist training and ongoing professional development. Spain has approximately 900 plastic surgeons and performs 450,000 cosmetic procedures annually — 11th globally according to ISAPS 2021 data.',
  },
  {
    title: 'World-Renowned Specialists',
    text: 'Spanish clinics offer the full range of advanced liposuction techniques — VASER, HD lipo (high-definition sculpting), lipo 360, ab etching, and combined lipo + BBL. World-renowned specialists like Dr. Javier de Benito (former Vice President of ISAPS, rated top 10 worldwide) operate in Barcelona. Spain\'s medical tourism market was valued at $1.83 billion in 2026, projected to reach $4.16 billion by 2030.',
  },
  {
    title: 'Ideal Recovery Setting',
    text: 'The Costa del Sol (Marbella, Málaga) and Barcelona offer ideal recovery settings — warm climate, walkable waterfronts, and large British expat communities. English is widely spoken at international-facing clinics, and Spain feels culturally familiar to UK patients. With flights just 2–2.5 hours from London and multiple daily services to Barcelona, Madrid, and Málaga, Spain combines premium quality with accessibility.',
  },
]

const COST_BY_TECHNIQUE = [
  ['Traditional liposuction (1 area)', '£2,400–£5,300', '£3,000–£6,000', '10–40%'],
  ['VASER liposuction (1 area)', '£3,000–£5,500', '£4,700–£11,200', '35–55%'],
  ['Lipo 360 (VASER)', '£3,600–£6,000', '£5,000–£9,000', '30–40%'],
  ['HD lipo (high-definition)', '£4,000–£7,000', '£5,500–£12,000', '30–45%'],
  ['Ab etching', '£3,500–£6,000', '£5,000–£10,000', '30–40%'],
  ['Lipo + BBL combination', '£5,000–£9,000', '£8,000–£16,000', '40–45%'],
]

const COST_BY_CITY = [
  { city: 'Barcelona', price: '€1,900–€7,000 (£1,600–£6,000)', positioning: 'Widest clinic selection, premium and mid-range. Wellness Kliniek transparent pricing.' },
  { city: 'Madrid', price: '€1,000–€11,000 (£850–£9,400)', positioning: 'Widest price range. Capital premium for top surgeons. University Clinic of Navarra.' },
  { city: 'Marbella', price: 'From €3,900 (£3,300)', positioning: 'Premium positioning. Costa del Sol setting. Quirónsalud Marbella (Newsweek Best Hospitals).' },
  { city: 'Valencia', price: '€2,800–€5,800 (£2,400–£5,000)', positioning: 'Emerging destination. Lower costs than Barcelona/Madrid. Beach recovery setting.' },
  { city: 'Alicante', price: 'From $1,687 (£1,350)', positioning: 'Budget option for Spain. Costa Blanca setting. Smaller clinic selection.' },
  { city: 'Seville', price: '€2,800–€5,800 (£2,400–£5,000)', positioning: 'Andalusian culture. Growing medical tourism sector.' },
]

const PACKAGE_INCLUSIONS = [
  'Surgery (Surgeon\'s fee + operating theatre)',
  'Anaesthesia (Local or general)',
  'Hospital Admission',
  'Pre-op Tests (Blood work and consultation)',
  'Compression Garment',
  '21% VAT Included',
]

const CLINICS = [
  {
    name: 'Quirónsalud Marbella',
    location: 'Costa del Sol',
    rating: '4.9',
    highlight: 'Newsweek "World\'s Best Hospitals" 2021',
    features: [
      'Spain\'s largest private hospital group (47 hospitals)',
      '800+ medical staff',
      'Full-service international patient department',
      'Costa del Sol setting for recovery',
    ],
  },
  {
    name: 'Instituto de Benito',
    location: 'Barcelona / Madrid',
    rating: '4.9',
    highlight: 'Top 10 plastic surgery clinics worldwide',
    features: [
      '30+ years of experience',
      'Founded by Dr. Javier de Benito — former VP of ISAPS',
      'Elite-tier clinic with premium pricing',
    ],
  },
  {
    name: 'Wellness Kliniek Barcelona',
    location: 'Barcelona',
    rating: '4.8',
    highlight: 'Transparent all-inclusive pricing',
    features: [
      'Specialises in VASER and SWT liposuction',
      'Up to 5 litres of fat removal per session',
      'Transparent all-inclusive pricing (21% VAT included)',
      'International patient base',
    ],
  },
  {
    name: 'University Clinic of Navarra',
    location: 'Madrid',
    rating: '4.9',
    highlight: 'Best private hospital in Spain',
    features: [
      '95% patient satisfaction rate',
      'Ranked best private hospital in Spain',
      'Academic medical centre with research-led practice',
      'Premium pricing, exceptional outcomes data',
    ],
  },
  {
    name: 'Clinica Granado Tiagonce',
    location: 'Spain',
    rating: '4.8',
    highlight: 'ASAPS recognised',
    features: [
      '20+ years of plastic surgery experience',
      'Recognised by ASAPS (American Society)',
      '3D visualisation technology — see projected results',
      'Dedicated physiotherapy department',
    ],
  },
  {
    name: 'Centro Médico Teknon',
    location: 'Barcelona',
    rating: '4.8',
    highlight: 'Quirónsalud network partner',
    features: [
      'Partners with Quirónsalud network',
      '14km from Barcelona-El Prat Airport',
      'Comprehensive international patient services',
      'Online consultations available',
    ],
  },
]

const TECHNIQUES = [
  {
    name: 'VASER Lipo 360',
    price: '£3,600–£6,000',
    description: 'Ultrasound-assisted circumferential body contouring. Treats abdomen, flanks, and back in one session. Less bruising and faster recovery than traditional 360.',
    availability: 'Available at Wellness Kliniek Barcelona, Quirónsalud, and most major clinics',
    icon: Zap,
  },
  {
    name: 'HD Lipo (High-Definition)',
    price: '£4,000–£6,500',
    description: 'Advanced technique sculpting around muscle groups. Creates visible abdominal definition (six-pack, obliques). Requires highly experienced surgeon.',
    availability: 'Available at elite clinics in Barcelona and Madrid',
    icon: Award,
  },
  {
    name: 'Ab Etching',
    price: '£3,500–£6,000',
    description: 'Sub-technique of HD lipo focused specifically on creating visible abdominal muscle definition. Best for athletic patients at low body fat percentage.',
    availability: 'Available at specialist clinics',
    icon: Activity,
  },
  {
    name: 'Lipo + BBL',
    price: '£5,000–£9,000',
    description: 'Fat harvested via liposuction, purified, then transferred to buttocks. Spain\'s clinics use VASER for harvest (better fat cell viability). Among the highest BBL safety standards in Europe.',
    availability: '',
    icon: Heart,
  },
  {
    name: 'SWT Liposuction',
    price: 'Available at Wellness Kliniek',
    description: 'Skin Wave Technology combines fat removal with skin tightening via acoustic wave technology. Addresses mild skin laxity without needing a full tummy tuck.',
    availability: '',
    icon: Sparkles,
  },
  {
    name: '3D Visualisation',
    price: 'Available at Clinica Granado Tiagonce',
    description: '3D body scanning projects expected outcomes. Patients see their projected results before committing to surgery. Helps set realistic expectations.',
    availability: '',
    icon: Eye,
  },
]

const RECOVERY_TIMELINE = [
  { phase: 'Procedure', timeframe: '2–3 hours', detail: 'Under local or general anaesthesia' },
  { phase: 'Hospital stay', timeframe: '1 night typical', detail: 'Longer for multi-area or HD lipo. Some day-case options.' },
  { phase: 'First follow-up', timeframe: 'Day 2–3', detail: 'Dressings checked. Gentle walking encouraged.' },
  { phase: 'Bruising peaks', timeframe: 'Days 5–7', detail: 'Normal post-operative bruising, less with VASER' },
  { phase: 'Fit to fly', timeframe: 'Day 5–7', detail: '2–2.5 hour flight to London well-tolerated', highlight: true },
  { phase: 'Return to work', timeframe: '1–2 weeks', detail: 'Desk work from day 7. Active jobs: 2–3 weeks.' },
  { phase: 'Final results', timeframe: '3–6 months', detail: 'Skin retracts and contours settle gradually' },
]

const CITY_RECOVERY_TIPS = [
  {
    city: 'Barcelona',
    tips: [
      'Walkable waterfront (La Barceloneta, Port Olímpic)',
      'Avoid peak summer heat (July–August) for recovery',
      '2 hours from London, multiple daily flights',
      'Hotels: 4-star from €80/night in Eixample',
    ],
    icon: MapPin,
  },
  {
    city: 'Madrid',
    tips: [
      'Capital city with world-class medical infrastructure',
      'Retiro Park for gentle, flat walking',
      '2.5 hours from London, numerous daily flights',
      'Hotels: 4-star from €75/night near Retiro',
    ],
    icon: MapPin,
  },
  {
    city: 'Marbella (Costa del Sol)',
    tips: [
      'Premier recovery destination — beach, warm climate',
      'Large British expat community — feels familiar',
      'Málaga Airport: 2.5 hours from London, 45 mins to Marbella',
      'Beachfront hotels from €90/night',
    ],
    icon: MapPin,
  },
  {
    city: 'Valencia',
    tips: [
      'Emerging medical tourism destination',
      'City of Arts and Sciences for gentle walks',
      '2.5 hours from London, direct flights',
      'Hotels: 4-star from €65/night — most affordable coastal city',
    ],
    icon: MapPin,
  },
]

const DESTINATIONS = [
  { name: 'Turkey', price: 'From £1,500/area', desc: 'Maximum savings, all-inclusive packages, 45,000+ procedures/year', href: '/procedures/liposuction/turkey' },
  { name: 'Hungary', price: 'From £1,165/area', desc: 'Lowest EU prices, Budapest-centric, EU-regulated', href: '/procedures/liposuction/hungary' },
  { name: 'Poland', price: 'From £500/area', desc: 'EU-regulated, exclusive N.I.L. technology, multi-city options', href: '/procedures/liposuction/poland' },
]

// =============================================================================
// TYPES
// =============================================================================

interface FAQ {
  question: string
  answer: string
}

interface LiposuctionSpainClientProps {
  faqs: FAQ[]
}

// =============================================================================
// ANIMATION HELPERS
// =============================================================================

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function LiposuctionSpainClient({ faqs }: LiposuctionSpainClientProps) {
  return (
    <div className="bg-neutral-50">
        {/* =====================================================================
            SECTION A: HERO
            ===================================================================== */}
        <section className="relative overflow-hidden bg-[#0A1A2F] py-28 sm:py-36 lg:py-48">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-rose-600/20" />
          <m.div
            animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary-500/10 blur-[100px]"
          />
          <m.div
            animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-rose-500/10 blur-[100px]"
          />
          <div className="absolute inset-0 bg-[url('/images/patterns/dental-pattern.svg')] opacity-[0.03] mix-blend-overlay" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary-300">Premium Cosmetic Surgery</span>
            </m.div>

            <m.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-8xl"
            >
              Liposuction in{' '}
              <span className="bg-gradient-to-r from-primary-300 to-rose-300 bg-clip-text text-transparent">Spain</span>
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-8 max-w-3xl text-xl font-light leading-relaxed text-neutral-300 sm:text-2xl"
            >
              World-class body contouring at Europe&apos;s top hospitals. VASER,
              HD lipo, and lipo 360 in Barcelona, Madrid, and Marbella —
              EU-regulated, board-certified SECPRE surgeons, 40–60% savings vs UK.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row"
            >
              <Link href="/clinics?procedure=liposuction&country=spain" className="w-full sm:w-auto">
                <Button size="lg" className="w-full rounded-full bg-white px-12 py-7 text-lg font-bold text-primary-900 shadow-xl shadow-white/10 transition-all duration-300 hover:scale-105 hover:bg-neutral-100">
                  Compare Clinics in Spain
                </Button>
              </Link>
              <Link href="/enquiry?procedure=liposuction&country=spain" className="w-full sm:w-auto">
                <Button size="lg" className="w-full rounded-full border border-white/20 bg-white/10 px-12 py-7 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20">
                  Get Free Quote
                </Button>
              </Link>
            </m.div>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mx-auto mt-6 max-w-2xl text-sm text-neutral-400"
            >
              #1 healthiest nation • Quirónsalud hospitals • SECPRE-certified surgeons • EU-regulated
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {HERO_STATS.map((stat, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-md">
                  <p className="text-xs uppercase tracking-widest text-neutral-400">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-white">{stat.value}</p>
                  <p className="mt-1 text-xs text-neutral-500">{stat.sub}</p>
                </div>
              ))}
            </m.div>
          </div>
        </section>

        {/* =====================================================================
            SECTION B: WHY SPAIN
            ===================================================================== */}
        <section className="py-28 sm:py-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-12">
              <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
                <m.div {...fadeInUp}>
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">Why Spain</span>
                  <h2 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl">
                    Europe&apos;s Premium Choice for Liposuction
                  </h2>
                  <p className="mt-6 text-lg font-light leading-relaxed text-neutral-500">
                    #1 healthiest nation, Quirónsalud hospitals, SECPRE-certified surgeons, and 450,000 procedures annually.
                  </p>
                  <div className="mt-10 rounded-2xl border border-primary-100 bg-primary-50 p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <Shield className="h-5 w-5 text-primary-600" />
                      <span className="text-sm font-bold text-primary-900">SECPRE-Regulated</span>
                    </div>
                    <p className="text-sm font-light text-primary-700/80">
                      Spain&apos;s plastic surgeons are regulated by SECPRE, requiring specialist training and ongoing professional development — the gold standard in EU cosmetic surgery oversight.
                    </p>
                  </div>
                </m.div>
              </div>

              <div className="space-y-6 lg:col-span-8">
                {WHY_SPAIN_POINTS.map((point, i) => (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-[2rem] border border-neutral-100 bg-white p-8 transition-colors hover:border-primary-100"
                  >
                    <div className="flex items-start gap-5">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50">
                        <CheckCircle className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-neutral-900">{point.title}</h3>
                        <p className="mt-3 font-light leading-relaxed text-neutral-500">{point.text}</p>
                      </div>
                    </div>
                  </m.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION C: PRICING
            ===================================================================== */}
        <m.section {...fadeInUp} className="py-28 sm:py-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[3rem] bg-neutral-900 p-8 sm:p-16 lg:p-20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-transparent to-rose-600/10" />
              <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-primary-500/5 blur-[80px]" />

              <div className="relative z-10">
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary-400">2026 Price Guide</span>
                <h2 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
                  How Much Does Liposuction Cost in Spain?
                </h2>
                <p className="mt-4 max-w-2xl text-lg font-light text-neutral-400">
                  Premium EU pricing with 40–60% savings vs UK. Prices include 21% Spanish VAT.
                </p>

                {/* Cost by Technique Table */}
                <div className="mt-12 rounded-3xl bg-white p-2 shadow-2xl" data-aeo="liposuction-spain-cost">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="text-left">
                          <th className="p-6 text-sm font-bold uppercase tracking-widest text-neutral-400">Technique</th>
                          <th className="p-6 text-sm font-bold uppercase tracking-widest text-primary-600">Spain</th>
                          <th className="p-6 text-sm font-bold uppercase tracking-widest text-neutral-400">UK</th>
                          <th className="p-6 text-sm font-bold uppercase tracking-widest text-green-600">Savings</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {COST_BY_TECHNIQUE.map(([tech, spain, uk, savings], i) => (
                          <tr key={i} className="transition-colors hover:bg-neutral-50">
                            <td className="p-6 font-bold text-neutral-900">{tech}</td>
                            <td className="p-6 font-bold text-primary-600">{spain}</td>
                            <td className="p-6 font-light text-neutral-400 line-through">{uk}</td>
                            <td className="p-6"><span className="rounded-full bg-green-50 px-3 py-1 text-sm font-bold text-green-600">{savings}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Cost by City Table */}
                <div className="mt-10">
                  <h3 className="mb-6 text-xl font-bold text-white">Cost by City</h3>
                  <div className="rounded-3xl bg-white p-2 shadow-2xl">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="text-left">
                            <th className="p-6 text-sm font-bold uppercase tracking-widest text-neutral-400">City</th>
                            <th className="p-6 text-sm font-bold uppercase tracking-widest text-primary-600">Price Range</th>
                            <th className="p-6 text-sm font-bold uppercase tracking-widest text-neutral-400">Positioning</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                          {COST_BY_CITY.map((row, i) => (
                            <tr key={i} className="transition-colors hover:bg-neutral-50">
                              <td className="p-6 font-bold text-neutral-900">{row.city}</td>
                              <td className="p-6 font-bold text-primary-600">{row.price}</td>
                              <td className="p-6 font-light text-neutral-500">{row.positioning}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Package Inclusions + CTA */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                    <h3 className="mb-4 text-lg font-bold text-white">Package Inclusions (Typical)</h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {PACKAGE_INCLUSIONS.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                          <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary-400" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 p-8 text-center">
                    <h3 className="mb-3 text-xl font-bold text-white">Need a custom quote?</h3>
                    <p className="mb-6 text-sm font-light text-primary-100">Get personalised pricing based on your goals and body assessment.</p>
                    <Link href="/enquiry?procedure=liposuction&country=spain">
                      <Button className="rounded-full bg-white px-8 py-6 font-bold text-primary-700 hover:bg-primary-50">
                        Request a Quote
                      </Button>
                    </Link>
                  </div>
                </div>

                <p className="mt-8 text-sm italic text-neutral-500">
                  Prices based on published rates from Wellness Kliniek Barcelona,
                  Quirónsalud, Instituto de Benito, and WhatClinic (2024–2026).
                  Prices include 21% Spanish VAT at reputable clinics. Request a
                  personalised quote for accurate pricing.
                </p>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION D: TECHNIQUES
            ===================================================================== */}
        <section className="py-28 sm:py-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="mb-16 max-w-3xl">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">Methods</span>
              <h2 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl">
                Advanced Techniques Available
              </h2>
              <p className="mt-4 text-lg font-light text-neutral-600">
                Spain offers the full spectrum of liposuction techniques, with particular strength in advanced body sculpting.
              </p>
            </m.div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" data-aeo="advanced-liposuction-spain">
              {TECHNIQUES.map((tech, i) => (
                <m.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-[2.5rem] border border-neutral-200/60 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-900/5"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-100/30 transition-all duration-700 group-hover:scale-150 group-hover:bg-primary-100/40" />
                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                      <tech.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">{tech.name}</h3>
                    <p className="mt-1 text-sm font-bold text-primary-600">{tech.price}</p>
                    <p className="mt-4 text-sm font-light leading-relaxed text-neutral-500">{tech.description}</p>
                    {tech.availability && (
                      <p className="mt-3 text-xs text-neutral-400">{tech.availability}</p>
                    )}
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION E: TOP CLINICS
            ===================================================================== */}
        <section className="bg-white py-28 sm:py-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">Providers</span>
                <h2 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl">
                  Top Clinics &amp; Surgeons
                </h2>
                <p className="mt-4 text-lg font-light text-neutral-600">
                  Quirónsalud hospitals and SECPRE-certified surgeons vetted for international standards.
                </p>
              </div>
              <Link href="/clinics?procedure=liposuction&country=spain">
                <Button variant="outline" className="group rounded-full border-neutral-200 px-8 py-6 transition-all duration-300 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700">
                  View All Clinics <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </m.div>

            <div className="grid gap-8 lg:grid-cols-2">
              {CLINICS.map((clinic, i) => (
                <m.div
                  key={clinic.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative flex flex-col rounded-[2.5rem] border border-neutral-200/60 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary-300 hover:shadow-2xl hover:shadow-primary-900/10"
                >
                  <div className="mb-8 flex items-start justify-between">
                    <div>
                      <h3 className="mb-2 text-2xl font-bold text-neutral-900">{clinic.name}</h3>
                      <div className="flex items-center gap-2 font-medium text-primary-600">
                        <MapPin className="h-4 w-4" />
                        {clinic.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-xl bg-green-50 px-4 py-2 text-green-700">
                      <Star className="h-4 w-4 fill-green-500 text-green-500" />
                      <span className="text-sm font-bold">{clinic.rating}</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="mb-4 inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-700">
                      {clinic.highlight}
                    </div>
                    <ul className="space-y-2">
                      {clinic.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm font-light leading-relaxed text-neutral-500">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-6">
                    <span className="text-sm font-medium text-neutral-400">SECPRE Certified</span>
                    <span className="flex items-center gap-2 text-sm font-bold text-primary-600 transition-colors group-hover:text-primary-700">
                      View Profile <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </m.div>
              ))}
            </div>

            {/* Notable Surgeon */}
            <m.div
              {...fadeInUp}
              className="relative mt-16 overflow-hidden rounded-[3rem] border border-primary-100 bg-gradient-to-br from-primary-50 to-white p-10"
            >
              <div className="absolute -mr-10 -mb-10 right-0 bottom-0 h-40 w-40 rounded-full bg-primary-200/20 blur-3xl" />
              <div className="relative z-10 flex flex-col items-center gap-10 md:flex-row">
                <div className="flex-shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-600 shadow-xl shadow-primary-200">
                    <Award className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-2xl font-bold text-primary-900">Notable Surgeon</h3>
                  <p className="text-lg font-bold text-primary-800">Dr. Javier de Benito (Instituto de Benito, Barcelona/Madrid)</p>
                  <ul className="mt-3 space-y-1 text-sm font-light leading-relaxed text-primary-800/80">
                    <li>• Former Vice President of ISAPS</li>
                    <li>• Rated among top 10 plastic surgeons worldwide</li>
                    <li>• 30+ years of experience</li>
                    <li>• Specialist in body contouring, liposuction, and complex cosmetic surgery</li>
                    <li>• Operates in both Barcelona and Madrid</li>
                  </ul>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* =====================================================================
            SECTION F: RECOVERY TIMELINE
            ===================================================================== */}
        <section className="py-28 sm:py-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="mb-16 max-w-3xl">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">Recovery</span>
              <h2 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl">
                What to Expect After Surgery
              </h2>
              <p className="mt-4 text-lg font-light text-neutral-600">
                Your day-by-day recovery guide for liposuction in Spain.
              </p>
            </m.div>

            <div className="relative" data-aeo="liposuction-spain-recovery">
              <div className="absolute bottom-0 left-8 top-0 hidden w-px bg-gradient-to-b from-primary-200 via-primary-300 to-transparent lg:block" />
              <div className="space-y-8">
                {RECOVERY_TIMELINE.map((step, i) => (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="relative lg:pl-24"
                  >
                    <div className="absolute left-0 top-8 hidden h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 text-sm font-bold text-white shadow-lg shadow-primary-200 lg:flex">
                      {i + 1}
                    </div>
                    <div className={`rounded-[2rem] border bg-white p-8 transition-colors hover:border-primary-100 ${step.highlight ? 'border-primary-200 bg-primary-50/30' : 'border-neutral-100'}`}>
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-600">{step.phase}</span>
                        <span className="text-sm font-bold text-neutral-700">{step.timeframe}</span>
                        {step.highlight && (
                          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600">
                            <Plane className="mr-1 inline h-3 w-3" /> Fit to fly
                          </span>
                        )}
                      </div>
                      <p className="font-light leading-relaxed text-neutral-500">{step.detail}</p>
                    </div>
                  </m.div>
                ))}
              </div>
            </div>

            {/* City-Specific Recovery Tips */}
            <m.div {...fadeInUp} className="mt-20">
              <h3 className="mb-8 text-2xl font-bold text-neutral-900">City-Specific Recovery &amp; Travel Tips</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {CITY_RECOVERY_TIPS.map((city, i) => (
                  <div key={i} className="rounded-[2rem] border border-neutral-100 bg-white p-8 transition-colors hover:border-primary-100">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                        <city.icon className="h-5 w-5" />
                      </div>
                      <h4 className="text-lg font-bold text-neutral-900">{city.city}</h4>
                    </div>
                    <ul className="space-y-2">
                      {city.tips.map((tip, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm font-light text-neutral-500">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </m.div>

            <m.div {...fadeInUp} className="mt-10 rounded-2xl border border-primary-100 bg-primary-50 p-6">
              <p className="font-light text-primary-800">
                <strong className="font-bold">Recommended stay:</strong> 7 days (allows for surgery, 2 follow-ups, and fit-to-fly clearance)
              </p>
            </m.div>
          </div>
        </section>

        {/* =====================================================================
            SECTION G: DESTINATION COMPARISON
            ===================================================================== */}
        <section className="py-28 sm:py-36 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="mx-auto mb-16 max-w-3xl text-center">
              <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-primary-600">Alternatives</span>
              <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl">
                Compare Destinations
              </h2>
              <p className="mt-4 text-lg font-light text-neutral-600">
                Spain offers premium quality at Europe&apos;s top hospitals, while other destinations may offer greater savings.
              </p>
            </m.div>

            <div className="grid gap-8 sm:grid-cols-3">
              {DESTINATIONS.map((dest, i) => (
                <m.div
                  key={dest.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={dest.href} className="group block rounded-[2.5rem] border border-neutral-200/60 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary-200 hover:shadow-xl">
                    <h3 className="text-2xl font-bold text-neutral-900 transition-colors group-hover:text-primary-700">{dest.name}</h3>
                    <p className="mt-2 font-bold text-primary-600">{dest.price}</p>
                    <p className="mt-4 text-sm font-light text-neutral-500">{dest.desc}</p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-bold text-primary-600">
                      View Guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </m.div>
              ))}
            </div>

            <m.div {...fadeInUp} className="mt-10 text-center">
              <Link href="/procedures/liposuction" className="inline-flex items-center gap-2 font-medium text-primary-600 transition-colors hover:text-primary-700">
                ← Compare all liposuction destinations
              </Link>
            </m.div>
          </div>
        </section>

        {/* =====================================================================
            SECTION H: FAQ
            ===================================================================== */}
        <section className="py-28 sm:py-36">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="mb-16 text-center">
              <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-primary-600">Common Questions</span>
              <h2 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
                Liposuction Spain FAQs
              </h2>
            </m.div>
            <m.div {...fadeInUp} className="rounded-[2.5rem] border border-neutral-200/60 bg-white p-4 shadow-xl shadow-neutral-100 sm:p-10">
              <FAQSection faqs={faqs} title="" className="faq-section-custom" />
            </m.div>
          </div>
        </section>

        {/* =====================================================================
            SECTION I: CTA
            ===================================================================== */}
        <m.section {...fadeInUp} className="px-4 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[3rem] bg-[#0A1A2F] p-12 text-center text-white shadow-2xl sm:p-20 lg:p-32">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 via-transparent to-rose-600/30" />
              <m.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -left-1/4 -top-1/4 h-full w-full rounded-full bg-primary-500/10 blur-[120px]"
              />
              <div className="absolute inset-0 bg-[url('/images/patterns/dental-pattern.svg')] opacity-[0.03] mix-blend-overlay" />

              <div className="relative z-10 mx-auto max-w-4xl">
                <span className="mb-6 block text-sm font-bold uppercase tracking-[0.3em] text-primary-300">Ready to begin?</span>
                <h2 className="mb-8 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                  Your Transformation <br />Starts in <span className="text-primary-400">Spain</span>
                </h2>
                <p className="mx-auto mt-8 max-w-2xl text-xl font-light leading-relaxed text-neutral-300">
                  Compare prices from world-class clinics in Barcelona, Madrid, and
                  Marbella. Quirónsalud hospitals, SECPRE-certified surgeons, and
                  advanced HD lipo techniques — no obligation.
                </p>

                <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
                  <Link href="/clinics?procedure=liposuction&country=spain" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full rounded-full bg-white px-12 py-8 text-lg font-bold text-primary-900 shadow-xl shadow-white/10 transition-all duration-300 hover:scale-105 hover:bg-neutral-100">
                      Compare Liposuction Clinics in Spain
                    </Button>
                  </Link>
                  <Link href="/enquiry?procedure=liposuction&country=spain" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full rounded-full border border-white/20 bg-white/10 px-12 py-8 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20">
                      Get Free Clinic Recommendations
                    </Button>
                  </Link>
                </div>

                <div className="mt-16 flex flex-wrap justify-center gap-8 border-t border-white/10 pt-10 text-sm font-medium text-neutral-400">
                  <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary-400" /> EU-Regulated</div>
                  <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary-400" /> SECPRE-Certified</div>
                  <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary-400" /> Verified Pricing</div>
                </div>
              </div>
            </div>
          </div>
        </m.section>

        {/* INTERNAL LINKS */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl border-t border-neutral-100 pt-12">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium">
              <span className="text-xs uppercase tracking-widest text-neutral-400">Related Guides:</span>
              <Link href="/cosmetic-surgery" className="text-neutral-600 transition-colors hover:text-primary-600">Cosmetic Surgery Abroad</Link>
              <Link href="/procedures/liposuction/turkey" className="text-neutral-600 transition-colors hover:text-primary-600">Liposuction in Turkey</Link>
              <Link href="/procedures/liposuction/hungary" className="text-neutral-600 transition-colors hover:text-primary-600">Liposuction in Hungary</Link>
              <Link href="/procedures/liposuction/poland" className="text-neutral-600 transition-colors hover:text-primary-600">Liposuction in Poland</Link>
              <Link href="/procedures/liposuction" className="text-neutral-600 transition-colors hover:text-primary-600">Compare All Destinations</Link>
              <Link href="/destinations/spain" className="text-neutral-600 transition-colors hover:text-primary-600">Medical Tourism Spain</Link>
            </div>
          </div>
        </section>
      </div>
  )
}
