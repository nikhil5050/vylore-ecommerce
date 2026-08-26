import type { Metadata } from "next";
import { Truck } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { SettingsNav } from "@/components/admin/SettingsNav";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "iCarry Settings" };

export default function IcarrySettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="iCarry Settings" description="Configure the iCarry shipping integration." />
      <SettingsNav />
      <AdminEmptyState icon={Truck} title="iCarry isn't connected yet" description="The backend doesn't have an iCarry integration endpoint yet." />
    </div>
  );
}
