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
  CreditCard,
  Languages,
  ArrowRight,
  Award,
  Sun,
} from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

interface DentalImplantsSpainClientProps {
  faqs: Array<{ question: string; answer: string }>
}

// =============================================================================
// STATIC DATA — PRICING TABLES
// =============================================================================

const IMPLANT_PRICES = [
  {
    procedure: 'Single Implant (with crown)',
    spainPrice: '£900–£1,400',
    ukPrice: '£2,300–£4,000',
    saving: 'Up to 65%',
  },
  {
    procedure: 'All-on-4 (per jaw)',
    spainPrice: '£5,500–£8,000',
    ukPrice: '£12,000–£15,000+',
    saving: 'Up to 60%',
  },
  {
    procedure: 'All-on-4 (per jaw) — premium package',
    spainPrice: '£8,000–£14,000',
    ukPrice: '£15,000–£20,000+',
    saving: 'Up to 50%',
  },
  {
    procedure: 'All-on-6 (per jaw)',
    spainPrice: '£7,000–£10,000',
    ukPrice: '£14,000–£18,000+',
    saving: 'Up to 55%',
  },
  {
    procedure: 'Bone Graft (if required)',
    spainPrice: '£300–£700',
    ukPrice: '£500–£1,200',
    saving: 'Up to 55%',
  },
  {
    procedure: 'Sinus Lift (if required)',
    spainPrice: '£500–£1,000',
    ukPrice: '£1,000–£2,500',
    saving: 'Up to 60%',
  },
]

const PACKAGE_PRICES = [
  {
    package: 'Single Implant + Crown + Hotel + Transfers',
    spainPrice: '£1,200–£1,800',
    ukPrice: 'N/A',
    saving: '—',
  },
  {
    package: 'All-on-4 (one jaw) + Zirconia Bridge + Hotel',
    spainPrice: '£10,000–£17,000',
    ukPrice: '£15,000–£20,000',
    saving: '£3,000–£8,000',
  },
  {
    package: 'Full Mouth (both jaws) + Hotel + Transfers',
    spainPrice: '£16,000–£28,000',
    ukPrice: '£30,000–£40,000+',
    saving: '£10,000–£20,000',
  },
]

// =============================================================================
// STATIC DATA — IMPLANT BRANDS
// =============================================================================

const IMPLANT_BRANDS = [
  {
    name: 'Straumann Implants',
    origin: 'Swiss',
    tier: 'Premium',
    price: '£900–£1,400 per implant',
    description:
      'Industry-leading titanium and ceramic implants with a 98.8% ten-year survival rate. Available at Teknon, Nart, and most Barcelona clinics. The gold standard in implantology.',
  },
  {
    name: 'Nobel Biocare Implants',
    origin: 'Swedish',
    tier: 'Premium',
    price: '£850–£1,300 per implant',
    description:
      'Pioneer of modern implant dentistry. Digital planning via NobelClinician software. Widely used for All-on-4 restorations at Barcelona clinics.',
  },
  {
    name: 'MIS Implants',
    origin: 'Israeli',
    tier: 'Mid-Premium',
    price: '£700–£1,000 per implant',
    description:
      'High-quality mid-range option with strong presence in the Spanish market. Excellent clinical track record and more affordable than Swiss/Swedish brands.',
  },
]

const IMPLANT_TYPES = [
  {
    name: 'All-on-4 System',
    description:
      'Four strategically placed implants supporting a full arch of teeth. Fixed, non-removable prosthesis with same-day temporary teeth possible. Centro Médico Teknon offers this with JCI accreditation — a rare combination globally.',
    bestFor: 'Full arch replacement, patients wanting fixed teeth quickly',
  },
  {
    name: 'All-on-6 System',
    description:
      'Six implants per arch for enhanced stability. Better for patients with higher bite forces or more advanced bone loss. Premium option at Barcelona clinics.',
    bestFor: 'Patients with bone loss, those wanting maximum stability',
  },
  {
    name: 'Zirconia Implants',
    description:
      'Metal-free ceramic option for premium aesthetics. Biocompatible and hypoallergenic. Growing availability at Barcelona clinics for patients with metal sensitivities.',
    bestFor: 'Metal-free preference, patients with allergies, front teeth',
  },
]

// =============================================================================
// STATIC DATA — TREATMENT TIMELINE
// =============================================================================

const SINGLE_IMPLANT_TIMELINE = [
  {
    phase: 'Before You Fly',
    title: 'Free Online Consultation',
    description:
      'Send your panoramic X-ray (OPG) or CBCT scan. Receive a detailed treatment plan including all three components: implant, abutment, and crown.',
  },
  {
    phase: 'Trip 1 — Day 1',
    title: 'Consultation & Surgery',
    description:
      'Airport transfer to clinic. In-clinic examination with 3D CT scan. Treatment plan confirmation. Implant placement under local anaesthesia or sedation.',
  },
  {
    phase: 'Trip 1 — Days 2–5',
    title: 'Recovery in Spain',
    description:
      'Post-operative check-ups. Recovery in Barcelona or Costa del Sol. Medication and dietary guidance provided. Enjoy the Mediterranean environment during healing.',
  },
  {
    phase: '3–6 Months',
    title: 'Healing Period',
    description:
      'Return home while the implant fuses with your jawbone (osseointegration). Remote check-ups via photos and video calls with your clinic.',
  },
  {
    phase: 'Trip 2 — Days 1–3',
    title: 'Crown Fitting',
    description:
      'Abutment placement and final crown fitted. Adjustments for optimal bite and aesthetics. Final check-up before airport transfer home.',
  },
]

const ALL_ON_4_TIMELINE = [
  {
    phase: 'Trip 1 — Days 1–7',
    title: 'Consultation, Surgery & Temporary Bridge',
    description:
      'Comprehensive consultation with 3D CT scan. Implant surgery with temporary fixed bridge fitted same day. 5–7 day stay with post-operative checks and recovery time.',
  },
  {
    phase: '3–6 Months Later (Trip 2)',
    title: 'Permanent Bridge Fitting',
    description:
      'Return for 3–5 days. Permanent zirconia or ceramic bridge fitted. Bite adjustments and final check-up.',
  },
]

// =============================================================================
// STATIC DATA — CLINICS
// =============================================================================

const FEATURED_CLINICS = [
  {
    name: 'Centro Médico Teknon',
    location: 'Barcelona',
    rating: 4.9,
    reviews: 450,
    highlight: 'JCI-accredited — Newsweek "World\'s Best Hospitals 2021"',
    specialties: 'All-on-4, Full Mouth Reconstruction, Implantology',
    note: 'Dr. Álvaro Giner: 15 years experience, 900+ All-on-4 treatments, Kois Center Seattle trained',
  },
  {
    name: 'Puyuelo Dental Clinic',
    location: 'Barcelona',
    rating: 4.8,
    reviews: 280,
    highlight: '40+ years of dental excellence',
    specialties: 'Implants, Cosmetic Dentistry, Periodontics',
    note: 'State-of-the-art technology. Dr. Marta Satorres leads the implant team.',
  },
  {
    name: 'Nart Clínica Dental',
    location: 'Barcelona',
    rating: 4.8,
    reviews: 195,
    highlight: 'ISO-certified single-specialty dental facility',
    specialties: 'Implantology, Cosmetic Dentistry, Prosthodontics',
    note: 'International patient base from US, Canada, and UK.',
  },
  {
    name: 'Catar Clínica Dental',
    location: 'Barcelona',
    rating: 4.7,
    reviews: 140,
    highlight: 'Single-specialty dental centre',
    specialties: 'Dental Implants, Cosmetic Dentistry',
    note: 'Growing international patient base from North America and UK.',
  },
  {
    name: 'Vélez & Lozano',
    location: 'Murcia',
    rating: 4.7,
    reviews: 85,
    highlight: 'ISO-certified clinic outside Barcelona',
    specialties: 'Dental Implants, Full Mouth Restoration',
    note: 'Alternative to Barcelona with competitive pricing.',
  },
]

// =============================================================================
// STATIC DATA — COMPARISON
// =============================================================================

const COMPARISON_DATA = [
  { factor: 'Single implant price', spain: '£900–£1,400', turkey: '£300–£800', hungary: '£400–£900' },
  { factor: 'All-on-4 price (per jaw)', spain: '£5,500–£14,000', turkey: '£1,700–£3,500', hungary: '£3,500–£6,000' },
  { factor: 'Flight from London', spain: '2 hours', turkey: '3.5–4 hours', hungary: '2.5 hours' },
  { factor: 'EU regulation', spain: '✓ Yes', turkey: '✗ No', hungary: '✓ Yes' },
  { factor: 'JCI-accredited hospitals', spain: '✓ Yes (Teknon)', turkey: '✓ Yes (some)', hungary: '✗ No' },
  { factor: 'Dental tourism heritage', spain: '20+ years', turkey: '10–15 years', hungary: '30+ years' },
  { factor: 'Recovery environment', spain: 'Mediterranean coast/cities', turkey: 'Coastal resorts', hungary: 'Urban (Budapest)' },
  { factor: 'Best for', spain: 'Proximity + premium infrastructure', turkey: 'Maximum savings', hungary: 'EU regulation + heritage' },
]

// =============================================================================
// STATIC DATA — PRACTICAL INFO
// =============================================================================

const PRACTICAL_INFO = [
  {
    icon: Plane,
    title: 'Flights',
    content:
      'BA, Ryanair, easyJet, and Vueling from London, Manchester, Birmingham, Edinburgh. Budget fares from £30–£100 return. Just 2 hours to Barcelona (BCN).',
  },
  {
    icon: FileText,
    title: 'Visa',
    content: 'Not required for UK citizens (stays under 90 days). Valid passport needed.',
  },
  {
    icon: CreditCard,
    title: 'Currency',
    content:
      'Euro (EUR). Cards universally accepted. No currency exchange hassle — familiar currency for UK travellers.',
  },
  {
    icon: Building2,
    title: 'Accommodation',
    content:
      'Clinics often arrange hotel packages. Independent hotels from £50–£100/night in central Barcelona. Many options near clinics.',
  },
  {
    icon: Shield,
    title: 'Insurance',
    content:
      "Standard travel insurance won't cover elective dental work. Specialist medical travel insurance is recommended.",
  },
  {
    icon: Languages,
    title: 'Language',
    content:
      'Spanish/Catalan locally. English is widely spoken at international dental clinics. Barcelona is highly English-friendly.',
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

export function DentalImplantsSpainClient({ faqs }: DentalImplantsSpainClientProps) {
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
              Dental Implants in Spain: Compare Prices, Clinics & Packages
            </h1>
            <p className="mt-4 text-base text-primary-100 sm:mt-6 sm:text-lg lg:text-xl">
              Spain combines JCI-accredited hospitals, world-class implantologists, and a
              Mediterranean recovery environment — with savings of 50–70% on UK prices. Compare
              verified Barcelona clinics, real prices, and all-inclusive packages.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link href="/search?procedure=dental-implants&country=spain">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Browse Implant Clinics in Spain
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
              <Award className="h-4 w-4" />
              JCI-accredited
            </span>
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              EU-regulated
            </span>
            <span className="flex items-center gap-2">
              <Plane className="h-4 w-4" />
              2hr flight from London
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Free consultation matching
            </span>
          </div>

          {/* Hero Stat Cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">From £900</p>
              <p className="text-sm text-primary-200">per implant</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">50–70%</p>
              <p className="text-sm text-primary-200">savings vs UK</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">2hr</p>
              <p className="text-sm text-primary-200">flight from London</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* =====================================================================
            SECTION B: WHY SPAIN FOR DENTAL IMPLANTS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Why UK Patients Choose Spain for Dental Implants
          </h2>

          <div className="mt-6 space-y-4 text-neutral-700 sm:mt-8 sm:space-y-6">
            <p className="text-base leading-relaxed sm:text-lg">
              <strong>JCI hospital accreditation — the global gold standard.</strong> Centro Médico
              Teknon in Barcelona holds JCI accreditation (Joint Commission International), the
              highest international standard for healthcare quality. Teknon was named in Newsweek's
              "World's Best Hospitals 2021." This level of accreditation is rare in dental tourism
              and provides unmatched quality assurance.
            </p>

            <p className="leading-relaxed">
              <strong>Full EU membership and regulation.</strong> Spanish dentists hold 5-year
              degrees from accredited EU universities and must be registered with the Spanish Dental
              Association (Consejo General de Colegios de Odontólogos y Estomatólogos). Spain
              operates under the same regulatory framework as UK dentistry — the same standards, the
              same materials, the same oversight.
            </p>

            <p className="leading-relaxed">
              <strong>The shortest flight from the UK.</strong> Barcelona is just 2 hours from
              London. BA, Ryanair, easyJet, and Vueling operate multiple daily flights. This is the
              easiest{' '}
              <Link href="/dental" className="text-primary-600 hover:underline">
                dental tourism
              </Link>{' '}
              trip from the UK — no visa required, Euro currency, and familiar European culture. If
              you need a follow-up visit, it is simple to arrange.
            </p>

            <p className="leading-relaxed">
              <strong>Mediterranean recovery environment.</strong> Combine your treatment with
              recovery in Barcelona, Costa del Sol, or the Canary Islands. The climate and quality
              of life during recovery is a genuine differentiator — far more pleasant than
              recovering at home. Many patients treat the healing period as a short holiday.
            </p>
          </div>

          {/* JCI Highlight */}
          <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Award className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-900">JCI Accreditation — What It Means</h3>
                <p className="mt-2 text-sm text-green-800 leading-relaxed">
                  JCI (Joint Commission International) accreditation is the gold standard for
                  international healthcare facilities. It requires rigorous evaluation of patient
                  safety, quality of care, infection control, and facility standards. Only the top
                  hospitals globally achieve JCI accreditation — Centro Médico Teknon is one of
                  them.
                </p>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION C: PRICING
            ===================================================================== */}
        <m.section {...fadeInUp} id="pricing" className="mb-16 scroll-mt-8 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            How Much Do Dental Implants Cost in Spain?
          </h2>
          <p className="mt-2 text-neutral-600">
            Prices updated February 2026. All prices in GBP (£).
          </p>

          {/* Main Pricing Table */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">Procedure Pricing</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Procedure</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Spain</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">UK</th>
                  <th className="px-4 py-3 text-left font-semibold text-green-700">Saving</th>
                </tr>
              </thead>
              <tbody>
                {IMPLANT_PRICES.map((row, index) => (
                  <tr key={row.procedure} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-900">
                      {row.procedure}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-primary-700">
                      {row.spainPrice}
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

          {/* Package Pricing Table */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">All-Inclusive Package Pricing</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Package</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Spain</th>
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
                      {row.spainPrice}
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
              <strong>Spain is not the cheapest destination — it is the closest and most premium.</strong>{' '}
              The pricing reflects JCI-accredited facilities, internationally trained specialists,
              and EU-standard materials. Always confirm what is included in your quote: the implant
              post, abutment, and crown are three separate components.
            </p>
            <p className="leading-relaxed">
              For a detailed breakdown across all destinations, see our{' '}
              <Link
                href="/blog/dental-implants-abroad-cost-guide"
                className="text-primary-600 hover:underline"
              >
                dental implants abroad cost guide
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
            <Link href="/search?procedure=dental-implants&country=spain">
              <Button size="lg" className="w-full sm:w-auto">
                Get Your Free Quote
              </Button>
            </Link>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION D: IMPLANT TYPES & BRANDS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Implant Types and Brands Available at Spanish Clinics
          </h2>
          <p className="mt-2 text-neutral-600">
            Spanish clinics use the same premium implant brands as UK private practices
          </p>

          {/* Implant Brands */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">Premium Implant Brands</h3>
          <div className="mt-6 space-y-4">
            {IMPLANT_BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="font-semibold text-neutral-900">{brand.name}</h4>
                    <p className="text-xs text-neutral-500">{brand.origin}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                      {brand.tier}
                    </span>
                    <span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">
                      {brand.price}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-neutral-600 leading-relaxed">{brand.description}</p>
              </div>
            ))}
          </div>

          {/* Implant Systems */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">Full-Arch Systems</h3>
          <div className="mt-6 space-y-4">
            {IMPLANT_TYPES.map((type) => (
              <div
                key={type.name}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
              >
                <h4 className="text-lg font-semibold text-neutral-900">{type.name}</h4>
                <p className="mt-2 text-neutral-700 leading-relaxed">{type.description}</p>
                <p className="mt-3 text-sm text-neutral-500">
                  <strong>Best for:</strong> {type.bestFor}
                </p>
              </div>
            ))}
          </div>

          {/* Cross-sell note */}
          <p className="mt-6 text-neutral-600">
            Considering other treatments?{' '}
            {/* TODO: link to /procedures/veneers/spain when built */}
            <span className="text-neutral-500">Veneers in Spain</span> are also available at
            Barcelona clinics for patients seeking complete smile makeovers.
          </p>
        </m.section>

        {/* =====================================================================
            SECTION E: TREATMENT TIMELINE
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            What to Expect: Your Implant Treatment in Spain
          </h2>
          <p className="mt-2 text-neutral-600">
            Step-by-step guide to your treatment journey
          </p>

          {/* Standard Single Implant Timeline */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">
            Standard Single Implant Timeline
          </h3>
          <div className="mt-6">
            {SINGLE_IMPLANT_TIMELINE.map((step, index) => (
              <div key={step.phase} className="relative pb-8 last:pb-0">
                {index < SINGLE_IMPLANT_TIMELINE.length - 1 && (
                  <div className="absolute left-4 top-10 h-full w-0.5 bg-primary-100" />
                )}
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                      <span className="text-sm font-medium text-primary-600">{step.phase}</span>
                      <h4 className="font-semibold text-neutral-900">{step.title}</h4>
                    </div>
                    <p className="mt-2 text-neutral-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* All-on-4 Timeline */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">All-on-4 Timeline</h3>
          <div className="mt-6">
            {ALL_ON_4_TIMELINE.map((step, index) => (
              <div key={step.phase} className="relative pb-8 last:pb-0">
                {index < ALL_ON_4_TIMELINE.length - 1 && (
                  <div className="absolute left-4 top-10 h-full w-0.5 bg-green-100" />
                )}
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                      <span className="text-sm font-medium text-green-600">{step.phase}</span>
                      <h4 className="font-semibold text-neutral-900">{step.title}</h4>
                    </div>
                    <p className="mt-2 text-neutral-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Holiday recovery note */}
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Sun className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
              <div>
                <h4 className="font-semibold text-amber-900">Holiday Recovery</h4>
                <p className="mt-2 text-sm text-amber-800 leading-relaxed">
                  Many patients combine their implant placement trip with time exploring Barcelona,
                  or extend their stay to recover on the Costa del Sol. The Mediterranean climate
                  and quality of life make the recovery period far more enjoyable than staying at
                  home.
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
            Top-Rated Implant Clinics in Spain
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
                <p className="mt-3 text-sm font-medium text-primary-600">{clinic.highlight}</p>
                <p className="mt-2 text-xs text-neutral-500">{clinic.specialties}</p>
                <p className="mt-2 text-xs text-neutral-400">{clinic.note}</p>
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
            <Link href="/search?procedure=dental-implants&country=spain">
              <Button size="lg" className="w-full sm:w-auto">
                Browse All Spanish Clinics
              </Button>
            </Link>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION G: COMPARISON
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Dental Implants in Spain vs Turkey & Hungary
          </h2>
          <p className="mt-2 text-neutral-600">
            Comparing the top destinations for UK patients
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Factor</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">🇪🇸 Spain</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700">🇹🇷 Turkey</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700">🇭🇺 Hungary</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, index) => (
                  <tr key={row.factor} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-neutral-900">
                      {row.factor}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-700">
                      {row.spain}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-600">
                      {row.turkey}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-600">
                      {row.hungary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
            <h3 className="font-semibold text-neutral-900">The bottom line</h3>
            <p className="mt-2 text-neutral-700 leading-relaxed">
              Choose Spain if you want the shortest flight, JCI-accredited facilities, and a
              Mediterranean recovery experience. Choose Turkey if budget is your primary driver.
              Choose Hungary if you want established dental tourism heritage with EU credentials.
              Spain is not the cheapest option — it is the closest and most premium.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <Link
                href="/procedures/dental-implants/turkey"
                className="inline-flex items-center text-sm font-medium text-primary-600 hover:underline"
              >
                Compare dental implants in Turkey
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href="/procedures/dental-implants/hungary"
                className="inline-flex items-center text-sm font-medium text-primary-600 hover:underline"
              >
                Compare dental implants in Hungary
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION H: PRACTICAL INFO
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Planning Your Implant Trip to Spain
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
            title="Frequently Asked Questions About Dental Implants in Spain"
            className="faq-section"
          />
        </m.section>

        {/* =====================================================================
            SECTION J: CTA
            ===================================================================== */}
        <m.section {...fadeInUp}>
          <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white sm:p-8 lg:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Get Your Free Implant Quote from Spanish Clinics
              </h2>
              <p className="mt-3 text-primary-100 sm:mt-4 sm:text-lg">
                Compare JCI-accredited Barcelona clinics, see real prices, and get personalised
                recommendations. Free, no-obligation quotes from verified Spanish clinics.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
                <Link href="/search?procedure=dental-implants&country=spain">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Browse Implant Clinics in Spain
                  </Button>
                </Link>
                <Link href="/contact?procedure=dental-implants&country=spain">
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
                JCI-accredited · EU-regulated · No booking fees
              </p>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            INTERNAL LINKS
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
            <Link
              href="/procedures/dental-implants/hungary"
              className="text-primary-600 hover:underline"
            >
              Dental implants in Hungary
            </Link>{' '}
            ·{' '}
            <Link
              href="/procedures/dental-implants/poland"
              className="text-primary-600 hover:underline"
            >
              Dental implants in Poland
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/veneers" className="text-primary-600 hover:underline">
              Veneers abroad
            </Link>
          </p>
        </m.section>
      </div>
    </>
  )
}
