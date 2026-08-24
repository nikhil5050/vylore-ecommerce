import { PageHeader } from "@/components/admin/PageHeader";
import { CouponsView } from "@/components/admin/CouponsView";
import { getCoupons } from "@/lib/admin/api";

export default async function CouponsPage() {
  const coupons = await getCoupons();

  return (
    <div className="space-y-6">
      <PageHeader title="Coupons" description="Create and manage discount codes redeemable at checkout." />
      <CouponsView coupons={coupons} mode="all" />
    </div>
  );
}
