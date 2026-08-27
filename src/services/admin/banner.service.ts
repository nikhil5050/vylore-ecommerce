import { apiFetch } from "@/lib/api";
import type { AdminBanner } from "@/types/admin";

// NOTE: /admin/banners doesn't exist on the backend yet — this facade is
// written against the intended contract so the admin UI and homepage
// section are ready to go live the moment it ships. See BANNER_API.md.
interface BackendBanner {
  id: number;
  image_url: string;
  title: string | null;
  link_url: string | null;
  sort_order: number;
  is_active: boolean;
}

function mapBanner(banner: BackendBanner): AdminBanner {
  return {
    id: String(banner.id),
    imageUrl: banner.image_url,
    title: banner.title ?? undefined,
    linkUrl: banner.link_url ?? undefined,
    sortOrder: banner.sort_order,
    active: banner.is_active,
  };
}

export async function getAdminBanners(): Promise<AdminBanner[]> {
  const rows = await apiFetch<BackendBanner[]>("/admin/banners");
  return rows.map(mapBanner).sort((a, b) => a.sortOrder - b.sortOrder);
}

export interface BannerInput {
  imageUrl: string;
  title?: string;
  linkUrl?: string;
  sortOrder?: number;
  active?: boolean;
}

function toBackendPayload(input: Partial<BannerInput>) {
  const payload: Record<string, unknown> = {};
  if (input.imageUrl !== undefined) payload.image_url = input.imageUrl;
  if (input.title !== undefined) payload.title = input.title || null;
  if (input.linkUrl !== undefined) payload.link_url = input.linkUrl || null;
  if (input.sortOrder !== undefined) payload.sort_order = input.sortOrder;
  if (input.active !== undefined) payload.is_active = input.active;
  return payload;
}

export async function createAdminBanner(input: BannerInput): Promise<AdminBanner> {
  const banner = await apiFetch<BackendBanner>("/admin/banners", {
    method: "POST",
    body: toBackendPayload(input),
  });
  return mapBanner(banner);
}

export async function updateAdminBanner(id: string, input: Partial<BannerInput>): Promise<AdminBanner> {
  const banner = await apiFetch<BackendBanner>(`/admin/banners/${id}`, {
    method: "PATCH",
    body: toBackendPayload(input),
  });
  return mapBanner(banner);
}

export async function deleteAdminBanner(id: string): Promise<void> {
  await apiFetch(`/admin/banners/${id}`, { method: "DELETE" });
}
