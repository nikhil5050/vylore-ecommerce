import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Successful Payments" };

export default function SuccessfulPaymentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Successful Payments" description="Payments that completed successfully." />
      <AdminEmptyState
        icon={CheckCircle2}
        title="Payment transactions aren't connected yet"
        description="The backend doesn't expose a payments list yet — payment status is visible on each order's detail page."
      />
    </div>
  );
}
