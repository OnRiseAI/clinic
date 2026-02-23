'use client'

import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { ClinicCard } from '@/components/clinics/clinic-card'
import { DestinationCostTable } from '@/components/content/cost-comparison-widget'
import { FAQAccordion, DESTINATION_FAQS } from '@/components/content/faq-accordion'
import type { Destination, ProcedureWithStats } from '@/lib/data/content'
import type { ClinicCardData } from '@/lib/data/clinics'
import {
  TR,
  ES,
  MX,
  TH,
  HU,
  PL,
  CZ,
  BR,
  IN,
  KR,
  DE,
  PT,
  GR,
  HR,
  AE,
  CO,
  CR,
  MY,
  SG,
  IL,
  LT,
} from 'country-flag-icons/react/3x2'

interface DestinationPageClientProps {
  destination: Destination
  clinics: ClinicCardData[]
  procedures: ProcedureWithStats[]
  costComparison: { procedure: string; local_cost: number; uk_cost: number; us_cost: number; savings: number }[]
  stats: {
    clinicCount: number
    procedureCount: number
    categoryCount: number
  }
}

// Country flags by slug
const COUNTRY_FLAGS: Record<string, any> = {
  turkey: TR,
  spain: ES,
  mexico: MX,
  thailand: TH,
  hungary: HU,
  poland: PL,
  'czech-republic': CZ,
  brazil: BR,
  india: IN,
  'south-korea': KR,
  germany: DE,
  portugal: PT,
  greece: GR,
  croatia: HR,
  'united-arab-emirates': AE,
  colombia: CO,
  'costa-rica': CR,
  malaysia: MY,
  singapore: SG,
  israel: IL,
  lithuania: LT,
}

// Destination highlights
const DESTINATION_HIGHLIGHTS: Record<string, { title: string; points: string[] }> = {
  turkey: {
    title: 'Why Turkey is a Top Medical Tourism Destination',
    points: [
      'World leader in hair transplants with over 500 specialized clinics',
      'JCI-accredited hospitals with cutting-edge technology',
      'Significant cost savings of 50-70% compared to UK/US prices',
      'Experienced surgeons trained at top international institutions',
      'All-inclusive packages including accommodation and transfers',
      'Easy visa-free travel for most nationalities',
    ],
  },
  spain: {
    title: 'Why Spain is a Premier Medical Tourism Destination',
    points: [
      "Europe's leading destination for IVF and fertility treatments",
      'Progressive laws allowing anonymous egg donation',
      'World-class private hospitals with EU quality standards',
      'Excellent success rates in assisted reproduction',
      'Beautiful recovery destinations along the Mediterranean',
      'Easy access from UK and Europe with short flights',
    ],
  },
  mexico: {
    title: 'Why Mexico is Popular for Medical Tourism',
    points: [
      'Convenient proximity to the United States and Canada',
      'Significant savings of 40-70% on dental and cosmetic procedures',
      'Many US-trained doctors practicing in border cities',
      'World-class hospitals in major cities and resort areas',
      'No visa required for most Western nationalities',
      'Combine treatment with beautiful beach recovery destinations',
    ],
  },
  thailand: {
    title: 'Why Thailand is a World-Class Medical Tourism Destination',
    points: [
      'Renowned Bumrungrad International Hospital serves 500,000+ foreign patients annually',
      'Exceptional hospitality and patient care culture',
      'Advanced cosmetic surgery and gender-affirming procedures',
      'Affordable luxury recovery in beautiful tropical settings',
      'Strong reputation for dental and orthopedic treatments',
      'English widely spoken in medical facilities',
    ],
  },
  hungary: {
    title: 'Why Hungary is a Top Dental Tourism Destination',
    points: [
      "Europe's dental capital with over 200 dental clinics in Budapest",
      'German-quality dentistry at 50-70% lower prices',
      'Long tradition of excellence in dental education',
      'Easy access from UK and Western Europe',
      'Beautiful historic capital for recovery',
      'Many dentists speak fluent English and German',
    ],
  },
  'czech-republic': {
    title: 'Why Czech Republic is a Top Medical Tourism Destination',
    points: [
      'Prague is Central Europe\'s leading cosmetic surgery and dental hub',
      'EU-standard healthcare with modern facilities and equipment',
      'Excellent fertility treatment clinics with high IVF success rates',
      'Just 2 hours from London with frequent low-cost flights',
      'Beautiful Prague offers a wonderful recovery environment',
      'Significantly lower costs than UK or Western Europe',
    ],
  },
  lithuania: {
    title: 'Why Lithuania is an Emerging Medical Tourism Destination',
    points: [
      'Some of the lowest medical prices in the EU',
      'Modern EU-standard clinics and hospitals',
      'Excellent LASIK and eye surgery centres',
      'Short flights from UK with Ryanair and Wizz Air',
      'Vilnius offers a charming old town for recovery',
      'High English proficiency among medical staff',
    ],
  },
  india: {
    title: 'Why India is a World-Class Medical Tourism Destination',
    points: [
      'Home to 39 JCI-accredited hospitals — more than most countries',
      'World-renowned orthopaedic and cardiac surgeons',
      'Savings of 60-90% compared to UK prices',
      'English widely spoken in medical facilities',
      'Leading destination for complex surgical procedures',
      'Over 2 million medical tourists visit annually',
    ],
  },
}

// Practical travel information
const TRAVEL_INFO: Record<string, { visa: string; currency: string; language: string; timezone: string; flight: string }> = {
  turkey: {
    visa: 'Visa-free for UK, EU, US citizens (up to 90 days)',
    currency: 'Turkish Lira (TRY) - USD/EUR widely accepted',
    language: 'Turkish - English spoken in medical facilities',
    timezone: 'GMT+3',
    flight: '3.5-4 hours from London',
  },
  spain: {
    visa: 'EU/EEA citizens: No visa. UK/US: Visa-free up to 90 days',
    currency: 'Euro (EUR)',
    language: 'Spanish - English spoken in international clinics',
    timezone: 'GMT+1 (GMT+2 in summer)',
    flight: '2-2.5 hours from London',
  },
  mexico: {
    visa: 'Visa-free for US, UK, EU citizens (up to 180 days)',
    currency: 'Mexican Peso (MXN) - USD widely accepted in border areas',
    language: 'Spanish - English in medical tourism zones',
    timezone: 'Various (GMT-5 to GMT-8)',
    flight: '10-12 hours from London, 2-5 hours from US',
  },
  thailand: {
    visa: 'Visa-free for UK, US, EU citizens (30-45 days)',
    currency: 'Thai Baht (THB)',
    language: 'Thai - English spoken in medical facilities',
    timezone: 'GMT+7',
    flight: '11-12 hours from London',
  },
  hungary: {
    visa: 'EU/EEA citizens: No visa. UK/US: Visa-free up to 90 days',
    currency: 'Hungarian Forint (HUF) - Euro often accepted',
    language: 'Hungarian - English/German in dental clinics',
    timezone: 'GMT+1 (GMT+2 in summer)',
    flight: '2.5 hours from London',
  },
  'czech-republic': {
    visa: 'EU/EEA citizens: No visa. UK/US: Visa-free up to 90 days',
    currency: 'Czech Koruna (CZK) — Euro accepted in tourist areas',
    language: 'Czech — English spoken in medical facilities',
    timezone: 'GMT+1 (GMT+2 in summer)',
    flight: '2 hours from London',
  },
  lithuania: {
    visa: 'EU/EEA citizens: No visa. UK/US: Visa-free up to 90 days',
    currency: 'Euro (EUR)',
    language: 'Lithuanian — English widely spoken',
    timezone: 'GMT+2 (GMT+3 in summer)',
    flight: '2.5 hours from London',
  },
  india: {
    visa: 'E-Visa required for UK/US citizens (easy online application)',
    currency: 'Indian Rupee (INR)',
    language: 'Hindi/English — English is official in the medical sector',
    timezone: 'GMT+5:30',
    flight: '9 hours from London',
  },
}

function formatPrice(price: number | null, currency: string = 'EUR'): string {
  if (!price) return 'Contact for pricing'
  const symbols: Record<string, string> = { EUR: '€', USD: '$', GBP: '£' }
  return `From ${symbols[currency] || currency}${price.toLocaleString()}`
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
}

// Generate generic FAQs if no specific ones exist
function generateDestinationFAQs(countryName: string) {
  return [
    {
      question: `Is medical treatment in ${countryName} safe?`,
      answer: `Yes, ${countryName} has many internationally accredited hospitals and clinics that meet or exceed Western standards. Look for JCI or ISO certifications, verify doctor qualifications, and read patient reviews. Major medical tourism facilities maintain rigorous safety protocols.`,
    },
    {
      question: `How much can I save on medical treatment in ${countryName}?`,
      answer: `Patients typically save 40-70% on medical procedures in ${countryName} compared to UK or US prices. The exact savings depend on the procedure type and clinic. Lower costs are due to lower operating costs, not lower quality.`,
    },
    {
      question: `Do doctors in ${countryName} speak English?`,
      answer: `Yes, doctors at international clinics and hospitals in ${countryName} typically speak excellent English. Many have trained abroad and are experienced in treating international patients. Clinics often provide translators if needed.`,
    },
    {
      question: `How do I choose a clinic in ${countryName}?`,
      answer: `Research thoroughly: check international accreditations (JCI, ISO), verify doctor qualifications and experience, read patient reviews, and have a video consultation before traveling. Price shouldn't be the only factor—prioritize quality and safety.`,
    },
    {
      question: `What if something goes wrong after I return home from ${countryName}?`,
      answer: `Reputable clinics offer warranties on their work and have protocols for follow-up care. Many have partnerships with doctors in other countries. Before treatment, ensure you have a clear aftercare plan, emergency contact details, and complete documentation of your treatment.`,
    },
  ]
}

export function DestinationPageClient({
  destination,
  clinics,
  procedures,
  costComparison,
  stats,
}: DestinationPageClientProps) {
  const flag = COUNTRY_FLAGS[destination.slug] || '🌍'
  const highlights = DESTINATION_HIGHLIGHTS[destination.slug]
  const travelInfo = TRAVEL_INFO[destination.slug]
  const faqs = DESTINATION_FAQS[destination.slug] || generateDestinationFAQs(destination.country_name)

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0A1A2F] text-white pt-20 pb-24 sm:pt-32 sm:pb-40">
        {destination.hero_image_url && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105"
            style={{ backgroundImage: `url(${destination.hero_image_url})` }}
          />
        )}
        
        {/* Abstract Premium Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A2F] via-[#0A1A2F]/95 to-primary-900/50" />
        
        {/* Animated Glowing Orbs */}
        <m.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary-600/20 blur-[120px]" 
        />
        <m.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -70, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-blue-600/10 blur-[120px]" 
        />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-transparent opacity-[0.03] mix-blend-overlay" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            {/* Flag Badge */}
            <m.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="mb-8 relative"
            >
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
              <div className="relative w-24 h-16 overflow-hidden rounded-2xl shadow-2xl border-2 border-white/20">
                {(() => {
                  const Flag = COUNTRY_FLAGS[destination.slug]
                  return Flag ? <Flag title={destination.country_name} className="w-full h-full object-cover" /> : <span className="text-5xl">🌍</span>
                })()}
              </div>
            </m.div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block text-white/90 text-2xl sm:text-3xl font-light tracking-[0.2em] uppercase mb-4">Medical Tourism in</span>
              <span className="bg-gradient-to-r from-white via-primary-100 to-white/80 bg-clip-text text-transparent">
                {destination.country_name}
              </span>
            </h1>
            
            <p className="mx-auto mt-8 max-w-2xl text-lg text-neutral-300 sm:text-xl lg:text-2xl leading-relaxed font-light">
              {destination.description ||
                `Discover world-class healthcare at affordable prices. ${destination.country_name} offers accredited hospitals, experienced doctors, and significant savings on medical treatments.`}
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <Link href={`/search?destination=${destination.slug}`}>
                <Button size="lg" className="w-full sm:w-auto bg-primary-600 text-white hover:bg-primary-500 hover:scale-105 transition-all duration-300 rounded-full px-10 py-7 text-lg font-medium shadow-xl shadow-primary-900/20">
                  Browse Verified Clinics
                </Button>
              </Link>
              <Link href="#procedures">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-full px-10 py-7 text-lg font-medium backdrop-blur-md transition-all duration-300"
                >
                  View Treatments
                </Button>
              </Link>
            </div>
          </m.div>

          {/* Premium Glassmorphism Trust Bar */}
          <m.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 sm:mt-28 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 relative z-10">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{stats.clinicCount}+</p>
                <p className="text-xs sm:text-sm font-medium uppercase tracking-widest text-primary-200/60">Verified Clinics</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{stats.procedureCount}+</p>
                <p className="text-xs sm:text-sm font-medium uppercase tracking-widest text-primary-200/60">Procedures</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{stats.categoryCount}+</p>
                <p className="text-xs sm:text-sm font-medium uppercase tracking-widest text-primary-200/60">Specialties</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white mb-1">50-70%</p>
                <p className="text-xs sm:text-sm font-medium uppercase tracking-widest text-primary-200/60">Average Savings</p>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Why This Destination */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="relative">
                <m.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "80px" }}
                  viewport={{ once: true }}
                  className="h-1.5 bg-primary-600 rounded-full mb-8"
                />
                <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">The Destination</span>
                <h2 className="mt-4 mb-10 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight leading-[1.1]">
                  {highlights?.title || `Why Choose ${destination.country_name}?`}
                </h2>
              </div>
              
              <div className="prose prose-lg prose-neutral max-w-none text-neutral-600 leading-relaxed">
                {highlights ? (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {highlights.points.map((point, index) => (
                      <m.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group flex items-start gap-5 rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary-100"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-base text-neutral-700 font-medium leading-snug">{point}</span>
                      </m.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6 text-lg text-neutral-700 font-light leading-relaxed">
                    <p>
                      {destination.country_name} has become a global leader in medical tourism, 
                      offering a sophisticated blend of world-class healthcare infrastructure and 
                      exceptional patient hospitality.
                    </p>
                    <p className="p-6 rounded-2xl bg-primary-50/50 border border-primary-100 text-primary-900 font-medium italic">
                      "Patients typically save between 50% and 70% compared to UK or US prices, 
                      without any compromise on clinical quality or safety standards."
                    </p>
                    <p>
                      With internationally accredited hospitals (JCI, ISO) and surgeons who often 
                      hold international certifications, {destination.country_name} provides a 
                      seamless experience for those seeking elective procedures, dental work, 
                      or specialized treatments.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Practical Info Sidebar */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-32 h-fit">
              <m.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-neutral-200/60 bg-white p-8 shadow-2xl shadow-neutral-200/40 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-primary-50/50 blur-3xl" />
                
                <h3 className="mb-8 text-2xl font-bold text-neutral-900 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-200">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Travel Essentials
                </h3>
                
                {travelInfo ? (
                  <div className="space-y-8">
                    {[
                      { label: 'Visa Requirements', value: travelInfo.visa, icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                      { label: 'Currency', value: travelInfo.currency, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                      { label: 'Language', value: travelInfo.language, icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' },
                      { label: 'Timezone', value: travelInfo.timezone, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                      { label: 'Flight from London', value: travelInfo.flight, icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8' }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="h-5 w-5 text-primary-500 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                          </svg>
                        </div>
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">{item.label}</dt>
                          <dd className="text-sm font-semibold text-neutral-900">{item.value}</dd>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl bg-neutral-50 p-6 border border-neutral-100">
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      Travel information for {destination.country_name} is being updated. 
                      Our advisors can provide specific visa and travel guidance for your treatment.
                    </p>
                  </div>
                )}
                
                <div className="mt-10 pt-8 border-t border-neutral-100">
                  <Link href="/contact" className="block">
                    <Button variant="outline" className="w-full rounded-xl border-primary-200 text-primary-700 hover:bg-primary-50 transition-all duration-300">
                      Request Travel Guide
                    </Button>
                  </Link>
                </div>
              </m.div>
            </div>
          </div>
        </m.section>

        {/* Popular Procedures */}
        <m.section {...fadeInUp} id="procedures" className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Treatments</span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight">
                Popular Procedures in {destination.country_name}
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Explore the most sought-after medical and cosmetic treatments available.
              </p>
            </div>
            <div className="h-px flex-1 bg-neutral-100 hidden md:block mx-8 mb-4" />
          </div>

          {procedures.length > 0 ? (
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {procedures.map((procedure, index) => (
                <m.div
                  key={procedure.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <Link
                    href={`/destinations/${destination.slug}/${procedure.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200/60 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary-300 hover:shadow-2xl hover:shadow-primary-900/10"
                  >
                    {/* Animated Background Orb */}
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary-50 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl group-hover:scale-150" />
                    
                    <div className="relative z-10 flex-1">
                      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                        {procedure.name}
                      </h3>
                      {procedure.description && (
                        <p className="mt-4 line-clamp-3 text-neutral-600 leading-relaxed font-light">
                          {procedure.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="relative z-10 mt-8 space-y-4 pt-6 border-t border-neutral-100">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Est. Price</span>
                        <span className="text-lg font-bold text-neutral-900">
                          {formatPrice(procedure.starting_price, procedure.price_currency)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-primary-600 font-bold text-sm">
                        <span>{procedure.clinic_count} Verified Clinics</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                      </div>
                    </div>
                  </Link>
                </m.div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 px-8 py-20 text-center mt-10">
              <div className="mx-auto w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-6">
                <svg className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Procedures coming soon</h3>
              <p className="text-neutral-500 max-w-md mx-auto mb-8">
                We are currently vetting top clinics in {destination.country_name} for various procedures.
              </p>
              <Link href="/search">
                <Button className="rounded-full px-8 py-6 bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-100">Browse All Locations</Button>
              </Link>
            </div>
          )}
        </m.section>

        {/* Top Clinics */}
        <m.section {...fadeInUp} className="mb-32">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Featured Providers</span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900 sm:text-5xl tracking-tight">
                Top Clinics in {destination.country_name}
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-light">
                Highest-rated medical facilities vetted for international quality standards.
              </p>
            </div>
            <Link href={`/search?destination=${destination.slug}`}>
              <Button variant="outline" className="group rounded-full border-neutral-200 px-8 py-6 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-all duration-300">
                View All Clinics <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Button>
            </Link>
          </div>

          {clinics.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {clinics.slice(0, 8).map((clinic, i) => (
                <m.div 
                  key={clinic.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="transition-all duration-500 hover:-translate-y-2"
                >
                  <ClinicCard clinic={clinic} showEnquiryButton={false} />
                </m.div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50/50 px-8 py-20 text-center">
              <p className="text-neutral-500 font-light text-lg">
                Vetting process in progress for {destination.country_name} clinics.
              </p>
            </div>
          )}
        </m.section>

        {/* Cost Comparison */}
        {costComparison.length > 0 && (
          <m.section {...fadeInUp} className="mb-32">
            <div className="bg-neutral-900 rounded-[3rem] p-8 sm:p-16 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-600/10 blur-[120px]" />
              <div className="relative z-10 grid lg:grid-cols-5 gap-12 items-center">
                <div className="lg:col-span-2">
                  <span className="text-sm font-bold tracking-[0.2em] text-primary-400 uppercase">Cost Savings</span>
                  <h2 className="mt-6 text-4xl font-bold text-white tracking-tight sm:text-5xl leading-[1.1]">
                    Transparent Pricing in {destination.country_name}
                  </h2>
                  <p className="mt-6 text-lg text-neutral-400 font-light leading-relaxed">
                    Compare average treatment costs and see why thousands of patients 
                    choose {destination.country_name} for their medical care.
                  </p>
                  <div className="mt-10 flex items-center gap-4 text-white">
                    <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center text-xs font-bold">
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-neutral-300">Joined by 500+ patients this month</span>
                  </div>
                </div>
                <div className="lg:col-span-3 bg-white rounded-3xl p-2 shadow-2xl">
                  <DestinationCostTable data={costComparison} />
                </div>
              </div>
            </div>
          </m.section>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <m.section {...fadeInUp} className="mb-32">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-16">
                <span className="text-sm font-bold tracking-[0.2em] text-primary-600 uppercase">Common Questions</span>
                <h2 className="mt-4 text-4xl font-bold text-neutral-900 tracking-tight sm:text-5xl">
                  Medical Tourism in {destination.country_name} FAQs
                </h2>
              </div>
              <div className="bg-white rounded-3xl border border-neutral-200/60 p-4 sm:p-8 shadow-xl shadow-neutral-100">
                <FAQAccordion items={faqs} />
              </div>
            </div>
          </m.section>
        )}

        {/* CTA Section */}
        <m.section {...fadeInUp} className="pb-12">
          <div className="relative overflow-hidden rounded-[3rem] bg-[#0A1A2F] p-12 text-white sm:p-20 lg:p-32 shadow-2xl text-center">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 via-transparent to-blue-600/30" />
            <m.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -left-1/4 -top-1/4 h-full w-full rounded-full bg-primary-500/10 blur-[120px]" 
            />
            <div className="absolute inset-0 bg-transparent opacity-[0.03] mix-blend-overlay" />
            
            <div className="relative z-10 mx-auto max-w-4xl">
              <m.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="mx-auto mb-12 w-24 h-16 overflow-hidden rounded-2xl shadow-2xl border-2 border-white/20"
              >
                {(() => {
                  const Flag = COUNTRY_FLAGS[destination.slug]
                  return Flag ? <Flag title={destination.country_name} className="w-full h-full object-cover" /> : <span className="text-5xl py-2 inline-block">🌍</span>
                })()}
              </m.div>
              
              <span className="text-sm font-bold tracking-[0.3em] text-primary-300 uppercase mb-6 block">Ready to begin?</span>
              <h2 className="text-4xl font-bold sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] mb-8">
                Your Journey to <span className="text-primary-400">{destination.country_name}</span> Starts Here
              </h2>
              <p className="mx-auto mt-8 max-w-2xl text-xl text-neutral-300 font-light leading-relaxed">
                Receive personalized treatment plans and all-inclusive quotes from the 
                most prestigious medical facilities in {destination.country_name}.
              </p>
              
              <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
                <Link href={`/search?destination=${destination.slug}`} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-white text-primary-900 hover:bg-neutral-100 hover:scale-105 transition-all duration-300 rounded-full px-12 py-8 text-lg font-bold shadow-xl shadow-white/10">
                    Browse Top Clinics
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-full px-12 py-8 text-lg font-bold backdrop-blur-md"
                  >
                    Free Consultation
                  </Button>
                </Link>
              </div>
              
              <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-8 text-sm font-medium text-neutral-400">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified Reviews
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Best Price Guarantee
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  24/7 Patient Support
                </div>
              </div>
            </div>
          </div>
        </m.section>
      </div>
    </>
  )
}
