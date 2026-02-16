'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { CATEGORY_CONFIGS } from '@/lib/categories/config'

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
}

export function ProceduresListClient() {
    const categories = Object.values(CATEGORY_CONFIGS).filter(
        (cat) => cat.relatedTreatments.length > 0
    )

    return (
        <LazyMotion features={domAnimation}>
            <section className="bg-slate-50 py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <m.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <m.h1
                            variants={fadeInUp}
                            className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
                        >
                            Medical Procedures & Treatments
                        </m.h1>
                        <m.p
                            variants={fadeInUp}
                            className="mx-auto mt-6 max-w-2xl text-xl text-slate-600"
                        >
                            Explore our comprehensive guides to medical treatments abroad.
                            Find detailed information on costs, techniques, and top destinations.
                        </m.p>
                    </m.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((category) => (
                            <m.div
                                key={category.slug}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className="p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 bg-teal-50 rounded-xl text-teal-600">
                                            {/* Placeholder for icon - could use category.icon if it was a component */}
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                />
                                            </svg>
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900">
                                            {category.name}
                                        </h2>
                                    </div>

                                    <ul className="space-y-3">
                                        {category.relatedTreatments.map((treatment) => (
                                            <li key={treatment.slug}>
                                                <Link
                                                    href={`/procedures/${treatment.slug}`}
                                                    className="group flex items-center text-slate-600 hover:text-teal-600 transition-colors"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-teal-500 mr-3 transition-colors" />
                                                    {treatment.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-8 pt-6 border-t border-slate-50">
                                        <Link
                                            href={`/clinics/${category.slug}`}
                                            className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                                        >
                                            View all {category.name.toLowerCase()} clinics
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </m.div>
                        ))}
                    </div>
                </div>
            </section>
        </LazyMotion>
    )
}
