import type { Metadata } from "next";
import { Users } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Customer Analytics" };

export default function CustomerAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Customer Analytics" description="Growth and retention trends." />
      <AdminEmptyState
        icon={Users}
        title="Customer analytics aren't connected yet"
        description="The backend only exposes point-in-time totals today (see the Dashboard) — there's no historical trend endpoint yet."
      />
    </div>
  );
}
