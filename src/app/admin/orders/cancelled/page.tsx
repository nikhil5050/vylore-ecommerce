"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { getOrders } from "@/lib/admin/api";
import type { AdminOrder } from "@/types/admin";

export default function CancelledOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="Cancelled Orders" description="Orders that were cancelled." />
      <OrdersTable orders={orders.filter((o) => o.status === "cancelled")} hideStatusFilter />
    </div>
  );
}
