import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ForgotPasswordForm } from './forgot-password-form'

interface ForgotPasswordPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata() {
  return {
    title: 'Reset Password - MediTravel',
  }
}

export default async function ForgotPasswordPage({ params }: ForgotPasswordPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            MediTravel
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-neutral-900">Reset your password</h1>
          <p className="mt-2 text-neutral-600">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
          <ForgotPasswordForm />
        </div>

        <p className="mt-6 text-center text-sm text-neutral-600">
          Remember your password?{' '}
          <Link
            href="/auth/signin"
            className="font-medium text-primary-600 hover:text-primary-700"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
