"use client";

interface BlogChecklistProps {
  items: string[];
  columns?: 1 | 2;
}

export default function BlogChecklist({ items, columns = 2 }: BlogChecklistProps) {
  return (
    <div
      className="grid gap-[10px] my-[22px]"
      style={{
        gridTemplateColumns:
          columns === 2
            ? "repeat(auto-fit, minmax(190px, 1fr))"
            : "1fr",
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="flex gap-[9px] items-start p-[12px_14px] bg-white rounded-[10px] border border-blog-warm-border"
        >
          <span className="text-blog-teal mt-[1px] flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </span>
          <span className="text-[13.5px] text-blog-text-primary font-medium leading-[1.4]">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}
