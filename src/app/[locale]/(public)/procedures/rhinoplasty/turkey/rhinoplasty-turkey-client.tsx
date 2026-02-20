'use client'

import { m } from 'framer-motion'
import Link from 'next/link'
import { TR, GB } from 'country-flag-icons/react/3x2'
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

interface RhinoplastyTurkeyClientProps {
  faqs: FAQ[]
}

// =============================================================================
// STATIC DATA
// =============================================================================

const HERO_STATS = [
  { value: '£2,450–£4,500', label: 'All-inclusive packages' },
  { value: '83,000+', label: 'Rhinoplasties annually' },
  { value: '46', label: 'JCI-accredited hospitals' },
]

const KEY_ADVANTAGES = [
  { icon: Activity, title: 'Volume Advantage', description: '500+ procedures/year per surgeon vs 50–100 in UK' },
  { icon: Sparkles, title: 'Technique Leadership', description: 'Early piezo adoption, refined through high volume' },
  { icon: Shield, title: 'JCI Infrastructure', description: '46 JCI-accredited hospitals, 2nd globally' },
  { icon: Zap, title: 'All-Inclusive Model', description: 'No hidden costs, comprehensive packages' },
]

const PRICE_COMPARISON = [
  { procedure: 'Primary Rhinoplasty', turkey: '£2,450–£4,000', ukSurgery: '£5,000–£7,000', ukTotal: '£6,500–£9,500' },
  { procedure: 'Revision Rhinoplasty', turkey: '£3,500–£6,000', ukSurgery: '£8,000–£12,000', ukTotal: '£10,000–£16,000' },
  { procedure: 'Piezo/Ultrasonic Add-on', turkey: 'Included or +£400–£600', ukSurgery: '+£1,000–£2,000', ukTotal: '—' },
  { procedure: 'Septorhinoplasty', turkey: '£2,800–£4,500', ukSurgery: '£6,000–£8,000', ukTotal: '£8,000–£11,000' },
  { procedure: 'Ethnic Rhinoplasty', turkey: '£3,000–£5,000', ukSurgery: '£6,500–£9,000', ukTotal: '£8,500–£12,000' },
]

const PACKAGE_INCLUSIONS = [
  { title: 'Pre-operative Consultation', description: 'Virtual + in-person consultation with surgeon' },
  { title: 'Medical Testing', description: 'Blood tests, ECG, COVID screening' },
  { title: 'Surgery', description: 'Surgeon fee, anaesthesiologist, operating theatre' },
  { title: 'Hospital Stay', description: '1 night with nursing care' },
  { title: 'Accommodation', description: '4–7 nights 4-star hotel (minimum)' },
  { title: 'Transfers', description: 'VIP airport transfers + clinic transfers' },
  { title: 'Post-op Care', description: 'Medications, nasal splint, dressings' },
  { title: 'Follow-up', description: 'In-clinic appointments + splint removal' },
  { title: 'Aftercare', description: '12-month telemedicine follow-ups' },
  { title: 'Coordinator', description: 'Personal English-speaking patient coordinator' },
  { title: '3D Imaging', description: 'Pre-operative simulation (most clinics)' },
  { title: 'Fit-to-Fly', description: 'Clearance consultation before departure' },
]

const NOT_INCLUDED = [
  { item: 'Return flights (UK to Istanbul)', cost: '£80–£250' },
  { item: 'Travel insurance (with medical cover)', cost: '£30–£80' },
  { item: 'Extra hotel nights (if extended recovery)', cost: '£60–£120/night' },
  { item: 'Additional medications', cost: '£20–£50' },
]

const PIEZO_COMPARISON = [
  { aspect: 'Pain (Day 2, 1–10 scale)', traditional: '5.1 average', piezo: '3.2 average' },
  { aspect: 'Bruising duration', traditional: '14–21 days', piezo: '7–10 days' },
  { aspect: 'Swelling peak resolution', traditional: 'Day 10–12', piezo: 'Day 5' },
  { aspect: '"Beaten up" appearance', traditional: 'Common', piezo: 'Minimal' },
  { aspect: 'Return to social activities', traditional: '2–3 weeks', piezo: '10–14 days' },
]

const RHINOPLASTY_TYPES = [
  {
    name: 'Revision Rhinoplasty',
    price: '£3,500–£6,000',
    points: [
      'Corrects unsatisfactory results from previous surgery',
      'Addresses breathing problems, aesthetic concerns, or both',
      'More complex due to scar tissue, altered anatomy',
      'Surgeons recommend waiting 12+ months after initial surgery',
      'Turkey excels due to high revision volumes and experience',
    ],
    note: 'Minimum 100 revision cases, before/after portfolio of similar cases, clear revision policy',
  },
  {
    name: 'Ethnic Rhinoplasty',
    price: '£3,000–£5,000',
    points: [
      'Preserves cultural identity while achieving desired refinements',
      'Requires understanding of diverse nasal structures (Middle Eastern, Asian, African descent)',
      'Techniques may include bridge augmentation, tip refinement, nostril adjustment',
      'Turkish surgeons experienced due to diverse international patient base',
    ],
  },
  {
    name: 'Septorhinoplasty (Functional + Aesthetic)',
    price: '£2,800–£4,500',
    points: [
      'Combines cosmetic reshaping with septal correction',
      'Addresses breathing difficulties alongside aesthetic concerns',
      'May qualify for partial UK insurance coverage (septoplasty component)',
      'Requires ENT or dual-trained surgeon',
    ],
  },
  {
    name: 'Preservation Rhinoplasty',
    price: '£3,000–£5,000',
    points: [
      'Modern technique preserving natural nasal structures',
      'Less disruption to ligaments and soft tissue',
      'More natural movement and appearance',
      'Faster recovery than traditional methods',
      'Growing in popularity at elite Turkish clinics',
    ],
  },
]

const CREDENTIALS = [
  { label: 'TSPRAS', description: 'Turkish Society of Plastic, Reconstructive and Aesthetic Surgery (Primary Turkish board)' },
  { label: 'EBOPRAS', description: 'European Board of Plastic, Reconstructive and Aesthetic Surgery' },
  { label: 'ISAPS', description: 'International Society of Aesthetic Plastic Surgery (indicates global recognition)' },
  { label: 'Turkish Ministry of Health Registration', description: 'Legal requirement' },
  { label: 'International Health Tourism Authorization', description: 'Required for treating foreign patients' },
]

const SURGEONS = [
  {
    name: 'Prof. Dr. Süleyman Taş',
    price: '£4,500–£7,000',
    rating: null,
    details: [
      { label: 'Experience', value: '15+ years, 10,000+ plastic surgery procedures' },
      { label: 'Specialisation', value: 'Closed rhinoplasty, natural results philosophy' },
      { label: 'Credentials', value: 'ISAPS member, FEBOPRAS, Turkish Aesthetic Surgery Society' },
      { label: 'Notable', value: 'Published "Rhinoplasty in Practice" textbook, 5+ patents' },
      { label: 'Facility', value: 'TAS Medical Center, Şişli, Istanbul' },
    ],
    note: 'Philosophy: "Address of Natural Beauty" — refined, subtle results',
  },
  {
    name: 'Dr. Cem Altındağ',
    price: '£2,800–£3,500',
    rating: '4.8/5 (79 Bookimed), 5.0 RealSelf',
    details: [
      { label: 'Experience', value: '26 years, 5,000+ rhinoplasties' },
      { label: 'Specialisation', value: 'Septorhinoplasty, functional correction' },
      { label: 'Credentials', value: 'European Rhinoplasty Society, trained in USA/UK' },
      { label: 'Notable', value: 'The Nose Clinic, Istanbul — dedicated rhinoplasty practice' },
      { label: 'Technique', value: 'Closed approach, soft silastic splints' },
    ],
    note: null,
  },
  {
    name: 'Dr. Ergin Er',
    price: 'From £3,600',
    rating: '4.8/5 rating',
    details: [
      { label: 'Experience', value: '31 years, 1,100+ rhinoplasties' },
      { label: 'Credentials', value: 'Award-winning plastic surgeon' },
      { label: 'Facility', value: 'Istanbul Aesthetic Plastic Surgery Center (4,000+ procedures/year)' },
      { label: 'Package', value: 'All-inclusive, 8-night stay, 4-star hotel' },
      { label: 'Notable', value: 'Strong international patient experience' },
    ],
    note: null,
  },
  {
    name: 'Prof. Dr. Murat Songu',
    price: 'From €5,000',
    rating: null,
    details: [
      { label: 'Specialisation', value: 'Piezo/ultrasonic rhinoplasty' },
      { label: 'Notable', value: 'Leading piezo surgeon with advanced tissue-preservation techniques' },
      { label: 'Approach', value: 'Minimises swelling, improves recovery outcomes' },
      { label: 'Pricing', value: 'Piezo specialist premium tier' },
    ],
    note: null,
  },
  {
    name: 'Prof. Dr. Gürhan Özcan',
    price: '£5,000–£7,500',
    rating: null,
    details: [
      { label: 'Experience', value: '35+ years, revision rhinoplasty specialist' },
      { label: 'Credentials', value: 'Founding chairman Plastic Surgery at Başkent University' },
      { label: 'Training', value: 'Baylor Medical School (Houston)' },
      { label: 'Facility', value: 'Istanbul Aesthetic Plastic Surgery Center' },
      { label: 'Specialisation', value: 'Complex revision cases' },
    ],
    note: null,
  },
]

const PRE_TRIP_PHASES = [
  {
    title: 'Week 1–2: Research & Shortlist',
    steps: ['Review surgeon portfolios and credentials', 'Request consultations from 3–5 clinics', 'Compare packages and pricing'],
  },
  {
    title: 'Week 2–4: Virtual Consultations',
    steps: ['Video calls with surgeons', 'Discuss goals, review 3D simulations', 'Receive detailed quotes'],
  },
  {
    title: 'Week 4–6: Decision & Booking',
    steps: ['Select surgeon and clinic', 'Pay deposit (typically 10–20%)', 'Book flights and travel insurance'],
  },
  {
    title: 'Week 6–12: Preparation',
    steps: [
      'Complete medical questionnaire',
      'Stop smoking (minimum 2 weeks before)',
      'Stop blood-thinning medications (aspirin, ibuprofen — 1 week before)',
      'Arrange time off work (10–14 days total)',
    ],
  },
]

const TRIP_DAYS = [
  { day: 'Day 1', description: 'VIP airport transfer to hotel. Rest and acclimatise.', highlight: false },
  { day: 'Day 2', description: 'Transfer to clinic. In-person consultation. Blood tests, ECG, pre-op checks. Final surgical plan confirmation.', highlight: false },
  { day: 'Day 3', description: 'Surgery Day. 1.5–3 hours under general anaesthesia. Recovery in private room. Overnight stay with nursing care.', highlight: true },
  { day: 'Day 4–6', description: 'Hotel rest (nurse visits if needed). Minimal activity, head elevated. Swelling and bruising peak (Day 2–3 post-op).', highlight: false },
  { day: 'Day 7–10', description: 'Splint removal. Surgeon review and clearance to fly. Final instructions. VIP transfer to airport. Return home.', highlight: true },
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
  'Choose JCI-accredited facilities only',
  'Select board-certified, high-volume surgeons',
  'Follow all pre-operative instructions',
  'Disclose complete medical history',
  'Adhere strictly to post-operative care',
  'Attend all follow-up appointments',
  'Have realistic expectations',
  'Confirm revision policy in writing',
]

const CROSS_LINKS = [
  { href: '/procedures/rhinoplasty', title: 'Rhinoplasty Hub', description: 'Compare all rhinoplasty destinations and techniques' },
  { href: '/procedures/facelift/turkey', title: 'Facelift in Turkey', description: 'Combine rhinoplasty with facial rejuvenation' },
  { href: '/procedures/liposuction/turkey', title: 'Liposuction in Turkey', description: 'Body contouring at JCI-accredited clinics' },
  { href: '/procedures/tummy-tuck/turkey', title: 'Tummy Tuck in Turkey', description: 'Abdominoplasty from £2,500 all-inclusive' },
  { href: '/destinations/turkey', title: 'Turkey Destination Guide', description: 'Everything you need to know about medical tourism in Turkey' },
  { href: '/cosmetic-surgery', title: 'All Cosmetic Surgery', description: 'Browse all cosmetic procedures abroad' },
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

export function RhinoplastyTurkeyClient({ faqs }: RhinoplastyTurkeyClientProps) {
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
                  <TR title="Turkey" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-[1.1]">
                  Rhinoplasty in{' '}
                  <span className="bg-gradient-to-r from-white via-primary-100 to-white/80 bg-clip-text text-transparent">
                    Turkey
                  </span>
                </h1>
              </div>

              <p className="text-lg text-neutral-300 sm:text-xl lg:text-2xl leading-relaxed font-light mb-10 max-w-3xl">
                Turkey performs 83,000+ rhinoplasties annually — more than any
                other country. Compare JCI-accredited clinics, piezo and
                traditional techniques, and all-inclusive packages from £2,450.
                Save 50–70% vs UK prices with verified surgeons.
              </p>

              <div className="flex flex-col gap-5 sm:flex-row">
                <Link href="/clinics?procedure=rhinoplasty&country=turkey">
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
              JCI-accredited facilities • 90–95% success rates • 50–70% savings
              vs UK • Free consultation matching
            </m.p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

          {/* =================================================================
              WHY TURKEY SECTION
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
                    Why UK Patients Choose Turkey for Rhinoplasty
                  </h2>
                  <p className="mt-8 text-lg text-neutral-600 font-light leading-relaxed">
                    Turkey has transformed from a budget destination into the global
                    leader for rhinoplasty. This is not about cheap surgery — it is
                    about accessing world-class expertise at accessible prices.
                  </p>

                  <div className="mt-10 p-8 rounded-[2rem] bg-neutral-50 border border-neutral-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-primary-100/50 blur-2xl group-hover:scale-150 transition-transform duration-500" />
                    <Shield className="h-10 w-10 text-primary-600 mb-6 relative z-10" />
                    <h3 className="text-xl font-bold text-neutral-900 mb-4 relative z-10">46 JCI-Accredited Hospitals</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed relative z-10">
                      2nd highest globally. Purpose-built aesthetic clinics with
                      advanced 3D imaging technology and EU-aligned safety protocols.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-12" data-aeo="rhinoplasty-turkey-benefits">
                {[
                  {
                    title: 'Surgeon Volume Advantage',
                    content:
                      'Turkish surgeons perform 500+ rhinoplasties annually (compared to 50–100 for typical UK surgeons). This experience gap translates to refined technique and better outcomes.',
                  },
                  {
                    title: 'Cost Economics Without Compromise',
                    content:
                      'The cost economics are driven by lower operating costs, favourable exchange rates, and government-supported medical tourism infrastructure — not compromised quality. Turkey pioneered piezo/ultrasonic rhinoplasty adoption. Many surgeons trained in the US and Europe, brought techniques back, and refined them through high-volume practice.',
                  },
                  {
                    title: 'All-Inclusive Package Model',
                    content:
                      'Unlike UK à la carte pricing, Turkish packages eliminate hidden costs and simplify planning. Turkey has 46 JCI-accredited hospitals, purpose-built aesthetic clinics, and advanced 3D imaging technology.',
                  },
                  {
                    title: 'Exponential Growth & Proven Track Record',
                    content:
                      'In 2022, Turkey performed 56,700 rhinoplasties, rising to 83,000 in 2023. The country ranks 2nd globally for plastic surgeons and JCI-accredited hospitals. UK search interest for "cosmetic surgery Turkey" has increased 1,000%+ since 2015.',
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
                    Rhinoplasty Cost in Turkey vs UK
                  </h2>
                  <p className="text-lg text-neutral-400 font-light">
                    Transparent all-inclusive pricing. Save 50–70% compared to UK private clinics.
                  </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                  <div className="lg:col-span-8 space-y-8" data-aeo="rhinoplasty-turkey-cost">
                    <div className="bg-white rounded-3xl p-2 shadow-2xl">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="text-left">
                              <th className="p-6 text-sm font-bold text-neutral-400 uppercase tracking-widest">
                                Procedure
                              </th>
                              <th className="p-6 text-sm font-bold text-primary-600 uppercase tracking-widest">
                                <div className="flex items-center gap-2">
                                  <div className="w-5 overflow-hidden rounded-sm">
                                    <TR title="Turkey" />
                                  </div>
                                  Turkey (All-Inclusive)
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
                                <div className="flex items-center gap-2">
                                  <div className="w-5 overflow-hidden rounded-sm">
                                    <GB title="UK" />
                                  </div>
                                  UK (Total Est.)
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100">
                            {PRICE_COMPARISON.map((row, i) => (
                              <tr key={i} className="group hover:bg-neutral-50 transition-colors">
                                <td className="p-6 font-bold text-neutral-900">{row.procedure}</td>
                                <td className="p-6 text-primary-600 font-bold">{row.turkey}</td>
                                <td className="p-6 text-neutral-500 line-through decoration-neutral-300">
                                  {row.ukSurgery}
                                </td>
                                <td className="p-6 text-neutral-500">{row.ukTotal}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl p-2 shadow-2xl">
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-neutral-900 mb-4">
                          Typically NOT Included
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
                        Standard Package (£2,450–£4,000)
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
                        Request itemised quotes from 3+ clinics. Ensure revision policy
                        is in writing before booking. Quotes typically valid 60–90 days.
                      </p>
                    </div>
                  </div>
                </div>
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
                  Types of Rhinoplasty Performed in Turkey
                </h2>
                <p className="mt-4 text-lg text-neutral-600 font-light">
                  Understanding your options empowers better surgeon conversations.
                  Many patients do not know the difference between techniques — this
                  knowledge helps you make informed decisions.
                </p>
              </div>
              <div className="h-px flex-1 bg-neutral-100 hidden md:block mx-8 mb-4" />
            </div>

            <div className="grid gap-8 md:grid-cols-2 mb-16" data-aeo="rhinoplasty-techniques">
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">Open Rhinoplasty</h3>
                <ul className="space-y-4">
                  {[
                    'Small incision across columella (tissue between nostrils)',
                    'Full visibility of nasal structures',
                    'Preferred for complex reshaping, revision cases, significant tip work',
                    'Faint scar fades within 6–12 months',
                    'Slightly longer recovery (bruising 10–14 days)',
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-600 font-light">
                      <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">Closed Rhinoplasty</h3>
                <ul className="space-y-4">
                  {[
                    'All incisions hidden inside nostrils',
                    'No visible external scarring',
                    'Suitable for minor refinements, dorsal hump reduction',
                    'Faster recovery, less swelling',
                    'Requires high surgeon skill due to limited visibility',
                    '85–90% success rate for achieving desired outcomes',
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
              and goals. Trust their expertise — both techniques achieve
              excellent results in skilled hands.
            </p>

            {/* Piezo/Ultrasonic Rhinoplasty */}
            <div
              className="rounded-[3rem] bg-gradient-to-br from-primary-600 to-primary-700 p-1 overflow-hidden shadow-2xl shadow-primary-200/50 mb-16"
              data-aeo="piezo-rhinoplasty-turkey"
            >
              <div className="rounded-[2.8rem] bg-white p-8 sm:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-primary-50 blur-3xl" />

                <div className="relative z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 mb-8 shadow-inner">
                    <Zap className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6">
                    Piezo/Ultrasonic Rhinoplasty — Turkey&apos;s Key Differentiator
                  </h3>
                  <p className="text-lg text-neutral-600 font-light leading-relaxed mb-10 max-w-3xl">
                    Piezo rhinoplasty uses ultrasonic vibrations (25–30 kHz
                    frequency) to sculpt nasal bones with microscopic precision.
                    Unlike traditional chisels and rasps, piezo only affects bone
                    tissue, leaving soft tissue, blood vessels, and mucosa
                    completely intact.
                  </p>

                  <h4 className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-6">
                    Key Advantages (Aesthetic Surgery Journal 2023)
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

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] bg-neutral-50 border border-neutral-100 p-6">
                      <h4 className="font-bold text-neutral-900 mb-3">Turkey&apos;s Piezo Expertise</h4>
                      <ul className="space-y-2 text-sm text-neutral-600 font-light">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                          Early adoption from European training
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                          High-volume piezo surgeons (200+ annual procedures)
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                          2024 TSPRAS audit: 1.2% major complication rate across 3,400 piezo procedures at JCI centres
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-[1.5rem] bg-neutral-50 border border-neutral-100 p-6">
                      <h4 className="font-bold text-neutral-900 mb-3">Cost Consideration</h4>
                      <p className="text-sm text-neutral-600 font-light leading-relaxed">
                        Piezo typically adds £400–£700 to procedure cost but
                        benefits often justify investment, especially for patients
                        prioritising faster recovery.
                      </p>
                    </div>
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

                  {type.note && (
                    <div className="relative z-10 mt-6 pt-6 border-t border-neutral-100">
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-2">
                        Surgeon Selection for Revision
                      </span>
                      <p className="text-sm text-neutral-600 font-light">{type.note}</p>
                    </div>
                  )}
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
                How to Choose a Rhinoplasty Surgeon in Turkey
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                This section establishes your verification framework. Use it
                independently to build confidence in your surgeon selection.
              </p>
            </div>

            {/* Credentials */}
            <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 sm:p-12 mb-8" data-aeo="rhinoplasty-surgeon-credentials">
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                Essential Credentials to Verify
              </h3>
              <p className="text-neutral-500 font-light mb-8">
                Board Certifications (Hierarchy of Credibility)
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
                How to verify: Request registration numbers. Cross-reference
                with TSPRAS directory and Turkish Ministry of Health database.
                Legitimate surgeons welcome verification.
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
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Piezo proficiency:</strong> 200+ annual piezo procedures</span>
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
                    &quot;What is your revision rate for primary procedures?&quot;
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    &quot;Can you share before/after photos of patients with similar anatomy to mine?&quot;
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
                  'Prices significantly below market (under £1,500)',
                  'Pressure to book quickly',
                  'No revision policy in writing',
                  'Surgery performed outside accredited facilities',
                  'No before/after portfolio for similar cases',
                ].map((flag, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    {flag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Facility Accreditation */}
            <div className="grid gap-6 sm:grid-cols-3 mb-8">
              {[
                {
                  icon: Award,
                  title: 'JCI (Gold Standard)',
                  description: 'Turkey has 46 JCI-accredited hospitals. Confirms international safety, hygiene, and quality standards. Valid 3 years.',
                },
                {
                  icon: Shield,
                  title: 'ISO Certifications',
                  description: 'Quality management systems certification. Look for ISO 9001.',
                },
                {
                  icon: Star,
                  title: 'Ministry of Health A-Rating',
                  description: 'Turkish national standard for healthcare facilities.',
                },
              ].map((item, i) => (
                <div key={i} className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                  <item.icon className="h-8 w-8 text-primary-600 mb-4" />
                  <h4 className="font-bold text-neutral-900 mb-3">{item.title}</h4>
                  <p className="text-sm text-neutral-600 font-light leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[1.5rem] bg-neutral-50 border border-neutral-100 p-6 mb-8">
              <p className="text-sm font-bold text-neutral-900 mb-2">Notable JCI-Accredited Facilities:</p>
              <p className="text-sm text-neutral-600 font-light">
                Memorial Şişli Hospital • Anadolu Medical Center • Liv Hospital
                Ulus (50,000+ international patients annually) • Acıbadem
                Healthcare Group • Medicana International
              </p>
            </div>

            {/* Consultation Quality */}
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="rounded-[2rem] bg-green-50 border border-green-100 p-8">
                <h3 className="text-xl font-bold text-green-900 mb-6 flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  Good Consultation Signs
                </h3>
                <ul className="space-y-3 text-sm text-green-800">
                  {[
                    '3D imaging/simulation to preview expected results',
                    'Detailed explanation of technique selection',
                    'Honest discussion of limitations and risks',
                    'Clear revision policy presented upfront',
                    'Time for questions without pressure',
                  ].map((sign, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">
                  Required Documentation Before Booking
                </h3>
                <ul className="space-y-3 text-sm text-neutral-600">
                  {[
                    'Itemised quote with validity period',
                    'Revision policy in writing',
                    'Surgeon credentials/registration numbers',
                    'Hospital/clinic accreditation proof',
                    'Cancellation/refund terms',
                  ].map((doc, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </m.section>

          {/* =================================================================
              FEATURED SURGEONS SECTION
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">
                  Verified Surgeons
                </span>
                <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                  Featured Rhinoplasty Surgeons in Turkey
                </h2>
              </div>
              <div className="h-px flex-1 bg-neutral-100 hidden md:block mx-8 mb-4" />
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {SURGEONS.map((surgeon, i) => (
                <m.div
                  key={surgeon.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative flex flex-col rounded-[2.5rem] border border-neutral-200/60 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary-300 hover:shadow-2xl hover:shadow-primary-900/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                      {surgeon.name}
                    </h3>
                    {surgeon.rating && (
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700">
                        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        <span className="text-xs font-bold">{surgeon.rating.split(' ')[0]}</span>
                      </div>
                    )}
                  </div>

                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-bold mb-6 w-fit">
                    {surgeon.price}
                  </span>

                  <ul className="space-y-3 flex-1">
                    {surgeon.details.map((detail, j) => (
                      <li key={j} className="text-sm text-neutral-600">
                        <strong className="text-neutral-900">{detail.label}:</strong>{' '}
                        <span className="font-light">{detail.value}</span>
                      </li>
                    ))}
                  </ul>

                  {surgeon.note && (
                    <p className="mt-4 pt-4 border-t border-neutral-100 text-xs italic text-neutral-500">
                      {surgeon.note}
                    </p>
                  )}
                  {surgeon.rating && (
                    <p className="mt-3 text-xs text-neutral-500">
                      Reviews: {surgeon.rating}
                    </p>
                  )}
                </m.div>
              ))}

              {/* Consultation CTA Card */}
              <div className="flex items-center justify-center rounded-[2.5rem] border-2 border-dashed border-neutral-200 bg-neutral-50/50 p-8">
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                    <Heart className="h-8 w-8" />
                  </div>
                  <p className="font-bold text-neutral-900 text-lg mb-2">
                    Need help choosing a surgeon?
                  </p>
                  <p className="text-sm text-neutral-500 font-light mb-6">
                    Our team can match you with verified surgeons based on your
                    goals, budget, and preferred technique.
                  </p>
                  <Link href="/enquiry?procedure=rhinoplasty&country=turkey">
                    <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-full px-8 py-6 font-bold shadow-lg shadow-primary-200">
                      Get Surgeon Recommendations
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <p className="mt-8 text-sm italic text-neutral-500 text-center">
              MeetYourClinic verifies surgeon credentials through official registries.
              Profiles are updated quarterly. Always confirm current information
              directly with clinics.
            </p>
          </m.section>

          {/* =================================================================
              PATIENT JOURNEY TIMELINE
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-32">
            <div className="max-w-3xl mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">
                The Journey
              </span>
              <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Your Rhinoplasty Journey: Step-by-Step Timeline
              </h2>
            </div>

            {/* Pre-Trip Phase */}
            <div className="mb-16" data-aeo="rhinoplasty-turkey-timeline">
              <h3 className="text-2xl font-bold text-neutral-900 mb-8 flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary-600" />
                Pre-Trip Phase (4–12 Weeks Before)
              </h3>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-neutral-100 hidden md:block" />
                <div className="space-y-8">
                  {PRE_TRIP_PHASES.map((phase, i) => (
                    <m.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative md:pl-24"
                    >
                      <div className="absolute left-0 top-0 hidden md:flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-neutral-100 shadow-sm z-10">
                        <span className="text-2xl font-black text-primary-600">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="bg-white rounded-[2rem] border border-neutral-100 p-8 shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-3">
                          <span className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 text-lg font-bold">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {phase.title}
                        </h4>
                        <ul className="space-y-3">
                          {phase.steps.map((step, j) => (
                            <li key={j} className="flex items-start gap-3 text-neutral-600 font-light text-sm">
                              <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </m.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trip Phase */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-neutral-900 mb-8 flex items-center gap-3">
                <Plane className="h-6 w-6 text-primary-600" />
                Trip Phase (7–10 Days in Turkey)
              </h3>
              <div className="bg-white rounded-[2.5rem] border border-neutral-100 p-2 shadow-sm">
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
                          <td className={`whitespace-nowrap p-6 font-bold ${row.highlight ? 'text-primary-600' : 'text-neutral-900'}`}>
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
              <h3 className="text-2xl font-bold text-neutral-900 mb-8 flex items-center gap-3">
                <Heart className="h-6 w-6 text-primary-600" />
                Post-Trip Recovery (UK)
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {POST_TRIP_RECOVERY.map((item, i) => (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors"
                  >
                    <h4 className="font-bold text-primary-600 mb-3">{item.period}</h4>
                    <p className="text-sm text-neutral-600 font-light leading-relaxed">{item.description}</p>
                  </m.div>
                ))}
              </div>
            </div>
          </m.section>

          {/* =================================================================
              RECOVERY EXPECTATIONS SECTION
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-32">
            <div className="max-w-3xl mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">
                Recovery Guide
              </span>
              <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Recovery After Rhinoplasty in Turkey
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                What to expect during your healing journey.
              </p>
            </div>

            {/* Immediate Post-Op */}
            <div
              className="rounded-[2rem] border border-neutral-100 bg-white p-8 sm:p-12 mb-8"
              data-aeo="rhinoplasty-turkey-recovery"
            >
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                Immediate Post-Operative Period (Days 1–7)
              </h3>
              <h4 className="font-bold text-neutral-900 mb-4">Common Experiences</h4>
              <ul className="space-y-3">
                {[
                  'Nasal congestion (normal — breathing through mouth initially)',
                  'Swelling concentrated around eyes and cheeks',
                  'Bruising (varies by technique and individual)',
                  'Mild discomfort (managed with prescribed pain medication)',
                  'Nausea (anaesthesia side effect — temporary)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-600 font-light">
                    <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* What to Avoid */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-8">
                What to Avoid During Recovery
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {RECOVERY_AVOIDANCE.map((item, i) => (
                  <div key={i} className="rounded-[1.5rem] bg-red-50 border border-red-100 p-6">
                    <p className="font-bold text-red-900">{item.duration}</p>
                    <p className="mt-1 text-sm text-red-700 font-light">{item.activity}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Flying After Rhinoplasty */}
            <div className="grid gap-8 sm:grid-cols-2 mb-8">
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                <Plane className="h-8 w-8 text-primary-600 mb-6" />
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Typical Clearance</h3>
                <p className="text-neutral-600 font-light mb-6">
                  Day 8–11 post-surgery (after splint removal)
                </p>
                <h4 className="font-bold text-neutral-900 mb-3">Flight Considerations</h4>
                <ul className="space-y-2 text-sm text-neutral-600 font-light">
                  {[
                    'Cabin pressure may cause mild facial swelling (temporary)',
                    'Stay hydrated, use saline nasal spray',
                    'Avoid alcohol during travel',
                    'Istanbul to London (3.5–4 hours) well-tolerated by Day 7–10',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                <Shield className="h-8 w-8 text-primary-600 mb-6" />
                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  Surgeon Criteria for Clearance
                </h3>
                <ul className="space-y-3 text-sm text-neutral-600 font-light">
                  {[
                    'External splint removed',
                    'Sutures removed (if external)',
                    'No active bleeding or infection',
                    'Patient comfortable and recovering well',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tips */}
            <div className="rounded-[2rem] bg-primary-50 border border-primary-100 p-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-primary-600" />
                Recovery Tips from Experienced Patients
              </h3>
              <ul className="grid gap-3 text-sm text-neutral-700 sm:grid-cols-2">
                {[
                  'Book return flights for Day 8–11 to allow flexibility',
                  'Bring button-front shirts (avoid pulling over head)',
                  'Travel pillow essential for semi-reclined sleeping',
                  'Arrange someone to collect you from UK airport',
                  'Plan 7–10 days off work minimum (longer for client-facing roles)',
                  'Have UK GP appointment scheduled for Day 14–21 (wound check)',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </m.section>

          {/* =================================================================
              RISKS AND COMPLICATIONS SECTION
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-32">
            <div className="max-w-3xl mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">
                Safety First
              </span>
              <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Risks and Complications: What You Should Know
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Transparent discussion of risks builds trust and demonstrates we
                prioritise patient welfare over sales.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-8" data-aeo="rhinoplasty-risks">
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 hover:border-primary-100 transition-colors">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">General Surgical Risks</h3>
                <ul className="space-y-4 text-sm text-neutral-600">
                  {[
                    'Bleeding (rare, typically controlled during surgery)',
                    'Infection (uncommon with proper care, antibiotics provided)',
                    'Adverse reaction to anaesthesia (pre-screening minimises risk)',
                    'Scarring (minimal with closed technique, fades with open)',
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
                    'Asymmetry (8–12% experience minor degrees, often unnoticeable)',
                    'Breathing difficulties (temporary or requiring revision)',
                    'Numbness in nasal tip (usually temporary, 1–3 months)',
                    'Dissatisfaction with aesthetic result',
                    'Need for revision surgery (5–15% depending on case complexity)',
                  ].map((risk, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
                      <span className="font-light">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Complication Rates */}
            <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 sm:p-12 mb-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Complication Rates in Turkish Centres
              </h3>
              <p className="text-sm text-neutral-600 font-light mb-4">
                <strong className="text-neutral-900">2024 Turkish Society of Plastic Surgery Audit</strong>{' '}
                (3,400 piezo procedures, 12 JCI-accredited centres):
              </p>
              <ul className="space-y-2 text-sm text-neutral-600 font-light mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Major complication rate: 1.2%
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Comparable to 0.7% reported in large international datasets
                </li>
              </ul>
              <p className="text-sm text-neutral-600 font-light">
                <strong className="text-neutral-900">What This Means:</strong> Turkish centres perform at or
                near international safety standards when JCI-accredited
                facilities and board-certified surgeons are selected.
              </p>
            </div>

            {/* Minimising Risk */}
            <div className="mb-8">
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

            {/* Revision Reality */}
            <div className="rounded-[2rem] bg-amber-50 border border-amber-100 p-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                <Activity className="h-6 w-6 text-amber-600" />
                Revision Rhinoplasty: Understanding the Reality
              </h3>
              <ul className="space-y-3 text-sm text-neutral-700 font-light mb-6">
                {[
                  'Revision rates vary: 5–15% across published literature',
                  'Definition varies (minor touch-up vs major correction)',
                  'Many "revisions" are minor adjustments, not full procedures',
                  'Always confirm revision policy before booking',
                  'Reputable surgeons typically cover surgical fees for medically necessary revision within 12 months',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm italic text-amber-900 font-medium">
                <strong>Important:</strong> If you are unhappy with results from
                a previous surgery (anywhere), Turkish surgeons are experienced
                in revision work. However, wait minimum 12 months for swelling
                to fully resolve before considering revision.
              </p>
            </div>
          </m.section>

          {/* =================================================================
              SAFETY CONCERNS SECTION
              ================================================================= */}
          <m.section {...fadeInUp} className="mb-32">
            <div className="max-w-3xl mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase mb-4 block">
                Addressing Concerns
              </span>
              <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                Is Rhinoplasty in Turkey Safe?
              </h2>
            </div>

            <div className="space-y-8" data-aeo="rhinoplasty-turkey-safety">
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 sm:p-12 hover:border-primary-100 transition-colors">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  &quot;How Can I Trust a Surgeon I&apos;ve Never Met?&quot;
                </h3>
                <p className="text-neutral-600 font-light leading-relaxed mb-4">
                  Virtual consultations allow meaningful pre-trip evaluation. 3D
                  simulations demonstrate surgeon&apos;s vision for your
                  results. Before/after portfolios show actual outcomes. Reviews
                  from previous UK patients provide peer insights. Credential
                  verification is possible through official registries.
                </p>
                <p className="text-sm italic text-neutral-500">
                  Recommendation: Have 2–3 virtual consultations before
                  deciding. Trust your instincts — you should feel confident and
                  comfortable with your chosen surgeon.
                </p>
              </div>

              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 sm:p-12 hover:border-primary-100 transition-colors">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  &quot;What If Something Goes Wrong?&quot;
                </h3>
                <p className="text-neutral-600 font-light leading-relaxed mb-6">
                  Legitimate concern — here&apos;s how to prepare:
                </p>
                <ol className="space-y-3 text-sm text-neutral-600 font-light mb-6">
                  {[
                    'Choose clinics with clear revision policies (in writing)',
                    'Ensure travel insurance covers medical complications abroad',
                    'Confirm clinic has emergency protocols (24/7 contact available)',
                    'Know the escalation path (how to reach surgeon post-trip)',
                    'Have UK GP prepared for local follow-up if needed',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-600">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                <div className="rounded-[1.5rem] bg-neutral-50 border border-neutral-100 p-6">
                  <p className="text-sm text-neutral-600 font-light">
                    <strong className="text-neutral-900">Turkey&apos;s Response Infrastructure:</strong> Most
                    complications are minor and manageable. Turkish hospitals
                    equipped for emergencies. Many clinics offer extended stays if
                    needed. Telemedicine follow-ups catch issues early.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 sm:p-12 hover:border-primary-100 transition-colors">
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                  &quot;Is the Cost Saving Worth the Travel?&quot;
                </h3>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-4">Consider the Full Picture</h4>
                    <ul className="space-y-3 text-sm text-neutral-600 font-light">
                      {[
                        '£3,000–£6,000+ savings on surgery cost',
                        'Minus: £150–£350 travel expenses',
                        'Net savings: Typically £2,500–£5,500',
                        'Plus: All-inclusive care (often fragmented/extra in UK)',
                        'Plus: Dedicated recovery time (forced break from routine)',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-4">When Turkey May NOT Be Right</h4>
                    <ul className="space-y-3 text-sm text-neutral-600 font-light">
                      {[
                        'Very complex revision cases (may prefer local specialist)',
                        'Significant medical conditions (discuss with GP first)',
                        'Inability to take required time off work',
                        'Extreme anxiety about travelling for medical care',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-neutral-400 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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
                  Rhinoplasty in Turkey FAQs
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
                    Turkey
                  </span>
                </h2>
                <p className="mx-auto mt-8 max-w-2xl text-xl text-neutral-300 font-light leading-relaxed">
                  Compare prices and surgeons from JCI-accredited clinics in
                  Istanbul. Receive personalised treatment plans from board-certified
                  rhinoplasty specialists — no obligation.
                </p>

                <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
                  <Link href="/clinics?procedure=rhinoplasty&country=turkey" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-12 py-8 text-lg font-bold shadow-xl shadow-white/10"
                    >
                      Compare Rhinoplasty Surgeons
                    </Button>
                  </Link>
                  <Link href="/enquiry?procedure=rhinoplasty&country=turkey" className="w-full sm:w-auto">
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
                    Verified surgeons only
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
