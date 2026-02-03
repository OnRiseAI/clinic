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
} from 'lucide-react'

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
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
}

// =============================================================================
// COMPONENT
// =============================================================================

export function HungaryDestinationClient({ faqs }: HungaryDestinationClientProps) {
  return (
    <>
      {/* =====================================================================
          HERO SECTION
          ===================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-900 text-white">
        <div className="absolute inset-0 bg-[url('/images/patterns/medical-pattern.svg')] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="flex items-start gap-4 sm:items-center">
            <span className="text-5xl sm:text-6xl">🇭🇺</span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Medical Tourism in Hungary: Europe's Dental Capital
              </h1>
              <p className="mt-4 max-w-2xl text-base text-emerald-100 sm:text-lg lg:text-xl">
                100,000+ dental tourists annually. EU healthcare standards. 2.5 hours from London.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <Link href="/search?destination=hungary">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Browse Verified Clinics in Hungary
              </Button>
            </Link>
            <Link href="#procedures">
              <Button
                variant="ghost"
                size="lg"
                className="w-full text-white hover:bg-white/10 sm:w-auto"
              >
                View Procedures & Prices
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-emerald-200 sm:gap-6">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              EU Healthcare Standards
            </span>
            <span className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              ISO Certified Clinics
            </span>
            <span className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              English-Speaking Staff
            </span>
            <span className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              Thermal Spa Recovery
            </span>
          </div>

          {/* Hero Stats */}
          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white/10 p-4 backdrop-blur-sm"
              >
                <p className="text-2xl font-bold sm:text-3xl">{stat.value}</p>
                <p className="text-sm text-emerald-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* =====================================================================
            SECTION A: WHY HUNGARY
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Why Hungary is Europe's Leading Dental Tourism Destination
          </h2>

          <div className="mt-6 space-y-4 text-neutral-700 sm:mt-8 sm:space-y-6">
            <p className="text-base leading-relaxed sm:text-lg">
              Hungary pioneered dental tourism over 30 years ago, initially serving patients from
              neighbouring Germany and Austria seeking quality dental care at lower prices. Today,
              Hungary has earned its reputation as the "Dental Capital of Europe" — a title backed
              by decades of experience, world-class facilities, and over 100,000 international
              dental tourists annually.
            </p>

            <p className="leading-relaxed">
              <strong>EU membership provides genuine protection.</strong> Since joining the
              European Union in 2004, Hungary operates under full EU healthcare regulations. This
              means UK patients benefit from the same consumer protections, quality standards, and
              legal frameworks as they would in any Western European country. The EU Cross-Border
              Healthcare Directive applies, and materials used meet strict European certification
              requirements.
            </p>

            <p className="leading-relaxed">
              <strong>A dental industry built on precision and quality.</strong> Hungarian dentists
              are renowned for their meticulous approach, influenced by decades of serving
              demanding German and Austrian patients. Semmelweis University — one of Europe's
              oldest and most respected medical schools, founded in 1769 — trains many of the
              country's dentists. This heritage of excellence, combined with modern technology and
              competitive pricing, makes Hungary a compelling choice for UK patients.
            </p>

            <p className="leading-relaxed">
              <strong>Market scale demonstrates trust.</strong> Hungary's dental tourism market
              generated $541 million in 2023, with projections reaching $2.3 billion by 2030. With
              3,000+ dental clinics nationwide and the border town of Mosonmagyaróvár holding the
              world record for dental clinic density per capita, Hungary's infrastructure for
              international patients is unmatched in Europe.
            </p>
          </div>

          {/* AEO Block — Safety */}
          <div
            className="mt-8 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 p-4 sm:p-6 border border-emerald-100"
            data-aeo="safety-hungary"
            data-question="Is dental treatment in Hungary safe?"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block safety-summary">
              Dental treatment in Hungary is safe and regulated to EU standards. As an EU member
              state since 2004, Hungary's healthcare is governed by European regulations. Clinics
              are licensed by the Hungarian Ministry of Health, with many holding ISO certification.
              Hungary has been Europe's leading dental tourism destination for over 30 years,
              treating 100,000+ international patients annually. The key is choosing established
              clinics with verified credentials.
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION B: PROCEDURES AVAILABLE
            ===================================================================== */}
        <m.section {...fadeInUp} id="procedures" className="mb-16 scroll-mt-8 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Medical Procedures Available in Hungary
          </h2>
          <p className="mt-2 text-neutral-600">
            Hungary excels in dental care but offers broader medical tourism options
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {PROCEDURE_CATEGORIES.map((proc, index) => (
              <m.div
                key={proc.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={proc.link}
                  className="group block h-full rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:border-emerald-200 hover:shadow-md"
                >
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${proc.color}`}>
                    <proc.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-neutral-900 group-hover:text-emerald-600">
                    {proc.name}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">{proc.procedures}</p>
                  <div className="mt-4 space-y-1 text-sm">
                    <p className="font-medium text-emerald-700">Hungary: {proc.hungaryPrice}</p>
                    <p className="text-neutral-500">UK: {proc.ukPrice}</p>
                    <p className="font-semibold text-green-600">Save {proc.savings}</p>
                  </div>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-emerald-600">
                    Compare clinics
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </Link>
              </m.div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
            <p className="text-sm text-emerald-800">
              <strong>Hungary's Strength:</strong> Dental procedures are the country's flagship
              offering. While cosmetic surgery and other treatments are available, Hungary's
              30+ years of dental tourism experience make it the go-to destination for implants,
              veneers, crowns, and full-mouth restorations.
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION C: COST COMPARISON
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Hungary vs UK: Dental Treatment Costs
          </h2>
          <p className="mt-2 text-neutral-600">
            Detailed breakdown for dental procedures — Hungary's speciality
          </p>

          {/* AEO Block — Cost */}
          <div
            className="mt-6 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 p-4 sm:p-6 border border-emerald-100"
            data-aeo="cost-hungary"
            data-question="How much do dental implants cost in Hungary?"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block cost-summary">
              Dental implants in Hungary cost £400–£800 per implant, compared to £1,500–£2,500 in
              the UK — savings of 50–70%. An All-on-4 full arch restoration costs £3,500–£6,000
              in Hungary versus £12,000–£20,000 in the UK. Prices include consultation, implant,
              abutment, and crown. Hungarian clinics use premium brands like Nobel, Straumann, and
              Alpha Bio at lower cost due to bulk purchasing and lower overheads.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">
              Worked Example: Full Mouth Restoration (4 Implants + Crowns)
            </h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[400px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50">
                    <th className="px-4 py-3 text-left font-semibold text-neutral-900">Cost Element</th>
                    <th className="px-4 py-3 text-left font-semibold text-emerald-700">Hungary</th>
                    <th className="px-4 py-3 text-left font-semibold text-neutral-700">UK</th>
                  </tr>
                </thead>
                <tbody>
                  {DENTAL_COST_COMPARISON.map((row, index) => (
                    <tr
                      key={row.item}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}
                    >
                      <td className="border-b border-neutral-100 px-4 py-3 text-neutral-900">
                        {row.item}
                      </td>
                      <td className="border-b border-neutral-100 px-4 py-3 font-medium text-emerald-700">
                        {row.hungary}
                      </td>
                      <td className="border-b border-neutral-100 px-4 py-3 text-neutral-600">
                        {row.uk}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-emerald-50 font-semibold">
                    <td className="px-4 py-3 text-neutral-900">TOTAL</td>
                    <td className="px-4 py-3 text-emerald-700">£2,700–£5,300</td>
                    <td className="px-4 py-3 text-neutral-700">£8,000–£14,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-neutral-600">
              <strong className="text-green-600">Savings: £5,000–£9,000 (55–65%)</strong>
            </p>
          </div>

          <div className="mt-6 space-y-3 text-neutral-700">
            <p className="leading-relaxed">
              <strong>Why Hungary costs less:</strong> Lower operational costs than Western Europe,
              no VAT on dental treatments for foreign patients, bulk discounts from implant
              manufacturers (Nobel, Straumann), and a competitive market that keeps prices fair
              while maintaining quality.
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION D: QUALITY & STANDARDS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Healthcare Quality and Standards in Hungary
          </h2>
          <p className="mt-2 text-neutral-600">
            EU membership provides genuine regulatory protection
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2">
            {QUALITY_STANDARDS.map((item, index) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.description}</p>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION E: HUNGARY VS TURKEY
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Hungary vs Turkey: Which is Right for You?
          </h2>
          <p className="mt-2 text-neutral-600">
            An honest comparison to help you choose
          </p>

          {/* AEO Block — Comparison */}
          <div
            className="mt-6 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 p-4 sm:p-6 border border-emerald-100"
            data-aeo="hungary-vs-turkey"
            data-question="Is Hungary or Turkey better for dental tourism?"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block comparison-summary">
              Hungary offers EU patient protections, shorter flights (2.5 hours from London), and
              unique thermal spa recovery. Turkey provides lower prices (50–70% savings vs
              Hungary's 40–60%) and excels in cosmetic surgery and hair transplants. Choose Hungary
              for dental-focused trips where EU standards matter. Choose Turkey for combined
              procedures or when price is the primary concern. Both destinations offer high-quality
              care when choosing reputable clinics.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Factor</th>
                  <th className="px-4 py-3 text-left font-semibold text-emerald-700">🇭🇺 Hungary</th>
                  <th className="px-4 py-3 text-left font-semibold text-teal-700">🇹🇷 Turkey</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map((row, index) => (
                  <tr
                    key={row.factor}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}
                  >
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-neutral-900">
                      {row.factor}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-emerald-700">
                      {row.hungary}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-teal-700">
                      {row.turkey}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <h4 className="font-semibold text-emerald-900">Choose Hungary if:</h4>
              <ul className="mt-3 space-y-2 text-sm text-emerald-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Dental treatment is your priority
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  EU consumer protections matter to you
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  You prefer a shorter flight
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Thermal spa recovery appeals
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-teal-200 bg-teal-50 p-5">
              <h4 className="font-semibold text-teal-900">Choose Turkey if:</h4>
              <ul className="mt-3 space-y-2 text-sm text-teal-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  You need cosmetic surgery or hair transplant
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Budget is the primary driver
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  You want all-inclusive packages
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  You prefer larger facilities
                </li>
              </ul>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION F: CITIES
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Where to Get Treatment in Hungary
          </h2>
          <p className="mt-2 text-neutral-600">
            Budapest dominates, but border towns offer alternatives
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2">
            {CITIES.map((city, index) => (
              <m.div
                key={city.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-neutral-900">{city.name}</h3>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    {city.highlight}
                  </span>
                </div>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{city.description}</p>
                <div className="mt-4 space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <strong>Best for:</strong> {city.bestFor}
                  </p>
                  <p className="flex items-center gap-2 text-neutral-600">
                    <Plane className="h-4 w-4 text-emerald-500" />
                    {city.flight}
                  </p>
                </div>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION G: THERMAL SPAS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <div className="rounded-2xl bg-gradient-to-br from-cyan-50 to-emerald-50 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Droplets className="h-8 w-8 text-cyan-600" />
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                Recovery in Hungary's Famous Thermal Baths
              </h2>
            </div>
            <p className="mt-4 text-neutral-700 leading-relaxed">
              Hungary has 1,500+ thermal springs, and Budapest is known as the "City of Spas".
              This unique offering sets Hungary apart from every other dental tourism destination —
              combine your treatment with genuine wellness in thermal waters proven to aid
              relaxation and recovery.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {THERMAL_BATHS.map((bath) => (
                <div
                  key={bath.name}
                  className="rounded-xl bg-white p-4 shadow-sm"
                >
                  <h4 className="font-semibold text-neutral-900">{bath.name}</h4>
                  <p className="mt-1 text-xs text-cyan-600">{bath.highlight}</p>
                  <p className="mt-2 text-sm text-neutral-600">{bath.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg bg-white/70 p-4">
              <p className="text-sm text-neutral-700">
                <strong>Note:</strong> Check with your dentist before bathing — typically wait
                24–48 hours post-procedure. The warm mineral waters aid relaxation but shouldn't
                be combined with open wounds or recent surgical sites.
              </p>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION H: PATIENT JOURNEY
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Your Hungary Medical Tourism Journey
          </h2>

          <div className="mt-8 space-y-6">
            {PATIENT_JOURNEY.map((phase, index) => (
              <m.div
                key={phase.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                    {phase.step}
                  </div>
                  {index < PATIENT_JOURNEY.length - 1 && (
                    <div className="mt-2 h-full w-0.5 bg-emerald-200" />
                  )}
                </div>
                <div className="pb-6">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-neutral-900">{phase.title}</h3>
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
                      {phase.timing}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {phase.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2 text-sm text-neutral-600">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION I: PRACTICAL INFORMATION
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Planning Your Hungary Trip
          </h2>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICAL_INFO.map((info, index) => (
              <m.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-5"
              >
                <h3 className="font-semibold text-neutral-900">{info.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{info.content}</p>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION J: FAQ
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <FAQSection
            faqs={faqs}
            title="Frequently Asked Questions About Medical Tourism in Hungary"
            className="faq-section"
          />
        </m.section>

        {/* =====================================================================
            SECTION K: CTA
            ===================================================================== */}
        <m.section {...fadeInUp}>
          <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-800 p-6 text-white sm:p-8 lg:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-5xl">🇭🇺</span>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                Ready to Explore Dental Treatment in Hungary?
              </h2>
              <p className="mt-3 text-emerald-100 sm:mt-4 sm:text-lg">
                Use medit to compare verified clinics in Budapest and beyond. EU-regulated,
                quality-focused, with 30+ years of dental tourism heritage. Get real prices,
                read honest reviews, and book with confidence.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
                <Link href="/search?destination=hungary">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Browse Verified Clinics in Hungary
                  </Button>
                </Link>
                <Link href="/dental">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full text-white hover:bg-white/10 sm:w-auto"
                  >
                    Compare Dental Procedures
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-emerald-200">
                EU healthcare standards · ISO certified clinics · No booking fees
              </p>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            INTERNAL LINKS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mt-12 border-t border-neutral-200 pt-8">
          <p className="text-sm text-neutral-600">
            <strong>Procedures in Hungary:</strong>{' '}
            <Link href="/procedures/dental-implants/hungary" className="text-emerald-600 hover:underline">
              Dental Implants
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/veneers/hungary" className="text-emerald-600 hover:underline">
              Veneers
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/rhinoplasty/hungary" className="text-emerald-600 hover:underline">
              Rhinoplasty
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/liposuction/hungary" className="text-emerald-600 hover:underline">
              Liposuction
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/tummy-tuck/hungary" className="text-emerald-600 hover:underline">
              Tummy Tuck
            </Link>
          </p>
          <p className="mt-2 text-sm text-neutral-600">
            <strong>Compare:</strong>{' '}
            <Link href="/destinations/turkey" className="text-emerald-600 hover:underline">
              Turkey
            </Link>{' '}
            ·{' '}
            <Link href="/dental" className="text-emerald-600 hover:underline">
              Dental Work Abroad
            </Link>
          </p>
        </m.section>
      </div>
    </>
  )
}
