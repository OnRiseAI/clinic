'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Shield, Clock, MapPin, Heart, Sparkles, Globe } from 'lucide-react'
import { TR, PL, HU, ES } from 'country-flag-icons/react/3x2'

interface FAQ {
  question: string
  answer: string
}

interface BreastLiftClientProps {
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
    flag: TR,
    price: '£2,500–£3,500',
    savings: '60–70%',
    highlight: 'Best value',
    href: '/procedures/breast-lift/turkey',
    color: 'violet',
  },
  {
    country: 'Poland',
    flag: PL,
    price: '£3,000–£4,000',
    savings: '50–60%',
    highlight: 'EU standards',
    href: '/procedures/breast-lift/poland',
    color: 'blue',
  },
  {
    country: 'Hungary',
    flag: HU,
    price: '£3,200–£4,200',
    savings: '50–55%',
    highlight: 'Quality focus',
    href: '/procedures/breast-lift/hungary',
    color: 'emerald',
  },
  {
    country: 'Spain',
    flag: ES,
    price: '£4,000–£5,500',
    savings: '40–50%',
    highlight: 'Premium',
    href: '/procedures/breast-lift/spain',
    color: 'amber',
  },
]

const LIFT_TYPES = [
  {
    name: 'Periareolar (Donut) Lift',
    description: 'Minimal scarring around the areola. Best for mild sagging with small lift needed.',
    suitability: 'Mild ptosis',
  },
  {
    name: 'Lollipop (Vertical) Lift',
    description: 'Incision around areola and vertical line down. Most common technique for moderate sagging.',
    suitability: 'Moderate ptosis',
  },
  {
    name: 'Anchor (Inverted-T) Lift',
    description: 'Adds horizontal incision under breast fold. Maximum reshaping for significant sagging.',
    suitability: 'Significant ptosis',
  },
]

const SAFETY_CHECKLIST = [
  'Board-certified plastic surgeon',
  'JCI or equivalent hospital accreditation',
  'Before/after photos of similar cases',
  'Clear explanation of incision technique',
  'Realistic expectations discussed',
  'Overnight hospital stay included',
]

export function BreastLiftClient({ faqs }: BreastLiftClientProps) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-violet-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <m.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <Heart className="h-10 w-10 text-violet-600" />
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Breast Lift Abroad
              </h1>
            </m.div>
            <m.p variants={fadeInUp} className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
              Compare breast lift (mastopexy) prices from £2,500. Experienced
              surgeons, comprehensive packages. Save 50–70% vs UK prices.
            </m.p>
            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/search?procedure=breast-lift"
                className="rounded-lg bg-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-violet-700"
              >
                Compare All Clinics
              </Link>
            </m.div>
            <m.div variants={fadeInUp} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-violet-600">£2,500–£5,500</p>
                <p className="mt-1 text-slate-600">Price range abroad</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-violet-600">50–70%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-violet-600">7–10 days</p>
                <p className="mt-1 text-slate-600">Stay required</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* What is Breast Lift */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              What is a Breast Lift (Mastopexy)?
            </m.h2>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                A breast lift (mastopexy) is a surgical procedure that raises and reshapes sagging
                breasts by removing excess skin and tightening the surrounding tissue. It repositions
                the nipple and areola to a more youthful, elevated position.
              </p>
              <p>
                Unlike breast augmentation, a lift doesn't add volume — it restores shape and position.
                Women often seek breast lifts after pregnancy, breastfeeding, weight loss, or natural
                aging has caused their breasts to sag.
              </p>
              <p>
                Surgery takes 2–3 hours under general anaesthesia. Surgeons abroad use the same
                techniques as UK surgeons — the difference is price, not quality. Many women choose
                to combine a breast lift with implants for both lift and volume.
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
                    <div className="w-8 h-6 rounded overflow-hidden shadow-sm relative">
                      <dest.flag className="w-full h-full object-cover" />
                    </div>
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

      {/* Lift Types */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-violet-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Breast Lift Techniques
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-3">
              {LIFT_TYPES.map((type) => (
                <div key={type.name} className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">{type.name}</h3>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                      {type.suitability}
                    </span>
                  </div>
                  <p className="mt-3 text-slate-600">{type.description}</p>
                </div>
              ))}
            </m.div>
            <m.p variants={fadeInUp} className="mt-6 text-slate-600">
              <strong>Your surgeon will recommend the best technique</strong> based on your degree of
              sagging, breast size, skin elasticity, and desired results. During consultation, they
              will explain which approach will achieve your goals with optimal scarring.
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
                Breast lift is a well-established procedure with excellent safety when
                performed by qualified surgeons. Verify these points before booking:
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
                <strong>Scarring:</strong> All breast lifts leave some scarring. Surgeons aim to place
                incisions in areas that can be concealed by clothing and bras. Scars fade significantly
                over 12–18 months.
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
                <span className="font-semibold text-violet-600">Day 1:</span>
                <span className="ml-2 text-slate-600">Surgery (2–3 hours), overnight hospital stay recommended</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-violet-600">Days 2–5:</span>
                <span className="ml-2 text-slate-600">Rest at hotel, mild discomfort managed with medication, support bra</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-violet-600">Days 6–7:</span>
                <span className="ml-2 text-slate-600">Follow-up appointment, fit-to-fly clearance, fly home comfortably</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-violet-600">Week 2:</span>
                <span className="ml-2 text-slate-600">Return to desk work, continue support bra, avoid lifting</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-violet-600">Week 4–6:</span>
                <span className="ml-2 text-slate-600">Light exercise allowed, swelling continues to reduce</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-violet-600">Months 3–6:</span>
                <span className="ml-2 text-slate-600">Final results as swelling resolves and scars fade</span>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Procedure Details */}
      <section className="bg-violet-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              The Procedure
            </m.h2>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-violet-100 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Ideal Candidates</h3>
                <ul className="mt-3 space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-violet-600" />
                    <span>Breasts that sag or have lost shape and volume</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-violet-600" />
                    <span>Nipples that point downward or fall below the breast crease</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-violet-600" />
                    <span>Stretched skin and enlarged areolae</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-violet-600" />
                    <span>Non-smokers in good general health</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-violet-100 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Combination Options</h3>
                <ul className="mt-3 space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span><strong>Breast Lift + Implants:</strong> Lift sagging breasts and add volume in one surgery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span><strong>Breast Lift + Reduction:</strong> Reduce size while lifting for better proportion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span><strong>Mummy Makeover:</strong> Combine with tummy tuck and liposuction for post-pregnancy restoration</span>
                  </li>
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
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to Compare Breast Lift Clinics?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-violet-100">
            Browse verified clinics with experienced surgeons and comprehensive packages.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/search?procedure=breast-lift"
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
            <strong>Breast lift by destination:</strong>{' '}
            <Link href="/procedures/breast-lift/turkey" className="text-violet-600 hover:underline">Turkey</Link> ·{' '}
            <Link href="/procedures/breast-lift/poland" className="text-violet-600 hover:underline">Poland</Link> ·{' '}
            <Link href="/procedures/breast-lift/spain" className="text-violet-600 hover:underline">Spain</Link> ·{' '}
            <Link href="/procedures/breast-lift/hungary" className="text-violet-600 hover:underline">Hungary</Link>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Related procedures:</strong>{' '}
            <Link href="/procedures/breast-augmentation" className="text-violet-600 hover:underline">Breast Augmentation</Link> ·{' '}
            <Link href="/procedures/breast-reduction" className="text-violet-600 hover:underline">Breast Reduction</Link> ·{' '}
            <Link href="/procedures/tummy-tuck" className="text-violet-600 hover:underline">Tummy Tuck</Link> ·{' '}
            <Link href="/procedures/liposuction" className="text-violet-600 hover:underline">Liposuction</Link>
          </p>
        </div>
      </section>
    </LazyMotion>
  )
}
