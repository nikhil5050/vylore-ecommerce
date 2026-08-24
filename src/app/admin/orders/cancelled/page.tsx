import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { getOrders } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Cancelled Orders" };

export default async function CancelledOrdersPage() {
  const orders = (await getOrders()).filter((o) => o.status === "cancelled");

  return (
    <div className="space-y-6">
      <PageHeader title="Cancelled Orders" description="Orders cancelled before fulfillment." />
      <OrdersTable orders={orders} hideStatusFilter />
    </div>
  );
}
