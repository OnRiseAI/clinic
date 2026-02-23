'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@/i18n/navigation'

const COST_DATA = {
  dental: {
    id: 'dental',
    label: 'Dental',
    procedure: 'All-on-4 Implants (Per Arch)',
    href: '/dental',
    data: [
      { country: 'USA', flag: '🇺🇸', cost: 28000, label: '$28,000' },
      { country: 'UK', flag: '🇬🇧', cost: 22500, label: '£18,000' },
      { country: 'Germany', flag: '🇩🇪', cost: 16500, label: '€15,000' },
      { country: 'Mexico', flag: '🇲🇽', cost: 9500, label: '$9,500', highlight: true },
      { country: 'Turkey', flag: '🇹🇷', cost: 6050, label: '€5,500', highlight: true },
    ]
  },
  hair: {
    id: 'hair',
    label: 'Hair Transplant',
    procedure: 'FUE Hair Transplant (3k Grafts)',
    href: '/procedures/hair-transplant',
    data: [
      { country: 'USA', flag: '🇺🇸', cost: 9000, label: '$9,000' },
      { country: 'UK', flag: '🇬🇧', cost: 10000, label: '£8,000' },
      { country: 'Germany', flag: '🇩🇪', cost: 8250, label: '€7,500' },
      { country: 'Mexico', flag: '🇲🇽', cost: 6000, label: '$6,000', highlight: true },
      { country: 'Turkey', flag: '🇹🇷', cost: 2750, label: '€2,500', highlight: true },
    ]
  },
  cosmetics: {
    id: 'cosmetics',
    label: 'Cosmetics',
    procedure: 'Rhinoplasty (Nose Job)',
    href: '/cosmetic-surgery',
    data: [
      { country: 'USA', flag: '🇺🇸', cost: 10500, label: '$10,500' },
      { country: 'UK', flag: '🇬🇧', cost: 8750, label: '£7,000' },
      { country: 'Germany', flag: '🇩🇪', cost: 8800, label: '€8,000' },
      { country: 'Mexico', flag: '🇲🇽', cost: 4500, label: '$4,500', highlight: true },
      { country: 'Turkey', flag: '🇹🇷', cost: 3850, label: '€3,500', highlight: true },
    ]
  },
  bariatric: {
    id: 'bariatric',
    label: 'Weight Loss',
    procedure: 'Gastric Sleeve Surgery',
    href: '/procedures/bariatric-surgery',
    data: [
      { country: 'USA', flag: '🇺🇸', cost: 20000, label: '$20,000' },
      { country: 'UK', flag: '🇬🇧', cost: 10600, label: '£8,500' },
      { country: 'Germany', flag: '🇩🇪', cost: 7700, label: '€7,000' },
      { country: 'Mexico', flag: '🇲🇽', cost: 4800, label: '$4,800', highlight: true },
      { country: 'Turkey', flag: '🇹🇷', cost: 4180, label: '€3,800', highlight: true },
    ]
  }
}

type CategoryKey = keyof typeof COST_DATA

export function CostComparison() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('dental')
  const activeData = COST_DATA[activeCategory]
  const maxCost = Math.max(...activeData.data.map((d) => d.cost))

  const categories = Object.values(COST_DATA)

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            <p className="text-xs font-bold text-navy/40 uppercase tracking-[0.2em] mb-4">
              Cost Reference
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-navy mb-5">
              Cost Comparison{' '}
              <span className="text-gold-dark">by Region</span>
            </h2>
            <p className="text-navy/60 max-w-lg leading-relaxed font-light mb-8">
              Average treatment costs vary significantly by country. Select a treatment category below to see potential savings across our top destinations.
            </p>

            {/* Category Pill Selector */}
            <div className="flex flex-wrap gap-3 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as CategoryKey)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'text-white shadow-lg shadow-navy/20 border border-transparent'
                      : 'bg-white text-navy/60 border border-navy/10 hover:border-navy/30 hover:text-navy hover:shadow-sm'
                  }`}
                >
                  {activeCategory === cat.id && (
                    <motion.div
                      layoutId="activeCategoryBg"
                      className="absolute inset-0 bg-navy rounded-full z-0"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              ))}
            </div>

            <Link
              href={activeData.href}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-500 transition-all duration-300 tracking-wide shadow-lg shadow-teal-600/20"
            >
              Compare {activeData.label} Costs
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-2xl p-8 border border-navy/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.04)] relative min-h-[480px] flex flex-col"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex-1"
              >
                <h3 className="text-sm font-semibold text-navy mb-8 pb-4 border-b border-navy/[0.06]">
                  Avg. Cost: {activeData.procedure}
                </h3>
                <div className="space-y-6">
                  {activeData.data.map((item, index) => (
                    <div key={item.country} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span>{item.flag}</span>
                          <span className="font-medium text-navy">{item.country}</span>
                        </div>
                        <span className={`font-bold ${item.highlight ? 'text-teal-600' : 'text-navy/60'}`}>
                          {item.label}
                        </span>
                      </div>
                      <div className="h-2.5 w-full bg-navy/[0.04] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.cost / maxCost) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                          className={`h-full rounded-full ${
                            item.highlight 
                              ? 'bg-gradient-to-r from-teal-500 to-emerald-400 shadow-[0_0_15px_rgba(20,184,166,0.4)]' 
                              : 'bg-navy/20'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-auto pt-8">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-navy/[0.02] border border-navy/[0.06]">
                <svg className="w-8 h-8 text-navy/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-navy">
                    Illustrative cost comparison
                  </p>
                  <p className="text-xs text-navy/50 font-light">Actual prices are confirmed by the treating clinic</p>
                </div>
              </div>

              <p className="mt-4 text-[11px] text-navy/60 text-center">
                *Estimated average costs for comparison purposes only.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
