"use client";

import { TIMEFRAME_OPTIONS } from "@/lib/lead-funnel/config";
import type { Timeframe } from "@/lib/lead-funnel/types";
import OptionCard from "../ui/OptionCard";

interface TimeHorizonProps {
  pageContext: string;
  onSelect: (t: Timeframe) => void;
  disabled?: boolean;
}

export default function TimeHorizon({
  pageContext,
  onSelect,
  disabled,
}: TimeHorizonProps) {
  return (
    <div className="space-y-5">
      <div className="text-center">
        <h3 className="text-lg font-bold text-slate-900">
          When are you hoping to move forward?
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          This helps us prioritize your {pageContext} enquiry.
        </p>
      </div>

      <div className="space-y-2">
        {TIMEFRAME_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            onClick={() => onSelect(opt.value)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
