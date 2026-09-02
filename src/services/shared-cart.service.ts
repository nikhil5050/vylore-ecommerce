import { apiFetch } from "@/lib/api";
import { syncCartToBackend } from "@/services/checkout.service";
import type { CartLine } from "@/store/cart.store";

export interface SharedCartItem {
  productId: number | null;
  variantId: number | null;
  productName: string;
  productSlug: string | null;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  available: boolean;
}

export interface SharedCart {
  token: string;
  sharedByName: string;
  items: SharedCartItem[];
  subtotal: number;
}

interface BackendSharedCartItem {
  product_id: number | null;
  variant_id: number | null;
  product_name: string;
  product_slug: string | null;
  quantity: number;
  unit_price: number;
  line_total: number;
  available: boolean;
}

interface BackendSharedCart {
  token: string;
  shared_by_name: string;
  items: BackendSharedCartItem[];
  subtotal: number;
}

function mapItem(item: BackendSharedCartItem): SharedCartItem {
  return {
    productId: item.product_id,
    variantId: item.variant_id,
    productName: item.product_name,
    productSlug: item.product_slug,
    quantity: item.quantity,
    unitPrice: item.unit_price,
    lineTotal: item.line_total,
    available: item.available,
  };
}

function mapSharedCart(cart: BackendSharedCart): SharedCart {
  return {
    token: cart.token,
    sharedByName: cart.shared_by_name,
    items: cart.items.map(mapItem),
    subtotal: cart.subtotal,
  };
}

// Syncs the local cart to the backend first — the backend snapshot is what
// actually gets shared, and it can only see what's already there (see
// syncCartToBackend's own note on why the backend cart isn't already current).
export async function shareCart(lines: CartLine[]): Promise<{ token: string; shareUrl: string }> {
  await syncCartToBackend(lines);
  const result = await apiFetch<{ token: string; share_url: string }>("/cart/share", { method: "POST" });
  return { token: result.token, shareUrl: result.share_url };
}

export async function getSharedCart(token: string): Promise<SharedCart | undefined> {
  try {
    return mapSharedCart(await apiFetch<BackendSharedCart>(`/cart/shared/${encodeURIComponent(token)}`, { auth: false }));
  } catch {
    return undefined;
  }
}
