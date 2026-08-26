import { apiFetch } from "@/lib/api";
import { getAdminProducts, stockStatusFor } from "@/services/admin/product.service";
import type { InventoryItem } from "@/types/admin";

interface BackendInventory {
  id: number;
  product_id: number | null;
  variant_id: number | null;
  quantity: number;
  reserved_quantity: number;
  updated_at: string;
  available: number;
}

export async function getAdminInventory(): Promise<InventoryItem[]> {
  const [rows, products] = await Promise.all([apiFetch<BackendInventory[]>("/admin/inventory"), getAdminProducts()]);

  const productById = new Map(products.map((p) => [p.id, p]));
  const variantOwner = new Map<string, { productName: string; sku: string }>();
  for (const product of products) {
    for (const variant of product.variants) {
      variantOwner.set(variant.id, { productName: product.name, sku: variant.sku });
    }
  }

  return rows.map((row) => {
    const productId = row.product_id !== null ? String(row.product_id) : undefined;
    const variantId = row.variant_id !== null ? String(row.variant_id) : undefined;
    const product = productId ? productById.get(productId) : undefined;
    const variant = variantId ? variantOwner.get(variantId) : undefined;

    return {
      id: String(row.id),
      productId: productId ?? "",
      variantId,
      productName: variant?.productName ?? product?.name ?? "Unknown product",
      sku: variant?.sku ?? product?.sku ?? "—",
      quantity: row.quantity,
      reserved: row.reserved_quantity,
      available: row.available,
      status: stockStatusFor(row.available),
      updatedAt: row.updated_at,
    };
  });
}

// Absolute quantity set — the backend has no delta/adjustment-reason concept,
// so callers compute the new total before calling this.
export async function updateAdminInventory(inventoryId: string, quantity: number): Promise<void> {
  await apiFetch(`/admin/inventory/${inventoryId}`, { method: "PATCH", body: { quantity } });
}
