"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Switch } from "@/components/admin/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { addProductVariant, deleteProductVariant, updateProductVariant } from "@/lib/admin/api";
import type { ProductVariant } from "@/types/admin";

interface ProductVariantsProps {
  variants: ProductVariant[];
  onChange: (variants: ProductVariant[]) => void;
  // Variants only exist as sub-resources of a saved product — there is no
  // "create with variants" endpoint, so this panel is disabled until the
  // product has been saved once.
  productId?: string;
}

const emptyDraft = { sku: "", size: "", material: "", weight: "", price: "", initialStock: "" };

export function ProductVariants({ variants, onChange, productId }: ProductVariantsProps) {
  const [draft, setDraft] = useState(emptyDraft);
  const [adding, setAdding] = useState(false);

  if (!productId) {
    return (
      <AdminEmptyState title="Save the product first" description="Variants can be added once the product has been created." />
    );
  }

  async function updateVariant(variant: ProductVariant, patch: Partial<ProductVariant>) {
    const merged = { ...variant, ...patch };
    try {
      const updated = await updateProductVariant(productId!, variant.id, {
        sku: merged.sku,
        size: merged.size,
        material: merged.material,
        weight: merged.weight,
        price: merged.price,
        isActive: merged.isActive,
      });
      onChange(updated.variants);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn't update variant.");
    }
  }

  async function removeVariant(variant: ProductVariant) {
    try {
      const updated = await deleteProductVariant(productId!, variant.id);
      onChange(updated.variants);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn't remove variant.");
    }
  }

  async function addVariant() {
    if (!draft.sku.trim()) {
      toast.error("Variant SKU is required.");
      return;
    }
    setAdding(true);
    try {
      const updated = await addProductVariant(productId!, {
        sku: draft.sku.trim(),
        size: draft.size.trim() || undefined,
        material: draft.material.trim() || undefined,
        weight: draft.weight.trim() || undefined,
        price: draft.price ? Number(draft.price) : undefined,
        initialStock: draft.initialStock ? Number(draft.initialStock) : 0,
      });
      onChange(updated.variants);
      setDraft(emptyDraft);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn't add variant.");
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="space-y-3">
      {variants.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Size</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variants.map((variant) => (
                <TableRow key={variant.id}>
                  <TableCell>
                    <Input
                      defaultValue={variant.size ?? ""}
                      onBlur={(e) => e.target.value !== (variant.size ?? "") && updateVariant(variant, { size: e.target.value })}
                      placeholder="e.g. 18"
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      defaultValue={variant.material ?? ""}
                      onBlur={(e) => e.target.value !== (variant.material ?? "") && updateVariant(variant, { material: e.target.value })}
                      placeholder="e.g. Silver"
                      className="w-28"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      defaultValue={variant.weight ?? ""}
                      onBlur={(e) => e.target.value !== (variant.weight ?? "") && updateVariant(variant, { weight: e.target.value })}
                      placeholder="e.g. 6.5g"
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      defaultValue={variant.sku}
                      onBlur={(e) => e.target.value !== variant.sku && updateVariant(variant, { sku: e.target.value })}
                      placeholder="SKU"
                      className="w-32"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      defaultValue={variant.price ?? ""}
                      onBlur={(e) => {
                        const value = e.target.value ? Number(e.target.value) : undefined;
                        if (value !== variant.price) updateVariant(variant, { price: value });
                      }}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell className="text-muted-foreground" title="Adjust from the Inventory page">
                    {variant.stock}
                  </TableCell>
                  <TableCell>
                    <Switch checked={variant.isActive} onCheckedChange={(checked) => updateVariant(variant, { isActive: checked })} />
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      type="button"
                      onClick={() => removeVariant(variant)}
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
      )}

      <div className="flex flex-wrap items-end gap-2 rounded-lg border border-dashed border-border p-3">
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">Size</span>
          <Input value={draft.size} onChange={(e) => setDraft((d) => ({ ...d, size: e.target.value }))} className="w-20" />
        </div>
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">Material</span>
          <Input value={draft.material} onChange={(e) => setDraft((d) => ({ ...d, material: e.target.value }))} className="w-28" />
        </div>
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">Weight</span>
          <Input value={draft.weight} onChange={(e) => setDraft((d) => ({ ...d, weight: e.target.value }))} className="w-24" />
        </div>
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">SKU *</span>
          <Input value={draft.sku} onChange={(e) => setDraft((d) => ({ ...d, sku: e.target.value }))} className="w-32" />
        </div>
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">Price</span>
          <Input type="number" value={draft.price} onChange={(e) => setDraft((d) => ({ ...d, price: e.target.value }))} className="w-24" />
        </div>
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">Initial Stock</span>
          <Input type="number" value={draft.initialStock} onChange={(e) => setDraft((d) => ({ ...d, initialStock: e.target.value }))} className="w-24" />
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addVariant} disabled={adding}>
          <Plus className="h-4 w-4" /> Add Variant
        </Button>
      </div>
    </div>
  );
}
