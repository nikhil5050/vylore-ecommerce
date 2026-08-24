"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { useOrderStore } from "@/store/order.store";
import { formatPrice } from "@/utils/formatPrice";

export default function OrderConfirmationPage() {
  const order = useOrderStore((state) => state.orders[0]);

  if (!order) {
    return (
      <main className="flex flex-1 flex-col py-16 lg:py-24">
        <Container>
          <EmptyState
            title="No recent order found"
            description="Place an order to see your confirmation here."
            action={
              <Button href="/shop" variant="primary" size="md">
                Continue Shopping
              </Button>
            }
          />
        </Container>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container className="max-w-2xl">
        <p className="eyebrow text-xs text-muted">Order Received</p>
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Thank You.</h1>
        <p className="mt-3 text-base text-muted">
          Your order reference is <span className="text-charcoal">{order.id}</span>.
        </p>

        <div className="mt-10 divide-y divide-silver/20 border-y border-silver/30">
          {order.items.map((item) => (
            <div key={`${item.productId}-${item.size ?? ""}`} className="flex items-center justify-between gap-3 py-4">
              <div className="min-w-0">
                <Link href={`/product/${item.slug}`} className="text-sm text-charcoal transition-colors hover:text-burgundy">
                  {item.name}
                </Link>
                <p className="text-xs text-muted">
                  Qty {item.quantity}
                  {item.size && ` · Size ${item.size}`}
                </p>
              </div>
              <span className="shrink-0 text-sm text-charcoal">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between text-base">
          <span className="text-charcoal">Total</span>
          <span className="text-charcoal">{formatPrice(order.total)}</span>
        </div>

        <div className="mt-8">
          <p className="eyebrow text-xs text-muted">Shipping To</p>
          <p className="mt-2 text-sm text-charcoal">{order.shippingAddress.fullName}</p>
          <p className="text-sm text-muted">
            {order.shippingAddress.line1}
            {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.state} {order.shippingAddress.postalCode}
          </p>
        </div>

        <p className="mt-10 border-t border-silver/30 pt-6 text-xs text-muted">
          This checkout is a frontend prototype. Payment processing via PayU will be enabled once backend
          integration is complete — no payment was taken for this order.
        </p>

        <Button href="/shop" variant="secondary" size="md" className="mt-8">
          Continue Shopping
        </Button>
      </Container>
    </main>
  );
}
