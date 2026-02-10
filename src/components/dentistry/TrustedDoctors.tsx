import Image from "next/image";
import { ShieldCheck, Award, ArrowRight } from "lucide-react";
import { DENTAL_CLINICS } from "@/lib/dentistry/data";

const FEATURED_DOCTORS = DENTAL_CLINICS.filter((c) => c.verified).map((c) => ({
  name: c.doctor.name,
  photoUrl: c.doctor.photoUrl,
  specialty: c.doctor.specialty,
  yearsExperience: c.doctor.yearsExperience,
  clinic: c.name,
  location: c.location,
  flag: c.countryFlag,
  slug: c.slug,
}));

export default function TrustedDoctors() {
  return (
    <section
      aria-labelledby="doctors-heading"
      className="py-16 sm:py-24 bg-slate-50/70"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold text-teal-600 mb-2 uppercase tracking-wider">
              Expert care you can trust
            </p>
            <h2
              id="doctors-heading"
              className="font-serif text-2xl sm:text-3xl text-slate-900 tracking-tight mb-1"
            >
              Our trusted doctors
            </h2>
            <p className="text-sm text-slate-500">
              Verified specialists with years of international experience
            </p>
          </div>
          <a
            href="#clinic-list"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
          >
            View all clinics
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Doctor grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {FEATURED_DOCTORS.map((doc) => (
            <div
              key={doc.name}
              className="group relative flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 transition-all hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5"
            >
              {/* Doctor photo */}
              <div className="relative flex-shrink-0">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-xl overflow-hidden">
                  <Image
                    src={doc.photoUrl}
                    alt={doc.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                {/* Verified badge */}
                <div className="absolute -bottom-2 -right-2 flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 shadow-md">
                  <ShieldCheck className="h-3.5 w-3.5 text-white" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wide">
                    Verified
                  </span>
                </div>
              </div>

              {/* Doctor info */}
              <div className="flex flex-col min-w-0">
                <h3 className="text-base font-bold text-slate-900 mb-0.5">
                  {doc.name}
                </h3>
                <p className="text-sm text-teal-600 font-medium mb-2">
                  {doc.specialty}
                </p>

                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-slate-400" />
                    <span className="text-xs text-slate-500">
                      {doc.yearsExperience} years experience
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mb-4">
                  {doc.flag} {doc.clinic} &middot; {doc.location}
                </p>

                <div className="mt-auto flex items-center gap-2.5">
                  <a
                    href={`/clinics/dentistry/${doc.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-teal-500 active:scale-[0.98]"
                  >
                    Get a free consultation
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={`/clinics/dentistry/${doc.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-600 transition-colors"
                  >
                    View profile
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
