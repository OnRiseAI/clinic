-- MediTravel Row Level Security (RLS) Policies
-- Version: 1.0.0
-- Description: Security policies for the medical tourism platform

-- =============================================================================
-- ENABLE RLS ON ALL TABLES
-- =============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinic_procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinic_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinic_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- HELPER FUNCTIONS FOR RLS
-- =============================================================================

-- Get user role from users table
CREATE OR REPLACE FUNCTION get_user_role(user_id UUID)
RETURNS user_role AS $$
    SELECT role FROM users WHERE id = user_id;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Check if user owns a clinic
CREATE OR REPLACE FUNCTION user_owns_clinic(user_id UUID, check_clinic_id UUID)
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM clinics
        WHERE id = check_clinic_id AND clinics.user_id = user_id
    );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM users
        WHERE id = user_id AND role = 'admin'
    );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- =============================================================================
-- USERS TABLE POLICIES
-- =============================================================================

-- Users can read their own profile
CREATE POLICY users_select_own ON users
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY users_update_own ON users
    FOR UPDATE USING (auth.uid() = id);

-- Admin can read all users
CREATE POLICY users_admin_select ON users
    FOR SELECT USING (is_admin(auth.uid()));

-- Admin can update all users
CREATE POLICY users_admin_update ON users
    FOR UPDATE USING (is_admin(auth.uid()));

-- Admin can delete users
CREATE POLICY users_admin_delete ON users
    FOR DELETE USING (is_admin(auth.uid()));

-- Allow insert during signup (handled by auth trigger)
CREATE POLICY users_insert ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- =============================================================================
-- CLINICS TABLE POLICIES
-- =============================================================================

-- Public: Anyone can read clinics
CREATE POLICY clinics_public_select ON clinics
    FOR SELECT USING (true);

-- Clinic owners can update their own clinic
CREATE POLICY clinics_owner_update ON clinics
    FOR UPDATE USING (
        auth.uid() = user_id OR is_admin(auth.uid())
    );

-- Admin can insert clinics
CREATE POLICY clinics_admin_insert ON clinics
    FOR INSERT WITH CHECK (is_admin(auth.uid()));

-- Admin can delete clinics
CREATE POLICY clinics_admin_delete ON clinics
    FOR DELETE USING (is_admin(auth.uid()));

-- =============================================================================
-- DOCTORS TABLE POLICIES
-- =============================================================================

-- Public: Anyone can read doctors
CREATE POLICY doctors_public_select ON doctors
    FOR SELECT USING (true);

-- Clinic owners can manage their doctors
CREATE POLICY doctors_owner_insert ON doctors
    FOR INSERT WITH CHECK (
        user_owns_clinic(auth.uid(), clinic_id) OR is_admin(auth.uid())
    );

CREATE POLICY doctors_owner_update ON doctors
    FOR UPDATE USING (
        user_owns_clinic(auth.uid(), clinic_id) OR is_admin(auth.uid())
    );

CREATE POLICY doctors_owner_delete ON doctors
    FOR DELETE USING (
        user_owns_clinic(auth.uid(), clinic_id) OR is_admin(auth.uid())
    );

-- =============================================================================
-- CATEGORIES TABLE POLICIES
-- =============================================================================

-- Public: Anyone can read categories
CREATE POLICY categories_public_select ON categories
    FOR SELECT USING (true);

-- Admin only: Manage categories
CREATE POLICY categories_admin_insert ON categories
    FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY categories_admin_update ON categories
    FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY categories_admin_delete ON categories
    FOR DELETE USING (is_admin(auth.uid()));

-- =============================================================================
-- PROCEDURES TABLE POLICIES
-- =============================================================================

-- Public: Anyone can read procedures
CREATE POLICY procedures_public_select ON procedures
    FOR SELECT USING (true);

-- Admin only: Manage procedures
CREATE POLICY procedures_admin_insert ON procedures
    FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY procedures_admin_update ON procedures
    FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY procedures_admin_delete ON procedures
    FOR DELETE USING (is_admin(auth.uid()));

-- =============================================================================
-- DESTINATIONS TABLE POLICIES
-- =============================================================================

-- Public: Anyone can read destinations
CREATE POLICY destinations_public_select ON destinations
    FOR SELECT USING (true);

-- Admin only: Manage destinations
CREATE POLICY destinations_admin_insert ON destinations
    FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY destinations_admin_update ON destinations
    FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY destinations_admin_delete ON destinations
    FOR DELETE USING (is_admin(auth.uid()));

-- =============================================================================
-- ENQUIRIES TABLE POLICIES
-- =============================================================================

-- Patients can read their own enquiries
CREATE POLICY enquiries_patient_select ON enquiries
    FOR SELECT USING (
        patient_user_id = auth.uid()
    );

-- Patients can create enquiries
CREATE POLICY enquiries_patient_insert ON enquiries
    FOR INSERT WITH CHECK (
        patient_user_id IS NULL OR patient_user_id = auth.uid()
    );

-- Clinic owners can read enquiries for their clinics
CREATE POLICY enquiries_clinic_select ON enquiries
    FOR SELECT USING (
        user_owns_clinic(auth.uid(), clinic_id)
    );

-- Clinic owners can update enquiry status for their clinics
CREATE POLICY enquiries_clinic_update ON enquiries
    FOR UPDATE USING (
        user_owns_clinic(auth.uid(), clinic_id)
    );

-- Admin can read all enquiries
CREATE POLICY enquiries_admin_select ON enquiries
    FOR SELECT USING (is_admin(auth.uid()));

-- Admin can update all enquiries
CREATE POLICY enquiries_admin_update ON enquiries
    FOR UPDATE USING (is_admin(auth.uid()));

-- Admin can delete enquiries
CREATE POLICY enquiries_admin_delete ON enquiries
    FOR DELETE USING (is_admin(auth.uid()));

-- =============================================================================
-- SAVED CLINICS TABLE POLICIES
-- =============================================================================

-- Users can read their own saved clinics
CREATE POLICY saved_clinics_select_own ON saved_clinics
    FOR SELECT USING (user_id = auth.uid());

-- Users can save clinics (insert)
CREATE POLICY saved_clinics_insert_own ON saved_clinics
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can unsave clinics (delete)
CREATE POLICY saved_clinics_delete_own ON saved_clinics
    FOR DELETE USING (user_id = auth.uid());

-- Admin can manage all saved clinics
CREATE POLICY saved_clinics_admin_all ON saved_clinics
    FOR ALL USING (is_admin(auth.uid()));

-- =============================================================================
-- CLINIC PROCEDURES TABLE POLICIES
-- =============================================================================

-- Public: Anyone can read clinic procedures
CREATE POLICY clinic_procedures_public_select ON clinic_procedures
    FOR SELECT USING (true);

-- Clinic owners can manage their procedure associations
CREATE POLICY clinic_procedures_owner_insert ON clinic_procedures
    FOR INSERT WITH CHECK (
        user_owns_clinic(auth.uid(), clinic_id) OR is_admin(auth.uid())
    );

CREATE POLICY clinic_procedures_owner_update ON clinic_procedures
    FOR UPDATE USING (
        user_owns_clinic(auth.uid(), clinic_id) OR is_admin(auth.uid())
    );

CREATE POLICY clinic_procedures_owner_delete ON clinic_procedures
    FOR DELETE USING (
        user_owns_clinic(auth.uid(), clinic_id) OR is_admin(auth.uid())
    );

-- =============================================================================
-- CLINIC CATEGORIES TABLE POLICIES
-- =============================================================================

-- Public: Anyone can read clinic categories
CREATE POLICY clinic_categories_public_select ON clinic_categories
    FOR SELECT USING (true);

-- Clinic owners can manage their category associations
CREATE POLICY clinic_categories_owner_insert ON clinic_categories
    FOR INSERT WITH CHECK (
        user_owns_clinic(auth.uid(), clinic_id) OR is_admin(auth.uid())
    );

CREATE POLICY clinic_categories_owner_update ON clinic_categories
    FOR UPDATE USING (
        user_owns_clinic(auth.uid(), clinic_id) OR is_admin(auth.uid())
    );

CREATE POLICY clinic_categories_owner_delete ON clinic_categories
    FOR DELETE USING (
        user_owns_clinic(auth.uid(), clinic_id) OR is_admin(auth.uid())
    );

-- =============================================================================
-- CLINIC PHOTOS TABLE POLICIES
-- =============================================================================

-- Public: Anyone can read clinic photos
CREATE POLICY clinic_photos_public_select ON clinic_photos
    FOR SELECT USING (true);

-- Clinic owners can manage their photos
CREATE POLICY clinic_photos_owner_insert ON clinic_photos
    FOR INSERT WITH CHECK (
        user_owns_clinic(auth.uid(), clinic_id) OR is_admin(auth.uid())
    );

CREATE POLICY clinic_photos_owner_update ON clinic_photos
    FOR UPDATE USING (
        user_owns_clinic(auth.uid(), clinic_id) OR is_admin(auth.uid())
    );

CREATE POLICY clinic_photos_owner_delete ON clinic_photos
    FOR DELETE USING (
        user_owns_clinic(auth.uid(), clinic_id) OR is_admin(auth.uid())
    );

-- =============================================================================
-- GOOGLE REVIEWS TABLE POLICIES
-- =============================================================================

-- Public: Anyone can read google reviews
CREATE POLICY google_reviews_public_select ON google_reviews
    FOR SELECT USING (true);

-- Admin only: Manage google reviews (system updates)
CREATE POLICY google_reviews_admin_insert ON google_reviews
    FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY google_reviews_admin_update ON google_reviews
    FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY google_reviews_admin_delete ON google_reviews
    FOR DELETE USING (is_admin(auth.uid()));

-- =============================================================================
-- BLOG POSTS TABLE POLICIES
-- =============================================================================

-- Public: Anyone can read published blog posts
CREATE POLICY blog_posts_public_select ON blog_posts
    FOR SELECT USING (published_at IS NOT NULL AND published_at <= NOW());

-- Admin can read all blog posts (including unpublished)
CREATE POLICY blog_posts_admin_select ON blog_posts
    FOR SELECT USING (is_admin(auth.uid()));

-- Admin only: Manage blog posts
CREATE POLICY blog_posts_admin_insert ON blog_posts
    FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY blog_posts_admin_update ON blog_posts
    FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY blog_posts_admin_delete ON blog_posts
    FOR DELETE USING (is_admin(auth.uid()));

-- =============================================================================
-- STORAGE POLICIES (for Supabase Storage buckets)
-- =============================================================================

-- Note: These need to be applied through Supabase dashboard or SQL
-- Bucket: clinic-photos
-- Bucket: doctor-photos
-- Bucket: blog-images

-- Example storage policies (apply in Supabase dashboard):
/*
-- clinic-photos bucket
-- Public read
CREATE POLICY "Public can view clinic photos" ON storage.objects
    FOR SELECT USING (bucket_id = 'clinic-photos');

-- Clinic owners can upload/delete their photos
CREATE POLICY "Clinic owners can upload photos" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'clinic-photos' AND
        EXISTS (
            SELECT 1 FROM clinics
            WHERE clinics.user_id = auth.uid()
            AND storage.foldername(name) = clinics.id::text
        )
    );

CREATE POLICY "Clinic owners can delete photos" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'clinic-photos' AND
        EXISTS (
            SELECT 1 FROM clinics
            WHERE clinics.user_id = auth.uid()
            AND storage.foldername(name) = clinics.id::text
        )
    );
*/
