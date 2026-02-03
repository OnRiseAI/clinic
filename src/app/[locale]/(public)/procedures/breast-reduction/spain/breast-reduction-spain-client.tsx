'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Shield, Clock, MapPin, Heart, Package } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface BreastReductionSpainClientProps {
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
  'Breast reduction surgery',
  'General anaesthesia',
  'Hospital stay (1-2 nights)',
  'Pre-operative consultation',
  'Blood tests and assessments',
  'Compression/surgical bra',
  'Post-operative medications',
  'Follow-up appointments',
  'English-speaking staff',
  'Patient coordinator',
]

const CITIES = [
  {
    name: 'Barcelona',
    description: 'Leading medical tourism destination with world-class plastic surgery clinics. Excellent transport links and recovery-friendly environment.',
    clinics: '25+ clinics',
  },
  {
    name: 'Madrid',
    description: 'Capital city with prestigious surgeons and modern facilities. Strong healthcare infrastructure and easy UK flight connections.',
    clinics: '20+ clinics',
  },
]

const ADVANTAGES = [
  { title: 'Premium Quality', description: 'World-class surgeons and facilities' },
  { title: 'EU Standards', description: 'Full EU medical regulations and oversight' },
  { title: 'Great Climate', description: 'Pleasant weather aids comfortable recovery' },
  { title: 'Easy Travel', description: '2-3 hour flights from most UK airports' },
]

export function BreastReductionSpainClient({ faqs }: BreastReductionSpainClientProps) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-pink-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <m.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <span className="text-5xl">🇪🇸</span>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Breast Reduction in Spain
              </h1>
            </m.div>
            <m.p variants={fadeInUp} className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
              Premium breast reduction from £4,500. World-class surgeons,
              excellent facilities, comfortable recovery in a beautiful climate.
            </m.p>
            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/search?procedure=breast-reduction&country=spain"
                className="rounded-lg bg-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-pink-700"
              >
                Compare Clinics in Spain →
              </Link>
            </m.div>
            <m.div variants={fadeInUp} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-pink-600">£4,500–£6,000</p>
                <p className="mt-1 text-slate-600">Treatment cost</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-pink-600">40–50%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-pink-600">Premium</p>
                <p className="mt-1 text-slate-600">Quality tier</p>
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
              Why Choose Spain for Breast Reduction?
            </m.h2>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Spain offers a premium option for breast reduction surgery, combining world-class
                medical expertise with the familiarity and comfort of a popular European destination.
                Spanish surgeons are highly trained with many holding international credentials.
              </p>
              <p>
                As an EU member, Spain maintains strict medical regulations and standards. Private
                clinics in Barcelona and Madrid feature state-of-the-art facilities and equipment
                comparable to the best UK hospitals.
              </p>
              <p>
                The pleasant Spanish climate makes recovery more comfortable, and the familiar
                tourist infrastructure means excellent hotels, restaurants, and services. Many
                patients appreciate recovering in a relaxed environment rather than at home.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-pink-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-pink-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Advantages of Spain
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ADVANTAGES.map((advantage) => (
                <div key={advantage.title} className="rounded-xl border border-pink-100 bg-white p-5">
                  <h3 className="font-bold text-slate-900">{advantage.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{advantage.description}</p>
                </div>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Package Inclusions */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-pink-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                What's Included in Spain
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
              Hotel and airport transfers may be included or arranged separately. Always confirm exact inclusions before booking.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Safety */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-pink-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Safety Standards in Spain
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Spain has one of the best healthcare systems in Europe. Private clinics maintain
                excellent standards with modern equipment, experienced staff, and comprehensive
                safety protocols.
              </p>
              <p>Key verification points for breast reduction in Spain:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  SECPRE membership (Spanish Society of Plastic Surgery)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  EU-regulated medical facility
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Before/after photos of similar cases
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Hospital stay with 24-hour monitoring
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Comprehensive post-operative care plan
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
              Where to Get Breast Reduction in Spain
            </m.h2>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2">
              {CITIES.map((city) => (
                <div key={city.name} className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-pink-600" />
                    <h3 className="text-xl font-bold text-slate-900">{city.name}</h3>
                  </div>
                  <p className="mt-2 text-slate-600">{city.description}</p>
                  <p className="mt-2 text-sm font-medium text-pink-600">{city.clinics}</p>
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
              <Clock className="h-8 w-8 text-pink-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Recovery Timeline in Spain
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 space-y-4">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-pink-600">Day 1:</span>
                <span className="ml-2 text-slate-600">Surgery (2–4 hours), overnight hospital stay</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-pink-600">Days 2–5:</span>
                <span className="ml-2 text-slate-600">Rest at hotel, enjoy pleasant climate, compression bra</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-pink-600">Days 6–7:</span>
                <span className="ml-2 text-slate-600">Follow-up with surgeon, fit-to-fly clearance</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-pink-600">Day 7–10:</span>
                <span className="ml-2 text-slate-600">Fly home comfortably, continue recovery at home</span>
              </div>
            </m.div>
            <m.p variants={fadeInUp} className="mt-6 text-slate-600">
              Spain's pleasant climate and excellent tourist infrastructure make recovery more
              enjoyable. Light sightseeing is usually possible after day 5, but avoid sun exposure
              on incision areas.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Breast Reduction in Spain: FAQs
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
      <section className="bg-gradient-to-r from-pink-600 to-pink-800 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to Compare Clinics in Spain?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-pink-100">
            Browse verified premium clinics with world-class surgeons.
          </p>
          <div className="mt-8">
            <Link
              href="/search?procedure=breast-reduction&country=spain"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-pink-600 shadow-lg transition-all hover:bg-pink-50"
            >
              Compare Breast Reduction Clinics
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-600">
            <strong>Breast reduction in other destinations:</strong>{' '}
            <Link href="/procedures/breast-reduction/turkey" className="text-pink-600 hover:underline">Turkey</Link> ·{' '}
            <Link href="/procedures/breast-reduction/poland" className="text-pink-600 hover:underline">Poland</Link> ·{' '}
            <Link href="/procedures/breast-reduction/hungary" className="text-pink-600 hover:underline">Hungary</Link>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Related:</strong>{' '}
            <Link href="/procedures/breast-reduction" className="text-pink-600 hover:underline">Breast Reduction Overview</Link> ·{' '}
            <Link href="/procedures/breast-lift/spain" className="text-pink-600 hover:underline">Breast Lift Spain</Link> ·{' '}
            <Link href="/destinations/spain" className="text-pink-600 hover:underline">Spain Guide</Link>
          </p>
        </div>
      </section>
    </LazyMotion>
  )
}
