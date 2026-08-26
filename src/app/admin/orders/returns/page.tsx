import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { getOrders } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Returns / Refunds" };

export default async function ReturnsOrdersPage() {
  const orders = (await getOrders()).filter((o) => o.status === "refund_pending" || o.status === "refunded");

  return (
    <div className="space-y-6">
      <PageHeader title="Returns / Refunds" description="Orders with a refund in progress or completed." />
      <OrdersTable orders={orders} hideStatusFilter />
    </div>
  );
}
