"use client";

import { useState } from "react";
import { PlusCircle, Truck } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card, CardContent } from "@/components/admin/ui/card";
import { Switch } from "@/components/admin/ui/switch";
import { Label } from "@/components/admin/ui/label";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/admin/ui/dialog";
import { mockDeliveryPartners } from "@/lib/admin/mock";
import type { DeliveryPartner } from "@/types/admin";

export default function DeliveryPartnersPage() {
  const [partners, setPartners] = useState<DeliveryPartner[]>(mockDeliveryPartners);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [areas, setAreas] = useState("");

  function toggleActive(id: string) {
    setPartners((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  }

  function handleAdd() {
    if (!name.trim()) {
      toast.error("Delivery partner name is required.");
      return;
    }
    setPartners((prev) => [
      ...prev,
      { id: `dp-${Date.now()}`, name, active: false, serviceableAreas: areas || "Pan-India", avgDeliveryDays: 5 },
    ]);
    setOpen(false);
    setName("");
    setAreas("");
    toast.success("Delivery partner added.");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Delivery Partners"
        description="Manage the courier partners available for order fulfillment."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button />}>
              <PlusCircle className="h-4 w-4" /> Add Delivery Partner
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Add Delivery Partner</DialogTitle>
                <DialogDescription>New partners start inactive until enabled.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="partner-name">Partner Name</Label>
                  <Input id="partner-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ecom Express" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="partner-areas">Serviceable Areas</Label>
                  <Input id="partner-areas" value={areas} onChange={(e) => setAreas(e.target.value)} placeholder="e.g. Pan-India" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAdd}>Add Partner</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {partners.map((partner) => (
          <Card key={partner.id}>
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Truck className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{partner.name}</p>
                    <p className="text-xs text-muted-foreground">Avg. {partner.avgDeliveryDays} day delivery</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{partner.serviceableAreas}</p>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <Label htmlFor={`partner-active-${partner.id}`} className="text-sm text-foreground">
                  {partner.active ? "Active" : "Inactive"}
                </Label>
                <Switch
                  id={`partner-active-${partner.id}`}
                  checked={partner.active}
                  onCheckedChange={() => toggleActive(partner.id)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
