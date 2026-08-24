"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { DeliveryOption } from "@/services/shipping.service";

interface DeliveryFormProps {
  options: DeliveryOption[];
  defaultValue?: string;
  onSubmit: (optionId: string) => void;
}

export function DeliveryForm({ options, defaultValue, onSubmit }: DeliveryFormProps) {
  const [selected, setSelected] = useState(defaultValue ?? options[0]?.id);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selected) onSubmit(selected);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex cursor-pointer items-start gap-3 border border-silver/50 p-4 has-[:checked]:border-burgundy"
          >
            <input
              type="radio"
              name="delivery"
              value={option.id}
              checked={selected === option.id}
              onChange={() => setSelected(option.id)}
              className="mt-1 h-4 w-4 accent-burgundy"
            />
            <span>
              <span className="block text-sm text-charcoal">{option.label}</span>
              <span className="block text-xs text-muted">{option.description}</span>
            </span>
          </label>
        ))}
      </div>
      <Button type="submit" variant="primary" size="md" className="mt-2 w-fit">
        Continue to Payment
      </Button>
    </form>
  );
}
