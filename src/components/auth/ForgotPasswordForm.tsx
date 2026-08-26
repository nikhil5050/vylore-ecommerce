"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { ApiError } from "@/lib/api";
import { requestPasswordReset } from "@/services/auth.service";

export function ForgotPasswordForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const data = new FormData(event.currentTarget);
    try {
      await requestPasswordReset(String(data.get("email")));
      // Backend always responds 204 regardless of whether the email is
      // registered — this message must never change based on the result, or
      // it becomes a way to enumerate registered accounts.
      setSent(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-charcoal">
          If an account exists for that email, we&apos;ve sent a link to reset your password.
        </p>
        <p className="text-sm text-muted">Check your inbox — the link expires in 30 minutes.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      {error && <p className="text-sm text-burgundy">{error}</p>}
      <Button type="submit" variant="primary" size="md" disabled={submitting} className="mt-2 w-fit">
        {submitting ? "Sending…" : "Send Reset Link"}
      </Button>
    </form>
  );
}
