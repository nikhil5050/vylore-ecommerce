"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { HeartIcon } from "@/components/icons/Icons";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import type { Product } from "@/types/product";
import { cn } from "@/utils/cn";

export function ProductActions({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const saved = useWishlistStore((state) => state.items.some((item) => item.id === product.id));
  const toggleWishlist = useWishlistStore((state) => state.toggle);

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem(product, { size: selectedSize, quantity });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    addItem(product, { size: selectedSize, quantity });
    router.push("/cart");
  }

  return (
    <div className="flex flex-col gap-6">
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <p className="eyebrow text-xs text-muted">Size</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                aria-pressed={selectedSize === size}
                className={cn(
                  "flex h-10 min-w-10 items-center justify-center border px-3 text-sm transition-colors",
                  selectedSize === size
                    ? "border-burgundy text-burgundy"
                    : "border-silver/50 text-charcoal hover:border-charcoal",
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="eyebrow text-xs text-muted">Quantity</p>
        <div className="mt-3 flex h-10 w-fit items-center border border-silver/50">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="flex h-full w-10 items-center justify-center text-charcoal transition-colors hover:text-burgundy"
          >
            −
          </button>
          <span className="w-8 text-center text-sm text-charcoal">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((value) => value + 1)}
            className="flex h-full w-10 items-center justify-center text-charcoal transition-colors hover:text-burgundy"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <Button
          variant="primary"
          size="lg"
          disabled={!product.inStock}
          onClick={handleAddToCart}
          className="w-full sm:w-auto"
        >
          {!product.inStock ? "Out of Stock" : added ? "Added to Bag" : "Add to Cart"}
        </Button>
        <div className="flex gap-3 sm:contents">
          <Button
            variant="secondary"
            size="lg"
            disabled={!product.inStock}
            onClick={handleBuyNow}
            className="flex-1 sm:flex-none"
          >
            Buy Now
          </Button>
          <button
            type="button"
            aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={saved}
            onClick={() => toggleWishlist(product)}
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-silver/50 text-charcoal transition-colors hover:text-burgundy"
          >
            <HeartIcon className={cn(saved && "fill-burgundy text-burgundy")} />
          </button>
        </div>
      </div>
    </div>
  );
}
