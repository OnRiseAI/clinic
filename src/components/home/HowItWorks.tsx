'use client'

import { motion } from 'framer-motion'
import { Search, Scale, MessageCircle } from 'lucide-react'

const STEPS = [
    {
        icon: Search,
        title: 'Tell us what you need',
        description: 'Use our smart search or AI concierge to find the perfect treatment and destination for your needs.'
    },
    {
        icon: Scale,
        title: 'Compare clinics',
        description: 'Review verified profiles, doctor credentials, and transparent pricing to make an informed choice.'
    },
    {
        icon: MessageCircle,
        title: 'Connect directly',
        description: 'Send enquiries, chat via WhatsApp, or book a consultation directly with the clinic.'
    }
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-neutral-50/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                        Your Journey to Better Health
                    </h2>
                    <p className="mt-4 text-lg text-neutral-600">
                        We simplify medical travel. Find, compare, and book trusted care abroad in three simple steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {STEPS.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="relative flex flex-col items-center text-center group"
                        >
                            <div className="mb-6 relative">
                                <div className="absolute inset-0 bg-primary-100 rounded-full scale-0 group-hover:scale-110 transition-transform duration-300" />
                                <div className="relative h-16 w-16 bg-white border border-neutral-100 rounded-2xl shadow-sm flex items-center justify-center group-hover:border-primary-200 group-hover:shadow-md transition-all">
                                    <step.icon className="h-8 w-8 text-primary-600" />
                                </div>
                                {index !== STEPS.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 left-full w-full h-px bg-neutral-200 -translate-y-1/2 translate-x-4 lg:translate-x-8" style={{ width: 'calc(100% - 4rem)' }} />
                                )}
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-3">{step.title}</h3>
                            <p className="text-neutral-500 leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
