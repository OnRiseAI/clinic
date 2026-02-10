/**
 * Client-side country guess using timezone and navigator.language.
 * Returns ISO 3166-1 alpha-2 or "US" as fallback.
 */
export function detectCountryClient(): string {
  if (typeof window === "undefined") return "US";

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    const tzMap: Record<string, string> = {
      "America/New_York": "US",
      "America/Chicago": "US",
      "America/Denver": "US",
      "America/Los_Angeles": "US",
      "America/Phoenix": "US",
      "America/Anchorage": "US",
      "Pacific/Honolulu": "US",
      "Europe/London": "GB",
      "Europe/Berlin": "DE",
      "Europe/Paris": "FR",
      "Europe/Amsterdam": "NL",
      "Europe/Dublin": "IE",
      "Europe/Stockholm": "SE",
      "Europe/Oslo": "NO",
      "Europe/Copenhagen": "DK",
      "Europe/Rome": "IT",
      "Europe/Madrid": "ES",
      "Australia/Sydney": "AU",
      "Australia/Melbourne": "AU",
      "America/Toronto": "CA",
      "America/Vancouver": "CA",
      "Europe/Istanbul": "TR",
      "Asia/Dubai": "AE",
      "Asia/Riyadh": "SA",
      "Asia/Jerusalem": "IL",
      "Asia/Tokyo": "JP",
      "Asia/Seoul": "KR",
      "America/Sao_Paulo": "BR",
      "America/Mexico_City": "MX",
      "Asia/Kolkata": "IN",
      "Africa/Johannesburg": "ZA",
    };

    if (tzMap[tz]) return tzMap[tz];

    const lang = navigator.language ?? "";
    const parts = lang.split("-");
    if (parts.length >= 2) {
      const region = parts[parts.length - 1].toUpperCase();
      if (region.length === 2) return region;
    }
  } catch {
    // Ignore
  }

  return "US";
}

/** Returns true if the detected country is US or CA */
export function isNorthAmerica(country: string | null): boolean {
  return country === "US" || country === "CA";
}
