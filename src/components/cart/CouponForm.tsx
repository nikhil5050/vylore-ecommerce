"use client";

import { FormEvent, useState } from "react";

// No coupon backend exists yet — this only acknowledges submission, it never
// fabricates a discount or validates a real code.
export function CouponForm() {
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Coupon codes are validated at checkout.");
  }

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="flex border-b border-silver/40 focus-within:border-burgundy">
        <input
          type="text"
          placeholder="Coupon code"
          aria-label="Coupon code"
          className="w-full bg-transparent py-2 text-sm text-charcoal placeholder:text-muted focus:outline-none"
        />
        <button type="submit" className="eyebrow shrink-0 text-xs text-burgundy">
          Apply
        </button>
      </form>
      {message && <p className="mt-2 text-xs text-muted">{message}</p>}
    </div>
  );
}
