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

interface RhinoplastySpainClientProps {
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

export function RhinoplastySpainClient({ faqs }: RhinoplastySpainClientProps) {
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
              Rhinoplasty in Spain: Complete UK Patient Guide to Premium
              European Nose Surgery
            </m.h1>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl"
            >
              Spain: Europe&apos;s centre for advanced ultrasonic and
              preservation rhinoplasty. Experience world-class technique
              innovation with Mediterranean recovery. Compare premium surgeons
              in Barcelona, Madrid, and Marbella — save 40–60% vs UK prices.
            </m.p>

            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/clinics?procedure=rhinoplasty&country=spain"
                className="rounded-lg bg-rose-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-rose-700 hover:shadow-xl"
              >
                Compare Premium Surgeons →
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-4 text-sm text-slate-500">
              WHO top 10 healthcare system • Ultrasonic specialists • EU highest
              life expectancy • 40–60% savings
            </m.p>

            {/* Hero Stats */}
            <m.div
              variants={fadeInUp}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
            >
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">€4,500–€7,500</p>
                <p className="mt-1 text-slate-600">Primary rhinoplasty</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">84 Years</p>
                <p className="mt-1 text-slate-600">EU highest life expectancy</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">2–2.5 hrs</p>
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
              Why UK Patients Choose Spain for Rhinoplasty
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-6 space-y-4 text-slate-600"
              data-aeo="rhinoplasty-spain-benefits"
            >
              <p>
                Spain represents the sophisticated choice for patients who
                prioritise technique innovation over maximum savings. The
                country offers the best of both worlds: European healthcare
                excellence at significantly lower prices than the UK.
              </p>

              <p>
                Spain ranked 7th globally in the WHO World Health Report 2000
                and maintains the highest life expectancy in the EU at 84 years
                (2.9 years above the OECD average). The OECD Health at a Glance
                2025 report highlights Spain&apos;s strong preventive care and
                low avoidable mortality rates — indicators of genuine healthcare
                quality.
              </p>

              <p>
                Spanish surgeons are European leaders in ultrasonic (Piezotome)
                and preservation rhinoplasty. These advanced methods offer
                greater precision, faster recovery, and more natural results
                than traditional techniques. While other destinations may offer
                lower prices, Spain delivers technique innovation that many UK
                private clinics cannot match.
              </p>

              <p>
                With 804+ hospitals and a private healthcare sector renowned for
                excellence, Spain offers internationally accredited facilities
                including Ruber Internacional, Quirónsalud, and Vithas.
                Barcelona and Madrid are just 2–2.5 hours from London with
                multiple daily flights — close enough for weekend follow-ups if
                needed.
              </p>
            </m.div>

            {/* Key Advantages Grid */}
            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div className="rounded-lg bg-rose-50 p-4">
                <p className="font-semibold text-slate-900">
                  Healthcare Excellence
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  WHO ranked 7th globally, EU highest life expectancy (84 years)
                </p>
              </div>
              <div className="rounded-lg bg-rose-50 p-4">
                <p className="font-semibold text-slate-900">
                  Technique Leadership
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  European leaders in ultrasonic and preservation rhinoplasty
                </p>
              </div>
              <div className="rounded-lg bg-rose-50 p-4">
                <p className="font-semibold text-slate-900">
                  Premium Infrastructure
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Ruber Internacional, Quirónsalud, Clínica Planas
                </p>
              </div>
              <div className="rounded-lg bg-rose-50 p-4">
                <p className="font-semibold text-slate-900">
                  Strategic Location
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  2–2.5 hour flights, multiple daily from London
                </p>
              </div>
              <div className="rounded-lg bg-rose-50 p-4">
                <p className="font-semibold text-slate-900">
                  Mediterranean Recovery
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Sunshine, mild climate, relaxing environment
                </p>
              </div>
              <div className="rounded-lg bg-rose-50 p-4">
                <p className="font-semibold text-slate-900">
                  UK Patient Experience
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  English-speaking surgeons, dedicated coordinators
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
              Rhinoplasty Cost in Spain vs UK: 2025 Price Comparison
            </m.h2>

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Spain&apos;s pricing reflects premium-but-accessible positioning.
              Patients choosing Spain prioritise quality and technique
              innovation while still achieving significant savings.
            </m.p>

            {/* Main Price Comparison */}
            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="rhinoplasty-spain-cost"
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
                        Spain
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
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        €4,500–€7,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £5,000–£7,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £6,500–£9,500
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Ultrasonic Rhinoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        €4,000–€10,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £8,000–£12,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £10,000–£15,000
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Revision Rhinoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        €5,500–€9,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £8,000–£12,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £10,000–£16,000
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Preservation Rhinoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        €5,000–€9,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £9,000–£14,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £11,000–£17,000
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Ethnic Rhinoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        €5,500–€9,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £6,500–£9,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £8,500–£12,000
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Septorhinoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        €5,000–€8,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £6,000–£8,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £8,000–£11,000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm italic text-slate-500">
                Spanish prices often include consultation and follow-up but
                exclude accommodation/flights. UK &quot;Total Est.&quot;
                includes anaesthesia, facility fees, follow-up.
              </p>
            </m.div>

            {/* What's Included */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Surgery Package — What&apos;s Typically Included (€4,500–€7,500)
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Pre-op Consultation</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Often with 3D imaging simulation
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Medical Tests</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Blood work, ECG, comprehensive evaluation
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
                    1 night private room (standard at premium facilities)
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
                    Splint removal + 2-3 consultations
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Coordinator</p>
                  <p className="mt-1 text-sm text-slate-600">
                    English-speaking patient coordinator
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Documentation</p>
                  <p className="mt-1 text-sm text-slate-600">
                    All records in English
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Aftercare Plan</p>
                  <p className="mt-1 text-sm text-slate-600">
                    12-month post-operative care plan
                  </p>
                </div>
              </div>
            </m.div>

            {/* What Patients Pay Separately */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                What Patients Arrange Separately
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
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Return flights
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £60–£150
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Multiple daily London-Barcelona/Madrid
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Hotel (5-7 nights)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £400–£700
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Clinics recommend nearby options
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Travel insurance
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £40–£80
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Medical tourism cover essential
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Airport transfers
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £40–£80
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Or arrange via clinic
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div
              variants={fadeInUp}
              className="mt-6 rounded-lg border border-rose-200 bg-rose-50 p-4"
            >
              <p className="font-medium text-slate-900">Value Proposition</p>
              <p className="mt-1 text-sm text-slate-600">
                Spain represents the premium European choice — 40–60% savings
                versus UK for equivalent or superior technique. Patients
                choosing Spain prioritise ultrasonic precision and preservation
                methods over maximum cost reduction.
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
              Types of Rhinoplasty Performed in Spain
            </m.h2>

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Spain is the technique innovation leader. Ultrasonic and
              preservation rhinoplasty are central to the Spanish approach —
              these methods are Spain&apos;s key differentiators in the European
              market.
            </m.p>

            {/* Ultrasonic Rhinoplasty - Spain's Signature */}
            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="ultrasonic-rhinoplasty-spain"
            >
              <div className="rounded-xl border-2 border-rose-200 bg-rose-50 p-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Ultrasonic (Piezo) Rhinoplasty — Spain&apos;s Signature
                  Technique
                </h3>

                <p className="mt-4 text-slate-600">
                  Ultrasonic rhinoplasty uses a Piezotome device operating at
                  25–30 kHz to sculpt nasal bones with microscopic precision.
                  Unlike traditional hammers and chisels, ultrasonic vibrations
                  selectively cut bone while leaving soft tissue, blood vessels,
                  and mucosa completely intact.
                </p>

                <h4 className="mt-6 font-semibold text-slate-900">
                  Why Spain Leads in Ultrasonic Technique
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>
                    • Dr. Jorge Planas (Clínica Planas, Barcelona) introduced
                    ultrasonic rhinoplasty to Spain
                  </li>
                  <li>
                    • Spanish surgeons have refined the technique through
                    extensive practice
                  </li>
                  <li>
                    • Top Madrid and Barcelona clinics have invested in advanced
                    Piezotome equipment
                  </li>
                  <li>
                    • Training programmes attract surgeons from across Europe
                  </li>
                </ul>

                <h4 className="mt-6 font-semibold text-slate-900">
                  Key Advantages
                </h4>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg bg-white p-3">
                    <p className="text-sm font-medium text-green-700">
                      Minimal to no bruising
                    </p>
                    <p className="text-xs text-slate-500">
                      vs extensive bruising with traditional methods
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-3">
                    <p className="text-sm font-medium text-green-700">
                      7-day social recovery
                    </p>
                    <p className="text-xs text-slate-500">
                      vs 2-3 weeks traditional
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-3">
                    <p className="text-sm font-medium text-green-700">
                      No nasal packing
                    </p>
                    <p className="text-xs text-slate-500">
                      in most cases
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-3">
                    <p className="text-sm font-medium text-green-700">
                      Greater precision
                    </p>
                    <p className="text-xs text-slate-500">
                      for dorsal hump reduction
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-3">
                    <p className="text-sm font-medium text-green-700">
                      More predictable results
                    </p>
                    <p className="text-xs text-slate-500">
                      natural-looking outcomes
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-3">
                    <p className="text-sm font-medium text-green-700">
                      Reduced complications
                    </p>
                    <p className="text-xs text-slate-500">
                      less tissue trauma
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-white p-4">
                  <p className="text-sm font-medium text-slate-900">
                    Ideal Candidates for Ultrasonic
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>
                      • Patients requiring bone work (dorsal hump, crooked nose)
                    </li>
                    <li>• Those prioritising rapid recovery</li>
                    <li>• Revision cases requiring delicate bone manipulation</li>
                  </ul>
                </div>
              </div>
            </m.div>

            {/* Preservation Rhinoplasty */}
            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="preservation-rhinoplasty-spain"
            >
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">
                  Preservation Rhinoplasty — The Next Evolution
                </h3>

                <p className="mt-4 text-slate-600">
                  Preservation rhinoplasty represents the cutting edge of nasal
                  surgery philosophy. Rather than removing and reconstructing
                  nasal structures, surgeons work within the existing framework
                  to reshape from beneath.
                </p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Key Principles
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                      <li>• Maintains nasal bridge support structures</li>
                      <li>• Reshapes bone without breaking it</li>
                      <li>• Preserves blood supply to skin envelope</li>
                      <li>• Reduces long-term unpredictability</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Benefits</h4>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                      <li>
                        • Results that feel natural (nose bends and moves
                        normally)
                      </li>
                      <li>• More stable long-term outcomes</li>
                      <li>• Reduced risk of over-correction</li>
                      <li>• Often combined with ultrasonic technique</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-900">
                    Spanish Preservation Experts
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>
                      • <strong>Dr. Alfredo Fernández Blanco</strong>{' '}
                      (Madrid/Marbella): 30+ years, preservation pioneer
                    </li>
                    <li>
                      • <strong>Dr. Francisco Bravo</strong> (Madrid): President
                      of Spanish Association of Aesthetic Plastic Surgery
                    </li>
                    <li>
                      • <strong>Clínica Gómez Bravo</strong>: Natural-feeling
                      results emphasis
                    </li>
                  </ul>
                </div>
              </div>
            </m.div>

            {/* Open vs Closed */}
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h4 className="font-semibold text-slate-900">
                  Open Rhinoplasty
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• Small external incision across columella</li>
                  <li>• Full visibility for complex work</li>
                  <li>• Preferred for ultrasonic technique (requires access)</li>
                  <li>• Minimal scar fades within weeks to months</li>
                  <li>• Standard approach in Spanish clinics</li>
                </ul>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h4 className="font-semibold text-slate-900">
                  Closed Rhinoplasty
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• All incisions hidden inside nostrils</li>
                  <li>• Suitable for minor refinements</li>
                  <li>• Faster recovery, less swelling</li>
                  <li>• Limited application with ultrasonic technique</li>
                  <li>• Selected cases only in premium Spanish clinics</li>
                </ul>
              </div>
            </m.div>

            {/* Other Types */}
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h4 className="font-semibold text-slate-900">
                  Revision Rhinoplasty
                </h4>
                <p className="mt-1 text-sm text-rose-600">€5,500–€9,000</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• Corrects unsatisfactory previous results</li>
                  <li>• Spanish surgeons experienced with international cases</li>
                  <li>• Ultrasonic technique valuable for scar tissue work</li>
                  <li>• Wait 12+ months after initial surgery</li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h4 className="font-semibold text-slate-900">
                  Ethnic Rhinoplasty
                </h4>
                <p className="mt-1 text-sm text-rose-600">€5,500–€9,000</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• Preserves cultural identity</li>
                  <li>• Mediterranean, Middle Eastern, African, Asian expertise</li>
                  <li>• Advanced 3D imaging for customised approach</li>
                  <li>• Preservation rhinoplasty often preferred</li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h4 className="font-semibold text-slate-900">
                  Septorhinoplasty
                </h4>
                <p className="mt-1 text-sm text-rose-600">€5,000–€8,000</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• Combines cosmetic reshaping + septal correction</li>
                  <li>• Addresses breathing difficulties</li>
                  <li>• May qualify for partial UK insurance coverage</li>
                  <li>• Common in Spain — dual-trained surgeons</li>
                </ul>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* How to Choose a Surgeon Section */}
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
              How to Choose a Rhinoplasty Surgeon in Spain
            </m.h2>

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Spain&apos;s premium positioning requires careful surgeon
              selection. Use this verification framework independently to build
              confidence.
            </m.p>

            {/* Credentials */}
            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="spain-rhinoplasty-credentials"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Essential Credentials to Verify
              </h3>
              <div className="rounded-lg bg-white p-6 shadow">
                <p className="font-medium text-slate-900">
                  Board Certifications (Hierarchy of Credibility)
                </p>
                <ol className="mt-4 space-y-3 text-sm text-slate-600">
                  <li className="flex items-start">
                    <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                      1
                    </span>
                    <div>
                      <span className="font-medium text-slate-900">SECPRE</span>{' '}
                      — Sociedad Española de Cirugía Plástica, Reparadora y
                      Estética (Primary Spanish board)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                      2
                    </span>
                    <div>
                      <span className="font-medium text-slate-900">AECEP</span>{' '}
                      — Asociación Española de Cirugía Estética Plástica
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                      3
                    </span>
                    <div>
                      <span className="font-medium text-slate-900">EBOPRAS</span>{' '}
                      — European Board of Plastic, Reconstructive and Aesthetic
                      Surgery
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                      4
                    </span>
                    <div>
                      <span className="font-medium text-slate-900">ISAPS</span>{' '}
                      — International Society of Aesthetic Plastic Surgery
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                      5
                    </span>
                    <div>
                      <span className="font-medium text-slate-900">
                        European Rhinoplasty Society
                      </span>{' '}
                      — Specialist membership
                    </div>
                  </li>
                </ol>
                <p className="mt-4 text-sm italic text-slate-500">
                  How to verify: Request registration numbers. Cross-reference
                  with SECPRE directory. Spanish surgeons treating international
                  patients should provide documentation readily.
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
                    <li>
                      • <strong>Ultrasonic proficiency:</strong> 200+ ultrasonic
                      procedures
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-6 shadow">
                  <p className="font-medium text-slate-900">Questions to Ask</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li>
                      &quot;How many rhinoplasties do you perform annually?&quot;
                    </li>
                    <li>
                      &quot;What percentage use ultrasonic technique?&quot;
                    </li>
                    <li>&quot;What is your revision rate?&quot;</li>
                    <li>
                      &quot;Can you show before/after photos of similar
                      anatomy?&quot;
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
                <li>• Reluctance to share credentials</li>
                <li>• Prices significantly below market (under €3,000)</li>
                <li>• Pressure to book quickly</li>
                <li>• No revision policy in writing</li>
                <li>• Surgery in non-accredited facilities</li>
                <li>• No before/after portfolio for similar cases</li>
              </ul>
            </m.div>

            {/* Regional Considerations */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Regional Considerations — Madrid vs Barcelona vs Marbella
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-white p-6 shadow">
                  <p className="font-semibold text-slate-900">Madrid</p>
                  <p className="mt-1 text-sm text-rose-600">Medical Hub</p>
                  <ul className="mt-3 space-y-1 text-sm text-slate-600">
                    <li>• Highest concentration of top surgeons</li>
                    <li>• Premium hospital infrastructure</li>
                    <li>• Ruber Internacional, Vithas</li>
                    <li>• More formal, business-focused</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-6 shadow">
                  <p className="font-semibold text-slate-900">Barcelona</p>
                  <p className="mt-1 text-sm text-rose-600">Innovation Centre</p>
                  <ul className="mt-3 space-y-1 text-sm text-slate-600">
                    <li>• Aesthetic surgery reputation</li>
                    <li>• Clínica Planas, Clínica Birbe</li>
                    <li>• Dr. Tintoré (ultrasonic pioneer)</li>
                    <li>• Mediterranean lifestyle appeal</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-6 shadow">
                  <p className="font-semibold text-slate-900">Marbella</p>
                  <p className="mt-1 text-sm text-rose-600">Luxury Recovery</p>
                  <ul className="mt-3 space-y-1 text-sm text-slate-600">
                    <li>• Resort-style recovery experience</li>
                    <li>• Dr. Fernández Blanco clinic</li>
                    <li>• Growing medical tourism infrastructure</li>
                    <li>• Combine procedure with holiday</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm italic text-slate-500">
                Decision Framework: Choose Madrid for hospital-based care,
                Barcelona for aesthetic clinic innovation, Marbella for premium
                recovery experience.
              </p>
            </m.div>

            {/* Hospital Excellence */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Premium Hospital & Clinic Facilities
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Ruber Internacional
                  </p>
                  <p className="text-sm text-slate-600">
                    Madrid — Premium private hospital
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Vithas La Luz Hospital
                  </p>
                  <p className="text-sm text-slate-600">
                    Madrid — International patient focus
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Quirónsalud Group</p>
                  <p className="text-sm text-slate-600">
                    Spain&apos;s largest private healthcare group
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Clínica Planas</p>
                  <p className="text-sm text-slate-600">
                    Barcelona — Renowned aesthetic surgery clinic
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Clínica Birbe</p>
                  <p className="text-sm text-slate-600">
                    Barcelona — Facial surgery specialists
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    General Hospital of Catalonia
                  </p>
                  <p className="text-sm text-slate-600">
                    Barcelona — Academic medical centre
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
              Featured Rhinoplasty Surgeons in Spain
            </m.h2>

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Spain&apos;s technique leadership is demonstrated by these
              ultrasonic and preservation specialists.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {/* Dr. Marco Romeo */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Dr. Marco Romeo
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Madrid
                  </span>
                </div>
                <p className="mt-1 text-sm text-rose-600">€5,000–€10,000</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>
                    <strong>Experience:</strong> Italian-trained, 15+ years in
                    Spain since 2010
                  </li>
                  <li>
                    <strong>Specialisation:</strong> Ultrasonic rhinoplasty,
                    preservation technique, deep plane facelift
                  </li>
                  <li>
                    <strong>Training:</strong> Sicily, Canniesburn Glasgow,
                    Rotterdam, Montreux
                  </li>
                  <li>
                    <strong>Facilities:</strong> Ruber Internacional, Vithas La
                    Luz
                  </li>
                  <li>
                    <strong>Notable:</strong> 5 languages, international congress
                    speaker
                  </li>
                </ul>
              </div>

              {/* Dr. Tintoré */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Dr. Tintoré
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Barcelona
                  </span>
                </div>
                <p className="mt-1 text-sm text-rose-600">€6,000–€9,000</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>
                    <strong>Experience:</strong> 30+ years, General Hospital of
                    Catalonia collaboration
                  </li>
                  <li>
                    <strong>Specialisation:</strong> Ultrasonic rhinoplasty
                    specialist, Vaser pioneer
                  </li>
                  <li>
                    <strong>Credentials:</strong> &quot;Best Surgeon in
                    Spain&quot; 2022
                  </li>
                  <li>
                    <strong>Notable:</strong> One of first ultrasonic adopters in
                    Barcelona
                  </li>
                  <li>
                    <strong>Aftercare:</strong> Priority post-op care for 1 year
                    included
                  </li>
                </ul>
              </div>

              {/* Dr. Alfredo Fernández Blanco */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Dr. Alfredo Fernández Blanco
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Madrid / Marbella
                  </span>
                </div>
                <p className="mt-1 text-sm text-rose-600">€3,500–€10,000</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>
                    <strong>Experience:</strong> 30+ years nasal surgery
                  </li>
                  <li>
                    <strong>Specialisation:</strong> Preservation rhinoplasty,
                    endonasal techniques, 3D imaging
                  </li>
                  <li>
                    <strong>Credentials:</strong> Established Clínica Fernández
                    Blanco
                  </li>
                  <li>
                    <strong>Notable:</strong> Natural results focus, functional
                    and aesthetic expertise
                  </li>
                  <li>
                    <strong>Facilities:</strong> Purpose-built aesthetic clinic
                  </li>
                </ul>
              </div>

              {/* Dr. Gustavo Sordo */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Dr. Gustavo Sordo
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Madrid
                  </span>
                </div>
                <p className="mt-1 text-sm text-rose-600">€6,000–€9,000</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>
                    <strong>Experience:</strong> 20+ years
                  </li>
                  <li>
                    <strong>Specialisation:</strong> Ultrasonic rhinoplasty
                    pioneer in Madrid
                  </li>
                  <li>
                    <strong>Credentials:</strong> ASAPS certified, international
                    training
                  </li>
                  <li>
                    <strong>Notable:</strong> Trains other physicians in
                    preservation techniques
                  </li>
                  <li>
                    <strong>Approach:</strong> Calm and precise surgical style
                  </li>
                </ul>
              </div>

              {/* Dr. Francisco Bravo */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Dr. Francisco Bravo
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Madrid
                  </span>
                </div>
                <p className="mt-1 text-sm text-rose-600">€7,000–€10,000</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>
                    <strong>Specialisation:</strong> Preservation rhinoplasty,
                    natural-feeling results
                  </li>
                  <li>
                    <strong>Credentials:</strong> President of AECEP, SECPRE
                    member
                  </li>
                  <li>
                    <strong>Facility:</strong> Clínica Gómez Bravo
                  </li>
                  <li>
                    <strong>Notable:</strong> International speaker, innovation
                    leader
                  </li>
                  <li>
                    <strong>Approach:</strong> Noses that remain soft and bend
                    naturally
                  </li>
                </ul>
              </div>

              {/* CTA Card */}
              <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6">
                <div className="text-center">
                  <p className="font-medium text-slate-700">
                    Need help choosing a surgeon?
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Our team can match you with verified surgeons based on your
                    goals and preferred technique.
                  </p>
                  <Link
                    href="/enquiry?procedure=rhinoplasty&country=spain"
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
              medit verifies surgeon credentials through SECPRE and AECEP
              registries. Profiles are updated quarterly. Always confirm current
              information directly with clinics.
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
              Your Rhinoplasty Journey: Step-by-Step Timeline
            </m.h2>

            {/* Pre-Trip Phase */}
            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="rhinoplasty-spain-timeline"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Pre-Trip Phase (4–12 Weeks Before)
              </h3>
              <div className="space-y-4">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Week 1–2: Research & Shortlist
                  </p>
                  <ul className="mt-2 text-sm text-slate-600">
                    <li>
                      • Review surgeon portfolios focusing on technique
                      (ultrasonic, preservation)
                    </li>
                    <li>• Request consultations from 3–4 clinics</li>
                    <li>
                      • Compare approach and philosophy (not just price)
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Week 2–4: Consultations
                  </p>
                  <ul className="mt-2 text-sm text-slate-600">
                    <li>• Video consultations with surgeons</li>
                    <li>• 3D imaging simulation where available</li>
                    <li>• Discuss technique selection and expected outcomes</li>
                    <li>• Receive detailed quotes</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Week 4–6: Decision & Booking
                  </p>
                  <ul className="mt-2 text-sm text-slate-600">
                    <li>• Select surgeon and clinic</li>
                    <li>• Pay deposit (typically 20–30%)</li>
                    <li>• Receive pre-operative instructions</li>
                    <li>• Book flights and accommodation</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Week 6–12: Preparation
                  </p>
                  <ul className="mt-2 text-sm text-slate-600">
                    <li>• Complete medical questionnaire</li>
                    <li>• Stop smoking (minimum 2–4 weeks before)</li>
                    <li>
                      • Stop blood-thinning medications (aspirin, ibuprofen — 1
                      week before)
                    </li>
                    <li>• Arrange time off work (10–14 days recommended)</li>
                  </ul>
                </div>
              </div>
            </m.div>

            {/* Trip Phase */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Trip Phase (7–10 Days in Spain)
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
                        Fly to Barcelona/Madrid (2–2.5 hours from London).
                        Transfer to hotel. Rest and acclimatise.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Day 2
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        In-person consultation with surgeon. Final 3D simulation
                        review. Pre-operative tests. Final surgical plan
                        confirmation.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Day 3
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        <strong>Surgery Day.</strong> 1.5–3 hours under general
                        anaesthesia. Recovery in private room. Overnight stay
                        with nursing care (standard in Spain).
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Day 4–7
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Hotel rest. Minimal activity, head elevated. Nasal
                        splint in place. No nasal packing (typically with
                        ultrasonic). Daily self-care routine.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Day 7–10
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        <strong>Splint removal.</strong> Surgeon review.
                        Clearance to fly. Return flight home.
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
                    Most bruising resolved (especially with ultrasonic). Resume
                    light activities. Work from home possible. Telemedicine
                    follow-up.
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
                  <p className="font-medium text-slate-900">Month 3–6</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Photo review consultations. 80–90% swelling resolved.
                    Results becoming apparent.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Month 12+</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Final results visible. Complete healing. Long-term
                    telemedicine follow-up available.
                  </p>
                </div>
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
              Recovery After Rhinoplasty in Spain: What to Expect
            </m.h2>

            {/* Ultrasonic Advantage Table */}
            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="ultrasonic-recovery-spain"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                The Ultrasonic Advantage — Recovery Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Aspect
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Traditional Method
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Ultrasonic (Spain Specialist)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Bruising
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Extensive, 14–21 days
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        Minimal to none, 5–10 days
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Swelling
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Peaks Day 3–4, resolves Day 12–14
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        Reduced, visible improvement Day 5–7
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Nasal packing
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Often required
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        Rarely required
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Pain (Day 2)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Moderate to significant
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        Mild discomfort, pressure sensation
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
                        7–10 days
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Return to work
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        2 weeks minimum
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        7–10 days possible
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            {/* Mediterranean Recovery Advantage */}
            <m.div
              variants={fadeInUp}
              className="mt-8 rounded-lg border border-rose-200 bg-rose-50 p-6"
            >
              <h3 className="font-semibold text-slate-900">
                Mediterranean Recovery Advantage
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Climate Benefits
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>• Mild temperatures reduce swelling-related discomfort</li>
                    <li>• Sunshine supports positive mood and healing</li>
                    <li>• Pleasant weather for light walks (encouraged)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Environment Benefits
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>• Relaxed environment reduces stress</li>
                    <li>• Quality sleep in comfortable hotel</li>
                    <li>• Dedicated recovery time away from routine</li>
                  </ul>
                </div>
              </div>
            </m.div>

            {/* Flying After Rhinoplasty */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Flying After Rhinoplasty
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-white p-6 shadow">
                  <p className="font-medium text-slate-900">
                    Short-Haul Advantage
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    2–2.5 hour flights to UK minimise cabin pressure effects,
                    prolonged sitting discomfort, and jet lag complications.
                    Typical clearance: Day 7–10 post-surgery.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow">
                  <p className="font-medium text-slate-900">
                    Flight Considerations
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>• Stay hydrated</li>
                    <li>• Use saline nasal spray</li>
                    <li>• Avoid alcohol</li>
                    <li>• Book return flights for Day 8–10 for flexibility</li>
                  </ul>
                </div>
              </div>
            </m.div>

            {/* Recovery Tips */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Recovery Tips
              </h3>
              <ul className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                <li className="rounded-lg bg-slate-100 p-3">
                  Book return flights for Day 8–10 for flexibility
                </li>
                <li className="rounded-lg bg-slate-100 p-3">
                  Choose hotel near clinic for convenient follow-ups
                </li>
                <li className="rounded-lg bg-slate-100 p-3">
                  Button-front clothing (avoid pulling over head)
                </li>
                <li className="rounded-lg bg-slate-100 p-3">
                  Travel pillow for semi-reclined sleeping
                </li>
                <li className="rounded-lg bg-slate-100 p-3">
                  Arrange UK pickup from airport
                </li>
                <li className="rounded-lg bg-slate-100 p-3">
                  Plan 10–14 days off work (client-facing may need longer)
                </li>
              </ul>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Risks Section */}
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
              Risks and Complications: What You Should Know
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">
                  General Surgical Risks
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>
                    • Bleeding (rare, typically controlled during surgery)
                  </li>
                  <li>• Infection (uncommon with proper care)</li>
                  <li>
                    • Adverse reaction to anaesthesia (pre-screening minimises)
                  </li>
                  <li>• Scarring (minimal with experienced surgeons)</li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">
                  Rhinoplasty-Specific Risks
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• Asymmetry (8–12% experience minor degrees)</li>
                  <li>
                    • Breathing difficulties (temporary or requiring revision)
                  </li>
                  <li>• Numbness in nasal tip (usually temporary, 1–3 months)</li>
                  <li>• Dissatisfaction with aesthetic result</li>
                  <li>• Need for revision surgery (5–15% depending on complexity)</li>
                </ul>
              </div>
            </m.div>

            {/* How Ultrasonic Reduces Risk */}
            <m.div
              variants={fadeInUp}
              className="mt-8 rounded-lg bg-green-50 p-6"
            >
              <h3 className="font-semibold text-slate-900">
                How Ultrasonic Technique Reduces Risk
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Spanish ultrasonic specialists report:
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                <li>• Reduced bleeding due to soft tissue preservation</li>
                <li>• Lower infection rates with less tissue trauma</li>
                <li>• More predictable bone work reducing asymmetry risk</li>
                <li>• Faster healing minimising complication window</li>
                <li>• Better visualisation during surgery improving precision</li>
              </ul>
            </m.div>

            {/* Spain's Safety Infrastructure */}
            <m.div
              variants={fadeInUp}
              className="mt-8 rounded-lg bg-white p-6 shadow"
            >
              <h3 className="font-semibold text-slate-900">
                Spain&apos;s Safety Infrastructure
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Healthcare System Quality
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>• WHO ranked 7th globally (World Health Report 2000)</li>
                    <li>• Highest life expectancy in EU (84 years)</li>
                    <li>• OECD highlights low avoidable mortality rates</li>
                    <li>• Strict EU regulatory framework</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Hospital Standards
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>• Premium facilities meet international standards</li>
                    <li>• 24/7 emergency care available</li>
                    <li>• Board-certified anaesthesiologists</li>
                    <li>• Modern equipment and infection control</li>
                  </ul>
                </div>
              </div>
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
              Is Rhinoplasty in Spain Safe? Addressing Common Concerns
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8 space-y-6">
              {/* World-Class Care */}
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">
                  &quot;How Do I Know I&apos;m Getting World-Class Care?&quot;
                </h3>
                <p className="mt-3 text-slate-600">
                  Spain&apos;s healthcare credentials are exceptional: WHO World
                  Health Report 2000 ranked Spain 7th globally for overall
                  health system performance. The EU&apos;s highest life
                  expectancy at 84 years reflects genuine healthcare quality.
                  OECD reports Spain performs better than average on 8/10 key
                  health indicators.
                </p>
                <div className="mt-4 rounded-lg bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-900">
                    Verification Steps
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>• Confirm SECPRE/AECEP board certification</li>
                    <li>• Check hospital accreditation status</li>
                    <li>
                      • Review surgeon&apos;s ultrasonic/preservation experience
                    </li>
                    <li>• Request testimonials from UK patients</li>
                  </ul>
                </div>
              </div>

              {/* Spain vs Turkey */}
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">
                  &quot;Is Spain Worth the Premium Over Turkey?&quot;
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-green-50 p-4">
                    <p className="font-medium text-green-800">
                      Consider Spain If
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-green-700">
                      <li>• Advanced technique is priority</li>
                      <li>• Prefer European healthcare proximity</li>
                      <li>• Value Mediterranean recovery environment</li>
                      <li>• Want latest ultrasonic/preservation methods</li>
                      <li>• Comfortable with higher investment for quality</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-slate-100 p-4">
                    <p className="font-medium text-slate-700">
                      Spain May Not Be Right If
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-slate-600">
                      <li>• Maximum cost savings is primary goal</li>
                      <li>• Seeking all-inclusive package (Turkey model)</li>
                      <li>• Prefer volume-focused clinic approach</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Follow-Up Care */}
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">
                  &quot;What If I Need Follow-Up Care?&quot;
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Spain Advantages
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-slate-600">
                      <li>• 2–2.5 hour flights allow easy return visits</li>
                      <li>• Multiple daily flights from major UK airports</li>
                      <li>• Many surgeons offer long-term telemedicine</li>
                      <li>• Can return for 6-month or 12-month reviews</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      UK Continuity
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-slate-600">
                      <li>• Your UK GP for general wound care</li>
                      <li>• Surgeon available via video/email</li>
                      <li>• Detailed care instructions provided</li>
                      <li>• Emergency protocols clearly explained</li>
                    </ul>
                  </div>
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
              Frequently Asked Questions About Rhinoplasty in Spain
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
                href="/procedures/rhinoplasty/turkey"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">
                  Rhinoplasty in Turkey
                </p>
                <p className="mt-1 text-sm text-rose-600">From £2,450</p>
                <p className="mt-1 text-sm text-slate-600">
                  Higher volumes, all-inclusive packages, maximum savings
                </p>
              </Link>
              <Link
                href="/procedures/rhinoplasty"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">Rhinoplasty Hub</p>
                <p className="mt-1 text-sm text-slate-600">
                  Compare all rhinoplasty destinations and techniques
                </p>
              </Link>
              <Link
                href="/procedures/liposuction/spain"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">
                  Liposuction in Spain
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Body contouring at premium Spanish clinics
                </p>
              </Link>
              <Link
                href="/procedures/tummy-tuck/spain"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">
                  Tummy Tuck in Spain
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Abdominoplasty with Quirónsalud hospitals
                </p>
              </Link>
              <Link
                href="/destinations/spain"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">
                  Spain Destination Guide
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Everything about medical tourism in Spain
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
              Get Your Free Rhinoplasty Quote for Spain
            </m.h2>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-2xl text-rose-100"
            >
              Compare prices and surgeons from premium clinics in Barcelona,
              Madrid, and Marbella. Receive personalised treatment plans from
              ultrasonic and preservation specialists — no obligation.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/clinics?procedure=rhinoplasty&country=spain"
                className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-rose-600 shadow-lg transition-all hover:bg-rose-50 sm:w-auto"
              >
                Compare Premium Surgeons
              </Link>
              <Link
                href="/enquiry?procedure=rhinoplasty&country=spain"
                className="w-full rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-rose-700 sm:w-auto"
              >
                Get Free Clinic Recommendations
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-6 text-sm text-rose-200">
              Premium European care • Ultrasonic specialists • 40–60% savings vs
              UK
            </m.p>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
