"use client";

import type { WarningBoxProps } from "./types";

export default function BlogWarningBox({
  variant = "amber",
  title,
  children,
}: WarningBoxProps) {
  const styles = {
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      titleColor: "text-amber-800",
      textColor: "text-amber-900",
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-200",
      titleColor: "text-red-800",
      textColor: "text-red-900",
    },
  };

  const s = styles[variant];

  return (
    <div
      className={`${s.bg} border ${s.border} rounded-[13px] p-[22px_24px] my-[18px]`}
    >
      <p className={`text-sm font-bold ${s.titleColor} mb-[7px]`}>{title}</p>
      <div className={`text-[14.5px] ${s.textColor} leading-[1.7] [&>p]:m-0`}>
        {children}
      </div>
    </div>
  );
}
