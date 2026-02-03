import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ClinicRegisterForm } from '@/components/clinic/clinic-register-form'

interface ClinicRegisterPageProps {
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: 'Register Your Clinic - MediTravel',
  description: 'Create your clinic account on MediTravel and start receiving patient enquiries.',
}

export default async function ClinicRegisterPage({ params }: ClinicRegisterPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            MediTravel
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-neutral-900">List Your Clinic</h1>
          <p className="mt-2 text-neutral-600">
            Create your account to get started. It&apos;s free to list.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
          <ClinicRegisterForm />
        </div>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Already have an account?{' '}
          <Link href="/auth/signin" className="font-medium text-primary-600 hover:text-primary-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
