import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import DentistryHero from "@/components/dentistry/DentistryHero";
import TrustBar from "@/components/dentistry/TrustBar";
import ClinicDirectory from "@/components/dentistry/ClinicDirectory";
import BenefitsAndCoordinator from "@/components/dentistry/BenefitsAndCoordinator";
import TrustedDoctors from "@/components/dentistry/TrustedDoctors";
import PricingTable from "@/components/dentistry/PricingTable";
import DentistryFAQ from "@/components/dentistry/DentistryFAQ";
import BlogCarousel from "@/components/dentistry/BlogCarousel";
import SEOContent from "@/components/dentistry/SEOContent";
import SoftExit from "@/components/dentistry/SoftExit";
import CountryLinks from "@/components/dentistry/CountryLinks";
import { DENTAL_CLINICS, DENTISTRY_FAQS } from "@/lib/dentistry/data";

// ─── SEO Metadata ────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://medit.com";

export const metadata: Metadata = {
  title: "Compare Trusted Dental Clinics | Verified Clinics & Pricing | medit",
  description:
    "Compare verified dental clinics offering implants, veneers, cosmetic dentistry and more. Transparent pricing, real patient reviews, and direct contact — no obligation.",
  keywords:
    "dental clinics, best dental clinics, dental treatment clinics, compare dental clinics, dental implants abroad, veneers abroad, dental tourism",
  openGraph: {
    title: "Compare Trusted Dental Clinics",
    description:
      "Find and compare verified dental clinics. Transparent pricing, real reviews, direct contact.",
    type: "website",
    url: `${SITE_URL}/clinics/dentistry`,
  },
  alternates: {
    canonical: `${SITE_URL}/clinics/dentistry`,
  },
};

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────

function buildJsonLd() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: DENTISTRY_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
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
      {
        "@type": "ListItem",
        position: 3,
        name: "Dental Clinics",
        item: `${SITE_URL}/clinics/dentistry`,
      },
    ],
  };

  return { faqJsonLd, breadcrumbJsonLd };
}

// ─── Page ────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function DentistryClinicCategoryPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { faqJsonLd, breadcrumbJsonLd } = buildJsonLd();

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Page Sections (no DentistryNav — medit layout provides header/footer) */}
      <DentistryHero />
      <TrustBar />
      <ClinicDirectory clinics={DENTAL_CLINICS} />
      <BenefitsAndCoordinator />
      <TrustedDoctors />
      <PricingTable />
      <DentistryFAQ faqs={DENTISTRY_FAQS} />
      <BlogCarousel />
      <SEOContent />
      <SoftExit />
      <CountryLinks />
    </>
  );
}
