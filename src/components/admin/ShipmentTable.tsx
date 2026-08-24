import Link from "next/link";
import { Eye } from "lucide-react";
import { Card } from "@/components/admin/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import { Button } from "@/components/admin/ui/button";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { shipmentStatusTone } from "@/lib/admin/status";
import { formatAdminDate } from "@/lib/admin/format";
import { PackageSearch } from "lucide-react";
import type { Shipment } from "@/types/admin";

export function ShipmentTable({ shipments }: { shipments: Shipment[] }) {
  if (shipments.length === 0) {
    return <AdminEmptyState icon={PackageSearch} title="No shipments found" description="Shipments will appear here once orders are dispatched." />;
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Courier</TableHead>
            <TableHead>AWB / Tracking ID</TableHead>
            <TableHead>Pickup Date</TableHead>
            <TableHead>Expected Delivery</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shipments.map((shipment) => (
            <TableRow key={shipment.id}>
              <TableCell className="font-medium text-foreground">
                <Link href={`/admin/orders/${shipment.orderId}`} className="hover:text-primary hover:underline">
                  #{shipment.orderId}
                </Link>
              </TableCell>
              <TableCell>{shipment.customerName}</TableCell>
              <TableCell className="text-muted-foreground">{shipment.courier}</TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">{shipment.awb}</TableCell>
              <TableCell className="text-muted-foreground">{shipment.pickupDate ? formatAdminDate(shipment.pickupDate) : "—"}</TableCell>
              <TableCell className="text-muted-foreground">
                {shipment.expectedDelivery ? formatAdminDate(shipment.expectedDelivery) : "—"}
              </TableCell>
              <TableCell>
                <StatusBadge status={shipment.status} tone={shipmentStatusTone[shipment.status] ?? "neutral"} />
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  render={<Link href={`/admin/shipping/tracking?awb=${shipment.awb}`} />}
                >
                  <Eye className="h-4 w-4" /> Track
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
