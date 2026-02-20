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
  Sparkles,
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
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

// =============================================================================
// COMPONENT
// =============================================================================

export function TurkeyDestinationClient({ faqs }: TurkeyDestinationClientProps) {
  return (
    <div className="bg-neutral-50">
      {/* =====================================================================
          HERO SECTION
          ===================================================================== */}
      <section className="relative overflow-hidden bg-[#0A1A2F] text-white pt-16 pb-20 sm:pt-24 sm:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/60 via-[#0A1A2F]/90 to-primary-950/90" />
        <m.div
          className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary-600/20 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <m.div
          className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-blue-600/10 blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <m.div
          className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-primary-400/10 blur-[100px]"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center"
          >
            <div className="mb-6 w-20 overflow-hidden rounded-2xl shadow-2xl shadow-primary-900/50 border border-white/10">
              <TR title="Turkey" />
            </div>
            <p className="text-sm font-bold tracking-[0.2em] text-primary-300/80 uppercase mb-4">Your Complete 2026 Guide</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Medical Tourism in <br />
              <span className="bg-gradient-to-r from-blue-200 via-primary-200 to-emerald-200 bg-clip-text text-transparent font-light">
                Turkey
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl lg:text-2xl leading-relaxed font-light">
              1.5 million international patients. 50 JCI-accredited hospitals. Savings of 50–70%
              on UK prices.
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/search?destination=turkey">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base shadow-xl shadow-white/10"
              >
                Browse Verified Clinics in Turkey
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
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="mt-16 sm:mt-24"
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-5 text-center"
                >
                  <p className="text-3xl font-bold tracking-tight sm:text-4xl text-white">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-widest text-primary-200/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* =====================================================================
            SECTION A: WHY TURKEY
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">The Reality</span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl leading-[1.1] tracking-tight">
                Why 1.5 Million Patients Choose Turkey Every Year
              </h2>
            </div>

            <div className="mt-8 lg:col-span-7 lg:mt-0">
              <div className="text-neutral-600">
                <p className="text-xl sm:text-2xl font-medium leading-relaxed text-neutral-900 tracking-tight">
                  Turkey has emerged as one of the world's premier medical tourism destinations, ranking
                  4th globally after the USA, Germany, and Thailand. For UK patients seeking quality
                  healthcare at affordable prices, Turkey offers a compelling combination of world-class
                  facilities, experienced surgeons, and significant cost savings.
                </p>

                <p className="mt-8 text-lg leading-relaxed font-light">
                  <strong className="font-semibold text-neutral-800">Global leadership in key specialties.</strong> Turkey is the undisputed world
                  leader in hair transplants, performing over 750,000 procedures annually. It ranks in
                  the top 5 globally for cosmetic surgery, with rhinoplasty, body contouring, and breast
                  procedures drawing patients from across Europe and the Middle East. Dental tourism is
                  equally robust — veneers, implants, and full-mouth restorations attract hundreds of
                  thousands of international patients each year.
                </p>

                <div className="my-10 border-l-[3px] border-primary-500 bg-gradient-to-r from-primary-50/80 to-transparent p-8 rounded-r-[2rem]">
                  <p className="text-lg italic leading-relaxed text-neutral-800 font-light">
                    <strong className="font-semibold">Strategic location and infrastructure.</strong> Just 3.5–4 hours from London,
                    Turkey is easily accessible with multiple daily flights. Istanbul Airport — one of the
                    world's busiest — handled over 80 million passengers in 2024. This connectivity, combined
                    with government-backed health tourism initiatives through USHAŞ (the state health tourism
                    agency), has created a sophisticated infrastructure for medical travellers.
                  </p>
                </div>

                <p className="text-lg leading-relaxed font-light">
                  <strong className="font-semibold text-neutral-800">Accreditation that rivals Western standards.</strong> With 50+ hospitals
                  holding Joint Commission International (JCI) accreditation — the gold standard in
                  healthcare quality — Turkey ranks second only to the USA. These facilities meet the
                  same rigorous standards as top American and European hospitals, using identical
                  equipment, medications, and protocols.
                </p>
              </div>

              <div
                className="mt-12 rounded-[2rem] overflow-hidden border border-neutral-100 bg-white hover:border-primary-100 transition-colors"
                data-aeo="safety-turkey"
                data-question="Is Turkey safe for medical tourism?"
              >
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      <Shield className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-neutral-900">Safety & Accreditation</h3>
                  </div>
                  <p className="text-neutral-600 leading-relaxed font-light ai-answer-block safety-summary">
                    Turkey is considered one of the safest medical tourism destinations globally. The
                    country has over 50 JCI-accredited hospitals — second only to the USA — ensuring
                    international quality standards. The Turkish Ministry of Health regulates all medical
                    tourism through USHAŞ, providing a 24/7 patient support line. Over 1.5 million
                    international patients received treatment in Turkey in 2024, generating $3 billion in
                    revenue. Safety depends on choosing accredited facilities with verified surgeon
                    credentials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION B: PROCEDURES AVAILABLE
            ===================================================================== */}
        <m.section {...fadeInUp} id="procedures" className="mb-24 scroll-mt-24 sm:mb-32">
          <div className="max-w-2xl">
            <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Treatments</span>
            <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
              Medical Procedures Available in Turkey
            </h2>
            <p className="mt-4 text-lg text-neutral-600 font-light">
              Compare Turkey prices with UK equivalents across popular procedures
            </p>
          </div>

          <div
            className="mt-8 rounded-[2rem] bg-gradient-to-br from-primary-50 to-primary-100/50 p-8 border border-primary-100"
            data-aeo="procedures-turkey"
            data-question="What medical procedures is Turkey known for?"
          >
            <p className="text-neutral-700 leading-relaxed ai-answer-block procedures-summary text-lg font-light">
              Turkey is the global leader in hair transplants, performing over 750,000 procedures
              annually. It ranks top 5 worldwide for cosmetic surgery, particularly rhinoplasty,
              liposuction, and breast procedures. Dental tourism is massive — veneers, implants, and
              full-mouth restorations attract hundreds of thousands of patients yearly. Turkey also
              excels in bariatric surgery (gastric sleeve), ophthalmology (LASIK), and IVF
              treatments. Istanbul is the primary hub, with Antalya popular for dental and
              recovery-focused trips.
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
                    <p className="mt-2 text-sm text-neutral-500 leading-relaxed font-light">{proc.procedures}</p>
                  </div>

                  <div className="relative z-10 mt-6 space-y-3 rounded-xl bg-neutral-50 p-4 border border-neutral-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-neutral-500">Turkey</span>
                      <span className="font-bold text-primary-700">{proc.turkeyPrice}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-t border-neutral-200/60 pt-3">
                      <span className="font-medium text-neutral-500">UK Price</span>
                      <span className="text-neutral-400 line-through">{proc.ukPrice}</span>
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
        </m.section>

        {/* =====================================================================
            SECTION C: COST COMPARISON DEEP DIVE
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="relative overflow-hidden rounded-[3rem] bg-neutral-900 p-8 sm:p-12 lg:p-16">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-transparent to-blue-600/10" />
            <div className="absolute -right-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary-500/5 blur-[120px]" />

            <div className="relative z-10 mb-10">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-400 uppercase">Investment</span>
              <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl tracking-tight leading-[1.1]">
                Turkey vs UK: Real Cost Comparisons
              </h2>
              <p className="mt-4 text-lg text-neutral-400 font-light">
                Understanding TRUE costs including all fees, accommodation, and travel
              </p>
            </div>

            <div
              className="relative z-10 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 mb-10"
              data-aeo="cost-turkey"
              data-question="How much does surgery cost in Turkey compared to the UK?"
            >
              <p className="text-neutral-300 leading-relaxed ai-answer-block cost-summary text-lg font-light">
                Surgery in Turkey typically costs 50–70% less than the UK. Hair transplants range from
                £1,500–£2,800 (vs £8,000–£15,000 UK). Dental implants cost £250–£400 per tooth (vs
                £800–£1,500 UK). Rhinoplasty runs £2,200–£3,500 (vs £5,000–£7,000 UK). Turkish
                all-inclusive packages often include accommodation, airport transfers, and post-op care
                — further increasing savings compared to UK procedure-only pricing.
              </p>
            </div>

            <div className="relative z-10 rounded-3xl bg-white p-8 sm:p-10">
              <h3 className="text-xl font-bold text-neutral-900">
                Worked Example: Full Mouth Dental Implants (All-on-4 Both Jaws)
              </h3>
              <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-100">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-neutral-100 bg-neutral-50/80">
                        <th className="px-6 py-4 text-sm font-semibold text-neutral-900">Cost Element</th>
                        <th className="px-6 py-4 text-sm font-semibold text-primary-700">Turkey (All-Inclusive)</th>
                        <th className="px-6 py-4 text-sm font-semibold text-neutral-500">UK</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {FULL_MOUTH_COST_COMPARISON.map((row) => (
                        <tr key={row.item} className="transition-colors hover:bg-neutral-50/50">
                          <td className="px-6 py-4 text-sm font-medium text-neutral-900">{row.item}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-primary-700">{row.turkey}</td>
                          <td className="px-6 py-4 text-sm text-neutral-500">{row.uk}</td>
                        </tr>
                      ))}
                      <tr className="bg-primary-50/50">
                        <td className="px-6 py-4 font-bold text-neutral-900">TOTAL</td>
                        <td className="px-6 py-4 text-lg font-bold text-primary-700">£3,000–£4,000</td>
                        <td className="px-6 py-4 text-lg font-bold text-neutral-600">£15,000–£25,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-5 py-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <p className="text-sm font-semibold text-green-800">
                  Savings: £12,000–£21,000 (70–80%) — Turkish clinics offer all-inclusive packages that bundle everything.
                </p>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION D: SAFETY & ACCREDITATION
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Trust & Safety</span>
            <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
              Is Turkey Safe for Medical Tourism?
            </h2>
            <p className="mt-6 text-lg text-neutral-600 font-light">
              Addressing the #1 concern with facts, not marketing
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SAFETY_CHECKLIST.map((item, index) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100/50 text-primary-600">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-4 text-base text-neutral-600 leading-relaxed font-light">{item.description}</p>
              </m.div>
            ))}
          </div>

          <div className="mt-12 rounded-[2rem] border border-rose-200/60 bg-gradient-to-br from-rose-50/50 to-white p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-rose-100/50 blur-3xl pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-rose-900 tracking-tight">Red Flags to Watch For</h3>
                <p className="mt-2 text-rose-700/80 font-light">
                  If you encounter any of these, proceed with extreme caution or look elsewhere.
                </p>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {RED_FLAGS.map((flag, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 rounded-xl bg-white/60 p-4 border border-rose-100"
                    >
                      <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 font-bold text-xs">
                        !
                      </span>
                      <span className="text-sm font-medium text-rose-900 leading-relaxed">{flag}</span>
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
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="rounded-[2rem] bg-white border border-neutral-100 p-8 sm:p-12 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-2xl bg-primary-50 flex items-center justify-center border border-primary-100">
                  <SmilePlus className="h-7 w-7 text-primary-600" />
                </div>
                <div>
                  <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Important</span>
                  <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">
                    Turkey Teeth: What You Need to Know
                  </h2>
                </div>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">The Issue</h3>
                    <p className="mt-3 text-lg text-neutral-600 leading-relaxed font-light">
                      "Turkey teeth" refers to full-mouth veneer packages where healthy teeth are filed
                      down excessively. Horror stories exist — and they're real. But they represent a
                      minority of cases, typically from unlicensed or undertrained practitioners,
                      ultra-budget clinics cutting corners, or patients choosing price over credentials.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">The Reality</h3>
                    <p className="mt-3 text-lg text-neutral-600 leading-relaxed font-light">
                      Thousands of UK patients get excellent dental work in Turkey every year. Reputable
                      clinics use minimal-prep or no-prep techniques. E-max and high-quality porcelain
                      veneers rival any UK lab. The key is choosing the right clinic, not avoiding Turkey
                      entirely.
                    </p>
                  </div>
                </div>

                <div className="rounded-[2rem] bg-neutral-50 p-8 border border-neutral-100">
                  <h3 className="text-xl font-bold text-neutral-900 mb-6">How to Avoid Problems</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-neutral-700 font-light">Insist on seeing the treatment plan BEFORE travel</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-neutral-700 font-light">Ask about preparation technique (minimal-prep preferred)</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-neutral-700 font-light">Request material certificates (E-max, branded products)</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-neutral-700 font-light">Choose clinics with UK aftercare partnerships</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-neutral-700 font-light">Read reviews on independent platforms (Trustpilot, Google)</span>
                    </li>
                  </ul>

                  <div className="mt-8 rounded-xl bg-primary-50/80 border border-primary-100 p-4 flex gap-3 items-start">
                    <Shield className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-primary-900 leading-relaxed font-light">
                      <strong className="font-semibold">MeetYourClinic's Role:</strong> We only list clinics that meet our verification
                      standards. Every clinic on our platform has been checked for credentials, patient
                      outcomes, and aftercare protocols.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION F: TOP CITIES
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="max-w-2xl text-center mx-auto mb-12">
            <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Destinations</span>
            <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
              Where to Get Treatment in Turkey
            </h2>
            <p className="mt-4 text-lg text-neutral-600 font-light">
              The main medical tourism hubs for UK patients
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {CITIES.map((city, index) => (
              <m.div
                key={city.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <h3 className="text-3xl font-bold text-neutral-900 tracking-tight">{city.name}</h3>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50/50 px-4 py-2 text-sm font-semibold text-primary-800">
                      <Plane className="h-4 w-4 text-primary-600" />
                      {city.flight}
                    </div>
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest px-2">
                      {city.highlight}
                    </span>
                  </div>
                </div>

                <div className="mt-6 border-t border-neutral-100 pt-6">
                  <p className="text-base text-neutral-600 leading-relaxed font-light">{city.description}</p>
                </div>

                <div className="mt-6 rounded-xl bg-neutral-50 p-5 border border-neutral-100 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Best for</p>
                    <p className="mt-1 text-neutral-800 font-medium leading-relaxed">{city.bestFor}</p>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION G: PATIENT JOURNEY
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Process</span>
            <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
              What to Expect: Your Turkey Medical Tourism Journey
            </h2>
            <p className="mt-4 text-lg text-neutral-600 font-light">
              A step-by-step guide to demystify the process
            </p>
          </div>

          <div className="mx-auto max-w-4xl relative">
            <div className="absolute left-8 top-8 bottom-8 w-px bg-neutral-200 hidden sm:block" />
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
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-lg font-bold text-white shadow-lg shadow-primary-500/30 border-4 border-white">
                      {phase.step}
                    </div>
                    <span className="rounded-full bg-primary-50 text-primary-700 px-3 py-1 text-sm font-semibold border border-primary-100">
                      {phase.timing}
                    </span>
                  </div>

                  <div className="hidden sm:flex flex-col items-center z-10">
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-xl font-bold text-white shadow-lg shadow-primary-500/30 border-4 border-white">
                      {phase.step}
                    </div>
                  </div>

                  <div className="flex-1 rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                    <div className="hidden sm:flex items-center gap-4 mb-4">
                      <h3 className="text-xl font-bold text-neutral-900">{phase.title}</h3>
                      <span className="rounded-full bg-primary-50 text-primary-700 px-3 py-1 text-sm font-semibold border border-primary-100">
                        {phase.timing}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-4 sm:hidden">{phase.title}</h3>

                    <ul className="space-y-3">
                      {phase.tasks.map((task) => (
                        <li key={task} className="flex items-start gap-3 text-base text-neutral-600 font-light">
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

        {/* =====================================================================
            SECTION H: PRACTICAL INFORMATION
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Logistics</span>
            <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
              Planning Your Trip: Practical Information
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
                className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
              >
                <h3 className="text-xl font-bold text-neutral-900">{info.title}</h3>
                <p className="mt-4 text-base text-neutral-600 leading-relaxed font-light">{info.content}</p>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* =====================================================================
            SECTION I: FAQ
            ===================================================================== */}
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-10">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Common Questions</span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-xl p-8 sm:p-10">
              <FAQSection
                faqs={faqs}
                title="Frequently Asked Questions About Medical Tourism in Turkey"
                className="faq-section"
              />
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            SECTION J: CTA
            ===================================================================== */}
        <m.section {...fadeInUp} className="pb-12">
          <div className="relative overflow-hidden rounded-[3rem] bg-[#0A1A2F] p-8 text-white sm:p-12 lg:p-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-blue-600/20" />
            <m.div
              className="absolute -left-1/4 -top-1/4 h-full w-full rounded-full bg-primary-500/10 blur-[120px]"
              animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <m.div
              className="absolute -bottom-1/4 -right-1/4 h-full w-full rounded-full bg-blue-500/10 blur-[120px]"
              animate={{ scale: [1.15, 1, 1.15], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative z-10 mx-auto max-w-3xl">
              <div className="mx-auto mb-8 w-20 overflow-hidden rounded-2xl shadow-2xl border-2 border-white/20">
                <TR title="Turkey" />
              </div>
              <span className="text-sm font-bold tracking-[0.2em] text-primary-200/80 uppercase mb-4 block">
                Take the next step
              </span>
              <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl tracking-tight">
                Ready to Explore Treatment in{' '}
                <span className="bg-gradient-to-r from-blue-200 via-primary-200 to-emerald-200 bg-clip-text text-transparent">
                  Turkey
                </span>
                ?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl font-light leading-relaxed">
                Use MeetYourClinic to compare verified clinics, see real prices, and read honest patient
                reviews. Our platform only lists accredited facilities with proven track records —
                no commission-inflated prices, no hidden fees.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/search?destination=turkey">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base shadow-xl shadow-white/10"
                  >
                    Browse Verified Clinics in Turkey
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base backdrop-blur-md"
                  >
                    Get Matched with the Right Clinic
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 flex-wrap text-sm text-primary-200/80 font-medium">
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> 50+ JCI-accredited hospitals
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> Verified surgeon credentials
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> No booking fees
                </span>
              </div>
            </div>
          </div>
        </m.section>

        {/* =====================================================================
            INTERNAL LINKS
            ===================================================================== */}
        <m.section {...fadeInUp} className="mt-12 border-t border-neutral-200 pt-10 pb-4">
          <div className="text-center">
            <p className="text-sm font-bold tracking-[0.2em] text-neutral-400 uppercase mb-4">Related Guides:</p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
              <Link href="/procedures/dental-implants/turkey" className="text-primary-600 hover:text-primary-800 hover:underline transition-colors">
                Dental Implants
              </Link>
              <span className="text-neutral-300">·</span>
              <Link href="/procedures/veneers/turkey" className="text-primary-600 hover:text-primary-800 hover:underline transition-colors">
                Veneers
              </Link>
              <span className="text-neutral-300">·</span>
              <Link href="/procedures/rhinoplasty/turkey" className="text-primary-600 hover:text-primary-800 hover:underline transition-colors">
                Rhinoplasty
              </Link>
              <span className="text-neutral-300">·</span>
              <Link href="/procedures/liposuction/turkey" className="text-primary-600 hover:text-primary-800 hover:underline transition-colors">
                Liposuction
              </Link>
              <span className="text-neutral-300">·</span>
              <Link href="/procedures/tummy-tuck/turkey" className="text-primary-600 hover:text-primary-800 hover:underline transition-colors">
                Tummy Tuck
              </Link>
              <span className="text-neutral-300">·</span>
              <Link href="/dental" className="text-primary-600 hover:text-primary-800 hover:underline transition-colors">
                Dental Work Abroad
              </Link>
              <span className="text-neutral-300">·</span>
              <Link href="/blog/dental-implants-abroad-cost-guide" className="text-primary-600 hover:text-primary-800 hover:underline transition-colors">
                Cost Guide
              </Link>
            </div>
          </div>
        </m.section>
      </div>
    </div>
  )
}
