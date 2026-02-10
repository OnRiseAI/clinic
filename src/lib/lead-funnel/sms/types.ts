/**
 * SMS Verification provider interface.
 * Implementations must be server-side only (never import in client components).
 */
export interface SmsVerifier {
  readonly provider: string;
  sendCode(phone: string): Promise<{ ok: boolean; error?: string }>;
  verifyCode(phone: string, code: string): Promise<{ ok: boolean; error?: string }>;
}
