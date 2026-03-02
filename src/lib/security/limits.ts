/**
 * Security & Abuse Thresholds
 * Centralized tunable limits for bot prevention and anti-abuse.
 */

export const AUTH_SIGNIN_LIMIT = {
    WINDOW: 60 * 15, // 15 minutes
    MAX_ATTEMPTS: 5, // 5 attempts per IP/Email
};

export const AUTH_SIGNUP_LIMIT = {
    WINDOW: 60 * 60, // 1 hour
    MAX_ATTEMPTS: 3, // 3 attempts per IP (Prevent mass registration)
};

export const GOOGLE_OAUTH_LIMIT = {
    WINDOW: 60 * 15, // 15 minutes
    MAX_ATTEMPTS: 10, // 10 starts per IP
};

export const ENQUIRY_LIMIT = {
    WINDOW: 60 * 60 * 24, // 24 hours
    MAX_ATTEMPTS: 5, // 5 enquiries per IP/Email per day
};

export const CLINIC_VERIFY_LIMIT = {
    WINDOW: 60 * 60, // 1 hour
    MAX_ATTEMPTS: 10, // 10 attempts to send verification code
    COOLDOWN: 60, // 60 seconds between resends
};

export const CLINIC_CLAIM_LIMIT = {
    WINDOW: 60 * 60 * 24, // 24 hours
    MAX_ATTEMPTS: 3, // 3 claims per user/IP per day
};

export const CLINIC_VERIFY_ATTEMPT_LIMIT = {
    WINDOW: 60 * 60, // 1 hour
    MAX_ATTEMPTS: 10,
};
