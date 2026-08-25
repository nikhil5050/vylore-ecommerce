"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import type { ShippingAddress } from "@/types/order";

interface AddressFormProps {
  defaultValue?: ShippingAddress;
  submitLabel?: string;
  onSubmit: (value: ShippingAddress) => void;
}

export function AddressForm({ defaultValue, submitLabel = "Continue to Delivery", onSubmit }: AddressFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit({
      fullName: String(data.get("fullName") ?? ""),
      phone: String(data.get("phone") ?? ""),
      line1: String(data.get("line1") ?? ""),
      line2: String(data.get("line2") ?? "") || undefined,
      city: String(data.get("city") ?? ""),
      state: String(data.get("state") ?? ""),
      postalCode: String(data.get("postalCode") ?? ""),
      country: "India",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Full Name" name="fullName" required autoComplete="name" defaultValue={defaultValue?.fullName} />
      <Field label="Phone" name="phone" type="tel" required autoComplete="tel" defaultValue={defaultValue?.phone} />
      <Field
        label="Address Line 1"
        name="line1"
        required
        autoComplete="address-line1"
        defaultValue={defaultValue?.line1}
      />
      <Field
        label="Address Line 2 (Optional)"
        name="line2"
        autoComplete="address-line2"
        defaultValue={defaultValue?.line2}
      />
      <div className="grid grid-cols-2 gap-4">
        <Field label="City" name="city" required autoComplete="address-level2" defaultValue={defaultValue?.city} />
        <Field label="State" name="state" required autoComplete="address-level1" defaultValue={defaultValue?.state} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Postal Code"
          name="postalCode"
          required
          pattern="[0-9]{6}"
          autoComplete="postal-code"
          defaultValue={defaultValue?.postalCode}
        />
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow text-[11px] text-muted">Country</span>
          <input
            value="India"
            disabled
            className="h-11 border border-silver/30 bg-silver/10 px-3 text-sm text-muted"
          />
        </label>
      </div>
      <p className="text-xs text-muted">Vylore currently ships within India only.</p>
      <Button type="submit" variant="primary" size="md" className="mt-2 w-fit">
        {submitLabel}
      </Button>
    </form>
  );
}
