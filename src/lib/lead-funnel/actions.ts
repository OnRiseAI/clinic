"use server";

import { getSupabaseAdmin } from "./supabase";
import { getSmsVerifier } from "./sms";
import { detectCountryServer } from "./geo.server";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import type { Timeframe, GoalTemplate, Channel } from "./types";
import { EXTRA_DETAILS_MAX_LENGTH } from "./config";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fail(error: string) {
  return { ok: false as const, error };
}

function ok(): { ok: true };
function ok<T extends Record<string, unknown>>(data: T): { ok: true } & T;
function ok<T extends Record<string, unknown>>(data?: T) {
  return { ok: true as const, ...data };
}

async function logEvent(
  leadId: string,
  eventType: string,
  payload: Record<string, unknown> = {}
) {
  try {
    const db = getSupabaseAdmin();
    await db
      .from("lead_events")
      .insert({ lead_id: leadId, event_type: eventType, payload });
  } catch (err) {
    console.error("[logEvent]", err);
  }
}

// ─── Action: Start a Lead ────────────────────────────────────────────────────

export async function startLead(params: {
  clinicId: string;
  clinicSlug: string;
  pageContext: string;
}) {
  const db = getSupabaseAdmin();
  const country = await detectCountryServer();

  const { data, error } = await db
    .from("leads")
    .insert({
      clinic_id: params.clinicId,
      clinic_slug: params.clinicSlug,
      page_context_original: params.pageContext,
      page_context_final: params.pageContext,
      status: "started",
      country,
      metadata: {},
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[startLead]", error);
    return fail("Could not create lead");
  }

  await logEvent(data.id, "lead_started", {
    clinic_id: params.clinicId,
    page_context: params.pageContext,
  });

  return ok({ leadId: data.id, country });
}

// ─── Action: Save Step Data ──────────────────────────────────────────────────

export async function saveStep(params: {
  leadId: string;
  timeframe?: Timeframe;
  goalTemplate?: GoalTemplate;
  extraDetails?: string;
  categorySelected?: string;
  pageContextFinal?: string;
}) {
  if (!params.leadId) return fail("Missing leadId");

  const db = getSupabaseAdmin();

  const update: Record<string, unknown> = {};
  if (params.timeframe) update.timeframe = params.timeframe;
  if (params.goalTemplate) update.goal_template = params.goalTemplate;
  if (params.extraDetails !== undefined) {
    update.extra_details = params.extraDetails.slice(
      0,
      EXTRA_DETAILS_MAX_LENGTH
    );
  }
  if (params.categorySelected) update.category_selected = params.categorySelected;
  if (params.pageContextFinal) update.page_context_final = params.pageContextFinal;

  if (Object.keys(update).length === 0) return ok();

  const { error } = await db
    .from("leads")
    .update(update)
    .eq("id", params.leadId);

  if (error) {
    console.error("[saveStep]", error);
    return fail("Could not save step data");
  }

  await logEvent(params.leadId, "step_completed", update);
  return ok();
}

// ─── Action: Send OTP ────────────────────────────────────────────────────────

export async function sendOtp(params: { leadId: string; phone: string }) {
  if (!params.leadId) return fail("Missing leadId");

  // Validate phone
  const parsed = parsePhoneNumberFromString(params.phone);
  if (!parsed || !parsed.isValid()) {
    return fail("Please enter a valid phone number");
  }

  const e164 = parsed.format("E.164");
  const verifier = getSmsVerifier();

  // Persist phone to lead before sending
  const db = getSupabaseAdmin();
  await db
    .from("leads")
    .update({ phone_e164: e164, sms_provider: verifier.provider })
    .eq("id", params.leadId);

  const result = await verifier.sendCode(e164);

  await logEvent(params.leadId, "otp_sent", {
    phone_last4: e164.slice(-4),
    provider: verifier.provider,
    success: result.ok,
  });

  if (!result.ok) {
    return fail(result.error ?? "Failed to send verification code");
  }

  return ok();
}

// ─── Action: Verify OTP ──────────────────────────────────────────────────────

export async function verifyOtp(params: {
  leadId: string;
  phone: string;
  code: string;
}) {
  if (!params.leadId) return fail("Missing leadId");
  if (!params.code || params.code.length !== 6) {
    return fail("Please enter the 6-digit code");
  }

  const parsed = parsePhoneNumberFromString(params.phone);
  if (!parsed || !parsed.isValid()) {
    return fail("Invalid phone number");
  }

  const e164 = parsed.format("E.164");
  const verifier = getSmsVerifier();
  const result = await verifier.verifyCode(e164, params.code);

  await logEvent(params.leadId, "otp_verify_attempt", {
    success: result.ok,
    provider: verifier.provider,
  });

  if (!result.ok) {
    return fail(result.error ?? "Invalid code. Please try again.");
  }

  // Mark lead as verified
  const db = getSupabaseAdmin();
  const { error } = await db
    .from("leads")
    .update({ phone_verified: true, status: "verified" })
    .eq("id", params.leadId);

  if (error) {
    console.error("[verifyOtp]", error);
    return fail("Verification succeeded but could not update record");
  }

  await logEvent(params.leadId, "otp_verified");

  return ok();
}

// ─── Action: Set Channel & Complete Handoff ──────────────────────────────────

export async function setChannel(params: {
  leadId: string;
  channel: Channel;
}) {
  if (!params.leadId) return fail("Missing leadId");

  const db = getSupabaseAdmin();
  const { error } = await db
    .from("leads")
    .update({
      preferred_channel: params.channel,
      status: "handoff_completed",
    })
    .eq("id", params.leadId);

  if (error) {
    console.error("[setChannel]", error);
    return fail("Could not save channel preference");
  }

  await logEvent(params.leadId, "handoff_clicked", {
    channel: params.channel,
  });

  return ok();
}
