"use client";

import Link from "next/link";
import { CloseIcon } from "@/components/icons/Icons";
import { EmptyState } from "@/components/ui/EmptyState";
import { useDialogA11y } from "@/hooks/useDialogA11y";
import { useCartStore } from "@/store/cart.store";
import { cn } from "@/utils/cn";
import { formatPrice } from "@/utils/formatPrice";
import { CartLineItem } from "./CartLineItem";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const lines = useCartStore((state) => state.lines);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const panelRef = useDialogA11y(open, onClose);

  return (
    <div
      className={cn("fixed inset-0 z-[60]", open ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close cart"
        tabIndex={open ? 0 : -1}
        className={cn(
          "absolute inset-0 bg-charcoal/40 transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        tabIndex={-1}
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ivory shadow-xl outline-none transition-transform duration-500 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="eyebrow text-xs text-muted">Shopping Bag ({lines.length})</span>
          <button type="button" aria-label="Close cart" onClick={onClose} className="p-2 text-charcoal">
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {lines.length === 0 ? (
            <EmptyState
              title="Your bag is empty"
              description="Explore the collection to find something you'll love."
            />
          ) : (
            <div className="divide-y divide-silver/20">
              {lines.map((line) => (
                <CartLineItem key={`${line.product.id}-${line.size ?? ""}`} line={line} compact />
              ))}
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-silver/30 px-6 py-6">
            <div className="flex justify-between text-sm text-muted">
              <span>Subtotal</span>
              <span className="text-charcoal">{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/cart"
                onClick={onClose}
                className="eyebrow flex h-11 items-center justify-center border border-charcoal/70 text-xs text-charcoal transition-colors hover:border-burgundy hover:text-burgundy"
              >
                View Bag
              </Link>
              <Link
                href="/checkout"
                onClick={onClose}
                className="eyebrow flex h-11 items-center justify-center bg-burgundy text-xs text-ivory transition-colors hover:bg-burgundy-dark"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
