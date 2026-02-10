"use client";

interface OptionCardProps {
  label: string;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function OptionCard({
  label,
  selected,
  onClick,
  disabled,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left rounded-xl border px-4 py-3.5 text-sm font-medium transition-all
        ${
          selected
            ? "border-teal-500 bg-teal-50 text-teal-800 ring-2 ring-teal-500/20"
            : "border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50/50"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer active:scale-[0.98]"}
      `}
    >
      {label}
    </button>
  );
}
