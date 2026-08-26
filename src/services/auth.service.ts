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

export async function verifyEmail(token: string): Promise<AuthUser> {
  return apiFetch<AuthUser>("/auth/verify-email", { method: "POST", body: { token }, auth: false });
}

export async function requestPasswordReset(email: string): Promise<void> {
  return apiFetch<void>("/auth/forgot-password", { method: "POST", body: { email }, auth: false });
}

export async function resetPassword(token: string, password: string): Promise<void> {
  return apiFetch<void>("/auth/reset-password", { method: "POST", body: { token, password }, auth: false });
}
