"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { OrderTimeline } from "@/components/order/OrderTimeline";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { getOrder } from "@/services/order.service";
import type { Order } from "@/types/order";
import { formatPrice } from "@/utils/formatPrice";

export default function OrderDetailPage() {
  return (
    <Suspense fallback={null}>
      <OrderDetailContent />
    </Suspense>
  );
}

function OrderDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    const orderId = Number(id);
    Promise.resolve(Number.isFinite(orderId) ? getOrder(orderId) : undefined).then((result) =>
      setOrder(result ?? null),
    );
  }, [id]);

  if (order === undefined && id) return null;

  if (!order) {
    return (
      <EmptyState
        title="Order not found"
        description="We couldn't find this order in your account."
        action={
          <Button href="/account/orders" variant="primary" size="md">
            Back to Orders
          </Button>
        }
      />
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl text-charcoal">{order.orderNumber}</h2>
          <p className="text-sm text-muted">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <Link href="/account/orders" className="eyebrow text-xs text-burgundy">
          Back to Orders
        </Link>
      </div>

      <div className="mt-8">
        <OrderTimeline status={order.orderStatus} />
      </div>

      <div className="mt-8 divide-y divide-silver/20 border-y border-silver/30">
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

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="eyebrow text-xs text-muted">Shipping Address</p>
          <p className="mt-2 text-sm text-charcoal">{order.shippingRecipientName}</p>
          <p className="text-sm text-muted">
            {order.shippingAddressLine1}
            {order.shippingAddressLine2 ? `, ${order.shippingAddressLine2}` : ""}, {order.shippingCity},{" "}
            {order.shippingState} {order.shippingPostalCode}
          </p>
        </div>
        <div>
          <p className="eyebrow text-xs text-muted">Payment</p>
          <p className="mt-2 text-sm text-charcoal capitalize">{order.paymentStatus}</p>
        </div>
      </div>
    </div>
  );
}
