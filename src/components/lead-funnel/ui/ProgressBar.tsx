"use client";

interface ProgressBarProps {
  /** Current step 0-4 (5 total steps in the main path) */
  current: number;
  total?: number;
}

export default function ProgressBar({ current, total = 5 }: ProgressBarProps) {
  const pct = Math.min(((current + 1) / total) * 100, 100);

  return (
    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-teal-500 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
