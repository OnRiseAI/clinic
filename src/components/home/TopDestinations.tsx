import { Link } from '@/i18n/navigation'
import { ArrowRight, MapPin } from 'lucide-react'
import { getDestinations } from '@/lib/data/clinics'
import { FadeIn, FadeInStagger } from '@/components/ui/fade-in'

export async function TopDestinations() {
    const destinations = await getDestinations()
    const displayDestinations = destinations.slice(0, 6)

    if (!displayDestinations.length) return null

    return (
        <section className="py-24 bg-neutral-50/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                            Top Destinations
                        </h2>
                        <p className="mt-4 text-lg text-neutral-600">
                            World-class healthcare hubs known for quality and affordability.
                        </p>
                    </div>
                    <Link href="/destinations" className="group flex items-center gap-2 font-semibold text-primary-600 hover:text-primary-700">
                        View all countries
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayDestinations.map((dest) => (
                        <FadeIn key={dest.id}>
                            <Link
                                href={`/destinations/${dest.slug}`}
                                className="group relative block overflow-hidden rounded-3xl aspect-[4/3] isolate"
                            >
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300 opacity-90 group-hover:opacity-100" />

                                {/* Background Image Placeholder (since we don't have images in DB yet) */}
                                <div className="absolute inset-0 bg-neutral-300 -z-10">
                                    <img
                                        src={`https://source.unsplash.com/800x600/?${dest.country_name},landmark`}
                                        alt={dest.country_name}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="px-2 py-1 bg-white/20 backdrop-blur-md rounded border border-white/30 text-white text-xs font-semibold uppercase tracking-wider">
                                            Top Rated
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{dest.country_name}</h3>
                                    <div className="flex items-center text-white/80 text-sm gap-4">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>50+ Clinics</span>
                                        </div>
                                        <div className="w-1 h-1 bg-white/50 rounded-full" />
                                        <span>Popular: Dentistry</span>
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </FadeInStagger>
            </div>
        </section>
    )
}
