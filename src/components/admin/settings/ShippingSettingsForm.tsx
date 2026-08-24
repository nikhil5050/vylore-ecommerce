"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Button } from "@/components/admin/ui/button";
import type { ShippingSettings } from "@/types/admin";

export function ShippingSettingsForm({ initial }: { initial: ShippingSettings }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof ShippingSettings>(key: K, value: ShippingSettings[K]) {
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
        <CardTitle className="text-base">Shipping Settings</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="ship-threshold">Free Shipping Threshold (₹)</Label>
          <Input
            id="ship-threshold"
            type="number"
            value={form.freeShippingThreshold}
            onChange={(e) => update("freeShippingThreshold", Number(e.target.value) || 0)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ship-fee">Standard Shipping Fee (₹)</Label>
          <Input
            id="ship-fee"
            type="number"
            value={form.standardShippingFee}
            onChange={(e) => update("standardShippingFee", Number(e.target.value) || 0)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ship-origin">Default Origin City</Label>
          <Input id="ship-origin" value={form.defaultOriginCity} onChange={(e) => update("defaultOriginCity", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ship-handling">Handling Days</Label>
          <Input
            id="ship-handling"
            type="number"
            value={form.handlingDays}
            onChange={(e) => update("handlingDays", Number(e.target.value) || 0)}
          />
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
