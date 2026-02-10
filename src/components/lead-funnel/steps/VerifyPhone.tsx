"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowRight, RotateCw, ShieldCheck } from "lucide-react";
import type { VerifySubState } from "@/lib/lead-funnel/types";
import { OTP_RESEND_COOLDOWN_MS } from "@/lib/lead-funnel/config";
import PhoneInput from "../ui/PhoneInput";
import OtpInput from "../ui/OtpInput";

interface VerifyPhoneProps {
  subState: VerifySubState;
  phone: string;
  defaultCountry: string;
  onPhoneChange: (phone: string) => void;
  onSendCode: () => void;
  onVerifyCode: (code: string) => void;
  onBack: () => void;
  loading: boolean;
  error: string | null;
}

export default function VerifyPhone({
  subState,
  phone,
  defaultCountry,
  onPhoneChange,
  onSendCode,
  onVerifyCode,
  onBack,
  loading,
  error,
}: VerifyPhoneProps) {
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Auto-submit when 6 digits entered
  useEffect(() => {
    if (code.length === 6 && subState === "code_entry" && !loading) {
      onVerifyCode(code);
    }
  }, [code, subState, loading, onVerifyCode]);

  // Resend cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const handleSendCode = useCallback(() => {
    onSendCode();
    setCooldown(Math.ceil(OTP_RESEND_COOLDOWN_MS / 1000));
    setCode("");
  }, [onSendCode]);

  // ── Phone Entry State ──────────────────────────────────────────────────
  if (subState === "phone_entry") {
    return (
      <div className="space-y-5">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 border border-teal-100">
            <ShieldCheck className="h-5 w-5 text-teal-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            What&rsquo;s the best number to reach you on?
          </h3>
          <p className="mt-1.5 text-sm text-slate-500 max-w-xs mx-auto">
            We&rsquo;ll send a one-time code to verify you&rsquo;re a real person. No spam. No robocalls.
          </p>
        </div>

        <PhoneInput
          value={phone}
          onChange={onPhoneChange}
          defaultCountry={defaultCountry}
          disabled={loading}
        />

        {error && (
          <p className="text-sm text-red-600 text-center" role="alert">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleSendCode}
          disabled={loading || phone.replace(/[^\d]/g, "").length < 7}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-teal-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <RotateCw className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Send code
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    );
  }

  // ── Code Entry State ───────────────────────────────────────────────────
  return (
    <div className="space-y-5">
      <div className="text-center">
        <h3 className="text-lg font-bold text-slate-900">
          Enter the code we just sent
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Sent to <span className="font-medium text-slate-700">{phone}</span>
        </p>
      </div>

      <OtpInput value={code} onChange={setCode} disabled={loading} />

      {error && (
        <p className="text-sm text-red-600 text-center" role="alert">
          {error}
        </p>
      )}

      {loading && (
        <div className="flex justify-center">
          <RotateCw className="h-5 w-5 animate-spin text-teal-600" />
        </div>
      )}

      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="text-slate-500 hover:text-slate-700 transition-colors"
        >
          Change number
        </button>
        <button
          type="button"
          onClick={handleSendCode}
          disabled={loading || cooldown > 0}
          className="text-teal-600 hover:text-teal-800 font-medium transition-colors disabled:text-slate-400"
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
        </button>
      </div>
    </div>
  );
}
