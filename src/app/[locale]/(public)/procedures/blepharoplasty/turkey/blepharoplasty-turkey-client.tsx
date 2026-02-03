'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Shield, Clock, MapPin, Package, Eye } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface BlepharoplastyTurkeyClientProps {
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
  'Blepharoplasty surgery',
  'Local or general anaesthesia',
  'Clinic/hospital stay',
  'Pre-operative tests',
  'Medications and eye drops',
  '3–5 nights hotel',
  'Airport transfers',
  'Patient coordinator',
  'Follow-up appointments',
  'Stitch removal',
]

const PROCEDURES_AVAILABLE = [
  { name: 'Upper Blepharoplasty', price: '£1,200–£1,500', description: 'Removes excess upper eyelid skin' },
  { name: 'Lower Blepharoplasty', price: '£1,500–£2,000', description: 'Addresses under-eye bags' },
  { name: 'Upper & Lower Combined', price: '£2,000–£2,500', description: 'Complete eyelid rejuvenation' },
]

export function BlepharoplastyTurkeyClient({ faqs }: BlepharoplastyTurkeyClientProps) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <m.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <span className="text-5xl">🇹🇷</span>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Blepharoplasty in Turkey
              </h1>
            </m.div>
            <m.p variants={fadeInUp} className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
              Eyelid surgery from £1,200 all-inclusive. JCI-accredited facilities,
              experienced surgeons, quick recovery.
            </m.p>
            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/search?procedure=blepharoplasty&country=turkey"
                className="rounded-lg bg-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-teal-700"
              >
                Compare Clinics in Turkey →
              </Link>
            </m.div>
            <m.div variants={fadeInUp} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-teal-600">£1,200–£2,500</p>
                <p className="mt-1 text-slate-600">All-inclusive packages</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-teal-600">60–70%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-teal-600">40+</p>
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
              Why Choose Turkey for Blepharoplasty?
            </m.h2>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Turkey performs thousands of blepharoplasty procedures annually. This high volume
                means surgeons have extensive experience with all types of eyelid concerns —
                from simple upper lid hooding to complex lower lid reconstruction.
              </p>
              <p>
                Turkish clinics offer exceptional value with all-inclusive packages. The significant
                cost difference — 60–70% less than UK prices — makes this popular procedure even
                more accessible.
              </p>
              <p>
                Blepharoplasty has one of the quickest recoveries of any facial surgery. You can
                fly home within a week, making Turkey particularly practical for this procedure.
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
              <Eye className="h-8 w-8 text-teal-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Blepharoplasty Options in Turkey
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 grid gap-4 sm:grid-cols-3">
              {PROCEDURES_AVAILABLE.map((proc) => (
                <div key={proc.name} className="rounded-xl border border-teal-100 bg-white p-5">
                  <h3 className="font-bold text-slate-900">{proc.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{proc.description}</p>
                  <p className="mt-2 text-lg font-bold text-teal-600">{proc.price}</p>
                </div>
              ))}
            </m.div>
            <m.p variants={fadeInUp} className="mt-6 text-slate-600">
              <strong>Combination options:</strong> Add facelift, brow lift, or rhinoplasty for
              comprehensive facial rejuvenation at reduced combined cost.
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
                Blepharoplasty is performed near the eye and requires precise technique.
                Verify these points when choosing a clinic:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  JCI-accredited facility or equivalent
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Board-certified plastic surgeon or oculoplastic specialist
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Before/after photos of similar cases
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Pre-operative eye examination
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Clear post-operative care instructions
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
              Where to Get Blepharoplasty in Turkey
            </m.h2>
            <m.div variants={fadeInUp} className="mt-8">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-teal-600" />
                  <h3 className="text-xl font-bold text-slate-900">Istanbul</h3>
                </div>
                <p className="mt-2 text-slate-600">
                  Istanbul is the recommended destination for blepharoplasty in Turkey. The city
                  has the largest selection of qualified eyelid surgeons, including oculoplastic
                  specialists who focus exclusively on eye-area procedures.
                </p>
                <p className="mt-2 text-sm font-medium text-teal-600">40+ clinics · 4 hours from London</p>
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
                <span className="font-semibold text-teal-600">Day 1:</span>
                <span className="ml-2 text-slate-600">Surgery (1–2 hours), rest, cold compresses, eyes swollen</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-teal-600">Days 2–3:</span>
                <span className="ml-2 text-slate-600">Peak swelling/bruising, continue compresses, light walking</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-teal-600">Days 5–7:</span>
                <span className="ml-2 text-slate-600">Stitches removed, fit-to-fly clearance, wear sunglasses for travel</span>
              </div>
            </m.div>
            <m.p variants={fadeInUp} className="mt-6 text-slate-600">
              Blepharoplasty has one of the quickest recoveries. Most patients are socially
              presentable within 2 weeks, with makeup helping conceal any residual bruising.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Blepharoplasty in Turkey: FAQs
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
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to Compare Blepharoplasty Clinics in Turkey?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-teal-100">
            Browse verified clinics with experienced eyelid surgeons.
          </p>
          <div className="mt-8">
            <Link
              href="/search?procedure=blepharoplasty&country=turkey"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-teal-600 shadow-lg transition-all hover:bg-teal-50"
            >
              Compare Blepharoplasty Clinics
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-600">
            <strong>Blepharoplasty in other destinations:</strong>{' '}
            <Link href="/procedures/blepharoplasty/poland" className="text-teal-600 hover:underline">Poland</Link> ·{' '}
            <Link href="/procedures/blepharoplasty/spain" className="text-teal-600 hover:underline">Spain</Link> ·{' '}
            <Link href="/procedures/blepharoplasty/hungary" className="text-teal-600 hover:underline">Hungary</Link>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Related:</strong>{' '}
            <Link href="/procedures/blepharoplasty" className="text-teal-600 hover:underline">Blepharoplasty Overview</Link> ·{' '}
            <Link href="/procedures/facelift/turkey" className="text-teal-600 hover:underline">Facelift Turkey</Link> ·{' '}
            <Link href="/destinations/turkey" className="text-teal-600 hover:underline">Turkey Guide</Link>
          </p>
        </div>
      </section>
    </LazyMotion>
  )
}
