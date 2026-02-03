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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white">
        <div className="absolute inset-0 bg-[url('/images/patterns/dental-pattern.svg')] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
              Dental Work Abroad: Your Complete Guide to Treatment Overseas
            </h1>
            <p className="mt-4 text-base text-primary-100 sm:mt-6 sm:text-lg lg:text-xl">
              Compare verified dental clinics across Turkey, Hungary, Poland and Spain.
              Real prices. Real reviews. No middlemen.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link href="/search?category=dental">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Browse Dental Clinics
                </Button>
              </Link>
              <Link href="#procedures">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full text-white hover:bg-white/10 sm:w-auto"
                >
                  View Procedures
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/20 pt-8 sm:mt-12 sm:grid-cols-4 sm:gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold sm:text-3xl">450+</p>
              <p className="text-xs text-primary-200 sm:text-sm">Verified Clinics</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold sm:text-3xl">12,000+</p>
              <p className="text-xs text-primary-200 sm:text-sm">Patient Reviews</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold sm:text-3xl">50–70%</p>
              <p className="text-xs text-primary-200 sm:text-sm">Average Savings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold sm:text-3xl">Free</p>
              <p className="text-xs text-primary-200 sm:text-sm">Consultation Matching</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* ===================================================================
            SECTION B: WHY UK PATIENTS CHOOSE DENTAL TREATMENT ABROAD
            =================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Why UK Patients Are Getting Dental Work Abroad
          </h2>

          <div className="mt-6 space-y-4 text-neutral-700 sm:mt-8 sm:space-y-6">
            <p className="text-base leading-relaxed sm:text-lg">
              Access to NHS dental care in the UK has reached crisis point. According to the
              British Dental Association (BDA), 95% of UK dental practices are no longer
              accepting new NHS patients in many areas. Waiting lists stretch for months, and
              even urgent appointments can be difficult to secure. For millions of people,
              private dentistry is the only realistic option — but the costs are prohibitive.
            </p>

            <p className="leading-relaxed">
              A single dental implant in the UK typically costs £2,000–£2,500. In Turkey,
              the same procedure — using premium implant brands like Straumann or Nobel
              Biocare — costs £300–£800. Veneers that cost £400–£1,000 per tooth in a UK
              private practice are available for £130–£350 abroad. These are not inferior
              treatments: the clinics are internationally accredited, the dentists are
              highly trained, and the materials are identical.
            </p>

            <p className="leading-relaxed">
              The rise of social media has accelerated awareness of dental tourism,
              particularly for cosmetic procedures. "Smile makeovers" featuring veneers
              and teeth whitening are visible across Instagram and TikTok, normalising
              the idea of travelling for dental work. However, it's important to
              distinguish between cosmetic dental tourism and patients travelling
              because they simply cannot access affordable care at home — both are
              valid, but the motivations differ.
            </p>

            <p className="leading-relaxed">
              The General Dental Council (GDC) acknowledges that patients have the right
              to seek treatment abroad. Their guidance focuses on ensuring patients make
              informed decisions: researching clinics thoroughly, understanding the risks,
              and planning for aftercare. This page is designed to help you do exactly that.
            </p>
          </div>

          {/* AI Answer Block for GEO */}
          <div className="mt-8">
            <AIAnswerBlock
              question="Why are UK patients getting dental work abroad?"
              answer="UK patients are travelling abroad for dental treatment due to the NHS dental access crisis, with 95% of practices not accepting new NHS patients. Private UK costs are prohibitive — a single implant costs £2,000–£2,500 in the UK versus £300–£800 in Turkey. Clinics abroad offer identical materials and international accreditation at 50–70% lower prices."
              entityName="Dental Tourism"
              entityType="MedicalSpecialty"
              className="dental-summary"
            />
          </div>
        </m.section>

        {/* ===================================================================
            SECTION C: POPULAR DENTAL PROCEDURES ABROAD
            =================================================================== */}
        <m.section {...fadeInUp} id="procedures" className="mb-16 scroll-mt-8 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Most Popular Dental Procedures Abroad
          </h2>
          <p className="mt-2 text-neutral-600">
            Compare UK prices with typical costs at accredited clinics abroad
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {PROCEDURES.map((procedure, index) => (
              <m.div
                key={procedure.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/procedures/${procedure.slug}/${procedure.topDestination}`}
                  className="group flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:border-primary-200 hover:shadow-md sm:p-6"
                >
                  <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-600">
                    {procedure.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-neutral-600">
                    {procedure.description}
                  </p>
                  <div className="mt-4 space-y-2 border-t border-neutral-100 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">UK Price</span>
                      <span className="font-medium text-neutral-900">
                        {procedure.ukPrice}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">Abroad</span>
                      <span className="font-semibold text-green-600">
                        {procedure.abroadPrice}
                      </span>
                    </div>
                  </div>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-600">
                    View clinics in {procedure.topDestination.charAt(0).toUpperCase() + procedure.topDestination.slice(1)} →
                  </span>
                </Link>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* ===================================================================
            SECTION D: TOP DESTINATIONS FOR DENTAL WORK
            =================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Best Countries for Dental Treatment from the UK
          </h2>
          <p className="mt-2 text-neutral-600">
            Popular destinations with accredited clinics and English-speaking staff
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6">
            {DESTINATIONS.map((destination, index) => (
              <m.div
                key={destination.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">
                      {destination.country}
                    </h3>
                    <p className="text-sm text-neutral-500">{destination.cities}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                    <Plane className="h-3 w-3" />
                    {destination.flight}
                  </div>
                </div>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  {destination.description}
                </p>
                <div className="mt-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                    Known for
                  </p>
                  <p className="mt-1 text-sm text-neutral-700">{destination.knownFor}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/procedures/dental-implants/${destination.slug}`}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
                  >
                    Dental implants in {destination.country}
                  </Link>
                  <Link
                    href={`/procedures/veneers/${destination.slug}`}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
                  >
                    Veneers in {destination.country}
                  </Link>
                </div>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* ===================================================================
            SECTION E: HOW TO CHOOSE A DENTAL CLINIC ABROAD
            =================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            How to Choose a Safe Dental Clinic Abroad
          </h2>
          <p className="mt-2 max-w-3xl text-neutral-600">
            Choosing the right clinic is the most important decision you'll make.
            Follow this framework to evaluate clinics and protect yourself.
          </p>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {CHECKLIST_ITEMS.map((item, index) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </m.div>
            ))}
          </div>

          {/* Red Flags */}
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 sm:mt-10 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">Red Flags to Watch For</h3>
                <ul className="mt-3 space-y-2">
                  {RED_FLAGS.map((flag, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-red-800"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                      {flag}
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
          <m.section {...fadeInUp} className="mb-16 sm:mb-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                  Top-Rated Dental Clinics
                </h2>
                <p className="mt-2 text-neutral-600">
                  Verified clinics with excellent patient reviews
                </p>
              </div>
              <Link href="/search?category=dental">
                <Button variant="outline">View All Dental Clinics</Button>
              </Link>
            </div>

            <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {clinics.slice(0, 8).map((clinic) => (
                <ClinicCard key={clinic.id} clinic={clinic} showEnquiryButton={false} />
              ))}
            </div>
          </m.section>
        )}

        {/* ===================================================================
            SECTION F: FAQ BLOCK
            =================================================================== */}
        <m.section {...fadeInUp} className="mb-16 sm:mb-20">
          <FAQSection faqs={faqs} title="Dental Tourism FAQ" className="faq-section" />
        </m.section>

        {/* ===================================================================
            SECTION G: CTA & CONVERSION BLOCK
            =================================================================== */}
        <m.section {...fadeInUp}>
          <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white sm:p-8 lg:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Find the Right Dental Clinic for You
              </h2>
              <p className="mt-3 text-primary-100 sm:mt-4 sm:text-lg">
                We've done the research so you don't have to. Compare verified clinics,
                see real prices, and read genuine patient reviews — all in one place.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
                <Link href="/search?category=dental">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Browse Dental Clinics
                  </Button>
                </Link>
                <Link href="/contact?procedure=dental">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full text-white hover:bg-white/10 sm:w-auto"
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
