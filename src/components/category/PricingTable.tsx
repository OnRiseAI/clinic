import { ArrowRight } from "lucide-react";
import type { PricingRow } from "@/lib/data/category-page";

interface PricingTableProps {
  procedures: PricingRow[];
  categoryName: string;
}

export default function PricingTable({ procedures, categoryName }: PricingTableProps) {
  if (procedures.length === 0) return null;

  // Get all unique countries across all procedures
  const allCountries = new Map<string, string>();
  for (const proc of procedures) {
    for (const p of proc.prices) {
      if (!allCountries.has(p.country)) {
        allCountries.set(p.country, p.flag);
      }
    }
  }
  const countries = Array.from(allCountries.entries()).slice(0, 4).map(([name, flag]) => ({ name, flag }));

  return (
    <section
      aria-labelledby="pricing-heading"
      className="py-16 sm:py-24 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2
              id="pricing-heading"
              className="font-serif text-2xl sm:text-3xl text-slate-900 tracking-tight mb-2"
            >
              What&rsquo;s the cost of {categoryName.toLowerCase()} treatment procedures?
            </h2>
            <p className="text-sm text-slate-500">
              Prices are approximate and may vary by clinic. Contact a clinic for
              an exact quote.
            </p>
          </div>
          <a
            href="#lead-funnel-section"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-500 active:scale-[0.98] flex-shrink-0"
          >
            Request a price
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left font-semibold px-5 py-4 min-w-[200px]">
                    Treatment
                  </th>
                  {countries.map((c) => (
                    <th
                      key={c.name}
                      className="text-center font-semibold px-4 py-4 min-w-[130px]"
                    >
                      <span className="mr-1.5">{c.flag}</span>
                      {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {procedures.map((t, i) => (
                  <tr
                    key={t.procedureName}
                    className={`border-t border-slate-100 transition-colors hover:bg-slate-50/80 ${
                      i % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                    }`}
                  >
                    <td className="px-5 py-3.5 font-medium text-slate-900">
                      {t.procedureName}
                    </td>
                    {countries.map((c) => {
                      const price = t.prices.find((p) => p.country === c.name);
                      return (
                        <td
                          key={c.name}
                          className="text-center px-4 py-3.5 text-slate-600 tabular-nums"
                        >
                          {price ? `from £${price.priceMin.toLocaleString()}` : '—'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-6 rounded-xl bg-teal-50 border border-teal-100 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-teal-800 font-medium">
            Get the best {categoryName.toLowerCase()} treatment option for your budget
          </p>
          <a
            href="#lead-funnel-section"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-500 active:scale-[0.98]"
          >
            Get free personalized offer
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
