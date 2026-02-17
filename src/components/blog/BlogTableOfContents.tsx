"use client";

import { useState, useEffect } from "react";
import type { TocItem } from "./types";

interface BlogTableOfContentsProps {
  items: TocItem[];
}

export default function BlogTableOfContents({ items }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState("");
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      for (let i = items.length - 1; i >= 0; i--) {
        const el = document.getElementById(items[i].id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveId(items[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[220px] flex-shrink-0 sticky top-[90px] self-start max-h-[calc(100vh-110px)] overflow-y-auto pr-2">
        <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-blog-teal mb-[14px]">
          Contents
        </p>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="block text-[12.5px] leading-[1.45] no-underline transition-all duration-200"
            style={{
              padding: `6px 0 6px ${item.level === 3 ? 28 : 14}px`,
              fontWeight: activeId === item.id ? 600 : 400,
              color: activeId === item.id ? "#0d9488" : "#8a857f",
              borderLeft: `2px solid ${activeId === item.id ? "#0d9488" : "transparent"}`,
            }}
          >
            {item.label}
          </a>
        ))}

        {/* Sidebar CTA card */}
        <div className="mt-8 p-[18px] bg-gradient-to-br from-blog-green-bg to-emerald-50 rounded-xl border border-blog-green-border shadow-sm">
          <p className="text-[12.5px] font-semibold text-blog-teal-dark mb-[6px]">
            Save up to 75%
          </p>
          <p className="text-xs text-blog-text-body leading-[1.5] mb-[10px]">
            Compare verified clinics
          </p>
          <a
            href="#"
            className="block text-center bg-blog-teal text-white py-[9px] rounded-lg text-[13px] font-semibold no-underline hover:-translate-y-px hover:shadow-md hover:shadow-blog-teal/25 transition-all"
          >
            Get Quotes
          </a>
        </div>
      </aside>

      {/* Mobile TOC button */}
      <button
        onClick={() => setTocOpen(true)}
        className="lg:hidden fixed bottom-20 left-4 z-[990] w-11 h-11 rounded-xl bg-white border border-blog-warm-border shadow-md flex items-center justify-center text-blog-teal transition-opacity"
        aria-label="Table of Contents"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <circle cx="4" cy="6" r="1" fill="currentColor" />
          <circle cx="4" cy="12" r="1" fill="currentColor" />
          <circle cx="4" cy="18" r="1" fill="currentColor" />
        </svg>
      </button>

      {/* Mobile TOC drawer */}
      {tocOpen && (
        <>
          <div
            onClick={() => setTocOpen(false)}
            className="fixed inset-0 bg-blog-navy/35 backdrop-blur-sm z-[998]"
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[18px] z-[999] p-[22px] pb-9 shadow-xl max-h-[70vh] overflow-y-auto">
            <div className="w-9 h-[3.5px] rounded-sm bg-blog-warm-border mx-auto mb-[18px]" />
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-blog-teal mb-[14px]">
              Contents
            </p>
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setTocOpen(false)}
                className="block rounded-lg mb-[3px] no-underline transition-all"
                style={{
                  padding: `10px ${item.level === 3 ? 28 : 14}px`,
                  fontSize: "14.5px",
                  fontWeight: activeId === item.id ? 600 : 400,
                  color: activeId === item.id ? "#0d9488" : "#3d3832",
                  background: activeId === item.id ? "#f0fdfa" : "transparent",
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
}
