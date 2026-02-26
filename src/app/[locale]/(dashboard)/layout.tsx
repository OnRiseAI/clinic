import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { DashboardHeader } from '@/components/layout/dashboard-header'
import { getUserProfile } from '@/lib/auth/actions'
import { ConciergeWidget } from '@/components/concierge'

interface DashboardLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const userProfile = await getUserProfile()

  // Redirect to sign in if not authenticated
  if (!userProfile) {
    redirect(`/${locale}/auth/signin?redirect=/dashboard`)
  }

  // Redirect clinic users to their dashboard
  if (userProfile.role === 'clinic') {
    redirect(`/${locale}/clinic`)
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
      <ConciergeWidget agentId={process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID} />
    </div>
  )
}
