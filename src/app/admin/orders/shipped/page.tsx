"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { getOrders } from "@/lib/admin/api";
import type { AdminOrder } from "@/types/admin";

export default function ShippedOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="Shipped Orders" description="Orders currently on their way to customers." />
      <OrdersTable
        orders={orders.filter((o) => o.status === "shipped" || o.status === "out_for_delivery")}
        hideStatusFilter
      />
    </div>
  );
}
