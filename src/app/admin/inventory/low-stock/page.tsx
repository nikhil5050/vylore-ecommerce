import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { InventoryTable } from "@/components/admin/InventoryTable";
import { mockProducts } from "@/lib/admin/mock";

export const metadata: Metadata = { title: "Low Stock" };

export default function LowStockPage() {
  const products = mockProducts.filter((p) => p.inventory.stockStatus === "low_stock");
  return (
    <div className="space-y-6">
      <PageHeader title="Low Stock" description="Products approaching their low stock threshold." />
      <InventoryTable products={products} />
    </div>
  );
}
