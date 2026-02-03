'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Shield, Clock, MapPin, Package, ArrowUp } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface BrowLiftHungaryClientProps {
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
  { name: 'Endoscopic Brow Lift', price: '£2,800–£3,300', description: 'Minimally invasive, small incisions' },
  { name: 'Coronal Brow Lift', price: '£3,300–£3,800', description: 'Traditional technique, dramatic results' },
  { name: 'Temporal Brow Lift', price: '£2,200–£2,800', description: 'Targets outer brow only' },
  { name: 'Direct Brow Lift', price: '£2,200–£2,800', description: 'Incision above eyebrow' },
]

export function BrowLiftHungaryClient({ faqs }: BrowLiftHungaryClientProps) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <m.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <span className="text-5xl">🇭🇺</span>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Brow Lift in Hungary
              </h1>
            </m.div>
            <m.p variants={fadeInUp} className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
              Quality-focused brow lift surgery from £2,800. EU standards,
              experienced facial surgeons, comprehensive packages.
            </m.p>
            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/search?procedure=brow-lift&country=hungary"
                className="rounded-lg bg-amber-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-amber-700"
              >
                Compare Clinics in Hungary →
              </Link>
            </m.div>
            <m.div variants={fadeInUp} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-amber-600">£2,800–£3,800</p>
                <p className="mt-1 text-slate-600">All-inclusive packages</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-amber-600">50–55%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-amber-600">2.5 hours</p>
                <p className="mt-1 text-slate-600">Flight from UK</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Why Hungary */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Why Choose Hungary for Brow Lift?
            </m.h2>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Hungary has a strong medical tradition and is known for quality-focused healthcare.
                Hungarian plastic surgeons are EU-trained with many holding international
                certifications. The country prioritises quality over volume.
              </p>
              <p>
                Budapest, the capital, combines excellent medical care with a unique recovery
                environment. The city is famous for its thermal baths — natural hot springs
                that have been used for relaxation and healing for centuries.
              </p>
              <p>
                <strong>Quality focus:</strong> Hungary offers a balance between cost savings
                and quality. EU standards ensure proper regulations and patient protections,
                while prices remain significantly lower than the UK.
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
                Brow Lift Options in Hungary
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
              <strong>Combination procedures:</strong> Add blepharoplasty (£2,200–£3,200), facelift
              (£4,500–£6,500), or fat transfer (£2,200–£3,200) for comprehensive rejuvenation.
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
                Hungary's medical facilities meet strict EU safety standards. When choosing a clinic
                for brow lift:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  EU-certified surgical facility
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
                  Modern endoscopic equipment and techniques
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Clear communication in English
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
              Where to Get Brow Lift in Hungary
            </m.h2>
            <m.div variants={fadeInUp} className="mt-8">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-amber-600" />
                  <h3 className="text-xl font-bold text-slate-900">Budapest</h3>
                </div>
                <p className="mt-2 text-slate-600">
                  Budapest is Hungary's main destination for cosmetic surgery. The capital offers
                  excellent clinics, qualified surgeons, and is famous for its thermal bath culture.
                  The historic city provides a pleasant environment for recovery, with world-famous
                  spas for relaxation (after your surgeon approves).
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
                Recovery Timeline in Hungary
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
                <span className="ml-2 text-slate-600">Swelling subsides, gentle walks, explore Budapest's cafes</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-amber-600">Days 5–7:</span>
                <span className="ml-2 text-slate-600">Stitches/staples removed, fit-to-fly assessment, fly home</span>
              </div>
            </m.div>
            <m.p variants={fadeInUp} className="mt-6 text-slate-600">
              Budapest's famous thermal baths can be enjoyed once your surgeon approves — typically
              2–3 weeks after surgery. The gentle heat and mineral-rich waters are renowned for
              promoting relaxation and wellbeing.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Brow Lift in Hungary: FAQs
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
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to Compare Brow Lift Clinics in Hungary?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-amber-100">
            Browse verified clinics with quality-focused surgeons.
          </p>
          <div className="mt-8">
            <Link
              href="/search?procedure=brow-lift&country=hungary"
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
            <Link href="/procedures/brow-lift/spain" className="text-amber-600 hover:underline">Spain</Link>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Related:</strong>{' '}
            <Link href="/procedures/brow-lift" className="text-amber-600 hover:underline">Brow Lift Overview</Link> ·{' '}
            <Link href="/procedures/blepharoplasty/hungary" className="text-amber-600 hover:underline">Eyelid Surgery Hungary</Link> ·{' '}
            <Link href="/destinations/hungary" className="text-amber-600 hover:underline">Hungary Guide</Link>
          </p>
        </div>
      </section>
    </LazyMotion>
  )
}
