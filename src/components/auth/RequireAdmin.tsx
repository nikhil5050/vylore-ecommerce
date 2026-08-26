"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "@/store/auth.store";
import { RequireAuth } from "./RequireAuth";

// Layered on RequireAuth: that handles "must be signed in", this adds
// "must be an admin". Split in two so the plain sign-in check/hydration-wait
// logic isn't duplicated.
export function RequireAdmin({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <AdminRoleGate>{children}</AdminRoleGate>
    </RequireAuth>
  );
}

function AdminRoleGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (user && !isAdmin) {
      router.replace("/");
    }
  }, [user, isAdmin, router]);

  if (!isAdmin) return null;

  return <>{children}</>;
}
