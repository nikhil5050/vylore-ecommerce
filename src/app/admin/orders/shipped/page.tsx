import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { getOrders } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Shipped Orders" };

export default async function ShippedOrdersPage() {
  const orders = (await getOrders()).filter((o) => o.status === "shipped" || o.status === "out_for_delivery");

  return (
    <div className="space-y-6">
      <PageHeader title="Shipped Orders" description="Orders currently on their way to customers." />
      <OrdersTable orders={orders} hideStatusFilter />
    </div>
  );
}
