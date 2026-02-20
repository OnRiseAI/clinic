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
  ArrowRight,
  Scissors,
  Sparkles,
  Syringe,
  Package,
  Hotel,
  Car,
  Heart,
  Sun,
  Eye,
  Calendar,
} from 'lucide-react'
import { TR } from 'country-flag-icons/react/3x2'

// =============================================================================
// TYPES
// =============================================================================

interface HairTransplantClientProps {
  faqs: Array<{ question: string; answer: string }>
}

// =============================================================================
// STATIC DATA — HERO STATS
// =============================================================================

const HERO_STATS = [
  { value: '750,000+', label: 'Procedures annually' },
  { value: '#1', label: 'World destination' },
  { value: '£1,500', label: 'Starting price' },
  { value: '95%', label: 'Success rate' },
]

// =============================================================================
// STATIC DATA — WHY TURKEY LEADS
// =============================================================================

const WHY_TURKEY_FACTS = [
  {
    title: 'World leader in hair transplants',
    description:
      'Turkey performs over 750,000 hair transplant procedures annually, more than any other country. Decades of specialisation have created an unrivalled ecosystem of skilled surgeons, advanced technology, and streamlined patient care.',
  },
  {
    title: 'Highly competitive market drives quality',
    description:
      'With hundreds of clinics competing for international patients, standards are continuously pushed higher. Clinics invest in the latest techniques — FUE, DHI, sapphire — and state-of-the-art facilities to differentiate themselves.',
  },
  {
    title: 'All-inclusive packages are standard',
    description:
      'Turkish clinics pioneered the all-inclusive model: procedure, hotel, airport transfers, aftercare kit, and follow-up support bundled into one transparent price. No hidden costs, no surprise bills.',
  },
]

// =============================================================================
// STATIC DATA — TECHNIQUES
// =============================================================================

const TECHNIQUES = [
  {
    name: 'FUE (Follicular Unit Extraction)',
    price: '£1,500–£2,500',
    grafts: '3,000–5,000 grafts typical',
    description:
      'Individual follicular units extracted one by one using a micro-punch tool. The gold standard for hair transplants with minimal scarring and natural-looking results.',
    highlight: 'Minimal scarring',
    icon: Scissors,
  },
  {
    name: 'DHI (Direct Hair Implantation)',
    price: '£2,000–£3,500',
    grafts: 'Denser results possible',
    description:
      'Uses a Choi implanter pen to extract and implant follicles in one step — no pre-made channels required. The surgeon controls angle, depth, and direction in real time for denser packing.',
    highlight: 'Higher graft survival',
    icon: Syringe,
  },
  {
    name: 'Sapphire FUE',
    price: '£1,800–£3,000',
    grafts: 'Faster healing',
    description:
      'FUE performed with sapphire-tipped blades instead of steel. Creates finer, smoother incisions that heal faster with less scabbing and reduced tissue trauma.',
    highlight: 'Less scabbing',
    icon: Sparkles,
  },
  {
    name: 'Stem Cell / PRP Enhanced',
    price: '£2,500–£4,000',
    grafts: 'Enhanced graft survival',
    description:
      'Hair transplant combined with PRP (Platelet-Rich Plasma) therapy to boost graft survival and accelerate healing. Growth factors from your own blood stimulate follicle regeneration.',
    highlight: 'Enhanced recovery',
    icon: Heart,
  },
]

// =============================================================================
// STATIC DATA — COST COMPARISON
// =============================================================================

const COST_COMPARISON = [
  {
    procedure: 'FUE (3,000 grafts)',
    turkey: '£1,500–£2,500',
    uk: '£8,000–£12,000',
  },
  {
    procedure: 'DHI (3,000 grafts)',
    turkey: '£2,000–£3,500',
    uk: '£10,000–£15,000',
  },
  {
    procedure: 'Sapphire FUE',
    turkey: '£1,800–£3,000',
    uk: '£9,000–£13,000',
  },
  {
    procedure: 'PRP Session',
    turkey: '£150–£300',
    uk: '£500–£1,000',
  },
]

// =============================================================================
// STATIC DATA — PACKAGE INCLUSIONS
// =============================================================================

const PACKAGE_INCLUSIONS = [
  { icon: Shield, label: 'Pre-op blood tests & consultation' },
  { icon: Scissors, label: 'Hair transplant procedure' },
  { icon: Hotel, label: 'Hotel accommodation (3–5 nights)' },
  { icon: Car, label: 'Airport transfers' },
  { icon: Syringe, label: 'PRP treatment' },
  { icon: Package, label: 'Aftercare kit (shampoo, lotion, medications)' },
  { icon: Heart, label: 'Follow-up support' },
]

// =============================================================================
// STATIC DATA — RECOVERY TIMELINE
// =============================================================================

const RECOVERY_TIMELINE = [
  {
    step: 1,
    period: 'Day 1–3',
    title: 'Procedure & initial recovery',
    description:
      'The transplant takes 6–10 hours depending on graft count. Rest at the hotel with head elevated. Mild swelling and redness are normal. Avoid touching the recipient area.',
  },
  {
    step: 2,
    period: 'Week 1–2',
    title: 'Scabs fall off, avoid sun',
    description:
      'First wash at the clinic on day 2–3. Scabs gradually shed over 10–14 days. Avoid direct sunlight, strenuous exercise, and swimming. Sleep on your back with a travel pillow.',
  },
  {
    step: 3,
    period: 'Month 1–3',
    title: 'Shock loss (normal), new growth begins',
    description:
      'Transplanted hairs shed — this is completely normal and expected. New follicles enter a resting phase before regrowth begins around month 3. Patience is essential.',
  },
  {
    step: 4,
    period: 'Month 6–9',
    title: 'Significant growth visible',
    description:
      'Noticeable new hair growth with improving density. Hair texture may differ initially but normalises over time. Most patients see meaningful results by month 8.',
  },
  {
    step: 5,
    period: 'Month 12–18',
    title: 'Final results',
    description:
      'Full density achieved. Hair grows naturally and can be cut, styled, and treated like your own hair. Transplanted follicles are permanent and resistant to DHT-related loss.',
  },
]

// =============================================================================
// STATIC DATA — NORWOOD SCALE / GRAFT GUIDE
// =============================================================================

const NORWOOD_GUIDE = [
  {
    stage: 'Norwood 2',
    description: 'Receding hairline',
    grafts: '1,500–2,500 grafts',
  },
  {
    stage: 'Norwood 3',
    description: 'Visible recession',
    grafts: '2,500–3,500 grafts',
  },
  {
    stage: 'Norwood 4',
    description: 'Significant loss',
    grafts: '3,000–4,500 grafts',
  },
  {
    stage: 'Norwood 5–6',
    description: 'Extensive loss',
    grafts: '4,000–6,000+ grafts',
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

export function HairTransplantClient({ faqs }: HairTransplantClientProps) {
  return (
    <>
      {/* =====================================================================
          HERO SECTION
          ===================================================================== */}
      <section className="relative overflow-hidden bg-[#0A1A2F] text-white">
        <m.div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <m.div
          className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <m.div
          className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm"
            >
              <TR className="h-4 w-5 rounded-sm" />
              <span className="text-sm font-medium text-white/80">
                Turkey — World Leader in Hair Transplants
              </span>
            </m.div>

            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight leading-[1.1] sm:text-5xl lg:text-6xl"
            >
              <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                Hair Transplant
              </span>{' '}
              <span className="bg-gradient-to-r from-primary-400 to-emerald-400 bg-clip-text text-transparent">
                Abroad
              </span>
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg font-light text-white/70 sm:text-xl"
            >
              Turkey is the world leader in hair transplants — 750,000+ procedures annually.
              Save 50–80% on FUE, DHI, and sapphire techniques at verified clinics with
              all-inclusive packages.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <Link href="/search?procedure=hair-transplant">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Verified Clinics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#techniques">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-white/20 text-white hover:bg-white/10 sm:w-auto"
                >
                  Compare Techniques
                </Button>
              </Link>
            </m.div>
          </div>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {HERO_STATS.map((stat, index) => (
              <m.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="rounded-2xl bg-white/5 p-5 text-center backdrop-blur-md border border-white/10"
              >
                <p className="text-2xl font-bold sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm font-light text-white/60">{stat.label}</p>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* =====================================================================
          SECTION A: WHY TURKEY LEADS
          ===================================================================== */}
      <m.section {...fadeInUp} className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">
                Why Turkey
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight leading-[1.1] text-neutral-900 sm:text-4xl">
                Why Turkey Leads the World in Hair Transplants
              </h2>
              <p className="mt-4 font-light text-neutral-600">
                Turkey dominates the global hair transplant market with over 750,000 procedures
                annually. The combination of world-class surgeons, advanced techniques like FUE,
                DHI, and sapphire, and unbeatable value makes it the top choice for patients worldwide.
              </p>
              <p className="mt-3 text-sm font-light text-neutral-500">
                Also available in Hungary, Poland, and Spain — but Turkey remains the primary
                destination by a significant margin.
              </p>
            </div>

            <div className="space-y-6">
              {WHY_TURKEY_FACTS.map((fact, index) => (
                <m.div
                  key={fact.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-[2rem] border border-neutral-100 bg-white p-6 hover:border-primary-100 transition-colors sm:p-8"
                >
                  <h3 className="text-lg font-bold text-neutral-900">{fact.title}</h3>
                  <p className="mt-3 font-light text-neutral-600 leading-relaxed">
                    {fact.description}
                  </p>
                </m.div>
              ))}

              <div className="rounded-[2rem] border border-primary-200 bg-primary-50 p-6 sm:p-8">
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
                  <div>
                    <h3 className="font-bold text-primary-900">Quality assurance</h3>
                    <p className="mt-2 text-sm font-light text-primary-800 leading-relaxed">
                      MeetYourClinic only lists verified, accredited clinics with transparent
                      pricing and proven track records. Every clinic undergoes our verification
                      process before being listed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </m.section>

      {/* =====================================================================
          SECTION B: TECHNIQUES COMPARED
          ===================================================================== */}
      <m.section {...fadeInUp} id="techniques" className="scroll-mt-8 bg-neutral-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">
              Techniques
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight leading-[1.1] text-neutral-900 sm:text-4xl">
              Hair Transplant Techniques Compared
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-light text-neutral-600">
              Each technique has its strengths. Your surgeon will recommend the best approach
              based on your hair loss pattern, donor density, and goals.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {TECHNIQUES.map((technique, index) => (
              <m.div
                key={technique.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-[2.5rem] border border-neutral-100 bg-white p-6 hover:border-primary-100 transition-colors sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <technique.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">{technique.name}</h3>
                    <p className="text-sm text-primary-600">{technique.price}</p>
                  </div>
                </div>
                <p className="mt-4 font-light text-neutral-600 leading-relaxed">
                  {technique.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                    {technique.highlight}
                  </span>
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600">
                    {technique.grafts}
                  </span>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </m.section>

      {/* =====================================================================
          SECTION C: COST COMPARISON
          ===================================================================== */}
      <m.section {...fadeInUp} id="pricing" className="scroll-mt-8 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[3rem] bg-neutral-900 p-6 sm:p-10 lg:p-14">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-400">
                Pricing
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight leading-[1.1] text-white sm:text-4xl">
                Turkey vs UK: Cost Comparison
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-light text-neutral-400">
                All prices in GBP (£). Turkey prices are for all-inclusive packages including
                hotel, transfers, and aftercare.
              </p>
            </div>

            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-4 text-left font-bold text-white">Procedure</th>
                    <th className="px-4 py-4 text-left font-bold text-white">
                      <div className="flex items-center gap-2">
                        <TR className="h-3.5 w-5 rounded-sm" />
                        Turkey
                      </div>
                    </th>
                    <th className="px-4 py-4 text-left font-bold text-white">UK</th>
                    <th className="px-4 py-4 text-left font-bold text-white">Savings</th>
                  </tr>
                </thead>
                <tbody>
                  {COST_COMPARISON.map((row, index) => (
                    <tr
                      key={row.procedure}
                      className={index < COST_COMPARISON.length - 1 ? 'border-b border-white/5' : ''}
                    >
                      <td className="px-4 py-4 font-medium text-white">{row.procedure}</td>
                      <td className="px-4 py-4 font-medium text-emerald-400">{row.turkey}</td>
                      <td className="px-4 py-4 text-neutral-400">{row.uk}</td>
                      <td className="px-4 py-4">
                        <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                          60–80%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <div className="rounded-2xl bg-emerald-500/10 px-6 py-3 border border-emerald-500/20">
                <p className="text-center text-sm font-medium text-emerald-400 sm:text-left">
                  Save £6,000–£12,000 (60–80%) compared to UK prices
                </p>
              </div>
              <p className="text-xs text-neutral-500">
                Prices include hotel, transfers, and aftercare kit
              </p>
            </div>
          </div>
        </div>
      </m.section>

      {/* =====================================================================
          SECTION D: WHAT'S INCLUDED
          ===================================================================== */}
      <m.section {...fadeInUp} className="bg-neutral-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">
              All-Inclusive
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight leading-[1.1] text-neutral-900 sm:text-4xl">
              What&apos;s Included in Your Package
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-light text-neutral-600">
              Turkish clinics set the standard for all-inclusive hair transplant packages.
              One price covers everything — no hidden fees.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PACKAGE_INCLUSIONS.map((item, index) => (
              <m.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 rounded-[2rem] border border-neutral-100 bg-white p-5 hover:border-primary-100 transition-colors"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="font-light text-neutral-700">{item.label}</p>
              </m.div>
            ))}
          </div>
        </div>
      </m.section>

      {/* =====================================================================
          SECTION E: RECOVERY TIMELINE
          ===================================================================== */}
      <m.section {...fadeInUp} className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">
              Recovery
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight leading-[1.1] text-neutral-900 sm:text-4xl">
              Recovery Timeline
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-light text-neutral-600">
              Hair transplant recovery is gradual. Patience is essential — final results
              take 12–18 months but the journey is worth it.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl space-y-0">
            {RECOVERY_TIMELINE.map((phase, index) => (
              <m.div
                key={phase.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex gap-6"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                    {phase.step}
                  </div>
                  {index < RECOVERY_TIMELINE.length - 1 && (
                    <div className="w-px flex-1 bg-primary-200" />
                  )}
                </div>
                <div className="pb-10">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">
                    {phase.period}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-neutral-900">{phase.title}</h3>
                  <p className="mt-2 font-light text-neutral-600 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </m.section>

      {/* =====================================================================
          SECTION F: NORWOOD SCALE / GRAFT GUIDE
          ===================================================================== */}
      <m.section {...fadeInUp} className="bg-neutral-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">
              Graft Guide
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight leading-[1.1] text-neutral-900 sm:text-4xl">
              How Many Grafts Do You Need?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-light text-neutral-600">
              Graft requirements depend on the Norwood scale classification of your hair loss.
              A consultation with photos will provide an accurate estimate.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
            {NORWOOD_GUIDE.map((item, index) => (
              <m.div
                key={item.stage}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2rem] border border-neutral-100 bg-white p-6 hover:border-primary-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-neutral-900">{item.stage}</h3>
                  <span className="rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
                    {item.grafts}
                  </span>
                </div>
                <p className="mt-2 text-sm font-light text-neutral-500">{item.description}</p>
              </m.div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm font-light text-neutral-500 italic">
            Graft counts are estimates. Overharvesting can thin the donor area — reputable
            clinics assess donor capacity and recommend a safe graft count during consultation.
          </p>
        </div>
      </m.section>

      {/* =====================================================================
          SECTION G: FAQ
          ===================================================================== */}
      <m.section {...fadeInUp} className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FAQSection
            faqs={faqs}
            title="Frequently Asked Questions About Hair Transplants Abroad"
            className="faq-section"
          />
        </div>
      </m.section>

      {/* =====================================================================
          SECTION H: CTA
          ===================================================================== */}
      <m.section {...fadeInUp} className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-[#0A1A2F] p-8 sm:p-12 lg:p-16">
          <m.div
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <m.div
            className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex items-center gap-2">
              <TR className="h-5 w-6 rounded-sm" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight leading-[1.1] text-white sm:text-4xl">
              Ready to Restore Your Hair in{' '}
              <span className="bg-gradient-to-r from-primary-400 to-emerald-400 bg-clip-text text-transparent">
                Turkey
              </span>
              ?
            </h2>

            <p className="mt-4 font-light text-white/70">
              Compare verified clinics, real prices, and patient reviews.
              Get matched with the best clinic for your needs — no obligation, no booking fees.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link href="/search?procedure=hair-transplant">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Hair Transplant Clinics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact?procedure=hair-transplant">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-white/20 text-white hover:bg-white/10 sm:w-auto"
                >
                  Get Free Recommendations
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                Verified clinics
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                Real prices
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                No booking fees
              </span>
            </div>
          </div>
        </div>
      </m.section>

      {/* =====================================================================
          INTERNAL LINKS — CLUSTER CONNECTIONS
          ===================================================================== */}
      <m.section
        {...fadeInUp}
        className="mx-auto max-w-7xl border-t border-neutral-200 px-4 py-8 sm:px-6 lg:px-8"
      >
        <p className="text-sm text-neutral-600">
          <strong>Related pages:</strong>{' '}
          <Link href="/destinations/turkey" className="text-primary-600 hover:underline">
            Turkey destination guide
          </Link>{' '}
          ·{' '}
          <Link href="/procedures/rhinoplasty" className="text-primary-600 hover:underline">
            Rhinoplasty abroad
          </Link>{' '}
          ·{' '}
          <Link href="/destinations/hungary" className="text-primary-600 hover:underline">
            Hungary destination guide
          </Link>{' '}
          ·{' '}
          <Link href="/destinations/poland" className="text-primary-600 hover:underline">
            Poland destination guide
          </Link>
        </p>
      </m.section>
    </>
  )
}
