"use client";

import Image from "next/image";
import {
  Star,
  MapPin,
  BadgeCheck,
  ArrowRight,
  Quote,
  Shield,
  Users,
} from "lucide-react";
import type { DentalClinic } from "@/lib/dentistry/data";

interface ClinicCardProps {
  clinic: DentalClinic;
  onContact: (clinic: DentalClinic) => void;
}

export default function ClinicCard({ clinic, onContact }: ClinicCardProps) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all hover:border-teal-200 hover:shadow-lg hover:shadow-teal-500/5">
      <div className="flex flex-col md:flex-row">
        {/* ── Photo column ──────────────────────────────────────────── */}
        <div className="relative md:w-[280px] lg:w-[320px] flex-shrink-0">
          <div className="relative h-52 md:h-full min-h-[220px]">
            <Image
              src={clinic.imageUrl}
              alt={`${clinic.name} clinic interior`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 320px"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/5" />

            {/* Rating badge */}
            <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-lg bg-white/95 backdrop-blur-sm px-2.5 py-1.5 shadow-sm">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-slate-900 tabular-nums">
                {clinic.rating}
              </span>
              <span className="text-xs text-slate-500">
                ({clinic.reviewCount})
              </span>
            </div>

            {/* Verified badge */}
            {clinic.verified && (
              <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-lg bg-teal-600 px-2.5 py-1.5 shadow-sm">
                <BadgeCheck className="h-3.5 w-3.5 text-white" />
                <span className="text-[11px] font-bold text-white uppercase tracking-wide">
                  Verified
                </span>
              </div>
            )}

            {/* Country flag + patients — bottom of image */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5 rounded-lg bg-black/50 backdrop-blur-sm px-2.5 py-1.5">
                <span className="text-sm">{clinic.countryFlag}</span>
                <span className="text-xs font-medium text-white">
                  {clinic.location}
                </span>
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-black/50 backdrop-blur-sm px-2.5 py-1.5">
                <Users className="h-3 w-3 text-teal-400" />
                <span className="text-[11px] font-medium text-white">
                  {clinic.patientsTreated} patients
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Content column ────────────────────────────────────────── */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col">
          {/* Name + accreditations */}
          <div className="mb-3">
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <h3 className="text-lg font-bold text-slate-900 leading-tight">
                <a
                  href={`/clinics/dentistry/${clinic.slug}`}
                  className="hover:text-teal-700 transition-colors"
                >
                  {clinic.name}
                </a>
              </h3>
              <span className="flex-shrink-0 text-xs text-slate-400 tabular-nums">
                Est. {clinic.yearEstablished}
              </span>
            </div>

            {/* Accreditation badges */}
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
          </div>

          {/* Description */}
          <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
            {clinic.description}
          </p>

          {/* Doctor row */}
          <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <Image
              src={clinic.doctor.photoUrl}
              alt={clinic.doctor.name}
              width={44}
              height={44}
              className="rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {clinic.doctor.name}
              </p>
              <p className="text-xs text-slate-500">
                {clinic.doctor.specialty} &middot;{" "}
                {clinic.doctor.yearsExperience} yrs experience
              </p>
            </div>
          </div>

          {/* Review excerpt */}
          <div className="mb-4 pl-3 border-l-2 border-teal-200">
            <div className="flex items-start gap-1.5">
              <Quote className="h-3 w-3 text-teal-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-600 italic leading-relaxed line-clamp-2">
                {clinic.review.excerpt}
              </p>
            </div>
            <p className="text-xs text-slate-400 mt-1 pl-4.5">
              &mdash; {clinic.review.reviewer}, {clinic.review.country}
            </p>
          </div>

          {/* Treatment prices */}
          <div className="space-y-1.5 mb-5">
            {clinic.treatments.map((t) => (
              <div
                key={t.name}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-slate-500">{t.name}</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {t.priceFrom}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs — pushed to bottom */}
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
              href={`/clinics/dentistry/${clinic.slug}`}
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
