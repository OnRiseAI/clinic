'use client'

import { m } from 'framer-motion'
import Link from 'next/link'
import { ES, GB } from 'country-flag-icons/react/3x2'
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

interface RhinoplastySpainClientProps {
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
// DATA
// =============================================================================

const heroStats = [
  { value: '€4,500–€7,500', label: 'Primary rhinoplasty' },
  { value: '84 Years', label: 'EU highest life expectancy' },
  { value: '2–2.5 hrs', label: 'Flight from London' },
]

const keyAdvantages = [
  { icon: Award, title: 'Healthcare Excellence', desc: 'WHO ranked 7th globally, EU highest life expectancy (84 years)' },
  { icon: Zap, title: 'Technique Leadership', desc: 'European leaders in ultrasonic and preservation rhinoplasty' },
  { icon: Shield, title: 'Premium Infrastructure', desc: 'Ruber Internacional, Quirónsalud, Clínica Planas' },
  { icon: Plane, title: 'Strategic Location', desc: '2–2.5 hour flights, multiple daily from London' },
  { icon: Heart, title: 'Mediterranean Recovery', desc: 'Sunshine, mild climate, relaxing environment' },
  { icon: Star, title: 'UK Patient Experience', desc: 'English-speaking surgeons, dedicated coordinators' },
]

const priceComparison = [
  { procedure: 'Primary Rhinoplasty', spain: '€4,500–€7,500', ukSurgery: '£5,000–£7,000', ukTotal: '£6,500–£9,500' },
  { procedure: 'Ultrasonic Rhinoplasty', spain: '€4,000–€10,000', ukSurgery: '£8,000–£12,000', ukTotal: '£10,000–£15,000' },
  { procedure: 'Revision Rhinoplasty', spain: '€5,500–€9,000', ukSurgery: '£8,000–£12,000', ukTotal: '£10,000–£16,000' },
  { procedure: 'Preservation Rhinoplasty', spain: '€5,000–€9,000', ukSurgery: '£9,000–£14,000', ukTotal: '£11,000–£17,000' },
  { procedure: 'Ethnic Rhinoplasty', spain: '€5,500–€9,000', ukSurgery: '£6,500–£9,000', ukTotal: '£8,500–£12,000' },
  { procedure: 'Septorhinoplasty', spain: '€5,000–€8,000', ukSurgery: '£6,000–£8,000', ukTotal: '£8,000–£11,000' },
]

const packageIncludes = [
  { title: 'Pre-op Consultation', desc: 'Often with 3D imaging simulation' },
  { title: 'Medical Tests', desc: 'Blood work, ECG, comprehensive evaluation' },
  { title: 'Surgery', desc: 'Surgeon fee, anaesthesiologist, operating theatre' },
  { title: 'Hospital Stay', desc: '1 night private room (standard at premium facilities)' },
  { title: 'Post-op Care', desc: 'Medications, nasal splint, dressings' },
  { title: 'Follow-up', desc: 'Splint removal + 2-3 consultations' },
  { title: 'Coordinator', desc: 'English-speaking patient coordinator' },
  { title: 'Documentation', desc: 'All records in English' },
  { title: 'Aftercare Plan', desc: '12-month post-operative care plan' },
]

const separateCosts = [
  { item: 'Return flights', cost: '£60–£150', notes: 'Multiple daily London-Barcelona/Madrid' },
  { item: 'Hotel (5-7 nights)', cost: '£400–£700', notes: 'Clinics recommend nearby options' },
  { item: 'Travel insurance', cost: '£40–£80', notes: 'Medical tourism cover essential' },
  { item: 'Airport transfers', cost: '£40–£80', notes: 'Or arrange via clinic' },
]

const ultrasonicAdvantages = [
  { benefit: 'Minimal to no bruising', vs: 'vs extensive bruising with traditional methods' },
  { benefit: '7-day social recovery', vs: 'vs 2-3 weeks traditional' },
  { benefit: 'No nasal packing', vs: 'in most cases' },
  { benefit: 'Greater precision', vs: 'for dorsal hump reduction' },
  { benefit: 'More predictable results', vs: 'natural-looking outcomes' },
  { benefit: 'Reduced complications', vs: 'less tissue trauma' },
]

const credentials = [
  { num: '1', name: 'SECPRE', desc: 'Sociedad Española de Cirugía Plástica, Reparadora y Estética (Primary Spanish board)' },
  { num: '2', name: 'AECEP', desc: 'Asociación Española de Cirugía Estética Plástica' },
  { num: '3', name: 'EBOPRAS', desc: 'European Board of Plastic, Reconstructive and Aesthetic Surgery' },
  { num: '4', name: 'ISAPS', desc: 'International Society of Aesthetic Plastic Surgery' },
  { num: '5', name: 'European Rhinoplasty Society', desc: 'Specialist membership' },
]

const surgeons = [
  {
    name: 'Dr. Marco Romeo',
    location: 'Madrid',
    price: '€5,000–€10,000',
    details: [
      { label: 'Experience', value: 'Italian-trained, 15+ years in Spain since 2010' },
      { label: 'Specialisation', value: 'Ultrasonic rhinoplasty, preservation technique, deep plane facelift' },
      { label: 'Training', value: 'Sicily, Canniesburn Glasgow, Rotterdam, Montreux' },
      { label: 'Facilities', value: 'Ruber Internacional, Vithas La Luz' },
      { label: 'Notable', value: '5 languages, international congress speaker' },
    ],
  },
  {
    name: 'Dr. Tintoré',
    location: 'Barcelona',
    price: '€6,000–€9,000',
    details: [
      { label: 'Experience', value: '30+ years, General Hospital of Catalonia collaboration' },
      { label: 'Specialisation', value: 'Ultrasonic rhinoplasty specialist, Vaser pioneer' },
      { label: 'Credentials', value: '"Best Surgeon in Spain" 2022' },
      { label: 'Notable', value: 'One of first ultrasonic adopters in Barcelona' },
      { label: 'Aftercare', value: 'Priority post-op care for 1 year included' },
    ],
  },
  {
    name: 'Dr. Alfredo Fernández Blanco',
    location: 'Madrid / Marbella',
    price: '€3,500–€10,000',
    details: [
      { label: 'Experience', value: '30+ years nasal surgery' },
      { label: 'Specialisation', value: 'Preservation rhinoplasty, endonasal techniques, 3D imaging' },
      { label: 'Credentials', value: 'Established Clínica Fernández Blanco' },
      { label: 'Notable', value: 'Natural results focus, functional and aesthetic expertise' },
      { label: 'Facilities', value: 'Purpose-built aesthetic clinic' },
    ],
  },
  {
    name: 'Dr. Gustavo Sordo',
    location: 'Madrid',
    price: '€6,000–€9,000',
    details: [
      { label: 'Experience', value: '20+ years' },
      { label: 'Specialisation', value: 'Ultrasonic rhinoplasty pioneer in Madrid' },
      { label: 'Credentials', value: 'ASAPS certified, international training' },
      { label: 'Notable', value: 'Trains other physicians in preservation techniques' },
      { label: 'Approach', value: 'Calm and precise surgical style' },
    ],
  },
  {
    name: 'Dr. Francisco Bravo',
    location: 'Madrid',
    price: '€7,000–€10,000',
    details: [
      { label: 'Specialisation', value: 'Preservation rhinoplasty, natural-feeling results' },
      { label: 'Credentials', value: 'President of AECEP, SECPRE member' },
      { label: 'Facility', value: 'Clínica Gómez Bravo' },
      { label: 'Notable', value: 'International speaker, innovation leader' },
      { label: 'Approach', value: 'Noses that remain soft and bend naturally' },
    ],
  },
]

const tripTimeline = [
  { day: 'Day 1', desc: 'Fly to Barcelona/Madrid (2–2.5 hours from London). Transfer to hotel. Rest and acclimatise.', highlight: false },
  { day: 'Day 2', desc: 'In-person consultation with surgeon. Final 3D simulation review. Pre-operative tests. Final surgical plan confirmation.', highlight: false },
  { day: 'Day 3', desc: 'Surgery Day. 1.5–3 hours under general anaesthesia. Recovery in private room. Overnight stay with nursing care (standard in Spain).', highlight: true },
  { day: 'Day 4–7', desc: 'Hotel rest. Minimal activity, head elevated. Nasal splint in place. No nasal packing (typically with ultrasonic). Daily self-care routine.', highlight: false },
  { day: 'Day 7–10', desc: 'Splint removal. Surgeon review. Clearance to fly. Return flight home.', highlight: true },
]

const postTripRecovery = [
  { period: 'Week 2–3', desc: 'Most bruising resolved (especially with ultrasonic). Resume light activities. Work from home possible. Telemedicine follow-up.' },
  { period: 'Week 4–6', desc: 'Return to normal activities. Most swelling resolved. Can resume exercise (avoid contact sports).' },
  { period: 'Month 3–6', desc: 'Photo review consultations. 80–90% swelling resolved. Results becoming apparent.' },
  { period: 'Month 12+', desc: 'Final results visible. Complete healing. Long-term telemedicine follow-up available.' },
]

const recoveryComparison = [
  { aspect: 'Bruising', traditional: 'Extensive, 14–21 days', ultrasonic: 'Minimal to none, 5–10 days' },
  { aspect: 'Swelling', traditional: 'Peaks Day 3–4, resolves Day 12–14', ultrasonic: 'Reduced, visible improvement Day 5–7' },
  { aspect: 'Nasal packing', traditional: 'Often required', ultrasonic: 'Rarely required' },
  { aspect: 'Pain (Day 2)', traditional: 'Moderate to significant', ultrasonic: 'Mild discomfort, pressure sensation' },
  { aspect: 'Return to social activities', traditional: '2–3 weeks', ultrasonic: '7–10 days' },
  { aspect: 'Return to work', traditional: '2 weeks minimum', ultrasonic: '7–10 days possible' },
]

const recoveryTips = [
  'Book return flights for Day 8–10 for flexibility',
  'Choose hotel near clinic for convenient follow-ups',
  'Button-front clothing (avoid pulling over head)',
  'Travel pillow for semi-reclined sleeping',
  'Arrange UK pickup from airport',
  'Plan 10–14 days off work (client-facing may need longer)',
]

const redFlags = [
  'Reluctance to share credentials',
  'Prices significantly below market (under €3,000)',
  'Pressure to book quickly',
  'No revision policy in writing',
  'Surgery in non-accredited facilities',
  'No before/after portfolio for similar cases',
]

const regions = [
  {
    name: 'Madrid',
    label: 'Medical Hub',
    points: ['Highest concentration of top surgeons', 'Premium hospital infrastructure', 'Ruber Internacional, Vithas', 'More formal, business-focused'],
  },
  {
    name: 'Barcelona',
    label: 'Innovation Centre',
    points: ['Aesthetic surgery reputation', 'Clínica Planas, Clínica Birbe', 'Dr. Tintoré (ultrasonic pioneer)', 'Mediterranean lifestyle appeal'],
  },
  {
    name: 'Marbella',
    label: 'Luxury Recovery',
    points: ['Resort-style recovery experience', 'Dr. Fernández Blanco clinic', 'Growing medical tourism infrastructure', 'Combine procedure with holiday'],
  },
]

const hospitals = [
  { name: 'Ruber Internacional', desc: 'Madrid — Premium private hospital' },
  { name: 'Vithas La Luz Hospital', desc: 'Madrid — International patient focus' },
  { name: 'Quirónsalud Group', desc: "Spain's largest private healthcare group" },
  { name: 'Clínica Planas', desc: 'Barcelona — Renowned aesthetic surgery clinic' },
  { name: 'Clínica Birbe', desc: 'Barcelona — Facial surgery specialists' },
  { name: 'General Hospital of Catalonia', desc: 'Barcelona — Academic medical centre' },
]

const crossLinks = [
  { href: '/procedures/rhinoplasty/turkey', title: 'Rhinoplasty in Turkey', sub: 'From £2,450', desc: 'Higher volumes, all-inclusive packages, maximum savings' },
  { href: '/procedures/rhinoplasty', title: 'Rhinoplasty Hub', sub: '', desc: 'Compare all rhinoplasty destinations and techniques' },
  { href: '/procedures/liposuction/spain', title: 'Liposuction in Spain', sub: '', desc: 'Body contouring at premium Spanish clinics' },
  { href: '/procedures/tummy-tuck/spain', title: 'Tummy Tuck in Spain', sub: '', desc: 'Abdominoplasty with Quirónsalud hospitals' },
  { href: '/destinations/spain', title: 'Spain Destination Guide', sub: '', desc: 'Everything about medical tourism in Spain' },
  { href: '/cosmetic-surgery', title: 'All Cosmetic Surgery', sub: '', desc: 'Browse all cosmetic procedures abroad' },
]

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function RhinoplastySpainClient({ faqs }: RhinoplastySpainClientProps) {
  return (
    <div className="bg-neutral-50">

        {/* ================================================================= */}
        {/* HERO SECTION                                                      */}
        {/* ================================================================= */}
        <section className="relative overflow-hidden bg-[#0A1A2F] py-20 sm:py-28 lg:py-36">
          <m.div
            className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-primary-600/20 blur-[120px]"
            animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <m.div
            className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-rose-500/15 blur-[100px]"
            animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="mb-6 flex items-center justify-center gap-3">
                <div className="w-12 overflow-hidden rounded shadow-sm">
                  <ES title="Spain" />
                </div>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary-400">
                  Premium Destination
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Rhinoplasty in{' '}
                <span className="bg-gradient-to-r from-primary-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
                  Spain
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg font-light text-neutral-300 sm:text-xl">
                Spain: Europe&apos;s centre for advanced ultrasonic and
                preservation rhinoplasty. Experience world-class technique
                innovation with Mediterranean recovery. Compare premium surgeons
                in Barcelona, Madrid, and Marbella — save 40–60% vs UK prices.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/clinics?procedure=rhinoplasty&country=spain"
                  className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-500 hover:shadow-xl"
                >
                  Compare Premium Surgeons
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              <p className="mt-5 text-sm font-light text-neutral-400">
                WHO top 10 healthcare system • Ultrasonic specialists • EU highest
                life expectancy • 40–60% savings
              </p>

              <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                  >
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="mt-1 text-sm uppercase tracking-widest text-neutral-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* WHY SPAIN SECTION                                                 */}
        {/* ================================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp}>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">
                Why Spain
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] text-neutral-900 sm:text-5xl">
                Why UK Patients Choose Spain for Rhinoplasty
              </h2>
              <p className="mt-4 max-w-3xl text-lg font-light text-neutral-600">
                Spain represents the sophisticated choice for patients who
                prioritise technique innovation over maximum savings.
              </p>
            </m.div>

            <m.div {...fadeInUp} className="mt-10 space-y-4 text-neutral-600" data-aeo="rhinoplasty-spain-benefits">
              <p>
                Spain represents the sophisticated choice for patients who
                prioritise technique innovation over maximum savings. The
                country offers the best of both worlds: European healthcare
                excellence at significantly lower prices than the UK.
              </p>
              <p>
                Spain ranked 7th globally in the WHO World Health Report 2000
                and maintains the highest life expectancy in the EU at 84 years
                (2.9 years above the OECD average). The OECD Health at a Glance
                2026 report highlights Spain&apos;s strong preventive care and
                low avoidable mortality rates — indicators of genuine healthcare
                quality.
              </p>
              <p>
                Spanish surgeons are European leaders in ultrasonic (Piezotome)
                and preservation rhinoplasty. These advanced methods offer
                greater precision, faster recovery, and more natural results
                than traditional techniques. While other destinations may offer
                lower prices, Spain delivers technique innovation that many UK
                private clinics cannot match.
              </p>
              <p>
                With 804+ hospitals and a private healthcare sector renowned for
                excellence, Spain offers internationally accredited facilities
                including Ruber Internacional, Quirónsalud, and Vithas.
                Barcelona and Madrid are just 2–2.5 hours from London with
                multiple daily flights — close enough for weekend follow-ups if
                needed.
              </p>
            </m.div>

            <m.div {...fadeInUp} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {keyAdvantages.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-neutral-100 bg-white p-8 transition-colors hover:border-primary-100"
                >
                  <item.icon className="h-7 w-7 text-primary-600" />
                  <p className="mt-4 text-lg font-semibold text-neutral-900">{item.title}</p>
                  <p className="mt-2 text-sm text-neutral-600">{item.desc}</p>
                </div>
              ))}
            </m.div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* COST SECTION                                                      */}
        {/* ================================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp}>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">
                Pricing
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] text-neutral-900 sm:text-5xl">
                Rhinoplasty Cost in Spain vs UK: 2026 Price Comparison
              </h2>
              <p className="mt-4 max-w-3xl text-lg font-light text-neutral-600">
                Spain&apos;s pricing reflects premium-but-accessible positioning.
                Patients choosing Spain prioritise quality and technique
                innovation while still achieving significant savings.
              </p>
            </m.div>

            {/* Main Price Comparison */}
            <m.div {...fadeInUp} className="mt-12" data-aeo="rhinoplasty-spain-cost">
              <div className="overflow-hidden rounded-[3rem] bg-neutral-900 p-2 sm:p-3">
                <div className="relative overflow-hidden rounded-[2.5rem]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-rose-600/10" />
                  <div className="relative overflow-hidden rounded-3xl bg-white">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b border-neutral-100 bg-neutral-50">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                              Procedure Type
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-primary-600">
                              <div className="flex items-center gap-2">
                                <div className="w-6 overflow-hidden rounded-sm shadow-sm">
                                  <ES title="Spain" />
                                </div>
                                <span>Spain</span>
                              </div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                              <div className="flex items-center gap-2">
                                <div className="w-6 overflow-hidden rounded-sm shadow-sm">
                                  <GB title="UK" />
                                </div>
                                <span>UK (Surgery Only)</span>
                              </div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
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
                          {priceComparison.map((row, i) => (
                            <tr key={row.procedure} className={i % 2 === 1 ? 'bg-neutral-50/50' : ''}>
                              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-neutral-900">
                                {row.procedure}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600">
                                  {row.spain}
                                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                                    Save 40–60%
                                  </span>
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">
                                {row.ukSurgery}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">
                                {row.ukTotal}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center text-sm italic text-neutral-500">
                Spanish prices often include consultation and follow-up but
                exclude accommodation/flights. UK &quot;Total Est.&quot;
                includes anaesthesia, facility fees, follow-up.
              </p>
            </m.div>

            {/* What's Included */}
            <m.div {...fadeInUp} className="mt-16">
              <h3 className="text-2xl font-bold text-neutral-900">
                Surgery Package — What&apos;s Typically Included (€4,500–€7,500)
              </h3>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {packageIncludes.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[2rem] border border-neutral-100 bg-white p-8 transition-colors hover:border-primary-100"
                  >
                    <CheckCircle className="h-6 w-6 text-primary-600" />
                    <p className="mt-3 font-semibold text-neutral-900">{item.title}</p>
                    <p className="mt-1 text-sm text-neutral-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </m.div>

            {/* What Patients Pay Separately */}
            <m.div {...fadeInUp} className="mt-16">
              <h3 className="mb-6 text-2xl font-bold text-neutral-900">
                What Patients Arrange Separately
              </h3>
              <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-white">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-neutral-100 bg-neutral-50">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Item</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Estimated Cost</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {separateCosts.map((row, i) => (
                        <tr key={row.item} className={i % 2 === 1 ? 'bg-neutral-50/50' : ''}>
                          <td className="px-6 py-4 text-sm font-medium text-neutral-900">{row.item}</td>
                          <td className="px-6 py-4 text-sm text-neutral-600">{row.cost}</td>
                          <td className="px-6 py-4 text-sm text-neutral-600">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </m.div>

            <m.div {...fadeInUp} className="mt-8 rounded-[2rem] border border-primary-100 bg-primary-50/50 p-8">
              <p className="font-semibold text-neutral-900">Value Proposition</p>
              <p className="mt-2 text-neutral-600">
                Spain represents the premium European choice — 40–60% savings
                versus UK for equivalent or superior technique. Patients
                choosing Spain prioritise ultrasonic precision and preservation
                methods over maximum cost reduction.
              </p>
            </m.div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* TYPES OF RHINOPLASTY SECTION                                      */}
        {/* ================================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp}>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">
                Techniques
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] text-neutral-900 sm:text-5xl">
                Types of Rhinoplasty Performed in Spain
              </h2>
              <p className="mt-4 max-w-3xl text-lg font-light text-neutral-600">
                Spain is the technique innovation leader. Ultrasonic and
                preservation rhinoplasty are central to the Spanish approach —
                these methods are Spain&apos;s key differentiators in the European
                market.
              </p>
            </m.div>

            {/* Ultrasonic Rhinoplasty - Spain's Signature */}
            <m.div {...fadeInUp} className="mt-12" data-aeo="ultrasonic-rhinoplasty-spain">
              <div className="rounded-[2.5rem] border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-white p-8 sm:p-10">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-7 w-7 text-primary-600" />
                  <h3 className="text-2xl font-bold text-neutral-900">
                    Ultrasonic (Piezo) Rhinoplasty — Spain&apos;s Signature Technique
                  </h3>
                </div>

                <p className="mt-6 text-neutral-600">
                  Ultrasonic rhinoplasty uses a Piezotome device operating at
                  25–30 kHz to sculpt nasal bones with microscopic precision.
                  Unlike traditional hammers and chisels, ultrasonic vibrations
                  selectively cut bone while leaving soft tissue, blood vessels,
                  and mucosa completely intact.
                </p>

                <h4 className="mt-8 text-lg font-semibold text-neutral-900">
                  Why Spain Leads in Ultrasonic Technique
                </h4>
                <ul className="mt-4 space-y-3 text-neutral-600">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
                    <span>Dr. Jorge Planas (Clínica Planas, Barcelona) introduced ultrasonic rhinoplasty to Spain</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
                    <span>Spanish surgeons have refined the technique through extensive practice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
                    <span>Top Madrid and Barcelona clinics have invested in advanced Piezotome equipment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
                    <span>Training programmes attract surgeons from across Europe</span>
                  </li>
                </ul>

                <h4 className="mt-8 text-lg font-semibold text-neutral-900">
                  Key Advantages
                </h4>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {ultrasonicAdvantages.map((item) => (
                    <div key={item.benefit} className="rounded-2xl bg-white p-5 shadow-sm">
                      <p className="text-sm font-semibold text-green-700">{item.benefit}</p>
                      <p className="mt-1 text-xs text-neutral-500">{item.vs}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
                  <p className="font-semibold text-neutral-900">Ideal Candidates for Ultrasonic</p>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                      <span>Patients requiring bone work (dorsal hump, crooked nose)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                      <span>Those prioritising rapid recovery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                      <span>Revision cases requiring delicate bone manipulation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </m.div>

            {/* Preservation Rhinoplasty */}
            <m.div {...fadeInUp} className="mt-10" data-aeo="preservation-rhinoplasty-spain">
              <div className="rounded-[2.5rem] border border-neutral-100 bg-white p-8 shadow-sm sm:p-10">
                <h3 className="text-2xl font-bold text-neutral-900">
                  Preservation Rhinoplasty — The Next Evolution
                </h3>

                <p className="mt-6 text-neutral-600">
                  Preservation rhinoplasty represents the cutting edge of nasal
                  surgery philosophy. Rather than removing and reconstructing
                  nasal structures, surgeons work within the existing framework
                  to reshape from beneath.
                </p>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h4 className="font-semibold text-neutral-900">Key Principles</h4>
                    <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                        <span>Maintains nasal bridge support structures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                        <span>Reshapes bone without breaking it</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                        <span>Preserves blood supply to skin envelope</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                        <span>Reduces long-term unpredictability</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Benefits</h4>
                    <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                        <span>Results that feel natural (nose bends and moves normally)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                        <span>More stable long-term outcomes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                        <span>Reduced risk of over-correction</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                        <span>Often combined with ultrasonic technique</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-neutral-50 p-6">
                  <p className="font-semibold text-neutral-900">Spanish Preservation Experts</p>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                    <li>
                      <strong>Dr. Alfredo Fernández Blanco</strong>{' '}
                      (Madrid/Marbella): 30+ years, preservation pioneer
                    </li>
                    <li>
                      <strong>Dr. Francisco Bravo</strong> (Madrid): President
                      of Spanish Association of Aesthetic Plastic Surgery
                    </li>
                    <li>
                      <strong>Clínica Gómez Bravo</strong>: Natural-feeling
                      results emphasis
                    </li>
                  </ul>
                </div>
              </div>
            </m.div>

            {/* Open vs Closed */}
            <m.div {...fadeInUp} className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 transition-colors hover:border-primary-100">
                <h4 className="text-lg font-semibold text-neutral-900">Open Rhinoplasty</h4>
                <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Small external incision across columella</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Full visibility for complex work</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Preferred for ultrasonic technique (requires access)</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Minimal scar fades within weeks to months</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Standard approach in Spanish clinics</span></li>
                </ul>
              </div>
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 transition-colors hover:border-primary-100">
                <h4 className="text-lg font-semibold text-neutral-900">Closed Rhinoplasty</h4>
                <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>All incisions hidden inside nostrils</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Suitable for minor refinements</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Faster recovery, less swelling</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Limited application with ultrasonic technique</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Selected cases only in premium Spanish clinics</span></li>
                </ul>
              </div>
            </m.div>

            {/* Other Types */}
            <m.div {...fadeInUp} className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 transition-colors hover:border-primary-100">
                <h4 className="text-lg font-semibold text-neutral-900">Revision Rhinoplasty</h4>
                <p className="mt-2 text-sm font-semibold text-primary-600">€5,500–€9,000</p>
                <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Corrects unsatisfactory previous results</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Spanish surgeons experienced with international cases</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Ultrasonic technique valuable for scar tissue work</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Wait 12+ months after initial surgery</span></li>
                </ul>
              </div>

              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 transition-colors hover:border-primary-100">
                <h4 className="text-lg font-semibold text-neutral-900">Ethnic Rhinoplasty</h4>
                <p className="mt-2 text-sm font-semibold text-primary-600">€5,500–€9,000</p>
                <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Preserves cultural identity</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Mediterranean, Middle Eastern, African, Asian expertise</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Advanced 3D imaging for customised approach</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Preservation rhinoplasty often preferred</span></li>
                </ul>
              </div>

              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 transition-colors hover:border-primary-100">
                <h4 className="text-lg font-semibold text-neutral-900">Septorhinoplasty</h4>
                <p className="mt-2 text-sm font-semibold text-primary-600">€5,000–€8,000</p>
                <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Combines cosmetic reshaping + septal correction</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Addresses breathing difficulties</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>May qualify for partial UK insurance coverage</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Common in Spain — dual-trained surgeons</span></li>
                </ul>
              </div>
            </m.div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* HOW TO CHOOSE A SURGEON SECTION                                   */}
        {/* ================================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp}>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">
                Surgeon Selection
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] text-neutral-900 sm:text-5xl">
                How to Choose a Rhinoplasty Surgeon in Spain
              </h2>
              <p className="mt-4 max-w-3xl text-lg font-light text-neutral-600">
                Spain&apos;s premium positioning requires careful surgeon
                selection. Use this verification framework independently to build
                confidence.
              </p>
            </m.div>

            {/* Credentials */}
            <m.div {...fadeInUp} className="mt-12" data-aeo="spain-rhinoplasty-credentials">
              <h3 className="mb-6 text-2xl font-bold text-neutral-900">
                Essential Credentials to Verify
              </h3>
              <div className="rounded-[2.5rem] border border-neutral-100 bg-white p-8 shadow-sm sm:p-10">
                <p className="text-lg font-semibold text-neutral-900">
                  Board Certifications (Hierarchy of Credibility)
                </p>
                <ol className="mt-6 space-y-4">
                  {credentials.map((cred) => (
                    <li key={cred.num} className="flex items-start gap-4">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                        {cred.num}
                      </span>
                      <div>
                        <span className="font-semibold text-neutral-900">{cred.name}</span>{' '}
                        <span className="text-neutral-600">— {cred.desc}</span>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="mt-6 text-sm italic text-neutral-500">
                  How to verify: Request registration numbers. Cross-reference
                  with SECPRE directory. Spanish surgeons treating international
                  patients should provide documentation readily.
                </p>
              </div>
            </m.div>

            {/* Experience Indicators */}
            <m.div {...fadeInUp} className="mt-10">
              <h3 className="mb-6 text-2xl font-bold text-neutral-900">
                Experience Indicators
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 shadow-sm">
                  <p className="text-lg font-semibold text-neutral-900">Volume Thresholds</p>
                  <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                      <span><strong>Minimum acceptable:</strong> 100+ rhinoplasties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                      <span><strong>Experienced:</strong> 500+ rhinoplasties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                      <span><strong>Expert level:</strong> 1,000+ rhinoplasties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                      <span><strong>Ultrasonic proficiency:</strong> 200+ ultrasonic procedures</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 shadow-sm">
                  <p className="text-lg font-semibold text-neutral-900">Questions to Ask</p>
                  <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                    <li className="flex items-start gap-2">
                      <Activity className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                      <span>&quot;How many rhinoplasties do you perform annually?&quot;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Activity className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                      <span>&quot;What percentage use ultrasonic technique?&quot;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Activity className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                      <span>&quot;What is your revision rate?&quot;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Activity className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                      <span>&quot;Can you show before/after photos of similar anatomy?&quot;</span>
                    </li>
                  </ul>
                </div>
              </div>
            </m.div>

            {/* Red Flags */}
            <m.div {...fadeInUp} className="mt-10 rounded-[2rem] border border-red-200 bg-red-50 p-8">
              <p className="text-lg font-semibold text-red-800">Red Flags to Avoid</p>
              <ul className="mt-4 grid gap-3 text-sm text-red-700 sm:grid-cols-2">
                {redFlags.map((flag) => (
                  <li key={flag} className="flex items-start gap-2">
                    <Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </m.div>

            {/* Regional Considerations */}
            <m.div {...fadeInUp} className="mt-14">
              <h3 className="mb-6 text-2xl font-bold text-neutral-900">
                Regional Considerations — Madrid vs Barcelona vs Marbella
              </h3>
              <div className="grid gap-6 sm:grid-cols-3">
                {regions.map((region) => (
                  <div
                    key={region.name}
                    className="rounded-[2.5rem] border border-neutral-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary-600" />
                      <p className="text-lg font-semibold text-neutral-900">{region.name}</p>
                    </div>
                    <span className="mt-1 inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                      {region.label}
                    </span>
                    <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                      {region.points.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-sm italic text-neutral-500">
                Decision Framework: Choose Madrid for hospital-based care,
                Barcelona for aesthetic clinic innovation, Marbella for premium
                recovery experience.
              </p>
            </m.div>

            {/* Hospital Excellence */}
            <m.div {...fadeInUp} className="mt-14">
              <h3 className="mb-6 text-2xl font-bold text-neutral-900">
                Premium Hospital & Clinic Facilities
              </h3>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {hospitals.map((h) => (
                  <div
                    key={h.name}
                    className="rounded-[2rem] border border-neutral-100 bg-white p-6 transition-colors hover:border-primary-100"
                  >
                    <p className="font-semibold text-neutral-900">{h.name}</p>
                    <p className="mt-1 text-sm text-neutral-600">{h.desc}</p>
                  </div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* FEATURED SURGEONS SECTION                                         */}
        {/* ================================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp}>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">
                Top Surgeons
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] text-neutral-900 sm:text-5xl">
                Featured Rhinoplasty Surgeons in Spain
              </h2>
              <p className="mt-4 max-w-3xl text-lg font-light text-neutral-600">
                Spain&apos;s technique leadership is demonstrated by these
                ultrasonic and preservation specialists.
              </p>
            </m.div>

            <m.div {...fadeInUp} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {surgeons.map((surgeon) => (
                <div
                  key={surgeon.name}
                  className="rounded-[2.5rem] border border-neutral-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {surgeon.name}
                    </h3>
                    <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                      {surgeon.location}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-primary-600">{surgeon.price}</p>
                  <ul className="mt-5 space-y-3 text-sm text-neutral-600">
                    {surgeon.details.map((d) => (
                      <li key={d.label}>
                        <strong>{d.label}:</strong> {d.value}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* CTA Card */}
              <div className="flex items-center justify-center rounded-[2.5rem] border-2 border-dashed border-neutral-300 bg-neutral-50 p-8">
                <div className="text-center">
                  <Sparkles className="mx-auto h-8 w-8 text-primary-600" />
                  <p className="mt-4 font-semibold text-neutral-700">
                    Need help choosing a surgeon?
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">
                    Our team can match you with verified surgeons based on your
                    goals and preferred technique.
                  </p>
                  <Link
                    href="/enquiry?procedure=rhinoplasty&country=spain"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-500"
                  >
                    Get Surgeon Recommendations
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </m.div>

            <m.p {...fadeInUp} className="mt-8 text-center text-sm italic text-neutral-500">
              MeetYourClinic verifies surgeon credentials through SECPRE and AECEP
              registries. Profiles are updated quarterly. Always confirm current
              information directly with clinics.
            </m.p>
          </div>
        </section>

        {/* ================================================================= */}
        {/* PATIENT JOURNEY TIMELINE                                          */}
        {/* ================================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp}>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">
                Your Journey
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] text-neutral-900 sm:text-5xl">
                Your Rhinoplasty Journey: Step-by-Step Timeline
              </h2>
            </m.div>

            {/* Pre-Trip Phase */}
            <m.div {...fadeInUp} className="mt-12" data-aeo="rhinoplasty-spain-timeline">
              <h3 className="mb-6 text-2xl font-bold text-neutral-900">
                Pre-Trip Phase (4–12 Weeks Before)
              </h3>
              <div className="space-y-5">
                <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 transition-colors hover:border-primary-100">
                  <p className="font-semibold text-neutral-900">Week 1–2: Research & Shortlist</p>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Review surgeon portfolios focusing on technique (ultrasonic, preservation)</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Request consultations from 3–4 clinics</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Compare approach and philosophy (not just price)</span></li>
                  </ul>
                </div>
                <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 transition-colors hover:border-primary-100">
                  <p className="font-semibold text-neutral-900">Week 2–4: Consultations</p>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Video consultations with surgeons</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>3D imaging simulation where available</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Discuss technique selection and expected outcomes</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Receive detailed quotes</span></li>
                  </ul>
                </div>
                <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 transition-colors hover:border-primary-100">
                  <p className="font-semibold text-neutral-900">Week 4–6: Decision & Booking</p>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Select surgeon and clinic</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Pay deposit (typically 20–30%)</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Receive pre-operative instructions</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Book flights and accommodation</span></li>
                  </ul>
                </div>
                <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 transition-colors hover:border-primary-100">
                  <p className="font-semibold text-neutral-900">Week 6–12: Preparation</p>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Complete medical questionnaire</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Stop smoking (minimum 2–4 weeks before)</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Stop blood-thinning medications (aspirin, ibuprofen — 1 week before)</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Arrange time off work (10–14 days recommended)</span></li>
                  </ul>
                </div>
              </div>
            </m.div>

            {/* Trip Phase */}
            <m.div {...fadeInUp} className="mt-14">
              <h3 className="mb-6 text-2xl font-bold text-neutral-900">
                Trip Phase (7–10 Days in Spain)
              </h3>
              <div className="overflow-hidden rounded-[3rem] bg-neutral-900 p-2 sm:p-3">
                <div className="overflow-hidden rounded-3xl bg-white">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-neutral-100 bg-neutral-50">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Day</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">What Happens</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {tripTimeline.map((row, i) => (
                          <tr key={row.day} className={i % 2 === 1 ? 'bg-neutral-50/50' : ''}>
                            <td className={`whitespace-nowrap px-6 py-4 text-sm font-semibold ${row.highlight ? 'text-primary-600' : 'text-neutral-900'}`}>
                              {row.day}
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-600">
                              {row.highlight && row.day === 'Day 3' ? (
                                <><strong>Surgery Day.</strong> {row.desc.replace('Surgery Day. ', '')}</>
                              ) : row.highlight && row.day === 'Day 7–10' ? (
                                <><strong>Splint removal.</strong> {row.desc.replace('Splint removal. ', '')}</>
                              ) : (
                                row.desc
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </m.div>

            {/* Post-Trip Recovery */}
            <m.div {...fadeInUp} className="mt-14">
              <h3 className="mb-6 text-2xl font-bold text-neutral-900">
                Post-Trip Recovery (UK)
              </h3>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {postTripRecovery.map((item) => (
                  <div
                    key={item.period}
                    className="rounded-[2rem] border border-neutral-100 bg-white p-8 transition-colors hover:border-primary-100"
                  >
                    <p className="text-lg font-semibold text-neutral-900">{item.period}</p>
                    <p className="mt-3 text-sm text-neutral-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* RECOVERY SECTION                                                  */}
        {/* ================================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp}>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">
                Recovery
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] text-neutral-900 sm:text-5xl">
                Recovery After Rhinoplasty in Spain: What to Expect
              </h2>
            </m.div>

            {/* Ultrasonic Advantage Table */}
            <m.div {...fadeInUp} className="mt-12" data-aeo="ultrasonic-recovery-spain">
              <h3 className="mb-6 text-2xl font-bold text-neutral-900">
                The Ultrasonic Advantage — Recovery Comparison
              </h3>
              <div className="overflow-hidden rounded-[3rem] bg-neutral-900 p-2 sm:p-3">
                <div className="overflow-hidden rounded-3xl bg-white">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-neutral-100 bg-neutral-50">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Aspect</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Traditional Method</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Ultrasonic (Spain Specialist)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {recoveryComparison.map((row, i) => (
                          <tr key={row.aspect} className={i % 2 === 1 ? 'bg-neutral-50/50' : ''}>
                            <td className="px-6 py-4 text-sm font-medium text-neutral-900">{row.aspect}</td>
                            <td className="px-6 py-4 text-sm text-neutral-500">{row.traditional}</td>
                            <td className="px-6 py-4 text-sm font-semibold text-green-600">{row.ultrasonic}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </m.div>

            {/* Mediterranean Recovery Advantage */}
            <m.div {...fadeInUp} className="mt-12 rounded-[2.5rem] border border-primary-100 bg-gradient-to-br from-primary-50 to-white p-8 sm:p-10">
              <h3 className="text-xl font-semibold text-neutral-900">
                Mediterranean Recovery Advantage
              </h3>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="font-semibold text-neutral-900">Climate Benefits</p>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Mild temperatures reduce swelling-related discomfort</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Sunshine supports positive mood and healing</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Pleasant weather for light walks (encouraged)</span></li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Environment Benefits</p>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Relaxed environment reduces stress</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Quality sleep in comfortable hotel</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Dedicated recovery time away from routine</span></li>
                  </ul>
                </div>
              </div>
            </m.div>

            {/* Flying After Rhinoplasty */}
            <m.div {...fadeInUp} className="mt-10">
              <h3 className="mb-6 text-2xl font-bold text-neutral-900">
                Flying After Rhinoplasty
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 shadow-sm">
                  <Plane className="h-6 w-6 text-primary-600" />
                  <p className="mt-3 font-semibold text-neutral-900">Short-Haul Advantage</p>
                  <p className="mt-3 text-sm text-neutral-600">
                    2–2.5 hour flights to UK minimise cabin pressure effects,
                    prolonged sitting discomfort, and jet lag complications.
                    Typical clearance: Day 7–10 post-surgery.
                  </p>
                </div>
                <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 shadow-sm">
                  <Clock className="h-6 w-6 text-primary-600" />
                  <p className="mt-3 font-semibold text-neutral-900">Flight Considerations</p>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Stay hydrated</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Use saline nasal spray</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Avoid alcohol</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Book return flights for Day 8–10 for flexibility</span></li>
                  </ul>
                </div>
              </div>
            </m.div>

            {/* Recovery Tips */}
            <m.div {...fadeInUp} className="mt-10">
              <h3 className="mb-6 text-2xl font-bold text-neutral-900">Recovery Tips</h3>
              <ul className="grid gap-4 sm:grid-cols-2">
                {recoveryTips.map((tip) => (
                  <li
                    key={tip}
                    className="flex items-start gap-3 rounded-2xl border border-neutral-100 bg-white p-5"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
                    <span className="text-sm text-neutral-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </m.div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* RISKS SECTION                                                     */}
        {/* ================================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp}>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">
                Safety
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] text-neutral-900 sm:text-5xl">
                Risks and Complications: What You Should Know
              </h2>
            </m.div>

            <m.div {...fadeInUp} className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-neutral-900">General Surgical Risks</h3>
                <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                  <li className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400" /><span>Bleeding (rare, typically controlled during surgery)</span></li>
                  <li className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400" /><span>Infection (uncommon with proper care)</span></li>
                  <li className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400" /><span>Adverse reaction to anaesthesia (pre-screening minimises)</span></li>
                  <li className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400" /><span>Scarring (minimal with experienced surgeons)</span></li>
                </ul>
              </div>

              <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-neutral-900">Rhinoplasty-Specific Risks</h3>
                <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                  <li className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400" /><span>Asymmetry (8–12% experience minor degrees)</span></li>
                  <li className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400" /><span>Breathing difficulties (temporary or requiring revision)</span></li>
                  <li className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400" /><span>Numbness in nasal tip (usually temporary, 1–3 months)</span></li>
                  <li className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400" /><span>Dissatisfaction with aesthetic result</span></li>
                  <li className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400" /><span>Need for revision surgery (5–15% depending on complexity)</span></li>
                </ul>
              </div>
            </m.div>

            {/* How Ultrasonic Reduces Risk */}
            <m.div {...fadeInUp} className="mt-10 rounded-[2.5rem] border border-green-100 bg-green-50 p-8 sm:p-10">
              <h3 className="text-xl font-semibold text-neutral-900">
                How Ultrasonic Technique Reduces Risk
              </h3>
              <p className="mt-3 text-neutral-600">
                Spanish ultrasonic specialists report:
              </p>
              <ul className="mt-4 grid gap-3 text-sm text-neutral-700 sm:grid-cols-2">
                <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" /><span>Reduced bleeding due to soft tissue preservation</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" /><span>Lower infection rates with less tissue trauma</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" /><span>More predictable bone work reducing asymmetry risk</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" /><span>Faster healing minimising complication window</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" /><span>Better visualisation during surgery improving precision</span></li>
              </ul>
            </m.div>

            {/* Spain's Safety Infrastructure */}
            <m.div {...fadeInUp} className="mt-10 rounded-[2.5rem] border border-neutral-100 bg-white p-8 shadow-sm sm:p-10">
              <h3 className="text-xl font-semibold text-neutral-900">
                Spain&apos;s Safety Infrastructure
              </h3>
              <div className="mt-6 grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="font-semibold text-neutral-900">Healthcare System Quality</p>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>WHO ranked 7th globally (World Health Report 2000)</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Highest life expectancy in EU (84 years)</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>OECD highlights low avoidable mortality rates</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Strict EU regulatory framework</span></li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Hospital Standards</p>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Premium facilities meet international standards</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>24/7 emergency care available</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Board-certified anaesthesiologists</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Modern equipment and infection control</span></li>
                  </ul>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SAFETY CONCERNS SECTION                                           */}
        {/* ================================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp}>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">
                Common Questions
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] text-neutral-900 sm:text-5xl">
                Is Rhinoplasty in Spain Safe? Addressing Common Concerns
              </h2>
            </m.div>

            <m.div {...fadeInUp} className="mt-12 space-y-8">
              {/* World-Class Care */}
              <div className="rounded-[2.5rem] border border-neutral-100 bg-white p-8 shadow-sm sm:p-10">
                <h3 className="text-xl font-semibold text-neutral-900">
                  &quot;How Do I Know I&apos;m Getting World-Class Care?&quot;
                </h3>
                <p className="mt-4 text-neutral-600">
                  Spain&apos;s healthcare credentials are exceptional: WHO World
                  Health Report 2000 ranked Spain 7th globally for overall
                  health system performance. The EU&apos;s highest life
                  expectancy at 84 years reflects genuine healthcare quality.
                  OECD reports Spain performs better than average on 8/10 key
                  health indicators.
                </p>
                <div className="mt-6 rounded-2xl bg-neutral-50 p-6">
                  <p className="font-semibold text-neutral-900">Verification Steps</p>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Confirm SECPRE/AECEP board certification</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Check hospital accreditation status</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Review surgeon&apos;s ultrasonic/preservation experience</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Request testimonials from UK patients</span></li>
                  </ul>
                </div>
              </div>

              {/* Spain vs Turkey */}
              <div className="rounded-[2.5rem] border border-neutral-100 bg-white p-8 shadow-sm sm:p-10">
                <h3 className="text-xl font-semibold text-neutral-900">
                  &quot;Is Spain Worth the Premium Over Turkey?&quot;
                </h3>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-2xl bg-green-50 p-6">
                    <p className="font-semibold text-green-800">Consider Spain If</p>
                    <ul className="mt-3 space-y-2 text-sm text-green-700">
                      <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" /><span>Advanced technique is priority</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" /><span>Prefer European healthcare proximity</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" /><span>Value Mediterranean recovery environment</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" /><span>Want latest ultrasonic/preservation methods</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" /><span>Comfortable with higher investment for quality</span></li>
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-neutral-100 p-6">
                    <p className="font-semibold text-neutral-700">Spain May Not Be Right If</p>
                    <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                      <li className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400" /><span>Maximum cost savings is primary goal</span></li>
                      <li className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400" /><span>Seeking all-inclusive package (Turkey model)</span></li>
                      <li className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400" /><span>Prefer volume-focused clinic approach</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Follow-Up Care */}
              <div className="rounded-[2.5rem] border border-neutral-100 bg-white p-8 shadow-sm sm:p-10">
                <h3 className="text-xl font-semibold text-neutral-900">
                  &quot;What If I Need Follow-Up Care?&quot;
                </h3>
                <div className="mt-6 grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="font-semibold text-neutral-900">Spain Advantages</p>
                    <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                      <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>2–2.5 hour flights allow easy return visits</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Multiple daily flights from major UK airports</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Many surgeons offer long-term telemedicine</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Can return for 6-month or 12-month reviews</span></li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">UK Continuity</p>
                    <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                      <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Your UK GP for general wound care</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Surgeon available via video/email</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Detailed care instructions provided</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" /><span>Emergency protocols clearly explained</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* FAQ SECTION                                                       */}
        {/* ================================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">
                FAQ
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] text-neutral-900 sm:text-5xl">
                Frequently Asked Questions About Rhinoplasty in Spain
              </h2>
            </m.div>

            <m.div {...fadeInUp} className="mx-auto mt-12 max-w-4xl">
              <div className="rounded-[2.5rem] border border-neutral-100 bg-white p-8 shadow-xl sm:p-10">
                <FAQSection
                  faqs={faqs}
                  title="Frequently Asked Questions About Rhinoplasty in Spain"
                  className="[&_#faq-title]:sr-only"
                />
              </div>
            </m.div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* INTERNAL LINKS                                                    */}
        {/* ================================================================= */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div {...fadeInUp} className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">
                Related Guides
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight leading-[1.1] text-neutral-900 sm:text-5xl">
                Explore Other Destinations & Procedures
              </h2>
            </m.div>

            <m.div {...fadeInUp} className="mt-12 flex flex-wrap justify-center gap-5">
              {crossLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-full rounded-[2rem] border border-neutral-100 bg-white p-8 transition-all hover:-translate-y-1 hover:border-primary-100 hover:shadow-lg sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.833rem)]"
                >
                  <p className="font-semibold text-neutral-900">{link.title}</p>
                  {link.sub && (
                    <p className="mt-1 text-sm font-semibold text-primary-600">{link.sub}</p>
                  )}
                  <p className="mt-1 text-sm text-neutral-600">{link.desc}</p>
                </Link>
              ))}
            </m.div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* CTA SECTION                                                       */}
        {/* ================================================================= */}
        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-[#0A1A2F] px-8 py-20 sm:px-16 sm:py-28">
            <m.div
              className="absolute left-1/3 top-1/3 h-[400px] w-[400px] rounded-full bg-primary-600/20 blur-[100px]"
              animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            />
            <m.div
              className="absolute bottom-1/3 right-1/3 h-[300px] w-[300px] rounded-full bg-rose-500/15 blur-[80px]"
              animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative text-center">
              <m.div {...fadeInUp}>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Get Your Free Rhinoplasty Quote for{' '}
                  <span className="bg-gradient-to-r from-primary-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
                    Spain
                  </span>
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-300">
                  Compare prices and surgeons from premium clinics in Barcelona,
                  Madrid, and Marbella. Receive personalised treatment plans from
                  ultrasonic and preservation specialists — no obligation.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href="/clinics?procedure=rhinoplasty&country=spain"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#0A1A2F] shadow-lg transition-all hover:bg-neutral-100 sm:w-auto"
                  >
                    Compare Premium Surgeons
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    href="/enquiry?procedure=rhinoplasty&country=spain"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5 sm:w-auto"
                  >
                    Get Free Clinic Recommendations
                  </Link>
                </div>

                <div className="mx-auto mt-10 flex max-w-lg flex-wrap items-center justify-center gap-x-6 gap-y-3">
                  <span className="flex items-center gap-2 text-sm text-neutral-400">
                    <CheckCircle className="h-4 w-4 text-primary-400" />
                    Premium European care
                  </span>
                  <span className="flex items-center gap-2 text-sm text-neutral-400">
                    <CheckCircle className="h-4 w-4 text-primary-400" />
                    Ultrasonic specialists
                  </span>
                  <span className="flex items-center gap-2 text-sm text-neutral-400">
                    <CheckCircle className="h-4 w-4 text-primary-400" />
                    40–60% savings vs UK
                  </span>
                </div>
              </m.div>
            </div>
          </div>
        </section>

      </div>
  )
}
