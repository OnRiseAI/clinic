"use client";

import type { TimelineStep } from "./types";

interface BlogTimelineProps {
  steps: TimelineStep[];
}

const icons: Record<string, React.ReactNode> = {
  plane: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>,
  tooth: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C9.5 2 7 3.5 6 5.5 4.5 8 5 11 5.5 13c.5 2 1 4 1.5 5.5.5 1.5 1 3 2 3.5s2-.5 2.5-2l.5-2 .5 2c.5 1.5 1.5 2.5 2.5 2s1.5-2 2-3.5c.5-1.5 1-3.5 1.5-5.5.5-2 1-5-.5-7.5C17 3.5 14.5 2 12 2z"/></svg>,
  lab: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 3h6v6l4 8H5l4-8V3z"/><line x1="8" y1="3" x2="16" y2="3"/></svg>,
  smile: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg>,
  check: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
};

export default function BlogTimeline({ steps }: BlogTimelineProps) {
  return (
    <div className="my-7 relative">
      {/* Connecting line */}
      <div
        className="absolute left-[23px] top-6 bottom-6 w-[2px]"
        style={{ background: "linear-gradient(180deg, #0d9488, #ccfbf1)" }}
      />

      {steps.map((step, i) => (
        <div key={i} className="flex gap-5 mb-[18px] relative">
          {/* Icon node */}
          <div className="w-[46px] h-[46px] rounded-[13px] flex-shrink-0 bg-white border-2 border-blog-teal flex items-center justify-center z-[1] text-blog-teal">
            {icons[step.icon || "check"]}
          </div>

          {/* Content card */}
          <div className="flex-1 bg-white rounded-[13px] border border-blog-warm-border p-[18px_22px]">
            <div className="flex items-center gap-[9px] mb-[7px] flex-wrap">
              <span className="text-[11px] font-bold text-blog-teal bg-blog-green-bg px-[9px] py-[2px] rounded-[5px]">
                {step.day}
              </span>
              <span className="text-base font-bold text-blog-text-primary font-blog-serif">
                {step.title}
              </span>
            </div>
            <p className="text-[14.5px] text-blog-text-body leading-[1.6] m-0">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
