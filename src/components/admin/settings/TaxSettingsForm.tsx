"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Button } from "@/components/admin/ui/button";
import { Switch } from "@/components/admin/ui/switch";
import type { TaxSettings } from "@/types/admin";

export function TaxSettingsForm({ initial }: { initial: TaxSettings }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof TaxSettings>(key: K, value: TaxSettings[K]) {
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
        <CardTitle className="text-base">Tax Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
          <div>
            <p className="text-sm font-medium text-foreground">GST Enabled</p>
            <p className="text-xs text-muted-foreground">Apply GST to orders at checkout</p>
          </div>
          <Switch checked={form.gstEnabled} onCheckedChange={(checked) => update("gstEnabled", checked)} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="tax-gst-number">GST Number</Label>
            <Input
              id="tax-gst-number"
              value={form.gstNumber ?? ""}
              disabled={!form.gstEnabled}
              onChange={(e) => update("gstNumber", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tax-default">Default Tax %</Label>
            <Input
              id="tax-default"
              type="number"
              value={form.defaultTaxPercent}
              onChange={(e) => update("defaultTaxPercent", Number(e.target.value) || 0)}
            />
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
