"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Button } from "@/components/admin/ui/button";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ImagePlaceholder } from "@/components/admin/ImagePlaceholder";
import { orderStatusTone, paymentStatusTone, shippingStatusTone } from "@/lib/admin/status";
import { formatAdminDate, formatAdminDateTime } from "@/lib/admin/format";
import { formatPrice } from "@/utils/formatPrice";
import { updateOrderShipment } from "@/lib/admin/api";
import type { AdminOrder, OrderShipment } from "@/types/admin";

interface OrderDetailProps {
  order: AdminOrder;
  shipment?: OrderShipment;
}

export function OrderDetail({ order, shipment: initialShipment }: OrderDetailProps) {
  const [shipment, setShipment] = useState(initialShipment);
  const [form, setForm] = useState({
    status: initialShipment?.status ?? "ready_to_ship",
    awbNumber: initialShipment?.awbNumber ?? "",
    trackingNumber: initialShipment?.trackingNumber ?? "",
    trackingUrl: initialShipment?.trackingUrl ?? "",
  });
  const [saving, setSaving] = useState(false);

  async function saveShipment() {
    setSaving(true);
    try {
      const updated = await updateOrderShipment(order.id, form);
      setShipment(updated);
      toast.success("Shipment updated.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn't update shipment.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/admin/orders" className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to orders
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-serif text-2xl font-semibold text-foreground">#{order.orderNumber}</h1>
            <StatusBadge status={order.status} tone={orderStatusTone[order.status] ?? "neutral"} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Placed on {formatAdminDate(order.placedAt)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <Card>
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-sm">Ordered Products</CardTitle>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={`${item.productId}-${index}`}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <ImagePlaceholder className="h-10 w-10 shrink-0 rounded-md" />
                        <span className="font-medium text-foreground">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.sku}</TableCell>
                    <TableCell className="text-muted-foreground">{item.quantity}</TableCell>
                    <TableCell className="text-muted-foreground">{formatPrice(item.price)}</TableCell>
                    <TableCell className="text-right font-medium text-foreground">{formatPrice(item.subtotal)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Card>
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-sm">Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3 pt-3 text-sm sm:grid-cols-3">
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="font-medium text-foreground">{order.customerName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{order.customerEmail}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{order.customerPhone}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-sm">Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-0.5 pt-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.line1}</p>
              {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p className="pt-1">{order.shippingAddress.phone}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-sm">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(order.summary.subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Discount</span>
                <span>-{formatPrice(order.summary.discount)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{order.summary.shipping === 0 ? "Free" : formatPrice(order.summary.shipping)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span>{formatPrice(order.summary.tax)}</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-border pt-2 font-medium text-foreground">
                <span>Total</span>
                <span>{formatPrice(order.summary.total)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-sm">Payment</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between pt-3 text-sm">
              <span className="text-muted-foreground">Status</span>
              <StatusBadge status={order.paymentStatus} tone={paymentStatusTone[order.paymentStatus] ?? "neutral"} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b pb-3">
              <CardTitle className="flex items-center gap-1.5 text-sm"><Truck className="h-3.5 w-3.5" /> Shipment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Order shipping status</span>
                <StatusBadge status={order.shippingStatus} tone={shippingStatusTone[order.shippingStatus] ?? "neutral"} />
              </div>
              {shipment && (
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>Provider: <span className="text-foreground">{shipment.provider}</span></p>
                  {shipment.shippedAt && <p>Shipped: {formatAdminDateTime(shipment.shippedAt)}</p>}
                  {shipment.deliveredAt && <p>Delivered: {formatAdminDateTime(shipment.deliveredAt)}</p>}
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="shipment-status">Shipment Status</Label>
                <Input id="shipment-status" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} placeholder="e.g. in_transit" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="awb">AWB Number</Label>
                <Input id="awb" value={form.awbNumber} onChange={(e) => setForm((f) => ({ ...f, awbNumber: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tracking-number">Tracking Number</Label>
                <Input id="tracking-number" value={form.trackingNumber} onChange={(e) => setForm((f) => ({ ...f, trackingNumber: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tracking-url">Tracking URL</Label>
                <Input id="tracking-url" value={form.trackingUrl} onChange={(e) => setForm((f) => ({ ...f, trackingUrl: e.target.value }))} />
              </div>
              <Button size="sm" className="w-full" onClick={saveShipment} disabled={saving || !form.status}>
                Save Shipment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
