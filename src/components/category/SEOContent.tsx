import { Info } from "lucide-react";
import type { SeoBlock } from "@/lib/categories/config";

interface SEOContentProps {
  blocks: SeoBlock[];
}

export default function SEOContent({ blocks }: SEOContentProps) {
  if (blocks.length === 0) return null;

  return (
    <section
      aria-labelledby="seo-content-heading"
      className="py-16 sm:py-20 bg-slate-50/70"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Medical disclaimer */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 mb-12 flex gap-3">
          <Info className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed">
            This page may feature information relating to various medical
            conditions, treatments, and healthcare services available in
            different countries. Please be advised that the content is provided
            for informational purposes only and should not be construed as
            medical advice or guidance. Please consult with your doctor or a
            qualified medical professional before starting or changing medical
            treatment.
          </p>
        </div>

        <h2 id="seo-content-heading" className="sr-only">
          Treatment guide
        </h2>

        <div className="space-y-10">
          {blocks.map((block) => (
            <article key={block.heading}>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">
                {block.heading}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {block.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
