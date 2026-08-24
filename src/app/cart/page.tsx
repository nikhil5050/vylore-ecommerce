"use client";

import { CartLineItem } from "@/components/cart/CartLineItem";
import { CartStickyBar } from "@/components/cart/CartStickyBar";
import { CartSummary } from "@/components/cart/CartSummary";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { useCartStore } from "@/store/cart.store";
import { cn } from "@/utils/cn";

export default function CartPage() {
  const lines = useCartStore((state) => state.lines);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const hasItems = lines.length > 0;

  return (
    <main className={cn("flex flex-1 flex-col pt-16 lg:pt-24", hasItems ? "pb-32 lg:pb-24" : "pb-16 lg:pb-24")}>
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shopping Bag" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Shopping Bag</h1>

        {!hasItems ? (
          <EmptyState
            title="Your bag is empty"
            description="Explore the collection and find something you'll wear for years."
            action={
              <Button href="/shop" variant="primary" size="md">
                Continue Shopping
              </Button>
            }
          />
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
            <div className="divide-y divide-silver/20">
              {lines.map((line) => (
                <CartLineItem key={`${line.product.id}-${line.size ?? ""}`} line={line} />
              ))}
            </div>
            <CartSummary subtotal={subtotal} />
          </div>
        )}
      </Container>

      {hasItems && <CartStickyBar total={subtotal} />}
    </main>
  );
}
