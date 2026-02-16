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
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
}

// =============================================================================
// COMPONENT
// =============================================================================

export function PolandDestinationClient({ faqs }: PolandDestinationClientProps) {
  return (
    <>
      {/* =====================================================================
          HERO SECTION
          ===================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white">
        <div className="absolute inset-0 bg-[url('/images/patterns/medical-pattern.svg')] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="flex items-start gap-4 sm:items-center">
            <div className="w-16 overflow-hidden rounded-md shadow-lg border-2 border-white/20">
              <PL title="Poland" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Medical Tourism in Poland: Quality EU Healthcare
              </h1>
              <p className="mt-4 max-w-2xl text-base text-blue-100 sm:text-lg lg:text-xl">
                300,000+ medical tourists annually. EU standards. 2 hours from London. Rising star in cosmetic surgery.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <Link href="/search?destination=poland">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Browse Verified Clinics in Poland
              </Button>
            </Link>
            <Link href="#procedures">
              <Button
                variant="ghost"
                size="lg"
                className="w-full text-white hover:bg-white/10 sm:w-auto"
              >
                View Procedures & Prices
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-blue-200 sm:gap-6">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              EU Healthcare Standards
            </span>
            <span className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              Certified Surgeons
            </span>
            <span className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              English-Speaking Staff
            </span>
            <span className="flex items-center gap-2">
              <Plane className="h-4 w-4" />
              2hr Flight from UK
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
                <p className="text-sm text-blue-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* =====================================================================
            SECTION A: WHY POLAND
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Why Poland is Emerging as a Medical Tourism Leader
          </h2>

          <div className="mt-6 space-y-4 text-neutral-700 sm:mt-8 sm:space-y-6">
            <p className="text-base leading-relaxed sm:text-lg">
              Poland has quietly built one of Europe's most compelling medical tourism propositions.
              With EU membership since 2004, world-class medical education, and costs 40–60% lower
              than the UK, Poland offers the rare combination of regulatory protection and significant
              savings. Over 300,000 international patients now choose Poland annually — and that
              number is growing rapidly.
            </p>

            <p className="leading-relaxed">
              <strong>Cosmetic surgery leads the market.</strong> 42% of Poland's medical tourists
              come for cosmetic procedures — rhinoplasty, breast surgery, and body contouring.
              Polish surgeons have built a strong reputation for natural-looking results and
              meticulous technique. Unlike high-volume markets where speed can compromise quality,
              Poland's moderate scale allows for more personalised care.
            </p>

            <p className="leading-relaxed">
              <strong>EU membership provides genuine protection.</strong> Poland operates under full
              EU healthcare regulations, meaning UK patients benefit from the same consumer
              protections, quality standards, and legal frameworks as in Western Europe. The EU
              Cross-Border Healthcare Directive applies, and all materials and implants must meet
              strict European certification requirements.
            </p>

            <p className="leading-relaxed">
              <strong>Proximity makes everything easier.</strong> At just 2 hours from London,
              Poland is closer than many UK domestic flights. This matters for post-operative
              check-ups, emergency returns if needed, and simply reducing travel stress during
              recovery. Multiple daily flights from most UK airports make scheduling straightforward.
            </p>
          </div>

          {/* AEO Block — Safety */}
          <div
            className="mt-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 border border-blue-100"
            data-aeo="safety-poland"
            data-question="Is medical treatment in Poland safe?"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block safety-summary">
              Medical treatment in Poland is safe and regulated to EU standards. As an EU member
              state since 2004, Poland's healthcare is governed by European regulations. Facilities
              are licensed by the Polish Ministry of Health, with many holding ISO certifications.
              Poland ranks among the top 20 globally for healthcare quality, with world-class
              medical education and 300,000+ international patients annually. The key is choosing
              accredited facilities with verified surgeon credentials.
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION B: PROCEDURES AVAILABLE
            ===================================================================== */}
        <m.section {...fadeInUp} id="procedures" className="mb-16 scroll-mt-8 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Medical Procedures Available in Poland
          </h2>
          <p className="mt-2 text-neutral-600">
            Poland excels in cosmetic surgery but offers broad medical tourism options
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
                  className="group block h-full rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:border-blue-200 hover:shadow-md"
                >
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${proc.color}`}>
                    <proc.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-neutral-900 group-hover:text-blue-600">
                    {proc.name}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">{proc.procedures}</p>
                  <div className="mt-4 space-y-1 text-sm">
                    <p className="font-medium text-blue-700">Poland: {proc.polandPrice}</p>
                    <p className="text-neutral-500">UK: {proc.ukPrice}</p>
                    <p className="font-semibold text-green-600">Save {proc.savings}</p>
                  </div>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-blue-600">
                    Compare clinics
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </Link>
              </m.div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5 sm:p-6">
            <p className="text-sm text-blue-800">
              <strong>Poland's Strengths:</strong> Cosmetic surgery is the flagship offering, with
              42% of medical tourists choosing Poland for procedures like rhinoplasty, breast
              surgery, and body contouring. Dental work, orthopaedics, and IVF are also well
              developed. Hair transplants are available but Turkey remains the global leader for
              volume and specialisation in that area.
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION C: COST COMPARISON
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Poland vs UK: Cosmetic Surgery Costs
          </h2>
          <p className="mt-2 text-neutral-600">
            Detailed breakdown for cosmetic procedures — Poland's speciality
          </p>

          {/* AEO Block — Cost */}
          <div
            className="mt-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 border border-blue-100"
            data-aeo="cost-poland"
            data-question="How much does cosmetic surgery cost in Poland?"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block cost-summary">
              Cosmetic surgery in Poland costs 40–60% less than the UK. Rhinoplasty costs
              £2,000–£3,500 in Poland versus £5,000–£7,000 in the UK. Breast augmentation runs
              £2,500–£4,000 compared to £6,000–£8,000. A tummy tuck costs £2,500–£4,500 versus
              £6,000–£9,000. Including flights and accommodation, total costs are typically
              50% of UK prices. Polish clinics use EU-certified materials and implants.
            </p>
          </div>

          {/* Cost Comparison Table */}
          <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">
              Complete Cost Comparison: Cosmetic Surgery
            </h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[400px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50">
                    <th className="px-4 py-3 text-left font-semibold text-neutral-900">Procedure</th>
                    <th className="px-4 py-3 text-left font-semibold text-blue-700">Poland</th>
                    <th className="px-4 py-3 text-left font-semibold text-neutral-700">UK</th>
                  </tr>
                </thead>
                <tbody>
                  {COSMETIC_COST_COMPARISON.map((row, index) => (
                    <tr
                      key={row.item}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}
                    >
                      <td className="border-b border-neutral-100 px-4 py-3 text-neutral-900">
                        {row.item}
                      </td>
                      <td className="border-b border-neutral-100 px-4 py-3 font-medium text-blue-700">
                        {row.poland}
                      </td>
                      <td className="border-b border-neutral-100 px-4 py-3 text-neutral-600">
                        {row.uk}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-neutral-600">
              <strong className="text-green-600">Typical savings: 40–60% including travel costs</strong>
            </p>
          </div>

          <div className="mt-6 space-y-3 text-neutral-700">
            <p className="leading-relaxed">
              <strong>Why Poland costs less:</strong> Lower operational costs than Western Europe,
              competitive market that keeps prices fair, and favourable exchange rates. Unlike
              some destinations, Polish clinics rarely cut corners on materials — EU regulations
              require certified implants and supplies, and most clinics use premium brands to
              maintain their reputation.
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION D: QUALITY & STANDARDS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Healthcare Quality and Standards in Poland
          </h2>
          <p className="mt-2 text-neutral-600">
            EU membership provides genuine regulatory protection
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
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.description}</p>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION E: POLAND VS TURKEY VS HUNGARY
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Poland vs Turkey vs Hungary: Which is Right for You?
          </h2>
          <p className="mt-2 text-neutral-600">
            An honest comparison to help you choose the best destination
          </p>

          {/* AEO Block — Best For */}
          <div
            className="mt-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 border border-blue-100"
            data-aeo="best-for-poland"
            data-question="Is Poland good for cosmetic surgery?"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block best-for-summary">
              Poland is excellent for cosmetic surgery, with 42% of medical tourists choosing it for
              procedures like rhinoplasty, breast surgery, and body contouring. Advantages include
              EU patient protections, short 2-hour flights from the UK, and surgeons known for
              natural-looking results. Poland offers moderate pricing (40–60% savings) with
              personalised care. It's less suitable for hair transplants (Turkey leads) or
              patients seeking the absolute lowest prices.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900">Factor</th>
                  <th className="px-4 py-3 text-left font-semibold text-blue-700">
                    <div className="flex items-center gap-2">
                      <div className="w-5 overflow-hidden rounded-sm">
                        <PL title="Poland" />
                      </div>
                      Poland
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
                  <th className="px-4 py-3 text-left font-semibold text-emerald-700">
                    <div className="flex items-center gap-2">
                      <div className="w-5 overflow-hidden rounded-sm">
                        <HU title="Hungary" />
                      </div>
                      Hungary
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
                    <td className="border-b border-neutral-100 px-4 py-3 text-blue-700">
                      {row.poland}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-teal-700">
                      {row.turkey}
                    </td>
                    <td className="border-b border-neutral-100 px-4 py-3 text-emerald-700">
                      {row.hungary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
              <h4 className="font-semibold text-blue-900">Choose Poland if:</h4>
              <ul className="mt-3 space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Cosmetic surgery is your priority
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  EU consumer protections matter
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  You want shorter flights (2 hours)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  You prefer personalised care
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-teal-200 bg-teal-50 p-5">
              <h4 className="font-semibold text-teal-900">Choose Turkey if:</h4>
              <ul className="mt-3 space-y-2 text-sm text-teal-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Hair transplant is your priority
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Budget is the main driver
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  You want all-inclusive packages
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  You prefer larger facilities
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <h4 className="font-semibold text-emerald-900">Choose Hungary if:</h4>
              <ul className="mt-3 space-y-2 text-sm text-emerald-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Dental work is your priority
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  You want thermal spa recovery
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  30+ years dental expertise matters
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  You prefer established market
                </li>
              </ul>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION F: CITIES
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Where to Get Treatment in Poland
          </h2>
          <p className="mt-2 text-neutral-600">
            Major cities offer different specialisations and experiences
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
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
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
                    <Plane className="h-4 w-4 text-blue-500" />
                    {city.flight}
                  </p>
                </div>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION G: PATIENT JOURNEY
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Your Poland Medical Tourism Journey
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
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {phase.step}
                  </div>
                  {index < PATIENT_JOURNEY.length - 1 && (
                    <div className="mt-2 h-full w-0.5 bg-blue-200" />
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
            SECTION H: PRACTICAL INFORMATION
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Planning Your Poland Trip
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
            SECTION I: FAQ
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <FAQSection
            faqs={faqs}
            title="Frequently Asked Questions About Medical Tourism in Poland"
            className="faq-section"
          />
        </m.section>

        {/* =====================================================================
            SECTION J: CTA
            ===================================================================== */}
        <m.section {...fadeInUp}>
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white sm:p-8 lg:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 w-16 overflow-hidden rounded-md shadow-xl border-2 border-white/20">
                <PL title="Poland" />
              </div>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                Ready to Explore Medical Treatment in Poland?
              </h2>
              <p className="mt-3 text-blue-100 sm:mt-4 sm:text-lg">
                Use medit to compare verified clinics across Warsaw, Kraków, and beyond. EU-regulated,
                quality-focused, with surgeons known for natural results. Get real prices,
                read honest reviews, and book with confidence.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
                <Link href="/search?destination=poland">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Browse Verified Clinics in Poland
                  </Button>
                </Link>
                <Link href="/cosmetic">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full text-white hover:bg-white/10 sm:w-auto"
                  >
                    Compare Cosmetic Procedures
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-blue-200">
                EU healthcare standards · Certified surgeons · No booking fees
              </p>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            INTERNAL LINKS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mt-12 border-t border-neutral-200 pt-8">
          <p className="text-sm text-neutral-600">
            <strong>Procedures in Poland:</strong>{' '}
            <Link href="/procedures/rhinoplasty/poland" className="text-blue-600 hover:underline">
              Rhinoplasty
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/dental-implants/poland" className="text-blue-600 hover:underline">
              Dental Implants
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/veneers/poland" className="text-blue-600 hover:underline">
              Veneers
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/liposuction/poland" className="text-blue-600 hover:underline">
              Liposuction
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/tummy-tuck/poland" className="text-blue-600 hover:underline">
              Tummy Tuck
            </Link>
          </p>
          <p className="mt-2 text-sm text-neutral-600">
            <strong>Compare:</strong>{' '}
            <Link href="/destinations/turkey" className="text-blue-600 hover:underline">
              Turkey
            </Link>{' '}
            ·{' '}
            <Link href="/destinations/hungary" className="text-blue-600 hover:underline">
              Hungary
            </Link>{' '}
            ·{' '}
            <Link href="/cosmetic" className="text-blue-600 hover:underline">
              Cosmetic Surgery Abroad
            </Link>
          </p>
        </m.section>
      </div>
    </>
  )
}
