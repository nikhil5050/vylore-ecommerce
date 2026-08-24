import { PageHeader } from "@/components/admin/PageHeader";
import { CouponsView } from "@/components/admin/CouponsView";
import { getCoupons } from "@/lib/admin/api";

export default async function FestivalOffersPage() {
  const coupons = await getCoupons();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Festival Offers"
        description="Seasonal campaigns organised by their live/upcoming/past status."
      />
      <CouponsView coupons={coupons} mode="festival-offers" />
    </div>
  );
}
