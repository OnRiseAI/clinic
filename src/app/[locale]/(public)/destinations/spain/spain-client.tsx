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
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
}

// =============================================================================
// COMPONENT
// =============================================================================

export function SpainDestinationClient({ faqs }: SpainDestinationClientProps) {
  return (
    <>
      {/* =====================================================================
          HERO SECTION
          ===================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-amber-700 to-orange-800 text-white">
        <div className="absolute inset-0 bg-[url('/images/patterns/medical-pattern.svg')] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="flex items-start gap-4 sm:items-center">
            <div className="w-16 overflow-hidden rounded-md shadow-lg border-2 border-white/20">
              <ES title="Spain" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Medical Tourism in Spain: World-Class Healthcare in the Sun
              </h1>
              <p className="mt-4 max-w-2xl text-base text-amber-100 sm:text-lg lg:text-xl">
                Europe's #1 for IVF. Ranked healthiest nation globally. EU healthcare excellence.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <Link href="/search?destination=spain">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Browse Verified Clinics in Spain
              </Button>
            </Link>
            <Link href="#fertility">
              <Button
                variant="ghost"
                size="lg"
                className="w-full text-white hover:bg-white/10 sm:w-auto"
              >
                Explore Fertility Options
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-amber-200 sm:gap-6">
            <span className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              #1 Healthiest Nation
            </span>
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              EU Standards & Protections
            </span>
            <span className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              English-Speaking Teams
            </span>
            <span className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              Mediterranean Recovery
            </span>
          </div>

          {/* Hero Stats */}
          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white/10 p-4 backdrop-blur-sm"
              >
                <p className="text-2xl font-bold sm:text-3xl">{stat.value}</p>
                <p className="text-sm text-amber-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* =====================================================================
            SECTION A: WHY SPAIN
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Why Spain is a World Leader in Healthcare
          </h2>

          <div className="mt-6 space-y-4 text-neutral-700 sm:mt-8 sm:space-y-6">
            <p className="text-base leading-relaxed sm:text-lg">
              Spain doesn't just offer medical tourism — it offers world-class healthcare from the
              globe's healthiest nation. The Bloomberg Healthiest Country Index ranks Spain #1
              globally, ahead of the UK (#19) and USA (#35). This isn't marketing — it reflects
              decades of investment in healthcare infrastructure, medical education, and public
              health.
            </p>

            <p className="leading-relaxed">
              <strong>Quality is the value proposition.</strong> Unlike destinations competing on
              price alone, Spain offers moderate savings (20–40%) combined with exceptional
              standards. The Medical Tourism Index ranks Spain #4 globally out of 46 destinations.
              With 804 hospitals, 160,981 beds, and over 10,600 surgeries per 100,000 population,
              Spain's medical infrastructure rivals the world's best.
            </p>

            <p className="leading-relaxed">
              <strong>Europe's fertility capital.</strong> Spain leads Europe for IVF and
              fertility treatment, with progressive laws allowing anonymous egg donation —
              something not available in the UK. World-renowned clinics like IVI (the world's
              largest fertility group), Eugin, and Institut Marquès attract patients from across
              Europe seeking donor treatment with shorter waiting times.
            </p>

            <p className="leading-relaxed">
              <strong>Recovery in the Mediterranean sun.</strong> Beyond medical excellence, Spain
              offers what few destinations can: a sunny climate perfect for recuperation, world-class
              culture and cuisine, and the peace of mind that comes from EU patient protections.
              Over 120,000 medical tourists choose Spain annually — and that figure grows 20%
              year-on-year.
            </p>
          </div>

          {/* AEO Block — Quality */}
          <div
            className="mt-8 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-6 border border-amber-100"
            data-aeo="quality-spain"
            data-question="How good is Spain's healthcare system?"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block quality-summary">
              Spain has the world's #1 ranked healthcare system according to the Bloomberg
              Healthiest Country Index, ahead of the UK (#19) and USA (#35). The Medical Tourism
              Index ranks Spain #4 globally out of 46 destinations. With 804 hospitals, 160,981
              beds, and over 10,600 surgeries per 100,000 population, Spain offers world-class
              medical infrastructure with EU regulatory standards and patient protections.
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION B: PROCEDURES AVAILABLE
            ===================================================================== */}
        <m.section {...fadeInUp} id="procedures" className="mb-16 scroll-mt-8 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Medical Procedures Available in Spain
          </h2>
          <p className="mt-2 text-neutral-600">
            Premium quality across all procedures, with particular excellence in fertility
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {PROCEDURE_CATEGORIES.map((proc, index) => (
              <m.div
                key={proc.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={proc.link}
                  className={`group block h-full rounded-xl border bg-white p-5 transition-all hover:shadow-md ${proc.highlight
                      ? 'border-amber-300 ring-2 ring-amber-100'
                      : 'border-neutral-200 hover:border-amber-200'
                    }`}
                >
                  {proc.highlight && (
                    <span className="mb-3 inline-block rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                      Spain's Flagship
                    </span>
                  )}
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${proc.color}`}>
                    <proc.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-neutral-900 group-hover:text-amber-600">
                    {proc.name}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">{proc.procedures}</p>
                  <div className="mt-4 space-y-1 text-sm">
                    <p className="font-medium text-amber-700">Spain: {proc.spainPrice}</p>
                    <p className="text-neutral-500">UK: {proc.ukPrice}</p>
                    <p className="font-semibold text-green-600">Save {proc.savings}</p>
                  </div>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-amber-600">
                    Compare clinics
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </Link>
              </m.div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <p className="text-sm text-amber-800">
              <strong>Spain's Positioning:</strong> Quality over maximum savings. Spain suits
              patients who want world-class healthcare standards, premium surgical expertise, and
              sunny recovery environment — with moderate savings of 20–40%. For maximum cost
              savings (50–70%), consider Turkey or Poland instead.
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION C: FERTILITY / IVF
            ===================================================================== */}
        <m.section {...fadeInUp} id="fertility" className="mb-16 scroll-mt-8 sm:mb-20">
          <div className="rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 p-6 sm:p-8 border border-pink-100">
            <div className="flex items-center gap-3">
              <Baby className="h-8 w-8 text-pink-600" />
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                IVF and Fertility Treatment: Spain's Flagship Speciality
              </h2>
            </div>

            <div className="mt-6 space-y-4 text-neutral-700">
              <p className="leading-relaxed">
                Spain is Europe's undisputed fertility leader, and for good reason. Progressive
                legislation allows anonymous egg donation — something not permitted in the UK,
                where donors must be identifiable. This means no waiting lists for donor eggs,
                excellent donor availability, and complete privacy.
              </p>
              <p className="leading-relaxed">
                <strong>Why Spain leads:</strong> World-renowned clinics including IVI (the world's
                largest fertility group with 70+ clinics), Eugin, and Institut Marquès. Spanish
                women have excellent egg quality attributed to Mediterranean diet and lifestyle.
                High success rates comparable to or exceeding UK clinics. And the relaxed
                Mediterranean environment helps reduce stress — a known factor in fertility.
              </p>
            </div>

            {/* AEO Block — Fertility */}
            <div
              className="mt-6 rounded-xl bg-white/70 p-4 sm:p-6"
              data-aeo="fertility-spain"
              data-question="Is Spain good for IVF treatment?"
            >
              <p className="text-neutral-700 leading-relaxed ai-answer-block fertility-summary">
                Spain is Europe's leading destination for IVF and fertility treatment. Progressive
                legislation allows anonymous egg donation (not available in UK), with no waiting
                lists for donor eggs. World-renowned clinics include IVI (world's largest fertility
                group), Eugin, and Institut Marquès. IVF with egg donation costs £5,500–£8,000 in
                Spain versus £10,000–£15,000 in the UK. The Mediterranean climate helps reduce
                stress, improving outcomes.
              </p>
            </div>

            {/* IVF Cost Comparison */}
            <div className="mt-8 overflow-x-auto">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Fertility Treatment Costs: Spain vs UK
              </h3>
              <table className="w-full min-w-[400px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-pink-200 bg-white/50">
                    <th className="px-4 py-3 text-left font-semibold text-neutral-900">Treatment</th>
                    <th className="px-4 py-3 text-left font-semibold text-amber-700">Spain</th>
                    <th className="px-4 py-3 text-left font-semibold text-neutral-700">UK</th>
                  </tr>
                </thead>
                <tbody>
                  {IVF_COST_COMPARISON.map((row, index) => (
                    <tr
                      key={row.item}
                      className={index % 2 === 0 ? 'bg-white/30' : 'bg-white/50'}
                    >
                      <td className="border-b border-pink-100 px-4 py-3 text-neutral-900">
                        {row.item}
                      </td>
                      <td className="border-b border-pink-100 px-4 py-3 font-medium text-amber-700">
                        {row.spain}
                      </td>
                      <td className="border-b border-pink-100 px-4 py-3 text-neutral-600">
                        {row.uk}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg bg-white/70 p-4">
                <Users className="h-6 w-6 text-pink-600" />
                <p className="mt-2 font-semibold text-neutral-900">Anonymous Donation</p>
                <p className="text-sm text-neutral-600">Not available in UK</p>
              </div>
              <div className="rounded-lg bg-white/70 p-4">
                <CheckCircle className="h-6 w-6 text-pink-600" />
                <p className="mt-2 font-semibold text-neutral-900">No Waiting Lists</p>
                <p className="text-sm text-neutral-600">Immediate donor availability</p>
              </div>
              <div className="rounded-lg bg-white/70 p-4">
                <Award className="h-6 w-6 text-pink-600" />
                <p className="mt-2 font-semibold text-neutral-900">World-Class Clinics</p>
                <p className="text-sm text-neutral-600">IVI, Eugin, Institut Marquès</p>
              </div>
              <div className="rounded-lg bg-white/70 p-4">
                <Sun className="h-6 w-6 text-pink-600" />
                <p className="mt-2 font-semibold text-neutral-900">Stress Reduction</p>
                <p className="text-sm text-neutral-600">Mediterranean relaxation</p>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION D: COST COMPARISON
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Spain vs UK: Treatment Cost Comparison
          </h2>
          <p className="mt-2 text-neutral-600">
            Quality + experience, not maximum savings
          </p>

          {/* AEO Block — Cost */}
          <div
            className="mt-6 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-6 border border-amber-100"
            data-aeo="cost-spain"
            data-question="How much does medical tourism in Spain cost?"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block cost-summary">
              Spain offers moderate savings of 20–40% compared to UK prices. Dental implants cost
              £500–£900 (vs £1,500–£2,500 UK). IVF with egg donation costs £5,500–£8,000 (vs
              £10,000–£15,000 UK). Rhinoplasty runs £2,500–£4,000 (vs £4,000–£7,000 UK). Spain's
              value proposition is premium quality and world-class healthcare rather than maximum
              savings — choose Turkey for 50–70% savings if budget is primary.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">
              Worked Example: IVF with Egg Donation
            </h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[400px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50">
                    <th className="px-4 py-3 text-left font-semibold text-neutral-900">Cost Element</th>
                    <th className="px-4 py-3 text-left font-semibold text-amber-700">Spain</th>
                    <th className="px-4 py-3 text-left font-semibold text-neutral-700">UK</th>
                  </tr>
                </thead>
                <tbody>
                  {GENERAL_COST_COMPARISON.map((row, index) => (
                    <tr
                      key={row.item}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}
                    >
                      <td className="border-b border-neutral-100 px-4 py-3 text-neutral-900">
                        {row.item}
                      </td>
                      <td className="border-b border-neutral-100 px-4 py-3 font-medium text-amber-700">
                        {row.spain}
                      </td>
                      <td className="border-b border-neutral-100 px-4 py-3 text-neutral-600">
                        {row.uk}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-amber-50 font-semibold">
                    <td className="px-4 py-3 text-neutral-900">TOTAL</td>
                    <td className="px-4 py-3 text-amber-700">£6,000–£9,000</td>
                    <td className="px-4 py-3 text-neutral-700">£10,000–£15,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-neutral-600">
              <strong className="text-green-600">Savings: £4,000–£6,000 (35–45%)</strong>
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION E: QUALITY & STANDARDS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Healthcare Quality and Standards in Spain
          </h2>
          <p className="mt-2 text-neutral-600">
            World-class healthcare from the globe's healthiest nation
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2">
            {QUALITY_STANDARDS.map((item, index) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.description}</p>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION F: SPAIN VS ALTERNATIVES
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Spain vs Turkey vs Poland: Which to Choose?
          </h2>
          <p className="mt-2 text-neutral-600">
            An honest comparison to help you decide
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Factor</th>
                  <th className="px-4 py-3 text-left font-semibold text-amber-700">
                    <div className="flex items-center gap-2">
                      <div className="w-5 overflow-hidden rounded-sm">
                        <ES title="Spain" />
                      </div>
                      Spain
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-teal-700">
                    <div className="flex items-center gap-2">
                      <div className="w-5 overflow-hidden rounded-sm">
                        <TR title="Turkey" />
                      </div>
                      Turkey
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-blue-700">
                    <div className="flex items-center gap-2">
                      <div className="w-5 overflow-hidden rounded-sm">
                        <PL title="Poland" />
                      </div>
                      Poland
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map((row, index) => (
                  <tr
                    key={row.factor}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}
                  >
                    <td className="border-b border-neutral-100 px-4 py-3 font-medium text-neutral-900">
                      {row.factor}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-amber-700">
                      {row.spain}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-teal-700">
                      {row.turkey}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-blue-700">
                      {row.poland}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h4 className="font-semibold text-amber-900">Choose Spain if:</h4>
              <ul className="mt-3 space-y-2 text-sm text-amber-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Quality is your top priority
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  You want fertility/IVF treatment
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Premium cosmetic surgery appeals
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Sunny recovery climate matters
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-teal-200 bg-teal-50 p-5">
              <h4 className="font-semibold text-teal-900">Choose Turkey if:</h4>
              <ul className="mt-3 space-y-2 text-sm text-teal-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Budget is primary concern
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  You need hair transplant
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Maximum savings required
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  All-inclusive packages appeal
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
              <h4 className="font-semibold text-blue-900">Choose Poland if:</h4>
              <ul className="mt-3 space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Value cosmetic surgery
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Want EU + significant savings
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Prefer personalised care
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Shortest flights matter
                </li>
              </ul>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION G: CITIES
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Where to Get Treatment in Spain
          </h2>
          <p className="mt-2 text-neutral-600">
            From Barcelona's medical excellence to Costa del Sol's premium recovery
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {CITIES.map((city, index) => (
              <m.div
                key={city.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-neutral-900">{city.name}</h3>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                    {city.highlight}
                  </span>
                </div>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{city.description}</p>
                <div className="mt-4 space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <strong>Best for:</strong> {city.bestFor}
                  </p>
                  <p className="flex items-center gap-2 text-neutral-600">
                    <Plane className="h-4 w-4 text-amber-500" />
                    {city.flight}
                  </p>
                </div>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION H: PATIENT JOURNEY
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Your Spain Medical Tourism Journey
          </h2>

          <div className="mt-8 space-y-6">
            {PATIENT_JOURNEY.map((phase, index) => (
              <m.div
                key={phase.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">
                    {phase.step}
                  </div>
                  {index < PATIENT_JOURNEY.length - 1 && (
                    <div className="mt-2 h-full w-0.5 bg-amber-200" />
                  )}
                </div>
                <div className="pb-6">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-neutral-900">{phase.title}</h3>
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
                      {phase.timing}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {phase.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2 text-sm text-neutral-600">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION I: PRACTICAL INFORMATION
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Planning Your Spain Trip
          </h2>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICAL_INFO.map((info, index) => (
              <m.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-5"
              >
                <h3 className="font-semibold text-neutral-900">{info.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{info.content}</p>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION J: FAQ
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <FAQSection
            faqs={faqs}
            title="Frequently Asked Questions About Medical Tourism in Spain"
            className="faq-section"
          />
        </m.section>

        {/* =====================================================================
            SECTION K: CTA
            ===================================================================== */}
        <m.section {...fadeInUp}>
          <div className="rounded-2xl bg-gradient-to-r from-amber-600 to-orange-700 p-6 text-white sm:p-8 lg:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 w-16 overflow-hidden rounded-md shadow-xl border-2 border-white/20">
                <ES title="Spain" />
              </div>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                Ready to Explore Treatment in Spain?
              </h2>
              <p className="mt-3 text-amber-100 sm:mt-4 sm:text-lg">
                Use medit to compare verified clinics across Barcelona, Madrid, and beyond.
                World-class healthcare from the globe's healthiest nation. Get real prices,
                read honest reviews, and book with confidence.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
                <Link href="/search?destination=spain">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Browse Verified Clinics in Spain
                  </Button>
                </Link>
                <Link href="/search?procedure=ivf&country=spain">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full text-white hover:bg-white/10 sm:w-auto"
                  >
                    Explore Fertility Treatment
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-amber-200">
                #1 healthiest nation · EU standards · No booking fees
              </p>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            INTERNAL LINKS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mt-12 border-t border-neutral-200 pt-8">
          <p className="text-sm text-neutral-600">
            <strong>Procedures in Spain:</strong>{' '}
            <Link href="/procedures/rhinoplasty/spain" className="text-amber-600 hover:underline">
              Rhinoplasty
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/dental-implants/spain" className="text-amber-600 hover:underline">
              Dental Implants
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/veneers/spain" className="text-amber-600 hover:underline">
              Veneers
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/liposuction/spain" className="text-amber-600 hover:underline">
              Liposuction
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/tummy-tuck/spain" className="text-amber-600 hover:underline">
              Tummy Tuck
            </Link>
          </p>
          <p className="mt-2 text-sm text-neutral-600">
            <strong>Compare:</strong>{' '}
            <Link href="/destinations/turkey" className="text-amber-600 hover:underline">
              Turkey
            </Link>{' '}
            ·{' '}
            <Link href="/destinations/poland" className="text-amber-600 hover:underline">
              Poland
            </Link>{' '}
            ·{' '}
            <Link href="/destinations/hungary" className="text-amber-600 hover:underline">
              Hungary
            </Link>
          </p>
        </m.section>
      </div>
    </>
  )
}
