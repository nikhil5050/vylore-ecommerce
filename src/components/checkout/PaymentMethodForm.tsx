"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { PaymentMethod } from "@/services/payment.service";

interface PaymentMethodFormProps {
  methods: PaymentMethod[];
  defaultValue?: string;
  onSubmit: (methodId: string) => void;
}

export function PaymentMethodForm({ methods, defaultValue, onSubmit }: PaymentMethodFormProps) {
  const [selected, setSelected] = useState(defaultValue ?? methods[0]?.id);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selected) onSubmit(selected);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {methods.map((method) => (
          <label
            key={method.id}
            className="flex cursor-pointer items-start gap-3 border border-silver/50 p-4 has-[:checked]:border-burgundy"
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selected === method.id}
              onChange={() => setSelected(method.id)}
              className="mt-1 h-4 w-4 accent-burgundy"
            />
            <span>
              <span className="block text-sm text-charcoal">{method.label}</span>
              <span className="block text-xs text-muted">{method.description}</span>
            </span>
          </label>
        ))}
      </div>
      <Button type="submit" variant="primary" size="md" className="mt-2 w-fit">
        Continue to Review
      </Button>
    </form>
  );
}
