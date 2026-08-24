"use client";

import Link from "next/link";
import { use } from "react";
import { OrderTimeline } from "@/components/order/OrderTimeline";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useOrderStore } from "@/store/order.store";
import { formatPrice } from "@/utils/formatPrice";

export default function OrderDetailPage({ params }: PageProps<"/account/orders/[id]">) {
  const { id } = use(params);
  const order = useOrderStore((state) => state.orders.find((o) => o.id === id));

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
          <h2 className="font-serif text-2xl text-charcoal">{order.id}</h2>
          <p className="text-sm text-muted">
            Placed on{" "}
            {new Date(order.placedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <Link href="/account/orders" className="eyebrow text-xs text-burgundy">
          Back to Orders
        </Link>
      </div>

      <div className="mt-8">
        <OrderTimeline />
      </div>

      <div className="mt-8 divide-y divide-silver/20 border-y border-silver/30">
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

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="eyebrow text-xs text-muted">Shipping Address</p>
          <p className="mt-2 text-sm text-charcoal">{order.shippingAddress.fullName}</p>
          <p className="text-sm text-muted">
            {order.shippingAddress.line1}
            {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.state} {order.shippingAddress.postalCode}
          </p>
        </div>
        <div>
          <p className="eyebrow text-xs text-muted">Payment</p>
          <p className="mt-2 text-sm text-charcoal">PayU</p>
          <p className="text-xs text-muted">Not processed — prototype checkout.</p>
        </div>
      </div>
    </div>
  );
}
