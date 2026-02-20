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
  BadgeCheck,
  Building2,
  CreditCard,
  FileText,
  Stethoscope,
  Eye,
  Scissors,
  SmilePlus,
  Award,
  Heart,
  Baby,
  Sun,
  Trophy,
  Users,
} from 'lucide-react'
import { ES, TR, PL } from 'country-flag-icons/react/3x2'

// =============================================================================
// TYPES
// =============================================================================

interface SpainDestinationClientProps {
  faqs: Array<{ question: string; answer: string }>
}

// =============================================================================
// STATIC DATA — HERO STATS
// =============================================================================

const HERO_STATS = [
  { value: '#1', label: 'Healthiest Nation (Bloomberg)' },
  { value: '120,000+', label: 'Medical tourists annually' },
  { value: '804', label: 'Hospitals nationwide' },
  { value: '20%', label: 'Year-on-year growth' },
]

// =============================================================================
// STATIC DATA — PROCEDURES
// =============================================================================

const PROCEDURE_CATEGORIES = [
  {
    icon: Baby,
    name: 'Fertility/IVF',
    procedures: 'IVF, Egg Donation, Embryo Transfer',
    spainPrice: '£4,000–£7,000',
    ukPrice: '£5,000–£10,000',
    savings: '20–40%',
    link: '/search?procedure=ivf&country=spain',
    color: 'bg-pink-50 text-pink-600',
    highlight: true,
  },
  {
    icon: Stethoscope,
    name: 'Cosmetic Surgery',
    procedures: 'Rhinoplasty, Facelift, Breast',
    spainPrice: '£2,500–£5,000',
    ukPrice: '£4,000–£8,000',
    savings: '30–40%',
    link: '/procedures/rhinoplasty/spain',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: SmilePlus,
    name: 'Dental Implants',
    procedures: 'Single, All-on-4, Full Mouth',
    spainPrice: '£500–£900',
    ukPrice: '£1,500–£2,500',
    savings: '55–65%',
    link: '/procedures/dental-implants/spain',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    icon: Star,
    name: 'Veneers',
    procedures: 'E-max, Porcelain, Zirconia',
    spainPrice: '£300–£450/tooth',
    ukPrice: '£500–£800/tooth',
    savings: '35–45%',
    link: '/procedures/veneers/spain',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: Eye,
    name: 'Eye Surgery',
    procedures: 'LASIK, Lens Replacement',
    spainPrice: '£1,200–£2,000',
    ukPrice: '£2,500–£4,000',
    savings: '45–55%',
    link: '/search?procedure=eye-surgery&country=spain',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Heart,
    name: 'Orthopaedics',
    procedures: 'Hip/Knee Replacement',
    spainPrice: '£10,000–£15,000',
    ukPrice: '£12,000–£20,000',
    savings: '20–30%',
    link: '/search?procedure=orthopaedics&country=spain',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: Scissors,
    name: 'Body Contouring',
    procedures: 'Liposuction, Tummy Tuck',
    spainPrice: '£2,500–£5,000',
    ukPrice: '£5,000–£9,000',
    savings: '35–45%',
    link: '/procedures/liposuction/spain',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Award,
    name: 'Oncology',
    procedures: 'Cancer Treatment, Second Opinions',
    spainPrice: 'Varies',
    ukPrice: 'Varies',
    savings: 'Quality focus',
    link: '/search?procedure=oncology&country=spain',
    color: 'bg-emerald-50 text-emerald-600',
  },
]

// =============================================================================
// STATIC DATA — IVF COST COMPARISON
// =============================================================================

const IVF_COST_COMPARISON = [
  { item: 'IVF Cycle', spain: '£3,500–£5,500', uk: '£5,000–£8,000' },
  { item: 'IVF + Egg Donation', spain: '£5,500–£8,000', uk: '£10,000–£15,000' },
  { item: 'Embryo Donation', spain: '£3,000–£5,000', uk: '£5,500–£8,000' },
  { item: 'Egg Freezing', spain: '£2,500–£4,000', uk: '£3,500–£5,500' },
  { item: 'ICSI Add-on', spain: '£800–£1,200', uk: '£1,000–£1,500' },
]

// =============================================================================
// STATIC DATA — GENERAL COST COMPARISON
// =============================================================================

const GENERAL_COST_COMPARISON = [
  { item: 'IVF treatment + Egg Donation', spain: '£5,500–£8,000', uk: '£10,000–£15,000' },
  { item: 'Medications', spain: 'Often included', uk: '£1,000–£2,000' },
  { item: 'Consultations', spain: 'Included', uk: '£200–£500' },
  { item: 'Accommodation (5 nights)', spain: '£400–£800', uk: 'N/A' },
  { item: 'Flights (return)', spain: '£100–£250', uk: 'N/A' },
]

// =============================================================================
// STATIC DATA — QUALITY STANDARDS
// =============================================================================

const QUALITY_STANDARDS = [
  {
    icon: Trophy,
    title: 'World-Class System',
    description:
      'Bloomberg Healthiest Country Index: #1 globally. Medical Tourism Index: #4 out of 46 destinations. Universal healthcare model with excellent private facilities. Strong investment in medical research.',
  },
  {
    icon: Building2,
    title: 'Hospital Infrastructure',
    description:
      '804 hospitals nationwide with 160,981 beds. State-of-the-art technology standard. Many hospitals internationally accredited. Over 10,600 surgeries per 100,000 population annually.',
  },
  {
    icon: BadgeCheck,
    title: 'Notable Institutions',
    description:
      'Hospital Clínic de Barcelona (globally ranked), Quirón Salud network (Spain\'s largest private group), Teknon Medical Center (premium international), HM Hospitals (Madrid\'s leading private group), IVI Clinics (world\'s largest fertility group).',
  },
  {
    icon: FileText,
    title: 'What to Verify',
    description:
      'Hospital accreditation status, surgeon credentials and specialisation, before/after portfolio (cosmetic), success rates (fertility), written treatment plan and costs before committing.',
  },
]

// =============================================================================
// STATIC DATA — COMPARISON TABLE
// =============================================================================

const COMPARISON_TABLE = [
  { factor: 'Healthcare ranking', spain: '#1 globally', turkey: 'Strong but lower', poland: 'Good EU standard' },
  { factor: 'Price savings', spain: '20–40%', turkey: '50–70%', poland: '40–60%' },
  { factor: 'Best for', spain: 'IVF, premium cosmetic', turkey: 'All procedures, hair', poland: 'Cosmetic surgery' },
  { factor: 'EU protections', spain: 'Yes', turkey: 'No', poland: 'Yes' },
  { factor: 'Climate', spain: 'Sunny Mediterranean', turkey: 'Variable', poland: 'Continental' },
  { factor: 'Flight time', spain: '2–2.5 hours', turkey: '3.5–4 hours', poland: '2–2.5 hours' },
]

// =============================================================================
// STATIC DATA — CITIES
// =============================================================================

const CITIES = [
  {
    name: 'Barcelona',
    description:
      'Spain\'s medical tourism capital with world-class hospitals and fertility clinics. Home to Hospital Clínic (globally ranked), Teknon, Quirón, and Dexeus fertility centre. Beautiful city with excellent infrastructure.',
    bestFor: 'Fertility, cosmetic surgery, comprehensive care',
    flight: '2 hours from London',
    highlight: 'Medical tourism capital',
  },
  {
    name: 'Madrid',
    description:
      'Capital city with major hospital hubs including HM Hospitals, Ruber Internacional, and La Paz. Excellent for complex procedures and specialist oncology. Vibrant culture with excellent transport links.',
    bestFor: 'Complex procedures, oncology, cardiology',
    flight: '2.5 hours from London',
    highlight: 'Capital city',
  },
  {
    name: 'Marbella / Costa del Sol',
    description:
      'Premium cosmetic surgery destination with Vithas Xanit International Hospital. Luxury recovery in sunny resort environment. Popular with patients seeking privacy and premium experience.',
    bestFor: 'Cosmetic surgery, luxury recovery',
    flight: '2.5 hours from London',
    highlight: 'Premium recovery',
  },
  {
    name: 'Valencia',
    description:
      'Growing medical tourism hub with IVO (eye care) and La Fe Hospital. More affordable than Barcelona or Madrid. Beautiful coastal city with excellent beaches.',
    bestFor: 'Ophthalmology, dental, value',
    flight: '2.5 hours from London',
    highlight: 'Growing hub',
  },
  {
    name: 'Alicante',
    description:
      'Popular with UK patients for its accessibility and strong dental/cosmetic clinics. Costa Blanca beaches ideal for recovery. Large British expat community means English is widely spoken.',
    bestFor: 'Dental tourism, accessible',
    flight: '2.5 hours from London',
    highlight: 'UK patient favourite',
  },
]

// =============================================================================
// STATIC DATA — PATIENT JOURNEY
// =============================================================================

const PATIENT_JOURNEY = [
  {
    step: 1,
    title: 'Research & Enquire',
    timing: '4–8 weeks before',
    tasks: [
      'Request consultations from 2–3 clinics',
      'Video consultation with specialist',
      'Receive detailed treatment plan and costs',
    ],
  },
  {
    step: 2,
    title: 'Book & Prepare',
    timing: '2–4 weeks before',
    tasks: [
      'Confirm treatment dates',
      'Pay deposit',
      'Book flights and accommodation',
      'Follow pre-treatment instructions',
    ],
  },
  {
    step: 3,
    title: 'Arrival & Treatment',
    timing: 'Treatment week',
    tasks: [
      'Many clinics offer airport transfers',
      'Initial consultation and tests',
      'Treatment performed',
      'Post-treatment care begins',
    ],
  },
  {
    step: 4,
    title: 'Recovery',
    timing: 'Days after treatment',
    tasks: [
      'Recover in sunny Mediterranean climate',
      'Follow-up appointments as needed',
      'Enjoy Spanish culture when appropriate',
      'Surgeon clearance before flying',
    ],
  },
  {
    step: 5,
    title: 'Return Home',
    timing: 'Departure',
    tasks: [
      'Discharge documentation provided',
      'Aftercare instructions',
      'Remote follow-up available',
      'Many clinics offer guarantees',
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
      'Direct from most UK airports. Airlines: BA, easyJet, Ryanair, Vueling, Jet2. Flight time: 2–2.5 hours. Cost: £50–£200 return.',
  },
  {
    title: 'Visas',
    content:
      'UK citizens: No visa required for stays under 90 days. Valid passport needed. Spain is EU and Schengen member.',
  },
  {
    title: 'Currency',
    content:
      'Euro (€). Cards widely accepted throughout Spain. ATMs plentiful. Contactless payment common.',
  },
  {
    title: 'Language',
    content:
      'Spanish is official. English widely spoken in medical sector and tourist areas. Barcelona and Madrid particularly English-friendly.',
  },
  {
    title: 'Climate',
    content:
      'Mediterranean: Warm, sunny. Barcelona: Mild year-round. Costa del Sol: Hot summers, mild winters. Ideal for recovery.',
  },
  {
    title: 'Accommodation',
    content:
      'Excellent range at all price points. Many clinics have hotel partnerships. Recovery apartments available. Resorts ideal for post-treatment rest.',
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

export function SpainDestinationClient({ faqs }: SpainDestinationClientProps) {
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
            className="absolute left-1/2 top-1/3 h-1/3 w-1/3 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[100px]"
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
                <ES title="Spain" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                Medical Tourism in <br />
                <span className="bg-gradient-to-r from-blue-200 via-amber-200 to-primary-200 bg-clip-text text-transparent font-light">
                  Spain: World-Class Healthcare
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl lg:text-2xl leading-relaxed font-light">
                Europe&apos;s #1 for IVF. Ranked healthiest nation globally. EU healthcare excellence.
              </p>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link href="/search?destination=spain">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base shadow-xl shadow-white/10"
                >
                  Browse Verified Clinics in Spain
                </Button>
              </Link>
              <Link href="#fertility">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full text-neutral-300 hover:text-white hover:bg-white/5 sm:w-auto rounded-full transition-all duration-300"
                >
                  Explore Fertility Options
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
              SECTION A: WHY SPAIN
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-32">
                <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                  The Reality
                </span>
                <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl leading-[1.1] tracking-tight">
                  Why Spain is a World Leader in Healthcare
                </h2>
              </div>

              <div className="mt-8 lg:col-span-7 lg:mt-0">
                <div className="text-neutral-600">
                  <p className="text-xl sm:text-2xl font-medium leading-relaxed text-neutral-900 tracking-tight">
                    Spain doesn&apos;t just offer medical tourism — it offers world-class healthcare from the
                    globe&apos;s healthiest nation. The Bloomberg Healthiest Country Index ranks Spain #1
                    globally, ahead of the UK (#19) and USA (#35). This isn&apos;t marketing — it reflects
                    decades of investment in healthcare infrastructure, medical education, and public
                    health.
                  </p>

                  <p className="mt-8 text-lg leading-relaxed font-light">
                    <strong className="font-semibold">Quality is the value proposition.</strong> Unlike destinations competing on
                    price alone, Spain offers moderate savings (20–40%) combined with exceptional
                    standards. The Medical Tourism Index ranks Spain #4 globally out of 46 destinations.
                    With 804 hospitals, 160,981 beds, and over 10,600 surgeries per 100,000 population,
                    Spain&apos;s medical infrastructure rivals the world&apos;s best.
                  </p>

                  <div className="my-10 border-l-[3px] border-primary-500 bg-gradient-to-r from-primary-50/80 to-transparent p-8 rounded-r-2xl">
                    <p className="text-lg italic leading-relaxed text-neutral-800">
                      <strong>Europe&apos;s fertility capital.</strong> Spain leads Europe for IVF and
                      fertility treatment, with progressive laws allowing anonymous egg donation —
                      something not available in the UK. World-renowned clinics like IVI (the world&apos;s
                      largest fertility group), Eugin, and Institut Marquès attract patients from across
                      Europe seeking donor treatment with shorter waiting times.
                    </p>
                  </div>

                  <p className="text-lg leading-relaxed font-light">
                    <strong className="font-semibold">Recovery in the Mediterranean sun.</strong> Beyond medical excellence, Spain
                    offers what few destinations can: a sunny climate perfect for recuperation, world-class
                    culture and cuisine, and the peace of mind that comes from EU patient protections.
                    Over 120,000 medical tourists choose Spain annually — and that figure grows 20%
                    year-on-year.
                  </p>
                </div>

                <div
                  className="mt-12 rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
                  data-aeo="quality-spain"
                  data-question="How good is Spain's healthcare system?"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className="h-6 w-6 text-primary-600" />
                    <h3 className="font-bold text-neutral-900">Healthcare Quality</h3>
                  </div>
                  <p className="text-neutral-700 leading-relaxed ai-answer-block quality-summary font-light">
                    Spain has the world&apos;s #1 ranked healthcare system according to the Bloomberg
                    Healthiest Country Index, ahead of the UK (#19) and USA (#35). The Medical Tourism
                    Index ranks Spain #4 globally out of 46 destinations. With 804 hospitals, 160,981
                    beds, and over 10,600 surgeries per 100,000 population, Spain offers world-class
                    medical infrastructure with EU regulatory standards and patient protections.
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
                Medical Procedures Available in Spain
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Premium quality across all procedures, with particular excellence in fertility
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
                    className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] border bg-white p-8 transition-colors ${proc.highlight ? 'border-amber-300 hover:border-amber-400' : 'border-neutral-100 hover:border-primary-100'}`}
                  >
                    <div className="relative z-10">
                      {proc.highlight && (
                        <span className="mb-4 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 tracking-widest uppercase">
                          Spain&apos;s Flagship
                        </span>
                      )}
                      <div
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${proc.color} shadow-sm border border-white`}
                      >
                        <proc.icon className="h-6 w-6" />
                      </div>
                      <h3
                        className={`mt-5 text-xl font-bold text-neutral-900 transition-colors ${proc.highlight ? 'group-hover:text-amber-700' : 'group-hover:text-primary-700'}`}
                      >
                        {proc.name}
                      </h3>
                      <p className="mt-2 text-sm text-neutral-600 leading-relaxed font-light">
                        {proc.procedures}
                      </p>
                    </div>

                    <div className="relative z-10 mt-6 space-y-3 rounded-xl bg-neutral-50 p-4 border border-neutral-100">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-neutral-500">Spain</span>
                        <span
                          className={`font-bold ${proc.highlight ? 'text-amber-700' : 'text-primary-700'}`}
                        >
                          {proc.spainPrice}
                        </span>
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

            <div className="mt-12 rounded-[2rem] border border-amber-200/60 bg-amber-50/50 p-8 flex items-start gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold mt-1">
                i
              </span>
              <p className="text-base text-amber-900 leading-relaxed font-light">
                <strong className="font-semibold">Spain&apos;s Positioning:</strong> Quality over maximum savings. Spain suits
                patients who want world-class healthcare standards, premium surgical expertise, and
                sunny recovery environment — with moderate savings of 20–40%. For maximum cost
                savings (50–70%), consider Turkey or Poland instead.
              </p>
            </div>
          </m.section>

          {/* =================================================================
              SECTION C: FERTILITY / IVF
              ================================================================= */}
          <m.section {...fadeInUp} id="fertility" className="mb-24 scroll-mt-24 sm:mb-32">
            <div className="rounded-[3rem] bg-gradient-to-br from-pink-50 to-rose-50 p-8 sm:p-12 border border-pink-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[url('/images/patterns/medical-pattern.svg')] opacity-5 mix-blend-multiply" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-pink-100/50">
                    <Baby className="h-7 w-7 text-pink-600" />
                  </div>
                  <div>
                    <span className="text-sm font-bold tracking-[0.2em] text-pink-600 uppercase">
                      Fertility
                    </span>
                    <h2 className="text-3xl font-bold text-neutral-900 tracking-tight sm:text-4xl leading-[1.1]">
                      IVF and Fertility Treatment: Spain&apos;s Flagship Speciality
                    </h2>
                  </div>
                </div>

                <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
                  <div className="space-y-6">
                    <p className="text-lg leading-relaxed text-neutral-700 font-light">
                      Spain is Europe&apos;s undisputed fertility leader, and for good reason. Progressive
                      legislation allows anonymous egg donation — something not permitted in the UK,
                      where donors must be identifiable. This means no waiting lists for donor eggs,
                      excellent donor availability, and complete privacy.
                    </p>

                    <div className="rounded-2xl bg-white/60 p-6 border border-pink-100/50 shadow-sm backdrop-blur-sm">
                      <p className="text-lg leading-relaxed text-neutral-800 font-light">
                        <strong className="font-semibold">Why Spain leads:</strong> World-renowned clinics including IVI (the world&apos;s
                        largest fertility group with 70+ clinics), Eugin, and Institut Marquès. Spanish
                        women have excellent egg quality attributed to Mediterranean diet and lifestyle.
                        High success rates comparable to or exceeding UK clinics. And the relaxed
                        Mediterranean environment helps reduce stress — a known factor in fertility.
                      </p>
                    </div>

                    <div
                      className="rounded-[2rem] bg-white p-8 border border-pink-100 hover:border-pink-200 transition-colors"
                      data-aeo="fertility-spain"
                      data-question="Is Spain good for IVF treatment?"
                    >
                      <p className="text-neutral-700 leading-relaxed ai-answer-block fertility-summary font-medium">
                        Spain is Europe&apos;s leading destination for IVF and fertility treatment. Progressive
                        legislation allows anonymous egg donation (not available in UK), with no waiting
                        lists for donor eggs. World-renowned clinics include IVI (world&apos;s largest fertility
                        group), Eugin, and Institut Marquès. IVF with egg donation costs £5,500–£8,000 in
                        Spain versus £10,000–£15,000 in the UK. The Mediterranean climate helps reduce
                        stress, improving outcomes.
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="bg-neutral-900 rounded-[3rem] p-8 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 via-transparent to-rose-600/10" />
                      <div className="absolute -top-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-pink-500/5 blur-[100px]" />

                      <div className="relative z-10">
                        <h3 className="text-xl font-bold text-white mb-2">
                          Fertility Treatment Costs: Spain vs UK
                        </h3>
                        <p className="text-neutral-400 font-light mb-6 text-sm">
                          Anonymous egg donation — not available in UK
                        </p>

                        <div className="rounded-3xl bg-white overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[500px] border-collapse text-left">
                              <thead>
                                <tr className="border-b border-pink-100 bg-neutral-50/50">
                                  <th className="px-6 py-4 text-sm font-semibold text-neutral-900">
                                    Treatment
                                  </th>
                                  <th className="px-6 py-4 text-sm font-semibold text-amber-700">
                                    Spain
                                  </th>
                                  <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                                    UK
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-neutral-100">
                                {IVF_COST_COMPARISON.map((row) => (
                                  <tr
                                    key={row.item}
                                    className="transition-colors hover:bg-pink-50/30"
                                  >
                                    <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                                      {row.item}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-amber-700">
                                      {row.spain}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-neutral-600">
                                      {row.uk}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[2rem] bg-white p-5 border border-neutral-100 flex items-start gap-4 hover:border-pink-200 transition-colors">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900">Anonymous Donation</p>
                          <p className="mt-1 text-sm text-neutral-600 font-light">Not available in UK</p>
                        </div>
                      </div>
                      <div className="rounded-[2rem] bg-white p-5 border border-neutral-100 flex items-start gap-4 hover:border-green-200 transition-colors">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900">No Waiting Lists</p>
                          <p className="mt-1 text-sm text-neutral-600 font-light">Immediate donor availability</p>
                        </div>
                      </div>
                      <div className="rounded-[2rem] bg-white p-5 border border-neutral-100 flex items-start gap-4 hover:border-blue-200 transition-colors">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                          <Award className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900">World-Class Clinics</p>
                          <p className="mt-1 text-sm text-neutral-600 font-light">IVI, Eugin, Institut Marquès</p>
                        </div>
                      </div>
                      <div className="rounded-[2rem] bg-white p-5 border border-neutral-100 flex items-start gap-4 hover:border-amber-200 transition-colors">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                          <Sun className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900">Stress Reduction</p>
                          <p className="mt-1 text-sm text-neutral-600 font-light">Mediterranean relaxation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </m.section>

          {/* =================================================================
              SECTION D: COST COMPARISON
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="mb-8">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Investment
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Spain vs UK: Treatment Cost Comparison
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Quality + experience, not maximum savings
              </p>
            </div>

            <div
              className="mt-8 rounded-[2rem] bg-gradient-to-br from-amber-50 to-orange-50/50 p-8 border border-amber-100"
              data-aeo="cost-spain"
              data-question="How much does medical tourism in Spain cost?"
            >
              <p className="text-neutral-700 leading-relaxed ai-answer-block cost-summary text-lg font-light">
                Spain offers moderate savings of 20–40% compared to UK prices. Dental implants cost
                £500–£900 (vs £1,500–£2,500 UK). IVF with egg donation costs £5,500–£8,000 (vs
                £10,000–£15,000 UK). Rhinoplasty runs £2,500–£4,000 (vs £4,000–£7,000 UK). Spain&apos;s
                value proposition is premium quality and world-class healthcare rather than maximum
                savings — choose Turkey for 50–70% savings if budget is primary.
              </p>
            </div>

            <div className="mt-10 bg-neutral-900 rounded-[3rem] p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-primary-600/10" />
              <div className="absolute -top-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-amber-500/5 blur-[100px]" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Worked Example: IVF with Egg Donation
                </h3>
                <p className="text-neutral-400 font-light mb-8">
                  Complete cost breakdown including travel expenses
                </p>

                <div className="rounded-3xl bg-white overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] border-collapse text-left">
                      <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50/80">
                          <th className="px-6 py-4 text-sm font-semibold text-neutral-900">
                            Cost Element
                          </th>
                          <th className="px-6 py-4 text-sm font-semibold text-amber-700">Spain</th>
                          <th className="px-6 py-4 text-sm font-semibold text-neutral-600">UK</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {GENERAL_COST_COMPARISON.map((row) => (
                          <tr
                            key={row.item}
                            className="transition-colors hover:bg-neutral-50/50"
                          >
                            <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                              {row.item}
                            </td>
                            <td className="px-6 py-4 text-sm font-bold text-amber-700">
                              {row.spain}
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-600">{row.uk}</td>
                          </tr>
                        ))}
                        <tr className="bg-amber-50/50">
                          <td className="px-6 py-4 font-bold text-neutral-900">TOTAL</td>
                          <td className="px-6 py-4 text-lg font-bold text-amber-700">
                            £6,000–£9,000
                          </td>
                          <td className="px-6 py-4 text-lg font-bold text-neutral-700">
                            £10,000–£15,000
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-green-500/20 px-6 py-3 border border-green-400/30">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <p className="text-sm text-green-300 font-semibold">
                    Savings: £4,000–£6,000 (35–45%)
                  </p>
                </div>

                <p className="mt-6 text-neutral-400 leading-relaxed text-sm font-light">
                  <strong className="text-neutral-300 font-semibold">Why Spain costs less:</strong> Lower operational costs than the UK,
                  competitive private healthcare market, and bulk purchasing agreements. Spain&apos;s
                  value proposition centres on premium quality at moderate savings, not maximum
                  discounts.
                </p>
              </div>
            </div>
          </m.section>

          {/* =================================================================
              SECTION E: QUALITY & STANDARDS
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Excellence
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Healthcare Quality and Standards in Spain
              </h2>
              <p className="mt-6 text-lg text-neutral-600 font-light">
                World-class healthcare from the globe&apos;s healthiest nation
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
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 text-amber-600 group-hover:from-amber-100 group-hover:to-amber-200 transition-colors duration-300">
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
              SECTION F: SPAIN VS ALTERNATIVES
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="mb-12 text-center max-w-3xl mx-auto">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Comparison
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Spain vs Turkey vs Poland: Which to Choose?
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                An honest comparison to help you decide
              </p>
            </div>

            <div className="bg-neutral-900 rounded-[3rem] p-8 sm:p-12 relative overflow-hidden mb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-teal-600/10" />

              <div className="relative z-10 rounded-3xl bg-white overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-neutral-200 bg-neutral-50/80">
                        <th className="px-6 py-5 text-sm font-semibold text-neutral-900">Factor</th>
                        <th className="px-6 py-5 text-sm font-semibold text-amber-700">
                          <div className="flex items-center gap-3 bg-amber-50 px-4 py-2 rounded-lg border border-amber-100 w-max">
                            <div className="w-6 overflow-hidden rounded-sm shadow-sm border border-amber-200/50">
                              <ES title="Spain" />
                            </div>
                            Spain
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
                        <th className="px-6 py-5 text-sm font-semibold text-blue-700">
                          <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 w-max">
                            <div className="w-6 overflow-hidden rounded-sm shadow-sm border border-blue-200/50">
                              <PL title="Poland" />
                            </div>
                            Poland
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
                          <td className="px-6 py-5 font-medium text-amber-800">{row.spain}</td>
                          <td className="px-6 py-5 font-medium text-teal-800">{row.turkey}</td>
                          <td className="px-6 py-5 font-medium text-blue-800">{row.poland}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-amber-200 transition-colors">
                <h4 className="text-xl font-bold text-amber-900 border-b border-amber-200/50 pb-4 mb-4">
                  Choose Spain if:
                </h4>
                <ul className="space-y-4 text-base text-amber-800">
                  {[
                    'Quality is your top priority',
                    'You want fertility/IVF treatment',
                    'Premium cosmetic surgery appeals',
                    'Sunny recovery climate matters',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
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
                    'Budget is primary concern',
                    'You need hair transplant',
                    'Maximum savings required',
                    'All-inclusive packages appeal',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-500" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-blue-200 transition-colors">
                <h4 className="text-xl font-bold text-blue-900 border-b border-blue-200/50 pb-4 mb-4">
                  Choose Poland if:
                </h4>
                <ul className="space-y-4 text-base text-blue-800">
                  {[
                    'Value cosmetic surgery',
                    'Want EU + significant savings',
                    'Prefer personalised care',
                    'Shortest flights matter',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </m.section>

          {/* =================================================================
              SECTION G: CITIES
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="max-w-2xl text-center mx-auto mb-12">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Destinations
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Where to Get Treatment in Spain
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                From Barcelona&apos;s medical excellence to Costa del Sol&apos;s premium recovery
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
                    <span className="text-xs font-bold text-amber-700 bg-amber-100/80 px-3 py-1.5 rounded-full border border-amber-200/50 uppercase tracking-widest">
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
                      <Plane className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <p className="text-sm text-neutral-800 font-medium">{city.flight}</p>
                    </div>
                  </div>
                </m.div>
              ))}
            </div>
          </m.section>

          {/* =================================================================
              SECTION H: PATIENT JOURNEY
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Process
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Your Spain Medical Tourism Journey
              </h2>
            </div>

            <div className="mx-auto max-w-4xl relative">
              <div className="absolute left-8 top-8 bottom-8 w-1 bg-amber-100 rounded-full hidden sm:block" />
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
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-lg font-bold text-white shadow-lg shadow-amber-500/30 border-4 border-white">
                        {phase.step}
                      </div>
                      <span className="rounded-full bg-amber-50 text-amber-700 px-3 py-1 text-sm font-semibold border border-amber-100">
                        {phase.timing}
                      </span>
                    </div>

                    <div className="hidden sm:flex flex-col items-center z-10">
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-xl font-bold text-white shadow-lg shadow-amber-500/30 border-4 border-white">
                        {phase.step}
                      </div>
                    </div>

                    <div className="flex-1 rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                      <div className="hidden sm:flex items-center gap-4 mb-4">
                        <h3 className="text-xl font-bold text-neutral-900">{phase.title}</h3>
                        <span className="rounded-full bg-amber-50 text-amber-700 px-3 py-1 text-sm font-semibold border border-amber-100">
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
              SECTION I: PRACTICAL INFORMATION
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                Logistics
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Planning Your Spain Trip
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
              SECTION J: FAQ
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
                  title="Frequently Asked Questions About Medical Tourism in Spain"
                  className="faq-section"
                />
              </div>
            </div>
          </m.section>

          {/* =================================================================
              SECTION K: CTA
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
                  <ES title="Spain" />
                </div>
                <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl tracking-tight leading-[1.1]">
                  Ready to Explore Treatment in{' '}
                  <span className="bg-gradient-to-r from-blue-200 via-amber-200 to-primary-200 bg-clip-text text-transparent">
                    Spain
                  </span>
                  ?
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl font-light leading-relaxed">
                  Use MeetYourClinic to compare verified clinics across Barcelona, Madrid, and beyond.
                  World-class healthcare from the globe&apos;s healthiest nation. Get real prices,
                  read honest reviews, and book with confidence.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href="/search?destination=spain">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base shadow-xl shadow-white/10"
                    >
                      Browse Verified Clinics in Spain
                    </Button>
                  </Link>
                  <Link href="/search?procedure=ivf&country=spain">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base backdrop-blur-md"
                    >
                      Explore Fertility Treatment
                    </Button>
                  </Link>
                </div>
                <div className="mt-8 flex items-center justify-center gap-6 flex-wrap text-sm text-primary-200/80 font-medium tracking-wide">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" /> #1 healthiest nation
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" /> EU standards
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
                href="/procedures/rhinoplasty/spain"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Rhinoplasty
              </Link>
              <span className="text-neutral-300">·</span>
              <Link
                href="/procedures/dental-implants/spain"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Dental Implants
              </Link>
              <span className="text-neutral-300">·</span>
              <Link
                href="/procedures/veneers/spain"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Veneers
              </Link>
              <span className="text-neutral-300">·</span>
              <Link
                href="/procedures/liposuction/spain"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Liposuction
              </Link>
              <span className="text-neutral-300">·</span>
              <Link
                href="/procedures/tummy-tuck/spain"
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
                href="/destinations/poland"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Poland
              </Link>
              <span className="text-neutral-300">·</span>
              <Link
                href="/destinations/hungary"
                className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
              >
                Hungary
              </Link>
            </div>
          </m.section>
        </div>
      </div>
  )
}
