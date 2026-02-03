'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Shield, Clock, Globe, Sparkles, User } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface FaceliftClientProps {
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

const DESTINATIONS = [
  {
    country: 'Turkey',
    flag: '🇹🇷',
    price: '£3,000–£5,500',
    savings: '60–70%',
    highlight: 'Best value',
    href: '/procedures/facelift/turkey',
  },
  {
    country: 'Poland',
    flag: '🇵🇱',
    price: '£4,000–£6,000',
    savings: '50–60%',
    highlight: 'EU standards',
    href: '/procedures/facelift/poland',
  },
  {
    country: 'Hungary',
    flag: '🇭🇺',
    price: '£4,500–£6,500',
    savings: '45–55%',
    highlight: 'Quality focus',
    href: '/procedures/facelift/hungary',
  },
  {
    country: 'Spain',
    flag: '🇪🇸',
    price: '£5,500–£8,000',
    savings: '40–50%',
    highlight: 'Premium',
    href: '/procedures/facelift/spain',
  },
]

const FACELIFT_TYPES = [
  {
    name: 'Full Facelift',
    description: 'Comprehensive rejuvenation addressing forehead, mid-face, lower face, and neck. Most dramatic results.',
    recovery: '2–3 weeks',
  },
  {
    name: 'Mini Facelift',
    description: 'Less invasive, focuses on lower face and jowls. Shorter recovery, suitable for earlier signs of aging.',
    recovery: '1–2 weeks',
  },
  {
    name: 'Lower Facelift',
    description: 'Targets jowls, jawline, and neck. Ideal for sagging in lower third of face.',
    recovery: '1–2 weeks',
  },
  {
    name: 'Mid-Facelift',
    description: 'Addresses cheeks and under-eye area. Lifts sagging mid-face tissues.',
    recovery: '1–2 weeks',
  },
]

const SAFETY_CHECKLIST = [
  'Board-certified plastic surgeon specialising in facial surgery',
  'Before/after photos of similar age patients',
  'Hospital or accredited surgical facility',
  'Clear explanation of incision placement',
  'Realistic expectations discussion',
  'Post-operative care and follow-up plan',
]

export function FaceliftClient({ faqs }: FaceliftClientProps) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-violet-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <m.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <User className="h-10 w-10 text-violet-600" />
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Facelift Abroad
              </h1>
            </m.div>
            <m.p variants={fadeInUp} className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
              Compare facelift prices from £3,000. Experienced facial surgeons,
              natural results, comprehensive packages. Save 50–70% vs UK prices.
            </m.p>
            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/search?procedure=facelift"
                className="rounded-lg bg-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-violet-700"
              >
                Compare All Clinics
              </Link>
            </m.div>
            <m.div variants={fadeInUp} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-violet-600">£3,000–£8,000</p>
                <p className="mt-1 text-slate-600">Price range abroad</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-violet-600">50–70%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-violet-600">10–14 days</p>
                <p className="mt-1 text-slate-600">Stay required</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* What is Facelift */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              What is a Facelift?
            </m.h2>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                A facelift (rhytidectomy) is a surgical procedure that reduces visible signs of aging
                in the face and neck. It addresses sagging skin, deep creases, jowls, and loose neck
                skin by tightening underlying muscles and removing excess skin.
              </p>
              <p>
                Modern facelift techniques focus on natural-looking results — refreshed and rested
                rather than "pulled" or artificial. Incisions are carefully placed along the hairline
                and around the ears where they become virtually invisible once healed.
              </p>
              <p>
                A facelift can take 5–10 years off your appearance, with results lasting 7–10 years.
                It's often combined with neck lift, eyelid surgery, or fat transfer for comprehensive
                facial rejuvenation.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Destinations */}
      <section className="bg-violet-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-violet-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Compare Destinations
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {DESTINATIONS.map((dest) => (
                <Link
                  key={dest.country}
                  href={dest.href}
                  className="group rounded-xl border border-violet-100 bg-white p-5 transition-all hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{dest.flag}</span>
                    <span className="rounded-full bg-violet-100 px-2 py-1 text-xs font-medium text-violet-700">
                      {dest.highlight}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-violet-600">
                    {dest.country}
                  </h3>
                  <p className="mt-2 text-2xl font-bold text-violet-600">{dest.price}</p>
                  <p className="text-sm text-slate-600">Save {dest.savings} vs UK</p>
                  <p className="mt-3 text-sm font-medium text-violet-600 group-hover:underline">
                    View clinics →
                  </p>
                </Link>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Facelift Types */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-violet-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Types of Facelift
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2">
              {FACELIFT_TYPES.map((type) => (
                <div key={type.name} className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">{type.name}</h3>
                    <span className="rounded-full bg-violet-100 px-2 py-1 text-xs font-medium text-violet-700">
                      {type.recovery} recovery
                    </span>
                  </div>
                  <p className="mt-3 text-slate-600">{type.description}</p>
                </div>
              ))}
            </m.div>
            <m.p variants={fadeInUp} className="mt-6 text-slate-600">
              <strong>Combination procedures:</strong> Facelift is often combined with neck lift,
              blepharoplasty (eyelid surgery), brow lift, or fat transfer for comprehensive rejuvenation.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Safety */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-violet-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Safety Checklist
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Facelift is a technically demanding procedure requiring significant expertise.
                The face has complex anatomy with important nerves and blood vessels. Choose
                your surgeon carefully:
              </p>
              <ul className="mt-4 space-y-2">
                {SAFETY_CHECKLIST.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                <strong>Key question to ask:</strong> "How many facelifts do you perform annually?"
                Look for surgeons performing 50+ facelifts per year for optimal experience.
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
              <Clock className="h-8 w-8 text-violet-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Recovery Timeline
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 space-y-4">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-violet-600">Days 1–3:</span>
                <span className="ml-2 text-slate-600">Maximum swelling and bruising, head elevated, drains may be present</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-violet-600">Days 4–7:</span>
                <span className="ml-2 text-slate-600">Swelling begins to subside, drains removed, light walking encouraged</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-violet-600">Days 7–10:</span>
                <span className="ml-2 text-slate-600">Stitches removed, bruising fades to yellow/green, fit-to-fly assessment</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-violet-600">Weeks 2–3:</span>
                <span className="ml-2 text-slate-600">Most bruising resolved, socially presentable with makeup, return to desk work</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-violet-600">Months 3–6:</span>
                <span className="ml-2 text-slate-600">Continued improvement, numbness resolves, scars mature and fade</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-violet-600">Months 6–12:</span>
                <span className="ml-2 text-slate-600">Final results visible as all swelling resolves and tissues settle</span>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Ideal Candidates */}
      <section className="bg-violet-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Are You a Good Candidate?
            </m.h2>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-green-100 bg-white p-6">
                <h3 className="font-semibold text-green-700">Ideal Candidates</h3>
                <ul className="mt-3 space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    Age 40–70 with moderate facial sagging
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    Good skin elasticity remaining
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    Non-smoker (or quit 6+ weeks before)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    Good overall health
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    Realistic expectations
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-700">Considerations</h3>
                <ul className="mt-3 space-y-2 text-slate-600">
                  <li>• Smokers have higher complication risk — must quit</li>
                  <li>• Very thin faces may benefit more from fat transfer</li>
                  <li>• Under 40s may be better served by non-surgical options</li>
                  <li>• Some medical conditions require clearance</li>
                  <li>• Previous facial surgery may affect approach</li>
                </ul>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Frequently Asked Questions
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
      <section className="bg-gradient-to-r from-violet-600 to-violet-800 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to Compare Facelift Clinics?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-violet-100">
            Browse verified clinics with experienced facial surgeons.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/search?procedure=facelift"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-violet-600 shadow-lg transition-all hover:bg-violet-50"
            >
              Compare All Clinics
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-600">
            <strong>Facelift by destination:</strong>{' '}
            <Link href="/procedures/facelift/turkey" className="text-violet-600 hover:underline">Turkey</Link> ·{' '}
            <Link href="/procedures/facelift/poland" className="text-violet-600 hover:underline">Poland</Link> ·{' '}
            <Link href="/procedures/facelift/spain" className="text-violet-600 hover:underline">Spain</Link> ·{' '}
            <Link href="/procedures/facelift/hungary" className="text-violet-600 hover:underline">Hungary</Link>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Related procedures:</strong>{' '}
            <Link href="/procedures/blepharoplasty" className="text-violet-600 hover:underline">Eyelid Surgery</Link> ·{' '}
            <Link href="/procedures/neck-lift" className="text-violet-600 hover:underline">Neck Lift</Link> ·{' '}
            <Link href="/procedures/rhinoplasty" className="text-violet-600 hover:underline">Rhinoplasty</Link>
          </p>
        </div>
      </section>
    </LazyMotion>
  )
}
