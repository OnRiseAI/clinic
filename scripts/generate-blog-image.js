/**
 * Fetch blog featured image from Unsplash and upload to Supabase Storage
 *
 * Usage:
 *   node scripts/generate-blog-image.js <slug> <search-query> [index]
 *
 * Examples:
 *   node scripts/generate-blog-image.js hair-transplant-turkey-2026-guide "istanbul skyline sunset" 1
 *   node scripts/generate-blog-image.js dental-implants-abroad "dental clinic modern" 0
 *
 * The optional [index] lets you pick which Unsplash result to use (0-4, default 0).
 */

const UNSPLASH_ACCESS_KEY = '7TokQS4DkSVXdC8sMgbWJ2Wuvhhr4r0zyn31kbZytLo';
const SUPABASE_URL = 'https://dpewhfmgipjympxlxwij.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwZXdoZm1naXBqeW1weGx4d2lqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk2OTk5NiwiZXhwIjoyMDg1NTQ1OTk2fQ.mycYLyfT1MnCM0_A2PwRZEHiUVSiU6BywWGv4y0j5Lc';

async function searchUnsplash(query, index = 0) {
  console.log(`  Searching Unsplash for: "${query}" (picking result #${index})`);
  const params = new URLSearchParams({
    query,
    per_page: '5',
    orientation: 'landscape',
    content_filter: 'high',
  });

  const res = await fetch(`https://api.unsplash.com/search/photos?${params}`, {
    headers: { 'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}` },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Unsplash API error (${res.status}): ${err}`);
  }

  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error(`No Unsplash results found for: "${query}"`);
  }

  if (index >= data.results.length) {
    console.log(`  Index ${index} out of range, using 0`);
    index = 0;
  }

  const photo = data.results[index];
  return {
    id: photo.id,
    downloadUrl: `${photo.urls.raw}&w=1600&h=900&fit=crop&q=80`,
    photographer: photo.user.name,
    photographerUrl: photo.user.links.html,
    unsplashUrl: photo.links.html,
    description: photo.description || photo.alt_description || query,
  };
}

async function triggerUnsplashDownload(photo) {
  // Unsplash API guidelines require triggering a download event
  // when using an image (not just hotlinking)
  try {
    const res = await fetch(`https://api.unsplash.com/photos/${photo.id}/download`, {
      headers: { 'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}` },
    });
  } catch (_) {
    // Non-critical, continue
  }
}

async function downloadImage(url) {
  console.log('  Downloading image...');
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed (${res.status})`);

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function uploadToSupabase(bucket, filePath, imageBuffer, contentType) {
  console.log(`  Uploading to Supabase Storage: ${bucket}/${filePath}`);
  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${bucket}/${filePath}`,
    {
      method: 'POST',
      headers: {
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': contentType || 'image/jpeg',
        'x-upsert': 'true',
      },
      body: imageBuffer,
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Upload failed (${res.status}): ${err}`);
  }

  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${filePath}`;
}

async function updateBlogPostImage(slug, imageUrl) {
  console.log('  Updating blog post image_url...');
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${slug}`,
    {
      method: 'PATCH',
      headers: {
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({ image_url: imageUrl }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Update failed (${res.status}): ${err}`);
  }

  return await res.json();
}

async function main() {
  const slug = process.argv[2];
  const query = process.argv[3];
  const index = parseInt(process.argv[4] || '0', 10);

  if (!slug || !query) {
    console.log('Usage: node scripts/generate-blog-image.js <slug> <search-query> [index]');
    console.log('Example: node scripts/generate-blog-image.js hair-transplant-turkey-2026-guide "istanbul skyline sunset" 1');
    process.exit(1);
  }

  console.log('\n=== Blog Image (Unsplash) ===\n');

  // Step 1: Search Unsplash
  console.log('1. Finding image on Unsplash...');
  const photo = await searchUnsplash(query, index);
  console.log(`  Found: "${photo.description}"`);
  console.log(`  Photographer: ${photo.photographer} (${photo.photographerUrl})`);

  // Step 2: Download the image
  console.log('\n2. Downloading image...');
  const imageBuffer = await downloadImage(photo.downloadUrl);
  console.log(`  Downloaded (${(imageBuffer.length / 1024).toFixed(0)} KB)`);

  // Step 3: Upload to Supabase Storage
  console.log('\n3. Uploading to Supabase Storage...');
  const imageUrl = await uploadToSupabase(
    'blog-images',
    `${slug}.jpg`,
    imageBuffer,
    'image/jpeg'
  );
  console.log(`  Public URL: ${imageUrl}`);

  // Step 4: Update the blog post
  console.log('\n4. Updating blog post...');
  const result = await updateBlogPostImage(slug, imageUrl);
  console.log(`  Updated: ${result[0]?.title}`);

  console.log('\n=== DONE ===');
  console.log(`Image: ${imageUrl}`);
  console.log(`Credit: Photo by ${photo.photographer} on Unsplash`);
  console.log(`  ${photo.photographerUrl}?utm_source=meetyourclinic&utm_medium=referral`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
