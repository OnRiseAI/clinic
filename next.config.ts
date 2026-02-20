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
