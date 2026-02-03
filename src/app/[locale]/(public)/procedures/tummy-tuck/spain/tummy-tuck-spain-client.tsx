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

interface TummyTuckSpainClientProps {
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

export function TummyTuckSpainClient({ faqs }: TummyTuckSpainClientProps) {
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
              Tummy Tuck in Spain: Compare Prices, Clinics & Surgeons
            </m.h1>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl"
            >
              Spain ranks #1 globally for healthcare quality and performs
              450,000 cosmetic procedures annually. Compare SECPRE-accredited
              surgeons in Madrid, Barcelona, and Marbella — with tummy tuck
              prices from £3,000 and EU-regulated care.
            </m.p>

            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/clinics?procedure=tummy-tuck&country=spain"
                className="rounded-lg bg-rose-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-rose-700 hover:shadow-xl"
              >
                Browse Tummy Tuck Clinics in Spain →
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-4 text-sm text-slate-500">
              Ranked #1 healthiest nation • EU-regulated • SECPRE-accredited
              surgeons • 2hr flight from London
            </m.p>

            {/* Hero Stats */}
            <m.div
              variants={fadeInUp}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
            >
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">From £3,000</p>
                <p className="mt-1 text-slate-600">Premium quality</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">900</p>
                <p className="mt-1 text-slate-600">Plastic surgeons</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">450,000</p>
                <p className="mt-1 text-slate-600">Procedures/year</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Why Spain Section */}
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
              Why UK Patients Choose Spain for Tummy Tuck Surgery
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-6 space-y-4 text-slate-600"
              data-aeo="tummy-tuck-spain-benefits"
            >
              <p>
                Spain was ranked the healthiest nation in the world by the
                Bloomberg Global Health Index, with 804 hospitals and over
                10,600 surgical procedures per 100,000 population — more than
                almost any country in Europe. This world-class healthcare
                infrastructure makes Spain the premium choice for patients
                seeking{' '}
                <Link
                  href="/procedures/tummy-tuck"
                  className="text-rose-600 hover:underline"
                >
                  tummy tuck abroad
                </Link>
                .
              </p>

              <p>
                With 900 plastic surgeons performing 450,000{' '}
                <Link
                  href="/cosmetic-surgery"
                  className="text-rose-600 hover:underline"
                >
                  cosmetic surgery
                </Link>{' '}
                procedures annually, Spain has one of the largest cosmetic
                surgery markets in Europe — valued at $1.4 billion in 2024. The
                Spanish Society of Plastic, Reconstructive and Aesthetic Surgery
                (SECPRE) requires a minimum of 5 years specialist training for
                membership, ensuring surgeons meet rigorous standards.
              </p>

              <p>
                As a full EU member, Spain&apos;s clinics comply with EU medical
                device regulations, patient safety directives, and cross-border
                healthcare directive. Healthcare facilities are subject to
                regional government inspection and accreditation. Major hospital
                groups like Quironsalud and Centro Médico Teknon maintain
                international standards of care.
              </p>

              <p>
                UK patients are the largest international group seeking cosmetic
                surgery in Spain. The large British expat community (especially
                on the Costa del Sol) means English-speaking services are
                widespread. Many UK patients combine treatment with visiting
                family, friends, or holiday properties. Flights from most UK
                airports to Madrid, Barcelona, and Málaga take just 2–2.5 hours
                on BA, easyJet, Ryanair, Vueling, and Jet2.
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
              How Much Does a Tummy Tuck Cost in Spain?
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="tummy-tuck-spain-cost"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Tummy Tuck Prices in Spain
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Procedure
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Spain (£)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Spain (€)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Spain ($)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Standard Full Abdominoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,000–£7,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €3,900–€9,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        $7,274–$10,392
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Mini Tummy Tuck
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,500–£5,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €3,000–€6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        $3,500–$6,500
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Tummy Tuck + Liposuction
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £5,500–£9,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €7,000–€12,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        $8,000–$13,000
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Extended Tummy Tuck
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £5,000–£9,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €6,500–€11,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        $7,500–$12,000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Price by City
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        City
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Standard Tummy Tuck
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Madrid
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €4,200–€9,000
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Largest market, widest price range
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Barcelona
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €4,800–€8,900
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Premium clinics, strong international reputation
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Marbella
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        From €3,900
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Competitive pricing, Costa del Sol recovery
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Valencia
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €3,500–€7,000
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Growing market, lower costs
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Málaga
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €3,500–€6,500
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Good value coastal option
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Spain vs UK Price Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Procedure
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-rose-600 sm:px-6">
                        Spain
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
                        £3,000–£7,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £4,500–£10,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        30–70%
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Mini Tummy Tuck
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,500–£5,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,500–£6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        17–50%
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Tummy Tuck + Lipo
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £5,500–£9,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £6,000–£14,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        8–60%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                Spain&apos;s clinic packages vary more than Turkey&apos;s
                standardised all-inclusive model. Some include surgery, hospital
                stay, compression garment, and follow-up appointments. Hotel
                accommodation and transfers are sometimes included (especially
                in Marbella and at international clinics) but not always. Many
                Spanish clinics quote for surgery only, giving patients more
                control over their recovery accommodation.
              </p>

              <p>
                Spain is the most expensive of the four destinations covered,
                but savings of 30–70% versus UK private prices remain
                significant. The higher prices reflect Spain&apos;s premium
                positioning — SECPRE-accredited surgeons with decades of
                experience, world-class hospital facilities, and the highest
                healthcare standards in Europe.
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
              Top-Rated Tummy Tuck Clinics in Spain
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Barcelona
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Centro Médico Teknon
                      </h4>
                      <p className="text-sm text-slate-500">Barcelona</p>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                      Premium
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    One of Barcelona&apos;s most prestigious private hospitals.
                    Dr. Javier Herrero Jover with 30+ years experience. Full
                    range of cosmetic procedures. Premium facility.
                  </p>
                  <Link
                    href="/clinics/centro-medico-teknon"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    View Clinic Profile →
                  </Link>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Wellness Kliniek
                      </h4>
                      <p className="text-sm text-slate-500">Barcelona</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      All-Inclusive
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Specialist cosmetic surgery clinic known for all-inclusive
                    pricing transparency. Popular with UK and Benelux patients.
                    International patient coordinator.
                  </p>
                  <Link
                    href="/clinics/wellness-kliniek"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    View Clinic Profile →
                  </Link>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Quironsalud Barcelona
                      </h4>
                      <p className="text-sm text-slate-500">Barcelona</p>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                      Hospital Group
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Part of Spain&apos;s largest private hospital group.
                    Multi-specialty with dedicated plastic surgery department.
                    Strong international patient programme.
                  </p>
                  <Link
                    href="/clinics/quironsalud-barcelona"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    View Clinic Profile →
                  </Link>
                </div>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Madrid
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Quironsalud Madrid
                      </h4>
                      <p className="text-sm text-slate-500">Madrid</p>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                      Hospital Group
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Madrid branch of Spain&apos;s largest private healthcare
                    group. Modern facilities with SECPRE-accredited surgeons.
                    Full body contouring services.
                  </p>
                  <Link
                    href="/clinics/quironsalud-madrid"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    View Clinic Profile →
                  </Link>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Clinica Menorca
                      </h4>
                      <p className="text-sm text-slate-500">Madrid</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      Specialist
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Private aesthetic surgery clinic in central Madrid.
                    Specialist body contouring including abdominoplasty,
                    liposuction, and arm lifts.
                  </p>
                  <Link
                    href="/clinics/clinica-menorca"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    View Clinic Profile →
                  </Link>
                </div>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Marbella / Costa del Sol
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Marbella Cosmetic Surgery
                      </h4>
                      <p className="text-sm text-slate-500">Marbella</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      UK-Friendly
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Popular with UK expats and visitors. Fully English-speaking
                    team. Competitive pricing with coastal resort recovery
                    setting. Ideal Mediterranean climate.
                  </p>
                  <Link
                    href="/clinics/marbella-cosmetic"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    View Clinic Profile →
                  </Link>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Ocean Clinic Marbella
                      </h4>
                      <p className="text-sm text-slate-500">Marbella</p>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                      Premium
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Premium cosmetic surgery clinic. State-of-the-art facility.
                    International patient focus with dedicated coordinators.
                    Full body contouring services.
                  </p>
                  <Link
                    href="/clinics/ocean-clinic"
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
              Tummy Tuck Recovery in Spain: What to Expect
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="tummy-tuck-spain-recovery"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Your Recovery Timeline in Spain
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
                        Overnight stay in hospital or clinic.
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
                        Transfer to hotel or recovery accommodation. Compression
                        garment worn continuously.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Days 3–7 — Recovery
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Clinic follow-up appointments for drain removal (day
                        3–5) and wound checks. Light walking in
                        Spain&apos;s mild climate.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Day 7–10 — Fit to Fly
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Surgeon assessment and clearance for short-haul flight
                        home. Compression stockings for travel.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Day 7–14 — Departure
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Travel home. Remote follow-up begins with photos and
                        video consultations.
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
                Recommended Spain Trip Length
              </p>
              <p className="mt-2 text-slate-600">
                7–14 days. Shorter stays (7–10 days) for standard procedures.
                Longer stays (10–14 days) for combined procedures or patients
                wanting a more relaxed recovery pace.
              </p>
            </m.div>

            <m.div
              variants={fadeInUp}
              className="mt-6 rounded-lg bg-rose-50 p-6"
            >
              <h3 className="font-semibold text-slate-900">
                Spain&apos;s Recovery Advantage: Climate
              </h3>
              <p className="mt-2 text-slate-600">
                Spain offers a distinct recovery benefit: Mediterranean weather.
                Mild temperatures in Barcelona, Madrid (spring/autumn), and
                especially Marbella/Costa del Sol mean patients can take gentle
                recovery walks outdoors comfortably. This is a tangible
                quality-of-life benefit versus recovering in colder
                destinations.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* City Comparison Section */}
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
              Madrid, Barcelona or Marbella: Where to Get a Tummy Tuck in Spain
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      Factor
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      Madrid
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      Barcelona
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      Marbella
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Price range
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      €4,200–€9,000
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      €4,800–€8,900
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      From €3,900
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Number of clinics
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      Largest market
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Strong market
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Growing hub
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Hospital infrastructure
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      Spain&apos;s largest hub
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      World-class private
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Smaller but premium
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      International patients
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Mixed (EU-wide)
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Strong UK + Benelux
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      UK expat community
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Flight from London
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      2–2.5 hrs
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      2 hrs
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      2.5 hrs (to Málaga)
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Recovery setting
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Urban
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Coastal city
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      Beach/resort, ideal climate
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
                      Premium + coastal
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                      UK-friendly + best climate
                    </td>
                  </tr>
                </tbody>
              </table>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                Madrid offers the widest choice and most established medical
                infrastructure — Spain&apos;s largest medical hub with academic
                excellence at institutions like Hospital Universitario de la
                Paz.
              </p>

              <p>
                Barcelona combines world-class clinics like Centro Médico Teknon
                with the appeal of a vibrant coastal city. Strong international
                reputation, particularly with UK and Benelux patients.
              </p>

              <p>
                Marbella is ideal for UK patients who want the most relaxed
                recovery setting, competitive pricing, and the strongest UK
                community. The Costa del Sol&apos;s large British expat
                population means everything from doctors to restaurants cater to
                English speakers.
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
              Tummy Tuck in Spain vs Other Destinations
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      Factor
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-rose-600 sm:px-6">
                      Spain
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      Turkey
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      Hungary
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      Poland
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Starting price
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      £3,000
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      £2,900
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      £1,750
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      £2,370
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Quality positioning
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                      Premium
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Value + Volume
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Budget EU
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Mid-range EU
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      EU regulation
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      Yes
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
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Healthcare ranking
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      #1 globally
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Not ranked
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      N/A
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      N/A
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Flight from London
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      2–2.5 hrs
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
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      UK cultural familiarity
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      Highest (expat community)
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Moderate
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Lower
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Lower
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Best for
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                      Premium + familiar
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Max savings + volume
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Lowest price + EU
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      EU + modern infra
                    </td>
                  </tr>
                </tbody>
              </table>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                Choose Spain if you prioritise the highest healthcare standards,
                a familiar cultural environment with the largest UK expat
                community in Europe, climate-friendly recovery conditions, and
                are willing to pay a modest premium for quality.
              </p>

              <p>
                Choose{' '}
                <Link
                  href="/procedures/tummy-tuck/turkey"
                  className="text-rose-600 hover:underline"
                >
                  Turkey
                </Link>{' '}
                for the best value all-inclusive packages and highest surgeon
                volume.{' '}
                <Link
                  href="/procedures/tummy-tuck/hungary"
                  className="text-rose-600 hover:underline"
                >
                  Hungary
                </Link>{' '}
                offers the lowest price with EU protections.{' '}
                <Link
                  href="/procedures/tummy-tuck/poland"
                  className="text-rose-600 hover:underline"
                >
                  Poland
                </Link>{' '}
                provides a growing EU alternative with modern facilities.
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
              Planning Your Tummy Tuck Trip to Spain
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Flights</h3>
                <p className="mt-2 text-slate-600">
                  BA, easyJet, Ryanair, Vueling, Jet2 from London, Manchester,
                  Birmingham, Edinburgh, Bristol and regional airports. 2–2.5
                  hours. Return fares from £30–£150.
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
                  Euro (EUR). Cards universally accepted. No currency exchange
                  hassle for most UK travellers familiar with Euros.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Accommodation</h3>
                <p className="mt-2 text-slate-600">
                  Some clinics include hotel stays. Independent hotels from
                  £50–£120/night depending on city. Airbnb and short-term
                  rentals widely available.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Insurance</h3>
                <p className="mt-2 text-slate-600">
                  Standard travel insurance won&apos;t cover elective cosmetic
                  surgery. Recommend specialist medical travel insurance.
                  Spain&apos;s public system is excellent for emergencies.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Language</h3>
                <p className="mt-2 text-slate-600">
                  Spanish. English widely spoken in tourist areas, especially
                  Barcelona, Marbella, and Costa del Sol. Many clinics have
                  English-speaking staff.
                </p>
              </div>
            </m.div>

            <m.div
              variants={fadeInUp}
              className="mt-8 rounded-lg bg-rose-50 p-6"
            >
              <h3 className="font-semibold text-slate-900">Best Time to Visit</h3>
              <p className="mt-2 text-slate-600">
                Year-round destination. Spring (March–May) and autumn
                (September–November) offer ideal recovery temperatures. Avoid
                July–August in Madrid (extreme heat during recovery). Marbella
                and coastal areas have mild weather year-round.
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
              Frequently Asked Questions About Tummy Tuck in Spain
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
              Get Your Free Tummy Tuck Quote from Spanish Clinics
            </m.h2>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-2xl text-rose-100"
            >
              Compare prices from SECPRE-accredited surgeons in Madrid,
              Barcelona, and Marbella. Receive personalised treatment plans from
              Spain&apos;s top clinics — no obligation.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/clinics?procedure=tummy-tuck&country=spain"
                className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-rose-600 shadow-lg transition-all hover:bg-rose-50 sm:w-auto"
              >
                Browse Tummy Tuck Clinics in Spain
              </Link>
              <Link
                href="/enquiry?procedure=tummy-tuck&country=spain"
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
