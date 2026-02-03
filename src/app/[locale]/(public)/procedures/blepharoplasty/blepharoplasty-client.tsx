'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Shield, Clock, Globe, Eye, Sparkles } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface BlepharoplastyClientProps {
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
    price: '£1,200–£2,500',
    savings: '60–70%',
    highlight: 'Best value',
    href: '/procedures/blepharoplasty/turkey',
  },
  {
    country: 'Poland',
    flag: '🇵🇱',
    price: '£1,800–£2,800',
    savings: '50–60%',
    highlight: 'EU standards',
    href: '/procedures/blepharoplasty/poland',
  },
  {
    country: 'Hungary',
    flag: '🇭🇺',
    price: '£2,000–£3,000',
    savings: '45–55%',
    highlight: 'Quality focus',
    href: '/procedures/blepharoplasty/hungary',
  },
  {
    country: 'Spain',
    flag: '🇪🇸',
    price: '£2,500–£3,500',
    savings: '40–50%',
    highlight: 'Premium',
    href: '/procedures/blepharoplasty/spain',
  },
]

const PROCEDURE_TYPES = [
  {
    name: 'Upper Blepharoplasty',
    description: 'Removes excess skin causing hooding over the eye. Most common procedure. Can improve vision if skin is obstructing.',
    price: '£1,200–£2,000',
  },
  {
    name: 'Lower Blepharoplasty',
    description: 'Addresses under-eye bags, puffiness, and wrinkles. Fat can be removed or repositioned for natural results.',
    price: '£1,500–£2,500',
  },
  {
    name: 'Upper & Lower Combined',
    description: 'Comprehensive eyelid rejuvenation. Both procedures in one session for complete refreshed appearance.',
    price: '£2,000–£3,500',
  },
]

const SAFETY_CHECKLIST = [
  'Board-certified plastic surgeon or oculoplastic specialist',
  'Before/after photos of similar cases',
  'Eye examination before surgery',
  'Accredited surgical facility',
  'Clear explanation of technique',
  'Post-operative care instructions',
]

export function BlepharoplastyClient({ faqs }: BlepharoplastyClientProps) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sky-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <m.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <Eye className="h-10 w-10 text-sky-600" />
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Blepharoplasty Abroad
              </h1>
            </m.div>
            <m.p variants={fadeInUp} className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
              Compare eyelid surgery prices from £1,200. Experienced surgeons,
              quick recovery, natural results. Save 50–70% vs UK prices.
            </m.p>
            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/search?procedure=blepharoplasty"
                className="rounded-lg bg-sky-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-sky-700"
              >
                Compare All Clinics
              </Link>
            </m.div>
            <m.div variants={fadeInUp} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-sky-600">£1,200–£3,500</p>
                <p className="mt-1 text-slate-600">Price range abroad</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-sky-600">50–70%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-sky-600">5–7 days</p>
                <p className="mt-1 text-slate-600">Stay required</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* What is Blepharoplasty */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              What is Blepharoplasty?
            </m.h2>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Blepharoplasty (eyelid surgery) improves the appearance of the upper eyelids,
                lower eyelids, or both. It removes excess skin, muscle, and fat to create a
                more youthful, alert appearance.
              </p>
              <p>
                The eyes are often the first area to show signs of aging — hooded upper lids,
                under-eye bags, and puffy eyelids can make you look tired even when well-rested.
                Blepharoplasty addresses these concerns with natural-looking results.
              </p>
              <p>
                The procedure takes 1–2 hours under local or general anaesthesia. Recovery is
                relatively quick compared to other facial procedures — most patients are
                socially presentable within 2 weeks.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Destinations */}
      <section className="bg-sky-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-sky-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Compare Destinations
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {DESTINATIONS.map((dest) => (
                <Link
                  key={dest.country}
                  href={dest.href}
                  className="group rounded-xl border border-sky-100 bg-white p-5 transition-all hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{dest.flag}</span>
                    <span className="rounded-full bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700">
                      {dest.highlight}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-sky-600">
                    {dest.country}
                  </h3>
                  <p className="mt-2 text-2xl font-bold text-sky-600">{dest.price}</p>
                  <p className="text-sm text-slate-600">Save {dest.savings} vs UK</p>
                  <p className="mt-3 text-sm font-medium text-sky-600 group-hover:underline">
                    View clinics →
                  </p>
                </Link>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Procedure Types */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-sky-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Types of Blepharoplasty
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-3">
              {PROCEDURE_TYPES.map((type) => (
                <div key={type.name} className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">{type.name}</h3>
                  </div>
                  <p className="mt-3 text-slate-600">{type.description}</p>
                  <p className="mt-3 text-lg font-bold text-sky-600">{type.price}</p>
                </div>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Safety */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-sky-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Safety Checklist
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Blepharoplasty is a precise procedure performed near the eye. While generally
                safe, it requires skilled technique. Verify these points before booking:
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
                <strong>Specialist options:</strong> Oculoplastic surgeons (ophthalmologists with
                plastic surgery training) specialise exclusively in eyelid and facial surgery
                around the eyes.
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
              <Clock className="h-8 w-8 text-sky-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Recovery Timeline
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 space-y-4">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-sky-600">Day 1:</span>
                <span className="ml-2 text-slate-600">Surgery (1–2 hours), rest, cold compresses, eyes may be swollen</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-sky-600">Days 2–3:</span>
                <span className="ml-2 text-slate-600">Peak swelling and bruising, continue cold compresses, light activity</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-sky-600">Days 5–7:</span>
                <span className="ml-2 text-slate-600">Stitches removed, swelling reducing, can fly home with sunglasses</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-sky-600">Week 2:</span>
                <span className="ml-2 text-slate-600">Most bruising resolved, socially presentable, makeup can be worn</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-sky-600">Weeks 4–6:</span>
                <span className="ml-2 text-slate-600">Return to all normal activities, scars fading</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-sky-600">Months 3–6:</span>
                <span className="ml-2 text-slate-600">Final results, scars nearly invisible in natural crease</span>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Candidates */}
      <section className="bg-sky-50 py-12 sm:py-16 lg:py-20">
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
                    Excess upper eyelid skin (hooding)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    Under-eye bags or puffiness
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    Droopy lower eyelids
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    Good eye health
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    Non-smoker or willing to quit
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-700">Considerations</h3>
                <ul className="mt-3 space-y-2 text-slate-600">
                  <li>• Dry eye syndrome may need assessment</li>
                  <li>• Some conditions may affect healing</li>
                  <li>• Droopy brows may need brow lift instead</li>
                  <li>• Realistic expectations important</li>
                  <li>• Results typically last 5–10 years</li>
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
      <section className="bg-gradient-to-r from-sky-600 to-sky-800 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to Compare Blepharoplasty Clinics?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sky-100">
            Browse verified clinics with experienced eyelid surgeons.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/search?procedure=blepharoplasty"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-sky-600 shadow-lg transition-all hover:bg-sky-50"
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
            <strong>Blepharoplasty by destination:</strong>{' '}
            <Link href="/procedures/blepharoplasty/turkey" className="text-sky-600 hover:underline">Turkey</Link> ·{' '}
            <Link href="/procedures/blepharoplasty/poland" className="text-sky-600 hover:underline">Poland</Link> ·{' '}
            <Link href="/procedures/blepharoplasty/spain" className="text-sky-600 hover:underline">Spain</Link> ·{' '}
            <Link href="/procedures/blepharoplasty/hungary" className="text-sky-600 hover:underline">Hungary</Link>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Related procedures:</strong>{' '}
            <Link href="/procedures/facelift" className="text-sky-600 hover:underline">Facelift</Link> ·{' '}
            <Link href="/procedures/brow-lift" className="text-sky-600 hover:underline">Brow Lift</Link> ·{' '}
            <Link href="/procedures/rhinoplasty" className="text-sky-600 hover:underline">Rhinoplasty</Link>
          </p>
        </div>
      </section>
    </LazyMotion>
  )
}
