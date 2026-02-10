import { ArrowRight } from "lucide-react";

const COUNTRIES = [
  { name: "Turkey", flag: "\uD83C\uDDF9\uD83C\uDDF7" },
  { name: "Mexico", flag: "\uD83C\uDDF2\uD83C\uDDFD" },
  { name: "Hungary", flag: "\uD83C\uDDED\uD83C\uDDFA" },
  { name: "Thailand", flag: "\uD83C\uDDF9\uD83C\uDDED" },
];

const TREATMENTS = [
  {
    name: "Dental Implant (single)",
    prices: ["from $350", "from $280", "from \u20AC450", "from $250"],
  },
  {
    name: "Porcelain Veneer",
    prices: ["from $250", "from $320", "from \u20AC300", "from $200"],
  },
  {
    name: "Zirconia Crown",
    prices: ["from $150", "from $180", "from \u20AC280", "from $120"],
  },
  {
    name: "All-on-4 (per arch)",
    prices: ["from $4,200", "from $4,800", "from \u20AC5,500", "from $3,800"],
  },
  {
    name: "All-on-6 (per arch)",
    prices: ["from $5,500", "from $6,200", "from \u20AC7,000", "from $5,000"],
  },
  {
    name: "Hollywood Smile (20 veneers)",
    prices: ["from $2,800", "from $4,500", "from \u20AC5,000", "from $3,200"],
  },
  {
    name: "Root Canal Treatment",
    prices: ["from $80", "from $180", "from \u20AC150", "from $60"],
  },
  {
    name: "Teeth Whitening",
    prices: ["from $150", "from $200", "from \u20AC250", "from $150"],
  },
  {
    name: "Tooth Extraction",
    prices: ["from $40", "from $50", "from \u20AC60", "from $30"],
  },
  {
    name: "Composite Veneer",
    prices: ["from $100", "from $150", "from \u20AC180", "from $80"],
  },
  {
    name: "Dental Bridge (3-unit)",
    prices: ["from $450", "from $500", "from \u20AC600", "from $350"],
  },
  {
    name: "Invisalign",
    prices: ["from $1,800", "from $2,200", "from \u20AC2,500", "from $1,500"],
  },
];

export default function PricingTable() {
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
              What&rsquo;s the cost of dental treatment procedures?
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
                  {COUNTRIES.map((c) => (
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
                {TREATMENTS.map((t, i) => (
                  <tr
                    key={t.name}
                    className={`border-t border-slate-100 transition-colors hover:bg-slate-50/80 ${
                      i % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                    }`}
                  >
                    <td className="px-5 py-3.5 font-medium text-slate-900">
                      {t.name}
                    </td>
                    {t.prices.map((price, j) => (
                      <td
                        key={j}
                        className="text-center px-4 py-3.5 text-slate-600 tabular-nums"
                      >
                        {price}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-6 rounded-xl bg-teal-50 border border-teal-100 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-teal-800 font-medium">
            Get the best dental treatment option for your budget
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
