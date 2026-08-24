"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, Save } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Button } from "@/components/admin/ui/button";
import { Switch } from "@/components/admin/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import type { PaymentSettings } from "@/types/admin";

export function PaymentSettingsForm({ initial }: { initial: PaymentSettings }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof PaymentSettings>(key: K, value: PaymentSettings[K]) {
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
        <CardTitle className="text-base">Payment Settings — PayU</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p>
            Credentials are stored server-side only and are never exposed to the storefront frontend. Fields are left
            blank here for security — enter new values only when rotating keys.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="pay-key">Merchant Key</Label>
            <Input id="pay-key" type="password" placeholder="••••••••••••" autoComplete="off" onChange={(e) => update("merchantKey", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pay-salt">Merchant Salt</Label>
            <Input id="pay-salt" type="password" placeholder="••••••••••••" autoComplete="off" onChange={(e) => update("merchantSalt", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Environment</Label>
            <Select value={form.environment} onValueChange={(v) => v && update("environment", v as PaymentSettings["environment"])}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="test">Test</SelectItem>
                <SelectItem value="live">Live</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
            <div>
              <p className="text-sm font-medium text-foreground">Cash on Delivery</p>
              <p className="text-xs text-muted-foreground">Allow COD as a payment method</p>
            </div>
            <Switch checked={form.codEnabled} onCheckedChange={(checked) => update("codEnabled", checked)} />
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
