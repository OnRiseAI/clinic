import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { createStaticClient } from '@/lib/supabase/static'
import { getCategoryConfig } from "@/lib/categories/config";
import {
  getClinicsForCategory,
  getCategoryPageStats,
  getCountryFiltersForCategory,
  getPricingForCategory,
} from "@/lib/data/category-page";
import CategoryHero from "@/components/category/CategoryHero";
import TrustBar from "@/components/category/TrustBar";
import ClinicDirectory from "@/components/category/ClinicDirectory";
import BenefitsAndCoordinator from "@/components/category/BenefitsAndCoordinator";
import TrustedDoctors, { deriveDoctors } from "@/components/category/TrustedDoctors";
import PricingTable from "@/components/category/PricingTable";
import CategoryFAQ from "@/components/category/CategoryFAQ";
import BlogCarousel from "@/components/category/BlogCarousel";
import SEOContent from "@/components/category/SEOContent";
import SoftExit from "@/components/category/SoftExit";
import CountryLinks from "@/components/category/CountryLinks";

// ─── SEO Metadata ────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://medit.com";

interface PageProps {
  params: Promise<{ locale: string; category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const config = getCategoryConfig(category);
  if (!config) return {};

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: config.metaKeywords,
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      type: "website",
      url: `${SITE_URL}/clinics/${category}`,
    },
    alternates: {
      canonical: `${SITE_URL}/clinics/${category}`,
    },
  };
}

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────

function buildJsonLd(config: ReturnType<typeof getCategoryConfig>) {
  if (!config) return { faqJsonLd: null, breadcrumbJsonLd: null };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((faq) => ({
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
        name: config.namePlural,
        item: `${SITE_URL}/clinics/${config.slug}`,
      },
    ],
  };

  return { faqJsonLd, breadcrumbJsonLd };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function CategoryDirectoryPage({ params }: PageProps) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  const config = getCategoryConfig(category);
  if (!config) {
    // Fallback: Check if this "category" is actually a clinic slug or a country slug
    const supabase = createStaticClient();

    // Check for clinic
    const { data: clinic } = await supabase
      .from('clinics')
      .select('slug, clinic_categories(category:categories(slug))')
      .eq('slug', category)
      .single();

    if (clinic) {
      const actualCategory = (clinic as any).clinic_categories?.[0]?.category?.slug || 'dental';
      redirect(`/clinics/${actualCategory}/${category}`);
    }

    // Check for country
    const { data: country } = await supabase
      .from('countries')
      .select('slug')
      .eq('slug', category)
      .single();

    if (country) {
      redirect(`/search?country=${category}`);
    }

    notFound();
  }

  // Parallel data fetching
  const [clinics, stats, countryFilters, procedures] = await Promise.all([
    getClinicsForCategory(category, 20),
    getCategoryPageStats(category),
    getCountryFiltersForCategory(category),
    getPricingForCategory(category),
  ]);

  const { faqJsonLd, breadcrumbJsonLd } = buildJsonLd(config);
  const doctors = deriveDoctors(clinics);

  return (
    <>
      {/* Structured Data */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}

      {/* Page Sections */}
      <CategoryHero config={config} stats={stats} />
      <TrustBar stats={stats} />
      <ClinicDirectory
        clinics={clinics}
        categorySlug={category}
        countryFilters={countryFilters}
        config={config}
      />
      <BenefitsAndCoordinator />
      <TrustedDoctors doctors={doctors} categorySlug={category} />
      <PricingTable procedures={procedures} categoryName={config.name} />
      <CategoryFAQ faqs={config.faqs} faqIntro={config.faqIntro} />
      <BlogCarousel />
      <SEOContent blocks={config.seoBlocks} />
      <SoftExit />
      <CountryLinks
        countries={config.countryLinks}
        procedures={config.relatedTreatments}
        categorySlug={category}
        categoryName={config.name}
      />
    </>
  );
}
