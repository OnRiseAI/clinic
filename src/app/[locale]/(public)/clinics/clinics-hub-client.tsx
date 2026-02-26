"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Search,
  Star,
  MapPin,
  BadgeCheck,
  ArrowRight,
  Quote,
  Shield,
  Users,
  SlidersHorizontal,
  X,
  ChevronDown,
  HelpCircle,
  Building2,
  Globe,
  ShieldCheck,
  Heart,
  MessageCircle,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { CategoryClinicCard, CountryFilter, PricingRow } from "@/lib/data/category-page";
import type { BrowseCategory, BrowseDestination, PatientReview, InternalLink, HubStats } from "@/lib/data/clinics-hub";
import { LeadFunnel } from "@/components/lead-funnel";

// =============================================================================
// TYPES
// =============================================================================

interface ClinicsHubClientProps {
  clinics: CategoryClinicCard[];
  stats: HubStats;
  categories: BrowseCategory[];
  destinations: BrowseDestination[];
  countryFilters: CountryFilter[];
  pricing: PricingRow[];
  reviews: PatientReview[];
  internalLinks: {
    countryLinks: InternalLink[];
    treatmentLinks: InternalLink[];
    comboLinks: InternalLink[];
  };
}

// =============================================================================
// CATEGORY ICONS
// =============================================================================

const CATEGORY_ICONS: Record<string, string> = {
  dental: "\uD83E\uDDB7",
  "cosmetic-surgery": "\u2728",
  "hair-transplant": "\uD83D\uDC87",
  "eye-surgery": "\uD83D\uDC41\uFE0F",
  orthopedic: "\uD83E\uDDB4",
  fertility: "\uD83D\uDC76",
  bariatric: "\u2696\uFE0F",
  cardiology: "\u2764\uFE0F",
  dermatology: "\uD83E\uDDF4",
  "weight-loss": "\uD83C\uDFCB\uFE0F",
  oncology: "\uD83C\uDFE5",
  "stem-cell": "\uD83E\uDDEC",
  wellness: "\uD83C\uDF3F",
};

// =============================================================================
// MAIN CLIENT COMPONENT
// =============================================================================

export default function ClinicsHubClient({
  clinics,
  stats,
  categories,
  destinations,
  countryFilters,
  pricing,
  reviews,
  internalLinks,
}: ClinicsHubClientProps) {
  const [selectedClinic, setSelectedClinic] = useState<CategoryClinicCard | null>(null);
  const [locationFilter, setLocationFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const [reviewPage, setReviewPage] = useState(0);
  const funnelRef = useRef<HTMLDivElement>(null);

  // Filtered clinics
  const filteredClinics = clinics.filter((c) => {
    if (locationFilter !== "all" && c.country !== locationFilter) return false;
    if (categoryFilter !== "all" && !c.tags.some((t) => t.toLowerCase().includes(categoryFilter.toLowerCase()))) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        c.name.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.treatments.some((t) => t.name.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const handleContact = useCallback((clinic: CategoryClinicCard) => {
    setSelectedClinic(clinic);
    // Use a longer delay to ensure React has re-rendered the conditional LeadFunnel section
    const scrollToFunnel = () => {
      if (funnelRef.current) {
        funnelRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        // Retry if DOM not yet mounted
        setTimeout(scrollToFunnel, 100);
      }
    };
    setTimeout(scrollToFunnel, 150);
  }, []);

  const clearFilters = useCallback(() => {
    setLocationFilter("all");
    setCategoryFilter("all");
    setSearchQuery("");
  }, []);

  const reviewsPerPage = 3;
  const totalReviewPages = Math.ceil(reviews.length / reviewsPerPage);
  const visibleReviews = reviews.slice(reviewPage * reviewsPerPage, (reviewPage + 1) * reviewsPerPage);

  // FAQ data
  const FAQS = [
    {
      question: "How do I choose the right clinic abroad?",
      answer: "Look for clinics with international accreditations (JCI, ISO), verified patient reviews, transparent pricing, and experienced doctors. Our platform verifies all clinics and provides detailed profiles to help you compare options side-by-side.",
    },
    {
      question: "Are the prices on your platform accurate?",
      answer: "Prices shown are indicative starting prices based on data from our partner clinics. Final costs depend on individual treatment plans. We recommend requesting a personalised quote for an exact price.",
    },
    {
      question: "Is it safe to get medical treatment abroad?",
      answer: "When choosing accredited clinics with experienced doctors, medical tourism can be very safe. All clinics on our platform are verified for quality standards. We recommend checking accreditations, reading patient reviews, and having a video consultation before travelling.",
    },
    {
      question: "What happens if something goes wrong after treatment?",
      answer: "Reputable clinics offer aftercare and follow-up support. Many provide guarantees on their work. Before booking, ask about the clinic's aftercare policy, warranty period, and what happens if revisions are needed.",
    },
    {
      question: "How do I get started?",
      answer: "Browse clinics on this page, compare options, and click 'Get a free quote' on any clinic that interests you. You'll answer a few quick questions and connect directly with the clinic. It takes less than 2 minutes and there's no obligation.",
    },
    {
      question: "Do I need to pay anything to use MeetYourClinic?",
      answer: "No. Our service is completely free for patients. We're funded by clinics who partner with us to reach international patients. You'll never pay extra by booking through our platform.",
    },
  ];

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative bg-navy overflow-hidden">
        {/* Architectural Grid Background */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-30 mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-20 mix-blend-screen" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-14 sm:pt-16 sm:pb-18">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-teal/80 mb-3 uppercase tracking-wider">
              Compare &amp; connect
            </p>
            <h1 className="text-[3rem] sm:text-[3.5rem] lg:text-[4rem] font-bold tracking-tight leading-[1.05] text-white mb-5">
              Discover the Best Clinics{" "}
              <span className="text-gold">Worldwide</span>
            </h1>
            <p className="text-lg text-white/60 font-light leading-relaxed max-w-2xl mb-8">
              Compare {stats.clinicCount > 0 ? stats.clinicCount.toLocaleString() : "800"}+ verified clinics
              across {stats.countries > 0 ? stats.countries : "17"}+ countries. Transparent pricing, real patient reviews,
              and direct clinic connections.
            </p>

            {/* Search bar */}
            <div className="flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-1.5 max-w-xl transition-all focus-within:bg-white/10 focus-within:border-white/20">
              <div className="flex items-center gap-2 flex-1 px-4">
                <Search className="h-5 w-5 text-white/40 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search clinics, treatments, or destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2.5 text-sm text-white placeholder:text-white/40 outline-none bg-transparent"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("clinic-listings");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-shrink-0 rounded-lg bg-gold px-6 py-2.5 text-sm font-bold tracking-wide text-navy transition-all hover:bg-gold-dark shadow-lg shadow-gold/20"
              >
                Search
              </button>
            </div>

            {/* Popular searches */}
            <div className="flex flex-wrap items-center gap-2 mt-5">
              <span className="text-xs text-white/40 uppercase tracking-wider font-bold">Popular:</span>
              {["Dental Veneers", "Hair Transplant", "Rhinoplasty", "IVF", "Dental Implants"].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setSearchQuery(term)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section aria-label="Platform statistics" className="bg-[#0A121E] border-y border-white/5 py-5 relative z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/5 rounded-full px-4 py-1.5 shadow-lg">
              <ShieldCheck className="h-4 w-4 text-gold" />
              <span className="text-[13px] font-bold tracking-wide text-white uppercase">100% Verified Clinics</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/10" />
            {[
              { icon: Building2, value: `${stats.clinicCount > 0 ? stats.clinicCount.toLocaleString() : "869"}+`, label: "clinics" },
              { icon: Globe, value: `${stats.countries > 0 ? stats.countries : "17"}+`, label: "countries" },
              { icon: Heart, value: stats.patientsHelped || "43,500+", label: "patients helped" },
              { icon: Star, value: `${stats.avgRating > 0 ? stats.avgRating : "4.8"}`, label: "avg rating" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2.5 group">
                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <stat.icon className="h-4 w-4 text-white/50 group-hover:text-gold transition-colors" />
                </div>
                <span className="text-[13px] text-white/50 tracking-wide font-medium">
                  <span className="font-bold text-white text-[15px]">{stat.value}</span>{" "}
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICE COMPARISON TABLE ═══ */}
      {pricing.length > 0 && <PriceComparisonSection pricing={pricing} />}

      {/* ═══ BROWSE BY TREATMENT ═══ */}
      {categories.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-xs font-bold text-navy/40 mb-2 uppercase tracking-[0.2em]">
                Browse treatments
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy">
                Find Clinics by Treatment
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {categories.map((cat) => (
                <a
                  key={cat.slug}
                  href={`/clinics/${cat.slug}`}
                  className="group rounded-2xl bg-white border border-transparent p-6 transition-all duration-500 hover:-translate-y-1 shadow-[0_8px_30px_rgba(15,27,45,0.04)] ring-1 ring-slate-900/5 hover:shadow-[0_20px_40px_rgba(15,27,45,0.08)] hover:border-gold/30 flex flex-col items-center text-center"
                >
                  <span className="text-3xl mb-4 block opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-500">{CATEGORY_ICONS[cat.slug] || "\uD83C\uDFE5"}</span>
                  <h3 className="text-[15px] font-bold tracking-tight text-navy mb-1.5 group-hover:text-gold-dark transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-medium text-navy/50">
                    {cat.clinicCount} clinic{cat.clinicCount !== 1 ? "s" : ""}
                    {cat.startingPrice ? ` \u00B7 from \u20AC${cat.startingPrice.toLocaleString()}` : ""}
                  </p>
                  {cat.avgRating > 0 && (
                    <div className="flex items-center gap-1 mt-3 bg-navy/[0.03] px-2 py-1 rounded-full">
                      <Star className="h-3 w-3 fill-gold text-gold" />
                      <span className="text-[11px] font-bold text-navy/70 tabular-nums">{cat.avgRating}</span>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ BROWSE BY DESTINATION ═══ */}
      {destinations.length > 0 && (
        <section className="py-16 sm:py-24 bg-cream-warm border-y border-navy/[0.03]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-bold text-navy/40 mb-2 uppercase tracking-[0.2em]">
                Top destinations
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy">
                Popular Countries for Treatment
              </h2>
            </div>
            
            <div className={`grid gap-6 ${
              destinations.length === 1 
                ? 'grid-cols-1 max-w-md mx-auto' 
                : destinations.length === 2 
                  ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}>
              {destinations.slice(0, 8).map((dest) => (
                <a
                  key={dest.slug}
                  href={`/destinations/${dest.slug}`}
                  className="group relative flex flex-col rounded-3xl bg-navy border border-white/5 p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(15,27,45,0.12)] hover:border-gold/30 overflow-hidden min-h-[320px]"
                >
                  {/* Subtle Background Glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-gold/10 transition-colors duration-500" />
                  
                  {/* Large decorative flag */}
                  <div className="absolute -bottom-6 -right-6 text-9xl opacity-[0.03] group-hover:scale-110 group-hover:opacity-[0.06] transition-all duration-700 pointer-events-none rotate-[-15deg] blur-[2px]">
                    {dest.flag}
                  </div>

                  <div className="relative z-10 flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                      <span className="text-3xl drop-shadow-md">{dest.flag}</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-gold transition-colors">
                      {dest.name}
                    </h3>
                  </div>
                  
                  <div className="relative z-10 flex items-center gap-3 text-sm font-medium text-white/60 mb-8">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="h-4 w-4 text-gold/60" />
                      {dest.clinicCount} clinic{dest.clinicCount !== 1 ? "s" : ""}
                    </span>
                    {dest.startingPrice && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center gap-1.5">
                          <span className="text-teal-400">from &euro;{dest.startingPrice.toLocaleString()}</span>
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className="mt-auto relative z-10">
                    <p className="text-xs font-bold text-white/30 uppercase tracking-wider mb-3">Top Treatments</p>
                    {dest.topSpecialties.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {dest.topSpecialties.map((spec) => (
                          <span key={spec} className="rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80 group-hover:border-white/20 transition-colors shadow-sm">
                            {spec}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-white/40 text-sm italic">Multiple specialties available</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CLINIC LISTINGS (FILTERABLE) ═══ */}
      <section id="clinic-listings" className="py-16 sm:py-24 bg-white relative">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col gap-5 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy mb-2">
                Best Clinics in the World
              </h2>
              <p className="text-base text-navy/60 font-light">
                {filteredClinics.length} verified clinic{filteredClinics.length !== 1 ? "s" : ""}
                {locationFilter === "all" ? ` across ${stats.countries > 0 ? stats.countries : "17"}+ countries` : ` in ${locationFilter}`}
              </p>
            </div>

            {/* Filters row - Glassmorphism segmented control feel */}
            <div className="flex flex-wrap items-center gap-2.5 p-2 bg-navy/[0.02] border border-navy/[0.04] rounded-2xl">
              {/* Category filter */}
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="appearance-none rounded-xl border border-transparent bg-white shadow-sm pl-4 pr-9 py-2.5 text-sm font-bold text-navy hover:text-gold-dark hover:border-gold/20 transition-all cursor-pointer outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                >
                  <option value="all">All treatments</option>
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40 pointer-events-none" />
              </div>

              <div className="w-px h-8 bg-navy/10 mx-1 hidden sm:block" />

              {/* Location pills */}
              <button
                type="button"
                onClick={() => setLocationFilter("all")}
                className={`rounded-xl px-4 py-2.5 text-sm font-bold tracking-wide transition-all ${
                  locationFilter === "all"
                    ? "bg-navy text-white shadow-md"
                    : "bg-transparent text-navy/60 hover:bg-white hover:text-navy hover:shadow-sm"
                }`}
              >
                All locations
              </button>
              {countryFilters.slice(0, 6).map((f) => (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => setLocationFilter(f.name)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-bold tracking-wide transition-all ${
                    locationFilter === f.name
                      ? "bg-navy text-white shadow-md"
                      : "bg-transparent text-navy/60 hover:bg-white hover:text-navy hover:shadow-sm"
                  }`}
                >
                  <span className="mr-1.5 opacity-90">{f.flag}</span>
                  {f.name}
                </button>
              ))}

              {/* Active filter indicator */}
              {(locationFilter !== "all" || categoryFilter !== "all" || searchQuery) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="ml-auto rounded-xl bg-red-50 px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-red-600 hover:bg-red-100 transition-colors flex items-center gap-1.5"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Clinic cards */}
          <div className="space-y-5">
            {filteredClinics.slice(0, visibleCount).map((clinic) => (
              <HubClinicCard
                key={clinic.id}
                clinic={clinic}
                onContact={handleContact}
              />
            ))}
          </div>

          {filteredClinics.length === 0 && (
            <div className="text-center py-16">
              <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-lg font-semibold text-slate-900 mb-2">No clinics found</p>
              <p className="text-sm text-slate-500 mb-6">Try adjusting your filters or search terms.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-500 transition-all"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Load more */}
          {filteredClinics.length > visibleCount && (
            <div className="text-center mt-8">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 10)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                Show more clinics
                <ChevronDown className="h-4 w-4" />
              </button>
              <p className="text-xs text-slate-400 mt-2">
                Showing {Math.min(visibleCount, filteredClinics.length)} of {filteredClinics.length} clinics
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ═══ LEAD FUNNEL ═══ */}
      {selectedClinic && (
        <section
          id="lead-funnel-section"
          className="relative py-16 sm:py-24 bg-white overflow-hidden border-t border-navy/[0.03]"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative mx-auto max-w-xl px-4 sm:px-6 lg:px-8" ref={funnelRef}>
            <div className="text-center mb-8">
              <p className="text-xs font-bold text-navy/40 mb-3 uppercase tracking-[0.2em]">
                Free &amp; no obligation
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy mb-3">
                Get in touch with {selectedClinic.name}
              </h2>
              <p className="text-base text-navy/60 font-light max-w-md mx-auto">
                Answer a few quick questions and connect directly with the clinic. Takes less than 2 minutes.
              </p>
            </div>
            <div className="rounded-3xl border border-navy/[0.08] bg-white shadow-[0_20px_60px_rgba(15,27,45,0.06)] ring-1 ring-slate-900/5 p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gold via-gold-dark to-gold" />
              <LeadFunnel
                key={selectedClinic.id}
                clinicId={selectedClinic.id}
                clinicSlug={selectedClinic.slug}
                clinicName={selectedClinic.name}
                pageContext={`${selectedClinic.name} — ${selectedClinic.location}`}
                clinicContactConfig={selectedClinic.contactConfig}
              />
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-navy/40 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-teal" />
                Verified leads
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-teal" />
                No spam guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-teal" />
                Privacy secured
              </span>
            </div>
          </div>
        </section>
      )}

      {/* ═══ PATIENT REVIEWS ═══ */}
      {reviews.length > 0 && (
        <section className="py-16 sm:py-24 bg-navy relative border-y border-white/5">
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-bold text-white/40 mb-2 uppercase tracking-[0.2em]">
                Real experiences
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                What Patients Say
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleReviews.map((review, i) => (
                <div
                  key={`${review.clinicSlug}-${i}`}
                  className="rounded-2xl bg-[#0A121E] border border-white/10 p-6 transition-all hover:border-gold/30 hover:-translate-y-1 shadow-lg"
                >
                  <div className="flex items-center gap-1 mb-4 bg-white/5 w-fit px-2 py-1 rounded-md border border-white/5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        className={`h-3 w-3 ${si < review.rating ? "fill-gold text-gold" : "text-white/10"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-serif text-white/70 leading-relaxed mb-6 line-clamp-4 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <div>
                      <p className="text-sm font-bold text-white mb-0.5">{review.authorName}</p>
                      <p className="text-xs font-medium text-white/40 uppercase tracking-wide">{review.countryFlag} {review.clinicName}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Review pagination */}
            {totalReviewPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setReviewPage((p) => Math.max(0, p - 1))}
                  disabled={reviewPage === 0}
                  className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm text-slate-500">
                  {reviewPage + 1} / {totalReviewPages}
                </span>
                <button
                  type="button"
                  onClick={() => setReviewPage((p) => Math.min(totalReviewPages - 1, p + 1))}
                  disabled={reviewPage === totalReviewPages - 1}
                  className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══ FAQ ═══ */}
      <section className="py-16 sm:py-24 bg-cream-warm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-xs font-bold text-navy/40 mb-2 uppercase tracking-[0.2em]">
                Got questions?
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy mb-4">
                Frequently asked questions
              </h2>
              <p className="text-base text-navy/60 font-light leading-relaxed mb-8">
                Everything you need to know about finding treatment abroad. Can&rsquo;t find your answer? Get in touch.
              </p>
              <a
                href="#lead-funnel-section"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-bold tracking-wide text-navy transition-all hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/20 active:scale-[0.98]"
              >
                Ask a question
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <div className="space-y-4">
              {FAQS.map((faq, i) => {
                const isOpen = faqOpenIndex === i;
                return (
                  <div
                    key={i}
                    className={`rounded-2xl transition-all duration-300 ${
                      isOpen
                        ? "bg-white shadow-[0_8px_30px_rgba(15,27,45,0.06)] border border-transparent"
                        : "bg-transparent border border-navy/10 hover:border-navy/20 hover:bg-white/50"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setFaqOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-center gap-4 p-5 sm:p-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center transition-colors border ${
                        isOpen ? "bg-gold/10 text-gold border-gold/20" : "bg-white text-navy/40 border-navy/5"
                      }`}>
                        <HelpCircle className="h-5 w-5" />
                      </div>
                      <span className={`flex-1 text-[15px] font-bold tracking-tight transition-colors ${
                        isOpen ? "text-navy" : "text-navy/80"
                      }`}>
                        {faq.question}
                      </span>
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isOpen ? "bg-navy/5 text-navy" : "text-navy/30"
                      }`}>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`} />
                      </div>
                    </button>
                    <div
                      className="grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 sm:px-6 pb-6 pl-[4.5rem] text-[15px] text-navy/60 font-light leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INTERNAL LINKS FOOTER ═══ */}
      <section className="py-16 sm:py-24 bg-[#0A121E] border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Countries */}
          {internalLinks.countryLinks.length > 0 && (
            <div className="mb-16">
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-6">
                Countries for treatment
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-3">
                {internalLinks.countryLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2.5 text-sm font-medium text-white/60 hover:text-gold transition-colors py-1 group"
                  >
                    {link.flag && <span className="text-base group-hover:scale-110 transition-transform">{link.flag}</span>}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Treatments */}
          {internalLinks.treatmentLinks.length > 0 && (
            <div className="mb-16">
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-6">
                Browse by treatment
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-3">
                {internalLinks.treatmentLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-white/60 hover:text-gold transition-colors py-1 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-gold transition-colors" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Popular combos */}
          {internalLinks.comboLinks.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-6">
                Popular treatments abroad
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-3">
                {internalLinks.comboLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-white/60 hover:text-gold transition-colors py-1 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-gold transition-colors" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══ STICKY BOTTOM CTA BAR ═══ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A121E]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="hidden sm:flex h-12 w-12 rounded-full bg-gold/10 border border-gold/20 items-center justify-center flex-shrink-0 shadow-lg">
              <MessageCircle className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="text-[15px] font-bold text-white tracking-wide">Not sure which clinic is right for you?</p>
              <p className="text-[11px] font-medium text-white/50 uppercase tracking-wider hidden sm:block">Our AI concierge can help match you with the perfect clinic</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              // Trigger the concierge widget
              const widget = document.querySelector('[data-concierge-trigger]') as HTMLButtonElement;
              if (widget) {
                widget.click();
              } else {
                // Fallback: scroll to funnel
                const el = document.getElementById("lead-funnel-section");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                } else if (clinics[0]) {
                  handleContact(clinics[0]);
                }
              }
            }}
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-bold tracking-wide text-navy transition-all hover:bg-gold-dark active:scale-[0.98] shadow-[0_4px_15px_rgba(198,169,108,0.2)] hover:shadow-[0_8px_25px_rgba(198,169,108,0.3)]"
          >
            <MessageCircle className="h-4 w-4" />
            Chat with AI Concierge
          </button>
        </div>
      </div>

      {/* Bottom spacer for sticky bar */}
      <div className="h-[68px]" />
    </>
  );
}

// =============================================================================
// PRICE COMPARISON SUB-COMPONENT
// =============================================================================

function PriceComparisonSection({ pricing }: { pricing: PricingRow[] }) {
  // Get all unique countries
  const allCountries = new Map<string, string>();
  for (const proc of pricing) {
    for (const p of proc.prices) {
      if (!allCountries.has(p.country)) {
        allCountries.set(p.country, p.flag);
      }
    }
  }
  const countries = Array.from(allCountries.entries()).slice(0, 4).map(([name, flag]) => ({ name, flag }));

  return (
    <section className="py-16 sm:py-24 bg-white relative border-b border-navy/[0.03]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <div>
            <p className="text-xs font-bold text-navy/40 mb-2 uppercase tracking-[0.2em]">
              Compare costs
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy mb-2">
              Treatment Costs by Country
            </h2>
            <p className="text-sm text-navy/60 font-light max-w-2xl">
              Prices are approximate starting prices. Contact a clinic for an exact quote.
            </p>
          </div>
          <a
            href="#clinic-listings"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-bold tracking-wide text-navy transition-all hover:bg-gold-dark active:scale-[0.98] flex-shrink-0 shadow-[0_8px_20px_rgba(198,169,108,0.2)] hover:shadow-[0_12px_25px_rgba(198,169,108,0.3)]"
          >
            Browse clinics
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="rounded-2xl border border-navy/[0.04] overflow-hidden shadow-[0_8px_30px_rgba(15,27,45,0.04)] ring-1 ring-slate-900/5 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-[#0A121E] text-white">
                  <th className="font-bold px-6 py-5 min-w-[200px] tracking-wide text-[15px]">Treatment</th>
                  {countries.map((c) => (
                    <th key={c.name} className="text-center font-bold px-5 py-5 min-w-[130px] tracking-wide text-[15px]">
                      <span className="mr-2 drop-shadow-sm">{c.flag}</span>
                      {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/[0.04]">
                {pricing.map((t, i) => (
                  <tr
                    key={t.procedureName}
                    className={`transition-colors hover:bg-navy/[0.02] ${
                      i % 2 === 0 ? "bg-white" : "bg-cream-warm/30"
                    }`}
                  >
                    <td className="px-6 py-4 font-bold text-navy/90">{t.procedureName}</td>
                    {countries.map((c) => {
                      const price = t.prices.find((p) => p.country === c.name);
                      return (
                        <td key={c.name} className="text-center px-5 py-4 font-medium text-navy/60 tabular-nums">
                          {price ? (
                            <span className="bg-navy/[0.03] px-2.5 py-1 rounded-md">
                              from {price.currency === 'GBP' ? '\u00A3' : '\u20AC'}{price.priceMin.toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-navy/20">\u2014</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-navy/[0.02] border border-navy/[0.04] p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-6 w-6 text-gold-dark" />
            </div>
            <div>
              <p className="text-[15px] font-bold text-navy mb-0.5">
                Get the best option for your budget
              </p>
              <p className="text-xs text-navy/50 font-medium tracking-wide uppercase">Free Cost Estimate</p>
            </div>
          </div>
          <a
            href="#clinic-listings"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-sm font-bold tracking-wide text-white transition-all hover:bg-navy-light active:scale-[0.98] shadow-md"
          >
            Get Free Personalized Offer
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// HUB CLINIC CARD (Bookimed-style, with doctor, review, treatments)
// =============================================================================

function HubClinicCard({
  clinic,
  onContact,
}: {
  clinic: CategoryClinicCard;
  onContact: (clinic: CategoryClinicCard) => void;
}) {
  const primaryCategorySlug = clinic.primaryCategorySlug || "dental";

  return (
    <article className="group rounded-3xl bg-white border border-slate-100 shadow-[0_4px_20px_rgba(15,27,45,0.03)] overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(15,27,45,0.08)] hover:border-gold/30">
      <div className="flex flex-col md:flex-row">
        {/* Photo column */}
        <div className="relative md:w-[300px] lg:w-[340px] flex-shrink-0 p-3">
          <div className="relative h-56 md:h-full min-h-[240px] rounded-2xl overflow-hidden shadow-sm">
            {clinic.imageUrl ? (
              <Image
                src={clinic.imageUrl}
                alt={`${clinic.name} clinic`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 340px"
              />
            ) : (
              <div className="w-full h-full bg-slate-50 flex items-center justify-center border border-slate-100/50">
                <Building2 className="h-12 w-12 text-slate-200" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-80 mix-blend-multiply" />

            {/* Rating badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-lg bg-white/95 backdrop-blur-md px-3 py-1.5 shadow-md border border-white/20">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              <span className="text-[13px] font-bold text-navy tabular-nums leading-none">
                {clinic.rating > 0 ? clinic.rating : "\u2014"}
              </span>
              {clinic.reviewCount > 0 && (
                <span className="text-[11px] font-medium text-navy/40 tracking-wide leading-none">({clinic.reviewCount})</span>
              )}
            </div>

            {/* Verified badge */}
            {clinic.verified && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-lg bg-teal-600/95 backdrop-blur-md px-3 py-1.5 shadow-md border border-teal-500/20">
                <BadgeCheck className="h-3.5 w-3.5 text-white" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider leading-none">Verified</span>
              </div>
            )}

            {/* Location */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center">
              <div className="flex items-center gap-2.5 rounded-xl bg-navy/80 backdrop-blur-md px-3.5 py-2 border border-white/10 shadow-lg">
                <span className="text-base drop-shadow-sm leading-none">{clinic.countryFlag}</span>
                <span className="text-xs font-semibold text-white tracking-wide">{clinic.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content column */}
        <div className="flex-1 p-6 sm:p-8 sm:pl-5 flex flex-col">
          {/* Name + accreditations */}
          <div className="mb-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <h3 className="text-2xl font-bold tracking-tight text-navy leading-tight group-hover:text-gold-dark transition-colors">
                <a href={`/clinics/${primaryCategorySlug}/${clinic.slug}`}>
                  {clinic.name}
                </a>
              </h3>
              {clinic.yearEstablished && (
                <span className="flex-shrink-0 text-xs font-bold uppercase tracking-widest text-navy/40 tabular-nums pt-1">
                  Est. {clinic.yearEstablished}
                </span>
              )}
            </div>
            {clinic.accreditations.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {clinic.accreditations.map((acc) => (
                  <span
                    key={acc}
                    className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 border border-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-navy/60 shadow-sm"
                  >
                    <Shield className="h-3.5 w-3.5 text-gold" />
                    {acc}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          {clinic.description && (
            <p className="text-[15px] text-navy/60 leading-relaxed font-light mb-6 line-clamp-2">
              {clinic.description}
            </p>
          )}

          {/* Details Grid */}
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            {/* Doctor */}
            {clinic.doctor && (
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 shadow-sm transition-colors group-hover:bg-slate-50/80">
                {clinic.doctor.photoUrl ? (
                  <Image
                    src={clinic.doctor.photoUrl}
                    alt={clinic.doctor.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover flex-shrink-0 shadow-md border border-white"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-200">
                    <Stethoscope className="h-5 w-5 text-slate-300" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-[15px] font-bold text-navy truncate">{clinic.doctor.name}</p>
                  <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mt-0.5">
                    {clinic.doctor.specialty}
                  </p>
                </div>
              </div>
            )}

            {/* Review excerpt */}
            {clinic.review && clinic.review.text && (
              <div className="p-4 rounded-2xl bg-cream-warm border border-gold/10 shadow-sm">
                <div className="flex items-start gap-2.5">
                  <Quote className="h-4 w-4 text-gold/60 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[13px] text-navy/80 italic leading-relaxed line-clamp-2 mb-2 font-serif">
                      "{clinic.review.text}"
                    </p>
                    <p className="text-[11px] font-bold text-navy/40 uppercase tracking-widest">
                      &mdash; {clinic.review.authorName}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-auto pt-6 border-t border-slate-100">
            {/* Treatment prices */}
            {clinic.treatments.length > 0 && (
              <div className="flex flex-wrap gap-x-6 gap-y-3 mb-6">
                {clinic.treatments.slice(0, 3).map((t) => (
                  <div key={t.name} className="flex items-center gap-2 text-[15px]">
                    <span className="text-navy/50 font-medium">{t.name}</span>
                    <span className="font-bold text-teal-700 tabular-nums">
                      {t.priceMin
                        ? `from ${t.currency === "GBP" ? "\u00A3" : t.currency === "EUR" ? "\u20AC" : "$"}${t.priceMin.toLocaleString()}`
                        : "Contact"}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch gap-4">
              <a
                href={`/enquiry/${clinic.slug}`}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-[15px] font-bold tracking-wide text-navy transition-all hover:bg-gold-dark hover:shadow-[0_8px_20px_rgba(198,169,108,0.25)] active:scale-[0.98]"
              >
                Get Free Quote
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={`/clinics/${primaryCategorySlug}/${clinic.slug}`}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-[15px] font-bold tracking-wide text-navy transition-all hover:border-navy/20 hover:bg-slate-50 active:scale-[0.98] shadow-sm"
              >
                View Clinic
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
