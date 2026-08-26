import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { InventoryTable } from "@/components/admin/InventoryTable";
import { getInventory } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Low Stock" };

export default async function LowStockPage() {
  const items = (await getInventory()).filter((i) => i.status === "low_stock");
  return (
    <div className="space-y-6">
      <PageHeader title="Low Stock" description="Products approaching zero stock." />
      <InventoryTable items={items} />
    </div>
  );
}
