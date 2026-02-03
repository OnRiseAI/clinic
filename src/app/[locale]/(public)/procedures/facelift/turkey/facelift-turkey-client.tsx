'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Shield, Clock, MapPin, Package, User } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface FaceliftTurkeyClientProps {
  faqs: FAQ[]
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const PACKAGE_INCLUSIONS = [
  'Facelift surgery',
  'General anaesthesia',
  'Hospital stay (1–2 nights)',
  'Pre-operative tests',
  'Medications and dressings',
  'Compression garment',
  '7–10 nights hotel',
  'Airport transfers',
  'Patient coordinator',
  'Follow-up appointments',
  'Stitch removal',
]

const PROCEDURES_AVAILABLE = [
  { name: 'Full Facelift', price: '£4,500–£5,500', description: 'Comprehensive face and neck rejuvenation' },
  { name: 'Mini Facelift', price: '£3,000–£4,000', description: 'Lower face focus, shorter recovery' },
  { name: 'Neck Lift', price: '£2,500–£3,500', description: 'Addresses neck bands and sagging' },
  { name: 'Deep Plane Facelift', price: '£5,000–£6,500', description: 'Advanced technique, longer-lasting' },
]

export function FaceliftTurkeyClient({ faqs }: FaceliftTurkeyClientProps) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <m.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <span className="text-5xl">🇹🇷</span>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Facelift in Turkey
              </h1>
            </m.div>
            <m.p variants={fadeInUp} className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
              Facelift surgery from £3,000 all-inclusive. JCI-accredited hospitals,
              experienced facial surgeons, comprehensive packages.
            </m.p>
            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/search?procedure=facelift&country=turkey"
                className="rounded-lg bg-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-teal-700"
              >
                Compare Clinics in Turkey →
              </Link>
            </m.div>
            <m.div variants={fadeInUp} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-teal-600">£3,000–£5,500</p>
                <p className="mt-1 text-slate-600">All-inclusive packages</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-teal-600">60–70%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-teal-600">30+</p>
                <p className="mt-1 text-slate-600">Verified clinics</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Why Turkey */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Why Choose Turkey for Facelift?
            </m.h2>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Turkey has become a major destination for facial rejuvenation surgery. Leading
                surgeons have trained internationally and bring world-class expertise to Istanbul's
                JCI-accredited hospitals.
              </p>
              <p>
                The significant cost difference — 60–70% less than UK prices — makes comprehensive
                facial rejuvenation accessible. All-inclusive packages simplify the process: surgery,
                hospital stay, accommodation, and aftercare bundled together.
              </p>
              <p>
                <strong>Important:</strong> Facelift requires more expertise than many procedures.
                Carefully verify your surgeon's specific facial surgery experience and ask to see
                before/after photos of patients similar to you.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Procedures Available */}
      <section className="bg-teal-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-teal-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Facelift Options in Turkey
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 grid gap-4 sm:grid-cols-2">
              {PROCEDURES_AVAILABLE.map((proc) => (
                <div key={proc.name} className="rounded-xl border border-teal-100 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">{proc.name}</h3>
                    <span className="font-bold text-teal-600">{proc.price}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{proc.description}</p>
                </div>
              ))}
            </m.div>
            <m.p variants={fadeInUp} className="mt-6 text-slate-600">
              <strong>Combination procedures:</strong> Add blepharoplasty (£1,500–£2,500), brow lift
              (£2,000–£3,000), or fat transfer (£1,500–£2,500) for comprehensive rejuvenation.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Package Inclusions */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-teal-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                What's Included
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PACKAGE_INCLUSIONS.map((item, index) => (
                <div key={index} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </m.div>
            <m.p variants={fadeInUp} className="mt-4 text-sm text-slate-500">
              International flights typically not included. Always confirm exact inclusions before booking.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Safety */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-teal-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Safety Standards
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Facelift is a technically demanding procedure. The face has complex anatomy with
                important nerves and blood vessels. Choose your surgeon carefully:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  JCI-accredited hospital or surgical facility
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Board-certified plastic surgeon specialising in facial surgery
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Before/after photos of similar age patients
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Minimum 50+ facelifts performed annually
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Clear explanation of technique and expected results
                </li>
              </ul>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Where to Get Facelift in Turkey
            </m.h2>
            <m.div variants={fadeInUp} className="mt-8">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-teal-600" />
                  <h3 className="text-xl font-bold text-slate-900">Istanbul</h3>
                </div>
                <p className="mt-2 text-slate-600">
                  Istanbul is the recommended destination for facelift in Turkey. The city has the
                  largest selection of qualified facial plastic surgeons and JCI-accredited hospitals.
                  For facial procedures requiring precise technique, having more specialist options
                  is valuable.
                </p>
                <p className="mt-2 text-sm font-medium text-teal-600">30+ clinics · 4 hours from London</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Recovery */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-teal-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Recovery Timeline in Turkey
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 space-y-4">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-teal-600">Days 1–3:</span>
                <span className="ml-2 text-slate-600">Hospital then hotel, maximum swelling/bruising, head elevated</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-teal-600">Days 4–7:</span>
                <span className="ml-2 text-slate-600">Swelling begins to subside, light walking, drains removed if used</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-teal-600">Days 7–10:</span>
                <span className="ml-2 text-slate-600">Stitches removed, bruising fading, fit-to-fly assessment</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-teal-600">Days 10–14:</span>
                <span className="ml-2 text-slate-600">Final check-up, fly home with aftercare instructions</span>
              </div>
            </m.div>
            <m.p variants={fadeInUp} className="mt-6 text-slate-600">
              Facelift recovery is more visible than other procedures. Plan for 2–3 weeks before
              being socially presentable. Bruising can be covered with makeup after stitches are removed.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Facelift in Turkey: FAQs
            </m.h2>
            <m.div variants={fadeInUp} className="mt-8 space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group rounded-lg border border-slate-200 bg-white">
                  <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-slate-900">
                    {faq.question}
                    <span className="ml-2 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <div className="border-t border-slate-100 p-4 text-slate-600">{faq.answer}</div>
                </details>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-800 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to Compare Facelift Clinics in Turkey?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-teal-100">
            Browse verified clinics with experienced facial surgeons.
          </p>
          <div className="mt-8">
            <Link
              href="/search?procedure=facelift&country=turkey"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-teal-600 shadow-lg transition-all hover:bg-teal-50"
            >
              Compare Facelift Clinics
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-600">
            <strong>Facelift in other destinations:</strong>{' '}
            <Link href="/procedures/facelift/poland" className="text-teal-600 hover:underline">Poland</Link> ·{' '}
            <Link href="/procedures/facelift/spain" className="text-teal-600 hover:underline">Spain</Link> ·{' '}
            <Link href="/procedures/facelift/hungary" className="text-teal-600 hover:underline">Hungary</Link>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Related:</strong>{' '}
            <Link href="/procedures/facelift" className="text-teal-600 hover:underline">Facelift Overview</Link> ·{' '}
            <Link href="/procedures/blepharoplasty/turkey" className="text-teal-600 hover:underline">Eyelid Surgery Turkey</Link> ·{' '}
            <Link href="/destinations/turkey" className="text-teal-600 hover:underline">Turkey Guide</Link>
          </p>
        </div>
      </section>
    </LazyMotion>
  )
}
