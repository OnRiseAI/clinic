"use client";

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
    month: "short",
    year: "numeric",
  });

  return (
    <section className="relative min-h-[82vh] flex items-end overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blog-navy via-[#163040] via-[#0f5e56] to-blog-teal bg-[length:400%_400%] animate-blog-hero-grad" />

      {/* Decorative elements */}
      <div className="absolute -top-[15%] -right-[8%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-blog-teal/10 blur-[80px]" />
      <div className="absolute -bottom-[20%] -left-[12%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] rounded-full bg-white/[0.03] blur-[50px]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute right-[8%] top-[18%] opacity-5 text-[220px] font-black text-white leading-none pointer-events-none select-none">
        ✦
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[780px] mx-auto px-5 pb-14">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-5 flex-wrap">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              <a
                href={crumb.href || "#"}
                className="text-white/65 text-[13px] font-medium no-underline hover:text-white/90 transition-colors"
              >
                {crumb.label}
              </a>
              {i < breadcrumbs.length - 1 && (
                <span className="text-white/35 text-xs">/</span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="font-blog-serif text-[clamp(30px,5vw,50px)] font-bold text-white leading-[1.12] mb-[18px] max-w-[680px]">
          {title}
        </h1>

        <p className="text-white/[0.78] text-[clamp(16px,2vw,18px)] leading-[1.6] mb-[26px] max-w-[580px]">
          {excerpt}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-4 items-center mb-[26px]">
          <span className="flex items-center gap-[6px] text-white/65 text-[13px]">
            <CalendarIcon /> {formattedDate}
          </span>
          <span className="flex items-center gap-[6px] text-white/65 text-[13px]">
            <ClockIcon /> {readingTime} min read
          </span>
          <span className="inline-flex items-center gap-[5px] bg-blog-teal/20 border border-blog-teal/35 rounded-full px-[13px] py-[3px] text-teal-300 text-xs font-semibold">
            <ShieldIcon /> Verified Guide
          </span>
        </div>

        <a
          href="#"
          className="inline-flex items-center gap-[9px] bg-blog-teal text-white px-[30px] py-[15px] rounded-xl text-[15px] font-semibold no-underline hover:-translate-y-px hover:shadow-lg hover:shadow-blog-teal/25 transition-all"
        >
          Compare Clinics & Prices <ArrowIcon />
        </a>
      </div>
    </section>
  );
}

// Inline SVG icons
function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" strokeWidth="2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
