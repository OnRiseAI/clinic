import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getUser } from '@/lib/auth/actions'
import { SignInForm } from './signin-form'

interface SignInPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ redirect?: string }>
}

export async function generateMetadata() {
  return {
    title: 'Sign In - MediTravel',
  }
}

export default async function SignInPage({ params, searchParams }: SignInPageProps) {
  const { locale } = await params
  const { redirect: redirectTo } = await searchParams
  setRequestLocale(locale)

  // Check if user is already signed in
  const user = await getUser()
  if (user) {
    redirect(redirectTo || '/dashboard')
  }

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      {/* Form Side */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              MediTravel
            </Link>
            <h1 className="mt-6 text-3xl font-bold text-neutral-900">Welcome back</h1>
            <p className="mt-2 text-neutral-600">
              Sign in to your account to continue
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
            <SignInForm />
          </div>

          <p className="mt-6 text-center text-sm text-neutral-600">
            Don&apos;t have an account?{' '}
            <Link
              href={`/auth/signup${redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              Sign up for free
            </Link>
          </p>

          <p className="mt-4 text-center text-sm text-neutral-500">
            Are you a clinic?{' '}
            <Link
              href="/list-your-clinic"
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              List your clinic
            </Link>
          </p>
        </div>
      </div>

      {/* Image Side */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800">
          <div className="flex h-full flex-col items-center justify-center p-12 text-center text-white">
            <div className="mb-8 rounded-full bg-white/10 p-6">
              <span className="text-6xl">🌍</span>
            </div>
            <h2 className="text-3xl font-bold">Your Global Healthcare Journey</h2>
            <p className="mt-4 max-w-md text-lg text-white/80">
              Access world-class medical care at affordable prices. Compare clinics,
              read reviews, and connect with top healthcare providers worldwide.
            </p>
            <div className="mt-8 flex items-center gap-8 text-white/60">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-sm">Verified Clinics</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">50+</p>
                <p className="text-sm">Countries</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">10k+</p>
                <p className="text-sm">Happy Patients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
