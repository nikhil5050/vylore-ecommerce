"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import type { ProductVariant } from "@/types/admin";

interface ProductVariantsProps {
  variants: ProductVariant[];
  onChange: (variants: ProductVariant[]) => void;
}

export function ProductVariants({ variants, onChange }: ProductVariantsProps) {
  function addVariant() {
    onChange([
      ...variants,
      {
        id: `v-${Date.now()}`,
        size: "",
        material: "",
        sku: "",
        price: 0,
        stock: 0,
        weight: "",
      },
    ]);
  }

  function updateVariant(id: string, patch: Partial<ProductVariant>) {
    onChange(variants.map((v) => (v.id === id ? { ...v, ...patch } : v)));
  }

  function removeVariant(id: string) {
    onChange(variants.filter((v) => v.id !== id));
  }

  return (
    <div className="space-y-3">
      {variants.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Size</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead className="text-right">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variants.map((variant) => (
                <TableRow key={variant.id}>
                  <TableCell>
                    <Input
                      value={variant.size ?? ""}
                      onChange={(e) => updateVariant(variant.id, { size: e.target.value })}
                      placeholder="e.g. 18"
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={variant.material ?? ""}
                      onChange={(e) => updateVariant(variant.id, { material: e.target.value })}
                      placeholder="e.g. Silver"
                      className="w-28"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={variant.sku}
                      onChange={(e) => updateVariant(variant.id, { sku: e.target.value })}
                      placeholder="SKU"
                      className="w-32"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={variant.price}
                      onChange={(e) => updateVariant(variant.id, { price: Number(e.target.value) })}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => updateVariant(variant.id, { stock: Number(e.target.value) })}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={variant.weight ?? ""}
                      onChange={(e) => updateVariant(variant.id, { weight: e.target.value })}
                      placeholder="e.g. 6.5g"
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      type="button"
                      onClick={() => removeVariant(variant.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
          No variants yet. Add a variant if this product comes in multiple sizes or materials.
        </p>
      )}
      <Button type="button" variant="outline" size="sm" onClick={addVariant}>
        <Plus className="h-4 w-4" /> Add Variant
      </Button>
    </div>
  );
}
