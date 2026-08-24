"use client";

import { useState, type FormEvent } from "react";
import { OrderTimeline } from "@/components/order/OrderTimeline";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Field } from "@/components/ui/Field";
import { useOrderStore } from "@/store/order.store";
import type { Order } from "@/types/order";
import { formatPrice } from "@/utils/formatPrice";

export default function TrackOrderPage() {
  const orders = useOrderStore((state) => state.orders);
  // undefined = no search yet, null = searched but no match, Order = found
  const [result, setResult] = useState<Order | null | undefined>(undefined);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const orderId = String(data.get("orderId") ?? "").trim().toUpperCase();
    const contact = String(data.get("contact") ?? "").trim().toLowerCase();

    // Looks up local order history only — swap for a real tracking API call
    // once the backend and shipping integration exist.
    const match = orders.find(
      (order) => order.id.toUpperCase() === orderId && (order.email.toLowerCase() === contact || order.phone === contact),
    );

    setResult(match ?? null);
  }

  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container className="max-w-xl">
        <p className="eyebrow text-xs text-muted">Order Tracking</p>
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Track Your Order</h1>
        <p className="mt-3 text-base text-muted">
          Enter your order ID along with the email or phone number used at checkout.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end">
          <Field label="Order ID" name="orderId" required placeholder="VYL-XXXXXXX" className="flex-1" />
          <Field label="Email or Phone" name="contact" required className="flex-1" />
          <Button type="submit" variant="primary" size="md">
            Track Order
          </Button>
        </form>

        {result === null && (
          <p className="mt-8 text-sm text-muted">
            We couldn&apos;t find an order matching those details. Double-check your order ID and try again.
          </p>
        )}

        {result && (
          <div className="mt-10 border-t border-silver/30 pt-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-charcoal">{result.id}</h2>
              <span className="text-sm text-charcoal">{formatPrice(result.total)}</span>
            </div>
            <p className="mt-1 text-sm text-muted">
              Placed on{" "}
              {new Date(result.placedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <div className="mt-6">
              <OrderTimeline />
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
