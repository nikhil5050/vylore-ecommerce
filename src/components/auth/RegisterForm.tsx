"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { ApiError } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";

export function RegisterForm() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const data = new FormData(event.currentTarget);
    const phone = String(data.get("phone") ?? "").trim();
    try {
      await register({
        email: String(data.get("email")),
        password: String(data.get("password")),
        first_name: String(data.get("first_name")),
        last_name: String(data.get("last_name")),
        ...(phone ? { phone } : {}),
      });
      router.push("/account");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="First Name" name="first_name" required autoComplete="given-name" />
        <Field label="Last Name" name="last_name" required autoComplete="family-name" />
      </div>
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <Field label="Phone (Optional)" name="phone" type="tel" autoComplete="tel" />
      <Field
        label="Password"
        name="password"
        type="password"
        required
        minLength={8}
        autoComplete="new-password"
      />
      {error && <p className="text-sm text-burgundy">{error}</p>}
      <Button type="submit" variant="primary" size="lg" disabled={submitting} className="mt-2 w-full">
        {submitting ? "Creating Account…" : "Create Account"}
      </Button>
    </form>
  );
}
