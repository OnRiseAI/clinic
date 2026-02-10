import Image from "next/image";
import {
  ArrowRight,
  Shield,
  CheckCircle2,
} from "lucide-react";

const BENEFITS = [
  "Compare clinics and pricing freely",
  "No obligation or hidden fees",
  "Read real patient reviews",
  "Direct contact with clinics",
];

export default function SoftExit() {
  return (
    <section
      aria-label="Reassurance"
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 py-20 sm:py-28"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] border border-white/[0.1] px-4 py-1.5 mb-6">
              <Shield className="h-4 w-4 text-teal-400" />
              <span className="text-xs font-semibold text-teal-300">
                Zero commitment
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight mb-4">
              Not ready yet? No pressure.
            </h2>
            <p className="text-base text-slate-400 mb-8 max-w-md leading-relaxed">
              Take your time. Browse clinics, compare pricing, and read real
              patient reviews &mdash; all free, with no obligation.
            </p>

            <ul className="space-y-3 mb-10">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-teal-400 flex-shrink-0" />
                  <span className="text-sm text-slate-300">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <a
                href="#lead-funnel-section"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition-all hover:bg-teal-400 hover:shadow-teal-500/30 active:scale-[0.98]"
              >
                Get a free quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#clinic-list"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/[0.08] border border-white/[0.12] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.14]"
              >
                Browse clinics
              </a>
            </div>
          </div>

          {/* Right — image + stats */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=560&h=400&fit=crop&auto=format"
                alt="Modern dental clinic"
                width={560}
                height={400}
                className="object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent rounded-2xl" />

              {/* Overlay card */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-300 mb-0.5">Patients connected</p>
                    <p className="text-xl font-bold text-white tabular-nums">85,000+</p>
                  </div>
                  <div className="h-px flex-1 mx-4 bg-white/10" />
                  <div>
                    <p className="text-xs text-slate-300 mb-0.5">Avg. savings</p>
                    <p className="text-xl font-bold text-teal-400 tabular-nums">40–70%</p>
                  </div>
                  <div className="h-px flex-1 mx-4 bg-white/10" />
                  <div>
                    <p className="text-xs text-slate-300 mb-0.5">Countries</p>
                    <p className="text-xl font-bold text-white tabular-nums">23</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
