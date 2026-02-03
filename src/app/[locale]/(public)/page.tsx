import { setRequestLocale } from 'next-intl/server'
import { Hero } from '@/components/home/Hero'
import { TrustBar } from '@/components/home/TrustBar'
import { HowItWorks } from '@/components/home/HowItWorks'
import { PopularProcedures } from '@/components/home/PopularProcedures'
import { TopDestinations } from '@/components/home/TopDestinations'
import { FeaturedClinics } from '@/components/home/FeaturedClinics'
import { CostComparison } from '@/components/home/CostComparison'
import { ConciergeCTA } from '@/components/home/ConciergeCTA'
import { Testimonials } from '@/components/home/Testimonials'
import { Newsletter } from '@/components/home/Newsletter'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      <Hero />
      <TrustBar />
      <HowItWorks />
      <PopularProcedures />
      <TopDestinations />
      <FeaturedClinics />
      <CostComparison />
      <ConciergeCTA />
      <Testimonials />
      <Newsletter />
    </main>
  )
}
