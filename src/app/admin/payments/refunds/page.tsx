import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { PaymentTable } from "@/components/admin/PaymentTable";
import { getPayments } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Refunds" };

export default async function RefundsPaymentsPage() {
  const payments = (await getPayments()).filter((p) => p.status === "refunded" || p.status === "partially_refunded");

  return (
    <div className="space-y-6">
      <PageHeader title="Refunds" description="Fully and partially refunded transactions." />
      <PaymentTable payments={payments} title="Refunded Transactions" />
    </div>
  );
}
