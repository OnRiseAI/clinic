import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { FadeIn, FadeInStagger } from '@/components/ui/fade-in'
import { cn } from '@/lib/utils'
import { Check, Globe2, Users, TrendingUp, ShieldCheck, Clock, HeartHandshake, ArrowRight, Building2, MapPin, Search } from 'lucide-react'

interface ListYourClinicPageProps {
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: 'List Your Clinic - Get Found by Patients Worldwide | MeetYourClinic',
  description:
    'Join thousands of clinics on MeetYourClinic. Receive qualified patient enquiries, control your profile, and grow your international patient base. Free to list.',
}

const features = [
  {
    icon: Globe2,
    title: 'Global Visibility',
    description: 'Get discovered by patients searching for medical treatments worldwide.',
  },
  {
    icon: Users,
    title: 'Qualified Leads',
    description: 'Receive direct enquiries from patients who are ready to book their treatment.',
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Practice',
    description: 'Expand your international patient base with zero upfront marketing effort.',
  },
  {
    icon: ShieldCheck,
    title: 'Build Trust',
    description: 'Showcase your accreditations, reviews, and specialist doctor profiles.',
  },
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Manage all patient enquiries in one place with our intuitive dashboard.',
  },
  {
    icon: HeartHandshake,
    title: 'Premium Support',
    description: 'Our dedicated clinic success team is here to help you optimize your profile.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Create Your Account',
    description: 'Sign up in minutes with your clinic email address.',
  },
  {
    number: '02',
    title: 'Build Your Profile',
    description: 'Add photos, doctors, procedures, and pricing to attract international patients.',
  },
  {
    number: '03',
    title: 'Start Receiving Enquiries',
    description: 'Get notified instantly when patients want to learn more about your services.',
  },
]

const stats = [
  { value: '1,500+', label: 'Clinics Listed' },
  { value: '45+', label: 'Countries' },
  { value: '50,000+', label: 'Patient Enquiries' },
  { value: '24h', label: 'Avg. Response Time' },
]

export default async function ListYourClinicPage({ params }: ListYourClinicPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="min-h-screen bg-[#0A121E] text-white selection:bg-gold/30 selection:text-white overflow-hidden">
      {/* =====================================================================
          HERO SECTION
          ===================================================================== */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-32">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 opacity-40 mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 opacity-30 mix-blend-screen" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              Free to list — No hidden fees
            </span>
            <h1 className="mt-8 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.05]">
              Get Found by Patients{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-dark relative inline-block pb-2">
                Worldwide
                <span className="absolute bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-gold/40 to-transparent" />
              </span>
            </h1>
            <p className="mt-6 text-xl font-light text-white/60 leading-relaxed max-w-2xl mx-auto">
              Join the premium network of 1,500+ top-tier clinics connecting with international patients through MeetYourClinic. 
              Grow your global presence with zero upfront costs.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/claim">
                <Button className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-navy font-bold tracking-wide rounded-sm shadow-[0_0_20px_rgba(198,169,108,0.2)] hover:shadow-[0_0_25px_rgba(198,169,108,0.3)] transition-all px-8 h-12 border-none">
                  LIST YOUR CLINIC — FREE
                </Button>
              </Link>
              <Link href="/clinics">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto text-white border-white/20 hover:bg-white/5 hover:text-white rounded-sm px-8 h-12 tracking-wide font-medium"
                >
                  Explore the Directory
                </Button>
              </Link>
            </div>
            
            <p className="mt-6 text-sm text-white/40 font-light">
              Already have a profile?{' '}
              <Link href="/auth/signin" className="text-gold hover:underline underline-offset-4 font-medium">
                Sign in to your dashboard
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* =====================================================================
          STATS BAR
          ===================================================================== */}
      <section className="relative z-10 border-y border-white/10 bg-white/[0.02] backdrop-blur-md py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 divide-x divide-white/10">
            {stats.map((stat, index) => (
              <FadeIn
                key={stat.label}
                delay={index * 0.15}
                className={cn(
                  "text-center",
                  index === 0 || index === 2 ? "" : "pl-8"
                )}
              >
                <p className="text-3xl font-bold text-white lg:text-4xl">{stat.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.15em] text-white/40">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          FEATURES GRID
          ===================================================================== */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2 opacity-30 pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-white lg:text-5xl">
              Everything You Need to <span className="text-gold">Succeed</span>
            </h2>
            <p className="mt-6 text-lg font-light text-white/50">
              MeetYourClinic provides the premium tools and visibility you need to attract international patients reliably.
            </p>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FadeIn key={feature.title} delay={index * 0.1}>
                <div className="group h-full rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-gold/30 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-gold/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/50 transition-colors duration-500 group-hover:border-gold/30 group-hover:bg-gold/10 group-hover:text-gold">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white tracking-tight">{feature.title}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-white/50 group-hover:text-white/70 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          WHAT YOU GET (DASHBOARD PREVIEW)
          ===================================================================== */}
      <section className="relative overflow-hidden border-t border-white/10 bg-navy-light py-24 lg:py-32">
        <div className="absolute right-0 top-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 opacity-30 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white lg:text-5xl">
                Your Clinic <span className="text-gold">Dashboard</span>
              </h2>
              <p className="mt-6 text-lg font-light leading-relaxed text-white/60">
                Manage your entire global presence from one powerful, intuitive dashboard. Update your profile,
                respond to patient enquiries directly, and track your clinic's performance metrics.
              </p>
              
              <ul className="mt-10 space-y-5">
                {[
                  'Full control over your clinic profile and high-res photos',
                  'Real-time notifications for new patient enquiries',
                  'Detailed doctor profiles to showcase credentials',
                  'Comprehensive procedure listings with transparent pricing',
                  'Performance analytics and competitive insights',
                  'Direct secure messaging with potential patients',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 border border-gold/20 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-gold" />
                    </div>
                    <span className="text-white/70 font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <Link href="/auth/claim">
                  <Button className="bg-gold hover:bg-gold-dark text-navy font-bold tracking-wide rounded-sm shadow-[0_0_15px_rgba(198,169,108,0.2)] hover:shadow-[0_0_20px_rgba(198,169,108,0.3)] transition-all px-8 h-12 border-none">
                    CREATE YOUR FREE PROFILE
                  </Button>
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="relative">
              {/* Premium Dashboard Mockup Graphic */}
              <div className="relative mx-auto w-full max-w-[600px]">
                {/* Glow behind the mockup */}
                <div className="absolute inset-0 bg-gold/20 blur-[100px] rounded-full" />
                
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A121E] shadow-2xl shadow-black/50 transform rotate-1 hover:rotate-0 transition-transform duration-700">
                  {/* Mock Window Header */}
                  <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-5 py-4">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500/80" />
                      <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                      <div className="h-3 w-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="mx-auto flex h-6 w-1/2 items-center justify-center rounded bg-white/5 text-[10px] text-white/30 tracking-widest font-mono">
                      partner.meetyourclinic.com
                    </div>
                  </div>

                  {/* Mock Dashboard Content */}
                  <div className="flex h-[400px]">
                    {/* Sidebar */}
                    <div className="w-16 border-r border-white/10 bg-white/[0.02] p-3 hidden sm:flex flex-col gap-4 items-center">
                      <div className="h-8 w-8 rounded-lg bg-gold/20 flex items-center justify-center border border-gold/30">
                        <span className="text-gold font-bold text-xs">M</span>
                      </div>
                      <div className="h-px w-8 bg-white/10 my-1" />
                      <div className="h-8 w-8 rounded-lg bg-white/10" />
                      <div className="h-8 w-8 rounded-lg bg-white/5" />
                      <div className="h-8 w-8 rounded-lg bg-white/5" />
                    </div>
                    
                    {/* Main Content Area */}
                    <div className="flex-1 p-6 sm:p-8 overflow-hidden">
                      <div className="mb-8 flex items-center justify-between">
                        <div>
                          <div className="h-5 w-40 rounded bg-white/20 mb-2" />
                          <div className="h-3 w-64 rounded bg-white/10" />
                        </div>
                        <div className="h-10 w-32 rounded-lg bg-gold/20 border border-gold/30" />
                      </div>

                      {/* Stats Cards Mock */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="rounded-xl border border-white/5 bg-white/5 p-4">
                            <div className="h-8 w-8 rounded-lg bg-teal-500/20 mb-3" />
                            <div className="h-6 w-16 rounded bg-white/20 mb-1.5" />
                            <div className="h-3 w-24 rounded bg-white/10" />
                          </div>
                        ))}
                      </div>

                      {/* Enquiries List Mock */}
                      <div className="space-y-3">
                        {[1, 2].map((i) => (
                          <div key={i} className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                            <div className="h-10 w-10 rounded-full bg-white/10" />
                            <div className="flex-1">
                              <div className="h-4 w-32 rounded bg-white/20 mb-1.5" />
                              <div className="h-3 w-48 rounded bg-white/10" />
                            </div>
                            <div className="hidden sm:block h-6 w-20 rounded-full bg-green-500/20" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* =====================================================================
          HOW IT WORKS
          ===================================================================== */}
      <section className="relative py-24 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-white lg:text-5xl">
              How It <span className="text-gold">Works</span>
            </h2>
            <p className="mt-6 text-lg font-light text-white/50">
              Get your clinic listed and verified in three straightforward steps.
            </p>
          </FadeIn>

          <div className="relative mt-20">
            {/* Connecting Line */}
            <div className="absolute top-8 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent hidden lg:block" />

            <div className="grid gap-12 lg:grid-cols-3">
              {steps.map((step, index) => (
                <FadeIn key={step.number} delay={index * 0.15} className="relative">
                  <div className="relative mx-auto w-16 h-16 rounded-2xl bg-[#0A121E] border border-gold/30 flex items-center justify-center text-xl font-bold text-gold shadow-[0_0_20px_rgba(198,169,108,0.2)] mb-8 z-10">
                    {step.number}
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white tracking-tight">{step.title}</h3>
                    <p className="mt-3 text-sm font-light leading-relaxed text-white/50 max-w-xs mx-auto">
                      {step.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CTA SECTION
          ===================================================================== */}
      <section className="relative border-t border-white/10 py-24 lg:py-32 overflow-hidden">
        {/* Abstract Background for CTA */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A121E] to-navy" />
        <div className="absolute top-1/2 left-1/2 w-full h-full max-w-[1000px] bg-gold/5 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center rounded-[3rem] border border-white/10 bg-white/[0.02] backdrop-blur-md p-10 sm:p-16 lg:p-20 shadow-2xl">
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 border border-gold/20">
              <Building2 className="h-8 w-8 text-gold" />
            </div>
            
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to Expand Your <br className="hidden sm:block"/>
              <span className="text-gold">International Patient Base?</span>
            </h2>
            
            <p className="mt-6 text-lg font-light text-white/60 max-w-xl mx-auto">
              Join the elite network of clinics globally. No setup fees, no monthly subscriptions—just pure growth potential.
            </p>
            
            <div className="mt-10">
              <Link href="/auth/claim">
                <Button className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-navy font-bold tracking-wide rounded-sm shadow-[0_0_20px_rgba(198,169,108,0.2)] hover:shadow-[0_0_25px_rgba(198,169,108,0.3)] transition-all px-10 h-14 text-sm border-none">
                  START YOUR FREE LISTING
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-bold uppercase tracking-[0.15em] text-white/30">
              <span className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-gold/70" /> 100% Free Setup
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-gold/70" /> Cancel Anytime
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-gold/70" /> Global Reach
              </span>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
