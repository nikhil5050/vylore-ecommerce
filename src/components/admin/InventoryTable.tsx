"use client";

import { useState } from "react";
import { Boxes } from "lucide-react";
import { Card } from "@/components/admin/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { StockAdjustmentModal } from "@/components/admin/StockAdjustmentModal";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { stockStatusTone } from "@/lib/admin/status";
import { formatAdminDate } from "@/lib/admin/format";
import { stockStatusFor } from "@/services/admin/product.service";
import type { InventoryItem } from "@/types/admin";

export function InventoryTable({ items: initialItems }: { items: InventoryItem[] }) {
  const [items, setItems] = useState(initialItems);

  if (items.length === 0) {
    return <AdminEmptyState icon={Boxes} title="No inventory to show" description="Try a different filter." />;
  }

  return (
    <Card className="overflow-hidden py-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Current Stock</TableHead>
            <TableHead>Reserved</TableHead>
            <TableHead>Available</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium text-foreground">{item.productName}</TableCell>
              <TableCell className="text-muted-foreground">{item.sku}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell className="text-muted-foreground">{item.reserved}</TableCell>
              <TableCell>{item.available}</TableCell>
              <TableCell>
                <StatusBadge status={item.status} tone={stockStatusTone[item.status] ?? "neutral"} />
              </TableCell>
              <TableCell className="text-muted-foreground">{formatAdminDate(item.updatedAt)}</TableCell>
              <TableCell className="text-right">
                <StockAdjustmentModal
                  productName={item.productName}
                  inventoryId={item.id}
                  currentQuantity={item.quantity}
                  onAdjusted={(newQuantity) =>
                    setItems((prev) =>
                      prev.map((row) =>
                        row.id === item.id
                          ? {
                              ...row,
                              quantity: newQuantity,
                              available: Math.max(0, newQuantity - row.reserved),
                              status: stockStatusFor(Math.max(0, newQuantity - row.reserved)),
                            }
                          : row,
                      ),
                    )
                  }
                  trigger={
                    <button type="button" className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted">
                      Adjust Stock
                    </button>
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
