// ─── Funnel State Machine ────────────────────────────────────────────────────

export type FunnelStep =
  | "entry"          // Step 0 — "Are you actively looking for X?"
  | "category"       // Step NO-1 — "What are you looking for?"
  | "timeframe"      // Step 1
  | "goal"           // Step 2
  | "verify"         // Step 3 (phone entry + OTP, one UI step)
  | "channel";       // Step 4 — handoff

export type VerifySubState = "phone_entry" | "code_entry";

export type Timeframe = "asap" | "1-3months" | "not_sure";
export type GoalTemplate =
  | "appearance"
  | "medical_issue"
  | "compare_clinics"
  | "expert_advice"
  | "not_sure";
export type Channel = "whatsapp" | "sms" | "email";
export type LeadStatus = "started" | "verified" | "handoff_completed";

// ─── Funnel Accumulated State ────────────────────────────────────────────────

export interface FunnelState {
  step: FunnelStep;
  verifySubState: VerifySubState;
  leadId: string | null;
  pageContextOriginal: string;
  pageContextFinal: string;
  categorySelected: string | null;
  timeframe: Timeframe | null;
  goalTemplate: GoalTemplate | null;
  extraDetails: string;
  phone: string;
  phoneVerified: boolean;
  preferredChannel: Channel | null;
  country: string | null;
  isUS: boolean;
  error: string | null;
  loading: boolean;
}

// ─── Funnel Actions (reducer) ────────────────────────────────────────────────

export type FunnelAction =
  | { type: "SET_STEP"; step: FunnelStep }
  | { type: "SET_VERIFY_SUB"; sub: VerifySubState }
  | { type: "SET_CATEGORY"; category: string; contextLabel: string }
  | { type: "SET_TIMEFRAME"; timeframe: Timeframe }
  | { type: "SET_GOAL"; goal: GoalTemplate }
  | { type: "SET_EXTRA_DETAILS"; text: string }
  | { type: "SET_PHONE"; phone: string }
  | { type: "SET_PHONE_VERIFIED" }
  | { type: "SET_CHANNEL"; channel: Channel }
  | { type: "SET_LEAD_ID"; id: string }
  | { type: "SET_COUNTRY"; country: string; isUS: boolean }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "SET_LOADING"; loading: boolean };

// ─── Component Props ─────────────────────────────────────────────────────────

export interface ClinicContactConfig {
  /** WhatsApp number in E.164 (or platform number for AI chat) */
  whatsappNumber: string;
  /** If true, SMS handoff shows "We'll text you" instead of sms: link */
  smsUsePlatformReply: boolean;
  /** Email address for email handoff */
  email: string;
}

export interface LeadFunnelProps {
  clinicId: string;
  clinicSlug: string;
  clinicName: string;
  pageContext: string;
  defaultCategory?: string;
  clinicContactConfig: ClinicContactConfig;
}

// ─── DB Row Types ────────────────────────────────────────────────────────────

export interface LeadRow {
  id: string;
  created_at: string;
  clinic_id: string;
  clinic_slug: string;
  page_context_original: string;
  page_context_final: string;
  category_selected: string | null;
  timeframe: string | null;
  goal_template: string | null;
  extra_details: string | null;
  phone_e164: string | null;
  phone_verified: boolean;
  sms_provider: string | null;
  country: string | null;
  preferred_channel: string | null;
  status: LeadStatus;
  metadata: Record<string, unknown>;
}

// ─── SMS Verification ────────────────────────────────────────────────────────

export interface SmsVerifier {
  readonly provider: string;
  sendCode(phone: string): Promise<{ ok: boolean; error?: string }>;
  verifyCode(phone: string, code: string): Promise<{ ok: boolean; error?: string }>;
}
