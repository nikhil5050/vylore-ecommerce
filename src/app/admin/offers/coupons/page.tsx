import type { Metadata } from "next";
import { Tag } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Coupons" };

export default function CouponsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Coupons" description="Discount codes for your storefront." />
      <AdminEmptyState icon={Tag} title="Coupons aren't connected yet" description="The backend doesn't have a coupons endpoint yet." />
    </div>
  );
}
