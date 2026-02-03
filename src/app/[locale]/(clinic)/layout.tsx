import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { ClinicSidebar } from '@/components/layout/clinic-sidebar'
import { ClinicHeader } from '@/components/layout/clinic-header'
import { getUserProfile } from '@/lib/auth/actions'

interface ClinicLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function ClinicLayout({
  children,
  params,
}: ClinicLayoutProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const userProfile = await getUserProfile()

  // Redirect to sign in if not authenticated
  if (!userProfile) {
    redirect(`/${locale}/auth/signin?redirect=/clinic`)
  }

  // Redirect patient users to their dashboard
  if (userProfile.role === 'patient') {
    redirect(`/${locale}/dashboard`)
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <ClinicSidebar />
      <div className="flex flex-1 flex-col">
        <ClinicHeader />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
