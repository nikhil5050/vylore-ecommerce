import type { Metadata } from "next";
import { CreditCard } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { SettingsNav } from "@/components/admin/SettingsNav";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Payment Settings" };

export default function PaymentSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Payment Settings" description="Configure payment gateways." />
      <SettingsNav />
      <AdminEmptyState icon={CreditCard} title="Payment settings aren't connected yet" description="The backend doesn't have a payment settings endpoint yet." />
    </div>
  );
}
