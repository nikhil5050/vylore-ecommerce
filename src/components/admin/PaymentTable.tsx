import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { paymentStatusTone } from "@/lib/admin/status";
import { formatAdminDate } from "@/lib/admin/format";
import { formatPrice } from "@/utils/formatPrice";
import type { PaymentTransaction } from "@/types/admin";

interface PaymentTableProps {
  payments: PaymentTransaction[];
  title?: string;
}

export function PaymentTable({ payments, title = "Transactions" }: PaymentTableProps) {
  return (
    <Card>
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-base">
          {title} <span className="font-sans text-sm font-normal text-muted-foreground">({payments.length})</span>
        </CardTitle>
      </CardHeader>
      {payments.length === 0 ? (
        <CardContent>
          <AdminEmptyState title="No transactions found" description="Nothing to show for this filter yet." />
        </CardContent>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Gateway</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium text-foreground">{payment.id}</TableCell>
                <TableCell>
                  <Link href={`/admin/orders/${payment.orderId}`} className="text-primary hover:underline">
                    #{payment.orderId}
                  </Link>
                </TableCell>
                <TableCell>{payment.customerName}</TableCell>
                <TableCell className="font-medium text-foreground">{formatPrice(payment.amount)}</TableCell>
                <TableCell className="text-muted-foreground">{payment.gateway}</TableCell>
                <TableCell className="text-muted-foreground">{payment.method}</TableCell>
                <TableCell>
                  <StatusBadge status={payment.status} tone={paymentStatusTone[payment.status] ?? "neutral"} />
                </TableCell>
                <TableCell className="text-muted-foreground">{formatAdminDate(payment.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
