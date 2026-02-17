// Blog Template System — Type Definitions

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  content: string; // Markdown
  excerpt: string;
  category: string;
  tags: string[];
  keywords: string[];
  reading_time: number;
  author: string;
  schema_json: ArticleSchema;
  faq_schema: FaqItem[];
  featured_image?: string;
  created_at: string;
  updated_at: string;
  published: boolean;
}

export interface ArticleSchema {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  author: { "@type": string; name: string };
  publisher: { "@type": string; name: string };
  datePublished: string;
  dateModified: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TocItem {
  id: string;
  label: string;
  level: number; // 2 or 3
}

export interface CostRow {
  type: string;
  ukPrice: string;
  turkeyPrice: string;
  savings: string;
  popular?: boolean;
}

export interface TimelineStep {
  day: string;
  title: string;
  description: string;
  icon?: "plane" | "tooth" | "lab" | "smile" | "check";
}

export interface Testimonial {
  name: string;
  city: string;
  treatment: string;
  year: string;
  text: string;
  rating?: number;
}

export interface BlogHeroProps {
  title: string;
  excerpt: string;
  category: string;
  readingTime: number;
  updatedAt: string;
  breadcrumbs: { label: string; href?: string }[];
}

export interface BlogCtaProps {
  variant: "dark" | "light";
  headline: string;
  subheadline?: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export interface WarningBoxProps {
  variant: "amber" | "red";
  title: string;
  children: React.ReactNode;
}
