"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, Save, Search, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/ui/tabs";
import { Input } from "@/components/admin/ui/input";
import { Checkbox } from "@/components/admin/ui/checkbox";
import { Button } from "@/components/admin/ui/button";
import { ImagePlaceholder } from "@/components/admin/ImagePlaceholder";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import type { ContentBlock, Product } from "@/types/admin";
import { formatPrice } from "@/utils/formatPrice";

interface FeaturedProductsManagerProps {
  slots: ContentBlock[];
  products: Product[];
}

function SlotPanel({ products, initialSelected }: { products: Product[]; initialSelected: string[] }) {
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [query, setQuery] = useState("");
  const [saving, setSaving] = useState(false);

  const selectedProducts = useMemo(
    () => selected.map((id) => products.find((p) => p.id === id)).filter((p): p is Product => !!p),
    [selected, products],
  );

  const filteredProducts = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
    [products, query],
  );

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  }

  function move(id: string, direction: -1 | 1) {
    setSelected((prev) => {
      const index = prev.indexOf(id);
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function handleSave() {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setSaving(false);
    toast.success("Featured products saved successfully.");
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-base">Selected ({selectedProducts.length})</CardTitle>
        </CardHeader>
        <CardContent className="max-h-96 space-y-2 overflow-y-auto pt-4">
          {selectedProducts.length === 0 ? (
            <AdminEmptyState title="No products selected" description="Add products from the list on the right." />
          ) : (
            selectedProducts.map((product, index) => (
              <div key={product.id} className="flex items-center gap-3 rounded-lg border border-border p-2">
                <ImagePlaceholder className="h-10 w-10 shrink-0 rounded-md" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{formatPrice(product.pricing.sellingPrice)}</p>
                </div>
                <div className="flex shrink-0 items-center gap-0.5">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={index === 0}
                    onClick={() => move(product.id, -1)}
                    aria-label="Move up"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={index === selectedProducts.length - 1}
                    onClick={() => move(product.id, 1)}
                    aria-label="Move down"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" onClick={() => toggle(product.id)} aria-label="Remove">
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={saving} className="gap-1.5">
            <Save className="h-4 w-4" />
            {saving ? "Saving…" : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-base">All Products</CardTitle>
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search products…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-8" />
          </div>
        </CardHeader>
        <CardContent className="max-h-96 space-y-1 overflow-y-auto pt-4">
          {filteredProducts.map((product) => (
            <label
              key={product.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-muted"
            >
              <Checkbox checked={selected.includes(product.id)} onCheckedChange={() => toggle(product.id)} />
              <ImagePlaceholder className="h-8 w-8 shrink-0 rounded-md" />
              <span className="min-w-0 flex-1 truncate text-sm text-foreground">{product.name}</span>
            </label>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function FeaturedProductsManager({ slots, products }: FeaturedProductsManagerProps) {
  const defaultSlot = slots[0]?.id;

  return (
    <Tabs defaultValue={defaultSlot}>
      <TabsList>
        {slots.map((slot) => (
          <TabsTrigger key={slot.id} value={slot.id}>
            {slot.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {slots.map((slot, slotIndex) => (
        <TabsContent key={slot.id} value={slot.id} className="mt-4">
          <SlotPanel
            products={products}
            initialSelected={products.slice(slotIndex * 4, slotIndex * 4 + 4).map((p) => p.id)}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
