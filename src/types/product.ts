export type ProductBadge = "NEW" | "BESTSELLER" | "SIGNATURE" | "LIMITED";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  story?: string;
  metal?: string;
  // purity/weight are left unset until confirmed product data exists — the PDP
  // only renders these rows when a value is present.
  purity?: string;
  weight?: number;
  sizes?: string[];
  badge?: ProductBadge;
  inStock: boolean;
  collectionSlugs?: string[];
}
