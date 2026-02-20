'use client'

import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { ClinicCard } from '@/components/clinics/clinic-card'
import { FAQSection } from '@/components/seo/faq-section'
import { AIAnswerBlock } from '@/components/seo/ai-answer-block'
import {
  CheckCircle,
  AlertTriangle,
  Plane,
  Shield,
  Clock,
  BadgeCheck,
  FileText,
  Users,
  Star,
} from 'lucide-react'
import type { ProcedureWithStats } from '@/lib/data/content'
import type { ClinicCardData } from '@/lib/data/clinics'

// =============================================================================
// TYPES
// =============================================================================

interface DentalLandingClientProps {
  procedures: ProcedureWithStats[]
  clinics: ClinicCardData[]
  faqs: Array<{ question: string; answer: string }>
}

// =============================================================================
// STATIC DATA
// =============================================================================

const PROCEDURES = [
  {
    name: 'Dental Implants',
    slug: 'dental-implants',
    description:
      'Titanium posts surgically placed in the jawbone to replace missing teeth. Premium brands like Straumann and Nobel Biocare are standard at accredited clinics abroad.',
    ukPrice: '£2,000–£2,500',
    abroadPrice: '£300–£800',
    topDestination: 'turkey',
  },
  {
    name: 'Veneers',
    slug: 'veneers',
    description:
      'Thin porcelain shells bonded to the front of teeth to improve appearance. Popular for smile makeovers. Ensure you receive genuine veneers, not crowns marketed as veneers.',
    ukPrice: '£400–£1,000 each',
    abroadPrice: '£130–£350 each',
    topDestination: 'turkey',
  },
  {
    name: 'Crowns',
    slug: 'crowns',
    description:
      'Tooth-shaped caps placed over damaged teeth to restore strength and appearance. Made from porcelain, ceramic, or zirconia depending on position and preference.',
    ukPrice: '£500–£1,200',
    abroadPrice: '£100–£350',
    topDestination: 'hungary',
  },
  {
    name: 'All-on-4 / Full Mouth',
    slug: 'all-on-4',
    description:
      'Complete arch restoration using just four implants. A life-changing solution for patients with extensive tooth loss or failing teeth. Same-day teeth options available.',
    ukPrice: '£8,000–£15,000',
    abroadPrice: '£1,600–£3,200',
    topDestination: 'turkey',
  },
  {
    name: 'Teeth Whitening',
    slug: 'teeth-whitening',
    description:
      'Professional in-clinic whitening for dramatically brighter teeth. Often combined with other cosmetic treatments during a dental trip abroad.',
    ukPrice: '£300–£600',
    abroadPrice: '£80–£200',
    topDestination: 'poland',
  },
]

const DESTINATIONS = [
  {
    country: 'Turkey',
    slug: 'turkey',
    cities: 'Istanbul, Antalya',
    flight: '3.5–4 hours',
    description:
      'The world\'s leading dental tourism destination. Turkey combines exceptionally low prices with modern clinics and experienced dentists. Istanbul and Antalya host hundreds of international-standard dental centres.',
    knownFor: 'Implants, veneers, crowns, all-on-4, smile makeovers',
    volume: '5,700+/month searches',
  },
  {
    country: 'Hungary',
    slug: 'hungary',
    cities: 'Budapest',
    flight: '2.5 hours',
    description:
      'Europe\'s original dental tourism hub with over 30 years of experience. Budapest is known as the "dental capital of Europe" with a strong reputation for complex restorative work.',
    knownFor: 'Implants, bridges, full mouth restorations',
    volume: '200+/month searches',
  },
  {
    country: 'Poland',
    slug: 'poland',
    cities: 'Krakow, Warsaw, Gdansk',
    flight: '2.5 hours',
    description:
      'Excellent value with short flights from the UK. Polish dental schools are highly regarded, and many clinics offer English-speaking staff as standard.',
    knownFor: 'Implants, crowns, orthodontics, general dentistry',
    volume: '250+/month searches',
  },
  {
    country: 'Spain',
    slug: 'spain',
    cities: 'Barcelona, Alicante, Madrid',
    flight: '2–2.5 hours',
    description:
      'EU standards and regulations with familiar surroundings. Spain suits patients wanting quality dental work combined with a relaxed recovery in a popular holiday destination.',
    knownFor: 'Implants, cosmetic dentistry, family dental care',
    volume: '100+/month searches',
  },
]

const CHECKLIST_ITEMS = [
  {
    icon: Shield,
    title: 'Check for international accreditation',
    description:
      'Look for JCI (Joint Commission International), ISO 9001, or TEMOS certification. JCI is the gold standard — clinics must pass rigorous inspections covering patient safety, infection control, and clinical outcomes.',
  },
  {
    icon: BadgeCheck,
    title: 'Verify dentist credentials',
    description:
      'Check where the dentist trained, their years of experience, and any specialist qualifications. Many top dentists abroad trained in the UK, Germany, or the US. Ask for their professional registration details.',
  },
  {
    icon: Star,
    title: 'Read verified patient reviews',
    description:
      'Look for reviews on independent platforms, not just the clinic\'s own website. Pay attention to reviews from UK patients specifically. Check Google Reviews, Trustpilot, and dental tourism forums.',
  },
  {
    icon: FileText,
    title: 'Request a full treatment plan',
    description:
      'Before booking, get a detailed written treatment plan and itemised cost breakdown. This should include all procedures, materials used, number of appointments required, and what happens if complications arise.',
  },
  {
    icon: Clock,
    title: 'Understand the aftercare plan',
    description:
      'Ask what happens when you return to the UK. Reputable clinics have clear aftercare protocols, provide detailed documentation for your UK dentist, and offer remote consultations if needed.',
  },
  {
    icon: Users,
    title: 'Check warranty and guarantees',
    description:
      'Quality clinics offer warranties on materials and workmanship — typically 5–10 years for implants. Understand what\'s covered and how warranty claims are handled from abroad.',
  },
]

const RED_FLAGS = [
  'Pressure to book quickly without seeing a treatment plan',
  'No written quote or unclear pricing',
  'Unable to provide dentist credentials or clinic accreditation',
  'No aftercare plan or follow-up protocol',
  'Unusually low prices compared to other reputable clinics',
  'Poor or no online reviews from verified patients',
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

export function DentalLandingClient({
  procedures: dbProcedures,
  clinics,
  faqs,
}: DentalLandingClientProps) {
  return (
    <>
      {/* ===================================================================
          SECTION A: HERO
          =================================================================== */}
      <section className="relative overflow-hidden bg-[#0A1A2F] text-white">
        {/* Abstract Premium Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-[#0A1A2F] to-primary-950/80" />
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary-600/20 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/images/patterns/dental-pattern.svg')] opacity-5 mix-blend-overlay" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <m.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Dental Work Abroad: <br/>
              <span className="bg-gradient-to-r from-blue-200 to-primary-200 bg-clip-text text-transparent font-light">Your Complete Guide to Treatment Overseas</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl lg:text-2xl leading-relaxed font-light">
              Compare verified dental clinics across Turkey, Hungary, Poland and Spain.
              Real prices. Real reviews. No middlemen.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/clinics/dental">
                <Button size="lg" className="w-full sm:w-auto bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base shadow-xl shadow-white/10">
                  Browse Dental Clinic Directory
                </Button>
              </Link>
              <Link href="/search?category=dental">
                <Button size="lg" className="w-full sm:w-auto bg-primary-600/20 text-white border border-primary-500/30 hover:bg-primary-600/30 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base backdrop-blur-md">
                  Browse Dental Clinics
                </Button>
              </Link>
              <Link href="#procedures">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full text-neutral-300 hover:text-white hover:bg-white/5 sm:w-auto rounded-full transition-all duration-300"
                >
                  View Procedures
                </Button>
              </Link>
            </div>
          </m.div>

          {/* Premium Glassmorphism Trust Bar */}
          <m.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-16 sm:mt-24 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-8 divide-x divide-white/10 sm:grid-cols-4">
              <div className="text-center px-4">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl text-white">450+</p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-primary-200/80">Verified Clinics</p>
              </div>
              <div className="text-center px-4">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl text-white">12,000+</p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-primary-200/80">Patient Reviews</p>
              </div>
              <div className="text-center px-4">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl text-white">50–70%</p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-primary-200/80">Average Savings</p>
              </div>
              <div className="text-center px-4 border-l border-white/10 sm:border-l">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl text-white">Free</p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-primary-200/80">Consultation Matching</p>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* ===================================================================
            SECTION B: WHY UK PATIENTS CHOOSE DENTAL TREATMENT ABROAD
            =================================================================== */}
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <span className="text-sm font-bold tracking-widest text-primary-600 uppercase">The Reality</span>
              <h2 className="mt-4 text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight">
                Why UK Patients Are Getting Dental Work Abroad
              </h2>
            </div>

            <div className="mt-8 lg:col-span-7 lg:mt-0">
              <div className="text-neutral-600">
                <p className="text-xl sm:text-2xl font-medium leading-relaxed text-neutral-900 tracking-tight">
                  Access to NHS dental care in the UK has reached crisis point. According to the
                  British Dental Association (BDA), 95% of UK dental practices are no longer
                  accepting new NHS patients in many areas. Waiting lists stretch for months, and
                  even urgent appointments can be difficult to secure. For millions of people,
                  private dentistry is the only realistic option — but the costs are prohibitive.
                </p>

                <p className="mt-8 text-lg leading-relaxed">
                  A single dental implant in the UK typically costs £2,000–£2,500. In Turkey,
                  the same procedure — using premium implant brands like Straumann or Nobel
                  Biocare — costs £300–£800. Veneers that cost £400–£1,000 per tooth in a UK
                  private practice are available for £130–£350 abroad. These are not inferior
                  treatments: the clinics are internationally accredited, the dentists are
                  highly trained, and the materials are identical.
                </p>

                <div className="my-10 border-l-[3px] border-primary-500 bg-gradient-to-r from-primary-50/80 to-transparent p-8 rounded-r-2xl">
                  <p className="text-lg italic leading-relaxed text-neutral-800">
                    The rise of social media has accelerated awareness of dental tourism,
                    particularly for cosmetic procedures. "Smile makeovers" featuring veneers
                    and teeth whitening are visible across Instagram and TikTok, normalising
                    the idea of travelling for dental work. However, it's important to
                    distinguish between cosmetic dental tourism and patients travelling
                    because they simply cannot access affordable care at home — both are
                    valid, but the motivations differ.
                  </p>
                </div>

                <p className="text-lg leading-relaxed">
                  The General Dental Council (GDC) acknowledges that patients have the right
                  to seek treatment abroad. Their guidance focuses on ensuring patients make
                  informed decisions: researching clinics thoroughly, understanding the risks,
                  and planning for aftercare. This page is designed to help you do exactly that.
                </p>
              </div>

              {/* AI Answer Block for GEO */}
              <div className="mt-12 rounded-2xl overflow-hidden shadow-sm border border-neutral-100 bg-white hover:shadow-md transition-shadow">
                <AIAnswerBlock
                  question="Why are UK patients getting dental work abroad?"
                  answer="UK patients are travelling abroad for dental treatment due to the NHS dental access crisis, with 95% of practices not accepting new NHS patients. Private UK costs are prohibitive — a single implant costs £2,000–£2,500 in the UK versus £300–£800 in Turkey. Clinics abroad offer identical materials and international accreditation at 50–70% lower prices."
                  entityName="Dental Tourism"
                  entityType="MedicalSpecialty"
                  className="dental-summary border-none bg-neutral-50/50"
                />
              </div>
            </div>
          </div>
        </m.section>

        {/* ===================================================================
            SECTION C: POPULAR DENTAL PROCEDURES ABROAD
            =================================================================== */}
        <m.section {...fadeInUp} id="procedures" className="mb-24 scroll-mt-24 sm:mb-32">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl tracking-tight">
              Most Popular Dental Procedures Abroad
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Compare UK prices with typical costs at accredited clinics abroad. We've analysed thousands of quotes to bring you accurate pricing.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROCEDURES.map((procedure, index) => {
              const hasLandingPage = ['dental-implants', 'veneers'].includes(procedure.slug)
              const linkHref = hasLandingPage
                ? `/procedures/${procedure.slug}/${procedure.topDestination}`
                : `/search?procedure=${procedure.slug}&country=${procedure.topDestination}`

              return (
                <m.div
                  key={procedure.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={linkHref}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/60 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-900/5"
                  >
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary-50 to-primary-100/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-2xl" />
                    
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-neutral-900 transition-colors group-hover:text-primary-700">
                        {procedure.name}
                      </h3>
                      <p className="mt-3 flex-1 text-sm text-neutral-600 leading-relaxed">
                        {procedure.description}
                      </p>
                    </div>

                    <div className="relative z-10 mt-6 space-y-3 rounded-xl bg-neutral-50 p-4 border border-neutral-100">
                      <div className="flex justify-between text-sm items-center">
                        <span className="font-medium text-neutral-500">UK Price</span>
                        <span className="font-semibold text-neutral-900">
                          {procedure.ukPrice}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm items-center border-t border-neutral-200/60 pt-3">
                        <span className="font-medium text-neutral-500">Abroad</span>
                        <span className="text-lg font-bold text-green-600">
                          {procedure.abroadPrice}
                        </span>
                      </div>
                    </div>
                    
                    <span className="relative z-10 mt-6 inline-flex items-center text-sm font-semibold text-primary-600 transition-colors group-hover:text-primary-800">
                      View clinics in {procedure.topDestination.charAt(0).toUpperCase() + procedure.topDestination.slice(1)} 
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </Link>
                </m.div>
              )
            })}
          </div>
        </m.section>

        {/* ===================================================================
            SECTION D: TOP DESTINATIONS FOR DENTAL WORK
            =================================================================== */}
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="max-w-2xl text-center mx-auto">
            <span className="text-sm font-bold tracking-widest text-primary-600 uppercase">Destinations</span>
            <h2 className="mt-4 text-3xl font-bold text-neutral-900 sm:text-4xl tracking-tight">
              Best Countries for Dental Treatment from the UK
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Popular destinations with internationally accredited clinics, state-of-the-art facilities, and English-speaking staff
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {DESTINATIONS.map((destination, index) => (
              <m.div
                key={destination.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-900/5 hover:-translate-y-1 hover:border-primary-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-neutral-900 tracking-tight transition-colors group-hover:text-primary-700">
                      {destination.country}
                    </h3>
                    <p className="mt-1 text-sm font-medium uppercase tracking-wider text-neutral-500">{destination.cities}</p>
                  </div>
                  <div className="relative z-10 flex w-fit items-center gap-2 rounded-full border border-primary-100 bg-primary-50/50 px-4 py-2 text-sm font-semibold text-primary-800">
                    <Plane className="h-4 w-4 text-primary-600" />
                    {destination.flight}
                  </div>
                </div>

                <div className="relative z-10 mt-6 border-t border-neutral-100 pt-6">
                  <p className="text-base text-neutral-600 leading-relaxed">
                    {destination.description}
                  </p>
                </div>
                
                <div className="relative z-10 mt-6 rounded-xl bg-neutral-50 p-5 border border-neutral-100/50">
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                    Known for
                  </p>
                  <p className="mt-2 text-neutral-800 font-medium leading-relaxed">{destination.knownFor}</p>
                </div>
                
                <div className="relative z-10 mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/procedures/dental-implants/${destination.slug}`}
                    className="flex-1 text-center rounded-xl bg-neutral-100/80 px-4 py-3 text-sm font-semibold text-neutral-700 transition-all hover:bg-primary-600 hover:text-white"
                  >
                    Dental implants in {destination.country}
                  </Link>
                  <Link
                    href={`/procedures/veneers/${destination.slug}`}
                    className="flex-1 text-center rounded-xl bg-neutral-100/80 px-4 py-3 text-sm font-semibold text-neutral-700 transition-all hover:bg-primary-600 hover:text-white"
                  >
                    Veneers in {destination.country}
                  </Link>
                </div>

                <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-tl from-primary-100 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-2xl pointer-events-none" />
              </m.div>
            ))}
          </div>
        </m.section>

        {/* ===================================================================
            SECTION E: HOW TO CHOOSE A DENTAL CLINIC ABROAD
            =================================================================== */}
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl tracking-tight">
              How to Choose a Safe Dental Clinic Abroad
            </h2>
            <p className="mt-6 text-lg text-neutral-600">
              Choosing the right clinic is the most important decision you'll make.
              Follow this framework to evaluate clinics and protect yourself.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CHECKLIST_ITEMS.map((item, index) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200/50 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-900/5"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100/50 text-primary-600 shadow-inner group-hover:from-primary-100 group-hover:to-primary-200 transition-colors duration-300">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
                <div className="absolute top-0 right-0 -mr-6 -mt-6 h-24 w-24 rounded-full bg-primary-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-xl pointer-events-none" />
              </m.div>
            ))}
          </div>

          {/* Premium Red Flags */}
          <div className="mt-12 rounded-2xl border border-rose-200/60 bg-gradient-to-br from-rose-50/50 to-white p-8 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-rose-100/50 blur-3xl pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-rose-900 tracking-tight">Red Flags to Watch For</h3>
                <p className="mt-2 text-rose-700/80">If you encounter any of these, proceed with extreme caution or look elsewhere.</p>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {RED_FLAGS.map((flag, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 rounded-lg bg-white/60 p-4 border border-rose-100 shadow-sm"
                    >
                      <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 font-bold text-xs">!</span>
                      <span className="text-sm font-medium text-rose-900 leading-relaxed">{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </m.section>

        {/* ===================================================================
            TOP DENTAL CLINICS
            =================================================================== */}
        {clinics.length > 0 && (
          <m.section {...fadeInUp} className="mb-24 sm:mb-32">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-neutral-200/60 pb-6">
              <div>
                <span className="text-sm font-bold tracking-widest text-primary-600 uppercase">Featured</span>
                <h2 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl tracking-tight">
                  Top-Rated Dental Clinics
                </h2>
                <p className="mt-3 text-lg text-neutral-600">
                  Verified clinics with excellent patient reviews
                </p>
              </div>
              <Link href="/search?category=dental">
                <Button variant="outline" className="group rounded-full border-neutral-300 hover:bg-neutral-50 hover:text-primary-700 transition-all duration-300">
                  View All Dental Clinics <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {clinics.slice(0, 8).map((clinic) => (
                <div key={clinic.id} className="transition-all duration-500 hover:-translate-y-1">
                  <ClinicCard clinic={clinic} showEnquiryButton={false} />
                </div>
              ))}
            </div>
          </m.section>
        )}

        {/* ===================================================================
            SECTION F: FAQ BLOCK
            =================================================================== */}
        <m.section {...fadeInUp} className="mb-24 sm:mb-32">
          <div className="mx-auto max-w-4xl">
            <FAQSection faqs={faqs} title="Dental Tourism FAQ" className="faq-section" />
          </div>
        </m.section>

        {/* ===================================================================
            SECTION G: CTA & CONVERSION BLOCK
            =================================================================== */}
        <m.section {...fadeInUp} className="pb-12">
          <div className="relative overflow-hidden rounded-3xl bg-[#0A1A2F] p-8 text-white sm:p-12 lg:p-20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-blue-600/20" />
            <div className="absolute -left-1/4 -top-1/4 h-full w-full rounded-full bg-primary-500/10 blur-[120px]" />
            <div className="absolute -bottom-1/4 -right-1/4 h-full w-full rounded-full bg-blue-500/10 blur-[120px]" />
            <div className="absolute inset-0 bg-[url('/images/patterns/dental-pattern.svg')] opacity-5 mix-blend-overlay" />
            
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <span className="text-sm font-bold tracking-widest text-primary-200/80 uppercase mb-4 block">Take the next step</span>
              <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl tracking-tight">
                Find the Right Dental Clinic for You
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl lg:text-2xl font-light leading-relaxed">
                We've done the research so you don't have to. Compare verified clinics,
                see real prices, and read genuine patient reviews — all in one place.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/search?category=dental">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base shadow-xl shadow-white/10">
                    Browse Dental Clinics
                  </Button>
                </Link>
                <Link href="/contact?procedure=dental">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-full px-8 text-base backdrop-blur-md"
                  >
                    Get Free Clinic Recommendations
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </m.section>
      </div>
    </>
  )
}
