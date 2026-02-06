import { setRequestLocale } from 'next-intl/server'
import { Hero } from '@/components/home/Hero'
import { StatsBar } from '@/components/home/StatsBar'
import { TrustBar } from '@/components/home/TrustBar'
import { HowItWorks } from '@/components/home/HowItWorks'
import { PopularProcedures } from '@/components/home/PopularProcedures'
import { TopDestinations } from '@/components/home/TopDestinations'
import { FeaturedClinics } from '@/components/home/FeaturedClinics'
import { CostComparison } from '@/components/home/CostComparison'
import { ConciergeCTA } from '@/components/home/ConciergeCTA'
import { Testimonials } from '@/components/home/Testimonials'
import { Newsletter } from '@/components/home/Newsletter'
import { StructuredData } from '@/components/seo/structured-data-component'
import { generateHowToSchema, generateOrganizationSchema, generateWebsiteSchema } from '@/lib/seo/structured-data'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  // Generate structured data for homepage
  const howToSchema = generateHowToSchema(
    'How to Find Medical Care Abroad',
    'A simple 3-step process to find and book medical treatment abroad with Meet Your Clinic',
    [
      {
        name: 'Tell us what you need',
        text: 'Use our smart search or AI concierge to find the perfect treatment and destination for your needs.',
      },
      {
        name: 'Compare clinics',
        text: 'Review verified profiles, doctor credentials, and transparent pricing to make an informed choice.',
      },
      {
        name: 'Connect directly',
        text: 'Send enquiries, chat via WhatsApp, or book a consultation directly with the clinic.',
      },
    ]
  )

  return (
    <main className="flex flex-col min-h-screen bg-cream text-foreground">
      <StructuredData data={[generateOrganizationSchema(), generateWebsiteSchema(), howToSchema]} />
      <Hero />
      <StatsBar />
      <TrustBar />
      <PopularProcedures />
      <TopDestinations />
      <FeaturedClinics />
      <HowItWorks />
      <CostComparison />
      <ConciergeCTA />
      <Testimonials />
      <Newsletter />
    </main>
  )
}
