"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/auth.store";

interface ContactFormProps {
  onSubmit: () => void;
}

// Nothing to collect here anymore — delivery phone lives on the shipping
// address (matching the backend's Address.phone), and order emails go to the
// signed-in account's email. This step just confirms who's ordering.
export function ContactForm({ onSubmit }: ContactFormProps) {
  const user = useAuthStore((state) => state.user);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <p className="eyebrow text-[11px] text-muted">Signed in as</p>
        <p className="mt-1 text-sm text-charcoal">{user?.email}</p>
      </div>
      <Button type="submit" variant="primary" size="md" className="mt-2 w-fit">
        Continue to Shipping
      </Button>
    </form>
  );
}
