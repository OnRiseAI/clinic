'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Shield, Clock, MapPin, Trophy, Sun, User } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface FaceliftSpainClientProps {
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
  { icon: Trophy, title: '#1 Healthcare System', description: 'Bloomberg ranked globally' },
  { icon: Sun, title: 'Mediterranean Recovery', description: 'Ideal climate for healing' },
  { icon: Shield, title: 'World-Class Surgeons', description: 'SECPRE certified experts' },
  { icon: CheckCircle, title: 'EU Protections', description: 'Full patient rights' },
]

const CITIES = [
  {
    name: 'Barcelona',
    description: 'World-class facial surgeons with international reputations. Beautiful city for recovery.',
    highlight: 'Premium choice',
  },
  {
    name: 'Marbella',
    description: 'Luxury clinic experiences with resort-style recovery. Costa del Sol setting.',
    highlight: 'Luxury experience',
  },
  {
    name: 'Madrid',
    description: 'Capital city with excellent private hospitals. Sophisticated recovery environment.',
    highlight: 'Comprehensive options',
  },
]

export function FaceliftSpainClient({ faqs }: FaceliftSpainClientProps) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <m.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <span className="text-5xl">🇪🇸</span>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Facelift in Spain
              </h1>
            </m.div>
            <m.p variants={fadeInUp} className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
              Premium facelift surgery from £5,500. World-class facial surgeons,
              #1 healthcare system, Mediterranean recovery.
            </m.p>
            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/search?procedure=facelift&country=spain"
                className="rounded-lg bg-amber-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-amber-700"
              >
                Compare Clinics in Spain →
              </Link>
            </m.div>
            <m.div variants={fadeInUp} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-amber-600">£5,500–£8,000</p>
                <p className="mt-1 text-slate-600">Premium pricing</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-amber-600">40–50%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-amber-600">#1</p>
                <p className="mt-1 text-slate-600">Healthcare ranking</p>
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
              Why Choose Spain for Premium Facelift?
            </m.h2>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Spain offers facelift at the highest quality level — not the lowest price, but
                arguably the best overall experience. The Bloomberg Healthiest Country Index
                ranks Spain #1 globally, reflecting decades of healthcare investment.
              </p>
              <p>
                Spanish facial surgeons are known for their artistic approach. They create
                natural, elegant results that make patients look refreshed and rested rather
                than obviously "done". This aesthetic sensibility is valued worldwide.
              </p>
              <p>
                The Mediterranean climate is genuinely beneficial for recovery. Warm weather,
                beautiful surroundings, and world-class hospitality make the longer facelift
                recovery period more pleasant.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-amber-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Spain's Advantages
            </m.h2>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((benefit) => (
                <div key={benefit.title} className="rounded-xl border border-amber-100 bg-white p-5">
                  <benefit.icon className="h-8 w-8 text-amber-600" />
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
              <User className="h-8 w-8 text-amber-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Facelift Options in Spain
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>Spanish surgeons offer comprehensive facial rejuvenation with an artistic approach:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span><strong>Full Facelift (£7,000–£8,000):</strong> Comprehensive rejuvenation with natural results</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span><strong>Mini Facelift (£5,500–£6,500):</strong> Lower face focus, elegant outcomes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span><strong>Deep Plane Facelift (£8,000–£10,000):</strong> Advanced technique, longer-lasting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span><strong>Combination packages:</strong> Add blepharoplasty, neck lift, or fat transfer</span>
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
              Where to Get Facelift in Spain
            </m.h2>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-3">
              {CITIES.map((city) => (
                <div key={city.name} className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-amber-600" />
                      <h3 className="text-xl font-bold text-slate-900">{city.name}</h3>
                    </div>
                    <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                      {city.highlight}
                    </span>
                  </div>
                  <p className="mt-3 text-slate-600">{city.description}</p>
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
              <Shield className="h-8 w-8 text-amber-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Safety Standards in Spain
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Spanish healthcare operates at the highest international standards. Facial
                surgeons are members of SECPRE (Spanish Society of Plastic Surgery) and
                follow strict EU regulations.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  World-class hospital facilities
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  SECPRE-certified plastic surgeons
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Full EU patient protections
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  Artistic approach to natural results
                </li>
              </ul>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Recovery */}
      <section className="bg-amber-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-amber-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Recovery in Spain
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Plan for 10–14 days in Spain. The Mediterranean climate makes the longer
                facelift recovery period more pleasant — warm weather, beautiful surroundings,
                and excellent food support healing.
              </p>
              <p>
                Stitches are removed at day 7–10. The 2–2.5 hour flight home is comfortable
                after this point. Spain's resort options, especially in Marbella, provide
                luxury recovery settings.
              </p>
              <p>
                Many patients extend their stay to combine recovery with a relaxing holiday,
                returning home both rejuvenated and rested.
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
              Facelift in Spain: FAQs
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
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready for Premium Facelift in Spain?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-amber-100">
            Browse world-class clinics with the highest safety and quality standards.
          </p>
          <div className="mt-8">
            <Link
              href="/search?procedure=facelift&country=spain"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-amber-600 shadow-lg transition-all hover:bg-amber-50"
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
            <Link href="/procedures/facelift/turkey" className="text-amber-600 hover:underline">Turkey</Link> ·{' '}
            <Link href="/procedures/facelift/poland" className="text-amber-600 hover:underline">Poland</Link> ·{' '}
            <Link href="/procedures/facelift/hungary" className="text-amber-600 hover:underline">Hungary</Link>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Related:</strong>{' '}
            <Link href="/procedures/facelift" className="text-amber-600 hover:underline">Facelift Overview</Link> ·{' '}
            <Link href="/procedures/blepharoplasty/spain" className="text-amber-600 hover:underline">Eyelid Surgery Spain</Link> ·{' '}
            <Link href="/destinations/spain" className="text-amber-600 hover:underline">Spain Guide</Link>
          </p>
        </div>
      </section>
    </LazyMotion>
  )
}
