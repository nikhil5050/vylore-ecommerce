import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Shipment Tracking" };

export default function ShippingTrackingPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Shipment Tracking" description="Live tracking across every carrier." />
      <AdminEmptyState
        icon={MapPin}
        title="A combined tracking view isn't connected yet"
        description="The backend tracks shipment status per order — open an order's detail page to view or update its shipment."
      />
    </div>
  );
}
