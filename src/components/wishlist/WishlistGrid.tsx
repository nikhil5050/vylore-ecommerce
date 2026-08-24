"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";

export function WishlistGrid() {
  const items = useWishlistStore((state) => state.items);
  const removeFromWishlist = useWishlistStore((state) => state.remove);
  const addToCart = useCartStore((state) => state.addItem);

  function moveToBag(productId: string) {
    const product = items.find((item) => item.id === productId);
    if (!product) return;
    addToCart(product);
    removeFromWishlist(productId);
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your wishlist is empty"
        description="Save the pieces you love and come back to them anytime."
        action={
          <Button href="/shop" variant="primary" size="md">
            Explore the Collection
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3 lg:gap-x-6">
      {items.map((product) => (
        <div key={product.id} className="flex flex-col gap-3">
          <ProductCard product={product} />
          <Button variant="secondary" size="sm" onClick={() => moveToBag(product.id)} disabled={!product.inStock}>
            {product.inStock ? "Move to Bag" : "Out of Stock"}
          </Button>
        </div>
      ))}
    </div>
  );
}
