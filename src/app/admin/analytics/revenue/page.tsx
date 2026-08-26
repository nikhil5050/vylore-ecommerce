import type { Metadata } from "next";
import { IndianRupee } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Revenue Analytics" };

export default function RevenueAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Revenue Analytics" description="Revenue breakdowns across your store." />
      <AdminEmptyState
        icon={IndianRupee}
        title="Revenue analytics aren't connected yet"
        description="The backend only exposes point-in-time totals today (see the Dashboard) — there's no historical trend endpoint yet."
      />
    </div>
  );
}
