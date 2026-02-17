"use client";

import { useState, useEffect } from "react";
import { TableProperties, X } from "lucide-react";
import type { TocItem } from "./types";

interface BlogTableOfContentsProps {
  items: TocItem[];
}

export default function BlogTableOfContents({ items }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      {/* Desktop Panel - Sticky & Structural */}
      <aside className="hidden lg:block w-[240px] flex-shrink-0 sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-4 scrollbar-hide">
        <div className="mb-6 flex items-center gap-2 text-neutral-400 font-bold uppercase tracking-widest text-[10px]">
          <TableProperties className="w-3 h-3" />
          <span>On this page</span>
        </div>

        <div className="relative border-l border-neutral-200 ml-1.5">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`group flex items-start py-2 pl-4 text-xs lg:text-sm leading-relaxed transition-all duration-300 border-l-2 -ml-[1px] ${activeId === item.id
                  ? "border-blog-teal text-blog-navy font-semibold"
                  : "border-transparent text-neutral-500 hover:text-blog-navy hover:border-neutral-300"
                }`}
              style={{ paddingLeft: item.level === 3 ? "1.5rem" : "1rem" }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </aside>

      {/* Mobile Toggle - Floating Pill */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-blog-navy text-white px-4 py-3 rounded-full shadow-elevation-high active:scale-95 transition-transform"
      >
        <TableProperties className="w-4 h-4" />
        <span className="text-xs font-bold tracking-wide">Contents</span>
      </button>

      {/* Mobile Drawer - Modal Style */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />

          <div className="relative w-full max-w-sm bg-white rounded-lg shadow-elevation-high overflow-hidden animate-in slide-in-from-bottom-8 fade-in duration-300">
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
              <span className="font-blog-serif font-bold text-lg text-blog-navy">Table of Contents</span>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-md hover:bg-neutral-100">
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <div className="p-2 max-h-[60vh] overflow-y-auto">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-md text-sm transition-colors ${activeId === item.id
                      ? "bg-blog-teal/5 text-blog-teal font-semibold"
                      : "text-neutral-600 hover:bg-neutral-50"
                    }`}
                  style={{ paddingLeft: item.level === 3 ? "2rem" : "1rem" }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
