import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { PaymentTable } from "@/components/admin/PaymentTable";
import { getPayments } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Failed Payments" };

export default async function FailedPaymentsPage() {
  const payments = (await getPayments()).filter((p) => p.status === "failed");

  return (
    <div className="space-y-6">
      <PageHeader title="Failed Payments" description="Transactions that did not go through." />
      <PaymentTable payments={payments} title="Failed Transactions" />
    </div>
  );
}
