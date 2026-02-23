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
  { label: 'From', value: '£500', sub: 'per area' },
  { label: 'Save', value: 'Up to 85%', sub: 'vs UK prices' },
  { label: 'Cities', value: '3+', sub: '1,200+ facilities' },
  { label: 'Flights', value: '£20', sub: 'from UK cities' },
]

const WHY_POLAND_POINTS = [
  {
    title: 'Rapid Growth in Medical Tourism',
    text: "Poland\u2019s medical tourism sector grows at 20% annually, with over 100,000 foreign patients visiting for treatment. The country combines full EU healthcare regulation with Eastern European pricing \u2014 delivering exceptional value without compromising on safety or quality. With 1,200+ medical facilities offering cosmetic procedures, Poland has rapidly become one of Europe\u2019s most popular destinations for cosmetic surgery.",
  },
  {
    title: 'Multiple World-Class Medical Cities',
    text: "Unlike Hungary (Budapest only) or Turkey (Istanbul-centric), Poland offers multiple world-class medical cities. Warsaw, the capital, has the largest clinic selection including Poland\u2019s only dedicated liposuction clinic. Krak\u00f3w offers a UNESCO World Heritage setting for recovery with strong medical schools. Wroc\u0142aw \u2014 the \u201cPolish Venice\u201d with 12 islands and 130 bridges \u2014 provides the lowest starting prices and serves as the gateway to Europe\u2019s leading N.I.L. specialist clinic.",
  },
  {
    title: 'Exclusive N.I.L. Infrasound Technology',
    text: "Poland is one of the few countries offering N.I.L. (Nutational Infrasound Liposuction), a Belgian technology where the cannula generates spiral movement via compressed air. Infrasound waves avoid contact with nerves and tissue, resulting in minimal pain, reduced trauma, and faster recovery. KCM Clinic in Jelenia G\u00f3ra (90km from Wroc\u0142aw) is Europe\u2019s leading N.I.L. specialist \u2014 a technique not available in the UK, Turkey, Hungary, or Spain.",
  },
  {
    title: 'Highly Trained Surgeons & Easy Access',
    text: "Polish surgeons complete extensive training (6-year medical degree plus 5\u20136 years specialist training) and must be certified by the Polish Society of Plastic, Reconstructive and Aesthetic Surgery. Many hold international credentials including ESPRAS and EBOPRAS certification. And with return flights from UK cities starting at just \u00a320 on Ryanair and Wizz Air, Poland is one of the cheapest destinations to reach for medical tourism.",
  },
]

const PRICING_BY_TECHNIQUE = [
  ['Traditional liposuction (1 area)', '£500–£3,800', '£3,000–£6,000', '40–85%'],
  ['VASER liposuction (1 area)', '£2,400–£3,700', '£4,700–£11,200', '50–67%'],
  ['N.I.L. infrasound liposuction', '£1,500–£3,000', 'Not available in UK', '—'],
  ['Lipo 360', '£2,500–£4,000', '£5,000–£9,000', '50–55%'],
  ['Multi-area packages', 'From €1,900 (≈£1,600)', '—', '—'],
]

const PRICING_BY_CITY = [
  ['Wrocław', 'From £500', 'Lowest starting prices. NavMedica and KCM Clinic nearby'],
  ['Warsaw', '£1,500–£3,800', 'Capital city premium. Widest clinic selection. Centrum Liposukcji'],
  ['Kraków', '£1,200–£3,500', 'Strong medical heritage. AllMedica Surgery'],
  ['Poznań', '£1,200–£3,000', 'Smaller city, competitive pricing'],
  ['Szczecin', '£1,000–£2,800', 'Beauty Group clinic'],
]

const PACKAGE_INCLUSIONS = [
  { title: 'Surgery', desc: "Surgeon\u2019s fee + operating theatre" },
  { title: 'Hospital Stay', desc: 'Overnight if general anaesthesia' },
  { title: 'Anaesthesia', desc: 'General or local anaesthesia' },
  { title: 'Pre-op', desc: 'Consultation and blood work' },
  { title: 'Compression Garment', desc: 'Post-operative compression garment' },
  { title: 'Follow-ups', desc: 'Post-operative appointments' },
]

const NIL_COMPARISON = [
  { factor: 'Pain level', nil: 'Very low', traditional: 'Moderate', vaser: 'Low–Moderate', laser: 'Low–Moderate' },
  { factor: 'Tissue trauma', nil: 'Minimal', traditional: 'Higher', vaser: 'Low', laser: 'Low' },
  { factor: 'Nerve preservation', nil: 'Excellent', traditional: 'Standard', vaser: 'Good', laser: 'Good' },
  { factor: 'Recovery time', nil: 'Fast', traditional: 'Slower', vaser: 'Fast', laser: 'Fast' },
  { factor: 'Availability', nil: 'Limited (Poland, Belgium)', traditional: 'Worldwide', vaser: 'Widespread', laser: 'Widespread' },
  { factor: 'Cost (Poland)', nil: '£1,500–£3,000', traditional: '£500–£3,800', vaser: '£2,400–£3,700', laser: '£1,500–£3,000' },
]

const CLINICS = [
  {
    name: 'KCM Clinic',
    location: 'Jelenia Góra',
    locationNote: '90km from Wrocław',
    highlight: 'Leading N.I.L. specialist',
    specialties: [
      "Poland\u2019s leading N.I.L. infrasound specialist",
      'Multi-discipline clinic, international focus',
      'ISO accredited',
      'N.I.L. + traditional + VASER techniques',
    ],
  },
  {
    name: 'Centrum Liposukcji',
    location: 'Warsaw',
    highlight: 'Only dedicated lipo clinic',
    specialties: [
      "Poland\u2019s only dedicated liposuction clinic",
      'Offers 10+ liposuction methods',
      'Specialists exclusively focused on body contouring',
      'Central Warsaw location',
    ],
  },
  {
    name: 'NavMedica',
    location: 'Wrocław',
    locationNote: '10 mins from Wrocław Airport',
    highlight: 'Convenient for UK patients',
    specialties: [
      'Convenient for UK patients',
      'Plastic surgery and body contouring specialist',
      'English-speaking team',
    ],
  },
  {
    name: 'AllMedica Surgery',
    location: 'Kraków',
    highlight: 'Cultural capital clinic',
    specialties: [
      'Multi-specialty clinic',
      "Modern facilities in Poland\u2019s cultural capital",
      'International patient experience',
    ],
  },
  {
    name: 'Allestetis',
    location: 'Nowy Targ',
    locationNote: 'Near Kraków',
    highlight: 'Dr. Boligłowa specialist',
    specialties: [
      'Lead surgeon: Dr. Boligłowa',
      'Body contouring specialist',
      'Mountain setting, personalised care',
    ],
  },
  {
    name: 'Beauty Group',
    location: 'Szczecin',
    highlight: 'Northwest Poland',
    specialties: [
      'Northwest Poland, near German border',
      'Body contouring and plastic surgery',
      'Growing international patient base',
    ],
  },
]

const RECOVERY_STEPS = [
  { day: 'Day 0', title: 'Surgery Day', description: 'Procedure 1–3 hours. Overnight if general anaesthesia. Compression garment fitted.' },
  { day: 'Day 2–3', title: 'First Follow-up', description: 'Dressings checked. Light walking around the city encouraged.' },
  { day: 'Days 3–7', title: 'Bruising Peaks', description: 'Normal bruising. N.I.L. patients typically experience less bruising.' },
  { day: 'Day 5–7', title: 'Fit to Fly', description: '2–2.5 hour flight to London well-tolerated.' },
  { day: 'Days 3–14', title: 'Return to Desk Work', description: 'N.I.L. and VASER patients often return faster (3–7 days). Traditional: 7–14 days.' },
  { day: 'Up to 6 weeks', title: 'Compression Garment', description: 'Worn continuously, removing only to wash.' },
  { day: '3–6 months', title: 'Final Results', description: 'Swelling resolves gradually over 8–12 weeks.' },
]

const CITY_TRAVEL_TIPS = [
  {
    name: 'Warsaw',
    tips: [
      '2 hrs from London (multiple daily flights)',
      'Old Town and Łazienki Park for recovery walks',
      'Metro system for easy transport',
      'Hotels: 4-star from €60/night',
    ],
  },
  {
    name: 'Kraków',
    tips: [
      '2.5 hrs from London',
      'UNESCO World Heritage Old Town',
      'Flat Main Square and Planty Park',
      'Hotels: 4-star from €50/night',
    ],
  },
  {
    name: 'Wrocław',
    tips: [
      '2 hrs from London (Ryanair hub)',
      '\u201cPolish Venice\u201d \u2014 12 islands, 130 bridges',
      'Gateway to KCM Clinic (N.I.L. specialist)',
      'Hotels: 4-star from €45/night \u2014 best value',
    ],
  },
]

const DESTINATION_COMPARISONS = [
  { name: 'Turkey', price: 'From £1,500/area', desc: 'Widest choice, all-inclusive packages, 45,000+ procedures/year', href: '/procedures/liposuction/turkey' },
  { name: 'Hungary', price: 'From £1,165/area', desc: 'Lowest EU prices, Budapest-centric, EU-regulated', href: '/procedures/liposuction/hungary' },
  { name: 'Spain', price: 'From £2,400/area', desc: 'Premium quality, #1 healthcare ranking, world-class hospitals', href: '/procedures/liposuction/spain' },
]

// =============================================================================
// TYPES
// =============================================================================

interface FAQ {
  question: string
  answer: string
}

interface LiposuctionPolandClientProps {
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

export function LiposuctionPolandClient({ faqs }: LiposuctionPolandClientProps) {
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
          <div className="absolute inset-0 bg-transparent opacity-[0.03] mix-blend-overlay" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="text-sm font-bold tracking-[0.3em] text-primary-300 uppercase">Premium Cosmetic Surgery</span>
            </m.div>

            <m.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-8xl leading-[0.95]"
            >
              Liposuction in{' '}
              <span className="bg-gradient-to-r from-primary-300 to-rose-300 bg-clip-text text-transparent">Poland</span>
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-8 max-w-3xl text-xl text-neutral-300 font-light leading-relaxed sm:text-2xl"
            >
              Save up to 85% vs UK prices at ISO-accredited clinics in Warsaw,
              Kraków, and Wrocław. EU-regulated, board-certified surgeons
              offering VASER, traditional, and Poland-exclusive N.I.L.
              infrasound liposuction — with flights from just £20.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row"
            >
              <Link href="/clinics?procedure=liposuction&country=poland" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-12 py-7 text-lg font-bold shadow-xl shadow-white/10">
                  Compare Liposuction Clinics in Poland
                </Button>
              </Link>
              <Link href="/enquiry?procedure=liposuction&country=poland" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-full px-12 py-7 text-lg font-bold backdrop-blur-md">
                  Get Free Quote
                </Button>
              </Link>
            </m.div>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-6 text-sm text-neutral-400"
            >
              EU-regulated • ISO 9001 / ESPRAS accredited • 1,200+ medical
              facilities • Flights from £20
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              {HERO_STATS.map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center">
                  <p className="text-xs text-neutral-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-xs text-neutral-500 mt-1">{stat.sub}</p>
                </div>
              ))}
            </m.div>
          </div>
        </section>

        {/* =====================================================================
            SECTION B: WHY POLAND
            ===================================================================== */}
        <section className="py-28 sm:py-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
                <m.div {...fadeInUp}>
                  <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Why Poland</span>
                  <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                    Europe&apos;s Rising Star for Liposuction
                  </h2>
                  <p className="mt-6 text-lg text-neutral-500 font-light leading-relaxed">
                    EU-regulated clinics, exclusive N.I.L. technology, and savings of up to 85%
                    with flights from just £20.
                  </p>
                  <div className="mt-10 p-6 bg-primary-50 rounded-2xl border border-primary-100">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="h-5 w-5 text-primary-600" />
                      <span className="font-bold text-primary-900 text-sm">EU-Regulated</span>
                    </div>
                    <p className="text-sm text-primary-700/80 font-light">
                      Full EU healthcare regulation with ISO 9001 and ESPRAS accreditation —
                      delivering exceptional value without compromising on safety or quality.
                    </p>
                  </div>
                </m.div>
              </div>

              <div className="lg:col-span-8 space-y-6" data-aeo="liposuction-poland-benefits">
                {WHY_POLAND_POINTS.map((point, i) => (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="p-8 rounded-[2rem] border border-neutral-100 bg-white hover:border-primary-100 transition-colors"
                  >
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-neutral-900">{point.title}</h3>
                        <p className="mt-3 text-neutral-500 font-light leading-relaxed">
                          {point.title === 'Rapid Growth in Medical Tourism' ? (
                            <>
                              {point.text.split('cosmetic surgery')[0]}
                              <Link href="/cosmetic-surgery" className="text-primary-600 hover:underline">cosmetic surgery</Link>
                              {point.text.split('cosmetic surgery')[1]}
                            </>
                          ) : (
                            point.text
                          )}
                        </p>
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
            <div className="bg-neutral-900 rounded-[3rem] p-8 sm:p-16 lg:p-20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-transparent to-rose-600/10" />
              <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-primary-500/5 blur-[80px]" />

              <div className="relative z-10" data-aeo="liposuction-poland-cost">
                <span className="text-sm font-bold tracking-[0.2em] text-primary-400 uppercase">2026 Price Guide</span>
                <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl tracking-tight leading-[1.1]">
                  How Much Does Liposuction Cost in Poland?
                </h2>
                <p className="mt-4 text-lg text-neutral-400 font-light max-w-2xl">
                  Save up to 85% compared to equivalent UK procedures. EU-regulated pricing.
                </p>

                {/* Cost by Technique */}
                <h3 className="mt-12 text-lg font-bold text-white mb-6">Cost by Technique</h3>
                <div className="bg-white rounded-3xl p-2 shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="text-left">
                          <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">Procedure</th>
                          <th className="p-6 text-sm font-bold text-primary-600 uppercase tracking-widest">Poland</th>
                          <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">UK</th>
                          <th className="p-6 text-sm font-bold text-green-600 uppercase tracking-widest">Savings</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {PRICING_BY_TECHNIQUE.map(([procedure, poland, uk, savings], i) => (
                          <tr key={i} className="hover:bg-neutral-50 transition-colors">
                            <td className="p-6 font-bold text-neutral-900">{procedure}</td>
                            <td className="p-6 text-primary-600 font-bold">{poland}</td>
                            <td className="p-6 text-neutral-400 font-light">{uk !== '—' && uk !== 'Not available in UK' ? <span className="line-through">{uk}</span> : <span className="italic">{uk}</span>}</td>
                            <td className="p-6">
                              {savings !== '—' ? (
                                <span className="text-green-600 bg-green-50 font-bold px-3 py-1 rounded-full text-sm">{savings}</span>
                              ) : (
                                <span className="text-neutral-400">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Cost by City */}
                <h3 className="mt-12 text-lg font-bold text-white mb-6">Cost by City</h3>
                <div className="bg-white rounded-3xl p-2 shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="text-left">
                          <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">City</th>
                          <th className="p-6 text-sm font-bold text-primary-600 uppercase tracking-widest">Price Range</th>
                          <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {PRICING_BY_CITY.map(([city, price, notes], i) => (
                          <tr key={i} className="hover:bg-neutral-50 transition-colors">
                            <td className="p-6 font-bold text-neutral-900">{city}</td>
                            <td className="p-6 text-primary-600 font-bold">{price}</td>
                            <td className="p-6 text-neutral-500 font-light">{notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Package Inclusions + Quote CTA */}
                <div className="mt-12 grid sm:grid-cols-2 gap-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4">Package Inclusions (Typical)</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {PACKAGE_INCLUSIONS.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                          <CheckCircle className="h-4 w-4 text-primary-400 flex-shrink-0" />
                          {item.title}
                        </div>
                      ))}
                    </div>
                    <p className="mt-6 text-xs text-neutral-500 leading-relaxed">
                      Polish clinics tend to offer surgical packages rather than &ldquo;all-inclusive&rdquo; packages.
                      Hotel and transfers are usually booked separately, which gives patients more flexibility
                      and can reduce costs — Polish hotels are very affordable with central 4-star hotels
                      from €50–€80/night.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
                    <h3 className="text-xl font-bold text-white mb-3">Need a personalised quote?</h3>
                    <p className="text-primary-100 text-sm font-light mb-6">
                      The wide price range (£500–£3,800) reflects both city differences and the range
                      from small-area procedures to multi-area VASER.
                    </p>
                    <Link href="/enquiry?procedure=liposuction&country=poland">
                      <Button className="bg-white text-primary-700 hover:bg-primary-50 rounded-full px-8 py-6 font-bold">
                        Request a Quote
                      </Button>
                    </Link>
                  </div>
                </div>

                <p className="mt-8 text-xs text-neutral-500 italic">
                  Prices based on published rates from KCM Clinic, Centrum Liposukcji, NavMedica,
                  and WhatClinic (2024–2026). Request a personalised quote for accurate pricing.
                </p>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION D: N.I.L. TECHNOLOGY
            ===================================================================== */}
        <section className="py-28 sm:py-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="max-w-3xl mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Exclusive Technology</span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                N.I.L. Liposuction: Poland&apos;s Exclusive Infrasound Technology
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                A Belgian technology representing the gentlest approach to fat removal available today.
              </p>
            </m.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16" data-aeo="nil-liposuction-poland">
              <m.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2rem] border border-neutral-100 bg-white"
              >
                <div className="h-14 w-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 mb-6">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">How N.I.L. Works</h3>
                <p className="text-neutral-500 font-light leading-relaxed">
                  <strong className="text-neutral-900">N.I.L. stands for Nutational Infrasound Liposuction</strong> — a Belgian technology
                  that uses a specialised cannula generating spiral movement using compressed air at
                  infrasound frequencies. Unlike traditional liposuction, VASER, or laser techniques,
                  N.I.L. avoids direct contact with nerves and connective tissue.
                </p>
              </m.div>

              <m.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2rem] border border-neutral-100 bg-white"
              >
                <div className="h-14 w-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 mb-6">
                  <Heart className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Key Advantages</h3>
                <p className="text-neutral-500 font-light leading-relaxed">
                  The result is significantly less pain, reduced tissue trauma, minimal bruising, and
                  faster recovery compared to traditional methods. It&apos;s ideal for patients who
                  prioritise the gentlest possible procedure or are concerned about nerve damage.
                </p>
              </m.div>
            </div>

            {/* N.I.L. Comparison Table */}
            <m.div {...fadeInUp}>
              <h3 className="text-lg font-bold text-neutral-900 mb-6">N.I.L. vs Other Techniques</h3>
              <div className="bg-white rounded-3xl border border-neutral-200/60 p-2 shadow-xl shadow-neutral-100">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left">
                        <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">Factor</th>
                        <th className="p-6 text-sm font-bold text-primary-600 uppercase tracking-widest">N.I.L.</th>
                        <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">Traditional</th>
                        <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">VASER</th>
                        <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">Laser</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {NIL_COMPARISON.map((row, i) => (
                        <tr key={i} className="hover:bg-neutral-50 transition-colors">
                          <td className="p-6 font-bold text-neutral-900">{row.factor}</td>
                          <td className="p-6 text-primary-600 font-bold">{row.nil}</td>
                          <td className="p-6 text-neutral-500 font-light">{row.traditional}</td>
                          <td className="p-6 text-neutral-500 font-light">{row.vaser}</td>
                          <td className="p-6 text-neutral-500 font-light">{row.laser}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </m.div>

            {/* Where to Get N.I.L. */}
            <m.div
              {...fadeInUp}
              className="mt-16 p-10 rounded-[3rem] bg-gradient-to-br from-primary-50 to-white border border-primary-100 relative overflow-hidden"
            >
              <div className="absolute right-0 bottom-0 -mb-10 -mr-10 h-40 w-40 rounded-full bg-primary-200/20 blur-3xl" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 rounded-3xl bg-primary-600 flex items-center justify-center shadow-xl shadow-primary-200">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary-900 mb-4">Where to Get N.I.L. Liposuction</h3>
                  <p className="text-lg text-primary-800/80 font-light leading-relaxed">
                    <strong>KCM Clinic</strong> in Jelenia Góra (90km from Wrocław) is Europe&apos;s leading N.I.L.
                    liposuction centre. The clinic specialises in this technique and has performed thousands of
                    procedures. Airport access via Wrocław Airport (~1hr transfer).
                  </p>
                  <p className="mt-3 text-sm text-primary-700/70 font-light">
                    <strong>Best for:</strong> Patients who prioritise minimal pain and the gentlest possible procedure.
                    Patients concerned about nerve damage. Patients wanting the fastest recovery.
                    Patients interested in an advanced technique not available in the UK.
                  </p>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* =====================================================================
            SECTION E: TOP CLINICS
            ===================================================================== */}
        <section className="py-28 sm:py-36 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Providers</span>
                <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                  Top Liposuction Clinics in Poland
                </h2>
                <p className="mt-4 text-lg text-neutral-600 font-light">
                  ISO-accredited clinics vetted for international quality standards.
                </p>
              </div>
              <Link href="/clinics?procedure=liposuction&country=poland">
                <Button variant="outline" className="group rounded-full border-neutral-200 px-8 py-6 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-all duration-300">
                  View All Clinics <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </m.div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {CLINICS.map((clinic, i) => (
                <m.div
                  key={clinic.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative flex flex-col rounded-[2.5rem] border border-neutral-200/60 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary-300 hover:shadow-2xl hover:shadow-primary-900/10"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">{clinic.name}</h3>
                      <div className="flex items-center gap-2 text-primary-600 font-medium text-sm">
                        <MapPin className="h-4 w-4" />
                        {clinic.location}
                      </div>
                      {clinic.locationNote && (
                        <p className="mt-1 text-xs text-neutral-400">{clinic.locationNote}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-widest mb-4">
                      {clinic.highlight}
                    </div>
                  </div>

                  <div className="space-y-2 mt-auto">
                    {clinic.specialties.map((specialty, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-neutral-500 font-light">
                        <CheckCircle className="h-4 w-4 text-primary-400 flex-shrink-0 mt-0.5" />
                        {specialty}
                      </div>
                    ))}
                  </div>
                </m.div>
              ))}
            </div>

            {/* Notable Surgeon */}
            <m.div
              {...fadeInUp}
              className="mt-16 p-10 rounded-[3rem] bg-gradient-to-br from-primary-50 to-white border border-primary-100 relative overflow-hidden"
            >
              <div className="absolute right-0 bottom-0 -mb-10 -mr-10 h-40 w-40 rounded-full bg-primary-200/20 blur-3xl" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 rounded-3xl bg-primary-600 flex items-center justify-center shadow-xl shadow-primary-200">
                    <Award className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary-900 mb-4">Notable Surgeon: Dr. Ilona Osadowska</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-primary-800/80 font-light">
                      <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      Performs 400 body liposuctions annually — one of the highest volumes in Poland
                    </li>
                    <li className="flex items-start gap-2 text-primary-800/80 font-light">
                      <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      Specialist in body contouring and multiple liposuction techniques
                    </li>
                    <li className="flex items-start gap-2 text-primary-800/80 font-light">
                      <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      Extensive experience with international patients
                    </li>
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
            <m.div {...fadeInUp} className="max-w-3xl mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Recovery</span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Liposuction Recovery in Poland
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                What to expect during your recovery timeline and after returning home.
              </p>
            </m.div>

            <div className="relative" data-aeo="liposuction-poland-recovery">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-200 via-primary-300 to-transparent hidden lg:block" />
              <div className="space-y-8">
                {RECOVERY_STEPS.map((step, i) => (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="relative lg:pl-24"
                  >
                    <div className="hidden lg:flex absolute left-0 top-8 h-16 w-16 rounded-2xl bg-primary-600 text-white items-center justify-center text-sm font-bold shadow-lg shadow-primary-200">
                      {i + 1}
                    </div>
                    <div className="p-8 rounded-[2rem] border border-neutral-100 bg-white hover:border-primary-100 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold text-primary-600 uppercase tracking-widest bg-primary-50 px-3 py-1 rounded-full">{step.day}</span>
                        <h3 className="text-lg font-bold text-neutral-900">{step.title}</h3>
                      </div>
                      <p className="text-neutral-500 font-light leading-relaxed">{step.description}</p>
                    </div>
                  </m.div>
                ))}
              </div>
            </div>

            {/* City Travel Tips */}
            <m.div {...fadeInUp} className="mt-16">
              <h3 className="text-lg font-bold text-neutral-900 mb-8">City-Specific Travel Tips</h3>
              <div className="grid gap-6 sm:grid-cols-3">
                {CITY_TRAVEL_TIPS.map((city, i) => (
                  <div key={i} className="p-8 rounded-[2rem] border border-neutral-100 bg-white">
                    <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 mb-6">
                      <Plane className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-bold text-neutral-900 mb-4">{city.name}</h4>
                    <ul className="space-y-2">
                      {city.tips.map((tip, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-neutral-500 font-light">
                          <CheckCircle className="h-4 w-4 text-primary-400 flex-shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </m.div>

            <m.div {...fadeInUp} className="mt-8 p-8 rounded-[2rem] border border-neutral-100 bg-white">
              <p className="text-neutral-600 font-light">
                <strong className="text-neutral-900">Recommended stay:</strong> 7 days (allows for surgery, 2 follow-ups, and fit-to-fly clearance)
              </p>
            </m.div>
          </div>
        </section>

        {/* =====================================================================
            SECTION G: DESTINATION COMPARISON
            ===================================================================== */}
        <section className="py-28 sm:py-36 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">Alternatives</span>
              <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Comparing Liposuction Destinations
              </h2>
            </m.div>

            <div className="grid gap-8 sm:grid-cols-3">
              {DESTINATION_COMPARISONS.map((dest, i) => (
                <m.div
                  key={dest.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={dest.href} className="group block p-8 rounded-[2.5rem] border border-neutral-200/60 bg-white hover:border-primary-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                    <h3 className="text-2xl font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">{dest.name}</h3>
                    <p className="text-primary-600 font-bold mt-2">{dest.price}</p>
                    <p className="mt-4 text-neutral-500 font-light text-sm">{dest.desc}</p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-bold text-primary-600">
                      View Guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </m.div>
              ))}
            </div>

            <m.div {...fadeInUp} className="mt-10 text-center">
              <Link href="/procedures/liposuction">
                <Button variant="outline" className="group rounded-full border-neutral-200 px-8 py-6 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-all duration-300">
                  Compare All Liposuction Destinations <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </m.div>
          </div>
        </section>

        {/* =====================================================================
            SECTION H: FAQ
            ===================================================================== */}
        <section className="py-28 sm:py-36">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="text-center mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">Common Questions</span>
              <h2 className="text-4xl font-bold text-neutral-900 tracking-tight sm:text-5xl">
                Liposuction in Poland FAQs
              </h2>
            </m.div>
            <m.div {...fadeInUp} className="bg-white rounded-[2.5rem] border border-neutral-200/60 p-4 sm:p-10 shadow-xl shadow-neutral-100">
              <FAQSection faqs={faqs} title="" className="faq-section-custom" />
            </m.div>
          </div>
        </section>

        {/* =====================================================================
            SECTION I: CTA
            ===================================================================== */}
        <m.section {...fadeInUp} className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[3rem] bg-[#0A1A2F] p-12 text-white sm:p-20 lg:p-32 shadow-2xl text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 via-transparent to-rose-600/30" />
              <m.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -left-1/4 -top-1/4 h-full w-full rounded-full bg-primary-500/10 blur-[120px]"
              />
              <div className="absolute inset-0 bg-transparent opacity-[0.03] mix-blend-overlay" />

              <div className="relative z-10 mx-auto max-w-4xl">
                <span className="text-sm font-bold tracking-[0.3em] text-primary-300 uppercase mb-6 block">Ready to begin?</span>
                <h2 className="text-4xl font-bold sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] mb-8">
                  Get Your Free<br />Liposuction Quote for{' '}
                  <span className="bg-gradient-to-r from-primary-300 to-rose-300 bg-clip-text text-transparent">Poland</span>
                </h2>
                <p className="mx-auto mt-8 max-w-2xl text-xl text-neutral-300 font-light leading-relaxed">
                  Compare prices from ISO-accredited clinics in Warsaw, Kraków, and
                  Wrocław. EU consumer protections, advanced N.I.L. technology, and
                  flights from just £20 — no obligation.
                </p>

                <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
                  <Link href="/clinics?procedure=liposuction&country=poland" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-12 py-8 text-lg font-bold shadow-xl shadow-white/10">
                      Compare Liposuction Clinics in Poland
                    </Button>
                  </Link>
                  <Link href="/enquiry?procedure=liposuction&country=poland" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-full px-12 py-8 text-lg font-bold backdrop-blur-md">
                      Get Free Clinic Recommendations
                    </Button>
                  </Link>
                </div>

                <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-8 text-sm font-medium text-neutral-400">
                  <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary-400" /> EU-Regulated</div>
                  <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary-400" /> ISO Accredited</div>
                  <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary-400" /> N.I.L. Technology</div>
                </div>
              </div>
            </div>
          </div>
        </m.section>

        {/* INTERNAL LINKS */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl border-t border-neutral-100 pt-12">
            <div className="flex flex-wrap gap-x-8 gap-y-4 items-center justify-center text-sm font-medium">
              <span className="text-neutral-400 uppercase tracking-widest text-xs">Related Guides:</span>
              <Link href="/cosmetic-surgery" className="text-neutral-600 hover:text-primary-600 transition-colors">Cosmetic Surgery Abroad</Link>
              <Link href="/procedures/liposuction/turkey" className="text-neutral-600 hover:text-primary-600 transition-colors">Liposuction in Turkey</Link>
              <Link href="/procedures/liposuction/hungary" className="text-neutral-600 hover:text-primary-600 transition-colors">Liposuction in Hungary</Link>
              <Link href="/procedures/liposuction/spain" className="text-neutral-600 hover:text-primary-600 transition-colors">Liposuction in Spain</Link>
              <Link href="/procedures/liposuction" className="text-neutral-600 hover:text-primary-600 transition-colors">Compare All Destinations</Link>
              <Link href="/destinations/poland" className="text-neutral-600 hover:text-primary-600 transition-colors">Medical Tourism Poland</Link>
            </div>
          </div>
        </section>
      </div>
  )
}
