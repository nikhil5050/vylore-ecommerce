import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { getOrders } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Orders" };

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-6">
      <PageHeader title="Orders" description="View and manage every order placed on Vylore." />
      <OrdersTable orders={orders} />
    </div>
  );
}
