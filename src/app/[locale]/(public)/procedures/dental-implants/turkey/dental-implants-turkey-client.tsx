'use client'

import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { FAQSection } from '@/components/seo/faq-section'
import { AIAnswerBlock } from '@/components/seo/ai-answer-block'
import {
  CheckCircle,
  AlertTriangle,
  Plane,
  Shield,
  Clock,
  BadgeCheck,
  FileText,
  Users,
  Star,
  MapPin,
  Phone,
  Stethoscope,
  Award,
  ArrowRight,
} from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

interface DentalImplantsTurkeyClientProps {
  faqs: Array<{ question: string; answer: string }>
}

// =============================================================================
// STATIC DATA — PRICING TABLES
// =============================================================================

const SINGLE_IMPLANT_PRICES = [
  {
    treatment: 'Single implant (including crown)',
    turkeyPrice: '£300–£800',
    ukPrice: '£1,500–£3,000',
    saving: '60–75%',
  },
  {
    treatment: 'Single implant — Straumann',
    turkeyPrice: '£500–£800',
    ukPrice: '£2,200–£3,000',
    saving: '65–73%',
  },
  {
    treatment: 'Single implant — Nobel Biocare',
    turkeyPrice: '£450–£750',
    ukPrice: '£2,000–£2,800',
    saving: '68–73%',
  },
]

const FULL_MOUTH_PRICES = [
  {
    treatment: 'All-on-4 (single arch)',
    turkeyPrice: '£1,600–£3,200',
    ukPrice: '£7,000–£12,000',
    saving: '70–77%',
  },
  {
    treatment: 'All-on-6 (single arch)',
    turkeyPrice: '£2,500–£5,000',
    ukPrice: '£9,000–£14,000',
    saving: '64–72%',
  },
  {
    treatment: 'Full mouth (both arches)',
    turkeyPrice: '£4,000–£8,000',
    ukPrice: '£15,000–£25,000',
    saving: '68–73%',
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
    timeline: '3–5 days for placement, return visit after 3–6 months for permanent crown',
  },
  {
    name: 'All-on-4 Implants',
    description:
      'Four strategically placed implants support a full arch of fixed teeth. The angled rear implants maximise bone contact without needing bone grafts in most cases.',
    bestFor: 'Patients who have lost most or all teeth in one jaw',
    timeline: 'Often completed with temporary teeth on the same day as surgery',
    brands: 'Straumann Pro Arch, Nobel Biocare All-on-4',
  },
  {
    name: 'All-on-6 Implants',
    description:
      'Six implants per arch provide additional stability and distribute bite force more evenly. Recommended for patients with some bone loss who want extra security.',
    bestFor: 'Patients with moderate bone loss wanting maximum stability',
    timeline: 'Similar to All-on-4 with optional same-day temporary teeth',
  },
  {
    name: 'Implant-Supported Bridges',
    description:
      'When 3–4 adjacent teeth are missing, two implants can support a bridge spanning the gap. More cost-effective than placing individual implants for consecutive missing teeth.',
    bestFor: 'Patients with several consecutive missing teeth',
    timeline: 'Standard implant timeline with bridge placement at second visit',
  },
  {
    name: 'Titanium vs Zirconia Implants',
    description:
      'Titanium is the industry standard with 40+ years of clinical evidence and a 97%+ success rate. Zirconia implants are metal-free, tooth-coloured, and hypoallergenic — ideal for patients with metal sensitivity.',
    bestFor: 'Titanium for most patients; zirconia for metal sensitivity or high aesthetic demands',
    timeline: 'Same as standard implant procedures',
  },
]

// =============================================================================
// STATIC DATA — PROCEDURE STEPS
// =============================================================================

const PROCEDURE_STEPS = {
  beforeTravel: [
    'Remote consultation via WhatsApp or video call',
    'Share dental records, X-rays, or photos of your teeth',
    'Receive detailed treatment plan and itemised quote',
    'Book flights and accommodation (or use clinic package)',
  ],
  visit1: {
    title: 'Visit 1 — Assessment & Implant Placement (3–7 days)',
    steps: [
      'Day 1: Comprehensive examination, CBCT 3D scan, treatment plan confirmation',
      'Day 2–3: Extractions (if needed), bone grafting or sinus lift (if needed), implant placement under local anaesthesia',
      'Day 3–5: Temporary teeth fitted if applicable, follow-up checks and adjustments',
      'Recovery: Mild discomfort managed with prescribed painkillers, soft diet for 1–2 weeks',
    ],
  },
  healingPeriod: {
    title: 'Healing Period (3–6 months)',
    description:
      'During osseointegration, the implants fuse with your jawbone to create a solid foundation. Most clinics offer remote check-ins via WhatsApp or video call. Your UK dentist can also monitor healing progress locally.',
  },
  visit2: {
    title: 'Visit 2 — Permanent Crowns (3–5 days)',
    steps: [
      'Impressions or digital scan for your final crowns or bridge',
      'Crown fitting and bite adjustment for optimal comfort',
      'Final check-up and detailed aftercare instructions',
    ],
  },
}

// =============================================================================
// STATIC DATA — CLINIC SELECTION CRITERIA
// =============================================================================

const CLINIC_CHECKLIST = [
  {
    icon: Shield,
    title: 'Check accreditations',
    description:
      'Look for JCI (Joint Commission International), AACI (American Accreditation Commission International), or ISO certifications. Verify Turkish Ministry of Health registration. These standards ensure rigorous patient safety protocols.',
  },
  {
    icon: Award,
    title: 'Ask about implant brands',
    description:
      'Premium brands like Straumann, Nobel Biocare, and Astra Tech have the strongest clinical evidence. Be cautious of unnamed or "house brand" implants that lack long-term data.',
  },
  {
    icon: BadgeCheck,
    title: 'Verify dentist credentials',
    description:
      'Look for memberships in ITI (International Team for Implantology), ICOI, or the Turkish Dental Association. Many lead surgeons have performed 10,000+ implant placements.',
  },
  {
    icon: Star,
    title: 'Read verified reviews',
    description:
      'Check Trustpilot, Google Reviews, and dental tourism forums. Look for detailed reviews from UK patients specifically. Verify before/after photos are genuine.',
  },
  {
    icon: FileText,
    title: 'Understand aftercare & guarantees',
    description:
      'Reputable clinics offer lifetime guarantees on implant posts and 5–10 year guarantees on crowns. Ask about complication protocols and whether they have UK partner clinics.',
  },
  {
    icon: Users,
    title: 'medit advantage',
    description:
      'All clinics on medit are pre-vetted for accreditation, verified pricing, and genuine patient reviews. We do the due diligence so you can focus on your treatment.',
  },
]

// =============================================================================
// STATIC DATA — DESTINATIONS
// =============================================================================

const DESTINATIONS = [
  {
    city: 'Antalya',
    description:
      "Turkey's dental tourism capital with the highest concentration of AACI-accredited clinics. The Mediterranean climate makes for a pleasant recovery. Flights from the UK take 4–4.5 hours and cost from approximately £100 return. Lower overhead costs mean more competitive pricing than Istanbul.",
    highlight: 'Best value and highest clinic concentration',
  },
  {
    city: 'Istanbul',
    description:
      "Turkey's largest city offers the widest selection of dental clinics. Ideal for patients who want to combine treatment with sightseeing in one of the world's great cities. Higher clinic density means intense competition, though overhead costs are higher than other Turkish cities.",
    highlight: 'Most clinic options, city break potential',
  },
  {
    city: 'Izmir',
    description:
      'An emerging dental tourism hub on the Aegean coast. Fewer tourists mean a quieter experience with competitive pricing. Growing reputation for quality care with a more relaxed atmosphere than Istanbul or Antalya.',
    highlight: 'Quieter alternative, growing reputation',
  },
]

// =============================================================================
// STATIC DATA — RISKS
// =============================================================================

const RISKS = [
  {
    risk: 'Implant failure',
    rate: 'Occurs in 2–5% of cases globally',
    mitigation:
      'Choose clinics with documented success rates exceeding 95%. Use premium implant brands with long-term clinical evidence. Follow aftercare instructions precisely.',
  },
  {
    risk: 'Infection',
    rate: 'Small risk with any surgical procedure',
    mitigation:
      'Turkish clinics operate under strict sterilisation protocols. Ask about infection control standards. Complete the full course of prescribed antibiotics.',
  },
  {
    risk: 'Unqualified clinics',
    rate: 'Risk varies significantly',
    mitigation:
      "Always verify accreditation and request the clinic's Turkish Ministry of Health registration number. Avoid clinics that cannot provide credentials.",
  },
  {
    risk: 'Aftercare complications in the UK',
    rate: 'Manageable with planning',
    mitigation:
      'Choose a clinic with a clear complication protocol. Some clinics partner with UK practices. Your NHS or private UK dentist can manage routine follow-up.',
  },
  {
    risk: 'Unrealistic expectations',
    rate: 'Depends on individual factors',
    mitigation:
      'Results depend on bone density, oral health, and aftercare compliance. Good clinics are transparent about limitations during your consultation.',
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

export function DentalImplantsTurkeyClient({ faqs }: DentalImplantsTurkeyClientProps) {
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
              Dental Implants in Turkey: Prices, Clinics & What UK Patients Need to Know
            </h1>
            <p className="mt-4 text-base text-primary-100 sm:mt-6 sm:text-lg lg:text-xl">
              Compare verified clinics, real prices, and UK patient reviews — all in one place.
            </p>
            <p className="mt-4 text-primary-200 leading-relaxed">
              Turkey is the world's most popular destination for dental implants abroad, with UK
              patients saving 60–70% compared to private treatment at home. But not all clinics are
              equal. medit helps you compare accredited options, understand what's included, and make
              an informed decision.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link href="/search?procedure=dental-implants&country=turkey">
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
                  View 2026 Prices
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Strip */}
          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/20 pt-8 text-sm text-primary-200 sm:mt-12 sm:gap-6">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              AACI-accredited clinics only
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
            SECTION B: WHY UK PATIENTS CHOOSE TURKEY
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Why UK Patients Choose Turkey for Dental Implants
          </h2>

          <div className="mt-6 space-y-4 text-neutral-700 sm:mt-8 sm:space-y-6">
            <p className="text-base leading-relaxed sm:text-lg">
              <strong>Cost savings that make treatment accessible.</strong> A single dental implant
              costs £1,500–£3,000 in a UK private practice. In Turkey, the same procedure — using
              premium implant brands like Straumann or Nobel Biocare — costs £300–£800. Full-mouth
              restorations using the All-on-4 system start from £1,600 per arch in Turkey, compared
              to £7,000 or more in the UK. Even factoring in flights and accommodation, patients
              typically save 50–60% on the total cost.
            </p>

            <p className="leading-relaxed">
              <strong>Quality of care matches international standards.</strong> Turkish dental
              clinics use the same implant brands and materials as UK practices. Many hold JCI
              (Joint Commission International) or AACI accreditation — the same standards applied
              to leading hospitals worldwide. Turkish dentists often train in UK or EU dental
              schools, and many have decades of experience with high patient volumes that UK
              dentists rarely match.
            </p>

            <p className="leading-relaxed">
              <strong>No waiting lists.</strong> With NHS dental care increasingly difficult to
              access, many UK patients face months of waiting for treatment. In Turkey, treatment
              can begin within days of arrival. A full assessment, 3D imaging, and implant
              placement are often completed in a single visit, with dedicated patient coordinators
              managing every detail.
            </p>

            <p className="leading-relaxed">
              <strong>Infrastructure built for international patients.</strong> Turkey treated over
              750,000 dental tourists in 2024 alone. Clinics are equipped for international
              patients with English-speaking staff, airport transfers, hotel partnerships, and
              WhatsApp coordination as standard. The country's experience in medical tourism
              translates to a smooth patient journey from first enquiry to final follow-up.
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION C: PRICING
            ===================================================================== */}
        <m.section {...fadeInUp} id="pricing" className="mb-16 scroll-mt-8 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            How Much Do Dental Implants Cost in Turkey?
          </h2>
          <p className="mt-2 text-neutral-600">
            Prices updated February 2026. All prices in GBP (£).
          </p>

          {/* AEO Block — Primary pricing statement */}
          <div
            className="mt-6 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 p-4 sm:p-6 border border-primary-100"
            data-aeo="dental-implants-turkey-cost"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block cost-summary">
              A single dental implant in Turkey costs between £300 and £800 including the crown,
              compared with £1,500 to £3,000 in the UK. Full-mouth restorations using the All-on-4
              system start from approximately £1,600 per arch in Turkey, versus £7,000 or more in
              the UK. Prices are typically all-inclusive, covering consultation, 3D imaging, the
              implant, abutment, crown, and follow-up appointments.
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
                    Turkey Price
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
                      {row.turkeyPrice}
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
                    Turkey Price
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
                      {row.turkeyPrice}
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
            Most Turkish dental clinics offer all-inclusive packages that cover: initial
            consultation and assessment, 3D panoramic X-ray or CBCT scan, the implant post,
            abutment and crown, temporary prosthesis (if needed during healing), local anaesthesia
            and any required medications, follow-up appointments during your stay, and often hotel
            accommodation plus airport transfers. Always confirm exactly what's included in your
            quote before booking.
          </p>

          {/* What Affects Cost */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">
            What Can Affect Your Final Cost
          </h3>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            Several factors influence the final price of dental implants in Turkey: the implant
            brand (premium brands like Straumann cost more than budget alternatives), the number of
            implants required, whether you need preparatory work such as bone grafting or sinus
            lift procedures, your choice of crown material (titanium vs zirconia), and the city
            (Istanbul typically has higher overheads than Antalya or Izmir). Request an itemised
            quote that breaks down each element so you can compare like-for-like.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/search?procedure=dental-implants&country=turkey">
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
            Types of Dental Implants Available in Turkey
          </h2>
          <p className="mt-2 text-neutral-600">
            Turkish clinics offer the full range of implant solutions for every clinical situation
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

          {/* Link to veneers */}
          <p className="mt-6 text-neutral-600">
            Considering other cosmetic dental treatments?{' '}
            {/* TODO: link to /procedures/veneers/turkey */}
            <span className="text-primary-600">Veneers in Turkey</span> are also popular with UK
            patients seeking smile makeovers.
          </p>
        </m.section>

        {/* =====================================================================
            SECTION E: PROCEDURE STEP BY STEP
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            What to Expect: The Dental Implant Procedure in Turkey
          </h2>
          <p className="mt-2 text-neutral-600">
            A step-by-step guide to your treatment journey
          </p>

          {/* AEO Block — Procedure overview */}
          <div
            className="mt-6 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 p-4 sm:p-6 border border-primary-100"
            data-aeo="dental-implant-procedure-turkey"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block procedure-summary">
              Dental implant treatment in Turkey typically requires two visits. The first visit
              (3–7 days) covers assessment, imaging, and implant placement. After a healing period
              of 3–6 months for osseointegration, a second visit (3–5 days) is needed for
              permanent crown or bridge fitting. Some clinics offer same-day implant solutions
              where temporary teeth are placed immediately after surgery.
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
            How to Choose a Safe, Reputable Dental Implant Clinic in Turkey
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
            <Link href="/search?procedure=dental-implants&country=turkey">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Verified Clinics in Turkey
              </Button>
            </Link>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION G: DESTINATIONS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Where to Get Dental Implants in Turkey
          </h2>
          <p className="mt-2 text-neutral-600">
            The most popular cities for UK dental tourists
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-3">
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
                  <MapPin className="h-5 w-5 text-primary-500" />
                </div>
                <span className="mt-2 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  {destination.highlight}
                </span>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  {destination.description}
                </p>
                {/* TODO: link to /destinations/turkey/antalya etc when built */}
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-600">
                  View clinics in {destination.city}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION H: RISKS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Risks of Dental Implants in Turkey — and How to Protect Yourself
          </h2>
          <p className="mt-2 max-w-3xl text-neutral-600">
            Every medical procedure carries some risk. Here's what to be aware of and how to
            minimise potential issues.
          </p>

          <div className="mt-6 space-y-4 sm:mt-8">
            {RISKS.map((item, index) => (
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
                  Most dental implant clinics in Turkey deliver excellent results. The key is
                  doing your research and choosing wisely. medit only lists clinics with verified
                  accreditations and genuine patient reviews — we've done the initial due diligence
                  so you can focus on finding the right fit for your needs.
                </p>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION I: FAQ
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <FAQSection
            faqs={faqs}
            title="Frequently Asked Questions About Dental Implants in Turkey"
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
                Ready to Compare Dental Implant Clinics in Turkey?
              </h2>
              <p className="mt-3 text-primary-100 sm:mt-4 sm:text-lg">
                Use medit to compare verified clinics, see real prices, and read honest patient
                reviews. Get free, personalised quotes from accredited clinics in Antalya,
                Istanbul, or Izmir — with no obligation.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
                <Link href="/search?procedure=dental-implants&country=turkey">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Get Your Free Quote
                  </Button>
                </Link>
                <Link href="/search?procedure=dental-implants&country=turkey">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full text-white hover:bg-white/10 sm:w-auto"
                  >
                    Browse Verified Clinics in Turkey
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-primary-200">
                All clinics on medit are independently accredited · Prices verified quarterly · No
                booking fees
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
            {/* TODO: link to /blog/dental-implants-abroad-cost-guide */}
            <span className="text-neutral-500">Dental implants abroad cost guide</span>
            {' '}·{' '}
            {/* TODO: link to /procedures/veneers/turkey */}
            <span className="text-neutral-500">Veneers in Turkey</span>
          </p>
        </m.section>
      </div>
    </>
  )
}
