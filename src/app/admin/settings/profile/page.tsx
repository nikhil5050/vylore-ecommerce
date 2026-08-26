import type { Metadata } from "next";
import { User } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { SettingsNav } from "@/components/admin/SettingsNav";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Admin Profile" };

export default function AdminProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Admin Profile" description="Your admin account details." />
      <SettingsNav />
      <AdminEmptyState icon={User} title="Admin profile management isn't connected yet" description="The backend doesn't have an admin profile endpoint yet." />
    </div>
  );
}
