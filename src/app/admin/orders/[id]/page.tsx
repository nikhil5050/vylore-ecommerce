"use client";

import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { OrderDetail } from "@/components/admin/OrderDetail";
import { getOrder, getOrderShipment } from "@/lib/admin/api";
import type { AdminOrder, OrderShipment } from "@/types/admin";

export default function OrderDetailPage({ params }: PageProps<"/admin/orders/[id]">) {
  const { id } = use(params);
  const [order, setOrder] = useState<AdminOrder | null | undefined>(undefined);
  const [shipment, setShipment] = useState<OrderShipment | undefined>(undefined);

  useEffect(() => {
    getOrder(id).then((result) => setOrder(result ?? null));
    getOrderShipment(id).then(setShipment);
  }, [id]);

  useEffect(() => {
    if (order) document.title = `Order #${order.orderNumber} | Vylore Admin`;
  }, [order]);

  if (order === undefined) return null;
  if (order === null) notFound();

  return <OrderDetail order={order} shipment={shipment} />;
}
