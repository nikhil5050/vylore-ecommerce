"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import { Textarea } from "@/components/admin/ui/textarea";
import { Switch } from "@/components/admin/ui/switch";
import { Button } from "@/components/admin/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { updateIcarrySettings, testIcarryConnection } from "@/lib/admin/api";
import type { IcarrySettings } from "@/types/admin";

export function IcarySettings({ initialSettings }: { initialSettings: IcarrySettings }) {
  const [connected, setConnected] = useState(initialSettings.connected);
  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, control } = useForm<IcarrySettings>({
    defaultValues: initialSettings,
  });

  async function onSubmit(values: IcarrySettings) {
    setSaving(true);
    await updateIcarrySettings(values);
    setSaving(false);
    toast.success("iCarry settings saved.");
  }

  async function handleTestConnection() {
    setTesting(true);
    const result = await testIcarryConnection();
    setTesting(false);
    setConnected(result.connected);
    if (result.connected) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader className="flex-row items-center justify-between gap-4 border-b pb-4">
          <div>
            <CardTitle className="text-base">Connection Status</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">Verify Vylore can reach the iCarry API before enabling automation.</p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={connected ? "Connected" : "Not Connected"} tone={connected ? "success" : "neutral"} />
            <Button type="button" variant="outline" size="sm" onClick={handleTestConnection} disabled={testing}>
              {testing ? "Testing…" : "Test Connection"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="icarry-api-key">iCarry API Key</Label>
              <Input id="icarry-api-key" type="password" autoComplete="off" placeholder="•••••••••••••" {...register("apiKey")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="icarry-secret-key">iCarry Secret Key</Label>
              <Input id="icarry-secret-key" type="password" autoComplete="off" placeholder="•••••••••••••" {...register("secretKey")} />
            </div>
          </div>
          <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Credentials are never exposed to the storefront and are only used server-side once the backend is connected.
          </p>

          <div className="space-y-1.5 sm:max-w-xs">
            <Label htmlFor="icarry-environment">Environment</Label>
            <Controller
              control={control}
              name="environment"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="icarry-environment" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sandbox">Sandbox</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-base">Pickup &amp; Warehouse</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-1.5">
            <Label htmlFor="icarry-pickup">Default Pickup Location</Label>
            <Input id="icarry-pickup" {...register("defaultPickupLocation")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="icarry-warehouse">Warehouse Address</Label>
            <Textarea id="icarry-warehouse" rows={3} {...register("warehouseAddress")} />
          </div>
          <div className="space-y-1.5 sm:max-w-xs">
            <Label htmlFor="icarry-contact">Contact Number</Label>
            <Input id="icarry-contact" {...register("contactNumber")} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-base">Automation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {(
            [
              { name: "autoCreateShipment", label: "Auto-create Shipment", description: "Create an iCarry shipment as soon as an order is confirmed." },
              { name: "autoUpdateTracking", label: "Auto-update Tracking", description: "Pull tracking events from iCarry automatically." },
              { name: "autoUpdateOrderStatus", label: "Auto-update Order Status", description: "Move the order status forward as tracking events arrive." },
            ] as const
          ).map((toggle) => (
            <div key={toggle.name} className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{toggle.label}</p>
                <p className="text-xs text-muted-foreground">{toggle.description}</p>
              </div>
              <Controller
                control={control}
                name={toggle.name}
                render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save iCarry Settings"}
        </Button>
      </div>
    </form>
  );
}
