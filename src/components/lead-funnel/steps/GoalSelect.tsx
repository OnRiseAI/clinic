"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { GOAL_OPTIONS, EXTRA_DETAILS_MAX_LENGTH } from "@/lib/lead-funnel/config";
import type { GoalTemplate } from "@/lib/lead-funnel/types";
import OptionCard from "../ui/OptionCard";

interface GoalSelectProps {
  onSubmit: (goal: GoalTemplate, details: string) => void;
  disabled?: boolean;
}

export default function GoalSelect({ onSubmit, disabled }: GoalSelectProps) {
  const [selected, setSelected] = useState<GoalTemplate | null>(null);
  const [details, setDetails] = useState("");

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h3 className="text-lg font-bold text-slate-900">
          What best describes what you&rsquo;re looking for?
        </h3>
      </div>

      <div className="space-y-2">
        {GOAL_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            selected={selected === opt.value}
            onClick={() => setSelected(opt.value)}
            disabled={disabled}
          />
        ))}
      </div>

      {selected && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div>
            <label
              htmlFor="extra-details"
              className="block text-sm font-medium text-slate-600 mb-1.5"
            >
              Anything specific you&rsquo;d like us to know?{" "}
              <span className="text-slate-400">(optional)</span>
            </label>
            <input
              id="extra-details"
              type="text"
              value={details}
              onChange={(e) =>
                setDetails(e.target.value.slice(0, EXTRA_DETAILS_MAX_LENGTH))
              }
              disabled={disabled}
              maxLength={EXTRA_DETAILS_MAX_LENGTH}
              placeholder="e.g. I need 4 implants, my dentist quoted $12k..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow"
            />
            <p className="mt-1 text-right text-xs text-slate-400 tabular-nums">
              {details.length}/{EXTRA_DETAILS_MAX_LENGTH}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSubmit(selected, details)}
            disabled={disabled}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-teal-700 active:scale-[0.98] disabled:opacity-50"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
