"use client";

import { Stethoscope } from "lucide-react";

interface EntryQuestionProps {
  pageContext: string;
  onYes: () => void;
  onNo: () => void;
  disabled?: boolean;
}

export default function EntryQuestion({
  pageContext,
  onYes,
  onNo,
  disabled,
}: EntryQuestionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 border border-teal-100">
          <Stethoscope className="h-6 w-6 text-teal-600" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          Are you actively looking for{" "}
          <span className="text-teal-700">{pageContext}</span> treatment?
        </h3>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onYes}
          disabled={disabled}
          className="flex-1 rounded-xl border-2 border-teal-500 bg-teal-50 px-5 py-3.5 text-sm font-semibold text-teal-800 transition-all hover:bg-teal-100 active:scale-[0.98] disabled:opacity-50"
        >
          Yes, I am
        </button>
        <button
          type="button"
          onClick={onNo}
          disabled={disabled}
          className="flex-1 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] disabled:opacity-50"
        >
          Not exactly
        </button>
      </div>
    </div>
  );
}
