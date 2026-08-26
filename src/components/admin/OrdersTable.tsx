"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Eye, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { Input } from "@/components/admin/ui/input";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { orderStatusTone, paymentStatusTone, shippingStatusTone, toTitleCase } from "@/lib/admin/status";
import { formatAdminDate } from "@/lib/admin/format";
import { formatPrice } from "@/utils/formatPrice";
import type { AdminOrder, OrderStatus, PaymentStatus } from "@/types/admin";

const orderStatuses: OrderStatus[] = [
  "pending_payment",
  "payment_failed",
  "paid",
  "processing",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
  "refund_pending",
  "refunded",
];
const paymentStatuses: PaymentStatus[] = ["pending", "paid", "failed"];

interface OrdersTableProps {
  orders: AdminOrder[];
  hideStatusFilter?: boolean;
  compact?: boolean;
}

export function OrdersTable({ orders, hideStatusFilter, compact }: OrdersTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orders.filter((order) => {
      if (
        query &&
        !order.orderNumber.toLowerCase().includes(query) &&
        !order.customerName.toLowerCase().includes(query)
      ) {
        return false;
      }
      if (statusFilter !== "all" && order.status !== statusFilter) return false;
      if (paymentFilter !== "all" && order.paymentStatus !== paymentFilter) return false;
      return true;
    });
  }, [orders, search, statusFilter, paymentFilter]);

  return (
    <Card>
      <CardHeader className="flex-col items-stretch gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-base">
          Orders <span className="font-sans text-sm font-normal text-muted-foreground">({filtered.length})</span>
        </CardTitle>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order or customer…"
              className="w-52 pl-8"
            />
          </div>
          {!hideStatusFilter && (
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value ?? "all")}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {orderStatuses.map((status) => (
                  <SelectItem key={status} value={status}>{toTitleCase(status)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Select value={paymentFilter} onValueChange={(value) => setPaymentFilter(value ?? "all")}>
            <SelectTrigger className="w-36"><SelectValue placeholder="Payment" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All payments</SelectItem>
              {paymentStatuses.map((status) => (
                <SelectItem key={status} value={status}>{toTitleCase(status)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      {filtered.length === 0 ? (
        <CardContent>
          <AdminEmptyState title="No orders found" description="Try adjusting your search or filters." />
        </CardContent>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              {!compact && <TableHead>Items</TableHead>}
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              {!compact && <TableHead>Shipping</TableHead>}
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium text-foreground">
                  <Link href={`/admin/orders/view?id=${order.id}`} className="hover:text-primary hover:underline">
                    #{order.orderNumber}
                  </Link>
                </TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell className="text-muted-foreground">{formatAdminDate(order.placedAt)}</TableCell>
                {!compact && (
                  <TableCell className="max-w-48 truncate text-muted-foreground" title={order.items[0]?.name}>
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </TableCell>
                )}
                <TableCell className="font-medium text-foreground">{formatPrice(order.summary.total)}</TableCell>
                <TableCell>
                  <StatusBadge status={order.paymentStatus} tone={paymentStatusTone[order.paymentStatus] ?? "neutral"} />
                </TableCell>
                {!compact && (
                  <TableCell>
                    <StatusBadge status={order.shippingStatus} tone={shippingStatusTone[order.shippingStatus] ?? "neutral"} />
                  </TableCell>
                )}
                <TableCell>
                  <StatusBadge status={order.status} tone={orderStatusTone[order.status] ?? "neutral"} />
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/admin/orders/view?id=${order.id}`}
                    className="ml-auto flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label={`View order ${order.orderNumber}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
