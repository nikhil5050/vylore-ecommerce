"use client";

import { HeartIcon } from "@/components/icons/Icons";
import { useWishlistStore } from "@/store/wishlist.store";
import type { Product } from "@/types/product";
import { cn } from "@/utils/cn";

export function WishlistButton({ product }: { product: Product }) {
  const saved = useWishlistStore((state) => state.items.some((item) => item.id === product.id));
  const toggle = useWishlistStore((state) => state.toggle);

  return (
    <button
      type="button"
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={saved}
      onClick={(event) => {
        event.preventDefault();
        toggle(product);
      }}
      className="flex h-9 w-9 items-center justify-center bg-white/90 text-charcoal transition-colors hover:text-burgundy"
    >
      <HeartIcon className={cn(saved && "fill-burgundy text-burgundy")} />
    </button>
  );
}
