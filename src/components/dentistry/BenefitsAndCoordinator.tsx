import Image from "next/image";
import {
  Globe,
  ShieldCheck,
  Headphones,
  CheckCircle2,
} from "lucide-react";

const BENEFITS = [
  {
    icon: Globe,
    title: "Transparent Prices & Flexible Plans",
    desc: "No hidden fees \u2014 just official clinic prices. Pay the clinic directly upon arrival. Flexible installment plans available at partner clinics.",
    iconBg: "bg-teal-50 text-teal-600 border-teal-100",
  },
  {
    icon: ShieldCheck,
    title: "Verified Clinics & Doctors Only",
    desc: "We only list clinics that hold international accreditations (JCI, ISO) and have verified credentials. Annual re-verification keeps standards high.",
    iconBg: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    icon: Headphones,
    title: "Free 24/7 Patient Support",
    desc: "Our team provides free expert guidance before, during, and after your treatment \u2014 helping resolve any issue so you\u2019re never alone on your dental journey.",
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
];

const COORDINATOR_POINTS = [
  "Supports you at every stage of your journey",
  "Helps choose the right clinic and doctor for your case",
  "Ensures quick and convenient access to information",
  "Coordinates appointments, travel, and follow-ups",
];

export default function BenefitsAndCoordinator() {
  return (
    <>
      {/* ── Benefits Section ──────────────────────────────────────── */}
      <section
        aria-labelledby="benefits-heading"
        className="py-16 sm:py-20 bg-white"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2
              id="benefits-heading"
              className="font-serif text-2xl sm:text-3xl text-slate-900 tracking-tight mb-2"
            >
              Your benefits and guarantees
            </h2>
            <p className="text-sm text-slate-500">
              Why thousands of patients trust our platform
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 transition-all hover:border-slate-300 hover:shadow-md hover:shadow-slate-900/5"
                >
                  <div
                    className={`inline-flex items-center justify-center h-11 w-11 rounded-xl border mb-5 ${b.iconBg}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Personal Coordinator ──────────────────────────────────── */}
      <section
        aria-label="Patient coordinator"
        className="bg-teal-50/60 border-y border-teal-100"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Photo + label */}
            <div className="flex items-center gap-5 flex-shrink-0">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop&auto=format&crop=face"
                  alt="Patient coordinator"
                  width={80}
                  height={80}
                  className="rounded-full object-cover border-4 border-white shadow-md"
                />
                {/* Online indicator */}
                <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-emerald-500 border-[3px] border-teal-50" />
              </div>
              <div>
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1">
                  Why choose us?
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                  Your personal patient<br className="hidden sm:block" /> coordinator
                </h3>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-20 bg-teal-200/60" />

            {/* Benefits list */}
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {COORDINATOR_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 leading-snug">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
