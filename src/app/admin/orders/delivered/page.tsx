import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { getOrders } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Delivered Orders" };

export default async function DeliveredOrdersPage() {
  const orders = (await getOrders()).filter((o) => o.status === "delivered");

  return (
    <div className="space-y-6">
      <PageHeader title="Delivered Orders" description="Orders successfully completed." />
      <OrdersTable orders={orders} hideStatusFilter />
    </div>
  );
}
