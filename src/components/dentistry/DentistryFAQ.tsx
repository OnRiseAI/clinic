"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import type { DentistryFaqItem } from "@/lib/dentistry/data";

interface DentistryFAQProps {
  faqs: DentistryFaqItem[];
}

export default function DentistryFAQ({ faqs }: DentistryFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="faq-heading"
      className="py-16 sm:py-24 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16">
          {/* Left column — header + CTA */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm font-semibold text-teal-600 mb-3 uppercase tracking-wider">
              Got questions?
            </p>
            <h2
              id="faq-heading"
              className="font-serif text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4"
            >
              Frequently asked questions
            </h2>
            <p className="text-base text-slate-500 leading-relaxed mb-8">
              Everything you need to know about getting dental treatment abroad.
              Can&rsquo;t find the answer you&rsquo;re looking for? Contact us
              directly.
            </p>
            <a
              href="#lead-funnel-section"
              className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
            >
              Ask a question
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Right column — accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? "border-teal-200 bg-teal-50/40 shadow-sm shadow-teal-500/5"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 p-5 sm:p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <div
                      className={`flex-shrink-0 h-9 w-9 rounded-xl flex items-center justify-center transition-colors ${
                        isOpen
                          ? "bg-teal-100 text-teal-600"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <HelpCircle className="h-4.5 w-4.5" />
                    </div>
                    <span
                      className={`flex-1 text-[15px] font-semibold transition-colors ${
                        isOpen ? "text-teal-900" : "text-slate-900"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 transition-all duration-200 ${
                        isOpen
                          ? "rotate-180 text-teal-500"
                          : "text-slate-300"
                      }`}
                    />
                  </button>
                  <div
                    className="grid transition-all duration-200"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[4.25rem] text-sm text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
