"use client";

import { useRef, useEffect, type KeyboardEvent, type ClipboardEvent } from "react";
import { OTP_LENGTH } from "@/lib/lead-funnel/config";

interface OtpInputProps {
  value: string;
  onChange: (code: string) => void;
  disabled?: boolean;
}

export default function OtpInput({ value, onChange, disabled }: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first empty input on mount
  useEffect(() => {
    const firstEmpty = value.length;
    inputsRef.current[Math.min(firstEmpty, OTP_LENGTH - 1)]?.focus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleChange(index: number, char: string) {
    if (!/^\d?$/.test(char)) return;

    const chars = value.split("");
    chars[index] = char;
    const next = chars.join("").slice(0, OTP_LENGTH);
    onChange(next);

    // Auto-advance
    if (char && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
      const chars = value.split("");
      chars[index - 1] = "";
      onChange(chars.join(""));
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text/plain")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    onChange(pasted);
    // Focus last filled position
    const target = Math.min(pasted.length, OTP_LENGTH - 1);
    inputsRef.current[target]?.focus();
  }

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: OTP_LENGTH }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputsRef.current[i] = el; }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={value[i] ?? ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          disabled={disabled}
          className={`h-12 w-11 rounded-lg border text-center text-lg font-bold tabular-nums transition-all
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
            ${value[i] ? "border-teal-400 bg-teal-50 text-teal-800" : "border-slate-300 bg-white text-slate-900"}
            ${disabled ? "opacity-50" : ""}
          `}
        />
      ))}
    </div>
  );
}
