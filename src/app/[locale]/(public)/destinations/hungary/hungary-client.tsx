'use client'

import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { FAQSection } from '@/components/seo/faq-section'
import {
  CheckCircle,
  Shield,
  Star,
  Plane,
  MapPin,
  ArrowRight,
  Globe,
  BadgeCheck,
  Building2,
  CreditCard,
  FileText,
  Stethoscope,
  Eye,
  Scissors,
  SmilePlus,
  Calendar,
  Droplets,
  Award,
  Heart,
  Clock,
  Sparkles,
} from 'lucide-react'
import { HU, TR } from 'country-flag-icons/react/3x2'

// =============================================================================
// TYPES
// =============================================================================

interface HungaryDestinationClientProps {
  faqs: Array<{ question: string; answer: string }>
}

// =============================================================================
// STATIC DATA — HERO STATS
// =============================================================================

const HERO_STATS = [
  { value: '100,000+', label: 'Dental tourists annually' },
  { value: '3,000+', label: 'Dental clinics nationwide' },
  { value: '40–60%', label: 'Savings vs UK' },
  { value: '2.5 hrs', label: 'Flight from London' },
]

// =============================================================================
// STATIC DATA — PROCEDURES
// =============================================================================

const PROCEDURE_CATEGORIES = [
  {
    icon: SmilePlus,
    name: 'Dental Implants',
    procedures: 'Single implant, All-on-4, All-on-6',
    hungaryPrice: '£400–£800',
    ukPrice: '£1,500–£2,500',
    savings: '50–70%',
    link: '/procedures/dental-implants/hungary',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Star,
    name: 'Veneers & Crowns',
    procedures: 'E-max, Zirconia, Porcelain',
    hungaryPrice: '£200–£350/tooth',
    ukPrice: '£500–£800/tooth',
    savings: '50–60%',
    link: '/procedures/veneers/hungary',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    icon: Award,
    name: 'Cosmetic Dentistry',
    procedures: 'Smile makeover, Whitening',
    hungaryPrice: '£1,500–£4,000',
    ukPrice: '£4,000–£10,000',
    savings: '55–65%',
    link: '/search?procedure=cosmetic-dentistry&country=hungary',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Stethoscope,
    name: 'Rhinoplasty',
    procedures: 'Open, Closed, Revision',
    hungaryPrice: '£2,200–£3,500',
    ukPrice: '£5,000–£7,000',
    savings: '50–55%',
    link: '/procedures/rhinoplasty/hungary',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Scissors,
    name: 'Body Contouring',
    procedures: 'Liposuction, Tummy Tuck',
    hungaryPrice: '£2,500–£4,500',
    ukPrice: '£6,000–£10,000',
    savings: '50–55%',
    link: '/procedures/liposuction/hungary',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Eye,
    name: 'Eye Surgery',
    procedures: 'LASIK, Lens Replacement',
    hungaryPrice: '£800–£1,200',
    ukPrice: '£2,000–£3,500',
    savings: '55–65%',
    link: '/search?procedure=eye-surgery&country=hungary',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: Heart,
    name: 'Orthopaedics',
    procedures: 'Hip/Knee Replacement',
    hungaryPrice: '£6,000–£10,000',
    ukPrice: '£12,000–£18,000',
    savings: '40–50%',
    link: '/search?procedure=orthopaedics&country=hungary',
    color: 'bg-red-50 text-red-600',
  },
]

// =============================================================================
// STATIC DATA — COST COMPARISON
// =============================================================================

const DENTAL_COST_COMPARISON = [
  { item: '4 Dental Implants', hungary: '£1,600–£3,200', uk: '£6,000–£10,000' },
  { item: 'Crowns (4)', hungary: '£800–£1,400', uk: '£2,000–£3,200' },
  { item: 'Consultations', hungary: 'Usually included', uk: '£50–£150 each' },
  { item: 'X-rays/CT Scan', hungary: 'Usually included', uk: '£100–£300' },
  { item: 'Accommodation (5 nights)', hungary: '£250–£500', uk: 'N/A' },
  { item: 'Flights (return)', hungary: '£80–£200', uk: 'N/A' },
]

// =============================================================================
// STATIC DATA — QUALITY STANDARDS
// =============================================================================

const QUALITY_STANDARDS = [
  {
    icon: Globe,
    title: 'EU Regulatory Protection',
    description:
      'Hungary joined the EU in 2004. EU Cross-Border Healthcare Directive applies, providing the same patient rights framework as other European countries. Full consumer protections under EU law.',
  },
  {
    icon: BadgeCheck,
    title: 'Dental Qualifications',
    description:
      'Hungarian dental training is a rigorous 5-year university programme. Semmelweis University — one of Europe\'s oldest medical schools (founded 1769). Many dentists trained in Germany, Austria, or Switzerland.',
  },
  {
    icon: Building2,
    title: 'Clinic Standards',
    description:
      'Hungarian Ministry of Health certification required for all clinics. Many hold ISO 9001 certification. Modern equipment standard: CEREC, 3D scanning, digital X-rays. EU-approved materials and implant brands.',
  },
  {
    icon: FileText,
    title: 'What to Verify',
    description:
      'Dentist\'s Hungarian Medical Chamber registration, clinic\'s Ministry of Health licence, specific implant brands used (Nobel, Straumann, Alpha Bio), written treatment plan before travel, clear aftercare protocol.',
  },
]

// =============================================================================
// STATIC DATA — HUNGARY VS TURKEY
// =============================================================================

const COMPARISON_TABLE = [
  { factor: 'Flight time', hungary: '2.5 hours', turkey: '3.5–4 hours' },
  { factor: 'Price level', hungary: '40–60% savings', turkey: '50–70% savings' },
  { factor: 'Best for', hungary: 'Dental work', turkey: 'Dental, cosmetic, hair' },
  { factor: 'EU protections', hungary: 'Yes', turkey: 'No' },
  { factor: 'Language', hungary: 'English good', turkey: 'English excellent' },
  { factor: 'Visa required', hungary: 'No (EU)', turkey: 'e-Visa (£40)' },
  { factor: 'Recovery options', hungary: 'Thermal spas', turkey: 'Beach resorts' },
  { factor: 'Capacity', hungary: 'Smaller, personal', turkey: 'Large-scale' },
]

// =============================================================================
// STATIC DATA — CITIES
// =============================================================================

const CITIES = [
  {
    name: 'Budapest',
    description:
      '90%+ of dental tourists treated here. Major clinics include Kreativ Dental, Smile Dental, and Evergreen Dental. Beautiful city with excellent transport and famous thermal baths.',
    bestFor: 'All dental procedures, thermal spa recovery',
    flight: '2.5 hours from London',
    highlight: 'Capital city',
  },
  {
    name: 'Mosonmagyaróvár',
    description:
      'Small town on the Austrian border holding the world record for highest density of dental clinics per capita. Popular with German and Austrian patients seeking a quieter, more personal experience.',
    bestFor: 'Dental tourism, quieter experience',
    flight: 'Fly to Vienna or Budapest',
    highlight: 'World record clinic density',
  },
  {
    name: 'Győr',
    description:
      'Historic city between Budapest and Vienna with a growing dental tourism hub. Good option if combining your dental trip with a Vienna visit.',
    bestFor: 'Dental work, Vienna day trips',
    flight: 'Fly to Budapest or Vienna',
    highlight: 'Growing hub',
  },
  {
    name: 'Sopron',
    description:
      'Charming town on the Austrian border with a strong dental tradition. Easy access from Vienna airport makes it convenient for Austrian and German visitors.',
    bestFor: 'Dental treatment, wine region',
    flight: 'Fly to Vienna',
    highlight: 'Border town',
  },
]

// =============================================================================
// STATIC DATA — THERMAL BATHS
// =============================================================================

const THERMAL_BATHS = [
  {
    name: 'Széchenyi Baths',
    description: 'Europe\'s largest thermal bath complex with 18 pools',
    highlight: 'Largest in Europe',
  },
  {
    name: 'Gellért Baths',
    description: 'Art Nouveau masterpiece with stunning interior architecture',
    highlight: 'Art Nouveau gem',
  },
  {
    name: 'Rudas Baths',
    description: 'Ottoman-era baths with rooftop pool and panoramic views',
    highlight: 'Ottoman heritage',
  },
  {
    name: 'Király Baths',
    description: 'Authentic 16th-century Turkish baths in intimate setting',
    highlight: 'Historic Turkish',
  },
]

// =============================================================================
// STATIC DATA — PATIENT JOURNEY
// =============================================================================

const PATIENT_JOURNEY = [
  {
    step: 1,
    title: 'Research',
    timing: '2–4 weeks before',
    tasks: [
      'Request quotes from 2–3 clinics',
      'Video consultation or panoramic X-ray review',
      'Receive detailed treatment plan',
    ],
  },
  {
    step: 2,
    title: 'Book',
    timing: '1–2 weeks before',
    tasks: [
      'Confirm dates and pay deposit',
      'Book flights and accommodation',
      'Clinics often help with hotel recommendations',
    ],
  },
  {
    step: 3,
    title: 'Arrival',
    timing: 'Day 1',
    tasks: [
      'Many clinics offer airport pickup',
      'Initial consultation and examination',
      'Final treatment plan confirmation',
    ],
  },
  {
    step: 4,
    title: 'Treatment',
    timing: 'Day 2–5',
    tasks: [
      'Procedures performed',
      'Multiple appointments if needed',
      'Temporary restorations fitted if required',
    ],
  },
  {
    step: 5,
    title: 'Completion',
    timing: 'Final day',
    tasks: [
      'Final fittings and adjustments',
      'Written aftercare instructions',
      'Emergency contact details provided',
    ],
  },
  {
    step: 6,
    title: 'Aftercare',
    timing: 'Ongoing',
    tasks: [
      'Follow post-treatment instructions',
      'Contact clinic with any concerns',
      'Some treatments require return visit',
    ],
  },
]

// =============================================================================
// STATIC DATA — PRACTICAL INFO
// =============================================================================

const PRACTICAL_INFO = [
  {
    title: 'Flights',
    content:
      'Direct from London, Manchester, Birmingham, Edinburgh. Airlines: Wizz Air, Ryanair, British Airways, easyJet. Flight time: 2.5 hours. Cost: £50–£150 return.',
  },
  {
    title: 'Visas',
    content:
      'UK citizens: No visa required for stays under 90 days. Valid passport needed. Hungary is an EU and Schengen member.',
  },
  {
    title: 'Currency',
    content:
      'Hungarian Forint (HUF). Many clinics quote in EUR or GBP. Cards widely accepted. ATMs plentiful throughout Budapest.',
  },
  {
    title: 'Language',
    content:
      'Hungarian is the official language. English widely spoken in dental clinics. German also common due to Austrian/German patient history.',
  },
  {
    title: 'Best Time to Visit',
    content:
      'Spring (April–June) and Autumn (September–October) offer pleasant weather. Summer is hot and crowded. Winter is cold but festive.',
  },
  {
    title: 'Getting Around',
    content:
      'Budapest has excellent public transport (metro, trams, buses). Taxis and Bolt/Uber available. Most dental clinics are centrally located.',
  },
]

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

// =============================================================================
// COMPONENT
// =============================================================================

export function HungaryDestinationClient({ faqs }: HungaryDestinationClientProps) {
  return (
    <div className="bg-neutral-50">
        {/* ===================================================================
            HERO SECTION
            =================================================================== */}
        <section className="relative overflow-hidden bg-[#0A1A2F] text-white pt-16 pb-20 sm:pt-24 sm:pb-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/60 via-[#0A1A2F]/90 to-primary-950/90" />

          <m.div
            className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary-600/20 blur-[120px]"
            animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <m.div
            className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-blue-600/10 blur-[120px]"
            animate={{ x: [0, -25, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <m.div
            className="absolute left-1/2 top-1/3 h-1/3 w-1/3 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center justify-center"
            >
              <div className="mb-6 w-20 overflow-hidden rounded-2xl shadow-2xl shadow-primary-900/50 border border-white/10">
                <HU title="Hungary" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                Medical Tourism in <br />
                <span className="bg-gradient-to-r from-blue-200 via-emerald-200 to-primary-200 bg-clip-text text-transparent font-light">
                  Hungary: Europe&apos;s Dental Capital
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl lg:text-2xl leading-relaxed font-light">
                100,000+ dental tourists annually. EU healthcare standards. 2.5 hours from London.
              </p>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link href="/search?destination=hungary">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base shadow-xl shadow-white/10"
                >
                  Browse Verified Clinics in Hungary
                </Button>
              </Link>
              <Link href="#procedures">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full text-neutral-300 hover:text-white hover:bg-white/5 sm:w-auto rounded-full transition-all duration-300"
                >
                  View Procedures & Prices
                </Button>
              </Link>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
              className="mt-16 sm:mt-24 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
            >
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 text-center"
                >
                  <p className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-widest text-primary-200/80">
                    {stat.label}
                  </p>
                </div>
              ))}
            </m.div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          {/* =================================================================
              SECTION A: WHY HUNGARY
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-32">
                <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                  The Reality
                </span>
                <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl leading-[1.1] tracking-tight">
                  Why Hungary is Europe&apos;s Leading Dental Tourism Destination
                </h2>
              </div>
              <div className="mt-8 lg:col-span-7 lg:mt-0">
                <div className="text-neutral-600">
                  <p className="text-xl sm:text-2xl font-medium leading-relaxed text-neutral-900 tracking-tight">
                    Hungary pioneered dental tourism over 30 years ago, initially serving patients from
                    neighbouring Germany and Austria seeking quality dental care at lower prices. Today,
                    Hungary has earned its reputation as the &ldquo;Dental Capital of Europe&rdquo; — a title backed
                    by decades of experience, world-class facilities, and over 100,000 international
                    dental tourists annually.
                  </p>

                  <p className="mt-8 text-lg leading-relaxed font-light">
                    <strong className="font-semibold">EU membership provides genuine protection.</strong> Since joining the
                    European Union in 2004, Hungary operates under full EU healthcare regulations. This
                    means UK patients benefit from the same consumer protections, quality standards, and
                    legal frameworks as they would in any Western European country. The EU Cross-Border
                    Healthcare Directive applies, and materials used meet strict European certification
                    requirements.
                  </p>

                  <div className="my-10 border-l-[3px] border-primary-500 bg-gradient-to-r from-primary-50/80 to-transparent p-8 rounded-r-2xl">
                    <p className="text-lg italic leading-relaxed text-neutral-800">
                      <strong>A dental industry built on precision and quality.</strong> Hungarian dentists
                      are renowned for their meticulous approach, influenced by decades of serving
                      demanding German and Austrian patients. Semmelweis University — one of Europe&apos;s
                      oldest and most respected medical schools, founded in 1769 — trains many of the
                      country&apos;s dentists. This heritage of excellence, combined with modern technology and
                      competitive pricing, makes Hungary a compelling choice for UK patients.
                    </p>
                  </div>

                  <p className="text-lg leading-relaxed font-light">
                    <strong className="font-semibold">Market scale demonstrates trust.</strong> Hungary&apos;s dental tourism market
                    generated $541 million in 2023, with projections reaching $2.3 billion by 2030. With
                    3,000+ dental clinics nationwide and the border town of Mosonmagyaróvár holding the
                    world record for dental clinic density per capita, Hungary&apos;s infrastructure for
                    international patients is unmatched in Europe.
                  </p>
                </div>

                <div
                  className="mt-12 rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
                  data-aeo="safety-hungary"
                  data-question="Is dental treatment in Hungary safe?"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-6 w-6 text-primary-600" />
                    <h3 className="font-bold text-neutral-900">Healthcare Quality & Safety</h3>
                  </div>
                  <p className="text-neutral-700 leading-relaxed ai-answer-block safety-summary font-light">
                    Dental treatment in Hungary is safe and regulated to EU standards. As an EU member
                    state since 2004, Hungary&apos;s healthcare is governed by European regulations. Clinics
                    are licensed by the Hungarian Ministry of Health, with many holding ISO certification.
                    Hungary has been Europe&apos;s leading dental tourism destination for over 30 years,
                    treating 100,000+ international patients annually. The key is choosing established
                    clinics with verified credentials.
                  </p>
                </div>
              </div>
            </div>
          </m.section>

          {/* =================================================================
              SECTION B: PROCEDURES AVAILABLE
              ================================================================= */}
          <m.section {...fadeInUp} id="procedures" className="mb-24 scroll-mt-24 sm:mb-32">
            <div className="max-w-2xl">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Treatments
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Medical Procedures Available in Hungary
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Hungary excels in dental care but offers broader medical tourism options
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {PROCEDURE_CATEGORIES.map((proc, index) => (
                <m.div
                  key={proc.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                >
                  <Link
                    href={proc.link}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-neutral-100 bg-white p-8 transition-colors hover:border-primary-100"
                  >
                    <div className="relative z-10">
                      <div
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${proc.color} shadow-sm border border-white`}
                      >
                        <proc.icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 text-xl font-bold text-neutral-900 transition-colors group-hover:text-primary-700">
                        {proc.name}
                      </h3>
                      <p className="mt-2 text-sm text-neutral-600 leading-relaxed font-light">
                        {proc.procedures}
                      </p>
                    </div>

                    <div className="relative z-10 mt-6 space-y-3 rounded-xl bg-neutral-50 p-4 border border-neutral-100">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-neutral-500">Hungary</span>
                        <span className="font-bold text-primary-700">{proc.hungaryPrice}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-t border-neutral-200/60 pt-3">
                        <span className="font-medium text-neutral-500">UK Price</span>
                        <span className="text-neutral-600 line-through">{proc.ukPrice}</span>
                      </div>
                    </div>

                    <span className="relative z-10 mt-6 inline-flex items-center text-sm font-semibold text-green-600">
                      Save {proc.savings}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </m.div>
              ))}
            </div>

            <div className="mt-12 rounded-[2rem] border border-emerald-200/60 bg-emerald-50/50 p-8 flex items-start gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold mt-1">
                i
              </span>
              <p className="text-base text-emerald-900 leading-relaxed font-light">
                <strong className="font-semibold">Hungary&apos;s Strength:</strong> Dental procedures are the country&apos;s flagship
                offering. While cosmetic surgery and other treatments are available, Hungary&apos;s
                30+ years of dental tourism experience make it the go-to destination for implants,
                veneers, crowns, and full-mouth restorations.
              </p>
            </div>
          </m.section>

          {/* =================================================================
              SECTION C: COST COMPARISON
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="mb-8">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Investment
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Hungary vs UK: Dental Treatment Costs
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Detailed breakdown for dental procedures — Hungary&apos;s speciality
              </p>
            </div>

            <div
              className="mt-8 rounded-[2rem] bg-gradient-to-br from-emerald-50 to-green-50/50 p-8 border border-emerald-100"
              data-aeo="cost-hungary"
              data-question="How much do dental implants cost in Hungary?"
            >
              <p className="text-neutral-700 leading-relaxed ai-answer-block cost-summary text-lg font-light">
                Dental implants in Hungary cost £400–£800 per implant, compared to £1,500–£2,500 in
                the UK — savings of 50–70%. An All-on-4 full arch restoration costs £3,500–£6,000
                in Hungary versus £12,000–£20,000 in the UK. Prices include consultation, implant,
                abutment, and crown. Hungarian clinics use premium brands like Nobel, Straumann, and
                Alpha Bio at lower cost due to bulk purchasing and lower overheads.
              </p>
            </div>

            <div className="mt-10 bg-neutral-900 rounded-[3rem] p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-transparent to-primary-600/10" />
              <div className="absolute -top-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-emerald-500/5 blur-[100px]" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Worked Example: Full Mouth Restoration (4 Implants + Crowns)
                </h3>
                <p className="text-neutral-400 font-light mb-8">
                  Complete cost breakdown including travel expenses
                </p>

                <div className="rounded-3xl bg-white overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] border-collapse text-left">
                      <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50/80">
                          <th className="px-6 py-4 text-sm font-semibold text-neutral-900">
                            Cost Element
                          </th>
                          <th className="px-6 py-4 text-sm font-semibold text-emerald-700">
                            Hungary
                          </th>
                          <th className="px-6 py-4 text-sm font-semibold text-neutral-600">UK</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {DENTAL_COST_COMPARISON.map((row) => (
                          <tr
                            key={row.item}
                            className="transition-colors hover:bg-neutral-50/50"
                          >
                            <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                              {row.item}
                            </td>
                            <td className="px-6 py-4 text-sm font-bold text-emerald-700">
                              {row.hungary}
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-600">{row.uk}</td>
                          </tr>
                        ))}
                        <tr className="bg-emerald-50/50">
                          <td className="px-6 py-4 font-bold text-neutral-900">TOTAL</td>
                          <td className="px-6 py-4 text-lg font-bold text-emerald-700">
                            £2,700–£5,300
                          </td>
                          <td className="px-6 py-4 text-lg font-bold text-neutral-700">
                            £8,000–£14,000
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-green-500/20 px-6 py-3 border border-green-400/30">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <p className="text-sm text-green-300 font-semibold">
                    Savings: £5,000–£9,000 (55–65%)
                  </p>
                </div>

                <p className="mt-6 text-neutral-400 leading-relaxed text-sm font-light">
                  <strong className="text-neutral-300 font-semibold">Why Hungary costs less:</strong> Lower operational costs than Western Europe,
                  no VAT on dental treatments for foreign patients, bulk discounts from implant
                  manufacturers (Nobel, Straumann), and a competitive market that keeps prices fair
                  while maintaining quality.
                </p>
              </div>
            </div>
          </m.section>

          {/* =================================================================
              SECTION D: QUALITY & STANDARDS
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Excellence
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Healthcare Quality and Standards in Hungary
              </h2>
              <p className="mt-6 text-lg text-neutral-600 font-light">
                EU membership provides genuine regulatory protection
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {QUALITY_STANDARDS.map((item, index) => (
                <m.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 text-emerald-600 group-hover:from-emerald-100 group-hover:to-emerald-200 transition-colors duration-300">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base text-neutral-600 leading-relaxed font-light">
                    {item.description}
                  </p>
                </m.div>
              ))}
            </div>
          </m.section>

          {/* =================================================================
              SECTION E: HUNGARY VS TURKEY
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="mb-12 text-center max-w-3xl mx-auto">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Comparison
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Hungary vs Turkey: Which is Right for You?
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                An honest comparison to help you choose
              </p>
            </div>

            <div
              className="mb-12 rounded-[2rem] bg-gradient-to-br from-emerald-50 to-green-50/50 p-8 border border-emerald-100"
              data-aeo="hungary-vs-turkey"
              data-question="Is Hungary or Turkey better for dental tourism?"
            >
              <p className="text-neutral-700 leading-relaxed ai-answer-block comparison-summary text-lg font-light">
                Hungary offers EU patient protections, shorter flights (2.5 hours from London), and
                unique thermal spa recovery. Turkey provides lower prices (50–70% savings vs
                Hungary&apos;s 40–60%) and excels in cosmetic surgery and hair transplants. Choose Hungary
                for dental-focused trips where EU standards matter. Choose Turkey for combined
                procedures or when price is the primary concern. Both destinations offer high-quality
                care when choosing reputable clinics.
              </p>
            </div>

            <div className="bg-neutral-900 rounded-[3rem] p-8 sm:p-12 relative overflow-hidden mb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-transparent to-teal-600/10" />

              <div className="relative z-10 rounded-3xl bg-white overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-neutral-200 bg-neutral-50/80">
                        <th className="px-6 py-5 text-sm font-semibold text-neutral-900">
                          Factor
                        </th>
                        <th className="px-6 py-5 text-sm font-semibold text-emerald-700">
                          <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100 w-max">
                            <div className="w-6 overflow-hidden rounded-sm shadow-sm border border-emerald-200/50">
                              <HU title="Hungary" />
                            </div>
                            Hungary
                          </div>
                        </th>
                        <th className="px-6 py-5 text-sm font-semibold text-teal-700">
                          <div className="flex items-center gap-3 bg-teal-50 px-4 py-2 rounded-lg border border-teal-100 w-max">
                            <div className="w-6 overflow-hidden rounded-sm shadow-sm border border-teal-200/50">
                              <TR title="Turkey" />
                            </div>
                            Turkey
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {COMPARISON_TABLE.map((row) => (
                        <tr
                          key={row.factor}
                          className="transition-colors hover:bg-neutral-50/50"
                        >
                          <td className="px-6 py-5 font-bold text-neutral-900">{row.factor}</td>
                          <td className="px-6 py-5 font-medium text-emerald-800">
                            {row.hungary}
                          </td>
                          <td className="px-6 py-5 font-medium text-teal-800">{row.turkey}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-emerald-200 transition-colors">
                <h4 className="text-xl font-bold text-emerald-900 border-b border-emerald-200/50 pb-4 mb-4">
                  Choose Hungary if:
                </h4>
                <ul className="space-y-4 text-base text-emerald-800">
                  {[
                    'Dental treatment is your priority',
                    'EU consumer protections matter to you',
                    'You prefer a shorter flight',
                    'Thermal spa recovery appeals',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-teal-200 transition-colors">
                <h4 className="text-xl font-bold text-teal-900 border-b border-teal-200/50 pb-4 mb-4">
                  Choose Turkey if:
                </h4>
                <ul className="space-y-4 text-base text-teal-800">
                  {[
                    'You need cosmetic surgery or hair transplant',
                    'Budget is the primary driver',
                    'You want all-inclusive packages',
                    'You prefer larger facilities',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-500" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </m.section>

          {/* =================================================================
              SECTION F: CITIES
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="max-w-2xl text-center mx-auto mb-12">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Destinations
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Where to Get Treatment in Hungary
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Budapest dominates, but border towns offer alternatives
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {CITIES.map((city, index) => (
                <m.div
                  key={city.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
                >
                  <div className="flex flex-col items-start justify-between gap-4 mb-6">
                    <h3 className="text-2xl font-bold text-neutral-900 tracking-tight group-hover:text-primary-700 transition-colors">
                      {city.name}
                    </h3>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1.5 rounded-full border border-emerald-200/50 uppercase tracking-widest">
                      {city.highlight}
                    </span>
                  </div>

                  <div className="mt-2 border-t border-neutral-100 pt-6">
                    <p className="text-base text-neutral-600 leading-relaxed font-light">
                      {city.description}
                    </p>
                  </div>

                  <div className="mt-6 rounded-xl bg-neutral-50 p-5 border border-neutral-100/50 flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1">
                          Best for
                        </p>
                        <p className="text-sm text-neutral-800 font-medium leading-snug">
                          {city.bestFor}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-3 border-t border-neutral-200/50">
                      <Plane className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <p className="text-sm text-neutral-800 font-medium">{city.flight}</p>
                    </div>
                  </div>
                </m.div>
              ))}
            </div>
          </m.section>

          {/* =================================================================
              SECTION G: THERMAL SPAS
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="rounded-[3rem] bg-gradient-to-br from-cyan-50 to-emerald-50 p-8 sm:p-12 border border-cyan-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[url('/images/patterns/medical-pattern.svg')] opacity-5 mix-blend-multiply" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-cyan-100/50">
                    <Droplets className="h-7 w-7 text-cyan-600" />
                  </div>
                  <div>
                    <span className="text-sm font-bold tracking-[0.2em] text-cyan-600 uppercase">
                      Wellness
                    </span>
                    <h2 className="text-3xl font-bold text-neutral-900 tracking-tight sm:text-4xl leading-[1.1]">
                      Recovery in Hungary&apos;s Famous Thermal Baths
                    </h2>
                  </div>
                </div>
                <p className="mt-4 text-lg text-neutral-700 leading-relaxed max-w-3xl font-light">
                  Hungary has 1,500+ thermal springs, and Budapest is known as the &ldquo;City of Spas&rdquo;.
                  This unique offering sets Hungary apart from every other dental tourism destination —
                  combine your treatment with genuine wellness in thermal waters proven to aid
                  relaxation and recovery.
                </p>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {THERMAL_BATHS.map((bath) => (
                    <div
                      key={bath.name}
                      className="group rounded-[2rem] bg-white p-6 border border-cyan-100/50 hover:border-cyan-200 transition-colors"
                    >
                      <h4 className="font-bold text-neutral-900 group-hover:text-cyan-700 transition-colors">
                        {bath.name}
                      </h4>
                      <span className="mt-2 inline-block rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700 border border-cyan-100 uppercase tracking-widest">
                        {bath.highlight}
                      </span>
                      <p className="mt-4 text-sm text-neutral-600 leading-relaxed font-light">
                        {bath.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl bg-white/70 p-5 border border-cyan-100/50 flex items-start gap-4 backdrop-blur-sm">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 font-bold mt-0.5">
                    !
                  </span>
                  <p className="text-sm text-neutral-800 leading-relaxed font-light">
                    <strong className="font-semibold">Important Note:</strong> Check with your dentist before bathing — typically wait
                    24–48 hours post-procedure. The warm mineral waters aid relaxation but shouldn&apos;t
                    be combined with open wounds or recent surgical sites.
                  </p>
                </div>
              </div>
            </div>
          </m.section>

          {/* =================================================================
              SECTION H: PATIENT JOURNEY
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Process
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Your Hungary Medical Tourism Journey
              </h2>
            </div>

            <div className="mx-auto max-w-4xl relative">
              <div className="absolute left-8 top-8 bottom-8 w-1 bg-emerald-100 rounded-full hidden sm:block" />
              <div className="space-y-8 sm:space-y-12">
                {PATIENT_JOURNEY.map((phase, index) => (
                  <m.div
                    key={phase.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="relative flex flex-col sm:flex-row gap-6 sm:gap-12"
                  >
                    <div className="flex items-center gap-4 sm:hidden">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-lg font-bold text-white shadow-lg shadow-emerald-500/30 border-4 border-white">
                        {phase.step}
                      </div>
                      <span className="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-sm font-semibold border border-emerald-100">
                        {phase.timing}
                      </span>
                    </div>

                    <div className="hidden sm:flex flex-col items-center z-10">
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-xl font-bold text-white shadow-lg shadow-emerald-500/30 border-4 border-white">
                        {phase.step}
                      </div>
                    </div>

                    <div className="flex-1 rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                      <div className="hidden sm:flex items-center gap-4 mb-4">
                        <h3 className="text-xl font-bold text-neutral-900">{phase.title}</h3>
                        <span className="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-sm font-semibold border border-emerald-100">
                          {phase.timing}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-4 sm:hidden">
                        {phase.title}
                      </h3>

                      <ul className="space-y-3">
                        {phase.tasks.map((task) => (
                          <li
                            key={task}
                            className="flex items-start gap-3 text-base text-neutral-600 font-light"
                          >
                            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </m.div>
                ))}
              </div>
            </div>
          </m.section>

          {/* =================================================================
              SECTION I: PRACTICAL INFORMATION
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Logistics
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Planning Your Hungary Trip
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PRACTICAL_INFO.map((info, index) => (
                <m.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
                >
                  <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                    {info.title}
                  </h3>
                  <p className="mt-4 text-base text-neutral-600 leading-relaxed font-light">
                    {info.content}
                  </p>
                </m.div>
              ))}
            </div>
          </m.section>

          {/* =================================================================
              SECTION J: FAQ
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-10">
                <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                  Common Questions
                </span>
              </div>
              <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-xl p-8 sm:p-12">
                <FAQSection
                  faqs={faqs}
                  title="Frequently Asked Questions About Medical Tourism in Hungary"
                  className="faq-section"
                />
              </div>
            </div>
          </m.section>

          {/* =================================================================
              SECTION K: CTA
              ================================================================= */}
          <m.section {...fadeInUp} className="pb-12">
            <div className="relative overflow-hidden bg-[#0A1A2F] rounded-[3rem] p-8 text-white sm:p-12 lg:p-20 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-blue-600/20" />
              <m.div
                className="absolute -left-1/4 -top-1/4 h-full w-full rounded-full bg-primary-500/10 blur-[120px]"
                animate={{ x: [0, 20, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              />
              <m.div
                className="absolute -bottom-1/4 -right-1/4 h-full w-full rounded-full bg-blue-500/10 blur-[120px]"
                animate={{ x: [0, -20, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="relative z-10 mx-auto max-w-3xl">
                <div className="mx-auto mb-8 w-20 overflow-hidden rounded-2xl shadow-2xl border-2 border-white/20">
                  <HU title="Hungary" />
                </div>
                <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl tracking-tight leading-[1.1]">
                  Ready to Explore Dental Treatment in{' '}
                  <span className="bg-gradient-to-r from-blue-200 via-emerald-200 to-primary-200 bg-clip-text text-transparent">
                    Hungary
                  </span>
                  ?
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl font-light leading-relaxed">
                  Use MeetYourClinic to compare verified clinics in Budapest and beyond. EU-regulated,
                  quality-focused, with 30+ years of dental tourism heritage. Get real prices,
                  read honest reviews, and book with confidence.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href="/search?destination=hungary">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base shadow-xl shadow-white/10"
                    >
                      Browse Verified Clinics in Hungary
                    </Button>
                  </Link>
                  <Link href="/dental">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base backdrop-blur-md"
                    >
                      Compare Dental Procedures
                    </Button>
                  </Link>
                </div>
                <div className="mt-8 flex items-center justify-center gap-6 flex-wrap text-sm text-primary-200/80 font-medium tracking-wide">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" /> EU healthcare standards
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" /> ISO certified clinics
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" /> No booking fees
                  </span>
                </div>
              </div>
            </div>
          </m.section>

          {/* =================================================================
              INTERNAL LINKS
              ================================================================= */}
          <m.section
            {...fadeInUp}
            className="mt-12 border-t border-neutral-200 pt-8 text-center"
          >
            <p className="text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase mb-4">
              Related Guides:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/procedures/dental-implants/hungary"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Dental Implants
              </Link>
              <span className="text-neutral-300">·</span>
              <Link
                href="/procedures/veneers/hungary"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Veneers
              </Link>
              <span className="text-neutral-300">·</span>
              <Link
                href="/procedures/rhinoplasty/hungary"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Rhinoplasty
              </Link>
              <span className="text-neutral-300">·</span>
              <Link
                href="/procedures/liposuction/hungary"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Liposuction
              </Link>
              <span className="text-neutral-300">·</span>
              <Link
                href="/procedures/tummy-tuck/hungary"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Tummy Tuck
              </Link>
              <span className="text-neutral-300">·</span>
              <Link
                href="/destinations/turkey"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Turkey
              </Link>
              <span className="text-neutral-300">·</span>
              <Link
                href="/dental"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Dental Work Abroad
              </Link>
            </div>
          </m.section>
        </div>
      </div>
  )
}
