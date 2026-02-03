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
} from 'lucide-react'

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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white">
        <div className="absolute inset-0 bg-[url('/images/patterns/dental-pattern.svg')] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Veneers in Hungary: Compare Prices, Clinics & Packages
            </h1>
            <p className="mt-4 text-base text-primary-100 sm:mt-6 sm:text-lg lg:text-xl">
              Hungary is Europe's leading dental tourism destination. Compare verified Budapest
              clinics, real prices from £105 per veneer, and all-inclusive packages — all in one
              place.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link href="/search?procedure=veneers&country=hungary">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Browse Veneer Clinics in Hungary
                </Button>
              </Link>
              <Link href="#pricing">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full text-white hover:bg-white/10 sm:w-auto"
                >
                  View Prices
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Strip */}
          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/20 pt-8 text-sm text-primary-200 sm:mt-12 sm:gap-6">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Verified clinics
            </span>
            <span className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              EU-regulated
            </span>
            <span className="flex items-center gap-2">
              <Plane className="h-4 w-4" />
              2.5hr flight from London
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Free consultation matching
            </span>
          </div>

          {/* Hero Stat Cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">From £105</p>
              <p className="text-sm text-primary-200">per tooth</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">40–65%</p>
              <p className="text-sm text-primary-200">savings vs UK</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">2.5hr</p>
              <p className="text-sm text-primary-200">flight from London</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* =====================================================================
            SECTION B: WHY HUNGARY FOR VENEERS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Why UK Patients Choose Hungary for Dental Veneers
          </h2>

          <div className="mt-6 space-y-4 text-neutral-700 sm:mt-8 sm:space-y-6">
            <p className="text-base leading-relaxed sm:text-lg">
              <strong>Hungary is the "dental capital of Europe."</strong> Budapest alone hosts over
              500 dental facilities treating international patients. Semmelweis University — one of
              Europe's oldest and most respected medical schools (founded 1769) — produces world-class
              dental graduates. Hungary has more dentists per capita than almost any other EU country,
              and the concentration of specialist expertise in Budapest is unmatched.
            </p>

            <p className="leading-relaxed">
              <strong>EU membership means real patient protections.</strong> Hungarian dental clinics
              must comply with EU medical device regulations, hygiene standards, and patient rights
              directives. This is a tangible trust signal versus non-EU destinations. Clinics are
              regularly inspected, and ISO certification is common among Budapest's top practices.
            </p>

            <p className="leading-relaxed">
              <strong>Proximity makes treatment practical.</strong> Budapest is just 2.5 hours from
              London by direct flight. Budget airlines (Ryanair, Wizz Air) operate multiple daily
              routes with return fares often under £80. No visa is required for UK citizens (stays
              under 90 days). If you need a follow-up visit, it's easy to arrange — unlike more
              distant destinations.
            </p>

            <p className="leading-relaxed">
              <strong>30+ years of dental tourism experience.</strong> Hungary has been treating
              international{' '}
              <Link href="/dental" className="text-primary-600 hover:underline">
                dental
              </Link>{' '}
              patients for over three decades — long before "medical tourism" became a buzzword.
              Budapest clinics have treated millions of patients from Germany, Austria, the UK, and
              Scandinavia. English-speaking staff and dedicated international patient coordinators are
              standard at reputable clinics.
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION C: PRICING
            ===================================================================== */}
        <m.section {...fadeInUp} id="pricing" className="mb-16 scroll-mt-8 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            How Much Do Veneers Cost in Hungary?
          </h2>
          <p className="mt-2 text-neutral-600">
            Prices updated February 2026. All prices in GBP (£).
          </p>

          {/* Per-Tooth Pricing Table */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">Price Per Veneer</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Veneer Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Hungary</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">UK</th>
                  <th className="px-4 py-3 text-left font-semibold text-green-700">Saving</th>
                </tr>
              </thead>
              <tbody>
                {VENEER_PRICES.map((row, index) => (
                  <tr key={row.type} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-900">
                      {row.type}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-primary-700">
                      {row.hungaryPrice}
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

          {/* Full Set Package Pricing */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">Full Set Package Pricing</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Package</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Hungary</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">UK</th>
                  <th className="px-4 py-3 text-left font-semibold text-green-700">You Save</th>
                </tr>
              </thead>
              <tbody>
                {PACKAGE_PRICES.map((row, index) => (
                  <tr key={row.package} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-900">
                      {row.package}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-primary-700">
                      {row.hungaryPrice}
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

          {/* Pricing Notes */}
          <div className="mt-8 space-y-4 text-neutral-700">
            <p className="leading-relaxed">
              Several factors affect veneer pricing: <strong>material choice</strong> (composite is
              cheapest, E-max is premium), <strong>number of teeth</strong> being treated,{' '}
              <strong>clinic reputation</strong> and location, and whether you opt for an{' '}
              <strong>all-inclusive package</strong> with hotel and transfers included.
            </p>
            <p className="leading-relaxed">
              All-inclusive packages are common in Budapest and often represent better value than
              booking treatment and accommodation separately. For a detailed breakdown of costs across
              countries, see our{' '}
              <Link
                href="/blog/dental-implants-abroad-cost-guide"
                className="text-primary-600 hover:underline"
              >
                dental treatment abroad cost guide
              </Link>
              .
            </p>
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-sm text-neutral-500 italic">
            Prices are based on published clinic rates and may vary. Request a personalised quote for
            accurate pricing.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/search?procedure=veneers&country=hungary">
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
            Types of Veneers Available at Budapest Clinics
          </h2>
          <p className="mt-2 text-neutral-600">
            Budapest clinics offer the full range of veneer materials to suit every budget and goal
          </p>

          <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-6">
            {VENEER_TYPES.map((veneer) => (
              <div
                key={veneer.name}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold text-neutral-900">{veneer.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
                      {veneer.price}
                    </span>
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600">
                      {veneer.lifespan} lifespan
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-neutral-700 leading-relaxed">{veneer.description}</p>
                <p className="mt-3 text-sm text-neutral-500">
                  <strong>Best for:</strong> {veneer.bestFor}
                </p>
              </div>
            ))}
          </div>

          {/* Veneers vs Crowns Note */}
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <h3 className="font-semibold text-amber-900">Veneers vs Crowns — Know the Difference</h3>
            <p className="mt-2 text-sm text-amber-800 leading-relaxed">
              Many "Turkey teeth" cases involve crowns marketed as veneers. Veneers are thin shells
              bonded to the front of teeth (0.2–0.7mm preparation). Crowns require significant tooth
              reduction and cover the entire tooth. Reputable Budapest clinics are transparent about
              which treatment they recommend and why. If a clinic suggests extensive filing for
              "veneers," ask whether crowns are actually being proposed.
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION E: TREATMENT TIMELINE
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            What to Expect: Your Veneers Treatment in Budapest
          </h2>
          <p className="mt-2 text-neutral-600">
            A typical porcelain or E-max veneer treatment takes 4–5 days
          </p>

          <div className="mt-6 sm:mt-8">
            {TIMELINE_STEPS.map((step, index) => (
              <div key={step.day} className="relative pb-8 last:pb-0">
                {/* Connector line */}
                {index < TIMELINE_STEPS.length - 1 && (
                  <div className="absolute left-4 top-10 h-full w-0.5 bg-primary-100" />
                )}
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                      <span className="text-sm font-medium text-primary-600">{step.day}</span>
                      <h3 className="font-semibold text-neutral-900">{step.title}</h3>
                    </div>
                    <p className="mt-2 text-neutral-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Same-day option */}
          <div className="mt-8 rounded-xl border border-primary-200 bg-primary-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
              <div>
                <h3 className="font-semibold text-primary-900">Same-Day Option Available</h3>
                <p className="mt-2 text-sm text-primary-800 leading-relaxed">
                  Composite and nanoceramic veneers can often be completed in a single day using
                  same-day digital design and fabrication. This is ideal for patients who cannot take
                  5 days off work. Ask clinics about CEREC or similar same-day technology when
                  requesting your quote.
                </p>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION F: TOP CLINICS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Top-Rated Veneer Clinics in Budapest
          </h2>
          <p className="mt-2 text-neutral-600">
            Browse verified clinics with real patient reviews and transparent pricing
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
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
                    <h3 className="font-semibold text-neutral-900">{clinic.name}</h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-neutral-500">
                      <MapPin className="h-3 w-3" />
                      {clinic.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1">
                    <Star className="h-3 w-3 fill-green-500 text-green-500" />
                    <span className="text-sm font-medium text-green-700">{clinic.rating}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-primary-600">{clinic.highlight}</p>
                <p className="mt-2 text-xs text-neutral-500">{clinic.specialties}</p>
                <p className="mt-2 text-xs text-neutral-400">{clinic.reviews} reviews</p>
                {/* TODO: Link to /clinics/[slug] when clinic data is connected */}
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-600">
                  View Clinic Profile
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </m.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/search?procedure=veneers&country=hungary">
              <Button size="lg" className="w-full sm:w-auto">
                Browse All Veneer Clinics
              </Button>
            </Link>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION G: HUNGARY VS TURKEY COMPARISON
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Veneers in Hungary vs Turkey: Which Is Right for You?
          </h2>
          <p className="mt-2 text-neutral-600">
            Comparing Europe's two most popular dental tourism destinations
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Factor</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">🇭🇺 Hungary</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700">🇹🇷 Turkey</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, index) => (
                  <tr key={row.factor} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-neutral-900">
                      {row.factor}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-700">
                      {row.hungary}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-600">
                      {row.turkey}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
            <h3 className="font-semibold text-neutral-900">The bottom line</h3>
            <p className="mt-2 text-neutral-700 leading-relaxed">
              Choose Hungary if you prioritise EU consumer protections, shorter travel, and dental
              heritage. Choose Turkey if you're looking for maximum savings or want to combine
              treatment with a beach or city holiday. Both destinations have reputable clinics
              delivering excellent results — the right choice depends on your priorities.
            </p>
            <Link
              href="/procedures/veneers/turkey"
              className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:underline"
            >
              Compare veneer prices in Turkey
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION H: PRACTICAL INFORMATION
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Planning Your Veneer Trip to Budapest
          </h2>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICAL_INFO.map((item, index) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.content}</p>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION I: FAQ
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <FAQSection
            faqs={faqs}
            title="Frequently Asked Questions About Veneers in Hungary"
            className="faq-section"
          />
        </m.section>

        {/* =====================================================================
            SECTION J: CTA / CONVERSION BLOCK
            ===================================================================== */}
        <m.section {...fadeInUp}>
          <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white sm:p-8 lg:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Get Your Free Veneer Quote from Budapest Clinics
              </h2>
              <p className="mt-3 text-primary-100 sm:mt-4 sm:text-lg">
                Compare verified clinics, see transparent prices, and get personalised
                recommendations. Free, no-obligation quotes from EU-regulated Budapest clinics.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
                <Link href="/search?procedure=veneers&country=hungary">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Browse Veneer Clinics in Hungary
                  </Button>
                </Link>
                <Link href="/contact?procedure=veneers&country=hungary">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full text-white hover:bg-white/10 sm:w-auto"
                  >
                    Get Free Clinic Recommendations
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-primary-200">
                Verified clinics · EU-regulated · No booking fees
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
            <Link href="/dental" className="text-primary-600 hover:underline">
              Dental work abroad
            </Link>{' '}
            ·{' '}
            {/* TODO: link to /procedures/veneers when built */}
            <span className="text-neutral-500">Veneers abroad</span> ·{' '}
            <Link href="/procedures/veneers/turkey" className="text-primary-600 hover:underline">
              Veneers in Turkey
            </Link>{' '}
            ·{' '}
            <Link
              href="/procedures/dental-implants/hungary"
              className="text-primary-600 hover:underline"
            >
              Dental implants in Hungary
            </Link>{' '}
            ·{' '}
            {/* TODO: link to /destinations/hungary when built */}
            <span className="text-neutral-500">Dental tourism in Hungary</span>
          </p>
        </m.section>
      </div>
    </>
  )
}
