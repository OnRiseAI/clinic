import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import { getFeaturedClinics } from '@/lib/data/clinics'
import { ClinicCard } from '@/components/clinics/clinic-card'
import { FadeIn, FadeInStagger } from '@/components/ui/fade-in'

export async function FeaturedClinics() {
    const clinics = await getFeaturedClinics(4)

    if (!clinics.length) return null

    return (
        <section className="py-24 bg-white border-y border-neutral-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold uppercase tracking-wide">Highly Rated</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                            Featured Clinics
                        </h2>
                        <p className="mt-4 text-lg text-neutral-600">
                            Hand-picked for excellence in care, patient satisfaction, and medical standards.
                        </p>
                    </div>
                    <Link href="/search?featured=true" className="group flex items-center gap-2 font-semibold text-primary-600 hover:text-primary-700">
                        View all featured clinics
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {clinics.map((clinic) => (
                        <FadeIn key={clinic.id}>
                            <ClinicCard clinic={clinic} showEnquiryButton={false} />
                        </FadeIn>
                    ))}
                </FadeInStagger>
            </div>
        </section>
    )
}
