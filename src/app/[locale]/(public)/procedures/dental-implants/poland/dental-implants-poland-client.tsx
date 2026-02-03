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
  Languages,
  ArrowRight,
  BadgeCheck,
  Award,
} from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

interface DentalImplantsPolandClientProps {
  faqs: Array<{ question: string; answer: string }>
}

// =============================================================================
// STATIC DATA — PRICING TABLES
// =============================================================================

const IMPLANT_PRICES = [
  {
    procedure: 'Single Implant (with crown)',
    polandPrice: '£550–£900',
    ukPrice: '£2,000–£2,500',
    saving: 'Up to 70%',
  },
  {
    procedure: 'All-on-4 (per jaw)',
    polandPrice: '£4,000–£7,000',
    ukPrice: '£12,000–£15,000+',
    saving: 'Up to 67%',
  },
  {
    procedure: 'All-on-6 (per jaw)',
    polandPrice: '£4,500–£8,700',
    ukPrice: '£14,000–£18,000+',
    saving: 'Up to 65%',
  },
  {
    procedure: 'Implant-Supported Bridge (3 units)',
    polandPrice: '£1,500–£2,500',
    ukPrice: '£4,500–£6,000',
    saving: 'Up to 60%',
  },
  {
    procedure: 'Bone Graft (if required)',
    polandPrice: '£200–£500',
    ukPrice: '£500–£1,200',
    saving: 'Up to 60%',
  },
  {
    procedure: 'Sinus Lift (if required)',
    polandPrice: '£400–£800',
    ukPrice: '£1,000–£2,500',
    saving: 'Up to 68%',
  },
]

const PACKAGE_PRICES = [
  {
    package: 'Single Implant + Crown + Hotel + Transfers',
    polandPrice: '£800–£1,200',
    ukPrice: 'N/A',
    saving: '—',
  },
  {
    package: 'All-on-4 (one jaw) + Zirconia Bridge + Hotel + Transfers',
    polandPrice: '£5,000–£8,000',
    ukPrice: '£12,000–£15,000',
    saving: '£4,000–£10,000',
  },
  {
    package: 'Full Mouth (both jaws, All-on-4) + Hotel + Transfers',
    polandPrice: '£9,000–£14,000',
    ukPrice: '£24,000–£30,000+',
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
    price: '£600–£900 per implant',
    description:
      'Industry-leading titanium and ceramic implants with a 10-year survival rate of 98.8%. Used in 70+ countries. Available at most top Polish clinics.',
  },
  {
    name: 'Nobel Biocare Implants',
    origin: 'Swedish',
    tier: 'Premium',
    price: '£550–£850 per implant',
    description:
      'Pioneer of modern implant dentistry and inventor of the All-on-4 system. Integrated digital workflow (NobelClinician). Dr. Trzepatowski at HALDENT is a certified Nobel Biocare Key Expert.',
  },
  {
    name: 'Osstem Implants',
    origin: 'South Korean',
    tier: 'Value-Premium',
    price: '£400–£600 per implant',
    description:
      "World's fifth-largest implant manufacturer. Excellent biocompatibility. More affordable than Swiss/Swedish brands without compromising quality. Popular for patients seeking maximum savings with proven results.",
  },
  {
    name: 'Zimmer Biomet Implants',
    origin: 'American',
    tier: 'Premium',
    price: '£500–£800 per implant',
    description:
      'Established orthopaedic and dental implant brand with a strong track record in complex cases. Widely available at Polish clinics.',
  },
]

const IMPLANT_TYPES = [
  {
    name: 'All-on-4 System',
    description:
      'Four strategically placed implants supporting a full arch of teeth. Fixed, non-removable prosthesis with same-day teeth possible. 95% success rate for the lower jaw. Ideal for patients with moderate bone density.',
    bestFor: 'Full arch replacement, patients wanting fixed teeth in one day',
  },
  {
    name: 'All-on-6 System',
    description:
      'Six implants per arch for enhanced stability. Better for patients with higher bite forces or more advanced bone loss. Slightly higher cost but more support points for maximum longevity.',
    bestFor: 'Patients with bone loss, those wanting extra stability',
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
      'Send your panoramic X-ray (OPG) or CBCT scan. Receive a detailed treatment plan and quote. Book your clinic, flights, and accommodation.',
  },
  {
    phase: 'Trip 1 — Day 1',
    title: 'Arrival & Assessment',
    description:
      'Airport transfer to clinic. In-clinic examination with 3D CBCT scan. Treatment plan finalisation. Tooth extraction (if needed) and implant placement. Temporary teeth fitted.',
  },
  {
    phase: 'Trip 1 — Days 2–5',
    title: 'Recovery & Follow-Up',
    description:
      'Post-operative check-ups. Implant begins integrating with jawbone (osseointegration). Free time to explore Kraków or Warsaw.',
  },
  {
    phase: '3–6 Months',
    title: 'Healing Period',
    description:
      'Return home while the implant fuses with your bone. Remote check-ups via photos and video calls with your clinic.',
  },
  {
    phase: 'Trip 2 — Days 1–3',
    title: 'Crown Fitting',
    description:
      'Abutment placement. Impressions for your final crown. Crown fitted and adjusted for optimal bite. Final check-up before airport transfer home.',
  },
]

const ALL_ON_4_TIMELINE = [
  {
    phase: 'Before You Fly',
    title: 'Virtual Consultation',
    description:
      '3D scan review with your implantologist. Comprehensive treatment plan covering implant placement, temporary bridge, and final restoration.',
  },
  {
    phase: 'Day 1',
    title: 'Surgery & Same-Day Teeth',
    description:
      'Extractions (if needed), four implants placed, temporary fixed bridge fitted. Walk out of the clinic with functional teeth.',
  },
  {
    phase: 'Days 2–5',
    title: 'Post-Op Recovery',
    description:
      'Post-operative checks and dietary guidance. Some clinics include vitamin infusion and hyperbaric oxygen sessions to accelerate healing.',
  },
  {
    phase: '3–6 Months Later (Trip 2)',
    title: 'Final Bridge Fitting',
    description:
      'Return for 2–3 days. Final zirconia or ceramic bridge fitted. Bite adjustments and final check-up.',
  },
]

// =============================================================================
// STATIC DATA — CLINICS
// =============================================================================

const FEATURED_CLINICS = [
  {
    name: 'HALDENT Dental Clinic',
    location: 'Kraków',
    rating: 5.0,
    reviews: 180,
    highlight: "Poland's only MALO CLINIC-certified All-on-4 centre",
    specialties: 'All-on-4, Full Mouth Reconstruction, Nobel Biocare',
    note: 'Dr. Hubert Trzepatowski: 800+ All-on-4 procedures, Nobel Biocare Key Expert',
  },
  {
    name: 'Jesionowa Dental Clinic',
    location: 'Warsaw',
    rating: 4.9,
    reviews: 145,
    highlight: 'PhD-led implantology with cutting-edge digital workflow',
    specialties: 'Prosthetics, Orthodontics, Implants',
    note: 'Dr. Artur Buchwitz: PhD in Implantology, 3D printing and CT scans',
  },
  {
    name: 'INDEXMEDICA',
    location: 'Kraków',
    rating: 4.9,
    reviews: 320,
    highlight: 'Top 5 dental clinic in Poland (Global Clinic Rating)',
    specialties: 'Implants, Full Mouth Restoration, Veneers',
    note: 'ISO 9001 certified. UK/Ireland consultation offices. Design hotel accommodation.',
  },
  {
    name: 'Smile Dentica',
    location: 'Kraków',
    rating: 4.8,
    reviews: 210,
    highlight: '7,000 international patients per year',
    specialties: 'Implants, Cosmetic Dentistry, Smile Makeovers',
    note: 'Serves UK, Germany, Norway, Sweden, Austria, Italy, and USA',
  },
  {
    name: 'Atelier Uśmiechu',
    location: 'Warsaw',
    rating: 4.8,
    reviews: 165,
    highlight: 'Specialist implant-prosthetics for advanced bone loss',
    specialties: 'Complex Implant Cases, DSD Planning, VIP Transfers',
    note: '1,500 patients annually. On-site apartments available.',
  },
  {
    name: 'KCM Clinic',
    location: 'Jelenia Góra',
    rating: 4.7,
    reviews: 95,
    highlight: 'Comprehensive medical centre with dental specialisation',
    specialties: 'Dental Implants, Weight Loss, Orthopaedics',
    note: '90km from Wrocław. 700 international patients/year.',
  },
]

// =============================================================================
// STATIC DATA — COMPARISON
// =============================================================================

const COMPARISON_DATA = [
  { factor: 'Single implant price', poland: '£550–£900', turkey: '£300–£800', hungary: '£400–£900' },
  { factor: 'All-on-4 price (per jaw)', poland: '£4,000–£7,000', turkey: '£1,700–£3,500', hungary: '£3,500–£6,000' },
  { factor: 'Flight from London', poland: '2.5 hours', turkey: '3.5–4 hours', hungary: '2.5 hours' },
  { factor: 'EU regulation', poland: '✓ Yes', turkey: '✗ No', hungary: '✓ Yes' },
  { factor: 'Implant brands', poland: 'Straumann, Nobel, Osstem', turkey: 'Straumann, Nobel, Osstem', hungary: 'Straumann, Nobel, Alpha Bio' },
  { factor: 'Dental tourism heritage', poland: '30+ years', turkey: '10–15 years', hungary: '30+ years' },
  { factor: 'All-on-4 specialisation', poland: 'MALO CLINIC-certified trainer', turkey: 'Many providers, variable quality', hungary: 'Strong reputation' },
  { factor: 'Best for', poland: 'EU regulation + All-on-4 expertise', turkey: 'Maximum savings', hungary: 'Dental heritage + EU proximity' },
]

// =============================================================================
// STATIC DATA — PRACTICAL INFO
// =============================================================================

const PRACTICAL_INFO = [
  {
    icon: Plane,
    title: 'Flights',
    content:
      'Ryanair, Wizz Air, and LOT Polish Airlines from London, Manchester, Edinburgh, Bristol. Budget fares from £20–£80 return. Direct flights to Kraków (KRK) and Warsaw (WAW).',
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
      'Polish Złoty (PLN). Cards widely accepted in cities. Many clinics quote in GBP or EUR for international patients.',
  },
  {
    icon: Building2,
    title: 'Accommodation',
    content:
      'Many clinics offer all-inclusive packages with 3–4 star hotels. INDEXMEDICA offers design hotel accommodation. Independent hotels from £30–£60/night in central Kraków.',
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
      'Polish is the local language. English is widely spoken at dental clinics and in tourist areas of Kraków and Warsaw.',
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

export function DentalImplantsPolandClient({ faqs }: DentalImplantsPolandClientProps) {
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
              Dental Implants in Poland: Compare Prices, Clinics & Packages
            </h1>
            <p className="mt-4 text-base text-primary-100 sm:mt-6 sm:text-lg lg:text-xl">
              Poland offers EU-regulated dental care with savings of 60–70% on UK prices. Compare
              verified clinics in Kraków and Warsaw, real implant prices from £550, and all-inclusive
              packages — all in one place.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link href="/search?procedure=dental-implants&country=poland">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Browse Implant Clinics in Poland
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
              Verified clinics
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              EU-regulated
            </span>
            <span className="flex items-center gap-2">
              <Plane className="h-4 w-4" />
              2.5hr flight from London
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Free consultation matching
            </span>
          </div>

          {/* Hero Stat Cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">From £550</p>
              <p className="text-sm text-primary-200">per implant</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">60–70%</p>
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
            SECTION B: WHY POLAND FOR DENTAL IMPLANTS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Why UK Patients Choose Poland for Dental Implants
          </h2>

          <div className="mt-6 space-y-4 text-neutral-700 sm:mt-8 sm:space-y-6">
            <p className="text-base leading-relaxed sm:text-lg">
              <strong>EU membership means real patient protections.</strong> Polish dental clinics
              must comply with EU medical device regulations, hygiene standards, and patient rights
              directives. Materials are EU/FDA-approved — Straumann, Nobel Biocare, 3M, Ivoclar
              Vivadent, Dentsply Sirona. This is a tangible trust signal compared to non-EU
              destinations.
            </p>

            <p className="leading-relaxed">
              <strong>30+ years of dental tourism heritage.</strong> Poland has treated international
              dental patients for decades. UK, German, Swedish, and Norwegian patients have been
              travelling to Kraków and Warsaw for{' '}
              <Link href="/dental" className="text-primary-600 hover:underline">
                dental work
              </Link>{' '}
              since the 1990s. This is not a new industry — Polish clinics have refined their
              processes over decades.
            </p>

            <p className="leading-relaxed">
              <strong>World-class All-on-4 expertise.</strong> Poland is home to the only MALO
              CLINIC-certified All-on-4 trainer outside Portugal — Dr. Hubert Trzepatowski at HALDENT
              in Kraków. Clinics use Nobel Biocare, Straumann, and Osstem systems with success rates
              of 95–98%. If you need full-arch restoration, Poland offers specialist expertise that is
              hard to match elsewhere.
            </p>

            <p className="leading-relaxed">
              <strong>Proximity and accessibility.</strong> Kraków and Warsaw are just 2.5 hours from
              London. Ryanair, Wizz Air, and LOT Polish Airlines operate multiple daily routes with
              return fares often under £80. No visa required for UK citizens (stays under 90 days).
              In-house labs and digital workflows mean faster turnaround and fewer visits.
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION C: PRICING
            ===================================================================== */}
        <m.section {...fadeInUp} id="pricing" className="mb-16 scroll-mt-8 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            How Much Do Dental Implants Cost in Poland?
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
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Poland</th>
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

          {/* Package Pricing Table */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">All-Inclusive Package Pricing</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Package</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Poland</th>
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

          {/* Pricing Notes */}
          <div className="mt-8 space-y-4 text-neutral-700">
            <p className="leading-relaxed">
              Several factors affect your final price: <strong>implant brand</strong> (Straumann
              premium vs Osstem value), <strong>crown material</strong> (zirconia vs acrylic),{' '}
              <strong>number of implants</strong>, and whether you need{' '}
              <strong>bone grafting or sinus lift</strong> procedures. All-inclusive packages are
              common and often better value than booking separately.
            </p>
            <p className="leading-relaxed">
              Polish clinics use the same implant brands available in UK clinics — the price
              difference reflects lower operating costs, not lower quality materials. For a detailed
              breakdown across countries, see our{' '}
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
            <Link href="/search?procedure=dental-implants&country=poland">
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
            Implant Types and Brands Available at Polish Clinics
          </h2>
          <p className="mt-2 text-neutral-600">
            Polish clinics use the same premium implant brands available in UK private practices
          </p>

          {/* Implant Brands */}
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">Premium Implant Brands</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {IMPLANT_BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="rounded-xl border border-neutral-200 bg-white p-5"
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-neutral-900">{brand.name}</h4>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      brand.tier === 'Premium'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-blue-50 text-blue-700'
                    }`}
                  >
                    {brand.tier}
                  </span>
                </div>
                <p className="mt-1 text-xs text-neutral-500">{brand.origin}</p>
                <p className="mt-1 text-sm font-medium text-primary-600">{brand.price}</p>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{brand.description}</p>
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
            {/* TODO: link to /procedures/veneers/poland when built */}
            <span className="text-neutral-500">Veneers in Poland</span> are also popular with UK
            patients seeking smile makeovers.
          </p>
        </m.section>

        {/* =====================================================================
            SECTION E: TREATMENT TIMELINE
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            What to Expect: Your Implant Treatment in Poland
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
          <h3 className="mt-10 text-xl font-semibold text-neutral-900">
            All-on-4 Timeline (Same-Day Teeth)
          </h3>
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

          {/* Same-day teeth note */}
          <div className="mt-8 rounded-xl border border-primary-200 bg-primary-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
              <div>
                <h4 className="font-semibold text-primary-900">Teeth in a Day</h4>
                <p className="mt-2 text-sm text-primary-800 leading-relaxed">
                  Some clinics like HALDENT and Smile Dentica offer "Teeth in a Day" protocols for
                  All-on-4. You leave Poland with functional temporary teeth on the same day as
                  surgery — no waiting months without teeth.
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
            Top-Rated Implant Clinics in Poland
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
            <Link href="/search?procedure=dental-implants&country=poland">
              <Button size="lg" className="w-full sm:w-auto">
                Browse All Polish Clinics
              </Button>
            </Link>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION G: COMPARISON
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Dental Implants in Poland vs Turkey & Hungary
          </h2>
          <p className="mt-2 text-neutral-600">
            Comparing the three most popular destinations for UK patients
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Factor</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">🇵🇱 Poland</th>
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
                      {row.poland}
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
              Choose Poland if you prioritise EU consumer protections, premium implant brands, and
              specialist All-on-4 expertise. Choose Turkey if you are looking for the lowest price
              point with all-inclusive packages. Choose Hungary if you want established dental
              tourism heritage combined with EU regulation. All three destinations have reputable
              clinics — the right choice depends on your priorities.
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
            Planning Your Implant Trip to Poland
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
            title="Frequently Asked Questions About Dental Implants in Poland"
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
                Get Your Free Implant Quote from Polish Clinics
              </h2>
              <p className="mt-3 text-primary-100 sm:mt-4 sm:text-lg">
                Compare verified clinics in Kraków and Warsaw, see real prices, and get personalised
                recommendations. Free, no-obligation quotes from EU-regulated clinics.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
                <Link href="/search?procedure=dental-implants&country=poland">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Browse Implant Clinics in Poland
                  </Button>
                </Link>
                <Link href="/contact?procedure=dental-implants&country=poland">
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
                EU-regulated clinics · Prices verified quarterly · No booking fees
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
            <Link href="/procedures/veneers" className="text-primary-600 hover:underline">
              Veneers abroad
            </Link>
          </p>
        </m.section>
      </div>
    </>
  )
}
