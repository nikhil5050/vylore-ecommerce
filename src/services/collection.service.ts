import type { Collection } from "@/types/collection";

// Temporary frontend mock data — replace with Flask API calls once the backend exists.
const collections: Collection[] = [
  { id: "1", slug: "signature-silver", name: "Signature Silver", description: "The pieces that define the Vylore silhouette." },
  { id: "2", slug: "everyday-icons", name: "Everyday Icons", description: "Considered essentials for daily wear." },
  { id: "3", slug: "statement-pieces", name: "Statement Pieces", description: "Bold forms for moments that call for more." },
];

export async function getFeaturedCollections(): Promise<Collection[]> {
  return collections;
}

export async function getCollectionBySlug(slug: string): Promise<Collection | undefined> {
  return collections.find((collection) => collection.slug === slug);
}
