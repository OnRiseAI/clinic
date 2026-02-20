'use client'

import { m } from 'framer-motion'
import Link from 'next/link'

import { HU, TR, PL, ES } from 'country-flag-icons/react/3x2'
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
  Plane,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FAQSection } from '@/components/seo/faq-section'

// =============================================================================
// CONSTANTS
// =============================================================================

const HERO_STATS = [
  { label: 'From', value: '£1,165', sub: 'per area' },
  { label: 'Save', value: 'Up to 80%', sub: 'vs UK prices' },
  { label: 'Clinics', value: '60', sub: 'in Budapest' },
  { label: 'Flight', value: '2.5 hrs', sub: 'from London' },
]

const WHY_HUNGARY_POINTS = [
  {
    title: 'Lowest Prices in the EU',
    text: 'Hungary offers the lowest liposuction starting prices in the European Union — from £1,165 per area. That\u2019s up to 80% savings compared to UK private clinic rates, making it the most affordable EU option for patients who want the legal protections of EU healthcare regulation without the longer travel time to Turkey or other non-EU destinations.',
  },
  {
    title: 'Full EU Consumer Protections',
    text: 'As an EU member state, Hungary operates under European medical device regulations, GDPR data protection, and the cross-border healthcare directive. Patients benefit from EU consumer protections that don\u2019t apply in Turkey. Hungarian clinics hold ISO 9001 certifications, MPHEST (Hungarian Society for Plastic, Reconstructive and Aesthetic Surgery) accreditation, and MOK (Hungarian Medical Chamber) registration. Many surgeons have trained at internationally recognised institutions in Germany, Austria, or the UK.',
  },
  {
    title: 'World-Class Medical Heritage',
    text: 'All major clinics are concentrated in Budapest — a compact, walkable city with a world-class medical tradition dating back centuries. The city\u2019s famous thermal baths make the recovery period uniquely pleasant (though you\u2019ll need to wait 3\u20134 weeks post-surgery before enjoying them). Hungary pioneered medical tourism in Central Europe over 20 years ago, starting with dental tourism, so the infrastructure — English-speaking coordinators, transfer services, recovery accommodation — is fully mature.',
  },
  {
    title: 'Quick & Affordable Access',
    text: 'Budapest is just 2.5 hours from London with multiple daily flights on budget carriers. Weekday return flights cost £50\u2013£80, making it the most accessible EU destination for UK patients seeking affordable cosmetic surgery.',
  },
]

const PRICING_DATA = [
  ['Liposuction (1 area)', '£1,165–£1,775', '£3,000–£6,000', '60–70%'],
  ['Liposuction (2 areas)', '£1,900–£2,500', '£5,000–£10,000', '60–75%'],
  ['VASER liposuction (1 area)', '£1,500–£2,500', '£4,700–£11,200', '68–80%'],
  ['Lipo 360', '£2,000–£3,500', '£5,000–£9,000', '60–65%'],
  ['Chin/Neck liposuction', '£800–£1,400', '£2,400–£4,000', '65–70%'],
]

const PACKAGE_INCLUSIONS = [
  { title: 'Surgery', description: 'Surgeon\u2019s fee + operating theatre' },
  { title: 'Hospital Stay', description: 'Overnight if general anaesthesia; same-day if local' },
  { title: 'Anaesthesia', description: 'General or local anaesthesia included' },
  { title: 'Pre-op', description: 'Consultation and pre-operative tests' },
  { title: 'Compression Garment', description: 'Post-operative compression garment included' },
  { title: 'Medications', description: 'Post-operative medication included' },
  { title: 'Follow-ups', description: 'Appointments at clinic before departure' },
  { title: 'Coordinator', description: 'English-speaking patient coordinator' },
]

const CLINICS = [
  {
    name: 'Szeptest Cosmetic Surgery',
    location: 'Budapest',
    highlight: 'Established 2002',
    features: [
      'Over 20 years of operation',
      'ISO 9001 certified',
      'Specialises in liposuction and body contouring',
      'Popular with UK and Western European patients',
    ],
  },
  {
    name: 'Art Medic Clinic',
    location: 'Budapest',
    highlight: 'Established 1991',
    features: [
      'One of Hungary\u2019s oldest private cosmetic surgery clinics',
      'Plastic surgery, aesthetic medicine, and ENT',
      'International patient base (US, Canada, UK)',
      'Located centrally in Budapest',
    ],
  },
  {
    name: 'Elite Clinic',
    location: 'Budapest',
    highlight: 'MPHEST Leadership',
    features: [
      'Lead surgeon: Dr. Csaba Molnár — former president of MPHEST',
      'Board-certified plastic surgeon',
      'Specialist in body contouring and liposuction',
    ],
  },
  {
    name: 'Premium Plastic Surgery Clinic',
    location: 'Budapest',
    highlight: 'Est. 2010',
    features: [
      'Focus on cosmetic surgery for international patients',
      'Modern facilities with latest equipment',
    ],
  },
  {
    name: 'Pataki Plastic Surgery',
    location: 'Budapest',
    highlight: '96% Recommendation',
    features: [
      '96% patient recommendation rate',
      'Personal approach with direct surgeon consultations',
      'Strong patient reviews on multiple platforms',
    ],
  },
  {
    name: 'Perfect You Plastic Surgery',
    location: 'Budapest',
    highlight: '20+ Years Experience',
    features: [
      'Lead surgeon: Dr. István Bulyovszky — 20+ years experience',
      'Specialist in VASER and body sculpting',
      'Comprehensive pre- and post-operative care',
    ],
  },
  {
    name: 'Dolemed Aesthetic Clinic',
    location: 'Budapest',
    highlight: 'Est. 2005',
    features: [
      'Aesthetic medicine and plastic surgery',
      'Growing international patient base',
    ],
  },
]

const RECOVERY_STEPS = [
  {
    day: 'Day 0',
    title: 'Surgery Day',
    description: 'Procedure 1–3 hours. Overnight stay if general anaesthesia, same-day discharge if local. Compression garment fitted.',
  },
  {
    day: 'Day 2–3',
    title: 'First Follow-up',
    description: 'Dressings checked, drain removal if applicable. Light walking around Budapest encouraged.',
  },
  {
    day: 'Days 5–7',
    title: 'Bruising Peaks',
    description: 'Normal post-operative bruising. VASER patients have less bruising than traditional.',
  },
  {
    day: 'Day 5–7',
    title: 'Fit to Fly',
    description: 'Most patients cleared for the 2.5-hour flight to London.',
    highlight: true,
  },
  {
    day: 'Day 12',
    title: 'Stitches Removed',
    description: 'May require a local follow-up with your GP or private clinic in the UK if returning before day 12.',
  },
  {
    day: 'Days 7–14',
    title: 'Return to Work',
    description: 'Desk work from day 7 (VASER) or day 10–14 (traditional).',
  },
  {
    day: '6 wks–3 mo',
    title: 'Final Results',
    description: 'Bruising fully resolved by 2 weeks. Swelling subsides over 6–12 weeks. Compression garment worn for up to 6 weeks.',
  },
]

const RECOVERY_TIPS = [
  {
    title: 'Recommended Stay',
    content: '7 days (allows for surgery, 2 follow-ups, and fit-to-fly clearance)',
    icon: Clock,
  },
  {
    title: 'Thermal Baths',
    content: 'Budapest is famous for its thermal baths, but wait at least 3–4 weeks post-surgery before immersing in water. Enjoy them on a return visit.',
    icon: Heart,
  },
  {
    title: 'Walking Routes',
    content: 'Budapest\u2019s flat Pest side is ideal for gentle post-op walking. The Danube promenade provides a pleasant, level route.',
    icon: Activity,
  },
  {
    title: 'Where to Stay',
    content: 'Stay in Pest (Districts V, VI, or VII) for easy clinic access and flat terrain. Most clinics are within 15 minutes of major hotels.',
    icon: MapPin,
  },
  {
    title: 'Post-op Compression',
    content: 'Clinics provide compression garments, but consider bringing a spare. Hungarian pharmacies (gyógyszertár) also stock medical compression wear.',
    icon: Shield,
  },
]

const COMPARISON_ROWS = [
  { factor: 'Starting price', hungary: '£1,165 (lowest)', turkey: '£1,500', poland: '£500', spain: '£2,400', hungaryHighlight: true },
  { factor: 'EU regulated', hungary: '✅ Yes', turkey: '❌ No', poland: '✅ Yes', spain: '✅ Yes' },
  { factor: 'Flight time (London)', hungary: '2.5 hrs', turkey: '3.5–4 hrs', poland: '2–2.5 hrs', spain: '2–2.5 hrs' },
  { factor: 'All-inclusive packages', hungary: 'Partial (à la carte)', turkey: '✅ Most comprehensive', poland: 'Partial', spain: 'Partial' },
  { factor: 'Clinic concentration', hungary: '60 in Budapest', turkey: '425+ (Istanbul)', poland: 'Multi-city', spain: 'Multi-city' },
  { factor: 'Technique range', hungary: 'Traditional, VASER', turkey: 'All incl. HD', poland: 'Trad, VASER, N.I.L.', spain: 'All incl. HD' },
  { factor: 'Best for', hungary: 'Budget + EU safety', turkey: 'Volume, packages', poland: 'Specialist tech, EU', spain: 'Premium quality', hungaryHighlight: true },
]

const DESTINATION_LINKS = [
  { name: 'Turkey', price: 'From £1,500/area', desc: 'Widest choice, all-inclusive packages, 45,000+ procedures/year', href: '/procedures/liposuction/turkey' },
  { name: 'Poland', price: 'From £500/area', desc: 'EU-regulated, N.I.L. technology, multi-city options', href: '/procedures/liposuction/poland' },
  { name: 'Spain', price: 'From £2,400/area', desc: 'Premium quality, #1 healthcare ranking, world-class hospitals', href: '/procedures/liposuction/spain' },
]

// =============================================================================
// TYPES
// =============================================================================

interface FAQ {
  question: string
  answer: string
}

interface LiposuctionHungaryClientProps {
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

export function LiposuctionHungaryClient({ faqs }: LiposuctionHungaryClientProps) {
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
              <span className="bg-gradient-to-r from-primary-300 to-rose-300 bg-clip-text text-transparent">Hungary</span>
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-8 max-w-3xl text-xl text-neutral-300 font-light leading-relaxed sm:text-2xl"
            >
              Save up to 80% vs UK prices at ISO-accredited Budapest clinics.
              Full EU consumer protections, board-certified surgeons, and
              all-inclusive packages — just a 2.5-hour flight from London.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row"
            >
              <Link href="/clinics?procedure=liposuction&country=hungary" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-12 py-7 text-lg font-bold shadow-xl shadow-white/10">
                  Compare Liposuction Clinics in Budapest
                </Button>
              </Link>
              <Link href="/enquiry?procedure=liposuction&country=hungary" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-full px-12 py-7 text-lg font-bold backdrop-blur-md">
                  Get Free Clinic Recommendations
                </Button>
              </Link>
            </m.div>

            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-6 text-sm text-neutral-400"
            >
              EU-regulated • ISO 9001 accredited • Board-certified surgeons • 2.5hrs from London
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
            SECTION B: WHY HUNGARY
            ===================================================================== */}
        <section className="py-28 sm:py-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
                <m.div {...fadeInUp}>
                  <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Why Hungary</span>
                  <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                    Why Choose Budapest for Liposuction?
                  </h2>
                  <p className="mt-6 text-lg text-neutral-500 font-light leading-relaxed">
                    The lowest liposuction prices in the EU with full regulatory protections, ISO-accredited clinics, and just a 2.5-hour flight from London.
                  </p>
                  <div className="mt-10 p-6 bg-primary-50 rounded-2xl border border-primary-100">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="h-5 w-5 text-primary-600" />
                      <span className="font-bold text-primary-900 text-sm">EU-Regulated</span>
                    </div>
                    <p className="text-sm text-primary-700/80 font-light">
                      Full EU consumer protections, GDPR compliance, and cross-border healthcare directive coverage — protections that don&apos;t apply in non-EU destinations.
                    </p>
                  </div>
                </m.div>
              </div>

              <div className="lg:col-span-8 space-y-6" data-aeo="liposuction-hungary-benefits">
                {WHY_HUNGARY_POINTS.map((point, i) => (
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
                          {point.title === 'Quick & Affordable Access' ? (
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

              <div className="relative z-10" data-aeo="liposuction-hungary-cost">
                <span className="text-sm font-bold tracking-[0.2em] text-primary-400 uppercase">Cost by Area & Technique</span>
                <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl tracking-tight leading-[1.1]">
                  How Much Does Liposuction Cost in Hungary?
                </h2>
                <p className="mt-4 text-lg text-neutral-400 font-light max-w-2xl">
                  The lowest liposuction prices in the EU. Save 60–80% compared to UK equivalents.
                </p>

                <div className="mt-12 bg-white rounded-3xl p-2 shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="text-left">
                          <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">Procedure</th>
                          <th className="p-6 text-sm font-bold text-primary-600 uppercase tracking-widest">Hungary</th>
                          <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">UK</th>
                          <th className="p-6 text-sm font-bold text-green-600 uppercase tracking-widest">Savings</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {PRICING_DATA.map(([procedure, hungary, uk, savings], i) => (
                          <tr key={i} className="hover:bg-neutral-50 transition-colors">
                            <td className="p-6 font-bold text-neutral-900">{procedure}</td>
                            <td className="p-6 text-primary-600 font-bold">{hungary}</td>
                            <td className="p-6 text-neutral-400 font-light line-through">{uk}</td>
                            <td className="p-6"><span className="text-green-600 bg-green-50 font-bold px-3 py-1 rounded-full text-sm">{savings}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-12 grid sm:grid-cols-2 gap-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4">What&apos;s Included in Budapest Packages</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {PACKAGE_INCLUSIONS.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                          <CheckCircle className="h-4 w-4 text-primary-400 flex-shrink-0" />
                          {item.title}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
                    <h3 className="text-xl font-bold text-white mb-3">Need a personalised quote?</h3>
                    <p className="text-primary-100 text-sm font-light mb-6">Get accurate pricing based on your specific requirements.</p>
                    <Link href="/enquiry?procedure=liposuction&country=hungary">
                      <Button className="bg-white text-primary-700 hover:bg-primary-50 rounded-full px-8 py-6 font-bold">
                        Request a Quote
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="mt-10 space-y-4">
                  <p className="text-neutral-400 font-light text-sm leading-relaxed">
                    <strong className="text-neutral-300">Note on packages:</strong> Hungarian clinic packages tend to be more &ldquo;à la carte&rdquo; than Turkish packages. Hotel accommodation and airport transfers are sometimes included but often booked separately. This can be advantageous — you choose your own hotel and only pay for what you need.
                  </p>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed">
                    Budapest&apos;s lower cost of living reduces clinic overheads, enabling competitive pricing without compromising quality. The concentration of 60 clinics in one city creates healthy price competition. Multi-area discounts are standard — second and third areas are typically 30–40% cheaper than the first area.
                  </p>
                  <p className="text-neutral-500 text-xs italic">
                    Prices based on published rates from Bookimed, Szeptest Cosmetic Surgery, Art Medic Clinic, Elite Clinic, and WhatClinic (2024–2026). Request a personalised quote for accurate pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION D: TOP CLINICS
            ===================================================================== */}
        <section className="py-28 sm:py-36 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Providers</span>
                <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                  Top Liposuction Clinics in Budapest
                </h2>
                <p className="mt-4 text-lg text-neutral-600 font-light">
                  ISO-accredited clinics with board-certified surgeons and decades of experience.
                </p>
              </div>
              <Link href="/clinics?procedure=liposuction&country=hungary">
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
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-100/30 transition-all duration-700 group-hover:scale-150 group-hover:bg-primary-100/40" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900">{clinic.name}</h3>
                        <div className="flex items-center gap-2 text-primary-600 font-medium mt-1 text-sm">
                          <MapPin className="h-4 w-4" />
                          {clinic.location}
                        </div>
                      </div>
                    </div>

                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-widest mb-6">
                      {clinic.highlight}
                    </div>

                    <ul className="space-y-2">
                      {clinic.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-neutral-500 font-light">
                          <CheckCircle className="h-4 w-4 text-primary-400 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 pt-6 border-t border-neutral-100 flex items-center justify-end">
                      <span className="text-sm font-bold text-primary-600 group-hover:text-primary-700 transition-colors flex items-center gap-2">
                        View Profile <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </m.div>
              ))}
            </div>

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
                  <h3 className="text-2xl font-bold text-primary-900 mb-4">Surgeon Accreditation Context</h3>
                  <p className="text-lg text-primary-800/80 font-light leading-relaxed">
                    Hungarian plastic surgeons must be registered with MOK (Hungarian Medical Chamber) and typically hold membership in MPHEST. Many have trained or practised in Western European countries (Germany, Austria, UK) before returning to Hungary. EBOPRAS (European Board of Plastic, Reconstructive and Aesthetic Surgery) certification is held by several leading Budapest surgeons.
                  </p>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* =====================================================================
            SECTION E: RECOVERY TIMELINE
            ===================================================================== */}
        <section className="py-28 sm:py-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="max-w-3xl mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Recovery</span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Liposuction Recovery in Budapest
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                What to expect during your recovery in Budapest and after returning home.
              </p>
            </m.div>

            <div className="relative" data-aeo="liposuction-hungary-recovery">
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
                    <div className={`p-8 rounded-[2rem] border bg-white transition-colors ${step.highlight ? 'border-primary-200 bg-primary-50/30' : 'border-neutral-100 hover:border-primary-100'}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${step.highlight ? 'text-primary-700 bg-primary-100' : 'text-primary-600 bg-primary-50'}`}>{step.day}</span>
                        <h3 className={`text-lg font-bold ${step.highlight ? 'text-primary-700' : 'text-neutral-900'}`}>{step.title}</h3>
                      </div>
                      <p className="text-neutral-500 font-light leading-relaxed">{step.description}</p>
                    </div>
                  </m.div>
                ))}
              </div>
            </div>

            <m.div {...fadeInUp} className="mt-16">
              <h3 className="text-2xl font-bold text-neutral-900 mb-8">Budapest Recovery Tips</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {RECOVERY_TIPS.map((tip, i) => (
                  <div key={i} className="p-8 rounded-[2rem] border border-neutral-100 bg-white">
                    <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 mb-6">
                      <tip.icon className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-bold text-neutral-900 mb-4">{tip.title}</h4>
                    <p className="text-sm text-neutral-500 font-light leading-relaxed">{tip.content}</p>
                  </div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        {/* =====================================================================
            SECTION F: DESTINATION COMPARISON
            ===================================================================== */}
        <m.section {...fadeInUp} className="py-28 sm:py-36 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">Alternatives</span>
              <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Liposuction in Hungary vs Turkey, Poland &amp; Spain
              </h2>
            </div>

            <div className="bg-neutral-900 rounded-[3rem] p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-transparent to-rose-600/10" />
              <div className="relative z-10">
                <div className="bg-white rounded-3xl p-2 shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="text-left">
                          <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">Factor</th>
                          <th className="p-6 text-sm font-bold text-primary-600 uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                              <div className="w-5 overflow-hidden rounded-sm"><HU title="Hungary" /></div>
                              Hungary
                            </div>
                          </th>
                          <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                              <div className="w-5 overflow-hidden rounded-sm"><TR title="Turkey" /></div>
                              Turkey
                            </div>
                          </th>
                          <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                              <div className="w-5 overflow-hidden rounded-sm"><PL title="Poland" /></div>
                              Poland
                            </div>
                          </th>
                          <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                              <div className="w-5 overflow-hidden rounded-sm"><ES title="Spain" /></div>
                              Spain
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {COMPARISON_ROWS.map((row, i) => (
                          <tr key={i} className="hover:bg-neutral-50 transition-colors">
                            <td className="p-6 font-bold text-neutral-900 whitespace-nowrap">{row.factor}</td>
                            <td className={`p-6 whitespace-nowrap ${row.hungaryHighlight ? 'text-primary-600 font-bold' : 'text-neutral-600'}`}>{row.hungary}</td>
                            <td className="p-6 text-neutral-500 whitespace-nowrap">{row.turkey}</td>
                            <td className="p-6 text-neutral-500 whitespace-nowrap">{row.poland}</td>
                            <td className="p-6 text-neutral-500 whitespace-nowrap">{row.spain}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              {DESTINATION_LINKS.map((dest, i) => (
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

            <div className="mt-10 text-center">
              <Link href="/procedures/liposuction" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors">
                <ArrowRight className="h-4 w-4 rotate-180" /> Compare all liposuction destinations
              </Link>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION G: FAQ
            ===================================================================== */}
        <section className="py-28 sm:py-36">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="text-center mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">Common Questions</span>
              <h2 className="text-4xl font-bold text-neutral-900 tracking-tight sm:text-5xl">
                Liposuction in Hungary FAQs
              </h2>
            </m.div>
            <m.div {...fadeInUp} className="bg-white rounded-[2.5rem] border border-neutral-200/60 p-4 sm:p-10 shadow-xl shadow-neutral-100">
              <FAQSection faqs={faqs} title="" className="faq-section-custom" />
            </m.div>
          </div>
        </section>

        {/* =====================================================================
            SECTION H: CTA
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

              <div className="relative z-10 mx-auto max-w-4xl">
                <span className="text-sm font-bold tracking-[0.3em] text-primary-300 uppercase mb-6 block">Ready to begin?</span>
                <h2 className="text-4xl font-bold sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] mb-8">
                  Get Your Free Quote for{' '}
                  <span className="bg-gradient-to-r from-primary-300 to-rose-300 bg-clip-text text-transparent">Budapest</span>
                </h2>
                <p className="mx-auto mt-8 max-w-2xl text-xl text-neutral-300 font-light leading-relaxed">
                  Compare prices from ISO-accredited clinics in Budapest. EU consumer protections, board-certified surgeons, and the lowest prices in Europe — no obligation.
                </p>

                <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
                  <Link href="/clinics?procedure=liposuction&country=hungary" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-12 py-8 text-lg font-bold shadow-xl shadow-white/10">
                      Compare Liposuction Clinics in Budapest
                    </Button>
                  </Link>
                  <Link href="/enquiry?procedure=liposuction&country=hungary" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-full px-12 py-8 text-lg font-bold backdrop-blur-md">
                      Get Free Clinic Recommendations
                    </Button>
                  </Link>
                </div>

                <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-8 text-sm font-medium text-neutral-400">
                  <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary-400" /> EU-Regulated</div>
                  <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary-400" /> ISO 9001 Accredited</div>
                  <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary-400" /> Board-Certified Surgeons</div>
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
              <Link href="/procedures/liposuction/poland" className="text-neutral-600 hover:text-primary-600 transition-colors">Liposuction in Poland</Link>
              <Link href="/procedures/liposuction/spain" className="text-neutral-600 hover:text-primary-600 transition-colors">Liposuction in Spain</Link>
              <Link href="/destinations/hungary" className="text-neutral-600 hover:text-primary-600 transition-colors">Medical Tourism Hungary</Link>
            </div>
          </div>
        </section>
      </div>
  )
}
