import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getUser } from '@/lib/auth/actions'
import { SignUpForm } from './signup-form'

interface SignUpPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ redirect?: string }>
}

export async function generateMetadata() {
  return {
    title: 'Sign Up - MediTravel',
  }
}

export default async function SignUpPage({ params, searchParams }: SignUpPageProps) {
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
            <h1 className="mt-6 text-3xl font-bold text-neutral-900">Create an account</h1>
            <p className="mt-2 text-neutral-600">
              Start your journey to quality healthcare abroad
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
            <SignUpForm />
          </div>

          <p className="mt-6 text-center text-sm text-neutral-600">
            Already have an account?{' '}
            <Link
              href={`/auth/signin${redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              Sign in
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
              <span className="text-6xl">✨</span>
            </div>
            <h2 className="text-3xl font-bold">Join Thousands of Patients</h2>
            <p className="mt-4 max-w-md text-lg text-white/80">
              Create your free account to save clinics, track enquiries, and get
              personalized recommendations for your medical journey.
            </p>

            <div className="mt-8 space-y-4 text-left">
              {[
                'Compare clinics and prices worldwide',
                'Track your enquiries in one place',
                'Get AI-powered recommendations',
                'Access exclusive deals and offers',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <span className="text-sm">✓</span>
                  </div>
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
