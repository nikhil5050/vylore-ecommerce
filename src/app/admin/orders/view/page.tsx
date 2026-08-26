"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { OrderDetail } from "@/components/admin/OrderDetail";
import { getOrder, getOrderShipment } from "@/lib/admin/api";
import type { AdminOrder, OrderShipment } from "@/types/admin";

export default function OrderDetailPage() {
  return (
    <Suspense fallback={null}>
      <OrderDetailContent />
    </Suspense>
  );
}

function OrderDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [order, setOrder] = useState<AdminOrder | null | undefined>(undefined);
  const [shipment, setShipment] = useState<OrderShipment | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    getOrder(id).then((result) => setOrder(result ?? null));
    getOrderShipment(id).then(setShipment);
  }, [id]);

  useEffect(() => {
    if (order) document.title = `Order #${order.orderNumber} | Vylore Admin`;
  }, [order]);

  if (order === undefined) {
    if (!id) {
      return (
        <div className="space-y-6">
          <PageHeader title="Order not found" />
          <AdminEmptyState title="This order doesn't exist" description="It may have been deleted, or the link is invalid." />
        </div>
      );
    }
    return null;
  }

  if (order === null) {
    return (
      <div className="space-y-6">
        <PageHeader title="Order not found" />
        <AdminEmptyState title="This order doesn't exist" description="It may have been deleted, or the link is invalid." />
      </div>
    );
  }

  return <OrderDetail order={order} shipment={shipment} />;
}
