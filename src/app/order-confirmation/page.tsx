"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getOrderByNumber } from "@/services/order.service";
import type { Order } from "@/types/order";
import { formatPrice } from "@/utils/formatPrice";

export default function OrderConfirmationPage() {
  return (
    <RequireAuth>
      <Suspense fallback={null}>
        <OrderConfirmationContent />
      </Suspense>
    </RequireAuth>
  );
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order_number");
  const [order, setOrder] = useState<Order | null | undefined>(undefined); // undefined = loading

  useEffect(() => {
    Promise.resolve(orderNumber ? getOrderByNumber(orderNumber) : undefined).then((result) =>
      setOrder(result ?? null),
    );
  }, [orderNumber]);

  if (order === undefined) return null;

  if (!order) {
    return (
      <main className="flex flex-1 flex-col py-16 lg:py-24">
        <Container>
          <EmptyState
            title="No order found"
            description="We couldn't find that order. If you just paid, it may take a moment to confirm."
            action={
              <Button href="/account/orders" variant="primary" size="md">
                View Your Orders
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
          Your order reference is <span className="text-charcoal">{order.orderNumber}</span>.
        </p>

        <div className="mt-10 divide-y divide-silver/20 border-y border-silver/30">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 py-4">
              <div className="min-w-0">
                <p className="text-sm text-charcoal">{item.productName}</p>
                <p className="text-xs text-muted">Qty {item.quantity}</p>
              </div>
              <span className="shrink-0 text-sm text-charcoal">{formatPrice(item.total)}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between text-base">
          <span className="text-charcoal">Total</span>
          <span className="text-charcoal">{formatPrice(order.total)}</span>
        </div>

        <div className="mt-8">
          <p className="eyebrow text-xs text-muted">Shipping To</p>
          <p className="mt-2 text-sm text-charcoal">{order.shippingRecipientName}</p>
          <p className="text-sm text-muted">
            {order.shippingAddressLine1}
            {order.shippingAddressLine2 ? `, ${order.shippingAddressLine2}` : ""}, {order.shippingCity},{" "}
            {order.shippingState} {order.shippingPostalCode}
          </p>
        </div>

        <Button href="/shop" variant="secondary" size="md" className="mt-10">
          Continue Shopping
        </Button>
      </Container>
    </main>
  );
}
