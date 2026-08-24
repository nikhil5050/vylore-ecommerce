import { apiFetch } from "@/lib/api";
import type { AuthTokens, AuthUser, LoginInput, RegisterInput } from "@/types/auth";

export async function registerCustomer(input: RegisterInput): Promise<AuthTokens> {
  return apiFetch<AuthTokens>("/auth/register", { method: "POST", body: input, auth: false });
}

export async function loginCustomer(input: LoginInput): Promise<AuthTokens> {
  return apiFetch<AuthTokens>("/auth/login", { method: "POST", body: input, auth: false });
}

export async function fetchCurrentUser(): Promise<AuthUser> {
  return apiFetch<AuthUser>("/auth/me");
}
