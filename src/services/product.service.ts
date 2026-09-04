import { ApiError, apiFetch } from "@/lib/api";
import { getCategories, getCategoryById } from "@/services/category.service";
import type { Product } from "@/types/product";

interface BackendProductImage {
  id: number;
  media_asset_id: number;
  url: string;
  position: number;
  is_primary: boolean;
  alt_text: string | null;
}

interface BackendProductVariant {
  id: number;
  sku: string;
  attributes: Record<string, unknown>;
  price: number | null;
  image_url: string | null;
  is_active: boolean;
  stock: number;
}

interface BackendProduct {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string | null;
  base_price: number;
  compare_at_price: number | null;
  sku: string;
  is_active: boolean;
  images: BackendProductImage[];
  variants: BackendProductVariant[];
  stock: number | null;
}

interface BackendProductList {
  items: BackendProduct[];
  total: number;
  page: number;
  page_size: number;
}

async function mapProduct(product: BackendProduct): Promise<Product> {
  const category = await getCategoryById(product.category_id);
  const hasVariants = product.variants.length > 0;
  const inStock = hasVariants ? product.variants.some((v) => v.is_active && v.stock > 0) : (product.stock ?? 0) > 0;

  // Size comes from the variant's `attributes.size` (admin's Variants tab writes
  // this key) — dedupe in insertion order since attribute values aren't
  // uniqueness-constrained the way SKUs are.
  const sizes = Array.from(
    new Set(
      product.variants
        .filter((v) => v.is_active)
        .map((v) => v.attributes.size)
        .filter((size): size is string => typeof size === "string" && size.trim().length > 0),
    ),
  );

  return {
    id: String(product.id),
    slug: product.slug,
    name: product.name,
    category: category?.name ?? "",
    categorySlug: category?.slug ?? "",
    price: product.base_price,
    compareAtPrice: product.compare_at_price ?? undefined,
    description: product.description ?? "",
    images: [...product.images]
      .sort((a, b) => a.position - b.position)
      .map((image) => ({ url: image.url, altText: image.alt_text ?? undefined })),
    sizes: sizes.length > 0 ? sizes : undefined,
    inStock,
    // No backend field yet for these — real product content (story, metal,
    // purity, weight, marketing badges, collection curation) doesn't exist in
    // the catalog model, so these stay unset rather than fabricated. The PDP
    // already renders each conditionally.
  };
}

// Pages through the whole catalog at the backend's max page_size (100) —
// exhausts every page rather than assuming the catalog fits in one request.
async function fetchAllBackendProducts(categoryId?: number): Promise<BackendProduct[]> {
  const pageSize = 100;
  const all: BackendProduct[] = [];
  let page = 1;

  while (true) {
    const query = new URLSearchParams({ page: String(page), page_size: String(pageSize) });
    if (categoryId !== undefined) query.set("category_id", String(categoryId));
    const result = await apiFetch<BackendProductList>(`/products?${query.toString()}`, { auth: false });
    all.push(...result.items);
    if (result.items.length < pageSize || all.length >= result.total) break;
    page += 1;
  }

  return all;
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await fetchAllBackendProducts();
  return Promise.all(products.map(mapProduct));
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const product = await apiFetch<BackendProduct>(`/products/by-slug/${encodeURIComponent(slug)}`, {
      auth: false,
    });
    return await mapProduct(product);
  } catch (error) {
    // Only a genuine "no such product" (404) should read as undefined —
    // callers use that to trigger notFound(). Anything else (network down,
    // 5xx) gets rethrown so callers can tell "definitely doesn't exist" apart
    // from "couldn't check right now" instead of 404ing a real product during
    // a transient outage.
    if (error instanceof ApiError && error.status === 404) return undefined;
    throw error;
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return [];

  const products = await fetchAllBackendProducts(Number(category.id));
  return Promise.all(products.map(mapProduct));
}

export async function getProductsByCollection(_collectionSlug: string): Promise<Product[]> {
  // No collection-curation data in the backend yet — collections pages have
  // nothing real to show until that exists.
  return [];
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const all = await getAllProducts();
  const sameCategory = all.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const fallback = all.filter((p) => p.id !== product.id && !sameCategory.includes(p));
  return [...sameCategory, ...fallback].slice(0, limit);
}

// Placeholders until real sales/curation data exists: both just surface the
// most recently added products rather than fabricating a "bestseller" metric.
export async function getNewArrivals(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.slice(0, 4);
}

export async function getBestsellers(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.slice(0, 4);
}
