"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Download, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { Button } from "@/components/admin/ui/button";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ImagePlaceholder } from "@/components/admin/ImagePlaceholder";
import { orderStatusTone, paymentStatusTone, toTitleCase } from "@/lib/admin/status";
import { formatAdminDate } from "@/lib/admin/format";
import { formatPrice } from "@/utils/formatPrice";
import type { AdminOrder, OrderAddress, OrderStatus } from "@/types/admin";

const orderStatuses: OrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled", "refunded"];

function AddressCard({ title, address }: { title: string; address: OrderAddress }) {
  return (
    <Card>
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-0.5 pt-3 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">{address.fullName}</p>
        <p>{address.line1}</p>
        {address.line2 && <p>{address.line2}</p>}
        <p>
          {address.city}, {address.state} {address.postalCode}
        </p>
        <p>{address.country}</p>
        {address.phone && <p className="pt-1">{address.phone}</p>}
      </CardContent>
    </Card>
  );
}

export function OrderDetail({ order: initialOrder }: { order: AdminOrder }) {
  const [order, setOrder] = useState(initialOrder);

  function handleStatusChange(value: string | null) {
    if (!value) return;
    const status = value as OrderStatus;
    setOrder((prev) => ({ ...prev, status }));
    toast.success("Order status updated.");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/admin/orders" className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to orders
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-serif text-2xl font-semibold text-foreground">#{order.id}</h1>
            <StatusBadge status={order.status} tone={orderStatusTone[order.status] ?? "neutral"} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Placed on {formatAdminDate(order.placedAt)}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/admin/shipping/tracking" />}>
            <Truck className="h-4 w-4" /> Track shipment
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("Invoice downloaded.")}>
            <Download className="h-4 w-4" /> Invoice
          </Button>
          <Select value={order.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              {orderStatuses.map((status) => (
                <SelectItem key={status} value={status}>{toTitleCase(status)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AddressCard title="Billing Address" address={order.billingAddress} />
            <AddressCard title="Shipping Address" address={order.shippingAddress} />
          </div>
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
              <CardTitle className="text-sm">Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gateway</span>
                <span className="font-medium text-foreground">{order.payment.gateway}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-medium text-foreground">{order.payment.transactionId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <StatusBadge status={order.payment.status} tone={paymentStatusTone[order.payment.status] ?? "neutral"} />
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Partner</span>
                <span className="font-medium text-foreground">{order.deliveryPartner}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
