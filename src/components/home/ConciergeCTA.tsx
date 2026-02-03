'use client'

import { m } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Mic, Sparkles, MessageSquare } from 'lucide-react'

export function ConciergeCTA() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative bg-primary-900 rounded-[2.5rem] p-8 sm:p-16 overflow-hidden">
                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary-800 rounded-full blur-3xl opacity-50" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-accent-600 rounded-full blur-3xl opacity-30" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-xl text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-6 backdrop-blur-md border border-white/10">
                                <Sparkles className="h-4 w-4 text-accent-400" />
                                <span>AI-Powered Assistance</span>
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl mb-6">
                                Not sure where to start? <br />
                                Talk to our AI Concierge.
                            </h2>
                            <p className="text-lg text-primary-100 mb-8 leading-relaxed">
                                Our advanced AI advisor knows every clinic, treatment, and regulation.
                                Tell it what you need in plain language and get personalised recommendations instantly.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Button size="lg" className="bg-white text-primary-900 hover:bg-primary-50 border-none shadow-xl shadow-black/10 rounded-xl h-14 px-8 text-lg font-semibold group">
                                    <Mic className="mr-2 h-5 w-5 text-accent-500 group-hover:scale-110 transition-transform" />
                                    Talk to Concierge
                                </Button>
                                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 rounded-xl h-14 px-8 text-lg">
                                    <MessageSquare className="mr-2 h-5 w-5" />
                                    Start Chat
                                </Button>
                            </div>
                        </div>

                        {/* Visual Representation */}
                        <div className="relative">
                            <m.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="relative w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-tr from-white/10 to-white/5 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center"
                            >
                                <div className="absolute inset-4 rounded-full border border-white/10 animate-spin-slow" />
                                <div className="absolute inset-8 rounded-full border border-white/10 animate-reverse-spin-slow" />
                                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-primary-900/50">
                                    <Mic className="h-12 w-12 text-primary-600" />
                                </div>

                                {/* Floating Badges */}
                                <m.div
                                    animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                                    className="absolute -top-4 -right-4 bg-white p-3 rounded-2xl shadow-lg flex items-center gap-2"
                                >
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-sm font-bold text-neutral-800">Online</span>
                                </m.div>
                            </m.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
