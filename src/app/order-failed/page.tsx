"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function OrderFailedPage() {
  return (
    <RequireAuth>
      <Suspense fallback={null}>
        <OrderFailedContent />
      </Suspense>
    </RequireAuth>
  );
}

function OrderFailedContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order_number");

  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container className="max-w-2xl">
        <p className="eyebrow text-xs text-muted">Payment Failed</p>
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Payment Didn&apos;t Go Through.</h1>
        <p className="mt-3 text-base text-muted">
          {orderNumber ? (
            <>
              Your order <span className="text-charcoal">{orderNumber}</span> wasn&apos;t charged — nothing was
              taken from your account.
            </>
          ) : (
            "Your payment wasn't completed — nothing was taken from your account."
          )}
        </p>

        <div className="mt-10 flex gap-4">
          <Button href="/cart" variant="primary" size="md">
            Return to Bag
          </Button>
          <Button href="/contact" variant="secondary" size="md">
            Contact Support
          </Button>
        </div>
      </Container>
    </main>
  );
}
