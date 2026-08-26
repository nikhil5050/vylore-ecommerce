import type { Metadata } from "next";
import { BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Product Analytics" };

export default function ProductAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Product Analytics" description="Best sellers and product performance." />
      <AdminEmptyState
        icon={BarChart3}
        title="Product analytics aren't connected yet"
        description="The backend doesn't have a product performance endpoint yet."
      />
    </div>
  );
}
