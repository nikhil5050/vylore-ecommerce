import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { SettingsNav } from "@/components/admin/SettingsNav";
import { PaymentSettingsForm } from "@/components/admin/settings/PaymentSettingsForm";
import { mockPaymentSettings } from "@/lib/admin/mock";

export const metadata: Metadata = { title: "Payment Settings" };

export default function PaymentSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Payment Settings" description="Configure the PayU payment gateway." />
      <SettingsNav />
      <PaymentSettingsForm initial={mockPaymentSettings} />
    </div>
  );
}
