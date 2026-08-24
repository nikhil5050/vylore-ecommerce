import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Card } from "@/components/admin/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import { formatAdminDate } from "@/lib/admin/format";
import { mockProducts } from "@/lib/admin/mock";

export const metadata: Metadata = { title: "Stock Adjustments" };

const adjustments = [
  { id: "ADJ-1001", productIndex: 0, type: "add", quantity: 20, reason: "New stock received", admin: "Admin User", date: "2026-08-22" },
  { id: "ADJ-1002", productIndex: 2, type: "remove", quantity: 3, reason: "Damaged in transit", admin: "Admin User", date: "2026-08-20" },
  { id: "ADJ-1003", productIndex: 4, type: "correction", quantity: 1, reason: "Stock count correction", admin: "Admin User", date: "2026-08-18" },
  { id: "ADJ-1004", productIndex: 7, type: "add", quantity: 15, reason: "New stock received", admin: "Admin User", date: "2026-08-15" },
  { id: "ADJ-1005", productIndex: 9, type: "remove", quantity: 2, reason: "Customer return — not resellable", admin: "Admin User", date: "2026-08-12" },
  { id: "ADJ-1006", productIndex: 11, type: "add", quantity: 10, reason: "New stock received", admin: "Admin User", date: "2026-08-08" },
  { id: "ADJ-1007", productIndex: 14, type: "correction", quantity: 2, reason: "Stock count correction", admin: "Admin User", date: "2026-08-04" },
  { id: "ADJ-1008", productIndex: 18, type: "remove", quantity: 1, reason: "Damaged in transit", admin: "Admin User", date: "2026-08-01" },
];

const typeTone = { add: "success", remove: "error", correction: "info" } as const;

export default function StockAdjustmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Stock Adjustments" description="A log of manual inventory changes." />
      <Card className="overflow-hidden py-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Adjustment</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adjustments.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium text-foreground">{entry.id}</TableCell>
                <TableCell>{mockProducts[entry.productIndex % mockProducts.length].name}</TableCell>
                <TableCell>
                  <StatusBadge status={entry.type} tone={typeTone[entry.type as keyof typeof typeTone]} />
                </TableCell>
                <TableCell>{entry.type === "remove" ? "-" : "+"}{entry.quantity}</TableCell>
                <TableCell className="text-muted-foreground">{entry.reason}</TableCell>
                <TableCell className="text-muted-foreground">{entry.admin}</TableCell>
                <TableCell className="text-muted-foreground">{formatAdminDate(entry.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
