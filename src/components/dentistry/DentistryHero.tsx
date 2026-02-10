import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  Building2,
  Users,
  Star,
  Globe,
} from "lucide-react";
import { PAGE_STATS } from "@/lib/dentistry/data";

export default function DentistryHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
      {/* Decorative blurs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-14 sm:pt-14 sm:pb-20">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex items-center gap-1.5 text-sm text-slate-400">
            <li>
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li aria-hidden="true" className="text-slate-600">
              /
            </li>
            <li>
              <a
                href="/clinics"
                className="hover:text-white transition-colors"
              >
                Clinics
              </a>
            </li>
            <li aria-hidden="true" className="text-slate-600">
              /
            </li>
            <li className="text-slate-300 font-medium" aria-current="page">
              Dental Clinics
            </li>
          </ol>
        </nav>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — text */}
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] text-white tracking-tight leading-[1.1] mb-5">
              Discover the best{" "}
              <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
                dental clinics
              </span>{" "}
              worldwide
            </h1>

            <p className="text-lg text-slate-300/90 max-w-lg leading-relaxed mb-8">
              Compare verified dental clinics for implants, veneers, and
              cosmetic dentistry. Transparent pricing, real patient reviews,
              and direct contact&mdash;no middleman fees.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href="#lead-funnel-section"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-coral-500 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-coral-500/20 transition-all hover:bg-coral-600 hover:shadow-coral-500/30 active:scale-[0.98]"
              >
                Get a free quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#clinic-list"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.12] px-7 py-4 text-base font-semibold text-white transition-all hover:bg-white/[0.14] hover:border-white/[0.2]"
              >
                Browse clinics
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </a>
            </div>

            {/* Micro proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&auto=format&crop=face",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&auto=format&crop=face",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&auto=format&crop=face",
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&auto=format&crop=face",
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&auto=format&crop=face",
                ].map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full border-2 border-slate-900 object-cover"
                  />
                ))}
              </div>
              <div className="text-sm text-slate-400">
                <span className="text-white font-semibold">
                  {PAGE_STATS.patientsHelped}
                </span>{" "}
                patients connected
              </div>
            </div>
          </div>

          {/* Right — featured clinic photo */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
              <Image
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=700&h=500&fit=crop&auto=format"
                alt="Modern dental clinic interior"
                width={700}
                height={500}
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Overlay stats */}
              <div className="absolute bottom-0 inset-x-0 p-6">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    {
                      icon: Building2,
                      val: PAGE_STATS.clinicCount.toLocaleString(),
                      label: "Clinics",
                    },
                    {
                      icon: Users,
                      val: PAGE_STATS.patientsHelped,
                      label: "Patients",
                    },
                    {
                      icon: Star,
                      val: PAGE_STATS.avgRating.toString(),
                      label: "Avg rating",
                    },
                    {
                      icon: Globe,
                      val: PAGE_STATS.countries.toString(),
                      label: "Countries",
                    },
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.label}
                        className="rounded-xl bg-black/40 backdrop-blur-md border border-white/10 p-3 text-center"
                      >
                        <Icon className="h-4 w-4 text-teal-400 mx-auto mb-1" />
                        <p className="text-lg font-bold text-white tabular-nums leading-tight">
                          {s.val}
                        </p>
                        <p className="text-[11px] text-slate-300">{s.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Floating accreditation badge */}
            <div className="absolute -top-3 -right-3 rounded-xl bg-white shadow-lg shadow-black/10 px-4 py-2.5 flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center">
                <Star className="h-3.5 w-3.5 fill-teal-600 text-teal-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Trusted platform</p>
                <p className="text-[10px] text-slate-500">Since 2005</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
