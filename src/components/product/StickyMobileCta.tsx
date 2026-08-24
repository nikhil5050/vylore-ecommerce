"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart.store";
import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";

export function StickyMobileCta({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem(product, { size: product.sizes?.[0] });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-silver/30 bg-ivory/95 px-4 py-3 backdrop-blur lg:hidden">
      <span className="text-base text-charcoal">{formatPrice(product.price)}</span>
      <Button
        variant="primary"
        size="md"
        disabled={!product.inStock}
        onClick={handleAddToCart}
        className="flex-1 max-w-[220px]"
      >
        {!product.inStock ? "Out of Stock" : added ? "Added to Bag" : "Add to Cart"}
      </Button>
    </div>
  );
}
