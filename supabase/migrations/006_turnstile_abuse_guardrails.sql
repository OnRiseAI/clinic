-- Migration: 006_turnstile_abuse_guardrails
-- Purpose: Persistent rate limiting, anti-abuse logging, and OTP cooldown management

-- 1. Abuse Events (Audit log for security triggers)
CREATE TABLE IF NOT EXISTS abuse_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    event_type TEXT NOT NULL, -- 'rate_limit', 'turnstile_fail', 'disposable_email', 'auth_abuse'
    ip_address TEXT,
    identifier TEXT, -- email or phone
    user_agent TEXT,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Index for searching IPs or Identifiers
CREATE INDEX IF NOT EXISTS idx_abuse_events_ip ON abuse_events(ip_address);
CREATE INDEX IF NOT EXISTS idx_abuse_events_identifier ON abuse_events(identifier);

-- 2. Rate Limit Counters (DB-backed counters for precision across instances)
CREATE TABLE IF NOT EXISTS rate_limit_counters (
    key TEXT PRIMARY KEY, -- "rl:{action}:{identifier}" or "rl:{action}:{ip}"
    count INTEGER DEFAULT 0,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. OTP Cooldowns (Specific tracking for verification code attempts)
CREATE TABLE IF NOT EXISTS otp_cooldowns (
    identifier TEXT PRIMARY KEY, -- email or phone
    last_sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    blocked_until TIMESTAMP WITH TIME ZONE
);

-- RPC: rate_limit_hit
-- Increments count and returns if threshold exceeded
CREATE OR REPLACE FUNCTION rate_limit_hit(
    p_key TEXT,
    p_window_seconds INTEGER,
    p_limit INTEGER
) RETURNS TABLE (
    current_count INTEGER,
    exceeded BOOLEAN,
    remaining INTEGER,
    reset_at TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
    v_now TIMESTAMP WITH TIME ZONE := NOW();
    v_expires_at TIMESTAMP WITH TIME ZONE := v_now + (p_window_seconds || ' seconds')::interval;
    v_current_count INTEGER;
BEGIN
    -- Delete expired tokens if we hit them
    DELETE FROM rate_limit_counters WHERE key = p_key AND expires_at < v_now;

    INSERT INTO rate_limit_counters (key, count, expires_at, updated_at)
    VALUES (p_key, 1, v_expires_at, v_now)
    ON CONFLICT (key) DO UPDATE
    SET count = rate_limit_counters.count + 1,
        updated_at = v_now
    RETURNING count, expires_at INTO v_current_count, v_expires_at;

    RETURN QUERY SELECT 
        v_current_count,
        v_current_count > p_limit,
        GREATEST(0, p_limit - v_current_count),
        v_expires_at;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC: otp_cooldown_check
CREATE OR REPLACE FUNCTION otp_cooldown_check(
    p_identifier TEXT,
    p_cooldown_seconds INTEGER
) RETURNS TABLE (
    allowed BOOLEAN,
    seconds_remaining INTEGER
) AS $$
DECLARE
    v_last_sent TIMESTAMP WITH TIME ZONE;
    v_diff INTEGER;
BEGIN
    SELECT last_sent_at INTO v_last_sent FROM otp_cooldowns WHERE identifier = p_identifier;

    IF v_last_sent IS NULL THEN
        RETURN QUERY SELECT TRUE, 0;
        RETURN;
    END IF;

    v_diff := EXTRACT(EPOCH FROM (NOW() - v_last_sent));

    IF v_diff < p_cooldown_seconds THEN
        RETURN QUERY SELECT FALSE, (p_cooldown_seconds - v_diff)::INTEGER;
    ELSE
        RETURN QUERY SELECT TRUE, 0;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS: Only service role should touch these (private by default)
ALTER TABLE abuse_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limit_counters DISABLE ROW LEVEL SECURITY;
ALTER TABLE otp_cooldowns DISABLE ROW LEVEL SECURITY;
