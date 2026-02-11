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
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-14 sm:pt-16 sm:pb-18">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-teal-400 mb-3 uppercase tracking-wider">
              Compare &amp; connect
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] text-white tracking-tight leading-[1.1] mb-5">
              Discover the Best Clinics{" "}
              <span className="text-teal-400">Worldwide</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              Compare {stats.clinicCount > 0 ? stats.clinicCount.toLocaleString() : "800"}+ verified clinics
              across {stats.countries > 0 ? stats.countries : "17"}+ countries. Transparent pricing, real patient reviews,
              and direct clinic connections.
            </p>

            {/* Search bar */}
            <div className="flex items-center bg-white rounded-xl shadow-lg shadow-black/20 p-1.5 max-w-xl">
              <div className="flex items-center gap-2 flex-1 px-4">
                <Search className="h-5 w-5 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search clinics, treatments, or destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("clinic-listings");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-shrink-0 rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-500 active:scale-[0.98]"
              >
                Search
              </button>
            </div>

            {/* Popular searches */}
            <div className="flex flex-wrap items-center gap-2 mt-5">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Popular:</span>
              {["Dental Veneers", "Hair Transplant", "Rhinoplasty", "IVF", "Dental Implants"].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setSearchQuery(term)}
                  className="rounded-full border border-slate-600 px-3 py-1 text-xs text-slate-300 hover:border-teal-400 hover:text-teal-400 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section aria-label="Platform statistics" className="bg-slate-900 border-t border-slate-700/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <div className="flex items-center gap-2 text-teal-400">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-semibold">100% Verified Clinics</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-slate-700" />
            {[
              { icon: Building2, value: `${stats.clinicCount > 0 ? stats.clinicCount.toLocaleString() : "869"}+`, label: "clinics" },
              { icon: Globe, value: `${stats.countries > 0 ? stats.countries : "17"}+`, label: "countries" },
              { icon: Heart, value: stats.patientsHelped || "43,500+", label: "patients helped" },
              { icon: Star, value: `${stats.avgRating > 0 ? stats.avgRating : "4.8"}`, label: "avg rating" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <stat.icon className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-300">
                  <span className="font-bold text-white tabular-nums">{stat.value}</span>{" "}
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
              <p className="text-sm font-semibold text-teal-600 mb-2 uppercase tracking-wider">
                Browse treatments
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Find Clinics by Treatment
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <a
                  key={cat.slug}
                  href={`/clinics/${cat.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-teal-200 hover:shadow-lg hover:shadow-teal-500/5"
                >
                  <span className="text-2xl mb-3 block">{CATEGORY_ICONS[cat.slug] || "\uD83C\uDFE5"}</span>
                  <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {cat.clinicCount} clinic{cat.clinicCount !== 1 ? "s" : ""}
                    {cat.startingPrice ? ` \u00B7 from \u20AC${cat.startingPrice.toLocaleString()}` : ""}
                  </p>
                  {cat.avgRating > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-semibold text-slate-700 tabular-nums">{cat.avgRating}</span>
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
        <section className="py-16 sm:py-20 bg-slate-50/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-semibold text-teal-600 mb-2 uppercase tracking-wider">
                Top destinations
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Popular Countries for Treatment
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {destinations.slice(0, 8).map((dest) => (
                <a
                  key={dest.slug}
                  href={`/destinations/${dest.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-teal-200 hover:shadow-lg hover:shadow-teal-500/5"
                >
                  <span className="text-2xl mb-3 block">{dest.flag}</span>
                  <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-2">
                    {dest.clinicCount} clinic{dest.clinicCount !== 1 ? "s" : ""}
                    {dest.startingPrice ? ` \u00B7 from \u20AC${dest.startingPrice.toLocaleString()}` : ""}
                  </p>
                  {dest.topSpecialties.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {dest.topSpecialties.map((spec) => (
                        <span key={spec} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CLINIC LISTINGS (FILTERABLE) ═══ */}
      <section id="clinic-listings" className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col gap-4 mb-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-slate-900 tracking-tight mb-1">
                Best Clinics in the World
              </h2>
              <p className="text-sm text-slate-500">
                {filteredClinics.length} verified clinic{filteredClinics.length !== 1 ? "s" : ""}
                {locationFilter === "all" ? ` across ${stats.countries > 0 ? stats.countries : "17"}+ countries` : ` in ${locationFilter}`}
              </p>
            </div>

            {/* Filters row */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Category filter */}
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="appearance-none rounded-full border border-slate-200 bg-white pl-4 pr-8 py-2 text-sm font-medium text-slate-700 hover:border-teal-300 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-300"
                >
                  <option value="all">All treatments</option>
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Location pills */}
              <button
                type="button"
                onClick={() => setLocationFilter("all")}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-all ${
                  locationFilter === "all"
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-teal-300"
                }`}
              >
                All locations
              </button>
              {countryFilters.slice(0, 6).map((f) => (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => setLocationFilter(f.name)}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition-all ${
                    locationFilter === f.name
                      ? "bg-teal-600 text-white shadow-sm"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-teal-300"
                  }`}
                >
                  {f.flag} {f.name}
                </button>
              ))}

              {/* Active filter indicator */}
              {(locationFilter !== "all" || categoryFilter !== "all" || searchQuery) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-full border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors flex items-center gap-1"
                >
                  <X className="h-3 w-3" />
                  Clear
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
          className="relative py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px]" />
          <div className="relative mx-auto max-w-xl px-4 sm:px-6 lg:px-8" ref={funnelRef}>
            <div className="text-center mb-8">
              <p className="text-sm font-semibold text-teal-600 mb-3 uppercase tracking-wider">
                Free &amp; no obligation
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 tracking-tight mb-3">
                Get in touch with {selectedClinic.name}
              </h2>
              <p className="text-base text-slate-500 max-w-md mx-auto">
                Answer a few quick questions and connect directly with the clinic. Takes less than 2 minutes.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5 p-6 sm:p-8">
              <LeadFunnel
                key={selectedClinic.id}
                clinicId={selectedClinic.id}
                clinicSlug={selectedClinic.slug}
                clinicName={selectedClinic.name}
                pageContext={`${selectedClinic.name} — ${selectedClinic.location}`}
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

      {/* ═══ PATIENT REVIEWS ═══ */}
      {reviews.length > 0 && (
        <section className="py-16 sm:py-20 bg-slate-50/70">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-semibold text-teal-600 mb-2 uppercase tracking-wider">
                Real experiences
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 tracking-tight">
                What Patients Say
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleReviews.map((review, i) => (
                <div
                  key={`${review.clinicSlug}-${i}`}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        className={`h-4 w-4 ${si < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-4 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{review.authorName}</p>
                      <p className="text-xs text-slate-500">{review.countryFlag} {review.clinicName}</p>
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
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-sm font-semibold text-teal-600 mb-3 uppercase tracking-wider">
                Got questions?
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
                Frequently asked questions
              </h2>
              <p className="text-base text-slate-500 leading-relaxed mb-8">
                Everything you need to know about finding treatment abroad. Can&rsquo;t find your answer? Get in touch.
              </p>
              <a
                href="#lead-funnel-section"
                className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
              >
                Ask a question
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
            <div className="space-y-3">
              {FAQS.map((faq, i) => {
                const isOpen = faqOpenIndex === i;
                return (
                  <div
                    key={i}
                    className={`rounded-2xl border transition-all duration-200 ${
                      isOpen
                        ? "border-teal-200 bg-teal-50/40 shadow-sm shadow-teal-500/5"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setFaqOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-center gap-4 p-5 sm:p-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <div className={`flex-shrink-0 h-9 w-9 rounded-xl flex items-center justify-center transition-colors ${
                        isOpen ? "bg-teal-100 text-teal-600" : "bg-slate-100 text-slate-400"
                      }`}>
                        <HelpCircle className="h-4.5 w-4.5" />
                      </div>
                      <span className={`flex-1 text-[15px] font-semibold transition-colors ${
                        isOpen ? "text-teal-900" : "text-slate-900"
                      }`}>
                        {faq.question}
                      </span>
                      <ChevronDown className={`h-5 w-5 flex-shrink-0 transition-all duration-200 ${
                        isOpen ? "rotate-180 text-teal-500" : "text-slate-300"
                      }`} />
                    </button>
                    <div
                      className="grid transition-all duration-200"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[4.25rem] text-sm text-slate-600 leading-relaxed">
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
      <section className="py-12 sm:py-16 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Countries */}
          {internalLinks.countryLinks.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-slate-900 mb-6">
                Countries for treatment
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-2.5">
                {internalLinks.countryLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-700 transition-colors py-1"
                  >
                    {link.flag && <span className="text-base">{link.flag}</span>}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Treatments */}
          {internalLinks.treatmentLinks.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-slate-900 mb-6">
                Browse by treatment
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-2.5">
                {internalLinks.treatmentLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-teal-700 transition-colors py-1"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Popular combos */}
          {internalLinks.comboLinks.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-6">
                Popular treatments abroad
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-2.5">
                {internalLinks.comboLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-teal-700 transition-colors py-1"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══ STICKY BOTTOM CTA BAR ═══ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex h-10 w-10 rounded-full bg-teal-100 items-center justify-center flex-shrink-0">
              <MessageCircle className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Not sure which clinic is right for you?</p>
              <p className="text-xs text-slate-500 hidden sm:block">Our AI concierge can help match you with the perfect clinic</p>
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
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-500 active:scale-[0.98] shadow-sm"
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
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-semibold text-teal-600 mb-2 uppercase tracking-wider">
              Compare costs
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-slate-900 tracking-tight mb-2">
              Treatment Costs by Country
            </h2>
            <p className="text-sm text-slate-500">
              Prices are approximate starting prices. Contact a clinic for an exact quote.
            </p>
          </div>
          <a
            href="#clinic-listings"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-500 active:scale-[0.98] flex-shrink-0"
          >
            Browse clinics
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left font-semibold px-5 py-4 min-w-[200px]">Treatment</th>
                  {countries.map((c) => (
                    <th key={c.name} className="text-center font-semibold px-4 py-4 min-w-[130px]">
                      <span className="mr-1.5">{c.flag}</span>
                      {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricing.map((t, i) => (
                  <tr
                    key={t.procedureName}
                    className={`border-t border-slate-100 transition-colors hover:bg-slate-50/80 ${
                      i % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                    }`}
                  >
                    <td className="px-5 py-3.5 font-medium text-slate-900">{t.procedureName}</td>
                    {countries.map((c) => {
                      const price = t.prices.find((p) => p.country === c.name);
                      return (
                        <td key={c.name} className="text-center px-4 py-3.5 text-slate-600 tabular-nums">
                          {price ? `from ${price.currency === 'GBP' ? '\u00A3' : '\u20AC'}${price.priceMin.toLocaleString()}` : '\u2014'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-teal-50 border border-teal-100 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-teal-800 font-medium">
            Get the best option for your budget
          </p>
          <a
            href="#clinic-listings"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-500 active:scale-[0.98]"
          >
            Get free personalized offer
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
    <article className="group rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all hover:border-teal-200 hover:shadow-lg hover:shadow-teal-500/5">
      <div className="flex flex-col md:flex-row">
        {/* Photo column */}
        <div className="relative md:w-[280px] lg:w-[320px] flex-shrink-0">
          <div className="relative h-52 md:h-full min-h-[220px]">
            {clinic.imageUrl ? (
              <Image
                src={clinic.imageUrl}
                alt={`${clinic.name} clinic`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                <span className="text-4xl text-slate-300">{"\uD83C\uDFE5"}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/5" />

            {/* Rating badge */}
            <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-lg bg-white/95 backdrop-blur-sm px-2.5 py-1.5 shadow-sm">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-slate-900 tabular-nums">
                {clinic.rating > 0 ? clinic.rating : "\u2014"}
              </span>
              {clinic.reviewCount > 0 && (
                <span className="text-xs text-slate-500">({clinic.reviewCount})</span>
              )}
            </div>

            {/* Verified badge */}
            {clinic.verified && (
              <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-lg bg-teal-600 px-2.5 py-1.5 shadow-sm">
                <BadgeCheck className="h-3.5 w-3.5 text-white" />
                <span className="text-[11px] font-bold text-white uppercase tracking-wide">Verified</span>
              </div>
            )}

            {/* Location */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5 rounded-lg bg-black/50 backdrop-blur-sm px-2.5 py-1.5">
                <span className="text-sm">{clinic.countryFlag}</span>
                <span className="text-xs font-medium text-white">{clinic.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content column */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col">
          {/* Name + accreditations */}
          <div className="mb-3">
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <h3 className="text-lg font-bold text-slate-900 leading-tight">
                <a
                  href={`/clinics/${primaryCategorySlug}/${clinic.slug}`}
                  className="hover:text-teal-700 transition-colors"
                >
                  {clinic.name}
                </a>
              </h3>
              {clinic.yearEstablished && (
                <span className="flex-shrink-0 text-xs text-slate-400 tabular-nums">
                  Est. {clinic.yearEstablished}
                </span>
              )}
            </div>
            {clinic.accreditations.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {clinic.accreditations.map((acc) => (
                  <span
                    key={acc}
                    className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600"
                  >
                    <Shield className="h-2.5 w-2.5" />
                    {acc}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          {clinic.description && (
            <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
              {clinic.description}
            </p>
          )}

          {/* Doctor row */}
          {clinic.doctor && (
            <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
              {clinic.doctor.photoUrl ? (
                <Image
                  src={clinic.doctor.photoUrl}
                  alt={clinic.doctor.name}
                  width={44}
                  height={44}
                  className="rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="h-11 w-11 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-slate-400" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{clinic.doctor.name}</p>
                <p className="text-xs text-slate-500">
                  {clinic.doctor.specialty}
                  {clinic.doctor.yearsExperience > 0 && (
                    <> &middot; {clinic.doctor.yearsExperience} yrs experience</>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Review excerpt */}
          {clinic.review && clinic.review.text && (
            <div className="mb-4 pl-3 border-l-2 border-teal-200">
              <div className="flex items-start gap-1.5">
                <Quote className="h-3 w-3 text-teal-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 italic leading-relaxed line-clamp-2">
                  {clinic.review.text}
                </p>
              </div>
              <p className="text-xs text-slate-400 mt-1 pl-4.5">
                &mdash; {clinic.review.authorName}
              </p>
            </div>
          )}

          {/* Treatment prices */}
          {clinic.treatments.length > 0 && (
            <div className="space-y-1.5 mb-5">
              {clinic.treatments.slice(0, 3).map((t) => (
                <div key={t.name} className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{t.name}</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {t.priceMin
                      ? `from ${t.currency === "GBP" ? "\u00A3" : t.currency === "EUR" ? "\u20AC" : "$"}${t.priceMin.toLocaleString()}`
                      : "Contact"}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="mt-auto flex items-center gap-3">
            <button
              type="button"
              onClick={() => onContact(clinic)}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-700 active:scale-[0.98] group-hover:shadow-md"
            >
              Get a free quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href={`/clinics/${primaryCategorySlug}/${clinic.slug}`}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
            >
              View clinic
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
