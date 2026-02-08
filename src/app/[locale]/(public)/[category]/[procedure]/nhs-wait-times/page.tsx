import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { createStaticClient } from '@/lib/supabase/static'
import {
  getNHSWaitTimeData,
  getCategoryBySlug,
} from '@/lib/data/content'
import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { StructuredData } from '@/components/seo/structured-data-component'
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo/structured-data'
import { NHSWaitTimesClient } from './nhs-wait-times-client'

interface NHSWaitTimesPageProps {
  params: Promise<{ locale: string; category: string; procedure: string }>
}

export async function generateMetadata({ params }: NHSWaitTimesPageProps): Promise<Metadata> {
  const { procedure: procedureSlug } = await params
  const data = await getNHSWaitTimeData(procedureSlug)

  if (!data) {
    return { title: 'NHS Wait Times' }
  }

  const procedureName = data.procedure.name
  const waitWeeks = data.nhs_wait_weeks
  const lowestPrice = data.destinations.length > 0
    ? Math.min(...data.destinations.map((d) => d.price_min))
    : null

  return {
    title: `${procedureName} NHS Wait Times vs Going Abroad | MeetYourClinic`,
    description: `Current NHS wait time for ${procedureName.toLowerCase()} is ${waitWeeks} weeks. Compare costs and timelines for getting ${procedureName.toLowerCase()} abroad${lowestPrice ? ` from £${lowestPrice.toLocaleString()}` : ''}. Skip the queue and save.`,
    openGraph: {
      title: `${procedureName}: ${waitWeeks}-Week NHS Wait vs Treatment Abroad`,
      description: `Tired of waiting ${waitWeeks} weeks for ${procedureName.toLowerCase()} on the NHS? See how going abroad can save you time and money.`,
    },
  }
}

export async function generateStaticParams() {
  const supabase = createStaticClient()

  const { data: procedures } = await supabase
    .from('procedures')
    .select(`
      slug,
      category:categories(slug)
    `)
    .not('nhs_wait_weeks', 'is', null)
    .gt('nhs_wait_weeks', 0)

  if (!procedures) return []

  return procedures
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((p: any) => p.category)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((p: any) => ({
      category: p.category.slug,
      procedure: p.slug,
    }))
}

export const revalidate = 3600

export default async function NHSWaitTimesPage({ params }: NHSWaitTimesPageProps) {
  const { locale, category: categorySlug, procedure: procedureSlug } = await params
  setRequestLocale(locale)

  // Fetch category and NHS wait time data in parallel
  const [category, nhsData] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getNHSWaitTimeData(procedureSlug),
  ])

  if (!category || !nhsData) {
    notFound()
  }

  // Verify the procedure belongs to this category
  const procedure = nhsData.procedure
  if (procedure.category_id !== category.id && procedure.category?.slug !== categorySlug) {
    notFound()
  }

  // Generate FAQ items for structured data
  const procedureName = procedure.name
  const waitWeeks = nhsData.nhs_wait_weeks
  const lowestPrice = nhsData.destinations.length > 0
    ? Math.min(...nhsData.destinations.map((d) => d.price_min))
    : null

  const faqItems = [
    {
      question: `Can I get ${procedureName.toLowerCase()} faster than the NHS?`,
      answer: `Yes. The current NHS wait for ${procedureName.toLowerCase()} is approximately ${waitWeeks} weeks. By choosing treatment abroad, most patients can have their procedure within 2-4 weeks of initial enquiry, including travel arrangements and pre-operative consultations.`,
    },
    {
      question: `How do abroad prices compare to private UK ${procedureName.toLowerCase()}?`,
      answer: `Treatment abroad is typically 40-70% cheaper than private UK clinics.${procedure.uk_private_cost_min ? ` Private UK ${procedureName.toLowerCase()} costs £${procedure.uk_private_cost_min.toLocaleString()}-£${(procedure.uk_private_cost_max || procedure.uk_private_cost_min).toLocaleString()}.` : ''}${lowestPrice ? ` Abroad, prices start from £${lowestPrice.toLocaleString()}.` : ''} This includes the procedure at internationally accredited facilities.`,
    },
    {
      question: `Will my GP accept follow-up care after ${procedureName.toLowerCase()} abroad?`,
      answer: `Yes, your GP is obliged to provide follow-up care regardless of where your procedure was performed. Bring your full medical records, discharge summary, and aftercare instructions. Most reputable international clinics provide detailed documentation in English specifically for this purpose.`,
    },
    {
      question: `Is ${procedureName.toLowerCase()} abroad as safe as the NHS?`,
      answer: `Many international clinics hold JCI accreditation (the gold standard for healthcare quality globally) and employ surgeons trained at leading Western institutions. The key is choosing an accredited clinic with experienced specialists. MeetYourClinic only lists verified, accredited clinics.`,
    },
    {
      question: `What is included in the price for ${procedureName.toLowerCase()} abroad?`,
      answer: `Most clinics abroad offer all-inclusive packages covering the procedure, anaesthesia, hospital stay, pre-operative tests, post-operative medications, and follow-up consultations. Some packages also include airport transfers and hotel accommodation. Always confirm exactly what is included before booking.`,
    },
    {
      question: `How long is the NHS waiting list for ${procedureName.toLowerCase()} in 2025?`,
      answer: `The current NHS wait for ${procedureName.toLowerCase()} is approximately ${waitWeeks} weeks (${Math.round(waitWeeks / 4.3)} months). Wait times vary by region and can be longer in some areas. Going abroad eliminates the wait entirely, with most patients treated within 2-4 weeks.`,
    },
  ]

  // Generate structured data
  const faqSchema = generateFAQSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: category.name, url: `/${category.slug}` },
    { name: procedure.name, url: `/${category.slug}/${procedure.slug}` },
    { name: 'NHS Wait Times' },
  ])

  return (
    <div className="min-h-screen bg-neutral-50">
      <StructuredData data={[faqSchema, breadcrumbSchema]} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb />
      </div>

      <NHSWaitTimesClient
        procedure={nhsData.procedure}
        category={category}
        nhsWaitWeeks={nhsData.nhs_wait_weeks}
        destinations={nhsData.destinations}
        faqItems={faqItems}
      />
    </div>
  )
}
