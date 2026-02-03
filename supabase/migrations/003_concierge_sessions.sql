-- =============================================================================
-- CONCIERGE SESSIONS TABLE
-- Tracks AI concierge usage analytics
-- =============================================================================

-- Create concierge_sessions table
CREATE TABLE IF NOT EXISTS concierge_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text NOT NULL UNIQUE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  mode text NOT NULL CHECK (mode IN ('voice', 'text')),
  turns integer DEFAULT 0,
  clinics_recommended text[] DEFAULT '{}',
  resulted_in_enquiry boolean DEFAULT false,
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Index for faster queries
CREATE INDEX idx_concierge_sessions_user_id ON concierge_sessions(user_id);
CREATE INDEX idx_concierge_sessions_started_at ON concierge_sessions(started_at DESC);
CREATE INDEX idx_concierge_sessions_mode ON concierge_sessions(mode);

-- Enable RLS
ALTER TABLE concierge_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert sessions (for anonymous users)
CREATE POLICY "Anyone can create concierge sessions"
  ON concierge_sessions
  FOR INSERT
  WITH CHECK (true);

-- Policy: Sessions can be updated by anyone (for anonymous users)
CREATE POLICY "Anyone can update concierge sessions"
  ON concierge_sessions
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Policy: Only authenticated users can read their own sessions
CREATE POLICY "Users can view their own sessions"
  ON concierge_sessions
  FOR SELECT
  USING (
    auth.uid() = user_id
    OR auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin')
  );

-- =============================================================================
-- ANALYTICS VIEWS
-- =============================================================================

-- View: Daily concierge stats
CREATE OR REPLACE VIEW concierge_daily_stats AS
SELECT
  DATE(started_at) AS date,
  COUNT(*) AS total_sessions,
  COUNT(*) FILTER (WHERE mode = 'voice') AS voice_sessions,
  COUNT(*) FILTER (WHERE mode = 'text') AS text_sessions,
  AVG(turns) AS avg_turns,
  COUNT(*) FILTER (WHERE resulted_in_enquiry) AS conversions,
  ROUND(COUNT(*) FILTER (WHERE resulted_in_enquiry)::numeric / NULLIF(COUNT(*), 0) * 100, 2) AS conversion_rate
FROM concierge_sessions
GROUP BY DATE(started_at)
ORDER BY date DESC;

-- View: Most recommended clinics
CREATE OR REPLACE VIEW concierge_clinic_recommendations AS
SELECT
  clinic_slug,
  COUNT(*) AS times_recommended
FROM concierge_sessions,
  LATERAL unnest(clinics_recommended) AS clinic_slug
WHERE array_length(clinics_recommended, 1) > 0
GROUP BY clinic_slug
ORDER BY times_recommended DESC;

-- =============================================================================
-- FUNCTION: Mark session as converted when enquiry is submitted
-- =============================================================================

CREATE OR REPLACE FUNCTION mark_concierge_conversion()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if there's a recent concierge session for this user
  -- within the last 30 minutes that recommended this clinic
  IF NEW.patient_user_id IS NOT NULL THEN
    UPDATE concierge_sessions
    SET
      resulted_in_enquiry = true,
      ended_at = COALESCE(ended_at, now())
    WHERE user_id = NEW.patient_user_id
      AND started_at > now() - INTERVAL '30 minutes'
      AND resulted_in_enquiry = false;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-mark conversion when enquiry is created
DROP TRIGGER IF EXISTS trigger_mark_concierge_conversion ON enquiries;
CREATE TRIGGER trigger_mark_concierge_conversion
  AFTER INSERT ON enquiries
  FOR EACH ROW
  EXECUTE FUNCTION mark_concierge_conversion();
