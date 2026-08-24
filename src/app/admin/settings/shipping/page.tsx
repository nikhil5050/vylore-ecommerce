import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { SettingsNav } from "@/components/admin/SettingsNav";
import { ShippingSettingsForm } from "@/components/admin/settings/ShippingSettingsForm";
import { mockShippingSettings } from "@/lib/admin/mock";

export const metadata: Metadata = { title: "Shipping Settings" };

export default function ShippingSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Shipping Settings" description="Default shipping fees and handling times." />
      <SettingsNav />
      <ShippingSettingsForm initial={mockShippingSettings} />
    </div>
  );
}
