import { apiFetch } from "@/lib/api";
import type { Banner } from "@/types/banner";

// NOTE: /banners doesn't exist on the backend yet — see BANNER_API.md for
// the contract this is written against, and admin/banner.service.ts for the
// admin-side CRUD counterpart. Expected to return only active banners,
// already sorted by sort_order.
interface BackendBanner {
  id: number;
  image_url: string;
  title: string | null;
  link_url: string | null;
}

function mapBanner(banner: BackendBanner): Banner {
  return {
    id: String(banner.id),
    imageUrl: banner.image_url,
    title: banner.title ?? undefined,
    linkUrl: banner.link_url ?? undefined,
  };
}

export async function getBanners(): Promise<Banner[]> {
  const rows = await apiFetch<BackendBanner[]>("/banners", { auth: false });
  return rows.map(mapBanner);
}
