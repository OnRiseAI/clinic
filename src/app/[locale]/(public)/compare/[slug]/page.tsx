import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getProcedureComparisonData } from '@/lib/data/content'
import { createStaticClient } from '@/lib/supabase/static'
import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { StructuredData } from '@/components/seo/structured-data-component'
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo/structured-data'
import { ComparisonClient } from './comparison-client'

interface ComparePageProps {
  params: Promise<{ locale: string; slug: string }>
}

function slugToName(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slug } = await params

  if (!slug.includes('-vs-')) {
    return { title: 'Comparison Not Found' }
  }

  const [slugA, slugB] = slug.split('-vs-')
  const data = await getProcedureComparisonData(slugA, slugB)

  if (!data) {
    const nameA = slugToName(slugA)
    const nameB = slugToName(slugB)
    return {
      title: `${nameA} vs ${nameB}: Cost, Recovery & Results Compared | MeetYourClinic`,
      description: `Compare ${nameA} and ${nameB} side by side. See differences in cost, recovery time, results, and find the best clinics abroad.`,
    }
  }

  return {
    title: `${data.procedureA.name} vs ${data.procedureB.name}: Cost, Recovery & Results Compared | MeetYourClinic`,
    description: `Compare ${data.procedureA.name} and ${data.procedureB.name} side by side. See differences in UK private costs, recovery time, risk level, and pricing abroad at accredited clinics.`,
    openGraph: {
      title: `${data.procedureA.name} vs ${data.procedureB.name} Compared`,
      description: `Side-by-side comparison of ${data.procedureA.name} and ${data.procedureB.name}: costs, recovery, risk level, and international pricing.`,
    },
  }
}

export const revalidate = 3600

export async function generateStaticParams() {
  const supabase = createStaticClient()

  // Fetch all procedures grouped by category
  const { data: procedures } = await supabase
    .from('procedures')
    .select('slug, category_id')
    .not('category_id', 'is', null)
    .order('slug')

  if (!procedures || procedures.length === 0) return []

  // Group procedures by category
  const byCategory: Record<string, string[]> = {}
  for (const proc of procedures) {
    if (!proc.category_id) continue
    if (!byCategory[proc.category_id]) byCategory[proc.category_id] = []
    byCategory[proc.category_id].push(proc.slug)
  }

  // Generate pairs within each category, alphabetically first combo only
  const params: { slug: string }[] = []
  for (const slugs of Object.values(byCategory)) {
    const sorted = [...slugs].sort()
    for (let i = 0; i < sorted.length; i++) {
      for (let j = i + 1; j < sorted.length; j++) {
        params.push({ slug: `${sorted[i]}-vs-${sorted[j]}` })
      }
    }
  }

  return params
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  if (!slug.includes('-vs-')) {
    notFound()
  }

  const [slugA, slugB] = slug.split('-vs-')
  const data = await getProcedureComparisonData(slugA, slugB)

  if (!data) {
    notFound()
  }

  // Generate FAQ items for structured data
  const faqItems = [
    {
      question: `What is the difference between ${data.procedureA.name} and ${data.procedureB.name}?`,
      answer: `${data.procedureA.name} and ${data.procedureB.name} are both medical procedures but differ in cost, recovery time, and approach. ${data.procedureA.name} typically has a recovery time of ${data.procedureA.recovery_days_min || 'a few'}-${data.procedureA.recovery_days_max || 'several'} days, while ${data.procedureB.name} requires ${data.procedureB.recovery_days_min || 'a few'}-${data.procedureB.recovery_days_max || 'several'} days.`,
    },
    {
      question: `Which is cheaper abroad, ${data.procedureA.name} or ${data.procedureB.name}?`,
      answer: `Both procedures are available at significantly lower costs abroad compared to UK private prices. The exact savings depend on the destination country and clinic. Compare pricing from accredited clinics on MeetYourClinic to find the best value.`,
    },
    {
      question: `Which procedure has a faster recovery, ${data.procedureA.name} or ${data.procedureB.name}?`,
      answer: `${data.procedureA.name} has a typical recovery of ${data.procedureA.recovery_days_min || 'a few'}-${data.procedureA.recovery_days_max || 'several'} days, while ${data.procedureB.name} requires ${data.procedureB.recovery_days_min || 'a few'}-${data.procedureB.recovery_days_max || 'several'} days. Individual recovery times vary based on health and procedure complexity.`,
    },
    {
      question: `Can I combine ${data.procedureA.name} and ${data.procedureB.name}?`,
      answer: `In some cases, procedures can be combined during a single trip abroad, which may reduce overall costs and recovery time. Consult with your chosen clinic to discuss whether combining these procedures is safe and appropriate for your situation.`,
    },
    {
      question: `How do I choose between ${data.procedureA.name} and ${data.procedureB.name}?`,
      answer: `The best choice depends on your specific goals, budget, available recovery time, and medical history. Consider factors like cost, recovery duration, risk level, and expected results. A qualified surgeon can help you decide which procedure best meets your needs.`,
    },
  ]

  const faqSchema = generateFAQSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Compare Procedures', url: '/compare' },
    { name: `${data.procedureA.name} vs ${data.procedureB.name}` },
  ])

  return (
    <div className="min-h-screen bg-neutral-50">
      <StructuredData data={[faqSchema, breadcrumbSchema]} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb />
      </div>

      <ComparisonClient
        procedureA={data.procedureA}
        procedureB={data.procedureB}
        categoryA={data.categoryA}
        categoryB={data.categoryB}
        destinationsA={data.destinationsA}
        destinationsB={data.destinationsB}
      />
    </div>
  )
}
