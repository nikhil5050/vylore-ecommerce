import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { SettingsNav } from "@/components/admin/SettingsNav";
import { NotificationSettingsForm } from "@/components/admin/settings/NotificationSettingsForm";
import { mockNotificationSettings } from "@/lib/admin/mock";

export const metadata: Metadata = { title: "Notification Settings" };

export default function NotificationSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Notification Settings" description="Choose which admin alerts you want to receive." />
      <SettingsNav />
      <NotificationSettingsForm initial={mockNotificationSettings} />
    </div>
  );
}
