"use client";

import { useState } from "react";
import { Boxes, History } from "lucide-react";
import { Card } from "@/components/admin/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/admin/ui/dialog";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { StockAdjustmentModal } from "@/components/admin/StockAdjustmentModal";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { stockStatusTone, toTitleCase } from "@/lib/admin/status";
import { formatAdminDate } from "@/lib/admin/format";
import type { Product } from "@/types/admin";

function reservedFor(index: number) {
  return index % 4 === 0 ? 2 : index % 3 === 0 ? 1 : 0;
}

export function InventoryTable({ products }: { products: Product[] }) {
  const [historyProduct, setHistoryProduct] = useState<Product | null>(null);

  if (products.length === 0) {
    return <AdminEmptyState icon={Boxes} title="No products to show" description="Try a different filter." />;
  }

  return (
    <>
      <Card className="overflow-hidden py-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Reserved</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Low Stock Limit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => {
              const reserved = reservedFor(index);
              const available = Math.max(0, product.inventory.stockQuantity - reserved);
              return (
                <TableRow key={product.id}>
                  <TableCell className="font-medium text-foreground">{product.name}</TableCell>
                  <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                  <TableCell>{product.inventory.stockQuantity}</TableCell>
                  <TableCell className="text-muted-foreground">{reserved}</TableCell>
                  <TableCell>{available}</TableCell>
                  <TableCell className="text-muted-foreground">{product.inventory.lowStockThreshold}</TableCell>
                  <TableCell>
                    <StatusBadge
                      status={product.inventory.stockStatus}
                      tone={stockStatusTone[product.inventory.stockStatus] ?? "neutral"}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <StockAdjustmentModal
                        productName={product.name}
                        trigger={
                          <button
                            type="button"
                            className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
                          >
                            Adjust Stock
                          </button>
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setHistoryProduct(product)}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                        aria-label="View history"
                      >
                        <History className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!historyProduct} onOpenChange={(open) => !open && setHistoryProduct(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Stock History — {historyProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            {[
              { type: "add", quantity: 20, reason: "New stock received", date: "2026-08-10" },
              { type: "remove", quantity: 3, reason: "Damaged in transit", date: "2026-08-02" },
              { type: "correction", quantity: 1, reason: "Stock count correction", date: "2026-07-20" },
            ].map((entry, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <div>
                  <p className="font-medium text-foreground">{toTitleCase(entry.type)} &middot; {entry.quantity} units</p>
                  <p className="text-xs text-muted-foreground">{entry.reason}</p>
                </div>
                <span className="text-xs text-muted-foreground">{formatAdminDate(entry.date)}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
