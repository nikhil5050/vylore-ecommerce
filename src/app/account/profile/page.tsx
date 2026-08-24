"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { useProfileStore } from "@/store/profile.store";

export default function ProfilePage() {
  const profile = useProfileStore((state) => state.profile);
  const setProfile = useProfileStore((state) => state.setProfile);
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setProfile({
      fullName: String(data.get("fullName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-md">
      <p className="text-sm text-muted">
        These details are stored on this device only, ready to prefill checkout once an account backend exists.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <Field label="Full Name" name="fullName" required autoComplete="name" defaultValue={profile?.fullName} />
        <Field label="Email" name="email" type="email" required autoComplete="email" defaultValue={profile?.email} />
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" defaultValue={profile?.phone} />
        <Button type="submit" variant="primary" size="md" className="mt-2 w-fit">
          {saved ? "Saved" : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
