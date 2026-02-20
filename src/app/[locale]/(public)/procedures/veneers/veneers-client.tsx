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
  Search,
} from 'lucide-react'
import { TR, HU, ES, PL, GB } from 'country-flag-icons/react/3x2'

// =============================================================================
// TYPES
// =============================================================================

interface VeneersClientProps {
  faqs: Array<{ question: string; answer: string }>
}

// =============================================================================
// STATIC DATA — COST COMPARISON BY COUNTRY
// =============================================================================

const COUNTRY_PRICES = [
  {
    country: 'Turkey',
    flag: TR,
    composite: '£100–£150',
    porcelain: '£130–£350',
    emax: '£180–£400',
    fullSet: '£1,040–£2,800',
    flight: '3.5–4 hrs',
    highlight: true,
  },
  {
    country: 'Hungary',
    flag: HU,
    composite: '£105–£180',
    porcelain: '£200–£350',
    emax: '£250–£450',
    fullSet: '£1,600–£2,800',
    flight: '2.5 hrs',
  },
  {
    country: 'Spain',
    flag: ES,
    composite: '£150–£250',
    porcelain: '£250–£450',
    emax: '£300–£500',
    fullSet: '£2,000–£3,600',
    flight: '2–2.5 hrs',
  },
  {
    country: 'Poland',
    flag: PL,
    composite: '£100–£180',
    porcelain: '£180–£320',
    emax: '£220–£400',
    fullSet: '£1,440–£2,560',
    flight: '2.5 hrs',
  },
  {
    country: 'UK',
    flag: GB,
    composite: '£150–£400',
    porcelain: '£500–£1,000',
    emax: '£600–£1,200',
    fullSet: '£4,000–£9,600',
    flight: '—',
  },
]

const PACKAGE_PRICES = [
  {
    package: '8 Porcelain Veneers + hotel + transfers',
    turkey: '£1,500–£3,000',
    hungary: '£2,000–£3,500',
    uk: '£4,000–£8,000',
  },
  {
    package: '16 Porcelain Veneers + hotel + transfers',
    turkey: '£3,000–£5,500',
    hungary: '£3,800–£6,500',
    uk: '£8,000–£16,000',
  },
  {
    package: '20 E-max Veneers (full smile)',
    turkey: '£3,600–£8,000',
    hungary: '£5,000–£9,000',
    uk: '£12,000–£24,000',
  },
]

// =============================================================================
// STATIC DATA — VENEER TYPES
// =============================================================================

const VENEER_TYPES = [
  {
    name: 'Composite Veneers',
    price: 'From £100/tooth',
    lifespan: '5–7 years',
    description:
      'Applied directly to teeth in a single visit using composite resin. The most affordable option, ideal for minor cosmetic improvements. Prone to staining over time and less durable than porcelain alternatives.',
    bestFor: 'Minor cosmetic fixes, budget-conscious patients, single-visit treatment',
  },
  {
    name: 'Porcelain Veneers',
    price: 'From £130/tooth',
    lifespan: '10–15 years',
    description:
      'Lab-crafted ceramic shells requiring 2 visits over 3–5 days. Superior aesthetics and excellent stain resistance. The most popular choice for patients travelling abroad for smile transformations.',
    bestFor: 'Full smile makeovers, long-lasting results, stain resistance',
  },
  {
    name: 'E-max Veneers',
    price: 'From £180/tooth',
    lifespan: '15–20 years',
    description:
      'Premium lithium disilicate ceramic (IPS e.max by Ivoclar Vivadent). The best translucency and most natural appearance available. 95% success rate over 10 years in clinical studies. The gold standard for aesthetic dentistry.',
    bestFor: 'Maximum aesthetics, premium longevity, natural light transmission',
  },
  {
    name: 'Zirconia Veneers',
    price: 'From £200/tooth',
    lifespan: '15–20 years',
    description:
      'The strongest veneer option, withstanding up to 900 MPa of pressure. Ideal for patients with bruxism (teeth grinding). Slightly less translucent than E-max but extremely durable.',
    bestFor: 'Teeth grinders, maximum durability, posterior teeth',
  },
  {
    name: 'Lumineers / No-Prep Veneers',
    price: 'From £300/tooth',
    lifespan: '10–20 years',
    description:
      'Ultra-thin veneers (0.2–0.5mm) requiring minimal or no tooth filing, preserving natural enamel. Reversible in some cases. Best for patients with minor cosmetic issues who want to preserve tooth structure.',
    bestFor: 'Minimal invasiveness, enamel preservation, minor corrections',
  },
]

// =============================================================================
// STATIC DATA — DESTINATIONS
// =============================================================================

const DESTINATIONS = [
  {
    country: 'Turkey',
    flag: TR,
    slug: '/procedures/veneers/turkey',
    why: 'Lowest prices, largest dental tourism industry, all-inclusive packages standard.',
    bestFor: 'Maximum savings, full smile makeovers, hollywood smile packages',
    priceRange: '£100–£400/tooth',
    flight: '3.5–4 hours from London',
    active: true,
  },
  {
    country: 'Hungary',
    flag: HU,
    slug: '/procedures/veneers/hungary',
    why: 'EU-regulated, 30+ year dental tourism heritage, quality-first positioning.',
    bestFor: 'Patients who prioritise EU standards, shorter travel, dental heritage',
    priceRange: '£105–£450/tooth',
    flight: '2.5 hours from London',
    active: true,
  },
  {
    country: 'Spain',
    flag: ES,
    slug: '/procedures/veneers/spain',
    why: 'EU member, familiar culture, easy follow-up trips, growing dental tourism sector.',
    bestFor: 'Patients wanting EU protections with a holiday destination feel',
    priceRange: '£150–£500/tooth',
    flight: '2–2.5 hours from London',
    active: false, // Future page
  },
  {
    country: 'Poland',
    flag: PL,
    slug: '/procedures/veneers/poland',
    why: 'EU member, competitive pricing, proximity, strong dental training tradition.',
    bestFor: 'Budget-conscious patients wanting EU standards and short flights',
    priceRange: '£100–£400/tooth',
    flight: '2.5 hours from London',
    active: false, // Future page
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
      'Look for JCI (Joint Commission International), ISO 9001, TEMOS, or national health ministry certification. These standards ensure rigorous patient safety protocols.',
  },
  {
    icon: BadgeCheck,
    title: 'Verify dentist credentials',
    description:
      "Research where the dentist trained, their years of cosmetic experience, and ask to see their before/after portfolio. Leading clinics' dentists have often placed thousands of veneers.",
  },
  {
    icon: Search,
    title: 'Ask about materials',
    description:
      'Reputable clinics name the veneer brand (IPS e.max, Vita, Ivoclar Vivadent). Be cautious of clinics that cannot specify materials or use unnamed "house brands."',
  },
  {
    icon: FileText,
    title: 'Get a written treatment plan',
    description:
      'Request a full written treatment plan with itemised costs before booking. This should include the number of veneers, material type, and all included services.',
  },
  {
    icon: Star,
    title: 'Read independent reviews',
    description:
      'Check verified patient reviews on Google, Trustpilot, and WhatClinic — not just testimonials on the clinic website. Look for detailed reviews from UK patients.',
  },
  {
    icon: AlertTriangle,
    title: 'Know the red flags',
    description:
      'Avoid clinics that pressure you to book immediately, have unclear pricing, no written treatment plan, or prices that seem "too good to be true."',
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

export function VeneersClient({ faqs }: VeneersClientProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* =====================================================================
            SECTION B: WHY GET VENEERS ABROAD
            ===================================================================== */}
      <m.section {...fadeInUp} className="mb-16 sm:mb-20">
        <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
          Why UK Patients Are Getting Veneers Abroad
        </h2>

        <div className="mt-6 space-y-4 text-neutral-700 sm:mt-8 sm:space-y-6">
          <p className="text-base leading-relaxed sm:text-lg">
            <strong>Significant cost savings without compromising quality.</strong> In the UK,
            dental veneers cost £400–£1,200 per tooth depending on the material. Abroad, the same
            materials and techniques — from the same manufacturers — cost £105–£565 per tooth. Even
            after factoring in flights and hotel accommodation, most patients save 40–70% on the
            total cost of treatment.
          </p>

          <p className="leading-relaxed">
            <strong>Quality is comparable at accredited clinics.</strong> Top international dental
            clinics use the same materials (IPS e.max, zirconia, Vita shades) and equipment (CEREC,
            3D CBCT scanners) as UK practices. Many dentists have trained in Europe or the UK, and
            leading clinics hold JCI or ISO 9001 accreditation. The British Dental Association
            recognises that{' '}
            <Link href="/dental" className="text-primary-600 hover:underline">
              dental work abroad
            </Link>{' '}
            can be a valid option when patients do proper research.
          </p>

          <p className="leading-relaxed">
            <strong>All-inclusive packages remove the hassle.</strong> Most international dental
            clinics offer comprehensive packages including hotel accommodation (typically 3–5
            nights, 4-star), airport transfers, all dental work, and aftercare support. One upfront
            price with no hidden costs — a simpler experience than managing multiple UK appointments
            and bills.
          </p>

          <p className="leading-relaxed">
            <strong>Combine treatment with travel.</strong> A veneer treatment abroad typically
            takes 4–5 days. Between appointments, you can explore Istanbul's bazaars, Budapest's
            thermal baths, or Barcelona's architecture. Many patients view the experience as a
            dental holiday — better than multiple trips to a UK waiting room.
          </p>
        </div>

        {/* Honesty note */}
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
            <div>
              <h3 className="font-semibold text-amber-900">Due diligence is essential</h3>
              <p className="mt-2 text-sm text-amber-800 leading-relaxed">
                Getting veneers abroad is not risk-free. Outcomes depend heavily on the clinic you
                choose. Always verify accreditation, check independent reviews, confirm dentist
                credentials, and get a written treatment plan before committing. Not every clinic
                abroad is reputable — MeetYourClinic only lists verified, accredited options.
              </p>
            </div>
          </div>
        </div>
      </m.section>

      {/* =====================================================================
            SECTION C: VENEER COSTS BY COUNTRY
            ===================================================================== */}
      <m.section {...fadeInUp} id="pricing" className="mb-16 scroll-mt-8 sm:mb-20">
        <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
          How Much Do Veneers Cost Abroad?
        </h2>
        <p className="mt-2 text-neutral-600">
          Compare veneer prices by country and material type. All prices in GBP (£).
        </p>

        {/* Main Cost Comparison Table */}
        <h3 className="mt-10 text-xl font-semibold text-neutral-900">Price Per Veneer by Country</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="px-4 py-3 text-left font-semibold text-neutral-900">Country</th>
                <th className="px-4 py-3 text-left font-semibold text-neutral-900">Composite</th>
                <th className="px-4 py-3 text-left font-semibold text-neutral-900">Porcelain</th>
                <th className="px-4 py-3 text-left font-semibold text-neutral-900">E-max</th>
                <th className="px-4 py-3 text-left font-semibold text-neutral-900">Full Set (8)</th>
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
                    {row.composite}
                  </td>
                  <td className="border-b border-neutral-100 px-4 py-3 text-neutral-700">
                    {row.porcelain}
                  </td>
                  <td className="border-b border-neutral-100 px-4 py-3 text-neutral-700">
                    {row.emax}
                  </td>
                  <td className="border-b border-neutral-100 px-4 py-3 font-medium text-primary-700">
                    {row.fullSet}
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
                  <td className="border-b border-neutral-100 px-4 py-3 font-medium text-primary-600">
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
            What drives price differences? <strong>Country operating costs</strong> (rent, wages,
            overheads) vary significantly — a clinic in Istanbul has much lower costs than one in
            London. <strong>Material choice</strong> matters: composite is cheapest, E-max is
            premium. <strong>Clinic tier</strong> also affects pricing — top-rated clinics with
            extensive facilities charge more than basic practices.
          </p>
          <p className="leading-relaxed">
            The cheapest option is not always the best value. Focus on material quality, clinic
            reputation, and included services. An all-inclusive package at £2,500 may represent
            better value than a £1,800 quote that excludes hotel and transfers. For detailed
            country-by-country analysis, see our{' '}
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
          Prices based on published clinic rates and may vary. Request a personalised quote for
          accurate pricing.
        </p>
      </m.section>

      {/* =====================================================================
            SECTION D: TYPES OF VENEERS
            ===================================================================== */}
      <m.section {...fadeInUp} className="mb-16 sm:mb-20">
        <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
          Types of Dental Veneers: Which Is Right for You?
        </h2>
        <p className="mt-2 text-neutral-600">
          Understanding your options helps you make an informed decision
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

        {/* Veneers vs Crowns Warning */}
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <h3 className="font-semibold text-amber-900">
            Important: Veneers vs Crowns — Know the Difference
          </h3>
          <p className="mt-2 text-sm text-amber-800 leading-relaxed">
            Veneers are thin shells bonded to the front of teeth, requiring 0.3–0.7mm of enamel
            removal. Crowns cover the entire tooth and require 1.5–2mm of significant tooth
            reduction — this is often irreversible. Some clinics abroad market crowns as "veneers"
            because patients search for veneers more often. The so-called "Turkey teeth" phenomenon
            often involves crowns, not veneers. Always confirm exactly which treatment you are
            receiving and understand the level of tooth preparation involved.
          </p>
        </div>
      </m.section>

      {/* =====================================================================
            SECTION E: BEST COUNTRIES FOR VENEERS
            ===================================================================== */}
      <m.section {...fadeInUp} id="destinations" className="mb-16 scroll-mt-8 sm:mb-20">
        <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
          Best Countries for Dental Veneers from the UK
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
                {dest.active && (
                  <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    Page available
                  </span>
                )}
              </div>

              <p className="mt-3 text-neutral-700">{dest.why}</p>

              <div className="mt-4 space-y-2 text-sm">
                <p className="flex items-center gap-2 text-neutral-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <strong>Best for:</strong> {dest.bestFor}
                </p>
                <p className="flex items-center gap-2 text-neutral-600">
                  <MapPin className="h-4 w-4 text-primary-500" />
                  <strong>Price range:</strong> {dest.priceRange}
                </p>
                <p className="flex items-center gap-2 text-neutral-600">
                  <Plane className="h-4 w-4 text-primary-500" />
                  {dest.flight}
                </p>
              </div>

              {dest.active ? (
                <Link
                  href={dest.slug}
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:underline"
                >
                  Compare Clinics in {dest.country}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              ) : (
                <p className="mt-4 text-sm text-neutral-400">Coming soon</p>
              )}
            </m.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link href="/procedures/veneers/turkey">
            <Button size="lg" className="w-full sm:w-auto">
              View Turkey Clinics
            </Button>
          </Link>
          <Link href="/procedures/veneers/hungary">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View Hungary Clinics
            </Button>
          </Link>
        </div>
      </m.section>

      {/* =====================================================================
            SECTION F: HOW TO CHOOSE A CLINIC
            ===================================================================== */}
      <m.section {...fadeInUp} className="mb-16 sm:mb-20">
        <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
          How to Choose a Safe Veneer Clinic Abroad
        </h2>
        <p className="mt-2 max-w-3xl text-neutral-600">
          Your choice of clinic is the most important factor in a successful outcome. Use this
          checklist to evaluate your options.
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.description}</p>
            </m.div>
          ))}
        </div>

        {/* Aftercare note */}
        <div className="mt-8 rounded-xl border border-primary-200 bg-primary-50 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
            <div>
              <h3 className="font-semibold text-primary-900">Ask about aftercare</h3>
              <p className="mt-2 text-sm text-primary-800 leading-relaxed">
                What happens if something goes wrong when you are back in the UK? Reputable clinics
                offer 2–5 year warranties on veneers, remote follow-up via photos and video calls,
                and some have UK partner dentists for in-person checks. Clarify the aftercare
                arrangements before booking. Also consider{' '}
                <Link
                  href="/procedures/dental-implants/turkey"
                  className="text-primary-600 hover:underline"
                >
                  dental implants abroad
                </Link>{' '}
                if you need more extensive restoration work.
              </p>
            </div>
          </div>
        </div>
      </m.section>

      {/* =====================================================================
            SECTION G: FAQ
            ===================================================================== */}
      <m.section {...fadeInUp} className="mb-16 sm:mb-20">
        <FAQSection
          faqs={faqs}
          title="Frequently Asked Questions About Getting Veneers Abroad"
          className="faq-section"
        />
      </m.section>

      {/* =====================================================================
            SECTION H: CTA / CONVERSION BLOCK
            ===================================================================== */}
      <m.section {...fadeInUp}>
        <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white sm:p-8 lg:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Get Your Free Veneer Quote</h2>
            <p className="mt-3 text-primary-100 sm:mt-4 sm:text-lg">
              Whether you're considering Turkey, Hungary, or another destination, we'll match you
              with verified clinics that meet your budget and requirements. Compare real prices,
              read patient reviews, and book with confidence.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
              <Link href="/search?procedure=veneers">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Browse Veneer Clinics
                </Button>
              </Link>
              <Link href="/contact?procedure=veneers">
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
              Verified clinics · Real prices · No booking fees
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
          <Link href="/dental" className="text-primary-600 hover:underline">
            Dental work abroad
          </Link>{' '}
          ·{' '}
          <Link href="/procedures/veneers/turkey" className="text-primary-600 hover:underline">
            Veneers in Turkey
          </Link>{' '}
          ·{' '}
          <Link href="/procedures/veneers/hungary" className="text-primary-600 hover:underline">
            Veneers in Hungary
          </Link>{' '}
          ·{' '}
          <Link
            href="/procedures/dental-implants/turkey"
            className="text-primary-600 hover:underline"
          >
            Dental implants in Turkey
          </Link>{' '}
          ·{' '}
          <Link
            href="/procedures/dental-implants/hungary"
            className="text-primary-600 hover:underline"
          >
            Dental implants in Hungary
          </Link>
        </p>
      </m.section>
    </div>
  )
}
