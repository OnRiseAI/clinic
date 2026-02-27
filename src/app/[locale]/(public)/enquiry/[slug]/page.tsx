import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getClinicBySlug } from '@/lib/data/clinics'
import EnquiryFlow from '@/components/enquiry-flow'
import { ConciergeWidget } from '@/components/concierge'

const defaultMetadata: Metadata = {
  title: 'Get a Free Quote | MeetYourClinic',
  description: 'Request a free, no-obligation quote. Compare prices and connect directly. Takes less than 2 minutes.',
  robots: {
    index: false,
    follow: true,
  },
}

interface PageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const clinic = await getClinicBySlug(resolvedParams.slug)

  if (!clinic) {
    return defaultMetadata
  }

  return {
    title: `Get a Free Quote from ${clinic.name} | MeetYourClinic`,
    description: `Request a free, no-obligation quote from ${clinic.name} in ${clinic.city || clinic.country || 'abroad'}. Compare prices and connect directly. Takes less than 2 minutes.`,
    robots: {
      index: false,
      follow: true,
    },
  }
}

export default async function EnquiryPage({ params }: PageProps) {
  const resolvedParams = await params
  const clinic = await getClinicBySlug(resolvedParams.slug)

  if (!clinic) {
    notFound()
  }

  // Pass necessary clinic info to the client component
  // Extracting procedures cleanly
  const procedures = clinic.clinic_procedures?.map(cp => ({
    id: cp.id,
    name: cp.procedure.name,
    slug: cp.procedure.slug,
    price_min: cp.price_min,
    currency: cp.currency,
  })) || []

  // Ensure unique procedures if there are duplicates
  const uniqueProcedures = procedures.filter((v, i, a) => a.findIndex(t => (t.slug === v.slug)) === i);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <EnquiryFlow 
        clinic={{
          id: clinic.id,
          name: clinic.name,
          slug: clinic.slug,
          city: clinic.city,
          country: clinic.country,
          rating: clinic.google_reviews?.rating || null,
          photoUrl: clinic.photos?.[0]?.url || null,
        }}
        procedures={uniqueProcedures}
      />
      <ConciergeWidget agentId={process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID} />
    </div>
  )
}
