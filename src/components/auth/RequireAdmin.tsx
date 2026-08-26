"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { useAuthStore } from "@/store/auth.store";

// See RequireAuth for why hydration has to be tracked explicitly rather than
// just reading `token` on first render.
function useHasHydrated() {
  return useSyncExternalStore(
    (callback) => useAuthStore.persist.onFinishHydration(callback),
    () => useAuthStore.persist.hasHydrated(),
    () => false,
  );
}

export function RequireAdmin({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const hydrated = useHasHydrated();

  useEffect(() => {
    if (hydrated && !token) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [hydrated, token, pathname, router]);

  if (!hydrated || !token) return null;

  if (user && user.role !== "admin") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-6 text-center">
        <p className="font-serif text-2xl font-semibold text-foreground">Access denied</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          {user.email} doesn&apos;t have admin access. Sign in with an admin account to continue.
        </p>
        <Link href="/" className="mt-2 text-sm font-medium text-primary hover:underline">
          Back to the storefront
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
