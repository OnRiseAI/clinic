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

interface RhinoplastyHungaryClientProps {
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

export function RhinoplastyHungaryClient({ faqs }: RhinoplastyHungaryClientProps) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-12 sm:py-16 lg:py-20">
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
              Rhinoplasty in Hungary: UK Patient Guide to Nose Surgery in Budapest
            </m.h1>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl"
            >
              European healthcare standards, Hungarian expertise. Save 40-60% vs UK
              prices with EU patient protections, internationally trained surgeons,
              and unique thermal spa recovery options.
            </m.p>

            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/clinics?procedure=rhinoplasty&country=hungary"
                className="rounded-lg bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl"
              >
                Compare Budapest Surgeons
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-4 text-sm text-slate-500">
              ISO-certified clinics &bull; Internationally trained surgeons &bull;
              Thermal spa recovery &bull; EU patient protections
            </m.p>

            {/* Hero Stats */}
            <m.div
              variants={fadeInUp}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
            >
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-emerald-600">€2,200-€3,500</p>
                <p className="mt-1 text-slate-600">All-inclusive packages</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-emerald-600">40-60%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-emerald-600">2.5 hrs</p>
                <p className="mt-1 text-slate-600">Flight from London</p>
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
              Why UK Patients Choose Hungary for Rhinoplasty
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-6 space-y-4 text-slate-600"
              data-aeo="rhinoplasty-hungary-benefits"
            >
              <p>
                Hungary has transformed into a leading European medical tourism
                destination, built on a foundation of world-class medical education
                and the unique combination of EU standards with competitive pricing.
                For UK patients seeking rhinoplasty abroad, Hungary offers a
                sophisticated European alternative that prioritises quality over
                rock-bottom prices.
              </p>

              <p>
                <strong>EU Healthcare Framework:</strong> Hungary operates within EU
                medical regulations, offering UK patients familiar standards, clear
                patient rights, and regulatory oversight that provides reassurance.
                The Hungarian Ministry of Health maintains strict oversight of all
                medical facilities, and EU cross-border healthcare directives apply.
              </p>

              <p>
                <strong>Medical Education Heritage:</strong> Hungarian medical
                universities rank among Europe&apos;s oldest and most prestigious.
                Many Hungarian surgeons have additional international training,
                particularly from the renowned Prof. Ivo Pitanguy school in Brazil
                — considered the birthplace of modern cosmetic surgery. This
                training lineage brings refined techniques and aesthetic
                sensibilities to Budapest clinics.
              </p>

              <p>
                <strong>Cost-Quality Balance:</strong> Hungary offers 40-60% savings
                vs UK prices — less aggressive than Turkey&apos;s discounts, but with
                higher baseline quality standards and EU regulatory compliance. This
                positions Hungary as the premium European choice for patients who
                prioritise regulatory standards over maximum savings.
              </p>

              <p>
                <strong>Thermal Spa Culture:</strong> Hungary has 1,500+ thermal
                springs, including famous Budapest baths like Széchenyi, Gellért,
                and Rudas. Post-operative relaxation in mineral-rich waters (after
                surgeon approval, typically 4-6 weeks post-op) offers a unique
                recovery experience unavailable elsewhere.
              </p>
            </m.div>

            {/* Key Advantages Grid */}
            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              <div className="rounded-lg bg-emerald-50 p-4">
                <p className="font-semibold text-slate-900">EU Standards</p>
                <p className="mt-1 text-sm text-slate-600">
                  Full EU healthcare regulation and patient protections
                </p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-4">
                <p className="font-semibold text-slate-900">Brazilian Training</p>
                <p className="mt-1 text-sm text-slate-600">
                  Surgeons trained at Prof. Pitanguy Institute
                </p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-4">
                <p className="font-semibold text-slate-900">Thermal Recovery</p>
                <p className="mt-1 text-sm text-slate-600">
                  1,500+ thermal springs for post-recovery relaxation
                </p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-4">
                <p className="font-semibold text-slate-900">Accessibility</p>
                <p className="mt-1 text-sm text-slate-600">
                  2.5 hours from London, multiple daily flights
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
              Rhinoplasty Cost in Hungary vs UK: 2025 Price Comparison
            </m.h2>

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Hungary offers excellent value for EU-standard care — not the cheapest
              option, but transparent pricing with regulatory protections.
            </m.p>

            {/* Main Price Comparison */}
            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="rhinoplasty-hungary-cost"
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
                        Hungary (All-Inclusive)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        UK (Surgery Only)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        UK (Total Est.)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Primary Rhinoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-emerald-600 sm:px-6">
                        €2,200-€3,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £5,000-£7,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £6,500-£9,500
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Revision Rhinoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-emerald-600 sm:px-6">
                        €4,000-€5,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £8,000-£12,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £10,000-£16,000
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Ultrasonic Rhinoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-emerald-600 sm:px-6">
                        €2,870-€4,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £6,000-£8,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £8,000-£11,000
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Septorhinoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-emerald-600 sm:px-6">
                        €2,800-€4,200
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £6,000-£8,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £8,000-£11,000
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Tip Rhinoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-emerald-600 sm:px-6">
                        €1,800-€2,800
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,500-£5,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £4,500-£6,500
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Hungarian prices in Euros. 1 EUR ≈ £0.85 (verify current rate).
              </p>
            </m.div>

            {/* Package Inclusions */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Standard All-Inclusive Package (€2,200-€3,500)
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Pre-operative</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Virtual + in-person consultation, blood tests, ECG
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Surgery</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Surgeon fee, anaesthesiologist, operating theatre
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Anaesthesia</p>
                  <p className="mt-1 text-sm text-slate-600">
                    General or local anaesthesia with sedation
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Post-operative</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Medications, nasal splint, dressings
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Accommodation</p>
                  <p className="mt-1 text-sm text-slate-600">
                    2-4 nights in 3-4 star hotel
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Transfers</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Airport pickup and clinic transfers
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Follow-up</p>
                  <p className="mt-1 text-sm text-slate-600">
                    2-3 post-operative appointments
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Coordinator</p>
                  <p className="mt-1 text-sm text-slate-600">
                    English-speaking patient coordinator
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Emergency Line</p>
                  <p className="mt-1 text-sm text-slate-600">
                    24/7 emergency contact during stay
                  </p>
                </div>
              </div>
            </m.div>

            {/* Premium Add-ons */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Premium Package Add-ons (€3,500-€5,000)
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <p className="font-medium text-slate-900">5-star Hotel</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Upgraded accommodation
                  </p>
                </div>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <p className="font-medium text-slate-900">Thermal Spa Access</p>
                  <p className="mt-1 text-sm text-slate-600">
                    For post-recovery use
                  </p>
                </div>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <p className="font-medium text-slate-900">Extended Stay</p>
                  <p className="mt-1 text-sm text-slate-600">
                    7+ nights accommodation
                  </p>
                </div>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <p className="font-medium text-slate-900">Private Nursing</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Dedicated nursing care
                  </p>
                </div>
              </div>
            </m.div>

            {/* Not Included */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Typically NOT Included
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
                        Return flights (UK to Budapest)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £50-£150
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Travel insurance (with medical cover)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £30-£60
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Thermal spa treatments
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €20-€50 per session
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Extra hotel nights
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        €50-€100/night
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
                Hungarian clinics often offer seasonal promotions. Request quotes
                from 3+ clinics and ask about off-peak pricing. Most Budapest clinics
                accept GBP transfers with no conversion fees.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Types of Rhinoplasty Section */}
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
              Types of Rhinoplasty Performed in Hungary
            </m.h2>

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Hungarian surgeons offer the full range of rhinoplasty techniques,
              with a strong tradition of open rhinoplasty influenced by Brazilian
              training methods.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 space-y-6"
              data-aeo="rhinoplasty-hungary-techniques"
            >
              {/* Open Rhinoplasty */}
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Open Rhinoplasty
                </h3>
                <p className="mt-2 text-slate-600">
                  The most common approach in Hungarian clinics, influenced by
                  Brazilian technique training via the Prof. Pitanguy school.
                  External columella incision provides full visibility for complex
                  reshaping and revision cases.
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Best for:</p>
                    <p className="text-sm text-slate-600">
                      Complex reshaping, dorsal hump, revision cases
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Recovery:</p>
                    <p className="text-sm text-slate-600">
                      7-10 days visible swelling, 2-3 weeks cast removal
                    </p>
                  </div>
                </div>
              </div>

              {/* Closed Rhinoplasty */}
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Closed Rhinoplasty
                </h3>
                <p className="mt-2 text-slate-600">
                  Internal incisions only, no visible scarring. Shorter procedure
                  time and faster initial recovery. Requires experienced surgeon for
                  optimal results due to limited visibility.
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Best for:</p>
                    <p className="text-sm text-slate-600">
                      Minor adjustments, tip refinement
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Recovery:</p>
                    <p className="text-sm text-slate-600">
                      Faster initial recovery than open technique
                    </p>
                  </div>
                </div>
              </div>

              {/* Ultrasonic Rhinoplasty */}
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Ultrasonic Rhinoplasty
                </h3>
                <p className="mt-2 text-slate-600">
                  Available at select premium clinics from €2,870. Piezotome
                  technology for precise bone work with reduced bruising and faster
                  recovery. Not universally available — confirm with specific surgeons.
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Benefits:</p>
                    <p className="text-sm text-slate-600">
                      Reduced bruising, faster recovery, more predictable results
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Price:</p>
                    <p className="text-sm text-emerald-600 font-medium">
                      €2,870-€4,000
                    </p>
                  </div>
                </div>
              </div>

              {/* Revision Rhinoplasty */}
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Revision Rhinoplasty
                </h3>
                <p className="mt-2 text-slate-600">
                  Higher complexity requiring experienced specialists. Hungarian
                  surgeons trained in reconstruction techniques offer revision at
                  €4,000-€5,500 — still significant savings vs UK. Thorough
                  pre-operative assessment essential.
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Best for:</p>
                    <p className="text-sm text-slate-600">
                      Correcting previous rhinoplasty results
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Recovery:</p>
                    <p className="text-sm text-slate-600">
                      Longer than primary rhinoplasty
                    </p>
                  </div>
                </div>
              </div>

              {/* Septorhinoplasty */}
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Septorhinoplasty
                </h3>
                <p className="mt-2 text-slate-600">
                  Combines cosmetic reshaping with functional correction for
                  deviated septum and breathing issues. Popular among patients with
                  both aesthetic and functional concerns.
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Best for:</p>
                    <p className="text-sm text-slate-600">
                      Aesthetic + breathing improvement
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Price:</p>
                    <p className="text-sm text-emerald-600 font-medium">
                      €2,800-€4,200
                    </p>
                  </div>
                </div>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Choosing a Surgeon Section */}
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
              Choosing a Rhinoplasty Surgeon in Hungary
            </m.h2>

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              A comprehensive framework for evaluating Hungarian surgeons,
              emphasising credentials, training lineage, and communication.
            </m.p>

            <m.div variants={fadeInUp} className="mt-8 grid gap-6 lg:grid-cols-2">
              {/* Essential Credentials */}
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">
                  Essential Credentials to Verify
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li className="flex gap-3">
                    <span className="text-emerald-600">1.</span>
                    <div>
                      <p className="font-medium text-slate-900">
                        Hungarian Medical Chamber Registration
                      </p>
                      <p>Mandatory for all practising physicians</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-600">2.</span>
                    <div>
                      <p className="font-medium text-slate-900">
                        Specialist Certification in Plastic Surgery
                      </p>
                      <p>Issued by Hungarian authorities</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-600">3.</span>
                    <div>
                      <p className="font-medium text-slate-900">
                        MPHST Membership
                      </p>
                      <p>
                        Magyar Plasztikai, Helyreállító és Esztétikai Sebészeti
                        Társaság (Hungarian Plastic Surgery Society)
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-600">4.</span>
                    <div>
                      <p className="font-medium text-slate-900">
                        International Memberships
                      </p>
                      <p>ISAPS, EBOPRAS, or equivalent</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-600">5.</span>
                    <div>
                      <p className="font-medium text-slate-900">
                        Ministry of Health Clinic Licence
                      </p>
                      <p>Confirms facility meets national standards</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Questions to Ask */}
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">
                  Questions to Ask During Consultation
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600">?</span>
                    Where did you complete your plastic surgery training?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600">?</span>
                    How many rhinoplasties do you perform annually?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600">?</span>
                    Do you have before/after photos of patients with similar nose
                    types to mine?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600">?</span>
                    What technique do you recommend for my goals, and why?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600">?</span>
                    What is your revision rate?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600">?</span>
                    How do you handle complications if they arise after I return to
                    the UK?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600">?</span>
                    Do you offer video consultations for pre-operative planning?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600">?</span>
                    What follow-up care is included?
                  </li>
                </ul>
              </div>
            </m.div>

            {/* Red Flags */}
            <m.div
              variants={fadeInUp}
              className="mt-8 rounded-lg border border-red-200 bg-red-50 p-6"
            >
              <h3 className="font-semibold text-red-800">Red Flags to Watch For</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-red-700">
                <li className="flex items-start gap-2">
                  <span>✗</span>
                  Reluctance to provide credentials or training history
                </li>
                <li className="flex items-start gap-2">
                  <span>✗</span>
                  Pressure to book immediately without proper consultation
                </li>
                <li className="flex items-start gap-2">
                  <span>✗</span>
                  Unrealistic outcome promises
                </li>
                <li className="flex items-start gap-2">
                  <span>✗</span>
                  No mention of potential complications
                </li>
                <li className="flex items-start gap-2">
                  <span>✗</span>
                  Clinic without Ministry of Health certification
                </li>
                <li className="flex items-start gap-2">
                  <span>✗</span>
                  Poor communication or language barriers during consultation
                </li>
              </ul>
            </m.div>

            {/* Experience Benchmarks */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Experience Benchmarks
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-white p-4 shadow-sm text-center">
                  <p className="text-2xl font-bold text-slate-400">100+</p>
                  <p className="mt-1 text-sm text-slate-600">Minimum</p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm text-center">
                  <p className="text-2xl font-bold text-emerald-600">500+</p>
                  <p className="mt-1 text-sm text-slate-600">Experienced</p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm text-center">
                  <p className="text-2xl font-bold text-emerald-700">1,000+</p>
                  <p className="mt-1 text-sm text-slate-600">Expert</p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm text-center">
                  <p className="text-sm font-bold text-emerald-600">Piezotome</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Specific training for ultrasonic
                  </p>
                </div>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Featured Surgeons Section */}
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
              Featured Rhinoplasty Surgeons in Hungary
            </m.h2>

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Notable Hungarian rhinoplasty surgeons with verified credentials.
              Profiles are for informational purposes — conduct your own due
              diligence before booking.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2"
            >
              {/* Dr. Miklós Molnár */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">
                  Dr. Miklós Molnár
                </h3>
                <p className="mt-1 text-emerald-600 font-medium">€2,800-€4,000</p>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p>
                    <strong>Experience:</strong> 20+ years in plastic surgery
                  </p>
                  <p>
                    <strong>Training:</strong> University of Debrecen Medical School
                    (1994), Prof. Ivo Pitanguy Institute in Rio de Janeiro (3-year
                    postgraduate programme, 2,200+ surgeries during training)
                  </p>
                  <p>
                    <strong>Current Practice:</strong> Dr. Molnar Clinic, Budapest;
                    Perfect Age Body and Facial Aesthetics Centre
                  </p>
                  <p>
                    <strong>Previous Roles:</strong> Chief of Plastic Surgery at Dr
                    Rose Private Hospital (2008-2012)
                  </p>
                  <p>
                    <strong>Languages:</strong> English, Portuguese, Italian,
                    Spanish, German, Hungarian
                  </p>
                  <p>
                    <strong>Memberships:</strong> MPHST, Hungarian Medical Board
                    (MOK), Association of Students of Professor Ivo Pitanguy
                  </p>
                </div>
              </div>

              {/* Dr. Csaba Molnár */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">
                  Dr. Csaba Molnár
                </h3>
                <p className="mt-1 text-emerald-600 font-medium">€2,500-€3,500</p>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p>
                    <strong>Experience:</strong> 25+ years in plastic and aesthetic
                    surgery
                  </p>
                  <p>
                    <strong>Position:</strong> Founder and Owner, Elite Clinic
                    (opened 2015, Debrecen)
                  </p>
                  <p>
                    <strong>Leadership:</strong> Former President and General
                    Secretary of Hungarian Society for Plastic, Reconstructive and
                    Aesthetic Surgery
                  </p>
                  <p>
                    <strong>International Role:</strong> National Secretary and
                    Representative of Hungary, ISAPS
                  </p>
                  <p>
                    <strong>Location:</strong> Debrecen (Eastern Hungary, accessible
                    from Budapest)
                  </p>
                  <p>
                    <strong>Notable:</strong> Multiple publications, congress
                    presentations, professional course instruction
                  </p>
                </div>
              </div>

              {/* Dr. Tamás Karvász */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">
                  Dr. Tamás Karvász
                </h3>
                <p className="mt-1 text-emerald-600 font-medium">€2,400-€3,200</p>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p>
                    <strong>Clinic:</strong> Art Real Plastic Surgery (established
                    2003)
                  </p>
                  <p>
                    <strong>Recognition:</strong> Listed in Top-10 plastic surgeons
                    in Hungary; clinic ranked in top 10 plastic surgeries in Central
                    Europe
                  </p>
                  <p>
                    <strong>Experience:</strong> 20+ years
                  </p>
                  <p>
                    <strong>Specialisation:</strong> Range of aesthetic procedures
                    including rhinoplasty
                  </p>
                  <p>
                    <strong>Location:</strong> Budapest
                  </p>
                </div>
              </div>

              {/* Dr. Zsombor Varga */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">
                  Dr. Zsombor Varga
                </h3>
                <p className="mt-1 text-emerald-600 font-medium">€2,600-€3,500</p>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p>
                    <strong>Associated Clinics:</strong> Works with multiple premium
                    Budapest facilities
                  </p>
                  <p>
                    <strong>Patient Reviews:</strong> Highly rated, known for
                    personalised approach
                  </p>
                  <p>
                    <strong>Specialisation:</strong> Aesthetic surgery including
                    rhinoplasty
                  </p>
                  <p>
                    <strong>Location:</strong> Budapest
                  </p>
                </div>
              </div>
            </m.div>

            <m.p variants={fadeInUp} className="mt-6 text-sm text-slate-500 italic">
              Note: Verify current practice details, pricing, and availability
              before booking. Profiles are for informational purposes.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Patient Journey Timeline */}
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
              Your Rhinoplasty Journey: Timeline for UK Patients
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8 space-y-6">
              {/* Phase 1 */}
              <div className="rounded-lg bg-white p-6 shadow">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Research & Selection (4-8 weeks before travel)
                  </h3>
                </div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-slate-600 pl-14">
                  <li>Research surgeons and clinics</li>
                  <li>Request quotes and virtual consultations</li>
                  <li>Review before/after photos</li>
                  <li>Check credentials and reviews</li>
                  <li>Select surgeon and clinic</li>
                  <li>Pay deposit (typically 20-30%)</li>
                  <li>Book flights (London to Budapest: 2.5 hours)</li>
                  <li>Arrange travel insurance with medical coverage</li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="rounded-lg bg-white p-6 shadow">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Pre-Travel Preparation (2-4 weeks before)
                  </h3>
                </div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-slate-600 pl-14">
                  <li>Complete medical questionnaire</li>
                  <li>Share photos for surgical planning</li>
                  <li>Receive pre-operative instructions</li>
                  <li>Arrange time off work (10-14 days minimum)</li>
                  <li>Organise post-operative supplies</li>
                  <li>Confirm all travel and accommodation details</li>
                </ul>
              </div>

              {/* Phase 3 */}
              <div className="rounded-lg bg-white p-6 shadow">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Budapest Stay (7-10 days typical)
                  </h3>
                </div>
                <div className="mt-4 pl-14">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="font-medium text-slate-900">Day 1 — Arrival</p>
                      <p className="text-sm text-slate-600">
                        Airport pickup, hotel check-in, rest
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="font-medium text-slate-900">Day 2 — Pre-Op</p>
                      <p className="text-sm text-slate-600">
                        Consultation, medical tests, planning
                      </p>
                    </div>
                    <div className="rounded-lg bg-emerald-50 p-3">
                      <p className="font-medium text-emerald-700">Day 3 — Surgery</p>
                      <p className="text-sm text-slate-600">
                        Procedure (1.5-3 hours), recovery room
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="font-medium text-slate-900">Days 4-6 — Recovery</p>
                      <p className="text-sm text-slate-600">
                        Rest at hotel, follow-up visits, light walking
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="font-medium text-slate-900">Days 7-10 — Pre-Departure</p>
                      <p className="text-sm text-slate-600">
                        Splint removal, final assessment, flight clearance
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 4 */}
              <div className="rounded-lg bg-white p-6 shadow">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold">
                    4
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    UK Recovery (Weeks 2-12)
                  </h3>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pl-14">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="font-medium text-slate-900">Week 2-3</p>
                    <p className="text-sm text-slate-600">Most visible bruising fades</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="font-medium text-slate-900">Week 4-6</p>
                    <p className="text-sm text-slate-600">
                      Return to desk work, gentle exercise
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="font-medium text-slate-900">Week 6-8</p>
                    <p className="text-sm text-slate-600">Resume most normal activities</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="font-medium text-slate-900">Month 3</p>
                    <p className="text-sm text-slate-600">80% swelling resolved</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="font-medium text-slate-900">Month 6-12</p>
                    <p className="text-sm text-slate-600">Final results emerging</p>
                  </div>
                  <div className="rounded-lg bg-emerald-50 p-3">
                    <p className="font-medium text-emerald-700">12+ months</p>
                    <p className="text-sm text-slate-600">Complete healing</p>
                  </div>
                </div>
              </div>
            </m.div>

            {/* Hungary-Specific Tips */}
            <m.div
              variants={fadeInUp}
              className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50 p-6"
            >
              <h3 className="font-semibold text-slate-900">
                Hungary-Specific Considerations
              </h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-slate-600">
                <li>
                  <strong>Winter visits:</strong> Budapest can be cold (Nov-Feb), but
                  lower tourist traffic
                </li>
                <li>
                  <strong>Summer visits:</strong> Warmer recovery, but busier city
                </li>
                <li>
                  <strong>Thermal spas:</strong> Generally safe after 4-6 weeks
                  (confirm with surgeon)
                </li>
                <li>
                  <strong>Direct flights:</strong> Wizz Air, Ryanair, BA from multiple
                  UK airports
                </li>
              </ul>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Recovery & Aftercare Section */}
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
              Recovery & Aftercare Expectations
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8">
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
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Immediate Post-Op
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Days 1-7
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Nasal packing removed 24-48 hours. External splint worn.
                        Bruising peaks Day 2-3. Sleep elevated.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Short-Term
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Weeks 2-4
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Splint removal reveals initial result (still swollen).
                        Bruising fading. Light work possible Week 2. Avoid glasses.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Medium-Term
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Months 1-6
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Tip remains swollen longest. Subtle refinement continues.
                        Resume exercise gradually (Month 2). Numbness resolving.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm font-medium text-emerald-600 sm:px-6">
                        Long-Term
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-emerald-600 sm:px-6">
                        6-18 months
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Final shape emerges. Internal scarring matures. Skin
                        re-drapes. Sensation fully returns. Final assessment possible.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            {/* Hungary's Recovery Advantages */}
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
                <h3 className="font-semibold text-slate-900">
                  Thermal Spa Culture
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Hungary&apos;s famous thermal baths (Széchenyi, Gellért, Rudas)
                  offer unique post-recovery relaxation — but only after surgeon
                  clearance (typically 4-6 weeks post-op). The mineral-rich waters
                  can aid general relaxation and wellbeing during extended recovery
                  visits.
                </p>
              </div>

              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
                <h3 className="font-semibold text-slate-900">
                  Affordable Extended Stays
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  If you wish to stay longer for recovery monitoring, Budapest
                  offers excellent value accommodation (€50-€100/night for quality
                  hotels) compared to UK recovery costs. Consider extending your
                  stay for additional peace of mind.
                </p>
              </div>
            </m.div>

            {/* UK Follow-Up Integration */}
            <m.div variants={fadeInUp} className="mt-8 rounded-lg bg-white p-6 shadow">
              <h3 className="font-semibold text-slate-900">
                UK Follow-Up Integration
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Most Hungarian surgeons provide:
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">&#10003;</span>
                  Detailed written aftercare instructions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">&#10003;</span>
                  Photo-based remote consultations via email/WhatsApp
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">&#10003;</span>
                  Emergency contact protocols
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">&#10003;</span>
                  Medical records for UK healthcare providers
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">&#10003;</span>
                  Coordination with UK GP if needed
                </li>
              </ul>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Risks & Safety Section */}
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
              Risks, Complications & Safety
            </m.h2>

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Honest risk information with context for Hungary&apos;s safety
              standards.
            </m.p>

            {/* General Risks */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                General Rhinoplasty Risks (apply regardless of location)
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Bleeding</p>
                  <p className="text-sm text-slate-600">
                    1-2% requiring intervention
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Infection</p>
                  <p className="text-sm text-slate-600">
                    Rare with proper protocols (&lt;1%)
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Asymmetry</p>
                  <p className="text-sm text-slate-600">
                    Minor common; significant uncommon
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Breathing Difficulties</p>
                  <p className="text-sm text-slate-600">
                    Temporary swelling vs structural
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Numbness</p>
                  <p className="text-sm text-slate-600">
                    Usually temporary, resolves within months
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Dissatisfaction</p>
                  <p className="text-sm text-slate-600">
                    5-15% seek revision
                  </p>
                </div>
              </div>
            </m.div>

            {/* Hungary-Specific Safety */}
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-green-700">
                  Hungary Safety Advantages
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">&#10003;</span>
                    EU healthcare regulations apply
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">&#10003;</span>
                    Ministry of Health oversight
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">&#10003;</span>
                    Mandatory malpractice insurance for all surgeons
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">&#10003;</span>
                    ISO-certified facilities available
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">&#10003;</span>
                    Clear patient rights under EU law
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">&#10003;</span>
                    Hungarian Medical Chamber registration required
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-amber-700">
                  Considerations
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">&#9888;</span>
                    Limited JCI-accredited hospitals (1 in Hungary)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">&#9888;</span>
                    Most cosmetic surgery in private clinics, not hospitals
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">&#9888;</span>
                    Malpractice compensation standards differ from UK
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">&#9888;</span>
                    Follow-up care coordination requires planning
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">&#9888;</span>
                    Language barriers possible (though English widely spoken)
                  </li>
                </ul>
              </div>
            </m.div>

            {/* When Hungary May NOT Be Appropriate */}
            <m.div
              variants={fadeInUp}
              className="mt-8 rounded-lg border border-red-200 bg-red-50 p-6"
            >
              <h3 className="font-semibold text-red-800">
                When Hungary May NOT Be Appropriate
              </h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-red-700">
                <li className="flex items-start gap-2">
                  <span>&#10005;</span>
                  Complex revision cases (may require UK specialist)
                </li>
                <li className="flex items-start gap-2">
                  <span>&#10005;</span>
                  Patients with significant medical comorbidities
                </li>
                <li className="flex items-start gap-2">
                  <span>&#10005;</span>
                  Those unable to travel for follow-up if needed
                </li>
                <li className="flex items-start gap-2">
                  <span>&#10005;</span>
                  Patients uncomfortable with remote post-operative care
                </li>
              </ul>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Safety Concerns Section */}
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
              Is Rhinoplasty in Hungary Safe? Addressing UK Patient Concerns
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8 space-y-6">
              {/* Concern 1 */}
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">
                  &ldquo;Is healthcare quality comparable to the UK?&rdquo;
                </h3>
                <p className="mt-2 text-slate-600">
                  Hungary&apos;s medical education system is among Europe&apos;s
                  oldest and most respected. Many surgeons have additional
                  international training. Private clinics serving medical tourists
                  invest heavily in modern equipment and facilities. EU healthcare
                  directives apply, providing baseline standards. However, patients
                  should verify individual clinic accreditations rather than assuming
                  uniformity.
                </p>
              </div>

              {/* Concern 2 */}
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">
                  &ldquo;What if something goes wrong after I return home?&rdquo;
                </h3>
                <p className="mt-2 text-slate-600">
                  This is a legitimate concern. Risk mitigation strategies include:
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600">&#10003;</span>
                    Staying 7-10 days minimum to catch early complications
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600">&#10003;</span>
                    Choosing surgeons who offer telemedicine follow-up
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600">&#10003;</span>
                    Purchasing travel insurance with medical repatriation coverage
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600">&#10003;</span>
                    Identifying UK plastic surgeons for emergency follow-up
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600">&#10003;</span>
                    Keeping detailed medical records from Hungarian procedure
                  </li>
                </ul>
              </div>

              {/* Concern 3 */}
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">
                  &ldquo;Are Hungarian surgeons properly trained?&rdquo;
                </h3>
                <p className="mt-2 text-slate-600">
                  Hungarian plastic surgery training is rigorous and EU-compliant.
                  Many leading surgeons have additional international credentials.
                  The key is individual verification: check Hungarian Medical Chamber
                  registration, verify specialist plastic surgery certification, look
                  for MPHST, ISAPS, or EBOPRAS membership, and research training
                  background (Brazilian school connections are a positive indicator).
                </p>
              </div>

              {/* Concern 4 */}
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">
                  &ldquo;Why is it cheaper than the UK?&rdquo;
                </h3>
                <p className="mt-2 text-slate-600">
                  Lower cost does not mean lower quality. Factors include: lower
                  operating costs (rent, staff salaries, utilities), favourable
                  exchange rates, competitive medical tourism market, and efficient
                  clinic models designed for international patients.
                </p>
              </div>

              {/* Hungary vs Turkey Comparison */}
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
                <h3 className="font-semibold text-slate-900">
                  Hungary vs Turkey: Honest Comparison
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="font-medium text-slate-900">Turkey</p>
                    <p className="text-sm text-slate-600">
                      Higher volume, lower prices (50-70% savings), more aggressive
                      marketing
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-emerald-700">Hungary</p>
                    <p className="text-sm text-slate-600">
                      Lower volume, moderate prices (40-60% savings), EU standards,
                      thermal spa recovery option
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  <strong>Consider Hungary if:</strong> EU regulatory framework
                  matters to you, you prefer European cultural context, or thermal
                  spa recovery appeals.
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
              Frequently Asked Questions About Rhinoplasty in Hungary
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8 space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-lg bg-white shadow-sm"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-slate-900">
                    {faq.question}
                    <span className="ml-4 flex-shrink-0 text-emerald-600 transition-transform group-open:rotate-180">
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
      <section className="bg-emerald-600 py-12 sm:py-16 lg:py-20">
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
              Get Your Free Rhinoplasty Quote from Budapest Surgeons
            </m.h2>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-2xl text-emerald-100"
            >
              Compare prices and surgeons in Hungary. Receive personalised treatment
              plans from internationally trained specialists — no obligation.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/clinics?procedure=rhinoplasty&country=hungary"
                className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-emerald-600 shadow-lg transition-all hover:bg-emerald-50 sm:w-auto"
              >
                Compare Budapest Surgeons
              </Link>
              <Link
                href="/enquiry?procedure=rhinoplasty&country=hungary"
                className="w-full rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-emerald-700 sm:w-auto"
              >
                Get Free Clinic Recommendations
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-6 text-sm text-emerald-200">
              EU-standard care &bull; ISO-certified clinics &bull; 40-60% savings vs
              UK &bull; Thermal spa recovery
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Related Links Section */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="border-t border-slate-200 pt-8"
          >
            <p className="text-sm text-slate-600">
              <strong>Related pages:</strong>{' '}
              <Link
                href="/procedures/rhinoplasty"
                className="text-emerald-600 hover:underline"
              >
                Rhinoplasty Abroad
              </Link>{' '}
              &middot;{' '}
              <Link
                href="/procedures/rhinoplasty/turkey"
                className="text-emerald-600 hover:underline"
              >
                Rhinoplasty Turkey
              </Link>{' '}
              &middot;{' '}
              <Link
                href="/procedures/rhinoplasty/poland"
                className="text-emerald-600 hover:underline"
              >
                Rhinoplasty Poland
              </Link>{' '}
              &middot;{' '}
              <Link
                href="/procedures/rhinoplasty/spain"
                className="text-emerald-600 hover:underline"
              >
                Rhinoplasty Spain
              </Link>{' '}
              &middot;{' '}
              <Link
                href="/destinations/hungary"
                className="text-emerald-600 hover:underline"
              >
                Hungary Medical Tourism
              </Link>
            </p>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
