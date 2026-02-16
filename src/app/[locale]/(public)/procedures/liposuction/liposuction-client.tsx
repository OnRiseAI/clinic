'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { ES, HU, PL, TR } from 'country-flag-icons/react/3x2'

// =============================================================================
// TYPES
// =============================================================================

interface FAQ {
  question: string
  answer: string
}

interface LiposuctionClientProps {
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

export function LiposuctionClient({ faqs }: LiposuctionClientProps) {
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
              Liposuction Abroad: Compare Prices, Techniques & Top Clinics
            </m.h1>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl"
            >
              Save 40–80% on liposuction at accredited international clinics.
              Compare VASER, laser, and traditional lipo across Turkey, Hungary,
              Poland, and Spain — with verified surgeons, all-inclusive
              packages, and recovery support.
            </m.p>

            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/clinics?procedure=liposuction"
                className="rounded-lg bg-rose-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-rose-700 hover:shadow-xl"
              >
                Compare Liposuction Clinics →
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-4 text-sm text-slate-500">
              Board-certified surgeons • Accredited hospitals • Recovery support
              included • Free consultation matching
            </m.p>

            {/* Hero Stats */}
            <m.div
              variants={fadeInUp}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
            >
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">From £1,165</p>
                <p className="mt-1 text-slate-600">Per area, all-inclusive</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">40–80%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">4 Destinations</p>
                <p className="mt-1 text-slate-600">500+ verified clinics</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* What Is Liposuction Section */}
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
              What Is Liposuction?
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-6 space-y-4 text-slate-600"
              data-aeo="liposuction-definition"
            >
              <p>
                Liposuction — also known as lipoplasty or suction-assisted
                lipectomy — is a cosmetic surgical procedure that removes
                stubborn fat deposits from specific areas of the body using a
                thin tube (cannula) and suction. It is one of the most commonly
                performed cosmetic procedures worldwide, with over 2.2 million
                liposuction procedures performed globally each year according to
                the International Society of Aesthetic Plastic Surgery (ISAPS).
              </p>

              <p>
                The procedure is suited for patients with localised fat deposits
                resistant to diet and exercise, patients at or near their target
                weight wanting body contouring, post-weight-loss patients
                needing sculpting, and patients with lipomas or gynaecomastia.
                It&apos;s important to understand that liposuction is not a
                weight loss procedure — best results are achieved when the
                patient is within 30% of their ideal weight with good skin
                elasticity.
              </p>

              <p>
                Common treatment areas include the abdomen (most popular),
                flanks and love handles, thighs (inner and outer), upper arms,
                chin and neck (double chin), back, hips, buttocks, knees, calves,
                and male chest for gynaecomastia. The British Association of
                Aesthetic Plastic Surgeons (BAAPS) reports consistent demand for
                body contouring procedures among UK patients.
              </p>

              <p>
                Many patients combine liposuction with other procedures for
                enhanced results: liposuction with a{' '}
                <Link
                  href="/procedures/tummy-tuck"
                  className="text-rose-600 hover:underline"
                >
                  tummy tuck
                </Link>{' '}
                (the most popular combination, often called a &ldquo;mummy
                makeover&rdquo;), liposuction with BBL (Brazilian Butt Lift —
                fat transfer to buttocks), liposuction with skin tightening, or
                lipo 360 for full torso contouring treating abdomen, flanks, and
                back in one session.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Techniques Comparison Section */}
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
              Types of Liposuction: VASER vs Laser vs Traditional
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="liposuction-techniques-comparison"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Technique
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        How It Works
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Best For
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Recovery
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Skin Tightening
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        UK Cost (per area)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Abroad From
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Traditional (Tumescent)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Tumescent fluid injected, cannula breaks up fat mechanically, vacuum suction removes it
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Larger volume removal, multiple areas
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        7–14 days off work
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Minimal
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,000–£6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,165
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        VASER
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Ultrasound waves (36,000 Hz) liquefy fat before removal. Preserves blood vessels, nerves, connective tissue
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        HD sculpting, precise contouring, fat transfer (BBL)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        5–10 days off work
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Good (collagen stimulation)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £4,700–£11,200
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,000
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Laser (SmartLipo/LAL)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Laser energy melts fat cells before extraction
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Smaller areas, chin/neck, skin tightening
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        5–10 days off work
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Good (collagen stimulation)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,500–£8,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,800
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Power-Assisted (PAL)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Motorised cannula vibrates to break up fat. More efficient, less surgeon fatigue
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Fibrous areas, revision lipo, large-volume cases
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        7–14 days off work
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Minimal
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,500–£7,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,500
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                VASER is the most sought-after technique for patients travelling
                abroad — it offers the most precise contouring, fastest
                recovery, less bruising, and better fat graft viability if
                combining with a BBL or fat transfer. Turkish and Polish clinics
                particularly specialise in VASER liposuction abroad.
              </p>

              <p>
                Traditional tumescent liposuction remains the gold standard for
                larger-volume fat removal across multiple areas. It is the most
                affordable option both in the UK and abroad. Laser lipo
                (SmartLipo) is best for smaller areas like the chin, neck, and
                arms where skin tightening is desired alongside fat removal —
                though risk of laser burns exists if the surgeon is not
                experienced with the device.
              </p>

              <p>
                Power-assisted liposuction (PAL) is less commonly offered abroad
                but excellent for fibrous areas and revision cases. The right
                technique depends on your goals, volume of fat to remove, desire
                for skin tightening, and whether fat transfer is planned. A
                reputable clinic will recommend the appropriate technique during
                consultation — not push the most expensive option.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Cost Comparison Section */}
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
              How Much Does Liposuction Cost Abroad?
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="liposuction-abroad-cost"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Liposuction Prices by Country & Technique
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Destination
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Traditional (per area)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        VASER (per area)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Lipo 360
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-5 overflow-hidden rounded-sm shadow-sm">
                            <TR title="Turkey" />
                          </div>
                          <Link
                            href="/procedures/liposuction/turkey"
                            className="text-rose-600 hover:underline"
                          >
                            Turkey
                          </Link>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £1,500–£3,800
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £2,300–£4,600
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £1,900–£4,000
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-5 overflow-hidden rounded-sm shadow-sm">
                            <HU title="Hungary" />
                          </div>
                          <Link
                            href="/procedures/liposuction/hungary"
                            className="text-rose-600 hover:underline"
                          >
                            Hungary
                          </Link>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £1,165–£1,775
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £1,500–£2,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £2,000–£3,500
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-5 overflow-hidden rounded-sm shadow-sm">
                            <PL title="Poland" />
                          </div>
                          <Link
                            href="/procedures/liposuction/poland"
                            className="text-rose-600 hover:underline"
                          >
                            Poland
                          </Link>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £500–£3,800
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £2,400–£3,700
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £2,500–£4,000
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-5 overflow-hidden rounded-sm shadow-sm">
                            <ES title="Spain" />
                          </div>
                          <Link
                            href="/procedures/liposuction/spain"
                            className="text-rose-600 hover:underline"
                          >
                            Spain
                          </Link>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £2,400–£5,300
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,000–£5,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,600–£6,000
                      </td>
                    </tr>
                    <tr className="bg-rose-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-900 sm:px-6">
                        UK (private)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        £3,000–£6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        £4,700–£11,200
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        £5,000–£9,000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                What&apos;s Typically Included in Abroad Packages
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-slate-50 p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Surgery</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Surgeon&apos;s fee, anaesthesia, hospital stay (1–2 nights
                    where applicable)
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Pre-op</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Blood tests, ECG, medical consultation
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Post-op</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Compression garment, follow-up appointments, medications
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Logistics</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Hotel (4–7 nights), airport/clinic transfers, 24/7
                    coordinator
                  </p>
                </div>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                Pricing varies based on the technique chosen, number of areas
                treated (multiple areas reduce per-area cost), surgeon
                experience and accreditation, hospital tier, compression garment
                quality, and destination. Lipo 360 (full torso) is often better
                value than treating abdomen, flanks, and back separately.
              </p>

              <p>
                Hungary offers the lowest starting prices in Europe, while
                Turkey provides the most comprehensive all-inclusive packages.
                Spain commands premium prices but offers the highest-ranked
                healthcare system in Europe. Poland sits in the middle with
                strong EU regulation and competitive pricing, plus unique access
                to N.I.L. (Nutational Infrasound Liposuction) technology.
              </p>

              <p className="text-sm italic">
                Prices based on published clinic rates and verified quotes
                (Bookimed, Qunomedical, WhatClinic, clinic websites). Actual
                costs may vary by technique, number of areas, and clinic.
                Request a personalised quote for accurate pricing.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Best Countries Section */}
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
              Best Countries for Liposuction Abroad
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2"
            >
              {/* Turkey Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      Turkey
                    </h3>
                    <p className="text-sm text-slate-500">Istanbul (primary hub)</p>
                  </div>
                  <div className="w-8 overflow-hidden rounded-sm">
                    <TR title="Turkey" />
                  </div>
                </div>
                <p className="mt-2 text-lg font-medium text-rose-600">
                  £1,500–£4,600 per area
                </p>
                <p className="mt-3 text-slate-600">
                  Largest medical tourism volume for cosmetic procedures
                  globally. 45,000+ liposuction procedures annually. 425+
                  clinics offering VASER, laser, traditional, 360, and HD
                  techniques. JCI-accredited hospitals standard.
                  Ultra-competitive pricing with the most comprehensive
                  all-inclusive packages.
                </p>
                <div className="mt-4 space-y-1 text-sm text-slate-500">
                  <p>
                    <strong>Best for:</strong> Maximum savings, all-inclusive
                    packages, widest technique range
                  </p>
                  <p>
                    <strong>Flight:</strong> 3.5–4 hours from London
                  </p>
                </div>
                <Link
                  href="/procedures/liposuction/turkey"
                  className="mt-4 inline-flex items-center text-rose-600 hover:underline"
                >
                  View Liposuction Clinics in Turkey →
                </Link>
              </div>

              {/* Hungary Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      Hungary
                    </h3>
                    <p className="text-sm text-slate-500">Budapest</p>
                  </div>
                  <div className="w-8 overflow-hidden rounded-sm">
                    <HU title="Hungary" />
                  </div>
                </div>
                <p className="mt-2 text-lg font-medium text-rose-600">
                  £1,165–£2,500 per area
                </p>
                <p className="mt-3 text-slate-600">
                  Lowest starting prices in Europe — up to 80% savings vs UK.
                  Budapest-centric with 60 clinics offering liposuction.
                  EU-regulated with ISO 9001 and MPHEST accreditation. Strong
                  medical education tradition and high surgeon standards.
                </p>
                <div className="mt-4 space-y-1 text-sm text-slate-500">
                  <p>
                    <strong>Best for:</strong> Budget-conscious patients, EU
                    consumer protections, lowest possible price
                  </p>
                  <p>
                    <strong>Flight:</strong> 2.5 hours from London
                  </p>
                </div>
                <Link
                  href="/procedures/liposuction/hungary"
                  className="mt-4 inline-flex items-center text-rose-600 hover:underline"
                >
                  View Liposuction Clinics in Hungary →
                </Link>
              </div>

              {/* Poland Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      Poland
                    </h3>
                    <p className="text-sm text-slate-500">
                      Warsaw, Kraków & Wrocław
                    </p>
                  </div>
                  <div className="w-8 overflow-hidden rounded-sm">
                    <PL title="Poland" />
                  </div>
                </div>
                <p className="mt-2 text-lg font-medium text-rose-600">
                  £500–£3,800 per area
                </p>
                <p className="mt-3 text-slate-600">
                  EU-regulated, fastest-growing medical tourism sector (20%
                  annual growth). ISO 9001 and ESPRAS-accredited clinics. Unique
                  access to N.I.L. (Nutational Infrasound Liposuction)
                  technology — a Belgian innovation only available at select
                  Polish clinics.
                </p>
                <div className="mt-4 space-y-1 text-sm text-slate-500">
                  <p>
                    <strong>Best for:</strong> EU protections, specialist
                    techniques (N.I.L.), very affordable flights
                  </p>
                  <p>
                    <strong>Flight:</strong> 2–2.5 hours from London (from £20)
                  </p>
                </div>
                <Link
                  href="/procedures/liposuction/poland"
                  className="mt-4 inline-flex items-center text-rose-600 hover:underline"
                >
                  View Liposuction Clinics in Poland →
                </Link>
              </div>

              {/* Spain Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      Spain
                    </h3>
                    <p className="text-sm text-slate-500">
                      Madrid, Barcelona & Marbella
                    </p>
                  </div>
                  <div className="w-8 overflow-hidden rounded-sm">
                    <ES title="Spain" />
                  </div>
                </div>
                <p className="mt-2 text-lg font-medium text-rose-600">
                  £2,400–£5,500 per area
                </p>
                <p className="mt-3 text-slate-600">
                  Ranked #1 healthiest nation globally. ~900 plastic surgeons
                  performing 450,000 procedures annually. Largest private
                  hospital network in Europe (Quirónsalud — 47 hospitals).
                  EU-regulated with SECPRE oversight. Specialists in HD lipo 360
                  and VASER.
                </p>
                <div className="mt-4 space-y-1 text-sm text-slate-500">
                  <p>
                    <strong>Best for:</strong> Premium quality, world-class
                    hospitals, combining surgery with Costa del Sol holiday
                  </p>
                  <p>
                    <strong>Flight:</strong> 2–2.5 hours from London
                  </p>
                </div>
                <Link
                  href="/procedures/liposuction/spain"
                  className="mt-4 inline-flex items-center text-rose-600 hover:underline"
                >
                  View Liposuction Clinics in Spain →
                </Link>
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
              Liposuction Recovery: What to Expect
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="liposuction-recovery-timeline"
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
                        Procedure
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        1–3 hours
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Under local or general anaesthesia depending on technique
                        and areas treated
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Hospital stay
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Same day or 1 night
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Most liposuction is day-case. VASER and multi-area lipo
                        may require overnight stay
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
                        Swelling and bruising are normal. VASER patients
                        typically experience less bruising than traditional
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Fit to fly
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Day 5–7 (median day 6)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Most patients cleared to fly after 5–7 days. Compression
                        garment worn during flight
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Return to desk work
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        5–14 days
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Depends on technique and areas treated. VASER: 5–7 days.
                        Traditional: 7–14 days
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Light exercise
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        2–3 weeks
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Walking, gentle activity. No high-impact exercise
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Return to strenuous exercise
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        4–8 weeks
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Surgeon clearance required
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Swelling resolves
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        8–12 weeks
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Gradual improvement. Compression garment worn for 4–6
                        weeks post-op
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Final results visible
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        3–6 months
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Skin retracts and contours settle. Full results at 6
                        months
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                Following your surgeon&apos;s post-operative instructions is
                critical for optimal results. Wear your compression garment
                continuously for 4–6 weeks — this helps reduce swelling, support
                skin retraction, and maintain your new contours. Stay hydrated
                and begin gentle walking from day 1 to promote circulation and
                reduce blood clot risk.
              </p>

              <p>
                Many clinics abroad offer lymphatic drainage massage as part of
                their package or as an add-on — this helps reduce swelling and
                improve results. Avoid alcohol and anti-inflammatory medication
                in the first week, and manage expectations about swelling: the
                &ldquo;liposuction swell&rdquo; means patients often look larger
                before they look smaller.
              </p>

              <div className="rounded-lg bg-slate-50 p-4 shadow-sm">
                <h3 className="font-semibold text-slate-900">
                  Recommended Trip Length by Destination
                </h3>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  <li>
                    <strong>Turkey:</strong> 7–10 days (7-day typical)
                  </li>
                  <li>
                    <strong>Hungary:</strong> 7 days
                  </li>
                  <li>
                    <strong>Poland:</strong> 7 days
                  </li>
                  <li>
                    <strong>Spain:</strong> 7 days
                  </li>
                </ul>
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
              How to Choose a Liposuction Surgeon Abroad
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8 grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-green-700">
                  What to Look For
                </h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex gap-3">
                    <span className="text-green-600">✓</span>
                    <div>
                      <p className="font-medium text-slate-900">
                        Board certification
                      </p>
                      <p className="text-sm text-slate-600">
                        ISAPS membership, EBOPRAS, or equivalent national board.
                        For VASER specifically, the surgeon should have specific
                        VASER training certification — not just general
                        liposuction experience.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600">✓</span>
                    <div>
                      <p className="font-medium text-slate-900">
                        Hospital accreditation
                      </p>
                      <p className="text-sm text-slate-600">
                        JCI (Joint Commission International), ISO 9001, or
                        equivalent national accreditation
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600">✓</span>
                    <div>
                      <p className="font-medium text-slate-900">
                        Technique specialisation
                      </p>
                      <p className="text-sm text-slate-600">
                        Ask which technique the surgeon recommends for your body
                        type and goals — and why. A surgeon pushing only the
                        most expensive option without clinical justification is
                        a red flag.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600">✓</span>
                    <div>
                      <p className="font-medium text-slate-900">
                        Volume and experience
                      </p>
                      <p className="text-sm text-slate-600">
                        Look for surgeons performing 200+ liposuction procedures
                        per year. Dr. Ergin Er in Turkey has completed 1,100+
                        VASER procedures; Dr. Ilona Osadowska in Poland performs
                        400 body liposuctions annually.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600">✓</span>
                    <div>
                      <p className="font-medium text-slate-900">
                        Before/after gallery
                      </p>
                      <p className="text-sm text-slate-600">
                        Real patient photos showing similar body types. Ask for
                        photos at different recovery stages (1, 3, 6 months) to
                        see how results develop.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600">✓</span>
                    <div>
                      <p className="font-medium text-slate-900">Aftercare</p>
                      <p className="text-sm text-slate-600">
                        Look for clinics with remote follow-up protocols and UK
                        partner clinics for complications
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-red-700">
                  Red Flags to Avoid
                </h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex gap-3">
                    <span className="text-red-600">✗</span>
                    <p className="text-slate-600">
                      Prices dramatically below market rate (could indicate
                      inexperienced surgeon or corner-cutting on
                      equipment/anaesthesia)
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600">✗</span>
                    <p className="text-slate-600">
                      &ldquo;Unlimited areas&rdquo; offers — quality liposuction
                      takes time per area
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600">✗</span>
                    <p className="text-slate-600">
                      No consultation before quoting a price
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600">✗</span>
                    <p className="text-slate-600">
                      Only one technique offered regardless of patient needs
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600">✗</span>
                    <p className="text-slate-600">
                      Guarantees of specific results or exact fat volumes
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600">✗</span>
                    <p className="text-slate-600">
                      Pressure to add procedures you didn&apos;t ask about
                    </p>
                  </li>
                </ul>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Lipo vs Tummy Tuck Section */}
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
              Liposuction vs Tummy Tuck: Which Procedure Is Right for You?
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="liposuction-vs-tummy-tuck"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Factor
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Liposuction
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Tummy Tuck
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Removes fat
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        <span className="text-green-600">✓</span> Yes — primary
                        purpose
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        <span className="text-green-600">✓</span> Yes — but
                        secondary to skin removal
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Removes excess skin
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        <span className="text-red-600">✗</span> No
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        <span className="text-green-600">✓</span> Yes — primary
                        purpose
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Tightens muscles
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        <span className="text-red-600">✗</span> No
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        <span className="text-green-600">✓</span> Yes — repairs
                        diastasis recti
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Recovery
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        5–14 days off work
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        10–21 days off work
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Scarring
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Minimal (small incisions)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Hip-to-hip scar (hidden by bikini line)
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Cost abroad
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        From £1,165
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        From £1,750
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Best for
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Localised fat, good skin elasticity
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Loose skin, muscle separation, post-pregnancy
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Can be combined
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        <span className="text-green-600">✓</span> Often combined
                        with tummy tuck
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        <span className="text-green-600">✓</span> Often combined
                        with liposuction
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                Many patients benefit from combining both procedures — the
                &ldquo;mummy makeover&rdquo; combination. If skin elasticity is
                good and the main concern is stubborn fat pockets, liposuction
                alone may suffice. If there&apos;s loose skin, muscle
                separation, or significant skin excess (common after pregnancy
                or major weight loss), a tummy tuck with liposuction is usually
                the better path.
              </p>

              <p>
                A consultation with a board-certified surgeon is the best way to
                determine the right approach. During the consultation, the
                surgeon will assess your skin quality, fat distribution, muscle
                tone, and overall goals to recommend the optimal procedure or
                combination.
              </p>

              <div className="mt-6 rounded-lg border border-rose-200 bg-rose-50 p-4">
                <p className="font-medium text-slate-900">
                  Considering both procedures?
                </p>
                <Link
                  href="/procedures/tummy-tuck"
                  className="mt-2 inline-flex items-center text-rose-600 hover:underline"
                >
                  Read our full guide: Tummy Tuck Abroad →
                </Link>
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
              Frequently Asked Questions About Liposuction Abroad
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
              Get Your Free Liposuction Quote
            </m.h2>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-2xl text-rose-100"
            >
              Compare prices from accredited clinics across Turkey, Hungary,
              Poland, and Spain. Receive personalised treatment plans from
              board-certified surgeons — no obligation.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/clinics?procedure=liposuction"
                className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-rose-600 shadow-lg transition-all hover:bg-rose-50 sm:w-auto"
              >
                Compare Liposuction Clinics Abroad
              </Link>
              <Link
                href="/enquiry?procedure=liposuction"
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
