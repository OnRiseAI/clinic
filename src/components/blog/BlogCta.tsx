"use client";

import type { BlogCtaProps } from "./types";

export default function BlogCta({
  variant = "dark",
  headline,
  subheadline,
  description,
  buttonText,
  buttonHref = "#",
}: BlogCtaProps) {
  if (variant === "dark") {
    return (
      <div className="relative overflow-hidden rounded-[18px] p-[36px_32px] my-[52px] text-center bg-gradient-to-br from-blog-navy to-[#1e3a5f]">
        <div className="absolute -top-[30px] -right-[30px] w-[140px] h-[140px] rounded-full bg-blog-teal/[0.12]" />
        {subheadline && (
          <p className="text-xs font-bold tracking-[0.1em] uppercase text-teal-300 mb-[10px]">
            {subheadline}
          </p>
        )}
        <p className="font-blog-serif text-[clamp(22px,3vw,26px)] font-bold text-white mb-[10px] leading-[1.3]">
          {headline}
        </p>
        <p className="text-[14.5px] text-white/65 max-w-[440px] mx-auto mb-[22px] leading-[1.6]">
          {description}
        </p>
        <a
          href={buttonHref}
          className="inline-flex items-center gap-2 bg-blog-teal text-white py-[14px] px-8 rounded-xl text-[15px] font-semibold no-underline hover:-translate-y-px hover:shadow-lg hover:shadow-blog-teal/25 transition-all"
        >
          {buttonText}{" "}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    );
  }

  // Light variant
  return (
    <div className="rounded-[18px] border border-blog-green-border p-[44px_32px] my-14 text-center bg-gradient-to-br from-blog-green-bg to-emerald-50">
      <p className="font-blog-serif text-[clamp(24px,3.5vw,28px)] font-bold text-blog-navy mb-[10px]">
        {headline}
      </p>
      <p className="text-[15px] text-blog-text-body max-w-[500px] mx-auto mb-6 leading-[1.6]">
        {description}
      </p>
      <div className="flex flex-wrap gap-[10px] justify-center">
        <a
          href={buttonHref}
          className="inline-flex items-center gap-[7px] bg-blog-teal text-white py-[14px] px-7 rounded-xl text-[15px] font-semibold no-underline hover:-translate-y-px hover:shadow-lg hover:shadow-blog-teal/25 transition-all"
        >
          {buttonText}{" "}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
        <a
          href="#"
          className="inline-flex items-center gap-[7px] bg-white text-blog-navy py-[14px] px-7 rounded-xl text-[15px] font-semibold no-underline border border-blog-warm-border hover:-translate-y-px hover:shadow-sm transition-all"
        >
          How It Works
        </a>
      </div>
    </div>
  );
}
