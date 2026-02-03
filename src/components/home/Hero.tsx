'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { m } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { Search, MapPin, ArrowRight } from 'lucide-react'

// Mock popular searches
const POPULAR_SEARCHES = [
    { label: 'Dental Veneers in Turkey', href: '/search?procedure=veneers&country=turkey' },
    { label: 'Hair Transplant in Istanbul', href: '/search?procedure=hair-transplant&city=istanbul' },
    { label: 'IVF in Spain', href: '/search?procedure=ivf&country=spain' },
    { label: 'Rhinoplasty in Mexico', href: '/search?procedure=rhinoplasty&country=mexico' },
]

export function Hero() {
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [destination, setDestination] = useState('')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const searchParams = new URLSearchParams()
        if (query) searchParams.set('query', query)
        if (destination) searchParams.set('country', destination)
        router.push(`/search?${searchParams.toString()}`)
    }

    return (
        <section className="relative overflow-hidden bg-background pt-20 pb-16 lg:pt-32 lg:pb-24">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-100/40 blur-[120px] rounded-full mix-blend-multiply opacity-70 animate-blob" />
                <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-accent-100/40 blur-[100px] rounded-full mix-blend-multiply opacity-60 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-32 left-0 w-[800px] h-[600px] bg-white/40 blur-[100px] rounded-full mix-blend-overlay opacity-70 animate-blob animation-delay-4000" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl mb-6">
                            Find World-Class Healthcare. <br className="hidden sm:block" />
                            <span className="text-primary-600">Anywhere.</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
                            Connect with top-rated clinics globally. Your journey to premium, affordable care starts here.
                        </p>
                    </m.div>

                    {/* Search Bar */}
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                        className="mt-10 relative max-w-3xl mx-auto"
                    >
                        <form onSubmit={handleSearch} className="relative flex flex-col md:flex-row items-center gap-4 bg-white p-2 rounded-2xl shadow-xl shadow-neutral-200/50 border border-neutral-100">
                            <div className="relative flex-1 w-full md:w-auto">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-neutral-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-11 pr-4 py-4 md:py-3 bg-transparent border-none rounded-xl text-neutral-900 placeholder-neutral-400 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-base"
                                    placeholder="Treatment, aesthetic, or keyword"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>

                            <div className="hidden md:block w-px h-8 bg-neutral-200 mx-2" />

                            <div className="relative flex-1 w-full md:w-auto px-4 md:px-0">
                                <div className="absolute inset-y-0 left-0 md:pl-2 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-neutral-400" />
                                </div>
                                <select
                                    className="block w-full pl-10 md:pl-9 pr-10 py-4 md:py-3 bg-transparent border-none rounded-xl text-neutral-900 placeholder-neutral-400 focus:ring-2 focus:ring-primary-500/20 focus:outline-none appearance-none text-base cursor-pointer"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                >
                                    <option value="">Any Destination</option>
                                    <option value="Turkey">Turkey</option>
                                    <option value="Spain">Spain</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Thailand">Thailand</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                    <svg className="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>

                            <div className="p-1 w-full md:w-auto">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-8 h-12 md:h-12 shadow-lg shadow-primary-600/20"
                                >
                                    Search
                                </Button>
                            </div>
                        </form>
                    </m.div>

                    {/* Popular Links */}
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-neutral-500"
                    >
                        <span className="font-medium">Popular:</span>
                        {POPULAR_SEARCHES.map((search) => (
                            <Link
                                key={search.label}
                                href={search.href}
                                className="hover:text-primary-600 transition-colors underline decoration-dotted underline-offset-4"
                            >
                                {search.label}
                            </Link>
                        ))}
                    </m.div>
                </div>
            </div>
        </section>
    )
}
