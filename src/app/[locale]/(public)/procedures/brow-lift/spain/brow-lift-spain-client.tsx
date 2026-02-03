'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Shield, Clock, MapPin, Package, ArrowUp } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface BrowLiftSpainClientProps {
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
  'Brow lift surgery',
  'General or local anaesthesia',
  'Hospital stay (1 night)',
  'Pre-operative tests',
  'Medications and dressings',
  'Compression headband',
  '5–7 nights hotel',
  'Airport transfers',
  'English-speaking coordinator',
  'Follow-up appointments',
  'Stitch/staple removal',
]

const PROCEDURES_AVAILABLE = [
  { name: 'Endoscopic Brow Lift', price: '£3,500–£4,000', description: 'Minimally invasive, small incisions' },
  { name: 'Coronal Brow Lift', price: '£4,000–£4,500', description: 'Traditional technique, dramatic results' },
  { name: 'Temporal Brow Lift', price: '£3,000–£3,500', description: 'Targets outer brow only' },
  { name: 'Direct Brow Lift', price: '£3,000–£3,500', description: 'Incision above eyebrow' },
]

export function BrowLiftSpainClient({ faqs }: BrowLiftSpainClientProps) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <m.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <span className="text-5xl">🇪🇸</span>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Brow Lift in Spain
              </h1>
            </m.div>
            <m.p variants={fadeInUp} className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
              Premium brow lift surgery from £3,500. Renowned facial surgeons,
              luxury recovery, world-class EU standards.
            </m.p>
            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/search?procedure=brow-lift&country=spain"
                className="rounded-lg bg-amber-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-amber-700"
              >
                Compare Clinics in Spain →
              </Link>
            </m.div>
            <m.div variants={fadeInUp} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-amber-600">£3,500–£4,500</p>
                <p className="mt-1 text-slate-600">All-inclusive packages</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-amber-600">40–50%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-amber-600">2 hours</p>
                <p className="mt-1 text-slate-600">Flight from UK</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Why Spain */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Why Choose Spain for Brow Lift?
            </m.h2>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Spain offers premium cosmetic surgery in a world-class healthcare environment.
                Spanish plastic surgeons are internationally recognised, with many presenting
                at global conferences and contributing to medical research.
              </p>
              <p>
                The Mediterranean climate is ideal for recovery — pleasant weather year-round
                allows gentle outdoor walks and relaxation. Spain's excellent infrastructure
                means comfortable hotels and easy transportation.
              </p>
              <p>
                <strong>Premium experience:</strong> While not the cheapest option, Spain offers
                the highest quality combined with a pleasant recovery environment. Ideal for
                patients prioritising quality and comfort.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Procedures Available */}
      <section className="bg-amber-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <ArrowUp className="h-8 w-8 text-amber-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Brow Lift Options in Spain
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 grid gap-4 sm:grid-cols-2">
              {PROCEDURES_AVAILABLE.map((proc) => (
                <div key={proc.name} className="rounded-xl border border-amber-100 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">{proc.name}</h3>
                    <span className="font-bold text-amber-600">{proc.price}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{proc.description}</p>
                </div>
              ))}
            </m.div>
            <m.p variants={fadeInUp} className="mt-6 text-slate-600">
              <strong>Combination procedures:</strong> Add blepharoplasty (£3,000–£4,000), facelift
              (£5,500–£8,000), or fat transfer (£3,000–£4,000) for comprehensive rejuvenation.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Package Inclusions */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-amber-600" />
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
              <Shield className="h-8 w-8 text-amber-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Safety Standards
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Spain's healthcare system consistently ranks among the best in Europe. When choosing
                a clinic for brow lift:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Premium EU-certified surgical facility
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Board-certified plastic surgeon with facial surgery expertise
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Before/after photos of brow lift patients
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  State-of-the-art endoscopic equipment
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  International patient experience
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
              Where to Get Brow Lift in Spain
            </m.h2>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-amber-600" />
                  <h3 className="text-xl font-bold text-slate-900">Barcelona</h3>
                </div>
                <p className="mt-2 text-slate-600">
                  A top destination for medical tourism with world-renowned surgeons. The
                  Mediterranean city offers an ideal recovery environment with beautiful
                  architecture and pleasant climate.
                </p>
                <p className="mt-2 text-sm font-medium text-amber-600">15+ clinics · 2 hours from London</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-amber-600" />
                  <h3 className="text-xl font-bold text-slate-900">Madrid</h3>
                </div>
                <p className="mt-2 text-slate-600">
                  Spain's capital features prestigious private hospitals and renowned plastic
                  surgeons. Excellent infrastructure and easy access from the UK with frequent
                  flights.
                </p>
                <p className="mt-2 text-sm font-medium text-amber-600">15+ clinics · 2.5 hours from London</p>
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
              <Clock className="h-8 w-8 text-amber-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Recovery Timeline in Spain
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 space-y-4">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-amber-600">Day 1:</span>
                <span className="ml-2 text-slate-600">Surgery and hospital stay, head elevated, compression headband</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-amber-600">Days 2–3:</span>
                <span className="ml-2 text-slate-600">Maximum swelling/bruising, rest at hotel, cold compresses</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-amber-600">Days 4–5:</span>
                <span className="ml-2 text-slate-600">Swelling subsides, gentle walks in pleasant climate</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-amber-600">Days 5–7:</span>
                <span className="ml-2 text-slate-600">Stitches/staples removed, fit-to-fly assessment, fly home</span>
              </div>
            </m.div>
            <m.p variants={fadeInUp} className="mt-6 text-slate-600">
              Spain's Mediterranean climate is ideal for recovery — warm weather allows comfortable
              walks and outdoor relaxation. The pleasant environment can positively impact your
              recovery experience.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Brow Lift in Spain: FAQs
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
      <section className="bg-gradient-to-r from-amber-600 to-amber-800 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to Compare Brow Lift Clinics in Spain?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-amber-100">
            Browse verified clinics with renowned facial surgeons.
          </p>
          <div className="mt-8">
            <Link
              href="/search?procedure=brow-lift&country=spain"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-amber-600 shadow-lg transition-all hover:bg-amber-50"
            >
              Compare Brow Lift Clinics
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-600">
            <strong>Brow lift in other destinations:</strong>{' '}
            <Link href="/procedures/brow-lift/turkey" className="text-amber-600 hover:underline">Turkey</Link> ·{' '}
            <Link href="/procedures/brow-lift/poland" className="text-amber-600 hover:underline">Poland</Link> ·{' '}
            <Link href="/procedures/brow-lift/hungary" className="text-amber-600 hover:underline">Hungary</Link>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Related:</strong>{' '}
            <Link href="/procedures/brow-lift" className="text-amber-600 hover:underline">Brow Lift Overview</Link> ·{' '}
            <Link href="/procedures/blepharoplasty/spain" className="text-amber-600 hover:underline">Eyelid Surgery Spain</Link> ·{' '}
            <Link href="/destinations/spain" className="text-amber-600 hover:underline">Spain Guide</Link>
          </p>
        </div>
      </section>
    </LazyMotion>
  )
}
