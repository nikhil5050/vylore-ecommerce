"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GemIcon } from "@/components/icons/Icons";
import { Button } from "@/components/ui/Button";
import { ApiError } from "@/lib/api";
import { verifyEmail } from "@/services/auth.service";

type Status = "loading" | "success" | "error" | "missing-token";

export function VerifyEmailStatus() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>(token ? "loading" : "missing-token");
  const [message, setMessage] = useState<string | null>(null);
  const attempted = useRef(false);

  useEffect(() => {
    if (!token || attempted.current) return;
    attempted.current = true;

    verifyEmail(token)
      .then(() => setStatus("success"))
      .catch((err) => {
        setMessage(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
        setStatus("error");
      });
  }, [token]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <GemIcon className="h-8 w-8 animate-pulse text-silver" />
        <p className="text-sm text-muted">Verifying your email…</p>
      </div>
    );
  }

  if (status === "missing-token") {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <h1 className="font-serif text-3xl text-charcoal">Verification link incomplete</h1>
        <p className="max-w-sm text-sm text-muted">
          This link is missing its verification token. Please use the link from the email we sent you, or request a
          new one from your account.
        </p>
        <Button href="/login" variant="primary" size="md">
          Back to Sign In
        </Button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <h1 className="font-serif text-3xl text-charcoal">We couldn&apos;t verify that link</h1>
        <p className="max-w-sm text-sm text-muted">
          {message ?? "This verification link is invalid or has expired."}
        </p>
        <Button href="/login" variant="primary" size="md">
          Back to Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <GemIcon className="h-8 w-8 text-burgundy" />
      <h1 className="font-serif text-3xl text-charcoal">Email verified.</h1>
      <p className="max-w-sm text-sm text-muted">Your Vylore account email is confirmed.</p>
      <Button href="/account" variant="primary" size="md">
        Go to Your Account
      </Button>
    </div>
  );
}
