import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  getHubStats,
  getBrowseCategories,
  getBrowseDestinations,
  getHubClinics,
  getHubCountryFilters,
  getHubPricing,
  getHubReviews,
  getHubInternalLinks,
} from "@/lib/data/clinics-hub";
import ClinicsHubClient from "./clinics-hub-client";

// =============================================================================
// SEO METADATA
// =============================================================================

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://meetyourclinic.com";

export const metadata: Metadata = {
  title: "Best Clinics Worldwide | Compare Verified Clinics & Prices | MeetYourClinic",
  description:
    "Discover 800+ verified clinics across 17+ countries. Compare prices, read real patient reviews, and connect directly with accredited clinics. Dental, cosmetic surgery, hair transplant & more.",
  keywords: [
    "clinics abroad",
    "medical tourism",
    "dental clinics",
    "cosmetic surgery clinics",
    "hair transplant clinics",
    "best clinics worldwide",
    "compare clinic prices",
    "accredited clinics",
    "verified clinics",
    "treatment abroad",
  ],
  openGraph: {
    title: "Best Clinics Worldwide | Compare Verified Clinics & Prices",
    description:
      "Discover 800+ verified clinics across 17+ countries. Compare prices, read patient reviews, and connect directly.",
    type: "website",
    url: `${SITE_URL}/clinics`,
  },
  alternates: {
    canonical: `${SITE_URL}/clinics`,
  },
};

// =============================================================================
// STRUCTURED DATA
// =============================================================================

function buildJsonLd(clinicCount: number, countryCount: number) {
  return {
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Clinics",
          item: `${SITE_URL}/clinics`,
        },
      ],
    },
    collection: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Best Clinics Worldwide",
      description: `Compare ${clinicCount}+ verified clinics across ${countryCount}+ countries`,
      url: `${SITE_URL}/clinics`,
      publisher: {
        "@type": "Organization",
        name: "MeetYourClinic",
        url: SITE_URL,
      },
    },
  };
}

// =============================================================================
// PAGE
// =============================================================================

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ClinicsHubPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Parallel data fetching
  const [
    stats,
    categories,
    destinations,
    clinics,
    countryFilters,
    pricing,
    reviews,
    internalLinks,
  ] = await Promise.all([
    getHubStats(),
    getBrowseCategories(),
    getBrowseDestinations(),
    getHubClinics(30),
    getHubCountryFilters(),
    getHubPricing(),
    getHubReviews(12),
    getHubInternalLinks(),
  ]);

  const jsonLd = buildJsonLd(stats.clinicCount, stats.countries);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.collection) }}
      />

      {/* Page Content */}
      <ClinicsHubClient
        clinics={clinics}
        stats={stats}
        categories={categories}
        destinations={destinations}
        countryFilters={countryFilters}
        pricing={pricing}
        reviews={reviews}
        internalLinks={internalLinks}
      />
    </>
  );
}
