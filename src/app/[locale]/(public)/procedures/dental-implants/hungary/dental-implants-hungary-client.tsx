'use client'

import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { HU, TR } from 'country-flag-icons/react/3x2'
import { Button } from '@/components/ui/button'
import { FAQSection } from '@/components/seo/faq-section'
import {
  CheckCircle,
  Shield,
  Star,
  FileText,
  Users,
  Award,
  ArrowRight,
  MapPin,
  BadgeCheck,
  Plane,
  Building2,
  GraduationCap,
  Clock,
} from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

interface DentalImplantsHungaryClientProps {
  faqs: Array<{ question: string; answer: string }>
}

// =============================================================================
// STATIC DATA — PRICING TABLES
// =============================================================================

const SINGLE_IMPLANT_PRICES = [
  {
    treatment: 'Single implant (including crown)',
    hungaryPrice: '£600–£1,000',
    ukPrice: '£2,000–£3,000',
    saving: '60–70%',
  },
  {
    treatment: 'Single implant — Straumann',
    hungaryPrice: '£800–£1,000',
    ukPrice: '£2,500–£3,000',
    saving: '65–68%',
  },
  {
    treatment: 'Single implant — Neodent',
    hungaryPrice: '£600–£800',
    ukPrice: '£1,800–£2,500',
    saving: '65–70%',
  },
]

const FULL_MOUTH_PRICES = [
  {
    treatment: 'All-on-4 (single arch)',
    hungaryPrice: '£4,500–£7,000',
    ukPrice: '£10,000–£15,000',
    saving: '50–55%',
  },
  {
    treatment: 'All-on-6 (single arch — Camlog premium)',
    hungaryPrice: '£6,000–£8,400',
    ukPrice: '£12,000–£15,500',
    saving: '46–50%',
  },
  {
    treatment: 'Full mouth (both arches)',
    hungaryPrice: '£9,000–£14,000',
    ukPrice: '£20,000–£30,000',
    saving: '50–55%',
  },
]

// =============================================================================
// STATIC DATA — IMPLANT TYPES
// =============================================================================

const IMPLANT_TYPES = [
  {
    name: 'Single Tooth Implants',
    description:
      'One titanium post replaces one missing tooth. The implant acts as an artificial root, with a crown attached on top that looks and functions like a natural tooth.',
    bestFor: 'Patients with one or a few gaps in their smile',
    timeline: '3–5 days for placement in Visit 1, return visit after 3–6 months for permanent crown',
    brands: 'Straumann, Neodent',
  },
  {
    name: 'All-on-4 Implants',
    description:
      'Four strategically placed implants support a full arch of fixed teeth. The angled rear implants maximise bone contact without needing bone grafts in most cases. Often completed with temporary teeth on the same day as surgery.',
    bestFor: 'Patients who have lost most or all teeth in one jaw',
    timeline: 'Temporary teeth often placed same day as surgery',
    brands: 'Straumann Pro Arch',
  },
  {
    name: 'All-on-6 Implants',
    description:
      'Six implants per arch provide additional stability and distribute bite force more evenly than All-on-4. Preferred for patients with some bone loss who want extra security.',
    bestFor: 'Patients with moderate bone loss wanting maximum stability',
    timeline: 'Similar to All-on-4 with optional same-day temporary teeth',
    brands: 'Camlog, Straumann',
  },
  {
    name: 'Implant-Supported Bridges',
    description:
      'When 3–4 adjacent teeth are missing, two implants can support a bridge spanning the gap. More cost-effective than placing individual implants for consecutive missing teeth.',
    bestFor: 'Patients with several consecutive missing teeth',
    timeline: 'Standard implant timeline with bridge placement at second visit',
  },
]

const IMPLANT_BRANDS = [
  {
    name: 'Straumann',
    origin: 'Swiss',
    tier: 'Premium',
    description:
      '60+ years of clinical evidence, lifetime manufacturer guarantee. Used by top Budapest clinics including Helvetic Clinics and ImplantCenter.',
  },
  {
    name: 'Neodent',
    origin: 'Straumann subsidiary, Brazil',
    tier: 'Mid-premium',
    description:
      'Acqua hydrophilic surface technology for faster osseointegration. Excellent value within the Straumann family.',
  },
  {
    name: 'Megagen Anyridge',
    origin: 'Korean',
    tier: 'Premium',
    description:
      'Known for strong primary stability in compromised bone. Widely used in Budapest for complex cases.',
  },
  {
    name: 'Alpha Bio',
    origin: 'Israeli',
    tier: 'Value',
    description: 'Budget-friendly option with a solid clinical track record. Good choice for cost-conscious patients.',
  },
]

// =============================================================================
// STATIC DATA — PROCEDURE STEPS
// =============================================================================

const PROCEDURE_STEPS = {
  beforeTravel: [
    'Remote consultation via WhatsApp, video call, or in-person at a London consultation office',
    'Share dental records, X-rays, or photos for preliminary assessment',
    'Receive detailed treatment plan and itemised quote',
    'Book flights and accommodation (or use clinic all-inclusive package)',
  ],
  visit1: {
    title: 'Visit 1 — Assessment & Implant Placement (3–5 days)',
    steps: [
      'Day 1: Comprehensive exam, CBCT 3D scan, treatment plan confirmation. Budapest clinics use computer-assisted implant surgery (CAIS) for 3× greater accuracy than freehand placement',
      'Day 2–3: Extractions (if needed), bone grafting/sinus lift (if needed), implant placement under local anaesthesia',
      'Day 3–5: Temporary teeth fitted, follow-up checks, aftercare instructions',
      'Recovery: Mild discomfort managed with prescribed painkillers, soft diet for 1–2 weeks',
    ],
  },
  healingPeriod: {
    title: 'Healing Period (3–6 months)',
    description:
      'During osseointegration, the implants fuse with your jawbone to create a solid foundation. Clinics offer remote check-ins via WhatsApp or email. Your UK dentist can monitor healing progress locally. Some clinics provide UK follow-up through their London offices.',
  },
  visit2: {
    title: 'Visit 2 — Permanent Crowns (5–10 days)',
    steps: [
      'Digital impressions or traditional moulds for final crowns/bridge',
      'In-house dental lab fabrication (many Budapest clinics have their own labs, reducing turnaround)',
      'Crown fitting and bite adjustment',
      'Final check-up and aftercare instructions',
    ],
  },
}

// =============================================================================
// STATIC DATA — CLINIC SELECTION CRITERIA
// =============================================================================

const CLINIC_CHECKLIST = [
  {
    icon: Shield,
    title: 'EU regulation',
    description:
      'Hungary is an EU member state. All dental clinics must comply with EU Medical Device Regulation (MDR) and operate under Hungarian National Public Health Centre (NNK) oversight.',
  },
  {
    icon: Award,
    title: 'Accreditations',
    description:
      'Look for ISO 9001 certification, GCR (Global Clinic Rating) ranking, and membership of the Hungarian Dental Association. Leading clinics like Helvetic Clinics have held #1 GCR ranking since 2014.',
  },
  {
    icon: BadgeCheck,
    title: 'Implant brands',
    description:
      'Ask which brands the clinic uses. Premium brands (Straumann, Neodent) have the strongest clinical evidence. Be cautious of unnamed or "house brand" implants.',
  },
  {
    icon: GraduationCap,
    title: 'Dentist credentials',
    description:
      "Look for specialists, not generalists. Budapest's best clinics use separate implantologists, prosthodontists, and periodontists. Many lead surgeons have placed 10,000–30,000+ implants.",
  },
  {
    icon: Star,
    title: 'Reviews and verification',
    description:
      'Check Google reviews, Trustpilot, and WhatClinic ratings. Leading Budapest clinics have 2,000+ verified reviews with 4.8–4.9 star averages.',
  },
  {
    icon: FileText,
    title: 'Aftercare and guarantees',
    description:
      'Reputable clinics offer lifetime warranties on implant posts and 5–15 year guarantees on crowns. Some maintain London offices for follow-up care.',
  },
  {
    icon: Users,
    title: 'MeetYourClinic advantage',
    description:
      'All clinics on MeetYourClinic are pre-vetted for EU compliance, verified pricing, and genuine patient reviews. We do the due diligence so you can focus on your treatment.',
  },
]

// =============================================================================
// STATIC DATA — RISKS
// =============================================================================

const RISKS = [
  {
    risk: 'Implant failure',
    rate: 'Occurs in 2–5% of cases globally — the same rate as the UK',
    mitigation:
      "Choose clinics with documented success rates and premium implant brands (Straumann, Neodent). Budapest's top clinics report success rates above 97%.",
  },
  {
    risk: 'Infection',
    rate: 'Small risk with any surgical procedure',
    mitigation:
      'Hungarian clinics operating under EU regulations follow strict sterilisation protocols. ISO 9001 certified clinics have audited infection control procedures.',
  },
  {
    risk: 'Language and communication',
    rate: 'Minimal risk at reputable clinics',
    mitigation:
      'English is widely spoken in Budapest dental clinics. Ensure your treatment plan, consent forms, and guarantees are provided in English. Request everything in writing before treatment.',
  },
  {
    risk: 'Aftercare complications at home',
    rate: 'Manageable with planning',
    mitigation:
      'Choose a clinic with a clear complication protocol. Several Budapest clinics maintain London consultation offices for UK patient follow-up. Keep all treatment documentation for your UK dentist.',
  },
  {
    risk: 'Choosing the wrong clinic',
    rate: 'Risk varies significantly',
    mitigation:
      'Avoid clinics that use unnamed implant brands, lack accreditations, or offer prices significantly below market rate. Use MeetYourClinic to compare pre-vetted, accredited clinics.',
  },
  {
    risk: 'Managing expectations',
    rate: 'Depends on individual factors',
    mitigation:
      "Results depend on bone density, oral health, and compliance with aftercare. A reputable clinic will be transparent about limitations during consultation and will refuse treatment if conditions aren't suitable.",
  },
]

// =============================================================================
// STATIC DATA — HUNGARY VS TURKEY COMPARISON
// =============================================================================

const COMPARISON_DATA = [
  { factor: 'Typical single implant cost', hungary: '£600–£1,000', turkey: '£300–£800' },
  { factor: 'Typical All-on-4 cost', hungary: '£4,500–£7,000', turkey: '£1,600–£3,200' },
  { factor: 'EU regulated', hungary: '✓ Yes (EU member)', turkey: '✗ No (JCI/AACI available)' },
  { factor: 'Flight time from UK', hungary: '2–2.5 hours', turkey: '4–4.5 hours' },
  { factor: 'Implant brands', hungary: 'Primarily Straumann, Neodent (premium European)', turkey: 'Mix of premium + value brands' },
  { factor: 'UK aftercare access', hungary: 'Some clinics have London offices', turkey: 'Fewer UK follow-up options' },
  { factor: 'Tourism appeal', hungary: 'Budapest city break, thermal baths', turkey: 'Istanbul/Antalya beach + culture' },
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

export function DentalImplantsHungaryClient({ faqs }: DentalImplantsHungaryClientProps) {
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
              Dental Implants in Hungary: Prices, Budapest Clinics & What UK Patients Need to Know
            </h1>
            <p className="mt-4 text-base text-primary-100 sm:mt-6 sm:text-lg lg:text-xl">
              Compare verified Budapest clinics, real prices, and UK patient reviews — all in one place.
            </p>
            <p className="mt-4 text-primary-200 leading-relaxed">
              Hungary — and Budapest in particular — has earned its reputation as the "dental capital of
              Europe," with UK patients saving 50–70% compared to private treatment at home. With
              EU-regulated clinics, internationally trained dentists, and just a 2.5-hour flight from
              London, Budapest combines premium dental care with genuine value. MeetYourClinic helps you compare
              accredited clinics, understand what's included, and make an informed decision.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link href="/search?procedure=dental-implants&country=hungary">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Compare Budapest Clinics & Get a Free Quote
                </Button>
              </Link>
              <Link href="#pricing">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full text-white hover:bg-white/10 sm:w-auto"
                >
                  View 2026 Prices
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Strip */}
          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/20 pt-8 text-sm text-primary-200 sm:mt-12 sm:gap-6">
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
            SECTION B: WHY UK PATIENTS CHOOSE HUNGARY
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Why UK Patients Choose Hungary for Dental Implants
          </h2>

          <div className="mt-6 space-y-4 text-neutral-700 sm:mt-8 sm:space-y-6">
            <p className="text-base leading-relaxed sm:text-lg">
              <strong>Cost savings that make premium treatment accessible.</strong> A single dental
              implant costs £2,000–£3,000 in a UK private practice. In Hungary, the same procedure —
              using premium European implant brands like Straumann or Neodent — costs £600–£1,000.
              Full-mouth restorations using the All-on-4 system start from £4,500 per arch in Hungary,
              compared to £10,000–£15,000 in the UK. Even including flights and accommodation, patients
              typically save 50–70% on the total cost. Real example: a UK patient paid £13,000 for 12
              implants + 24 crowns in Budapest — the same work was quoted at £27,000 in London (52%
              saving).
            </p>

            <p className="leading-relaxed">
              <strong>EU quality standards you can trust.</strong> Hungary is an EU member state,
              meaning clinics operate under strict EU Medical Device Regulation (MDR). Hungarian clinics
              use premium international brands (Straumann, Neodent, Megagen). Many dentists trained at
              Semmelweis University, one of Europe's oldest and most respected medical institutions
              (founded 1769). The Hungarian Dental Association provides professional oversight.
            </p>

            <p className="leading-relaxed">
              <strong>Proximity and convenience.</strong> Budapest is 2–2.5 hours from London by direct
              flight. Served by Ryanair, Wizz Air, and easyJet with return flights often under £100. No
              visa required for UK nationals (stays under 90 days). English is widely spoken in Budapest{' '}
              <Link href="/dental" className="text-primary-600 hover:underline">
                dental
              </Link>{' '}
              clinics.
            </p>

            <p className="leading-relaxed">
              <strong>Established dental tourism infrastructure.</strong> Budapest has been Europe's
              leading{' '}
              <Link href="/dental" className="text-primary-600 hover:underline">
                dental tourism
              </Link>{' '}
              destination for over 20 years. Clinics are purpose-built for international patients with
              airport transfers, hotel partnerships, in-house dental labs, and dedicated
              English-speaking patient coordinators. Some leading clinics also maintain consultation
              offices in London for pre-treatment assessments and post-treatment follow-ups.
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION C: PRICING
            ===================================================================== */}
        <m.section {...fadeInUp} id="pricing" className="mb-16 scroll-mt-8 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            How Much Do Dental Implants Cost in Hungary?
          </h2>
          <p className="mt-2 text-neutral-600">
            Prices updated February 2026. All prices in GBP (£).
          </p>

          {/* AEO Block — Primary pricing statement */}
          <div
            className="mt-6 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 p-4 sm:p-6 border border-primary-100"
            data-aeo="dental-implants-hungary-cost"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block cost-summary">
              A single dental implant in Hungary costs between £600 and £1,000 including the crown,
              compared with £2,000 to £3,000 in the UK. Full-mouth restorations using the All-on-4
              system cost approximately £4,500 to £7,000 per arch in Hungary, versus £10,000 to £15,000
              in the UK. Budapest clinics typically use premium European implant brands such as
              Straumann and Neodent, and prices are often all-inclusive, covering consultation, 3D
              imaging, the implant, abutment, crown, and follow-up appointments.
            </p>
          </div>

          {/* Single Implant Prices Table */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">Single Implant Prices</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Treatment</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">
                    Hungary Price
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">UK Price</th>
                  <th className="px-4 py-3 text-left font-semibold text-green-700">Saving</th>
                </tr>
              </thead>
              <tbody>
                {SINGLE_IMPLANT_PRICES.map((row, index) => (
                  <tr
                    key={row.treatment}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}
                  >
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-900">
                      {row.treatment}
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

          {/* Full-Mouth Prices Table */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">
            Full-Mouth & All-on-4 Prices
          </h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Treatment</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">
                    Hungary Price
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">UK Price</th>
                  <th className="px-4 py-3 text-left font-semibold text-green-700">Saving</th>
                </tr>
              </thead>
              <tbody>
                {FULL_MOUTH_PRICES.map((row, index) => (
                  <tr
                    key={row.treatment}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}
                  >
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-900">
                      {row.treatment}
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

          {/* What's Included */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">
            What's Typically Included in the Price
          </h3>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            Most Budapest dental clinics offer all-inclusive packages that cover: consultation,
            panoramic X-ray + CBCT 3D scan, implant post + abutment + crown, temporary prosthesis (if
            needed), anaesthesia and medications, and follow-up appointments. Many Budapest clinics
            also include airport transfers and 3–4 star hotel accommodation in their package prices.
            Always confirm exactly what's included in your quote before booking.
          </p>

          {/* What Affects Cost */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">
            What Can Affect Your Final Cost
          </h3>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            Several factors influence the final price: implant brand (Straumann premium vs Neodent
            value), number of implants required, need for bone grafting or sinus lift procedures,
            material choice (titanium vs zirconia), choice of crown material (porcelain-fused-to-metal
            vs full zirconia), and whether the clinic includes accommodation in the package or charges
            separately. For a detailed breakdown of{' '}
            <Link
              href="/blog/dental-implants-abroad-cost-guide"
              className="text-primary-600 hover:underline"
            >
              dental implants abroad costs
            </Link>
            , see our comprehensive price guide.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/search?procedure=dental-implants&country=hungary">
              <Button size="lg" className="w-full sm:w-auto">
                Get Your Free Quote
              </Button>
            </Link>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION D: TYPES OF IMPLANTS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Types of Dental Implants Available in Hungary
          </h2>
          <p className="mt-2 text-neutral-600">
            Budapest clinics offer the full range of implant solutions for every clinical situation
          </p>

          <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-6">
            {IMPLANT_TYPES.map((type) => (
              <div
                key={type.name}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
              >
                <h3 className="text-lg font-semibold text-neutral-900">{type.name}</h3>
                <p className="mt-2 text-neutral-700 leading-relaxed">{type.description}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <span className="rounded-full bg-primary-50 px-3 py-1 text-primary-700">
                    <strong>Best for:</strong> {type.bestFor}
                  </span>
                  {type.brands && (
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-neutral-700">
                      <strong>Brands:</strong> {type.brands}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-neutral-500">
                  <strong>Timeline:</strong> {type.timeline}
                </p>
              </div>
            ))}
          </div>

          {/* Implant Brands Section */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">
            Implant Brands Used in Hungary
          </h3>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            Hungarian clinics predominantly use premium European implant systems. Always confirm which
            implant brand is included in your quote. Premium brands carry the strongest warranties and
            longest clinical evidence base.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {IMPLANT_BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="rounded-xl border border-neutral-200 bg-white p-5"
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-neutral-900">{brand.name}</h4>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${brand.tier === 'Premium'
                      ? 'bg-green-50 text-green-700'
                      : brand.tier === 'Mid-premium'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-neutral-100 text-neutral-600'
                      }`}
                  >
                    {brand.tier}
                  </span>
                </div>
                <p className="mt-1 text-xs text-neutral-500">{brand.origin}</p>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{brand.description}</p>
              </div>
            ))}
          </div>

          {/* Link to veneers */}
          <p className="mt-6 text-neutral-600">
            Considering other cosmetic dental treatments?{' '}
            {/* TODO: link to /procedures/veneers/hungary */}
            <span className="text-primary-600">Veneers in Hungary</span> are also popular with UK
            patients seeking smile makeovers.
          </p>
        </m.section>

        {/* =====================================================================
            SECTION E: PROCEDURE STEP BY STEP
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            What to Expect: The Dental Implant Procedure in Hungary
          </h2>
          <p className="mt-2 text-neutral-600">
            A step-by-step guide to your treatment journey in Budapest
          </p>

          {/* AEO Block — Procedure overview */}
          <div
            className="mt-6 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 p-4 sm:p-6 border border-primary-100"
            data-aeo="dental-implant-procedure-hungary"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block procedure-summary">
              Dental implant treatment in Hungary typically requires two visits to Budapest. The first
              visit (3–5 days) covers assessment, CBCT 3D imaging, and implant placement using
              computer-assisted surgery. After a healing period of 3–6 months for osseointegration, a
              second visit (5–10 days) is needed for permanent crown or bridge fitting. Budapest
              clinics with in-house dental labs can fabricate permanent restorations faster than
              clinics that outsource. Some clinics offer immediate-load implants where temporary teeth
              are placed on the same day as surgery.
            </p>
          </div>

          {/* Before You Travel */}
          <div className="mt-10">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-neutral-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
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

          {/* Visit 1 */}
          <div className="mt-8">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-neutral-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                2
              </span>
              {PROCEDURE_STEPS.visit1.title}
            </h3>
            <ul className="mt-4 space-y-2 pl-10">
              {PROCEDURE_STEPS.visit1.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-2 text-neutral-700">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Healing Period */}
          <div className="mt-8">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-neutral-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                3
              </span>
              {PROCEDURE_STEPS.healingPeriod.title}
            </h3>
            <p className="mt-4 pl-10 text-neutral-700 leading-relaxed">
              {PROCEDURE_STEPS.healingPeriod.description}
            </p>
          </div>

          {/* Visit 2 */}
          <div className="mt-8">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-neutral-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                4
              </span>
              {PROCEDURE_STEPS.visit2.title}
            </h3>
            <ul className="mt-4 space-y-2 pl-10">
              {PROCEDURE_STEPS.visit2.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-2 text-neutral-700">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION F: CHOOSING A CLINIC
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            How to Choose a Safe, Reputable Dental Implant Clinic in Hungary
          </h2>
          <p className="mt-2 max-w-3xl text-neutral-600">
            Your choice of clinic is the most important factor in a successful outcome. Use this
            checklist to evaluate your options.
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
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

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/search?procedure=dental-implants&country=hungary">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Verified Clinics in Budapest
              </Button>
            </Link>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION G: BUDAPEST — DENTAL CAPITAL OF EUROPE
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Why Budapest Is Europe's Leading Dental Tourism Destination
          </h2>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* World-Class Dental Education */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">
                  World-Class Dental Education
                </h3>
              </div>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                Budapest is home to Semmelweis University, one of Europe's oldest medical institutions
                (founded 1769) and a global leader in dental education. Hungary has over 7,000
                practising dentists nationwide, with Budapest clinics attracting the country's top
                specialists. The density of dental expertise in Budapest is unmatched in European
                dental tourism.
              </p>
            </div>

            {/* Purpose-Built for International Patients */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">
                  Purpose-Built for International Patients
                </h3>
              </div>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                Budapest's leading dental clinics are designed from the ground up for medical
                tourists. Expect multi-room facilities (Helvetic Clinics operates 16 treatment rooms
                and 3 surgical theatres), in-house dental labs for same-day fabrication, 3D imaging
                centres, and dedicated international patient coordinators. Some clinics even operate
                their own hotels.
              </p>
            </div>

            {/* Getting There from the UK */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <Plane className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">Getting There from the UK</h3>
              </div>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                Budapest is served by direct flights from London, Manchester, Edinburgh, and other UK
                cities. Flight time: 2–2.5 hours. Budget airlines (Ryanair, Wizz Air, easyJet) offer
                returns from approximately £40–£100. Budapest Ferenc Liszt International Airport is 30
                minutes from the city centre. Most clinic packages include free airport transfers.
              </p>
            </div>

            {/* Beyond the Dentist's Chair */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">Beyond the Dentist's Chair</h3>
              </div>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                Budapest offers a genuine tourism experience between appointments: thermal baths
                (Széchenyi, Gellért), UNESCO World Heritage sites, the Danube riverfront, ruin bars,
                and excellent restaurants. Many patients combine dental treatment with a city break,
                making the overall experience far more enjoyable than a UK waiting room.
              </p>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION H: RISKS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Risks of Dental Implants in Hungary — and How to Protect Yourself
          </h2>
          <p className="mt-2 max-w-3xl text-neutral-600">
            Every medical procedure carries some risk. Here's what to be aware of and how to minimise
            potential issues.
          </p>

          <div className="mt-6 space-y-4 sm:mt-8">
            {RISKS.map((item) => (
              <div
                key={item.risk}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900">{item.risk}</h3>
                    <p className="mt-1 text-sm text-neutral-500">{item.rate}</p>
                  </div>
                  <div className="sm:w-2/3">
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      <strong className="text-green-700">How to mitigate:</strong> {item.mitigation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust note */}
          <div className="mt-8 rounded-xl border border-primary-200 bg-primary-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
              <div>
                <h3 className="font-semibold text-primary-900">Why this matters</h3>
                <p className="mt-2 text-sm text-primary-800 leading-relaxed">
                  Most dental implant clinics in Hungary deliver excellent results. The key is doing
                  your research and choosing wisely. MeetYourClinic only lists clinics with verified EU
                  compliance, accreditations, and genuine patient reviews — we've done the initial due
                  diligence so you can focus on finding the right fit for your needs.
                </p>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION I: HUNGARY VS TURKEY COMPARISON
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Dental Implants in Hungary vs Turkey — How Do They Compare?
          </h2>
          <p className="mt-2 text-neutral-600">
            Deciding between Europe's two most popular dental tourism destinations? Here's a direct
            comparison.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Factor</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">
                    <div className="flex items-center gap-2">
                      <div className="w-5 overflow-hidden rounded-sm">
                        <HU title="Hungary" />
                      </div>
                      Hungary
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700">
                    <div className="flex items-center gap-2">
                      <div className="w-5 overflow-hidden rounded-sm">
                        <TR title="Turkey" />
                      </div>
                      Turkey
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, index) => (
                  <tr
                    key={row.factor}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}
                  >
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
              Hungary costs more than Turkey but offers EU regulatory protection, shorter travel,
              premium implant brands as standard, and easier UK follow-up access via London clinic
              offices. Turkey offers greater savings, especially for full-mouth work. Both are valid
              choices — the right destination depends on your budget, how much regulatory assurance
              matters to you, and your personal preference.
            </p>
            <Link
              href="/procedures/dental-implants/turkey"
              className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:underline"
            >
              Compare dental implant prices in Turkey
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION J: FAQ
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <FAQSection
            faqs={faqs}
            title="Frequently Asked Questions About Dental Implants in Hungary"
            className="faq-section"
          />
        </m.section>

        {/* =====================================================================
            SECTION K: CTA / CONVERSION BLOCK
            ===================================================================== */}
        <m.section {...fadeInUp}>
          <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white sm:p-8 lg:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Ready to Compare Dental Implant Clinics in Budapest?
              </h2>
              <p className="mt-3 text-primary-100 sm:mt-4 sm:text-lg">
                Use MeetYourClinic to compare verified Budapest clinics, see real prices, and read honest
                patient reviews. Get free, personalised quotes from EU-regulated clinics — with no
                obligation and no booking fees.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
                <Link href="/search?procedure=dental-implants&country=hungary">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Get Your Free Quote
                  </Button>
                </Link>
                <Link href="/search?procedure=dental-implants&country=hungary">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full text-white hover:bg-white/10 sm:w-auto"
                  >
                    Browse Verified Clinics in Budapest
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-primary-200">
                All clinics on MeetYourClinic are EU-regulated · Prices verified quarterly · No booking fees
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
            <Link
              href="/blog/dental-implants-abroad-cost-guide"
              className="text-primary-600 hover:underline"
            >
              Dental implants abroad cost guide
            </Link>{' '}
            ·{' '}
            <Link
              href="/procedures/dental-implants/turkey"
              className="text-primary-600 hover:underline"
            >
              Dental implants in Turkey
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/veneers/turkey" className="text-primary-600 hover:underline">
              Veneers in Turkey
            </Link>
          </p>
        </m.section>
      </div>
    </>
  )
}
