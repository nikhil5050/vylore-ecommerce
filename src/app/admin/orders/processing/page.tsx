import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { getOrders } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Processing Orders" };

export default async function ProcessingOrdersPage() {
  const orders = (await getOrders()).filter((o) => o.status === "processing");

  return (
    <div className="space-y-6">
      <PageHeader title="Processing Orders" description="Orders currently being prepared for dispatch." />
      <OrdersTable orders={orders} hideStatusFilter />
    </div>
  );
}
