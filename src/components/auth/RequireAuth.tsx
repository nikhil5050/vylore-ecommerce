"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { useAuthStore } from "@/store/auth.store";

// zustand's `persist` middleware rehydrates from localStorage asynchronously
// after mount, so `token` reads as null for a split second even for an
// already-logged-in visitor — redirecting on that first render would bounce
// them to /login incorrectly. useSyncExternalStore subscribes to persist's own
// hydration event instead of faking it with a mount-effect + setState.
function useHasHydrated() {
  return useSyncExternalStore(
    (callback) => useAuthStore.persist.onFinishHydration(callback),
    () => useAuthStore.persist.hasHydrated(),
    () => false,
  );
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const hydrated = useHasHydrated();

  useEffect(() => {
    if (hydrated && !token) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [hydrated, token, pathname, router]);

  if (!hydrated || !token) return null;

  return <>{children}</>;
}
