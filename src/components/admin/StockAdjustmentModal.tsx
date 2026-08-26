"use client";

import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/admin/ui/dialog";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { updateInventory } from "@/lib/admin/api";

interface StockAdjustmentModalProps {
  trigger: ReactNode;
  productName: string;
  inventoryId: string;
  currentQuantity: number;
  onAdjusted: (newQuantity: number) => void;
}

export function StockAdjustmentModal({ trigger, productName, inventoryId, currentQuantity, onAdjusted }: StockAdjustmentModalProps) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(currentQuantity);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (quantity < 0) {
      toast.error("Quantity can't be negative.");
      return;
    }
    setSaving(true);
    try {
      await updateInventory(inventoryId, quantity);
      onAdjusted(quantity);
      toast.success("Stock updated.");
      setOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn't update stock.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (next) setQuantity(currentQuantity); }}>
      <DialogTrigger nativeButton={false} render={<span />}>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjust Stock</DialogTitle>
          <DialogDescription>{productName}</DialogDescription>
        </DialogHeader>
        <div className="space-y-1.5 py-2">
          <Label htmlFor="quantity">New Quantity</Label>
          <Input id="quantity" type="number" min={0} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={saving}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
