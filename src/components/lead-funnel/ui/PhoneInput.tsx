"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { COUNTRY_CODES } from "@/lib/lead-funnel/config";

interface PhoneInputProps {
  value: string;
  onChange: (fullNumber: string) => void;
  defaultCountry?: string;
  disabled?: boolean;
}

export default function PhoneInput({
  value,
  onChange,
  defaultCountry = "US",
  disabled,
}: PhoneInputProps) {
  const [selectedCode, setSelectedCode] = useState(() => {
    const match = COUNTRY_CODES.find((c) => c.code === defaultCountry);
    return match ?? COUNTRY_CODES[0];
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [localNumber, setLocalNumber] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync default country when it changes (geo detection)
  useEffect(() => {
    const match = COUNTRY_CODES.find((c) => c.code === defaultCountry);
    if (match) setSelectedCode(match);
  }, [defaultCountry]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleNumberChange(raw: string) {
    // Strip non-digit chars except leading +
    const digits = raw.replace(/[^\d]/g, "");
    setLocalNumber(digits);
    onChange(`${selectedCode.dial}${digits}`);
  }

  function handleCountrySelect(country: (typeof COUNTRY_CODES)[number]) {
    setSelectedCode(country);
    setDropdownOpen(false);
    onChange(`${country.dial}${localNumber}`);
    inputRef.current?.focus();
  }

  // Keep value prop in sync (if external reset)
  useEffect(() => {
    if (!value) setLocalNumber("");
  }, [value]);

  return (
    <div ref={wrapperRef} className="relative flex">
      {/* Country selector */}
      <button
        type="button"
        onClick={() => !disabled && setDropdownOpen(!dropdownOpen)}
        disabled={disabled}
        className="flex items-center gap-1 rounded-l-xl border border-r-0 border-slate-300 bg-slate-50 px-3 py-3.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors flex-shrink-0"
      >
        <span className="text-base leading-none">{selectedCode.flag}</span>
        <span className="tabular-nums">{selectedCode.dial}</span>
        <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
      </button>

      {/* Phone number input */}
      <input
        ref={inputRef}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={localNumber}
        onChange={(e) => handleNumberChange(e.target.value)}
        disabled={disabled}
        placeholder="Phone number"
        className="flex-1 min-w-0 rounded-r-xl border border-slate-300 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow tabular-nums"
      />

      {/* Dropdown */}
      {dropdownOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 max-h-60 w-72 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg">
          {COUNTRY_CODES.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => handleCountrySelect(country)}
              className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm hover:bg-teal-50 transition-colors
                ${country.code === selectedCode.code ? "bg-teal-50 font-medium text-teal-800" : "text-slate-700"}`}
            >
              <span className="text-base leading-none">{country.flag}</span>
              <span className="flex-1 text-left">{country.name}</span>
              <span className="tabular-nums text-slate-400">{country.dial}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
