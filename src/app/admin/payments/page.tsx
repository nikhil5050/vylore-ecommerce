import type { Metadata } from "next";
import { CreditCard } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Payments" };

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Payments" description="All payment transactions across Vylore." />
      <AdminEmptyState
        icon={CreditCard}
        title="Payment transactions aren't connected yet"
        description="The backend doesn't expose a payments list yet — payment status is visible on each order's detail page."
      />
    </div>
  );
}
