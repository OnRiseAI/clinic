'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'

const DATA = [
  { country: 'USA', flag: '\u{1F1FA}\u{1F1F8}', cost: 2500, label: '$2,500' },
  { country: 'UK', flag: '\u{1F1EC}\u{1F1E7}', cost: 2100, label: '\u00A31,800' },
  { country: 'Germany', flag: '\u{1F1E9}\u{1F1EA}', cost: 1800, label: '\u20AC1,650' },
  { country: 'Mexico', flag: '\u{1F1F2}\u{1F1FD}', cost: 450, label: '$450', highlight: true },
  { country: 'Turkey', flag: '\u{1F1F9}\u{1F1F7}', cost: 300, label: '\u20AC280', highlight: true },
]

export function CostComparison() {
  const maxCost = Math.max(...DATA.map((d) => d.cost))

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-bold text-navy/40 uppercase tracking-[0.2em] mb-4">
              Cost Reference
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-navy mb-5">
              Cost Comparison{' '}
              <span className="text-teal-600">by Region</span>
            </h2>
            <p className="text-navy/60 max-w-lg leading-relaxed font-light mb-8">
              Average treatment costs vary significantly by country. We present these figures
              for reference so patients can plan accordingly.
            </p>
            <Link
              href="/procedures/veneers"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-navy-light transition-all duration-300 tracking-wide"
            >
              Compare All Costs
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
            className="bg-white rounded-2xl p-8 border border-navy/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            <h3 className="text-sm font-semibold text-navy mb-8 pb-4 border-b border-navy/[0.06]">
              Avg. Cost: Porcelain Veneer (Per Tooth)
            </h3>
            <div className="space-y-5">
              {DATA.map((item, index) => (
                <div key={item.country} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span>{item.flag}</span>
                      <span className="font-medium text-navy">{item.country}</span>
                    </div>
                    <span className={`font-bold ${item.highlight ? 'text-teal' : 'text-navy/50'}`}>
                      {item.label}
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-navy/[0.04] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.cost / maxCost) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                      className={`h-full rounded-full ${item.highlight ? 'bg-gradient-to-r from-teal-500 to-emerald-400 shadow-[0_0_15px_rgba(20,184,166,0.4)]' : 'bg-navy/20'}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3 p-4 rounded-xl bg-navy/[0.02] border border-navy/[0.06]">
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
