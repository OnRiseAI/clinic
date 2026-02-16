'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { PL, TR } from 'country-flag-icons/react/3x2'

// =============================================================================
// TYPES
// =============================================================================

interface FAQ {
  question: string
  answer: string
}

interface TummyTuckPolandClientProps {
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

export function TummyTuckPolandClient({ faqs }: TummyTuckPolandClientProps) {
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
                <PL title="Poland" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Tummy Tuck in Poland
              </h1>
            </m.div>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl"
            >
              Poland&apos;s medical tourism sector is growing 20% year-on-year.
              Compare EU-regulated, ISO-certified clinics across Warsaw, Kraków
              and Wrocław — with tummy tuck packages from £2,370 including
              surgery, hospital stay, and recovery accommodation.
            </m.p>

            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/clinics?procedure=tummy-tuck&country=poland"
                className="rounded-lg bg-rose-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-rose-700 hover:shadow-xl"
              >
                Browse Tummy Tuck Clinics in Poland →
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-4 text-sm text-slate-500">
              EU-regulated • ISO 9001 certified • 2–2.5hr flight from London •
              Free consultation matching
            </m.p>

            {/* Hero Stats */}
            <m.div
              variants={fadeInUp}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
            >
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">From £2,370</p>
                <p className="mt-1 text-slate-600">All-inclusive packages</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">50–60%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">1,200+</p>
                <p className="mt-1 text-slate-600">Medical facilities</p>
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
              Why UK Patients Choose Poland for Tummy Tuck Surgery
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-6 space-y-4 text-slate-600"
              data-aeo="tummy-tuck-poland-benefits"
            >
              <p>
                As an EU member state, Poland&apos;s clinics must comply with EU
                medical device regulations, hygiene standards, and patient
                rights directives. ISO 9001 certification is widespread among
                top facilities, and ESPRAS (European Society of Plastic,
                Reconstructive and Aesthetic Surgery) accreditation adds another
                quality layer for patients seeking{' '}
                <Link
                  href="/procedures/tummy-tuck"
                  className="text-rose-600 hover:underline"
                >
                  tummy tuck abroad
                </Link>
                .
              </p>

              <p>
                Poland&apos;s medical tourism market is growing at approximately
                20% annually. Over 100,000 medical tourists visited in 2018
                (pre-COVID baseline), with numbers now exceeding pre-pandemic
                levels. The country ranks 29th in the Medical Tourism Index,
                reflecting its growing reputation for quality{' '}
                <Link
                  href="/cosmetic-surgery"
                  className="text-rose-600 hover:underline"
                >
                  cosmetic surgery
                </Link>
                .
              </p>

              <p>
                Polish plastic surgeons typically hold European Board
                certification (EBOPRAS), and many have trained or worked in
                Western Europe and North America. The Polish Society of Plastic,
                Reconstructive and Aesthetic Surgery maintains high training
                standards. Poland has invested heavily in private healthcare
                infrastructure, with over 1,200 clinics and hospitals offering
                cosmetic procedures using modern equipment matching Western
                European standards.
              </p>

              <p>
                Unlike{' '}
                <Link
                  href="/procedures/tummy-tuck/hungary"
                  className="text-rose-600 hover:underline"
                >
                  Hungary
                </Link>{' '}
                (Budapest-centric), Poland offers several viable hubs — Warsaw
                (capital, largest medical infrastructure), Kraków (popular
                tourist destination, cultural appeal), Wrocław (growing medical
                hub, home to established clinics like ClinicForYou since 1995),
                and Jelenia Góra (specialist medical tourism hub, home to KCM
                Clinic). Flights from London take just 2–2.5 hours on Ryanair,
                Wizz Air, BA, and LOT Polish Airlines, with budget fares from
                £20–£70 return.
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
              How Much Does a Tummy Tuck Cost in Poland?
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="tummy-tuck-poland-cost"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Tummy Tuck Prices in Poland
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Procedure
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Poland (£)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Poland (€)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Poland ($)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Standard Full Abdominoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,370–£4,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €3,200–€4,730
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        $2,100–$5,300
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Mini Tummy Tuck
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,000–£3,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €2,500–€4,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        $2,000–$4,000
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Tummy Tuck + Liposuction
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £4,500–£6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €5,500–€7,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        $7,150–$7,550
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Extended Tummy Tuck
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,500–£5,300
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €4,500–€6,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        $4,500–$6,500
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Poland vs UK Price Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Procedure
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-rose-600 sm:px-6">
                        Poland
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
                        £2,370–£4,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £4,500–£10,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        50–69%
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Mini Tummy Tuck
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,000–£3,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,500–£6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        40–60%
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Tummy Tuck + Lipo
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £4,500–£6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £6,000–£14,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        25–57%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                What&apos;s Typically Included in Poland Packages
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
                    1–2 nights in ISO-certified facility
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
                    4–5 nights 3–4 star hotel
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
                  <p className="font-medium text-slate-900">Extended Stay</p>
                  <p className="mt-1 text-sm text-slate-600">
                    15-day packages available
                  </p>
                </div>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                Poland&apos;s costs are mid-range between Hungary (cheapest in
                Europe) and{' '}
                <Link
                  href="/procedures/tummy-tuck/spain"
                  className="text-rose-600 hover:underline"
                >
                  Spain
                </Link>{' '}
                (most expensive EU option). However, Polish prices come with
                strong EU regulation and modern infrastructure. Some clinics
                recommend a longer stay (up to 15 days) for optimal recovery
                monitoring, which can increase accommodation costs but reflects
                higher care standards.
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
              Top-Rated Tummy Tuck Clinics in Poland
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Warsaw
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Warsaw Plastic Surgery Centre
                      </h4>
                      <p className="text-sm text-slate-500">Warsaw</p>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                      EU Certified
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Capital city location. Full range of body contouring
                    procedures including abdominoplasty, liposuction, and arm
                    lifts. Modern facility with EU certification standards.
                  </p>
                  <Link
                    href="/clinics/warsaw-plastic-surgery"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    View Clinic Profile →
                  </Link>
                </div>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Kraków
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Kraków Cosmetic Surgery Clinic
                      </h4>
                      <p className="text-sm text-slate-500">Kraków</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      Tourist-Friendly
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Located in Poland&apos;s most popular tourist city. Cultural
                    recovery setting with historic old town nearby.
                    English-speaking team experienced with international
                    patients.
                  </p>
                  <Link
                    href="/clinics/krakow-cosmetic"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    View Clinic Profile →
                  </Link>
                </div>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Wrocław
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        ClinicForYou
                      </h4>
                      <p className="text-sm text-slate-500">Wrocław</p>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                      Est. 1995
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    One of Poland&apos;s longest-running cosmetic surgery
                    clinics. Extensive international patient experience. Full
                    body contouring portfolio with proven track record.
                  </p>
                  <Link
                    href="/clinics/clinicforyou"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    View Clinic Profile →
                  </Link>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Coramed Medical Centre
                      </h4>
                      <p className="text-sm text-slate-500">Lower Silesia</p>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                      ESPRAS
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    ESPRAS accredited. Medical team with European Board
                    certifications. Comprehensive body contouring and cosmetic
                    surgery services.
                  </p>
                  <Link
                    href="/clinics/coramed"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    View Clinic Profile →
                  </Link>
                </div>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Jelenia Góra & Katowice
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        KCM Clinic
                      </h4>
                      <p className="text-sm text-slate-500">Jelenia Góra</p>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                      ISO 9001
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    ISO certified. Treats 700+ international patients per year.
                    Specialist medical tourism facility in the Sudetes mountain
                    region. Multi-specialty with dedicated plastic surgery
                    department. Accessible from Wrocław airport.
                  </p>
                  <Link
                    href="/clinics/kcm-clinic"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    View Clinic Profile →
                  </Link>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Lipoline Clinic
                      </h4>
                      <p className="text-sm text-slate-500">Katowice (Silesia)</p>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                      JCI
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    JCI accredited — rare in Poland. Specialist body contouring
                    clinic with particular expertise in liposuction and
                    abdominoplasty combination procedures.
                  </p>
                  <Link
                    href="/clinics/lipoline"
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
              Tummy Tuck Recovery in Poland: What to Expect
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="tummy-tuck-poland-recovery"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Your Recovery Timeline in Poland
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
                        Monitored in hospital. First assisted walks. Drain
                        management. Compression garment checked.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Day 2–3 — Discharge
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Transfer to hotel. Compression garment worn
                        continuously. Rest with light movement encouraged.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Days 3–5 — Clinic Visits
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Follow-up appointments for drain removal and wound
                        inspection. Stitches assessed.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Day 7 — Assessment
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Surgeon follow-up and initial fit-to-fly assessment.
                        Some patients may be cleared at this point.
                      </td>
                    </tr>
                    <tr className="bg-rose-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Day 10–15 — Extended Stay
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Some Polish clinics recommend staying 10–15 days for
                        full recovery monitoring. This is longer than
                        Turkey/Hungary standard — a quality signal, not a red
                        flag.
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
                Recommended Poland Trip Length
              </p>
              <p className="mt-2 text-slate-600">
                10–15 days. Polish clinics tend to be more conservative about
                recovery monitoring than Turkish or Hungarian clinics, often
                recommending longer stays. This reflects a more cautious
                post-operative approach and should be viewed as a quality
                indicator. Plan accommodation accordingly.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Poland vs Turkey Section */}
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
              Tummy Tuck in Poland vs Turkey: Which Is Right for You?
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
                          <PL title="Poland" />
                        </div>
                        <span>Poland</span>
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
                      £2,370
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      £2,900
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
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
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Flight from London
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      2–2.5 hours
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      3.5–4 hours
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      All-inclusive packages
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Available, moderate scope
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      Comprehensive (hotel + VIP transfers)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Clinic options
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      1,200+ medical facilities
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      425+ cosmetic surgery specific
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Recommended stay
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      10–15 days (conservative)
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      7–10 days
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Best for
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                      EU + shorter flight + modern facilities
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      All-inclusive value + JCI hospitals
                    </td>
                  </tr>
                </tbody>
              </table>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                Choose Poland if EU regulation, proximity (shorter flight), and
                a more conservative recovery approach matter to you.
                Poland&apos;s growing medical tourism sector offers modern
                facilities and internationally trained surgeons at competitive
                prices.
              </p>

              <p>
                Choose{' '}
                <Link
                  href="/procedures/tummy-tuck/turkey"
                  className="text-rose-600 hover:underline"
                >
                  Turkey
                </Link>{' '}
                for the most comprehensive all-inclusive packages, JCI-accredited
                hospitals, and the highest volume of cosmetic surgery
                experience. Turkey&apos;s mature medical tourism infrastructure
                means shorter recommended stays and more bundled services.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* City Comparison Section */}
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
              Warsaw, Kraków or Wrocław: Where to Get a Tummy Tuck in Poland
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      Factor
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      Warsaw
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      Kraków
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      Wrocław
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Clinic density
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      Highest
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Moderate
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Growing
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Average pricing
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Mid-range
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Mid-range
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      Slightly lower
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      International airport
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      WAW (largest)
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      KRK (well-connected)
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      WRO (growing routes)
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Tourism appeal
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Capital, business-focused
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      Historic old town, cultural hub
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Emerging city, younger vibe
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Best for
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Widest medical choice
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Cultural recovery
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Established heritage
                    </td>
                  </tr>
                </tbody>
              </table>
            </m.div>

            <m.p variants={fadeInUp} className="mt-6 text-slate-600">
              Note also Jelenia Góra (home to KCM Clinic, a specialist medical
              tourism facility treating 700+ international patients annually) —
              accessible from Wrocław airport with transfers arranged by the
              clinic.
            </m.p>
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
              Planning Your Tummy Tuck Trip to Poland
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Flights</h3>
                <p className="mt-2 text-slate-600">
                  Ryanair, Wizz Air, BA, LOT from London, Manchester, Edinburgh,
                  Bristol. 2–2.5 hours. Budget fares from £20–£70 return.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Visa</h3>
                <p className="mt-2 text-slate-600">
                  Not required for UK citizens (stays under 90 days). Valid
                  passport needed. EU member state with Schengen Area access.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Currency</h3>
                <p className="mt-2 text-slate-600">
                  Polish Zloty (PLN). Cards widely accepted. Many clinics quote
                  in GBP or EUR for UK patients.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Accommodation</h3>
                <p className="mt-2 text-slate-600">
                  Clinic packages include 4–5 nights hotel. Independent hotels
                  from £30–£60/night. Plan for longer stay (10–15 days).
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
                  Polish. English widely spoken at medical facilities and in
                  major cities, especially among younger staff.
                </p>
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
              Frequently Asked Questions About Tummy Tuck in Poland
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
              Get Your Free Tummy Tuck Quote from Polish Clinics
            </m.h2>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-2xl text-rose-100"
            >
              Compare prices from ISO-certified clinics in Warsaw, Kraków and
              Wrocław. Receive personalised treatment plans from EU-regulated
              surgeons — no obligation.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/clinics?procedure=tummy-tuck&country=poland"
                className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-rose-600 shadow-lg transition-all hover:bg-rose-50 sm:w-auto"
              >
                Browse Tummy Tuck Clinics in Poland
              </Link>
              <Link
                href="/enquiry?procedure=tummy-tuck&country=poland"
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
