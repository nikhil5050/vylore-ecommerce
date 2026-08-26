// Thin fetch wrapper around the Vylore FastAPI backend. Deliberately has no
// React/Zustand dependency (so it can't create an import cycle with
// store/auth.store.ts, which itself calls into this module) — the auth token
// is read directly from the same localStorage key auth.store.ts persists to.

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "https://api.vylore.in/api/v1").replace(/\/$/, "");
const AUTH_STORAGE_KEY = "vylore-auth";

// FastAPI's `detail` field is either a plain string (most HTTPExceptions raised
// by our own code) or an array of Pydantic validation-error objects (422s) —
// e.g. {"detail":[{"msg":"String should have at least 8 characters", ...}]}.
function extractErrorMessage(payload: unknown): string | null {
  if (typeof payload !== "object" || payload === null || !("detail" in payload)) return null;
  const detail = (payload as { detail: unknown }).detail;

  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0];
    if (typeof first === "object" && first !== null && "msg" in first) {
      return String((first as { msg: unknown }).msg);
    }
  }
  return null;
}

export class ApiError extends Error {
  status: number;
  detail: unknown;

  constructor(status: number, message: string, detail?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.state?.token ?? null;
  } catch {
    return null;
  }
}

// Set by auth.store.ts (outside any component, at module scope) so that an
// expired/invalid stored token can clear the Zustand session and let
// RequireAuth redirect to /login — without this module importing the store
// directly, which would create the import cycle noted above.
let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(handler: () => void) {
  unauthorizedHandler = handler;
}

interface ApiFetchOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  auth?: boolean; // defaults to true — set false for endpoints that must work logged-out
  form?: boolean; // send `body` as application/x-www-form-urlencoded instead of JSON
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { method = "GET", body, auth = true, form = false } = options;

  const headers: Record<string, string> = {};
  let requestBody: BodyInit | undefined;

  if (body !== undefined) {
    if (form) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
      requestBody = new URLSearchParams(body as Record<string, string>).toString();
    } else {
      headers["Content-Type"] = "application/json";
      requestBody = JSON.stringify(body);
    }
  }

  if (auth) {
    const token = getStoredToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { method, headers, body: requestBody });

  // A previously-valid stored token expired or was revoked server-side. This is
  // distinct from an `auth: false` endpoint (e.g. /auth/login) returning 401 for
  // bad credentials — that must still surface as a normal ApiError so the login
  // form can show it. Here there's nothing useful for the calling page to do
  // with the error, so clear the session and never resolve — RequireAuth reacts
  // to the cleared token and redirects to /login, and the caller's .then()
  // simply never fires instead of crashing as an unhandled rejection.
  if (auth && response.status === 401) {
    unauthorizedHandler?.();
    return new Promise<T>(() => {});
  }

  if (response.status === 204) return undefined as T;

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json") ? await response.json() : await response.text();

  if (!response.ok) {
    const message = extractErrorMessage(payload) ?? `Request failed with status ${response.status}`;
    throw new ApiError(response.status, message, payload);
  }

  return payload as T;
}
