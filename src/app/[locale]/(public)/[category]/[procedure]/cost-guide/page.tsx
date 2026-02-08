import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { createStaticClient } from '@/lib/supabase/static'
import {
  getCategoryBySlug,
  getProcedureCostGuideData,
} from '@/lib/data/content'
import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { StructuredData } from '@/components/seo/structured-data-component'
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo/structured-data'
import { CostGuideClient } from './cost-guide-client'

interface CostGuidePageProps {
  params: Promise<{ locale: string; category: string; procedure: string }>
}

export async function generateStaticParams() {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from('procedures')
    .select(`
      slug,
      category:categories(slug)
    `)

  if (!data) return []

  return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((d: any) => d.slug && d.category?.slug)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((d: any) => ({
      category: d.category.slug,
      procedure: d.slug,
    }))
}

export async function generateMetadata({ params }: CostGuidePageProps): Promise<Metadata> {
  const { category: categorySlug, procedure: procedureSlug } = await params

  const data = await getProcedureCostGuideData(procedureSlug)

  if (!data) {
    const procedureName = procedureSlug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')

    return {
      title: `${procedureName} Cost Guide 2026 - Prices by Country | MeetYourClinic`,
      description: `Compare ${procedureName.toLowerCase()} costs across countries. See prices, savings vs UK, and find the best value clinics abroad.`,
    }
  }

  const cheapest = data.destinations[0]
  const maxSavings = data.destinations.length > 0
    ? Math.max(...data.destinations.map((d) => d.savings_vs_uk))
    : 0

  return {
    title: `${data.procedure.name} Cost Guide 2026 - Prices by Country | MeetYourClinic`,
    description: `${data.procedure.name} costs from ${cheapest ? `£${cheapest.price_min.toLocaleString()}` : 'affordable prices'} abroad vs £${data.uk_private_cost_min.toLocaleString()}-${data.uk_private_cost_max.toLocaleString()} in the UK. Save up to ${maxSavings}%. Compare ${data.destinations.length} countries.`,
    alternates: {
      canonical: `/${categorySlug}/${procedureSlug}/cost-guide`,
    },
  }
}

export const revalidate = 3600

export default async function CostGuidePage({ params }: CostGuidePageProps) {
  const { locale, category: categorySlug, procedure: procedureSlug } = await params
  setRequestLocale(locale)

  const [category, data] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getProcedureCostGuideData(procedureSlug),
  ])

  if (!category || !data) {
    notFound()
  }

  // Verify the procedure belongs to this category
  if (data.category && data.category.slug !== categorySlug) {
    notFound()
  }

  // Generate FAQ items for structured data
  const faqItems = [
    {
      question: `How much does ${data.procedure.name.toLowerCase()} cost in the UK?`,
      answer: `${data.procedure.name} in the UK typically costs between £${data.uk_private_cost_min.toLocaleString()} and £${data.uk_private_cost_max.toLocaleString()} at private clinics. NHS waiting lists can be lengthy, which is why many patients consider going abroad.`,
    },
    {
      question: `What is the cheapest country for ${data.procedure.name.toLowerCase()}?`,
      answer: data.destinations.length > 0
        ? `Based on current data, ${data.destinations[0].country_name} offers some of the lowest prices for ${data.procedure.name.toLowerCase()}, starting from £${data.destinations[0].price_min.toLocaleString()}. However, price should be balanced with clinic quality and accreditation.`
        : `Prices vary by country. Use our comparison tool to find the most affordable option for ${data.procedure.name.toLowerCase()}.`,
    },
    {
      question: `How much can I save on ${data.procedure.name.toLowerCase()} by going abroad?`,
      answer: data.destinations.length > 0
        ? `Patients can save up to ${Math.max(...data.destinations.map((d) => d.savings_vs_uk))}% compared to UK private prices by travelling abroad for ${data.procedure.name.toLowerCase()}. Savings vary by destination, with countries closer to the UK sometimes offering lower travel costs too.`
        : `Patients typically save 40-70% on ${data.procedure.name.toLowerCase()} by choosing accredited clinics abroad.`,
    },
    {
      question: `Is it safe to get ${data.procedure.name.toLowerCase()} abroad?`,
      answer: `Yes, when you choose accredited clinics. Look for JCI, ISO, or equivalent certifications. Many international clinics use the same equipment and techniques as UK hospitals. Always research your clinic and surgeon thoroughly before committing.`,
    },
    {
      question: `What is included in the price of ${data.procedure.name.toLowerCase()} abroad?`,
      answer: `Most international clinics include the consultation, the procedure itself, hospital stay, aftercare, and local transfers in their quoted price. Some also include accommodation and airport transfers. Always confirm exactly what is included before booking.`,
    },
    {
      question: `How do I choose the best country for ${data.procedure.name.toLowerCase()}?`,
      answer: `Consider the total cost (including flights and accommodation), clinic accreditation, surgeon experience, flight time, language barriers, and visa requirements. Our cost comparison table helps you weigh these factors across multiple countries.`,
    },
  ]

  const faqSchema = generateFAQSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: category.name, url: `/${category.slug}` },
    { name: data.procedure.name, url: `/${categorySlug}/${procedureSlug}` },
    { name: 'Cost Guide' },
  ])

  return (
    <div className="min-h-screen bg-neutral-50">
      <StructuredData data={[faqSchema, breadcrumbSchema]} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb />
      </div>

      <CostGuideClient
        data={data}
        categorySlug={categorySlug}
        faqItems={faqItems}
      />
    </div>
  )
}
