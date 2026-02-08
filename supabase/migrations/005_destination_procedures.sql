-- Destination-Procedure Validity Matrix
-- Maps which procedures are available in which destinations
-- This powers the pSEO pages: /destinations/[country]/[procedure]

CREATE TABLE IF NOT EXISTS destination_procedures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
    procedure_id UUID NOT NULL REFERENCES procedures(id) ON DELETE CASCADE,
    avg_cost_local NUMERIC(10, 2),
    avg_cost_gbp NUMERIC(10, 2),
    uk_cost_gbp NUMERIC(10, 2),
    savings_percent INTEGER,
    quality_score INTEGER CHECK (quality_score BETWEEN 1 AND 10),
    popularity_score INTEGER CHECK (popularity_score BETWEEN 1 AND 10),
    notes TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(destination_id, procedure_id)
);

CREATE TRIGGER update_destination_procedures_updated_at
    BEFORE UPDATE ON destination_procedures
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_destination_procedures_destination ON destination_procedures(destination_id);
CREATE INDEX idx_destination_procedures_procedure ON destination_procedures(procedure_id);
CREATE INDEX idx_destination_procedures_active ON destination_procedures(is_active);

-- Enable RLS
ALTER TABLE destination_procedures ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "destination_procedures_read_all" ON destination_procedures
    FOR SELECT USING (true);

-- Admin write access
CREATE POLICY "destination_procedures_admin_write" ON destination_procedures
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

COMMENT ON TABLE destination_procedures IS 'Validity matrix mapping which procedures are offered in which destinations, with cost and quality data for pSEO pages';
