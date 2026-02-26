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
    title: 'Sign In - MeetYourClinic',
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
    <div className="flex min-h-screen bg-slate-50">
      {/* Form Side */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
            <Link href="/" className="text-2xl font-display font-bold text-teal-700">
              MeetYourClinic
            </Link>
            <h1 className="mt-8 text-3xl font-display font-bold text-slate-900">Welcome back</h1>
            <p className="mt-2 text-slate-600">
              Sign in to your account to continue
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <SignInForm />
          </div>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <Link
              href={`/auth/signup${redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}
              className="font-bold text-teal-700 hover:text-teal-800 transition-colors"
            >
              Sign up for free
            </Link>
          </p>

          <p className="mt-4 text-center text-sm text-slate-500">
            Are you a clinic?{' '}
            <Link
              href="/list-your-clinic"
              className="font-bold text-teal-700 hover:text-teal-800 transition-colors"
            >
              List your clinic
            </Link>
          </p>
        </div>
      </div>

      {/* Image Side */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 bg-navy">
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-900/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('/images/patterns/medical-cross.svg')] opacity-5 z-10" />
          <div className="flex h-full flex-col items-center justify-center p-12 text-center text-white relative z-20">
            <div className="mb-8 rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/10">
              <span className="text-6xl">🌍</span>
            </div>
            <h2 className="text-4xl font-display font-bold tracking-tight mb-4">Your Global Healthcare Journey</h2>
            <p className="mt-2 max-w-md text-lg text-white/80 leading-relaxed font-medium">
              Access world-class medical care at affordable prices. Compare clinics,
              read reviews, and connect with top healthcare providers worldwide.
            </p>
            <div className="mt-12 flex items-center gap-10 text-white/60">
              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-1">500+</p>
                <p className="text-sm font-medium uppercase tracking-wider">Verified Clinics</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-1">50+</p>
                <p className="text-sm font-medium uppercase tracking-wider">Countries</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-1">10k+</p>
                <p className="text-sm font-medium uppercase tracking-wider">Happy Patients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
