import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { SettingsNav } from "@/components/admin/SettingsNav";
import { AdminProfileForm } from "@/components/admin/settings/AdminProfileForm";
import { mockAdminProfile } from "@/lib/admin/mock";

export const metadata: Metadata = { title: "Admin Profile" };

export default function AdminProfileSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Admin Profile" description="Your account details." />
      <SettingsNav />
      <AdminProfileForm initial={mockAdminProfile} />
    </div>
  );
}
