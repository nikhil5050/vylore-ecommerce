"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Textarea } from "@/components/admin/ui/textarea";
import { Label } from "@/components/admin/ui/label";
import { Button } from "@/components/admin/ui/button";
import type { StoreSettings } from "@/types/admin";

export function StoreSettingsForm({ initial }: { initial: StoreSettings }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof StoreSettings>(key: K, value: StoreSettings[K]) {
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
        <CardTitle className="text-base">Store Information</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="store-name">Store Name</Label>
          <Input id="store-name" value={form.storeName} onChange={(e) => update("storeName", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="store-email">Support Email</Label>
          <Input id="store-email" type="email" value={form.supportEmail} onChange={(e) => update("supportEmail", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="store-phone">Support Phone</Label>
          <Input id="store-phone" value={form.supportPhone} onChange={(e) => update("supportPhone", e.target.value)} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="store-address">Address</Label>
          <Textarea id="store-address" rows={3} value={form.address} onChange={(e) => update("address", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="store-currency">Currency</Label>
          <Input id="store-currency" value={form.currency} onChange={(e) => update("currency", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="store-timezone">Timezone</Label>
          <Input id="store-timezone" value={form.timezone} onChange={(e) => update("timezone", e.target.value)} />
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
