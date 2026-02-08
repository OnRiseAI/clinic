'use client'

import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { ClinicCard } from '@/components/clinics/clinic-card'
import { DestinationCostTable } from '@/components/content/cost-comparison-widget'
import { FAQAccordion, DESTINATION_FAQS } from '@/components/content/faq-accordion'
import type { Destination, ProcedureWithStats } from '@/lib/data/content'
import type { ClinicCardData } from '@/lib/data/clinics'

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
const COUNTRY_FLAGS: Record<string, string> = {
  turkey: '🇹🇷',
  spain: '🇪🇸',
  mexico: '🇲🇽',
  thailand: '🇹🇭',
  hungary: '🇭🇺',
  poland: '🇵🇱',
  'czech-republic': '🇨🇿',
  brazil: '🇧🇷',
  india: '🇮🇳',
  'south-korea': '🇰🇷',
  germany: '🇩🇪',
  portugal: '🇵🇹',
  greece: '🇬🇷',
  croatia: '🇭🇷',
  'united-arab-emirates': '🇦🇪',
  colombia: '🇨🇴',
  'costa-rica': '🇨🇷',
  malaysia: '🇲🇾',
  singapore: '🇸🇬',
  israel: '🇮🇱',
  lithuania: '🇱🇹',
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
      <m.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-primary-700 to-primary-900 text-white"
      >
        {destination.hero_image_url && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${destination.hero_image_url})` }}
          />
        )}
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="text-6xl">{flag}</span>
            <div>
              <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
                Medical Tourism in {destination.country_name}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-primary-100 sm:text-xl">
                {destination.description ||
                  `Discover world-class healthcare at affordable prices. ${destination.country_name} offers accredited hospitals, experienced doctors, and significant savings on medical treatments.`}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={`/search?destination=${destination.slug}`}>
              <Button variant="secondary" size="lg">
                Browse Clinics
              </Button>
            </Link>
            <Link href="#procedures">
              <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                View Treatments
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <p className="text-3xl font-bold">{stats.clinicCount}+</p>
              <p className="text-sm text-primary-200">Verified Clinics</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.procedureCount}+</p>
              <p className="text-sm text-primary-200">Procedures</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.categoryCount}+</p>
              <p className="text-sm text-primary-200">Specialties</p>
            </div>
            <div>
              <p className="text-3xl font-bold">50-70%</p>
              <p className="text-sm text-primary-200">Average Savings</p>
            </div>
          </div>
        </div>
      </m.section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Why This Destination */}
        <m.section {...fadeInUp} className="mb-20">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-3xl font-bold text-neutral-900">
                {highlights?.title || `Why Choose ${destination.country_name}?`}
              </h2>
              {highlights ? (
                <ul className="space-y-4">
                  {highlights.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs text-primary-600">
                        {index + 1}
                      </span>
                      <span className="text-lg text-neutral-700">{point}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="prose prose-neutral max-w-none">
                  <p className="text-lg text-neutral-700">
                    {destination.country_name} has become a popular destination for medical tourists
                    seeking high-quality healthcare at affordable prices. With internationally
                    accredited hospitals, experienced doctors trained at top institutions, and
                    significant cost savings compared to Western countries, patients can receive
                    excellent care while exploring a beautiful destination.
                  </p>
                  <p className="mt-4 text-neutral-600">
                    Medical tourists choose {destination.country_name} for its combination of quality,
                    value, and accessibility. Many clinics offer comprehensive packages including
                    consultations, procedures, accommodation, and airport transfers, making the
                    entire experience seamless.
                  </p>
                </div>
              )}
            </div>

            {/* Practical Info Sidebar */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm h-fit">
              <h3 className="mb-4 text-lg font-semibold text-neutral-900">Travel Information</h3>
              {travelInfo ? (
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-neutral-500">Visa Requirements</dt>
                    <dd className="mt-1 text-neutral-900">{travelInfo.visa}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-neutral-500">Currency</dt>
                    <dd className="mt-1 text-neutral-900">{travelInfo.currency}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-neutral-500">Language</dt>
                    <dd className="mt-1 text-neutral-900">{travelInfo.language}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-neutral-500">Timezone</dt>
                    <dd className="mt-1 text-neutral-900">{travelInfo.timezone}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-neutral-500">Flight from London</dt>
                    <dd className="mt-1 text-neutral-900">{travelInfo.flight}</dd>
                  </div>
                </dl>
              ) : (
                <p className="text-neutral-500">
                  Travel information coming soon. Contact clinics directly for visa and travel guidance.
                </p>
              )}
            </div>
          </div>
        </m.section>

        {/* Popular Procedures */}
        <m.section {...fadeInUp} id="procedures" className="mb-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900">
                Popular Procedures in {destination.country_name}
              </h2>
              <p className="mt-2 text-neutral-600">
                Most sought-after treatments by medical tourists
              </p>
            </div>
          </div>

          {procedures.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {procedures.map((procedure, index) => (
                <m.div
                  key={procedure.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/destinations/${destination.slug}/${procedure.slug}`}
                    className="group block rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
                  >
                    <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600">
                      {procedure.name}
                    </h3>
                    {procedure.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                        {procedure.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-primary-600">
                        {formatPrice(procedure.starting_price, procedure.price_currency)}
                      </span>
                      {procedure.clinic_count > 0 && (
                        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
                          {procedure.clinic_count} clinics
                        </span>
                      )}
                    </div>
                  </Link>
                </m.div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-8 py-16 text-center">
              <p className="text-neutral-500">
                Procedures in {destination.country_name} coming soon
              </p>
              <Link href="/search" className="mt-4 inline-block">
                <Button variant="primary">Browse All Procedures</Button>
              </Link>
            </div>
          )}
        </m.section>

        {/* Top Clinics */}
        <m.section {...fadeInUp} className="mb-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900">
                Top Clinics in {destination.country_name}
              </h2>
              <p className="mt-2 text-neutral-600">
                Highest-rated medical facilities for international patients
              </p>
            </div>
            <Link href={`/search?destination=${destination.slug}`}>
              <Button variant="outline">View All Clinics</Button>
            </Link>
          </div>

          {clinics.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {clinics.slice(0, 8).map((clinic) => (
                <ClinicCard key={clinic.id} clinic={clinic} showEnquiryButton={false} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-8 py-16 text-center">
              <p className="text-neutral-500">
                Clinics in {destination.country_name} coming soon
              </p>
            </div>
          )}
        </m.section>

        {/* Cost Comparison */}
        {costComparison.length > 0 && (
          <m.section {...fadeInUp} className="mb-20">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-neutral-900">
                Treatment Costs in {destination.country_name}
              </h2>
              <p className="mt-2 text-neutral-600">
                Average prices for popular procedures
              </p>
            </div>

            <DestinationCostTable data={costComparison} />
          </m.section>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <m.section {...fadeInUp} className="mb-20">
            <FAQAccordion
              items={faqs}
              title={`Medical Tourism in ${destination.country_name} FAQs`}
            />
          </m.section>
        )}

        {/* CTA Section */}
        <m.section {...fadeInUp}>
          <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-8 text-center text-white sm:p-12">
            <div className="mb-4 text-5xl">{flag}</div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Start Your Medical Journey to {destination.country_name}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
              Compare clinics, read verified reviews, and get personalized quotes from
              top-rated facilities in {destination.country_name}.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={`/search?destination=${destination.slug}`}>
                <Button variant="secondary" size="lg">
                  Browse Clinics
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                  Speak to an Advisor
                </Button>
              </Link>
            </div>
          </div>
        </m.section>
      </div>
    </>
  )
}
