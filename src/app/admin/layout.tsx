import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { Toaster } from "@/components/admin/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "Vylore Admin",
    template: "%s | Vylore Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="admin-shell">
      <AdminShell>{children}</AdminShell>
      <Toaster position="top-right" />
    </div>
  );
}
