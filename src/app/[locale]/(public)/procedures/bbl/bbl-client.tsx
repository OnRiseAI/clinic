'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { AlertTriangle, CheckCircle, Shield, Clock, Syringe } from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

interface FAQ {
  question: string
  answer: string
}

interface BBLClientProps {
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
// STATIC DATA
// =============================================================================

const DESTINATIONS = [
  {
    country: 'Turkey',
    slug: 'turkey',
    flag: '🇹🇷',
    priceRange: '£2,800–£5,000',
    hospitals: '50+ clinics',
    highlight: 'Highest volume, lowest prices',
    features: ['All-inclusive packages', 'JCI-accredited hospitals', 'Experienced BBL surgeons'],
  },
  {
    country: 'Poland',
    slug: 'poland',
    flag: '🇵🇱',
    priceRange: '£3,500–£5,500',
    hospitals: '20+ clinics',
    highlight: 'EU standards, natural results',
    features: ['EU patient protections', 'Conservative approach', 'Short flights'],
  },
  {
    country: 'Spain',
    slug: 'spain',
    flag: '🇪🇸',
    priceRange: '£4,500–£6,500',
    hospitals: '30+ clinics',
    highlight: 'Premium quality',
    features: ['World-class surgeons', '#1 healthcare system', 'Luxury recovery'],
  },
  {
    country: 'Hungary',
    slug: 'hungary',
    flag: '🇭🇺',
    priceRange: '£3,200–£5,000',
    hospitals: '15+ clinics',
    highlight: 'EU quality, good value',
    features: ['EU member', 'Thermal spa recovery', 'Growing expertise'],
  },
]

const PRICE_COMPARISON = [
  { destination: 'Turkey', price: '£2,800–£5,000', savings: '60–70%' },
  { destination: 'Poland', price: '£3,500–£5,500', savings: '50–60%' },
  { destination: 'Hungary', price: '£3,200–£5,000', savings: '55–65%' },
  { destination: 'Spain', price: '£4,500–£6,500', savings: '40–50%' },
  { destination: 'UK', price: '£8,000–£12,000', savings: '—' },
]

const SAFETY_PROTOCOLS = [
  {
    title: 'Subcutaneous injection only',
    description: 'Fat must be injected into subcutaneous tissue, never into or beneath the gluteal muscle. This is the #1 safety factor.',
  },
  {
    title: 'Ultrasound guidance',
    description: 'Leading surgeons use ultrasound to visualise cannula placement in real-time, ensuring fat goes into safe tissue layers.',
  },
  {
    title: 'Volume limits',
    description: 'Safe surgeons limit total fat injected (typically 400–800cc per side) rather than chasing maximum volume.',
  },
  {
    title: 'Experienced surgeon',
    description: 'Choose surgeons with 100+ BBL procedures annually. BBL-specific experience matters more than general plastic surgery experience.',
  },
  {
    title: 'Accredited facility',
    description: 'JCI, ISO, or equivalent accreditation ensures proper emergency protocols and equipment are in place.',
  },
  {
    title: 'Post-op monitoring',
    description: 'Overnight hospital stay and 24-hour monitoring for the first night reduces risk of undetected complications.',
  },
]

const RECOVERY_TIMELINE = [
  { period: 'Days 1–3', activity: 'Rest, no sitting on buttocks, sleep on stomach or side' },
  { period: 'Days 4–7', activity: 'Light walking, use BBL pillow for any sitting, swelling peaks' },
  { period: 'Week 2', activity: 'More movement, still no direct sitting, may fly home with BBL pillow' },
  { period: 'Weeks 3–4', activity: 'Can sit with pillow, return to desk work, light activities' },
  { period: 'Weeks 6–8', activity: 'Normal sitting resumes, light exercise, compression garment optional' },
  { period: 'Months 3–6', activity: 'Final results visible, fat stabilised, full exercise permitted' },
]

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function BBLClient({ faqs }: BBLClientProps) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-fuchsia-50 to-white py-12 sm:py-16 lg:py-20">
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
              BBL Abroad: Brazilian Butt Lift Prices, Safety & Top Clinics
            </m.h1>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl"
            >
              Save 50–70% on Brazilian Butt Lift at accredited international clinics.
              Compare prices, safety protocols, and verified surgeons across Turkey,
              Poland, Spain, and Hungary.
            </m.p>

            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/search?procedure=bbl"
                className="rounded-lg bg-fuchsia-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-fuchsia-700 hover:shadow-xl"
              >
                Compare BBL Clinics →
              </Link>
            </m.div>

            <m.p variants={fadeInUp} className="mt-4 text-sm text-slate-500">
              Safety-focused clinics • Board-certified surgeons • Fat transfer specialists
            </m.p>

            {/* Hero Stats */}
            <m.div
              variants={fadeInUp}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
            >
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-fuchsia-600">From £2,800</p>
                <p className="mt-1 text-slate-600">All-inclusive packages</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-fuchsia-600">50–70%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-fuchsia-600">4 Destinations</p>
                <p className="mt-1 text-slate-600">100+ verified clinics</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* What Is BBL Section */}
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
              What Is a Brazilian Butt Lift (BBL)?
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-6 space-y-4 text-slate-600"
              data-aeo="bbl-definition"
            >
              <p>
                A Brazilian Butt Lift (BBL) is a fat transfer procedure that enhances
                the size and shape of the buttocks using your own body fat. Unlike
                implants, BBL uses natural tissue harvested from your own body,
                resulting in a more natural look and feel.
              </p>

              <p>
                The procedure involves two stages: first, <Link href="/procedures/liposuction" className="text-fuchsia-600 hover:underline">liposuction</Link> is
                performed to harvest fat from donor areas — typically the abdomen,
                flanks, back, or thighs. This fat is then purified and strategically
                injected into the buttocks to create the desired shape and volume.
              </p>

              <p>
                BBL has grown significantly in popularity, becoming one of the
                fastest-growing cosmetic procedures globally. According to ISAPS,
                BBL procedures increased by over 77% between 2015 and 2020. The
                appeal is the dual benefit: slimming donor areas while enhancing
                the buttocks, creating an overall improved body contour.
              </p>

              <p>
                Important: BBL requires sufficient donor fat. Patients typically need
                a BMI of 22 or higher to have enough harvestable fat. If you have
                very low body fat, buttock implants may be a better option.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Safety Section - Critical for BBL */}
      <section className="bg-amber-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-amber-600" />
              <m.h2
                variants={fadeInUp}
                className="text-2xl font-bold text-slate-900 sm:text-3xl"
              >
                BBL Safety: What You Must Know
              </m.h2>
            </div>

            <m.div variants={fadeInUp} className="mt-6">
              <div className="rounded-xl border border-amber-200 bg-white p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-1 h-6 w-6 flex-shrink-0 text-amber-600" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Understanding BBL Risks</h3>
                    <p className="mt-2 text-slate-600">
                      BBL has historically carried higher risks than other cosmetic procedures
                      due to the potential for fat embolism — where fat enters blood vessels
                      and travels to the lungs. However, modern safety protocols have
                      dramatically reduced this risk. A 2023 study showed mortality rates
                      dropped from 1 in 3,000 to approximately 1 in 15,000 with proper technique.
                    </p>
                    <p className="mt-2 text-slate-600">
                      <strong>The key safety factor is injection technique.</strong> Fat must
                      be injected into subcutaneous tissue only — never into or beneath the
                      gluteal muscle where large blood vessels are located. Surgeons following
                      ISAPS and multi-society safety guidelines inject superficially with
                      ultrasound guidance.
                    </p>
                  </div>
                </div>
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8">
              <h3 className="text-xl font-semibold text-slate-900">
                Essential Safety Protocols to Verify
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {SAFETY_PROTOCOLS.map((protocol, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-amber-100 bg-white p-4"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h4 className="font-medium text-slate-900">{protocol.title}</h4>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{protocol.description}</p>
                  </div>
                ))}
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 rounded-xl bg-red-50 border border-red-200 p-6">
              <h3 className="font-semibold text-red-900">Questions to Ask Your Surgeon</h3>
              <ul className="mt-3 space-y-2 text-sm text-red-800">
                <li>• "Do you inject fat subcutaneously only, never into the muscle?"</li>
                <li>• "Do you use ultrasound guidance during injection?"</li>
                <li>• "What is your BBL complication rate?"</li>
                <li>• "How many BBLs do you perform annually?"</li>
                <li>• "What emergency protocols are in place?"</li>
              </ul>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Destinations Comparison */}
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
              BBL by Destination: Compare Prices & Clinics
            </m.h2>

            <m.div
              variants={fadeInUp}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {DESTINATIONS.map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/procedures/bbl/${dest.slug}`}
                  className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-fuchsia-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{dest.flag}</span>
                    <div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-fuchsia-600">
                        {dest.country}
                      </h3>
                      <p className="text-sm text-slate-500">{dest.hospitals}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-2xl font-bold text-fuchsia-600">
                    {dest.priceRange}
                  </p>
                  <p className="text-sm text-slate-500">{dest.highlight}</p>

                  <ul className="mt-4 space-y-1">
                    {dest.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-4 inline-block text-sm font-medium text-fuchsia-600">
                    View BBL clinics in {dest.country} →
                  </span>
                </Link>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Price Comparison Table */}
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
              BBL Cost Comparison: Abroad vs UK
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 rounded-lg bg-white shadow">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Destination
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      BBL Price (All-Inclusive)
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Savings vs UK
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {PRICE_COMPARISON.map((row, index) => (
                    <tr key={index} className={row.destination === 'UK' ? 'bg-slate-50' : ''}>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {row.destination}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{row.price}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600">
                        {row.savings}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </m.div>

            <m.p variants={fadeInUp} className="mt-4 text-sm text-slate-500">
              Prices are indicative for standard BBL procedures. Final cost depends on
              fat volume transferred, surgeon experience, and facility. All-inclusive
              packages typically include surgery, hospital stay, hotel, transfers,
              compression garments, and aftercare.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Recovery Timeline */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-fuchsia-600" />
              <m.h2
                variants={fadeInUp}
                className="text-2xl font-bold text-slate-900 sm:text-3xl"
              >
                BBL Recovery Timeline
              </m.h2>
            </div>

            <m.div variants={fadeInUp} className="mt-8">
              <div className="space-y-4">
                {RECOVERY_TIMELINE.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4"
                  >
                    <div className="flex h-10 w-24 flex-shrink-0 items-center justify-center rounded-lg bg-fuchsia-100 text-sm font-semibold text-fuchsia-700">
                      {item.period}
                    </div>
                    <p className="text-slate-600">{item.activity}</p>
                  </div>
                ))}
              </div>
            </m.div>

            <m.div variants={fadeInUp} className="mt-8 rounded-xl bg-fuchsia-50 border border-fuchsia-100 p-6">
              <h3 className="font-semibold text-fuchsia-900">BBL Pillow: Essential for Recovery</h3>
              <p className="mt-2 text-sm text-fuchsia-800">
                A BBL pillow (or nursing pillow) is essential for sitting during recovery.
                It allows you to sit on your thighs rather than your buttocks, protecting
                the transferred fat. Most clinics provide one, but you'll need it for
                the flight home and for several weeks after.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Combination Procedures */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="flex items-center gap-3">
              <Syringe className="h-8 w-8 text-fuchsia-600" />
              <m.h2
                variants={fadeInUp}
                className="text-2xl font-bold text-slate-900 sm:text-3xl"
              >
                BBL Combination Procedures
              </m.h2>
            </div>

            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">BBL + Tummy Tuck</h3>
                <p className="mt-2 text-sm text-slate-600">
                  "Mummy makeover" combining fat transfer to buttocks with abdominal
                  contouring. Extended recovery (14+ days abroad) but comprehensive results.
                </p>
                <p className="mt-3 text-fuchsia-600 font-medium">From £4,500 abroad</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">BBL + Lipo 360</h3>
                <p className="mt-2 text-sm text-slate-600">
                  BBL inherently includes liposuction. Lipo 360 harvests fat from
                  the entire torso (abdomen, flanks, back) for maximum donor fat and
                  balanced body contouring.
                </p>
                <p className="mt-3 text-fuchsia-600 font-medium">From £3,200 abroad</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">BBL + Breast Surgery</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Some patients combine BBL with breast augmentation or fat transfer
                  to breasts. Requires careful surgical planning and extended recovery.
                </p>
                <p className="mt-3 text-fuchsia-600 font-medium">From £5,000 abroad</p>
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
              Frequently Asked Questions About BBL Abroad
            </m.h2>

            <m.div variants={fadeInUp} className="mt-8 space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-lg border border-slate-200 bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-slate-900">
                    {faq.question}
                    <span className="ml-2 transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <div className="border-t border-slate-100 p-4 text-slate-600">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-800 py-12 sm:py-16 lg:py-20">
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
              Ready to Compare BBL Clinics?
            </m.h2>
            <m.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-2xl text-fuchsia-100"
            >
              Browse verified BBL clinics with safety-focused protocols, experienced
              surgeons, and transparent pricing. Free consultation matching included.
            </m.p>
            <m.div variants={fadeInUp} className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/search?procedure=bbl"
                className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-fuchsia-600 shadow-lg transition-all hover:bg-fuchsia-50"
              >
                Compare BBL Clinics
              </Link>
              <Link
                href="/procedures/liposuction"
                className="rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10"
              >
                Learn About Liposuction
              </Link>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-600">
            <strong>BBL by destination:</strong>{' '}
            <Link href="/procedures/bbl/turkey" className="text-fuchsia-600 hover:underline">Turkey</Link> ·{' '}
            <Link href="/procedures/bbl/poland" className="text-fuchsia-600 hover:underline">Poland</Link> ·{' '}
            <Link href="/procedures/bbl/spain" className="text-fuchsia-600 hover:underline">Spain</Link> ·{' '}
            <Link href="/procedures/bbl/hungary" className="text-fuchsia-600 hover:underline">Hungary</Link>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Related procedures:</strong>{' '}
            <Link href="/procedures/liposuction" className="text-fuchsia-600 hover:underline">Liposuction</Link> ·{' '}
            <Link href="/procedures/tummy-tuck" className="text-fuchsia-600 hover:underline">Tummy Tuck</Link> ·{' '}
            <Link href="/cosmetic-surgery" className="text-fuchsia-600 hover:underline">All Cosmetic Surgery</Link>
          </p>
        </div>
      </section>
    </LazyMotion>
  )
}
