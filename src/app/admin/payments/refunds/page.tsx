import type { Metadata } from "next";
import { RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Refunds" };

export default function RefundsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Refunds" description="Refunded and partially refunded payments." />
      <AdminEmptyState
        icon={RotateCcw}
        title="Refund transactions aren't connected yet"
        description="The backend doesn't expose a payments list yet — check the Returns / Refunds orders view instead."
      />
    </div>
  );
}
