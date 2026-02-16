import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { createClient } from '@/lib/supabase/server'
import {
  Star,
  MapPin,
  BadgeCheck,
  Shield,
  Users,
  Calendar,
  Award,
  Quote,
  ArrowRight,
  ChevronRight,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { getCategoryConfig } from "@/lib/categories/config";
import { getClinicBySlug, getSimilarClinics } from "@/lib/data/clinics";
import { getClinicsByCountry } from "@/lib/data/content";
import { getUser } from "@/lib/auth/actions";
import { isClinicSaved } from "@/lib/data/patient-dashboard";
import { LeadFunnel } from "@/components/lead-funnel";
import type { ClinicContactConfig } from "@/lib/lead-funnel/types";
import {
  generateClinicSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/structured-data";
import { StructuredData } from "@/components/seo/structured-data-component";

// ─── Types ───────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://medit.com";

interface PageProps {
  params: Promise<{ locale: string; category: string; slug: string }>;
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const config = getCategoryConfig(category);
  const clinic = await getClinicBySlug(slug);

  if (!clinic || !config) return {};

  const location = [clinic.city, clinic.country].filter(Boolean).join(", ");

  return {
    title: `${clinic.name} — ${location} | Verified ${config.name} Clinic | medit`,
    description: clinic.description || `${clinic.name} in ${location}. Verified ${config.name.toLowerCase()} clinic.`,
    openGraph: {
      title: `${clinic.name} — ${location}`,
      description: clinic.description || undefined,
      type: "website",
      images: clinic.photos[0]?.url ? [{ url: clinic.photos[0].url }] : undefined,
    },
    alternates: {
      canonical: `${SITE_URL}/clinics/${category}/${slug}`,
    },
  };
}

export const revalidate = 3600;

// ─── Helper ──────────────────────────────────────────────────────────────────

function formatPrice(min: number | null, max: number | null, currency: string): string {
  const symbols: Record<string, string> = { EUR: "€", USD: "$", GBP: "£", THB: "฿", MXN: "$" };
  const symbol = symbols[currency] || currency;
  if (min && max && min !== max) {
    return `${symbol}${min.toLocaleString()}–${symbol}${max.toLocaleString()}`;
  }
  if (min) return `from ${symbol}${min.toLocaleString()}`;
  if (max) return `up to ${symbol}${max.toLocaleString()}`;
  return "Contact for pricing";
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ClinicDetailPage({ params }: PageProps) {
  const { locale, category, slug } = await params;
  setRequestLocale(locale);

  const config = getCategoryConfig(category);
  if (!config) notFound();

  const clinic = await getClinicBySlug(slug);
  if (!clinic) {
    // Check if slug is a country (legacy route compatibility)
    const supabase = await createClient();
    const { data: country } = await supabase
      .from('countries')
      .select('slug')
      .eq('slug', slug)
      .single();

    if (country) {
      // It's a country, redirect to search with category & country filters
      redirect(`/search?procedure=${category}&country=${slug}`);
    }

    notFound();
  }

  const location = [clinic.city, clinic.country].filter(Boolean).join(", ");
  const leadDoctor = clinic.doctors[0] || null;
  const firstPhoto = clinic.photos[0]?.url || null;
  const googleReviews = clinic.google_reviews;
  const topReview = googleReviews?.reviews?.[0] || null;

  // Parallel data fetching
  const categoryIds = clinic.clinic_categories.map((cc) => cc.category.id);
  const [similarClinics, user] = await Promise.all([
    getSimilarClinics(clinic.id, clinic.country, categoryIds, 4),
    getUser().catch(() => null),
  ]);

  const isSaved = user ? await isClinicSaved(user.id, clinic.id) : false;

  // Contact config for lead funnel
  const contactConfig: ClinicContactConfig = {
    whatsappNumber: clinic.phone || '',
    smsUsePlatformReply: false,
    email: clinic.email || '',
  };

  // Structured data
  const clinicSchema = generateClinicSchema({
    name: clinic.name,
    slug: clinic.slug,
    categorySlug: category,
    description: clinic.description,
    address: clinic.address,
    city: clinic.city,
    country: clinic.country,
    lat: clinic.lat,
    lng: clinic.lng,
    phone: clinic.phone,
    email: clinic.email,
    website: clinic.website,
    photos: clinic.photos,
    rating: googleReviews?.rating || null,
    reviewCount: googleReviews?.review_count || null,
    accreditations: clinic.accreditations,
    specialties: clinic.clinic_categories.map((cc) => cc.category.name),
    procedures: clinic.clinic_procedures.map((cp) => ({
      name: cp.procedure.name,
      priceMin: cp.price_min,
      priceMax: cp.price_max,
      currency: cp.currency,
    })),
    doctors: clinic.doctors.map((d) => ({
      name: d.name,
      title: d.title,
      specialisation: d.specialisation,
    })),
    yearEstablished: clinic.year_established,
    languages: clinic.languages,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Clinics", url: "/clinics" },
    { name: config.namePlural, url: `/clinics/${category}` },
    { name: clinic.name },
  ]);

  return (
    <>
      <StructuredData data={[clinicSchema, breadcrumbSchema]} />

      {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-100">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3"
        >
          <ol className="flex items-center gap-1.5 text-sm text-slate-500">
            <li>
              <Link href="/" className="hover:text-teal-600 transition-colors">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <Link
                href={`/clinics/${category}`}
                className="hover:text-teal-600 transition-colors"
              >
                {config.namePlural}
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-900 font-medium truncate">
              {clinic.name}
            </li>
          </ol>
        </nav>
      </div>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative bg-white">
        <div className="relative h-[260px] sm:h-[340px] lg:h-[400px] overflow-hidden">
          {firstPhoto ? (
            <Image
              src={firstPhoto}
              alt={`${clinic.name} clinic`}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
              <span className="text-6xl text-slate-300">🏥</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {clinic.claimed && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-teal-500 px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wide">
                    <BadgeCheck className="h-3.5 w-3.5" /> Verified
                  </span>
                )}
                {clinic.accreditations.map((acc) => (
                  <span
                    key={acc}
                    className="inline-flex items-center gap-1 rounded-lg bg-white/15 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-white"
                  >
                    <Shield className="h-3 w-3" /> {acc}
                  </span>
                ))}
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-2">
                {clinic.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                {location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {location}
                  </span>
                )}
                {googleReviews?.rating && (
                  <span className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <strong className="text-white">{googleReviews.rating}</strong> (
                    {googleReviews.review_count} reviews)
                  </span>
                )}
                {clinic.year_established && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    Est. {clinic.year_established}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main content grid ───────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-slate-50/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-10">
            {/* ── Left column ──────────────────────────────────────────── */}
            <div className="space-y-8">
              {/* About */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="text-lg font-bold text-slate-900 mb-3">
                  About {clinic.name}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {clinic.description || "Description not yet available."}
                </p>

                {/* Quick facts */}
                <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
                  {clinic.year_established && (
                    <div>
                      <p className="text-sm text-slate-500">Established</p>
                      <p className="mt-1 font-semibold text-slate-900">{clinic.year_established}</p>
                    </div>
                  )}
                  {clinic.languages.length > 0 && (
                    <div>
                      <p className="text-sm text-slate-500">Languages</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {clinic.languages.map((lang) => (
                          <span key={lang} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Lead Doctor */}
              {leadDoctor && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                  <h2 className="text-lg font-bold text-slate-900 mb-5">
                    Lead doctor
                  </h2>
                  <div className="flex items-start gap-5">
                    <div className="relative flex-shrink-0">
                      <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-xl overflow-hidden">
                        {leadDoctor.photo_url ? (
                          <Image
                            src={leadDoctor.photo_url}
                            alt={leadDoctor.name}
                            fill
                            className="object-cover"
                            sizes="112px"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                            <Users className="h-8 w-8 text-slate-300" />
                          </div>
                        )}
                      </div>
                      {clinic.claimed && (
                        <div className="absolute -bottom-2 -right-2 flex items-center gap-0.5 rounded-full bg-emerald-500 px-2 py-0.5 shadow-md">
                          <BadgeCheck className="h-3 w-3 text-white" />
                          <span className="text-[9px] font-bold text-white uppercase">
                            Verified
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 mb-1">
                        {leadDoctor.name}
                      </h3>
                      {leadDoctor.specialisation && (
                        <p className="text-sm text-teal-600 font-medium mb-2">
                          {leadDoctor.specialisation}
                        </p>
                      )}
                      {leadDoctor.years_experience && (
                        <div className="flex items-center gap-1.5 mb-3">
                          <Award className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-500">
                            {leadDoctor.years_experience} years of experience
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-sm text-slate-500">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        {clinic.name}, {location}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Treatment Pricing */}
              {clinic.clinic_procedures.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                  <h2 className="text-lg font-bold text-slate-900 mb-5">
                    Treatment prices
                  </h2>
                  <div className="divide-y divide-slate-100">
                    {clinic.clinic_procedures.map((cp) => (
                      <div
                        key={cp.id}
                        className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                      >
                        <span className="text-sm text-slate-700">{cp.procedure.name}</span>
                        <span className="text-sm font-bold text-slate-900 tabular-nums">
                          {formatPrice(cp.price_min, cp.price_max, cp.currency)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-4">
                    Prices are approximate. Contact the clinic for an exact quote.
                  </p>
                </div>
              )}

              {/* Patient Review */}
              {topReview && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                  <h2 className="text-lg font-bold text-slate-900 mb-5">
                    Patient review
                  </h2>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < topReview.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200"
                          }`}
                      />
                    ))}
                  </div>
                  <div className="pl-4 border-l-2 border-teal-200 mb-4">
                    <Quote className="h-4 w-4 text-teal-400 mb-2" />
                    <p className="text-sm text-slate-600 italic leading-relaxed">
                      {topReview.text}
                    </p>
                  </div>
                  <p className="text-sm text-slate-500">
                    &mdash; {topReview.author_name}
                  </p>
                </div>
              )}

              {/* Categories tags */}
              {clinic.clinic_categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {clinic.clinic_categories.map((cc) => (
                    <Link
                      key={cc.id}
                      href={`/clinics/${cc.category.slug}`}
                      className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-500 hover:border-teal-200 hover:text-teal-700 transition-colors"
                    >
                      {cc.category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ── Right column — sticky CTA + funnel ──────────────────── */}
            <div className="lg:sticky lg:top-6 lg:self-start space-y-5">
              {/* Quick contact card */}
              <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-teal-100 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Get in touch
                    </p>
                    <p className="text-xs text-slate-500">
                      Free &amp; no obligation
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 mb-5">
                  {[
                    "Free consultation with the clinic",
                    "Personalized treatment plan",
                    "Transparent pricing — no hidden fees",
                  ].map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle2 className="h-4 w-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href="#clinic-funnel"
                  className="flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-500 active:scale-[0.98] w-full"
                >
                  Get a free quote
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Lead funnel */}
              <div
                id="clinic-funnel"
                className="rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5 p-5 sm:p-6"
              >
                <LeadFunnel
                  clinicId={clinic.id}
                  clinicSlug={clinic.slug}
                  clinicName={clinic.name}
                  pageContext={`${clinic.name} — ${location}`}
                  clinicContactConfig={contactConfig}
                />
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  SMS verified
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  No spam
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Data stays private
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Back to directory ────────────────────────────────────────────── */}
      <div className="bg-white border-t border-slate-100 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href={`/clinics/${category}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
          >
            &larr; Back to all {config.namePlural.toLowerCase()}
          </Link>
        </div>
      </div>
    </>
  );
}
