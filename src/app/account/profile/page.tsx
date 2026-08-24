"use client";

import { Field } from "@/components/ui/Field";
import { useAuthStore } from "@/store/auth.store";

// Read-only: the backend doesn't expose a profile-update endpoint yet
// (only GET /auth/me), so there is nothing to save here — this simply
// reflects the account used to sign in.
export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="max-w-md">
      <p className="text-sm text-muted">Your account details.</p>

      <div className="mt-6 flex flex-col gap-4">
        <Field label="First Name" name="first_name" value={user.first_name} readOnly disabled />
        <Field label="Last Name" name="last_name" value={user.last_name} readOnly disabled />
        <Field label="Email" name="email" value={user.email} readOnly disabled />
        <Field label="Phone" name="phone" value={user.phone ?? ""} readOnly disabled />
      </div>
    </div>
  );
}
