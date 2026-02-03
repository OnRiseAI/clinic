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

interface LiposuctionHungaryClientProps {
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

export function LiposuctionHungaryClient({ faqs }: LiposuctionHungaryClientProps) {
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
              Liposuction in Hungary: Lowest EU Prices from £1,165
            </m.h1>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl"
            >
              Save up to 80% vs UK prices at ISO-accredited Budapest clinics.
              Full EU consumer protections, board-certified surgeons, and
              all-inclusive packages — just a 2.5-hour flight from London.
            </m.p>

            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/clinics?procedure=liposuction&country=hungary"
                className="rounded-lg bg-rose-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-rose-700 hover:shadow-xl"
              >
                Compare Liposuction Clinics in Budapest →
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-4 text-sm text-slate-500">
              EU-regulated • ISO 9001 accredited • Board-certified surgeons •
              2.5hrs from London
            </m.p>

            {/* Hero Stats */}
            <m.div
              variants={fadeInUp}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
            >
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">From £1,165</p>
                <p className="mt-1 text-slate-600">Per area, lowest in EU</p>
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
              Why Choose Budapest for Liposuction?
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-6 space-y-4 text-slate-600"
              data-aeo="liposuction-hungary-benefits"
            >
              <p>
                Hungary offers the lowest liposuction starting prices in the
                European Union — from £1,165 per area. That&apos;s up to 80%
                savings compared to UK private clinic rates, making it the most
                affordable EU option for patients who want the legal protections
                of EU healthcare regulation without the longer travel time to
                Turkey or other non-EU destinations.
              </p>

              <p>
                As an EU member state, Hungary operates under European medical
                device regulations, GDPR data protection, and the cross-border
                healthcare directive. Patients benefit from EU consumer
                protections that don&apos;t apply in Turkey. Hungarian clinics
                hold ISO 9001 certifications, MPHEST (Hungarian Society for
                Plastic, Reconstructive and Aesthetic Surgery) accreditation,
                and MOK (Hungarian Medical Chamber) registration. Many surgeons
                have trained at internationally recognised institutions in
                Germany, Austria, or the UK.
              </p>

              <p>
                All major clinics are concentrated in Budapest — a compact,
                walkable city with a world-class medical tradition dating back
                centuries. The city&apos;s famous thermal baths make the recovery
                period uniquely pleasant (though you&apos;ll need to wait 3–4
                weeks post-surgery before enjoying them). Hungary pioneered
                medical tourism in Central Europe over 20 years ago, starting
                with dental tourism, so the infrastructure — English-speaking
                coordinators, transfer services, recovery accommodation — is
                fully mature.
              </p>

              <p>
                Budapest is just 2.5 hours from London with multiple daily
                flights on budget carriers. Weekday return flights cost £50–£80,
                making it the most accessible EU destination for UK patients
                seeking affordable{' '}
                <Link
                  href="/cosmetic-surgery"
                  className="text-rose-600 hover:underline"
                >
                  cosmetic surgery
                </Link>
                .
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
              How Much Does Liposuction Cost in Hungary?
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="liposuction-hungary-cost"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Cost by Area & Technique
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Procedure
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Hungary Price
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        UK Equivalent
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Savings
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Liposuction (1 area)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,165–£1,775
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,000–£6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        60–70%
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Liposuction (2 areas)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,900–£2,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £5,000–£10,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        60–75%
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        VASER liposuction (1 area)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,500–£2,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £4,700–£11,200
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        68–80%
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Lipo 360
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,000–£3,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £5,000–£9,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        60–65%
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Chin/Neck liposuction
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £800–£1,400
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £2,400–£4,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        65–70%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            {/* Package Inclusions */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                What&apos;s Included in Budapest Packages
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Surgery</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Surgeon&apos;s fee + operating theatre
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Hospital Stay</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Overnight if general anaesthesia; same-day if local
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Anaesthesia</p>
                  <p className="mt-1 text-sm text-slate-600">
                    General or local anaesthesia included
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Pre-op</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Consultation and pre-operative tests
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Compression Garment
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Post-operative compression garment included
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Medications</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Post-operative medication included
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Follow-ups</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Appointments at clinic before departure
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Coordinator</p>
                  <p className="mt-1 text-sm text-slate-600">
                    English-speaking patient coordinator
                  </p>
                </div>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                <strong>Note on packages:</strong> Hungarian clinic packages tend
                to be more &ldquo;à la carte&rdquo; than Turkish packages. Hotel
                accommodation and airport transfers are sometimes included but
                often booked separately. This can be advantageous — you choose
                your own hotel and only pay for what you need.
              </p>

              <p>
                Budapest&apos;s lower cost of living reduces clinic overheads,
                enabling competitive pricing without compromising quality. The
                concentration of 60 clinics in one city creates healthy price
                competition. Multi-area discounts are standard — second and third
                areas are typically 30–40% cheaper than the first area.
              </p>

              <p className="text-sm italic">
                Prices based on published rates from Bookimed, Szeptest Cosmetic
                Surgery, Art Medic Clinic, Elite Clinic, and WhatClinic
                (2024–2025). Request a personalised quote for accurate pricing.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Top Clinics Section */}
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
              Top Liposuction Clinics in Budapest
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Szeptest Cosmetic Surgery
                </h3>
                <p className="mt-1 text-sm text-slate-500">Budapest</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• Established 2002 — over 20 years of operation</li>
                  <li>• ISO 9001 certified</li>
                  <li>• Specialises in liposuction and body contouring</li>
                  <li>• Popular with UK and Western European patients</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Art Medic Clinic
                </h3>
                <p className="mt-1 text-sm text-slate-500">Budapest</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>
                    • Established 1991 — one of Hungary&apos;s oldest private
                    cosmetic surgery clinics
                  </li>
                  <li>• Plastic surgery, aesthetic medicine, and ENT</li>
                  <li>• International patient base (US, Canada, UK)</li>
                  <li>• Located centrally in Budapest</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Elite Clinic
                </h3>
                <p className="mt-1 text-sm text-slate-500">Budapest</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>
                    • Lead surgeon: Dr. Csaba Molnár — former president of MPHEST
                  </li>
                  <li>• Board-certified plastic surgeon</li>
                  <li>• Specialist in body contouring and liposuction</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Premium Plastic Surgery Clinic
                </h3>
                <p className="mt-1 text-sm text-slate-500">Budapest</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• Established 2010</li>
                  <li>• Focus on cosmetic surgery for international patients</li>
                  <li>• Modern facilities with latest equipment</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Pataki Plastic Surgery
                </h3>
                <p className="mt-1 text-sm text-slate-500">Budapest</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• 96% patient recommendation rate</li>
                  <li>• Personal approach with direct surgeon consultations</li>
                  <li>• Strong patient reviews on multiple platforms</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Perfect You Plastic Surgery
                </h3>
                <p className="mt-1 text-sm text-slate-500">Budapest</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>
                    • Lead surgeon: Dr. István Bulyovszky — 20+ years experience
                  </li>
                  <li>• Specialist in VASER and body sculpting</li>
                  <li>• Comprehensive pre- and post-operative care</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Dolemed Aesthetic Clinic
                </h3>
                <p className="mt-1 text-sm text-slate-500">Budapest</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• Established 2005</li>
                  <li>• Aesthetic medicine and plastic surgery</li>
                  <li>• Growing international patient base</li>
                </ul>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Surgeon Accreditation Context
              </h3>
              <p className="text-slate-600">
                Hungarian plastic surgeons must be registered with MOK (Hungarian
                Medical Chamber) and typically hold membership in MPHEST. Many
                have trained or practised in Western European countries (Germany,
                Austria, UK) before returning to Hungary. EBOPRAS (European Board
                of Plastic, Reconstructive and Aesthetic Surgery) certification
                is held by several leading Budapest surgeons.
              </p>
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
              Liposuction Recovery in Budapest: What to Expect
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="liposuction-hungary-recovery"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Phase
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Timeframe
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        What to Expect
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Surgery day
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Day 0
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Procedure 1–3 hours. Overnight stay if general
                        anaesthesia, same-day discharge if local. Compression
                        garment fitted.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        First follow-up
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Day 2–3
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Dressings checked, drain removal if applicable. Light
                        walking around Budapest encouraged.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Bruising peaks
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Days 5–7
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Normal post-operative bruising. VASER patients have less
                        bruising than traditional.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Fit to fly
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Day 5–7
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Most patients cleared for the 2.5-hour flight to London.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Stitches removed
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Day 12
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        May require a local follow-up with your GP or private
                        clinic in the UK if returning before day 12.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Return to work
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Days 7–14
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Desk work from day 7 (VASER) or day 10–14 (traditional).
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Final results
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        6 weeks–3 months
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Bruising fully resolved by 2 weeks. Swelling subsides
                        over 6–12 weeks. Compression garment worn for up to 6
                        weeks.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Budapest Recovery Tips
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Recommended Stay</p>
                  <p className="mt-1 text-sm text-slate-600">
                    7 days (allows for surgery, 2 follow-ups, and fit-to-fly
                    clearance)
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Thermal Baths</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Budapest is famous for its thermal baths, but wait at least
                    3–4 weeks post-surgery before immersing in water. Enjoy them
                    on a return visit.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Walking Routes</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Budapest&apos;s flat Pest side is ideal for gentle post-op
                    walking. The Danube promenade provides a pleasant, level
                    route.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Where to Stay</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Stay in Pest (Districts V, VI, or VII) for easy clinic access
                    and flat terrain. Most clinics are within 15 minutes of major
                    hotels.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Post-op Compression
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Clinics provide compression garments, but consider bringing a
                    spare. Hungarian pharmacies (gyógyszertár) also stock medical
                    compression wear.
                  </p>
                </div>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Comparison Section */}
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
              Liposuction in Hungary vs Turkey, Poland & Spain
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Factor
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Hungary 🇭🇺
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Turkey 🇹🇷
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Poland 🇵🇱
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Spain 🇪🇸
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Starting price
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,165 (lowest)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £1,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £2,400
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        EU regulated
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-green-600 sm:px-6">
                        ✅ Yes
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-red-600 sm:px-6">
                        ❌ No
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-green-600 sm:px-6">
                        ✅ Yes
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-green-600 sm:px-6">
                        ✅ Yes
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Flight time (London)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        2.5 hrs
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        3.5–4 hrs
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        2–2.5 hrs
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        2–2.5 hrs
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        All-inclusive packages
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Partial (à la carte)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-green-600 sm:px-6">
                        ✅ Most comprehensive
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Partial
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Partial
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Clinic concentration
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        60 in Budapest
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        425+ (Istanbul)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Multi-city
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Multi-city
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Technique range
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Traditional, VASER
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        All incl. HD
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Trad, VASER, N.I.L.
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        All incl. HD
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Best for
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Budget + EU safety
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Volume, packages
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Specialist tech, EU
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Premium quality
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-4 sm:grid-cols-3"
            >
              <Link
                href="/procedures/liposuction/turkey"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">Turkey</p>
                <p className="mt-1 text-sm text-rose-600">From £1,500/area</p>
                <p className="mt-2 text-sm text-slate-600">
                  Widest choice, all-inclusive packages, 45,000+ procedures/year
                </p>
              </Link>
              <Link
                href="/procedures/liposuction/poland"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">Poland</p>
                <p className="mt-1 text-sm text-rose-600">From £500/area</p>
                <p className="mt-2 text-sm text-slate-600">
                  EU-regulated, N.I.L. technology, multi-city options
                </p>
              </Link>
              <Link
                href="/procedures/liposuction/spain"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">Spain</p>
                <p className="mt-1 text-sm text-rose-600">From £2,400/area</p>
                <p className="mt-2 text-sm text-slate-600">
                  Premium quality, #1 healthcare ranking, world-class hospitals
                </p>
              </Link>
            </m.div>

            <m.div variants={fadeInUp} className="mt-6 text-center">
              <Link
                href="/procedures/liposuction"
                className="inline-flex items-center text-rose-600 hover:underline"
              >
                ← Compare all liposuction destinations
              </Link>
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
              Frequently Asked Questions About Liposuction in Hungary
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
              Get Your Free Liposuction Quote for Budapest
            </m.h2>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-2xl text-rose-100"
            >
              Compare prices from ISO-accredited clinics in Budapest. EU consumer
              protections, board-certified surgeons, and the lowest prices in
              Europe — no obligation.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/clinics?procedure=liposuction&country=hungary"
                className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-rose-600 shadow-lg transition-all hover:bg-rose-50 sm:w-auto"
              >
                Compare Liposuction Clinics in Budapest
              </Link>
              <Link
                href="/enquiry?procedure=liposuction&country=hungary"
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
