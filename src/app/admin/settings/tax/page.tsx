import type { Metadata } from "next";
import { Receipt } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { SettingsNav } from "@/components/admin/SettingsNav";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Tax Settings" };

export default function TaxSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tax Settings" description="Configure tax rates for your store." />
      <SettingsNav />
      <AdminEmptyState icon={Receipt} title="Tax settings aren't connected yet" description="The backend doesn't have a tax settings endpoint yet." />
    </div>
  );
}
