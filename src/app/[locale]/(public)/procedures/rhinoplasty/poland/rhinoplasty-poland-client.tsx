'use client'

import { m } from 'framer-motion'
import Link from 'next/link'
import { PL, GB } from 'country-flag-icons/react/3x2'
import {
  CheckCircle,
  Star,
  MapPin,
  ArrowRight,
  Shield,
  Zap,
  Clock,
  Activity,
  Heart,
  Sparkles,
  Award,
  Plane,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FAQSection } from '@/components/seo/faq-section'

// =============================================================================
// TYPES
// =============================================================================

interface FAQ {
  question: string
  answer: string
}

interface RhinoplastyPolandClientProps {
  faqs: FAQ[]
}

// =============================================================================
// STATIC DATA
// =============================================================================

const HERO_STATS = [
  { value: '£2,900–£4,500', label: 'Primary rhinoplasty' },
  { value: '700,000+', label: 'Medical tourists in 2024' },
  { value: 'EU', label: 'Healthcare standards' },
]

const KEY_ADVANTAGES = [
  { icon: Shield, title: 'EU Standards', description: 'European healthcare regulations and consumer protections' },
  { icon: Award, title: 'Central European Training', description: 'Many surgeons trained in Germany, Austria, UK' },
  { icon: Plane, title: 'Short Travel Distance', description: '2-hour flights from London to Warsaw or Kraków' },
  { icon: Sparkles, title: '40–60% Savings', description: 'Quality care at accessible prices' },
]

const PRICE_COMPARISON = [
  { procedure: 'Primary Rhinoplasty', poland: '£2,900–£4,500', uk: '£6,500–£9,500', savings: '£3,600–£5,000' },
  { procedure: 'Revision Rhinoplasty', poland: '£3,800–£5,500', uk: '£10,000–£16,000', savings: '£6,200–£10,500' },
  { procedure: 'Piezo/Ultrasonic Rhinoplasty', poland: '£3,500–£5,000', uk: '£8,000–£12,000', savings: '£4,500–£7,000' },
  { procedure: 'Septorhinoplasty', poland: '£3,200–£4,800', uk: '£8,000–£11,000', savings: '£4,800–£6,200' },
  { procedure: 'Rhinoplasty + Chin Augmentation', poland: '£4,200–£6,000', uk: '£9,000–£14,000', savings: '£4,800–£8,000' },
]

const PACKAGE_INCLUSIONS = [
  { title: 'Pre-operative Consultation', description: 'Virtual + in-person consultation with surgeon' },
  { title: 'Medical Testing', description: 'Blood tests, ECG, pre-operative assessments' },
  { title: 'Surgery', description: 'Surgeon fee, anaesthesiologist, operating theatre' },
  { title: 'Hospital Stay', description: '1 night with nursing care' },
  { title: 'Post-op Care', description: 'Medications, nasal splint, dressings' },
  { title: 'Follow-up', description: 'In-clinic appointments + splint removal' },
  { title: 'Aftercare', description: 'Telemedicine follow-ups for 12 months' },
  { title: 'Coordinator', description: 'English-speaking patient coordinator' },
  { title: 'Fit-to-Fly', description: 'Clearance consultation before departure' },
]

const NOT_INCLUDED = [
  { item: 'Return flights (UK to Warsaw/Kraków)', cost: '£60–£200' },
  { item: 'Accommodation (7-10 nights)', cost: '£350–£700' },
  { item: 'Travel insurance (with medical cover)', cost: '£30–£60' },
  { item: 'Airport transfers (if not included)', cost: '£40–£80' },
]

const REGIONS = [
  {
    name: 'Warsaw',
    highlight: false,
    tagline: 'Medical Hub • Largest Surgeon Selection',
    description:
      "Poland's capital offers the highest concentration of plastic surgeons and university hospital affiliations. Multiple daily flights from London, Manchester, and Edinburgh.",
    advantages: [
      'Widest selection of surgeons',
      'University hospital access',
      'Best flight connectivity',
      'Modern medical infrastructure',
    ],
    clinicsLabel: 'Notable Clinics:',
    clinics: 'Warsaw Aesthetic, Artplastica, Carolina Medical Center',
  },
  {
    name: 'Kraków',
    highlight: false,
    tagline: 'Historic Charm • Slightly Lower Costs',
    description:
      "Poland's cultural capital combines excellent medical care with historic charm. Direct flights from several UK airports. Slightly lower costs than Warsaw.",
    advantages: [
      'Beautiful recovery environment',
      '5–10% lower prices than Warsaw',
      'UNESCO Old Town for gentle walks',
      'Strong medical university tradition',
    ],
    clinicsLabel: 'Notable Clinics:',
    clinics: 'KCM Clinic (nearby), Galen Clinic, Medistica',
  },
  {
    name: 'Jelenia Góra (KCM Clinic)',
    highlight: true,
    tagline: 'Mountain Recovery • Purpose-Built Medical Tourism',
    description:
      "KCM Clinic is Poland's premier medical tourism facility, purpose-built for international patients. Located in the Karkonosze Mountains, it offers a unique recovery environment combining medical excellence with mountain air.",
    advantages: [
      'All-inclusive packages with accommodation',
      'English-speaking staff throughout',
      'Peaceful mountain recovery setting',
      'Dedicated international patient experience',
      'On-site recovery apartments',
    ],
    clinicsLabel: 'Access:',
    clinics: '3 hours from Berlin (Schönefeld), 2 hours from Wrocław airport. Transfers included in packages.',
  },
  {
    name: 'Wrocław',
    highlight: false,
    tagline: 'University City • Growing Hub',
    description:
      'A vibrant university city with excellent medical facilities and direct flights from London. Gateway to KCM Clinic in Jelenia Góra.',
    advantages: [
      'Direct Ryanair flights from UK',
      'Strong university medical tradition',
      'Gateway to Jelenia Góra/KCM',
      'Pleasant riverside recovery setting',
    ],
    clinicsLabel: 'Notable Clinics:',
    clinics: 'Wrocław Medical, Estevien Clinic',
  },
]

const RECOMMENDATIONS = [
  { label: 'Maximum Choice', description: 'Warsaw — most surgeons, best connectivity' },
  { label: 'All-Inclusive Experience', description: 'Jelenia Góra (KCM) — purpose-built, peaceful' },
  { label: 'Value + Culture', description: 'Kraków — slightly lower costs, historic setting' },
]

const PIEZO_COMPARISON = [
  { aspect: 'Bruising duration', traditional: '14–21 days', piezo: '7–10 days' },
  { aspect: 'Swelling peak', traditional: 'Day 10–12', piezo: 'Day 5' },
  { aspect: 'Return to social activities', traditional: '2–3 weeks', piezo: '10–14 days' },
  { aspect: 'Precision', traditional: 'Good', piezo: 'Excellent' },
]

const RHINOPLASTY_TYPES = [
  {
    name: 'Revision Rhinoplasty',
    price: '£3,800–£5,500',
    points: [
      'Corrects unsatisfactory results from previous surgery',
      'More complex due to scar tissue, altered anatomy',
      'Polish surgeons trained in revision techniques',
      'Wait minimum 12 months after initial surgery',
    ],
  },
  {
    name: 'Septorhinoplasty',
    price: '£3,200–£4,800',
    points: [
      'Combines cosmetic reshaping with septal correction',
      'Addresses breathing difficulties + aesthetics',
      'Dual-trained ENT/plastic surgeons available',
      'Popular choice for functional improvement',
    ],
  },
  {
    name: 'Preservation Rhinoplasty',
    price: '£3,500–£5,000',
    points: [
      'Modern technique preserving natural structures',
      'More natural movement and appearance',
      'Growing availability at top Polish clinics',
      'Suits patients wanting subtle refinement',
    ],
  },
  {
    name: 'Rhinoplasty + Chin Augmentation',
    price: '£4,200–£6,000',
    points: [
      'Facial harmony through profile balancing',
      'Single anaesthesia, combined recovery',
      'Popular combination in Poland',
      'Discuss suitability in consultation',
    ],
  },
]

const CREDENTIALS = [
  { label: 'PTChPRiE', description: 'Polish Society of Plastic, Reconstructive and Aesthetic Surgery (Primary Polish board)' },
  { label: 'EBOPRAS', description: 'European Board of Plastic, Reconstructive and Aesthetic Surgery' },
  { label: 'ISAPS', description: 'International Society of Aesthetic Plastic Surgery (global recognition)' },
  { label: 'Polish Medical Chamber Registration', description: 'Legal requirement to practice' },
]

const SURGEONS = [
  {
    name: 'Dr. Grzegorz Kierzynka',
    price: 'From £3,500',
    featured: true,
    details: [
      { label: 'Experience', value: '1,100+ rhinoplasties, sub-5% revision rate' },
      { label: 'Specialisation', value: 'Primary and revision rhinoplasty, piezo technique' },
      { label: 'Credentials', value: 'PTChPRiE member, trained in Germany' },
      { label: 'Facility', value: 'KCM Clinic, Jelenia Góra' },
      { label: 'Notable', value: "Lead rhinoplasty surgeon at Poland's premier medical tourism facility" },
    ],
    note: 'Philosophy: Meticulous technique, natural results, thorough pre-operative planning',
  },
  {
    name: 'Dr. Michał Charytonowicz',
    price: 'From £3,200',
    featured: false,
    details: [
      { label: 'Experience', value: '15+ years, 800+ rhinoplasties' },
      { label: 'Specialisation', value: 'Preservation rhinoplasty, closed technique' },
      { label: 'Credentials', value: 'PTChPRiE, European Rhinoplasty Society' },
      { label: 'Facility', value: 'Warsaw Aesthetic Clinic' },
      { label: 'Notable', value: 'Known for natural, subtle results' },
    ],
    note: 'Reviews: Highly rated for communication and results',
  },
  {
    name: 'Dr. Marta Wilczyńska',
    price: 'From £2,900',
    featured: false,
    details: [
      { label: 'Experience', value: '12+ years, 600+ rhinoplasties' },
      { label: 'Specialisation', value: 'Female rhinoplasty, ethnic rhinoplasty' },
      { label: 'Credentials', value: 'PTChPRiE, trained in Austria' },
      { label: 'Facility', value: 'Artplastica, Warsaw' },
      { label: 'Notable', value: 'Specialises in feminine aesthetic goals' },
    ],
    note: 'Popular with UK female patients seeking refined results',
  },
  {
    name: 'Dr. Tomasz Sirek',
    price: 'From £3,400',
    featured: false,
    details: [
      { label: 'Experience', value: '20+ years, 1,000+ procedures' },
      { label: 'Specialisation', value: 'Septorhinoplasty, functional correction' },
      { label: 'Credentials', value: 'PTChPRiE, ENT + Plastic Surgery dual qualification' },
      { label: 'Facility', value: 'Carolina Medical Center, Warsaw' },
    ],
    note: 'Ideal for patients with breathing concerns + aesthetic goals',
  },
  {
    name: 'Dr. Adam Kołodziej',
    price: 'From £3,000',
    featured: false,
    details: [
      { label: 'Experience', value: '18+ years, 700+ rhinoplasties' },
      { label: 'Specialisation', value: 'Revision rhinoplasty, open technique' },
      { label: 'Credentials', value: 'PTChPRiE, EBOPRAS' },
      { label: 'Facility', value: 'Medistica, Kraków' },
    ],
    note: 'Revision specialist accepting cases from other clinics',
  },
]

const PRE_TRIP_PHASES = [
  {
    title: 'Week 1–2: Research & Shortlist',
    steps: ['Review surgeon portfolios and credentials', 'Request consultations from 2–4 clinics', 'Compare packages and pricing'],
  },
  {
    title: 'Week 2–3: Virtual Consultations',
    steps: ['Video calls with surgeons', 'Discuss goals, share photos', 'Receive detailed quotes'],
  },
  {
    title: 'Week 3–4: Decision & Booking',
    steps: ['Select surgeon and clinic', 'Pay deposit (typically 10–20%)', 'Book flights and arrange accommodation'],
  },
  {
    title: 'Week 4–8: Preparation',
    steps: [
      'Complete medical questionnaire',
      'Stop smoking (minimum 2 weeks before)',
      'Stop blood-thinning medications (1 week before)',
      'Arrange time off work (10–14 days)',
    ],
  },
]

const TRIP_DAYS = [
  { day: 'Day 1', description: 'Arrive in Poland. Transfer to accommodation. Rest and acclimatise.', highlight: false },
  { day: 'Day 2', description: 'Transfer to clinic. In-person consultation. Blood tests, pre-op checks. Final surgical plan confirmation.', highlight: false },
  { day: 'Day 3', description: 'Surgery Day. 1.5–3 hours under general anaesthesia. Recovery in private room. Overnight stay with nursing care.', highlight: true },
  { day: 'Day 4–6', description: 'Recovery at accommodation. Minimal activity, head elevated. Gentle walks if staying at KCM (mountain air).', highlight: false },
  { day: 'Day 7–10', description: 'Splint removal. Surgeon review and clearance to fly. Final instructions. Return home.', highlight: true },
]

const POST_TRIP_RECOVERY = [
  { period: 'Week 2–3', description: 'Most bruising fades. Resume light activities. Work from home possible. First telemedicine follow-up.' },
  { period: 'Week 4–6', description: 'Return to normal activities. Most swelling resolved. Can resume exercise (avoid contact sports).' },
  { period: 'Month 2–3', description: 'Second telemedicine follow-up. 80–90% swelling resolved. Results becoming apparent.' },
  { period: 'Month 6–12', description: 'Final results emerging. Residual swelling fully resolved. Nose "settles" into final shape.' },
]

const RECOVERY_AVOIDANCE = [
  { duration: '4 Weeks', activity: 'Blowing nose' },
  { duration: '3 Weeks', activity: 'Strenuous exercise' },
  { duration: '4–6 Months', activity: 'Wearing glasses on nose' },
  { duration: '3 Months', activity: 'Sun exposure (use SPF 50+)' },
  { duration: '6 Months', activity: 'Sleeping face-down' },
  { duration: '6 Months', activity: 'Contact sports' },
]

const MINIMIZE_RISK_ITEMS = [
  'Choose ISO-certified facilities',
  'Select PTChPRiE-certified surgeons',
  'Follow all pre-operative instructions',
  'Disclose complete medical history',
  'Adhere to post-operative care',
  'Attend all follow-up appointments',
  'Have realistic expectations',
  'Confirm revision policy in writing',
]

const CROSS_LINKS = [
  { href: '/procedures/rhinoplasty', title: 'Rhinoplasty Hub', description: 'Compare all rhinoplasty destinations and techniques' },
  { href: '/procedures/rhinoplasty/turkey', title: 'Rhinoplasty in Turkey', description: 'Maximum savings, highest volume destination' },
  { href: '/procedures/rhinoplasty/spain', title: 'Rhinoplasty in Spain', description: 'Premium European care, technique innovation' },
  { href: '/procedures/rhinoplasty/hungary', title: 'Rhinoplasty in Hungary', description: 'EU-standard care at accessible prices' },
  { href: '/destinations/poland', title: 'Poland Destination Guide', description: 'Everything about medical tourism in Poland' },
  { href: '/cosmetic-surgery', title: 'All Cosmetic Surgery', description: 'Browse all cosmetic procedures abroad' },
]

const FACILITY_STANDARDS = [
  { icon: Award, title: 'ISO 9001 Certification', description: 'Quality management standard. Many Polish private clinics hold ISO certification.' },
  { icon: Shield, title: 'NFZ Accreditation', description: 'Polish National Health Fund accreditation indicates compliance with national standards.' },
  { icon: Star, title: 'EU Healthcare Directive', description: 'All Polish facilities must comply with EU healthcare regulations.' },
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
// MAIN COMPONENT
// =============================================================================

export function RhinoplastyPolandClient({ faqs }: RhinoplastyPolandClientProps) {
  return (
    <div className="bg-neutral-50">

        {/* =================================================================
            HERO SECTION
            ================================================================= */}
        <section className="relative overflow-hidden bg-[#0A1A2F] text-white pt-20 pb-24 sm:pt-32 sm:pb-40">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A2F] via-[#0A1A2F]/95 to-primary-900/50" />

          <m.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary-600/20 blur-[120px]"
          />
          <m.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -70, 0],
              y: [0, -40, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-blue-600/10 blur-[120px]"
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <m.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="h-px w-12 bg-primary-400" />
                <span className="text-primary-200 text-sm font-bold tracking-[0.3em] uppercase">
                  Premium Cosmetic Surgery
                </span>
              </m.div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 overflow-hidden rounded-lg shadow-lg">
                  <PL title="Poland" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-[1.1]">
                  Rhinoplasty in{' '}
                  <span className="bg-gradient-to-r from-white via-primary-100 to-white/80 bg-clip-text text-transparent">
                    Poland
                  </span>
                </h1>
              </div>

              <p className="text-lg text-neutral-300 sm:text-xl lg:text-2xl leading-relaxed font-light mb-10 max-w-3xl">
                Poland welcomed 700,000+ medical tourists in 2024. Compare
                EU-trained surgeons, ISO-accredited clinics, and comprehensive
                packages from £2,900. Save 40–60% vs UK prices with European
                healthcare standards and consumer protections.
              </p>

              <div className="flex flex-col gap-5 sm:flex-row">
                <Link href="/clinics?procedure=rhinoplasty&country=poland">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-primary-600 text-white hover:bg-primary-500 hover:scale-105 transition-all duration-300 rounded-full px-10 py-7 text-lg font-medium shadow-xl shadow-primary-900/20"
                  >
                    Compare Verified Rhinoplasty Surgeons
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#pricing">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-full px-10 py-7 text-lg font-medium backdrop-blur-md transition-all duration-300"
                  >
                    View 2026 Prices
                  </Button>
                </Link>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-20 sm:mt-28 grid grid-cols-1 gap-6 sm:grid-cols-3 border-t border-white/10 pt-12"
            >
              {HERO_STATS.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8 text-center"
                >
                  <p className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</p>
                  <p className="mt-2 text-sm font-medium tracking-widest uppercase text-neutral-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </m.div>

            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-center text-sm text-neutral-500"
            >
              EU healthcare standards • ISO-accredited clinics • 40–60% savings
              vs UK • Free consultation matching
            </m.p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

          {/* =================================================================
              WHY POLAND SECTION
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-32">
            <div className="grid gap-16 lg:grid-cols-12 items-start">
              <div className="lg:col-span-5">
                <div className="sticky top-32">
                  <m.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '80px' }}
                    viewport={{ once: true }}
                    className="h-1.5 bg-primary-600 rounded-full mb-8"
                  />
                  <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                    Why UK Patients Choose Poland for Rhinoplasty
                  </h2>
                  <p className="mt-8 text-lg text-neutral-600 font-light leading-relaxed">
                    Poland has emerged as a compelling choice for UK patients
                    seeking quality rhinoplasty at accessible prices. As an EU
                    member since 2004, Poland offers European healthcare standards,
                    EU-recognised medical qualifications, and consumer protection
                    laws — all within a 2-hour flight from London.
                  </p>

                  <div className="mt-10 p-8 rounded-[2rem] bg-neutral-50 border border-neutral-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-primary-100/50 blur-2xl group-hover:scale-150 transition-transform duration-500" />
                    <Shield className="h-10 w-10 text-primary-600 mb-6 relative z-10" />
                    <h3 className="text-xl font-bold text-neutral-900 mb-4 relative z-10">EU Healthcare Standards</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed relative z-10">
                      Poland welcomed over 700,000 medical tourists in 2024, with
                      cosmetic surgery representing a growing segment. The Polish
                      Society of Plastic, Reconstructive and Aesthetic Surgery
                      (PTChPRiE) maintains rigorous standards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-12" data-aeo="rhinoplasty-poland-benefits">
                {[
                  {
                    title: 'Central European Precision',
                    content:
                      'Polish surgeons bring Central European precision to rhinoplasty. Many trained in Germany, Austria, or the UK before returning to practice in Poland. This combination of rigorous training and lower operating costs creates genuine value — not compromised quality at cheap prices.',
                  },
                  {
                    title: 'Mature Medical Tourism Infrastructure',
                    content:
                      "The country's medical tourism infrastructure has matured significantly. Purpose-built facilities like KCM Clinic in Jelenia Góra offer international patients a seamless experience with English-speaking staff, dedicated recovery accommodation, and comprehensive packages.",
                  },
                  {
                    title: 'Rigorous Standards & Accreditations',
                    content:
                      'Poland welcomed over 700,000 medical tourists in 2024, with cosmetic surgery representing a growing segment. The Polish Society of Plastic, Reconstructive and Aesthetic Surgery (PTChPRiE) maintains rigorous standards, and private clinics often exceed these with ISO certifications and international accreditations.',
                  },
                ].map((item, i) => (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-lg text-neutral-600 font-light leading-relaxed">
                      {item.content}
                    </p>
                    <div className="mt-8 h-px w-full bg-neutral-100 group-last:hidden" />
                  </m.div>
                ))}
              </div>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {KEY_ADVANTAGES.map((adv, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
                >
                  <adv.icon className="h-8 w-8 text-primary-600 mb-4" />
                  <p className="font-bold text-neutral-900">{adv.title}</p>
                  <p className="mt-2 text-sm text-neutral-600 font-light">{adv.description}</p>
                </m.div>
              ))}
            </div>
          </m.section>

          {/* =================================================================
              PRICING SECTION
              ================================================================= */}
          <m.section {...fadeInUp} id="pricing" className="mb-32 scroll-mt-20">
            <div className="bg-neutral-900 rounded-[3rem] p-8 sm:p-16 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-600/10 blur-[120px]" />

              <div className="relative z-10">
                <div className="max-w-2xl mb-16">
                  <span className="text-sm font-bold tracking-[0.2em] text-primary-400 uppercase mb-4 block">
                    2026 Price Guide
                  </span>
                  <h2 className="text-4xl font-bold text-white tracking-tight sm:text-5xl mb-6">
                    Rhinoplasty Cost in Poland vs UK
                  </h2>
                  <p className="text-lg text-neutral-400 font-light">
                    Transparent pricing comparison. Save 40–60% compared to UK private clinics.
                  </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                  <div className="lg:col-span-8 space-y-8" data-aeo="rhinoplasty-poland-cost">
                    <div className="bg-white rounded-3xl p-2 shadow-2xl">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="text-left">
                              <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">
                                Procedure Type
                              </th>
                              <th className="p-6 text-sm font-bold text-primary-600 uppercase tracking-widest">
                                <div className="flex items-center gap-2">
                                  <div className="w-5 overflow-hidden rounded-sm">
                                    <PL title="Poland" />
                                  </div>
                                  Poland
                                </div>
                              </th>
                              <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">
                                <div className="flex items-center gap-2">
                                  <div className="w-5 overflow-hidden rounded-sm">
                                    <GB title="UK" />
                                  </div>
                                  UK (Surgery Only)
                                </div>
                              </th>
                              <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">
                                Your Savings
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100">
                            {PRICE_COMPARISON.map((row, i) => (
                              <tr key={i} className="group hover:bg-neutral-50 transition-colors">
                                <td className="p-6 font-bold text-neutral-900">{row.procedure}</td>
                                <td className="p-6 text-primary-600 font-bold">{row.poland}</td>
                                <td className="p-6 text-neutral-500 line-through decoration-neutral-300">
                                  {row.uk}
                                </td>
                                <td className="p-6">
                                  <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-bold text-green-700">
                                    {row.savings}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl p-2 shadow-2xl">
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-neutral-900 mb-4">
                          Additional Costs to Budget
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="text-left">
                                <th className="pb-4 text-sm font-bold text-neutral-400 uppercase tracking-widest">
                                  Item
                                </th>
                                <th className="pb-4 text-sm font-bold text-neutral-400 uppercase tracking-widest text-right">
                                  Estimated Cost
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                              {NOT_INCLUDED.map((row, i) => (
                                <tr key={i} className="group hover:bg-neutral-50 transition-colors">
                                  <td className="py-4 text-neutral-700">{row.item}</td>
                                  <td className="py-4 text-neutral-900 font-medium text-right">{row.cost}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-6">
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary-400" />
                        What&apos;s Typically Included
                      </h3>
                      <ul className="space-y-4">
                        {PACKAGE_INCLUSIONS.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-neutral-300 text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                            <div>
                              <span className="font-medium text-white">{item.title}</span>
                              <span className="text-neutral-400"> — {item.description}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-8 rounded-3xl bg-amber-500/10 border border-amber-400/20 backdrop-blur-md">
                      <h3 className="text-lg font-bold text-amber-300 mb-4 flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        Money-Saving Tip
                      </h3>
                      <p className="text-sm text-neutral-300 leading-relaxed">
                        KCM Clinic in Jelenia Góra offers all-inclusive packages with
                        accommodation included, simplifying budgeting. Request itemised
                        quotes from multiple clinics and compare total costs including
                        travel.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </m.section>

          {/* =================================================================
              REGIONAL GUIDE SECTION
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-32">
            <div className="max-w-3xl mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">
                Destination Guide
              </span>
              <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Where to Have Rhinoplasty in Poland
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Poland offers several excellent destinations for rhinoplasty, each
                with distinct advantages. Understanding these options helps you
                choose the right setting for your procedure and recovery.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2" data-aeo="rhinoplasty-poland-regions">
              {REGIONS.map((region, i) => (
                <m.div
                  key={region.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`group relative flex flex-col rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-900/10 ${
                    region.highlight
                      ? 'border-2 border-primary-200 bg-primary-50/50'
                      : 'border border-neutral-200/60 bg-white hover:border-primary-300'
                  }`}
                >
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary-50 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl group-hover:scale-150" />

                  <div className="relative z-10 flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                        {region.name}
                      </h3>
                      {region.highlight && (
                        <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-primary-700">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-primary-600 font-medium mb-4">{region.tagline}</p>
                    <p className="text-sm text-neutral-600 font-light leading-relaxed mb-6">
                      {region.description}
                    </p>
                    <div className="mb-4">
                      <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Key Advantages</p>
                      <ul className="space-y-2">
                        {region.advantages.map((adv, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-neutral-600 font-light">
                            <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                            {adv}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 border-t border-neutral-100">
                      <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">{region.clinicsLabel}</p>
                      <p className="text-sm text-neutral-600 font-light">{region.clinics}</p>
                    </div>
                  </div>
                </m.div>
              ))}
            </div>

            <div className="mt-12 rounded-[2rem] border border-neutral-100 bg-white p-8 sm:p-12">
              <h3 className="text-2xl font-bold text-neutral-900 mb-8">Recommendation by Priority</h3>
              <div className="grid gap-8 sm:grid-cols-3">
                {RECOMMENDATIONS.map((rec, i) => (
                  <div key={i} className="group">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 mb-4">
                      {i === 0 ? <MapPin className="h-6 w-6" /> : i === 1 ? <Heart className="h-6 w-6" /> : <Star className="h-6 w-6" />}
                    </div>
                    <p className="font-bold text-neutral-900 mb-2">{rec.label}</p>
                    <p className="text-sm text-neutral-600 font-light">{rec.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </m.section>

          {/* =================================================================
              TYPES OF RHINOPLASTY SECTION
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                  Technique Guide
                </span>
                <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                  Rhinoplasty Techniques Available in Poland
                </h2>
                <p className="mt-4 text-lg text-neutral-600 font-light">
                  Polish surgeons offer the full range of modern rhinoplasty
                  techniques. Many trained in Germany or Austria, bringing Central
                  European precision to their work.
                </p>
              </div>
              <div className="h-px flex-1 bg-neutral-100 hidden md:block mx-8 mb-4" />
            </div>

            <div className="grid gap-8 md:grid-cols-2 mb-16" data-aeo="rhinoplasty-techniques-poland">
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">Open Rhinoplasty</h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-bold mb-6">
                  £3,200–£4,500
                </span>
                <ul className="space-y-4">
                  {[
                    'Small incision across columella (tissue between nostrils)',
                    'Full visibility of nasal structures',
                    'Preferred for complex reshaping, revision cases',
                    'Faint scar fades within 6–12 months',
                    'Polish surgeons trained in meticulous closure',
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-600 font-light">
                      <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">Closed Rhinoplasty</h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-bold mb-6">
                  £2,900–£4,000
                </span>
                <ul className="space-y-4">
                  {[
                    'All incisions hidden inside nostrils',
                    'No visible external scarring',
                    'Suitable for minor refinements, dorsal hump reduction',
                    'Faster recovery, less swelling',
                    'Requires high surgeon skill due to limited visibility',
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-600 font-light">
                      <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-sm italic text-neutral-500 mb-16 text-center">
              Your surgeon will recommend the approach based on your anatomy
              and goals. Polish surgeons are known for conservative, natural
              results.
            </p>

            {/* Piezo/Ultrasonic Rhinoplasty */}
            <div
              className="rounded-[3rem] bg-gradient-to-br from-primary-600 to-primary-700 p-1 overflow-hidden shadow-2xl shadow-primary-200/50 mb-16"
              data-aeo="rhinoplasty-techniques-poland"
            >
              <div className="rounded-[2.8rem] bg-white p-8 sm:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-primary-50 blur-3xl" />

                <div className="relative z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 mb-8 shadow-inner">
                    <Zap className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-2">
                    Piezo/Ultrasonic Rhinoplasty in Poland
                  </h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-bold mb-6">
                    £3,500–£5,000
                  </span>
                  <p className="text-lg text-neutral-600 font-light leading-relaxed mb-10 max-w-3xl">
                    Piezo rhinoplasty uses ultrasonic vibrations to sculpt nasal
                    bones with precision, leaving soft tissue intact. This
                    advanced technique is available at select Polish clinics,
                    including KCM Clinic and top Warsaw practices.
                  </p>

                  <h4 className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-6">
                    Key Advantages vs Traditional Technique
                  </h4>
                  <div className="bg-neutral-50 rounded-[2rem] p-2 border border-neutral-100 mb-10">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="text-left">
                            <th className="p-5 text-sm font-bold text-neutral-400 uppercase tracking-widest">
                              Aspect
                            </th>
                            <th className="p-5 text-sm font-bold text-neutral-400 uppercase tracking-widest">
                              Traditional
                            </th>
                            <th className="p-5 text-sm font-bold text-primary-600 uppercase tracking-widest">
                              Piezo/Ultrasonic
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200">
                          {PIEZO_COMPARISON.map((row, i) => (
                            <tr key={i} className="group">
                              <td className="p-5 font-bold text-neutral-900">{row.aspect}</td>
                              <td className="p-5 text-neutral-500 font-light">{row.traditional}</td>
                              <td className="p-5 text-green-600 font-bold">{row.piezo}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] bg-neutral-50 border border-neutral-100 p-6">
                    <p className="text-sm text-neutral-600 font-light leading-relaxed">
                      <strong className="text-neutral-900">Availability:</strong> Confirm piezo availability when
                      booking. Not all Polish clinics offer this technique. KCM
                      Clinic and select Warsaw practices have invested in piezo
                      technology.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Types */}
            <div className="grid gap-8 md:grid-cols-2">
              {RHINOPLASTY_TYPES.map((type, i) => (
                <m.div
                  key={type.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative flex flex-col rounded-[2rem] border border-neutral-200/60 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary-300 hover:shadow-2xl hover:shadow-primary-900/10"
                >
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary-50 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl group-hover:scale-150" />

                  <div className="relative z-10 flex-1">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">
                      {type.name}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-bold mb-6">
                      {type.price}
                    </span>
                    <ul className="space-y-3">
                      {type.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-3 text-neutral-600 font-light text-sm">
                          <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </m.div>
              ))}
            </div>
          </m.section>

          {/* =================================================================
              HOW TO CHOOSE A SURGEON SECTION
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-32">
            <div className="max-w-3xl mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">
                Surgeon Selection
              </span>
              <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                How to Choose a Rhinoplasty Surgeon in Poland
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Poland&apos;s EU membership means medical qualifications are
                recognised across Europe. Here&apos;s how to verify credentials
                and select the right surgeon.
              </p>
            </div>

            {/* Credentials */}
            <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 sm:p-12 mb-8" data-aeo="rhinoplasty-surgeon-credentials-poland">
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                Essential Credentials to Verify
              </h3>
              <p className="text-neutral-500 font-light mb-8">
                Key Certifications (Hierarchy of Credibility)
              </p>
              <ol className="space-y-6">
                {CREDENTIALS.map((cred, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-lg font-black text-primary-600">
                      {i + 1}
                    </span>
                    <div>
                      <span className="font-bold text-neutral-900">{cred.label}</span>
                      <span className="text-neutral-600 font-light"> — {cred.description}</span>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-sm italic text-neutral-500">
                How to verify: Request registration numbers and cross-reference
                with PTChPRiE directory. EU-trained surgeons welcome verification.
              </p>
            </div>

            {/* Experience Indicators */}
            <div className="grid gap-8 sm:grid-cols-2 mb-8">
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                <Activity className="h-8 w-8 text-primary-600 mb-6" />
                <h3 className="text-xl font-bold text-neutral-900 mb-6">Volume Thresholds</h3>
                <ul className="space-y-4 text-sm text-neutral-600">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Minimum acceptable:</strong> 100+ rhinoplasties</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Experienced:</strong> 500+ rhinoplasties</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Expert level:</strong> 1,000+ rhinoplasties</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                <Heart className="h-8 w-8 text-primary-600 mb-6" />
                <h3 className="text-xl font-bold text-neutral-900 mb-6">Ask Directly</h3>
                <ul className="space-y-4 text-sm text-neutral-600 font-light">
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    &quot;How many rhinoplasties do you perform annually?&quot;
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    &quot;What is your revision rate?&quot;
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    &quot;Can you share before/after photos of similar cases?&quot;
                  </li>
                </ul>
              </div>
            </div>

            {/* Red Flags */}
            <div className="rounded-[2rem] bg-red-50 border border-red-100 p-8 mb-8">
              <h3 className="text-xl font-bold text-red-900 mb-6 flex items-center gap-3">
                <Shield className="h-6 w-6 text-red-600" />
                Red Flags to Avoid
              </h3>
              <ul className="grid gap-3 text-sm text-red-800 sm:grid-cols-2">
                {[
                  'Reluctance to share credentials or photos',
                  'Prices significantly below market (under £2,000)',
                  'Pressure to book quickly',
                  'No revision policy in writing',
                  'Surgery at non-accredited facilities',
                  'No EU medical qualifications',
                ].map((flag, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    {flag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Facility Standards */}
            <div className="grid gap-6 sm:grid-cols-3">
              {FACILITY_STANDARDS.map((item, i) => (
                <div key={i} className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                  <item.icon className="h-8 w-8 text-primary-600 mb-4" />
                  <h4 className="font-bold text-neutral-900 mb-3">{item.title}</h4>
                  <p className="text-sm text-neutral-600 font-light leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </m.section>

          {/* =================================================================
              FEATURED SURGEONS SECTION
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-32">
            <div className="max-w-3xl mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">
                Verified Specialists
              </span>
              <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Featured Rhinoplasty Surgeons in Poland
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {SURGEONS.map((surgeon, i) => (
                <m.div
                  key={surgeon.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`group relative flex flex-col rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-900/10 ${
                    surgeon.featured
                      ? 'border-2 border-primary-200 bg-white'
                      : 'border border-neutral-200/60 bg-white hover:border-primary-300'
                  }`}
                >
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary-50 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl group-hover:scale-150" />

                  <div className="relative z-10 flex-1">
                    {surgeon.featured && (
                      <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-primary-700 mb-4">
                        Featured
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                      {surgeon.name}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-bold mt-2 mb-6">
                      {surgeon.price}
                    </span>
                    <ul className="space-y-3">
                      {surgeon.details.map((detail, j) => (
                        <li key={j} className="text-sm text-neutral-600 font-light">
                          <strong className="text-neutral-900">{detail.label}:</strong> {detail.value}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {surgeon.note && (
                    <div className="relative z-10 mt-6 pt-6 border-t border-neutral-100">
                      <p className="text-xs italic text-neutral-500">{surgeon.note}</p>
                    </div>
                  )}
                </m.div>
              ))}

              {/* Consultation CTA Card */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center rounded-[2.5rem] border-2 border-dashed border-neutral-300 bg-neutral-50/50 p-8"
              >
                <div className="text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 mx-auto mb-6">
                    <Heart className="h-8 w-8" />
                  </div>
                  <p className="font-bold text-neutral-700 text-lg mb-2">
                    Need help choosing a surgeon?
                  </p>
                  <p className="text-sm text-neutral-500 font-light mb-6">
                    Our team can match you with verified surgeons based on your
                    goals, budget, and preferences.
                  </p>
                  <Link href="/enquiry?procedure=rhinoplasty&country=poland">
                    <Button className="rounded-full px-8">
                      Get Surgeon Recommendations
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </m.div>
            </div>

            <p className="mt-8 text-sm italic text-neutral-500 text-center">
              MeetYourClinic verifies surgeon credentials through official registries.
              Profiles updated quarterly. Always confirm current information
              directly with clinics.
            </p>
          </m.section>

          {/* =================================================================
              PATIENT JOURNEY TIMELINE
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-32">
            <div className="max-w-3xl mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">
                Step-by-Step Guide
              </span>
              <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Your Rhinoplasty Journey
              </h2>
            </div>

            {/* Pre-Trip Phase */}
            <div className="mb-12" data-aeo="rhinoplasty-poland-timeline">
              <h3 className="text-2xl font-bold text-neutral-900 mb-8">
                Pre-Trip Phase (4–8 Weeks Before)
              </h3>
              <div className="space-y-4">
                {PRE_TRIP_PHASES.map((phase, i) => (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-lg font-black text-primary-600">
                        {i + 1}
                      </span>
                      <p className="font-bold text-neutral-900">{phase.title}</p>
                    </div>
                    <ul className="ml-14 space-y-2">
                      {phase.steps.map((step, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-neutral-600 font-light">
                          <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </m.div>
                ))}
              </div>
            </div>

            {/* Trip Phase */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-neutral-900 mb-8">
                Trip Phase (7–10 Days in Poland)
              </h3>
              <div className="bg-white rounded-3xl p-2 shadow-2xl border border-neutral-100">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left">
                        <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">
                          Day
                        </th>
                        <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">
                          What Happens
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {TRIP_DAYS.map((row, i) => (
                        <tr key={i} className="group hover:bg-neutral-50 transition-colors">
                          <td className={`p-6 font-bold whitespace-nowrap ${row.highlight ? 'text-primary-600' : 'text-neutral-900'}`}>
                            {row.day}
                          </td>
                          <td className="p-6 text-neutral-600 font-light">{row.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Post-Trip Recovery */}
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-8">
                Post-Trip Recovery (UK)
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {POST_TRIP_RECOVERY.map((item, i) => (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
                  >
                    <p className="font-bold text-neutral-900 mb-3">{item.period}</p>
                    <p className="text-sm text-neutral-600 font-light leading-relaxed">{item.description}</p>
                  </m.div>
                ))}
              </div>
            </div>
          </m.section>

          {/* =================================================================
              RECOVERY SECTION
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-32">
            <div className="max-w-3xl mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">
                Recovery Guide
              </span>
              <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Recovery After Rhinoplasty in Poland
              </h2>
            </div>

            <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 sm:p-12 mb-8" data-aeo="rhinoplasty-poland-recovery">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                Immediate Post-Operative Period (Days 1–7)
              </h3>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Common Experiences</p>
              <ul className="space-y-4 text-sm text-neutral-600">
                {[
                  'Nasal congestion (normal — breathing through mouth initially)',
                  'Swelling concentrated around eyes and cheeks',
                  'Bruising (varies by technique and individual)',
                  'Mild discomfort (managed with prescribed medication)',
                ].map((exp, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
                    <span className="font-light">{exp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mountain Recovery Advantage */}
            <div className="rounded-[3rem] bg-gradient-to-br from-primary-600 to-primary-700 p-1 overflow-hidden shadow-2xl shadow-primary-200/50 mb-8">
              <div className="rounded-[2.8rem] bg-white p-8 sm:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-primary-50 blur-3xl" />

                <div className="relative z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 mb-8 shadow-inner">
                    <Heart className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6">
                    Mountain Recovery Advantage (KCM Clinic)
                  </h3>
                  <p className="text-lg text-neutral-600 font-light leading-relaxed mb-10 max-w-3xl">
                    KCM Clinic&apos;s location in the Karkonosze Mountains offers a
                    unique recovery experience. Clean mountain air, peaceful
                    surroundings, and purpose-built recovery accommodation create
                    optimal healing conditions.
                  </p>

                  <div className="grid gap-8 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] bg-neutral-50 border border-neutral-100 p-6">
                      <h4 className="font-bold text-neutral-900 mb-3">Recovery Benefits</h4>
                      <ul className="space-y-2 text-sm text-neutral-600 font-light">
                        {[
                          'Clean air aids healing',
                          'Peaceful environment reduces stress',
                          'Gentle walks possible from Day 4–5',
                          'On-site accommodation eliminates transfers',
                        ].map((b, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-[1.5rem] bg-neutral-50 border border-neutral-100 p-6">
                      <h4 className="font-bold text-neutral-900 mb-3">Patients Often Say</h4>
                      <p className="text-sm italic text-neutral-600 font-light leading-relaxed">
                        &quot;The mountain setting made recovery feel like a retreat
                        rather than a hospital stay. The fresh air and peaceful
                        surroundings helped me heal.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What to Avoid */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-8">What to Avoid During Recovery</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {RECOVERY_AVOIDANCE.map((item, i) => (
                  <div key={i} className="rounded-[1.5rem] bg-red-50 border border-red-100 p-6">
                    <p className="font-bold text-red-900 mb-1">{item.duration}</p>
                    <p className="text-sm text-red-800 font-light">{item.activity}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Flying Home */}
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-8">Flying Home After Rhinoplasty</h3>
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                  <Clock className="h-8 w-8 text-primary-600 mb-6" />
                  <h4 className="font-bold text-neutral-900 mb-4">Typical Clearance</h4>
                  <p className="text-sm text-neutral-600 font-light mb-6">
                    Day 7–10 post-surgery (after splint removal)
                  </p>
                  <p className="font-bold text-neutral-900 mb-3">Flight Considerations</p>
                  <ul className="space-y-2 text-sm text-neutral-600 font-light">
                    {[
                      'Short flight (2–2.5 hours) well-tolerated',
                      'Stay hydrated, use saline nasal spray',
                      'Mild facial swelling possible (temporary)',
                    ].map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                  <Shield className="h-8 w-8 text-primary-600 mb-6" />
                  <h4 className="font-bold text-neutral-900 mb-4">Surgeon Criteria for Clearance</h4>
                  <ul className="space-y-3 text-sm text-neutral-600 font-light">
                    {[
                      'External splint removed',
                      'Sutures removed (if external)',
                      'No active bleeding or infection',
                      'Patient comfortable and recovering well',
                    ].map((c, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </m.section>

          {/* =================================================================
              RISKS AND SAFETY SECTION
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-32">
            <div className="max-w-3xl mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">
                Safety & Transparency
              </span>
              <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Risks and Safety: What You Should Know
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Transparent discussion of risks demonstrates our commitment to
                patient welfare. Poland&apos;s EU membership provides additional
                safeguards.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 mb-8" data-aeo="rhinoplasty-poland-safety">
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">General Surgical Risks</h3>
                <ul className="space-y-4 text-sm text-neutral-600">
                  {[
                    'Bleeding (rare, typically controlled during surgery)',
                    'Infection (uncommon with proper care)',
                    'Adverse reaction to anaesthesia (pre-screening minimises)',
                    'Scarring (minimal with proper technique)',
                  ].map((risk, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
                      <span className="font-light">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">Rhinoplasty-Specific Risks</h3>
                <ul className="space-y-4 text-sm text-neutral-600">
                  {[
                    'Asymmetry (8–12% experience minor degrees)',
                    'Breathing difficulties (temporary or requiring revision)',
                    'Numbness in nasal tip (usually temporary)',
                    'Dissatisfaction with aesthetic result',
                    'Need for revision surgery (5–15%)',
                  ].map((risk, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
                      <span className="font-light">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* EU Safeguards */}
            <div className="rounded-[2rem] bg-green-50 border border-green-100 p-8 mb-8">
              <h3 className="text-xl font-bold text-green-900 mb-6 flex items-center gap-3">
                <Shield className="h-6 w-6 text-green-600" />
                EU Consumer Protections
              </h3>
              <p className="text-neutral-700 font-light mb-4">
                As an EU member, Poland offers additional safeguards:
              </p>
              <ul className="space-y-3 text-sm text-green-900">
                {[
                  'EU healthcare directive ensures minimum quality standards',
                  'European cross-border healthcare rights apply',
                  'EU-recognised medical qualifications',
                  'Consumer protection laws for medical services',
                  'EHIC/GHIC may cover emergency complications',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Minimising Risk */}
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-8">Minimising Your Risk</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {MINIMIZE_RISK_ITEMS.map((item, i) => (
                  <div key={i} className="rounded-[1.5rem] bg-green-50 border border-green-100 p-6 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-green-900">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </m.section>

          {/* =================================================================
              FAQ SECTION
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-32">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-16">
                <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">
                  Common Questions
                </span>
                <h2 className="text-4xl font-bold text-neutral-900 tracking-tight sm:text-5xl">
                  Rhinoplasty in Poland FAQs
                </h2>
              </div>
              <div className="bg-white rounded-[2.5rem] border border-neutral-200/60 p-4 sm:p-10 shadow-xl shadow-neutral-100">
                <FAQSection
                  faqs={faqs}
                  title=""
                  className="faq-section-custom"
                />
              </div>
            </div>
          </m.section>

          {/* =================================================================
              CTA SECTION
              ================================================================= */}
          <m.section {...fadeInUp} className="pb-12">
            <div className="relative overflow-hidden rounded-[3rem] bg-[#0A1A2F] p-12 text-white sm:p-20 lg:p-32 shadow-2xl text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 via-transparent to-blue-600/30" />
              <m.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -left-1/4 -top-1/4 h-full w-full rounded-full bg-primary-500/10 blur-[120px]"
              />

              <div className="relative z-10 mx-auto max-w-4xl">
                <span className="text-sm font-bold tracking-[0.3em] text-primary-300 uppercase mb-6 block">
                  Ready to begin?
                </span>
                <h2 className="text-4xl font-bold sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] mb-8">
                  Your New Look <br />Starts in{' '}
                  <span className="bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-transparent">
                    Poland
                  </span>
                </h2>
                <p className="mx-auto mt-8 max-w-2xl text-xl text-neutral-300 font-light leading-relaxed">
                  Compare prices and surgeons from ISO-accredited clinics in Warsaw,
                  Kraków, and KCM Clinic. Receive personalised treatment plans from
                  EU-trained rhinoplasty specialists — no obligation.
                </p>

                <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
                  <Link href="/clinics?procedure=rhinoplasty&country=poland" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-12 py-8 text-lg font-bold shadow-xl shadow-white/10"
                    >
                      Compare Rhinoplasty Surgeons
                    </Button>
                  </Link>
                  <Link href="/enquiry?procedure=rhinoplasty&country=poland" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-full px-12 py-8 text-lg font-bold backdrop-blur-md"
                    >
                      Get Free Clinic Recommendations
                    </Button>
                  </Link>
                </div>

                <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-8 text-sm font-medium text-neutral-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary-400" />
                    Trusted by 10,000+ UK patients
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary-400" />
                    EU healthcare standards
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary-400" />
                    No booking fees
                  </div>
                </div>
              </div>
            </div>
          </m.section>

          {/* =================================================================
              INTERNAL LINKS
              ================================================================= */}
          <m.section {...fadeInUp} className="mt-20 border-t border-neutral-100 pt-12">
            <div className="flex flex-wrap gap-x-8 gap-y-4 items-center justify-center text-sm font-medium">
              <span className="text-neutral-400 uppercase tracking-widest text-xs">Related Guides:</span>
              {CROSS_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </m.section>
        </div>
      </div>
  )
}
