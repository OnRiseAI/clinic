import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getUser } from '@/lib/auth/actions'
import { SignUpForm } from './signup-form'
import { ShieldCheck, Star, Users, Globe2 } from 'lucide-react'

interface SignUpPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ redirect?: string }>
}

export async function generateMetadata() {
  return {
    title: 'Create an Account | MeetYourClinic',
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
    <div className="flex min-h-screen bg-[#0A121E]">
      {/* Left Form Side - Premium Glassmorphism Look */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-[550px] xl:w-[600px] z-10 relative">
        <div className="absolute inset-0 bg-white shadow-2xl"></div>
        <div className="relative mx-auto w-full max-w-sm lg:w-[400px]">
          <div className="text-center lg:text-left mb-8">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight text-[#0A121E] flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A121E]">
                  <span className="text-gold font-bold">M</span>
                </div>
                MeetYourClinic
              </span>
            </Link>
            <h1 className="mt-8 text-3xl font-bold tracking-tight text-neutral-900">
              Create your account
            </h1>
            <p className="mt-2 text-[15px] text-neutral-500">
              Join the premium network for international healthcare
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-100 bg-white/50 px-8 py-10 shadow-xl shadow-black/5 backdrop-blur-xl">
            <SignUpForm />
          </div>

          <p className="mt-8 text-center text-[13px] text-neutral-500 font-medium">
            Already have an account?{' '}
            <Link
              href={`/auth/signin${redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}
              className="text-[#0A121E] hover:text-gold transition-colors font-semibold"
            >
              Sign in to your dashboard
            </Link>
          </p>

          <p className="mt-4 text-center text-[13px] text-neutral-400 font-medium">
            Representing a clinic?{' '}
            <Link
              href="/list-your-clinic"
              className="text-gold hover:text-gold-dark transition-colors font-semibold underline underline-offset-4"
            >
              Partner with us
            </Link>
          </p>
        </div>
      </div>

      {/* Right Image/Branding Side - Navy & Gold Theme */}
      <div className="relative hidden w-0 flex-1 lg:block overflow-hidden bg-[#0A121E]">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px] translate-y-1/3 translate-x-1/3 mix-blend-screen" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] -translate-y-1/3 -translate-x-1/3 mix-blend-screen" />

        <div className="flex h-full flex-col items-center justify-center p-12 lg:p-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase text-gold mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            Global Healthcare Excellence
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
            Trusted by the World's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-dark">Top Medical Facilities</span>
          </h2>

          <p className="mt-6 max-w-lg text-lg text-white/50 font-light leading-relaxed">
            Whether you are a patient seeking world-class treatment or a premium clinic expanding your international presence, you are in the right place.
          </p>

          <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 text-left w-full max-w-2xl">
            {[
              {
                icon: ShieldCheck,
                title: 'Verified Quality',
                desc: 'Every provider undergoes strict accreditation checks'
              },
              {
                icon: Globe2,
                title: 'Borderless Care',
                desc: 'Connecting patients to 45+ premier destinations'
              },
              {
                icon: Users,
                title: 'Concierge Support',
                desc: 'AI-assisted matching and human-led booking'
              },
              {
                icon: Star,
                title: 'Data-Backed Trust',
                desc: 'Thousands of transparent, verified patient reviews'
              },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col gap-3 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-white/40 transition-colors group-hover:bg-gold/10 group-hover:text-gold group-hover:border-gold/20">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-white tracking-wide">{feature.title}</h3>
                  <p className="text-[13px] text-white/40 mt-1 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
