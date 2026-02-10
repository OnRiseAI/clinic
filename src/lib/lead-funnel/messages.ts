import { TIMEFRAME_OPTIONS, GOAL_OPTIONS } from "./config";
import type { Timeframe, GoalTemplate } from "./types";

interface MessageParams {
  leadId: string;
  pageContextFinal: string;
  timeframe: Timeframe | null;
  goalTemplate: GoalTemplate | null;
  extraDetails: string;
}

function timeframeLabel(t: Timeframe | null): string {
  if (!t) return "Not specified";
  return TIMEFRAME_OPTIONS.find((o) => o.value === t)?.label ?? t;
}

function goalLabel(g: GoalTemplate | null): string {
  if (!g) return "Not specified";
  return GOAL_OPTIONS.find((o) => o.value === g)?.label ?? g;
}

/**
 * Build a short prefilled message for WhatsApp / SMS handoff.
 * Keep it concise — no medical advice, just context for the clinic.
 */
export function buildHandoffMessage(params: MessageParams): string {
  const parts = [
    `Hi, I'm interested in ${params.pageContextFinal}.`,
    `Timeframe: ${timeframeLabel(params.timeframe)}.`,
    `Goal: ${goalLabel(params.goalTemplate)}.`,
  ];

  if (params.extraDetails.trim()) {
    parts.push(`Details: ${params.extraDetails.trim()}`);
  }

  parts.push(`Ref: ${params.leadId}`);

  return parts.join(" ");
}

/**
 * Build a WhatsApp wa.me URL with prefilled message.
 * @param number - E.164 format (e.g. +905551234567), stripped of leading +
 */
export function buildWhatsAppUrl(number: string, message: string): string {
  const clean = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

/**
 * Build an sms: URI with prefilled body.
 */
export function buildSmsUrl(number: string, message: string): string {
  // iOS uses &body=, Android uses ?body=. Using ? is more widely supported.
  return `sms:${number}?body=${encodeURIComponent(message)}`;
}

/**
 * Build a mailto: link with prefilled subject and body.
 */
export function buildEmailUrl(
  email: string,
  clinicName: string,
  message: string
): string {
  const subject = `Enquiry about treatment at ${clinicName}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
