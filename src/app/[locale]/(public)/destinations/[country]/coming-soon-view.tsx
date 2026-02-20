'use client'

import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, CheckCircle2, Globe2, Sparkles } from 'lucide-react'
// import Image from 'next/image'

interface ComingSoonViewProps {
    countryName: string
    countrySlug: string
}

export function ComingSoonView({ countryName, countrySlug }: ComingSoonViewProps) {
    return (
        <div className="relative min-h-[90vh] overflow-hidden bg-neutral-50 selection:bg-primary-100 selection:text-primary-900">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute -top-[30%] -right-[10%] h-[800px] w-[800px] rounded-full bg-gradient-to-br from-primary-100/40 to-accent-100/40 blur-3xl opacity-50" />
                <div className="absolute top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-accent-50/50 to-primary-50/50 blur-3xl animate-blob animation-delay-4000 opacity-50" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

                {/* Subtle grid pattern using CSS gradients */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-32 sm:px-6 lg:px-8">
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center rounded-full border border-accent-200 bg-accent-50 px-4 py-1.5 shadow-sm">
                            <span className="flex h-2 w-2 rounded-full bg-accent-500 animate-pulse mr-2" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-accent-800">
                                Coming Soon to {countryName}
                            </span>
                        </div>

                        <h1 className="text-5xl font-bold tracking-tight text-primary-900 sm:text-6xl lg:text-7xl">
                            World-Class Care in <span className="relative whitespace-nowrap">
                                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-accent-600">
                                    {countryName}
                                </span>
                                <span className="absolute bottom-2 left-0 -z-10 h-3 w-full bg-accent-200/40 transform -rotate-1 skew-x-3" />
                            </span>
                        </h1>

                        <p className="max-w-xl text-lg leading-relaxed text-neutral-600">
                            We are currently vetting the top clinics and specialists in {countryName} to ensure they meet our rigorous <span className="font-semibold text-primary-700">VisQuanta Gold Standard™</span> for safety, quality, and patient care.
                        </p>

                        <div className="flex flex-col gap-4 sm:flex-row pt-4">
                            <Link href="/auth/claim">
                                <Button size="lg" className="group relative w-full overflow-hidden rounded-full bg-primary-900 px-8 py-4 text-white shadow-xl transition-all hover:scale-[1.02] hover:shadow-primary-900/20 sm:w-auto">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        List Your Clinic
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-800 to-primary-950 opacity-0 transition-opacity group-hover:opacity-100" />
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                                </Button>
                            </Link>

                            <Link href="/">
                                <Button variant="outline" size="lg" className="w-full rounded-full border-neutral-300 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-neutral-400 sm:w-auto">
                                    Explore Active Destinations
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-8 border-t border-neutral-200 mt-8">
                            <div className="flex gap-3">
                                <div className="flex-shrink-0">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-alert">
                                        <CheckCircle2 className="h-5 w-5 text-primary-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-primary-900">Vetted Clinics</h3>
                                    <p className="text-sm text-neutral-500 mt-1"> rigorous 50-point inspection</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-shrink-0">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50">
                                        <Globe2 className="h-5 w-5 text-primary-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-primary-900">Local Experts</h3>
                                    <p className="text-sm text-neutral-500 mt-1">Multilingual support teams</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Graphic Column */}
                    <div className="relative lg:h-full flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            className="relative w-full max-w-lg"
                        >
                            {/* Decorative rings */}
                            <div className="absolute -inset-4 rounded-[2rem] border border-neutral-200/60 bg-white/40 shadow-xl backdrop-blur-sm" />
                            <div className="absolute -inset-8 -z-10 rounded-[2.5rem] border border-neutral-100/50 bg-white/20 shadow-lg backdrop-blur-[2px]" />

                            {/* Main Card */}
                            <div className="relative overflow-hidden rounded-[1.5rem] bg-white shadow-2xl ring-1 ring-neutral-900/5">
                                {/* Header mock */}
                                <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50/50 px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-red-400" />
                                        <div className="h-3 w-3 rounded-full bg-yellow-400" />
                                        <div className="h-3 w-3 rounded-full bg-green-400" />
                                    </div>
                                    <div className="h-2 w-20 rounded-full bg-neutral-200" />
                                </div>

                                {/* Content mock */}
                                <div className="p-8 space-y-6">
                                    <div className="space-y-2">
                                        <div className="h-4 w-1/3 rounded bg-neutral-100" />
                                        <div className="h-8 w-3/4 rounded bg-neutral-900" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-32 rounded-xl bg-neutral-100 animate-pulse" />
                                        <div className="h-32 rounded-xl bg-neutral-100 animate-pulse delay-75" />
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <div className="h-4 w-full rounded bg-neutral-100" />
                                        <div className="h-4 w-5/6 rounded bg-neutral-100" />
                                        <div className="h-4 w-4/6 rounded bg-neutral-100" />
                                    </div>

                                    <div className="pt-4 flex justify-between items-center">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-neutral-200" />
                                            ))}
                                        </div>
                                        <div className="h-10 w-28 rounded-full bg-primary-900" />
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="absolute bottom-6 right-6 rounded-lg border border-white/20 bg-white/80 p-4 shadow-xl backdrop-blur-md"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-100 text-accent-700">
                                            <Sparkles className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-neutral-500">Destination Status</p>
                                            <p className="text-sm font-bold text-primary-900">Vetting In Progress</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
