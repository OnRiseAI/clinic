"use client";

import { Calendar, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import type { BlogHeroProps } from "./types";

export default function BlogHero({
  title,
  excerpt,
  category,
  readingTime,
  updatedAt,
  breadcrumbs,
}: BlogHeroProps) {
  const formattedDate = new Date(updatedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 bg-blog-navy border-b border-blog-navy-light">
      <div className="w-full max-w-[780px] mx-auto px-5">

        {/* Breadcrumbs: Technical, Uppercase, Precise */}
        <nav className="flex items-center gap-2 mb-8 flex-wrap">
          {breadcrumbs.map((crumb, i) => (
            <div key={i} className="flex items-center text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase text-white/40">
              <a href={crumb.href || "#"} className="hover:text-white transition-colors duration-300">
                {crumb.label}
              </a>
              {i < breadcrumbs.length - 1 && (
                <ChevronRight className="w-3 h-3 mx-2 text-white/20" />
              )}
            </div>
          ))}
        </nav>

        {/* Title: Serif, Tight Tracking, Dominant */}
        <h1 className="font-blog-serif text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1] font-medium text-white mb-6 tracking-tight text-balance">
          {title}
        </h1>

        {/* Excerpt: Sans-serif, High Readability, Controlled Measure */}
        <p className="font-blog-sans text-lg sm:text-[1.1875rem] text-neutral-300/90 leading-relaxed mb-10 max-w-[680px] text-balance">
          {excerpt}
        </p>

        {/* Meta Data: Grid System, Institutional Feel */}
        <div className="flex flex-wrap items-center gap-y-4 gap-x-8 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3 text-white/70">
            <div className="p-1.5 rounded-sm bg-white/5 ring-1 ring-white/5">
              <Calendar className="w-3.5 h-3.5 text-white/60" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-white/40">Updated</span>
              <span className="text-sm font-medium">{formattedDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-white/70">
            <div className="p-1.5 rounded-sm bg-white/5 ring-1 ring-white/5">
              <Clock className="w-3.5 h-3.5 text-white/60" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-white/40">Read Time</span>
              <span className="text-sm font-medium">{readingTime} min</span>
            </div>
          </div>

          <div className="ml-auto pl-6 border-l border-white/10 hidden sm:block">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-900/40 border border-teal-700/50 text-teal-200 text-xs font-semibold tracking-wide shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              Medically Reviewed
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
