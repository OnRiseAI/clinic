import { Link } from '@/i18n/navigation'
import { ArrowRight, Activity, Stethoscope } from 'lucide-react'
import { getPopularProcedures } from '@/lib/data/clinics'
import { FadeIn, FadeInStagger } from '@/components/ui/fade-in'

export async function PopularProcedures() {
    const procedures = await getPopularProcedures(8)

    if (!procedures.length) return null

    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                            Popular Procedures
                        </h2>
                        <p className="mt-4 text-lg text-neutral-600">
                            Discover the most sought-after treatments by international patients.
                        </p>
                    </div>
                    <Link href="/search" className="group flex items-center gap-2 font-semibold text-primary-600 hover:text-primary-700">
                        View all procedures
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {procedures.map((proc) => (
                        <FadeIn key={proc.id}>
                            <Link
                                href={`/${proc.category?.slug || 'treatments'}/${proc.slug}`}
                                className="group block p-6 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-900/5 transition-all duration-300"
                            >
                                <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-sm mb-6 text-primary-600 group-hover:scale-110 transition-transform duration-300">
                                    {/* Placeholder Icon */}
                                    <Activity className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                                    {proc.name}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-neutral-500">
                                    <span>From €{(Math.random() * 2000 + 500).toFixed(0)}</span>
                                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                                    <span>{Math.floor(Math.random() * 50) + 10} Clinics</span>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </FadeInStagger>
            </div>
        </section>
    )
}
