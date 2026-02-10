import { Search, ShieldCheck, MessageCircle } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: Search,
    title: "Choose a clinic",
    desc: "Compare verified clinics, ratings, doctor credentials, and treatment pricing across 23 countries.",
    accent: "bg-teal-500",
    iconColor: "text-teal-600",
    iconBg: "bg-teal-50",
  },
  {
    num: "02",
    icon: ShieldCheck,
    title: "Verify your number",
    desc: "A quick one-time SMS code confirms you\u2019re a real person. Your data stays private. No spam, ever.",
    accent: "bg-blue-500",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    num: "03",
    icon: MessageCircle,
    title: "Chat with the clinic",
    desc: "Pick WhatsApp, SMS, or email. The clinic receives your request and responds to you directly.",
    accent: "bg-emerald-500",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative py-16 sm:py-24 bg-slate-900 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/8 rounded-full blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-teal-400 mb-3 uppercase tracking-wider">
            Simple process
          </p>
          <h2
            id="how-it-works-heading"
            className="font-serif text-3xl sm:text-4xl text-white tracking-tight mb-3"
          >
            How it works
          </h2>
          <p className="text-base text-slate-400 max-w-md mx-auto">
            From browsing to booking &mdash; connect with your clinic in three
            simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-6 sm:grid-cols-3">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative group"
              >
                {/* Card */}
                <div className="relative rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] p-7 sm:p-8 transition-all hover:bg-white/[0.1] hover:border-white/[0.15] h-full">
                  {/* Step number */}
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-5 block">
                    Step {step.num}
                  </span>

                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${step.iconBg} mb-5`}
                  >
                    <Icon className={`h-6 w-6 ${step.iconColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Accent bar at top */}
                  <div
                    className={`absolute top-0 left-8 right-8 h-[2px] ${step.accent} rounded-full opacity-60`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom proof */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            Free &mdash; no hidden fees
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            No obligation to book
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            Direct clinic contact
          </div>
        </div>
      </div>
    </section>
  );
}
