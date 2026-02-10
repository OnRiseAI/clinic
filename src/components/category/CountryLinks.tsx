import type { CountryLink, RelatedTreatment } from "@/lib/categories/config";

interface CountryLinksProps {
  countries: CountryLink[];
  procedures: RelatedTreatment[];
  categorySlug: string;
  categoryName: string;
}

export default function CountryLinks({ countries, procedures, categorySlug, categoryName }: CountryLinksProps) {
  if (countries.length === 0 && procedures.length === 0) return null;

  return (
    <section
      aria-labelledby="country-links-heading"
      className="py-12 sm:py-16 bg-white border-t border-slate-100"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Countries */}
        {countries.length > 0 && (
          <>
            <h2
              id="country-links-heading"
              className="text-lg font-bold text-slate-900 mb-6"
            >
              Countries for {categoryName.toLowerCase()} treatment
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-2.5 mb-12">
              {countries.map((c) => (
                <a
                  key={c.slug}
                  href={`/clinics/${categorySlug}/${c.slug}`}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-700 transition-colors py-1"
                >
                  <span className="text-base">{c.flag}</span>
                  <span>{categoryName} Treatment in {c.name}</span>
                </a>
              ))}
            </div>
          </>
        )}

        {/* Specialties */}
        {procedures.length > 0 && (
          <>
            <h3 className="text-lg font-bold text-slate-900 mb-6">
              All {categoryName.toLowerCase()} specialties
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-2.5">
              {procedures.map((s) => (
                <a
                  key={s.slug}
                  href={`/treatments/${s.slug}`}
                  className="text-sm text-slate-600 hover:text-teal-700 transition-colors py-1"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
