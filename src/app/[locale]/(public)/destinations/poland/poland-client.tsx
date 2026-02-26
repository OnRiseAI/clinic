'use client'

import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { FAQSection } from '@/components/seo/faq-section'
import {
  CheckCircle,
  Shield,
  Star,
  Plane,
  ArrowRight,
  Globe,
  BadgeCheck,
  Building2,
  FileText,
  Stethoscope,
  Eye,
  Scissors,
  SmilePlus,
  Award,
  Heart,
  Baby,
  Sparkles,
  User,
} from 'lucide-react'
import { PL, TR, HU } from 'country-flag-icons/react/3x2'

// =============================================================================
// TYPES
// =============================================================================

interface PolandDestinationClientProps {
  faqs: Array<{ question: string; answer: string }>
}

// =============================================================================
// STATIC DATA — HERO STATS
// =============================================================================

const HERO_STATS = [
  { value: '300,000+', label: 'Medical tourists annually' },
  { value: '42%', label: 'Choose cosmetic surgery' },
  { value: '40–60%', label: 'Savings vs UK' },
  { value: '2 hrs', label: 'Flight from London' },
]

// =============================================================================
// STATIC DATA — PROCEDURES
// =============================================================================

const PROCEDURE_CATEGORIES = [
  {
    icon: User,
    name: 'Rhinoplasty',
    procedures: 'Open, Closed, Revision',
    polandPrice: '£2,000–£3,500',
    ukPrice: '£5,000–£7,000',
    savings: '50–60%',
    link: '/procedures/rhinoplasty/poland',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Sparkles,
    name: 'Breast Surgery',
    procedures: 'Augmentation, Lift, Reduction',
    polandPrice: '£2,500–£4,000',
    ukPrice: '£6,000–£8,000',
    savings: '50–55%',
    link: '/search?procedure=breast-surgery&country=poland',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    icon: Scissors,
    name: 'Body Contouring',
    procedures: 'Liposuction, Tummy Tuck, BBL',
    polandPrice: '£2,000–£4,500',
    ukPrice: '£5,000–£10,000',
    savings: '50–55%',
    link: '/procedures/liposuction/poland',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: SmilePlus,
    name: 'Dental Implants',
    procedures: 'Single implant, All-on-4, All-on-6',
    polandPrice: '£450–£900',
    ukPrice: '£1,500–£2,500',
    savings: '50–65%',
    link: '/procedures/dental-implants/poland',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    icon: Star,
    name: 'Veneers & Crowns',
    procedures: 'E-max, Zirconia, Porcelain',
    polandPrice: '£250–£400/tooth',
    ukPrice: '£500–£800/tooth',
    savings: '45–55%',
    link: '/procedures/veneers/poland',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Heart,
    name: 'Orthopaedics',
    procedures: 'Hip/Knee Replacement',
    polandPrice: '£5,500–£9,000',
    ukPrice: '£12,000–£18,000',
    savings: '45–55%',
    link: '/search?procedure=orthopaedics&country=poland',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: Eye,
    name: 'Eye Surgery',
    procedures: 'LASIK, Lens Replacement',
    polandPrice: '£700–£1,100',
    ukPrice: '£2,000–£3,500',
    savings: '55–65%',
    link: '/search?procedure=eye-surgery&country=poland',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: Baby,
    name: 'IVF & Fertility',
    procedures: 'IVF, Egg Freezing, ICSI',
    polandPrice: '£2,500–£4,000',
    ukPrice: '£5,000–£8,000',
    savings: '45–55%',
    link: '/search?procedure=ivf&country=poland',
    color: 'bg-rose-50 text-rose-600',
  },
]

// =============================================================================
// STATIC DATA — COST COMPARISON
// =============================================================================

const COSMETIC_COST_COMPARISON = [
  { item: 'Rhinoplasty', poland: '£2,000–£3,500', uk: '£5,000–£7,000' },
  { item: 'Breast Augmentation', poland: '£2,500–£4,000', uk: '£6,000–£8,000' },
  { item: 'Tummy Tuck', poland: '£2,500–£4,500', uk: '£6,000–£9,000' },
  { item: 'Liposuction', poland: '£1,500–£3,000', uk: '£4,000–£6,000' },
  { item: 'Facelift', poland: '£3,000–£5,000', uk: '£8,000–£12,000' },
  { item: 'Consultation', poland: '£50–£100', uk: '£150–£250' },
  { item: 'Accommodation (5 nights)', poland: '£200–£400', uk: 'N/A' },
  { item: 'Flights (return)', poland: '£60–£150', uk: 'N/A' },
]

// =============================================================================
// STATIC DATA — QUALITY STANDARDS
// =============================================================================

const QUALITY_STANDARDS = [
  {
    icon: Globe,
    title: 'EU Regulatory Framework',
    description:
      'Poland joined the EU in 2004. All healthcare facilities must meet EU standards. EU Cross-Border Healthcare Directive provides patient protections. Full consumer rights under EU law apply to international patients.',
  },
  {
    icon: BadgeCheck,
    title: 'Medical Qualifications',
    description:
      'Polish medical education is internationally recognised. Medical University of Warsaw, Jagiellonian University (Kraków), and other institutions produce world-class surgeons. Many Polish doctors trained in UK, Germany, or USA.',
  },
  {
    icon: Building2,
    title: 'Facility Standards',
    description:
      'Polish Ministry of Health certification required for all facilities. Many clinics hold ISO 9001 and ISO 13485 certifications. Modern equipment standard at international-facing clinics. EU-approved materials and implants mandatory.',
  },
  {
    icon: FileText,
    title: 'What to Verify',
    description:
      'Surgeon\'s Polish Medical Chamber registration, facility\'s Ministry of Health licence, specific certifications for your procedure, written treatment plan before travel, clear aftercare protocols and emergency contacts.',
  },
]

// =============================================================================
// STATIC DATA — COMPARISON TABLE
// =============================================================================

const COMPARISON_TABLE = [
  { factor: 'Flight time', poland: '2 hours', turkey: '4 hours', hungary: '2.5 hours' },
  { factor: 'Price level', poland: '40–60% savings', turkey: '50–70% savings', hungary: '40–60% savings' },
  { factor: 'Best for', poland: 'Cosmetic surgery', turkey: 'Hair, dental, all-in-one', hungary: 'Dental work' },
  { factor: 'EU protections', poland: 'Yes', turkey: 'No', hungary: 'Yes' },
  { factor: 'Language', poland: 'English good', turkey: 'English excellent', hungary: 'English good' },
  { factor: 'Visa required', poland: 'No (EU)', turkey: 'e-Visa (£40)', hungary: 'No (EU)' },
  { factor: 'Volume/scale', poland: 'Moderate', turkey: 'Very high', hungary: 'Moderate' },
  { factor: 'Hair transplants', poland: 'Limited', turkey: 'World leader', hungary: 'Limited' },
]

// =============================================================================
// STATIC DATA — CITIES
// =============================================================================

const CITIES = [
  {
    name: 'Warsaw',
    description:
      'The capital has the largest concentration of international-standard clinics and hospitals. Carolina Medical Center, Medicover Hospital, and LuxMed lead the market. Best selection of specialists and procedures.',
    bestFor: 'All procedures, widest specialist selection',
    flight: '2 hours from London',
    highlight: 'Capital city',
  },
  {
    name: 'Kraków',
    description:
      'Poland\'s cultural capital combines excellent medical facilities with a stunning historic setting. KCM Clinic and Scanmed are notable options. Great for combining treatment with tourism.',
    bestFor: 'Cosmetic surgery, cultural tourism',
    flight: '2.5 hours from London',
    highlight: 'Cultural capital',
  },
  {
    name: 'Wrocław',
    description:
      'Growing medical tourism hub in western Poland. Strong in dental work with modern facilities. More affordable than Warsaw with good transport links to Germany.',
    bestFor: 'Dental work, lower costs',
    flight: 'Fly to Wrocław or via Frankfurt',
    highlight: 'Emerging hub',
  },
  {
    name: 'Gdańsk',
    description:
      'Baltic coast city with excellent clinics and seaside recovery options. Growing reputation for cosmetic procedures. Beautiful historic centre and beach access.',
    bestFor: 'Cosmetic surgery, seaside recovery',
    flight: '2 hours from London',
    highlight: 'Coastal city',
  },
  {
    name: 'Jelenia Góra',
    description:
      'Mountain spa town near the Czech border. Specialised rehabilitation and orthopaedic facilities. Quieter alternative with thermal springs for recovery.',
    bestFor: 'Orthopaedics, rehabilitation',
    flight: 'Fly to Wrocław, 2hr drive',
    highlight: 'Mountain spa town',
  },
]

// =============================================================================
// STATIC DATA — PATIENT JOURNEY
// =============================================================================

const PATIENT_JOURNEY = [
  {
    step: 1,
    title: 'Research',
    timing: '4–8 weeks before',
    tasks: [
      'Request quotes from 2–3 clinics',
      'Video consultation with surgeon',
      'Review before/after photos',
      'Receive detailed treatment plan',
    ],
  },
  {
    step: 2,
    title: 'Book',
    timing: '2–4 weeks before',
    tasks: [
      'Confirm dates and pay deposit',
      'Book flights and accommodation',
      'Arrange travel insurance (medical tourism cover)',
      'Complete pre-op questionnaires',
    ],
  },
  {
    step: 3,
    title: 'Pre-Surgery',
    timing: 'Day before',
    tasks: [
      'Arrive in Poland',
      'Transfer to clinic or hotel',
      'Final consultation and examination',
      'Pre-operative tests if required',
    ],
  },
  {
    step: 4,
    title: 'Surgery Day',
    timing: 'Day 1',
    tasks: [
      'Procedure performed',
      'Initial recovery in clinic',
      'Post-op care begins',
      'Stay overnight if required',
    ],
  },
  {
    step: 5,
    title: 'Recovery',
    timing: 'Days 2–7+',
    tasks: [
      'Daily check-ups at clinic',
      'Dressing changes and wound care',
      'Gradual increase in activity',
      'Clearance to fly when ready',
    ],
  },
  {
    step: 6,
    title: 'Aftercare',
    timing: 'Ongoing',
    tasks: [
      'Follow post-surgery instructions',
      'Remote consultations via video call',
      'Contact clinic with any concerns',
      'Final review (some clinics offer UK follow-up)',
    ],
  },
]

// =============================================================================
// STATIC DATA — PRACTICAL INFO
// =============================================================================

const PRACTICAL_INFO = [
  {
    title: 'Flights',
    content:
      'Direct from London, Manchester, Edinburgh, Bristol. Airlines: Ryanair, Wizz Air, LOT Polish, easyJet. Flight time: 2–2.5 hours. Cost: £40–£120 return.',
  },
  {
    title: 'Visas',
    content:
      'UK citizens: No visa required for stays under 90 days. Valid passport needed (6+ months validity recommended). Poland is EU and Schengen member.',
  },
  {
    title: 'Currency',
    content:
      'Polish Złoty (PLN). Some clinics quote in EUR or GBP. Cards widely accepted in cities. ATMs plentiful. Many places accept contactless.',
  },
  {
    title: 'Language',
    content:
      'Polish is the official language. English widely spoken by younger generations and medical professionals. German also common in western Poland.',
  },
  {
    title: 'Best Time to Visit',
    content:
      'Spring (May–June) and early Autumn (September–October) offer pleasant weather. Summer is warm but busy. Winter is cold but cities are festive.',
  },
  {
    title: 'Getting Around',
    content:
      'Major cities have good public transport (metro, trams, buses in Warsaw). Uber and Bolt widely available. Many clinics offer airport transfers.',
  },
]

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

// =============================================================================
// COMPONENT
// =============================================================================

export function PolandDestinationClient({ faqs }: PolandDestinationClientProps) {
  return (
    <div className="bg-neutral-50">
        {/* ===================================================================
            HERO SECTION
            =================================================================== */}
        <section className="relative overflow-hidden bg-[#0A1A2F] text-white pt-16 pb-20 sm:pt-24 sm:pb-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/60 via-[#0A1A2F]/90 to-primary-950/90" />

          <m.div
            className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary-600/20 blur-[120px]"
            animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <m.div
            className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-blue-600/10 blur-[120px]"
            animate={{ x: [0, -25, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <m.div
            className="absolute left-1/2 top-1/3 h-1/3 w-1/3 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center justify-center"
            >
              <div className="mb-6 w-20 overflow-hidden rounded-2xl shadow-2xl shadow-primary-900/50 border border-white/10">
                <PL title="Poland" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                Medical Tourism in <br />
                <span className="bg-gradient-to-r from-blue-200 to-primary-200 bg-clip-text text-transparent font-light">
                  Poland: Quality EU Healthcare
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl lg:text-2xl leading-relaxed font-light">
                300,000+ medical tourists annually. EU standards. 2 hours from London. Rising star in cosmetic surgery.
              </p>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link href="/search?destination=poland">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base shadow-xl shadow-white/10"
                >
                  Browse Verified Clinics in Poland
                </Button>
              </Link>
              <Link href="#procedures">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full text-neutral-300 hover:text-white hover:bg-white/5 sm:w-auto rounded-full transition-all duration-300"
                >
                  View Procedures & Prices
                </Button>
              </Link>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
              className="mt-16 sm:mt-24 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
            >
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 text-center"
                >
                  <p className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-widest text-primary-200/80">
                    {stat.label}
                  </p>
                </div>
              ))}
            </m.div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          {/* =================================================================
              SECTION A: WHY POLAND
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-32">
                <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                  The Reality
                </span>
                <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl leading-[1.1] tracking-tight">
                  Why Poland is Emerging as a Medical Tourism Leader
                </h2>
              </div>
              <div className="mt-8 lg:col-span-7 lg:mt-0">
                <div className="text-neutral-600">
                  <p className="text-xl sm:text-2xl font-medium leading-relaxed text-neutral-900 tracking-tight">
                    Poland has quietly built one of Europe's most compelling medical tourism propositions.
                    With EU membership since 2004, world-class medical education, and costs 40–60% lower
                    than the UK, Poland offers the rare combination of regulatory protection and significant
                    savings. Over 300,000 international patients now choose Poland annually — and that
                    number is growing rapidly.
                  </p>

                  <p className="mt-8 text-lg leading-relaxed font-light">
                    <strong className="font-semibold">Cosmetic surgery leads the market.</strong> 42% of Poland's medical tourists
                    come for cosmetic procedures — rhinoplasty, breast surgery, and body contouring.
                    Polish surgeons have built a strong reputation for natural-looking results and
                    meticulous technique. Unlike high-volume markets where speed can compromise quality,
                    Poland's moderate scale allows for more personalised care.
                  </p>

                  <div className="my-10 border-l-[3px] border-primary-500 bg-gradient-to-r from-primary-50/80 to-transparent p-8 rounded-r-2xl">
                    <p className="text-lg italic leading-relaxed text-neutral-800">
                      <strong>EU membership provides genuine protection.</strong> Poland operates under full
                      EU healthcare regulations, meaning UK patients benefit from the same consumer
                      protections, quality standards, and legal frameworks as in Western Europe. The EU
                      Cross-Border Healthcare Directive applies, and all materials and implants must meet
                      strict European certification requirements.
                    </p>
                  </div>

                  <p className="text-lg leading-relaxed font-light">
                    <strong className="font-semibold">Proximity makes everything easier.</strong> At just 2 hours from London,
                    Poland is closer than many UK domestic flights. This matters for post-operative
                    check-ups, emergency returns if needed, and simply reducing travel stress during
                    recovery. Multiple daily flights from most UK airports make scheduling straightforward.
                  </p>
                </div>

                <div
                  className="mt-12 rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
                  data-aeo="safety-poland"
                  data-question="Is medical treatment in Poland safe?"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-6 w-6 text-primary-600" />
                    <h3 className="font-bold text-neutral-900">Healthcare Quality & Safety</h3>
                  </div>
                  <p className="text-neutral-700 leading-relaxed ai-answer-block safety-summary font-light">
                    Medical treatment in Poland is safe and regulated to EU standards. As an EU member
                    state since 2004, Poland's healthcare is governed by European regulations. Facilities
                    are licensed by the Polish Ministry of Health, with many holding ISO certifications.
                    Poland ranks among the top 20 globally for healthcare quality, with world-class
                    medical education and 300,000+ international patients annually. The key is choosing
                    accredited facilities with verified surgeon credentials.
                  </p>
                </div>
              </div>
            </div>
          </m.section>

          {/* =================================================================
              SECTION B: PROCEDURES AVAILABLE
              ================================================================= */}
          <m.section {...fadeInUp} id="procedures" className="mb-24 scroll-mt-24 sm:mb-32">
            <div className="max-w-2xl">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Treatments
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Medical Procedures Available in Poland
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Poland excels in cosmetic surgery but offers broad medical tourism options
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {PROCEDURE_CATEGORIES.map((proc, index) => (
                <m.div
                  key={proc.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                >
                  <Link
                    href={proc.link}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-neutral-100 bg-white p-8 transition-colors hover:border-primary-100"
                  >
                    <div className="relative z-10">
                      <div
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${proc.color} shadow-sm border border-white`}
                      >
                        <proc.icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 text-xl font-bold text-neutral-900 transition-colors group-hover:text-primary-700">
                        {proc.name}
                      </h3>
                      <p className="mt-2 text-sm text-neutral-600 leading-relaxed font-light">
                        {proc.procedures}
                      </p>
                    </div>

                    <div className="relative z-10 mt-6 space-y-3 rounded-xl bg-neutral-50 p-4 border border-neutral-100">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-neutral-500">Poland</span>
                        <span className="font-bold text-primary-700">{proc.polandPrice}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-t border-neutral-200/60 pt-3">
                        <span className="font-medium text-neutral-500">UK Price</span>
                        <span className="text-neutral-600 line-through">{proc.ukPrice}</span>
                      </div>
                    </div>

                    <span className="relative z-10 mt-6 inline-flex items-center text-sm font-semibold text-green-600">
                      Save {proc.savings}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </m.div>
              ))}
            </div>

            <div className="mt-12 rounded-[2rem] border border-blue-200/60 bg-blue-50/50 p-8 flex items-start gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold mt-1">
                i
              </span>
              <p className="text-base text-blue-900 leading-relaxed font-light">
                <strong className="font-semibold">Poland&apos;s Strengths:</strong> Cosmetic surgery is the flagship offering, with
                42% of medical tourists choosing Poland for procedures like rhinoplasty, breast
                surgery, and body contouring. Dental work, orthopaedics, and IVF are also well
                developed. Hair transplants are available but Turkey remains the global leader for
                volume and specialisation in that area.
              </p>
            </div>
          </m.section>

          {/* =================================================================
              SECTION C: COST COMPARISON
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="mb-8">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Investment
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Poland vs UK: Cosmetic Surgery Costs
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Detailed breakdown for cosmetic procedures — Poland&apos;s speciality
              </p>
            </div>

            <div
              className="mt-8 rounded-[2rem] bg-gradient-to-br from-blue-50 to-indigo-50/50 p-8 border border-blue-100"
              data-aeo="cost-poland"
              data-question="How much does cosmetic surgery cost in Poland?"
            >
              <p className="text-neutral-700 leading-relaxed ai-answer-block cost-summary text-lg font-light">
                Cosmetic surgery in Poland costs 40–60% less than the UK. Rhinoplasty costs
                £2,000–£3,500 in Poland versus £5,000–£7,000 in the UK. Breast augmentation runs
                £2,500–£4,000 compared to £6,000–£8,000. A tummy tuck costs £2,500–£4,500 versus
                £6,000–£9,000. Including flights and accommodation, total costs are typically
                50% of UK prices. Polish clinics use EU-certified materials and implants.
              </p>
            </div>

            <div className="mt-10 bg-neutral-900 rounded-[3rem] p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-primary-600/10" />
              <div className="absolute -top-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-blue-500/5 blur-[100px]" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Complete Cost Comparison: Cosmetic Surgery
                </h3>
                <p className="text-neutral-400 font-light mb-8">
                  Full breakdown including travel and accommodation
                </p>

                <div className="rounded-3xl bg-white overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] border-collapse text-left">
                      <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50/80">
                          <th className="px-6 py-4 text-sm font-semibold text-neutral-900">
                            Procedure
                          </th>
                          <th className="px-6 py-4 text-sm font-semibold text-blue-700">
                            Poland
                          </th>
                          <th className="px-6 py-4 text-sm font-semibold text-neutral-600">UK</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {COSMETIC_COST_COMPARISON.map((row) => (
                          <tr
                            key={row.item}
                            className="transition-colors hover:bg-neutral-50/50"
                          >
                            <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                              {row.item}
                            </td>
                            <td className="px-6 py-4 text-sm font-bold text-blue-700">
                              {row.poland}
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-600">{row.uk}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-green-500/20 px-6 py-3 border border-green-400/30">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <p className="text-sm text-green-300 font-semibold">
                    Typical savings: 40–60% including travel costs
                  </p>
                </div>

                <p className="mt-6 text-neutral-400 leading-relaxed text-sm font-light">
                  <strong className="text-neutral-300 font-semibold">Why Poland costs less:</strong> Lower operational costs than Western Europe,
                  competitive market that keeps prices fair, and favourable exchange rates. Unlike
                  some destinations, Polish clinics rarely cut corners on materials — EU regulations
                  require certified implants and supplies, and most clinics use premium brands to
                  maintain their reputation.
                </p>
              </div>
            </div>
          </m.section>

          {/* =================================================================
              SECTION D: QUALITY & STANDARDS
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Excellence
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Healthcare Quality and Standards in Poland
              </h2>
              <p className="mt-6 text-lg text-neutral-600 font-light">
                EU membership provides genuine regulatory protection
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {QUALITY_STANDARDS.map((item, index) => (
                <m.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 text-blue-600 group-hover:from-blue-100 group-hover:to-blue-200 transition-colors duration-300">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base text-neutral-600 leading-relaxed font-light">
                    {item.description}
                  </p>
                </m.div>
              ))}
            </div>
          </m.section>

          {/* =================================================================
              SECTION E: POLAND VS TURKEY VS HUNGARY
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="mb-12 text-center max-w-3xl mx-auto">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Comparison
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Poland vs Turkey vs Hungary: Which is Right for You?
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                An honest comparison to help you choose the best destination
              </p>
            </div>

            <div
              className="mb-12 rounded-[2rem] bg-gradient-to-br from-blue-50 to-indigo-50/50 p-8 border border-blue-100"
              data-aeo="best-for-poland"
              data-question="Is Poland good for cosmetic surgery?"
            >
              <p className="text-neutral-700 leading-relaxed ai-answer-block best-for-summary text-lg font-light">
                Poland is excellent for cosmetic surgery, with 42% of medical tourists choosing it for
                procedures like rhinoplasty, breast surgery, and body contouring. Advantages include
                EU patient protections, short 2-hour flights from the UK, and surgeons known for
                natural-looking results. Poland offers moderate pricing (40–60% savings) with
                personalised care. It&apos;s less suitable for hair transplants (Turkey leads) or
                patients seeking the absolute lowest prices.
              </p>
            </div>

            <div className="bg-neutral-900 rounded-[3rem] p-8 sm:p-12 relative overflow-hidden mb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-teal-600/10" />

              <div className="relative z-10 rounded-3xl bg-white overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-neutral-200 bg-neutral-50/80">
                        <th className="px-6 py-5 text-sm font-semibold text-neutral-900">
                          Factor
                        </th>
                        <th className="px-6 py-5 text-sm font-semibold text-blue-700">
                          <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 w-max">
                            <div className="w-6 overflow-hidden rounded-sm shadow-sm border border-blue-200/50">
                              <PL title="Poland" />
                            </div>
                            Poland
                          </div>
                        </th>
                        <th className="px-6 py-5 text-sm font-semibold text-teal-700">
                          <div className="flex items-center gap-3 bg-teal-50 px-4 py-2 rounded-lg border border-teal-100 w-max">
                            <div className="w-6 overflow-hidden rounded-sm shadow-sm border border-teal-200/50">
                              <TR title="Turkey" />
                            </div>
                            Turkey
                          </div>
                        </th>
                        <th className="px-6 py-5 text-sm font-semibold text-emerald-700">
                          <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100 w-max">
                            <div className="w-6 overflow-hidden rounded-sm shadow-sm border border-emerald-200/50">
                              <HU title="Hungary" />
                            </div>
                            Hungary
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {COMPARISON_TABLE.map((row) => (
                        <tr
                          key={row.factor}
                          className="transition-colors hover:bg-neutral-50/50"
                        >
                          <td className="px-6 py-5 font-bold text-neutral-900">{row.factor}</td>
                          <td className="px-6 py-5 font-medium text-blue-800">{row.poland}</td>
                          <td className="px-6 py-5 font-medium text-teal-800">{row.turkey}</td>
                          <td className="px-6 py-5 font-medium text-emerald-800">
                            {row.hungary}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-blue-200 transition-colors">
                <h4 className="text-xl font-bold text-blue-900 border-b border-blue-200/50 pb-4 mb-4">
                  Choose Poland if:
                </h4>
                <ul className="space-y-4 text-base text-blue-800">
                  {[
                    'Cosmetic surgery is your priority',
                    'EU consumer protections matter',
                    'You want shorter flights (2 hours)',
                    'You prefer personalised care',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-teal-200 transition-colors">
                <h4 className="text-xl font-bold text-teal-900 border-b border-teal-200/50 pb-4 mb-4">
                  Choose Turkey if:
                </h4>
                <ul className="space-y-4 text-base text-teal-800">
                  {[
                    'Hair transplant is your priority',
                    'Budget is the main driver',
                    'You want all-inclusive packages',
                    'You prefer larger facilities',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-500" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-emerald-200 transition-colors">
                <h4 className="text-xl font-bold text-emerald-900 border-b border-emerald-200/50 pb-4 mb-4">
                  Choose Hungary if:
                </h4>
                <ul className="space-y-4 text-base text-emerald-800">
                  {[
                    'Dental work is your priority',
                    'You want thermal spa recovery',
                    '30+ years dental expertise matters',
                    'You prefer established market',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </m.section>

          {/* =================================================================
              SECTION F: CITIES
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="max-w-2xl text-center mx-auto mb-12">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Destinations
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Where to Get Treatment in Poland
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Major cities offer different specialisations and experiences
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CITIES.map((city, index) => (
                <m.div
                  key={city.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
                >
                  <div className="flex flex-col items-start justify-between gap-4 mb-6">
                    <h3 className="text-2xl font-bold text-neutral-900 tracking-tight group-hover:text-primary-700 transition-colors">
                      {city.name}
                    </h3>
                    <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-3 py-1.5 rounded-full border border-blue-200/50 uppercase tracking-widest">
                      {city.highlight}
                    </span>
                  </div>

                  <div className="mt-2 border-t border-neutral-100 pt-6">
                    <p className="text-base text-neutral-600 leading-relaxed font-light">
                      {city.description}
                    </p>
                  </div>

                  <div className="mt-6 rounded-xl bg-neutral-50 p-5 border border-neutral-100/50 flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1">
                          Best for
                        </p>
                        <p className="text-sm text-neutral-800 font-medium leading-snug">
                          {city.bestFor}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-3 border-t border-neutral-200/50">
                      <Plane className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <p className="text-sm text-neutral-800 font-medium">{city.flight}</p>
                    </div>
                  </div>
                </m.div>
              ))}
            </div>
          </m.section>

          {/* =================================================================
              SECTION G: PATIENT JOURNEY
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Process
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Your Poland Medical Tourism Journey
              </h2>
            </div>

            <div className="mx-auto max-w-4xl relative">
              <div className="absolute left-8 top-8 bottom-8 w-1 bg-blue-100 rounded-full hidden sm:block" />
              <div className="space-y-8 sm:space-y-12">
                {PATIENT_JOURNEY.map((phase, index) => (
                  <m.div
                    key={phase.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="relative flex flex-col sm:flex-row gap-6 sm:gap-12"
                  >
                    <div className="flex items-center gap-4 sm:hidden">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-500/30 border-4 border-white">
                        {phase.step}
                      </div>
                      <span className="rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-sm font-semibold border border-blue-100">
                        {phase.timing}
                      </span>
                    </div>

                    <div className="hidden sm:flex flex-col items-center z-10">
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-xl font-bold text-white shadow-lg shadow-blue-500/30 border-4 border-white">
                        {phase.step}
                      </div>
                    </div>

                    <div className="flex-1 rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                      <div className="hidden sm:flex items-center gap-4 mb-4">
                        <h3 className="text-xl font-bold text-neutral-900">{phase.title}</h3>
                        <span className="rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-sm font-semibold border border-blue-100">
                          {phase.timing}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-4 sm:hidden">
                        {phase.title}
                      </h3>

                      <ul className="space-y-3">
                        {phase.tasks.map((task) => (
                          <li
                            key={task}
                            className="flex items-start gap-3 text-base text-neutral-600 font-light"
                          >
                            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </m.div>
                ))}
              </div>
            </div>
          </m.section>

          {/* =================================================================
              SECTION H: PRACTICAL INFORMATION
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Logistics
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Planning Your Poland Trip
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PRACTICAL_INFO.map((info, index) => (
                <m.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
                >
                  <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                    {info.title}
                  </h3>
                  <p className="mt-4 text-base text-neutral-600 leading-relaxed font-light">
                    {info.content}
                  </p>
                </m.div>
              ))}
            </div>
          </m.section>

          {/* =================================================================
              SECTION I: FAQ
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-10">
                <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                  Common Questions
                </span>
              </div>
              <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-xl p-8 sm:p-12">
                <FAQSection
                  faqs={faqs}
                  title="Frequently Asked Questions About Medical Tourism in Poland"
                  className="faq-section"
                />
              </div>
            </div>
          </m.section>

          {/* =================================================================
              SECTION J: CTA
              ================================================================= */}
          <m.section {...fadeInUp} className="pb-12">
            <div className="relative overflow-hidden bg-[#0A1A2F] rounded-[3rem] p-8 text-white sm:p-12 lg:p-20 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-blue-600/20" />
              <m.div
                className="absolute -left-1/4 -top-1/4 h-full w-full rounded-full bg-primary-500/10 blur-[120px]"
                animate={{ x: [0, 20, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              />
              <m.div
                className="absolute -bottom-1/4 -right-1/4 h-full w-full rounded-full bg-blue-500/10 blur-[120px]"
                animate={{ x: [0, -20, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="relative z-10 mx-auto max-w-3xl">
                <div className="mx-auto mb-8 w-20 overflow-hidden rounded-2xl shadow-2xl border-2 border-white/20">
                  <PL title="Poland" />
                </div>
                <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl tracking-tight leading-[1.1]">
                  Ready to Explore Medical Treatment in{' '}
                  <span className="bg-gradient-to-r from-blue-200 to-primary-200 bg-clip-text text-transparent">
                    Poland
                  </span>
                  ?
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl font-light leading-relaxed">
                  Use MeetYourClinic to compare verified clinics across Warsaw, Kraków, and beyond. EU-regulated,
                  quality-focused, with surgeons known for natural results. Get real prices,
                  read honest reviews, and book with confidence.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href="/search?destination=poland">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base shadow-xl shadow-white/10"
                    >
                      Browse Verified Clinics in Poland
                    </Button>
                  </Link>
                  <Link href="/cosmetic-surgery">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base backdrop-blur-md"
                    >
                      Compare Cosmetic Procedures
                    </Button>
                  </Link>
                </div>
                <div className="mt-8 flex items-center justify-center gap-6 flex-wrap text-sm text-primary-200/80 font-medium tracking-wide">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" /> EU healthcare standards
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" /> Certified surgeons
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" /> No booking fees
                  </span>
                </div>
              </div>
            </div>
          </m.section>

          {/* =================================================================
              INTERNAL LINKS
              ================================================================= */}
          <m.section
            {...fadeInUp}
            className="mt-12 border-t border-neutral-200 pt-8 text-center"
          >
            <p className="text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase mb-4">
              Related Guides:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/procedures/rhinoplasty/poland"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Rhinoplasty
              </Link>
              <span className="text-neutral-300">·</span>
              <Link
                href="/procedures/dental-implants/poland"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Dental Implants
              </Link>
              <span className="text-neutral-300">·</span>
              <Link
                href="/procedures/veneers/poland"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Veneers
              </Link>
              <span className="text-neutral-300">·</span>
              <Link
                href="/procedures/liposuction/poland"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Liposuction
              </Link>
              <span className="text-neutral-300">·</span>
              <Link
                href="/procedures/tummy-tuck/poland"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Tummy Tuck
              </Link>
              <span className="text-neutral-300">·</span>
              <Link
                href="/destinations/turkey"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Turkey
              </Link>
              <span className="text-neutral-300">·</span>
              <Link
                href="/destinations/hungary"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Hungary
              </Link>
              <span className="text-neutral-300">·</span>
              <Link
                href="/cosmetic-surgery"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Cosmetic Surgery Abroad
              </Link>
            </div>
          </m.section>
        </div>
      </div>
  )
}
