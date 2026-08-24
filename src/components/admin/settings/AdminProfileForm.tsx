"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Button } from "@/components/admin/ui/button";
import { Avatar, AvatarFallback } from "@/components/admin/ui/avatar";
import type { AdminProfileSettings } from "@/types/admin";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AdminProfileForm({ initial }: { initial: AdminProfileSettings }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof AdminProfileSettings>(key: K, value: AdminProfileSettings[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setSaving(false);
    toast.success("Settings saved successfully.");
  }

  return (
    <Card>
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-base">Admin Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="flex items-center gap-4">
          <Avatar size="lg">
            <AvatarFallback>{initials(form.name || "AU")}</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" type="button">
            Change Photo
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="profile-name">Name</Label>
            <Input id="profile-name" value={form.name} onChange={(e) => update("name", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-email">Email</Label>
            <Input id="profile-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-phone">Phone</Label>
            <Input id="profile-phone" value={form.phone ?? ""} onChange={(e) => update("phone", e.target.value)} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={saving} className="gap-1.5">
          <Save className="h-4 w-4" />
          {saving ? "Saving…" : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
}
