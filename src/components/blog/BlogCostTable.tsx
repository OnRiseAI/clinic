"use client";

import type { CostRow } from "./types";

interface BlogCostTableProps {
  rows: CostRow[];
  savingsHeadline?: string;
  savingsAmount?: string;
  savingsSubtext?: string;
}

export default function BlogCostTable({
  rows,
  savingsHeadline = "Full Smile Makeover Savings",
  savingsAmount,
  savingsSubtext = "saved vs UK prices, including all travel costs",
}: BlogCostTableProps) {
  return (
    <div className="my-6">
      <div className="flex flex-col gap-[10px]">
        {rows.map((row, i) => (
          <div
            key={i}
            className="group grid grid-cols-[1.3fr_1fr_1fr_auto] gap-[14px] items-center px-[22px] py-[18px] rounded-[13px] relative transition-all duration-200 hover:-translate-y-[2px] hover:shadow-md hover:shadow-blog-teal/10"
            style={{
              background: row.popular
                ? "linear-gradient(135deg, #f0fdfa, #ecfdf5)"
                : "white",
              border: row.popular
                ? "2px solid var(--blog-teal, #0d9488)"
                : "1px solid var(--blog-warm-border, #eae6e1)",
            }}
          >
            {row.popular && (
              <span className="absolute -top-[9px] right-[18px] bg-blog-teal text-white text-[10px] font-bold px-[10px] py-[2px] rounded-full tracking-[0.04em]">
                MOST POPULAR
              </span>
            )}
            <div>
              <div className="text-[10px] text-blog-text-muted font-semibold tracking-[0.06em] uppercase mb-[3px]">
                TYPE
              </div>
              <div className="text-[15px] font-bold text-blog-text-primary">
                {row.type}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-blog-text-muted font-semibold tracking-[0.06em] uppercase mb-[3px]">
                UK PRICE
              </div>
              <div className="text-sm text-blog-text-muted line-through">
                {row.ukPrice}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-blog-text-muted font-semibold tracking-[0.06em] uppercase mb-[3px]">
                TURKEY
              </div>
              <div className="text-[15px] font-bold text-blog-teal-dark">
                {row.turkeyPrice}
              </div>
            </div>
            <div
              className="text-white py-[7px] px-[14px] rounded-[9px] text-[15px] font-extrabold text-center min-w-[54px]"
              style={{
                background: "linear-gradient(135deg, #0d9488, #0f766e)",
              }}
            >
              {row.savings}
            </div>
          </div>
        ))}
      </div>

      {/* Savings callout */}
      {savingsAmount && (
        <div className="bg-blog-navy rounded-2xl p-[30px_28px] flex flex-wrap gap-[22px] items-center justify-between mt-7">
          <div>
            <p className="text-xs text-white/50 font-semibold mb-[5px] tracking-[0.06em] uppercase">
              {savingsHeadline}
            </p>
            <p className="text-[clamp(28px,4vw,36px)] font-extrabold font-blog-serif text-white leading-[1.2]">
              {savingsAmount}
            </p>
            <p className="text-sm text-white/60 mt-[5px]">{savingsSubtext}</p>
          </div>
          <a
            href="#"
            className="bg-blog-teal text-white py-[14px] px-[26px] rounded-xl text-sm font-semibold no-underline whitespace-nowrap hover:-translate-y-px hover:shadow-lg hover:shadow-blog-teal/25 transition-all"
          >
            See Clinic Prices →
          </a>
        </div>
      )}
    </div>
  );
}
