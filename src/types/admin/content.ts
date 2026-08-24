import type { ContentStatus } from "./common";

export type ContentSection =
  | "hero"
  | "offer_banner"
  | "featured_products"
  | "collections"
  | "testimonials"
  | "about"
  | "instagram"
  | "blog";

export interface ContentBlock {
  id: string;
  section: ContentSection;
  imageUrl?: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  status: ContentStatus;
  order: number;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  coverImageUrl?: string;
  excerpt: string;
  author: string;
  status: ContentStatus;
  publishedAt?: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  avatarUrl?: string;
  rating: number;
  quote: string;
  status: ContentStatus;
}
