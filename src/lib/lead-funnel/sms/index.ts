import type { SmsVerifier } from "./types";
import { TwilioVerifier } from "./twilio";

export type { SmsVerifier };

/**
 * Factory — returns the configured SMS verification provider.
 * Swap implementation here when adding Telnyx or another provider.
 *
 * Set SMS_PROVIDER=twilio (default) or SMS_PROVIDER=telnyx in .env
 */
export function getSmsVerifier(): SmsVerifier {
  const provider = process.env.SMS_PROVIDER ?? "twilio";

  switch (provider) {
    case "twilio":
      return new TwilioVerifier();
    // TODO: case "telnyx": return new TelnyxVerifier();
    default:
      throw new Error(`Unknown SMS_PROVIDER: ${provider}`);
  }
}
