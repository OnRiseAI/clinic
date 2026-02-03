'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Shield, Clock, MapPin, Droplets, Globe, Eye } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface BlepharoplastyHungaryClientProps {
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

const BENEFITS = [
  { icon: Globe, title: 'EU Standards', description: 'Full European healthcare protections' },
  { icon: Droplets, title: 'Thermal Spa Recovery', description: 'Unique to Budapest (post-healing)' },
  { icon: Shield, title: 'Quality Focus', description: 'Conservative, natural approach' },
  { icon: CheckCircle, title: 'Good Value', description: 'Competitive EU pricing' },
]

export function BlepharoplastyHungaryClient({ faqs }: BlepharoplastyHungaryClientProps) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <m.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <span className="text-5xl">🇭🇺</span>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Blepharoplasty in Hungary
              </h1>
            </m.div>
            <m.p variants={fadeInUp} className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
              Eyelid surgery from £2,000 with EU standards. Budapest's established
              medical tourism expertise with unique thermal spa recovery.
            </m.p>
            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/search?procedure=blepharoplasty&country=hungary"
                className="rounded-lg bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-emerald-700"
              >
                Compare Clinics in Hungary →
              </Link>
            </m.div>
            <m.div variants={fadeInUp} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-emerald-600">£2,000–£3,000</p>
                <p className="mt-1 text-slate-600">Typical price range</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-emerald-600">45–55%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-emerald-600">2.5 hrs</p>
                <p className="mt-1 text-slate-600">Flight from London</p>
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
              Why Consider Hungary for Blepharoplasty?
            </m.h2>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Hungary has decades of medical tourism experience, with well-established
                infrastructure for international patients. This expertise extends to cosmetic
                surgery, with Budapest offering quality procedures at competitive EU prices.
              </p>
              <p>
                As an EU member, Hungary operates under European healthcare regulations —
                the same standards that ensure patient safety across the continent.
              </p>
              <p>
                Budapest is a beautiful, affordable city. For blepharoplasty's quick recovery,
                even a short stay is pleasant. The famous thermal baths offer relaxation
                during later recovery stages.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-emerald-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Hungary's Advantages
            </m.h2>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((benefit) => (
                <div key={benefit.title} className="rounded-xl border border-emerald-100 bg-white p-5">
                  <benefit.icon className="h-8 w-8 text-emerald-600" />
                  <h3 className="mt-3 font-semibold text-slate-900">{benefit.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{benefit.description}</p>
                </div>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Procedures */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Eye className="h-8 w-8 text-emerald-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Blepharoplasty Options
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>Hungarian surgeons offer comprehensive eyelid rejuvenation:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span><strong>Upper Blepharoplasty (£2,000–£2,400):</strong> Removes excess upper eyelid skin</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span><strong>Lower Blepharoplasty (£2,200–£2,600):</strong> Addresses under-eye bags</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span><strong>Upper & Lower Combined (£2,700–£3,000):</strong> Complete eyelid rejuvenation</span>
                </li>
              </ul>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Safety */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-emerald-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Safety Standards
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Hungary operates under EU healthcare regulations. Verify these points:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Surgeon registered with Hungarian Medical Chamber
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Specialist certification in plastic surgery
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Before/after photos of similar cases
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Licensed surgical facility
                </li>
              </ul>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Budapest */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Blepharoplasty in Budapest
            </m.h2>
            <m.div variants={fadeInUp} className="mt-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  <h3 className="text-xl font-bold text-slate-900">Budapest</h3>
                </div>
                <p className="mt-3 text-slate-600">
                  All blepharoplasty procedures in Hungary are performed in Budapest. The
                  capital has modern private clinics with experienced cosmetic surgeons
                  and well-established medical tourism infrastructure.
                </p>
                <p className="mt-3 text-slate-600">
                  Budapest is affordable even for short stays, with excellent restaurants,
                  culture, and the famous thermal baths for later relaxation.
                </p>
                <p className="mt-3 text-sm font-medium text-emerald-600">
                  2.5 hours from London · 15+ cosmetic clinics
                </p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Thermal Spas */}
      <section className="bg-emerald-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Droplets className="h-8 w-8 text-cyan-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Thermal Spa Recovery
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 rounded-xl bg-cyan-50 border border-cyan-100 p-6">
              <p className="text-slate-700">
                Budapest's thermal baths (Széchenyi, Gellért, Rudas) are a unique recovery
                amenity — but <strong>not immediately after blepharoplasty</strong>. Wait
                until incisions are fully healed (minimum 3–4 weeks).
              </p>
              <p className="mt-3 text-slate-700">
                For blepharoplasty's quick recovery, you may not need the baths immediately.
                However, they offer wonderful relaxation on a return visit or extended stay.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Recovery */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-emerald-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Recovery Timeline
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Plan for 5–7 days in Hungary. Blepharoplasty has one of the quickest
                recoveries of any facial procedure. The 2.5-hour flight home is
                comfortable after stitch removal.
              </p>
              <p>
                Stitches are typically removed at day 5–7. Wear sunglasses to cover
                any residual bruising during travel. Most patients are socially
                presentable within 2 weeks.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Blepharoplasty in Hungary: FAQs
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
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-800 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to Compare Blepharoplasty Clinics in Hungary?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-emerald-100">
            Browse verified clinics with EU standards and thermal spa recovery options.
          </p>
          <div className="mt-8">
            <Link
              href="/search?procedure=blepharoplasty&country=hungary"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-emerald-600 shadow-lg transition-all hover:bg-emerald-50"
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
            <Link href="/procedures/blepharoplasty/turkey" className="text-emerald-600 hover:underline">Turkey</Link> ·{' '}
            <Link href="/procedures/blepharoplasty/poland" className="text-emerald-600 hover:underline">Poland</Link> ·{' '}
            <Link href="/procedures/blepharoplasty/spain" className="text-emerald-600 hover:underline">Spain</Link>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Related:</strong>{' '}
            <Link href="/procedures/blepharoplasty" className="text-emerald-600 hover:underline">Blepharoplasty Overview</Link> ·{' '}
            <Link href="/procedures/facelift/hungary" className="text-emerald-600 hover:underline">Facelift Hungary</Link> ·{' '}
            <Link href="/destinations/hungary" className="text-emerald-600 hover:underline">Hungary Guide</Link>
          </p>
        </div>
      </section>
    </LazyMotion>
  )
}
