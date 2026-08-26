import type { Metadata } from "next";
import { Store } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { SettingsNav } from "@/components/admin/SettingsNav";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Store Settings" };

export default function StoreSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Store Settings" description="Basic information about your store." />
      <SettingsNav />
      <AdminEmptyState icon={Store} title="Store settings aren't connected yet" description="The backend doesn't have a store settings endpoint yet." />
    </div>
  );
}
