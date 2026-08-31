"use client";

import { ResendVerificationButton } from "@/components/auth/ResendVerificationButton";
import { useAuthStore } from "@/store/auth.store";

// Only relevant for a logged-in, unverified customer — renders nothing
// otherwise, so it's safe to drop into the account layout unconditionally.
export function EmailVerificationBanner() {
  const user = useAuthStore((state) => state.user);
  if (!user || user.is_email_verified) return null;

  return (
    <div className="mt-6 flex flex-col items-start gap-3 border border-burgundy/30 bg-moonlight px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-charcoal">Please verify your email address.</p>
        <p className="mt-0.5 text-sm text-muted">
          You&apos;ll need a verified email before placing an order — check {user.email} for the link we sent.
        </p>
      </div>
      <ResendVerificationButton />
    </div>
  );
}
