'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'

// =============================================================================
// TYPES
// =============================================================================

interface FAQ {
  question: string
  answer: string
}

interface RhinoplastyPolandClientProps {
  faqs: FAQ[]
}

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function RhinoplastyPolandClient({ faqs }: RhinoplastyPolandClientProps) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-rose-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <m.h1
              variants={fadeInUp}
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            >
              Rhinoplasty in Poland: EU-Standard Care at Accessible Prices
            </m.h1>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl"
            >
              Poland welcomed 700,000+ medical tourists in 2024. Compare
              EU-trained surgeons, ISO-accredited clinics, and comprehensive
              packages from £2,900. Save 40–60% vs UK prices with European
              healthcare standards and consumer protections.
            </m.p>

            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/clinics?procedure=rhinoplasty&country=poland"
                className="rounded-lg bg-rose-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-rose-700 hover:shadow-xl"
              >
                Compare Verified Rhinoplasty Surgeons →
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-4 text-sm text-slate-500">
              EU healthcare standards • ISO-accredited clinics • 40–60% savings
              vs UK • Free consultation matching
            </m.p>

            {/* Hero Stats */}
            <m.div
              variants={fadeInUp}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
            >
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">£2,900–£4,500</p>
                <p className="mt-1 text-slate-600">Primary rhinoplasty</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">700,000+</p>
                <p className="mt-1 text-slate-600">Medical tourists in 2024</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">EU</p>
                <p className="mt-1 text-slate-600">Healthcare standards</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Why Poland Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <m.h2
              variants={fadeInUp}
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Why UK Patients Choose Poland for Rhinoplasty
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-6 space-y-4 text-slate-600"
              data-aeo="rhinoplasty-poland-benefits"
            >
              <p>
                Poland has emerged as a compelling choice for UK patients
                seeking quality rhinoplasty at accessible prices. As an EU
                member since 2004, Poland offers European healthcare standards,
                EU-recognised medical qualifications, and consumer protection
                laws — all within a 2-hour flight from London.
              </p>

              <p>
                Polish surgeons bring Central European precision to rhinoplasty.
                Many trained in Germany, Austria, or the UK before returning to
                practice in Poland. This combination of rigorous training and
                lower operating costs creates genuine value — not compromised
                quality at cheap prices.
              </p>

              <p>
                The country&apos;s medical tourism infrastructure has matured
                significantly. Purpose-built facilities like KCM Clinic in
                Jelenia Góra offer international patients a seamless experience
                with English-speaking staff, dedicated recovery accommodation,
                and comprehensive packages.
              </p>

              <p>
                Poland welcomed over 700,000 medical tourists in 2024, with
                cosmetic surgery representing a growing segment. The Polish
                Society of Plastic, Reconstructive and Aesthetic Surgery
                (PTChPRiE) maintains rigorous standards, and private clinics
                often exceed these with ISO certifications and international
                accreditations.
              </p>
            </m.div>

            {/* Key Advantages Grid */}
            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              <div className="rounded-lg bg-rose-50 p-4">
                <p className="font-semibold text-slate-900">EU Standards</p>
                <p className="mt-1 text-sm text-slate-600">
                  European healthcare regulations and consumer protections
                </p>
              </div>
              <div className="rounded-lg bg-rose-50 p-4">
                <p className="font-semibold text-slate-900">
                  Central European Training
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Many surgeons trained in Germany, Austria, UK
                </p>
              </div>
              <div className="rounded-lg bg-rose-50 p-4">
                <p className="font-semibold text-slate-900">
                  Short Travel Distance
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  2-hour flights from London to Warsaw or Kraków
                </p>
              </div>
              <div className="rounded-lg bg-rose-50 p-4">
                <p className="font-semibold text-slate-900">
                  40–60% Savings
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Quality care at accessible prices
                </p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Cost Section */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <m.h2
              variants={fadeInUp}
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Rhinoplasty Cost in Poland vs UK: 2025 Price Comparison
            </m.h2>

            {/* Main Price Comparison */}
            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="rhinoplasty-poland-cost"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Procedure Cost Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Procedure Type
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Poland
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        UK (Surgery Only)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Your Savings
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Primary Rhinoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,900–£4,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £6,500–£9,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        £3,600–£5,000
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Revision Rhinoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,800–£5,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £10,000–£16,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        £6,200–£10,500
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Piezo/Ultrasonic Rhinoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,500–£5,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £8,000–£12,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        £4,500–£7,000
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Septorhinoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,200–£4,800
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £8,000–£11,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        £4,800–£6,200
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Rhinoplasty + Chin Augmentation
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £4,200–£6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £9,000–£14,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        £4,800–£8,000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            {/* What's Typically Included */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                What&apos;s Typically Included (Poland)
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Pre-operative Consultation
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Virtual + in-person consultation with surgeon
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Medical Testing</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Blood tests, ECG, pre-operative assessments
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Surgery</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Surgeon fee, anaesthesiologist, operating theatre
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Hospital Stay</p>
                  <p className="mt-1 text-sm text-slate-600">
                    1 night with nursing care
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Post-op Care</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Medications, nasal splint, dressings
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Follow-up</p>
                  <p className="mt-1 text-sm text-slate-600">
                    In-clinic appointments + splint removal
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Aftercare</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Telemedicine follow-ups for 12 months
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Coordinator</p>
                  <p className="mt-1 text-sm text-slate-600">
                    English-speaking patient coordinator
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Fit-to-Fly</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Clearance consultation before departure
                  </p>
                </div>
              </div>
            </m.div>

            {/* Additional Costs */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Additional Costs to Budget
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Item
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Estimated Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Return flights (UK to Warsaw/Kraków)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £60–£200
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Accommodation (7-10 nights)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £350–£700
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Travel insurance (with medical cover)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £30–£60
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Airport transfers (if not included)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £40–£80
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div
              variants={fadeInUp}
              className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4"
            >
              <p className="font-medium text-slate-900">Money-Saving Tip</p>
              <p className="mt-1 text-sm text-slate-600">
                KCM Clinic in Jelenia Góra offers all-inclusive packages with
                accommodation included, simplifying budgeting. Request itemised
                quotes from multiple clinics and compare total costs including
                travel.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Regional Guide Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <m.h2
              variants={fadeInUp}
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Where to Have Rhinoplasty in Poland: Regional Guide
            </m.h2>

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Poland offers several excellent destinations for rhinoplasty, each
              with distinct advantages. Understanding these options helps you
              choose the right setting for your procedure and recovery.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2"
              data-aeo="rhinoplasty-poland-regions"
            >
              {/* Warsaw */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">Warsaw</h3>
                <p className="mt-1 text-sm text-rose-600">Medical Hub • Largest Surgeon Selection</p>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <p>
                    Poland&apos;s capital offers the highest concentration of
                    plastic surgeons and university hospital affiliations.
                    Multiple daily flights from London, Manchester, and
                    Edinburgh.
                  </p>
                  <div>
                    <p className="font-medium text-slate-900">Key Advantages:</p>
                    <ul className="mt-1 space-y-1">
                      <li>• Widest selection of surgeons</li>
                      <li>• University hospital access</li>
                      <li>• Best flight connectivity</li>
                      <li>• Modern medical infrastructure</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Notable Clinics:</p>
                    <p>Warsaw Aesthetic, Artplastica, Carolina Medical Center</p>
                  </div>
                </div>
              </div>

              {/* Kraków */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">Kraków</h3>
                <p className="mt-1 text-sm text-rose-600">Historic Charm • Slightly Lower Costs</p>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <p>
                    Poland&apos;s cultural capital combines excellent medical
                    care with historic charm. Direct flights from several UK
                    airports. Slightly lower costs than Warsaw.
                  </p>
                  <div>
                    <p className="font-medium text-slate-900">Key Advantages:</p>
                    <ul className="mt-1 space-y-1">
                      <li>• Beautiful recovery environment</li>
                      <li>• 5–10% lower prices than Warsaw</li>
                      <li>• UNESCO Old Town for gentle walks</li>
                      <li>• Strong medical university tradition</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Notable Clinics:</p>
                    <p>KCM Clinic (nearby), Galen Clinic, Medistica</p>
                  </div>
                </div>
              </div>

              {/* Jelenia Góra / KCM Clinic */}
              <div className="rounded-xl border-2 border-rose-200 bg-rose-50 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">
                  Jelenia Góra (KCM Clinic)
                </h3>
                <p className="mt-1 text-sm text-rose-600">
                  Mountain Recovery • Purpose-Built Medical Tourism
                </p>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <p>
                    KCM Clinic is Poland&apos;s premier medical tourism
                    facility, purpose-built for international patients. Located
                    in the Karkonosze Mountains, it offers a unique recovery
                    environment combining medical excellence with mountain air.
                  </p>
                  <div>
                    <p className="font-medium text-slate-900">Key Advantages:</p>
                    <ul className="mt-1 space-y-1">
                      <li>• All-inclusive packages with accommodation</li>
                      <li>• English-speaking staff throughout</li>
                      <li>• Peaceful mountain recovery setting</li>
                      <li>• Dedicated international patient experience</li>
                      <li>• On-site recovery apartments</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Access:</p>
                    <p>
                      3 hours from Berlin (Schönefeld), 2 hours from Wrocław
                      airport. Transfers included in packages.
                    </p>
                  </div>
                </div>
              </div>

              {/* Wrocław */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">Wrocław</h3>
                <p className="mt-1 text-sm text-rose-600">University City • Growing Hub</p>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <p>
                    A vibrant university city with excellent medical facilities
                    and direct flights from London. Gateway to KCM Clinic in
                    Jelenia Góra.
                  </p>
                  <div>
                    <p className="font-medium text-slate-900">Key Advantages:</p>
                    <ul className="mt-1 space-y-1">
                      <li>• Direct Ryanair flights from UK</li>
                      <li>• Strong university medical tradition</li>
                      <li>• Gateway to Jelenia Góra/KCM</li>
                      <li>• Pleasant riverside recovery setting</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Notable Clinics:</p>
                    <p>Wrocław Medical, Estevien Clinic</p>
                  </div>
                </div>
              </div>
            </m.div>

            <m.div
              variants={fadeInUp}
              className="mt-8 rounded-lg bg-white p-6 shadow"
            >
              <h3 className="font-semibold text-slate-900">
                Recommendation by Priority
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="font-medium text-slate-900">
                    Maximum Choice
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Warsaw — most surgeons, best connectivity
                  </p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    All-Inclusive Experience
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Jelenia Góra (KCM) — purpose-built, peaceful
                  </p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    Value + Culture
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Kraków — slightly lower costs, historic setting
                  </p>
                </div>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Types of Rhinoplasty Section */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <m.h2
              variants={fadeInUp}
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Rhinoplasty Techniques Available in Poland
            </m.h2>

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Polish surgeons offer the full range of modern rhinoplasty
              techniques. Many trained in Germany or Austria, bringing Central
              European precision to their work.
            </m.p>

            {/* Open vs Closed */}
            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="rhinoplasty-techniques-poland"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Open vs Closed Rhinoplasty
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-white p-6">
                  <h4 className="font-semibold text-slate-900">
                    Open Rhinoplasty
                  </h4>
                  <p className="mt-1 text-sm text-rose-600">£3,200–£4,500</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li>
                      • Small incision across columella (tissue between
                      nostrils)
                    </li>
                    <li>• Full visibility of nasal structures</li>
                    <li>
                      • Preferred for complex reshaping, revision cases
                    </li>
                    <li>• Faint scar fades within 6–12 months</li>
                    <li>• Polish surgeons trained in meticulous closure</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-6">
                  <h4 className="font-semibold text-slate-900">
                    Closed Rhinoplasty
                  </h4>
                  <p className="mt-1 text-sm text-rose-600">£2,900–£4,000</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li>• All incisions hidden inside nostrils</li>
                    <li>• No visible external scarring</li>
                    <li>
                      • Suitable for minor refinements, dorsal hump reduction
                    </li>
                    <li>• Faster recovery, less swelling</li>
                    <li>
                      • Requires high surgeon skill due to limited visibility
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm italic text-slate-500">
                Your surgeon will recommend the approach based on your anatomy
                and goals. Polish surgeons are known for conservative, natural
                results.
              </p>
            </m.div>

            {/* Piezo Rhinoplasty */}
            <m.div variants={fadeInUp} className="mt-10">
              <div className="rounded-xl border-2 border-rose-200 bg-rose-50 p-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Piezo/Ultrasonic Rhinoplasty in Poland
                </h3>
                <p className="mt-1 text-sm text-rose-600">£3,500–£5,000</p>
                <p className="mt-3 text-slate-600">
                  Piezo rhinoplasty uses ultrasonic vibrations to sculpt nasal
                  bones with precision, leaving soft tissue intact. This
                  advanced technique is available at select Polish clinics,
                  including KCM Clinic and top Warsaw practices.
                </p>

                <h4 className="mt-6 font-semibold text-slate-900">
                  Key Advantages vs Traditional Technique
                </h4>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                          Aspect
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                          Traditional
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                          Piezo/Ultrasonic
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                          Bruising duration
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                          14–21 days
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                          7–10 days
                        </td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                          Swelling peak
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                          Day 10–12
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                          Day 5
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                          Return to social activities
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                          2–3 weeks
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                          10–14 days
                        </td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                          Precision
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                          Good
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                          Excellent
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 text-sm text-slate-600">
                  <strong>Availability:</strong> Confirm piezo availability when
                  booking. Not all Polish clinics offer this technique. KCM
                  Clinic and select Warsaw practices have invested in piezo
                  technology.
                </p>
              </div>
            </m.div>

            {/* Other Types */}
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h4 className="font-semibold text-slate-900">
                  Revision Rhinoplasty
                </h4>
                <p className="mt-1 text-sm text-rose-600">£3,800–£5,500</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• Corrects unsatisfactory results from previous surgery</li>
                  <li>• More complex due to scar tissue, altered anatomy</li>
                  <li>• Polish surgeons trained in revision techniques</li>
                  <li>• Wait minimum 12 months after initial surgery</li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h4 className="font-semibold text-slate-900">
                  Septorhinoplasty
                </h4>
                <p className="mt-1 text-sm text-rose-600">£3,200–£4,800</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• Combines cosmetic reshaping with septal correction</li>
                  <li>• Addresses breathing difficulties + aesthetics</li>
                  <li>• Dual-trained ENT/plastic surgeons available</li>
                  <li>• Popular choice for functional improvement</li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h4 className="font-semibold text-slate-900">
                  Preservation Rhinoplasty
                </h4>
                <p className="mt-1 text-sm text-rose-600">£3,500–£5,000</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• Modern technique preserving natural structures</li>
                  <li>• More natural movement and appearance</li>
                  <li>• Growing availability at top Polish clinics</li>
                  <li>• Suits patients wanting subtle refinement</li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h4 className="font-semibold text-slate-900">
                  Rhinoplasty + Chin Augmentation
                </h4>
                <p className="mt-1 text-sm text-rose-600">£4,200–£6,000</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• Facial harmony through profile balancing</li>
                  <li>• Single anaesthesia, combined recovery</li>
                  <li>• Popular combination in Poland</li>
                  <li>• Discuss suitability in consultation</li>
                </ul>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* How to Choose a Surgeon Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <m.h2
              variants={fadeInUp}
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              How to Choose a Rhinoplasty Surgeon in Poland
            </m.h2>

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Poland&apos;s EU membership means medical qualifications are
              recognised across Europe. Here&apos;s how to verify credentials
              and select the right surgeon.
            </m.p>

            {/* Credentials */}
            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="rhinoplasty-surgeon-credentials-poland"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Essential Credentials to Verify
              </h3>
              <div className="rounded-lg bg-white p-6 shadow">
                <p className="font-medium text-slate-900">
                  Key Certifications (Hierarchy of Credibility)
                </p>
                <ol className="mt-4 space-y-3 text-sm text-slate-600">
                  <li className="flex items-start">
                    <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                      1
                    </span>
                    <div>
                      <span className="font-medium text-slate-900">PTChPRiE</span>{' '}
                      — Polish Society of Plastic, Reconstructive and Aesthetic
                      Surgery (Primary Polish board)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                      2
                    </span>
                    <div>
                      <span className="font-medium text-slate-900">EBOPRAS</span>{' '}
                      — European Board of Plastic, Reconstructive and Aesthetic
                      Surgery
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                      3
                    </span>
                    <div>
                      <span className="font-medium text-slate-900">ISAPS</span>{' '}
                      — International Society of Aesthetic Plastic Surgery
                      (global recognition)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                      4
                    </span>
                    <div>
                      <span className="font-medium text-slate-900">
                        Polish Medical Chamber Registration
                      </span>{' '}
                      — Legal requirement to practice
                    </div>
                  </li>
                </ol>
                <p className="mt-4 text-sm italic text-slate-500">
                  How to verify: Request registration numbers and cross-reference
                  with PTChPRiE directory. EU-trained surgeons welcome verification.
                </p>
              </div>
            </m.div>

            {/* Experience Indicators */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Experience Indicators
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-white p-6 shadow">
                  <p className="font-medium text-slate-900">Volume Thresholds</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li>
                      • <strong>Minimum acceptable:</strong> 100+ rhinoplasties
                    </li>
                    <li>
                      • <strong>Experienced:</strong> 500+ rhinoplasties
                    </li>
                    <li>
                      • <strong>Expert level:</strong> 1,000+ rhinoplasties
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-6 shadow">
                  <p className="font-medium text-slate-900">Ask Directly</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li>
                      &quot;How many rhinoplasties do you perform annually?&quot;
                    </li>
                    <li>
                      &quot;What is your revision rate?&quot;
                    </li>
                    <li>
                      &quot;Can you share before/after photos of similar cases?&quot;
                    </li>
                  </ul>
                </div>
              </div>
            </m.div>

            {/* Red Flags */}
            <m.div
              variants={fadeInUp}
              className="mt-8 rounded-lg border border-red-200 bg-red-50 p-6"
            >
              <p className="font-medium text-red-800">Red Flags to Avoid</p>
              <ul className="mt-3 grid gap-2 text-sm text-red-700 sm:grid-cols-2">
                <li>• Reluctance to share credentials or photos</li>
                <li>• Prices significantly below market (under £2,000)</li>
                <li>• Pressure to book quickly</li>
                <li>• No revision policy in writing</li>
                <li>• Surgery at non-accredited facilities</li>
                <li>• No EU medical qualifications</li>
              </ul>
            </m.div>

            {/* Facility Standards */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Facility Standards in Poland
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-white p-4 shadow">
                  <p className="font-medium text-slate-900">
                    ISO 9001 Certification
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Quality management standard. Many Polish private clinics
                    hold ISO certification.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow">
                  <p className="font-medium text-slate-900">
                    NFZ Accreditation
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Polish National Health Fund accreditation indicates
                    compliance with national standards.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow">
                  <p className="font-medium text-slate-900">
                    EU Healthcare Directive
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    All Polish facilities must comply with EU healthcare
                    regulations.
                  </p>
                </div>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Featured Surgeons Section */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <m.h2
              variants={fadeInUp}
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Featured Rhinoplasty Surgeons in Poland
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {/* Dr. Grzegorz Kierzynka */}
              <div className="rounded-xl border-2 border-rose-200 bg-white p-6 shadow-sm">
                <div className="mb-2 inline-block rounded bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                  Featured
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Dr. Grzegorz Kierzynka
                </h3>
                <p className="mt-1 text-sm text-rose-600">From £3,500</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>
                    <strong>Experience:</strong> 1,100+ rhinoplasties, sub-5%
                    revision rate
                  </li>
                  <li>
                    <strong>Specialisation:</strong> Primary and revision
                    rhinoplasty, piezo technique
                  </li>
                  <li>
                    <strong>Credentials:</strong> PTChPRiE member, trained in
                    Germany
                  </li>
                  <li>
                    <strong>Facility:</strong> KCM Clinic, Jelenia Góra
                  </li>
                  <li>
                    <strong>Notable:</strong> Lead rhinoplasty surgeon at
                    Poland&apos;s premier medical tourism facility
                  </li>
                </ul>
                <p className="mt-3 text-xs italic text-slate-500">
                  Philosophy: Meticulous technique, natural results, thorough
                  pre-operative planning
                </p>
              </div>

              {/* Dr. Michał Charytonowicz */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Dr. Michał Charytonowicz
                </h3>
                <p className="mt-1 text-sm text-rose-600">From £3,200</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>
                    <strong>Experience:</strong> 15+ years, 800+ rhinoplasties
                  </li>
                  <li>
                    <strong>Specialisation:</strong> Preservation rhinoplasty,
                    closed technique
                  </li>
                  <li>
                    <strong>Credentials:</strong> PTChPRiE, European Rhinoplasty
                    Society
                  </li>
                  <li>
                    <strong>Facility:</strong> Warsaw Aesthetic Clinic
                  </li>
                  <li>
                    <strong>Notable:</strong> Known for natural, subtle results
                  </li>
                </ul>
                <p className="mt-3 text-xs text-slate-500">
                  Reviews: Highly rated for communication and results
                </p>
              </div>

              {/* Dr. Marta Wilczyńska */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Dr. Marta Wilczyńska
                </h3>
                <p className="mt-1 text-sm text-rose-600">From £2,900</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>
                    <strong>Experience:</strong> 12+ years, 600+ rhinoplasties
                  </li>
                  <li>
                    <strong>Specialisation:</strong> Female rhinoplasty, ethnic
                    rhinoplasty
                  </li>
                  <li>
                    <strong>Credentials:</strong> PTChPRiE, trained in Austria
                  </li>
                  <li>
                    <strong>Facility:</strong> Artplastica, Warsaw
                  </li>
                  <li>
                    <strong>Notable:</strong> Specialises in feminine aesthetic
                    goals
                  </li>
                </ul>
                <p className="mt-3 text-xs text-slate-500">
                  Popular with UK female patients seeking refined results
                </p>
              </div>

              {/* Dr. Tomasz Sirek */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Dr. Tomasz Sirek
                </h3>
                <p className="mt-1 text-sm text-rose-600">From £3,400</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>
                    <strong>Experience:</strong> 20+ years, 1,000+ procedures
                  </li>
                  <li>
                    <strong>Specialisation:</strong> Septorhinoplasty,
                    functional correction
                  </li>
                  <li>
                    <strong>Credentials:</strong> PTChPRiE, ENT + Plastic
                    Surgery dual qualification
                  </li>
                  <li>
                    <strong>Facility:</strong> Carolina Medical Center, Warsaw
                  </li>
                </ul>
                <p className="mt-3 text-xs text-slate-500">
                  Ideal for patients with breathing concerns + aesthetic goals
                </p>
              </div>

              {/* Dr. Adam Kołodziej */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Dr. Adam Kołodziej
                </h3>
                <p className="mt-1 text-sm text-rose-600">From £3,000</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>
                    <strong>Experience:</strong> 18+ years, 700+ rhinoplasties
                  </li>
                  <li>
                    <strong>Specialisation:</strong> Revision rhinoplasty, open
                    technique
                  </li>
                  <li>
                    <strong>Credentials:</strong> PTChPRiE, EBOPRAS
                  </li>
                  <li>
                    <strong>Facility:</strong> Medistica, Kraków
                  </li>
                </ul>
                <p className="mt-3 text-xs text-slate-500">
                  Revision specialist accepting cases from other clinics
                </p>
              </div>

              {/* Consultation CTA */}
              <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6">
                <div className="text-center">
                  <p className="font-medium text-slate-700">
                    Need help choosing a surgeon?
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Our team can match you with verified surgeons based on your
                    goals, budget, and preferences.
                  </p>
                  <Link
                    href="/enquiry?procedure=rhinoplasty&country=poland"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    Get Surgeon Recommendations →
                  </Link>
                </div>
              </div>
            </m.div>

            <m.p
              variants={fadeInUp}
              className="mt-6 text-sm italic text-slate-500"
            >
              medit verifies surgeon credentials through official registries.
              Profiles updated quarterly. Always confirm current information
              directly with clinics.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Patient Journey Timeline */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <m.h2
              variants={fadeInUp}
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Your Rhinoplasty Journey: Step-by-Step Timeline
            </m.h2>

            {/* Pre-Trip Phase */}
            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="rhinoplasty-poland-timeline"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Pre-Trip Phase (4–8 Weeks Before)
              </h3>
              <div className="space-y-4">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Week 1–2: Research & Shortlist
                  </p>
                  <ul className="mt-2 text-sm text-slate-600">
                    <li>• Review surgeon portfolios and credentials</li>
                    <li>• Request consultations from 2–4 clinics</li>
                    <li>• Compare packages and pricing</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Week 2–3: Virtual Consultations
                  </p>
                  <ul className="mt-2 text-sm text-slate-600">
                    <li>• Video calls with surgeons</li>
                    <li>• Discuss goals, share photos</li>
                    <li>• Receive detailed quotes</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Week 3–4: Decision & Booking
                  </p>
                  <ul className="mt-2 text-sm text-slate-600">
                    <li>• Select surgeon and clinic</li>
                    <li>• Pay deposit (typically 10–20%)</li>
                    <li>• Book flights and arrange accommodation</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Week 4–8: Preparation
                  </p>
                  <ul className="mt-2 text-sm text-slate-600">
                    <li>• Complete medical questionnaire</li>
                    <li>• Stop smoking (minimum 2 weeks before)</li>
                    <li>
                      • Stop blood-thinning medications (1 week before)
                    </li>
                    <li>• Arrange time off work (10–14 days)</li>
                  </ul>
                </div>
              </div>
            </m.div>

            {/* Trip Phase */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Trip Phase (7–10 Days in Poland)
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Day
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        What Happens
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Day 1
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Arrive in Poland. Transfer to accommodation. Rest and
                        acclimatise.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Day 2
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Transfer to clinic. In-person consultation. Blood tests,
                        pre-op checks. Final surgical plan confirmation.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Day 3
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        <strong>Surgery Day.</strong> 1.5–3 hours under general
                        anaesthesia. Recovery in private room. Overnight stay
                        with nursing care.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Day 4–6
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Recovery at accommodation. Minimal activity, head
                        elevated. Gentle walks if staying at KCM (mountain air).
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Day 7–10
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        <strong>Splint removal.</strong> Surgeon review and
                        clearance to fly. Final instructions. Return home.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            {/* Post-Trip Recovery */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Post-Trip Recovery (UK)
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Week 2–3</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Most bruising fades. Resume light activities. Work from home
                    possible. First telemedicine follow-up.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Week 4–6</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Return to normal activities. Most swelling resolved. Can
                    resume exercise (avoid contact sports).
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Month 2–3</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Second telemedicine follow-up. 80–90% swelling resolved.
                    Results becoming apparent.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Month 6–12</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Final results emerging. Residual swelling fully resolved.
                    Nose &quot;settles&quot; into final shape.
                  </p>
                </div>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Recovery Section */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <m.h2
              variants={fadeInUp}
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Recovery After Rhinoplasty in Poland
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="rhinoplasty-poland-recovery"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Immediate Post-Operative Period (Days 1–7)
              </h3>
              <div className="rounded-lg bg-white p-6 shadow">
                <p className="font-medium text-slate-900">Common Experiences</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>
                    • Nasal congestion (normal — breathing through mouth
                    initially)
                  </li>
                  <li>• Swelling concentrated around eyes and cheeks</li>
                  <li>• Bruising (varies by technique and individual)</li>
                  <li>
                    • Mild discomfort (managed with prescribed medication)
                  </li>
                </ul>
              </div>
            </m.div>

            {/* Mountain Recovery Advantage */}
            <m.div
              variants={fadeInUp}
              className="mt-8 rounded-xl border-2 border-rose-200 bg-rose-50 p-6"
            >
              <h3 className="text-lg font-bold text-slate-900">
                Mountain Recovery Advantage (KCM Clinic)
              </h3>
              <p className="mt-3 text-slate-600">
                KCM Clinic&apos;s location in the Karkonosze Mountains offers a
                unique recovery experience. Clean mountain air, peaceful
                surroundings, and purpose-built recovery accommodation create
                optimal healing conditions.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="font-medium text-slate-900">Recovery Benefits</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>• Clean air aids healing</li>
                    <li>• Peaceful environment reduces stress</li>
                    <li>• Gentle walks possible from Day 4–5</li>
                    <li>• On-site accommodation eliminates transfers</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    Patients Often Say
                  </p>
                  <p className="mt-2 text-sm italic text-slate-600">
                    &quot;The mountain setting made recovery feel like a retreat
                    rather than a hospital stay. The fresh air and peaceful
                    surroundings helped me heal.&quot;
                  </p>
                </div>
              </div>
            </m.div>

            {/* What to Avoid */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                What to Avoid During Recovery
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-red-50 p-4">
                  <p className="font-medium text-red-800">4 Weeks</p>
                  <p className="mt-1 text-sm text-red-700">Blowing nose</p>
                </div>
                <div className="rounded-lg bg-red-50 p-4">
                  <p className="font-medium text-red-800">3 Weeks</p>
                  <p className="mt-1 text-sm text-red-700">Strenuous exercise</p>
                </div>
                <div className="rounded-lg bg-red-50 p-4">
                  <p className="font-medium text-red-800">4–6 Months</p>
                  <p className="mt-1 text-sm text-red-700">
                    Wearing glasses on nose
                  </p>
                </div>
                <div className="rounded-lg bg-red-50 p-4">
                  <p className="font-medium text-red-800">3 Months</p>
                  <p className="mt-1 text-sm text-red-700">
                    Sun exposure (use SPF 50+)
                  </p>
                </div>
                <div className="rounded-lg bg-red-50 p-4">
                  <p className="font-medium text-red-800">6 Months</p>
                  <p className="mt-1 text-sm text-red-700">Sleeping face-down</p>
                </div>
                <div className="rounded-lg bg-red-50 p-4">
                  <p className="font-medium text-red-800">6 Months</p>
                  <p className="mt-1 text-sm text-red-700">Contact sports</p>
                </div>
              </div>
            </m.div>

            {/* Flying Home */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Flying Home After Rhinoplasty
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-white p-6 shadow">
                  <p className="font-medium text-slate-900">Typical Clearance</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Day 7–10 post-surgery (after splint removal)
                  </p>
                  <p className="mt-4 font-medium text-slate-900">
                    Flight Considerations
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>• Short flight (2–2.5 hours) well-tolerated</li>
                    <li>• Stay hydrated, use saline nasal spray</li>
                    <li>• Mild facial swelling possible (temporary)</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-6 shadow">
                  <p className="font-medium text-slate-900">
                    Surgeon Criteria for Clearance
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>• External splint removed</li>
                    <li>• Sutures removed (if external)</li>
                    <li>• No active bleeding or infection</li>
                    <li>• Patient comfortable and recovering well</li>
                  </ul>
                </div>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Risks and Safety Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <m.h2
              variants={fadeInUp}
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Risks and Safety: What You Should Know
            </m.h2>

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Transparent discussion of risks demonstrates our commitment to
              patient welfare. Poland&apos;s EU membership provides additional
              safeguards.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2"
              data-aeo="rhinoplasty-poland-safety"
            >
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">
                  General Surgical Risks
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>
                    • Bleeding (rare, typically controlled during surgery)
                  </li>
                  <li>
                    • Infection (uncommon with proper care)
                  </li>
                  <li>
                    • Adverse reaction to anaesthesia (pre-screening minimises)
                  </li>
                  <li>
                    • Scarring (minimal with proper technique)
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">
                  Rhinoplasty-Specific Risks
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>
                    • Asymmetry (8–12% experience minor degrees)
                  </li>
                  <li>
                    • Breathing difficulties (temporary or requiring revision)
                  </li>
                  <li>
                    • Numbness in nasal tip (usually temporary)
                  </li>
                  <li>• Dissatisfaction with aesthetic result</li>
                  <li>
                    • Need for revision surgery (5–15%)
                  </li>
                </ul>
              </div>
            </m.div>

            {/* EU Safeguards */}
            <m.div
              variants={fadeInUp}
              className="mt-8 rounded-lg border border-green-200 bg-green-50 p-6"
            >
              <h3 className="font-semibold text-slate-900">
                EU Consumer Protections
              </h3>
              <p className="mt-3 text-slate-600">
                As an EU member, Poland offers additional safeguards:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>
                  • EU healthcare directive ensures minimum quality standards
                </li>
                <li>
                  • European cross-border healthcare rights apply
                </li>
                <li>
                  • EU-recognised medical qualifications
                </li>
                <li>
                  • Consumer protection laws for medical services
                </li>
                <li>
                  • EHIC/GHIC may cover emergency complications
                </li>
              </ul>
            </m.div>

            {/* Minimising Risk */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Minimising Your Risk
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">
                    Choose ISO-certified facilities
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">
                    Select PTChPRiE-certified surgeons
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">
                    Follow all pre-operative instructions
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">
                    Disclose complete medical history
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">
                    Adhere to post-operative care
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">
                    Attend all follow-up appointments
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">
                    Have realistic expectations
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">
                    Confirm revision policy in writing
                  </p>
                </div>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <m.h2
              variants={fadeInUp}
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Frequently Asked Questions About Rhinoplasty in Poland
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8 space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-lg bg-white shadow-sm"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-slate-900">
                    {faq.question}
                    <span className="ml-4 flex-shrink-0 text-rose-600 transition-transform group-open:rotate-180">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="border-t border-slate-200 px-6 pb-6 pt-4 text-slate-600">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Cross-Links Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <m.h2
              variants={fadeInUp}
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Explore Other Destinations & Procedures
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <Link
                href="/procedures/rhinoplasty"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">
                  Rhinoplasty Hub
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Compare all rhinoplasty destinations and techniques
                </p>
              </Link>
              <Link
                href="/procedures/rhinoplasty/turkey"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">
                  Rhinoplasty in Turkey
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Maximum savings, highest volume destination
                </p>
              </Link>
              <Link
                href="/procedures/rhinoplasty/spain"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">
                  Rhinoplasty in Spain
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Premium European care, technique innovation
                </p>
              </Link>
              <Link
                href="/procedures/rhinoplasty/hungary"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">
                  Rhinoplasty in Hungary
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  EU-standard care at accessible prices
                </p>
              </Link>
              <Link
                href="/destinations/poland"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">
                  Poland Destination Guide
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Everything about medical tourism in Poland
                </p>
              </Link>
              <Link
                href="/cosmetic-surgery"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">
                  All Cosmetic Surgery
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Browse all cosmetic procedures abroad
                </p>
              </Link>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-rose-600 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <m.h2
              variants={fadeInUp}
              className="text-2xl font-bold text-white sm:text-3xl"
            >
              Get Your Free Rhinoplasty Quote for Poland
            </m.h2>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-2xl text-rose-100"
            >
              Compare prices and surgeons from ISO-accredited clinics in Warsaw,
              Kraków, and KCM Clinic. Receive personalised treatment plans from
              EU-trained rhinoplasty specialists — no obligation.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/clinics?procedure=rhinoplasty&country=poland"
                className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-rose-600 shadow-lg transition-all hover:bg-rose-50 sm:w-auto"
              >
                Compare Rhinoplasty Surgeons
              </Link>
              <Link
                href="/enquiry?procedure=rhinoplasty&country=poland"
                className="w-full rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-rose-700 sm:w-auto"
              >
                Get Free Clinic Recommendations
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-6 text-sm text-rose-200">
              Trusted by 10,000+ UK patients • EU healthcare standards • No
              booking fees
            </m.p>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
