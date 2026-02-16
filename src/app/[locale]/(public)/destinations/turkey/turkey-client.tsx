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
  Clock,
  MapPin,
  ArrowRight,
  AlertTriangle,
  Globe,
  BadgeCheck,
  Building2,
  Users,
  CreditCard,
  FileText,
  Stethoscope,
  Heart,
  Eye,
  Scissors,
  SmilePlus,
  Calendar,
  Phone,
  MessageCircle,
  Award,
} from 'lucide-react'
import { TR } from 'country-flag-icons/react/3x2'

// =============================================================================
// TYPES
// =============================================================================

interface TurkeyDestinationClientProps {
  faqs: Array<{ question: string; answer: string }>
}

// =============================================================================
// STATIC DATA — HERO STATS
// =============================================================================

const HERO_STATS = [
  { value: '1.5M+', label: 'International patients annually' },
  { value: '50+', label: 'JCI-accredited hospitals' },
  { value: '£3B+', label: 'Health tourism revenue (2024)' },
  { value: '50–70%', label: 'Cost savings vs UK' },
]

// =============================================================================
// STATIC DATA — PROCEDURES
// =============================================================================

const PROCEDURE_CATEGORIES = [
  {
    icon: SmilePlus,
    name: 'Dental',
    procedures: 'Implants, Veneers, Crowns, All-on-4',
    turkeyPrice: '£250–£400/tooth',
    ukPrice: '£800–£1,200/tooth',
    savings: '60–70%',
    link: '/procedures/dental-implants/turkey',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    icon: Users,
    name: 'Hair Restoration',
    procedures: 'FUE, DHI, Sapphire FUE',
    turkeyPrice: '£1,500–£2,800',
    ukPrice: '£8,000–£15,000',
    savings: '70–80%',
    link: '/search?procedure=hair-transplant&country=turkey',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Stethoscope,
    name: 'Rhinoplasty',
    procedures: 'Open, Closed, Revision',
    turkeyPrice: '£2,200–£3,500',
    ukPrice: '£5,000–£7,000',
    savings: '50–55%',
    link: '/procedures/rhinoplasty/turkey',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Scissors,
    name: 'Body Contouring',
    procedures: 'Liposuction, Tummy Tuck, BBL',
    turkeyPrice: '£2,500–£5,000',
    ukPrice: '£6,000–£12,000',
    savings: '55–60%',
    link: '/procedures/liposuction/turkey',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Heart,
    name: 'Breast Surgery',
    procedures: 'Augmentation, Lift, Reduction',
    turkeyPrice: '£2,800–£4,500',
    ukPrice: '£6,000–£8,000',
    savings: '50–55%',
    link: '/search?procedure=breast-surgery&country=turkey',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    icon: Building2,
    name: 'Bariatric',
    procedures: 'Gastric Sleeve, Bypass',
    turkeyPrice: '£2,500–£4,500',
    ukPrice: '£8,000–£15,000',
    savings: '65–70%',
    link: '/search?procedure=bariatric&country=turkey',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Eye,
    name: 'Eye Surgery',
    procedures: 'LASIK, Cataract, Lens Replacement',
    turkeyPrice: '£800–£1,500',
    ukPrice: '£2,500–£4,000',
    savings: '60–65%',
    link: '/search?procedure=eye-surgery&country=turkey',
    color: 'bg-indigo-50 text-indigo-600',
  },
]

// =============================================================================
// STATIC DATA — COST COMPARISON (Full Mouth Example)
// =============================================================================

const FULL_MOUTH_COST_COMPARISON = [
  { item: 'Implants (4 per jaw)', turkey: 'Included', uk: '£2,000–£3,000 each' },
  { item: 'Crowns/Bridge', turkey: 'Included', uk: '£500–£1,000 each' },
  { item: 'Consultations', turkey: 'Included', uk: '£50–£150 each' },
  { item: 'Scans & X-rays', turkey: 'Included', uk: '£100–£300' },
  { item: 'Hospital fees', turkey: 'Included', uk: '£500–£1,500' },
  { item: 'Accommodation (5 nights)', turkey: 'Included', uk: 'N/A' },
  { item: 'Airport transfers', turkey: 'Included', uk: 'N/A' },
  { item: 'Flights (return)', turkey: '£150–£300', uk: 'N/A' },
]

// =============================================================================
// STATIC DATA — SAFETY CHECKLIST
// =============================================================================

const SAFETY_CHECKLIST = [
  {
    icon: Shield,
    title: 'Hospital Accreditation',
    description:
      'Turkey has 50+ JCI-accredited hospitals — second only to the USA globally. JCI hospitals meet the same standards as top US/UK facilities. Verify any clinic at jci.org/accredited-organizations.',
  },
  {
    icon: BadgeCheck,
    title: 'Surgeon Credentials',
    description:
      'Turkish Medical Association registration required. Many surgeons trained in UK, Germany, or USA. Ask for credentials, board certification, before/after photos, and patient testimonials.',
  },
  {
    icon: Building2,
    title: 'Government Oversight',
    description:
      'Turkish Ministry of Health regulates all medical tourism. USHAŞ (state health tourism agency) provides 24/7 support. HealthTürkiye is the official portal for international patients.',
  },
  {
    icon: FileText,
    title: 'What to Verify',
    description:
      'JCI or Ministry of Health accreditation, surgeon\'s personal credentials, realistic before/after photos, written treatment plan with itemised costs, clear aftercare protocol.',
  },
]

// =============================================================================
// STATIC DATA — RED FLAGS
// =============================================================================

const RED_FLAGS = [
  'Prices significantly below market rate',
  'Pressure to book immediately',
  'No video consultation offered',
  'Vague about surgeon credentials',
  'No written treatment plan',
]

// =============================================================================
// STATIC DATA — CITIES
// =============================================================================

const CITIES = [
  {
    name: 'Istanbul',
    description:
      'Turkey\'s medical tourism capital. 80% of international patients treated here. Major hospitals include Acıbadem, Memorial, Liv, and Medipol.',
    bestFor: 'All procedures, especially cosmetic surgery and hair transplants',
    flight: '3.5 hours from London',
    highlight: 'Medical tourism capital',
  },
  {
    name: 'Antalya',
    description:
      'Mediterranean coast, popular for "treatment + holiday" trips. Growing hub for dental tourism with resort-style recovery options.',
    bestFor: 'Dental work, cosmetic surgery, recovery in resort setting',
    flight: '4 hours from London',
    highlight: 'Beach recovery',
  },
  {
    name: 'Izmir',
    description:
      'Smaller, less crowded alternative. Strong dental and ophthalmology clinics. Ideal for patients wanting a quieter experience.',
    bestFor: 'Dental implants, LASIK, patients wanting quieter experience',
    flight: '4 hours from London',
    highlight: 'Quieter alternative',
  },
  {
    name: 'Ankara',
    description:
      'Capital city with major university hospitals. Less tourist-focused, more "serious medicine". Good for complex procedures.',
    bestFor: 'Complex procedures, second opinions',
    flight: '4 hours from London',
    highlight: 'University hospitals',
  },
]

// =============================================================================
// STATIC DATA — PATIENT JOURNEY
// =============================================================================

const PATIENT_JOURNEY = [
  {
    step: 1,
    title: 'Research & Shortlist',
    timing: '2–4 weeks before',
    tasks: [
      'Identify procedure and budget',
      'Request quotes from 2–3 clinics',
      'Video consultation with surgeon',
      'Review credentials, photos, testimonials',
    ],
  },
  {
    step: 2,
    title: 'Book & Prepare',
    timing: '1–2 weeks before',
    tasks: [
      'Confirm treatment plan in writing',
      'Pay deposit (typically 20–30%)',
      'Arrange flights and any pre-op requirements',
      'Get travel insurance covering medical tourism',
    ],
  },
  {
    step: 3,
    title: 'Arrival in Turkey',
    timing: 'Day 1',
    tasks: [
      'Airport pickup (usually included)',
      'Transfer to hotel or clinic accommodation',
      'Initial consultation and final checks',
      'Confirm procedure details',
    ],
  },
  {
    step: 4,
    title: 'Treatment',
    timing: 'Day 2–3+',
    tasks: [
      'Procedure performed',
      'Recovery in clinic or hotel',
      'Post-op checks and dressing changes',
      'Medication and aftercare instructions',
    ],
  },
  {
    step: 5,
    title: 'Recovery & Departure',
    timing: 'Day 4–7+',
    tasks: [
      'Final check-up before flying',
      'Receive discharge documents',
      'Instructions for UK GP/dentist',
      'Contact details for follow-up questions',
    ],
  },
  {
    step: 6,
    title: 'Aftercare Back Home',
    timing: 'Ongoing',
    tasks: [
      'Follow post-op instructions',
      'Contact clinic with any concerns',
      'Some clinics offer UK-based aftercare partners',
      'Schedule any required follow-ups',
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
      'Direct flights from London, Manchester, Birmingham, Edinburgh. Airlines: British Airways, Turkish Airlines, easyJet, Pegasus. Flight time: 3.5–4 hours. Cost: £100–£300 return (book early).',
  },
  {
    title: 'Visas',
    content:
      'UK citizens: e-Visa required (apply online, £40, approved within 24 hours). Valid for 90 days. Apply at evisa.gov.tr.',
  },
  {
    title: 'Currency & Payments',
    content:
      'Turkish Lira (TRY), but most clinics quote in GBP/EUR/USD. Credit cards widely accepted. ATMs everywhere. Many clinics offer payment plans.',
  },
  {
    title: 'Language',
    content:
      'English widely spoken in medical tourism sector. All reputable clinics have English-speaking coordinators. Translation apps useful for general tourism.',
  },
  {
    title: 'Best Time to Visit',
    content:
      'Spring (April–June): Mild weather, fewer tourists. Autumn (September–November): Pleasant for recovery. Avoid July–August in Istanbul (hot, crowded).',
  },
  {
    title: 'What to Pack',
    content:
      'Comfortable, loose clothing for recovery. Button-front shirts (easier post-surgery). All medications in original packaging. Medical records and treatment plan.',
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

export function TurkeyDestinationClient({ faqs }: TurkeyDestinationClientProps) {
  return (
    <>
      {/* =====================================================================
          HERO SECTION
          ===================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 text-white">
        <div className="absolute inset-0 bg-[url('/images/patterns/medical-pattern.svg')] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="flex items-start gap-4 sm:items-center">
            <div className="w-16 overflow-hidden rounded-md shadow-lg border-2 border-white/20">
              <TR title="Turkey" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Medical Tourism in Turkey: The Complete 2025 Guide
              </h1>
              <p className="mt-4 max-w-2xl text-base text-teal-100 sm:text-lg lg:text-xl">
                1.5 million international patients. 50 JCI-accredited hospitals. Savings of 50–70%
                on UK prices.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <Link href="/search?destination=turkey">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Browse Verified Clinics in Turkey
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
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-teal-200 sm:gap-6">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              JCI Accredited Facilities
            </span>
            <span className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Ministry of Health Regulated
            </span>
            <span className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              English-Speaking Staff
            </span>
            <span className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              All-Inclusive Packages
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
                <p className="text-sm text-teal-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* =====================================================================
            SECTION A: WHY TURKEY
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Why 1.5 Million Patients Choose Turkey Every Year
          </h2>

          <div className="mt-6 space-y-4 text-neutral-700 sm:mt-8 sm:space-y-6">
            <p className="text-base leading-relaxed sm:text-lg">
              Turkey has emerged as one of the world's premier medical tourism destinations, ranking
              4th globally after the USA, Germany, and Thailand. For UK patients seeking quality
              healthcare at affordable prices, Turkey offers a compelling combination of world-class
              facilities, experienced surgeons, and significant cost savings.
            </p>

            <p className="leading-relaxed">
              <strong>Global leadership in key specialties.</strong> Turkey is the undisputed world
              leader in hair transplants, performing over 750,000 procedures annually. It ranks in
              the top 5 globally for cosmetic surgery, with rhinoplasty, body contouring, and breast
              procedures drawing patients from across Europe and the Middle East. Dental tourism is
              equally robust — veneers, implants, and full-mouth restorations attract hundreds of
              thousands of international patients each year.
            </p>

            <p className="leading-relaxed">
              <strong>Strategic location and infrastructure.</strong> Just 3.5–4 hours from London,
              Turkey is easily accessible with multiple daily flights. Istanbul Airport — one of the
              world's busiest — handled over 80 million passengers in 2024. This connectivity, combined
              with government-backed health tourism initiatives through USHAŞ (the state health tourism
              agency), has created a sophisticated infrastructure for medical travellers.
            </p>

            <p className="leading-relaxed">
              <strong>Accreditation that rivals Western standards.</strong> With 50+ hospitals
              holding Joint Commission International (JCI) accreditation — the gold standard in
              healthcare quality — Turkey ranks second only to the USA. These facilities meet the
              same rigorous standards as top American and European hospitals, using identical
              equipment, medications, and protocols.
            </p>
          </div>

          {/* AEO Block — Safety */}
          <div
            className="mt-8 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 p-4 sm:p-6 border border-teal-100"
            data-aeo="safety-turkey"
            data-question="Is Turkey safe for medical tourism?"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block safety-summary">
              Turkey is considered one of the safest medical tourism destinations globally. The
              country has over 50 JCI-accredited hospitals — second only to the USA — ensuring
              international quality standards. The Turkish Ministry of Health regulates all medical
              tourism through USHAŞ, providing a 24/7 patient support line. Over 1.5 million
              international patients received treatment in Turkey in 2024, generating $3 billion in
              revenue. Safety depends on choosing accredited facilities with verified surgeon
              credentials.
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION B: PROCEDURES AVAILABLE
            ===================================================================== */}
        <m.section {...fadeInUp} id="procedures" className="mb-16 scroll-mt-8 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Medical Procedures Available in Turkey
          </h2>
          <p className="mt-2 text-neutral-600">
            Compare Turkey prices with UK equivalents across popular procedures
          </p>

          {/* AEO Block — Procedures */}
          <div
            className="mt-6 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 p-4 sm:p-6 border border-teal-100"
            data-aeo="procedures-turkey"
            data-question="What medical procedures is Turkey known for?"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block procedures-summary">
              Turkey is the global leader in hair transplants, performing over 750,000 procedures
              annually. It ranks top 5 worldwide for cosmetic surgery, particularly rhinoplasty,
              liposuction, and breast procedures. Dental tourism is massive — veneers, implants, and
              full-mouth restorations attract hundreds of thousands of patients yearly. Turkey also
              excels in bariatric surgery (gastric sleeve), ophthalmology (LASIK), and IVF
              treatments. Istanbul is the primary hub, with Antalya popular for dental and
              recovery-focused trips.
            </p>
          </div>

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
                  className="group block h-full rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:border-teal-200 hover:shadow-md"
                >
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${proc.color}`}>
                    <proc.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-neutral-900 group-hover:text-teal-600">
                    {proc.name}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">{proc.procedures}</p>
                  <div className="mt-4 space-y-1 text-sm">
                    <p className="font-medium text-teal-700">Turkey: {proc.turkeyPrice}</p>
                    <p className="text-neutral-500">UK: {proc.ukPrice}</p>
                    <p className="font-semibold text-green-600">Save {proc.savings}</p>
                  </div>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-teal-600">
                    Compare clinics
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </Link>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION C: COST COMPARISON DEEP DIVE
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Turkey vs UK: Real Cost Comparisons
          </h2>
          <p className="mt-2 text-neutral-600">
            Understanding TRUE costs including all fees, accommodation, and travel
          </p>

          {/* AEO Block — Cost */}
          <div
            className="mt-6 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 p-4 sm:p-6 border border-teal-100"
            data-aeo="cost-turkey"
            data-question="How much does surgery cost in Turkey compared to the UK?"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block cost-summary">
              Surgery in Turkey typically costs 50–70% less than the UK. Hair transplants range from
              £1,500–£2,800 (vs £8,000–£15,000 UK). Dental implants cost £250–£400 per tooth (vs
              £800–£1,500 UK). Rhinoplasty runs £2,200–£3,500 (vs £5,000–£7,000 UK). Turkish
              all-inclusive packages often include accommodation, airport transfers, and post-op care
              — further increasing savings compared to UK procedure-only pricing.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">
              Worked Example: Full Mouth Dental Implants (All-on-4 Both Jaws)
            </h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50">
                    <th className="px-4 py-3 text-left font-semibold text-neutral-900">Cost Element</th>
                    <th className="px-4 py-3 text-left font-semibold text-teal-700">Turkey (All-Inclusive)</th>
                    <th className="px-4 py-3 text-left font-semibold text-neutral-700">UK</th>
                  </tr>
                </thead>
                <tbody>
                  {FULL_MOUTH_COST_COMPARISON.map((row, index) => (
                    <tr
                      key={row.item}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}
                    >
                      <td className="border-b border-neutral-100 px-4 py-3 text-neutral-900">
                        {row.item}
                      </td>
                      <td className="border-b border-neutral-100 px-4 py-3 font-medium text-teal-700">
                        {row.turkey}
                      </td>
                      <td className="border-b border-neutral-100 px-4 py-3 text-neutral-600">
                        {row.uk}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-teal-50 font-semibold">
                    <td className="px-4 py-3 text-neutral-900">TOTAL</td>
                    <td className="px-4 py-3 text-teal-700">£3,000–£4,000</td>
                    <td className="px-4 py-3 text-neutral-700">£15,000–£25,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-neutral-600">
              <strong className="text-green-600">Savings: £12,000–£21,000 (70–80%)</strong> — Turkish
              clinics offer all-inclusive packages that bundle everything. UK prices are
              procedure-only — you still pay for multiple appointments, scans, and follow-ups
              separately.
            </p>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION D: SAFETY & ACCREDITATION
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Is Turkey Safe for Medical Tourism?
          </h2>
          <p className="mt-2 text-neutral-600">
            Addressing the #1 concern with facts, not marketing
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2">
            {SAFETY_CHECKLIST.map((item, index) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.description}</p>
              </m.div>
            ))}
          </div>

          {/* Red Flags Warning */}
          <div className="mt-8 rounded-xl border-2 border-amber-200 bg-amber-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
              <div>
                <h3 className="font-semibold text-amber-900">Red Flags to Watch</h3>
                <ul className="mt-3 space-y-2">
                  {RED_FLAGS.map((flag) => (
                    <li key={flag} className="flex items-center gap-2 text-sm text-amber-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION E: TURKEY TEETH CONVERSATION
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
              Turkey Teeth: What You Need to Know
            </h2>

            <div className="mt-6 space-y-4 text-neutral-700">
              <div>
                <h3 className="font-semibold text-amber-900">The Issue</h3>
                <p className="mt-2 leading-relaxed">
                  "Turkey teeth" refers to full-mouth veneer packages where healthy teeth are filed
                  down excessively. Horror stories exist — and they're real. But they represent a
                  minority of cases, typically from unlicensed or undertrained practitioners,
                  ultra-budget clinics cutting corners, or patients choosing price over credentials.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-amber-900">The Reality</h3>
                <p className="mt-2 leading-relaxed">
                  Thousands of UK patients get excellent dental work in Turkey every year. Reputable
                  clinics use minimal-prep or no-prep techniques. E-max and high-quality porcelain
                  veneers rival any UK lab. The key is choosing the right clinic, not avoiding Turkey
                  entirely.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-amber-900">How to Avoid Problems</h3>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    <span>Insist on seeing the treatment plan BEFORE travel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    <span>Ask about preparation technique (minimal-prep preferred)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    <span>Request material certificates (E-max, branded products)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    <span>Choose clinics with UK aftercare partnerships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    <span>Read reviews on independent platforms (Trustpilot, Google)</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-white/50 p-4 mt-4">
                <p className="text-sm text-amber-800">
                  <strong>medit's Role:</strong> We only list clinics that meet our verification
                  standards. Every clinic on our platform has been checked for credentials, patient
                  outcomes, and aftercare protocols.
                </p>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION F: TOP CITIES
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Where to Get Treatment in Turkey
          </h2>
          <p className="mt-2 text-neutral-600">
            The main medical tourism hubs for UK patients
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2">
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
                  <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
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
                    <Plane className="h-4 w-4 text-teal-500" />
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
            What to Expect: Your Turkey Medical Tourism Journey
          </h2>
          <p className="mt-2 text-neutral-600">
            A step-by-step guide to demystify the process
          </p>

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
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">
                    {phase.step}
                  </div>
                  {index < PATIENT_JOURNEY.length - 1 && (
                    <div className="mt-2 h-full w-0.5 bg-teal-200" />
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
            Planning Your Trip: Practical Information
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
            title="Frequently Asked Questions About Medical Tourism in Turkey"
            className="faq-section"
          />
        </m.section>

        {/* =====================================================================
            SECTION J: CTA
            ===================================================================== */}
        <m.section {...fadeInUp}>
          <div className="rounded-2xl bg-gradient-to-r from-teal-600 to-teal-800 p-6 text-white sm:p-8 lg:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 w-16 overflow-hidden rounded-md shadow-xl border-2 border-white/20">
                <TR title="Turkey" />
              </div>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                Ready to Explore Treatment in Turkey?
              </h2>
              <p className="mt-3 text-teal-100 sm:mt-4 sm:text-lg">
                Use medit to compare verified clinics, see real prices, and read honest patient
                reviews. Our platform only lists accredited facilities with proven track records —
                no commission-inflated prices, no hidden fees.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
                <Link href="/search?destination=turkey">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Browse Verified Clinics in Turkey
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full text-white hover:bg-white/10 sm:w-auto"
                  >
                    Get Matched with the Right Clinic
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-teal-200">
                50+ JCI-accredited hospitals · Verified surgeon credentials · No booking fees
              </p>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            INTERNAL LINKS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mt-12 border-t border-neutral-200 pt-8">
          <p className="text-sm text-neutral-600">
            <strong>Procedures in Turkey:</strong>{' '}
            <Link href="/procedures/dental-implants/turkey" className="text-teal-600 hover:underline">
              Dental Implants
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/veneers/turkey" className="text-teal-600 hover:underline">
              Veneers
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/rhinoplasty/turkey" className="text-teal-600 hover:underline">
              Rhinoplasty
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/liposuction/turkey" className="text-teal-600 hover:underline">
              Liposuction
            </Link>{' '}
            ·{' '}
            <Link href="/procedures/tummy-tuck/turkey" className="text-teal-600 hover:underline">
              Tummy Tuck
            </Link>
          </p>
          <p className="mt-2 text-sm text-neutral-600">
            <strong>Related:</strong>{' '}
            <Link href="/dental" className="text-teal-600 hover:underline">
              Dental Work Abroad
            </Link>{' '}
            ·{' '}
            <Link href="/blog/dental-implants-abroad-cost-guide" className="text-teal-600 hover:underline">
              Cost Guide
            </Link>
          </p>
        </m.section>
      </div>
    </>
  )
}
