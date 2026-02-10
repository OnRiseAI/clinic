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
        source: '/hair-transplant/:path*',
        destination: '/procedures/hair-transplant/:path*',
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
      {
        source: '/clinics',
        destination: '/search',
        permanent: false, // Temporary until landing page built
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
    ]
  },
}

export default withNextIntl(nextConfig)
