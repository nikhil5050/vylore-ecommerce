"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { getOrders } from "@/lib/admin/api";
import type { AdminOrder } from "@/types/admin";

export default function ReturnsOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="Returns / Refunds" description="Orders with a refund in progress or completed." />
      <OrdersTable
        orders={orders.filter((o) => o.status === "refund_pending" || o.status === "refunded")}
        hideStatusFilter
      />
    </div>
  );
}
