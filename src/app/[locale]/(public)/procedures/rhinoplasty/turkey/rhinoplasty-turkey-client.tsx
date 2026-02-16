'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { TR, GB } from 'country-flag-icons/react/3x2'

// =============================================================================
// TYPES
// =============================================================================

interface FAQ {
  question: string
  answer: string
}

interface RhinoplastyTurkeyClientProps {
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

export function RhinoplastyTurkeyClient({ faqs }: RhinoplastyTurkeyClientProps) {
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
                Rhinoplasty in Turkey
              </h1>
            </m.div>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl"
            >
              Turkey performs 83,000+ rhinoplasties annually — more than any
              other country. Compare JCI-accredited clinics, piezo and
              traditional techniques, and all-inclusive packages from £2,450.
              Save 50–70% vs UK prices with verified surgeons.
            </m.p>

            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/clinics?procedure=rhinoplasty&country=turkey"
                className="rounded-lg bg-rose-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-rose-700 hover:shadow-xl"
              >
                Compare Verified Rhinoplasty Surgeons →
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-4 text-sm text-slate-500">
              JCI-accredited facilities • 90–95% success rates • 50–70% savings
              vs UK • Free consultation matching
            </m.p>

            {/* Hero Stats */}
            <m.div
              variants={fadeInUp}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
            >
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">£2,450–£4,500</p>
                <p className="mt-1 text-slate-600">All-inclusive packages</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">83,000+</p>
                <p className="mt-1 text-slate-600">Rhinoplasties annually</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">46</p>
                <p className="mt-1 text-slate-600">JCI-accredited hospitals</p>
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
              Why UK Patients Choose Turkey for Rhinoplasty
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-6 space-y-4 text-slate-600"
              data-aeo="rhinoplasty-turkey-benefits"
            >
              <p>
                Turkey has transformed from a budget destination into the global
                leader for rhinoplasty. This is not about cheap surgery — it is
                about accessing world-class expertise at accessible prices.
                Turkish surgeons perform 500+ rhinoplasties annually (compared
                to 50–100 for typical UK surgeons). This experience gap
                translates to refined technique and better outcomes.
              </p>

              <p>
                The cost economics are driven by lower operating costs,
                favourable exchange rates, and government-supported medical
                tourism infrastructure — not compromised quality. Turkey
                pioneered piezo/ultrasonic rhinoplasty adoption. Many surgeons
                trained in the US and Europe, brought techniques back, and
                refined them through high-volume practice.
              </p>

              <p>
                Turkey has 46 JCI-accredited hospitals (2nd highest globally),
                purpose-built aesthetic clinics, and advanced 3D imaging
                technology. Unlike UK à la carte pricing, Turkish packages
                eliminate hidden costs and simplify planning.
              </p>

              <p>
                In 2022, Turkey performed 56,700 rhinoplasties, rising to 83,000
                in 2023. The country ranks 2nd globally for plastic surgeons and
                JCI-accredited hospitals. UK search interest for "cosmetic
                surgery Turkey" has increased 1,000%+ since 2015.
              </p>
            </m.div>

            {/* Key Advantages Grid */}
            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              <div className="rounded-lg bg-rose-50 p-4">
                <p className="font-semibold text-slate-900">Volume Advantage</p>
                <p className="mt-1 text-sm text-slate-600">
                  500+ procedures/year per surgeon vs 50–100 in UK
                </p>
              </div>
              <div className="rounded-lg bg-rose-50 p-4">
                <p className="font-semibold text-slate-900">
                  Technique Leadership
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Early piezo adoption, refined through high volume
                </p>
              </div>
              <div className="rounded-lg bg-rose-50 p-4">
                <p className="font-semibold text-slate-900">
                  JCI Infrastructure
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  46 JCI-accredited hospitals, 2nd globally
                </p>
              </div>
              <div className="rounded-lg bg-rose-50 p-4">
                <p className="font-semibold text-slate-900">
                  All-Inclusive Model
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  No hidden costs, comprehensive packages
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
              Rhinoplasty Cost in Turkey vs UK: 2025 Price Comparison
            </m.h2>

            {/* Main Price Comparison */}
            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="rhinoplasty-turkey-cost"
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
                      <th className="px-4 py-3 text-left text-sm font-semibold text-rose-600 sm:px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-6 overflow-hidden rounded-sm shadow-sm">
                            <TR title="Turkey" />
                          </div>
                          <span>Turkey (All-Inclusive)</span>
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-6 overflow-hidden rounded-sm shadow-sm">
                            <GB title="UK" />
                          </div>
                          <span>UK (Surgery Only)</span>
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-6 overflow-hidden rounded-sm shadow-sm">
                            <GB title="UK" />
                          </div>
                          <span>UK (Total Est.)</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Primary Rhinoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,450–£4,000
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
                        Revision Rhinoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,500–£6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £8,000–£12,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £10,000–£16,000
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Piezo/Ultrasonic Add-on
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Included or +£400–£600
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        +£1,000–£2,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        —
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Septorhinoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,800–£4,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £6,000–£8,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £8,000–£11,000
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Ethnic Rhinoplasty
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,000–£5,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £6,500–£9,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £8,500–£12,000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            {/* Package Inclusions */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Standard All-Inclusive Package (£2,450–£4,000)
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Pre-operative Consultation
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Virtual + in-person consultation with surgeon
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Medical Testing</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Blood tests, ECG, COVID screening
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
                    1 night with nursing care
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Accommodation</p>
                  <p className="mt-1 text-sm text-slate-600">
                    4–7 nights 4-star hotel (minimum)
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Transfers</p>
                  <p className="mt-1 text-sm text-slate-600">
                    VIP airport transfers + clinic transfers
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
                    In-clinic appointments + splint removal
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Aftercare</p>
                  <p className="mt-1 text-sm text-slate-600">
                    12-month telemedicine follow-ups
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Coordinator</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Personal English-speaking patient coordinator
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">3D Imaging</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Pre-operative simulation (most clinics)
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Fit-to-Fly</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Clearance consultation before departure
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
                        Return flights (UK to Istanbul)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £80–£250
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Travel insurance (with medical cover)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £30–£80
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Extra hotel nights (if extended recovery)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £60–£120/night
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                        Additional medications
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £20–£50
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
                Request itemised quotes from 3+ clinics. Ensure revision policy
                is in writing before booking. Quotes typically valid 60–90 days.
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
              Types of Rhinoplasty Performed in Turkey
            </m.h2>

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Understanding your options empowers better surgeon conversations.
              Many patients do not know the difference between techniques — this
              knowledge helps you make informed decisions.
            </m.p>

            {/* Open vs Closed */}
            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="rhinoplasty-techniques"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Open vs Closed Rhinoplasty
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-white p-6">
                  <h4 className="font-semibold text-slate-900">
                    Open Rhinoplasty
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li>
                      • Small incision across columella (tissue between
                      nostrils)
                    </li>
                    <li>• Full visibility of nasal structures</li>
                    <li>
                      • Preferred for complex reshaping, revision cases,
                      significant tip work
                    </li>
                    <li>• Faint scar fades within 6–12 months</li>
                    <li>• Slightly longer recovery (bruising 10–14 days)</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-6">
                  <h4 className="font-semibold text-slate-900">
                    Closed Rhinoplasty
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li>• All incisions hidden inside nostrils</li>
                    <li>• No visible external scarring</li>
                    <li>
                      • Suitable for minor refinements, dorsal hump reduction
                    </li>
                    <li>• Faster recovery, less swelling</li>
                    <li>
                      • Requires high surgeon skill due to limited visibility
                    </li>
                    <li>• 85–90% success rate for achieving desired outcomes</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm italic text-slate-500">
                Your surgeon will recommend the approach based on your anatomy
                and goals. Trust their expertise — both techniques achieve
                excellent results in skilled hands.
              </p>
            </m.div>

            {/* Piezo/Ultrasonic Rhinoplasty */}
            <m.div
              variants={fadeInUp}
              className="mt-10"
              data-aeo="piezo-rhinoplasty-turkey"
            >
              <div className="rounded-xl border-2 border-rose-200 bg-rose-50 p-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Piezo/Ultrasonic Rhinoplasty — Turkey&apos;s Key Differentiator
                </h3>
                <p className="mt-3 text-slate-600">
                  Piezo rhinoplasty uses ultrasonic vibrations (25–30 kHz
                  frequency) to sculpt nasal bones with microscopic precision.
                  Unlike traditional chisels and rasps, piezo only affects bone
                  tissue, leaving soft tissue, blood vessels, and mucosa
                  completely intact.
                </p>

                <h4 className="mt-6 font-semibold text-slate-900">
                  Key Advantages (Aesthetic Surgery Journal 2023)
                </h4>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                          Aspect
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                          Traditional
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                          Piezo/Ultrasonic
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                          Pain (Day 2, 1–10 scale)
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                          5.1 average
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                          3.2 average
                        </td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                          Bruising duration
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                          14–21 days
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                          7–10 days
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                          Swelling peak resolution
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                          Day 10–12
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                          Day 5
                        </td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                          &quot;Beaten up&quot; appearance
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                          Common
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                          Minimal
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
                          10–14 days
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-white p-4">
                    <p className="font-medium text-slate-900">
                      Turkey&apos;s Piezo Expertise
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-slate-600">
                      <li>• Early adoption from European training</li>
                      <li>
                        • High-volume piezo surgeons (200+ annual procedures)
                      </li>
                      <li>
                        • 2024 TSPRAS audit: 1.2% major complication rate across
                        3,400 piezo procedures at JCI centres
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-white p-4">
                    <p className="font-medium text-slate-900">
                      Cost Consideration
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Piezo typically adds £400–£700 to procedure cost but
                      benefits often justify investment, especially for patients
                      prioritising faster recovery.
                    </p>
                  </div>
                </div>
              </div>
            </m.div>

            {/* Other Types */}
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h4 className="font-semibold text-slate-900">
                  Revision Rhinoplasty
                </h4>
                <p className="mt-1 text-sm text-rose-600">£3,500–£6,000</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• Corrects unsatisfactory results from previous surgery</li>
                  <li>• Addresses breathing problems, aesthetic concerns, or both</li>
                  <li>• More complex due to scar tissue, altered anatomy</li>
                  <li>• Surgeons recommend waiting 12+ months after initial surgery</li>
                  <li>• Turkey excels due to high revision volumes and experience</li>
                </ul>
                <div className="mt-4 rounded bg-slate-50 p-3">
                  <p className="text-xs font-medium text-slate-500">
                    SURGEON SELECTION FOR REVISION
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Minimum 100 revision cases, before/after portfolio of
                    similar cases, clear revision policy
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h4 className="font-semibold text-slate-900">
                  Ethnic Rhinoplasty
                </h4>
                <p className="mt-1 text-sm text-rose-600">£3,000–£5,000</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>
                    • Preserves cultural identity while achieving desired
                    refinements
                  </li>
                  <li>
                    • Requires understanding of diverse nasal structures (Middle
                    Eastern, Asian, African descent)
                  </li>
                  <li>
                    • Techniques may include bridge augmentation, tip
                    refinement, nostril adjustment
                  </li>
                  <li>
                    • Turkish surgeons experienced due to diverse international
                    patient base
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h4 className="font-semibold text-slate-900">
                  Septorhinoplasty (Functional + Aesthetic)
                </h4>
                <p className="mt-1 text-sm text-rose-600">£2,800–£4,500</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• Combines cosmetic reshaping with septal correction</li>
                  <li>
                    • Addresses breathing difficulties alongside aesthetic
                    concerns
                  </li>
                  <li>
                    • May qualify for partial UK insurance coverage (septoplasty
                    component)
                  </li>
                  <li>• Requires ENT or dual-trained surgeon</li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h4 className="font-semibold text-slate-900">
                  Preservation Rhinoplasty
                </h4>
                <p className="mt-1 text-sm text-rose-600">£3,000–£5,000</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>
                    • Modern technique preserving natural nasal structures
                  </li>
                  <li>• Less disruption to ligaments and soft tissue</li>
                  <li>• More natural movement and appearance</li>
                  <li>• Faster recovery than traditional methods</li>
                  <li>• Growing in popularity at elite Turkish clinics</li>
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
              How to Choose a Rhinoplasty Surgeon in Turkey
            </m.h2>

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              This section establishes your verification framework. Use it
              independently to build confidence in your surgeon selection.
            </m.p>

            {/* Credentials */}
            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="rhinoplasty-surgeon-credentials"
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
                      <span className="font-medium text-slate-900">TSPRAS</span>{' '}
                      — Turkish Society of Plastic, Reconstructive and Aesthetic
                      Surgery (Primary Turkish board)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                      2
                    </span>
                    <div>
                      <span className="font-medium text-slate-900">EBOPRAS</span>{' '}
                      — European Board of Plastic, Reconstructive and Aesthetic
                      Surgery
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                      3
                    </span>
                    <div>
                      <span className="font-medium text-slate-900">ISAPS</span>{' '}
                      — International Society of Aesthetic Plastic Surgery
                      (indicates global recognition)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                      4
                    </span>
                    <div>
                      <span className="font-medium text-slate-900">
                        Turkish Ministry of Health Registration
                      </span>{' '}
                      — Legal requirement
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                      5
                    </span>
                    <div>
                      <span className="font-medium text-slate-900">
                        International Health Tourism Authorization
                      </span>{' '}
                      — Required for treating foreign patients
                    </div>
                  </li>
                </ol>
                <p className="mt-4 text-sm italic text-slate-500">
                  How to verify: Request registration numbers. Cross-reference
                  with TSPRAS directory and Turkish Ministry of Health database.
                  Legitimate surgeons welcome verification.
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
                      • <strong>Piezo proficiency:</strong> 200+ annual piezo
                      procedures
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-6 shadow">
                  <p className="font-medium text-slate-900">Ask Directly</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li>
                      &quot;How many rhinoplasties do you perform annually?&quot;
                    </li>
                    <li>
                      &quot;What is your revision rate for primary
                      procedures?&quot;
                    </li>
                    <li>
                      &quot;Can you share before/after photos of patients with
                      similar anatomy to mine?&quot;
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
                <li>• Reluctance to share credentials or photos</li>
                <li>• Prices significantly below market (under £1,500)</li>
                <li>• Pressure to book quickly</li>
                <li>• No revision policy in writing</li>
                <li>• Surgery performed outside accredited facilities</li>
                <li>• No before/after portfolio for similar cases</li>
              </ul>
            </m.div>

            {/* Facility Accreditation */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Facility Accreditation
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-white p-4 shadow">
                  <p className="font-medium text-slate-900">
                    JCI (Gold Standard)
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Turkey has 46 JCI-accredited hospitals. Confirms
                    international safety, hygiene, and quality standards. Valid
                    3 years.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow">
                  <p className="font-medium text-slate-900">
                    ISO Certifications
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Quality management systems certification. Look for ISO 9001.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow">
                  <p className="font-medium text-slate-900">
                    Ministry of Health A-Rating
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Turkish national standard for healthcare facilities.
                  </p>
                </div>
              </div>
            </m.div>

            {/* JCI Hospitals */}
            <m.div variants={fadeInUp} className="mt-6">
              <p className="text-sm font-medium text-slate-900">
                Notable JCI-Accredited Facilities:
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Memorial Şişli Hospital • Anadolu Medical Center • Liv Hospital
                Ulus (50,000+ international patients annually) • Acıbadem
                Healthcare Group • Medicana International
              </p>
            </m.div>

            {/* Consultation Quality */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Consultation Quality Markers
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="font-medium text-green-800">
                    Good Consultation Signs
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-green-700">
                    <li>• 3D imaging/simulation to preview expected results</li>
                    <li>• Detailed explanation of technique selection</li>
                    <li>• Honest discussion of limitations and risks</li>
                    <li>• Clear revision policy presented upfront</li>
                    <li>• Time for questions without pressure</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-4 shadow">
                  <p className="font-medium text-slate-900">
                    Required Documentation Before Booking
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>• Itemised quote with validity period</li>
                    <li>• Revision policy in writing</li>
                    <li>• Surgeon credentials/registration numbers</li>
                    <li>• Hospital/clinic accreditation proof</li>
                    <li>• Cancellation/refund terms</li>
                  </ul>
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
              Featured Rhinoplasty Surgeons in Turkey
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {/* Prof. Dr. Süleyman Taş */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Prof. Dr. Süleyman Taş
                </h3>
                <p className="mt-1 text-sm text-rose-600">£4,500–£7,000</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>
                    <strong>Experience:</strong> 15+ years, 10,000+ plastic
                    surgery procedures
                  </li>
                  <li>
                    <strong>Specialisation:</strong> Closed rhinoplasty, natural
                    results philosophy
                  </li>
                  <li>
                    <strong>Credentials:</strong> ISAPS member, FEBOPRAS,
                    Turkish Aesthetic Surgery Society
                  </li>
                  <li>
                    <strong>Notable:</strong> Published &quot;Rhinoplasty in
                    Practice&quot; textbook, 5+ patents
                  </li>
                  <li>
                    <strong>Facility:</strong> TAS Medical Center, Şişli,
                    Istanbul
                  </li>
                </ul>
                <p className="mt-3 text-xs italic text-slate-500">
                  Philosophy: &quot;Address of Natural Beauty&quot; — refined,
                  subtle results
                </p>
              </div>

              {/* Dr. Cem Altındağ */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Dr. Cem Altındağ
                </h3>
                <p className="mt-1 text-sm text-rose-600">£2,800–£3,500</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>
                    <strong>Experience:</strong> 26 years, 5,000+ rhinoplasties
                  </li>
                  <li>
                    <strong>Specialisation:</strong> Septorhinoplasty,
                    functional correction
                  </li>
                  <li>
                    <strong>Credentials:</strong> European Rhinoplasty Society,
                    trained in USA/UK
                  </li>
                  <li>
                    <strong>Notable:</strong> The Nose Clinic, Istanbul —
                    dedicated rhinoplasty practice
                  </li>
                  <li>
                    <strong>Technique:</strong> Closed approach, soft silastic
                    splints
                  </li>
                </ul>
                <p className="mt-3 text-xs text-slate-500">
                  Reviews: 4.8/5 (79 Bookimed), 5.0 RealSelf
                </p>
              </div>

              {/* Dr. Ergin Er */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Dr. Ergin Er
                </h3>
                <p className="mt-1 text-sm text-rose-600">From £3,600</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>
                    <strong>Experience:</strong> 31 years, 1,100+ rhinoplasties
                  </li>
                  <li>
                    <strong>Credentials:</strong> Award-winning plastic surgeon
                  </li>
                  <li>
                    <strong>Facility:</strong> Istanbul Aesthetic Plastic Surgery
                    Center (4,000+ procedures/year)
                  </li>
                  <li>
                    <strong>Package:</strong> All-inclusive, 8-night stay, 4-star
                    hotel
                  </li>
                  <li>
                    <strong>Notable:</strong> Strong international patient
                    experience
                  </li>
                </ul>
                <p className="mt-3 text-xs text-slate-500">
                  Reviews: 4.8/5 rating
                </p>
              </div>

              {/* Prof. Dr. Murat Songu */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Prof. Dr. Murat Songu
                </h3>
                <p className="mt-1 text-sm text-rose-600">From €5,000</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>
                    <strong>Specialisation:</strong> Piezo/ultrasonic
                    rhinoplasty
                  </li>
                  <li>
                    <strong>Notable:</strong> Leading piezo surgeon with
                    advanced tissue-preservation techniques
                  </li>
                  <li>
                    <strong>Approach:</strong> Minimises swelling, improves
                    recovery outcomes
                  </li>
                  <li>
                    <strong>Pricing:</strong> Piezo specialist premium tier
                  </li>
                </ul>
              </div>

              {/* Prof. Dr. Gürhan Özcan */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Prof. Dr. Gürhan Özcan
                </h3>
                <p className="mt-1 text-sm text-rose-600">£5,000–£7,500</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>
                    <strong>Experience:</strong> 35+ years, revision rhinoplasty
                    specialist
                  </li>
                  <li>
                    <strong>Credentials:</strong> Founding chairman Plastic
                    Surgery at Başkent University
                  </li>
                  <li>
                    <strong>Training:</strong> Baylor Medical School (Houston)
                  </li>
                  <li>
                    <strong>Facility:</strong> Istanbul Aesthetic Plastic Surgery
                    Center
                  </li>
                  <li>
                    <strong>Specialisation:</strong> Complex revision cases
                  </li>
                </ul>
              </div>

              {/* Consultation CTA */}
              <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6">
                <div className="text-center">
                  <p className="font-medium text-slate-700">
                    Need help choosing a surgeon?
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Our team can match you with verified surgeons based on your
                    goals, budget, and preferred technique.
                  </p>
                  <Link
                    href="/enquiry?procedure=rhinoplasty&country=turkey"
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
              medit verifies surgeon credentials through official registries.
              Profiles are updated quarterly. Always confirm current information
              directly with clinics.
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
              data-aeo="rhinoplasty-turkey-timeline"
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
                    <li>• Review surgeon portfolios and credentials</li>
                    <li>• Request consultations from 3–5 clinics</li>
                    <li>• Compare packages and pricing</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Week 2–4: Virtual Consultations
                  </p>
                  <ul className="mt-2 text-sm text-slate-600">
                    <li>• Video calls with surgeons</li>
                    <li>• Discuss goals, review 3D simulations</li>
                    <li>• Receive detailed quotes</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Week 4–6: Decision & Booking
                  </p>
                  <ul className="mt-2 text-sm text-slate-600">
                    <li>• Select surgeon and clinic</li>
                    <li>• Pay deposit (typically 10–20%)</li>
                    <li>• Book flights and travel insurance</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Week 6–12: Preparation
                  </p>
                  <ul className="mt-2 text-sm text-slate-600">
                    <li>• Complete medical questionnaire</li>
                    <li>• Stop smoking (minimum 2 weeks before)</li>
                    <li>
                      • Stop blood-thinning medications (aspirin, ibuprofen — 1
                      week before)
                    </li>
                    <li>• Arrange time off work (10–14 days total)</li>
                  </ul>
                </div>
              </div>
            </m.div>

            {/* Trip Phase */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Trip Phase (7–10 Days in Turkey)
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
                        VIP airport transfer to hotel. Rest and acclimatise.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Day 2
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Transfer to clinic. In-person consultation. Blood tests,
                        ECG, pre-op checks. Final surgical plan confirmation.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Day 3
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        <strong>Surgery Day.</strong> 1.5–3 hours under general
                        anaesthesia. Recovery in private room. Overnight stay
                        with nursing care.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Day 4–6
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Hotel rest (nurse visits if needed). Minimal activity,
                        head elevated. Swelling and bruising peak (Day 2–3
                        post-op).
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Day 7–10
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        <strong>Splint removal.</strong> Surgeon review and
                        clearance to fly. Final instructions. VIP transfer to
                        airport. Return home.
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
                    Most bruising fades. Resume light activities. Work from home
                    possible. First telemedicine follow-up.
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
                  <p className="font-medium text-slate-900">Month 2–3</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Second telemedicine follow-up. 80–90% swelling resolved.
                    Results becoming apparent.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Month 6–12</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Final results emerging. Residual swelling fully resolved.
                    Nose &quot;settles&quot; into final shape.
                  </p>
                </div>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Recovery Expectations Section */}
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
              Recovery After Rhinoplasty in Turkey: What to Expect
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="rhinoplasty-turkey-recovery"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Immediate Post-Operative Period (Days 1–7)
              </h3>
              <div className="rounded-lg bg-white p-6 shadow">
                <p className="font-medium text-slate-900">Common Experiences</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>
                    • Nasal congestion (normal — breathing through mouth
                    initially)
                  </li>
                  <li>• Swelling concentrated around eyes and cheeks</li>
                  <li>• Bruising (varies by technique and individual)</li>
                  <li>
                    • Mild discomfort (managed with prescribed pain medication)
                  </li>
                  <li>• Nausea (anaesthesia side effect — temporary)</li>
                </ul>
              </div>
            </m.div>

            {/* What to Avoid */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                What to Avoid During Recovery
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-red-50 p-4">
                  <p className="font-medium text-red-800">4 Weeks</p>
                  <p className="mt-1 text-sm text-red-700">Blowing nose</p>
                </div>
                <div className="rounded-lg bg-red-50 p-4">
                  <p className="font-medium text-red-800">3 Weeks</p>
                  <p className="mt-1 text-sm text-red-700">Strenuous exercise</p>
                </div>
                <div className="rounded-lg bg-red-50 p-4">
                  <p className="font-medium text-red-800">4–6 Months</p>
                  <p className="mt-1 text-sm text-red-700">
                    Wearing glasses on nose
                  </p>
                </div>
                <div className="rounded-lg bg-red-50 p-4">
                  <p className="font-medium text-red-800">3 Months</p>
                  <p className="mt-1 text-sm text-red-700">
                    Sun exposure (use SPF 50+)
                  </p>
                </div>
                <div className="rounded-lg bg-red-50 p-4">
                  <p className="font-medium text-red-800">6 Months</p>
                  <p className="mt-1 text-sm text-red-700">Sleeping face-down</p>
                </div>
                <div className="rounded-lg bg-red-50 p-4">
                  <p className="font-medium text-red-800">6 Months</p>
                  <p className="mt-1 text-sm text-red-700">Contact sports</p>
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
                  <p className="font-medium text-slate-900">Typical Clearance</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Day 8–11 post-surgery (after splint removal)
                  </p>
                  <p className="mt-4 font-medium text-slate-900">
                    Flight Considerations
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>
                      • Cabin pressure may cause mild facial swelling (temporary)
                    </li>
                    <li>• Stay hydrated, use saline nasal spray</li>
                    <li>• Avoid alcohol during travel</li>
                    <li>
                      • Istanbul to London (3.5–4 hours) well-tolerated by Day
                      7–10
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-6 shadow">
                  <p className="font-medium text-slate-900">
                    Surgeon Criteria for Clearance
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>• External splint removed</li>
                    <li>• Sutures removed (if external)</li>
                    <li>• No active bleeding or infection</li>
                    <li>• Patient comfortable and recovering well</li>
                  </ul>
                </div>
              </div>
            </m.div>

            {/* Tips from Patients */}
            <m.div
              variants={fadeInUp}
              className="mt-8 rounded-lg border border-rose-200 bg-rose-50 p-6"
            >
              <p className="font-medium text-slate-900">
                Recovery Tips from Experienced Patients
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                <li>• Book return flights for Day 8–11 to allow flexibility</li>
                <li>
                  • Bring button-front shirts (avoid pulling over head)
                </li>
                <li>• Travel pillow essential for semi-reclined sleeping</li>
                <li>• Arrange someone to collect you from UK airport</li>
                <li>
                  • Plan 7–10 days off work minimum (longer for client-facing
                  roles)
                </li>
                <li>
                  • Have UK GP appointment scheduled for Day 14–21 (wound check)
                </li>
              </ul>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Risks and Complications Section */}
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

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Transparent discussion of risks builds trust and demonstrates we
              prioritise patient welfare over sales.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2"
              data-aeo="rhinoplasty-risks"
            >
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">
                  General Surgical Risks
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>
                    • Bleeding (rare, typically controlled during surgery)
                  </li>
                  <li>
                    • Infection (uncommon with proper care, antibiotics
                    provided)
                  </li>
                  <li>
                    • Adverse reaction to anaesthesia (pre-screening minimises
                    risk)
                  </li>
                  <li>
                    • Scarring (minimal with closed technique, fades with open)
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">
                  Rhinoplasty-Specific Risks
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>
                    • Asymmetry (8–12% experience minor degrees, often
                    unnoticeable)
                  </li>
                  <li>
                    • Breathing difficulties (temporary or requiring revision)
                  </li>
                  <li>
                    • Numbness in nasal tip (usually temporary, 1–3 months)
                  </li>
                  <li>• Dissatisfaction with aesthetic result</li>
                  <li>
                    • Need for revision surgery (5–15% depending on case
                    complexity)
                  </li>
                </ul>
              </div>
            </m.div>

            {/* Complication Rates */}
            <m.div
              variants={fadeInUp}
              className="mt-8 rounded-lg bg-white p-6 shadow"
            >
              <h3 className="font-semibold text-slate-900">
                Complication Rates in Turkish Centres
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                <strong>
                  2024 Turkish Society of Plastic Surgery Audit
                </strong>{' '}
                (3,400 piezo procedures, 12 JCI-accredited centres):
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                <li>• Major complication rate: 1.2%</li>
                <li>
                  • Comparable to 0.7% reported in large international datasets
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                <strong>What This Means:</strong> Turkish centres perform at or
                near international safety standards when JCI-accredited
                facilities and board-certified surgeons are selected.
              </p>
            </m.div>

            {/* Minimising Risk */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Minimising Your Risk
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">
                    Choose JCI-accredited facilities only
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">
                    Select board-certified, high-volume surgeons
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">
                    Follow all pre-operative instructions
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">
                    Disclose complete medical history
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">
                    Adhere strictly to post-operative care
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">
                    Attend all follow-up appointments
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">
                    Have realistic expectations
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">
                    Confirm revision policy in writing
                  </p>
                </div>
              </div>
            </m.div>

            {/* Revision Reality */}
            <m.div
              variants={fadeInUp}
              className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-6"
            >
              <h3 className="font-semibold text-slate-900">
                Revision Rhinoplasty: Understanding the Reality
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Revision rates vary: 5–15% across published literature</li>
                <li>
                  • Definition varies (minor touch-up vs major correction)
                </li>
                <li>
                  • Many &quot;revisions&quot; are minor adjustments, not full
                  procedures
                </li>
                <li>• Always confirm revision policy before booking</li>
                <li>
                  • Reputable surgeons typically cover surgical fees for
                  medically necessary revision within 12 months
                </li>
              </ul>
              <p className="mt-4 text-sm italic text-slate-600">
                <strong>Important:</strong> If you are unhappy with results from
                a previous surgery (anywhere), Turkish surgeons are experienced
                in revision work. However, wait minimum 12 months for swelling
                to fully resolve before considering revision.
              </p>
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
              Is Rhinoplasty in Turkey Safe? Addressing Common Concerns
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8 space-y-6"
              data-aeo="rhinoplasty-turkey-safety"
            >
              {/* Trust Concern */}
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">
                  &quot;How Can I Trust a Surgeon I&apos;ve Never Met?&quot;
                </h3>
                <p className="mt-3 text-slate-600">
                  Virtual consultations allow meaningful pre-trip evaluation. 3D
                  simulations demonstrate surgeon&apos;s vision for your
                  results. Before/after portfolios show actual outcomes. Reviews
                  from previous UK patients provide peer insights. Credential
                  verification is possible through official registries.
                </p>
                <p className="mt-3 text-sm italic text-slate-500">
                  Recommendation: Have 2–3 virtual consultations before
                  deciding. Trust your instincts — you should feel confident and
                  comfortable with your chosen surgeon.
                </p>
              </div>

              {/* Something Goes Wrong */}
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">
                  &quot;What If Something Goes Wrong?&quot;
                </h3>
                <p className="mt-3 text-slate-600">
                  Legitimate concern — here&apos;s how to prepare:
                </p>
                <ol className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>
                    1. Choose clinics with clear revision policies (in writing)
                  </li>
                  <li>
                    2. Ensure travel insurance covers medical complications
                    abroad
                  </li>
                  <li>
                    3. Confirm clinic has emergency protocols (24/7 contact
                    available)
                  </li>
                  <li>
                    4. Know the escalation path (how to reach surgeon post-trip)
                  </li>
                  <li>5. Have UK GP prepared for local follow-up if needed</li>
                </ol>
                <p className="mt-4 text-sm text-slate-600">
                  <strong>Turkey&apos;s Response Infrastructure:</strong> Most
                  complications are minor and manageable. Turkish hospitals
                  equipped for emergencies. Many clinics offer extended stays if
                  needed. Telemedicine follow-ups catch issues early.
                </p>
              </div>

              {/* Cost Saving Worth It */}
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">
                  &quot;Is the Cost Saving Worth the Travel?&quot;
                </h3>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="font-medium text-slate-900">
                      Consider the Full Picture
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-slate-600">
                      <li>• £3,000–£6,000+ savings on surgery cost</li>
                      <li>• Minus: £150–£350 travel expenses</li>
                      <li>• Net savings: Typically £2,500–£5,500</li>
                      <li>
                        • Plus: All-inclusive care (often fragmented/extra in
                        UK)
                      </li>
                      <li>
                        • Plus: Dedicated recovery time (forced break from
                        routine)
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      When Turkey May NOT Be Right
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-slate-600">
                      <li>
                        • Very complex revision cases (may prefer local
                        specialist)
                      </li>
                      <li>
                        • Significant medical conditions (discuss with GP first)
                      </li>
                      <li>• Inability to take required time off work</li>
                      <li>
                        • Extreme anxiety about travelling for medical care
                      </li>
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
              Frequently Asked Questions About Rhinoplasty in Turkey
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
                href="/procedures/rhinoplasty"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">
                  Rhinoplasty Hub
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Compare all rhinoplasty destinations and techniques
                </p>
              </Link>
              <Link
                href="/procedures/facelift/turkey"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">Facelift in Turkey</p>
                <p className="mt-1 text-sm text-slate-600">
                  Combine rhinoplasty with facial rejuvenation
                </p>
              </Link>
              <Link
                href="/procedures/liposuction/turkey"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">
                  Liposuction in Turkey
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Body contouring at JCI-accredited clinics
                </p>
              </Link>
              <Link
                href="/procedures/tummy-tuck/turkey"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">
                  Tummy Tuck in Turkey
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Abdominoplasty from £2,500 all-inclusive
                </p>
              </Link>
              <Link
                href="/destinations/turkey"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">
                  Turkey Destination Guide
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Everything you need to know about medical tourism in Turkey
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
              Get Your Free Rhinoplasty Quote for Turkey
            </m.h2>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-2xl text-rose-100"
            >
              Compare prices and surgeons from JCI-accredited clinics in
              Istanbul. Receive personalised treatment plans from board-certified
              rhinoplasty specialists — no obligation.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/clinics?procedure=rhinoplasty&country=turkey"
                className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-rose-600 shadow-lg transition-all hover:bg-rose-50 sm:w-auto"
              >
                Compare Rhinoplasty Surgeons
              </Link>
              <Link
                href="/enquiry?procedure=rhinoplasty&country=turkey"
                className="w-full rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-rose-700 sm:w-auto"
              >
                Get Free Clinic Recommendations
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-6 text-sm text-rose-200">
              Trusted by 10,000+ UK patients • Verified surgeons only • No
              booking fees
            </m.p>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
