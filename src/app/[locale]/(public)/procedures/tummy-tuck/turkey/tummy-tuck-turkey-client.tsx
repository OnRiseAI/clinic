'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { TR, ES, HU, PL } from 'country-flag-icons/react/3x2'

// =============================================================================
// TYPES
// =============================================================================

interface FAQ {
  question: string
  answer: string
}

interface TummyTuckTurkeyClientProps {
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

export function TummyTuckTurkeyClient({ faqs }: TummyTuckTurkeyClientProps) {
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
                <TR title="Turkey" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Tummy Tuck in Turkey
              </h1>
            </m.div>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl"
            >
              Turkey performs over 45,000 abdominoplasties per year across 425+
              clinics. Compare JCI-accredited hospitals in Istanbul and Antalya,
              all-inclusive packages from £2,900, and get matched with verified
              surgeons — free.
            </m.p>

            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/clinics?procedure=tummy-tuck&country=turkey"
                className="rounded-lg bg-rose-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-rose-700 hover:shadow-xl"
              >
                Browse Tummy Tuck Clinics in Turkey →
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-4 text-sm text-slate-500">
              JCI-accredited hospitals • Board-certified surgeons • All-inclusive
              packages • Free consultation matching
            </m.p>

            {/* Hero Stats */}
            <m.div
              variants={fadeInUp}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
            >
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">From £2,900</p>
                <p className="mt-1 text-slate-600">All-inclusive packages</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">50–70%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">45,000+</p>
                <p className="mt-1 text-slate-600">Procedures per year</p>
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
              Why UK Patients Choose Turkey for Tummy Tuck Surgery
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-6 space-y-4 text-slate-600"
              data-aeo="tummy-tuck-turkey-benefits"
            >
              <p>
                Turkey ranks 6th globally in total plastic surgery procedures
                and 4th specifically for abdominoplasty, with over 45,000 tummy
                tucks performed annually according to ISAPS data. This
                extraordinary volume means Turkish surgeons have extensive
                experience, and clinics are fully optimised for international
                patients seeking{' '}
                <Link
                  href="/procedures/tummy-tuck"
                  className="text-rose-600 hover:underline"
                >
                  tummy tuck abroad
                </Link>
                .
              </p>

              <p>
                Turkey pioneered the all-inclusive medical tourism package
                model. Standard tummy tuck packages include the surgeon&apos;s
                fee, general anaesthesia, JCI-accredited hospital stay (1–2
                nights), compression garment, 5–7 nights in a 4–5 star hotel,
                VIP airport and clinic transfers, a 24/7 English-speaking
                patient coordinator, and post-operative follow-up appointments.
                No other destination matches Turkey for package comprehensiveness
                and value.
              </p>

              <p>
                Turkey has more JCI-accredited hospitals than any country
                outside the United States. JCI (Joint Commission International)
                is the global gold standard for hospital safety and quality.
                Major hospital groups like Acıbadem, Memorial Healthcare,
                Medicana International, and Florence Nightingale Hospitals all
                hold JCI accreditation — giving UK patients the confidence of
                internationally verified standards.
              </p>

              <p>
                The cost advantage is substantial: standard tummy tuck prices of
                £2,900–£4,200 represent 50–70% savings versus UK private prices
                (£4,500–£10,000). This difference is driven by lower hospital
                operating costs, favourable exchange rates, and economies of
                scale — not lower quality. Turkey attracted over 1.2 million
                medical tourists in 2022, with{' '}
                <Link
                  href="/cosmetic-surgery"
                  className="text-rose-600 hover:underline"
                >
                  cosmetic surgery
                </Link>{' '}
                being one of the largest categories. Multiple daily flights from
                London, Manchester, and Birmingham on Turkish Airlines and
                Pegasus keep travel costs low.
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
              How Much Does a Tummy Tuck Cost in Turkey?
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="tummy-tuck-turkey-cost"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Tummy Tuck Prices in Turkey
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Procedure
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Turkey (£)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Turkey (€)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Turkey ($)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Standard Full Abdominoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,900–£4,200
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €3,600–€6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        $4,100–$7,000
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Mini Tummy Tuck
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,500–£3,800
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        From €3,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        $3,000–$4,500
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Extended Tummy Tuck
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,800–£5,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €5,500–€7,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        $5,500–$8,000
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Tummy Tuck + Liposuction
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,500–£5,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €4,500–€7,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        $5,000–$8,000
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        360 Tummy Tuck / Body Lift
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £4,500–£7,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €6,000–€9,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        $6,500–$10,000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                UK vs Turkey Price Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Procedure
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-rose-600 sm:px-6">
                        Turkey
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
                        £2,900–£4,200
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £4,500–£10,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        40–70%
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Mini Tummy Tuck
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,500–£3,800
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,500–£6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        30–60%
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Extended Tummy Tuck
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,800–£5,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £7,000–£12,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        45–70%
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Tummy Tuck + Lipo
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,500–£5,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £6,000–£14,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        40–70%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                What&apos;s Included in Turkey All-Inclusive Packages
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Surgery</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Board-certified surgeon&apos;s fee + general anaesthesia
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Hospital</p>
                  <p className="mt-1 text-sm text-slate-600">
                    JCI-accredited hospital stay (1–2 nights private room)
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Pre-op</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Blood tests, ECG, medical consultation
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Post-op</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Compression garment, medications, aftercare supplies
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Accommodation</p>
                  <p className="mt-1 text-sm text-slate-600">
                    5–7 nights in 4–5 star hotel
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Transfers</p>
                  <p className="mt-1 text-sm text-slate-600">
                    VIP airport pickup + all clinic transfers
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Support</p>
                  <p className="mt-1 text-sm text-slate-600">
                    24/7 English-speaking patient coordinator
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Follow-up</p>
                  <p className="mt-1 text-sm text-slate-600">
                    In-person and remote post-operative appointments
                  </p>
                </div>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                The cost difference between Turkey and the UK is driven by lower
                hospital operating costs, favourable exchange rates for GBP, and
                high procedure volumes enabling economies of scale. Government
                incentives for medical tourism also keep prices competitive. The
                savings do NOT reflect lower quality — Turkey&apos;s top
                hospitals are accredited to the same JCI standards as leading UK
                private hospitals.
              </p>

              <p className="text-sm italic">
                Prices based on published clinic rates and verified quotes.
                Actual costs may vary by clinic, surgeon, and complexity.
                Request a personalised quote for accurate pricing.
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
              Top-Rated Tummy Tuck Clinics in Turkey
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Istanbul
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Acıbadem Healthcare Group
                      </h4>
                      <p className="text-sm text-slate-500">Istanbul</p>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                      JCI
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Turkey&apos;s largest private healthcare group with 22
                    hospitals. Full range of cosmetic procedures. Premium
                    pricing with comprehensive packages.
                  </p>
                  <Link
                    href="/clinics/acibadem"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    View Clinic Profile →
                  </Link>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Memorial Healthcare Group
                      </h4>
                      <p className="text-sm text-slate-500">Istanbul</p>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                      JCI
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Known for advanced surgical techniques. Multiple Istanbul
                    locations. Strong international patient programme with
                    dedicated coordinators.
                  </p>
                  <Link
                    href="/clinics/memorial"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    View Clinic Profile →
                  </Link>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Medicana International
                      </h4>
                      <p className="text-sm text-slate-500">Istanbul & Ankara</p>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                      JCI
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Offers comprehensive all-inclusive cosmetic surgery
                    packages. Istanbul and Ankara locations. Competitive
                    mid-range pricing.
                  </p>
                  <Link
                    href="/clinics/medicana"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    View Clinic Profile →
                  </Link>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Florence Nightingale Hospitals
                      </h4>
                      <p className="text-sm text-slate-500">Istanbul</p>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                      JCI
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Named after the British nurse&apos;s connection to Istanbul.
                    Strong plastic surgery department with experienced surgeons.
                  </p>
                  <Link
                    href="/clinics/florence-nightingale"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    View Clinic Profile →
                  </Link>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">Esteworld</h4>
                      <p className="text-sm text-slate-500">Istanbul</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      Specialist
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Specialist cosmetic surgery hospital. 20,000+ procedures per
                    year. All-inclusive packages from £2,900. High volume, competitive
                    pricing.
                  </p>
                  <Link
                    href="/clinics/esteworld"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    View Clinic Profile →
                  </Link>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">Estethica</h4>
                      <p className="text-sm text-slate-500">Istanbul</p>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                      JCI
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    JCI-accredited cosmetic surgery hospital.
                    English-speaking surgeon team. Comprehensive all-inclusive
                    packages for UK patients.
                  </p>
                  <Link
                    href="/clinics/estethica"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    View Clinic Profile →
                  </Link>
                </div>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Antalya
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Akdeniz Health Group
                      </h4>
                      <p className="text-sm text-slate-500">Antalya</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      Medical Tourism
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Antalya-based medical tourism specialist. Competitive
                    pricing with beach resort recovery option. Popular with UK
                    patients.
                  </p>
                  <Link
                    href="/clinics/akdeniz"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    View Clinic Profile →
                  </Link>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Medworld Clinic
                      </h4>
                      <p className="text-sm text-slate-500">Antalya</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      All-Inclusive
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    All-inclusive packages combining tummy tuck treatment with
                    Antalya holiday destination. Beach-side recovery experience.
                  </p>
                  <Link
                    href="/clinics/medworld"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    View Clinic Profile →
                  </Link>
                </div>
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
              Tummy Tuck Recovery in Turkey: Day-by-Day Guide
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="tummy-tuck-turkey-recovery"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Your Recovery Timeline in Turkey
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
                        Procedure (2–4 hours under general anaesthesia). Move to
                        private hospital room. Compression garment fitted.
                        Drains in place.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Day 1 — Hospital
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Monitored in hospital. IV antibiotics. First assisted
                        walk. Light liquid diet.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Day 2 — Discharge
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Discharged to hotel (or stay second night if surgeon
                        recommends). Transfer to hotel by clinic vehicle.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Days 3–5 — Hotel
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Daily or every-other-day clinic visits for drain checks
                        and wound inspection. Drains removed (typically day
                        3–5). Light walking encouraged.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Day 5–6 — Follow-up
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Surgeon follow-up appointment. Wound check. Stitches
                        assessed (dissolvable or removal at 10–14 days).
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Day 7 — Fit to Fly
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Most patients cleared to fly. Surgeon provides
                        fit-to-fly certificate. Compression stockings for
                        flight. Stay hydrated, walk in aisle.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Day 8–10 — Departure
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Airport transfer. Continue wearing compression garment.
                        Remote follow-up begins (photos, video calls).
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Post-Return Recovery (at Home in the UK)
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Period
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        What to Expect
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Weeks 1–2
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Swelling and bruising peak, then begin to subside. Wear
                        compression garment 24/7. Sleep elevated. No driving.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Weeks 2–4
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Return to desk work (10–14 days post-op). Light walking.
                        No lifting over 5kg.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Weeks 4–6
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Gradual return to normal activity. Light exercise
                        permitted. Surgeon clearance for manual work.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Months 3–6
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Swelling continues to reduce. Scars fade from red/pink
                        to lighter. Final result visible at 6 months.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Months 6–18
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Scars continue to mature and fade. Scar massage and
                        silicone sheets recommended.
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
                Recommended Turkey Trip Length
              </p>
              <p className="mt-2 text-slate-600">
                7–10 days is the recommended stay. Most Turkish clinics design
                8-day packages as the standard. Patients combining tummy tuck
                with liposuction may need an extra 1–2 days for recovery before
                flying.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Istanbul vs Antalya Section */}
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
              Istanbul vs Antalya: Where to Get a Tummy Tuck in Turkey
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      Factor
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-rose-600 sm:px-6">
                      Istanbul
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      Antalya
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Number of clinics
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      300+
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      100+
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Price range
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      £2,900–£4,200
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      £2,500–£3,800
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      JCI hospitals
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      Most JCI-accredited options
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Fewer JCI options
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Package style
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Clinical focus, city hotel
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Beach resort recovery, holiday combo
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Flight from London
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      3.5–4 hours
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      4–4.5 hours
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Best for
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                      Widest choice, experienced surgeons
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Lower prices, beach recovery
                    </td>
                  </tr>
                </tbody>
              </table>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                Istanbul is the default choice for most UK patients due to the
                sheer number of JCI-accredited hospitals, the widest selection
                of experienced surgeons, and the maturity of its medical tourism
                infrastructure. First-time medical tourists prioritising safety
                and surgeon choice should choose Istanbul.
              </p>

              <p>
                Antalya appeals to patients who want a more relaxed, resort-style
                recovery. Prices tend to be slightly lower, and the beach
                setting offers a different recovery experience. However, there
                are fewer JCI-accredited facilities, so patients should be more
                selective when choosing a clinic.
              </p>
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
              Tummy Tuck in Turkey vs Other Destinations
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
                          <TR title="Turkey" />
                        </div>
                        <span>Turkey</span>
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
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
                          <PL title="Poland" />
                        </div>
                        <span>Poland</span>
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-6 overflow-hidden rounded-sm shadow-sm">
                          <ES title="Spain" />
                        </div>
                        <span>Spain</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Starting price
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                      £2,900
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      £1,750
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      £2,370
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      £3,000
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      All-inclusive packages
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      Comprehensive
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Available
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Available
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Pricier
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Accreditation
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      JCI (gold standard)
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      ISO 9001, EU
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      ISO 9001, ESPRAS, EU
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      SECPRE, EU
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Flight from London
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      3.5–4 hrs
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      2.5 hrs
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      2–2.5 hrs
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      2–2.5 hrs
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Surgery volume
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      45,000+/year
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      60 clinics
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      1,200+ clinics
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      450,000/yr total
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      EU regulation
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      No
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      Yes
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      Yes
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      Yes
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Best for
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                      Value + volume
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Lowest price + EU
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      EU + infrastructure
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Premium + EU
                    </td>
                  </tr>
                </tbody>
              </table>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                Turkey leads on price-to-value ratio and all-inclusive
                packaging. With over 45,000 tummy tucks performed annually and
                more JCI-accredited hospitals than any non-US country, Turkey
                offers unmatched experience and infrastructure for cosmetic
                surgery tourism.
              </p>

              <p>
                <Link
                  href="/procedures/tummy-tuck/hungary"
                  className="text-rose-600 hover:underline"
                >
                  Hungary
                </Link>{' '}
                offers the lowest starting prices with EU consumer protections.{' '}
                <Link
                  href="/procedures/tummy-tuck/poland"
                  className="text-rose-600 hover:underline"
                >
                  Poland
                </Link>{' '}
                and{' '}
                <Link
                  href="/procedures/tummy-tuck/spain"
                  className="text-rose-600 hover:underline"
                >
                  Spain
                </Link>{' '}
                offer EU regulation with strong but smaller cosmetic surgery
                sectors. Choose based on your priorities: Turkey for maximum
                value and experience, EU destinations for regulatory assurance.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Practical Information Section */}
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
              Planning Your Tummy Tuck Trip to Turkey
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Flights</h3>
                <p className="mt-2 text-slate-600">
                  Turkish Airlines, Pegasus, BA, easyJet from London, Manchester,
                  Birmingham, Edinburgh. 3.5–4 hours. Return fares from £80–£200.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Visa</h3>
                <p className="mt-2 text-slate-600">
                  UK citizens get a free e-visa or visa-on-arrival (90-day stay).
                  Apply online at evisa.gov.tr before departure.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Currency</h3>
                <p className="mt-2 text-slate-600">
                  Turkish Lira (TRY). Most clinics quote in GBP, EUR, or USD.
                  Cards widely accepted in Istanbul and tourist areas.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Accommodation</h3>
                <p className="mt-2 text-slate-600">
                  Included in most all-inclusive packages (4–5 star hotel, 5–7
                  nights). Independent hotels in Istanbul from £40–£80/night.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Insurance</h3>
                <p className="mt-2 text-slate-600">
                  Standard travel insurance won&apos;t cover elective surgery.
                  Recommend specialist medical travel insurance. Some clinics
                  include complication insurance.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Language</h3>
                <p className="mt-2 text-slate-600">
                  Turkish. English widely spoken at medical facilities and
                  tourist areas. Patient coordinators are English-fluent.
                </p>
              </div>
            </m.div>

            <m.div
              variants={fadeInUp}
              className="mt-8 rounded-lg bg-rose-50 p-6"
            >
              <h3 className="font-semibold text-slate-900">Best Time to Visit</h3>
              <p className="mt-2 text-slate-600">
                Turkey is a year-round destination. Spring (March–May) and
                autumn (September–November) are ideal — avoiding peak summer
                heat during recovery. You&apos;ll want loose, comfortable
                clothing and shouldn&apos;t be exposed to intense sun during the
                healing period.
              </p>
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
              Frequently Asked Questions About Tummy Tuck in Turkey
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
                  <div className="border-t border-slate-100 px-6 pb-6 pt-4 text-slate-600">
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
              Get Your Free Tummy Tuck Quote from Turkey
            </m.h2>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-2xl text-rose-100"
            >
              Compare prices from JCI-accredited Istanbul and Antalya clinics.
              Receive personalised treatment plans from board-certified surgeons
              — no obligation.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/clinics?procedure=tummy-tuck&country=turkey"
                className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-rose-600 shadow-lg transition-all hover:bg-rose-50 sm:w-auto"
              >
                Browse Tummy Tuck Clinics in Turkey
              </Link>
              <Link
                href="/enquiry?procedure=tummy-tuck&country=turkey"
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
