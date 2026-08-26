import type { Metadata } from "next";
import { Tag } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Festival Offers" };

export default function FestivalOffersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Festival Offers" description="Time-boxed festival promotions." />
      <AdminEmptyState icon={Tag} title="Festival offers aren't connected yet" description="The backend doesn't have an offers endpoint yet." />
    </div>
  );
}
