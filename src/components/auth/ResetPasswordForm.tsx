"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { ApiError } from "@/lib/api";
import { resetPassword } from "@/services/auth.service";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const data = new FormData(event.currentTarget);
    const password = String(data.get("password"));
    const confirmPassword = String(data.get("confirm_password"));

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    if (!token) {
      setError("This reset link is missing its token. Please use the link from the email we sent you.");
      return;
    }

    setSubmitting(true);
    try {
      await resetPassword(token, password);
      setDone(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!token) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-charcoal">This link is missing its reset token.</p>
        <p className="text-sm text-muted">
          Please use the link from the email we sent you, or{" "}
          <a href="/forgot-password" className="text-burgundy transition-colors hover:text-burgundy-dark">
            request a new one
          </a>
          .
        </p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-charcoal">Your password has been changed.</p>
        <Button href="/login" variant="primary" size="md" className="w-fit">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field
        label="New Password"
        name="password"
        type="password"
        required
        minLength={8}
        autoComplete="new-password"
      />
      <Field
        label="Confirm New Password"
        name="confirm_password"
        type="password"
        required
        minLength={8}
        autoComplete="new-password"
      />
      {error && <p className="text-sm text-burgundy">{error}</p>}
      <Button type="submit" variant="primary" size="md" disabled={submitting} className="mt-2 w-fit">
        {submitting ? "Saving…" : "Reset Password"}
      </Button>
    </form>
  );
}
