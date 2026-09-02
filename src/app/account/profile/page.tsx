"use client";

import { Card } from "@/components/ui/Card";
import { useAuthStore } from "@/store/auth.store";
import { cn } from "@/utils/cn";

// Read-only: the backend doesn't expose a profile-update endpoint yet
// (only GET /auth/me), so there is nothing to save here — this simply
// reflects the account used to sign in.
export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  const fullName = `${user.first_name} ${user.last_name}`.trim();
  const initials = `${user.first_name[0] ?? ""}${user.last_name[0] ?? ""}`.toUpperCase();
  const memberSince = new Date(user.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-2xl">
      <p className="text-sm text-muted">Your account details.</p>

      <Card className="mt-6 overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-silver/30 bg-moonlight/50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-burgundy font-serif text-xl text-white">
              {initials}
            </div>
            <div>
              <p className="font-serif text-xl text-charcoal">{fullName}</p>
              <p className="text-sm text-muted">{user.email}</p>
            </div>
          </div>
          <span
            className={cn(
              "eyebrow w-fit shrink-0 text-[10px]",
              user.is_email_verified ? "text-burgundy" : "text-muted",
            )}
          >
            {user.is_email_verified ? "Verified Account" : "Email Unverified"}
          </span>
        </div>

        <dl className="grid gap-x-8 gap-y-5 p-6 sm:grid-cols-2">
          <ProfileDetail label="First Name" value={user.first_name} />
          <ProfileDetail label="Last Name" value={user.last_name} />
          <ProfileDetail label="Email" value={user.email} />
          <ProfileDetail label="Phone" value={user.phone ?? "—"} />
          <ProfileDetail label="Member Since" value={memberSince} />
        </dl>
      </Card>
    </div>
  );
}

function ProfileDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="eyebrow text-[11px] text-muted">{label}</dt>
      <dd className="text-sm text-charcoal">{value}</dd>
    </div>
  );
}
