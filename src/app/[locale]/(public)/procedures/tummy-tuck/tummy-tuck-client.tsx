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

interface TummyTuckClientProps {
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

export function TummyTuckClient({ faqs }: TummyTuckClientProps) {
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
            <m.div variants={fadeInUp} className="flex flex-col items-center justify-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 overflow-hidden rounded-sm shadow-sm">
                  <TR title="Turkey" />
                </div>
                <div className="w-8 overflow-hidden rounded-sm shadow-sm">
                  <HU title="Hungary" />
                </div>
                <div className="w-8 overflow-hidden rounded-sm shadow-sm">
                  <PL title="Poland" />
                </div>
                <div className="w-8 overflow-hidden rounded-sm shadow-sm">
                  <ES title="Spain" />
                </div>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Tummy Tuck Abroad
              </h1>
            </m.div>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl"
            >
              Save 40–70% on abdominoplasty at accredited international clinics.
              Compare real prices across Turkey, Hungary, Poland, and Spain —
              with verified surgeons, recovery support, and all-inclusive
              packages.
            </m.p>

            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/clinics?procedure=tummy-tuck"
                className="rounded-lg bg-rose-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-rose-700 hover:shadow-xl"
              >
                Compare Tummy Tuck Clinics →
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
                <p className="text-3xl font-bold text-rose-600">From £1,750</p>
                <p className="mt-1 text-slate-600">All-inclusive packages</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">40–70%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">4 Countries</p>
                <p className="mt-1 text-slate-600">500+ verified clinics</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* What Is a Tummy Tuck Section */}
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
              What Is a Tummy Tuck (Abdominoplasty)?
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-6 space-y-4 text-slate-600"
              data-aeo="tummy-tuck-definition"
            >
              <p>
                Abdominoplasty — commonly known as a tummy tuck — removes excess
                skin and fat from the abdominal area, tightens weakened or
                separated abdominal muscles (diastasis recti), and creates a
                flatter, firmer profile. According to the International Society
                of Aesthetic Plastic Surgery (ISAPS), it ranks among the most
                commonly performed{' '}
                <Link
                  href="/cosmetic-surgery"
                  className="text-rose-600 hover:underline"
                >
                  cosmetic surgery
                </Link>{' '}
                procedures worldwide.
              </p>

              <p>
                The procedure is particularly suited for post-pregnancy patients
                dealing with &ldquo;mum tummy,&rdquo; those who have undergone
                significant weight loss, and anyone with excess abdominal skin
                that doesn&apos;t respond to diet or exercise. It&apos;s
                important to understand that a tummy tuck is not a weight loss
                procedure — best results are achieved when patients are close to
                their target weight.
              </p>

              <p>
                There are several types of tummy tuck to suit different needs: a
                full abdominoplasty with hip-to-hip incision and navel
                repositioning; a mini tummy tuck targeting only the area below
                the navel; an extended tummy tuck that wraps around the flanks;
                a fleur-de-lis for massive weight loss patients; and a 360 tummy
                tuck or body lift for comprehensive contouring.
              </p>

              <p>
                Many patients combine their tummy tuck with liposuction to
                contour the waist and flanks — this is the most popular
                combination. Others opt for a &ldquo;mummy makeover&rdquo;
                combining tummy tuck with breast lift or augmentation. The
                British Association of Aesthetic Plastic Surgeons (BAAPS)
                reports consistent demand for these combination procedures among
                UK patients.
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
              How Much Does a Tummy Tuck Cost Abroad?
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="tummy-tuck-abroad-cost"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Tummy Tuck Prices by Country
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Destination
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Standard
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Mini
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sm:px-6">
                        Extended / 360
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
                            href="/procedures/tummy-tuck/turkey"
                            className="text-rose-600 hover:underline"
                          >
                            Turkey
                          </Link>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £2,900–£4,200
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £2,500–£3,800
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,800–£5,500
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-5 overflow-hidden rounded-sm shadow-sm">
                            <HU title="Hungary" />
                          </div>
                          <Link
                            href="/procedures/tummy-tuck/hungary"
                            className="text-rose-600 hover:underline"
                          >
                            Hungary
                          </Link>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £1,750–£3,600
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        From £2,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,000–£5,000
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-5 overflow-hidden rounded-sm shadow-sm">
                            <PL title="Poland" />
                          </div>
                          <Link
                            href="/procedures/tummy-tuck/poland"
                            className="text-rose-600 hover:underline"
                          >
                            Poland
                          </Link>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £2,370–£4,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £2,000–£3,500
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,500–£5,300
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-5 overflow-hidden rounded-sm shadow-sm">
                            <ES title="Spain" />
                          </div>
                          <Link
                            href="/procedures/tummy-tuck/spain"
                            className="text-rose-600 hover:underline"
                          >
                            Spain
                          </Link>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £3,000–£7,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £2,500–£5,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        £5,000–£9,000
                      </td>
                    </tr>
                    <tr className="bg-rose-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-900 sm:px-6">
                        UK (private)
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        £4,500–£10,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        £3,500–£6,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        £7,000–£12,000+
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500 sm:px-6">
                        US
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500 sm:px-6">
                        £5,600–£14,400
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500 sm:px-6">
                        £4,000–£8,000
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500 sm:px-6">
                        £8,000–£16,000+
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
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Surgery</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Surgeon&apos;s fee, anaesthesia, hospital stay (1–2 nights)
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
                    Compression garment, follow-up appointments
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">Logistics</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Hotel (5–7 nights), airport/clinic transfers, coordinator
                  </p>
                </div>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                Pricing varies based on the type of tummy tuck, whether
                you&apos;re combining procedures (liposuction is common), the
                surgeon&apos;s experience and accreditation, hospital tier, and
                length of stay. All-inclusive packages are standard practice
                abroad and typically offer better value than booking separately.
              </p>

              <p>
                Hungary offers the lowest starting prices in Europe, while
                Turkey provides the most comprehensive packages with the largest
                clinic selection. Spain commands premium prices but offers
                established EU healthcare infrastructure. Poland sits in the
                middle with strong EU regulation and competitive pricing.
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
              Best Countries for a Tummy Tuck Abroad
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
                    <p className="text-sm text-slate-500">
                      Istanbul & Antalya
                    </p>
                  </div>
                  <div className="w-8 overflow-hidden rounded-sm">
                    <TR title="Turkey" />
                  </div>
                </div>
                <p className="mt-2 text-lg font-medium text-rose-600">
                  £2,900–£4,200
                </p>
                <p className="mt-3 text-slate-600">
                  Largest medical tourism volume globally for cosmetic surgery.
                  425+ clinics offering abdominoplasty. JCI-accredited
                  hospitals. Ultra-competitive pricing with the most
                  comprehensive all-inclusive packages.
                </p>
                <div className="mt-4 space-y-1 text-sm text-slate-500">
                  <p>
                    <strong>Best for:</strong> Maximum savings, all-inclusive
                    packages
                  </p>
                  <p>
                    <strong>Flight:</strong> 3.5–4 hours from London
                  </p>
                </div>
                <Link
                  href="/procedures/tummy-tuck/turkey"
                  className="mt-4 inline-flex items-center text-rose-600 hover:underline"
                >
                  View Tummy Tuck Clinics in Turkey →
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
                  £1,750–£3,600
                </p>
                <p className="mt-3 text-slate-600">
                  Lowest starting prices in Europe. Budapest-centric with 60
                  clinics offering tummy tuck. EU-regulated. Strong medical
                  education tradition. Complication rates as low as 3.1%
                  reported.
                </p>
                <div className="mt-4 space-y-1 text-sm text-slate-500">
                  <p>
                    <strong>Best for:</strong> Budget-conscious, EU protections
                  </p>
                  <p>
                    <strong>Flight:</strong> 2.5 hours from London
                  </p>
                </div>
                <Link
                  href="/procedures/tummy-tuck/hungary"
                  className="mt-4 inline-flex items-center text-rose-600 hover:underline"
                >
                  View Tummy Tuck Clinics in Hungary →
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
                  £2,370–£4,500
                </p>
                <p className="mt-3 text-slate-600">
                  EU-regulated with a growing medical tourism sector (20% annual
                  growth). ISO 9001 and ESPRAS-accredited clinics. Strong
                  surgeon training pipeline with international credentials.
                </p>
                <div className="mt-4 space-y-1 text-sm text-slate-500">
                  <p>
                    <strong>Best for:</strong> EU protections, close to UK
                  </p>
                  <p>
                    <strong>Flight:</strong> 2–2.5 hours from London
                  </p>
                </div>
                <Link
                  href="/procedures/tummy-tuck/poland"
                  className="mt-4 inline-flex items-center text-rose-600 hover:underline"
                >
                  View Tummy Tuck Clinics in Poland →
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
                  £3,000–£7,000
                </p>
                <p className="mt-3 text-slate-600">
                  Ranked #1 healthiest nation globally. 900 plastic surgeons
                  performing 450,000 procedures annually. EU-regulated with
                  SECPRE (Spanish Society of Plastic Surgery) oversight.
                </p>
                <div className="mt-4 space-y-1 text-sm text-slate-500">
                  <p>
                    <strong>Best for:</strong> Premium quality, established EU
                    healthcare
                  </p>
                  <p>
                    <strong>Flight:</strong> 2–2.5 hours from London
                  </p>
                </div>
                <Link
                  href="/procedures/tummy-tuck/spain"
                  className="mt-4 inline-flex items-center text-rose-600 hover:underline"
                >
                  View Tummy Tuck Clinics in Spain →
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
              Tummy Tuck Recovery: What to Expect
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8"
              data-aeo="tummy-tuck-recovery-timeline"
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
                        Hospital stay
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        1–2 nights
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Monitored in hospital, IV antibiotics, catheter, drain
                        management
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Drains removed
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Days 3–5
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Drains removed at follow-up. Compression garment fitted.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Fit to fly
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-rose-600 sm:px-6">
                        Day 6–9 (median 7)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Most patients cleared after 7 days. Short-haul preferred.
                        Compression stockings required.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Desk work
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        10–14 days
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Light duties only. No lifting over 5kg.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Light exercise
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        3–4 weeks
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Walking, gentle stretching. No core-intensive exercise.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Manual work
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        4–6 weeks
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Surgeon clearance required before returning.
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                        Full recovery
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                        3–6 months
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        Scars fade over 12–18 months. Final results at 6 months.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 space-y-4 text-slate-600">
              <p>
                Following your surgeon&apos;s post-operative instructions is
                critical. You&apos;ll need to wear your compression garment for
                6–8 weeks, sleep in an elevated position for the first 2 weeks,
                avoid direct sun exposure on scars, and arrange care at home for
                the first week after returning to the UK.
              </p>

              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="font-semibold text-slate-900">
                  Recommended Trip Length by Destination
                </h3>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  <li>
                    <strong>Turkey:</strong> 7–10 days (8-day typical)
                  </li>
                  <li>
                    <strong>Hungary:</strong> 7–10 days
                  </li>
                  <li>
                    <strong>Poland:</strong> 10–15 days
                  </li>
                  <li>
                    <strong>Spain:</strong> 7–14 days
                  </li>
                </ul>
              </div>
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
              How to Choose a Tummy Tuck Surgeon Abroad
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
                        ISAPS membership, EBOPRAS, or equivalent national board
                        (SECPRE in Spain, Polish Society of Plastic Surgery)
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
                        JCI, ISO 9001, or equivalent national accreditation
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
                        Real patient photos, not stock images. Ask for cases
                        similar to your body type.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600">✓</span>
                    <div>
                      <p className="font-medium text-slate-900">
                        Specialisation
                      </p>
                      <p className="text-sm text-slate-600">
                        Choose a surgeon who performs 100+ tummy tucks per year,
                        not a generalist
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600">✓</span>
                    <div>
                      <p className="font-medium text-slate-900">
                        Consultation process
                      </p>
                      <p className="text-sm text-slate-600">
                        Reputable surgeons review your medical history and
                        photos BEFORE quoting
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600">✓</span>
                    <div>
                      <p className="font-medium text-slate-900">Aftercare</p>
                      <p className="text-sm text-slate-600">
                        Remote follow-up protocols and UK partner clinics for
                        complications
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
                      Prices significantly below market rate (could indicate
                      corner-cutting)
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600">✗</span>
                    <p className="text-slate-600">
                      Pressure to book quickly or &ldquo;limited time&rdquo;
                      offers
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600">✗</span>
                    <p className="text-slate-600">
                      No consultation before providing a quote
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600">✗</span>
                    <p className="text-slate-600">
                      No before/after photos or only stock imagery
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600">✗</span>
                    <p className="text-slate-600">
                      No clear information about the surgeon&apos;s
                      qualifications
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600">✗</span>
                    <p className="text-slate-600">
                      Guarantees of specific results
                    </p>
                  </li>
                </ul>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Types of Tummy Tuck Section */}
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
              Types of Tummy Tuck: Which One Is Right for You?
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Full Abdominoplasty
                </h3>
                <p className="mt-1 text-sm text-rose-600">Most common</p>
                <p className="mt-3 text-slate-600">
                  Hip-to-hip incision below bikini line. Navel repositioning.
                  Removes excess skin and fat from entire abdomen. Tightens all
                  abdominal muscles.
                </p>
                <div className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-500">
                  <p>
                    <strong>Best for:</strong> Post-pregnancy, significant
                    weight loss, large amount of excess skin
                  </p>
                  <p className="mt-1">
                    <strong>Recovery:</strong> 2–4 weeks off work
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Mini Tummy Tuck
                </h3>
                <p className="mt-1 text-sm text-rose-600">20–30% less cost</p>
                <p className="mt-3 text-slate-600">
                  Smaller incision. Only targets the area below the navel. No
                  navel repositioning required.
                </p>
                <div className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-500">
                  <p>
                    <strong>Best for:</strong> Small amount of lower belly skin,
                    minimal muscle separation
                  </p>
                  <p className="mt-1">
                    <strong>Recovery:</strong> 1–2 weeks off work
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Extended Tummy Tuck
                </h3>
                <p className="mt-1 text-sm text-rose-600">20–40% more cost</p>
                <p className="mt-3 text-slate-600">
                  Full tummy tuck plus flanks and love handles. Incision extends
                  around hips for comprehensive contouring.
                </p>
                <div className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-500">
                  <p>
                    <strong>Best for:</strong> Significant weight loss patients
                    with excess skin wrapping around sides
                  </p>
                  <p className="mt-1">
                    <strong>Recovery:</strong> Similar to full
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Fleur-de-Lis Tummy Tuck
                </h3>
                <p className="mt-1 text-sm text-rose-600">Premium tier</p>
                <p className="mt-3 text-slate-600">
                  Vertical plus horizontal incision (T-shaped). Removes skin
                  both vertically and horizontally. More visible scarring.
                </p>
                <div className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-500">
                  <p>
                    <strong>Best for:</strong> Massive weight loss, bariatric
                    surgery patients
                  </p>
                  <p className="mt-1">
                    <strong>Recovery:</strong> Longer than standard
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  360 Tummy Tuck / Body Lift
                </h3>
                <p className="mt-1 text-sm text-rose-600">Highest tier</p>
                <p className="mt-3 text-slate-600">
                  Circumferential incision around entire torso. Addresses
                  abdomen, flanks, and lower back simultaneously.
                </p>
                <div className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-500">
                  <p>
                    <strong>Best for:</strong> Comprehensive body contouring
                    after extreme weight loss
                  </p>
                  <p className="mt-1">
                    <strong>Recovery:</strong> 4–6 weeks minimum off work
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-100 p-6">
                <div className="text-center">
                  <p className="font-medium text-slate-700">Not sure which type you need?</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Request a free consultation. Surgeons will assess your body
                    and goals to recommend the right procedure.
                  </p>
                  <Link
                    href="/enquiry?procedure=tummy-tuck"
                    className="mt-4 inline-block text-rose-600 hover:underline"
                  >
                    Get Expert Advice →
                  </Link>
                </div>
              </div>
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
              Frequently Asked Questions About Tummy Tuck Abroad
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
              Get Your Free Tummy Tuck Quote
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
                href="/clinics?procedure=tummy-tuck"
                className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-rose-600 shadow-lg transition-all hover:bg-rose-50 sm:w-auto"
              >
                Compare Tummy Tuck Clinics Abroad
              </Link>
              <Link
                href="/enquiry?procedure=tummy-tuck"
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
