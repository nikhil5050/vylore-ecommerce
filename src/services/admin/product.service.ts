import { apiFetch } from "@/lib/api";
import { getAdminCategories } from "@/services/admin/category.service";
import { LOW_STOCK_THRESHOLD } from "@/lib/admin/constants";
import type { AdminCategory, Product, ProductImage, ProductListItem, ProductVariant, StockStatus } from "@/types/admin";

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
  created_at: string;
  updated_at: string;
}

interface BackendProductList {
  items: BackendProduct[];
  total: number;
  page: number;
  page_size: number;
}

function mapImage(image: BackendProductImage): ProductImage {
  return {
    id: String(image.id),
    mediaAssetId: String(image.media_asset_id),
    url: image.url,
    position: image.position,
    isPrimary: image.is_primary,
    altText: image.alt_text ?? undefined,
  };
}

function mapVariant(variant: BackendProductVariant): ProductVariant {
  const attributes = variant.attributes ?? {};
  return {
    id: String(variant.id),
    sku: variant.sku,
    size: typeof attributes.size === "string" ? attributes.size : undefined,
    material: typeof attributes.material === "string" ? attributes.material : undefined,
    weight: typeof attributes.weight === "string" ? attributes.weight : undefined,
    price: variant.price ?? undefined,
    imageUrl: variant.image_url ?? undefined,
    isActive: variant.is_active,
    stock: variant.stock,
  };
}

export function totalStock(product: Pick<Product, "stock" | "variants">): number {
  if (product.variants.length > 0) return product.variants.reduce((sum, v) => sum + v.stock, 0);
  return product.stock ?? 0;
}

export function stockStatusFor(stock: number): StockStatus {
  if (stock <= 0) return "out_of_stock";
  if (stock <= LOW_STOCK_THRESHOLD) return "low_stock";
  return "in_stock";
}

function mapProduct(product: BackendProduct, categories: AdminCategory[]): Product {
  const category = categories.find((c) => c.id === String(product.category_id));
  return {
    id: String(product.id),
    categoryId: String(product.category_id),
    categoryName: category?.name ?? "",
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    description: product.description ?? "",
    isActive: product.is_active,
    basePrice: product.base_price,
    compareAtPrice: product.compare_at_price ?? undefined,
    stock: product.stock,
    images: [...product.images].sort((a, b) => a.position - b.position).map(mapImage),
    variants: product.variants.map(mapVariant),
    createdAt: product.created_at,
    updatedAt: product.updated_at,
  };
}

export function toListItem(product: Product): ProductListItem {
  const stock = totalStock(product);
  return {
    id: product.id,
    name: product.name,
    sku: product.sku,
    categoryName: product.categoryName,
    isActive: product.isActive,
    createdAt: product.createdAt,
    imageUrl: product.images[0]?.url,
    price: product.basePrice,
    compareAtPrice: product.compareAtPrice,
    stock,
    stockStatus: stockStatusFor(stock),
  };
}

// Pages through the whole catalogue at the backend's max page_size (100) —
// exhausts every page rather than assuming the catalogue fits in one request.
async function fetchAllBackendProducts(): Promise<BackendProduct[]> {
  const pageSize = 100;
  const all: BackendProduct[] = [];
  let page = 1;

  while (true) {
    const query = new URLSearchParams({ page: String(page), page_size: String(pageSize) });
    const result = await apiFetch<BackendProductList>(`/admin/products?${query.toString()}`);
    all.push(...result.items);
    if (result.items.length < pageSize || all.length >= result.total) break;
    page += 1;
  }

  return all;
}

export async function getAdminProducts(): Promise<Product[]> {
  const [products, categories] = await Promise.all([fetchAllBackendProducts(), getAdminCategories()]);
  return products.map((p) => mapProduct(p, categories));
}

export async function getAdminProduct(id: string): Promise<Product | undefined> {
  try {
    const [product, categories] = await Promise.all([
      apiFetch<BackendProduct>(`/admin/products/${id}`),
      getAdminCategories(),
    ]);
    return mapProduct(product, categories);
  } catch {
    return undefined;
  }
}

export interface ProductInput {
  categoryId: string;
  name: string;
  slug?: string;
  description?: string;
  basePrice: number;
  compareAtPrice?: number;
  sku: string;
  isActive: boolean;
  initialStock?: number;
  images?: { mediaAssetId: string; altText?: string; isPrimary?: boolean }[];
}

function toCreatePayload(input: ProductInput) {
  return {
    category_id: Number(input.categoryId),
    name: input.name,
    slug: input.slug || null,
    description: input.description || null,
    base_price: input.basePrice,
    compare_at_price: input.compareAtPrice ?? null,
    sku: input.sku,
    is_active: input.isActive,
    initial_stock: input.initialStock ?? 0,
    images: (input.images ?? []).map((image) => ({
      media_asset_id: Number(image.mediaAssetId),
      alt_text: image.altText || null,
      is_primary: image.isPrimary ?? false,
    })),
  };
}

export async function createAdminProduct(input: ProductInput): Promise<Product> {
  const [product, categories] = await Promise.all([
    apiFetch<BackendProduct>("/admin/products", { method: "POST", body: toCreatePayload(input) }),
    getAdminCategories(),
  ]);
  return mapProduct(product, categories);
}

export async function updateAdminProduct(id: string, input: Partial<ProductInput>): Promise<Product> {
  const payload: Record<string, unknown> = {};
  if (input.categoryId !== undefined) payload.category_id = Number(input.categoryId);
  if (input.name !== undefined) payload.name = input.name;
  if (input.slug !== undefined) payload.slug = input.slug || null;
  if (input.description !== undefined) payload.description = input.description || null;
  if (input.basePrice !== undefined) payload.base_price = input.basePrice;
  if (input.compareAtPrice !== undefined) payload.compare_at_price = input.compareAtPrice ?? null;
  if (input.sku !== undefined) payload.sku = input.sku;
  if (input.isActive !== undefined) payload.is_active = input.isActive;

  const [product, categories] = await Promise.all([
    apiFetch<BackendProduct>(`/admin/products/${id}`, { method: "PATCH", body: payload }),
    getAdminCategories(),
  ]);
  return mapProduct(product, categories);
}

export async function deleteAdminProduct(id: string): Promise<void> {
  await apiFetch(`/admin/products/${id}`, { method: "DELETE" });
}

async function withCategories(product: BackendProduct): Promise<Product> {
  const categories = await getAdminCategories();
  return mapProduct(product, categories);
}

export async function addProductImage(
  productId: string,
  image: { mediaAssetId: string; altText?: string; isPrimary?: boolean },
): Promise<Product> {
  const product = await apiFetch<BackendProduct>(`/admin/products/${productId}/images`, {
    method: "POST",
    body: {
      media_asset_id: Number(image.mediaAssetId),
      alt_text: image.altText || null,
      is_primary: image.isPrimary ?? false,
    },
  });
  return withCategories(product);
}

export async function reorderProductImages(productId: string, imageIds: string[]): Promise<Product> {
  const product = await apiFetch<BackendProduct>(`/admin/products/${productId}/images/reorder`, {
    method: "PATCH",
    body: { image_ids: imageIds.map(Number) },
  });
  return withCategories(product);
}

export async function deleteProductImage(productId: string, imageId: string): Promise<Product> {
  const product = await apiFetch<BackendProduct>(`/admin/products/${productId}/images/${imageId}`, {
    method: "DELETE",
  });
  return withCategories(product);
}

export interface VariantInput {
  sku: string;
  size?: string;
  material?: string;
  weight?: string;
  price?: number;
  isActive?: boolean;
  initialStock?: number;
}

function toVariantAttributes(input: Partial<VariantInput>) {
  const attributes: Record<string, string> = {};
  if (input.size) attributes.size = input.size;
  if (input.material) attributes.material = input.material;
  if (input.weight) attributes.weight = input.weight;
  return attributes;
}

export async function addProductVariant(productId: string, input: VariantInput): Promise<Product> {
  const product = await apiFetch<BackendProduct>(`/admin/products/${productId}/variants`, {
    method: "POST",
    body: {
      sku: input.sku,
      attributes: toVariantAttributes(input),
      price: input.price ?? null,
      is_active: input.isActive ?? true,
      initial_stock: input.initialStock ?? 0,
    },
  });
  return withCategories(product);
}

export async function updateProductVariant(
  productId: string,
  variantId: string,
  input: Partial<VariantInput>,
): Promise<Product> {
  const payload: Record<string, unknown> = {};
  if (input.sku !== undefined) payload.sku = input.sku;
  if (input.size !== undefined || input.material !== undefined || input.weight !== undefined) {
    payload.attributes = toVariantAttributes(input);
  }
  if (input.price !== undefined) payload.price = input.price;
  if (input.isActive !== undefined) payload.is_active = input.isActive;

  const product = await apiFetch<BackendProduct>(`/admin/products/${productId}/variants/${variantId}`, {
    method: "PATCH",
    body: payload,
  });
  return withCategories(product);
}

export async function deleteProductVariant(productId: string, variantId: string): Promise<Product> {
  const product = await apiFetch<BackendProduct>(`/admin/products/${productId}/variants/${variantId}`, {
    method: "DELETE",
  });
  return withCategories(product);
}
