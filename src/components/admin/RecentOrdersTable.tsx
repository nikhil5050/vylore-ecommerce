import Link from "next/link";
import { Eye } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { orderStatusTone, paymentStatusTone } from "@/lib/admin/status";
import { formatAdminDate } from "@/lib/admin/format";
import { formatPrice } from "@/utils/formatPrice";
import { Button } from "@/components/admin/ui/button";
import type { AdminOrder } from "@/types/admin";

export function RecentOrdersTable({ orders }: { orders: AdminOrder[] }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-4 border-b pb-4">
        <CardTitle className="text-base">Recent Orders</CardTitle>
        <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/admin/orders" />}>
          View all
        </Button>
      </CardHeader>
      {orders.length === 0 ? (
        <AdminEmptyState title="No orders yet" description="Orders will show up here once customers start checking out." />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium text-foreground">
                  <Link href={`/admin/orders/${order.id}`} className="hover:text-primary hover:underline">
                    #{order.orderNumber}
                  </Link>
                </TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell className="max-w-48 truncate text-muted-foreground" title={order.items[0]?.name}>
                  {order.items[0]?.name}
                  {order.items.length > 1 && ` +${order.items.length - 1} more`}
                </TableCell>
                <TableCell className="text-muted-foreground">{formatAdminDate(order.placedAt)}</TableCell>
                <TableCell className="font-medium text-foreground">{formatPrice(order.summary.total)}</TableCell>
                <TableCell>
                  <StatusBadge status={order.paymentStatus} tone={paymentStatusTone[order.paymentStatus] ?? "neutral"} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={order.status} tone={orderStatusTone[order.status] ?? "neutral"} />
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/admin/orders/${order.id}`}
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
