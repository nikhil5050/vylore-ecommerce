export interface AuthUser {
  id: number;
  email: string;
  phone: string | null;
  first_name: string;
  last_name: string;
  role: "customer" | "admin";
  is_active: boolean;
  created_at: string;
}

export interface AuthTokens {
  access_token: string;
  token_type: string;
  user: AuthUser;
}

export interface RegisterInput {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
