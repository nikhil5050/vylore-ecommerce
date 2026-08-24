import type { BlogArticle, ContentBlock, Testimonial } from "@/types/admin";

export const mockContentBlocks: ContentBlock[] = [
  { id: "cnt-hero", section: "hero", title: "Built on Legacy. Designed for What's Next.", subtitle: "Our Story", description: "Twenty-five years of family jewellery craft, reimagined for a new generation.", ctaText: "Explore Collection", ctaLink: "/collections", status: "active", order: 1 },
  { id: "cnt-offer-banner", section: "offer_banner", title: "Festive Silver Edit", subtitle: "Up to 25% Off", ctaText: "Shop Now", ctaLink: "/collections/festive-edit", status: "active", order: 1 },
  { id: "cnt-featured-1", section: "featured_products", title: "Bestsellers", description: "Our most-loved pieces this month.", status: "active", order: 1 },
  { id: "cnt-featured-2", section: "featured_products", title: "New Arrivals", description: "Fresh drops in 925 silver.", status: "active", order: 2 },
  { id: "cnt-collections", section: "collections", title: "Signature Edit", description: "Considered, distinctive, made without compromise.", status: "active", order: 1 },
  { id: "cnt-about", section: "about", title: "No Compromise", description: "Every piece is hand-finished in 925 sterling silver.", status: "active", order: 1 },
  { id: "cnt-instagram", section: "instagram", title: "@vylorejewellery", description: "Follow us for styling edits and new drops.", status: "active", order: 1 },
];

export const mockTestimonials: Testimonial[] = [
  { id: "test-001", customerName: "Priya Sharma", rating: 5, quote: "The finish and detailing are stunning — feels far more premium than the price suggests.", status: "active" },
  { id: "test-002", customerName: "Riya Mehta", rating: 5, quote: "My go-to for gifting. Packaging and delivery are always on point.", status: "active" },
  { id: "test-003", customerName: "Meera Joshi", rating: 4, quote: "Beautiful pieces, though I wish there were more ring sizes.", status: "active" },
  { id: "test-004", customerName: "Divya Patel", rating: 5, quote: "Bought the temple necklace for a wedding — got so many compliments.", status: "draft" },
];

export const mockBlogArticles: BlogArticle[] = [
  { id: "blog-001", title: "How to Care for Your Silver Jewellery", slug: "how-to-care-for-silver-jewellery", excerpt: "Simple habits to keep your 925 silver pieces looking new for years.", author: "Vylore Editorial", status: "active", publishedAt: "2026-07-12" },
  { id: "blog-002", title: "Styling Silver for Festive Season", slug: "styling-silver-for-festive-season", excerpt: "Layering tips for necklaces, bangles and earrings this festive season.", author: "Vylore Editorial", status: "active", publishedAt: "2026-08-05" },
  { id: "blog-003", title: "Inside the Vylore Workshop", slug: "inside-the-vylore-workshop", excerpt: "A look at how our pieces go from sketch to finished jewellery.", author: "Vylore Editorial", status: "draft" },
];
