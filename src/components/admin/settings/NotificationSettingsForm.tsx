"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AlertTriangle, CreditCard, PackageX, Save, ShoppingBag, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Button } from "@/components/admin/ui/button";
import { Switch } from "@/components/admin/ui/switch";
import type { NotificationSettings } from "@/types/admin";

type BooleanKey = { [K in keyof NotificationSettings]: NotificationSettings[K] extends boolean ? K : never }[keyof NotificationSettings];

const toggles: { key: BooleanKey; label: string; description: string; icon: LucideIcon }[] = [
  { key: "newOrder", label: "New Order", description: "Notify when a customer places an order", icon: ShoppingBag },
  { key: "lowStock", label: "Low Stock", description: "Notify when a product falls below its threshold", icon: PackageX },
  { key: "paymentFailure", label: "Payment Failure", description: "Notify when a payment attempt fails", icon: CreditCard },
  { key: "deliveryIssue", label: "Delivery Issue", description: "Notify on failed or delayed deliveries", icon: Truck },
  { key: "returnRequest", label: "Return Request", description: "Notify when a customer requests a return", icon: AlertTriangle },
];

export function NotificationSettingsForm({ initial }: { initial: NotificationSettings }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof NotificationSettings>(key: K, value: NotificationSettings[K]) {
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
        <CardTitle className="text-base">Notification Settings</CardTitle>
        <p className="mt-1 text-sm text-muted-foreground">These map to the alerts shown in the admin notification bell.</p>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-2">
          {toggles.map((toggle) => (
            <div key={toggle.key} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <toggle.icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{toggle.label}</p>
                  <p className="text-xs text-muted-foreground">{toggle.description}</p>
                </div>
              </div>
              <Switch checked={form[toggle.key]} onCheckedChange={(checked) => update(toggle.key, checked)} />
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="notify-email">Notify Email</Label>
          <Input id="notify-email" type="email" value={form.notifyEmail} onChange={(e) => update("notifyEmail", e.target.value)} />
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
