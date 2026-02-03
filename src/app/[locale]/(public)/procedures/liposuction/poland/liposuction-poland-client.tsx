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

interface LiposuctionPolandClientProps {
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

export function LiposuctionPolandClient({ faqs }: LiposuctionPolandClientProps) {
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
              Liposuction in Poland: EU Quality, Advanced Techniques, from £500
            </m.h1>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl"
            >
              Save up to 85% vs UK prices at ISO-accredited clinics in Warsaw,
              Kraków, and Wrocław. EU-regulated, board-certified surgeons
              offering VASER, traditional, and Poland-exclusive N.I.L.
              infrasound liposuction — with flights from just £20.
            </m.p>

            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/clinics?procedure=liposuction&country=poland"
                className="rounded-lg bg-rose-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-rose-700 hover:shadow-xl"
              >
                Compare Liposuction Clinics in Poland →
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-4 text-sm text-slate-500">
              EU-regulated • ISO 9001 / ESPRAS accredited • 1,200+ medical
              facilities • Flights from £20
            </m.p>

            {/* Hero Stats */}
            <m.div
              variants={fadeInUp}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
            >
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">From £500</p>
                <p className="mt-1 text-slate-600">Per area</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">Up to 85%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">3 Cities</p>
                <p className="mt-1 text-slate-600">1,200+ facilities</p>
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
              Why Poland Is Europe&apos;s Rising Star for Liposuction
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-6 space-y-4 text-slate-600"
              data-aeo="liposuction-poland-benefits"
            >
              <p>
                Poland&apos;s medical tourism sector grows at 20% annually, with
                over 100,000 foreign patients visiting for treatment. The
                country combines full EU healthcare regulation with Eastern
                European pricing — delivering exceptional value without
                compromising on safety or quality. With 1,200+ medical
                facilities offering cosmetic procedures, Poland has rapidly
                become one of Europe&apos;s most popular destinations for{' '}
                <Link
                  href="/cosmetic-surgery"
                  className="text-rose-600 hover:underline"
                >
                  cosmetic surgery
                </Link>
                .
              </p>

              <p>
                Unlike Hungary (Budapest only) or Turkey (Istanbul-centric),
                Poland offers multiple world-class medical cities. Warsaw, the
                capital, has the largest clinic selection including
                Poland&apos;s only dedicated liposuction clinic. Kraków offers a
                UNESCO World Heritage setting for recovery with strong medical
                schools. Wrocław — the &ldquo;Polish Venice&rdquo; with 12
                islands and 130 bridges — provides the lowest starting prices
                and serves as the gateway to Europe&apos;s leading N.I.L.
                specialist clinic.
              </p>

              <p>
                Poland is one of the few countries offering N.I.L. (Nutational
                Infrasound Liposuction), a Belgian technology where the cannula
                generates spiral movement via compressed air. Infrasound waves
                avoid contact with nerves and tissue, resulting in minimal pain,
                reduced trauma, and faster recovery. KCM Clinic in Jelenia Góra
                (90km from Wrocław) is Europe&apos;s leading N.I.L. specialist —
                a technique not available in the UK, Turkey, Hungary, or Spain.
              </p>

              <p>
                Polish surgeons complete extensive training (6-year medical
                degree plus 5–6 years specialist training) and must be certified
                by the Polish Society of Plastic, Reconstructive and Aesthetic
                Surgery. Many hold international credentials including ESPRAS
                and EBOPRAS certification. And with return flights from UK
                cities starting at just £20 on Ryanair and Wizz Air, Poland is
                one of the cheapest destinations to reach for medical tourism.
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
              How Much Does Liposuction Cost in Poland?
            </m.h2>

            {/* Cost by Technique */}
            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="liposuction-poland-cost"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Cost by Technique
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Procedure
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Poland Price
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
                        Traditional liposuction (1 area)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £500–£3,800
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,000–£6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        40–85%
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        VASER liposuction (1 area)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,400–£3,700
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £4,700–£11,200
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        50–67%
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        N.I.L. infrasound liposuction
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,500–£3,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500 italic sm:px-6">
                        Not available in UK
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500 sm:px-6">
                        —
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Lipo 360
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,500–£4,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £5,000–£9,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        50–55%
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Multi-area packages
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        From €1,900 (≈£1,600)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        —
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        —
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            {/* Cost by City */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Cost by City
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        City
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Price Range
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Wrocław
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        From £500
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Lowest starting prices. NavMedica and KCM Clinic nearby
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Warsaw
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,500–£3,800
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Capital city premium. Widest clinic selection. Centrum
                        Liposukcji
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Kraków
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,200–£3,500
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Strong medical heritage. AllMedica Surgery
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Poznań
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,200–£3,000
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Smaller city, competitive pricing
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Szczecin
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,000–£2,800
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Beauty Group clinic
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            {/* Package Inclusions */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Package Inclusions (Typical)
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Surgery</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Surgeon&apos;s fee + operating theatre
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Hospital Stay</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Overnight if general anaesthesia
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Anaesthesia</p>
                  <p className="mt-1 text-sm text-slate-600">
                    General or local anaesthesia
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Pre-op</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Consultation and blood work
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Compression Garment
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Post-operative compression garment
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Follow-ups</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Post-operative appointments
                  </p>
                </div>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                <strong>Note on Polish packages:</strong> Polish clinics tend to
                offer surgical packages rather than &ldquo;all-inclusive&rdquo;
                packages. Hotel and transfers are usually booked separately,
                which gives patients more flexibility and can reduce costs —
                Polish hotels are very affordable with central 4-star hotels
                from €50–€80/night.
              </p>

              <p>
                The wide price range (£500–£3,800) reflects both city
                differences and the range from small-area procedures to
                multi-area VASER. Wrocław offers the lowest starting prices;
                Warsaw has the most comprehensive facilities.
              </p>

              <p className="text-sm italic">
                Prices based on published rates from KCM Clinic, Centrum
                Liposukcji, NavMedica, and WhatClinic (2024–2025). Request a
                personalised quote for accurate pricing.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* N.I.L. Section */}
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
              N.I.L. Liposuction: Poland&apos;s Exclusive Infrasound Technology
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-6 space-y-4 text-slate-600"
              data-aeo="nil-liposuction-poland"
            >
              <p>
                <strong>N.I.L. stands for Nutational Infrasound Liposuction</strong>{' '}
                — a Belgian technology that represents the gentlest approach to
                fat removal available today. Unlike traditional liposuction,
                VASER, or laser techniques, N.I.L. uses a specialised cannula
                that generates spiral movement using compressed air at
                infrasound frequencies.
              </p>

              <p>
                The key advantage of N.I.L. is that infrasound waves avoid
                direct contact with nerves and connective tissue. The result is
                significantly less pain, reduced tissue trauma, minimal
                bruising, and faster recovery compared to traditional methods.
                It&apos;s ideal for patients who prioritise the gentlest
                possible procedure or are concerned about nerve damage.
              </p>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                N.I.L. vs Other Techniques
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Factor
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        N.I.L.
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Traditional
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        VASER
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Laser
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Pain level
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        Very low
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Moderate
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Low–Moderate
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Low–Moderate
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Tissue trauma
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        Minimal
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Higher
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Low
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Low
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Nerve preservation
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        Excellent
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Standard
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Good
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Good
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Recovery time
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        Fast
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Slower
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Fast
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Fast
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Availability
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Limited (Poland, Belgium)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Worldwide
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Widespread
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Widespread
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Cost (Poland)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,500–£3,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £500–£3,800
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £2,400–£3,700
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £1,500–£3,000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Where to Get N.I.L. Liposuction
                </h3>
                <p className="mt-2 text-slate-600">
                  <strong>KCM Clinic</strong> in Jelenia Góra (90km from
                  Wrocław) is Europe&apos;s leading N.I.L. liposuction centre.
                  The clinic specialises in this technique and has performed
                  thousands of procedures. Airport access via Wrocław Airport
                  (~1hr transfer).
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  <strong>Best for:</strong> Patients who prioritise minimal
                  pain and the gentlest possible procedure. Patients concerned
                  about nerve damage. Patients wanting the fastest recovery.
                  Patients interested in an advanced technique not available in
                  the UK.
                </p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Top Clinics Section */}
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
              Top Liposuction Clinics in Poland
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    KCM Clinic
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Jelenia Góra
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">90km from Wrocław</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• Poland&apos;s leading N.I.L. infrasound specialist</li>
                  <li>• Multi-discipline clinic, international focus</li>
                  <li>• ISO accredited</li>
                  <li>• N.I.L. + traditional + VASER techniques</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Centrum Liposukcji
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Warsaw
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• Poland&apos;s only dedicated liposuction clinic</li>
                  <li>• Offers 10+ liposuction methods</li>
                  <li>• Specialists exclusively focused on body contouring</li>
                  <li>• Central Warsaw location</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    NavMedica
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Wrocław
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  10 mins from Wrocław Airport
                </p>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• Convenient for UK patients</li>
                  <li>• Plastic surgery and body contouring specialist</li>
                  <li>• English-speaking team</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    AllMedica Surgery
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Kraków
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• Multi-specialty clinic</li>
                  <li>• Modern facilities in Poland&apos;s cultural capital</li>
                  <li>• International patient experience</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Allestetis
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Nowy Targ
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">Near Kraków</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• Lead surgeon: Dr. Boligłowa</li>
                  <li>• Body contouring specialist</li>
                  <li>• Mountain setting, personalised care</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Beauty Group
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Szczecin
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• Northwest Poland, near German border</li>
                  <li>• Body contouring and plastic surgery</li>
                  <li>• Growing international patient base</li>
                </ul>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Notable Surgeon
              </h3>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <p className="font-medium text-slate-900">Dr. Ilona Osadowska</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  <li>
                    • Performs 400 body liposuctions annually — one of the
                    highest volumes in Poland
                  </li>
                  <li>
                    • Specialist in body contouring and multiple liposuction
                    techniques
                  </li>
                  <li>• Extensive experience with international patients</li>
                </ul>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Recovery Section */}
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
              Liposuction Recovery in Poland: What to Expect
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="liposuction-poland-recovery"
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
                        Procedure 1–3 hours. Overnight if general anaesthesia.
                        Compression garment fitted.
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
                        Dressings checked. Light walking around the city
                        encouraged.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Bruising peaks
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Days 3–7
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Normal bruising. N.I.L. patients typically experience
                        less bruising.
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
                        2–2.5 hour flight to London well-tolerated.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Return to desk work
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Days 3–14
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        N.I.L. and VASER patients often return faster (3–7
                        days). Traditional: 7–14 days.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Compression garment
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Up to 6 weeks
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Worn continuously, removing only to wash.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Final results
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        3–6 months
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Swelling resolves gradually over 8–12 weeks.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                City-Specific Travel Tips
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="font-medium text-slate-900">Warsaw</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>• 2 hrs from London (multiple daily flights)</li>
                    <li>• Old Town and Łazienki Park for recovery walks</li>
                    <li>• Metro system for easy transport</li>
                    <li>• Hotels: 4-star from €60/night</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="font-medium text-slate-900">Kraków</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>• 2.5 hrs from London</li>
                    <li>• UNESCO World Heritage Old Town</li>
                    <li>• Flat Main Square and Planty Park</li>
                    <li>• Hotels: 4-star from €50/night</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="font-medium text-slate-900">Wrocław</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>• 2 hrs from London (Ryanair hub)</li>
                    <li>• &ldquo;Polish Venice&rdquo; — 12 islands, 130 bridges</li>
                    <li>• Gateway to KCM Clinic (N.I.L. specialist)</li>
                    <li>• Hotels: 4-star from €45/night — best value</li>
                  </ul>
                </div>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-6">
              <p className="text-slate-600">
                <strong>Recommended stay:</strong> 7 days (allows for surgery, 2
                follow-ups, and fit-to-fly clearance)
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Destination Comparison */}
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
              Comparing Liposuction Destinations
            </m.h2>

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
                href="/procedures/liposuction/hungary"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">Hungary</p>
                <p className="mt-1 text-sm text-rose-600">From £1,165/area</p>
                <p className="mt-2 text-sm text-slate-600">
                  Lowest EU prices, Budapest-centric, EU-regulated
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
              Frequently Asked Questions About Liposuction in Poland
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
              Get Your Free Liposuction Quote for Poland
            </m.h2>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-2xl text-rose-100"
            >
              Compare prices from ISO-accredited clinics in Warsaw, Kraków, and
              Wrocław. EU consumer protections, advanced N.I.L. technology, and
              flights from just £20 — no obligation.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/clinics?procedure=liposuction&country=poland"
                className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-rose-600 shadow-lg transition-all hover:bg-rose-50 sm:w-auto"
              >
                Compare Liposuction Clinics in Poland
              </Link>
              <Link
                href="/enquiry?procedure=liposuction&country=poland"
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
