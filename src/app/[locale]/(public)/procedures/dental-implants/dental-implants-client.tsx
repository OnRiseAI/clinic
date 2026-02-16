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
  ArrowRight,
  AlertTriangle,
  Globe,
  BadgeCheck,
  Calendar,
  Search,
} from 'lucide-react'
import { TR, HU, PL, ES, GB } from 'country-flag-icons/react/3x2'

// =============================================================================
// TYPES
// =============================================================================

interface DentalImplantsClientProps {
  faqs: Array<{ question: string; answer: string }>
}

// =============================================================================
// STATIC DATA — COST COMPARISON BY COUNTRY
// =============================================================================

const COUNTRY_PRICES = [
  {
    country: 'Turkey',
    flag: TR,
    single: '£300–£500',
    allOn4: '£2,500–£4,000',
    allOn6: '£3,500–£5,500',
    boneGraft: '£150–£300',
    flight: '3.5–4 hrs',
    highlight: true,
  },
  {
    country: 'Hungary',
    flag: HU,
    single: '£500–£800',
    allOn4: '£4,000–£6,000',
    allOn6: '£5,000–£7,500',
    boneGraft: '£200–£400',
    flight: '2.5 hrs',
  },
  {
    country: 'Poland',
    flag: PL,
    single: '£400–£700',
    allOn4: '£3,500–£5,500',
    allOn6: '£4,500–£7,000',
    boneGraft: '£180–£350',
    flight: '2.5 hrs',
  },
  {
    country: 'Spain',
    flag: ES,
    single: '£600–£900',
    allOn4: '£5,000–£7,000',
    allOn6: '£6,000–£9,000',
    boneGraft: '£250–£450',
    flight: '2–2.5 hrs',
  },
  {
    country: 'UK',
    flag: GB,
    single: '£2,000–£2,500',
    allOn4: '£8,000–£15,000',
    allOn6: '£12,000–£20,000',
    boneGraft: '£400–£800',
    flight: '—',
  },
]

const PACKAGE_PRICES = [
  {
    package: 'Single implant + crown + hotel + transfers',
    turkey: '£600–£900',
    hungary: '£900–£1,200',
    uk: '£2,000–£2,500',
  },
  {
    package: 'All-on-4 (one arch) + hotel + transfers',
    turkey: '£3,000–£4,500',
    hungary: '£4,500–£6,500',
    uk: '£8,000–£15,000',
  },
  {
    package: 'All-on-4 (both arches) + hotel + transfers',
    turkey: '£5,500–£8,000',
    hungary: '£8,000–£12,000',
    uk: '£16,000–£30,000',
  },
]

// =============================================================================
// STATIC DATA — IMPLANT TYPES
// =============================================================================

const IMPLANT_TYPES = [
  {
    name: 'Single Tooth Implant',
    price: 'From £300 abroad',
    ukPrice: '£2,000–£2,500 UK',
    timeline: '2 trips over 3–6 months',
    description:
      'Replaces one missing tooth with a titanium post, abutment, and crown. The most common implant procedure. First trip for implant placement, second trip for crown fitting after osseointegration.',
    bestFor: 'Single missing tooth, preserving adjacent teeth, long-term solution',
  },
  {
    name: 'Multiple Implants',
    price: 'From £250/implant abroad',
    ukPrice: '£1,800–£2,200/implant UK',
    timeline: '2 trips over 3–6 months',
    description:
      'Multiple individual implants to replace several missing teeth. Each implant supports its own crown. May include implant-supported bridges where fewer implants support multiple crowns.',
    bestFor: 'Multiple missing teeth in different areas, maximum stability',
  },
  {
    name: 'All-on-4',
    price: 'From £2,500/arch abroad',
    ukPrice: '£8,000–£15,000/arch UK',
    timeline: '1–2 trips, 7–10 days',
    description:
      'Full arch restoration using just 4 strategically placed implants. Supports a complete set of fixed teeth. Often completed in a single trip with immediate temporary teeth. The most cost-effective full mouth solution.',
    bestFor: 'Full arch replacement, patients with bone loss, cost-effective full mouth solution',
  },
  {
    name: 'All-on-6',
    price: 'From £3,500/arch abroad',
    ukPrice: '£12,000–£20,000/arch UK',
    timeline: '1–2 trips, 7–10 days',
    description:
      'Similar to All-on-4 but uses 6 implants per arch for additional support and stability. Recommended for patients with good bone density who want maximum security. Distributes biting force across more implants.',
    bestFor: 'Maximum stability, patients with good bone quality, heavy biters',
  },
  {
    name: 'Zygomatic Implants',
    price: 'From £4,000/arch abroad',
    ukPrice: '£15,000–£25,000/arch UK',
    timeline: '1–2 trips, specialist procedure',
    description:
      'Longer implants anchored in the cheekbone (zygoma) rather than the jawbone. Designed for patients with severe bone loss who cannot have traditional implants without extensive bone grafting.',
    bestFor: 'Severe upper jaw bone loss, avoiding bone grafts, complex cases',
  },
]

// =============================================================================
// STATIC DATA — IMPLANT BRANDS
// =============================================================================

const IMPLANT_BRANDS = [
  {
    brand: 'Straumann',
    origin: 'Swiss',
    tier: 'Premium',
    description: 'The gold standard in implant dentistry. 60+ years of research, highest success rates (98%+). Used by leading clinics worldwide.',
  },
  {
    brand: 'Nobel Biocare',
    origin: 'Swedish',
    tier: 'Premium',
    description: 'Pioneer of modern dental implants. Exceptional quality and extensive clinical documentation. Premium pricing reflects heritage.',
  },
  {
    brand: 'Osstem',
    origin: 'Korean',
    tier: 'Mid-range',
    description: 'World\'s 4th largest implant manufacturer. Excellent quality at competitive prices. Popular in Turkey and Asia.',
  },
  {
    brand: 'MegaGen',
    origin: 'Korean',
    tier: 'Mid-range',
    description: 'Fast-growing manufacturer with innovative designs. Good clinical track record. Often 30–50% less than Swiss/Swedish brands.',
  },
  {
    brand: 'Hiossen',
    origin: 'US/Korean',
    tier: 'Mid-range',
    description: 'US-based company with Korean manufacturing. FDA approved, good clinical outcomes. Popular in US and Europe.',
  },
]

// =============================================================================
// STATIC DATA — DESTINATIONS
// =============================================================================

const DESTINATIONS = [
  {
    country: 'Turkey',
    flag: TR,
    slug: '/procedures/dental-implants/turkey',
    why: 'Lowest prices, largest dental tourism industry, all-inclusive packages standard. Istanbul and Antalya have hundreds of clinics serving international patients.',
    bestFor: 'Maximum savings, all-inclusive packages, high volume clinics',
    priceRange: '£300–£500/implant',
    flight: '3.5–4 hours from London',
    active: true,
  },
  {
    country: 'Hungary',
    flag: HU,
    slug: '/procedures/dental-implants/hungary',
    why: 'EU-regulated, 30+ year dental tourism heritage, Budapest is the "dental capital of Europe". Quality-first positioning with competitive pricing.',
    bestFor: 'EU standards, established reputation, premium brands',
    priceRange: '£500–£800/implant',
    flight: '2.5 hours from London',
    active: true,
  },
  {
    country: 'Poland',
    flag: PL,
    slug: '/procedures/dental-implants/poland',
    why: 'EU member, competitive pricing, proximity to UK, strong dental training tradition. Krakow and Warsaw have growing dental tourism sectors.',
    bestFor: 'EU protections, short flights, German dental standards',
    priceRange: '£400–£700/implant',
    flight: '2.5 hours from London',
    active: true,
  },
  {
    country: 'Spain',
    flag: ES,
    slug: '/procedures/dental-implants/spain',
    why: 'EU member, familiar culture, easy follow-up trips, growing dental tourism sector. Barcelona and Alicante popular for UK patients.',
    bestFor: 'EU protections, holiday destination, easy return visits',
    priceRange: '£600–£900/implant',
    flight: '2–2.5 hours from London',
    active: true,
  },
]

// =============================================================================
// STATIC DATA — CLINIC CHECKLIST
// =============================================================================

const CLINIC_CHECKLIST = [
  {
    icon: Shield,
    title: 'Check accreditation',
    description:
      'Look for JCI (Joint Commission International), ISO 9001, TEMOS, or national health ministry certification. These standards ensure rigorous patient safety and infection control protocols.',
  },
  {
    icon: BadgeCheck,
    title: 'Verify implant brand',
    description:
      'Ask which implant brand will be used. Premium brands (Straumann, Nobel Biocare) cost more but have the best clinical evidence. Avoid clinics that cannot specify the brand or use unnamed implants.',
  },
  {
    icon: Search,
    title: 'Review surgeon credentials',
    description:
      'Research where the implantologist trained, their years of experience, and how many implants they place annually. Leading surgeons have placed thousands of implants with documented success rates.',
  },
  {
    icon: FileText,
    title: 'Get a CT scan assessment',
    description:
      'Reputable clinics require a CT scan (CBCT) before confirming treatment. This assesses bone quality and quantity. Be wary of clinics that quote without seeing your scans.',
  },
  {
    icon: Star,
    title: 'Read independent reviews',
    description:
      'Check verified patient reviews on Google, Trustpilot, and WhatClinic — not just clinic testimonials. Look for detailed reviews from UK patients, particularly about aftercare.',
  },
  {
    icon: Calendar,
    title: 'Understand the timeline',
    description:
      'Traditional implants require 2 trips over 3–6 months. Same-day and All-on-4 can be faster but not everyone is suitable. Be sceptical of clinics promising unrealistic timelines.',
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

export function DentalImplantsClient({ faqs }: DentalImplantsClientProps) {
  return (
    <>
      {/* =====================================================================
          SECTION A: HERO
          ===================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-700 via-sky-800 to-sky-900 text-white">
        <div className="absolute inset-0 bg-[url('/images/patterns/dental-pattern.svg')] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Dental Implants Abroad: Compare Prices, Destinations & Clinics
            </h1>
            <p className="mt-4 text-base text-sky-100 sm:mt-6 sm:text-lg lg:text-xl">
              Thousands of UK patients travel abroad for dental implants each year — saving 60–85% on
              single implants, All-on-4, and full mouth restorations. Compare verified clinics across
              Turkey, Hungary, Poland, and Spain.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link href="#destinations">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Compare Implant Destinations
                </Button>
              </Link>
              <Link href="#pricing">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full text-white hover:bg-white/10 sm:w-auto"
                >
                  View Prices by Country
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Strip */}
          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/20 pt-8 text-sm text-sky-200 sm:mt-12 sm:gap-6">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Verified clinics
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Real prices
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Premium implant brands
            </span>
            <span className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              EU & JCI-accredited options
            </span>
          </div>

          {/* Hero Stat Cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">From £300</p>
              <p className="text-sm text-sky-200">per implant</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">60–85%</p>
              <p className="text-sm text-sky-200">savings vs UK</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">4</p>
              <p className="text-sm text-sky-200">destinations compared</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* =====================================================================
            SECTION B: WHY GET DENTAL IMPLANTS ABROAD
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Why UK Patients Are Getting Dental Implants Abroad
          </h2>

          <div className="mt-6 space-y-4 text-neutral-700 sm:mt-8 sm:space-y-6">
            <p className="text-base leading-relaxed sm:text-lg">
              <strong>Dramatic cost savings on expensive treatment.</strong> Dental implants are one
              of the most expensive dental procedures — a single implant costs £2,000–£2,500 in the
              UK, and a full mouth restoration (All-on-4 or All-on-6) can exceed £15,000–£30,000.
              Abroad, the same procedures cost 60–85% less, even after including flights and
              accommodation.
            </p>

            <p className="leading-relaxed">
              <strong>Same implant brands and technology.</strong> Leading international clinics use
              the same premium implant brands as UK practices — Straumann, Nobel Biocare, Osstem,
              MegaGen. They use the same 3D CBCT scanners, surgical guides, and CAD/CAM technology.
              The difference is operating costs, not quality.
            </p>

            <p className="leading-relaxed">
              <strong>Experienced high-volume surgeons.</strong> Dental tourism hubs like Istanbul,
              Budapest, and Krakow see thousands of international patients annually. Many surgeons
              have placed 5,000–10,000+ implants — experience levels difficult to match at individual
              UK practices. Volume creates expertise.
            </p>

            <p className="leading-relaxed">
              <strong>All-inclusive packages simplify the process.</strong> Most international
              clinics offer comprehensive packages including hotel accommodation (typically 4–7
              nights, 4-star), airport transfers, all dental work, CT scans, and aftercare support.
              One upfront price covers everything — no hidden costs or surprise bills.
            </p>
          </div>

          {/* Honesty note */}
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
              <div>
                <h3 className="font-semibold text-amber-900">Implants require careful planning</h3>
                <p className="mt-2 text-sm text-amber-800 leading-relaxed">
                  Dental implants are surgical procedures with real risks. Success depends heavily on
                  surgeon skill, implant brand, and proper treatment planning. Always verify clinic
                  accreditation, confirm the implant brand, review surgeon credentials, and get a CT
                  scan assessment before committing. Not every clinic abroad meets the required
                  standards — medit only lists verified, accredited options.
                </p>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION C: IMPLANT COSTS BY COUNTRY
            ===================================================================== */}
        <m.section {...fadeInUp} id="pricing" className="mb-16 scroll-mt-8 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            How Much Do Dental Implants Cost Abroad?
          </h2>
          <p className="mt-2 text-neutral-600">
            Compare dental implant prices by country and treatment type. All prices in GBP (£).
          </p>

          {/* AEO Block */}
          <div
            className="mt-6 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 p-4 sm:p-6 border border-sky-100"
            data-aeo="dental-implants-abroad-cost"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block cost-summary">
              A single dental implant costs £300 to £800 abroad compared to £2,000 to £2,500 in the
              UK — a saving of 60 to 85 percent. All-on-4 full arch implants cost £2,500 to £5,500
              abroad versus £8,000 to £15,000 in the UK. Turkey offers the lowest prices, while
              Hungary and Poland provide EU-regulated alternatives at competitive rates. Prices
              typically include the implant, abutment, crown, and all clinical appointments.
            </p>
          </div>

          {/* Main Cost Comparison Table */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">Price Comparison by Country</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Country</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Single Implant</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">All-on-4 (arch)</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">All-on-6 (arch)</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Bone Graft</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Flight</th>
                </tr>
              </thead>
              <tbody>
                {COUNTRY_PRICES.map((row, index) => (
                  <tr
                    key={row.country}
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'} ${row.highlight ? 'bg-green-50' : ''}`}
                  >
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-neutral-900">
                      <div className="flex items-center gap-2">
                        <row.flag className="w-5 h-5 rounded-sm shadow-sm" />
                        {row.country}
                      </div>
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-700">
                      {row.single}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-sky-700">
                      {row.allOn4}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-700">
                      {row.allOn6}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-600">
                      {row.boneGraft}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-500">
                      {row.flight}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Package Pricing Table */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">
            All-Inclusive Package Pricing
          </h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Package</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">
                    <div className="flex items-center gap-2">
                      <TR className="w-5 h-5 rounded-sm shadow-sm" />
                      Turkey
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">
                    <div className="flex items-center gap-2">
                      <HU className="w-5 h-5 rounded-sm shadow-sm" />
                      Hungary
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">
                    <div className="flex items-center gap-2">
                      <GB className="w-5 h-5 rounded-sm shadow-sm" />
                      UK
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {PACKAGE_PRICES.map((row, index) => (
                  <tr key={row.package} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-900">
                      {row.package}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-green-600">
                      {row.turkey}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-sky-600">
                      {row.hungary}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-600">
                      {row.uk}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Notes */}
          <div className="mt-8 space-y-4 text-neutral-700">
            <p className="leading-relaxed">
              <strong>What affects pricing?</strong> The implant brand is the biggest factor —
              premium brands (Straumann, Nobel Biocare) cost more than mid-range options (Osstem,
              MegaGen). Bone grafting adds £150–£400 if needed. Complex cases requiring sinus lifts
              or zygomatic implants are significantly more expensive. Always get a full treatment
              plan based on your CT scan before comparing prices.
            </p>
            <p className="leading-relaxed">
              For a detailed breakdown of costs, including hidden fees to watch for, see our{' '}
              <Link
                href="/blog/dental-implants-abroad-cost-guide"
                className="text-sky-600 hover:underline"
              >
                dental implants abroad cost guide
              </Link>
              .
            </p>
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-sm text-neutral-500 italic">
            Prices based on published clinic rates and may vary based on individual treatment needs.
            Request a personalised quote for accurate pricing.
          </p>
        </m.section>

        {/* =====================================================================
            SECTION D: TYPES OF IMPLANTS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Types of Dental Implants: Which Is Right for You?
          </h2>
          <p className="mt-2 text-neutral-600">
            Understanding your options helps you make an informed decision
          </p>

          <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-6">
            {IMPLANT_TYPES.map((implant) => (
              <div
                key={implant.name}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold text-neutral-900">{implant.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
                      {implant.price}
                    </span>
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600">
                      {implant.ukPrice}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-neutral-700 leading-relaxed">{implant.description}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {implant.timeline}
                  </span>
                </div>
                <p className="mt-3 text-sm text-neutral-500">
                  <strong>Best for:</strong> {implant.bestFor}
                </p>
              </div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION E: IMPLANT BRANDS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Implant Brands: What to Look For
          </h2>
          <p className="mt-2 text-neutral-600">
            The implant brand significantly affects longevity and success rates
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {IMPLANT_BRANDS.map((brand, index) => (
              <m.div
                key={brand.brand}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-5"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-neutral-900">{brand.brand}</h3>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${brand.tier === 'Premium'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-sky-50 text-sky-700'
                    }`}>
                    {brand.tier}
                  </span>
                </div>
                <p className="mt-1 text-xs text-neutral-500">{brand.origin}</p>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{brand.description}</p>
              </m.div>
            ))}
          </div>

          {/* Brand Warning */}
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <h3 className="font-semibold text-amber-900">
              Important: Always confirm the implant brand
            </h3>
            <p className="mt-2 text-sm text-amber-800 leading-relaxed">
              Some clinics use unbranded or lesser-known implants to reduce costs. While not
              necessarily bad, these lack the extensive clinical documentation of established brands.
              Always ask which specific implant brand and model will be used, and research its track
              record. Reputable clinics are transparent about materials.
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION F: BEST COUNTRIES FOR DENTAL IMPLANTS
            ===================================================================== */}
        <m.section {...fadeInUp} id="destinations" className="mb-16 scroll-mt-8 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Best Countries for Dental Implants from the UK
          </h2>
          <p className="mt-2 text-neutral-600">
            Compare destinations based on your priorities: savings, quality standards, or proximity
          </p>

          <div className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-2">
            {DESTINATIONS.map((dest, index) => (
              <m.div
                key={dest.country}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-6 rounded overflow-hidden shadow-sm relative">
                      <dest.flag className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">{dest.country}</h3>
                  </div>
                  <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    View clinics
                  </span>
                </div>

                <p className="mt-3 text-neutral-700">{dest.why}</p>

                <div className="mt-4 space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-neutral-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <strong>Best for:</strong> {dest.bestFor}
                  </p>
                  <p className="flex items-center gap-2 text-neutral-600">
                    <MapPin className="h-4 w-4 text-sky-500" />
                    <strong>Price range:</strong> {dest.priceRange}
                  </p>
                  <p className="flex items-center gap-2 text-neutral-600">
                    <Plane className="h-4 w-4 text-sky-500" />
                    {dest.flight}
                  </p>
                </div>

                <Link
                  href={dest.slug}
                  className="mt-4 inline-flex items-center text-sm font-medium text-sky-600 hover:underline"
                >
                  Compare Clinics in {dest.country}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </m.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/procedures/dental-implants/turkey">
              <Button size="lg" className="w-full sm:w-auto">
                View Turkey Clinics
              </Button>
            </Link>
            <Link href="/procedures/dental-implants/hungary">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Hungary Clinics
              </Button>
            </Link>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION G: HOW TO CHOOSE A CLINIC
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            How to Choose a Safe Dental Implant Clinic Abroad
          </h2>
          <p className="mt-2 max-w-3xl text-neutral-600">
            Dental implants are a surgical procedure. Your choice of clinic and surgeon is critical to
            a successful outcome.
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {CLINIC_CHECKLIST.map((item, index) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.description}</p>
              </m.div>
            ))}
          </div>

          {/* Aftercare note */}
          <div className="mt-8 rounded-xl border border-sky-200 bg-sky-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600" />
              <div>
                <h3 className="font-semibold text-sky-900">Ask about aftercare and warranty</h3>
                <p className="mt-2 text-sm text-sky-800 leading-relaxed">
                  What happens if something goes wrong when you are back in the UK? Reputable clinics
                  offer 5–10 year warranties on implants, remote follow-up via X-rays and video
                  calls, and some have UK partner dentists for in-person checks. Clarify the
                  aftercare arrangements and warranty terms before booking. Also consider getting{' '}
                  <Link href="/procedures/veneers" className="text-sky-600 hover:underline">
                    veneers
                  </Link>{' '}
                  at the same time if you need cosmetic work.
                </p>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION H: FAQ
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <FAQSection
            faqs={faqs}
            title="Frequently Asked Questions About Dental Implants Abroad"
            className="faq-section"
          />
        </m.section>

        {/* =====================================================================
            SECTION I: CTA / CONVERSION BLOCK
            ===================================================================== */}
        <m.section {...fadeInUp}>
          <div className="rounded-2xl bg-gradient-to-r from-sky-600 to-sky-800 p-6 text-white sm:p-8 lg:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">Get Your Free Implant Quote</h2>
              <p className="mt-3 text-sky-100 sm:mt-4 sm:text-lg">
                Whether you need a single implant or full mouth restoration, we will match you with
                verified clinics that meet your budget and requirements. Compare real prices from
                Turkey, Hungary, Poland, and Spain — with no obligation.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
                <Link href="/search?procedure=dental-implants">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Browse Implant Clinics
                  </Button>
                </Link>
                <Link href="/contact?procedure=dental-implants">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full text-white hover:bg-white/10 sm:w-auto"
                  >
                    Get Free Clinic Recommendations
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-sky-200">
                Verified clinics · Premium implant brands · No booking fees
              </p>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            INTERNAL LINKS — CLUSTER CONNECTIONS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mt-12 border-t border-neutral-200 pt-8">
          <p className="text-sm text-neutral-600">
            <strong>Related pages:</strong>{' '}
            <Link href="/dental" className="text-sky-600 hover:underline">
              Dental work abroad
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/dental-implants/turkey" className="text-sky-600 hover:underline">
              Dental implants in Turkey
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/dental-implants/hungary" className="text-sky-600 hover:underline">
              Dental implants in Hungary
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/dental-implants/poland" className="text-sky-600 hover:underline">
              Dental implants in Poland
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/veneers" className="text-sky-600 hover:underline">
              Veneers abroad
            </Link>{' '}
            ·{' '}
            <Link
              href="/blog/dental-implants-abroad-cost-guide"
              className="text-sky-600 hover:underline"
            >
              Cost guide
            </Link>
          </p>
        </m.section>
      </div>
    </>
  )
}
