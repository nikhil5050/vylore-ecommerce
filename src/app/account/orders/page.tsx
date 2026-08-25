"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { listOrders } from "@/services/order.service";
import type { Order } from "@/types/order";
import { formatPrice } from "@/utils/formatPrice";

function formatStatus(status: string): string {
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | undefined>(undefined);

  useEffect(() => {
    listOrders().then(setOrders);
  }, []);

  if (orders === undefined) return null;

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        description="Your order history will appear here once you place your first order."
        action={
          <Button href="/shop" variant="primary" size="md">
            Start Shopping
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col divide-y divide-silver/20 border-y border-silver/30">
      {orders.map((order) => (
        <Link
          key={order.id}
          href={`/account/orders/${order.id}`}
          className="flex flex-col gap-2 py-5 transition-colors hover:bg-white sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm text-charcoal">{order.orderNumber}</p>
            <p className="text-xs text-muted">
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              {" · "}
              {order.items.length} {order.items.length === 1 ? "item" : "items"}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <span className="eyebrow text-xs text-charcoal">{formatStatus(order.orderStatus)}</span>
            <span className="text-sm text-charcoal">{formatPrice(order.total)}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
