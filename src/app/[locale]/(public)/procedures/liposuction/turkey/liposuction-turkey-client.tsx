'use client'

import { m } from 'framer-motion'
import Link from 'next/link'

import { TR } from 'country-flag-icons/react/3x2'
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
  Hotel,
  Stethoscope,
  Utensils,
  Car,
  Phone,
  AlertTriangle,
  GraduationCap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FAQSection } from '@/components/seo/faq-section'

// =============================================================================
// CONSTANTS
// =============================================================================

const TECHNIQUES = [
  {
    name: 'Traditional/Tumescent',
    price: 'From £1,500/area',
    description: 'Tumescent fluid (saline + lidocaine + epinephrine) is injected first, then a cannula breaks up and suctions out fat. The gold standard technique with the longest track record.',
    bestFor: 'Larger-volume removal, multiple areas, budget-conscious patients',
    recovery: '7–14 days off work, more bruising than VASER',
    icon: Activity
  },
  {
    name: 'VASER Liposuction',
    price: 'From £2,300/area',
    description: 'Ultrasound waves at 36,000 Hz liquefy fat before removal. Preserves blood vessels, nerves, and connective tissue. Most popular technique for international patients.',
    bestFor: 'HD sculpting, precise contouring, faster recovery, BBL combinations',
    recovery: '5–10 days off work, less bruising, better skin tightening',
    icon: Zap
  },
  {
    name: 'Laser (SmartLipo)',
    price: 'From £2,700/area',
    description: 'Laser energy melts fat cells before extraction. Promotes skin tightening through collagen stimulation. Requires an experienced laser-certified specialist.',
    bestFor: 'Smaller areas (chin, neck, arms), skin tightening',
    recovery: '5–10 days off work',
    icon: Sparkles
  },
  {
    name: 'Lipo 360',
    price: 'From £1,900',
    description: 'Treats the full torso circumference — abdomen, flanks, and lower back — in one session. Available in all techniques (VASER 360 is most popular).',
    bestFor: 'Balanced, proportional torso contouring',
    recovery: '£3,000 (VASER 360 from £3,500)',
    icon: Activity
  },
  {
    name: 'HD Lipo',
    price: 'From £2,500',
    description: 'Advanced technique that sculpts around muscle groups to create visible definition (six-pack, obliques). Requires a highly skilled surgeon.',
    bestFor: 'Athletic patients wanting visible muscle definition',
    recovery: 'Premium tier: £2,500–£5,000',
    icon: Award
  }
]

const CLINICS = [
  {
    name: 'Carely Clinic',
    location: 'Istanbul',
    rating: '4.9',
    reviews: '2,500+',
    highlight: '2,500+ procedures per year',
    specialties: '0.5% complication rate, 0.3% infection rate. JCI-accredited hospital partners.',
    price: 'From £2,050'
  },
  {
    name: 'Dr. MED Clinic',
    location: 'Istanbul',
    rating: '4.8',
    reviews: '4,500+',
    highlight: '99.5% success rate',
    specialties: 'Specialises in VASER and HD liposuction. JCI-accredited.',
    price: 'Custom Quote'
  },
  {
    name: 'International Clinics Istanbul',
    location: 'Istanbul',
    rating: '4.7',
    reviews: '1,800+',
    highlight: 'Full-service all-inclusive',
    specialties: 'Multi-discipline cosmetic surgery centre. Focus on UK and European patients.',
    price: 'Custom Quote'
  },
  {
    name: 'Db\'est Clinic',
    location: 'Istanbul',
    rating: '4.9',
    reviews: '950+',
    highlight: 'Double board-certified',
    specialties: 'VASER and HD lipo specialists. English-speaking team.',
    price: 'Custom Quote'
  }
]

const RECOVERY_STEPS = [
  {
    day: 'Day 0',
    title: 'Surgery Day',
    description: 'Procedure takes 1–3 hours. Rest at hospital or hotel. Compression garment fitted. Light walking encouraged same day.'
  },
  {
    day: 'Day 1',
    title: 'Initial Recovery',
    description: 'Mild to moderate soreness. Continue wearing compression garment 24/7. Light walking. Pain managed with medication.'
  },
  {
    day: 'Days 2–3',
    title: 'First Follow-up',
    description: 'Dressings checked. Bruising begins to appear. Gentle walking around hotel area.'
  },
  {
    day: 'Days 5–7',
    title: 'Fit-to-Fly',
    description: 'Second follow-up. Fit-to-fly assessment. Most patients cleared to fly home.'
  },
  {
    day: 'Week 2',
    title: 'Return to Work',
    description: 'Return to desk work (most patients). Bruising begins to fade. Swelling still present.'
  }
]

const PRACTICAL_INFO = [
  {
    title: 'Recommended Stay',
    content: '7–10 days (most common: 7-day package)',
    icon: Clock
  },
  {
    title: 'Best Time to Visit',
    content: 'Spring (April–May) and autumn (September–October) for comfortable recovery temperatures.',
    icon: Sparkles
  },
  {
    title: 'Flying Home',
    content: 'Wear compression garment and flight socks. Stay hydrated. Walk in the aisle every hour.',
    icon: Plane
  }
]

const COMBINATIONS = [
  {
    name: 'Lipo + Tummy Tuck',
    price: '£3,500–£6,500',
    recovery: '10–14 days',
    notes: 'Most popular combination ("mummy makeover"). Lipo contours flanks/waist, tummy tuck removes loose skin.'
  },
  {
    name: 'Lipo + BBL',
    price: '£3,000–£6,000',
    recovery: '10–14 days',
    notes: 'Fat harvested via lipo, purified, then transferred to buttocks. VASER provides best fat graft viability.'
  },
  {
    name: 'Lipo 360 + Breast Aug',
    price: '£4,000–£7,000',
    recovery: '7–10 days',
    notes: 'Full body contouring in one trip.'
  }
]

// =============================================================================
// TYPES
// =============================================================================

interface FAQ {
  question: string
  answer: string
}

interface LiposuctionTurkeyClientProps {
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

export function LiposuctionTurkeyClient({ faqs }: LiposuctionTurkeyClientProps) {
  return (
    <div className="bg-neutral-50">
        {/* =====================================================================
            SECTION A: HERO
            ===================================================================== */}
        <section className="relative overflow-hidden bg-[#0A1A2F] py-28 sm:py-36 lg:py-48">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-rose-600/20" />
          <m.div 
            animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary-500/10 blur-[100px]" 
          />
          <m.div 
            animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
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
              <span className="bg-gradient-to-r from-primary-300 to-rose-300 bg-clip-text text-transparent">Turkey</span>
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-8 max-w-3xl text-xl text-neutral-300 font-light leading-relaxed sm:text-2xl"
            >
              Save 60–70% on liposuction at JCI-accredited hospitals in Istanbul
              and Antalya. VASER, laser, and 360 lipo — all-inclusive packages
              from £1,500.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row"
            >
              <Link href="/search?procedure=liposuction&country=turkey" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-12 py-7 text-lg font-bold shadow-xl shadow-white/10">
                  Compare Clinics
                </Button>
              </Link>
              <Link href="/contact?procedure=liposuction&country=turkey" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-full px-12 py-7 text-lg font-bold backdrop-blur-md">
                  Get Free Quote
                </Button>
              </Link>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              {[
                { label: 'From', value: '£1,500', sub: 'per area' },
                { label: 'Save', value: '60–70%', sub: 'vs UK prices' },
                { label: 'Clinics', value: '425+', sub: 'JCI-accredited' },
                { label: 'Annual', value: '45,000+', sub: 'procedures' }
              ].map((stat, i) => (
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
            SECTION B: WHY TURKEY
            ===================================================================== */}
        <section className="py-28 sm:py-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
                <m.div {...fadeInUp}>
                  <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Why Turkey</span>
                  <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                    The #1 Destination for Liposuction
                  </h2>
                  <p className="mt-6 text-lg text-neutral-500 font-light leading-relaxed">
                    45,000+ procedures annually, JCI-accredited hospitals, and all-inclusive packages 
                    that set the global standard for cosmetic surgery tourism.
                  </p>
                  <div className="mt-10 p-6 bg-primary-50 rounded-2xl border border-primary-100">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="h-5 w-5 text-primary-600" />
                      <span className="font-bold text-primary-900 text-sm">JCI-Accredited</span>
                    </div>
                    <p className="text-sm text-primary-700/80 font-light">
                      More JCI-accredited hospitals than any country outside the US — 
                      the same standard that accredits Mayo Clinic and Cleveland Clinic.
                    </p>
                  </div>
                </m.div>
              </div>

              <div className="lg:col-span-8 space-y-6">
                {[
                  {
                    title: 'Unmatched Surgical Volume',
                    text: 'Turkey performs 45,000+ liposuction procedures annually, making it the world\'s busiest destination. This exceptional volume means Turkish surgeons have unmatched experience, with pricing driven by market scale rather than corner-cutting.'
                  },
                  {
                    title: 'Every Technique Available',
                    text: 'Turkish clinics offer every major technique — traditional tumescent, VASER, laser (SmartLipo), power-assisted (PAL), lipo 360, and HD sculpting — whereas many UK clinics only offer one or two options.'
                  },
                  {
                    title: 'All-Inclusive Packages',
                    text: 'A typical package includes surgery, hospital stay, 4–7 nights at a 4–5 star hotel, airport transfers, compression garment, pre-op tests, post-op medications, and a personal English-speaking patient coordinator.'
                  },
                  {
                    title: 'Proven Safety Record',
                    text: 'Complication rates at top Turkish clinics are comparable to UK private hospitals. Carely Clinic reports a 0.5% complication rate and 0.3% infection rate across 2,500+ annual procedures.'
                  }
                ].map((point, i) => (
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
                        <p className="mt-3 text-neutral-500 font-light leading-relaxed">{point.text}</p>
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

              <div className="relative z-10">
                <span className="text-sm font-bold tracking-[0.2em] text-primary-400 uppercase">2026 Price Guide</span>
                <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl tracking-tight leading-[1.1]">
                  Liposuction Cost in Turkey
                </h2>
                <p className="mt-4 text-lg text-neutral-400 font-light max-w-2xl">
                  All-inclusive pricing. Save 60–70% compared to equivalent UK procedures.
                </p>

                <div className="mt-12 bg-white rounded-3xl p-2 shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="text-left">
                          <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">Technique</th>
                          <th className="p-6 text-sm font-bold text-primary-600 uppercase tracking-widest">Turkey</th>
                          <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">UK</th>
                          <th className="p-6 text-sm font-bold text-green-600 uppercase tracking-widest">Savings</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {[
                          ['Traditional/Tumescent', '£1,500–£3,800/area', '£3,000–£6,000/area', '50–60%'],
                          ['VASER', '£2,300–£4,600/area', '£4,700–£11,200/area', '55–70%'],
                          ['Laser (SmartLipo)', '£2,700–£5,000/area', '£3,500–£8,000/area', '40–55%'],
                          ['Lipo 360', '£1,900–£4,000', '£5,000–£9,000', '55–65%'],
                          ['HD Lipo', '£2,500–£5,000', '£5,500–£12,000', '55–65%']
                        ].map(([tech, turkey, uk, savings], i) => (
                          <tr key={i} className="hover:bg-neutral-50 transition-colors">
                            <td className="p-6 font-bold text-neutral-900">{tech}</td>
                            <td className="p-6 text-primary-600 font-bold">{turkey}</td>
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
                    <h3 className="text-lg font-bold text-white mb-4">What&apos;s Included</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['Surgery', 'Hospital Stay', 'Anaesthesia', 'Pre-op Tests', 'Compression Garment', 'Hotel (4–7 nights)', 'Airport Transfers', 'Medications', 'Follow-ups', 'Patient Coordinator'].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                          <CheckCircle className="h-4 w-4 text-primary-400 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
                    <h3 className="text-xl font-bold text-white mb-3">Need a custom quote?</h3>
                    <p className="text-primary-100 text-sm font-light mb-6">Get personalised pricing based on your goals and body assessment.</p>
                    <Link href="/contact?procedure=liposuction&country=turkey">
                      <Button className="bg-white text-primary-700 hover:bg-primary-50 rounded-full px-8 py-6 font-bold">
                        Request a Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION D: TECHNIQUES
            ===================================================================== */}
        <section className="py-28 sm:py-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="max-w-3xl mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Methods</span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Techniques Available
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Turkey offers the widest range of liposuction techniques of any medical tourism destination.
              </p>
            </m.div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {TECHNIQUES.map((tech, i) => (
                <m.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative rounded-[2.5rem] border border-neutral-200/60 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-900/5 overflow-hidden"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-100/30 transition-all duration-700 group-hover:scale-150 group-hover:bg-primary-100/40" />
                  <div className="relative z-10">
                    <div className="h-14 w-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 mb-6">
                      <tech.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">{tech.name}</h3>
                    <p className="text-primary-600 font-bold text-sm mt-1">{tech.price}</p>
                    <p className="mt-4 text-neutral-500 font-light leading-relaxed text-sm">{tech.description}</p>
                    <div className="mt-6 pt-6 border-t border-neutral-100 space-y-3">
                      <div>
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Best For</p>
                        <p className="text-sm text-neutral-600 mt-1">{tech.bestFor}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Recovery</p>
                        <p className="text-sm text-neutral-600 mt-1">{tech.recovery}</p>
                      </div>
                    </div>
                  </div>
                </m.div>
              ))}

              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-center rounded-[2.5rem] border-2 border-dashed border-neutral-200 bg-neutral-50/50 p-8"
              >
                <div className="text-center">
                  <Sparkles className="h-8 w-8 text-primary-400 mx-auto mb-4" />
                  <p className="font-bold text-neutral-700">Not sure which technique?</p>
                  <p className="mt-2 text-sm text-neutral-500 font-light">
                    Get a free consultation from board-certified surgeons.
                  </p>
                  <Link href="/contact?procedure=liposuction&country=turkey">
                    <Button variant="outline" className="mt-6 rounded-full border-primary-200 text-primary-600 hover:bg-primary-50">
                      Get Expert Advice <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </m.div>
            </div>
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
                  Top Liposuction Clinics
                </h2>
                <p className="mt-4 text-lg text-neutral-600 font-light">
                  JCI-accredited hospitals vetted for international quality standards.
                </p>
              </div>
              <Link href="/search?procedure=liposuction&country=turkey">
                <Button variant="outline" className="group rounded-full border-neutral-200 px-8 py-6 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-all duration-300">
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
                    <p className="text-neutral-500 text-sm font-light leading-relaxed">{clinic.specialties}</p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-neutral-400 text-sm font-medium">{clinic.reviews} Reviews</span>
                    <span className="text-sm font-bold text-primary-600 group-hover:text-primary-700 transition-colors flex items-center gap-2">
                      View Profile <ArrowRight className="h-4 w-4" />
                    </span>
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
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary-900 mb-4">The MeetYourClinic Advantage</h3>
                  <p className="text-lg text-primary-800/80 font-light leading-relaxed">
                    Every clinic on our platform undergoes a rigorous 50-point vetting process. 
                    We verify JCI accreditation, surgeon credentials, and genuine patient 
                    outcomes so you can book with absolute confidence.
                  </p>
                </div>
                <div className="flex-shrink-0 w-full md:w-auto">
                  <Link href="/search?procedure=liposuction&country=turkey">
                    <Button className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white rounded-2xl px-8 py-6 font-bold shadow-lg shadow-primary-200">
                      Browse Vetted Clinics
                    </Button>
                  </Link>
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
                Your Day-by-Day Guide
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                What to expect during your recovery in Turkey and after returning home.
              </p>
            </m.div>

            <div className="relative">
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

            <m.div {...fadeInUp} className="mt-16 grid gap-6 sm:grid-cols-3">
              {PRACTICAL_INFO.map((info, i) => (
                <div key={i} className="p-8 rounded-[2rem] border border-neutral-100 bg-white">
                  <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 mb-6">
                    <info.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-4">{info.title}</h3>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">{info.content}</p>
                </div>
              ))}
            </m.div>
          </div>
        </section>

        {/* =====================================================================
            SECTION G: COMBINATION PROCEDURES
            ===================================================================== */}
        <section className="py-28 sm:py-36 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">Packages</span>
              <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Combination Procedures
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Save 20–30% by combining procedures in a single trip — one recovery, maximum results.
              </p>
            </m.div>

            <div className="grid gap-8 sm:grid-cols-3">
              {COMBINATIONS.map((combo, i) => (
                <m.div
                  key={combo.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-8 rounded-[2.5rem] border border-neutral-200/60 bg-white hover:border-primary-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                >
                  <h3 className="text-xl font-bold text-neutral-900">{combo.name}</h3>
                  <p className="text-primary-600 font-bold text-lg mt-2">{combo.price}</p>
                  <div className="flex items-center gap-2 mt-3 text-sm text-neutral-400">
                    <Clock className="h-4 w-4" />
                    {combo.recovery} recovery
                  </div>
                  <p className="mt-6 text-neutral-500 font-light leading-relaxed text-sm">{combo.notes}</p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION H: DESTINATION COMPARISON
            ===================================================================== */}
        <section className="py-28 sm:py-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">Alternatives</span>
              <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Compare Destinations
              </h2>
            </m.div>

            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { name: 'Hungary', price: 'From £1,165/area', desc: 'Lowest prices in Europe, EU-regulated, 2.5hr flight', href: '/procedures/liposuction/hungary' },
                { name: 'Poland', price: 'From £500/area', desc: 'EU-regulated, N.I.L. technology, 2hr flight', href: '/procedures/liposuction/poland' },
                { name: 'Spain', price: 'From £2,400/area', desc: 'Premium quality, #1 healthcare ranking, 2hr flight', href: '/procedures/liposuction/spain' }
              ].map((dest, i) => (
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
          </div>
        </section>

        {/* =====================================================================
            SECTION I: FAQ
            ===================================================================== */}
        <section className="py-28 sm:py-36 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="text-center mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">Common Questions</span>
              <h2 className="text-4xl font-bold text-neutral-900 tracking-tight sm:text-5xl">
                Liposuction Turkey FAQs
              </h2>
            </m.div>
            <m.div {...fadeInUp} className="bg-white rounded-[2.5rem] border border-neutral-200/60 p-4 sm:p-10 shadow-xl shadow-neutral-100">
              <FAQSection faqs={faqs} title="" className="faq-section-custom" />
            </m.div>
          </div>
        </section>

        {/* =====================================================================
            SECTION J: CTA
            ===================================================================== */}
        <m.section {...fadeInUp} className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[3rem] bg-[#0A1A2F] p-12 text-white sm:p-20 lg:p-32 shadow-2xl text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 via-transparent to-rose-600/30" />
              <m.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -left-1/4 -top-1/4 h-full w-full rounded-full bg-primary-500/10 blur-[120px]" 
              />
              <div className="absolute inset-0 bg-transparent opacity-[0.03] mix-blend-overlay" />
              
              <div className="relative z-10 mx-auto max-w-4xl">
                <span className="text-sm font-bold tracking-[0.3em] text-primary-300 uppercase mb-6 block">Ready to begin?</span>
                <h2 className="text-4xl font-bold sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] mb-8">
                  Your Transformation <br/>Starts in <span className="text-primary-400">Turkey</span>
                </h2>
                <p className="mx-auto mt-8 max-w-2xl text-xl text-neutral-300 font-light leading-relaxed">
                  Compare prices from JCI-accredited clinics in Istanbul and Antalya. 
                  Receive personalised treatment plans — no obligation.
                </p>
                
                <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
                  <Link href="/search?procedure=liposuction&country=turkey" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-12 py-8 text-lg font-bold shadow-xl shadow-white/10">
                      Get My Free Quote
                    </Button>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-full px-12 py-8 text-lg font-bold backdrop-blur-md">
                      Speak to an Advisor
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-8 text-sm font-medium text-neutral-400">
                  <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary-400" /> JCI-Accredited</div>
                  <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary-400" /> Verified Pricing</div>
                  <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary-400" /> 24/7 Support</div>
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
              <Link href="/procedures/liposuction/hungary" className="text-neutral-600 hover:text-primary-600 transition-colors">Liposuction in Hungary</Link>
              <Link href="/procedures/liposuction/poland" className="text-neutral-600 hover:text-primary-600 transition-colors">Liposuction in Poland</Link>
              <Link href="/destinations/turkey" className="text-neutral-600 hover:text-primary-600 transition-colors">Medical Tourism Turkey</Link>
            </div>
          </div>
        </section>
      </div>
  )
}
