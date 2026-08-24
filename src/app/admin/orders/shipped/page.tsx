import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { getOrders } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Shipped Orders" };

export default async function ShippedOrdersPage() {
  const orders = (await getOrders()).filter((o) => o.status === "shipped");

  return (
    <div className="space-y-6">
      <PageHeader title="Shipped Orders" description="Orders on the way to customers." />
      <OrdersTable orders={orders} hideStatusFilter />
    </div>
  );
}
