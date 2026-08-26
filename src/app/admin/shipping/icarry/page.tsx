import type { Metadata } from "next";
import { Truck } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "iCarry Integration" };

export default function IcarryIntegrationPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="iCarry Integration" description="Configure the iCarry shipping integration." />
      <AdminEmptyState
        icon={Truck}
        title="iCarry isn't connected yet"
        description="The backend doesn't have an iCarry integration endpoint yet."
      />
    </div>
  );
}
