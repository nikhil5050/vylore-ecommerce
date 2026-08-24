import type { Category } from "@/types/category";

// Temporary frontend mock data — replace with Flask API calls once the backend exists.
const categories: Category[] = [
  { id: "1", slug: "rings", name: "Rings", description: "Sculpted silhouettes for every day and every occasion." },
  { id: "2", slug: "necklaces", name: "Necklaces", description: "Statement pieces that anchor an entire look." },
  { id: "3", slug: "earrings", name: "Earrings", description: "Precision-cut detail, from subtle to sculptural." },
  { id: "4", slug: "anklets", name: "Anklets", description: "Fine chainwork designed to move with you." },
  { id: "5", slug: "bracelets", name: "Bracelets", description: "Considered cuffs and chains for the wrist." },
];

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return categories.find((category) => category.slug === slug);
}
