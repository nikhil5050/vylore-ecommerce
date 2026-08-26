import type { Metadata } from "next";
import { Bell } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { SettingsNav } from "@/components/admin/SettingsNav";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Notification Settings" };

export default function NotificationSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Notification Settings" description="Configure admin notification preferences." />
      <SettingsNav />
      <AdminEmptyState icon={Bell} title="Notification settings aren't connected yet" description="The backend doesn't have a notification settings endpoint yet." />
    </div>
  );
}
