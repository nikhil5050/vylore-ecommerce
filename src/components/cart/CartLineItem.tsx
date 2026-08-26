"use client";

import Link from "next/link";
import { ProductThumbnail } from "@/components/ui/ProductThumbnail";
import { useCartStore, type CartLine } from "@/store/cart.store";
import { cn } from "@/utils/cn";
import { formatPrice } from "@/utils/formatPrice";

interface CartLineItemProps {
  line: CartLine;
  compact?: boolean;
}

export function CartLineItem({ line, compact = false }: CartLineItemProps) {
  const removeLine = useCartStore((state) => state.removeLine);
  const setQuantity = useCartStore((state) => state.setQuantity);

  return (
    <div className="flex gap-4 py-4">
      <Link
        href={`/product/${line.product.slug}`}
        className={cn("shrink-0 overflow-hidden", compact ? "h-20 w-16" : "h-32 w-24")}
      >
        <ProductThumbnail src={line.product.images?.[0]?.url} alt={line.product.name} transform="w-200" />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/product/${line.product.slug}`}
              className="font-serif text-base text-charcoal transition-colors hover:text-burgundy"
            >
              {line.product.name}
            </Link>
            <p className="mt-1 text-xs text-muted">
              {line.product.category}
              {line.size && ` · Size ${line.size}`}
            </p>
          </div>
          <button
            type="button"
            aria-label="Remove item"
            onClick={() => removeLine(line.product.id, line.size)}
            className="shrink-0 text-xs text-muted transition-colors hover:text-burgundy"
          >
            Remove
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex h-10 w-fit items-center border border-silver/50">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity(line.product.id, line.size, line.quantity - 1)}
              className="flex h-full w-9 items-center justify-center text-charcoal transition-colors hover:text-burgundy"
            >
              −
            </button>
            <span className="w-7 text-center text-sm text-charcoal">{line.quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity(line.product.id, line.size, line.quantity + 1)}
              className="flex h-full w-9 items-center justify-center text-charcoal transition-colors hover:text-burgundy"
            >
              +
            </button>
          </div>
          <span className="text-sm text-charcoal">{formatPrice(line.product.price * line.quantity)}</span>
        </div>
      </div>
    </div>
  );
}
