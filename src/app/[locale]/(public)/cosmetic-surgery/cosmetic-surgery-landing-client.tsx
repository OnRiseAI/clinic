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
      <section className="relative overflow-hidden bg-[#0A1A2F] text-white">
        {/* Abstract Premium Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-[#0A1A2F] to-primary-950/80" />
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary-600/20 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute inset-0 bg-transparent opacity-5 mix-blend-overlay" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <m.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Cosmetic Surgery Abroad: <br/>
              <span className="bg-gradient-to-r from-blue-200 to-primary-200 bg-clip-text text-transparent font-light">Your Complete Guide to Treatment</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl lg:text-2xl leading-relaxed font-light">
              Compare verified cosmetic surgery clinics across Turkey, Poland, Spain and Hungary.
              Real prices. Real reviews. Expert guidance.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/search?category=cosmetic-surgery">
                <Button size="lg" className="w-full sm:w-auto bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base shadow-xl shadow-white/10">
                  Browse Cosmetic Surgery Clinics
                </Button>
              </Link>
              <Link href="#procedures">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full text-neutral-300 hover:text-white hover:bg-white/5 sm:w-auto rounded-full transition-all duration-300"
                >
                  View Procedures
                </Button>
              </Link>
            </div>
          </m.div>

          {/* Premium Glassmorphism Trust Bar */}
          <m.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-16 sm:mt-24 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-8 divide-x divide-white/10 sm:grid-cols-4">
              <div className="text-center px-4">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl text-white">300+</p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-primary-200/80">Verified Clinics</p>
              </div>
              <div className="text-center px-4">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl text-white">8,000+</p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-primary-200/80">Patient Reviews</p>
              </div>
              <div className="text-center px-4">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl text-white">40–70%</p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-primary-200/80">Average Savings</p>
              </div>
              <div className="text-center px-4 border-l border-white/10 sm:border-l">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl text-white">Free</p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-primary-200/80">Consultation Matching</p>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* ===================================================================
            SECTION B: WHY COSMETIC SURGERY ABROAD
            =================================================================== */}
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <span className="text-sm font-bold tracking-widest text-primary-600 uppercase">The Reality</span>
              <h2 className="mt-4 text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight">
                Why UK Patients Choose Cosmetic Surgery Abroad
              </h2>
            </div>

            <div className="mt-8 lg:col-span-7 lg:mt-0">
              <div className="text-neutral-600">
                <p className="text-xl sm:text-2xl font-medium leading-relaxed text-neutral-900 tracking-tight">
                  Cosmetic surgery in the UK is expensive. A rhinoplasty costs £5,000–£7,000, a tummy
                  tuck runs £6,000–£9,000, and breast augmentation is £6,000–£8,000. For many
                  patients, these prices are simply unaffordable — leading them to either give up on
                  procedures they genuinely want, or seek more affordable options abroad.
                </p>

                <p className="mt-8 text-lg leading-relaxed">
                  The same procedures performed by equally qualified surgeons using identical
                  implants and techniques cost 40–70% less in countries like Turkey, Poland, and
                  Spain. This isn't because quality is lower — it's because operating costs, wages,
                  and overheads are significantly lower, while competition between clinics keeps
                  prices fair.
                </p>

                <div className="my-10 border-l-[3px] border-primary-500 bg-gradient-to-r from-primary-50/80 to-transparent p-8 rounded-r-2xl">
                  <p className="text-lg italic leading-relaxed text-neutral-800">
                    Turkey alone receives over 1.5 million medical tourists annually, with cosmetic
                    surgery being a major driver. Polish clinics report that 42% of their medical
                    tourists come specifically for cosmetic procedures. Spain offers premium
                    experiences with world-class healthcare standards. These aren't backstreet
                    operations — they're modern facilities with internationally trained surgeons.
                  </p>
                </div>

                <p className="text-lg leading-relaxed">
                  However, cosmetic surgery abroad isn't without risks. Choosing the wrong clinic can
                  lead to poor results, complications, or difficulty getting corrections. This guide
                  helps you navigate the decision: understanding which procedures work well abroad,
                  which destinations suit your needs, and how to identify reputable clinics.
                </p>
              </div>

              {/* AI Answer Block for GEO */}
              <div className="mt-12 rounded-2xl overflow-hidden shadow-sm border border-neutral-100 bg-white hover:shadow-md transition-shadow">
                <AIAnswerBlock
                  question="Is cosmetic surgery abroad safe?"
                  answer="Cosmetic surgery abroad is safe when you choose accredited clinics with qualified surgeons. Look for JCI, ISO, or TEMOS certification. Many surgeons abroad trained in the UK, Germany, or USA. Turkey, Poland, and Spain have well-established medical tourism industries with modern facilities. The key is thorough research: verify credentials, read reviews, and ensure proper aftercare protocols."
                  entityName="Cosmetic Surgery Abroad"
                  entityType="MedicalSpecialty"
                  className="cosmetic-summary border-none bg-neutral-50/50"
                />
              </div>
            </div>
          </div>
        </m.section>

        {/* ===================================================================
            SECTION C: POPULAR PROCEDURES
            =================================================================== */}
        <m.section {...fadeInUp} id="procedures" className="mb-24 scroll-mt-24 sm:mb-32">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl tracking-tight">
              Most Popular Cosmetic Procedures Abroad
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Compare UK prices with typical costs at accredited clinics abroad. We've analysed thousands of quotes to bring you accurate pricing.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROCEDURES.map((procedure, index) => (
              <m.div
                key={procedure.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={`/procedures/${procedure.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/60 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-900/5"
                >
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary-50 to-primary-100/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-2xl" />
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-neutral-900 transition-colors group-hover:text-primary-700">
                      {procedure.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm text-neutral-600 leading-relaxed">
                      {procedure.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-6 space-y-3 rounded-xl bg-neutral-50 p-4 border border-neutral-100">
                    <div className="flex justify-between text-sm items-center">
                      <span className="font-medium text-neutral-500">UK Price</span>
                      <span className="font-semibold text-neutral-900">
                        {procedure.ukPrice}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm items-center border-t border-neutral-200/60 pt-3">
                      <span className="font-medium text-neutral-500">Abroad</span>
                      <span className="text-lg font-bold text-green-600">
                        {procedure.abroadPrice}
                      </span>
                    </div>
                  </div>
                  
                  <span className="relative z-10 mt-6 inline-flex items-center text-sm font-semibold text-primary-600 transition-colors group-hover:text-primary-800">
                    View clinics in {procedure.topDestination.charAt(0).toUpperCase() + procedure.topDestination.slice(1)} 
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* ===================================================================
            SECTION D: COST COMPARISON TABLE
            =================================================================== */}
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl tracking-tight">
              Cosmetic Surgery Cost Comparison: UK vs Abroad
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Typical prices at accredited clinics — savings of 40–70%
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/80">
                    <th className="px-6 py-4 text-sm font-semibold text-neutral-900">Procedure</th>
                    <th className="px-6 py-4 text-sm font-semibold text-neutral-600">UK Price</th>
                    <th className="px-6 py-4 text-sm font-semibold text-primary-700">Abroad</th>
                    <th className="px-6 py-4 text-sm font-semibold text-green-600">Savings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {COST_COMPARISON.map((row) => (
                    <tr
                      key={row.procedure}
                      className="transition-colors hover:bg-neutral-50/50"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                        {row.procedure}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600">
                        {row.uk}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-primary-700">
                        {row.abroad}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-green-600">
                        {row.savings}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-sm text-neutral-500 flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-100 text-[10px] font-bold">i</span>
            Prices are indicative and vary by clinic, surgeon experience, and specific requirements. Always get a personalised quote.
          </p>
        </m.section>

        {/* ===================================================================
            SECTION E: TOP DESTINATIONS
            =================================================================== */}
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="max-w-2xl text-center mx-auto">
            <span className="text-sm font-bold tracking-widest text-primary-600 uppercase">Destinations</span>
            <h2 className="mt-4 text-3xl font-bold text-neutral-900 sm:text-4xl tracking-tight">
              Best Countries for Cosmetic Surgery from the UK
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Popular destinations with internationally accredited clinics, state-of-the-art facilities, and English-speaking staff
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {DESTINATIONS.map((destination, index) => (
              <m.div
                key={destination.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-900/5 hover:-translate-y-1 hover:border-primary-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-neutral-900 tracking-tight transition-colors group-hover:text-primary-700">
                      {destination.country}
                    </h3>
                    <p className="mt-1 text-sm font-medium uppercase tracking-wider text-neutral-500">{destination.cities}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 relative z-10">
                    <div className="flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50/50 px-4 py-2 text-sm font-semibold text-primary-800">
                      <Plane className="h-4 w-4 text-primary-600" />
                      {destination.flight}
                    </div>
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-widest px-2">
                      {destination.highlight}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 mt-6 border-t border-neutral-100 pt-6">
                  <p className="text-base text-neutral-600 leading-relaxed">
                    {destination.description}
                  </p>
                </div>
                
                <div className="relative z-10 mt-6 rounded-xl bg-neutral-50 p-5 border border-neutral-100/50">
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                    Known for
                  </p>
                  <p className="mt-2 text-neutral-800 font-medium leading-relaxed">{destination.knownFor}</p>
                </div>
                
                <div className="relative z-10 mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/procedures/rhinoplasty/${destination.slug}`}
                    className="flex-1 text-center rounded-xl bg-neutral-100/80 px-4 py-3 text-sm font-semibold text-neutral-700 transition-all hover:bg-primary-600 hover:text-white"
                  >
                    Rhinoplasty in {destination.country}
                  </Link>
                  <Link
                    href={`/procedures/tummy-tuck/${destination.slug}`}
                    className="flex-1 text-center rounded-xl bg-neutral-100/80 px-4 py-3 text-sm font-semibold text-neutral-700 transition-all hover:bg-primary-600 hover:text-white"
                  >
                    Tummy tuck in {destination.country}
                  </Link>
                  <Link
                    href={`/procedures/liposuction/${destination.slug}`}
                    className="flex-1 text-center rounded-xl bg-neutral-100/80 px-4 py-3 text-sm font-semibold text-neutral-700 transition-all hover:bg-primary-600 hover:text-white"
                  >
                    Liposuction in {destination.country}
                  </Link>
                </div>

                <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-tl from-primary-100 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-2xl pointer-events-none" />
              </m.div>
            ))}
          </div>
        </m.section>

        {/* ===================================================================
            SECTION F: HOW TO CHOOSE A CLINIC
            =================================================================== */}
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl tracking-tight">
              How to Choose a Safe Cosmetic Surgery Clinic Abroad
            </h2>
            <p className="mt-6 text-lg text-neutral-600">
              Choosing the right clinic and surgeon is the most important decision you'll make.
              Follow this framework to evaluate clinics and protect yourself.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CHECKLIST_ITEMS.map((item, index) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200/50 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-900/5"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100/50 text-primary-600 shadow-inner group-hover:from-primary-100 group-hover:to-primary-200 transition-colors duration-300">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
                <div className="absolute top-0 right-0 -mr-6 -mt-6 h-24 w-24 rounded-full bg-primary-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-xl pointer-events-none" />
              </m.div>
            ))}
          </div>

          {/* Premium Red Flags */}
          <div className="mt-12 rounded-2xl border border-rose-200/60 bg-gradient-to-br from-rose-50/50 to-white p-8 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-rose-100/50 blur-3xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row items-start gap-8 relative z-10">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-rose-900 tracking-tight">Red Flags to Watch For</h3>
                <p className="mt-2 text-rose-700/80">If you encounter any of these, proceed with extreme caution or look elsewhere.</p>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {RED_FLAGS.map((flag, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 rounded-lg bg-white/60 p-4 border border-rose-100 shadow-sm"
                    >
                      <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 font-bold text-xs">!</span>
                      <span className="text-sm font-medium text-rose-900 leading-relaxed">{flag}</span>
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
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="rounded-3xl bg-gradient-to-br from-neutral-50 to-neutral-100 p-8 sm:p-12 border border-neutral-200/60 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-transparent opacity-5" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-neutral-100">
                  <Stethoscope className="h-7 w-7 text-primary-600" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">
                  Popular Combination Procedures
                </h2>
              </div>

              <p className="mt-2 text-lg text-neutral-600 leading-relaxed max-w-3xl">
                Many patients combine procedures to achieve comprehensive results in a single trip.
                This can be more cost-effective than multiple separate surgeries, but requires
                longer recovery time and careful planning.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100/80 transition-transform duration-300 hover:-translate-y-1">
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight">Mummy Makeover</h3>
                  <div className="mt-4 space-y-3">
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      Tummy tuck + liposuction + breast surgery. Restores pre-pregnancy body contour.
                    </p>
                    <div className="pt-4 border-t border-neutral-100 flex justify-between text-sm">
                      <span className="text-neutral-500">UK: <span className="line-through">£15k–£25k</span></span>
                      <span className="font-bold text-green-600">Abroad: £6k–£12k</span>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100/80 transition-transform duration-300 hover:-translate-y-1">
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight">Body Contouring</h3>
                  <div className="mt-4 space-y-3">
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      Liposuction multiple areas + tummy tuck. Popular after significant weight loss.
                    </p>
                    <div className="pt-4 border-t border-neutral-100 flex justify-between text-sm">
                      <span className="text-neutral-500">UK: <span className="line-through">£12k–£18k</span></span>
                      <span className="font-bold text-green-600">Abroad: £5k–£9k</span>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100/80 transition-transform duration-300 hover:-translate-y-1">
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight">Facial Rejuvenation</h3>
                  <div className="mt-4 space-y-3">
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      Facelift + eyelid surgery + rhinoplasty. Comprehensive facial enhancement.
                    </p>
                    <div className="pt-4 border-t border-neutral-100 flex justify-between text-sm">
                      <span className="text-neutral-500">UK: <span className="line-through">£15k–£22k</span></span>
                      <span className="font-bold text-green-600">Abroad: £6k–£10k</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-rose-50/80 border border-rose-100 p-4 flex gap-3 items-start">
                <span className="text-rose-600 font-bold mt-0.5">i</span>
                <p className="text-sm text-rose-800 leading-relaxed">
                  <strong>Important:</strong> Not all procedures can be safely combined. Your surgeon
                  will advise what's appropriate based on your health, goals, and risk profile.
                  Combined surgeries require longer recovery — typically 2–3 weeks minimum.
                </p>
              </div>
            </div>
          </div>
        </m.section>

        {/* ===================================================================
            TOP COSMETIC SURGERY CLINICS
            =================================================================== */}
        {clinics.length > 0 && (
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-neutral-200/60 pb-6 mb-10">
              <div>
                <span className="text-sm font-bold tracking-widest text-primary-600 uppercase">Featured</span>
                <h2 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl tracking-tight">
                  Top-Rated Cosmetic Surgery Clinics
                </h2>
                <p className="mt-3 text-lg text-neutral-600">
                  Verified clinics with excellent patient reviews
                </p>
              </div>
              <Link href="/search?category=cosmetic-surgery">
                <Button variant="outline" className="group rounded-full border-neutral-300 hover:bg-neutral-50 hover:text-primary-700 transition-all duration-300">
                  View All Cosmetic Clinics <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {clinics.slice(0, 8).map((clinic) => (
                <div key={clinic.id} className="transition-all duration-500 hover:-translate-y-1">
                  <ClinicCard clinic={clinic} showEnquiryButton={false} />
                </div>
              ))}
            </div>
          </m.section>
        )}

        {/* ===================================================================
            SECTION H: FAQ BLOCK
            =================================================================== */}
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="mx-auto max-w-4xl">
            <FAQSection faqs={faqs} title="Cosmetic Surgery Abroad FAQ" className="faq-section" />
          </div>
        </m.section>

        {/* ===================================================================
            SECTION I: CTA & CONVERSION BLOCK
            =================================================================== */}
        <m.section {...fadeInUp} className="pb-12">
          <div className="relative overflow-hidden rounded-3xl bg-[#0A1A2F] p-8 text-white sm:p-12 lg:p-20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-blue-600/20" />
            <div className="absolute -left-1/4 -top-1/4 h-full w-full rounded-full bg-primary-500/10 blur-[120px]" />
            <div className="absolute -bottom-1/4 -right-1/4 h-full w-full rounded-full bg-blue-500/10 blur-[120px]" />
            <div className="absolute inset-0 bg-transparent opacity-5 mix-blend-overlay" />
            
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <span className="text-sm font-bold tracking-widest text-primary-200/80 uppercase mb-4 block">Take the next step</span>
              <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl tracking-tight">
                Find the Right Cosmetic Surgery Clinic for You
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl lg:text-2xl font-light leading-relaxed">
                We've done the research so you don't have to. Compare verified clinics,
                see real prices, check surgeon credentials, and read genuine patient reviews.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/search?category=cosmetic-surgery">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base shadow-xl shadow-white/10">
                    Browse Cosmetic Surgery Clinics
                  </Button>
                </Link>
                <Link href="/contact?procedure=cosmetic">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base backdrop-blur-md"
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
