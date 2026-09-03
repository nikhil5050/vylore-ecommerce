"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ApiError } from "@/lib/api";
import { shareCart } from "@/services/shared-cart.service";
import { useAuthStore } from "@/store/auth.store";
import { useCartStore } from "@/store/cart.store";

export function ShareCartButton() {
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const lines = useCartStore((state) => state.lines);
  const [status, setStatus] = useState<"idle" | "sharing" | "shared" | "error">("idle");
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // /cart/share requires auth — a guest calling it would hit a 401 that apiFetch
  // never resolves for (see lib/api.ts), so this is gated before that can happen.
  if (!token) {
    return (
      <p className="text-xs text-muted">
        <Link href={`/login?next=${encodeURIComponent(pathname)}`} className="text-burgundy transition-colors hover:text-burgundy-dark">
          Log in
        </Link>{" "}
        to share your bag with someone.
      </p>
    );
  }

  async function handleShare() {
    setStatus("sharing");
    setError(null);
    try {
      const result = await shareCart(lines);
      setShareUrl(result.shareUrl);
      setStatus("shared");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  async function handleCopy() {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (status === "shared" && shareUrl) {
    return (
      <div className="flex flex-col gap-2 border border-silver/30 p-4">
        <p className="text-xs text-muted">Anyone with this link can view your bag and add it to theirs.</p>
        <div className="flex gap-2">
          <input
            readOnly
            value={shareUrl}
            onFocus={(event) => event.currentTarget.select()}
            className="min-w-0 flex-1 border border-silver/40 bg-white px-3 py-2 text-xs text-charcoal"
          />
          <Button type="button" variant="secondary" size="sm" onClick={handleCopy}>
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        variant="secondary"
        size="md"
        onClick={handleShare}
        disabled={status === "sharing"}
        className="w-full"
      >
        {status === "sharing" ? "Creating Link…" : "Share Bag"}
      </Button>
      {status === "error" && <p className="text-xs text-burgundy">{error}</p>}
    </div>
  );
}
