"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { getProductBySlug } from "@/services/product.service";
import type { SharedCart } from "@/services/shared-cart.service";
import { useAuthStore } from "@/store/auth.store";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/utils/formatPrice";

export function SharedCartView({ sharedCart }: { sharedCart: SharedCart }) {
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const addItem = useCartStore((state) => state.addItem);
  const [status, setStatus] = useState<"idle" | "adding" | "done">("idle");
  const [skippedCount, setSkippedCount] = useState(0);

  const availableItems = sharedCart.items.filter((item) => item.available);

  async function handleAddAll() {
    setStatus("adding");
    let skipped = sharedCart.items.length - availableItems.length;

    for (const item of availableItems) {
      const product = item.productSlug ? await getProductBySlug(item.productSlug) : undefined;
      if (!product) {
        skipped += 1;
        continue;
      }
      addItem(product, { quantity: item.quantity });
    }

    setSkippedCount(skipped);
    setStatus("done");
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div className="divide-y divide-silver/20">
        {sharedCart.items.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-3 py-4">
            <div className="min-w-0">
              <p className={item.available ? "text-sm text-charcoal" : "text-sm text-muted line-through"}>
                {item.productName}
              </p>
              <p className="text-xs text-muted">
                Qty {item.quantity}
                {!item.available && " — no longer available"}
              </p>
            </div>
            <span className="shrink-0 text-sm text-charcoal">{formatPrice(item.lineTotal)}</span>
          </div>
        ))}
      </div>

      <div className="h-fit border border-silver/30 p-6">
        <div className="flex justify-between text-base">
          <span className="text-charcoal">Subtotal</span>
          <span className="text-charcoal">{formatPrice(sharedCart.subtotal)}</span>
        </div>

        {status === "done" ? (
          <p className="mt-6 text-sm text-charcoal">
            Added to your bag.
            {skippedCount > 0 && ` ${skippedCount} item(s) couldn't be added.`}{" "}
            <Link href="/cart" className="text-burgundy underline">
              View your bag
            </Link>
          </p>
        ) : token ? (
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="mt-6 w-full"
            onClick={handleAddAll}
            disabled={status === "adding" || availableItems.length === 0}
          >
            {status === "adding" ? "Adding…" : "Add All to My Bag"}
          </Button>
        ) : (
          <Button href={`/login?next=${encodeURIComponent(pathname)}`} variant="primary" size="lg" className="mt-6 w-full">
            Log In to Add to My Bag
          </Button>
        )}
      </div>
    </div>
  );
}
