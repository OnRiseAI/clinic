"use client";

import { useReducer, useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import type {
  FunnelState,
  FunnelAction,
  FunnelStep,
  Timeframe,
  GoalTemplate,
  Channel,
  LeadFunnelProps,
} from "@/lib/lead-funnel/types";
import {
  startLead,
  saveStep,
  sendOtp,
  verifyOtp,
  setChannel,
} from "@/lib/lead-funnel/actions";
import {
  buildHandoffMessage,
  buildWhatsAppUrl,
  buildSmsUrl,
  buildEmailUrl,
} from "@/lib/lead-funnel/messages";
import { detectCountryClient, isNorthAmerica } from "@/lib/lead-funnel/geo.client";

import ProgressBar from "./ui/ProgressBar";
import EntryQuestion from "./steps/EntryQuestion";
import CategorySelect from "./steps/CategorySelect";
import TimeHorizon from "./steps/TimeHorizon";
import GoalSelect from "./steps/GoalSelect";
import VerifyPhone from "./steps/VerifyPhone";
import ChannelHandoff from "./steps/ChannelHandoff";

// ─── Reducer ─────────────────────────────────────────────────────────────────

function createInitialState(pageContext: string): FunnelState {
  return {
    step: "entry",
    verifySubState: "phone_entry",
    leadId: null,
    pageContextOriginal: pageContext,
    pageContextFinal: pageContext,
    categorySelected: null,
    timeframe: null,
    goalTemplate: null,
    extraDetails: "",
    phone: "",
    phoneVerified: false,
    preferredChannel: null,
    country: null,
    isUS: false,
    error: null,
    loading: false,
  };
}

function reducer(state: FunnelState, action: FunnelAction): FunnelState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.step, error: null };
    case "SET_VERIFY_SUB":
      return { ...state, verifySubState: action.sub, error: null };
    case "SET_CATEGORY":
      return {
        ...state,
        categorySelected: action.category,
        pageContextFinal: action.contextLabel,
      };
    case "SET_TIMEFRAME":
      return { ...state, timeframe: action.timeframe };
    case "SET_GOAL":
      return { ...state, goalTemplate: action.goal };
    case "SET_EXTRA_DETAILS":
      return { ...state, extraDetails: action.text };
    case "SET_PHONE":
      return { ...state, phone: action.phone };
    case "SET_PHONE_VERIFIED":
      return { ...state, phoneVerified: true };
    case "SET_CHANNEL":
      return { ...state, preferredChannel: action.channel };
    case "SET_LEAD_ID":
      return { ...state, leadId: action.id };
    case "SET_COUNTRY":
      return { ...state, country: action.country, isUS: action.isUS };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    default:
      return state;
  }
}

// ─── Step index for progress bar ─────────────────────────────────────────────

const STEP_ORDER: FunnelStep[] = [
  "entry",
  "timeframe",
  "goal",
  "verify",
  "channel",
];

function stepIndex(step: FunnelStep): number {
  const idx = STEP_ORDER.indexOf(step);
  // category goes between entry and timeframe visually
  if (step === "category") return 0;
  return idx >= 0 ? idx : 0;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function LeadFunnel({
  clinicId,
  clinicSlug,
  clinicName,
  pageContext,
  defaultCategory,
  clinicContactConfig,
}: LeadFunnelProps) {
  const [state, dispatch] = useReducer(
    reducer,
    pageContext,
    createInitialState
  );
  const [completed, setCompleted] = useState(false);

  // Detect country on mount (client-side fallback)
  useEffect(() => {
    const country = detectCountryClient();
    dispatch({
      type: "SET_COUNTRY",
      country,
      isUS: isNorthAmerica(country),
    });
  }, []);

  // If a default category was given and matches "No" path, pre-fill
  useEffect(() => {
    if (defaultCategory) {
      dispatch({
        type: "SET_CATEGORY",
        category: defaultCategory,
        contextLabel: pageContext,
      });
    }
  }, [defaultCategory, pageContext]);

  // ── Ensure lead record exists ────────────────────────────────────────

  const ensureLead = useCallback(async () => {
    if (state.leadId) return state.leadId;

    dispatch({ type: "SET_LOADING", loading: true });
    const result = await startLead({
      clinicId,
      clinicSlug,
      pageContext: state.pageContextFinal,
    });
    dispatch({ type: "SET_LOADING", loading: false });

    if (!result.ok) {
      dispatch({ type: "SET_ERROR", error: "error" in result ? result.error : "Failed to start" });
      return null;
    }

    const { leadId, country: serverCountry } = result as { ok: true; leadId: string; country: string | null };
    dispatch({ type: "SET_LEAD_ID", id: leadId });

    if (serverCountry) {
      dispatch({
        type: "SET_COUNTRY",
        country: serverCountry,
        isUS: isNorthAmerica(serverCountry),
      });
    }

    return leadId;
  }, [state.leadId, state.pageContextFinal, clinicId, clinicSlug]);

  // ── Step Handlers ────────────────────────────────────────────────────

  const handleEntryYes = useCallback(async () => {
    await ensureLead();
    dispatch({ type: "SET_STEP", step: "timeframe" });
  }, [ensureLead]);

  const handleEntryNo = useCallback(() => {
    dispatch({ type: "SET_STEP", step: "category" });
  }, []);

  const handleCategorySelect = useCallback(
    async (category: string, label: string, note: string) => {
      dispatch({ type: "SET_CATEGORY", category, contextLabel: label });
      if (note) {
        dispatch({ type: "SET_EXTRA_DETAILS", text: note });
      }

      const leadId = await ensureLead();
      if (leadId) {
        await saveStep({
          leadId,
          categorySelected: category,
          pageContextFinal: label,
          extraDetails: note || undefined,
        });
      }

      // Return to entry with updated context
      dispatch({ type: "SET_STEP", step: "entry" });
    },
    [ensureLead]
  );

  const handleTimeframe = useCallback(
    async (t: Timeframe) => {
      dispatch({ type: "SET_TIMEFRAME", timeframe: t });

      const leadId = state.leadId ?? (await ensureLead());
      if (leadId) {
        await saveStep({ leadId, timeframe: t });
      }

      dispatch({ type: "SET_STEP", step: "goal" });
    },
    [state.leadId, ensureLead]
  );

  const handleGoalSubmit = useCallback(
    async (goal: GoalTemplate, details: string) => {
      dispatch({ type: "SET_GOAL", goal });
      dispatch({ type: "SET_EXTRA_DETAILS", text: details });

      if (state.leadId) {
        await saveStep({
          leadId: state.leadId,
          goalTemplate: goal,
          extraDetails: details,
        });
      }

      dispatch({ type: "SET_STEP", step: "verify" });
    },
    [state.leadId]
  );

  const handlePhoneChange = useCallback((phone: string) => {
    dispatch({ type: "SET_PHONE", phone });
  }, []);

  const handleSendCode = useCallback(async () => {
    if (!state.leadId) return;
    dispatch({ type: "SET_LOADING", loading: true });
    dispatch({ type: "SET_ERROR", error: null });

    const result = await sendOtp({ leadId: state.leadId, phone: state.phone });

    dispatch({ type: "SET_LOADING", loading: false });

    if (!result.ok) {
      dispatch({ type: "SET_ERROR", error: result.error ?? "Failed to send code" });
      return;
    }

    dispatch({ type: "SET_VERIFY_SUB", sub: "code_entry" });
  }, [state.leadId, state.phone]);

  const handleVerifyCode = useCallback(
    async (code: string) => {
      if (!state.leadId) return;
      dispatch({ type: "SET_LOADING", loading: true });
      dispatch({ type: "SET_ERROR", error: null });

      const result = await verifyOtp({
        leadId: state.leadId,
        phone: state.phone,
        code,
      });

      dispatch({ type: "SET_LOADING", loading: false });

      if (!result.ok) {
        dispatch({
          type: "SET_ERROR",
          error: result.error ?? "Invalid code",
        });
        return;
      }

      dispatch({ type: "SET_PHONE_VERIFIED" });
      dispatch({ type: "SET_STEP", step: "channel" });
    },
    [state.leadId, state.phone]
  );

  const handleBackToPhone = useCallback(() => {
    dispatch({ type: "SET_VERIFY_SUB", sub: "phone_entry" });
  }, []);

  const handleChannelSelect = useCallback(
    async (channel: Channel) => {
      if (!state.leadId || !state.phoneVerified) return;

      dispatch({ type: "SET_LOADING", loading: true });
      dispatch({ type: "SET_CHANNEL", channel });

      await setChannel({ leadId: state.leadId, channel });
      dispatch({ type: "SET_LOADING", loading: false });

      // Build handoff message
      const message = buildHandoffMessage({
        leadId: state.leadId,
        pageContextFinal: state.pageContextFinal,
        timeframe: state.timeframe,
        goalTemplate: state.goalTemplate,
        extraDetails: state.extraDetails,
      });

      // Open appropriate channel
      if (channel === "whatsapp") {
        const url = buildWhatsAppUrl(
          clinicContactConfig.whatsappNumber,
          message
        );
        window.open(url, "_blank", "noopener");
      } else if (channel === "sms") {
        if (clinicContactConfig.smsUsePlatformReply) {
          // Platform handles SMS — show confirmation
        } else {
          const url = buildSmsUrl(
            clinicContactConfig.whatsappNumber, // TODO: use dedicated SMS number if different
            message
          );
          window.open(url, "_self");
        }
      } else if (channel === "email") {
        const url = buildEmailUrl(
          clinicContactConfig.email,
          clinicName,
          message
        );
        window.open(url, "_self");
      }

      setCompleted(true);
    },
    [
      state.leadId,
      state.phoneVerified,
      state.pageContextFinal,
      state.timeframe,
      state.goalTemplate,
      state.extraDetails,
      clinicContactConfig,
      clinicName,
    ]
  );

  // ── Completed State ──────────────────────────────────────────────────

  if (completed) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 border border-teal-100">
          <svg
            className="h-7 w-7 text-teal-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          You&rsquo;re all set!
        </h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          {state.preferredChannel === "email"
            ? `We've notified ${clinicName}. Expect a response within 24 hours.`
            : state.preferredChannel === "sms" &&
                clinicContactConfig.smsUsePlatformReply
              ? `${clinicName} will text you shortly to get started.`
              : `Your enquiry has been sent to ${clinicName}. They'll be in touch soon.`}
        </p>
        <p className="mt-3 text-xs text-slate-400">
          Reference: {state.leadId?.slice(0, 8)}
        </p>
      </div>
    );
  }

  // ── Render Current Step ──────────────────────────────────────────────

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Progress */}
      <ProgressBar current={stepIndex(state.step)} />

      {/* Content */}
      <div className="p-6 sm:p-8">
        {state.step === "entry" && (
          <EntryQuestion
            pageContext={state.pageContextFinal}
            onYes={handleEntryYes}
            onNo={handleEntryNo}
            disabled={state.loading}
          />
        )}

        {state.step === "category" && (
          <CategorySelect
            onSelect={handleCategorySelect}
            disabled={state.loading}
          />
        )}

        {state.step === "timeframe" && (
          <TimeHorizon
            pageContext={state.pageContextFinal}
            onSelect={handleTimeframe}
            disabled={state.loading}
          />
        )}

        {state.step === "goal" && (
          <GoalSelect
            onSubmit={handleGoalSubmit}
            disabled={state.loading}
          />
        )}

        {state.step === "verify" && (
          <VerifyPhone
            subState={state.verifySubState}
            phone={state.phone}
            defaultCountry={state.country ?? "US"}
            onPhoneChange={handlePhoneChange}
            onSendCode={handleSendCode}
            onVerifyCode={handleVerifyCode}
            onBack={handleBackToPhone}
            loading={state.loading}
            error={state.error}
          />
        )}

        {state.step === "channel" && (
          <ChannelHandoff
            isUS={state.isUS}
            clinicName={clinicName}
            clinicContactConfig={clinicContactConfig}
            onSelect={handleChannelSelect}
            loading={state.loading}
          />
        )}

        {/* Global error (for non-step-specific errors) */}
        {state.error && state.step !== "verify" && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
            <X className="h-4 w-4 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{state.error}</p>
          </div>
        )}
      </div>

      {/* Trust footer */}
      <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-3">
        <p className="text-center text-xs text-slate-400">
          Your information is secure and will never be shared with third parties.
        </p>
      </div>
    </div>
  );
}
