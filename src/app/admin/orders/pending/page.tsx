import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { getOrders } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Pending Orders" };

export default async function PendingOrdersPage() {
  const orders = (await getOrders()).filter((o) => o.status === "pending");

  return (
    <div className="space-y-6">
      <PageHeader title="Pending Orders" description="Orders awaiting confirmation or processing." />
      <OrdersTable orders={orders} hideStatusFilter />
    </div>
  );
}
