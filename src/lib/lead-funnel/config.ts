import type { Timeframe, GoalTemplate } from "./types";

// ─── Categories (Step NO-1) ──────────────────────────────────────────────────

export const CATEGORIES = [
  { value: "dental", label: "Dental" },
  { value: "aesthetic", label: "Aesthetic & Cosmetic" },
  { value: "diagnostics", label: "Diagnostics & Checkups" },
  { value: "surgery", label: "Surgery" },
  { value: "longevity", label: "Longevity & Wellness" },
  { value: "not_sure", label: "Not sure yet" },
] as const;

// ─── Timeframe Options (Step 1) ──────────────────────────────────────────────

export const TIMEFRAME_OPTIONS: { value: Timeframe; label: string }[] = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3months", label: "In the next 1\u20133 months" },
  { value: "not_sure", label: "Not sure yet" },
];

// ─── Goal Options (Step 2) ───────────────────────────────────────────────────

export const GOAL_OPTIONS: { value: GoalTemplate; label: string }[] = [
  { value: "appearance", label: "Improve appearance or confidence" },
  { value: "medical_issue", label: "Treat a specific medical issue" },
  { value: "compare_clinics", label: "Compare clinics and pricing" },
  { value: "expert_advice", label: "Get expert advice before deciding" },
  { value: "not_sure", label: "Not sure yet, need guidance" },
];

// ─── Channel Labels ──────────────────────────────────────────────────────────

export const CHANNEL_META = {
  whatsapp: { label: "WhatsApp", icon: "whatsapp" as const },
  sms: { label: "SMS", icon: "sms" as const },
  email: { label: "Email", icon: "email" as const },
} as const;

// ─── Common Country Dial Codes ───────────────────────────────────────────────

export const COUNTRY_CODES = [
  { code: "US", dial: "+1", flag: "\uD83C\uDDFA\uD83C\uDDF8", name: "United States" },
  { code: "GB", dial: "+44", flag: "\uD83C\uDDEC\uD83C\uDDE7", name: "United Kingdom" },
  { code: "DE", dial: "+49", flag: "\uD83C\uDDE9\uD83C\uDDEA", name: "Germany" },
  { code: "FR", dial: "+33", flag: "\uD83C\uDDEB\uD83C\uDDF7", name: "France" },
  { code: "NL", dial: "+31", flag: "\uD83C\uDDF3\uD83C\uDDF1", name: "Netherlands" },
  { code: "IE", dial: "+353", flag: "\uD83C\uDDEE\uD83C\uDDEA", name: "Ireland" },
  { code: "SE", dial: "+46", flag: "\uD83C\uDDF8\uD83C\uDDEA", name: "Sweden" },
  { code: "NO", dial: "+47", flag: "\uD83C\uDDF3\uD83C\uDDF4", name: "Norway" },
  { code: "DK", dial: "+45", flag: "\uD83C\uDDE9\uD83C\uDDF0", name: "Denmark" },
  { code: "AU", dial: "+61", flag: "\uD83C\uDDE6\uD83C\uDDFA", name: "Australia" },
  { code: "CA", dial: "+1", flag: "\uD83C\uDDE8\uD83C\uDDE6", name: "Canada" },
  { code: "TR", dial: "+90", flag: "\uD83C\uDDF9\uD83C\uDDF7", name: "Turkey" },
  { code: "AE", dial: "+971", flag: "\uD83C\uDDE6\uD83C\uDDEA", name: "UAE" },
  { code: "SA", dial: "+966", flag: "\uD83C\uDDF8\uD83C\uDDE6", name: "Saudi Arabia" },
  { code: "IL", dial: "+972", flag: "\uD83C\uDDEE\uD83C\uDDF1", name: "Israel" },
  { code: "RU", dial: "+7", flag: "\uD83C\uDDF7\uD83C\uDDFA", name: "Russia" },
  { code: "IT", dial: "+39", flag: "\uD83C\uDDEE\uD83C\uDDF9", name: "Italy" },
  { code: "ES", dial: "+34", flag: "\uD83C\uDDEA\uD83C\uDDF8", name: "Spain" },
  { code: "BR", dial: "+55", flag: "\uD83C\uDDE7\uD83C\uDDF7", name: "Brazil" },
  { code: "MX", dial: "+52", flag: "\uD83C\uDDF2\uD83C\uDDFD", name: "Mexico" },
  { code: "IN", dial: "+91", flag: "\uD83C\uDDEE\uD83C\uDDF3", name: "India" },
  { code: "JP", dial: "+81", flag: "\uD83C\uDDEF\uD83C\uDDF5", name: "Japan" },
  { code: "KR", dial: "+82", flag: "\uD83C\uDDF0\uD83C\uDDF7", name: "South Korea" },
  { code: "ZA", dial: "+27", flag: "\uD83C\uDDFF\uD83C\uDDE6", name: "South Africa" },
] as const;

// ─── OTP Settings ────────────────────────────────────────────────────────────

export const OTP_LENGTH = 6;
export const OTP_RESEND_COOLDOWN_MS = 30_000;
export const EXTRA_DETAILS_MAX_LENGTH = 240;
