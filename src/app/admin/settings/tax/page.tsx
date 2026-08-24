import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { SettingsNav } from "@/components/admin/SettingsNav";
import { TaxSettingsForm } from "@/components/admin/settings/TaxSettingsForm";
import { mockTaxSettings } from "@/lib/admin/mock";

export const metadata: Metadata = { title: "Tax Settings" };

export default function TaxSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tax Settings" description="GST and default tax configuration." />
      <SettingsNav />
      <TaxSettingsForm initial={mockTaxSettings} />
    </div>
  );
}
