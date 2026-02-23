import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  // Enable React strict mode for development
  reactStrictMode: true,

  // Image domains for external images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Experimental features
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Redirects to fix 404s
  async redirects() {
    return [
      // Legacy SEO URLs (shortened versions)
      {
        source: '/veneers/:path*',
        destination: '/procedures/veneers/:path*',
        permanent: true,
      },
      {
        source: '/dental-implants/:path*',
        destination: '/procedures/dental-implants/:path*',
        permanent: true,
      },
      {
        source: '/rhinoplasty/:path*',
        destination: '/procedures/rhinoplasty/:path*',
        permanent: true,
      },
      // Catch-all for handcrafted procedures to ensure canonical structure
      {
        source: '/dental/dental-implants',
        destination: '/procedures/dental-implants',
        permanent: true,
      },
      {
        source: '/dental/dental-veneers',
        destination: '/procedures/veneers',
        permanent: true,
      },
      {
        source: '/cosmetic-surgery/bbl',
        destination: '/procedures/bbl',
        permanent: true,
      },
      {
        source: '/cosmetic-surgery/blepharoplasty',
        destination: '/procedures/blepharoplasty',
        permanent: true,
      },
      {
        source: '/cosmetic-surgery/breast-augmentation',
        destination: '/procedures/breast-augmentation',
        permanent: true,
      },
      {
        source: '/cosmetic-surgery/breast-lift',
        destination: '/procedures/breast-lift',
        permanent: true,
      },
      {
        source: '/cosmetic-surgery/breast-reduction',
        destination: '/procedures/breast-reduction',
        permanent: true,
      },
      {
        source: '/cosmetic-surgery/brow-lift',
        destination: '/procedures/brow-lift',
        permanent: true,
      },
      {
        source: '/cosmetic-surgery/facelift',
        destination: '/procedures/facelift',
        permanent: true,
      },
      {
        source: '/cosmetic-surgery/liposuction',
        destination: '/procedures/liposuction',
        permanent: true,
      },
      {
        source: '/cosmetic-surgery/neck-lift',
        destination: '/procedures/neck-lift',
        permanent: true,
      },
      {
        source: '/cosmetic-surgery/rhinoplasty',
        destination: '/procedures/rhinoplasty',
        permanent: true,
      },
      {
        source: '/cosmetic-surgery/tummy-tuck',
        destination: '/procedures/tummy-tuck',
        permanent: true,
      },
      // Non-existent landing pages to search/procedures
      {
        source: '/treatments',
        destination: '/procedures',
        permanent: true,
      },
      // /search now redirects to new /clinics hub page
      {
        source: '/search',
        destination: '/clinics',
        permanent: true,
      },
      // Utility redirects
      {
        source: '/enquiry',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/claim',
        destination: '/list-your-clinic',
        permanent: true,
      },
      {
        source: '/auth/claim',
        destination: '/list-your-clinic',
        permanent: true,
      },

      // ── Legacy locale route cleanup (Ahrefs 404 remediation) ──
      // Specific known indexed /uk pages
      {
        source: '/uk',
        destination: '/',
        permanent: true,
      },
      {
        source: '/uk/about-visquanta',
        destination: '/about',
        permanent: true,
      },
      // Catch-all for any remaining /uk/* paths
      {
        source: '/uk/:path*',
        destination: '/:path*',
        permanent: true,
      },
      // Catch-all for any /ca/* paths (not an active locale)
      {
        source: '/ca',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ca/:path*',
        destination: '/:path*',
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
