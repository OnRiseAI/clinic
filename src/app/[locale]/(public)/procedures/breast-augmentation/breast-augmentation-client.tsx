'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Shield, Clock, MapPin, Heart, Sparkles, Globe } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface BreastAugmentationClientProps {
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
    price: '£2,500–£4,000',
    savings: '60–70%',
    highlight: 'Best value',
    href: '/procedures/breast-augmentation/turkey',
    color: 'teal',
  },
  {
    country: 'Poland',
    flag: '🇵🇱',
    price: '£3,000–£4,500',
    savings: '50–60%',
    highlight: 'EU standards',
    href: '/procedures/breast-augmentation/poland',
    color: 'blue',
  },
  {
    country: 'Hungary',
    flag: '🇭🇺',
    price: '£3,200–£4,800',
    savings: '50–55%',
    highlight: 'Quality focus',
    href: '/procedures/breast-augmentation/hungary',
    color: 'emerald',
  },
  {
    country: 'Spain',
    flag: '🇪🇸',
    price: '£4,000–£5,500',
    savings: '40–50%',
    highlight: 'Premium',
    href: '/procedures/breast-augmentation/spain',
    color: 'amber',
  },
]

const IMPLANT_TYPES = [
  {
    name: 'Silicone Gel',
    description: 'Most popular choice. Natural look and feel. Cohesive gel maintains shape.',
    popularity: '80%',
  },
  {
    name: 'Gummy Bear',
    description: 'Form-stable silicone. Teardrop shape. Premium option for natural slope.',
    popularity: '15%',
  },
  {
    name: 'Saline',
    description: 'Filled with sterile salt water. Smallest incision. Adjustable size.',
    popularity: '5%',
  },
]

const SAFETY_CHECKLIST = [
  'Board-certified plastic surgeon',
  'FDA/CE-approved implants (Mentor, Allergan, Motiva)',
  'JCI or equivalent hospital accreditation',
  'Before/after photos of similar cases',
  'Clear explanation of implant options',
  'Overnight hospital stay included',
]

export function BreastAugmentationClient({ faqs }: BreastAugmentationClientProps) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-rose-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <m.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <Heart className="h-10 w-10 text-rose-600" />
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Breast Augmentation Abroad
              </h1>
            </m.div>
            <m.p variants={fadeInUp} className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
              Compare breast augmentation prices from £2,500. Premium implants, experienced
              surgeons, comprehensive packages. Save 50–70% vs UK prices.
            </m.p>
            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/search?procedure=breast-augmentation"
                className="rounded-lg bg-rose-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-rose-700"
              >
                Compare All Clinics
              </Link>
            </m.div>
            <m.div variants={fadeInUp} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">£2,500–£5,500</p>
                <p className="mt-1 text-slate-600">Price range abroad</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">50–70%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-rose-600">7–10 days</p>
                <p className="mt-1 text-slate-600">Stay required</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* What is Breast Augmentation */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              What is Breast Augmentation?
            </m.h2>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Breast augmentation (augmentation mammoplasty) is a surgical procedure to increase
                breast size and improve shape using implants. It's one of the most popular cosmetic
                surgeries worldwide, with millions performed annually.
              </p>
              <p>
                The procedure involves placing silicone or saline implants either behind the breast
                tissue or beneath the chest muscle. Surgery takes 1–2 hours under general anaesthesia,
                with most patients returning home the same day or after one night in hospital.
              </p>
              <p>
                Modern implants are highly developed, offering natural look and feel. Surgeons abroad
                use the same premium brands as UK clinics — Mentor, Allergan, Motiva — at significantly
                lower prices due to reduced operating costs.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Destinations */}
      <section className="bg-rose-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-rose-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Compare Destinations
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {DESTINATIONS.map((dest) => (
                <Link
                  key={dest.country}
                  href={dest.href}
                  className="group rounded-xl border border-rose-100 bg-white p-5 transition-all hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{dest.flag}</span>
                    <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                      {dest.highlight}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-rose-600">
                    {dest.country}
                  </h3>
                  <p className="mt-2 text-2xl font-bold text-rose-600">{dest.price}</p>
                  <p className="text-sm text-slate-600">Save {dest.savings} vs UK</p>
                  <p className="mt-3 text-sm font-medium text-rose-600 group-hover:underline">
                    View clinics →
                  </p>
                </Link>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Implant Types */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-rose-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Implant Types Available
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-3">
              {IMPLANT_TYPES.map((type) => (
                <div key={type.name} className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">{type.name}</h3>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                      {type.popularity} of patients
                    </span>
                  </div>
                  <p className="mt-3 text-slate-600">{type.description}</p>
                </div>
              ))}
            </m.div>
            <m.p variants={fadeInUp} className="mt-6 text-slate-600">
              <strong>Premium brands available abroad:</strong> Mentor (Johnson & Johnson),
              Allergan Natrelle, Motiva Ergonomix, Sebbin. All FDA/CE approved with warranties.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Safety */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-rose-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Safety Checklist
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Breast augmentation is a well-established procedure with excellent safety when
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
                <strong>Implant warranties:</strong> Premium brands include 10-year or lifetime
                warranties. Clinics abroad offer the same warranty coverage as UK clinics.
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
              <Clock className="h-8 w-8 text-rose-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Recovery Timeline
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 space-y-4">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-rose-600">Day 1:</span>
                <span className="ml-2 text-slate-600">Surgery (1–2 hours), overnight hospital stay recommended</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-rose-600">Days 2–5:</span>
                <span className="ml-2 text-slate-600">Rest at hotel, mild discomfort managed with medication, compression bra</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-rose-600">Days 6–7:</span>
                <span className="ml-2 text-slate-600">Follow-up appointment, fit-to-fly clearance, fly home comfortably</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-rose-600">Week 2:</span>
                <span className="ml-2 text-slate-600">Return to desk work, continue compression bra, avoid lifting</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-rose-600">Week 4–6:</span>
                <span className="ml-2 text-slate-600">Light exercise allowed, swelling continues to reduce</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-rose-600">Months 3–6:</span>
                <span className="ml-2 text-slate-600">Final results as implants settle into natural position</span>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Procedure Details */}
      <section className="bg-rose-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              The Procedure
            </m.h2>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-rose-100 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Incision Options</h3>
                <ul className="mt-3 space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-rose-600" />
                    <span><strong>Inframammary:</strong> Under breast fold (most common, best access)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-rose-600" />
                    <span><strong>Periareolar:</strong> Around nipple edge (hidden scar)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-rose-600" />
                    <span><strong>Axillary:</strong> Through armpit (no breast scar)</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-rose-100 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Placement Options</h3>
                <ul className="mt-3 space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span><strong>Submuscular:</strong> Under chest muscle (most natural look, better for slim patients)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span><strong>Subglandular:</strong> Above muscle (faster recovery, more projection)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span><strong>Dual plane:</strong> Partially under muscle (combines benefits)</span>
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
      <section className="bg-gradient-to-r from-rose-600 to-rose-800 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to Compare Breast Augmentation Clinics?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-rose-100">
            Browse verified clinics with premium implants and experienced surgeons.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/search?procedure=breast-augmentation"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-rose-600 shadow-lg transition-all hover:bg-rose-50"
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
            <strong>Breast augmentation by destination:</strong>{' '}
            <Link href="/procedures/breast-augmentation/turkey" className="text-rose-600 hover:underline">Turkey</Link> ·{' '}
            <Link href="/procedures/breast-augmentation/poland" className="text-rose-600 hover:underline">Poland</Link> ·{' '}
            <Link href="/procedures/breast-augmentation/spain" className="text-rose-600 hover:underline">Spain</Link> ·{' '}
            <Link href="/procedures/breast-augmentation/hungary" className="text-rose-600 hover:underline">Hungary</Link>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Related procedures:</strong>{' '}
            <Link href="/procedures/breast-lift" className="text-rose-600 hover:underline">Breast Lift</Link> ·{' '}
            <Link href="/procedures/breast-reduction" className="text-rose-600 hover:underline">Breast Reduction</Link> ·{' '}
            <Link href="/procedures/liposuction" className="text-rose-600 hover:underline">Liposuction</Link> ·{' '}
            <Link href="/procedures/tummy-tuck" className="text-rose-600 hover:underline">Tummy Tuck</Link>
          </p>
        </div>
      </section>
    </LazyMotion>
  )
}
