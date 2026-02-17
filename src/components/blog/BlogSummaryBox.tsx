"use client";

import type { ReactNode } from "react";

interface BlogSummaryBoxProps {
  children: ReactNode;
}

export default function BlogSummaryBox({ children }: BlogSummaryBoxProps) {
  return (
    <div className="bg-gradient-to-br from-blog-green-bg to-emerald-50 rounded-[14px] border border-blog-green-border p-[26px] mb-10 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-blog-teal">
          Quick Summary
        </p>
      </div>
      <div className="text-[15px] leading-[1.75] text-blog-text-primary font-medium [&>p]:mb-3 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
