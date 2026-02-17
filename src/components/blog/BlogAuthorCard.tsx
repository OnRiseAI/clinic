"use client";

interface BlogAuthorCardProps {
  name?: string;
  subtitle?: string;
  updatedDate?: string;
}

export default function BlogAuthorCard({
  name = "MeetYourClinic Editorial Team",
  subtitle = "Medical Tourism Research",
  updatedDate,
}: BlogAuthorCardProps) {
  const dateStr = updatedDate
    ? new Date(updatedDate).toLocaleDateString("en-GB", {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className="flex items-center gap-[14px] p-[18px_22px] bg-white rounded-[14px] border border-blog-warm-border shadow-sm mb-10">
      <div className="w-11 h-11 rounded-[11px] bg-gradient-to-br from-blog-teal to-blog-teal-dark flex items-center justify-center flex-shrink-0 shadow-md shadow-blog-teal/15">
        <span className="text-white text-[17px] font-bold">M</span>
      </div>
      <div>
        <p className="text-[14.5px] font-semibold text-blog-text-primary m-0">
          {name}
        </p>
        <p className="text-[12.5px] text-blog-text-muted m-0 mt-[2px]">
          {subtitle}
          {dateStr && ` · Updated ${dateStr}`}
        </p>
      </div>
    </div>
  );
}
