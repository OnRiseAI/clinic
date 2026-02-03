-- =============================================================================
-- BLOG TABLES FOR SEO/GEO/AEO CONTENT STRATEGY
-- =============================================================================

-- Blog categories
CREATE TABLE IF NOT EXISTS blog_categories (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author_name TEXT NOT NULL DEFAULT 'MediTravel Team',
  author_image TEXT,
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  category TEXT REFERENCES blog_categories(slug),
  category_slug TEXT REFERENCES blog_categories(slug),
  reading_time INTEGER,
  meta_title TEXT,
  meta_description TEXT,
  is_featured BOOLEAN DEFAULT FALSE
);

-- Blog tags
CREATE TABLE IF NOT EXISTS blog_tags (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

-- Blog post tags (many-to-many)
CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_slug TEXT REFERENCES blog_tags(slug) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_slug)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_featured ON blog_posts(is_featured) WHERE is_featured = TRUE;

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_posts_updated_at();

-- Sync category and category_slug
CREATE OR REPLACE FUNCTION sync_blog_post_category()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.category_slug IS NOT NULL AND NEW.category IS NULL THEN
    SELECT name INTO NEW.category FROM blog_categories WHERE slug = NEW.category_slug;
  ELSIF NEW.category IS NOT NULL AND NEW.category_slug IS NULL THEN
    SELECT slug INTO NEW.category_slug FROM blog_categories WHERE name = NEW.category;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blog_post_category_sync ON blog_posts;
CREATE TRIGGER blog_post_category_sync
  BEFORE INSERT OR UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION sync_blog_post_category();

-- =============================================================================
-- SEED INITIAL CATEGORIES
-- =============================================================================

INSERT INTO blog_categories (slug, name, description) VALUES
  ('destinations', 'Destinations', 'Guides to medical tourism destinations around the world'),
  ('procedures', 'Procedures', 'In-depth information about medical procedures abroad'),
  ('patient-stories', 'Patient Stories', 'Real experiences from medical tourists'),
  ('travel-tips', 'Travel Tips', 'Practical advice for planning your medical trip'),
  ('cost-guides', 'Cost Guides', 'Price comparisons and budget planning'),
  ('safety', 'Safety & Quality', 'Information about safety standards and accreditations')
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Public can read published blog posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

-- Public can read categories and tags
CREATE POLICY "Public can read blog categories"
  ON blog_categories FOR SELECT
  USING (true);

CREATE POLICY "Public can read blog tags"
  ON blog_tags FOR SELECT
  USING (true);

CREATE POLICY "Public can read blog post tags"
  ON blog_post_tags FOR SELECT
  USING (true);

-- Admins can manage everything (you'd need to define admin role)
-- CREATE POLICY "Admins can manage blog posts"
--   ON blog_posts FOR ALL
--   USING (auth.jwt() ->> 'role' = 'admin');
