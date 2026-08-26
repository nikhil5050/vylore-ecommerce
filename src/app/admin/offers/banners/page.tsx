import type { Metadata } from "next";
import { Megaphone } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

export const metadata: Metadata = { title: "Offer Banners" };

export default function OfferBannersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Offer Banners" description="Schedule and manage the promotional banners shown on the storefront homepage." />
      <AdminEmptyState
        icon={Megaphone}
        title="Offer banners aren't connected yet"
        description="The backend doesn't have a banners endpoint yet."
      />
    </div>
  );
}
