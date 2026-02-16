'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Shield, Clock, MapPin, Heart, Package } from 'lucide-react'

import { TR } from 'country-flag-icons/react/3x2'

interface FAQ {
  question: string
  answer: string
}

interface BreastLiftTurkeyClientProps {
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
  'Breast lift surgery',
  'General anaesthesia',
  'Hospital stay (1 night)',
  'Pre-operative tests',
  'Post-operative medications',
  'Support/surgical bra',
  '5–7 nights hotel',
  'Airport transfers',
  'Patient coordinator',
  'Follow-up appointments',
]

const CITIES = [
  {
    name: 'Istanbul',
    description: 'Largest selection of breast lift surgeons and JCI-accredited hospitals. Major cosmetic surgery hub with 50+ clinics.',
    clinics: '50+ clinics',
  },
  {
    name: 'Antalya',
    description: 'Resort city with excellent clinics. Mediterranean beach recovery setting. Slightly lower prices than Istanbul.',
    clinics: '15+ clinics',
  },
]

const LIFT_TECHNIQUES = [
  { name: 'Periareolar Lift', description: 'Minimal scarring, mild ptosis', suitability: 'Minor lift' },
  { name: 'Lollipop Lift', description: 'Vertical incision, moderate ptosis', suitability: 'Most common' },
  { name: 'Anchor Lift', description: 'Maximum reshaping, significant ptosis', suitability: 'Significant lift' },
]

export function BreastLiftTurkeyClient({ faqs }: BreastLiftTurkeyClientProps) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-violet-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <m.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <div className="w-12 overflow-hidden rounded shadow-sm">
                <TR title="Turkey" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Breast Lift in Turkey
              </h1>
            </m.div>
            <m.p variants={fadeInUp} className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
              Breast lift (mastopexy) from £2,500 all-inclusive. JCI-accredited hospitals,
              experienced surgeons, comprehensive packages.
            </m.p>
            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/search?procedure=breast-lift&country=turkey"
                className="rounded-lg bg-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-violet-700"
              >
                Compare Clinics in Turkey →
              </Link>
            </m.div>
            <m.div variants={fadeInUp} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-violet-600">£2,500–£3,500</p>
                <p className="mt-1 text-slate-600">All-inclusive packages</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-violet-600">60–70%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-violet-600">50+</p>
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
              Why Choose Turkey for a Breast Lift?
            </m.h2>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Turkey is Europe's leading destination for cosmetic surgery, including breast lifts.
                The high volume means surgeons have extensive experience with all lift techniques,
                from minor periareolar lifts to full anchor lifts.
              </p>
              <p>
                Turkish surgeons use the same techniques as UK surgeons at significantly lower
                prices. The cost difference comes from lower operating costs, not compromised
                quality — you get the same expertise and results.
              </p>
              <p>
                All-inclusive packages simplify the process: surgery, hospital stay, hotel, and
                transfers bundled together. JCI-accredited hospitals ensure international safety
                standards are met.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Techniques */}
      <section className="bg-violet-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-violet-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Breast Lift Techniques Available
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 grid gap-4 sm:grid-cols-3">
              {LIFT_TECHNIQUES.map((technique) => (
                <div key={technique.name} className="rounded-xl border border-violet-100 bg-white p-5">
                  <h3 className="font-bold text-slate-900">{technique.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{technique.description}</p>
                  <p className="mt-2 text-sm font-medium text-violet-600">{technique.suitability}</p>
                </div>
              ))}
            </m.div>
            <m.p variants={fadeInUp} className="mt-6 text-slate-600">
              Your surgeon will recommend the best technique based on your degree of sagging,
              skin elasticity, and desired results during consultation.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Package Inclusions */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-violet-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                What's Included in Turkey Packages
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
              <Shield className="h-8 w-8 text-violet-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Safety Standards in Turkey
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Turkey has invested heavily in medical tourism infrastructure. JCI accreditation
                (Joint Commission International) is the gold standard — the same accreditation used
                by top US and European hospitals.
              </p>
              <p>Key verification points for breast lift surgery:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  JCI or equivalent hospital accreditation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Board-certified plastic surgeon (Turkish Medical Association)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Before/after photos of similar cases
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Clear explanation of incision technique
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Overnight hospital monitoring included
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
              Where to Get a Breast Lift in Turkey
            </m.h2>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2">
              {CITIES.map((city) => (
                <div key={city.name} className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-violet-600" />
                    <h3 className="text-xl font-bold text-slate-900">{city.name}</h3>
                  </div>
                  <p className="mt-2 text-slate-600">{city.description}</p>
                  <p className="mt-2 text-sm font-medium text-violet-600">{city.clinics}</p>
                </div>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Recovery */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-violet-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Recovery Timeline in Turkey
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 space-y-4">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-violet-600">Day 1:</span>
                <span className="ml-2 text-slate-600">Surgery (2–3 hours), overnight hospital stay, rest</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-violet-600">Days 2–5:</span>
                <span className="ml-2 text-slate-600">Transfer to hotel, rest, light walking, support bra</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-violet-600">Days 6–7:</span>
                <span className="ml-2 text-slate-600">Follow-up with surgeon, fit-to-fly clearance</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-violet-600">Day 7–10:</span>
                <span className="ml-2 text-slate-600">Fly home comfortably, continue recovery at home</span>
              </div>
            </m.div>
            <m.p variants={fadeInUp} className="mt-6 text-slate-600">
              You can sit normally after a breast lift, making the flight home straightforward.
              Support bra should be worn throughout travel and for 4–6 weeks total.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Breast Lift in Turkey: FAQs
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
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to Compare Clinics in Turkey?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-violet-100">
            Browse verified clinics with experienced surgeons and comprehensive packages.
          </p>
          <div className="mt-8">
            <Link
              href="/search?procedure=breast-lift&country=turkey"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-violet-600 shadow-lg transition-all hover:bg-violet-50"
            >
              Compare Breast Lift Clinics
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-600">
            <strong>Breast lift in other destinations:</strong>{' '}
            <Link href="/procedures/breast-lift/poland" className="text-violet-600 hover:underline">Poland</Link> ·{' '}
            <Link href="/procedures/breast-lift/spain" className="text-violet-600 hover:underline">Spain</Link> ·{' '}
            <Link href="/procedures/breast-lift/hungary" className="text-violet-600 hover:underline">Hungary</Link>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Related:</strong>{' '}
            <Link href="/procedures/breast-lift" className="text-violet-600 hover:underline">Breast Lift Overview</Link> ·{' '}
            <Link href="/procedures/breast-augmentation/turkey" className="text-violet-600 hover:underline">Breast Augmentation Turkey</Link> ·{' '}
            <Link href="/destinations/turkey" className="text-violet-600 hover:underline">Turkey Guide</Link>
          </p>
        </div>
      </section>
    </LazyMotion>
  )
}
