"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, EXTRA_DETAILS_MAX_LENGTH } from "@/lib/lead-funnel/config";
import OptionCard from "../ui/OptionCard";

interface CategorySelectProps {
  onSelect: (category: string, label: string, note: string) => void;
  disabled?: boolean;
}

export default function CategorySelect({ onSelect, disabled }: CategorySelectProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const selectedLabel = CATEGORIES.find((c) => c.value === selected)?.label ?? "";

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h3 className="text-lg font-bold text-slate-900">
          No problem. What are you looking for?
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Select the area that best matches your needs.
        </p>
      </div>

      <div className="space-y-2">
        {CATEGORIES.map((cat) => (
          <OptionCard
            key={cat.value}
            label={cat.label}
            selected={selected === cat.value}
            onClick={() => setSelected(cat.value)}
            disabled={disabled}
          />
        ))}
      </div>

      {selected && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div>
            <label
              htmlFor="category-note"
              className="block text-sm font-medium text-slate-600 mb-1.5"
            >
              Anything specific within this area? <span className="text-slate-400">(optional)</span>
            </label>
            <input
              id="category-note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, EXTRA_DETAILS_MAX_LENGTH))}
              disabled={disabled}
              placeholder="e.g. dental implants, rhinoplasty..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow"
            />
          </div>

          <button
            type="button"
            onClick={() => onSelect(selected, selectedLabel, note)}
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
