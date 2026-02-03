'use client'

import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { ClinicCard } from '@/components/clinics/clinic-card'
import { FAQSection } from '@/components/seo/faq-section'
import { AIAnswerBlock } from '@/components/seo/ai-answer-block'
import {
  CheckCircle,
  AlertTriangle,
  Plane,
  Shield,
  Clock,
  BadgeCheck,
  FileText,
  Users,
  Star,
  Stethoscope,
  Heart,
  Camera,
  MessageSquare,
} from 'lucide-react'
import type { ProcedureWithStats } from '@/lib/data/content'
import type { ClinicCardData } from '@/lib/data/clinics'

// =============================================================================
// TYPES
// =============================================================================

interface CosmeticSurgeryLandingClientProps {
  procedures: ProcedureWithStats[]
  clinics: ClinicCardData[]
  faqs: Array<{ question: string; answer: string }>
}

// =============================================================================
// STATIC DATA — PROCEDURES
// =============================================================================

const PROCEDURES = [
  {
    name: 'Rhinoplasty',
    slug: 'rhinoplasty',
    description:
      'Nose reshaping surgery to improve appearance or breathing. One of the most technically demanding cosmetic procedures, requiring a highly skilled surgeon.',
    ukPrice: '£5,000–£7,000',
    abroadPrice: '£2,000–£3,500',
    topDestination: 'turkey',
    savings: '50–60%',
  },
  {
    name: 'Tummy Tuck',
    slug: 'tummy-tuck',
    description:
      'Abdominoplasty removes excess skin and fat while tightening abdominal muscles. Popular after weight loss or pregnancy. Often combined with liposuction.',
    ukPrice: '£6,000–£9,000',
    abroadPrice: '£2,500–£4,500',
    topDestination: 'turkey',
    savings: '50–55%',
  },
  {
    name: 'Liposuction',
    slug: 'liposuction',
    description:
      'Fat removal from specific areas like abdomen, thighs, arms, or chin. Modern techniques include VASER and laser-assisted lipo for better results and faster recovery.',
    ukPrice: '£4,000–£6,000',
    abroadPrice: '£1,500–£3,000',
    topDestination: 'turkey',
    savings: '50–60%',
  },
  {
    name: 'Breast Augmentation',
    slug: 'breast-augmentation',
    description:
      'Breast enlargement using silicone or saline implants. Includes various implant shapes and placement options. Requires careful consultation to choose the right size.',
    ukPrice: '£6,000–£8,000',
    abroadPrice: '£2,500–£4,000',
    topDestination: 'turkey',
    savings: '45–55%',
  },
  {
    name: 'Facelift',
    slug: 'facelift',
    description:
      'Surgical facial rejuvenation tightening loose skin and muscles. Various techniques from mini-lift to full facelift depending on your needs and age.',
    ukPrice: '£8,000–£12,000',
    abroadPrice: '£3,000–£5,000',
    topDestination: 'spain',
    savings: '55–60%',
  },
  {
    name: 'Brazilian Butt Lift (BBL)',
    slug: 'bbl',
    description:
      'Fat transfer to buttocks using your own body fat harvested via liposuction. Results in natural-looking enhancement. Requires experienced surgeon due to safety considerations.',
    ukPrice: '£8,000–£12,000',
    abroadPrice: '£3,000–£5,000',
    topDestination: 'turkey',
    savings: '55–60%',
  },
]

// =============================================================================
// STATIC DATA — DESTINATIONS
// =============================================================================

const DESTINATIONS = [
  {
    country: 'Turkey',
    slug: 'turkey',
    cities: 'Istanbul, Antalya',
    flight: '3.5–4 hours',
    description:
      'The world\'s leading destination for cosmetic surgery with over 1.5 million medical tourists annually. Turkey offers exceptional value with highly experienced surgeons who perform hundreds of procedures each year.',
    knownFor: 'Rhinoplasty, BBL, breast surgery, tummy tuck, hair transplants',
    highlight: 'Highest volume',
  },
  {
    country: 'Poland',
    slug: 'poland',
    cities: 'Warsaw, Kraków, Wrocław',
    flight: '2–2.5 hours',
    description:
      'Emerging as Europe\'s cosmetic surgery hub with 42% of medical tourists choosing Poland for aesthetic procedures. EU standards, short flights, and surgeons known for natural-looking results.',
    knownFor: 'Rhinoplasty, breast surgery, body contouring, facial procedures',
    highlight: 'EU standards',
  },
  {
    country: 'Spain',
    slug: 'spain',
    cities: 'Barcelona, Madrid, Marbella',
    flight: '2–2.5 hours',
    description:
      'Premium cosmetic surgery destination with world-class healthcare (#1 Bloomberg ranking). Spain suits patients prioritising quality and recovery experience over maximum savings.',
    knownFor: 'Premium cosmetic surgery, facial procedures, body contouring',
    highlight: 'Premium quality',
  },
  {
    country: 'Hungary',
    slug: 'hungary',
    cities: 'Budapest',
    flight: '2.5 hours',
    description:
      'Known primarily for dental work but with growing cosmetic surgery expertise, particularly in facial procedures. EU member with thermal spa recovery options unique to Budapest.',
    knownFor: 'Rhinoplasty, facial procedures, body contouring',
    highlight: 'Spa recovery',
  },
]

// =============================================================================
// STATIC DATA — CHECKLIST
// =============================================================================

const CHECKLIST_ITEMS = [
  {
    icon: Shield,
    title: 'Check surgeon credentials',
    description:
      'Verify board certification in plastic surgery, membership in ISAPS or EBOPRAS, years of experience in your specific procedure, and training background. Many top surgeons abroad trained in UK, Germany, or USA.',
  },
  {
    icon: BadgeCheck,
    title: 'Look for clinic accreditation',
    description:
      'JCI (Joint Commission International) is the gold standard. Also look for ISO certification or TEMOS accreditation. These ensure the facility meets rigorous international standards for safety and quality.',
  },
  {
    icon: Camera,
    title: 'Review before/after photos',
    description:
      'Ask for before/after photos of patients with similar anatomy and goals. Look for natural-looking results. Be wary of clinics unwilling to share portfolio work or that only show "perfect" results.',
  },
  {
    icon: Star,
    title: 'Read verified patient reviews',
    description:
      'Look for reviews on independent platforms — Google, Trustpilot, RealSelf. Pay attention to reviews from UK patients. Check how the clinic responds to negative feedback.',
  },
  {
    icon: MessageSquare,
    title: 'Have a video consultation',
    description:
      'A reputable clinic will offer video consultations before booking. This allows you to assess the surgeon, ask questions, and ensure clear communication. Avoid clinics that push booking without consultation.',
  },
  {
    icon: FileText,
    title: 'Get everything in writing',
    description:
      'Obtain a detailed written treatment plan with itemised costs, what\'s included, revision policy, guarantee terms, and aftercare protocol. Never pay without written documentation.',
  },
  {
    icon: Clock,
    title: 'Understand recovery requirements',
    description:
      'Know exactly how long you need to stay, when you can fly, what activities to avoid, and the full recovery timeline. Ensure you can take adequate time off work.',
  },
  {
    icon: Heart,
    title: 'Check complication protocols',
    description:
      'Ask what happens if something goes wrong. Reputable clinics have clear protocols for complications, revision surgery policies, and partnerships with UK healthcare providers if needed.',
  },
]

// =============================================================================
// STATIC DATA — RED FLAGS
// =============================================================================

const RED_FLAGS = [
  'Pressure to book quickly without proper consultation',
  'No video consultation offered with the surgeon',
  'Unable to provide surgeon credentials or clinic accreditation',
  'Prices significantly lower than other reputable clinics',
  'No clear aftercare plan or follow-up protocol',
  'Reluctant to share before/after photos of similar procedures',
  'Poor communication or difficulty getting responses',
  'No written treatment plan or unclear pricing',
]

// =============================================================================
// STATIC DATA — COST COMPARISON
// =============================================================================

const COST_COMPARISON = [
  { procedure: 'Rhinoplasty', uk: '£5,000–£7,000', abroad: '£2,000–£3,500', savings: '50–60%' },
  { procedure: 'Tummy Tuck', uk: '£6,000–£9,000', abroad: '£2,500–£4,500', savings: '50–55%' },
  { procedure: 'Liposuction', uk: '£4,000–£6,000', abroad: '£1,500–£3,000', savings: '50–60%' },
  { procedure: 'Breast Augmentation', uk: '£6,000–£8,000', abroad: '£2,500–£4,000', savings: '45–55%' },
  { procedure: 'Facelift', uk: '£8,000–£12,000', abroad: '£3,000–£5,000', savings: '55–60%' },
  { procedure: 'BBL', uk: '£8,000–£12,000', abroad: '£3,000–£5,000', savings: '55–60%' },
]

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
}

// =============================================================================
// COMPONENT
// =============================================================================

export function CosmeticSurgeryLandingClient({
  procedures: dbProcedures,
  clinics,
  faqs,
}: CosmeticSurgeryLandingClientProps) {
  return (
    <>
      {/* ===================================================================
          SECTION A: HERO
          =================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-600 via-rose-700 to-rose-800 text-white">
        <div className="absolute inset-0 bg-[url('/images/patterns/medical-pattern.svg')] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
              Cosmetic Surgery Abroad: Your Complete Guide
            </h1>
            <p className="mt-4 text-base text-rose-100 sm:mt-6 sm:text-lg lg:text-xl">
              Compare verified cosmetic surgery clinics across Turkey, Poland, Spain and Hungary.
              Real prices. Real reviews. Expert guidance.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link href="/search?category=cosmetic-surgery">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Browse Cosmetic Surgery Clinics
                </Button>
              </Link>
              <Link href="#procedures">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full text-white hover:bg-white/10 sm:w-auto"
                >
                  View Procedures
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/20 pt-8 sm:mt-12 sm:grid-cols-4 sm:gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold sm:text-3xl">300+</p>
              <p className="text-xs text-rose-200 sm:text-sm">Verified Clinics</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold sm:text-3xl">8,000+</p>
              <p className="text-xs text-rose-200 sm:text-sm">Patient Reviews</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold sm:text-3xl">40–70%</p>
              <p className="text-xs text-rose-200 sm:text-sm">Average Savings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold sm:text-3xl">Free</p>
              <p className="text-xs text-rose-200 sm:text-sm">Consultation Matching</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* ===================================================================
            SECTION B: WHY COSMETIC SURGERY ABROAD
            =================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Why UK Patients Choose Cosmetic Surgery Abroad
          </h2>

          <div className="mt-6 space-y-4 text-neutral-700 sm:mt-8 sm:space-y-6">
            <p className="text-base leading-relaxed sm:text-lg">
              Cosmetic surgery in the UK is expensive. A rhinoplasty costs £5,000–£7,000, a tummy
              tuck runs £6,000–£9,000, and breast augmentation is £6,000–£8,000. For many
              patients, these prices are simply unaffordable — leading them to either give up on
              procedures they genuinely want, or seek more affordable options abroad.
            </p>

            <p className="leading-relaxed">
              The same procedures performed by equally qualified surgeons using identical
              implants and techniques cost 40–70% less in countries like Turkey, Poland, and
              Spain. This isn't because quality is lower — it's because operating costs, wages,
              and overheads are significantly lower, while competition between clinics keeps
              prices fair.
            </p>

            <p className="leading-relaxed">
              Turkey alone receives over 1.5 million medical tourists annually, with cosmetic
              surgery being a major driver. Polish clinics report that 42% of their medical
              tourists come specifically for cosmetic procedures. Spain offers premium
              experiences with world-class healthcare standards. These aren't backstreet
              operations — they're modern facilities with internationally trained surgeons.
            </p>

            <p className="leading-relaxed">
              However, cosmetic surgery abroad isn't without risks. Choosing the wrong clinic can
              lead to poor results, complications, or difficulty getting corrections. This guide
              helps you navigate the decision: understanding which procedures work well abroad,
              which destinations suit your needs, and how to identify reputable clinics.
            </p>
          </div>

          {/* AI Answer Block for GEO */}
          <div className="mt-8">
            <AIAnswerBlock
              question="Is cosmetic surgery abroad safe?"
              answer="Cosmetic surgery abroad is safe when you choose accredited clinics with qualified surgeons. Look for JCI, ISO, or TEMOS certification. Many surgeons abroad trained in the UK, Germany, or USA. Turkey, Poland, and Spain have well-established medical tourism industries with modern facilities. The key is thorough research: verify credentials, read reviews, and ensure proper aftercare protocols."
              entityName="Cosmetic Surgery Abroad"
              entityType="MedicalSpecialty"
              className="cosmetic-summary"
            />
          </div>
        </m.section>

        {/* ===================================================================
            SECTION C: POPULAR PROCEDURES
            =================================================================== */}
        <m.section {...fadeInUp} id="procedures" className="mb-16 scroll-mt-8 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Most Popular Cosmetic Procedures Abroad
          </h2>
          <p className="mt-2 text-neutral-600">
            Compare UK prices with typical costs at accredited clinics abroad
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {PROCEDURES.map((procedure, index) => (
              <m.div
                key={procedure.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/procedures/${procedure.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:border-rose-200 hover:shadow-md sm:p-6"
                >
                  <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-rose-600">
                    {procedure.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-neutral-600">
                    {procedure.description}
                  </p>
                  <div className="mt-4 space-y-2 border-t border-neutral-100 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">UK Price</span>
                      <span className="font-medium text-neutral-900">{procedure.ukPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">Abroad</span>
                      <span className="font-semibold text-green-600">{procedure.abroadPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">Savings</span>
                      <span className="font-semibold text-rose-600">{procedure.savings}</span>
                    </div>
                  </div>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-rose-600">
                    View clinics →
                  </span>
                </Link>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* ===================================================================
            SECTION D: COST COMPARISON TABLE
            =================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Cosmetic Surgery Cost Comparison: UK vs Abroad
          </h2>
          <p className="mt-2 text-neutral-600">
            Typical prices at accredited clinics — savings of 40–70%
          </p>

          <div className="mt-6 overflow-x-auto sm:mt-8">
            <table className="w-full min-w-[500px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Procedure</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700">UK Price</th>
                  <th className="px-4 py-3 text-left font-semibold text-rose-700">Abroad</th>
                  <th className="px-4 py-3 text-left font-semibold text-green-700">Savings</th>
                </tr>
              </thead>
              <tbody>
                {COST_COMPARISON.map((row, index) => (
                  <tr
                    key={row.procedure}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}
                  >
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-neutral-900">
                      {row.procedure}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-neutral-600">
                      {row.uk}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-rose-700">
                      {row.abroad}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 font-semibold text-green-600">
                      {row.savings}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-neutral-500">
            Prices are indicative and vary by clinic, surgeon experience, and specific requirements.
            Always get a personalised quote.
          </p>
        </m.section>

        {/* ===================================================================
            SECTION E: TOP DESTINATIONS
            =================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Best Countries for Cosmetic Surgery from the UK
          </h2>
          <p className="mt-2 text-neutral-600">
            Popular destinations with accredited clinics and experienced surgeons
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6">
            {DESTINATIONS.map((destination, index) => (
              <m.div
                key={destination.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">{destination.country}</h3>
                    <p className="text-sm text-neutral-500">{destination.cities}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">
                      <Plane className="h-3 w-3" />
                      {destination.flight}
                    </div>
                    <span className="text-xs font-medium text-neutral-500">
                      {destination.highlight}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  {destination.description}
                </p>
                <div className="mt-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                    Known for
                  </p>
                  <p className="mt-1 text-sm text-neutral-700">{destination.knownFor}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/procedures/rhinoplasty/${destination.slug}`}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 transition-colors hover:bg-rose-50 hover:text-rose-700"
                  >
                    Rhinoplasty in {destination.country}
                  </Link>
                  <Link
                    href={`/procedures/tummy-tuck/${destination.slug}`}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 transition-colors hover:bg-rose-50 hover:text-rose-700"
                  >
                    Tummy tuck in {destination.country}
                  </Link>
                  <Link
                    href={`/procedures/liposuction/${destination.slug}`}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 transition-colors hover:bg-rose-50 hover:text-rose-700"
                  >
                    Liposuction in {destination.country}
                  </Link>
                </div>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* ===================================================================
            SECTION F: HOW TO CHOOSE A CLINIC
            =================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            How to Choose a Safe Cosmetic Surgery Clinic Abroad
          </h2>
          <p className="mt-2 max-w-3xl text-neutral-600">
            Choosing the right clinic and surgeon is the most important decision you'll make.
            Follow this framework to evaluate clinics and protect yourself.
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {CHECKLIST_ITEMS.map((item, index) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </m.div>
            ))}
          </div>

          {/* Red Flags */}
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 sm:mt-10 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">Red Flags to Watch For</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {RED_FLAGS.map((flag, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-red-800"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </m.section>

        {/* ===================================================================
            SECTION G: COMBINATION PROCEDURES
            =================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 p-6 sm:p-8 border border-rose-100">
            <div className="flex items-center gap-3">
              <Stethoscope className="h-8 w-8 text-rose-600" />
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                Popular Combination Procedures
              </h2>
            </div>

            <p className="mt-4 text-neutral-700 leading-relaxed">
              Many patients combine procedures to achieve comprehensive results in a single trip.
              This can be more cost-effective than multiple separate surgeries, but requires
              longer recovery time and careful planning.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-neutral-900">Mummy Makeover</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Tummy tuck + liposuction + breast surgery. Restores pre-pregnancy body contour.
                  UK: £15,000–£25,000. Abroad: £6,000–£12,000.
                </p>
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-neutral-900">Body Contouring Package</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Liposuction multiple areas + tummy tuck. Popular after significant weight loss.
                  UK: £12,000–£18,000. Abroad: £5,000–£9,000.
                </p>
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-neutral-900">Facial Rejuvenation</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Facelift + eyelid surgery + rhinoplasty. Comprehensive facial enhancement.
                  UK: £15,000–£22,000. Abroad: £6,000–£10,000.
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-rose-800">
              <strong>Important:</strong> Not all procedures can be safely combined. Your surgeon
              will advise what's appropriate based on your health, goals, and risk profile.
              Combined surgeries require longer recovery — typically 2–3 weeks minimum.
            </p>
          </div>
        </m.section>

        {/* ===================================================================
            TOP COSMETIC SURGERY CLINICS
            =================================================================== */}
        {clinics.length > 0 && (
          <m.section {...fadeInUp} className="mb-16 sm:mb-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                  Top-Rated Cosmetic Surgery Clinics
                </h2>
                <p className="mt-2 text-neutral-600">
                  Verified clinics with excellent patient reviews
                </p>
              </div>
              <Link href="/search?category=cosmetic-surgery">
                <Button variant="outline">View All Cosmetic Surgery Clinics</Button>
              </Link>
            </div>

            <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {clinics.slice(0, 8).map((clinic) => (
                <ClinicCard key={clinic.id} clinic={clinic} showEnquiryButton={false} />
              ))}
            </div>
          </m.section>
        )}

        {/* ===================================================================
            SECTION H: FAQ BLOCK
            =================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <FAQSection faqs={faqs} title="Cosmetic Surgery Abroad FAQ" className="faq-section" />
        </m.section>

        {/* ===================================================================
            SECTION I: CTA & CONVERSION BLOCK
            =================================================================== */}
        <m.section {...fadeInUp}>
          <div className="rounded-2xl bg-gradient-to-r from-rose-600 to-rose-800 p-6 text-white sm:p-8 lg:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Find the Right Cosmetic Surgery Clinic for You
              </h2>
              <p className="mt-3 text-rose-100 sm:mt-4 sm:text-lg">
                We've done the research so you don't have to. Compare verified clinics,
                see real prices, check surgeon credentials, and read genuine patient reviews.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
                <Link href="/search?category=cosmetic-surgery">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Browse Cosmetic Surgery Clinics
                  </Button>
                </Link>
                <Link href="/contact?procedure=cosmetic">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full text-white hover:bg-white/10 sm:w-auto"
                  >
                    Get Free Clinic Recommendations
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </m.section>

        {/* ===================================================================
            INTERNAL LINKS
            =================================================================== */}
        <m.section {...fadeInUp} className="mt-12 border-t border-neutral-200 pt-8">
          <p className="text-sm text-neutral-600">
            <strong>Procedures:</strong>{' '}
            <Link href="/procedures/rhinoplasty" className="text-rose-600 hover:underline">
              Rhinoplasty
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/tummy-tuck" className="text-rose-600 hover:underline">
              Tummy Tuck
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/liposuction" className="text-rose-600 hover:underline">
              Liposuction
            </Link>
          </p>
          <p className="mt-2 text-sm text-neutral-600">
            <strong>Destinations:</strong>{' '}
            <Link href="/destinations/turkey" className="text-rose-600 hover:underline">
              Turkey
            </Link>{' '}
            ·{' '}
            <Link href="/destinations/poland" className="text-rose-600 hover:underline">
              Poland
            </Link>{' '}
            ·{' '}
            <Link href="/destinations/spain" className="text-rose-600 hover:underline">
              Spain
            </Link>{' '}
            ·{' '}
            <Link href="/destinations/hungary" className="text-rose-600 hover:underline">
              Hungary
            </Link>
          </p>
          <p className="mt-2 text-sm text-neutral-600">
            <strong>Related:</strong>{' '}
            <Link href="/dental" className="text-rose-600 hover:underline">
              Dental Work Abroad
            </Link>
          </p>
        </m.section>
      </div>
    </>
  )
}
