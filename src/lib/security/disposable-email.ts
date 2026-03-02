/**
 * Disposable Email Blocking
 * Simple blocklist of common temporary email domains.
 */

// A basic set of popular disposable email domains to block
const DEFAULT_BLOCKLIST = [
    "mailinator.com",
    "10minutemail.com",
    "guerrillamail.com",
    "temp-mail.org",
    "dispostable.com",
    "throwawaymail.com",
    "sharklasers.com",
    "yopmail.com",
    "mintemail.com",
    "mytrashmail.com",
];

export function isDisposableEmail(email: string): boolean {
    if (!email || !email.includes("@")) return false;

    const domain = email.split("@")[1].toLowerCase();

    // Optional override from env (allows extending without code change)
    const extendedList = process.env.DISPOSABLE_EMAIL_BLOCKLIST
        ? process.env.DISPOSABLE_EMAIL_BLOCKLIST.split(',').map(d => d.trim().toLowerCase())
        : [];

    const fullBlocklist = [...DEFAULT_BLOCKLIST, ...extendedList];

    return fullBlocklist.some(d => domain === d || domain.endsWith(`.${d}`));
}
