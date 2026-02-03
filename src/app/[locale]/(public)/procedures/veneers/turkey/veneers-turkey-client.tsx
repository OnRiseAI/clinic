'use client'

import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { FAQSection } from '@/components/seo/faq-section'
import {
  CheckCircle,
  AlertTriangle,
  Plane,
  Shield,
  Clock,
  BadgeCheck,
  FileText,
  Star,
  MapPin,
  ArrowRight,
  Sparkles,
  Palette,
  Eye,
  Zap,
} from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

interface VeneersTurkeyClientProps {
  faqs: Array<{ question: string; answer: string }>
}

// =============================================================================
// STATIC DATA — PRICING TABLES
// =============================================================================

const PRICE_PER_TOOTH = [
  {
    treatment: 'Composite veneers',
    turkeyPrice: '£100–£250',
    ukPrice: '£250–£500',
    saving: '50–60%',
  },
  {
    treatment: 'E-max porcelain veneers',
    turkeyPrice: '£200–£350',
    ukPrice: '£600–£1,200',
    saving: '65–75%',
  },
  {
    treatment: 'Zirconia veneers',
    turkeyPrice: '£150–£200',
    ukPrice: '£400–£800',
    saving: '60–75%',
  },
  {
    treatment: 'Porcelain (feldspathic) veneers',
    turkeyPrice: '£200–£450',
    ukPrice: '£500–£1,000',
    saving: '55–60%',
  },
  {
    treatment: 'Lumineers / ultra-thin veneers',
    turkeyPrice: '£250–£400',
    ukPrice: '£700–£1,200',
    saving: '60–67%',
  },
]

const FULL_SET_PRICES = [
  {
    treatment: 'Full set — composite (16–20 teeth)',
    turkeyPrice: '£1,600–£5,000',
    ukPrice: '£4,000–£10,000',
    saving: '50–60%',
  },
  {
    treatment: 'Full set — E-max porcelain (16–20 teeth)',
    turkeyPrice: '£3,200–£7,000',
    ukPrice: '£9,600–£24,000',
    saving: '65–71%',
  },
  {
    treatment: 'Full set — zirconia (16–20 teeth)',
    turkeyPrice: '£2,400–£4,000',
    ukPrice: '£6,400–£16,000',
    saving: '60–75%',
  },
]

// =============================================================================
// STATIC DATA — VENEER TYPES
// =============================================================================

const VENEER_TYPES = [
  {
    name: 'E-max Porcelain Veneers',
    description:
      'The gold standard for cosmetic veneers worldwide. Made from lithium disilicate ceramic (IPS e.max by Ivoclar Vivadent). Exceptional translucency that mimics natural tooth enamel. Strong enough for front and back teeth.',
    lifespan: '10–15 years with proper care',
    bestFor: 'Patients who want the most natural-looking, durable result',
  },
  {
    name: 'Zirconia Veneers',
    description:
      'Made from zirconium dioxide — extremely strong and chip-resistant. Slightly less translucent than E-max, but newer "multi-layered" zirconia is closing the gap. Often recommended for patients who grind their teeth (bruxism).',
    lifespan: '15–20 years',
    bestFor: 'Patients who prioritise durability and strength, or who have bruxism',
  },
  {
    name: 'Composite Veneers',
    description:
      'Applied directly to the tooth surface and sculpted by hand. No lab fabrication needed — can be completed in a single session of 2–3 hours. Less expensive than porcelain but more prone to staining and chipping.',
    lifespan: '5–7 years',
    bestFor: 'Budget-conscious patients, younger patients, or those wanting a reversible option',
  },
  {
    name: 'Lumineers / Ultra-Thin Veneers',
    description:
      'A brand-name type of ultra-thin porcelain veneer (0.2mm–0.5mm) that requires minimal or no tooth preparation. The tooth structure underneath is largely preserved, making this option more reversible than traditional veneers. However, they may not be suitable for heavily discoloured teeth.',
    lifespan: '10–20 years',
    bestFor: 'Patients who want to preserve their natural tooth structure',
  },
]

// =============================================================================
// STATIC DATA — MATERIAL COMPARISON
// =============================================================================

const MATERIAL_COMPARISON = [
  { feature: 'Appearance', porcelain: 'Highly natural, translucent', composite: 'Good but less natural' },
  { feature: 'Durability', porcelain: '10–20 years', composite: '5–7 years' },
  { feature: 'Stain resistance', porcelain: 'Excellent', composite: 'Moderate (stains over time)' },
  { feature: 'Tooth preparation', porcelain: 'Moderate (0.3–0.7mm removed)', composite: 'Minimal or none' },
  { feature: 'Treatment time', porcelain: '5–7 days (lab fabrication)', composite: '2–3 days (chairside)' },
  { feature: 'Cost (Turkey)', porcelain: '£200–£450/tooth', composite: '£100–£250/tooth' },
  { feature: 'Reversibility', porcelain: 'Generally irreversible', composite: 'Partially reversible' },
]

// =============================================================================
// STATIC DATA — PROCEDURE STEPS
// =============================================================================

const PROCEDURE_STEPS = {
  beforeTravel: [
    'Remote consultation (WhatsApp, video call, or email)',
    'Share photos of your teeth (front, side, and smile view)',
    'Discuss goals: shade, shape, number of teeth',
    'Receive digital smile design preview and treatment plan',
    'Book flights and accommodation (or use clinic package)',
  ],
  day1: {
    title: 'Day 1 — Consultation & Preparation',
    steps: [
      'Comprehensive dental examination and X-rays',
      'Digital smile design (DSD): see a preview of your new smile before any work begins',
      "Shade selection: choose a natural shade with your dentist's guidance",
      'Tooth preparation: a thin layer of enamel is removed (0.3–0.7mm for porcelain)',
      'Impressions or digital scan sent to the in-house lab',
      'Temporary veneers fitted to protect prepared teeth',
    ],
  },
  labDays: {
    title: 'Days 2–5 — Lab Fabrication',
    description:
      "The dental lab crafts your veneers — typically 2–4 days for porcelain. Some clinics have in-house CAD/CAM labs that can produce veneers in 24–48 hours. You're free to explore the city, relax, or enjoy your hotel. Temporary veneers allow you to eat and speak normally.",
  },
  finalDays: {
    title: 'Day 5–7 — Fitting & Final Adjustments',
    steps: [
      'Temporary veneers removed',
      'Permanent veneers tried in and checked for fit, colour, and bite',
      'Veneers bonded permanently using dental-grade adhesive',
      'Final bite adjustment and polishing',
      'Aftercare instructions provided (care guide, what to avoid in first 48 hours)',
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
      'Look for JCI (Joint Commission International), AACI, ISO certifications, or Turkish Ministry of Health registration. These mean the clinic meets internationally audited standards for hygiene, equipment, and patient safety.',
  },
  {
    icon: FileText,
    title: 'Demand material transparency',
    description:
      'Ask which brand and type of porcelain the clinic uses. Reputable clinics will name the specific material (e.g., "IPS e.max by Ivoclar Vivadent") and provide a material certificate.',
  },
  {
    icon: Eye,
    title: 'Require digital smile design',
    description:
      "A good cosmetic clinic will show you a digital preview of your result before touching your teeth. If a clinic doesn't offer DSD, consider it a red flag.",
  },
  {
    icon: Sparkles,
    title: 'Review before/after portfolios',
    description:
      'Ask to see a wide range of cases — not just the most dramatic transformations. Look for natural-looking results, not just ultra-white "Hollywood" smiles.',
  },
  {
    icon: BadgeCheck,
    title: 'Verify dentist credentials',
    description:
      'Look for membership in cosmetic dentistry associations (e.g., AACD, Turkish Academy of Aesthetic Dentistry). Ask how many veneer cases the dentist completes per year.',
  },
  {
    icon: Star,
    title: 'Check warranties',
    description:
      'Reputable clinics offer 5–15 year warranties on porcelain veneers. Check what the warranty covers and whether it includes replacement or just repair.',
  },
]

// =============================================================================
// STATIC DATA — DESTINATIONS
// =============================================================================

const DESTINATIONS = [
  {
    city: 'Antalya',
    description:
      "Turkey's cosmetic dentistry capital and the most popular destination for veneer tourists. Highest concentration of purpose-built dental clinics catering to international patients. Mediterranean climate — combine your treatment with a beach holiday. Flights from UK: 4–4.5 hours, from ~£100 return.",
    highlight: 'Most popular, best value',
  },
  {
    city: 'Istanbul',
    description:
      'The largest city with the widest range of clinics and styles. Ideal for patients who want to combine their dental trip with world-class sightseeing, food, and culture. Slightly higher clinic overheads can mean marginally higher prices, but the selection and competition keep quality high.',
    highlight: 'Most clinic options, city break',
  },
  {
    city: 'Izmir',
    description:
      'Emerging cosmetic dentistry destination on the Aegean coast. Quieter and more relaxed than Antalya or Istanbul. Competitive pricing and a growing reputation for quality cosmetic work. Good option for patients who prefer a less touristy experience.',
    highlight: 'Quieter, competitive pricing',
  },
]

// =============================================================================
// STATIC DATA — RISKS
// =============================================================================

const RISKS = [
  {
    risk: 'Over-preparation of teeth',
    description: 'The biggest risk. Some clinics aggressively shave down healthy teeth to stumps, which is irreversible and can lead to sensitivity, nerve damage, or the need for root canals later.',
    mitigation:
      'Choose a clinic that uses minimal-prep techniques and shows you the preparation plan beforehand.',
  },
  {
    risk: 'Poor shade matching',
    description: "Ending up with veneers that look unnaturally white or don't match your remaining teeth.",
    mitigation:
      'Discuss shade carefully with your dentist, look at shade samples in natural light, and ask for a digital smile design preview.',
  },
  {
    risk: 'Bonding failure',
    description: "Veneers can debond if the adhesive application isn't precise.",
    mitigation:
      'Reputable clinics use rubber dam isolation and follow manufacturer protocols exactly. Ask about their bonding process.',
  },
  {
    risk: 'Sensitivity',
    description: 'Some tooth sensitivity is normal for 1–2 weeks after preparation. Prolonged sensitivity may indicate over-preparation or nerve involvement.',
    mitigation:
      'Choose a clinic that prioritises conservative preparation techniques.',
  },
  {
    risk: 'Unqualified clinics',
    description: "Turkey's dental tourism boom has attracted clinics that prioritise volume over quality.",
    mitigation:
      "Always verify accreditation, ask for the clinic's Turkish Ministry of Health registration number, and check independent reviews (Google, Trustpilot).",
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

export function VeneersTurkeyClient({ faqs }: VeneersTurkeyClientProps) {
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
              Veneers in Turkey: Prices, Materials & What UK Patients Need to Know
            </h1>
            <p className="mt-4 text-base text-primary-100 sm:mt-6 sm:text-lg lg:text-xl">
              Compare verified clinics, real prices, and UK patient reviews — find the right
              veneers for your smile.
            </p>
            <p className="mt-4 text-primary-200 leading-relaxed">
              Turkey has become the world's most popular destination for dental veneers, with UK
              patients saving 60–75% compared to private treatment at home. Whether you're
              considering porcelain, E-max, or composite veneers, medit helps you compare
              accredited clinics, understand the differences between materials, and make an
              informed choice.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link href="/search?procedure=veneers&country=turkey">
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
              Accredited clinics only
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
            Why UK Patients Choose Turkey for Veneers
          </h2>

          <div className="mt-6 space-y-4 text-neutral-700 sm:mt-8 sm:space-y-6">
            <p className="text-base leading-relaxed sm:text-lg">
              <strong>Cost savings that make a smile transformation accessible.</strong> E-max
              porcelain veneers cost £200–£350 per tooth in Turkey, compared to £600–£1,200 in the
              UK. A full set of 16–20 veneers costs £3,200–£7,000 in Turkey versus £9,600–£24,000+
              in the UK. Even including flights, hotel, and spending money, total cost is typically
              60–75% less than equivalent treatment at home.
            </p>

            <p className="leading-relaxed">
              <strong>Premium materials, identical to UK practices.</strong> Turkish clinics use
              the same materials as the best UK practices — IPS e.max by Ivoclar Vivadent (the
              global gold standard for porcelain veneers), zirconia from major manufacturers, and
              German dental ceramics. Many clinics have in-house CAD/CAM laboratories for same-day
              precision fabrication.
            </p>

            <p className="leading-relaxed">
              <strong>Single-trip treatment.</strong> Unlike{' '}
              <Link href="/procedures/dental-implants/turkey" className="text-primary-600 hover:underline">
                dental implants
              </Link>{' '}
              (which require two visits separated by 3–6 months), veneers can be completed in a
              single trip of 5–7 days for porcelain, or 2–3 days for composite veneers. This makes
              veneers one of the most convenient dental treatments to have abroad.
            </p>

            <p className="leading-relaxed">
              <strong>Scale and experience.</strong> Turkish cosmetic dentists perform
              exceptionally high volumes of veneer work — some placing 10,000+ veneers per year.
              This level of experience, combined with purpose-built cosmetic dentistry facilities,
              creates a degree of specialism that's difficult to match at individual UK practices.
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION C: PRICING
            ===================================================================== */}
        <m.section {...fadeInUp} id="pricing" className="mb-16 scroll-mt-8 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            How Much Do Veneers Cost in Turkey?
          </h2>
          <p className="mt-2 text-neutral-600">
            Prices updated February 2026. All prices in GBP (£).
          </p>

          {/* AEO Block — Primary pricing statement */}
          <div
            className="mt-6 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 p-4 sm:p-6 border border-primary-100"
            data-aeo="veneers-turkey-cost"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block cost-summary">
              A single E-max porcelain veneer in Turkey costs between £200 and £350, compared with
              £600 to £1,200 in the UK — a saving of up to 75%. A full set of 16 to 20 porcelain
              veneers typically costs £3,200 to £7,000 in Turkey, versus £9,600 to £24,000 in the
              UK. Prices are usually all-inclusive, covering consultation, digital smile design,
              preparation, temporary and permanent veneers, and follow-up appointments.
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
                    Turkey Price (£/tooth)
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

          {/* Full-Set Prices Table */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">Full-Set Prices</h3>
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
                {FULL_SET_PRICES.map((row, index) => (
                  <tr
                    key={row.treatment}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}
                  >
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-neutral-900">
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
            Most Turkish clinics offer all-inclusive packages covering: initial consultation,
            digital smile design (DSD), tooth preparation, temporary veneers (worn while permanent
            ones are fabricated), permanent veneer fitting, bite adjustment, follow-up appointment,
            and often hotel accommodation plus airport transfers. Some clinics bundle flights into
            the package; others quote treatment only. Always confirm exactly what's included before
            booking.
          </p>

          {/* What Affects Cost */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">
            What Can Affect Your Final Cost
          </h3>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            Several factors influence the final price: material choice (E-max commands a premium
            over composite), number of teeth (full set vs partial — e.g., only the upper front 8),
            complexity of preparation required, whether any underlying dental work is needed first
            (fillings, root canals, gum treatment), and city (Istanbul typically has slightly higher
            overheads than Antalya or Izmir).
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/search?procedure=veneers&country=turkey">
              <Button size="lg" className="w-full sm:w-auto">
                Get Your Free Quote
              </Button>
            </Link>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION D: "TURKEY TEETH" CONVERSATION
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                  "Turkey Teeth" — What the Trend Gets Right (and Wrong)
                </h2>

                <div className="mt-6 space-y-4 text-neutral-700">
                  <p className="leading-relaxed">
                    <strong>What "Turkey teeth" means:</strong> The colloquial term used (often
                    negatively) to describe an overly uniform, ultra-white, artificial-looking
                    veneer result — the "chiclet teeth" look that went viral on social media.
                  </p>

                  <p className="leading-relaxed">
                    <strong>Why it happens:</strong> Aggressive tooth preparation (shaving teeth
                    down to pegs), clinics prioritising speed over aesthetics, patients choosing
                    unnaturally white shades, and poor-quality materials. This is a{' '}
                    <em>clinic quality</em> issue, not a Turkey-wide issue.
                  </p>

                  <p className="leading-relaxed">
                    <strong>How to avoid it:</strong> Choose a clinic that uses digital smile
                    design (DSD) to preview your result before any tooth preparation. Ask to see a
                    range of before/after cases — not just the whitest results. Discuss shade
                    selection carefully (B1 and BL1 are natural bright; "Hollywood white" shades
                    like 0M1 can look artificial). Opt for minimal-prep or no-prep veneers where
                    possible.
                  </p>

                  <p className="leading-relaxed">
                    <strong>The honest truth:</strong> Thousands of UK patients get beautiful,
                    natural-looking veneers in Turkey every year. The "Turkey teeth" horror stories
                    represent a minority of outcomes, typically from unvetted, bargain-basement
                    clinics. Choosing an accredited clinic with a proven portfolio is the single
                    best way to avoid this outcome.
                  </p>

                  <p className="leading-relaxed">
                    <strong>medit's role:</strong> All clinics on medit are pre-vetted for
                    accreditation, verified portfolios, and genuine patient reviews. We show you
                    the full range of results — not just marketing photos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION E: TYPES OF VENEERS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Types of Veneers Available in Turkey
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
                  <span className="rounded-full bg-primary-50 px-3 py-1 text-primary-700">
                    <strong>Lifespan:</strong> {type.lifespan}
                  </span>
                  <span className="rounded-full bg-green-50 px-3 py-1 text-green-700">
                    <strong>Best for:</strong> {type.bestFor}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Porcelain vs Composite Comparison */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">
            Porcelain vs Composite — Quick Comparison
          </h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[400px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Feature</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">
                    Porcelain (E-max/Zirconia)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Composite</th>
                </tr>
              </thead>
              <tbody>
                {MATERIAL_COMPARISON.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}
                  >
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-neutral-900">
                      {row.feature}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-700">
                      {row.porcelain}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-700">
                      {row.composite}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION F: PROCEDURE STEP BY STEP
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            What to Expect: The Veneer Procedure in Turkey
          </h2>
          <p className="mt-2 text-neutral-600">
            Unlike dental implants, veneers are completed in a single trip
          </p>

          {/* AEO Block — Procedure overview */}
          <div
            className="mt-6 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 p-4 sm:p-6 border border-primary-100"
            data-aeo="veneer-procedure-turkey"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block procedure-summary">
              Porcelain veneer treatment in Turkey typically takes 5 to 7 days in a single trip.
              Day one covers consultation, digital smile design, shade selection, and tooth
              preparation. The dental lab then fabricates the veneers over 2 to 4 days. On the
              final days, permanent veneers are bonded, adjusted, and polished. Composite veneers
              can be completed in 2 to 3 days as they are applied directly without lab fabrication.
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

          {/* Day 1 */}
          <div className="mt-8">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-neutral-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
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
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
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
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
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
          <div className="mt-8 rounded-xl border border-primary-200 bg-primary-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
              <div>
                <h4 className="font-semibold text-primary-900">Composite Veneers — Faster Timeline</h4>
                <p className="mt-2 text-sm text-primary-800 leading-relaxed">
                  For composite veneers, the process is simpler: preparation and application happen
                  in the same session, typically completed in 2–3 days total. No lab fabrication is
                  needed — the composite is sculpted directly onto the tooth and cured with UV light.
                </p>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION G: CHOOSING A CLINIC
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            How to Choose a Safe, Reputable Veneer Clinic in Turkey
          </h2>
          <p className="mt-2 max-w-3xl text-neutral-600">
            Your choice of clinic determines your result. Use this checklist to evaluate your
            options.
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

          {/* medit advantage callout */}
          <div className="mt-8 rounded-xl border border-primary-200 bg-primary-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
              <div>
                <h3 className="font-semibold text-primary-900">medit advantage</h3>
                <p className="mt-2 text-sm text-primary-800 leading-relaxed">
                  All clinics on medit are pre-vetted for accreditation, verified pricing, genuine
                  portfolios, and material transparency. We do the due diligence so you can focus
                  on your smile.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/search?procedure=veneers&country=turkey">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Verified Clinics in Turkey
              </Button>
            </Link>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION H: DESTINATIONS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Where to Get Veneers in Turkey
          </h2>
          <p className="mt-2 text-neutral-600">
            The most popular cities for UK veneer patients
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
            SECTION I: RISKS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Risks of Veneers in Turkey — and How to Protect Yourself
          </h2>
          <p className="mt-2 max-w-3xl text-neutral-600">
            Every cosmetic procedure carries some risk. Here's what to be aware of and how to
            minimise potential issues.
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
                    <p className="mt-1 text-sm text-neutral-500">{item.description}</p>
                  </div>
                  <div className="sm:w-1/2">
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      <strong className="text-green-700">How to mitigate:</strong> {item.mitigation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Aftercare note */}
          <div className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
            <h3 className="font-semibold text-neutral-900">Aftercare at Home</h3>
            <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
              Your UK dentist should be able to provide routine follow-up care. For issues with the
              veneers themselves, check whether your Turkish clinic has a complication protocol or
              UK partner practice before you book.
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION J: FAQ
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <FAQSection
            faqs={faqs}
            title="Frequently Asked Questions About Veneers in Turkey"
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
                Ready to Compare Veneer Clinics in Turkey?
              </h2>
              <p className="mt-3 text-primary-100 sm:mt-4 sm:text-lg">
                Use medit to compare verified clinics, see real prices, and read honest patient
                reviews. Get free, personalised quotes for E-max, zirconia, or composite veneers
                from accredited clinics in Antalya, Istanbul, or Izmir — with no obligation.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
                <Link href="/search?procedure=veneers&country=turkey">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Get Your Free Quote
                  </Button>
                </Link>
                <Link href="/search?procedure=veneers&country=turkey">
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
                All clinics on medit are independently accredited · Prices verified quarterly ·
                Material certificates available · No booking fees
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
            <Link href="/procedures/dental-implants/turkey" className="text-primary-600 hover:underline">
              Dental implants in Turkey
            </Link>
            {' '}·{' '}
            {/* TODO: link to /blog/dental-implants-abroad-cost-guide */}
            <span className="text-neutral-500">Dental treatment abroad cost guide</span>
          </p>
        </m.section>
      </div>
    </>
  )
}
