import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { createStaticClient } from '@/lib/supabase/static'
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

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://meetyourclinic.com";

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
  const title = `${clinic.name} | ${location} ${config.name} Clinic`
  const ogTitle = `${clinic.name} | ${location}`
  const description = clinic.description || `${clinic.name} in ${location}. Verified ${config.name.toLowerCase()} clinic.`

  return {
    title,
    description,
    openGraph: {
      title: ogTitle,
      description,
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
    const supabase = createStaticClient();
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
  const firstPhoto = clinic.slug === 'hisar-hospital-intercontinental' 
    ? '/images/hisar-hospital-new.jpeg' 
    : (clinic.photos[0]?.url || null);
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
      <section className="relative bg-white border-b-4 border-gold-500">
        <div className="relative h-[300px] sm:h-[400px] lg:h-[480px] overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-900/40 to-transparent" />
          <div className="absolute inset-0 bg-[url('/images/patterns/medical-cross.svg')] opacity-5" />

          <div className="absolute bottom-0 left-0 right-0">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {clinic.claimed && (
                  <span className="inline-flex items-center gap-1 rounded-md border border-teal-200 bg-teal-100/90 backdrop-blur-sm px-2.5 py-1 text-xs font-bold text-teal-900 tracking-wide uppercase shadow-sm">
                    <BadgeCheck className="h-3.5 w-3.5 text-teal-700" /> Verified Listing
                  </span>
                )}
                {clinic.accreditations.map((acc) => (
                  <span
                    key={acc}
                    className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white shadow-sm"
                  >
                    <Shield className="h-3.5 w-3.5 text-gold-400" /> {acc}
                  </span>
                ))}
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-3 drop-shadow-md">
                {clinic.name}
              </h1>
              {location && (
                 <p className="text-lg text-teal-100 font-medium mb-4 flex items-center gap-2">
                   <MapPin className="h-5 w-5" /> Excellence in {location}
                 </p>
              )}
              <div className="flex flex-wrap items-center gap-5 text-sm text-white/90 font-medium">
                {googleReviews?.rating && (
                  <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                    <strong className="text-white text-base">{googleReviews.rating}</strong>
                    <span className="opacity-80">({googleReviews.review_count} reviews)</span>
                  </span>
                )}
                {clinic.year_established && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-white/60" />
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
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-500" />
                <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">i</span>
                  About {clinic.name}
                </h2>
                <div className="prose prose-slate prose-p:leading-relaxed prose-p:text-slate-600 max-w-none">
                  <p className="text-base font-medium text-slate-700 leading-loose">
                    {clinic.description || "Description not yet available."}
                  </p>
                </div>

                {/* Quick facts */}
                <div className="mt-10 grid gap-6 border-t border-slate-100 pt-8 sm:grid-cols-3">
                  {clinic.year_established && (
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <Calendar className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Established</p>
                        <p className="text-lg font-bold text-navy">{clinic.year_established}</p>
                      </div>
                    </div>
                  )}
                  {clinic.languages.length > 0 && (
                    <div className="sm:col-span-2">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Languages Spoken</p>
                      <div className="flex flex-wrap gap-2">
                        {clinic.languages.map((lang) => (
                          <span key={lang} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-default">
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
                <div className="rounded-3xl border-2 border-teal-50 bg-gradient-to-br from-white to-teal-50/30 p-6 sm:p-10 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/5 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 relative z-10">
                    <div>
                      <h2 className="text-2xl font-bold text-navy flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">👨‍⚕️</span>
                        Lead Medical Expert
                      </h2>
                      <p className="text-sm text-slate-500 font-medium mt-1">Meet the specialist directing your care</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start gap-8 relative z-10 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                      <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-full overflow-hidden ring-4 ring-teal-50 shadow-inner">
                        {leadDoctor.photo_url ? (
                          <Image
                            src={leadDoctor.photo_url}
                            alt={leadDoctor.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 128px, 160px"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-50 flex items-center justify-center border border-slate-100">
                            <Users className="h-12 w-12 text-slate-300" />
                          </div>
                        )}
                      </div>
                      {clinic.claimed && (
                        <div className="absolute -bottom-2 right-0 left-0 flex justify-center">
                          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 shadow-md border-2 border-white">
                            <BadgeCheck className="h-3.5 w-3.5 text-white" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                              Verified
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-2xl font-bold text-navy mb-2">
                        {leadDoctor.name}
                      </h3>
                      {leadDoctor.specialisation && (
                        <p className="text-base text-teal-600 font-bold mb-4 bg-teal-50 inline-block px-3 py-1 rounded-lg">
                          {leadDoctor.specialisation}
                        </p>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        {leadDoctor.years_experience && (
                          <div className="flex flex-col items-center sm:items-start p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <Award className="h-5 w-5 text-amber-500 mb-2" />
                            <span className="text-xl font-black text-navy leading-none mb-1">
                              {leadDoctor.years_experience}+
                            </span>
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                              Years Experience
                            </span>
                          </div>
                        )}
                        <div className="flex flex-col items-center sm:items-start p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <MapPin className="h-5 w-5 text-teal-500 mb-2" />
                          <span className="text-sm font-bold text-navy leading-tight mb-1 truncate w-full" title={location}>
                            {location}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            Location
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Treatment Pricing */}
              {clinic.clinic_procedures.length > 0 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-emerald-50 rounded-xl">
                      <span className="text-xl">💰</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-navy">
                        Treatment Pricing
                      </h2>
                      <p className="text-sm text-slate-500 font-medium mt-1">Starting costs for common procedures</p>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                    {clinic.clinic_procedures.map((cp, idx) => (
                      <div
                        key={cp.id}
                        className={`flex items-center justify-between p-4 ${idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'} hover:bg-teal-50/30 transition-colors`}
                      >
                        <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                           <CheckCircle2 className="w-4 h-4 text-teal-500" />
                           {cp.procedure.name}
                        </span>
                        <div className="text-right">
                          <span className="text-xs text-slate-400 font-medium uppercase tracking-wide block mb-0.5">From</span>
                          <span className="text-lg font-bold text-emerald-700 tabular-nums">
                            {formatPrice(cp.price_min, cp.price_max, cp.currency)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100/50">
                    <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-900 leading-relaxed font-medium">
                      <strong>Transparent Pricing Guarantee:</strong> These are guide prices provided directly by the clinic. Final treatment plans and costs are determined after medical consultation.
                    </p>
                  </div>
                </div>
              )}

              {/* Patient Review */}
              {topReview && (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-8 -mt-8 opacity-50 pointer-events-none" />
                  
                  <h2 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                    Patient Review
                  </h2>
                  <div className="flex items-center gap-1 mb-4 bg-amber-50 inline-flex px-3 py-1.5 rounded-lg">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < topReview.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-amber-100"
                          }`}
                      />
                    ))}
                    <span className="text-amber-700 font-bold ml-1 text-sm">{topReview.rating}.0</span>
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-teal-100 -z-10" />
                    <p className="text-base text-slate-700 leading-relaxed font-medium relative z-10 pl-4 border-l-2 border-teal-500">
                      "{topReview.text}"
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                      {topReview.author_name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy">
                        {topReview.author_name}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Verified Patient
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Categories tags */}
              {clinic.clinic_categories.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4">
                  {clinic.clinic_categories.map((cc) => (
                    <Link
                      key={cc.id}
                      href={`/clinics/${cc.category.slug}`}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 shadow-sm hover:border-teal-200 hover:text-teal-700 hover:shadow-md transition-all duration-300"
                    >
                      {cc.category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ── Right column — sticky CTA + funnel ──────────────────── */}
            <div className="lg:sticky lg:top-6 lg:self-start space-y-6">
              {/* Quick contact card */}
              <div className="rounded-3xl border-0 bg-gradient-to-br from-navy to-navy-950 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-[60px]" />
                
                <div className="relative z-10">
                  <div className="mb-6 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Get Your Free Quote
                    </h3>
                    <p className="text-sm text-teal-100/80 font-medium leading-relaxed">
                      Speak directly with the medical team at {clinic.name}.
                    </p>
                  </div>

                  <a
                    href="#clinic-funnel"
                    className="flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 py-4 text-base font-bold text-white shadow-lg shadow-teal-500/20 transition-all hover:bg-teal-400 hover:-translate-y-0.5 w-full mb-6"
                  >
                    Start Your Journey <ArrowRight className="w-5 h-5" />
                  </a>
                  
                  <div className="space-y-3 border-t border-white/10 pt-6">
                    <div className="flex items-center justify-center gap-2 text-sm text-white/90">
                      <CheckCircle2 className="h-4 w-4 text-teal-400" />
                      <span className="font-medium">No obligation</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-white/90">
                      <CheckCircle2 className="h-4 w-4 text-teal-400" />
                      <span className="font-medium">Direct to clinic</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-white/90">
                      <CheckCircle2 className="h-4 w-4 text-teal-400" />
                      <span className="font-medium">Response within 24h</span>
                    </div>
                  </div>
                </div>
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
              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-slate-400 font-light">
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3 w-3 text-slate-300" />
                  Verified details
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-slate-300" />
                  Secure inquiry
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
