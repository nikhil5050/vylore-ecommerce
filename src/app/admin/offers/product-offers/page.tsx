import type { Metadata } from "next";
import { Tag } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Product Offers" };

export default function ProductOffersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Product Offers" description="Per-product discounts and promotions." />
      <AdminEmptyState icon={Tag} title="Product offers aren't connected yet" description="The backend doesn't have an offers endpoint yet." />
    </div>
  );
}
