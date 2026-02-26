'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { HU, TR } from 'country-flag-icons/react/3x2'

// =============================================================================
// TYPES
// =============================================================================

interface FAQ {
  question: string
  answer: string
}

interface TummyTuckHungaryClientProps {
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

export function TummyTuckHungaryClient({ faqs }: TummyTuckHungaryClientProps) {
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
            <m.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <div className="w-12 overflow-hidden rounded shadow-sm">
                <HU title="Hungary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Tummy Tuck in Hungary
              </h1>
            </m.div>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl"
            >
              Hungary offers the lowest tummy tuck prices in Europe — from
              £1,750. Compare verified Budapest clinics, EU-regulated surgeons,
              and all-inclusive packages with surgery, hotel, and transfers
              included.
            </m.p>

            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/clinics?procedure=tummy-tuck&country=hungary"
                className="rounded-lg bg-rose-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-rose-700 hover:shadow-xl"
              >
                Browse Tummy Tuck Clinics in Hungary →
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-4 text-sm text-slate-500">
              EU-regulated • ISO-certified clinics • 2.5hr flight from London •
              Free consultation matching
            </m.p>

            {/* Hero Stats */}
            <m.div
              variants={fadeInUp}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
            >
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">From £1,750</p>
                <p className="mt-1 text-slate-600">Lowest in Europe</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">Up to 80%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">60 Clinics</p>
                <p className="mt-1 text-slate-600">In Budapest</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Why Hungary Section */}
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
              Why UK Patients Choose Hungary for Tummy Tuck Surgery
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-6 space-y-4 text-slate-600"
              data-aeo="tummy-tuck-hungary-benefits"
            >
              <p>
                Hungary offers the lowest starting prices for abdominoplasty in
                Europe — from £1,750 compared to £2,900 in{' '}
                <Link
                  href="/procedures/tummy-tuck/turkey"
                  className="text-rose-600 hover:underline"
                >
                  Turkey
                </Link>{' '}
                and £4,500–£10,000 in the UK. This represents savings of up to
                80% compared to UK private prices, making Hungary the
                smart-budget choice for savvy patients seeking{' '}
                <Link
                  href="/procedures/tummy-tuck"
                  className="text-rose-600 hover:underline"
                >
                  tummy tuck abroad
                </Link>
                .
              </p>

              <p>
                As an EU member state, Hungarian clinics must comply with EU
                medical device regulations, patient rights directives, and
                hygiene standards. The EU cross-border healthcare directive
                applies, giving UK patients tangible consumer protections that
                don&apos;t exist with non-EU destinations. This regulatory
                framework is Hungary&apos;s key differentiator.
              </p>

              <p>
                All 60 clinics offering tummy tuck are concentrated in Budapest,
                making logistics simple. Hungary has one of Europe&apos;s oldest
                medical traditions — Semmelweis University, founded in 1769, is
                internationally respected. Many Hungarian surgeons hold
                additional international certifications including EBOPRAS
                (European Board of Plastic Surgery) and ISAPS membership.
              </p>

              <p>
                Proximity and convenience add to Hungary&apos;s appeal: 2.5-hour
                flights from London on Ryanair and Wizz Air, with budget fares
                from £25–£80 return. No visa required for UK citizens. Published
                data shows complication rates as low as 3.1% at leading Budapest
                clinics, with overall success rates above 92%.
              </p>
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
              How Much Does a Tummy Tuck Cost in Hungary?
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="tummy-tuck-hungary-cost"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Tummy Tuck Prices in Hungary
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Procedure
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Hungary (£)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Hungary (€)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Hungary ($)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Standard Full Abdominoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,750–£3,600
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €1,750–€4,296
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        $1,852–$4,500
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Mini Tummy Tuck
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        From £2,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        From €2,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        From $2,100
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Tummy Tuck + Liposuction
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,200–£5,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €3,500–€5,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        $4,000–$5,500
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Extended / Fleur-de-Lis
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,000–£5,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €3,500–€5,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        $3,500–$6,000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Hungary vs UK Price Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Procedure
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-rose-600 sm:px-6">
                        Hungary
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        UK (Private)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Saving
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Standard Full Tummy Tuck
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,750–£3,600
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £4,500–£10,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        Up to 80%
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Mini Tummy Tuck
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        From £2,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,500–£6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        Up to 67%
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Tummy Tuck + Lipo
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,200–£5,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £6,000–£14,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        Up to 65%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                What&apos;s Typically Included in Hungary Packages
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Surgery</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Surgeon&apos;s fee + anaesthesia
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Hospital</p>
                  <p className="mt-1 text-sm text-slate-600">
                    1–2 nights ISO-certified facility
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Pre-op</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Consultations + blood tests
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Post-op</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Compression garment + follow-ups
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Accommodation</p>
                  <p className="mt-1 text-sm text-slate-600">
                    4–7 nights 3–4 star hotel
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Transfers</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Airport pickup + clinic transfers
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Coordinator</p>
                  <p className="mt-1 text-sm text-slate-600">
                    English-speaking support
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Payment</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Interest-free plans available
                  </p>
                </div>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                Hungary&apos;s pricing advantage comes from lower operating
                costs and a favourable cost-of-living environment — not from
                lower quality. Hungarian surgeons are trained to the same EU
                standards as their Western European counterparts, with many
                holding additional international certifications.
              </p>

              <p className="text-sm italic">
                Prices based on published clinic rates and verified quotes.
                Actual costs may vary. Request a personalised quote for accurate
                pricing.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Clinics Section */}
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
              Top-Rated Tummy Tuck Clinics in Budapest
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Beauty Hungary — Dr. Molnár
                    </h3>
                    <p className="text-sm text-slate-500">Budapest</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    Specialist
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Specialist plastic surgery clinic. English-speaking surgeon
                  with international experience. Full range of body contouring
                  procedures including tummy tuck and liposuction.
                </p>
                <Link
                  href="/clinics/cosmetic-surgery/clinic-center"
                  className="mt-4 inline-block text-rose-600 hover:underline"
                >
                  View Clinic Profile →
                </Link>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Széptest Cosmetic Surgery
                    </h3>
                    <p className="text-sm text-slate-500">Budapest</p>
                  </div>
                  <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                    ISO 9001
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Established 2002. ISO:9001 certified. One of Budapest&apos;s
                  longest-running cosmetic surgery clinics. Specialises in body
                  contouring procedures.
                </p>
                <Link
                  href="/clinics/cosmetic-surgery/clinic-center"
                  className="mt-4 inline-block text-rose-600 hover:underline"
                >
                  View Clinic Profile →
                </Link>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Pataki Plastic Surgery
                    </h3>
                    <p className="text-sm text-slate-500">Budapest</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    Boutique
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Dr. Pataki, board-certified plastic surgeon. Known for
                  abdominoplasty and body sculpting. Personal approach with
                  smaller patient volumes for dedicated attention.
                </p>
                <Link
                  href="/clinics/cosmetic-surgery/clinic-center"
                  className="mt-4 inline-block text-rose-600 hover:underline"
                >
                  View Clinic Profile →
                </Link>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Mona Lisa Centrum
                    </h3>
                    <p className="text-sm text-slate-500">Budapest</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    Multi-specialty
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Multi-specialty clinic with dedicated cosmetic surgery
                  department. Modern facility in central Budapest. Full range of
                  body and facial procedures.
                </p>
                <Link
                  href="/clinics/cosmetic-surgery/clinic-center"
                  className="mt-4 inline-block text-rose-600 hover:underline"
                >
                  View Clinic Profile →
                </Link>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Dolemed Aesthetic Clinic
                    </h3>
                    <p className="text-sm text-slate-500">Budapest</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    All-Inclusive
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Popular with international patients. All-inclusive packages
                  available. English-speaking team throughout. Competitive
                  pricing.
                </p>
                <Link
                  href="/clinics/cosmetic-surgery/clinic-center"
                  className="mt-4 inline-block text-rose-600 hover:underline"
                >
                  View Clinic Profile →
                </Link>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Liv Duna Medical Center
                    </h3>
                    <p className="text-sm text-slate-500">Budapest</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    Medical Centre
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Part of a larger medical centre with full diagnostic
                  capabilities. Ideal for patients with complex medical
                  histories requiring comprehensive pre-op assessment.
                </p>
                <Link
                  href="/clinics/cosmetic-surgery/clinic-center"
                  className="mt-4 inline-block text-rose-600 hover:underline"
                >
                  View Clinic Profile →
                </Link>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Recovery Timeline Section */}
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
              Tummy Tuck Recovery in Budapest: What to Expect
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="tummy-tuck-hungary-recovery"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Your Recovery Timeline in Hungary
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
                        Day 0 — Surgery
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Procedure under general anaesthesia (2–4 hours).
                        Overnight stay in hospital for monitoring.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Day 1–2 — Hospital
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Monitored in hospital. First assisted walks. Drains
                        managed. Compression garment checked.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Day 2–3 — Discharge
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Discharged to hotel. Compression garment worn
                        continuously. Rest with light movement.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Days 3–5 — Clinic Visits
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Follow-up appointments for drain removal and wound
                        checks. Stitches assessed.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Day 7 — Fit to Fly
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Surgeon assessment and fit-to-fly clearance. Compression
                        stockings for the flight.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Day 7–10 — Departure
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Airport transfer. Remote follow-up begins with photos
                        and video calls.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div
              variants={fadeInUp}
              className="mt-8 rounded-lg bg-white p-6 shadow-sm"
            >
              <p className="font-semibold text-slate-900">
                Recommended Hungary Trip Length
              </p>
              <p className="mt-2 text-slate-600">
                7–10 days minimum. Some clinics recommend a 15-day stay for
                optimal monitoring, particularly for extended procedures or
                patients with higher BMI. The longer stay allows for any minor
                complications to be addressed before you fly home.
              </p>
            </m.div>

            <m.div variants={fadeInUp} className="mt-6 text-slate-600">
              <p>
                Post-return recovery follows the standard timeline: 10–14 days
                before returning to desk work, 4–6 weeks for manual work, and
                3–6 months for full recovery. Wear your compression garment for
                6–8 weeks as directed.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Hungary vs Turkey Section */}
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
              Tummy Tuck in Hungary vs Turkey: Which Is Right for You?
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      Factor
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-rose-600 sm:px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-6 overflow-hidden rounded-sm shadow-sm">
                          <HU title="Hungary" />
                        </div>
                        <span>Hungary</span>
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-6 overflow-hidden rounded-sm shadow-sm">
                          <TR title="Turkey" />
                        </div>
                        <span>Turkey</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Starting price
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      £1,750
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      £2,900
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      All-inclusive packages
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Available but simpler
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      Comprehensive (hotel + VIP transfers + tours)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      EU regulation
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      Yes — full EU member
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      No
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Flight from London
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      2.5 hours
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      3.5–4 hours
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Number of clinics
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      ~60 (Budapest)
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      425+ (Istanbul, Antalya)
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Surgeon volume
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Lower, more personal
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      Higher volume, more experienced
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Best for
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                      Lowest price + EU protections
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Maximum value packages + choice
                    </td>
                  </tr>
                </tbody>
              </table>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                Choose Hungary if you prioritise EU consumer protections, the
                lowest possible starting price, and a shorter flight from the
                UK. Hungary&apos;s concentrated Budapest market makes logistics
                simple, and the EU regulatory framework provides tangible peace
                of mind.
              </p>

              <p>
                Choose{' '}
                <Link
                  href="/procedures/tummy-tuck/turkey"
                  className="text-rose-600 hover:underline"
                >
                  Turkey
                </Link>{' '}
                if you want the most comprehensive all-inclusive package, the
                widest choice of JCI-accredited hospitals, and surgeons with the
                highest procedure volumes. Turkey&apos;s packages often include
                more services, and total out-of-pocket cost may be similar
                despite the higher headline price.
              </p>

              <p>
                Also consider{' '}
                <Link
                  href="/procedures/tummy-tuck/poland"
                  className="text-rose-600 hover:underline"
                >
                  tummy tuck in Poland
                </Link>{' '}
                or{' '}
                <Link
                  href="/procedures/tummy-tuck/spain"
                  className="text-rose-600 hover:underline"
                >
                  tummy tuck in Spain
                </Link>{' '}
                for other EU-regulated options with different pricing and
                infrastructure profiles.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Practical Information Section */}
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
              Planning Your Tummy Tuck Trip to Budapest
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Flights</h3>
                <p className="mt-2 text-slate-600">
                  Ryanair, Wizz Air, BA from London, Manchester, Edinburgh. 2.5
                  hours. Budget fares from £25–£80 return.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Visa</h3>
                <p className="mt-2 text-slate-600">
                  Not required for UK citizens (stays under 90 days). Valid
                  passport needed. EU member state.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Currency</h3>
                <p className="mt-2 text-slate-600">
                  Hungarian Forint (HUF). Cards widely accepted. Most clinics
                  quote in GBP or EUR for UK patients.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Accommodation</h3>
                <p className="mt-2 text-slate-600">
                  Many clinics offer packages with 3–4 star hotel. Independent
                  hotels from £35–£70/night in central Budapest.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Insurance</h3>
                <p className="mt-2 text-slate-600">
                  Standard travel insurance won&apos;t cover elective cosmetic
                  surgery. Recommend specialist medical travel insurance.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Language</h3>
                <p className="mt-2 text-slate-600">
                  Hungarian. English widely spoken at medical facilities and
                  tourist areas. Clinics have English-speaking coordinators.
                </p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked Questions About Tummy Tuck in Hungary
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8 space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-lg bg-slate-50 shadow-sm"
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
              Get Your Free Tummy Tuck Quote from Budapest Clinics
            </m.h2>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-2xl text-rose-100"
            >
              Compare prices from verified Budapest clinics. Receive
              personalised treatment plans from EU-regulated surgeons — no
              obligation.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/clinics?procedure=tummy-tuck&country=hungary"
                className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-rose-600 shadow-lg transition-all hover:bg-rose-50 sm:w-auto"
              >
                Browse Tummy Tuck Clinics in Hungary
              </Link>
              <Link
                href="/enquiry?procedure=tummy-tuck&country=hungary"
                className="w-full rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-rose-700 sm:w-auto"
              >
                Get Free Clinic Recommendations
              </Link>
            </m.div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
