"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ApiError } from "@/lib/api";
import { loginCustomer, registerCustomer } from "@/services/auth.service";
import type { AuthUser, LoginInput, RegisterInput } from "@/types/auth";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  status: "idle" | "loading";
  error: string | null;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Persisted under localStorage key "vylore-auth" — src/lib/api.ts reads the
// token straight out of this same key, since it can't import this store
// without creating a cycle (this store calls into api.ts to log in).
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      status: "idle",
      error: null,
      login: async (input) => {
        set({ status: "loading", error: null });
        try {
          const result = await loginCustomer(input);
          set({ token: result.access_token, user: result.user, status: "idle" });
        } catch (err) {
          set({ status: "idle", error: err instanceof ApiError ? err.message : "Login failed" });
          throw err;
        }
      },
      register: async (input) => {
        set({ status: "loading", error: null });
        try {
          const result = await registerCustomer(input);
          set({ token: result.access_token, user: result.user, status: "idle" });
        } catch (err) {
          set({ status: "idle", error: err instanceof ApiError ? err.message : "Registration failed" });
          throw err;
        }
      },
      logout: () => set({ token: null, user: null, error: null }),
      clearError: () => set({ error: null }),
    }),
    { name: "vylore-auth", partialize: (state) => ({ token: state.token, user: state.user }) },
  ),
);
