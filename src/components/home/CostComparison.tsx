'use client'

import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { TrendingDown, ArrowRight } from 'lucide-react'

const DATA = [
    { country: 'USA', cost: 2500, label: '$2,500' },
    { country: 'UK', cost: 2100, label: '£1,800' },
    { country: 'Germany', cost: 1800, label: '€1,650' },
    { country: 'Mexico', cost: 450, label: '$450', highlight: true },
    { country: 'Turkey', cost: 300, label: '€280', highlight: true },
]

export function CostComparison() {
    const maxCost = Math.max(...DATA.map(d => d.cost))

    return (
        <section className="py-24 bg-neutral-900 text-white overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/20 text-accent-400 text-sm font-medium mb-6">
                            <TrendingDown className="h-4 w-4" />
                            <span>Save up to 80%</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
                            Premium Healthcare, <br />
                            <span className="text-white/60">Fraction of the Cost.</span>
                        </h2>
                        <p className="text-lg text-neutral-400 mb-8 leading-relaxed max-w-lg">
                            Compare prices for top procedures like dental veneers, hair transplants, and rhinoplasty across 10+ countries. Get the same quality of care for significantly less.
                        </p>
                        <Link href="/procedures/veneers">
                            <Button variant="accent" size="lg" className="rounded-xl px-8">
                                Compare All Costs
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Link>
                    </div>

                    <div className="bg-neutral-800/50 rounded-3xl p-8 border border-neutral-700/50 backdrop-blur-sm">
                        <h3 className="text-lg font-semibold text-white mb-8 border-b border-neutral-700 pb-4">
                            Avg. Cost: Porcelain Veneer (Per Tooth)
                        </h3>
                        <div className="space-y-6">
                            {DATA.map((item, index) => (
                                <div key={item.country} className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span className="text-neutral-300">{item.country}</span>
                                        <span className={item.highlight ? 'text-accent-400' : 'text-neutral-400'}>{item.label}</span>
                                    </div>
                                    <div className="h-3 w-full bg-neutral-700 rounded-full overflow-hidden">
                                        <m.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${(item.cost / maxCost) * 100}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                                            className={`h-full rounded-full ${item.highlight ? 'bg-accent-500' : 'bg-neutral-500'}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-xs text-neutral-500 text-center">
                            *Estimated average costs for comparison purposes only.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
