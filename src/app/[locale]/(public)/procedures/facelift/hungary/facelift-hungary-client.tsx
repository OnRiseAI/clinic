'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Shield, Clock, MapPin, Droplets, Globe, User } from 'lucide-react'

import { HU } from 'country-flag-icons/react/3x2'

interface FAQ {
  question: string
  answer: string
}

interface FaceliftHungaryClientProps {
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

export function FaceliftHungaryClient({ faqs }: FaceliftHungaryClientProps) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <m.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <div className="w-12 overflow-hidden rounded shadow-sm">
                <HU title="Hungary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Facelift in Hungary
              </h1>
            </m.div>
            <m.p variants={fadeInUp} className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
              Facelift surgery from £4,500 with EU standards. Budapest's established
              medical tourism expertise with unique thermal spa recovery options.
            </m.p>
            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/search?procedure=facelift&country=hungary"
                className="rounded-lg bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-emerald-700"
              >
                Compare Clinics in Hungary →
              </Link>
            </m.div>
            <m.div variants={fadeInUp} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-emerald-600">£4,500–£6,500</p>
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
              Why Consider Hungary for Facelift?
            </m.h2>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Hungary has decades of medical tourism experience, with well-established
                infrastructure for international patients. This expertise extends to cosmetic
                surgery, with Budapest offering quality procedures at competitive EU prices.
              </p>
              <p>
                As an EU member, Hungary operates under European healthcare regulations —
                the same standards that ensure patient safety across the continent. Surgeons
                must be registered with the Hungarian Medical Chamber.
              </p>
              <p>
                Budapest is a beautiful, affordable city for the extended recovery that
                facelift requires. The famous thermal baths offer a unique amenity for
                later recovery stages once incisions have healed.
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
              <User className="h-8 w-8 text-emerald-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Facelift Options Available
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>Hungarian surgeons offer comprehensive facial rejuvenation:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span><strong>Full Facelift (£5,500–£6,500):</strong> Comprehensive face and neck rejuvenation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span><strong>Mini Facelift (£4,500–£5,500):</strong> Lower face focus, shorter recovery</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span><strong>Neck Lift (£3,500–£4,500):</strong> Addresses neck bands and sagging</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span><strong>Combination procedures:</strong> Add blepharoplasty or fat transfer</span>
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
                  Before/after photos of similar age patients
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Licensed surgical facility
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

      {/* Budapest */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Facelift in Budapest
            </m.h2>
            <m.div variants={fadeInUp} className="mt-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  <h3 className="text-xl font-bold text-slate-900">Budapest</h3>
                </div>
                <p className="mt-3 text-slate-600">
                  All facelift procedures in Hungary are performed in Budapest. The capital
                  has modern private clinics with experienced cosmetic surgeons and
                  well-established medical tourism infrastructure.
                </p>
                <p className="mt-3 text-slate-600">
                  Budapest is affordable for the extended stay that facelift requires,
                  with excellent restaurants, culture, and the famous thermal baths
                  for later recovery stages.
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
                amenity — but <strong>not immediately after facelift</strong>. You'll need
                to wait until incisions are fully healed (minimum 4–6 weeks) and your
                surgeon approves bathing.
              </p>
              <p className="mt-3 text-slate-700">
                However, if you plan an extended stay or return visit, the thermal baths
                can aid relaxation during later recovery stages. The warm mineral waters
                are genuinely therapeutic for overall wellbeing.
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
                Plan for 10–14 days in Hungary. The 2.5-hour flight home is comfortable
                after stitches are removed. Budapest is affordable and pleasant for the
                extended recovery that facelift requires.
              </p>
              <p>
                Stitches are typically removed at day 7–10. Most bruising resolves by
                week 2–3, making you socially presentable. Final results continue
                improving over 3–6 months as all swelling resolves.
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
              Facelift in Hungary: FAQs
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
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to Compare Facelift Clinics in Hungary?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-emerald-100">
            Browse verified clinics with EU standards and thermal spa recovery options.
          </p>
          <div className="mt-8">
            <Link
              href="/search?procedure=facelift&country=hungary"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-emerald-600 shadow-lg transition-all hover:bg-emerald-50"
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
            <Link href="/procedures/facelift/turkey" className="text-emerald-600 hover:underline">Turkey</Link> ·{' '}
            <Link href="/procedures/facelift/poland" className="text-emerald-600 hover:underline">Poland</Link> ·{' '}
            <Link href="/procedures/facelift/spain" className="text-emerald-600 hover:underline">Spain</Link>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Related:</strong>{' '}
            <Link href="/procedures/facelift" className="text-emerald-600 hover:underline">Facelift Overview</Link> ·{' '}
            <Link href="/procedures/blepharoplasty/hungary" className="text-emerald-600 hover:underline">Eyelid Surgery Hungary</Link> ·{' '}
            <Link href="/destinations/hungary" className="text-emerald-600 hover:underline">Hungary Guide</Link>
          </p>
        </div>
      </section>
    </LazyMotion>
  )
}
