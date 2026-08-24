import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { PaymentTable } from "@/components/admin/PaymentTable";
import { getPayments } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Successful Payments" };

export default async function SuccessfulPaymentsPage() {
  const payments = (await getPayments()).filter((p) => p.status === "paid");

  return (
    <div className="space-y-6">
      <PageHeader title="Successful Payments" description="Transactions that completed successfully." />
      <PaymentTable payments={payments} title="Successful Transactions" />
    </div>
  );
}
