import {
  Building2,
  Users,
  Star,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { PAGE_STATS } from "@/lib/dentistry/data";

const STATS = [
  {
    icon: Users,
    value: PAGE_STATS.patientsHelped,
    label: "patients assisted since 2005",
  },
  {
    icon: Globe,
    value: `${PAGE_STATS.countries}`,
    label: "countries",
  },
  {
    icon: Building2,
    value: `${PAGE_STATS.clinicCount.toLocaleString()}+`,
    label: "verified clinics",
  },
  {
    icon: Star,
    value: `${PAGE_STATS.avgRating}`,
    label: "avg rating",
  },
];

export default function TrustBar() {
  return (
    <section
      aria-label="Platform statistics"
      className="bg-slate-900 border-y border-slate-800"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {/* Verified badge */}
          <div className="flex items-center gap-2 text-teal-400">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-sm font-semibold">Verified clinics only</span>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-5 bg-slate-700" />

          {/* Stats */}
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-2">
              <stat.icon className="h-4 w-4 text-slate-500" />
              <span className="text-sm text-slate-300">
                <span className="font-bold text-white tabular-nums">
                  {stat.value}
                </span>{" "}
                {stat.label}
              </span>
              {i < STATS.length - 1 && (
                <span className="hidden lg:inline text-slate-700 ml-4">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
