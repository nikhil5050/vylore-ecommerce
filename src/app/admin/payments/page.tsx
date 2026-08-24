import type { Metadata } from "next";
import { CheckCircle2, IndianRupee, RotateCcw, XCircle } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { PaymentTable } from "@/components/admin/PaymentTable";
import { Card, CardContent } from "@/components/admin/ui/card";
import { getPayments } from "@/lib/admin/api";
import { formatPrice } from "@/utils/formatPrice";

export const metadata: Metadata = { title: "Payments" };

export default async function PaymentsPage() {
  const payments = await getPayments();

  const totalRevenue = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const successful = payments.filter((p) => p.status === "paid").length;
  const failed = payments.filter((p) => p.status === "failed").length;
  const refunds = payments.filter((p) => p.status === "refunded" || p.status === "partially_refunded").length;

  const summary = [
    { label: "Total Revenue", value: formatPrice(totalRevenue), icon: IndianRupee },
    { label: "Successful Payments", value: successful, icon: CheckCircle2 },
    { label: "Failed Payments", value: failed, icon: XCircle },
    { label: "Refunds", value: refunds, icon: RotateCcw },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Payments" description="All payment transactions across Vylore." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <Card key={item.label}>
            <CardContent className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-1.5 font-serif text-2xl font-semibold text-foreground">{item.value}</p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <PaymentTable payments={payments} />
    </div>
  );
}
