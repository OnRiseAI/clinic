import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
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
import { DENTAL_CLINICS } from "@/lib/dentistry/data";
import { LeadFunnel } from "@/components/lead-funnel";

// ─── Static Params ───────────────────────────────────────────────────────────

export function generateStaticParams() {
  return DENTAL_CLINICS.map((c) => ({ slug: c.slug }));
}

// ─── Metadata ────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://medit.com";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const clinic = DENTAL_CLINICS.find((c) => c.slug === slug);
  if (!clinic) return {};

  return {
    title: `${clinic.name} — ${clinic.location} | Verified Dental Clinic | medit`,
    description: clinic.description,
    openGraph: {
      title: `${clinic.name} — ${clinic.location}`,
      description: clinic.description,
      type: "website",
      images: [{ url: clinic.imageUrl }],
    },
    alternates: {
      canonical: `${SITE_URL}/clinics/dentistry/${clinic.slug}`,
    },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ClinicDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const clinic = DENTAL_CLINICS.find((c) => c.slug === slug);
  if (!clinic) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: clinic.name,
    image: clinic.imageUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: clinic.location,
      addressCountry: clinic.country,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: clinic.rating,
      reviewCount: clinic.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
                href="/clinics/dentistry"
                className="hover:text-teal-600 transition-colors"
              >
                Dental Clinics
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
        {/* Clinic photo — full-bleed */}
        <div className="relative h-[260px] sm:h-[340px] lg:h-[400px] overflow-hidden">
          <Image
            src={clinic.imageUrl}
            alt={`${clinic.name} clinic`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Floating info on image */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {clinic.verified && (
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
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {clinic.countryFlag} {clinic.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <strong className="text-white">{clinic.rating}</strong> (
                  {clinic.reviewCount} reviews)
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Est. {clinic.yearEstablished}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {clinic.patientsTreated} patients
                </span>
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
                  {clinic.description}
                </p>
              </div>

              {/* Lead Doctor */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="text-lg font-bold text-slate-900 mb-5">
                  Lead doctor
                </h2>
                <div className="flex items-start gap-5">
                  <div className="relative flex-shrink-0">
                    <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-xl overflow-hidden">
                      <Image
                        src={clinic.doctor.photoUrl}
                        alt={clinic.doctor.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                    {clinic.verified && (
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
                      {clinic.doctor.name}
                    </h3>
                    <p className="text-sm text-teal-600 font-medium mb-2">
                      {clinic.doctor.specialty}
                    </p>
                    <div className="flex items-center gap-1.5 mb-3">
                      <Award className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-500">
                        {clinic.doctor.yearsExperience} years of experience
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {clinic.name}, {clinic.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Treatment Pricing */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="text-lg font-bold text-slate-900 mb-5">
                  Treatment prices
                </h2>
                <div className="divide-y divide-slate-100">
                  {clinic.treatments.map((t) => (
                    <div
                      key={t.name}
                      className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                    >
                      <span className="text-sm text-slate-700">{t.name}</span>
                      <span className="text-sm font-bold text-slate-900 tabular-nums">
                        {t.priceFrom}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-4">
                  Prices are approximate. Contact the clinic for an exact
                  quote.
                </p>
              </div>

              {/* Patient Review */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="text-lg font-bold text-slate-900 mb-5">
                  Patient review
                </h2>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < clinic.review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <div className="pl-4 border-l-2 border-teal-200 mb-4">
                  <Quote className="h-4 w-4 text-teal-400 mb-2" />
                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    {clinic.review.excerpt}
                  </p>
                </div>
                <p className="text-sm text-slate-500">
                  &mdash; {clinic.review.reviewer},{" "}
                  {clinic.review.country}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {clinic.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
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
                  pageContext={`${clinic.name} — ${clinic.location}`}
                  clinicContactConfig={clinic.contactConfig}
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
            href="/clinics/dentistry"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
          >
            &larr; Back to all dental clinics
          </Link>
        </div>
      </div>
    </>
  );
}
