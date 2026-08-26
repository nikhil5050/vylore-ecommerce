import { apiFetch } from "@/lib/api";
import type { Category } from "@/types/category";

interface BackendCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
}

function mapCategory(category: BackendCategory): Category {
  return {
    id: String(category.id),
    slug: category.slug,
    name: category.name,
    description: category.description ?? "",
    imageUrl: category.image_url ?? undefined,
  };
}

// Small, mostly-static list — one request covers every category, cached for
// the life of the server process (or the page load, on the client) rather
// than re-fetched on every call site.
let categoriesPromise: Promise<Category[]> | null = null;

export async function getCategories(): Promise<Category[]> {
  if (!categoriesPromise) {
    categoriesPromise = apiFetch<BackendCategory[]>("/categories", { auth: false }).then((rows) =>
      rows.map(mapCategory),
    );
  }
  return categoriesPromise;
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug);
}

// Internal helper for product.service.ts, which needs category_id -> slug/name
// since the backend's Product doesn't embed its category.
export async function getCategoryById(id: number): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((category) => category.id === String(id));
}
