import type { Metadata } from "next";
import { Users } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Customer Groups" };

export default function CustomerGroupsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Customer Groups" description="Segment customers to target offers and discounts." />
      <AdminEmptyState
        icon={Users}
        title="Customer groups aren't connected yet"
        description="The backend doesn't have a customer segmentation feature yet."
      />
    </div>
  );
}
