"use client";

import { MessageCircle, MessageSquare, Mail, ArrowRight } from "lucide-react";
import type { Channel, ClinicContactConfig } from "@/lib/lead-funnel/types";

const CHANNEL_DETAILS: Record<
  Channel,
  { label: string; desc: string; Icon: typeof MessageCircle }
> = {
  whatsapp: {
    label: "WhatsApp",
    desc: "Chat directly — usually fastest",
    Icon: MessageCircle,
  },
  sms: {
    label: "SMS",
    desc: "We\u2019ll text you to get started",
    Icon: MessageSquare,
  },
  email: {
    label: "Email",
    desc: "Get a detailed response by email",
    Icon: Mail,
  },
};

interface ChannelHandoffProps {
  isUS: boolean;
  clinicName: string;
  clinicContactConfig: ClinicContactConfig;
  onSelect: (channel: Channel) => void;
  loading: boolean;
}

export default function ChannelHandoff({
  isUS,
  clinicName,
  onSelect,
  loading,
}: ChannelHandoffProps) {
  // Order channels by geo
  const channels: Channel[] = isUS
    ? ["sms", "whatsapp", "email"]
    : ["whatsapp", "sms", "email"];

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h3 className="text-lg font-bold text-slate-900">
          How would you like to continue?
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Choose how you&rsquo;d like {clinicName} to reach you.
        </p>
      </div>

      <div className="space-y-2.5">
        {channels.map((ch) => {
          const { label, desc, Icon } = CHANNEL_DETAILS[ch];
          return (
            <button
              key={ch}
              type="button"
              onClick={() => onSelect(ch)}
              disabled={loading}
              className="w-full flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-4 text-left transition-all hover:border-teal-300 hover:bg-teal-50/50 active:scale-[0.98] disabled:opacity-50 group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 border border-teal-100 flex-shrink-0 group-hover:bg-teal-100 transition-colors">
                <Icon className="h-5 w-5 text-teal-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">{label}</p>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-teal-500 transition-colors flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
