'use client'

import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  title?: string
  className?: string
}

export function FAQAccordion({ items, title = 'Frequently Asked Questions', className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (items.length === 0) {
    return null
  }

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={className}>
      {title && (
        <h2 className="mb-6 text-2xl font-bold text-neutral-900">{title}</h2>
      )}

      <div className="space-y-3">
        {items.map((item, index) => (
          <m.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="rounded-xl border border-neutral-200 bg-white overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-neutral-50"
              aria-expanded={openIndex === index}
            >
              <span className="font-medium text-neutral-900">{item.question}</span>
              <span
                className={cn(
                  'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-transform',
                  openIndex === index && 'rotate-180 bg-primary-50 border-primary-200 text-primary-600'
                )}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-neutral-100 px-5 py-4">
                    <p className="text-neutral-600 leading-relaxed">{item.answer}</p>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        ))}
      </div>
    </div>
  )
}

// Pre-defined FAQ sets for different page types
export const CATEGORY_FAQS: Record<string, FAQItem[]> = {
  dental: [
    {
      question: 'Is dental treatment abroad safe?',
      answer: 'Yes, dental treatment abroad can be very safe when you choose accredited clinics with qualified dentists. Look for JCI or ISO certifications, read patient reviews, and verify your dentist\'s qualifications. Many international dental clinics use the same equipment and materials as clinics in the UK and US.',
    },
    {
      question: 'How much can I save on dental work abroad?',
      answer: 'Patients typically save 50-70% on dental treatments abroad compared to UK/US prices. For example, dental veneers that cost £800-1000 per tooth in the UK can cost €250-400 in Turkey or Hungary. The savings are due to lower operating costs, not lower quality.',
    },
    {
      question: 'What happens if something goes wrong after I return home?',
      answer: 'Reputable dental clinics abroad offer warranties on their work, typically 2-5 years for major procedures. Many have partnerships with dentists in your home country for follow-up care. Always get a detailed treatment plan and warranty documentation before your procedure.',
    },
    {
      question: 'How long do I need to stay for dental treatment?',
      answer: 'The length of stay depends on your treatment. Simple procedures like teeth whitening can be done in a day visit. Dental veneers typically require 5-7 days for two visits. Dental implants may require 2 trips: one for placement (3-5 days) and another for crown fitting (2-3 days) 3-6 months later.',
    },
  ],
  cosmetic: [
    {
      question: 'Are cosmetic surgery clinics abroad as good as UK/US clinics?',
      answer: 'Many international cosmetic surgery clinics meet or exceed Western standards. Look for surgeons with international training and board certifications, JCI-accredited facilities, and positive patient reviews. Popular destinations like Turkey, Thailand, and Brazil have world-renowned plastic surgeons.',
    },
    {
      question: 'What is the recovery time for cosmetic surgery abroad?',
      answer: 'Recovery time varies by procedure. Most patients stay 7-14 days after surgery before flying home. Rhinoplasty patients can typically fly after 7-10 days, while tummy tuck or breast surgery patients may need 10-14 days. Your clinic will provide specific guidance based on your procedure.',
    },
    {
      question: 'How do I choose a cosmetic surgeon abroad?',
      answer: 'Research the surgeon\'s qualifications, specializations, and experience. Look at before/after photos of their work, read patient testimonials, and verify their credentials with medical boards. Have a video consultation before committing, and ensure they understand your goals.',
    },
    {
      question: 'Are there financing options for cosmetic surgery abroad?',
      answer: 'Many clinics offer payment plans or work with medical financing companies. Some patients use personal loans or credit cards with 0% interest periods. Always get a full quote including flights, accommodation, and any follow-up care before budgeting.',
    },
  ],
  fertility: [
    {
      question: 'Why do people travel abroad for IVF treatment?',
      answer: 'People travel for fertility treatment due to lower costs (savings of 50-70%), shorter waiting times, access to treatments not available at home (like donor eggs), higher age limits, and better success rates at certain clinics. Countries like Spain, Czech Republic, and Greece are popular IVF destinations.',
    },
    {
      question: 'How much does IVF cost abroad compared to the UK?',
      answer: 'IVF in the UK costs £5,000-8,000 per cycle. The same treatment costs €2,500-4,500 in Spain, €2,000-3,500 in Czech Republic, and €2,500-4,000 in Greece. These prices often include more services than UK clinics, like consultations and some medications.',
    },
    {
      question: 'What are the success rates for IVF abroad?',
      answer: 'Success rates vary by clinic and patient factors. Top European IVF clinics report success rates of 45-60% for patients under 35, comparable to or higher than UK/US averages. Ask clinics for their specific success rates broken down by age group and treatment type.',
    },
    {
      question: 'How many trips do I need for IVF abroad?',
      answer: 'Most IVF treatments abroad require 2-3 trips: an initial consultation (can sometimes be done virtually), the stimulation/egg retrieval phase (8-14 days), and embryo transfer (2-3 days, can sometimes be combined with retrieval). Some clinics offer comprehensive packages that minimize trips.',
    },
  ],
}

export const DESTINATION_FAQS: Record<string, FAQItem[]> = {
  turkey: [
    {
      question: 'Is Turkey safe for medical tourism?',
      answer: 'Yes, Turkey is one of the world\'s top medical tourism destinations with over 1 million medical tourists annually. Major cities like Istanbul, Ankara, and Antalya have excellent healthcare infrastructure with JCI-accredited hospitals and English-speaking staff.',
    },
    {
      question: 'Do I need a visa to travel to Turkey for medical treatment?',
      answer: 'Many nationalities can visit Turkey visa-free for up to 90 days, including UK, EU, and US citizens. For longer stays or certain nationalities, an e-visa can be obtained online in minutes. Check the Turkish government website for current requirements.',
    },
    {
      question: 'What medical treatments is Turkey known for?',
      answer: 'Turkey is particularly renowned for hair transplants (world leader), dental treatments, cosmetic surgery, eye surgery (LASIK), and bariatric surgery. Istanbul alone has hundreds of internationally accredited clinics specializing in these areas.',
    },
    {
      question: 'What should I expect from the healthcare experience in Turkey?',
      answer: 'Turkish medical facilities are modern and well-equipped. Many clinics offer VIP services including airport transfers, hotel accommodation, translators, and 24/7 patient support. English is widely spoken in medical settings, and hospitality standards are high.',
    },
  ],
  spain: [
    {
      question: 'Why is Spain popular for fertility treatment?',
      answer: 'Spain is Europe\'s leading IVF destination due to progressive laws (including anonymous egg donation), excellent success rates, reasonable costs, and world-class clinics. Spanish fertility clinics see patients from the UK, France, Germany, and beyond.',
    },
    {
      question: 'What are the regulations for egg donation in Spain?',
      answer: 'Spain allows anonymous egg and sperm donation, which means there are no waiting lists for donor eggs. Donors are carefully screened and matched. There\'s no upper age limit for recipients (though clinics set their own limits, typically 50-52).',
    },
    {
      question: 'Do Spanish doctors speak English?',
      answer: 'Yes, doctors and staff at international clinics in Spain speak excellent English. Major clinics in Barcelona, Madrid, Valencia, and Alicante are accustomed to treating English-speaking patients and provide all documentation in English.',
    },
    {
      question: 'What is the healthcare system like in Spain?',
      answer: 'Spain has one of Europe\'s best healthcare systems. Private clinics offer state-of-the-art facilities, short waiting times, and personalized care. The country has excellent medical training, and many doctors have international experience.',
    },
  ],
  mexico: [
    {
      question: 'Is it safe to get medical treatment in Mexico?',
      answer: 'Major medical tourism hubs like Tijuana, Cancun, and Mexico City have excellent, internationally accredited hospitals. These areas are tourist-friendly with good security. Stick to reputable clinics in established medical tourism zones for the best experience.',
    },
    {
      question: 'How much can I save on treatment in Mexico vs the US?',
      answer: 'Patients from the US typically save 40-70% on medical procedures in Mexico. Dental work, cosmetic surgery, and bariatric surgery are particularly affordable. The proximity to the US also saves on travel costs compared to flying to Asia or Europe.',
    },
    {
      question: 'What treatments is Mexico known for?',
      answer: 'Mexico is popular for dental work (especially in Tijuana and Los Algodones), bariatric surgery, cosmetic surgery, orthopedic procedures, and fertility treatment. Many US-trained doctors practice in Mexican border cities.',
    },
    {
      question: 'How easy is it to travel to Mexico for medical treatment?',
      answer: 'Very easy for US and Canadian patients - short flights or even driving distance to border cities. No visa required for most nationalities for stays under 180 days. Many clinics arrange airport pickups and can recommend nearby hotels.',
    },
  ],
}

// Generate FAQs for procedure + destination combinations
export function generateProcedureDestinationFAQs(procedure: string, destination: string): FAQItem[] {
  return [
    {
      question: `How much does ${procedure.toLowerCase()} cost in ${destination}?`,
      answer: `${procedure} costs in ${destination} are typically 50-70% lower than in the UK or US. Exact prices vary by clinic and complexity, but you can expect significant savings while receiving high-quality care at accredited facilities.`,
    },
    {
      question: `Is it safe to get ${procedure.toLowerCase()} in ${destination}?`,
      answer: `Yes, ${destination} has many internationally accredited clinics offering ${procedure.toLowerCase()}. Look for JCI or equivalent accreditation, check doctor qualifications, and read patient reviews. Reputable clinics maintain the same safety standards as Western facilities.`,
    },
    {
      question: `How long do I need to stay in ${destination} for ${procedure.toLowerCase()}?`,
      answer: `The required stay depends on the specific treatment and individual recovery. Most patients stay 5-14 days, which includes initial consultations, the procedure, and post-operative checkups. Your clinic will provide specific guidance based on your treatment plan.`,
    },
    {
      question: `What should I look for when choosing a clinic for ${procedure.toLowerCase()} in ${destination}?`,
      answer: `Look for international accreditations (JCI, ISO), experienced surgeons with relevant specializations, positive patient reviews, transparent pricing, good communication in English, and comprehensive aftercare packages. Have a virtual consultation before traveling.`,
    },
    {
      question: `Will my ${procedure.toLowerCase()} results in ${destination} be as good as at home?`,
      answer: `Results depend on the skill of your doctor and the quality of the facility, not the location. Top clinics in ${destination} achieve results comparable to or better than Western clinics. Research your specific clinic and doctor thoroughly, and review their before/after photos.`,
    },
  ]
}
