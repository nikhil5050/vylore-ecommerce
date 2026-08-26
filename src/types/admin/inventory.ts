import type { StockStatus } from "./product";

export interface InventoryItem {
  id: string;
  productId: string;
  variantId?: string;
  productName: string;
  sku: string;
  quantity: number;
  reserved: number;
  available: number;
  status: StockStatus;
  updatedAt: string;
}
