import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { BannerForm } from "@/components/admin/BannerForm";

export const metadata: Metadata = { title: "Add Banner" };

export default function AddBannerPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Add Banner" description="Create a new homepage offer banner." />
      <BannerForm />
    </div>
  );
}
