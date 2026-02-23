import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { createStaticClient } from '@/lib/supabase/static'
import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: 'Procedure Comparisons | Compare Costs & Results | MeetYourClinic',
    description: 'Compare medical procedures side-by-side. See differences in UK private costs, recovery times abroad, and find the best clinics for your needs.',
}

export const revalidate = 3600

export default async function CompareHubPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    setRequestLocale(locale)

    const supabase = createStaticClient()

    // Fetch categories to show as options
    const { data: categories } = await supabase
        .from('categories')
        .select('id, name, slug, icon')
        .order('name')

    // Fetch some popular procedures for each category to show example comparisons
    const { data: procedures } = await supabase
        .from('procedures')
        .select('slug, name, category_id')
        .limit(100)

    // Group procedures by category
    const procsByCategory: Record<string, any[]> = {}
    procedures?.forEach((p) => {
        if (!p.category_id) return
        if (!procsByCategory[p.category_id]) procsByCategory[p.category_id] = []
        procsByCategory[p.category_id].push(p)
    })

    return (
        <div className="min-h-screen bg-neutral-50 mb-20">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Breadcrumb />

                <div className="text-center py-12">
                    <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">
                        Procedure Comparisons
                    </h1>
                    <p className="mt-4 mx-auto max-w-2xl text-lg text-neutral-600">
                        Make an informed decision by comparing treatments side-by-side.
                        See cost differences, recovery times, and risk levels.
                    </p>
                </div>

                <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
                    {categories?.map((category) => {
                        const catProcs = procsByCategory[category.id] || []
                        if (catProcs.length < 2) return null

                        return (
                            <div key={category.id} className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-2xl">{category.icon || '🏥'}</span>
                                    <h2 className="text-xl font-bold text-neutral-900">{category.name}</h2>
                                </div>

                                <div className="space-y-3">
                                    {/* Generate some example pairs */}
                                    {catProcs.slice(0, 1).map((p1, idx) => {
                                        const p2 = catProcs[idx + 1]
                                        if (!p2) return null
                                        // Proper sorting for SEO consistency
                                        const [s1, s2] = [p1.slug, p2.slug].sort()
                                        return (
                                            <Link
                                                key={`${p1.slug}-${p2.slug}`}
                                                href={`/compare/${s1}-vs-${s2}`}
                                                className="flex items-center justify-between group p-3 rounded-xl bg-neutral-50 hover:bg-primary-50 transition-colors"
                                            >
                                                <span className="text-sm font-medium text-neutral-700 group-hover:text-primary-700">
                                                    {p1.name} vs {p2.name}
                                                </span>
                                                <span className="text-primary-400 group-hover:translate-x-1 transition-transform">→</span>
                                            </Link>
                                        )
                                    })}

                                    {catProcs.length > 2 && catProcs.slice(2, 3).map((p1, idx) => {
                                        const p2 = catProcs[idx + 3] || catProcs[0]
                                        if (p1.slug === p2.slug) return null
                                        const [s1, s2] = [p1.slug, p2.slug].sort()
                                        return (
                                            <Link
                                                key={`${p1.slug}-${p2.slug}`}
                                                href={`/compare/${s1}-vs-${s2}`}
                                                className="flex items-center justify-between group p-3 rounded-xl bg-neutral-50 hover:bg-primary-50 transition-colors"
                                            >
                                                <span className="text-sm font-medium text-neutral-700 group-hover:text-primary-700">
                                                    {p1.name} vs {p2.name}
                                                </span>
                                                <span className="text-primary-400 group-hover:translate-x-1 transition-transform">→</span>
                                            </Link>
                                        )
                                    })}
                                </div>

                                <Link href={`/${category.slug}`} className="mt-6 block">
                                    <Button variant="outline" className="w-full">
                                        View All {category.name}
                                    </Button>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
