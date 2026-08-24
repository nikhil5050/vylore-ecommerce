"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/admin/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/admin/ui/dialog";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { mockOrders } from "@/lib/admin/mock";
import { createShipment } from "@/lib/admin/api";
import type { Shipment } from "@/types/admin";

const couriers = ["iCarry", "Blue Dart", "Delhivery"];

export function CreateShipmentDialog({ onCreated }: { onCreated: (shipment: Shipment) => void }) {
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [courier, setCourier] = useState(couriers[0]);
  const [pickupDate, setPickupDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const unshippedOrders = mockOrders.filter((order) => order.status === "pending" || order.status === "processing");

  async function handleSubmit() {
    if (!orderId) {
      toast.error("Select an order to create a shipment for.");
      return;
    }
    setSubmitting(true);
    const order = mockOrders.find((o) => o.id === orderId);
    const shipment = await createShipment({
      orderId,
      customerName: order?.customerName ?? "",
      courier,
      awb: `ICR${Date.now().toString().slice(-10)}`,
      pickupDate: pickupDate || undefined,
      expectedDelivery: pickupDate || undefined,
      status: "ready_to_ship",
      destinationCity: order?.shippingAddress.city ?? "",
    });
    setSubmitting(false);
    setOpen(false);
    setOrderId("");
    setPickupDate("");
    onCreated(shipment);
    toast.success("Shipment created successfully.");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <PlusCircle className="h-4 w-4" /> Create Shipment
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Shipment</DialogTitle>
          <DialogDescription>Dispatch a pending or processing order via a courier partner.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="shipment-order">Order</Label>
            <Select value={orderId || undefined} onValueChange={(value) => setOrderId(value as string)}>
              <SelectTrigger id="shipment-order" className="w-full">
                <SelectValue placeholder="Select an order" />
              </SelectTrigger>
              <SelectContent>
                {unshippedOrders.map((order) => (
                  <SelectItem key={order.id} value={order.id}>
                    #{order.id} — {order.customerName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="shipment-courier">Courier</Label>
            <Select value={courier} onValueChange={(value) => setCourier(value as string)}>
              <SelectTrigger id="shipment-courier" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {couriers.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="shipment-pickup">Expected Pickup Date</Label>
            <Input id="shipment-pickup" type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Creating…" : "Create Shipment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
