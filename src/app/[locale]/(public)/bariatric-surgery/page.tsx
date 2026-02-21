import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ComingSoonPlaceholder } from '@/components/ui/coming-soon-placeholder'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

export const metadata: Metadata = {
  title: 'Bariatric Surgery Abroad | Top Clinics | MeetYourClinic',
  description: 'We are currently vetting the top bariatric surgery clinics to ensure they meet our rigorous VisQuanta Gold Standard™.',
}

interface Props {
  params: Promise<{ locale: string }>
}

export default async function BariatricSurgeryPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 relative z-20">
        <Breadcrumbs
          items={[
            { name: 'Bariatric Surgery' },
          ]}
        />
      </div>
      <div className="-mt-14">
        <ComingSoonPlaceholder type="category" name="Bariatric Surgery" />
      </div>
    </div>
  )
}
