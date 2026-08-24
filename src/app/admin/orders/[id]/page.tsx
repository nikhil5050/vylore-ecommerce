import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderDetail } from "@/components/admin/OrderDetail";
import { getOrder, getOrders } from "@/lib/admin/api";

export async function generateStaticParams() {
  const orders = await getOrders();
  return orders.map((order) => ({ id: order.id }));
}

export async function generateMetadata({ params }: PageProps<"/admin/orders/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: `Order #${id}` };
}

export default async function OrderDetailPage({ params }: PageProps<"/admin/orders/[id]">) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  return <OrderDetail order={order} />;
}
