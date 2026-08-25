"use client";

import { useState, type FormEvent } from "react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { OrderTimeline } from "@/components/order/OrderTimeline";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Field } from "@/components/ui/Field";
import { getOrderByNumber } from "@/services/order.service";
import type { Order } from "@/types/order";
import { formatPrice } from "@/utils/formatPrice";

// There's no guest order-lookup endpoint on the backend (every order route
// requires the signed-in owner's token, and guest checkout itself is an
// unconfirmed requirement — see PRD §32), so this now searches the signed-in
// account's own orders by order number rather than an anonymous email/phone
// lookup.
export default function TrackOrderPage() {
  return (
    <RequireAuth>
      <TrackOrderContent />
    </RequireAuth>
  );
}

function TrackOrderContent() {
  // undefined = no search yet, null = searched but no match, Order = found
  const [result, setResult] = useState<Order | null | undefined>(undefined);
  const [searching, setSearching] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const orderNumber = String(data.get("orderNumber") ?? "").trim();

    setSearching(true);
    const match = await getOrderByNumber(orderNumber);
    setResult(match ?? null);
    setSearching(false);
  }

  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container className="max-w-xl">
        <p className="eyebrow text-xs text-muted">Order Tracking</p>
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Track Your Order</h1>
        <p className="mt-3 text-base text-muted">Enter your order number to see its status.</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end">
          <Field label="Order Number" name="orderNumber" required placeholder="VYLXXXXXXXX" className="flex-1" />
          <Button type="submit" variant="primary" size="md" disabled={searching}>
            {searching ? "Searching…" : "Track Order"}
          </Button>
        </form>

        {result === null && (
          <p className="mt-8 text-sm text-muted">
            We couldn&apos;t find an order matching that number. Double-check it and try again.
          </p>
        )}

        {result && (
          <div className="mt-10 border-t border-silver/30 pt-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-charcoal">{result.orderNumber}</h2>
              <span className="text-sm text-charcoal">{formatPrice(result.total)}</span>
            </div>
            <p className="mt-1 text-sm text-muted">
              Placed on{" "}
              {new Date(result.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <div className="mt-6">
              <OrderTimeline status={result.orderStatus} />
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
