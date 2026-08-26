import { apiFetch } from "@/lib/api";
import type { AdminCategory } from "@/types/admin";

interface BackendCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
}

function mapCategory(category: BackendCategory): AdminCategory {
  return {
    id: String(category.id),
    name: category.name,
    slug: category.slug,
    imageUrl: category.image_url ?? undefined,
    description: category.description ?? "",
    active: category.is_active,
  };
}

export async function getAdminCategories(): Promise<AdminCategory[]> {
  const rows = await apiFetch<BackendCategory[]>("/admin/categories");
  return rows.map(mapCategory);
}

export interface CategoryInput {
  name: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  active?: boolean;
}

function toBackendPayload(input: Partial<CategoryInput>) {
  const payload: Record<string, unknown> = {};
  if (input.name !== undefined) payload.name = input.name;
  if (input.slug !== undefined) payload.slug = input.slug || null;
  if (input.description !== undefined) payload.description = input.description || null;
  if (input.imageUrl !== undefined) payload.image_url = input.imageUrl || null;
  if (input.active !== undefined) payload.is_active = input.active;
  return payload;
}

export async function createAdminCategory(input: CategoryInput): Promise<AdminCategory> {
  const category = await apiFetch<BackendCategory>("/admin/categories", {
    method: "POST",
    body: toBackendPayload(input),
  });
  return mapCategory(category);
}

export async function updateAdminCategory(id: string, input: Partial<CategoryInput>): Promise<AdminCategory> {
  const category = await apiFetch<BackendCategory>(`/admin/categories/${id}`, {
    method: "PATCH",
    body: toBackendPayload(input),
  });
  return mapCategory(category);
}

export async function deleteAdminCategory(id: string): Promise<void> {
  await apiFetch(`/admin/categories/${id}`, { method: "DELETE" });
}
