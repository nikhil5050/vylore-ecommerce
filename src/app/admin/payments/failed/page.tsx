import type { Metadata } from "next";
import { XCircle } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Failed Payments" };

export default function FailedPaymentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Failed Payments" description="Payments that didn't go through." />
      <AdminEmptyState
        icon={XCircle}
        title="Payment transactions aren't connected yet"
        description="The backend doesn't expose a payments list yet — payment status is visible on each order's detail page."
      />
    </div>
  );
}
