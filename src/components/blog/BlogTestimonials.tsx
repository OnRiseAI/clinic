"use client";

import type { Testimonial } from "./types";

interface BlogTestimonialsProps {
  testimonials: Testimonial[];
}

export default function BlogTestimonials({ testimonials }: BlogTestimonialsProps) {
  return (
    <div className="flex flex-col gap-[14px] my-[22px]">
      {testimonials.map((t, i) => (
        <div
          key={i}
          className="bg-white rounded-[14px] border border-blog-warm-border p-[26px] border-l-4 border-l-blog-teal"
        >
          {/* Stars */}
          <div className="flex gap-[3px] mb-3">
            {Array.from({ length: t.rating || 5 }).map((_, j) => (
              <span key={j} className="text-amber-400">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </span>
            ))}
          </div>

          {/* Quote */}
          <p className="text-[15.5px] leading-[1.7] text-blog-text-body italic mb-4">
            &ldquo;{t.text}&rdquo;
          </p>

          {/* Attribution */}
          <div className="flex items-center justify-between flex-wrap gap-[10px]">
            <div className="flex items-center gap-[11px]">
              <div
                className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-[15px] font-bold"
                style={{
                  background: `hsl(${i * 80 + 160}, 35%, 90%)`,
                  color: `hsl(${i * 80 + 160}, 35%, 35%)`,
                }}
              >
                {t.name[0]}
              </div>
              <div>
                <div className="text-[13.5px] font-semibold text-blog-text-primary">
                  {t.name}
                </div>
                <div className="text-xs text-blog-text-muted">{t.city}</div>
              </div>
            </div>
            <span className="text-[11.5px] font-semibold text-blog-teal-dark bg-blog-green-bg px-[11px] py-[3px] rounded-[7px]">
              {t.treatment} · {t.year}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
