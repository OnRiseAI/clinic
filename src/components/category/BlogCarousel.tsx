"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const ARTICLES = [
  {
    title: "Dental Implants in Turkey: The Complete 2026 Guide",
    slug: "dental-implants-turkey-2026-guide",
    imageUrl:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=240&fit=crop&auto=format",
    author: "Meet Your Clinic",
  },
  {
    title: "Veneers in Turkey: The Complete 2026 Guide",
    slug: "veneers-turkey-2026-guide",
    imageUrl:
      "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=400&h=240&fit=crop&auto=format",
    author: "Meet Your Clinic",
  },
  {
    title: "Hair Transplant in Turkey: The Complete 2026 Guide",
    slug: "hair-transplant-turkey-2026-guide",
    imageUrl:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=240&fit=crop&auto=format",
    author: "Meet Your Clinic",
  },
  {
    title: "Medical Tourism in 2026: Where People Are Going",
    slug: "medical-tourism-costa-del-sol-2026",
    imageUrl:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=240&fit=crop&auto=format",
    author: "Meet Your Clinic",
  },
  {
    title: "Guide to Dental Implants in Turkey 2026",
    slug: "complete-guide-to-dental-implants-in-turkey-2026",
    imageUrl:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=240&fit=crop&auto=format",
    author: "Meet Your Clinic",
  },
];

export default function BlogCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 280 + 20; // card width + gap
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  }, []);

  return (
    <section
      aria-labelledby="blog-heading"
      className="py-16 sm:py-20 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2
              id="blog-heading"
              className="font-serif text-2xl sm:text-3xl text-slate-900 tracking-tight mb-1"
            >
              Related articles
            </h2>
            <p className="text-sm text-slate-500">
              Expert guides to help you plan your dental journey
            </p>
          </div>
          <a
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-500 active:scale-[0.98] flex-shrink-0"
          >
            View more
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto scroll-smooth pb-4 -mb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {ARTICLES.map((article) => (
              <a
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex-shrink-0 w-[260px] sm:w-[280px] snap-start"
              >
                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5">
                  {/* Image */}
                  <div className="relative h-[160px] sm:h-[170px] overflow-hidden">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="280px"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2 mb-3 group-hover:text-teal-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Written by {article.author}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 hidden sm:flex items-center justify-center h-10 w-10 rounded-full bg-white border border-slate-200 shadow-md text-slate-600 transition-all hover:border-slate-300 hover:shadow-lg hover:text-slate-900 z-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 hidden sm:flex items-center justify-center h-10 w-10 rounded-full bg-white border border-slate-200 shadow-md text-slate-600 transition-all hover:border-slate-300 hover:shadow-lg hover:text-slate-900 z-10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous"
            className="sm:hidden flex items-center justify-center h-8 w-8 rounded-full border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-slate-400 transition-all duration-150"
              style={{
                width: `${Math.max(20, 20 + scrollProgress * 80)}%`,
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next"
            className="sm:hidden flex items-center justify-center h-8 w-8 rounded-full border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile "View more" */}
        <div className="mt-6 sm:hidden text-center">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-500 active:scale-[0.98]"
          >
            View more articles
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
