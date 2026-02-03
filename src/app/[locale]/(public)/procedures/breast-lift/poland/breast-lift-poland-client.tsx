'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Shield, Clock, MapPin, Globe, Heart } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface BreastLiftPolandClientProps {
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
  { title: 'EU Patient Protections', description: 'Full European healthcare regulations and consumer rights' },
  { title: 'Short Flights', description: '2 hours from London — easier travel and recovery' },
  { title: 'Natural Results', description: 'Polish surgeons known for elegant, proportionate outcomes' },
  { title: 'Quality Focus', description: 'Precise technique with attention to scarring' },
]

const CITIES = [
  {
    name: 'Warsaw',
    description: 'Capital city with the most cosmetic surgery options. Modern clinics, experienced surgeons, excellent hospitals.',
    flight: '2 hours from London',
  },
  {
    name: 'Krakow',
    description: 'Beautiful historic city with reputable cosmetic clinics. Cultural setting for recovery.',
    flight: '2.5 hours from London',
  },
]

export function BreastLiftPolandClient({ faqs }: BreastLiftPolandClientProps) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-violet-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <m.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <span className="text-5xl">🇵🇱</span>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Breast Lift in Poland
              </h1>
            </m.div>
            <m.p variants={fadeInUp} className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
              Breast lift from £3,000 with EU standards. Natural results,
              short flights, full patient protections.
            </m.p>
            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/search?procedure=breast-lift&country=poland"
                className="rounded-lg bg-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-violet-700"
              >
                Compare Clinics in Poland →
              </Link>
            </m.div>
            <m.div variants={fadeInUp} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-violet-600">£3,000–£4,000</p>
                <p className="mt-1 text-slate-600">Typical price range</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-violet-600">50–60%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-violet-600">2 hrs</p>
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
              Why Choose Poland for a Breast Lift?
            </m.h2>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Poland offers breast lift surgery with full EU patient protections — the same
                healthcare regulations that apply across Europe. This means strict safety standards,
                regulated facilities, and legal recourse if needed.
              </p>
              <p>
                Polish surgeons are known for a meticulous, natural-looking approach. If you want
                elegant results with minimal visible scarring rather than dramatic transformation,
                Poland is an excellent choice.
              </p>
              <p>
                The short 2-hour flight makes Poland particularly convenient for UK patients.
                Easy travel means less stress during early recovery, and return visits for
                follow-ups are straightforward if needed.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* EU Benefits */}
      <section className="bg-violet-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-violet-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                EU Advantages for UK Patients
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((benefit) => (
                <div key={benefit.title} className="rounded-xl border border-violet-100 bg-white p-5">
                  <h3 className="font-semibold text-slate-900">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{benefit.description}</p>
                </div>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Techniques */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-violet-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Breast Lift Techniques
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Polish surgeons offer all standard breast lift techniques, selecting the best
                approach based on your degree of sagging and goals:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span><strong>Periareolar (Donut) Lift:</strong> Minimal scarring for mild sagging</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span><strong>Lollipop (Vertical) Lift:</strong> Most common, moderate sagging</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span><strong>Anchor (Inverted-T) Lift:</strong> Maximum reshaping, significant sagging</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span><strong>Mastopexy Augmentation:</strong> Lift combined with implants for added volume</span>
                </li>
              </ul>
              <p className="mt-4">
                Polish surgeons pay particular attention to incision placement and closure
                techniques to minimise visible scarring.
              </p>
            </m.div>
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
                Safety Standards in Poland
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Poland's healthcare system is regulated by EU standards. Verify these points when
                choosing a clinic:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Surgeon registered with Polish Medical Chamber
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Specialist certification in plastic surgery
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Licensed surgical facility
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Before/after photos of similar cases
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Clear explanation of technique and scarring
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
              Where to Get a Breast Lift in Poland
            </m.h2>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2">
              {CITIES.map((city) => (
                <div key={city.name} className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-violet-600" />
                    <h3 className="text-xl font-bold text-slate-900">{city.name}</h3>
                  </div>
                  <p className="mt-2 text-slate-600">{city.description}</p>
                  <p className="mt-2 text-sm font-medium text-violet-600">{city.flight}</p>
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
                Recovery & Travel Home
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Plan to stay in Poland for 5–7 days. The short 2-hour flight home is a significant
                advantage — comfortable travel during early recovery.
              </p>
              <p>
                Polish clinics provide support bras and detailed aftercare instructions. You'll
                have a follow-up appointment before departure to ensure you're healing well.
              </p>
              <p>
                Recovery timeline: Return to desk work in 1–2 weeks, light exercise at 4 weeks, full
                activity at 6–8 weeks. Final results visible at 3–6 months as scars fade.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Breast Lift in Poland: FAQs
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
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to Compare Clinics in Poland?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-violet-100">
            Browse verified clinics with EU standards and natural results focus.
          </p>
          <div className="mt-8">
            <Link
              href="/search?procedure=breast-lift&country=poland"
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
            <Link href="/procedures/breast-lift/turkey" className="text-violet-600 hover:underline">Turkey</Link> ·{' '}
            <Link href="/procedures/breast-lift/spain" className="text-violet-600 hover:underline">Spain</Link> ·{' '}
            <Link href="/procedures/breast-lift/hungary" className="text-violet-600 hover:underline">Hungary</Link>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Related:</strong>{' '}
            <Link href="/procedures/breast-lift" className="text-violet-600 hover:underline">Breast Lift Overview</Link> ·{' '}
            <Link href="/procedures/breast-augmentation/poland" className="text-violet-600 hover:underline">Breast Augmentation Poland</Link> ·{' '}
            <Link href="/destinations/poland" className="text-violet-600 hover:underline">Poland Guide</Link>
          </p>
        </div>
      </section>
    </LazyMotion>
  )
}
