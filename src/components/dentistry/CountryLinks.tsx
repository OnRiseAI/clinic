const COUNTRY_LINKS = [
  { name: "Turkey", flag: "\uD83C\uDDF9\uD83C\uDDF7", slug: "turkey" },
  { name: "Mexico", flag: "\uD83C\uDDF2\uD83C\uDDFD", slug: "mexico" },
  { name: "Hungary", flag: "\uD83C\uDDED\uD83C\uDDFA", slug: "hungary" },
  { name: "Thailand", flag: "\uD83C\uDDF9\uD83C\uDDED", slug: "thailand" },
  { name: "Poland", flag: "\uD83C\uDDF5\uD83C\uDDF1", slug: "poland" },
  { name: "Costa Rica", flag: "\uD83C\uDDE8\uD83C\uDDF7", slug: "costa-rica" },
  { name: "Colombia", flag: "\uD83C\uDDE8\uD83C\uDDF4", slug: "colombia" },
  { name: "Croatia", flag: "\uD83C\uDDED\uD83C\uDDF7", slug: "croatia" },
  { name: "Spain", flag: "\uD83C\uDDEA\uD83C\uDDF8", slug: "spain" },
  { name: "India", flag: "\uD83C\uDDEE\uD83C\uDDF3", slug: "india" },
  { name: "Germany", flag: "\uD83C\uDDE9\uD83C\uDDEA", slug: "germany" },
  { name: "Brazil", flag: "\uD83C\uDDE7\uD83C\uDDF7", slug: "brazil" },
  { name: "Czech Republic", flag: "\uD83C\uDDE8\uD83C\uDDFF", slug: "czech-republic" },
  { name: "Romania", flag: "\uD83C\uDDF7\uD83C\uDDF4", slug: "romania" },
  { name: "Portugal", flag: "\uD83C\uDDF5\uD83C\uDDF9", slug: "portugal" },
  { name: "United Arab Emirates", flag: "\uD83C\uDDE6\uD83C\uDDEA", slug: "uae" },
  { name: "South Korea", flag: "\uD83C\uDDF0\uD83C\uDDF7", slug: "south-korea" },
  { name: "Dominican Republic", flag: "\uD83C\uDDE9\uD83C\uDDF4", slug: "dominican-republic" },
  { name: "Egypt", flag: "\uD83C\uDDEA\uD83C\uDDEC", slug: "egypt" },
  { name: "United Kingdom", flag: "\uD83C\uDDEC\uD83C\uDDE7", slug: "united-kingdom" },
  { name: "United States", flag: "\uD83C\uDDFA\uD83C\uDDF8", slug: "united-states" },
  { name: "Italy", flag: "\uD83C\uDDEE\uD83C\uDDF9", slug: "italy" },
  { name: "Greece", flag: "\uD83C\uDDEC\uD83C\uDDF7", slug: "greece" },
];

const SPECIALTIES = [
  { name: "Dental Implants", slug: "dental-implants" },
  { name: "Porcelain Veneers", slug: "porcelain-veneers" },
  { name: "All-on-4", slug: "all-on-4" },
  { name: "Dental Crowns", slug: "dental-crowns" },
  { name: "Teeth Whitening", slug: "teeth-whitening" },
  { name: "Root Canal", slug: "root-canal" },
  { name: "Orthodontics", slug: "orthodontics" },
  { name: "Hollywood Smile", slug: "hollywood-smile" },
  { name: "Dental Bridges", slug: "dental-bridges" },
  { name: "Invisalign", slug: "invisalign" },
  { name: "Cosmetic Dentistry", slug: "cosmetic-dentistry" },
  { name: "Full Mouth Restoration", slug: "full-mouth-restoration" },
];

export default function CountryLinks() {
  return (
    <section
      aria-labelledby="country-links-heading"
      className="py-12 sm:py-16 bg-white border-t border-slate-100"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Countries */}
        <h2
          id="country-links-heading"
          className="text-lg font-bold text-slate-900 mb-6"
        >
          Countries for dental treatment
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-2.5 mb-12">
          {COUNTRY_LINKS.map((c) => (
            <a
              key={c.slug}
              href={`/clinics/dentistry/${c.slug}`}
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-700 transition-colors py-1"
            >
              <span className="text-base">{c.flag}</span>
              <span>Dental Treatment in {c.name}</span>
            </a>
          ))}
        </div>

        {/* Specialties */}
        <h3 className="text-lg font-bold text-slate-900 mb-6">
          All dental specialties
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-2.5">
          {SPECIALTIES.map((s) => (
            <a
              key={s.slug}
              href={`/treatments/${s.slug}`}
              className="text-sm text-slate-600 hover:text-teal-700 transition-colors py-1"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
