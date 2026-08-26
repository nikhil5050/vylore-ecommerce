import type { Metadata } from "next";
import { LineChart } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Sales Analytics" };

export default function SalesAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Sales Analytics" description="Revenue and order trends across any time period." />
      <AdminEmptyState
        icon={LineChart}
        title="Sales analytics aren't connected yet"
        description="The backend only exposes point-in-time totals today (see the Dashboard) — there's no historical trend endpoint yet."
      />
    </div>
  );
}
