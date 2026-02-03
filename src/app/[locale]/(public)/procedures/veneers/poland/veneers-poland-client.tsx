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
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-700 via-rose-800 to-rose-900 text-white">
        <div className="absolute inset-0 bg-[url('/images/patterns/dental-pattern.svg')] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Veneers in Poland: Prices, Clinics & What UK Patients Need to Know
            </h1>
            <p className="mt-4 text-base text-rose-100 sm:mt-6 sm:text-lg lg:text-xl">
              EU-standard dental care, German materials, and savings of 50-70% — discover why Poland
              is becoming a top choice for UK patients seeking quality veneers.
            </p>
            <p className="mt-4 text-rose-200 leading-relaxed">
              Poland combines the regulatory protections of EU membership with significant cost
              savings. Whether you're considering composite, porcelain, or E-max veneers, medit
              helps you compare accredited clinics in Krakow and Warsaw, understand your options,
              and make an informed choice.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link href="/search?procedure=veneers&country=poland">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Compare Clinics & Get a Free Quote
                </Button>
              </Link>
              <Link href="#pricing">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full text-white hover:bg-white/10 sm:w-auto"
                >
                  View 2025 Prices
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Strip */}
          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/20 pt-8 text-sm text-rose-200 sm:mt-12 sm:gap-6">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              EU-regulated clinics
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Prices verified quarterly
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              UK patient reviews
            </span>
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Free, no-obligation quotes
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* =====================================================================
            SECTION B: WHY POLAND
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Why UK Patients Choose Poland for Veneers
          </h2>
          <p className="mt-2 text-neutral-600">
            Poland offers a compelling combination of quality, value, and accessibility
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_POLAND_POINTS.map((point, index) => (
              <m.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                  <point.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-neutral-900">{point.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{point.description}</p>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION C: PRICING
            ===================================================================== */}
        <m.section {...fadeInUp} id="pricing" className="mb-16 scroll-mt-8 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            How Much Do Veneers Cost in Poland?
          </h2>
          <p className="mt-2 text-neutral-600">
            Prices updated February 2025. All prices in GBP (£).
          </p>

          {/* AEO Block — Primary pricing statement */}
          <div
            className="mt-6 rounded-xl bg-gradient-to-br from-rose-50 to-orange-50 p-4 sm:p-6 border border-rose-100"
            data-aeo="veneers-poland-cost"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block cost-summary">
              A single E-max veneer in Poland costs between £250 and £400, compared with £800 to
              £1,200 in the UK — a saving of up to 69%. A full set of 20 E-max veneers typically
              costs £5,000 to £8,000 in Poland, versus £16,000 to £24,000 in the UK. Composite
              veneers start from just £70 per tooth. Prices typically include consultation, digital
              smile design, tooth preparation, temporary veneers, permanent veneer fitting, and
              follow-up appointments.
            </p>
          </div>

          {/* Price per Tooth Table */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">Price per Tooth by Material</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Veneer Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">
                    Poland Price (£/tooth)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">
                    UK Price (£/tooth)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-green-700">Saving</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_PER_TOOTH.map((row, index) => (
                  <tr
                    key={row.treatment}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}
                  >
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-neutral-900">
                      {row.treatment}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-rose-700">
                      {row.polandPrice}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-600">
                      {row.ukPrice}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 font-semibold text-green-600">
                      {row.saving}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Full-Set Prices Table */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">Full-Set Prices</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Treatment</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">
                    Poland Price
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">UK Price</th>
                  <th className="px-4 py-3 text-left font-semibold text-green-700">Saving</th>
                </tr>
              </thead>
              <tbody>
                {FULL_SET_PRICES.map((row, index) => (
                  <tr
                    key={row.treatment}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}
                  >
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-neutral-900">
                      {row.treatment}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-rose-700">
                      {row.polandPrice}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-600">
                      {row.ukPrice}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 font-semibold text-green-600">
                      {row.saving}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* What's Included */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">
            What's Typically Included in the Price
          </h3>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            Most Polish clinics offer treatment packages that include: initial consultation, digital
            smile design (DSD), tooth preparation, temporary veneers (worn while permanent ones are
            fabricated), permanent veneer fitting, bite adjustment, and follow-up appointment. Some
            clinics include airport transfers and can arrange accommodation. Always confirm exactly
            what's included before booking.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/search?procedure=veneers&country=poland">
              <Button size="lg" className="w-full sm:w-auto">
                Get Your Free Quote
              </Button>
            </Link>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION D: TYPES OF VENEERS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Types of Veneers Available in Poland
          </h2>
          <p className="mt-2 text-neutral-600">
            Understanding the differences between veneer materials helps you make the right choice
          </p>

          <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-6">
            {VENEER_TYPES.map((type) => (
              <div
                key={type.name}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
              >
                <h3 className="text-lg font-semibold text-neutral-900">{type.name}</h3>
                <p className="mt-2 text-neutral-700 leading-relaxed">{type.description}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <span className="rounded-full bg-rose-50 px-3 py-1 text-rose-700">
                    <strong>Lifespan:</strong> {type.lifespan}
                  </span>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                    <strong>Poland price:</strong> {type.polandPrice}
                  </span>
                  <span className="rounded-full bg-green-50 px-3 py-1 text-green-700">
                    <strong>Best for:</strong> {type.bestFor}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION E: TREATMENT TIMELINE
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            What to Expect: The Veneer Treatment Timeline
          </h2>
          <p className="mt-2 text-neutral-600">
            Veneers can be completed in a single trip of 5-7 days
          </p>

          {/* AEO Block — Procedure overview */}
          <div
            className="mt-6 rounded-xl bg-gradient-to-br from-rose-50 to-orange-50 p-4 sm:p-6 border border-rose-100"
            data-aeo="veneer-procedure-poland"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block procedure-summary">
              Porcelain and E-max veneer treatment in Poland typically takes 5 to 7 days in a single
              trip. Day one covers consultation, digital smile design, shade selection, and tooth
              preparation. The dental lab then fabricates your veneers over 3 to 4 days. On the
              final days, permanent veneers are fitted, adjusted, and bonded. Composite veneers can
              be completed in 2 to 3 days as they are applied directly without lab fabrication.
            </p>
          </div>

          {/* Before You Travel */}
          <div className="mt-10">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-neutral-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700">
                1
              </span>
              Before You Travel
            </h3>
            <ul className="mt-4 space-y-2 pl-10">
              {PROCEDURE_STEPS.beforeTravel.map((step, index) => (
                <li key={index} className="flex items-start gap-2 text-neutral-700">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Day 1 */}
          <div className="mt-8">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-neutral-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700">
                2
              </span>
              {PROCEDURE_STEPS.day1.title}
            </h3>
            <ul className="mt-4 space-y-2 pl-10">
              {PROCEDURE_STEPS.day1.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-2 text-neutral-700">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Lab Days */}
          <div className="mt-8">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-neutral-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700">
                3
              </span>
              {PROCEDURE_STEPS.labDays.title}
            </h3>
            <p className="mt-4 pl-10 text-neutral-700 leading-relaxed">
              {PROCEDURE_STEPS.labDays.description}
            </p>
          </div>

          {/* Final Days */}
          <div className="mt-8">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-neutral-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700">
                4
              </span>
              {PROCEDURE_STEPS.finalDays.title}
            </h3>
            <ul className="mt-4 space-y-2 pl-10">
              {PROCEDURE_STEPS.finalDays.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-2 text-neutral-700">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Composite Note */}
          <div className="mt-8 rounded-xl border border-rose-200 bg-rose-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600" />
              <div>
                <h4 className="font-semibold text-rose-900">Composite Veneers — Faster Timeline</h4>
                <p className="mt-2 text-sm text-rose-800 leading-relaxed">
                  For composite veneers, the process is simpler: preparation and application happen
                  in the same session, typically completed in 2-3 days total. No lab fabrication is
                  needed — the composite is sculpted directly onto the tooth and cured with UV light.
                  Ideal for patients with limited time.
                </p>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION F: FEATURED CLINICS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Top Veneer Clinics in Poland
          </h2>
          <p className="mt-2 text-neutral-600">
            Reputable clinics in Krakow and Warsaw serving UK patients
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-2">
            {FEATURED_CLINICS.map((clinic, index) => (
              <m.div
                key={clinic.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">{clinic.name}</h3>
                    <div className="mt-1 flex items-center gap-1 text-sm text-neutral-500">
                      <MapPin className="h-4 w-4" />
                      {clinic.location}
                    </div>
                  </div>
                  <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">
                    {clinic.speciality}
                  </span>
                </div>

                <ul className="mt-4 space-y-2">
                  {clinic.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <span className="text-sm font-medium text-rose-700">{clinic.priceRange}</span>
                </div>
              </m.div>
            ))}
          </div>

          {/* medit advantage callout */}
          <div className="mt-8 rounded-xl border border-rose-200 bg-rose-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600" />
              <div>
                <h3 className="font-semibold text-rose-900">medit advantage</h3>
                <p className="mt-2 text-sm text-rose-800 leading-relaxed">
                  All clinics on medit are pre-vetted for EU regulatory compliance, verified
                  pricing, genuine portfolios, and material transparency. We verify accreditations,
                  confirm pricing, and collect genuine patient reviews so you can choose with
                  confidence.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/search?procedure=veneers&country=poland">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Verified Clinics in Poland
              </Button>
            </Link>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION G: COUNTRY COMPARISON
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Poland vs Turkey vs Hungary — Comparison
          </h2>
          <p className="mt-2 text-neutral-600">
            How Poland compares to other popular veneer destinations
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Feature</th>
                  <th className="px-4 py-3 text-left font-semibold text-rose-700">Poland</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700">Turkey</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700">Hungary</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-500">UK</th>
                </tr>
              </thead>
              <tbody>
                {COUNTRY_COMPARISON.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}
                  >
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-neutral-900">
                      {row.feature}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-rose-700">
                      {row.poland}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-600">
                      {row.turkey}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-600">
                      {row.hungary}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-500">
                      {row.uk}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
            <h3 className="font-semibold text-neutral-900">The Bottom Line</h3>
            <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
              <strong>Choose Poland if:</strong> You prioritise EU regulatory protections, prefer a
              shorter flight, value high English proficiency, and want a destination that balances
              quality with cost. Poland offers slightly higher prices than Turkey but with the
              security of EU membership.
            </p>
            <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
              <strong>Consider Turkey if:</strong> Lowest cost is your priority and you're
              comfortable with a non-EU destination. Turkey offers the widest selection of clinics
              and the most competitive pricing.
            </p>
            <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
              <strong>Consider Hungary if:</strong> You want EU standards, excellent dentistry
              heritage, and prices similar to Poland. Budapest is a popular choice for UK dental
              tourists.
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION H: DESTINATIONS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Where to Get Veneers in Poland
          </h2>
          <p className="mt-2 text-neutral-600">
            The most popular cities for UK veneer patients
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-2">
            {DESTINATIONS.map((destination, index) => (
              <m.div
                key={destination.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-neutral-900">{destination.city}</h3>
                  <MapPin className="h-5 w-5 text-rose-500" />
                </div>
                <span className="mt-2 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  {destination.highlight}
                </span>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  {destination.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-rose-600">
                  <Plane className="h-4 w-4" />
                  <span>{destination.flights}</span>
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
            Practical Information for UK Patients
          </h2>
          <p className="mt-2 text-neutral-600">
            Everything you need to know about travelling to Poland for dental treatment
          </p>

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
            title="Frequently Asked Questions About Veneers in Poland"
            className="faq-section"
          />
        </m.section>

        {/* =====================================================================
            SECTION K: CTA / CONVERSION BLOCK
            ===================================================================== */}
        <m.section {...fadeInUp}>
          <div className="rounded-2xl bg-gradient-to-r from-rose-600 to-rose-800 p-6 text-white sm:p-8 lg:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Ready to Compare Veneer Clinics in Poland?
              </h2>
              <p className="mt-3 text-rose-100 sm:mt-4 sm:text-lg">
                Use medit to compare verified clinics, see real prices, and read honest patient
                reviews. Get free, personalised quotes for E-max, porcelain, or composite veneers
                from accredited clinics in Krakow and Warsaw — with no obligation.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
                <Link href="/search?procedure=veneers&country=poland">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Get Your Free Quote
                  </Button>
                </Link>
                <Link href="/search?procedure=veneers&country=poland">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full text-white hover:bg-white/10 sm:w-auto"
                  >
                    Browse Verified Clinics in Poland
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-rose-200">
                All clinics on medit are EU-regulated · Prices verified quarterly · Material
                certificates available · No booking fees
              </p>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            INTERNAL LINKS — HUB PAGE CONNECTION
            ===================================================================== */}
        <m.section {...fadeInUp} className="mt-12 border-t border-neutral-200 pt-8">
          <p className="text-sm text-neutral-600">
            <strong>Related pages:</strong>{' '}
            <Link href="/dental" className="text-rose-600 hover:underline">
              Dental work abroad
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/veneers/turkey" className="text-rose-600 hover:underline">
              Veneers in Turkey
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/veneers/hungary" className="text-rose-600 hover:underline">
              Veneers in Hungary
            </Link>
          </p>
        </m.section>
      </div>
    </>
  )
}
