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

interface RhinoplastyClientProps {
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

export function RhinoplastyClient({ faqs }: RhinoplastyClientProps) {
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
              Rhinoplasty Abroad: Compare Prices, Techniques & Top Surgeons
            </m.h1>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl"
            >
              Save 40–70% on rhinoplasty at accredited international clinics.
              Compare piezo, ultrasonic, and preservation techniques across
              Turkey, Spain, Hungary, and Poland — with board-certified
              surgeons, comprehensive packages, and recovery support.
            </m.p>

            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/clinics?procedure=rhinoplasty"
                className="rounded-lg bg-rose-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-rose-700 hover:shadow-xl"
              >
                Compare Rhinoplasty Clinics →
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-4 text-sm text-slate-500">
              Board-certified surgeons • JCI & EU-accredited hospitals • Recovery
              support included • Free consultation matching
            </m.p>

            {/* Hero Stats */}
            <m.div
              variants={fadeInUp}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
            >
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">From £2,000</p>
                <p className="mt-1 text-slate-600">Primary rhinoplasty</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">40–70%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">4 Countries</p>
                <p className="mt-1 text-slate-600">300+ verified surgeons</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* What Is Rhinoplasty Section */}
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
              What Is Rhinoplasty?
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-6 space-y-4 text-slate-600"
              data-aeo="rhinoplasty-definition"
            >
              <p>
                Rhinoplasty (nose reshaping surgery, commonly called a
                &quot;nose job&quot;) is a surgical procedure that changes the
                shape, size, or proportions of the nose. It can address
                aesthetic concerns — such as a dorsal hump, bulbous tip, crooked
                nose, or wide nostrils — or functional issues like a deviated
                septum causing breathing difficulties. Rhinoplasty is one of the
                most commonly performed facial plastic surgery procedures
                worldwide, with approximately 700,000 rhinoplasties performed
                globally each year according to ISAPS data.
              </p>

              <p>
                Rhinoplasty is suitable for patients unhappy with the shape,
                size, or symmetry of their nose; patients with breathing
                difficulties caused by structural abnormalities; patients who
                have experienced nasal trauma; and patients seeking revision
                after a previous rhinoplasty that did not meet expectations.
                However, rhinoplasty is not a quick fix — results take 12–18
                months to fully settle, and it is not suitable for patients
                under 18 (the nose must be fully developed).
              </p>

              <p>
                Common concerns addressed by rhinoplasty include: dorsal hump
                (bump on the bridge), bulbous or drooping tip, wide or flared
                nostrils, crooked or asymmetrical nose, overly large or small
                nose, deviated septum causing breathing issues, and
                post-traumatic deformity. Non-surgical &quot;liquid
                rhinoplasty&quot; using dermal fillers can correct minor bumps
                and asymmetries without surgery, but it cannot reduce nose size,
                narrow nostrils, or fix breathing issues — surgical rhinoplasty
                remains the only option for permanent structural changes.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Technique Comparison Section - MAJOR DIFFERENTIATOR */}
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
              Types of Rhinoplasty: Piezo vs Ultrasonic vs Preservation vs
              Traditional
            </m.h2>

            <m.p variants={fadeInUp} className="mt-4 text-slate-600">
              Understanding rhinoplasty techniques helps you choose the right
              approach for your goals. This comparison covers the key
              differences in how each technique works, recovery time, and
              pricing across destinations.
            </m.p>

            {/* Technique Comparison Table */}
            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="rhinoplasty-techniques-comparison"
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
                        UK Cost
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Abroad From
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Traditional (Open)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        External incision across columella, full visibility
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Major restructuring, revision cases
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        10–14 days swelling
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £6,500–£9,500
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,000
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Traditional (Closed)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Internal incisions only, no external scarring
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Minor refinements, tip work
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        7–10 days swelling
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £5,500–£8,500
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £1,800
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Piezo (Piezotome)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Ultrasonic vibrations sculpt bone, preserves soft tissue
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Bony work, faster recovery
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        5–7 days, minimal bruising
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £7,000–£12,000
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,450
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Ultrasonic
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Ultrasonic energy for precise bone sculpting
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Reduced trauma, faster recovery
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        7–10 days, reduced bruising
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £7,500–£12,000
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,500
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Preservation
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Reshapes bone without breaking, maintains support
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Natural-feeling results
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        10–14 days swelling
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £8,000–£14,000
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £3,500
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            {/* Technique Explanations */}
            <m.div variants={fadeInUp} className="mt-8 space-y-6">
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Piezo (Piezotome) Rhinoplasty
                </h3>
                <p className="mt-2 text-slate-600">
                  Piezo rhinoplasty has revolutionised nose surgery over the
                  past decade. The piezoelectric device vibrates at 25,000–30,000
                  Hz, cutting through bone with millimetre precision while
                  leaving soft tissue (blood vessels, nerves, skin) completely
                  unharmed. The result: dramatically less bruising (many
                  patients have no visible bruising), faster recovery (patients
                  often return to social activities within 7 days vs 2–3 weeks
                  with traditional methods), and no nasal packing in most cases.
                  Turkey pioneered mainstream adoption of piezo rhinoplasty;
                  Spain leads in combining piezo with preservation techniques.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Preservation Rhinoplasty
                </h3>
                <p className="mt-2 text-slate-600">
                  Preservation rhinoplasty takes a fundamentally different
                  approach to traditional methods. Rather than breaking and
                  resetting nasal bones (the traditional osteotomy approach),
                  preservation techniques reshape bone while maintaining its
                  integrity and natural support structures. The result is a nose
                  that looks and feels natural — it bends and moves like a
                  natural nose. Spain&apos;s leading surgeons (Dr. Marco Romeo,
                  Dr. Gustavo Sordo) are at the forefront of preservation
                  rhinoplasty in Europe.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Traditional Open Rhinoplasty
                </h3>
                <p className="mt-2 text-slate-600">
                  Traditional open rhinoplasty remains the gold standard for
                  complex cases: severe asymmetry, major dorsal hump reduction,
                  extensive revision work, and cases requiring cartilage
                  grafting. The external incision across the columella provides
                  maximum visibility and control. Most experienced surgeons
                  worldwide are trained in open rhinoplasty as their primary
                  approach.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Traditional Closed Rhinoplasty
                </h3>
                <p className="mt-2 text-slate-600">
                  Traditional closed rhinoplasty is ideal for patients needing
                  minor refinements, tip work, or those concerned about external
                  scarring. All incisions are made inside the nostrils. However,
                  the surgeon has limited visibility, so it is not suitable for
                  complex restructuring.
                </p>
              </div>
            </m.div>

            <m.p
              variants={fadeInUp}
              className="mt-6 text-sm italic text-slate-500"
            >
              The right technique depends on your anatomy, goals, and the
              complexity of changes required. A reputable surgeon will recommend
              the appropriate technique during consultation — not push the most
              expensive option or the one they prefer regardless of patient
              needs.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Open vs Closed Section */}
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
              Open vs Closed Rhinoplasty: Which Is Right for You?
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="open-vs-closed-rhinoplasty"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Factor
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Open Rhinoplasty
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Closed Rhinoplasty
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Incision
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Small incision across columella + internal incisions
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Internal incisions only (inside nostrils)
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Visibility for surgeon
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Full structural visibility
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Limited visibility
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Scarring
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Tiny scar on columella (fades to near-invisible)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        No external scarring
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Best for
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Major reshaping, dorsal hump, complex revision
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Minor refinements, tip work
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Surgery time
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        2–3 hours typically
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        1.5–2.5 hours typically
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Final results
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        12–18 months
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        12 months
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                The open vs closed decision is primarily the surgeon&apos;s
                based on what work is needed, not a patient preference. Most
                surgeons recommend open rhinoplasty for anything beyond minor
                tip refinement because the visibility allows greater precision
                and control.
              </p>
              <p>
                The columella scar from open rhinoplasty typically fades to a
                thin white line that is essentially invisible within 6–12
                months. Patients should trust their surgeon&apos;s
                recommendation rather than specifically requesting open or
                closed based on scar concerns — the quality of the result
                matters more than the surgical approach.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Cost Comparison Section */}
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
              How Much Does Rhinoplasty Cost Abroad?
            </m.h2>

            {/* Multi-Destination Cost Table */}
            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="rhinoplasty-abroad-cost"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Destination
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Primary
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Ultrasonic/Piezo
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Revision
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Preservation
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        🇹🇷 Turkey
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,450–£4,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,000–£5,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,200–£5,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,500–£6,000
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        🇭🇺 Hungary
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,200–£3,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £2,800–£4,200
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,000–£4,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,200–£5,000
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        🇵🇱 Poland
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,900–£4,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,500–£5,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,800–£6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £4,000–£6,500
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        🇪🇸 Spain
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £4,500–£7,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £4,800–£8,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £5,500–£9,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £5,000–£9,000
                      </td>
                    </tr>
                    <tr className="bg-rose-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-bold text-slate-900 sm:px-6">
                        🇬🇧 UK (Baseline)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-bold text-slate-600 sm:px-6">
                        £6,500–£9,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-bold text-slate-600 sm:px-6">
                        £7,500–£12,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-bold text-slate-600 sm:px-6">
                        £8,000–£15,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-bold text-slate-600 sm:px-6">
                        £8,000–£14,000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            {/* Savings Summary */}
            <m.div
              variants={fadeInUp}
              className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4"
            >
              <p className="font-medium text-green-800">Savings Summary</p>
              <p className="mt-1 text-sm text-green-700">
                Turkey offers 50–70% savings vs UK prices. Hungary and Poland
                offer 40–60% savings with EU protections. Spain offers 40–60%
                savings with premium technique innovation.
              </p>
            </m.div>

            {/* What's Included */}
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">
                  Turkey All-Inclusive Packages Include:
                </h3>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• Surgeon&apos;s fee, anaesthesiologist, facility</li>
                  <li>• Hospital/clinic stay (1 night standard)</li>
                  <li>• Pre-operative tests (blood work, ECG)</li>
                  <li>• Post-operative medications, nasal splint, dressings</li>
                  <li>• 5–7 nights 4–5 star hotel accommodation</li>
                  <li>• VIP airport and clinic transfers</li>
                  <li>• Personal patient coordinator</li>
                  <li>• 24/7 support line</li>
                  <li>• Splint removal appointment</li>
                  <li>• Follow-up consultations</li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">
                  EU Destinations (Surgery-Focused) Include:
                </h3>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>• Surgeon&apos;s fee, anaesthesiologist, facility</li>
                  <li>• Hospital/clinic stay (1 night where applicable)</li>
                  <li>• Pre-operative tests</li>
                  <li>• Post-operative medications, nasal splint, dressings</li>
                  <li>• Splint removal appointment</li>
                  <li>• Follow-up consultations (typically 2–3)</li>
                  <li>• Some include 12-month post-operative care plan</li>
                  <li className="italic text-slate-500">
                    Accommodation and transfers typically arranged separately
                    (Spain, Poland) or included at 3–4 star level (Hungary)
                  </li>
                </ul>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                What affects pricing: technique chosen (piezo/ultrasonic costs
                more due to equipment), surgeon experience and reputation,
                hospital tier, destination (Turkey is generally cheapest, Spain
                is most expensive but offers technique innovation premium),
                complexity of case (revision costs more than primary), and
                whether accommodation is included (Turkey&apos;s all-inclusive
                vs EU surgery-focused packages).
              </p>

              <p className="text-sm italic">
                Prices based on published clinic rates and may vary by
                technique, surgeon, and case complexity. Request a personalised
                quote for accurate pricing.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Best Countries Section */}
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
              Best Countries for Rhinoplasty Abroad
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2"
            >
              {/* Turkey */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      Turkey 🇹🇷
                    </h3>
                    <p className="mt-1 text-rose-600">£2,450–£5,000</p>
                  </div>
                </div>
                <p className="mt-4 text-slate-600">
                  World&apos;s leading rhinoplasty destination by volume.
                  60,000+ procedures annually. 200+ specialist rhinoplasty
                  surgeons including globally renowned names. 46 JCI-accredited
                  hospitals. Piezo rhinoplasty pioneers with extensive
                  experience. Most comprehensive all-inclusive packages.
                </p>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p>
                    <strong>Best for:</strong> Maximum savings, all-inclusive
                    packages, widest surgeon choice, piezo technique at lowest
                    cost
                  </p>
                  <p>
                    <strong>Technique specialisation:</strong> Piezo
                    rhinoplasty, ethnic rhinoplasty, revision rhinoplasty
                  </p>
                  <p>
                    <strong>Flight time:</strong> 3.5–4 hours from London
                  </p>
                </div>
                <Link
                  href="/procedures/rhinoplasty/turkey"
                  className="mt-4 inline-flex items-center text-rose-600 hover:underline"
                >
                  View Rhinoplasty Surgeons in Turkey →
                </Link>
              </div>

              {/* Spain */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      Spain 🇪🇸
                    </h3>
                    <p className="mt-1 text-rose-600">£4,500–£9,000</p>
                  </div>
                </div>
                <p className="mt-4 text-slate-600">
                  Premium European destination with technique innovation focus.
                  Spain leads in ultrasonic (piezo) and preservation
                  rhinoplasty. WHO-ranked 7th globally for healthcare. Highest
                  life expectancy in EU (84 years). Premium hospital
                  infrastructure (Quirónsalud, Ruber Internacional).
                </p>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p>
                    <strong>Best for:</strong> Technique innovation,
                    preservation rhinoplasty, premium quality over maximum
                    savings
                  </p>
                  <p>
                    <strong>Technique specialisation:</strong> Preservation
                    rhinoplasty, ultrasonic rhinoplasty, natural-feeling results
                  </p>
                  <p>
                    <strong>Flight time:</strong> 2–2.5 hours from London
                  </p>
                </div>
                <Link
                  href="/procedures/rhinoplasty/spain"
                  className="mt-4 inline-flex items-center text-rose-600 hover:underline"
                >
                  View Rhinoplasty Surgeons in Spain →
                </Link>
              </div>

              {/* Hungary */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      Hungary 🇭🇺
                    </h3>
                    <p className="mt-1 text-rose-600">£2,200–£5,000</p>
                  </div>
                </div>
                <p className="mt-4 text-slate-600">
                  EU-regulated destination with strong plastic surgery heritage.
                  Brazilian rhinoplasty training lineage (Prof. Pitanguy
                  influence). Budapest-centric with specialist clinics. Thermal
                  spa culture enables unique recovery experience. Excellent
                  value within EU framework.
                </p>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p>
                    <strong>Best for:</strong> EU consumer protections with
                    competitive pricing, thermal spa recovery experience
                  </p>
                  <p>
                    <strong>Technique specialisation:</strong> Traditional
                    open/closed rhinoplasty, ethnic rhinoplasty
                  </p>
                  <p>
                    <strong>Flight time:</strong> 2.5 hours from London
                  </p>
                </div>
                <Link
                  href="/procedures/rhinoplasty/hungary"
                  className="mt-4 inline-flex items-center text-rose-600 hover:underline"
                >
                  View Rhinoplasty Surgeons in Hungary →
                </Link>
              </div>

              {/* Poland */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      Poland 🇵🇱
                    </h3>
                    <p className="mt-1 text-rose-600">£2,900–£6,000</p>
                  </div>
                </div>
                <p className="mt-4 text-slate-600">
                  Fastest-growing EU medical tourism destination. Meticulous
                  surgical approach with strong aesthetic traditions. Regional
                  clinic options (Warsaw, Kraków, Wrocław). Mountain recovery
                  options in Zakopane. ISO 9001 and ESPRAS-accredited clinics.
                </p>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p>
                    <strong>Best for:</strong> EU protections, meticulous
                    approach, regional flexibility, affordable UK flights (from
                    £20)
                  </p>
                  <p>
                    <strong>Technique specialisation:</strong> Traditional
                    rhinoplasty, septorhinoplasty, functional rhinoplasty
                  </p>
                  <p>
                    <strong>Flight time:</strong> 2–2.5 hours from London
                  </p>
                </div>
                <Link
                  href="/procedures/rhinoplasty/poland"
                  className="mt-4 inline-flex items-center text-rose-600 hover:underline"
                >
                  View Rhinoplasty Surgeons in Poland →
                </Link>
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
              Rhinoplasty Recovery: What to Expect
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="rhinoplasty-recovery-timeline"
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
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Procedure
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        1.5–3 hours
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Under general anaesthesia. Open rhinoplasty typically
                        longer than closed.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Immediate post-op
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Day 0
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Nasal splint applied, possible internal packing (removed
                        Day 1–2), head elevated.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Packing removed
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Day 1–2
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        If used. Piezo patients often have no packing.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Bruising peaks
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Days 3–5
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Traditional: under-eye bruising common.
                        Piezo/ultrasonic: minimal to none.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Splint removed
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Day 7–10
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Major milestone — first view of new nose shape (still
                        swollen).
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Fit to fly
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Day 7–10
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Most surgeons clear patients after splint removal. 10
                        days safer for long-haul.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Return to desk work
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        7–14 days
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Depends on technique. Piezo: 7 days. Traditional: 10–14
                        days.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Swelling 80% resolved
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        4–6 weeks
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Nose looks more refined, tip still swollen.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Light exercise
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        3–4 weeks
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Walking, gentle activity. No contact sports.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Strenuous exercise
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        6–8 weeks
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Surgeon clearance required.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Glasses can be worn
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        6–8 weeks
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Support them on forehead or use tape bridge before then.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Final results visible
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        12–18 months
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Tip swelling is last to resolve. Full refinement takes
                        time.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            {/* Recommended Trip Length */}
            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900">
                Recommended Trip Length by Destination
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Turkey</p>
                  <p className="text-sm text-slate-600">
                    10–14 days (most common: 10-day package)
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Spain</p>
                  <p className="text-sm text-slate-600">7–10 days</p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Hungary</p>
                  <p className="text-sm text-slate-600">7–10 days</p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Poland</p>
                  <p className="text-sm text-slate-600">7–10 days</p>
                </div>
              </div>
            </m.div>

            {/* Piezo Recovery Advantage */}
            <m.div
              variants={fadeInUp}
              className="mt-8 rounded-lg border border-rose-200 bg-rose-50 p-6"
            >
              <h3 className="font-semibold text-slate-900">
                Piezo/Ultrasonic Recovery Advantage
              </h3>
              <p className="mt-2 text-slate-600">
                Patients choosing piezo or ultrasonic rhinoplasty typically
                experience: minimal or no bruising (vs 10–14 days bruising with
                traditional), reduced swelling, no nasal packing in most cases,
                faster return to social activities (7 days vs 14+ days), and
                less post-operative discomfort. This faster recovery is a key
                reason why many UK patients specifically seek piezo rhinoplasty
                abroad.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Choosing a Surgeon Section */}
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
              How to Choose a Rhinoplasty Surgeon Abroad
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2">
              {/* What to Look For */}
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">What to Look For</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li>
                    <strong>Board certification:</strong> ISAPS membership,
                    EBOPRAS, or equivalent national board (TSPRS in Turkey,
                    SECPRE in Spain, Chamber of Physicians in Hungary/Poland).
                    Look for surgeons who specialise in facial plastic surgery
                    or rhinoplasty specifically.
                  </li>
                  <li>
                    <strong>Technique expertise:</strong> If you want piezo
                    rhinoplasty, ensure the surgeon has specific piezo training
                    and equipment. Ask how many procedures they perform annually
                    with that technique.
                  </li>
                  <li>
                    <strong>Hospital/clinic accreditation:</strong> JCI in
                    Turkey, ISO 9001 or equivalent national accreditation in EU
                    destinations.
                  </li>
                  <li>
                    <strong>Volume and experience:</strong> Look for surgeons
                    performing 200+ rhinoplasty procedures per year. Top Turkish
                    surgeons perform 500+ annually; top Spanish surgeons perform
                    150–300 with technique specialisation.
                  </li>
                  <li>
                    <strong>Before/after gallery:</strong> Real patient photos
                    showing similar nose types to yours. Ask for photos at
                    different recovery stages.
                  </li>
                  <li>
                    <strong>Video consultation:</strong> Most reputable clinics
                    offer virtual consultations where you can discuss goals and
                    receive preliminary recommendations.
                  </li>
                  <li>
                    <strong>Revision rates:</strong> A reputable surgeon will be
                    transparent about their revision rate. Industry average is
                    5–15%; top surgeons achieve under 5%.
                  </li>
                </ul>
              </div>

              {/* Red Flags */}
              <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                <h3 className="font-semibold text-red-800">Red Flags to Avoid</h3>
                <ul className="mt-4 space-y-3 text-sm text-red-700">
                  <li>
                    • Prices dramatically below market rate (could indicate
                    inexperienced surgeon or corner-cutting)
                  </li>
                  <li>
                    • &quot;One technique fits all&quot; approach — every
                    patient gets the same recommendation regardless of anatomy
                  </li>
                  <li>• No consultation before quoting a price</li>
                  <li>
                    • Guarantees of specific results or &quot;perfect&quot;
                    outcomes
                  </li>
                  <li>
                    • Pressure to add procedures you did not ask about
                  </li>
                  <li>
                    • Before/after photos that look unrealistic or heavily
                    edited
                  </li>
                  <li>
                    • Unable to provide credentials or accreditation
                    documentation
                  </li>
                  <li>• Clinic refuses video consultation before booking</li>
                </ul>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Revision Rhinoplasty Section */}
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
              Revision Rhinoplasty Abroad: When a Second Surgery Is Needed
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-6 space-y-4 text-slate-600"
              data-aeo="revision-rhinoplasty-abroad"
            >
              <p>
                5–15% of rhinoplasty patients seek revision surgery, according
                to ISAPS data. This does not mean the first surgery
                &quot;failed&quot; — sometimes patients want further refinement,
                or scar tissue development affects the final result.
              </p>

              <p>
                Revision rhinoplasty is more complex than primary rhinoplasty
                because surgeons work with altered anatomy, scar tissue,
                potentially missing cartilage, and compromised blood supply. It
                requires specialist expertise beyond primary rhinoplasty skills.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Timing</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Wait 12–18 months after primary rhinoplasty before
                    considering revision. The nose must fully heal and all
                    swelling must resolve.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Cost</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Revision rhinoplasty typically costs 20–50% more than
                    primary due to increased complexity and longer surgery time.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">
                    Specialist Selection
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Look for surgeons who specifically list revision rhinoplasty
                    as a specialisation, not just surgeons who &quot;can do
                    revisions.&quot;
                  </p>
                </div>
              </div>
            </m.div>

            <m.div
              variants={fadeInUp}
              className="mt-6 rounded-lg border border-rose-200 bg-rose-50 p-4"
            >
              <p className="font-medium text-slate-900">
                Considering revision rhinoplasty?
              </p>
              <div className="mt-2 flex flex-wrap gap-4">
                <Link
                  href="/procedures/rhinoplasty/turkey"
                  className="text-rose-600 hover:underline"
                >
                  Revision Rhinoplasty in Turkey →
                </Link>
                <Link
                  href="/procedures/rhinoplasty/spain"
                  className="text-rose-600 hover:underline"
                >
                  Revision Rhinoplasty in Spain →
                </Link>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Rhinoplasty vs Non-Surgical Section */}
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
              Rhinoplasty vs Non-Surgical Nose Job: Which Is Right for You?
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="rhinoplasty-vs-non-surgical"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Factor
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Surgical Rhinoplasty
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Non-Surgical (Liquid) Nose Job
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Procedure
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Surgery under general anaesthesia, 1.5–3 hours
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Injection of dermal fillers, 15–30 minutes
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Permanence
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        Permanent
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Temporary (6–18 months)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Can reduce size
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        ✓ Yes
                      </td>
                      <td className="px-4 py-4 text-sm text-red-600 sm:px-6">
                        ✗ No (can only add volume)
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Can remove hump
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        ✓ Yes (permanent removal)
                      </td>
                      <td className="px-4 py-4 text-sm text-amber-600 sm:px-6">
                        ⚠ Can camouflage by filling above/below
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Can narrow nostrils
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        ✓ Yes
                      </td>
                      <td className="px-4 py-4 text-sm text-red-600 sm:px-6">
                        ✗ No
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Can fix breathing
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-green-600 sm:px-6">
                        ✓ Yes (septorhinoplasty)
                      </td>
                      <td className="px-4 py-4 text-sm text-red-600 sm:px-6">
                        ✗ No
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Recovery
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        7–14 days off work
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Same day, minimal swelling
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Cost (UK)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £6,500–£15,000
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £400–£800 per session
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Cost abroad
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        £2,000–£9,000
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Not typically offered as medical tourism
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Non-surgical &quot;liquid&quot; nose jobs are ideal for patients
                wanting minor corrections (small hump camouflage, slight tip
                refinement) without surgery or as a &quot;trial run&quot; before
                committing to surgical rhinoplasty. However, they cannot reduce
                nose size, narrow nostrils, fix breathing problems, or provide
                permanent results.
              </p>
              <p>
                Patients seeking significant structural change need surgical
                rhinoplasty. Non-surgical options are not typically offered as
                medical tourism packages because repeat treatments are needed
                every 6–18 months.
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
              Frequently Asked Questions About Rhinoplasty Abroad
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
              Get Your Free Rhinoplasty Quote
            </m.h2>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-2xl text-rose-100"
            >
              Compare prices and surgeons across Turkey, Spain, Hungary, and
              Poland. Receive personalised treatment plans from board-certified
              rhinoplasty specialists — no obligation.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/clinics?procedure=rhinoplasty"
                className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-rose-600 shadow-lg transition-all hover:bg-rose-50 sm:w-auto"
              >
                Compare Rhinoplasty Surgeons Abroad
              </Link>
              <Link
                href="/enquiry?procedure=rhinoplasty"
                className="w-full rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-rose-700 sm:w-auto"
              >
                Get Free Clinic Recommendations
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-6 text-sm text-rose-200">
              Board-certified surgeons • JCI & EU-accredited hospitals • 40–70%
              savings vs UK
            </m.p>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
