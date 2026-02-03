'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Shield, Clock, MapPin, Globe } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface BBLPolandClientProps {
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
  { title: 'EU Patient Protections', description: 'Full EU healthcare regulations and consumer rights' },
  { title: 'Short Flights', description: '2 hours from London — easier recovery travel' },
  { title: 'Natural Results', description: 'Conservative approach, elegant outcomes' },
  { title: 'Quality Focus', description: 'EU-certified materials and implants' },
]

const CITIES = [
  {
    name: 'Warsaw',
    description: 'Capital city with the most cosmetic surgery options. Modern clinics, experienced surgeons.',
    flight: '2 hours from London',
  },
  {
    name: 'Kraków',
    description: 'Beautiful historic city with reputable cosmetic clinics. Cultural recovery setting.',
    flight: '2.5 hours from London',
  },
]

export function BBLPolandClient({ faqs }: BBLPolandClientProps) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <m.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <span className="text-5xl">🇵🇱</span>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                BBL in Poland
              </h1>
            </m.div>
            <m.p variants={fadeInUp} className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
              Brazilian Butt Lift from £3,500 with EU standards. Natural results,
              short flights, full patient protections.
            </m.p>
            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/search?procedure=bbl&country=poland"
                className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-blue-700"
              >
                Compare BBL Clinics in Poland →
              </Link>
            </m.div>
            <m.div variants={fadeInUp} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-blue-600">£3,500–£5,500</p>
                <p className="mt-1 text-slate-600">Typical price range</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-blue-600">50–60%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-blue-600">2 hrs</p>
                <p className="mt-1 text-slate-600">Flight from London</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Why Poland */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Why Choose Poland for BBL?
            </m.h2>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Poland offers BBL with full EU patient protections — the same healthcare
                regulations that apply in the UK pre-Brexit. This means strict safety
                standards, regulated facilities, and legal recourse if needed.
              </p>
              <p>
                Polish surgeons are known for a conservative, natural-looking approach
                rather than extreme augmentation. If you want enhanced curves that look
                proportionate and elegant, Poland is an excellent choice.
              </p>
              <p>
                The short 2-hour flight makes travel during early recovery much easier
                than longer journeys. You'll still need a BBL pillow, but less time in
                the air reduces discomfort.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* EU Benefits */}
      <section className="bg-blue-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-blue-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                EU Advantages for UK Patients
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((benefit) => (
                <div key={benefit.title} className="rounded-xl border border-blue-100 bg-white p-5">
                  <h3 className="font-semibold text-slate-900">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{benefit.description}</p>
                </div>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Safety */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                BBL Safety in Poland
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Poland has less BBL volume than Turkey, so it's especially important to
                verify your surgeon's specific BBL experience. Look for surgeons who:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Perform BBL regularly (ask for annual numbers)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Follow international safety guidelines (subcutaneous injection)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Are registered with the Polish Medical Chamber
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Can show before/after photos of similar cases
                </li>
              </ul>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Cities */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Where to Get BBL in Poland
            </m.h2>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2">
              {CITIES.map((city) => (
                <div key={city.name} className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <h3 className="text-xl font-bold text-slate-900">{city.name}</h3>
                  </div>
                  <p className="mt-2 text-slate-600">{city.description}</p>
                  <p className="mt-2 text-sm font-medium text-blue-600">{city.flight}</p>
                </div>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Recovery */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Recovery & Travel Home
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Plan to stay in Poland for 10–14 days. The short 2-hour flight home
                is a significant advantage — less time sitting (even with a BBL pillow)
                means more comfort during early recovery.
              </p>
              <p>
                You'll need to use a BBL pillow for sitting and cannot sit directly
                on your buttocks for 2–3 weeks. Polish clinics will provide a pillow
                and detailed aftercare instructions.
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
              BBL in Poland: Frequently Asked Questions
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
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to Compare BBL Clinics in Poland?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Browse verified clinics with EU standards and natural results focus.
          </p>
          <div className="mt-8">
            <Link
              href="/search?procedure=bbl&country=poland"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg transition-all hover:bg-blue-50"
            >
              Compare BBL Clinics in Poland
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-600">
            <strong>BBL in other destinations:</strong>{' '}
            <Link href="/procedures/bbl/turkey" className="text-blue-600 hover:underline">Turkey</Link> ·{' '}
            <Link href="/procedures/bbl/spain" className="text-blue-600 hover:underline">Spain</Link> ·{' '}
            <Link href="/procedures/bbl/hungary" className="text-blue-600 hover:underline">Hungary</Link>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Related:</strong>{' '}
            <Link href="/procedures/bbl" className="text-blue-600 hover:underline">BBL Overview</Link> ·{' '}
            <Link href="/procedures/liposuction/poland" className="text-blue-600 hover:underline">Liposuction Poland</Link> ·{' '}
            <Link href="/destinations/poland" className="text-blue-600 hover:underline">Poland Guide</Link>
          </p>
        </div>
      </section>
    </LazyMotion>
  )
}
