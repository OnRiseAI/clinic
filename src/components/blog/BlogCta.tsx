"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { BlogCtaProps } from "./types";

export default function BlogCta({
  variant = "dark",
  headline,
  subheadline,
  description,
  buttonText,
  buttonHref = "#",
}: BlogCtaProps) {

  // Dark Variant - "Premium Service Card"
  if (variant === "dark") {
    return (
      <div className="relative my-section-sm rounded-md overflow-hidden bg-blog-navy text-white shadow-elevation-low isolation-auto">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[image:var(--bg-noise)] opacity-20 pointer-events-none mix-blend-overlay" />

        <div className="relative z-10 p-card-p lg:p-card-p-lg flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-1">
            {subheadline && (
              <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-blog-teal-light mb-4">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {subheadline}
              </div>
            )}
            <h3 className="font-blog-serif text-2xl md:text-3xl font-medium mb-3 tracking-tight text-white">
              {headline}
            </h3>
            <p className="text-neutral-400 leading-relaxed max-w-lg text-sm md:text-base">
              {description}
            </p>
          </div>

          <div className="flex-shrink-0">
            <a
              href={buttonHref}
              className="inline-flex items-center justify-center gap-2 bg-blog-teal hover:bg-blog-teal-light text-white px-6 py-3.5 rounded-sm text-sm font-semibold transition-all hover:translate-y-px shadow-card hover:shadow-elevation-low w-full md:w-auto min-w-[160px]"
            >
              {buttonText}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Light Variant - "Next Steps Panel"
  return (
    <div className="my-section-md p-card-p lg:p-card-p-lg rounded-md bg-white border border-neutral-200 text-center shadow-subtle">
      <h3 className="font-blog-serif text-2xl md:text-3xl text-blog-navy font-medium mb-4 tracking-tight">
        {headline}
      </h3>
      <p className="text-neutral-500 leading-relaxed max-w-[540px] mx-auto mb-8 text-sm md:text-base">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href={buttonHref}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blog-navy hover:bg-blog-navy-light text-white px-8 py-3.5 rounded-sm text-sm font-semibold transition-all shadow-subtle hover:shadow-card min-w-[180px]"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
