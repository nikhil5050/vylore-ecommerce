import { PageHeader } from "@/components/admin/PageHeader";
import { CouponsView } from "@/components/admin/CouponsView";
import { getCoupons } from "@/lib/admin/api";

export default async function ProductOffersPage() {
  const coupons = await getCoupons();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Product Offers"
        description="Coupons scoped to specific categories, grouped by where they apply."
      />
      <CouponsView coupons={coupons} mode="product-offers" />
    </div>
  );
}
