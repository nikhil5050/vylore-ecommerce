import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderDetail } from "@/components/admin/OrderDetail";
import { getOrder, getOrderShipment } from "@/lib/admin/api";

export async function generateMetadata({ params }: PageProps<"/admin/orders/[id]">): Promise<Metadata> {
  const { id } = await params;
  const order = await getOrder(id);
  return { title: order ? `Order #${order.orderNumber}` : "Order" };
}

export default async function OrderDetailPage({ params }: PageProps<"/admin/orders/[id]">) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();
  const shipment = await getOrderShipment(id);

  return <OrderDetail order={order} shipment={shipment} />;
}
