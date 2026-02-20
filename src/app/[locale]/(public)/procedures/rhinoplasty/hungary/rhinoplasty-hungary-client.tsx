'use client'

import { m } from 'framer-motion'
import Link from 'next/link'
import { HU, GB } from 'country-flag-icons/react/3x2'
import { CheckCircle, Star, MapPin, ArrowRight, Shield, Zap, Clock, Activity, Heart, Sparkles, Award, Plane } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FAQSection } from '@/components/seo/faq-section'

// =============================================================================
// TYPES
// =============================================================================

interface FAQ {
  question: string
  answer: string
}

interface RhinoplastyHungaryClientProps {
  faqs: FAQ[]
}

// =============================================================================
// ANIMATION
// =============================================================================

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

// =============================================================================
// DATA CONSTANTS
// =============================================================================

const HERO_STATS = [
  { value: '€2,200–€3,500', label: 'All-inclusive packages' },
  { value: '40–60%', label: 'Savings vs UK' },
  { value: '2.5 hrs', label: 'Flight from London' },
]

const TRUST_BADGES = [
  'ISO-certified clinics',
  'Internationally trained surgeons',
  'Thermal spa recovery',
  'EU patient protections',
]

const KEY_ADVANTAGES = [
  { icon: Shield, title: 'EU Standards', desc: 'Full EU healthcare regulation and patient protections' },
  { icon: Award, title: 'Brazilian Training', desc: 'Surgeons trained at Prof. Pitanguy Institute' },
  { icon: Heart, title: 'Thermal Recovery', desc: '1,500+ thermal springs for post-recovery relaxation' },
  { icon: Plane, title: 'Accessibility', desc: '2.5 hours from London, multiple daily flights' },
]

const PRICE_COMPARISON = [
  { type: 'Primary Rhinoplasty', hungary: '€2,200–€3,500', ukSurgery: '£5,000–£7,000', ukTotal: '£6,500–£9,500' },
  { type: 'Revision Rhinoplasty', hungary: '€4,000–€5,500', ukSurgery: '£8,000–£12,000', ukTotal: '£10,000–£16,000' },
  { type: 'Ultrasonic Rhinoplasty', hungary: '€2,870–€4,000', ukSurgery: '£6,000–£8,500', ukTotal: '£8,000–£11,000' },
  { type: 'Septorhinoplasty', hungary: '€2,800–€4,200', ukSurgery: '£6,000–£8,000', ukTotal: '£8,000–£11,000' },
  { type: 'Tip Rhinoplasty', hungary: '€1,800–€2,800', ukSurgery: '£3,500–£5,000', ukTotal: '£4,500–£6,500' },
]

const PACKAGE_INCLUSIONS = [
  { title: 'Pre-operative', desc: 'Virtual + in-person consultation, blood tests, ECG' },
  { title: 'Surgery', desc: 'Surgeon fee, anaesthesiologist, operating theatre' },
  { title: 'Anaesthesia', desc: 'General or local anaesthesia with sedation' },
  { title: 'Post-operative', desc: 'Medications, nasal splint, dressings' },
  { title: 'Accommodation', desc: '2-4 nights in 3-4 star hotel' },
  { title: 'Transfers', desc: 'Airport pickup and clinic transfers' },
  { title: 'Follow-up', desc: '2-3 post-operative appointments' },
  { title: 'Coordinator', desc: 'English-speaking patient coordinator' },
  { title: 'Emergency Line', desc: '24/7 emergency contact during stay' },
]

const PREMIUM_ADDONS = [
  { title: '5-star Hotel', desc: 'Upgraded accommodation' },
  { title: 'Thermal Spa Access', desc: 'For post-recovery use' },
  { title: 'Extended Stay', desc: '7+ nights accommodation' },
  { title: 'Private Nursing', desc: 'Dedicated nursing care' },
]

const NOT_INCLUDED = [
  { item: 'Return flights (UK to Budapest)', cost: '£50–£150' },
  { item: 'Travel insurance (with medical cover)', cost: '£30–£60' },
  { item: 'Thermal spa treatments', cost: '€20–€50 per session' },
  { item: 'Extra hotel nights', cost: '€50–€100/night' },
]

const RHINOPLASTY_TYPES = [
  {
    title: 'Open Rhinoplasty',
    description: 'The most common approach in Hungarian clinics, influenced by Brazilian technique training via the Prof. Pitanguy school. External columella incision provides full visibility for complex reshaping and revision cases.',
    details: [
      { label: 'Best for', value: 'Complex reshaping, dorsal hump, revision cases' },
      { label: 'Recovery', value: '7-10 days visible swelling, 2-3 weeks cast removal' },
    ],
    highlighted: false,
  },
  {
    title: 'Closed Rhinoplasty',
    description: 'Internal incisions only, no visible scarring. Shorter procedure time and faster initial recovery. Requires experienced surgeon for optimal results due to limited visibility.',
    details: [
      { label: 'Best for', value: 'Minor adjustments, tip refinement' },
      { label: 'Recovery', value: 'Faster initial recovery than open technique' },
    ],
    highlighted: false,
  },
  {
    title: 'Ultrasonic Rhinoplasty',
    description: 'Available at select premium clinics from €2,870. Piezotome technology for precise bone work with reduced bruising and faster recovery. Not universally available — confirm with specific surgeons.',
    details: [
      { label: 'Benefits', value: 'Reduced bruising, faster recovery, more predictable results' },
      { label: 'Price', value: '€2,870–€4,000' },
    ],
    highlighted: true,
  },
  {
    title: 'Revision Rhinoplasty',
    description: 'Higher complexity requiring experienced specialists. Hungarian surgeons trained in reconstruction techniques offer revision at €4,000–€5,500 — still significant savings vs UK. Thorough pre-operative assessment essential.',
    details: [
      { label: 'Best for', value: 'Correcting previous rhinoplasty results' },
      { label: 'Recovery', value: 'Longer than primary rhinoplasty' },
    ],
    highlighted: false,
  },
  {
    title: 'Septorhinoplasty',
    description: 'Combines cosmetic reshaping with functional correction for deviated septum and breathing issues. Popular among patients with both aesthetic and functional concerns.',
    details: [
      { label: 'Best for', value: 'Aesthetic + breathing improvement' },
      { label: 'Price', value: '€2,800–€4,200' },
    ],
    highlighted: false,
  },
]

const CREDENTIALS = [
  { title: 'Hungarian Medical Chamber Registration', desc: 'Mandatory for all practising physicians' },
  { title: 'Specialist Certification in Plastic Surgery', desc: 'Issued by Hungarian authorities' },
  { title: 'MPHST Membership', desc: 'Magyar Plasztikai, Helyreállító és Esztétikai Sebészeti Társaság (Hungarian Plastic Surgery Society)' },
  { title: 'International Memberships', desc: 'ISAPS, EBOPRAS, or equivalent' },
  { title: 'Ministry of Health Clinic Licence', desc: 'Confirms facility meets national standards' },
]

const CONSULTATION_QUESTIONS = [
  'Where did you complete your plastic surgery training?',
  'How many rhinoplasties do you perform annually?',
  'Do you have before/after photos of patients with similar nose types to mine?',
  'What technique do you recommend for my goals, and why?',
  'What is your revision rate?',
  'How do you handle complications if they arise after I return to the UK?',
  'Do you offer video consultations for pre-operative planning?',
  'What follow-up care is included?',
]

const RED_FLAGS = [
  'Reluctance to provide credentials or training history',
  'Pressure to book immediately without proper consultation',
  'Unrealistic outcome promises',
  'No mention of potential complications',
  'Clinic without Ministry of Health certification',
  'Poor communication or language barriers during consultation',
]

const EXPERIENCE_BENCHMARKS = [
  { value: '100+', label: 'Minimum', color: 'text-neutral-400' },
  { value: '500+', label: 'Experienced', color: 'text-primary-600' },
  { value: '1,000+', label: 'Expert', color: 'text-primary-700' },
  { value: 'Piezotome', label: 'Specific training for ultrasonic', color: 'text-primary-600', small: true },
]

const SURGEONS = [
  {
    name: 'Dr. Miklós Molnár',
    price: '€2,800–€4,000',
    rating: 4.9,
    highlight: 'Pitanguy Institute Trained',
    details: [
      { label: 'Experience', value: '20+ years in plastic surgery' },
      { label: 'Training', value: 'University of Debrecen Medical School (1994), Prof. Ivo Pitanguy Institute in Rio de Janeiro (3-year postgraduate programme, 2,200+ surgeries during training)' },
      { label: 'Current Practice', value: 'Dr. Molnar Clinic, Budapest; Perfect Age Body and Facial Aesthetics Centre' },
      { label: 'Previous Roles', value: 'Chief of Plastic Surgery at Dr Rose Private Hospital (2008-2012)' },
      { label: 'Languages', value: 'English, Portuguese, Italian, Spanish, German, Hungarian' },
      { label: 'Memberships', value: 'MPHST, Hungarian Medical Board (MOK), Association of Students of Professor Ivo Pitanguy' },
    ],
  },
  {
    name: 'Dr. Csaba Molnár',
    price: '€2,500–€3,500',
    rating: 4.8,
    highlight: 'ISAPS Representative',
    details: [
      { label: 'Experience', value: '25+ years in plastic and aesthetic surgery' },
      { label: 'Position', value: 'Founder and Owner, Elite Clinic (opened 2015, Debrecen)' },
      { label: 'Leadership', value: 'Former President and General Secretary of Hungarian Society for Plastic, Reconstructive and Aesthetic Surgery' },
      { label: 'International Role', value: 'National Secretary and Representative of Hungary, ISAPS' },
      { label: 'Location', value: 'Debrecen (Eastern Hungary, accessible from Budapest)' },
      { label: 'Notable', value: 'Multiple publications, congress presentations, professional course instruction' },
    ],
  },
  {
    name: 'Dr. Tamás Karvász',
    price: '€2,400–€3,200',
    rating: 4.8,
    highlight: 'Top-10 Ranked',
    details: [
      { label: 'Clinic', value: 'Art Real Plastic Surgery (established 2003)' },
      { label: 'Recognition', value: 'Listed in Top-10 plastic surgeons in Hungary; clinic ranked in top 10 plastic surgeries in Central Europe' },
      { label: 'Experience', value: '20+ years' },
      { label: 'Specialisation', value: 'Range of aesthetic procedures including rhinoplasty' },
      { label: 'Location', value: 'Budapest' },
    ],
  },
  {
    name: 'Dr. Zsombor Varga',
    price: '€2,600–€3,500',
    rating: 4.7,
    highlight: 'Premium Facilities',
    details: [
      { label: 'Associated Clinics', value: 'Works with multiple premium Budapest facilities' },
      { label: 'Patient Reviews', value: 'Highly rated, known for personalised approach' },
      { label: 'Specialisation', value: 'Aesthetic surgery including rhinoplasty' },
      { label: 'Location', value: 'Budapest' },
    ],
  },
]

const JOURNEY_PHASES = [
  {
    phase: 1,
    title: 'Research & Selection (4–8 weeks before travel)',
    items: [
      'Research surgeons and clinics',
      'Request quotes and virtual consultations',
      'Review before/after photos',
      'Check credentials and reviews',
      'Select surgeon and clinic',
      'Pay deposit (typically 20-30%)',
      'Book flights (London to Budapest: 2.5 hours)',
      'Arrange travel insurance with medical coverage',
    ],
  },
  {
    phase: 2,
    title: 'Pre-Travel Preparation (2–4 weeks before)',
    items: [
      'Complete medical questionnaire',
      'Share photos for surgical planning',
      'Receive pre-operative instructions',
      'Arrange time off work (10-14 days minimum)',
      'Organise post-operative supplies',
      'Confirm all travel and accommodation details',
    ],
  },
]

const BUDAPEST_STAY = [
  { day: 'Day 1 — Arrival', desc: 'Airport pickup, hotel check-in, rest', highlighted: false },
  { day: 'Day 2 — Pre-Op', desc: 'Consultation, medical tests, planning', highlighted: false },
  { day: 'Day 3 — Surgery', desc: 'Procedure (1.5-3 hours), recovery room', highlighted: true },
  { day: 'Days 4-6 — Recovery', desc: 'Rest at hotel, follow-up visits, light walking', highlighted: false },
  { day: 'Days 7-10 — Pre-Departure', desc: 'Splint removal, final assessment, flight clearance', highlighted: false },
]

const UK_RECOVERY = [
  { period: 'Week 2-3', desc: 'Most visible bruising fades' },
  { period: 'Week 4-6', desc: 'Return to desk work, gentle exercise' },
  { period: 'Week 6-8', desc: 'Resume most normal activities' },
  { period: 'Month 3', desc: '80% swelling resolved' },
  { period: 'Month 6-12', desc: 'Final results emerging' },
  { period: '12+ months', desc: 'Complete healing', highlighted: true },
]

const HUNGARY_CONSIDERATIONS = [
  { label: 'Winter visits', desc: 'Budapest can be cold (Nov-Feb), but lower tourist traffic' },
  { label: 'Summer visits', desc: 'Warmer recovery, but busier city' },
  { label: 'Thermal spas', desc: 'Generally safe after 4-6 weeks (confirm with surgeon)' },
  { label: 'Direct flights', desc: 'Wizz Air, Ryanair, BA from multiple UK airports' },
]

const RECOVERY_PHASES = [
  { phase: 'Immediate Post-Op', timeframe: 'Days 1-7', expect: 'Nasal packing removed 24-48 hours. External splint worn. Bruising peaks Day 2-3. Sleep elevated.' },
  { phase: 'Short-Term', timeframe: 'Weeks 2-4', expect: 'Splint removal reveals initial result (still swollen). Bruising fading. Light work possible Week 2. Avoid glasses.' },
  { phase: 'Medium-Term', timeframe: 'Months 1-6', expect: 'Tip remains swollen longest. Subtle refinement continues. Resume exercise gradually (Month 2). Numbness resolving.' },
  { phase: 'Long-Term', timeframe: '6-18 months', expect: 'Final shape emerges. Internal scarring matures. Skin re-drapes. Sensation fully returns. Final assessment possible.', highlighted: true },
]

const UK_FOLLOWUP_ITEMS = [
  'Detailed written aftercare instructions',
  'Photo-based remote consultations via email/WhatsApp',
  'Emergency contact protocols',
  'Medical records for UK healthcare providers',
  'Coordination with UK GP if needed',
]

const GENERAL_RISKS = [
  { title: 'Bleeding', desc: '1-2% requiring intervention' },
  { title: 'Infection', desc: 'Rare with proper protocols (<1%)' },
  { title: 'Asymmetry', desc: 'Minor common; significant uncommon' },
  { title: 'Breathing Difficulties', desc: 'Temporary swelling vs structural' },
  { title: 'Numbness', desc: 'Usually temporary, resolves within months' },
  { title: 'Dissatisfaction', desc: '5-15% seek revision' },
]

const SAFETY_ADVANTAGES = [
  'EU healthcare regulations apply',
  'Ministry of Health oversight',
  'Mandatory malpractice insurance for all surgeons',
  'ISO-certified facilities available',
  'Clear patient rights under EU law',
  'Hungarian Medical Chamber registration required',
]

const SAFETY_CONSIDERATIONS = [
  'Limited JCI-accredited hospitals (1 in Hungary)',
  'Most cosmetic surgery in private clinics, not hospitals',
  'Malpractice compensation standards differ from UK',
  'Follow-up care coordination requires planning',
  'Language barriers possible (though English widely spoken)',
]

const INAPPROPRIATE_FOR = [
  'Complex revision cases (may require UK specialist)',
  'Patients with significant medical comorbidities',
  'Those unable to travel for follow-up if needed',
  'Patients uncomfortable with remote post-operative care',
]

const PATIENT_CONCERNS = [
  {
    question: '\u201cIs healthcare quality comparable to the UK?\u201d',
    answer: 'Hungary\u2019s medical education system is among Europe\u2019s oldest and most respected. Many surgeons have additional international training. Private clinics serving medical tourists invest heavily in modern equipment and facilities. EU healthcare directives apply, providing baseline standards. However, patients should verify individual clinic accreditations rather than assuming uniformity.',
  },
  {
    question: '\u201cWhat if something goes wrong after I return home?\u201d',
    answer: 'This is a legitimate concern.',
    mitigations: [
      'Staying 7-10 days minimum to catch early complications',
      'Choosing surgeons who offer telemedicine follow-up',
      'Purchasing travel insurance with medical repatriation coverage',
      'Identifying UK plastic surgeons for emergency follow-up',
      'Keeping detailed medical records from Hungarian procedure',
    ],
  },
  {
    question: '\u201cAre Hungarian surgeons properly trained?\u201d',
    answer: 'Hungarian plastic surgery training is rigorous and EU-compliant. Many leading surgeons have additional international credentials. The key is individual verification: check Hungarian Medical Chamber registration, verify specialist plastic surgery certification, look for MPHST, ISAPS, or EBOPRAS membership, and research training background (Brazilian school connections are a positive indicator).',
  },
  {
    question: '\u201cWhy is it cheaper than the UK?\u201d',
    answer: 'Lower cost does not mean lower quality. Factors include: lower operating costs (rent, staff salaries, utilities), favourable exchange rates, competitive medical tourism market, and efficient clinic models designed for international patients.',
  },
]

const RELATED_LINKS = [
  { href: '/procedures/rhinoplasty', label: 'Rhinoplasty Abroad' },
  { href: '/procedures/rhinoplasty/turkey', label: 'Rhinoplasty Turkey' },
  { href: '/procedures/rhinoplasty/poland', label: 'Rhinoplasty Poland' },
  { href: '/procedures/rhinoplasty/spain', label: 'Rhinoplasty Spain' },
  { href: '/destinations/hungary', label: 'Hungary Medical Tourism' },
]

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function RhinoplastyHungaryClient({ faqs }: RhinoplastyHungaryClientProps) {
  return (
    <div className="bg-neutral-50">

        {/* ============================================================= */}
        {/* HERO SECTION */}
        {/* ============================================================= */}
        <section className="relative overflow-hidden bg-[#0A1A2F] py-20 sm:py-28 lg:py-36">
          <m.div
            className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary-600/20 blur-[120px]"
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <m.div
            className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-emerald-500/15 blur-[100px]"
            animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 overflow-hidden rounded-lg shadow-lg shadow-white/10">
                  <HU title="Hungary" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Rhinoplasty in{' '}
                  <span className="bg-gradient-to-r from-emerald-400 via-primary-400 to-emerald-300 bg-clip-text text-transparent">
                    Hungary
                  </span>
                </h1>
              </div>

              <p className="mx-auto mt-6 max-w-3xl text-lg font-light text-white/70 sm:text-xl">
                European healthcare standards, Hungarian expertise. Save 40-60% vs UK
                prices with EU patient protections, internationally trained surgeons,
                and unique thermal spa recovery options.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/clinics?procedure=rhinoplasty&country=hungary"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#0A1A2F] shadow-lg transition-all hover:bg-neutral-100 hover:shadow-xl"
                >
                  Compare Budapest Surgeons
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                {TRUST_BADGES.map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5 text-sm text-white/50">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400/70" />
                    {badge}
                  </span>
                ))}
              </div>

              <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
                {HERO_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10"
                  >
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="mt-1 text-sm uppercase tracking-widest text-white/50">{stat.label}</p>
                  </div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* WHY HUNGARY SECTION */}
        {/* ============================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp}>
              <p className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Why Hungary</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] sm:text-5xl">
                Why UK Patients Choose Hungary for Rhinoplasty
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-neutral-600 font-light">
                World-class medical education, EU standards, and unique thermal spa recovery — all at 40-60% savings.
              </p>
            </m.div>

            <m.div {...fadeInUp} className="mt-10 space-y-6" data-aeo="rhinoplasty-hungary-benefits">
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8">
                <p className="text-neutral-700 leading-relaxed">
                  Hungary has transformed into a leading European medical tourism
                  destination, built on a foundation of world-class medical education
                  and the unique combination of EU standards with competitive pricing.
                  For UK patients seeking rhinoplasty abroad, Hungary offers a
                  sophisticated European alternative that prioritises quality over
                  rock-bottom prices.
                </p>
              </div>

              {[
                {
                  title: 'EU Healthcare Framework',
                  text: 'Hungary operates within EU medical regulations, offering UK patients familiar standards, clear patient rights, and regulatory oversight that provides reassurance. The Hungarian Ministry of Health maintains strict oversight of all medical facilities, and EU cross-border healthcare directives apply.',
                },
                {
                  title: 'Medical Education Heritage',
                  text: "Hungarian medical universities rank among Europe\u2019s oldest and most prestigious. Many Hungarian surgeons have additional international training, particularly from the renowned Prof. Ivo Pitanguy school in Brazil \u2014 considered the birthplace of modern cosmetic surgery. This training lineage brings refined techniques and aesthetic sensibilities to Budapest clinics.",
                },
                {
                  title: 'Cost-Quality Balance',
                  text: "Hungary offers 40-60% savings vs UK prices \u2014 less aggressive than Turkey\u2019s discounts, but with higher baseline quality standards and EU regulatory compliance. This positions Hungary as the premium European choice for patients who prioritise regulatory standards over maximum savings.",
                },
                {
                  title: 'Thermal Spa Culture',
                  text: "Hungary has 1,500+ thermal springs, including famous Budapest baths like Sz\u00e9chenyi, Gell\u00e9rt, and Rudas. Post-operative relaxation in mineral-rich waters (after surgeon approval, typically 4-6 weeks post-op) offers a unique recovery experience unavailable elsewhere.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                  <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                  <p className="mt-3 text-neutral-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </m.div>

            <m.div {...fadeInUp} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {KEY_ADVANTAGES.map((adv) => (
                <div
                  key={adv.title}
                  className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
                >
                  <adv.icon className="h-8 w-8 text-primary-600" />
                  <p className="mt-4 font-semibold text-neutral-900">{adv.title}</p>
                  <p className="mt-2 text-sm text-neutral-600">{adv.desc}</p>
                </div>
              ))}
            </m.div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* PRICING SECTION */}
        {/* ============================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp}>
              <p className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Pricing</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] sm:text-5xl">
                Rhinoplasty Cost in Hungary vs UK: 2026 Price Comparison
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-neutral-600 font-light">
                Hungary offers excellent value for EU-standard care — not the cheapest
                option, but transparent pricing with regulatory protections.
              </p>
            </m.div>

            <m.div
              {...fadeInUp}
              className="mt-12 rounded-[3rem] bg-neutral-900 p-6 sm:p-10"
              data-aeo="rhinoplasty-hungary-cost"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-transparent rounded-[3rem] pointer-events-none" />
              <h3 className="mb-6 text-xl font-semibold text-white">Procedure Cost Comparison</h3>
              <div className="overflow-x-auto rounded-3xl bg-white">
                <table className="min-w-full divide-y divide-neutral-100">
                  <thead>
                    <tr className="bg-neutral-50">
                      <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-900 sm:px-6">
                        Procedure Type
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-primary-600 sm:px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-6 overflow-hidden rounded-sm shadow-sm">
                            <HU title="Hungary" />
                          </div>
                          <span>Hungary (All-Inclusive)</span>
                        </div>
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-900 sm:px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-6 overflow-hidden rounded-sm shadow-sm">
                            <GB title="UK" />
                          </div>
                          <span>UK (Surgery Only)</span>
                        </div>
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-900 sm:px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-6 overflow-hidden rounded-sm shadow-sm">
                            <GB title="UK" />
                          </div>
                          <span>UK (Total Est.)</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {PRICE_COMPARISON.map((row, i) => (
                      <tr key={row.type} className={i % 2 === 1 ? 'bg-neutral-50/50' : ''}>
                        <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-neutral-900 sm:px-6">
                          {row.type}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 sm:px-6">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                            {row.hungary}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-neutral-500 sm:px-6">
                          {row.ukSurgery}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-neutral-500 sm:px-6">
                          {row.ukTotal}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-white/50">
                Hungarian prices in Euros. 1 EUR ≈ £0.85 (verify current rate).
              </p>
            </m.div>

            {/* Package Inclusions */}
            <m.div {...fadeInUp} className="mt-16">
              <h3 className="text-2xl font-bold text-neutral-900">
                Standard All-Inclusive Package (€2,200–€3,500)
              </h3>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PACKAGE_INCLUSIONS.map((pkg) => (
                  <div
                    key={pkg.title}
                    className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
                  >
                    <CheckCircle className="h-6 w-6 text-primary-600" />
                    <p className="mt-3 font-semibold text-neutral-900">{pkg.title}</p>
                    <p className="mt-1 text-sm text-neutral-600">{pkg.desc}</p>
                  </div>
                ))}
              </div>
            </m.div>

            {/* Premium Add-ons */}
            <m.div {...fadeInUp} className="mt-16">
              <h3 className="text-2xl font-bold text-neutral-900">
                Premium Package Add-ons (€3,500–€5,000)
              </h3>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {PREMIUM_ADDONS.map((addon) => (
                  <div
                    key={addon.title}
                    className="rounded-[2rem] border border-primary-100 bg-primary-50/50 p-8 hover:border-primary-200 transition-colors"
                  >
                    <Sparkles className="h-6 w-6 text-primary-600" />
                    <p className="mt-3 font-semibold text-neutral-900">{addon.title}</p>
                    <p className="mt-1 text-sm text-neutral-600">{addon.desc}</p>
                  </div>
                ))}
              </div>
            </m.div>

            {/* Not Included */}
            <m.div {...fadeInUp} className="mt-16">
              <h3 className="text-2xl font-bold text-neutral-900">Typically NOT Included</h3>
              <div className="mt-8 overflow-x-auto rounded-3xl border border-neutral-100 bg-white">
                <table className="min-w-full divide-y divide-neutral-100">
                  <thead>
                    <tr className="bg-neutral-50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                        Item
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                        Estimated Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {NOT_INCLUDED.map((row, i) => (
                      <tr key={row.item} className={i % 2 === 1 ? 'bg-neutral-50/50' : ''}>
                        <td className="px-6 py-4 text-sm text-neutral-900">{row.item}</td>
                        <td className="px-6 py-4 text-sm text-neutral-500">{row.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </m.div>

            {/* Money-Saving Tip */}
            <m.div
              {...fadeInUp}
              className="mt-10 rounded-[2rem] border border-amber-200 bg-amber-50 p-8"
            >
              <div className="flex items-start gap-3">
                <Zap className="h-6 w-6 flex-shrink-0 text-amber-600" />
                <div>
                  <p className="font-semibold text-neutral-900">Money-Saving Tip</p>
                  <p className="mt-2 text-neutral-600">
                    Hungarian clinics often offer seasonal promotions. Request quotes
                    from 3+ clinics and ask about off-peak pricing. Most Budapest clinics
                    accept GBP transfers with no conversion fees.
                  </p>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* TYPES OF RHINOPLASTY */}
        {/* ============================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp}>
              <p className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Techniques</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] sm:text-5xl">
                Types of Rhinoplasty Performed in Hungary
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-neutral-600 font-light">
                Hungarian surgeons offer the full range of rhinoplasty techniques,
                with a strong tradition of open rhinoplasty influenced by Brazilian
                training methods.
              </p>
            </m.div>

            <m.div
              {...fadeInUp}
              className="mt-12 space-y-6"
              data-aeo="rhinoplasty-hungary-techniques"
            >
              {RHINOPLASTY_TYPES.map((type) => (
                <div
                  key={type.title}
                  className={`rounded-[2rem] border p-8 transition-colors ${
                    type.highlighted
                      ? 'border-primary-200 bg-primary-50/60 hover:border-primary-300'
                      : 'border-neutral-100 bg-white hover:border-primary-100'
                  }`}
                >
                  <h3 className="text-xl font-semibold text-neutral-900">{type.title}</h3>
                  <p className="mt-3 text-neutral-600 leading-relaxed">{type.description}</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {type.details.map((d) => (
                      <div key={d.label}>
                        <p className="text-sm font-medium text-neutral-900">{d.label}:</p>
                        <p className={`text-sm ${d.label === 'Price' ? 'font-medium text-primary-600' : 'text-neutral-600'}`}>
                          {d.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </m.div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* CHOOSING A SURGEON */}
        {/* ============================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp}>
              <p className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Surgeon Selection</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] sm:text-5xl">
                Choosing a Rhinoplasty Surgeon in Hungary
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-neutral-600 font-light">
                A comprehensive framework for evaluating Hungarian surgeons,
                emphasising credentials, training lineage, and communication.
              </p>
            </m.div>

            <m.div {...fadeInUp} className="mt-12 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8">
                <h3 className="text-lg font-semibold text-neutral-900">Essential Credentials to Verify</h3>
                <ul className="mt-6 space-y-4">
                  {CREDENTIALS.map((cred, i) => (
                    <li key={cred.title} className="flex gap-4">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-medium text-neutral-900">{cred.title}</p>
                        <p className="text-sm text-neutral-600">{cred.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8">
                <h3 className="text-lg font-semibold text-neutral-900">Questions to Ask During Consultation</h3>
                <ul className="mt-6 space-y-3">
                  {CONSULTATION_QUESTIONS.map((q) => (
                    <li key={q} className="flex items-start gap-3 text-sm text-neutral-600">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500" />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </m.div>

            {/* Red Flags */}
            <m.div
              {...fadeInUp}
              className="mt-10 rounded-[2rem] border border-red-200 bg-red-50 p-8"
            >
              <h3 className="text-lg font-semibold text-red-800">Red Flags to Watch For</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {RED_FLAGS.map((flag) => (
                  <li key={flag} className="flex items-start gap-3 text-sm text-red-700">
                    <span className="mt-0.5 flex-shrink-0">✗</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </m.div>

            {/* Experience Benchmarks */}
            <m.div {...fadeInUp} className="mt-12">
              <h3 className="text-2xl font-bold text-neutral-900">Experience Benchmarks</h3>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {EXPERIENCE_BENCHMARKS.map((b) => (
                  <div
                    key={b.label}
                    className="rounded-[2rem] border border-neutral-100 bg-white p-8 text-center hover:border-primary-100 transition-colors"
                  >
                    <p className={`${b.small ? 'text-base' : 'text-3xl'} font-bold ${b.color}`}>{b.value}</p>
                    <p className="mt-2 text-sm text-neutral-600">{b.label}</p>
                  </div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* FEATURED SURGEONS */}
        {/* ============================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp}>
              <p className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Top Surgeons</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] sm:text-5xl">
                Featured Rhinoplasty Surgeons in Hungary
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-neutral-600 font-light">
                Notable Hungarian rhinoplasty surgeons with verified credentials.
                Profiles are for informational purposes — conduct your own due
                diligence before booking.
              </p>
            </m.div>

            <m.div {...fadeInUp} className="mt-12 grid gap-6 sm:grid-cols-2">
              {SURGEONS.map((surgeon) => (
                <div
                  key={surgeon.name}
                  className="group rounded-[2.5rem] border border-neutral-100 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-200/50"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900">{surgeon.name}</h3>
                      <p className="mt-1 text-lg font-semibold text-primary-600">{surgeon.price}</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold text-amber-700">{surgeon.rating}</span>
                    </div>
                  </div>

                  <span className="mt-3 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                    {surgeon.highlight}
                  </span>

                  <div className="mt-5 space-y-2.5">
                    {surgeon.details.map((d) => (
                      <p key={d.label} className="text-sm text-neutral-600">
                        <strong className="text-neutral-900">{d.label}:</strong> {d.value}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </m.div>

            <m.p {...fadeInUp} className="mt-8 text-center text-sm text-neutral-500 italic">
              Note: Verify current practice details, pricing, and availability
              before booking. Profiles are for informational purposes.
            </m.p>
          </div>
        </section>

        {/* ============================================================= */}
        {/* PATIENT JOURNEY TIMELINE */}
        {/* ============================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp}>
              <p className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Your Journey</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] sm:text-5xl">
                Your Rhinoplasty Journey: Timeline for UK Patients
              </h2>
            </m.div>

            <m.div {...fadeInUp} className="mt-12 space-y-8">
              {JOURNEY_PHASES.map((phase) => (
                <div key={phase.phase} className="rounded-[2rem] border border-neutral-100 bg-white p-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-700">
                      {phase.phase}
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900">{phase.title}</h3>
                  </div>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2 pl-16">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Phase 3 — Budapest Stay */}
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-700">
                    3
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Budapest Stay (7–10 days typical)
                  </h3>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pl-16">
                  {BUDAPEST_STAY.map((day) => (
                    <div
                      key={day.day}
                      className={`rounded-2xl p-4 ${
                        day.highlighted
                          ? 'border border-primary-200 bg-primary-50'
                          : 'bg-neutral-50'
                      }`}
                    >
                      <p className={`font-medium ${day.highlighted ? 'text-primary-700' : 'text-neutral-900'}`}>
                        {day.day}
                      </p>
                      <p className="mt-1 text-sm text-neutral-600">{day.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phase 4 — UK Recovery */}
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-700">
                    4
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    UK Recovery (Weeks 2–12)
                  </h3>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pl-16">
                  {UK_RECOVERY.map((r) => (
                    <div
                      key={r.period}
                      className={`rounded-2xl p-4 ${
                        r.highlighted
                          ? 'border border-primary-200 bg-primary-50'
                          : 'bg-neutral-50'
                      }`}
                    >
                      <p className={`font-medium ${r.highlighted ? 'text-primary-700' : 'text-neutral-900'}`}>
                        {r.period}
                      </p>
                      <p className="mt-1 text-sm text-neutral-600">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </m.div>

            {/* Hungary-Specific Considerations */}
            <m.div
              {...fadeInUp}
              className="mt-10 rounded-[2rem] border border-primary-200 bg-primary-50/60 p-8"
            >
              <h3 className="text-lg font-semibold text-neutral-900">Hungary-Specific Considerations</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {HUNGARY_CONSIDERATIONS.map((c) => (
                  <li key={c.label} className="text-sm text-neutral-600">
                    <strong className="text-neutral-900">{c.label}:</strong> {c.desc}
                  </li>
                ))}
              </ul>
            </m.div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* RECOVERY & AFTERCARE */}
        {/* ============================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp}>
              <p className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Recovery</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] sm:text-5xl">
                Recovery &amp; Aftercare Expectations
              </h2>
            </m.div>

            <m.div {...fadeInUp} className="mt-12">
              <div className="overflow-x-auto rounded-3xl border border-neutral-100 bg-white">
                <table className="min-w-full divide-y divide-neutral-100">
                  <thead>
                    <tr className="bg-neutral-50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Phase</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Timeframe</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">What to Expect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {RECOVERY_PHASES.map((r, i) => (
                      <tr key={r.phase} className={i % 2 === 1 ? 'bg-neutral-50/50' : ''}>
                        <td className={`px-6 py-4 text-sm font-medium ${r.highlighted ? 'text-primary-600' : 'text-neutral-900'}`}>
                          {r.phase}
                        </td>
                        <td className={`px-6 py-4 text-sm ${r.highlighted ? 'font-medium text-primary-600' : 'text-neutral-600'}`}>
                          {r.timeframe}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-600">{r.expect}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </m.div>

            {/* Recovery Advantages */}
            <m.div {...fadeInUp} className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-primary-200 bg-primary-50/60 p-8">
                <Heart className="h-8 w-8 text-primary-600" />
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">Thermal Spa Culture</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  Hungary&apos;s famous thermal baths (Széchenyi, Gellért, Rudas)
                  offer unique post-recovery relaxation — but only after surgeon
                  clearance (typically 4-6 weeks post-op). The mineral-rich waters
                  can aid general relaxation and wellbeing during extended recovery
                  visits.
                </p>
              </div>

              <div className="rounded-[2rem] border border-primary-200 bg-primary-50/60 p-8">
                <MapPin className="h-8 w-8 text-primary-600" />
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">Affordable Extended Stays</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  If you wish to stay longer for recovery monitoring, Budapest
                  offers excellent value accommodation (€50–€100/night for quality
                  hotels) compared to UK recovery costs. Consider extending your
                  stay for additional peace of mind.
                </p>
              </div>
            </m.div>

            {/* UK Follow-Up */}
            <m.div {...fadeInUp} className="mt-10 rounded-[2rem] border border-neutral-100 bg-white p-8">
              <h3 className="text-lg font-semibold text-neutral-900">UK Follow-Up Integration</h3>
              <p className="mt-3 text-sm text-neutral-600">Most Hungarian surgeons provide:</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {UK_FOLLOWUP_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-neutral-600">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </m.div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* RISKS & SAFETY */}
        {/* ============================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp}>
              <p className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Safety</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] sm:text-5xl">
                Risks, Complications &amp; Safety
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-neutral-600 font-light">
                Honest risk information with context for Hungary&apos;s safety standards.
              </p>
            </m.div>

            <m.div {...fadeInUp} className="mt-12">
              <h3 className="text-2xl font-bold text-neutral-900">
                General Rhinoplasty Risks (apply regardless of location)
              </h3>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {GENERAL_RISKS.map((risk) => (
                  <div
                    key={risk.title}
                    className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
                  >
                    <Activity className="h-6 w-6 text-neutral-400" />
                    <p className="mt-3 font-semibold text-neutral-900">{risk.title}</p>
                    <p className="mt-1 text-sm text-neutral-600">{risk.desc}</p>
                  </div>
                ))}
              </div>
            </m.div>

            <m.div {...fadeInUp} className="mt-12 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-green-200 bg-green-50/60 p-8">
                <Shield className="h-8 w-8 text-green-600" />
                <h3 className="mt-4 text-lg font-semibold text-green-800">Hungary Safety Advantages</h3>
                <ul className="mt-5 space-y-3">
                  {SAFETY_ADVANTAGES.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-neutral-600">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[2rem] border border-amber-200 bg-amber-50/60 p-8">
                <Clock className="h-8 w-8 text-amber-600" />
                <h3 className="mt-4 text-lg font-semibold text-amber-800">Considerations</h3>
                <ul className="mt-5 space-y-3">
                  {SAFETY_CONSIDERATIONS.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-neutral-600">
                      <span className="mt-0.5 flex-shrink-0 text-amber-600">⚠</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </m.div>

            <m.div
              {...fadeInUp}
              className="mt-10 rounded-[2rem] border border-red-200 bg-red-50 p-8"
            >
              <h3 className="text-lg font-semibold text-red-800">When Hungary May NOT Be Appropriate</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {INAPPROPRIATE_FOR.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-red-700">
                    <span className="mt-0.5 flex-shrink-0">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </m.div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* ADDRESSING UK PATIENT CONCERNS */}
        {/* ============================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp}>
              <p className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Patient Concerns</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] sm:text-5xl">
                Is Rhinoplasty in Hungary Safe? Addressing UK Patient Concerns
              </h2>
            </m.div>

            <m.div {...fadeInUp} className="mt-12 space-y-6">
              {PATIENT_CONCERNS.map((concern) => (
                <div
                  key={concern.question}
                  className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-neutral-900">{concern.question}</h3>
                  <p className="mt-3 text-neutral-600 leading-relaxed">{concern.answer}</p>
                  {concern.mitigations && (
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {concern.mitigations.map((m) => (
                        <li key={m} className="flex items-start gap-3 text-sm text-neutral-600">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Hungary vs Turkey */}
              <div className="rounded-[2rem] border border-primary-200 bg-primary-50/60 p-8">
                <h3 className="text-lg font-semibold text-neutral-900">Hungary vs Turkey: Honest Comparison</h3>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="font-medium text-neutral-900">Turkey</p>
                    <p className="mt-1 text-sm text-neutral-600">
                      Higher volume, lower prices (50-70% savings), more aggressive marketing
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-primary-700">Hungary</p>
                    <p className="mt-1 text-sm text-neutral-600">
                      Lower volume, moderate prices (40-60% savings), EU standards, thermal spa recovery option
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-sm text-neutral-600">
                  <strong>Consider Hungary if:</strong> EU regulatory framework
                  matters to you, you prefer European cultural context, or thermal
                  spa recovery appeals.
                </p>
              </div>
            </m.div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* FAQ SECTION */}
        {/* ============================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="text-center">
              <p className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">FAQ</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] sm:text-5xl">
                Frequently Asked Questions About Rhinoplasty in Hungary
              </h2>
            </m.div>

            <m.div {...fadeInUp} className="mt-12 rounded-[2.5rem] border border-neutral-200 bg-white p-6 shadow-xl sm:p-10">
              <FAQSection
                faqs={faqs}
                title="Rhinoplasty in Hungary FAQ"
                className="[&_h2]:sr-only"
              />
            </m.div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* CTA SECTION */}
        {/* ============================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[3rem] bg-[#0A1A2F] px-6 py-16 sm:px-16 sm:py-24">
              <m.div
                className="absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full bg-primary-600/20 blur-[80px]"
                animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <m.div
                className="absolute -bottom-20 -right-20 h-[250px] w-[250px] rounded-full bg-emerald-500/15 blur-[60px]"
                animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              />

              <m.div {...fadeInUp} className="relative text-center">
                <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  Get Your Free{' '}
                  <span className="bg-gradient-to-r from-emerald-400 via-primary-400 to-emerald-300 bg-clip-text text-transparent">
                    Rhinoplasty Quote
                  </span>{' '}
                  from Budapest Surgeons
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-white/70">
                  Compare prices and surgeons in Hungary. Receive personalised treatment
                  plans from internationally trained specialists — no obligation.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href="/clinics?procedure=rhinoplasty&country=hungary"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#0A1A2F] shadow-lg transition-all hover:bg-neutral-100 hover:shadow-xl"
                  >
                    Compare Budapest Surgeons
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    href="/enquiry?procedure=rhinoplasty&country=hungary"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white/60 hover:bg-white/5"
                  >
                    Get Free Clinic Recommendations
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                  {['EU-standard care', 'ISO-certified clinics', '40-60% savings vs UK', 'Thermal spa recovery'].map((badge) => (
                    <span key={badge} className="flex items-center gap-1.5 text-sm text-white/50">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400/70" />
                      {badge}
                    </span>
                  ))}
                </div>
              </m.div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* INTERNAL LINKS */}
        {/* ============================================================= */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="flex flex-wrap items-center justify-center gap-3 text-center">
              <span className="text-xs font-bold tracking-[0.15em] text-neutral-400 uppercase">
                Related Guides:
              </span>
              {RELATED_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-primary-200 hover:text-primary-600"
                >
                  {link.label}
                </Link>
              ))}
            </m.div>
          </div>
        </section>

      </div>
  )
}
