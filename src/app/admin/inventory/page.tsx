import type { Metadata } from "next";
import { Boxes, Package, PackageX, TriangleAlert } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { InventoryTable } from "@/components/admin/InventoryTable";
import { Card, CardContent } from "@/components/admin/ui/card";
import { getInventory } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Inventory" };

export default async function InventoryPage() {
  const items = await getInventory();

  const totalStock = items.reduce((sum, i) => sum + i.quantity, 0);
  const lowStock = items.filter((i) => i.status === "low_stock").length;
  const outOfStock = items.filter((i) => i.status === "out_of_stock").length;

  const stats = [
    { label: "Tracked Items", value: items.length, icon: Package },
    { label: "Total Stock", value: totalStock, icon: Boxes },
    { label: "Low Stock", value: lowStock, icon: TriangleAlert },
    { label: "Out of Stock", value: outOfStock, icon: PackageX },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Inventory" description="Stock overview across your catalogue." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1.5 font-serif text-2xl font-semibold text-foreground">{stat.value}</p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <stat.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <InventoryTable items={items} />
    </div>
  );
}
