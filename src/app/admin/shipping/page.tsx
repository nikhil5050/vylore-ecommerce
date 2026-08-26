import type { Metadata } from "next";
import { Truck } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Shipments" };

export default function ShippingPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Shipments" description="Track and manage every dispatched order." />
      <AdminEmptyState
        icon={Truck}
        title="A combined shipments view isn't connected yet"
        description="The backend tracks shipment status per order — open an order's detail page to view or update its shipment."
      />
    </div>
  );
}
