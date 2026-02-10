"use client";

import { useState, useCallback, useRef } from "react";
import type { CategoryClinicCard, CountryFilter } from "@/lib/data/category-page";
import type { CategoryConfig } from "@/lib/categories/config";
import { LeadFunnel } from "@/components/lead-funnel";
import ClinicCard from "./ClinicCard";
import HowItWorks from "./HowItWorks";

interface ClinicDirectoryProps {
  clinics: CategoryClinicCard[];
  categorySlug: string;
  countryFilters: CountryFilter[];
  config: CategoryConfig;
}

export default function ClinicDirectory({ clinics, categorySlug, countryFilters, config }: ClinicDirectoryProps) {
  const [selectedClinic, setSelectedClinic] = useState<CategoryClinicCard | null>(
    clinics[0] || null
  );
  const [locationFilter, setLocationFilter] = useState("all");
  const funnelRef = useRef<HTMLDivElement>(null);

  const filteredClinics =
    locationFilter === "all"
      ? clinics
      : clinics.filter((c) => c.country === locationFilter);

  const handleContact = useCallback((clinic: CategoryClinicCard) => {
    setSelectedClinic(clinic);
    setTimeout(() => {
      funnelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  }, []);

  const locationFilters = [
    { label: "All locations", value: "all" },
    ...countryFilters.map((f) => ({
      label: `${f.flag} ${f.name}`,
      value: f.name,
    })),
  ];

  return (
    <>
      {/* Clinic List */}
      <section
        id="clinic-list"
        aria-labelledby="clinic-list-heading"
        className="py-12 sm:py-16 bg-slate-50/70"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2
                id="clinic-list-heading"
                className="font-serif text-2xl sm:text-3xl text-slate-900 tracking-tight mb-1"
              >
                {config.namePlural}
              </h2>
              <p className="text-sm text-slate-500">
                {filteredClinics.length} verified clinics
                {locationFilter === "all"
                  ? ` across ${new Set(clinics.map((c) => c.country)).size} countries`
                  : ""}
              </p>
            </div>

            {/* Location filters */}
            {locationFilters.length > 1 && (
              <div className="flex flex-wrap items-center gap-2">
                {locationFilters.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => setLocationFilter(f.value)}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all
                      ${
                        locationFilter === f.value
                          ? "bg-teal-600 text-white shadow-sm"
                          : "bg-white border border-slate-200 text-slate-600 hover:border-teal-300 hover:text-teal-700"
                      }
                    `}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clinic list */}
          <div className="space-y-5">
            {filteredClinics.map((clinic) => (
              <ClinicCard
                key={clinic.id}
                clinic={clinic}
                categorySlug={categorySlug}
                onContact={handleContact}
              />
            ))}
          </div>

          {filteredClinics.length === 0 && (
            <p className="text-center text-sm text-slate-400 py-12">
              No clinics match this filter. Try &ldquo;All locations&rdquo; to
              see every clinic.
            </p>
          )}

          {/* Pagination hint */}
          {filteredClinics.length > 0 && (
            <p className="text-center text-xs text-slate-400 mt-6">
              Showing {filteredClinics.length} of{" "}
              {clinics.length} clinics
            </p>
          )}

          {/* Related treatments */}
          {config.relatedTreatments.length > 0 && (
            <nav
              aria-label="Related treatments"
              className="mt-10 pt-8 border-t border-slate-200"
            >
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 text-center">
                Related treatments
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {config.relatedTreatments.map((treatment) => (
                  <a
                    key={treatment.slug}
                    href={`/treatments/${treatment.slug}`}
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:border-teal-200 hover:text-teal-700 hover:bg-teal-50"
                  >
                    {treatment.name}
                  </a>
                ))}
              </div>
            </nav>
          )}
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Lead Funnel */}
      {selectedClinic && (
        <section
          id="lead-funnel-section"
          aria-labelledby="funnel-heading"
          className="relative py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px]" />

          <div
            className="relative mx-auto max-w-xl px-4 sm:px-6 lg:px-8"
            ref={funnelRef}
          >
            <div className="text-center mb-8">
              <p className="text-sm font-semibold text-teal-600 mb-3 uppercase tracking-wider">
                Free &amp; no obligation
              </p>
              <h2
                id="funnel-heading"
                className="font-serif text-3xl sm:text-4xl text-slate-900 tracking-tight mb-3"
              >
                Get in touch with {selectedClinic.name}
              </h2>
              <p className="text-base text-slate-500 max-w-md mx-auto">
                Answer a few quick questions and connect directly with the
                clinic. Takes less than 2 minutes.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5 p-6 sm:p-8">
              <LeadFunnel
                key={selectedClinic.id}
                clinicId={selectedClinic.id}
                clinicSlug={selectedClinic.slug}
                clinicName={selectedClinic.name}
                pageContext={`${config.name} treatment`}
                clinicContactConfig={selectedClinic.contactConfig}
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                SMS verified leads
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                No spam guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Your data stays private
              </span>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
