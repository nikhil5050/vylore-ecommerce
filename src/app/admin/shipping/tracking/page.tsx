import { Suspense } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ShippingTrackingView } from "@/components/admin/ShippingTrackingView";

export default function ShippingTrackingPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tracking" description="Follow every shipment's journey from pickup to delivery." />
      <Suspense fallback={null}>
        <ShippingTrackingView />
      </Suspense>
    </div>
  );
}
