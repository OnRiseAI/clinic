-- MediTravel Database Schema
-- Version: 1.0.0
-- Description: Initial database schema for the medical tourism platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- CUSTOM TYPES / ENUMS
-- =============================================================================

CREATE TYPE user_role AS ENUM ('patient', 'clinic', 'admin');
CREATE TYPE enquiry_status AS ENUM ('submitted', 'viewed', 'responded', 'closed');

-- =============================================================================
-- HELPER FUNCTIONS
-- =============================================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to generate slug from name
CREATE OR REPLACE FUNCTION generate_slug(name TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN LOWER(REGEXP_REPLACE(REGEXP_REPLACE(TRIM(name), '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- TABLES
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Users Table
-- -----------------------------------------------------------------------------
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'patient',
    avatar_url TEXT,
    google_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- -----------------------------------------------------------------------------
-- Clinics Table
-- -----------------------------------------------------------------------------
CREATE TABLE clinics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    address TEXT,
    lat NUMERIC(10, 8),
    lng NUMERIC(11, 8),
    phone TEXT,
    website TEXT,
    email TEXT,
    country TEXT,
    city TEXT,
    languages TEXT[] DEFAULT '{}',
    accreditations TEXT[] DEFAULT '{}',
    certifications TEXT[] DEFAULT '{}',
    year_established INTEGER,
    pricing JSONB DEFAULT '{}',
    operating_hours JSONB DEFAULT '{}',
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    claimed BOOLEAN NOT NULL DEFAULT FALSE,
    claim_token UUID DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    insurance_accepted TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_clinics_updated_at
    BEFORE UPDATE ON clinics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_clinics_slug ON clinics(slug);
CREATE INDEX idx_clinics_country ON clinics(country);
CREATE INDEX idx_clinics_city ON clinics(city);
CREATE INDEX idx_clinics_featured ON clinics(featured);
CREATE INDEX idx_clinics_claimed ON clinics(claimed);
CREATE INDEX idx_clinics_user_id ON clinics(user_id);

-- Full-text search index for clinics
CREATE INDEX idx_clinics_search ON clinics USING GIN (
    to_tsvector('english', COALESCE(name, '') || ' ' || COALESCE(description, '') || ' ' || COALESCE(city, '') || ' ' || COALESCE(country, ''))
);

-- -----------------------------------------------------------------------------
-- Doctors Table
-- -----------------------------------------------------------------------------
CREATE TABLE doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    title TEXT,
    specialisation TEXT,
    qualifications TEXT[] DEFAULT '{}',
    years_experience INTEGER,
    languages TEXT[] DEFAULT '{}',
    photo_url TEXT,
    bio TEXT,
    clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_doctors_updated_at
    BEFORE UPDATE ON doctors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_doctors_clinic_id ON doctors(clinic_id);
CREATE INDEX idx_doctors_specialisation ON doctors(specialisation);

-- -----------------------------------------------------------------------------
-- Categories Table
-- -----------------------------------------------------------------------------
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_categories_slug ON categories(slug);

-- -----------------------------------------------------------------------------
-- Procedures Table
-- -----------------------------------------------------------------------------
CREATE TABLE procedures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    avg_costs JSONB DEFAULT '{}',
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_procedures_updated_at
    BEFORE UPDATE ON procedures
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_procedures_slug ON procedures(slug);
CREATE INDEX idx_procedures_category_id ON procedures(category_id);

-- Full-text search index for procedures
CREATE INDEX idx_procedures_search ON procedures USING GIN (
    to_tsvector('english', COALESCE(name, '') || ' ' || COALESCE(description, ''))
);

-- -----------------------------------------------------------------------------
-- Destinations Table
-- -----------------------------------------------------------------------------
CREATE TABLE destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_name TEXT NOT NULL,
    country_code TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    meta_title TEXT,
    meta_description TEXT,
    hero_image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_destinations_updated_at
    BEFORE UPDATE ON destinations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_destinations_slug ON destinations(slug);
CREATE INDEX idx_destinations_country_code ON destinations(country_code);

-- -----------------------------------------------------------------------------
-- Enquiries Table
-- -----------------------------------------------------------------------------
CREATE TABLE enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
    procedure_interest TEXT,
    willing_to_travel TEXT,
    preferred_destinations TEXT[] DEFAULT '{}',
    budget_range TEXT,
    timeline TEXT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT,
    status enquiry_status NOT NULL DEFAULT 'submitted',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_enquiries_updated_at
    BEFORE UPDATE ON enquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_enquiries_patient_user_id ON enquiries(patient_user_id);
CREATE INDEX idx_enquiries_clinic_id ON enquiries(clinic_id);
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_created_at ON enquiries(created_at DESC);

-- -----------------------------------------------------------------------------
-- Saved Clinics Table (Join table for user favourites)
-- -----------------------------------------------------------------------------
CREATE TABLE saved_clinics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, clinic_id)
);

CREATE TRIGGER update_saved_clinics_updated_at
    BEFORE UPDATE ON saved_clinics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_saved_clinics_user_id ON saved_clinics(user_id);
CREATE INDEX idx_saved_clinics_clinic_id ON saved_clinics(clinic_id);

-- -----------------------------------------------------------------------------
-- Clinic Procedures Table (Join table)
-- -----------------------------------------------------------------------------
CREATE TABLE clinic_procedures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
    procedure_id UUID NOT NULL REFERENCES procedures(id) ON DELETE CASCADE,
    price_min NUMERIC(10, 2),
    price_max NUMERIC(10, 2),
    currency TEXT NOT NULL DEFAULT 'EUR',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(clinic_id, procedure_id)
);

CREATE TRIGGER update_clinic_procedures_updated_at
    BEFORE UPDATE ON clinic_procedures
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_clinic_procedures_clinic_id ON clinic_procedures(clinic_id);
CREATE INDEX idx_clinic_procedures_procedure_id ON clinic_procedures(procedure_id);

-- -----------------------------------------------------------------------------
-- Clinic Categories Table (Join table)
-- -----------------------------------------------------------------------------
CREATE TABLE clinic_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(clinic_id, category_id)
);

CREATE TRIGGER update_clinic_categories_updated_at
    BEFORE UPDATE ON clinic_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_clinic_categories_clinic_id ON clinic_categories(clinic_id);
CREATE INDEX idx_clinic_categories_category_id ON clinic_categories(category_id);

-- -----------------------------------------------------------------------------
-- Clinic Photos Table
-- -----------------------------------------------------------------------------
CREATE TABLE clinic_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_clinic_photos_updated_at
    BEFORE UPDATE ON clinic_photos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_clinic_photos_clinic_id ON clinic_photos(clinic_id);
CREATE INDEX idx_clinic_photos_sort_order ON clinic_photos(clinic_id, sort_order);

-- -----------------------------------------------------------------------------
-- Google Reviews Table (Cached reviews from Google Places API)
-- -----------------------------------------------------------------------------
CREATE TABLE google_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID UNIQUE NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
    rating NUMERIC(2, 1),
    review_count INTEGER,
    reviews JSONB DEFAULT '[]',
    last_fetched TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_google_reviews_updated_at
    BEFORE UPDATE ON google_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_google_reviews_clinic_id ON google_reviews(clinic_id);
CREATE INDEX idx_google_reviews_rating ON google_reviews(rating DESC);

-- -----------------------------------------------------------------------------
-- Blog Posts Table
-- -----------------------------------------------------------------------------
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    excerpt TEXT,
    category TEXT,
    author TEXT,
    featured_image_url TEXT,
    published_at TIMESTAMPTZ,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- Full-text search index for blog posts
CREATE INDEX idx_blog_posts_search ON blog_posts USING GIN (
    to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(content, '') || ' ' || COALESCE(excerpt, ''))
);

-- =============================================================================
-- COMMENTS
-- =============================================================================

COMMENT ON TABLE users IS 'User accounts including patients, clinic managers, and admins';
COMMENT ON TABLE clinics IS 'Healthcare clinic profiles with location, services, and pricing';
COMMENT ON TABLE doctors IS 'Medical professionals associated with clinics';
COMMENT ON TABLE categories IS 'Treatment categories (e.g., Dental, Cosmetic, Orthopedic)';
COMMENT ON TABLE procedures IS 'Specific medical procedures within categories';
COMMENT ON TABLE destinations IS 'Countries/regions as medical tourism destinations';
COMMENT ON TABLE enquiries IS 'Patient enquiries submitted to clinics';
COMMENT ON TABLE saved_clinics IS 'User saved/favourite clinics';
COMMENT ON TABLE clinic_procedures IS 'Many-to-many relationship between clinics and procedures with pricing';
COMMENT ON TABLE clinic_categories IS 'Many-to-many relationship between clinics and categories';
COMMENT ON TABLE clinic_photos IS 'Photo gallery for clinics';
COMMENT ON TABLE google_reviews IS 'Cached Google Places reviews for clinics';
COMMENT ON TABLE blog_posts IS 'Blog content for SEO and patient education';
