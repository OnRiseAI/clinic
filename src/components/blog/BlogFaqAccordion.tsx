"use client";

import { useState } from "react";
import type { FaqItem } from "./types";

interface BlogFaqAccordionProps {
  faqs: FaqItem[];
}

function FaqRow({ faq }: { faq: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-blog-warm-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-[22px] bg-transparent border-none cursor-pointer text-left gap-4"
      >
        <span className="font-blog-serif text-[17px] font-semibold text-blog-text-primary leading-[1.4]">
          {faq.question}
        </span>
        <span
          className="text-blog-teal flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-400"
        style={{
          maxHeight: open ? "600px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <p className="font-blog-sans text-[15.5px] leading-[1.75] text-blog-text-body pb-[22px]">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function BlogFaqAccordion({ faqs }: BlogFaqAccordionProps) {
  return (
    <div className="my-[22px] bg-white rounded-[14px] border border-blog-warm-border px-[26px] py-[2px]">
      {faqs.map((faq, i) => (
        <FaqRow key={i} faq={faq} />
      ))}
    </div>
  );
}
