"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ApiError } from "@/lib/api";
import { resendVerificationEmail } from "@/services/auth.service";

interface ResendVerificationButtonProps {
  size?: "sm" | "md";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

// Shared by the account "verify your email" banner and the checkout
// verification-required error — both need the same resend + confirm flow.
export function ResendVerificationButton({ size = "sm", variant = "secondary", className }: ResendVerificationButtonProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleClick() {
    setStatus("sending");
    setMessage(null);
    try {
      await resendVerificationEmail();
      setStatus("sent");
    } catch (err) {
      setMessage(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <p className="text-sm text-charcoal">Verification email sent — check your inbox.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        variant={variant}
        size={size}
        disabled={status === "sending"}
        onClick={handleClick}
        className={className}
      >
        {status === "sending" ? "Sending…" : "Resend Verification Email"}
      </Button>
      {status === "error" && <p className="text-sm text-burgundy">{message}</p>}
    </div>
  );
}
