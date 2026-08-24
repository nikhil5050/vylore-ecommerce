import { PageHeader } from "@/components/admin/PageHeader";
import { BannerManager } from "@/components/admin/BannerManager";
import { getBanners } from "@/lib/admin/api";

export default async function OfferBannersPage() {
  const banners = await getBanners();

  return (
    <div className="space-y-6">
      <PageHeader title="Offer Banners" description="Schedule and manage the promotional banners shown on the storefront homepage." />
      <BannerManager banners={banners} />
    </div>
  );
}
