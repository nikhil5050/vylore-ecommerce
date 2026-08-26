"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { InventoryTable } from "@/components/admin/InventoryTable";
import { getInventory } from "@/lib/admin/api";
import type { InventoryItem } from "@/types/admin";

export default function LowStockPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    getInventory().then(setItems);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="Low Stock" description="Products approaching zero stock." />
      <InventoryTable items={items.filter((i) => i.status === "low_stock")} />
    </div>
  );
}
