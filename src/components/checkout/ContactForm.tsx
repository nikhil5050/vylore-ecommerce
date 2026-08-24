"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import type { ContactInfo } from "./types";

interface ContactFormProps {
  defaultValue?: ContactInfo;
  onSubmit: (value: ContactInfo) => void;
}

export function ContactForm({ defaultValue, onSubmit }: ContactFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit({
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Email" name="email" type="email" required autoComplete="email" defaultValue={defaultValue?.email} />
      <Field label="Phone" name="phone" type="tel" required autoComplete="tel" defaultValue={defaultValue?.phone} />
      <Button type="submit" variant="primary" size="md" className="mt-2 w-fit">
        Continue to Shipping
      </Button>
    </form>
  );
}
