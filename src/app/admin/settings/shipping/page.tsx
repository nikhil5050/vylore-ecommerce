import type { Metadata } from "next";
import { Truck } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { SettingsNav } from "@/components/admin/SettingsNav";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Shipping Settings" };

export default function ShippingSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Shipping Settings" description="Configure shipping rates and zones." />
      <SettingsNav />
      <AdminEmptyState icon={Truck} title="Shipping settings aren't connected yet" description="The backend doesn't have a shipping settings endpoint yet." />
    </div>
  );
}
