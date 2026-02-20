'use client'

import { m } from 'framer-motion'
import Link from 'next/link'

// =============================================================================
// TYPES
// =============================================================================

interface FAQ {
  question: string
  answer: string
}

interface VeneersSpainClientProps {
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

export function VeneersSpainClient({ faqs }: VeneersSpainClientProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-12 sm:py-16 lg:py-20">
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
              Veneers in Spain: Compare Prices, Clinics & Packages
            </m.h1>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl"
            >
              Spain combines JCI-accredited clinics, world-class cosmetic
              dentists, and Mediterranean sunshine — with veneer prices 40–60%
              below UK rates. Compare verified Barcelona clinics, real prices,
              and smile makeover packages.
            </m.p>

            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/clinics?procedure=veneers&country=spain"
                className="rounded-lg bg-amber-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-amber-700 hover:shadow-xl"
              >
                Browse Veneer Clinics in Spain →
              </Link>
            </m.div>

            <m.p
              variants={fadeInUp}
              className="mt-4 text-sm text-slate-500"
            >
              JCI-accredited • EU-regulated • 2hr flight from London • Free
              consultation matching
            </m.p>

            {/* Hero Stats */}
            <m.div
              variants={fadeInUp}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
            >
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-amber-600">From £250</p>
                <p className="mt-1 text-slate-600">Per tooth</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-amber-600">40–60%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-amber-600">2hr</p>
                <p className="mt-1 text-slate-600">Flight from London</p>
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
              Why UK Patients Choose Spain for Dental Veneers
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-6 space-y-4 text-slate-600"
              data-aeo="veneers-spain-benefits"
            >
              <p>
                Spain is the closest and most premium EU destination for
                cosmetic dentistry. While not the cheapest option, it offers the
                most convenient journey, highest accreditation standards, and
                best recovery environment for UK patients seeking{' '}
                <Link
                  href="/procedures/veneers"
                  className="text-amber-600 hover:underline"
                >
                  veneers abroad
                </Link>
                .
              </p>

              <p>
                Centro Médico Teknon in Barcelona holds JCI accreditation — the
                global gold standard for international healthcare quality. It
                was named in Newsweek&apos;s &ldquo;World&apos;s Best Hospitals
                2021,&rdquo; a level of recognition extremely rare in cosmetic
                dental tourism. Spanish dentists complete rigorous 5-year
                degrees at accredited EU universities and must register with the
                Consejo General de Colegios de Odontólogos (Spanish Dental
                Association).
              </p>

              <p>
                The convenience factor is unmatched: 2-hour flights from London
                on BA, Ryanair, easyJet, and Vueling. No visa required. Euro
                currency means no exchange rate hassle. For UK patients, Spain
                offers the shortest, easiest dental tourism trip available.
              </p>

              <p>
                Barcelona has become a hub for cosmetic dentistry in Europe,
                with clinics like Puyuelo Dental Clinic offering 40+ years of
                experience. Recover from your veneer treatment in one of
                Europe&apos;s most beautiful cities — or choose the Costa del
                Sol or Canary Islands for a beach-side recovery. Top clinics use
                E-max veneers from Ivoclar Vivadent, the same premium materials
                used in UK private practices.
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
              How Much Do Veneers Cost in Spain?
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="veneers-spain-cost"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Cost per Tooth — Spain vs UK
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Veneer Type
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Spain (£/tooth)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        UK (£/tooth)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Saving
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Composite Veneers
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-amber-600 sm:px-6">
                        £250–£350
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £275–£500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-green-600 sm:px-6">
                        Up to 40%
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Porcelain/Ceramic Veneers
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-amber-600 sm:px-6">
                        £450–£700
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £600–£1,200
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-green-600 sm:px-6">
                        Up to 45%
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-900 sm:px-6">
                        E-max Veneers
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-amber-600 sm:px-6">
                        £600–£850
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £700–£1,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-green-600 sm:px-6">
                        Up to 43%
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Zirconia Veneers
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-amber-600 sm:px-6">
                        £400–£650
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £500–£1,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-green-600 sm:px-6">
                        Up to 45%
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Lumineers (No-Prep)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-amber-600 sm:px-6">
                        £550–£900
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £700–£1,200
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-green-600 sm:px-6">
                        Up to 35%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Full Set Package Pricing
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Package
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Spain
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        UK
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Saving
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        8 Porcelain Veneers (upper front)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-amber-600 sm:px-6">
                        £3,600–£5,600
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £4,800–£9,600
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-green-600 sm:px-6">
                        £1,200–£4,000
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        16 Porcelain Veneers (upper + lower)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-amber-600 sm:px-6">
                        £7,200–£11,200
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £9,600–£19,200
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-green-600 sm:px-6">
                        £2,400–£8,000
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        20 E-max Veneers (full smile)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-amber-600 sm:px-6">
                        £12,000–£17,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £14,000–£30,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-green-600 sm:px-6">
                        £2,000–£13,000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                Spain is not the cheapest destination for veneers —{' '}
                <Link
                  href="/procedures/veneers/turkey"
                  className="text-amber-600 hover:underline"
                >
                  Turkey
                </Link>
                ,{' '}
                <Link
                  href="/procedures/veneers/poland"
                  className="text-amber-600 hover:underline"
                >
                  Poland
                </Link>
                , and{' '}
                <Link
                  href="/procedures/veneers/hungary"
                  className="text-amber-600 hover:underline"
                >
                  Hungary
                </Link>{' '}
                all offer lower per-tooth pricing. Spain&apos;s value
                proposition lies in proximity (2-hour flight), premium
                infrastructure (JCI accreditation), Euro currency, and the
                Mediterranean recovery experience.
              </p>

              <p>
                For patients where saving £3,000–£8,000 on a full set is
                sufficient (vs saving £5,000–£12,000 in Turkey or Poland), Spain
                offers the most convenient, highest-quality experience. Read our{' '}
                <Link
                  href="/blog/dental-implants-abroad-cost-guide"
                  className="text-amber-600 hover:underline"
                >
                  complete cost guide
                </Link>{' '}
                for more detailed pricing comparisons.
              </p>

              <p className="text-sm italic">
                Prices based on aggregated data from leading Barcelona clinics.
                Actual costs vary by clinic, complexity, and materials. All
                prices in GBP.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Types of Veneers Section */}
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
              Types of Veneers Available at Spanish Clinics
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Composite Veneers
                </h3>
                <p className="mt-2 text-sm text-amber-600">£250–£350/tooth</p>
                <p className="mt-3 text-slate-600">
                  Direct bonding technique completed in a single visit. 5–7 year
                  lifespan. Ideal for minor cosmetic improvements. The fastest
                  option for a smile refresh.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Porcelain Veneers
                </h3>
                <p className="mt-2 text-sm text-amber-600">£450–£700/tooth</p>
                <p className="mt-3 text-slate-600">
                  Lab-crafted ceramic veneers with 10–15 year lifespan. Superior
                  aesthetics and stain resistance. The most popular choice for
                  international patients in Barcelona.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  E-max Veneers
                </h3>
                <p className="mt-2 text-sm text-amber-600">£600–£850/tooth</p>
                <p className="mt-3 text-slate-600">
                  Premium lithium disilicate by Ivoclar Vivadent. 15–20 year
                  lifespan. Best translucency and most natural appearance.
                  Available at all major Barcelona clinics.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Zirconia Veneers
                </h3>
                <p className="mt-2 text-sm text-amber-600">£400–£650/tooth</p>
                <p className="mt-3 text-slate-600">
                  The strongest veneer option with 900 MPa flexural strength.
                  Ideal for patients with bruxism or grinding habits. Excellent
                  long-term durability.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Lumineers (No-Prep)
                </h3>
                <p className="mt-2 text-sm text-amber-600">£550–£900/tooth</p>
                <p className="mt-3 text-slate-600">
                  Ultra-thin veneers requiring minimal or no tooth preparation.
                  Preserves natural enamel. Premium option for conservative
                  treatment approaches.
                </p>
              </div>
            </m.div>

            <m.p variants={fadeInUp} className="mt-6 text-slate-600">
              Spanish clinics maintain high ethical standards and are
              transparent about treatment classifications. Your dentist will
              clearly explain if your case requires veneers, crowns, or a
              combination — ensuring you receive the most appropriate treatment
              for your needs.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Treatment Timeline Section */}
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
              What to Expect: Your Veneers Treatment in Spain
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Porcelain/E-max Veneers Timeline (Most Common)
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4 rounded-lg bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 font-semibold">
                    0
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Before You Fly
                    </p>
                    <p className="text-slate-600">
                      Free online consultation via photos and digital
                      impressions. Treatment plan and quote provided. Shade
                      selection may begin remotely.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-lg bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Day 1 — Arrival & Preparation
                    </p>
                    <p className="text-slate-600">
                      Airport transfer to clinic. In-clinic examination and
                      digital scan. Tooth preparation. Temporary veneers fitted.
                      Shade confirmed with your input.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-lg bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 font-semibold">
                    2–3
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Days 2–3 — Fabrication
                    </p>
                    <p className="text-slate-600">
                      Your veneers are crafted at the partner laboratory.
                      You&apos;re free to enjoy Barcelona — beaches,
                      restaurants, Sagrada Família, Las Ramblas, the Gothic
                      Quarter.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-lg bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 font-semibold">
                    4–5
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Days 4–5 — Fitting & Bonding
                    </p>
                    <p className="text-slate-600">
                      Trial-fitting to check colour, shape and fit.
                      Adjustments as needed. Permanent bonding. Post-care
                      instructions. Final check-up.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-lg bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 font-semibold">
                    5
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Day 5 — Departure
                    </p>
                    <p className="text-slate-600">
                      Airport transfer home. Aftercare support continues via
                      remote consultations. Your new smile is complete.
                    </p>
                  </div>
                </div>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                <strong>Composite veneers:</strong> Can be completed in 1–2
                days. No laboratory wait required as veneers are sculpted
                directly on your teeth.
              </p>
              <p>
                <strong>Total trip duration:</strong> 4–5 days typical for
                porcelain/E-max. This is shorter than Turkey (7–10 days for many
                packages) because there&apos;s no &ldquo;holiday add-on&rdquo;
                padding — you&apos;re here for treatment, with Barcelona as your
                recovery backdrop.
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
              Top-Rated Veneer Clinics in Spain
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2"
            >
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Centro Médico Teknon
                    </h3>
                    <p className="text-sm text-slate-500">Barcelona</p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                    JCI Accredited
                  </span>
                </div>
                <p className="mt-4 text-slate-600">
                  JCI-accredited medical centre. Newsweek &ldquo;World&apos;s
                  Best Hospitals 2021.&rdquo; Comprehensive cosmetic dentistry
                  including veneers, crowns, and smile makeovers. International
                  patient coordinator. English-speaking specialists.
                </p>
                <Link
                  href="/clinics/centro-medico-teknon"
                  className="mt-4 inline-block text-amber-600 hover:underline"
                >
                  View Clinic Profile →
                </Link>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Puyuelo Dental Clinic
                    </h3>
                    <p className="text-sm text-slate-500">Barcelona</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    40+ Years
                  </span>
                </div>
                <p className="mt-4 text-slate-600">
                  40+ years of clinical excellence. Dr. Marta Satorres leads the
                  cosmetic dentistry team. State-of-the-art technology. Treats
                  local and international patients. Full cosmetic dentistry
                  portfolio.
                </p>
                <Link
                  href="/clinics/puyuelo-dental-clinic"
                  className="mt-4 inline-block text-amber-600 hover:underline"
                >
                  View Clinic Profile →
                </Link>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Nart Clínica Dental
                    </h3>
                    <p className="text-sm text-slate-500">Barcelona</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    ISO Certified
                  </span>
                </div>
                <p className="mt-4 text-slate-600">
                  Single-specialty dental facility. ISO-certified quality
                  management. Patients from US, Canada, and UK. Cosmetic
                  dentistry and veneer specialists with international patient
                  experience.
                </p>
                <Link
                  href="/clinics/nart-clinica-dental"
                  className="mt-4 inline-block text-amber-600 hover:underline"
                >
                  View Clinic Profile →
                </Link>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Catar Clínica Dental
                    </h3>
                    <p className="text-sm text-slate-500">Barcelona</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    International
                  </span>
                </div>
                <p className="mt-4 text-slate-600">
                  Single-specialty dental centre focused on cosmetic and
                  restorative dentistry. International patient base. Modern
                  facilities with the latest dental technology.
                </p>
                <Link
                  href="/clinics/catar-clinica-dental"
                  className="mt-4 inline-block text-amber-600 hover:underline"
                >
                  View Clinic Profile →
                </Link>
              </div>
            </m.div>

            <m.p
              variants={fadeInUp}
              className="mt-6 text-sm text-slate-500"
            >
              The Spanish dental tourism market is smaller but more premium than
              Turkey or Hungary. These clinics represent the best of
              Barcelona&apos;s international cosmetic dentistry scene.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Comparison Section */}
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
              Veneers in Spain vs Turkey & Hungary: Which Is Right for You?
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      Factor
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-amber-600 sm:px-6">
                      Spain
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      Turkey
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                      Hungary
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Composite veneer price
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      £250–£350
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      £50–£120
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      £105–£180
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Porcelain veneer price
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      £450–£700
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      £130–£350
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      £200–£350
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      E-max veneer price
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      £600–£850
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      £200–£400
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      £250–£450
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Flight from London
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-amber-600 sm:px-6">
                      2 hours
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      3.5–4 hours
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      2.5 hours
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
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      JCI-accredited hospitals
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      Yes (Teknon)
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Yes (some)
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      No
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      &ldquo;Turkey teeth&rdquo; stigma risk
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      No
                    </td>
                    <td className="px-4 py-4 text-sm text-red-600 sm:px-6">
                      Yes
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                      No
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Recovery environment
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-amber-600 sm:px-6">
                      Mediterranean coast/cities
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Beach resorts
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Urban (Budapest)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Currency
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-amber-600 sm:px-6">
                      EUR (easy)
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      TRY (convert)
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      HUF (convert)
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                      Best for
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-amber-600 sm:px-6">
                      Proximity + premium
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      Maximum savings
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      EU + heritage
                    </td>
                  </tr>
                </tbody>
              </table>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                Spain is the right choice if you want the shortest possible
                trip, the highest accreditation standards, and the most
                enjoyable recovery environment. You&apos;ll save less than going
                to{' '}
                <Link
                  href="/procedures/veneers/turkey"
                  className="text-amber-600 hover:underline"
                >
                  Turkey
                </Link>{' '}
                or{' '}
                <Link
                  href="/procedures/veneers/hungary"
                  className="text-amber-600 hover:underline"
                >
                  Hungary
                </Link>
                , but you&apos;ll spend less time travelling, deal with familiar
                Euro currency, and recover in one of Europe&apos;s most
                beautiful cities.
              </p>

              <p>
                Choose Turkey if budget is your primary concern. Choose Hungary
                if you want a balance of EU regulation and stronger savings.
                Consider{' '}
                <Link
                  href="/procedures/dental-implants/spain"
                  className="text-amber-600 hover:underline"
                >
                  dental implants in Spain
                </Link>{' '}
                if you need restorative work alongside your cosmetic treatment.
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
              Planning Your Veneer Trip to Spain
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Flights</h3>
                <p className="mt-2 text-slate-600">
                  BA, Ryanair, easyJet, Vueling from London, Manchester,
                  Birmingham, Edinburgh. Budget fares from £30–£100 return. 2
                  hours to Barcelona (BCN). Also direct to Málaga, Alicante,
                  Madrid.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Visa</h3>
                <p className="mt-2 text-slate-600">
                  Not required for UK citizens (stays under 90 days). Valid
                  passport needed. No visa paperwork or advance applications.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Currency</h3>
                <p className="mt-2 text-slate-600">
                  Euro (EUR). Cards universally accepted. No currency conversion
                  hassle — the most straightforward destination for UK
                  travellers.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Accommodation</h3>
                <p className="mt-2 text-slate-600">
                  Clinics can arrange hotel packages. Barcelona hotels from
                  £50–£100/night in central areas — Eixample, Gothic Quarter,
                  Barceloneta.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Insurance</h3>
                <p className="mt-2 text-slate-600">
                  Specialist medical travel insurance recommended. Covers
                  treatment complications and travel disruptions.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Language</h3>
                <p className="mt-2 text-slate-600">
                  Spanish/Catalan. English widely spoken at international dental
                  clinics and throughout Barcelona&apos;s tourist areas.
                </p>
              </div>
            </m.div>

            <m.div
              variants={fadeInUp}
              className="mt-8 rounded-lg bg-amber-50 p-6"
            >
              <h3 className="font-semibold text-slate-900">
                What to Do During Downtime
              </h3>
              <p className="mt-2 text-slate-600">
                <strong>Barcelona:</strong> Sagrada Família, Las Ramblas, Gothic
                Quarter, Barceloneta beach, Park Güell, Montjuïc.{' '}
                <strong>Costa del Sol:</strong> beaches, Marbella, Nerja, Ronda.
                Your 2–3 days between preparation and fitting are the perfect
                opportunity to explore.
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
              Frequently Asked Questions About Veneers in Spain
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8 space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-lg bg-white shadow-sm"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-slate-900">
                    {faq.question}
                    <span className="ml-4 flex-shrink-0 text-amber-600 transition-transform group-open:rotate-180">
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
      <section className="bg-amber-600 py-12 sm:py-16 lg:py-20">
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
              Get Your Free Veneer Quote from Spanish Clinics
            </m.h2>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-2xl text-amber-100"
            >
              Compare prices from JCI-accredited Barcelona clinics. Receive
              personalised treatment plans and transparent quotes — no
              obligation.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/clinics?procedure=veneers&country=spain"
                className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-amber-600 shadow-lg transition-all hover:bg-amber-50 sm:w-auto"
              >
                Browse Veneer Clinics in Spain
              </Link>
              <Link
                href="/enquiry?procedure=veneers&country=spain"
                className="w-full rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-amber-700 sm:w-auto"
              >
                Get Free Clinic Recommendations
              </Link>
            </m.div>
          </m.div>
        </div>
      </section>
    </>
  )
}
