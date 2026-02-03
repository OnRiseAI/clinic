'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Shield, Clock, MapPin, Heart, Sparkles, Globe } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface BreastReductionClientProps {
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
    price: '£3,000–£4,500',
    savings: '60–70%',
    highlight: 'Best value',
    href: '/procedures/breast-reduction/turkey',
    color: 'pink',
  },
  {
    country: 'Poland',
    flag: '🇵🇱',
    price: '£3,500–£5,000',
    savings: '50–60%',
    highlight: 'EU standards',
    href: '/procedures/breast-reduction/poland',
    color: 'blue',
  },
  {
    country: 'Hungary',
    flag: '🇭🇺',
    price: '£3,800–£5,200',
    savings: '50–55%',
    highlight: 'Quality focus',
    href: '/procedures/breast-reduction/hungary',
    color: 'emerald',
  },
  {
    country: 'Spain',
    flag: '🇪🇸',
    price: '£4,500–£6,000',
    savings: '40–50%',
    highlight: 'Premium',
    href: '/procedures/breast-reduction/spain',
    color: 'amber',
  },
]

const REDUCTION_TECHNIQUES = [
  {
    name: 'Anchor (Inverted-T)',
    description: 'Most common technique. Allows maximum tissue removal. Incisions around areola, vertically down, and along breast fold.',
    suitability: 'Large reductions',
  },
  {
    name: 'Lollipop (Vertical)',
    description: 'Reduced scarring with incisions around areola and vertically down. Good for moderate reductions.',
    suitability: 'Moderate reductions',
  },
  {
    name: 'Liposuction-Assisted',
    description: 'Minimal scarring using liposuction to remove fat. Limited tissue removal capability.',
    suitability: 'Minor reductions',
  },
]

const SAFETY_CHECKLIST = [
  'Board-certified plastic surgeon',
  'JCI or equivalent hospital accreditation',
  'Before/after photos of similar cases',
  'Clear explanation of technique options',
  'Overnight hospital stay included',
  'Proper post-operative care plan',
]

export function BreastReductionClient({ faqs }: BreastReductionClientProps) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-pink-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <m.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <Heart className="h-10 w-10 text-pink-600" />
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Breast Reduction Abroad
              </h1>
            </m.div>
            <m.p variants={fadeInUp} className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
              Compare breast reduction prices from £3,000. Experienced surgeons,
              comprehensive packages. Save 50–70% vs UK prices.
            </m.p>
            <m.div variants={fadeInUp} className="mt-8 flex justify-center">
              <Link
                href="/search?procedure=breast-reduction"
                className="rounded-lg bg-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-pink-700"
              >
                Compare All Clinics
              </Link>
            </m.div>
            <m.div variants={fadeInUp} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-pink-600">£3,000–£6,000</p>
                <p className="mt-1 text-slate-600">Price range abroad</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-pink-600">50–70%</p>
                <p className="mt-1 text-slate-600">Savings vs UK</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-pink-600">7–10 days</p>
                <p className="mt-1 text-slate-600">Stay required</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* What is Breast Reduction */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              What is Breast Reduction?
            </m.h2>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Breast reduction (reduction mammoplasty) is a surgical procedure to reduce breast
                size by removing excess breast tissue, fat, and skin. It's sought by women
                experiencing physical discomfort, back pain, or self-consciousness due to
                overly large breasts.
              </p>
              <p>
                The procedure involves reshaping the breast to a smaller, more proportionate size
                while repositioning the nipple. Surgery takes 2–4 hours under general anaesthesia,
                with most patients staying overnight in hospital for monitoring.
              </p>
              <p>
                Beyond aesthetic benefits, breast reduction often provides significant relief from
                neck, back, and shoulder pain. Surgeons abroad use the same techniques as UK
                specialists at significantly lower prices due to reduced operating costs.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Destinations */}
      <section className="bg-pink-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-pink-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Compare Destinations
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {DESTINATIONS.map((dest) => (
                <Link
                  key={dest.country}
                  href={dest.href}
                  className="group rounded-xl border border-pink-100 bg-white p-5 transition-all hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{dest.flag}</span>
                    <span className="rounded-full bg-pink-100 px-2 py-1 text-xs font-medium text-pink-700">
                      {dest.highlight}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-pink-600">
                    {dest.country}
                  </h3>
                  <p className="mt-2 text-2xl font-bold text-pink-600">{dest.price}</p>
                  <p className="text-sm text-slate-600">Save {dest.savings} vs UK</p>
                  <p className="mt-3 text-sm font-medium text-pink-600 group-hover:underline">
                    View clinics →
                  </p>
                </Link>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Reduction Techniques */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-pink-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Reduction Techniques
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-3">
              {REDUCTION_TECHNIQUES.map((type) => (
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
              <strong>Surgeon expertise matters:</strong> The technique used depends on your breast
              size, desired reduction, and skin elasticity. Your surgeon will recommend the best
              approach during consultation.
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
                Safety Checklist
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-6 space-y-4 text-slate-600">
              <p>
                Breast reduction is a well-established procedure with excellent safety when
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
                <strong>Note on nipple sensation:</strong> Most patients retain nipple sensation,
                but some temporary or permanent changes are possible. Discuss this with your surgeon.
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
              <Clock className="h-8 w-8 text-pink-600" />
              <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Recovery Timeline
              </m.h2>
            </div>
            <m.div variants={fadeInUp} className="mt-8 space-y-4">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-pink-600">Day 1:</span>
                <span className="ml-2 text-slate-600">Surgery (2–4 hours), overnight hospital stay, drains may be placed</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-pink-600">Days 2–5:</span>
                <span className="ml-2 text-slate-600">Rest at hotel, mild to moderate discomfort, compression bra, drains removed</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-pink-600">Days 6–7:</span>
                <span className="ml-2 text-slate-600">Follow-up appointment, fit-to-fly clearance, fly home comfortably</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-pink-600">Week 1–2:</span>
                <span className="ml-2 text-slate-600">Return to desk work, continue compression bra, avoid lifting</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-pink-600">Week 4–6:</span>
                <span className="ml-2 text-slate-600">Light exercise allowed, swelling continues to reduce</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="font-semibold text-pink-600">Months 3–6:</span>
                <span className="ml-2 text-slate-600">Final results as breasts settle, scars continue to fade</span>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-pink-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <m.h2 variants={fadeInUp} className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Benefits of Breast Reduction
            </m.h2>
            <m.div variants={fadeInUp} className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-pink-100 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Physical Benefits</h3>
                <ul className="mt-3 space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-pink-600" />
                    <span><strong>Pain relief:</strong> Reduced neck, back, and shoulder pain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-pink-600" />
                    <span><strong>Better posture:</strong> Less strain on spine and shoulders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-pink-600" />
                    <span><strong>Exercise easier:</strong> More comfortable physical activity</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-pink-100 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Lifestyle Benefits</h3>
                <ul className="mt-3 space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span><strong>Clothing fit:</strong> Easier to find well-fitting clothes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span><strong>Confidence:</strong> Improved body proportions and self-image</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span><strong>Skin irritation:</strong> Reduced rashes under breast fold</span>
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
      <section className="bg-gradient-to-r from-pink-600 to-pink-800 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to Compare Breast Reduction Clinics?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-pink-100">
            Browse verified clinics with experienced surgeons and comprehensive care packages.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/search?procedure=breast-reduction"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-pink-600 shadow-lg transition-all hover:bg-pink-50"
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
            <strong>Breast reduction by destination:</strong>{' '}
            <Link href="/procedures/breast-reduction/turkey" className="text-pink-600 hover:underline">Turkey</Link> ·{' '}
            <Link href="/procedures/breast-reduction/poland" className="text-pink-600 hover:underline">Poland</Link> ·{' '}
            <Link href="/procedures/breast-reduction/spain" className="text-pink-600 hover:underline">Spain</Link> ·{' '}
            <Link href="/procedures/breast-reduction/hungary" className="text-pink-600 hover:underline">Hungary</Link>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Related procedures:</strong>{' '}
            <Link href="/procedures/breast-lift" className="text-pink-600 hover:underline">Breast Lift</Link> ·{' '}
            <Link href="/procedures/breast-augmentation" className="text-pink-600 hover:underline">Breast Augmentation</Link> ·{' '}
            <Link href="/procedures/liposuction" className="text-pink-600 hover:underline">Liposuction</Link> ·{' '}
            <Link href="/procedures/tummy-tuck" className="text-pink-600 hover:underline">Tummy Tuck</Link>
          </p>
        </div>
      </section>
    </LazyMotion>
  )
}
