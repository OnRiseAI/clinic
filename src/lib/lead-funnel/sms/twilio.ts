import type { SmsVerifier } from "./types";

/**
 * Twilio Verify implementation.
 *
 * Required env vars:
 *   TWILIO_ACCOUNT_SID
 *   TWILIO_AUTH_TOKEN
 *   TWILIO_VERIFY_SERVICE_SID   (create in Twilio console → Verify → Services)
 */
export class TwilioVerifier implements SmsVerifier {
  readonly provider = "twilio";

  private get client() {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    if (!sid || !token) {
      throw new Error("Missing TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN env vars");
    }
    // Dynamic require avoids bundling twilio on the client.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const twilio = require("twilio");
    return twilio(sid, token);
  }

  private get serviceSid(): string {
    const sid = process.env.TWILIO_VERIFY_SERVICE_SID;
    if (!sid) throw new Error("Missing TWILIO_VERIFY_SERVICE_SID env var");
    return sid;
  }

  async sendCode(phone: string): Promise<{ ok: boolean; error?: string }> {
    try {
      await this.client.verify.v2
        .services(this.serviceSid)
        .verifications.create({ to: phone, channel: "sms" });
      return { ok: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send code";
      console.error("[TwilioVerifier.sendCode]", message);
      return { ok: false, error: message };
    }
  }

  async verifyCode(
    phone: string,
    code: string
  ): Promise<{ ok: boolean; error?: string }> {
    try {
      const check = await this.client.verify.v2
        .services(this.serviceSid)
        .verificationChecks.create({ to: phone, code });
      if (check.status === "approved") {
        return { ok: true };
      }
      return { ok: false, error: "Invalid code" };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Verification failed";
      console.error("[TwilioVerifier.verifyCode]", message);
      return { ok: false, error: message };
    }
  }
}
