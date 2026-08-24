import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { SettingsNav } from "@/components/admin/SettingsNav";
import { StoreSettingsForm } from "@/components/admin/settings/StoreSettingsForm";
import { mockStoreSettings } from "@/lib/admin/mock";

export const metadata: Metadata = { title: "Store Settings" };

export default function StoreSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Store Settings" description="Basic information about your store." />
      <SettingsNav />
      <StoreSettingsForm initial={mockStoreSettings} />
    </div>
  );
}
