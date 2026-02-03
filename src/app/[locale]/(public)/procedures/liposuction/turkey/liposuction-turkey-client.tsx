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

interface LiposuctionTurkeyClientProps {
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

export function LiposuctionTurkeyClient({ faqs }: LiposuctionTurkeyClientProps) {
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
              Liposuction in Turkey: Compare Prices, Techniques & Top Clinics
            </m.h1>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl"
            >
              Save 60–70% on liposuction at JCI-accredited hospitals in Istanbul
              and Antalya. VASER, laser, and 360 lipo — all-inclusive packages
              from £1,500 with verified surgeons and recovery support.
            </m.p>

            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/clinics?procedure=liposuction&country=turkey"
                className="rounded-lg bg-rose-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-rose-700 hover:shadow-xl"
              >
                Compare Liposuction Clinics in Turkey →
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-4 text-sm text-slate-500">
              45,000+ procedures annually • JCI-accredited hospitals •
              All-inclusive packages • Free consultation matching
            </m.p>

            {/* Hero Stats */}
            <m.div
              variants={fadeInUp}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
            >
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">From £1,500</p>
                <p className="mt-1 text-slate-600">Per area, all-inclusive</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">60–70%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">425+ Clinics</p>
                <p className="mt-1 text-slate-600">45,000+ procedures/year</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Why Turkey Section */}
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
              Why Turkey Is the #1 Destination for Liposuction Abroad
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-6 space-y-4 text-slate-600"
              data-aeo="liposuction-turkey-benefits"
            >
              <p>
                Turkey performs 45,000+ liposuction procedures annually, making
                it the world&apos;s busiest destination for cosmetic liposuction
                tourism. This exceptional volume means Turkish surgeons have
                unmatched experience, and competitive pricing is driven by market
                scale rather than corner-cutting. Over 1.2 million medical
                tourists visited Turkey in 2022, with cosmetic surgery being the
                fastest-growing segment.
              </p>

              <p>
                Turkish clinics offer every major liposuction technique —
                traditional tumescent, VASER, laser (SmartLipo), power-assisted
                (PAL), lipo 360, and HD lipo sculpting — whereas many UK clinics
                only offer one or two options. This technique range means you
                can find the right approach for your specific goals, whether
                that&apos;s budget-friendly traditional lipo, precise VASER
                contouring, or athletic HD sculpting.
              </p>

              <p>
                Turkey has more JCI-accredited hospitals than any country outside
                the United States. JCI (Joint Commission International) is the
                gold standard in international hospital accreditation — the same
                standard that accredits top US hospitals like Mayo Clinic and
                Cleveland Clinic. When you choose a JCI-accredited facility in
                Istanbul, you&apos;re receiving care that meets internationally
                recognised safety standards.
              </p>

              <p>
                Turkish clinics pioneered the all-inclusive medical tourism
                package. A typical liposuction package includes surgery, hospital
                stay, 4–7 nights at a 4–5 star hotel, airport transfers,
                compression garment, pre-op tests, post-op medications, and a
                personal English-speaking patient coordinator — all for less than
                the surgery alone would cost in the UK. Complication rates at top
                Turkish clinics are comparable to UK private hospitals: Carely
                Clinic reports a 0.5% complication rate and 0.3% infection rate
                across 2,500+ annual procedures.
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
              How Much Does Liposuction Cost in Turkey?
            </m.h2>

            {/* Cost by Technique */}
            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="liposuction-turkey-cost"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Cost by Technique
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Technique
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Turkey Price
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
                        Traditional/Tumescent
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,500–£3,800/area
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,000–£6,000/area
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        50–60%
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        VASER
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,300–£4,600/area
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £4,700–£11,200/area
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        55–70%
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Laser (SmartLipo)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,700–£5,000/area
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,500–£8,000/area
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        40–55%
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Lipo 360
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,900–£4,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £5,000–£9,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        55–65%
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        HD Lipo
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,500–£5,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £5,500–£12,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        55–65%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            {/* Cost by Body Area */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Cost by Body Area
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Body Area
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Price Range (Turkey)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Abdomen
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,800–£3,800
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Most popular area
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Abdomen + Flanks
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,900–£3,800
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Combined pricing common
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Thighs (inner or outer)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,500–£3,500
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Per pair
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Arms
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,500–£3,500
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Per pair
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Chin/Neck
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,150–£2,300
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Smaller area, lower cost
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Back
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,500–£3,000
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Often combined with flanks
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Lipo 360 (abdomen + flanks + back)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,900–£4,000
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Best value for full torso
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            {/* Package Inclusions */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                All-Inclusive Package Inclusions (Standard)
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
                    1–2 nights for multi-area or VASER; day-case for smaller
                    procedures
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Anaesthesia</p>
                  <p className="mt-1 text-sm text-slate-600">
                    General or local anaesthesia
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Pre-op Tests</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Blood tests and ECG
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
                  <p className="font-medium text-slate-900">Hotel</p>
                  <p className="mt-1 text-sm text-slate-600">
                    4–7 nights 4–5 star (Hilton, Marriott, or equivalent)
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Transfers</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Airport-to-hotel-to-clinic transfers
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Medications</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Post-operative medications included
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Follow-ups</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Appointments on days 2–3 and 5–7
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Patient Coordinator
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Personal English-speaking coordinator
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">24/7 Support</p>
                  <p className="mt-1 text-sm text-slate-600">
                    24/7 support line throughout your stay
                  </p>
                </div>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                <strong>Not typically included:</strong> International flights,
                travel insurance, additional hotel nights beyond the package,
                tips. Istanbul offers the most competitive pricing due to clinic
                density and competition; Antalya is slightly cheaper but has
                fewer specialist options for techniques like HD lipo or VASER
                360.
              </p>

              <p className="text-sm italic">
                Prices based on published rates from Carely Clinic, Dr. MED
                Clinic, International Clinics Istanbul, Bookimed, and Qunomedical
                (2024–2025). Final pricing depends on technique, number of areas,
                and individual assessment. Request a personalised quote for
                accurate pricing.
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
              Top Liposuction Clinics and Surgeons in Turkey
            </m.h2>

            {/* Clinic Cards */}
            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2"
            >
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Carely Clinic
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Istanbul
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• 2,500+ liposuction procedures per year</li>
                  <li>• 0.5% complication rate, 0.3% infection rate</li>
                  <li>• JCI-accredited hospital partners</li>
                  <li>• From €2,400 (≈£2,050)</li>
                  <li>• All techniques: VASER, traditional, laser, 360, HD</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Dr. MED Clinic
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Istanbul
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• 99.5% success rate (clinic-reported)</li>
                  <li>• 4,500+ patients annually across all procedures</li>
                  <li>• JCI-accredited</li>
                  <li>• Specialises in VASER and HD liposuction</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    International Clinics Istanbul
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Istanbul
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• Multi-discipline cosmetic surgery centre</li>
                  <li>• JCI-accredited</li>
                  <li>• Full-service all-inclusive packages</li>
                  <li>• Focus on UK and European patients</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Db&apos;est Clinic
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Istanbul
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• Double board-certified surgeons</li>
                  <li>• VASER and HD lipo specialists</li>
                  <li>• English-speaking team</li>
                  <li>• Comprehensive aftercare programme</li>
                </ul>
              </div>
            </m.div>

            {/* Featured Surgeons */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Featured Surgeons
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="font-medium text-slate-900">Dr. Ergin Er</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>• 31 years of experience</li>
                    <li>• 1,100+ VASER liposuction procedures</li>
                    <li>• 4 national awards in plastic surgery</li>
                    <li>• ISAPS member</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="font-medium text-slate-900">
                    Dr. Halil Ibrahim Canter
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>• 29 years of experience</li>
                    <li>• Specialist in body contouring</li>
                    <li>• Multiple board certifications</li>
                    <li>• International patient focus</li>
                  </ul>
                </div>
              </div>
            </m.div>

            {/* Hospital Infrastructure */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Hospital Infrastructure
              </h3>
              <p className="text-slate-600">
                Liposuction in Turkey is performed at major hospital groups with
                international accreditation:{' '}
                <strong>Acıbadem Healthcare Group</strong> (21 hospitals),{' '}
                <strong>Memorial Healthcare Group</strong>,{' '}
                <strong>Medicana International</strong>, and{' '}
                <strong>Liv Hospital Vadistanbul</strong>. These institutions
                provide a higher level of clinical infrastructure than standalone
                clinics and meet JCI accreditation standards for patient safety.
              </p>
            </m.div>

            <m.p
              variants={fadeInUp}
              className="mt-6 text-sm italic text-slate-500"
            >
              Surgeons listed are frequently recommended by international patient
              coordinators. This is not an endorsement — always verify
              credentials and conduct your own due diligence.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Techniques Section */}
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
              Liposuction Techniques Available in Turkey
            </m.h2>

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Turkey offers the widest range of liposuction techniques of any
              medical tourism destination. Here&apos;s what each technique
              involves and who it&apos;s best suited for.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Traditional/Tumescent
                </h3>
                <p className="mt-1 text-sm text-rose-600">From £1,500/area</p>
                <p className="mt-3 text-sm text-slate-600">
                  Tumescent fluid (saline + lidocaine + epinephrine) is injected
                  first, then a cannula breaks up and suctions out fat. The gold
                  standard technique with the longest track record.
                </p>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="text-xs font-medium text-slate-500">BEST FOR</p>
                  <p className="text-sm text-slate-700">
                    Larger-volume removal, multiple areas, budget-conscious
                    patients
                  </p>
                  <p className="mt-2 text-xs font-medium text-slate-500">
                    RECOVERY
                  </p>
                  <p className="text-sm text-slate-700">
                    7–14 days off work, more bruising than VASER
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  VASER Liposuction
                </h3>
                <p className="mt-1 text-sm text-rose-600">From £2,300/area</p>
                <p className="mt-3 text-sm text-slate-600">
                  Ultrasound waves at 36,000 Hz liquefy fat before removal.
                  Preserves blood vessels, nerves, and connective tissue. Most
                  popular technique for international patients.
                </p>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="text-xs font-medium text-slate-500">BEST FOR</p>
                  <p className="text-sm text-slate-700">
                    HD sculpting, precise contouring, faster recovery, BBL
                    combinations
                  </p>
                  <p className="mt-2 text-xs font-medium text-slate-500">
                    RECOVERY
                  </p>
                  <p className="text-sm text-slate-700">
                    5–10 days off work, less bruising, better skin tightening
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Laser (SmartLipo)
                </h3>
                <p className="mt-1 text-sm text-rose-600">From £2,700/area</p>
                <p className="mt-3 text-sm text-slate-600">
                  Laser energy melts fat cells before extraction. Promotes skin
                  tightening through collagen stimulation. Requires an
                  experienced laser-certified specialist.
                </p>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="text-xs font-medium text-slate-500">BEST FOR</p>
                  <p className="text-sm text-slate-700">
                    Smaller areas (chin, neck, arms), skin tightening
                  </p>
                  <p className="mt-2 text-xs font-medium text-slate-500">
                    RECOVERY
                  </p>
                  <p className="text-sm text-slate-700">5–10 days off work</p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">Lipo 360</h3>
                <p className="mt-1 text-sm text-rose-600">From £1,900</p>
                <p className="mt-3 text-sm text-slate-600">
                  Treats the full torso circumference — abdomen, flanks, and
                  lower back — in one session. Available in all techniques (VASER
                  360 is most popular). Better value than treating areas
                  separately.
                </p>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="text-xs font-medium text-slate-500">BEST FOR</p>
                  <p className="text-sm text-slate-700">
                    Balanced, proportional torso contouring
                  </p>
                  <p className="mt-2 text-xs font-medium text-slate-500">
                    AVERAGE COST
                  </p>
                  <p className="text-sm text-slate-700">
                    £3,000 (VASER 360 from £3,500)
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">HD Lipo</h3>
                <p className="mt-1 text-sm text-rose-600">From £2,500</p>
                <p className="mt-3 text-sm text-slate-600">
                  Advanced technique that sculpts around muscle groups to create
                  visible definition (six-pack, obliques). Requires a highly
                  skilled surgeon — not all clinics offer this.
                </p>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="text-xs font-medium text-slate-500">BEST FOR</p>
                  <p className="text-sm text-slate-700">
                    Athletic patients wanting visible muscle definition
                  </p>
                  <p className="mt-2 text-xs font-medium text-slate-500">
                    PRICING
                  </p>
                  <p className="text-sm text-slate-700">
                    Premium tier: £2,500–£5,000
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-100 p-6">
                <div className="text-center">
                  <p className="font-medium text-slate-700">
                    Not sure which technique?
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Request a free consultation. Surgeons will assess your body
                    and goals to recommend the right technique.
                  </p>
                  <Link
                    href="/enquiry?procedure=liposuction&country=turkey"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    Get Expert Advice →
                  </Link>
                </div>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Recovery Timeline Section */}
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
              Liposuction Recovery in Turkey: Your Day-by-Day Guide
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="liposuction-turkey-recovery"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Day
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        What to Expect
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Day 0 (Surgery)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Procedure takes 1–3 hours. Rest at hospital or hotel.
                        Compression garment fitted. Light walking encouraged same
                        day.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Day 1
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Mild to moderate soreness. Continue wearing compression
                        garment 24/7. Light walking. Pain managed with prescribed
                        medication.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Days 2–3
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        First follow-up appointment. Dressings checked. Bruising
                        begins to appear (peaks days 5–7). Gentle walking around
                        hotel area.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Days 4–5
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Swelling noticeable but manageable. Many patients feel
                        well enough for light sightseeing. Continue compression
                        garment.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Days 5–7
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        <strong>Second follow-up. Fit-to-fly assessment.</strong>{' '}
                        Most patients cleared to fly home on day 5–7.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Week 2
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Return to desk work (most patients). Bruising begins to
                        fade. Swelling still present but improving.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Weeks 3–4
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Light exercise resumes. Continue compression garment (4–6
                        weeks total).
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Weeks 8–12
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Swelling largely resolved. Results becoming visible.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Month 3–6
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Final results visible. Skin retracts and contours settle.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Travel Planning Notes
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="font-medium text-slate-900">Recommended Stay</p>
                  <p className="mt-1 text-sm text-slate-600">
                    7–10 days (most common: 7-day package)
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="font-medium text-slate-900">Best Time to Visit</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Spring (April–May) and autumn (September–October) for
                    comfortable recovery temperatures. Avoid July–August peak
                    heat for multi-area procedures.
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="font-medium text-slate-900">Flying Home</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Wear compression garment and flight socks. Stay hydrated.
                    Walk in the aisle every hour. Aisle seat recommended.
                    Short-haul (3.5–4 hours to London) is well-tolerated by day
                    5–7.
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="font-medium text-slate-900">Companion</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Not essential but recommended, especially for multi-area
                    procedures. Most clinics provide a patient coordinator who
                    serves as an escort for transfers and appointments.
                  </p>
                </div>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Combination Procedures Section */}
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
              Combining Liposuction with Other Procedures in Turkey
            </m.h2>

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Many patients combine liposuction with other procedures to achieve
              comprehensive results in a single trip. Combining procedures
              typically saves 20–30% compared to separate surgeries and means one
              recovery period instead of two.
            </m.p>

            <m.div variants={fadeInUp} className="mt-8">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Combination
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Typical Cost (Turkey)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Recovery
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Lipo + Tummy Tuck
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,500–£6,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        10–14 days
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Most popular combination (&ldquo;mummy makeover&rdquo;).
                        Lipo contours flanks/waist, tummy tuck removes loose skin
                        and tightens muscles.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Lipo + BBL
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,000–£6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        10–14 days
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Fat harvested via lipo, purified, then transferred to
                        buttocks. VASER provides best fat graft viability.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Lipo 360 + Breast Aug
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £4,000–£7,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        7–10 days
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Full body contouring in one trip.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Lipo + Skin Tightening
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,500–£5,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        7–10 days
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        For patients with mild skin laxity not requiring full
                        tummy tuck.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div
              variants={fadeInUp}
              className="mt-8 rounded-lg border border-rose-200 bg-rose-50 p-6"
            >
              <p className="font-medium text-slate-900">
                Considering a combination procedure?
              </p>
              <div className="mt-3 flex flex-wrap gap-4">
                <Link
                  href="/procedures/tummy-tuck/turkey"
                  className="inline-flex items-center text-rose-600 hover:underline"
                >
                  Tummy Tuck in Turkey →
                </Link>
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
              Frequently Asked Questions About Liposuction in Turkey
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

      {/* Destination Comparison Section */}
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

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Turkey offers the most comprehensive packages and widest technique
              range, but other destinations have their own strengths.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-4 sm:grid-cols-3"
            >
              <Link
                href="/procedures/liposuction/hungary"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">Hungary</p>
                <p className="mt-1 text-sm text-rose-600">From £1,165/area</p>
                <p className="mt-2 text-sm text-slate-600">
                  Lowest prices in Europe, EU-regulated, 2.5hr flight
                </p>
              </Link>
              <Link
                href="/procedures/liposuction/poland"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">Poland</p>
                <p className="mt-1 text-sm text-rose-600">From £500/area</p>
                <p className="mt-2 text-sm text-slate-600">
                  EU-regulated, N.I.L. technology, 2hr flight
                </p>
              </Link>
              <Link
                href="/procedures/liposuction/spain"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">Spain</p>
                <p className="mt-1 text-sm text-rose-600">From £2,400/area</p>
                <p className="mt-2 text-sm text-slate-600">
                  Premium quality, #1 healthcare ranking, 2hr flight
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
              Get Your Free Liposuction Quote for Turkey
            </m.h2>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-2xl text-rose-100"
            >
              Compare prices from JCI-accredited clinics in Istanbul and Antalya.
              Receive personalised treatment plans from board-certified surgeons
              — no obligation.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/clinics?procedure=liposuction&country=turkey"
                className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-rose-600 shadow-lg transition-all hover:bg-rose-50 sm:w-auto"
              >
                Compare Liposuction Clinics in Turkey
              </Link>
              <Link
                href="/enquiry?procedure=liposuction&country=turkey"
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
