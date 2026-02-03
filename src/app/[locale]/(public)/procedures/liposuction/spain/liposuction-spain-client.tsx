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

interface LiposuctionSpainClientProps {
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

export function LiposuctionSpainClient({ faqs }: LiposuctionSpainClientProps) {
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
              Liposuction in Spain: Premium EU Clinics from £2,400
            </m.h1>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl"
            >
              World-class body contouring at Europe&apos;s top hospitals. VASER,
              HD lipo, and lipo 360 in Barcelona, Madrid, and Marbella —
              EU-regulated, board-certified SECPRE surgeons, 40–60% savings vs
              UK.
            </m.p>

            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/clinics?procedure=liposuction&country=spain"
                className="rounded-lg bg-rose-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-rose-700 hover:shadow-xl"
              >
                Compare Liposuction Clinics in Spain →
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-4 text-sm text-slate-500">
              #1 healthiest nation • Quirónsalud hospitals • SECPRE-certified
              surgeons • EU-regulated
            </m.p>

            {/* Hero Stats */}
            <m.div
              variants={fadeInUp}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
            >
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">From £2,400</p>
                <p className="mt-1 text-slate-600">Per area</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">40–60%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">~900 Surgeons</p>
                <p className="mt-1 text-slate-600">450,000 procedures/year</p>
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
              Why Spain Is Europe&apos;s Premium Choice for Liposuction
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-6 space-y-4 text-slate-600"
              data-aeo="liposuction-spain-benefits"
            >
              <p>
                Spain was ranked the world&apos;s healthiest nation by the
                Bloomberg Global Health Index. The healthcare system is one of
                the most advanced in Europe, with universal coverage and
                world-class private hospitals. For patients prioritising quality
                of care above maximum savings, Spain represents the premium tier
                of{' '}
                <Link
                  href="/cosmetic-surgery"
                  className="text-rose-600 hover:underline"
                >
                  cosmetic surgery
                </Link>{' '}
                abroad.
              </p>

              <p>
                Quirónsalud operates 47 hospitals across Spain — the largest
                private healthcare group in the country. Their Marbella facility
                was named one of Newsweek&apos;s &ldquo;World&apos;s Best
                Hospitals&rdquo; in 2021. This hospital infrastructure is
                unmatched by any other medical tourism destination. Spain&apos;s
                plastic surgeons are regulated by SECPRE (Sociedad Española de
                Cirugía Plástica, Reparadora y Estética), requiring specialist
                training and ongoing professional development. Spain has
                approximately 900 plastic surgeons and performs 450,000 cosmetic
                procedures annually — 11th globally according to ISAPS 2021
                data.
              </p>

              <p>
                Spanish clinics offer the full range of advanced liposuction
                techniques — VASER, HD lipo (high-definition sculpting), lipo
                360, ab etching, and combined lipo + BBL. World-renowned
                specialists like Dr. Javier de Benito (former Vice President of
                ISAPS, rated top 10 worldwide) operate in Barcelona.
                Spain&apos;s medical tourism market was valued at $1.83 billion
                in 2025, projected to reach $4.16 billion by 2030.
              </p>

              <p>
                The Costa del Sol (Marbella, Málaga) and Barcelona offer ideal
                recovery settings — warm climate, walkable waterfronts, and
                large British expat communities. English is widely spoken at
                international-facing clinics, and Spain feels culturally
                familiar to UK patients. With flights just 2–2.5 hours from
                London and multiple daily services to Barcelona, Madrid, and
                Málaga, Spain combines premium quality with accessibility.
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
              How Much Does Liposuction Cost in Spain?
            </m.h2>

            {/* Cost by Technique */}
            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="liposuction-spain-cost"
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
                        Spain Price
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
                        £2,400–£5,300
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,000–£6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        10–40%
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        VASER liposuction (1 area)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,000–£5,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £4,700–£11,200
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        35–55%
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Lipo 360 (VASER)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,600–£6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £5,000–£9,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        30–40%
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        HD lipo (high-definition)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £4,000–£7,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £5,500–£12,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        30–45%
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Ab etching
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,500–£6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £5,000–£10,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        30–40%
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Lipo + BBL combination
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £5,000–£9,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £8,000–£16,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        40–45%
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
                        Positioning
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Barcelona
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        €1,900–€7,000 (£1,600–£6,000)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Widest clinic selection, premium and mid-range. Wellness
                        Kliniek transparent pricing.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Madrid
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        €1,000–€11,000 (£850–£9,400)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Widest price range. Capital premium for top surgeons.
                        University Clinic of Navarra.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Marbella
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        From €3,900 (£3,300)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Premium positioning. Costa del Sol setting. Quirónsalud
                        Marbella (Newsweek Best Hospitals).
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Valencia
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        €2,800–€5,800 (£2,400–£5,000)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Emerging destination. Lower costs than Barcelona/Madrid.
                        Beach recovery setting.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Alicante
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        From $1,687 (£1,350)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Budget option for Spain. Costa Blanca setting. Smaller
                        clinic selection.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Seville
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        €2,800–€5,800 (£2,400–£5,000)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Andalusian culture. Growing medical tourism sector.
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
                  <p className="font-medium text-slate-900">Anaesthesia</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Local or general anaesthesia
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Hospital Admission</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Clinic/hospital stay
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Pre-op Tests</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Blood work and consultation
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
                  <p className="font-medium text-slate-900">21% VAT Included</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Spanish tax included in quoted price
                  </p>
                </div>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                Spain is more expensive than Turkey, Hungary, or Poland — but
                the savings vs UK are still significant (40–60% for most
                patients). The premium pricing reflects the calibre of hospitals
                (Quirónsalud, HM Hospitales), surgeon credentials, and
                facilities. Patients choosing Spain are prioritising quality of
                care over maximum savings.
              </p>

              <p className="text-sm italic">
                Prices based on published rates from Wellness Kliniek Barcelona,
                Quirónsalud, Instituto de Benito, and WhatClinic (2024–2025).
                Prices include 21% Spanish VAT at reputable clinics. Request a
                personalised quote for accurate pricing.
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
              Top Liposuction Clinics and Surgeons in Spain
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2"
            >
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Quirónsalud Marbella
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Costa del Sol
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>
                    • Spain&apos;s largest private hospital group (47 hospitals)
                  </li>
                  <li>• Newsweek &ldquo;World&apos;s Best Hospitals&rdquo; 2021</li>
                  <li>• 800+ medical staff</li>
                  <li>• Full-service international patient department</li>
                  <li>• Costa del Sol setting for recovery</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Instituto de Benito
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Barcelona / Madrid
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• 30+ years of experience</li>
                  <li>• Rated top 10 plastic surgery clinics worldwide</li>
                  <li>• Founded by Dr. Javier de Benito — former VP of ISAPS</li>
                  <li>• Elite-tier clinic with premium pricing</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Wellness Kliniek Barcelona
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Barcelona
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• Specialises in VASER and SWT liposuction</li>
                  <li>• Up to 5 litres of fat removal per session</li>
                  <li>• Transparent all-inclusive pricing (21% VAT included)</li>
                  <li>• International patient base</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    University Clinic of Navarra
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Madrid
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• 95% patient satisfaction rate</li>
                  <li>• Ranked best private hospital in Spain</li>
                  <li>• Academic medical centre with research-led practice</li>
                  <li>• Premium pricing, exceptional outcomes data</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Clinica Granado Tiagonce
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Spain
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• 20+ years of plastic surgery experience</li>
                  <li>• Recognised by ASAPS (American Society)</li>
                  <li>• 3D visualisation technology — see projected results</li>
                  <li>• Dedicated physiotherapy department</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Centro Médico Teknon
                  </h3>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                    Barcelona
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• Partners with Quirónsalud network</li>
                  <li>• 14km from Barcelona-El Prat Airport</li>
                  <li>• Comprehensive international patient services</li>
                  <li>• Online consultations available</li>
                </ul>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Notable Surgeon
              </h3>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="font-medium text-slate-900">
                  Dr. Javier de Benito (Instituto de Benito, Barcelona/Madrid)
                </p>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  <li>• Former Vice President of ISAPS</li>
                  <li>• Rated among top 10 plastic surgeons worldwide</li>
                  <li>• 30+ years of experience</li>
                  <li>
                    • Specialist in body contouring, liposuction, and complex
                    cosmetic surgery
                  </li>
                  <li>• Operates in both Barcelona and Madrid</li>
                </ul>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Advanced Techniques Section */}
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
              Advanced Liposuction Techniques Available in Spain
            </m.h2>

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Spain offers the full spectrum of liposuction techniques, with
              particular strength in advanced body sculpting.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              data-aeo="advanced-liposuction-spain"
            >
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  VASER Lipo 360
                </h3>
                <p className="mt-1 text-sm text-rose-600">£3,600–£6,000</p>
                <p className="mt-3 text-sm text-slate-600">
                  Ultrasound-assisted circumferential body contouring. Treats
                  abdomen, flanks, and back in one session. Less bruising and
                  faster recovery than traditional 360.
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Available at Wellness Kliniek Barcelona, Quirónsalud, and most
                  major clinics
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  HD Lipo (High-Definition)
                </h3>
                <p className="mt-1 text-sm text-rose-600">£4,000–£6,500</p>
                <p className="mt-3 text-sm text-slate-600">
                  Advanced technique sculpting around muscle groups. Creates
                  visible abdominal definition (six-pack, obliques). Requires
                  highly experienced surgeon.
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Available at elite clinics in Barcelona and Madrid
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Ab Etching
                </h3>
                <p className="mt-1 text-sm text-rose-600">£3,500–£6,000</p>
                <p className="mt-3 text-sm text-slate-600">
                  Sub-technique of HD lipo focused specifically on creating
                  visible abdominal muscle definition. Best for athletic patients
                  at low body fat percentage.
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Available at specialist clinics
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Lipo + BBL
                </h3>
                <p className="mt-1 text-sm text-rose-600">£5,000–£9,000</p>
                <p className="mt-3 text-sm text-slate-600">
                  Fat harvested via liposuction, purified, then transferred to
                  buttocks. Spain&apos;s clinics use VASER for harvest (better
                  fat cell viability). Among the highest BBL safety standards in
                  Europe.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  SWT Liposuction
                </h3>
                <p className="mt-1 text-sm text-rose-600">
                  Available at Wellness Kliniek
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  Skin Wave Technology combines fat removal with skin tightening
                  via acoustic wave technology. Addresses mild skin laxity
                  without needing a full tummy tuck.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  3D Visualisation
                </h3>
                <p className="mt-1 text-sm text-rose-600">
                  Available at Clinica Granado Tiagonce
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  3D body scanning projects expected outcomes. Patients see their
                  projected results before committing to surgery. Helps set
                  realistic expectations.
                </p>
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
              Liposuction Recovery in Spain: What to Expect
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="liposuction-spain-recovery"
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
                        2–3 hours
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Under local or general anaesthesia
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Hospital stay
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        1 night typical
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Longer for multi-area or HD lipo. Some day-case options.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        First follow-up
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Day 2–3
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Dressings checked. Gentle walking encouraged.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Bruising peaks
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Days 5–7
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Normal post-operative bruising, less with VASER
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Fit to fly
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Day 5–7
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        2–2.5 hour flight to London well-tolerated
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Return to work
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        1–2 weeks
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Desk work from day 7. Active jobs: 2–3 weeks.
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
                        Skin retracts and contours settle gradually
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                City-Specific Recovery & Travel Tips
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="font-medium text-slate-900">Barcelona</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>
                      • Walkable waterfront (La Barceloneta, Port Olímpic)
                    </li>
                    <li>• Avoid peak summer heat (July–August) for recovery</li>
                    <li>• 2 hours from London, multiple daily flights</li>
                    <li>• Hotels: 4-star from €80/night in Eixample</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="font-medium text-slate-900">Madrid</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>• Capital city with world-class medical infrastructure</li>
                    <li>• Retiro Park for gentle, flat walking</li>
                    <li>• 2.5 hours from London, numerous daily flights</li>
                    <li>• Hotels: 4-star from €75/night near Retiro</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="font-medium text-slate-900">
                    Marbella (Costa del Sol)
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>
                      • Premier recovery destination — beach, warm climate
                    </li>
                    <li>• Large British expat community — feels familiar</li>
                    <li>• Málaga Airport: 2.5 hours from London, 45 mins to Marbella</li>
                    <li>• Beachfront hotels from €90/night</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="font-medium text-slate-900">Valencia</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>• Emerging medical tourism destination</li>
                    <li>• City of Arts and Sciences for gentle walks</li>
                    <li>• 2.5 hours from London, direct flights</li>
                    <li>
                      • Hotels: 4-star from €65/night — most affordable coastal
                      city
                    </li>
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

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Spain offers premium quality at Europe&apos;s top hospitals, while
              other destinations may offer greater savings.
            </m.p>

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
                  Maximum savings, all-inclusive packages, 45,000+ procedures/year
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
                href="/procedures/liposuction/poland"
                className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-slate-900">Poland</p>
                <p className="mt-1 text-sm text-rose-600">From £500/area</p>
                <p className="mt-2 text-sm text-slate-600">
                  EU-regulated, exclusive N.I.L. technology, multi-city options
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
              Frequently Asked Questions About Liposuction in Spain
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
              Get Your Free Liposuction Quote for Spain
            </m.h2>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-2xl text-rose-100"
            >
              Compare prices from world-class clinics in Barcelona, Madrid, and
              Marbella. Quirónsalud hospitals, SECPRE-certified surgeons, and
              advanced HD lipo techniques — no obligation.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/clinics?procedure=liposuction&country=spain"
                className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-rose-600 shadow-lg transition-all hover:bg-rose-50 sm:w-auto"
              >
                Compare Liposuction Clinics in Spain
              </Link>
              <Link
                href="/enquiry?procedure=liposuction&country=spain"
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
