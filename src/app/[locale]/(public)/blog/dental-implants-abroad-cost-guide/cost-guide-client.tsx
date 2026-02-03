'use client'

import { useState } from 'react'
import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { FAQSection } from '@/components/seo/faq-section'
import {
  CheckCircle,
  Clock,
  Shield,
  BadgeCheck,
  FileText,
  ChevronDown,
  Users,
  Building2,
  Plane,
  Calculator,
  AlertCircle,
} from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

interface CostGuideClientProps {
  faqs: Array<{ question: string; answer: string }>
}

// =============================================================================
// STATIC DATA — SINGLE IMPLANT PRICES BY COUNTRY
// =============================================================================

const SINGLE_IMPLANT_PRICES = [
  { country: '🇹🇷 Turkey', price: '£250–£700', saving: '70–88%', flight: '3.5–4 hrs', cities: 'Istanbul, Antalya', highlight: true },
  { country: '🇭🇺 Hungary', price: '£500–£1,300', saving: '50–75%', flight: '2.5 hrs', cities: 'Budapest', highlight: false },
  { country: '🇵🇱 Poland', price: '£500–£1,100', saving: '55–75%', flight: '2–2.5 hrs', cities: 'Kraków, Warsaw', highlight: false },
  { country: '🇪🇸 Spain', price: '£700–£1,200', saving: '40–65%', flight: '2–2.5 hrs', cities: 'Barcelona, Alicante', highlight: false },
  { country: '🇲🇽 Mexico', price: '£700–£1,400', saving: '35–65%', flight: '10+ hrs', cities: 'Tijuana, Cancún', highlight: false },
  { country: '🇹🇭 Thailand', price: '£600–£800', saving: '60–75%', flight: '11+ hrs', cities: 'Bangkok, Phuket', highlight: false },
  { country: '🇮🇳 India', price: '£300–£900', saving: '55–85%', flight: '9+ hrs', cities: 'Delhi, Mumbai', highlight: false },
  { country: '🇧🇬 Bulgaria', price: '£500–£800', saving: '60–75%', flight: '3 hrs', cities: 'Sofia, Varna', highlight: false },
  { country: '🇪🇬 Egypt', price: '£400–£700', saving: '65–80%', flight: '5 hrs', cities: 'Cairo, Hurghada', highlight: false },
  { country: '🇬🇧 UK (comparison)', price: '£2,000–£3,200', saving: '—', flight: '—', cities: '—', highlight: false },
]

// =============================================================================
// STATIC DATA — FULL MOUTH PRICES BY COUNTRY
// =============================================================================

const FULL_MOUTH_PRICES = [
  { country: '🇹🇷 Turkey', allOn4: '£1,800–£4,000', fullMouth: '£4,000–£8,000', saving: '70–85%', highlight: true },
  { country: '🇭🇺 Hungary', allOn4: '£4,500–£7,500', fullMouth: '£9,000–£15,000', saving: '40–65%', highlight: false },
  { country: '🇵🇱 Poland', allOn4: '£4,000–£6,500', fullMouth: '£8,000–£13,000', saving: '45–65%', highlight: false },
  { country: '🇪🇸 Spain', allOn4: '£4,500–£7,000', fullMouth: '£9,000–£14,000', saving: '35–55%', highlight: false },
  { country: '🇲🇽 Mexico', allOn4: '£4,500–£9,000', fullMouth: '£9,000–£18,000', saving: '30–55%', highlight: false },
  { country: '🇹🇭 Thailand', allOn4: '£5,500–£7,500', fullMouth: '£11,000–£15,000', saving: '35–50%', highlight: false },
  { country: '🇬🇧 UK (comparison)', allOn4: '£7,000–£12,000', fullMouth: '£14,000–£25,000', saving: '—', highlight: false },
]

// =============================================================================
// STATIC DATA — WORKED EXAMPLE
// =============================================================================

const WORKED_EXAMPLE = {
  scenario: 'A UK patient needs 4 single dental implants (upper front teeth)',
  uk: [
    { item: '4× dental implants with crowns', cost: '£8,000–£12,800' },
    { item: 'Consultations and X-rays', cost: '£150–£300' },
    { item: 'Follow-up appointments', cost: '£200–£400' },
    { item: 'Hotel (5 nights)', cost: 'N/A' },
    { item: 'Airport transfers', cost: 'N/A' },
    { item: 'Return flights', cost: 'N/A' },
    { item: 'Travel insurance', cost: 'N/A' },
  ],
  turkey: [
    { item: '4× dental implants with crowns', cost: '£1,200–£3,200' },
    { item: 'Consultations and X-rays', cost: 'Included' },
    { item: 'Follow-up appointments', cost: 'Included' },
    { item: 'Hotel (5 nights)', cost: 'Included' },
    { item: 'Airport transfers', cost: 'Included' },
    { item: 'Return flights (London–Istanbul)', cost: '£100–£250' },
    { item: 'Travel insurance', cost: '£30–£60' },
  ],
  ukTotal: '£8,350–£13,500',
  turkeyTotal: '£1,330–£3,510',
  saving: '£5,000–£10,000',
}

// =============================================================================
// STATIC DATA — TABLE OF CONTENTS
// =============================================================================

const TOC_ITEMS = [
  { id: 'what-affects-cost', label: 'What Affects Cost' },
  { id: 'prices-by-country', label: 'Prices by Country' },
  { id: 'why-cheaper', label: 'Why Cheaper Abroad' },
  { id: 'whats-included', label: "What's Included" },
  { id: 'is-it-safe', label: 'Is It Safe?' },
  { id: 'how-to-save', label: 'How to Save' },
  { id: 'worked-example', label: 'Worked Example' },
  { id: 'faq', label: 'FAQ' },
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

export function CostGuideClient({ faqs }: CostGuideClientProps) {
  const [tocOpen, setTocOpen] = useState(false)

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
        {/* Main Content */}
        <article className="max-w-3xl">
          {/* ===================================================================
              SECTION A: HERO / ARTICLE HEADER
              =================================================================== */}
          <header className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
                Dental Tourism
              </span>
              <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                <BadgeCheck className="h-3 w-3" />
                Medically Reviewed
              </span>
            </div>

            <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl">
              How Much Do Dental Implants Cost Abroad? The Complete Price Guide for UK Patients
            </h1>

            <p className="mt-4 text-lg text-neutral-600">
              Compare prices across 8+ countries, understand what affects cost, and see exactly how
              much you could save.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                By the medit Research Team
              </span>
              <time dateTime="2026-02-01" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Updated February 2026
              </time>
              <span>12 min read</span>
            </div>

            {/* Hero Stat Strip */}
            <div className="mt-8 grid grid-cols-3 gap-4 rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 p-4 sm:p-6">
              <div className="text-center">
                <p className="text-lg font-bold text-primary-900 sm:text-2xl">£250–£900</p>
                <p className="text-xs text-neutral-600 sm:text-sm">Avg. single implant abroad</p>
              </div>
              <div className="text-center border-x border-primary-100">
                <p className="text-lg font-bold text-primary-900 sm:text-2xl">50–80%</p>
                <p className="text-xs text-neutral-600 sm:text-sm">Typical savings vs UK</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-primary-900 sm:text-2xl">8+</p>
                <p className="text-xs text-neutral-600 sm:text-sm">Countries compared</p>
              </div>
            </div>
          </header>

          {/* Mobile TOC */}
          <div className="mb-8 lg:hidden">
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900"
            >
              On this page
              <ChevronDown className={`h-4 w-4 transition-transform ${tocOpen ? 'rotate-180' : ''}`} />
            </button>
            {tocOpen && (
              <nav className="mt-2 rounded-lg border border-neutral-200 bg-white p-4">
                <ul className="space-y-2">
                  {TOC_ITEMS.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block text-sm text-neutral-600 hover:text-primary-600"
                        onClick={() => setTocOpen(false)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

          {/* ===================================================================
              SECTION B: INTRODUCTION
              =================================================================== */}
          <m.section {...fadeInUp} className="prose prose-lg max-w-none mb-12">
            <p>
              Dental implants in the UK range from £2,000 to £3,200 for a single implant — and the
              NHS covers almost none of the cost. For many patients, the price of restoring a full
              smile is simply out of reach.
            </p>
            <p>
              But there's another option. Patients travelling abroad routinely pay 50–80% less for
              the same implant brands and materials. Turkey, Hungary, Poland, and Spain have built
              thriving dental tourism industries, treating millions of international patients every
              year.
            </p>
            <p>
              This guide covers everything you need to know: country-by-country pricing, what
              affects the cost, what's included in packages, and how to choose a safe, reputable
              clinic. Whether you need a single implant or a full-mouth restoration, you'll find
              the data you need to make an informed decision.
            </p>

            {/* AEO Block — Cost Summary */}
            <div
              className="not-prose my-8 rounded-xl border-l-4 border-primary-500 bg-primary-50 p-4 sm:p-6"
              data-aeo="dental-implant-abroad-cost-summary"
            >
              <p className="text-neutral-700 leading-relaxed ai-answer-block cost-summary">
                Dental implants abroad cost between £250 and £1,200 for a single implant, depending
                on the country. Turkey is the most affordable option at £250–£700, followed by
                Hungary at £500–£1,300, Poland at £500–£1,100, and Spain at £700–£1,200. These
                prices compare to £2,000–£3,200 in the UK. Full-mouth restorations (All-on-4) range
                from £1,800–£5,000 abroad versus £14,000–£20,000 in the UK. Most clinic packages
                include the implant, abutment, crown, consultation, and X-rays.
              </p>
            </div>
          </m.section>

          {/* ===================================================================
              SECTION C: WHAT AFFECTS COST
              =================================================================== */}
          <m.section {...fadeInUp} id="what-affects-cost" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">
              What Affects the Cost of Dental Implants Abroad?
            </h2>

            <div className="mt-6 space-y-4 text-neutral-700">
              <p>
                <strong>Country and location</strong> — Operating costs vary dramatically between
                countries. In Turkey, the average dentist salary is approximately £8,000–£12,000
                per year versus £50,000–£80,000 in the UK. Clinic rent in Istanbul is roughly 70%
                lower than London. These structural cost differences — not quality shortcuts — are
                the primary reason treatment is cheaper.
              </p>
              <p>
                <strong>Implant brand and material</strong> — Premium brands like Straumann and
                Nobel Biocare cost more than Korean alternatives (Osstem, Dentium) or budget
                options. Titanium implants are standard; zirconia implants (metal-free) command a
                premium.
              </p>
              <p>
                <strong>Type of procedure</strong> — A single implant is the simplest case.
                Multiple implants, All-on-4/All-on-6 full-arch restorations, and complex
                reconstructions require more materials and surgical time.
              </p>
              <p>
                <strong>Clinic tier</strong> — JCI-accredited clinics with international patient
                coordinators and premium facilities charge more than local-only practices. You're
                paying for infrastructure, not just the implant.
              </p>
              <p>
                <strong>Additional treatments</strong> — Bone grafting (£200–£500 per area), sinus
                lifts (£300–£800), and extractions (£50–£150 per tooth) add to the base price if
                required.
              </p>
              <p>
                <strong>Package inclusions</strong> — Some clinics bundle accommodation, airport
                transfers, and aftercare; others charge separately. Always compare like-for-like.
              </p>
            </div>
          </m.section>

          {/* ===================================================================
              SECTION D: PRICES BY COUNTRY
              =================================================================== */}
          <m.section {...fadeInUp} id="prices-by-country" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">
              Dental Implant Prices by Country: 2026 Comparison
            </h2>
            <p className="mt-2 text-neutral-600">
              All prices in GBP (£). Updated February 2026.
            </p>

            {/* Table 1: Single Implant */}
            <h3 className="mt-8 text-lg font-semibold text-neutral-900">
              Single Dental Implant Cost by Country
            </h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50">
                    <th className="px-4 py-3 text-left font-semibold text-neutral-900">Country</th>
                    <th className="px-4 py-3 text-left font-semibold text-neutral-900">Single Implant (£)</th>
                    <th className="px-4 py-3 text-left font-semibold text-green-700">Saving vs UK</th>
                    <th className="px-4 py-3 text-left font-semibold text-neutral-900">Flight Time</th>
                    <th className="px-4 py-3 text-left font-semibold text-neutral-900">Popular Cities</th>
                  </tr>
                </thead>
                <tbody>
                  {SINGLE_IMPLANT_PRICES.map((row, index) => (
                    <tr
                      key={row.country}
                      className={`${row.highlight ? 'bg-primary-50' : index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'} ${row.country.includes('UK') ? 'bg-neutral-100' : ''}`}
                    >
                      <td className="border-b border-neutral-100 px-4 py-3 font-medium text-neutral-900">
                        {row.country}
                      </td>
                      <td className="border-b border-neutral-100 px-4 py-3 font-medium text-primary-700">
                        {row.price}
                      </td>
                      <td className="border-b border-neutral-100 px-4 py-3 font-semibold text-green-600">
                        {row.saving}
                      </td>
                      <td className="border-b border-neutral-100 px-4 py-3 text-neutral-600">
                        {row.flight}
                      </td>
                      <td className="border-b border-neutral-100 px-4 py-3 text-neutral-600">
                        {row.cities}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-neutral-500">
              Prices reflect the complete single implant (implant post + abutment + crown). Prices
              vary within countries based on clinic tier, implant brand, and city.
            </p>

            {/* Table 2: Full Mouth */}
            <h3 className="mt-10 text-lg font-semibold text-neutral-900">
              Full-Mouth / All-on-4 Cost by Country
            </h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50">
                    <th className="px-4 py-3 text-left font-semibold text-neutral-900">Country</th>
                    <th className="px-4 py-3 text-left font-semibold text-neutral-900">All-on-4 (per arch)</th>
                    <th className="px-4 py-3 text-left font-semibold text-neutral-900">Full Mouth (both)</th>
                    <th className="px-4 py-3 text-left font-semibold text-green-700">Saving vs UK</th>
                  </tr>
                </thead>
                <tbody>
                  {FULL_MOUTH_PRICES.map((row, index) => (
                    <tr
                      key={row.country}
                      className={`${row.highlight ? 'bg-primary-50' : index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'} ${row.country.includes('UK') ? 'bg-neutral-100' : ''}`}
                    >
                      <td className="border-b border-neutral-100 px-4 py-3 font-medium text-neutral-900">
                        {row.country}
                      </td>
                      <td className="border-b border-neutral-100 px-4 py-3 font-medium text-primary-700">
                        {row.allOn4}
                      </td>
                      <td className="border-b border-neutral-100 px-4 py-3 font-medium text-primary-700">
                        {row.fullMouth}
                      </td>
                      <td className="border-b border-neutral-100 px-4 py-3 font-semibold text-green-600">
                        {row.saving}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-neutral-500">
              All-on-4 prices include 4 implants + fixed prosthesis per arch. Some clinics offer
              All-on-6 for an additional £500–£2,000 per arch.
            </p>

            {/* Country Breakdowns */}
            <div className="mt-10 space-y-6">
              <div className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
                <h4 className="text-lg font-semibold text-neutral-900">🇹🇷 Turkey (£250–£700 per implant)</h4>
                <p className="mt-2 text-neutral-700 leading-relaxed">
                  Turkey is the most popular dental tourism destination from the UK, with 500+
                  clinics catering to international patients in Istanbul alone. Clinics widely use
                  Straumann, Nobel Biocare, and Osstem brands. Most packages include airport
                  transfers, hotel, panoramic X-rays, and aftercare. Flight time is just 3.5–4
                  hours from London.
                </p>
                <Link
                  href="/procedures/dental-implants/turkey"
                  className="mt-3 inline-flex items-center text-sm font-medium text-primary-600 hover:underline"
                >
                  See full guide to dental implants in Turkey →
                </Link>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
                <h4 className="text-lg font-semibold text-neutral-900">🇭🇺 Hungary (£500–£1,300 per implant)</h4>
                <p className="mt-2 text-neutral-700 leading-relaxed">
                  Budapest is known as Europe's "dental capital" with decades of dental tourism
                  history. High proportion of German and Austrian-trained dentists. Clinics are
                  often JCI or ISO 9001 accredited. Short flight from UK (2.5 hours). Higher price
                  point than Turkey but strong reputation for quality.
                </p>
                {/* TODO: link to /procedures/dental-implants/hungary when built */}
                <span className="mt-3 inline-flex items-center text-sm text-neutral-500">
                  Compare dental implant clinics in Hungary (coming soon)
                </span>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
                <h4 className="text-lg font-semibold text-neutral-900">🇵🇱 Poland (£500–£1,100 per implant)</h4>
                <p className="mt-2 text-neutral-700 leading-relaxed">
                  Growing dental tourism destination, especially from the UK due to budget flights
                  (Ryanair, Wizz Air). Kraków and Warsaw are the main hubs. Modern clinics with
                  EU-standard regulation. Good option for patients wanting to stay within the EU
                  regulatory framework.
                </p>
                {/* TODO: link to /procedures/dental-implants/poland when built */}
                <span className="mt-3 inline-flex items-center text-sm text-neutral-500">
                  Explore dental implant options in Poland (coming soon)
                </span>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
                <h4 className="text-lg font-semibold text-neutral-900">🇪🇸 Spain (£700–£1,200 per implant)</h4>
                <p className="mt-2 text-neutral-700 leading-relaxed">
                  Higher cost than Turkey or Hungary but a familiar destination for UK patients.
                  Barcelona, Alicante, and Málaga are popular. Same EU regulations and materials.
                  Shortest flights from the UK. Appeals to patients who want a familiar, Western
                  European environment.
                </p>
                {/* TODO: link to /procedures/dental-implants/spain when built */}
                <span className="mt-3 inline-flex items-center text-sm text-neutral-500">
                  Find dental implant clinics in Spain (coming soon)
                </span>
              </div>
            </div>
          </m.section>

          {/* ===================================================================
              SECTION E: WHY CHEAPER
              =================================================================== */}
          <m.section {...fadeInUp} id="why-cheaper" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">
              Why Are Dental Implants Cheaper Abroad?
            </h2>

            <div className="mt-6 space-y-4 text-neutral-700">
              <p>
                <strong>Lower operating costs.</strong> Dental clinic rent in Istanbul averages
                £300–£500/month vs £3,000–£5,000/month in London. Staff salaries are 60–80% lower.
                These savings pass directly to patients.
              </p>
              <p>
                <strong>Competitive market dynamics.</strong> Turkey has 500+ clinics competing for
                international patients in Istanbul alone. This competition drives prices down and
                quality up — clinics that deliver poor results quickly lose reputation.
              </p>
              <p>
                <strong>Government incentives.</strong> Countries like Turkey and Thailand actively
                promote medical tourism with tax breaks, subsidised healthcare zones, and
                government marketing support.
              </p>
              <p>
                <strong>Volume-based pricing.</strong> Clinics treating thousands of international
                patients per year achieve economies of scale on implant materials and lab work that
                smaller UK practices cannot match.
              </p>
              <p>
                <strong>Same implant brands.</strong> Top clinics abroad use identical Straumann,
                Nobel Biocare, and Zimmer Biomet implants as UK clinics. The titanium post
                manufactured in Switzerland costs the same worldwide — it's everything else
                (labour, rent, overhead) that's cheaper.
              </p>
            </div>

            {/* AEO Block — Why Cheaper */}
            <div
              className="mt-8 rounded-xl border-l-4 border-primary-500 bg-primary-50 p-4 sm:p-6"
              data-aeo="why-dental-implants-cheaper-abroad"
            >
              <p className="text-neutral-700 leading-relaxed ai-answer-block">
                Dental implants are cheaper abroad primarily because of lower operating costs, not
                lower quality. Clinic rent, staff salaries, and overhead expenses are 60–80% lower
                in countries like Turkey and Hungary compared to the UK. Top clinics abroad use the
                same implant brands (Straumann, Nobel Biocare, Zimmer Biomet) as British dental
                practices. Government incentives for medical tourism and high competition between
                clinics also contribute to lower prices.
              </p>
            </div>
          </m.section>

          {/* ===================================================================
              SECTION F: WHAT'S INCLUDED
              =================================================================== */}
          <m.section {...fadeInUp} id="whats-included" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">
              What's Included in a Dental Implant Package Abroad?
            </h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                <h3 className="flex items-center gap-2 font-semibold text-green-900">
                  <CheckCircle className="h-5 w-5" />
                  Typically Included
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-green-800">
                  <li>• Initial consultation and treatment plan</li>
                  <li>• Panoramic X-ray / CT scan</li>
                  <li>• Implant placement surgery</li>
                  <li>• Abutment and permanent crown</li>
                  <li>• Local anaesthesia / sedation</li>
                  <li>• Post-operative medications</li>
                  <li>• Follow-up appointments during stay</li>
                  <li>• Hotel accommodation (3–7 nights)</li>
                  <li>• Airport-to-clinic transfers</li>
                </ul>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <h3 className="flex items-center gap-2 font-semibold text-amber-900">
                  <AlertCircle className="h-5 w-5" />
                  Usually NOT Included
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-amber-800">
                  <li>• Return flights (£50–£300 depending on destination)</li>
                  <li>• Bone grafting if required (£200–£500 per area)</li>
                  <li>• Sinus lift if required (£300–£800)</li>
                  <li>• Extraction of existing teeth (£50–£150/tooth)</li>
                  <li>• Temporary crowns for two-stage procedure (£100–£300)</li>
                  <li>• Travel insurance / dental tourism insurance</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-5">
              <p className="text-sm text-neutral-700">
                <strong>Key point:</strong> Always request a detailed, itemised quote before
                booking. A "cheap" headline price that excludes necessary pre-treatments can end up
                costing more than a comprehensive package from a premium clinic.
              </p>
            </div>

            <div className="mt-6">
              <Link href="/search?procedure=dental-implants">
                <Button>Compare Transparent, Itemised Quotes →</Button>
              </Link>
            </div>
          </m.section>

          {/* ===================================================================
              SECTION G: IS IT SAFE
              =================================================================== */}
          <m.section {...fadeInUp} id="is-it-safe" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">
              Is It Safe to Get Dental Implants Abroad?
            </h2>

            <div className="mt-6 space-y-4 text-neutral-700">
              <p>
                <strong>Accreditations to look for:</strong> JCI (Joint Commission International),
                ISO 9001, TEMOS, and national health ministry registration. These aren't just
                badges — they mean the clinic has passed rigorous international audits for hygiene,
                equipment, and patient safety protocols.
              </p>
              <p>
                <strong>Dentist qualifications:</strong> Many Turkish and Hungarian implantologists
                hold memberships in the International Congress of Oral Implantologists (ICOI),
                European Association for Osseointegration (EAO), or equivalent bodies.
              </p>
              <p>
                <strong>Success rates:</strong> Dental implant success rates are 95–98% globally,
                and this rate is consistent across top clinics in Turkey, Hungary, and the UK. The
                procedure is well-established with decades of clinical evidence.
              </p>
              <p>
                <strong>Implant brand guarantees:</strong> Straumann and Nobel Biocare offer
                worldwide warranties on their implant components regardless of where they were
                placed.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-5">
              <h3 className="font-semibold text-neutral-900">What to verify before booking:</h3>
              <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                  Clinic accreditations (JCI, ISO)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                  Dentist credentials and specialisation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                  Before/after photos of previous patients
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                  Independent patient reviews (Google, Trustpilot)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                  Written treatment plan and guarantee terms
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                  Aftercare arrangements (local follow-up in UK)
                </li>
              </ul>
            </div>

            {/* AEO Block — Safety */}
            <div
              className="mt-8 rounded-xl border-l-4 border-primary-500 bg-primary-50 p-4 sm:p-6"
              data-aeo="dental-implants-abroad-safety"
            >
              <p className="text-neutral-700 leading-relaxed ai-answer-block">
                Getting dental implants abroad is generally safe when patients choose accredited
                clinics with qualified implantologists. Look for JCI or ISO 9001 accreditation,
                dentist membership in organisations like the ICOI or EAO, and clinics that use
                internationally recognised implant brands (Straumann, Nobel Biocare). Dental
                implant success rates are 95–98% at top clinics worldwide, regardless of country.
              </p>
            </div>
          </m.section>

          {/* ===================================================================
              SECTION H: HOW TO SAVE
              =================================================================== */}
          <m.section {...fadeInUp} id="how-to-save" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">
              How to Save the Most on Dental Implants Abroad
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Compare multiple clinics</h4>
                  <p className="mt-1 text-sm text-neutral-600">
                    Get at least 3 quotes. Prices for the same procedure can vary 40–60% between
                    clinics in the same city.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Travel in off-peak seasons</h4>
                  <p className="mt-1 text-sm text-neutral-600">
                    Flights and accommodation are significantly cheaper November–March for Turkey
                    and Hungary.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Book package deals</h4>
                  <p className="mt-1 text-sm text-neutral-600">
                    All-inclusive packages (treatment + hotel + transfers) are almost always better
                    value than booking separately.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Consider nearby countries</h4>
                  <p className="mt-1 text-sm text-neutral-600">
                    Hungary and Poland are 2–2.5 hour flights with budget airlines from most UK
                    airports — total travel costs under £200 return.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                  5
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Ask about implant brands</h4>
                  <p className="mt-1 text-sm text-neutral-600">
                    Korean-made implants (Osstem, Dentium) are clinically proven but cost 30–50%
                    less than Swiss or Swedish brands.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                  6
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Use a comparison platform</h4>
                  <p className="mt-1 text-sm text-neutral-600">
                    Platforms like medit let you compare verified clinics, check accreditations,
                    and request itemised quotes in one place.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/search?procedure=dental-implants">
                <Button>Start Comparing Clinics →</Button>
              </Link>
            </div>
          </m.section>

          {/* ===================================================================
              SECTION I: WORKED EXAMPLE
              =================================================================== */}
          <m.section {...fadeInUp} id="worked-example" className="mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">
              Real-World Example: The True Cost of Dental Implants in Turkey vs the UK
            </h2>
            <p className="mt-2 text-neutral-600">
              {WORKED_EXAMPLE.scenario}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {/* UK Column */}
              <div className="rounded-xl border border-neutral-300 bg-neutral-50 p-5">
                <h3 className="mb-4 text-center font-semibold text-neutral-700">🇬🇧 UK</h3>
                <ul className="space-y-2 text-sm">
                  {WORKED_EXAMPLE.uk.map((item) => (
                    <li key={item.item} className="flex justify-between">
                      <span className="text-neutral-600">{item.item}</span>
                      <span className="font-medium text-neutral-900">{item.cost}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-neutral-300 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-neutral-900">{WORKED_EXAMPLE.ukTotal}</span>
                  </div>
                </div>
              </div>

              {/* Turkey Column */}
              <div className="rounded-xl border-2 border-primary-300 bg-primary-50 p-5">
                <h3 className="mb-4 text-center font-semibold text-primary-700">🇹🇷 Turkey (Package)</h3>
                <ul className="space-y-2 text-sm">
                  {WORKED_EXAMPLE.turkey.map((item) => (
                    <li key={item.item} className="flex justify-between">
                      <span className="text-neutral-600">{item.item}</span>
                      <span className="font-medium text-primary-900">{item.cost}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-primary-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary-700">{WORKED_EXAMPLE.turkeyTotal}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-green-100 p-5 text-center">
              <p className="text-lg font-semibold text-green-800">
                Total Saving: {WORKED_EXAMPLE.saving}
              </p>
              <p className="mt-1 text-sm text-green-700">
                Even after flights, accommodation, and insurance, this patient saves enough for a
                family holiday with the money left over.
              </p>
            </div>
          </m.section>

          {/* ===================================================================
              SECTION J: FAQ
              =================================================================== */}
          <m.section {...fadeInUp} id="faq" className="mb-12 scroll-mt-24">
            <FAQSection
              faqs={faqs}
              title="Frequently Asked Questions About Dental Implant Costs Abroad"
              className="faq-section"
            />
          </m.section>

          {/* ===================================================================
              SECTION K: RELATED / CTA
              =================================================================== */}
          <m.section {...fadeInUp} className="mb-8">
            <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">
              Plan Your Dental Treatment Abroad
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link
                href="/procedures/dental-implants/turkey"
                className="rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:border-primary-200 hover:shadow-md"
              >
                <h3 className="font-semibold text-neutral-900">Dental Implants in Turkey</h3>
                <p className="mt-1 text-sm text-neutral-600">
                  2026 prices, clinics & UK patient guide
                </p>
              </Link>
              <Link
                href="/procedures/veneers/turkey"
                className="rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:border-primary-200 hover:shadow-md"
              >
                <h3 className="font-semibold text-neutral-900">Veneers in Turkey</h3>
                <p className="mt-1 text-sm text-neutral-600">
                  2026 costs, materials & what to expect
                </p>
              </Link>
              <Link
                href="/dental"
                className="rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:border-primary-200 hover:shadow-md"
              >
                <h3 className="font-semibold text-neutral-900">All Dental Treatments Abroad</h3>
                <p className="mt-1 text-sm text-neutral-600">
                  Complete guide to dental tourism
                </p>
              </Link>
              <Link
                href="/search?category=dental"
                className="rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:border-primary-200 hover:shadow-md"
              >
                <h3 className="font-semibold text-neutral-900">Browse Dental Clinics</h3>
                <p className="mt-1 text-sm text-neutral-600">
                  Compare verified clinics worldwide
                </p>
              </Link>
            </div>
          </m.section>

          {/* Final CTA */}
          <m.section {...fadeInUp}>
            <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white sm:p-8">
              <div className="text-center">
                <h2 className="text-xl font-bold sm:text-2xl">Ready to Compare Prices?</h2>
                <p className="mt-2 text-primary-100">
                  Tell us what treatment you need and we'll get you quotes from verified clinics in
                  minutes.
                </p>
                <div className="mt-6">
                  <Link href="/search?procedure=dental-implants">
                    <Button variant="secondary" size="lg">
                      Get Free Quotes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </m.section>
        </article>

        {/* =====================================================================
            SIDEBAR — TABLE OF CONTENTS
            ===================================================================== */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <nav aria-label="Table of contents">
              <h4 className="mb-4 text-sm font-semibold text-neutral-900">On this page</h4>
              <ul className="space-y-2 border-l border-neutral-200">
                {TOC_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block border-l-2 border-transparent py-1 pl-4 text-sm text-neutral-600 transition-colors hover:border-primary-500 hover:text-primary-600"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Related Content */}
            <div className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
              <h4 className="mb-3 text-sm font-semibold text-neutral-900">Related Guides</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/procedures/dental-implants/turkey"
                    className="text-neutral-600 hover:text-primary-600"
                  >
                    Dental Implants in Turkey →
                  </Link>
                </li>
                <li>
                  <Link
                    href="/procedures/veneers/turkey"
                    className="text-neutral-600 hover:text-primary-600"
                  >
                    Veneers in Turkey →
                  </Link>
                </li>
                <li>
                  <Link href="/dental" className="text-neutral-600 hover:text-primary-600">
                    Dental Work Abroad →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
