import type { Metadata } from "next";
import { Truck } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Delivery Partners" };

export default function DeliveryPartnersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Delivery Partners" description="Courier partners used for fulfilment." />
      <AdminEmptyState
        icon={Truck}
        title="Delivery partner management isn't connected yet"
        description="The backend doesn't have a delivery partner directory yet."
      />
    </div>
  );
}
