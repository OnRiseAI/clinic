"use client";

interface TrustBadge {
  label: string;
  sublabel: string;
}

interface BlogTrustStripProps {
  badges?: TrustBadge[];
}

const defaultBadges: TrustBadge[] = [
  { label: "JCI Accredited", sublabel: "Clinics" },
  { label: "12,000+", sublabel: "UK Patients" },
  { label: "Ministry of Health", sublabel: "Authorised" },
  { label: "5–10 Year", sublabel: "Guarantees" },
  { label: "4.8★", sublabel: "Avg Rating" },
];

export default function BlogTrustStrip({ badges = defaultBadges }: BlogTrustStripProps) {
  return (
    <div className="bg-white border-b border-blog-warm-border py-[16px] px-5 shadow-sm">
      <div className="max-w-[880px] mx-auto flex flex-wrap justify-center gap-x-8 gap-y-4 items-center">
        {badges.map((badge, i) => (
          <div key={i} className="flex items-center gap-[6px]">
            <div className="w-[5px] h-[5px] rounded-full bg-blog-teal flex-shrink-0" />
            <div className="text-center">
              <span className="text-[13px] font-bold text-blog-navy">{badge.label}</span>
              <span className="text-[11px] text-blog-text-muted font-medium ml-1">
                {badge.sublabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
