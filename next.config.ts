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
      // Crawl remediation: legacy and dead paths from SEO audit
      {
        source: '/cosmetic',
        destination: '/cosmetic-surgery',
        permanent: true,
      },
      {
        source: '/hair-transplant/turkey',
        destination: '/hair-transplant',
        permanent: true,
      },
      // Legacy blog slugs
      {
        source: '/blog/medical-tourism-costa-del-sol-2026',
        destination: '/blog/medical-tourism-trends-2026',
        permanent: true,
      },
      {
        source: '/blog/complete-guide-to-dental-implants-in-turkey-2026',
        destination: '/blog/dental-implants-turkey-2026-guide',
        permanent: true,
      },
      // Legacy clinic profile slugs (now consolidated)
      {
        source: '/clinics/cosmetic-surgery/estethica-medical-group',
        destination: '/clinics/cosmetic-surgery/istanbul-aesthetics-center',
        permanent: true,
      },
      {
        source: '/clinics/dental/istanbul-smile-center',
        destination: '/clinics/dental/hisar-hospital-intercontinental',
        permanent: true,
      },
      {
        source: '/clinics/dental/budapest-dental-clinic',
        destination: '/clinics/dental/hisar-hospital-intercontinental',
        permanent: true,
      },
      {
        source: '/clinics/bariatric-surgery/kcm-clinic',
        destination: '/clinics/bariatric-surgery/clinic-center',
        permanent: true,
      },
      // Legacy single-segment clinic slugs from static landing pages
      {
        source: '/clinics/:slug(acibadem|memorial|medicana|florence-nightingale|esteworld|estethica|akdeniz|medworld|warsaw-plastic-surgery|krakow-cosmetic|clinicforyou|coramed|kcm-clinic|lipoline|beauty-hungary|szeptest|pataki|mona-lisa-centrum|dolemed|liv-duna|wellness-kliniek|quironsalud-barcelona|quironsalud-madrid|clinica-menorca|marbella-cosmetic|ocean-clinic)',
        destination: '/clinics/cosmetic-surgery/clinic-center',
        permanent: true,
      },
      {
        source: '/clinics/:slug(centro-medico-teknon|puyuelo-dental-clinic|nart-clinica-dental|catar-clinica-dental)',
        destination: '/clinics/dental/hisar-hospital-intercontinental',
        permanent: true,
      },
      // Legacy procedures now handled by category hubs
      {
        source: '/procedures/:slug(dental-crowns|porcelain-veneers|dental-bridges|cosmetic-dentistry|root-canal|hollywood-smile|full-mouth-restoration|all-on-4|teeth-whitening|orthodontics|invisalign)',
        destination: '/clinics/dental',
        permanent: true,
      },
      {
        source: '/procedures/:slug(fue-hair-transplant|dhi-hair-transplant|beard-transplant|eyebrow-transplant|hair-transplant)',
        destination: '/hair-transplant',
        permanent: true,
      },
      {
        source: '/procedures/:slug(spinal-surgery|physiotherapy-rehabilitation|acl-reconstruction|knee-replacement|shoulder-surgery|hip-replacement)',
        destination: '/clinics/orthopaedic-surgery',
        permanent: true,
      },
      {
        source: '/procedures/:slug(lens-replacement|lasik-eye-surgery|cataract-surgery)',
        destination: '/clinics/eye-surgery',
        permanent: true,
      },
      {
        source: '/procedures/:slug(dermatology-treatment|varicose-vein-treatment|stem-cell-therapy|health-check-up)',
        destination: '/clinics/other-treatments',
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
