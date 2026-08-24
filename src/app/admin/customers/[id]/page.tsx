import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomerDetail } from "@/components/admin/CustomerDetail";
import { getCustomer, getCustomers } from "@/lib/admin/api";
import { mockOrders, mockPayments } from "@/lib/admin/mock";

export async function generateStaticParams() {
  const customers = await getCustomers();
  return customers.map((customer) => ({ id: customer.id }));
}

export async function generateMetadata({ params }: PageProps<"/admin/customers/[id]">): Promise<Metadata> {
  const { id } = await params;
  const customer = await getCustomer(id);
  return { title: customer?.name ?? "Customer" };
}

export default async function CustomerDetailPage({ params }: PageProps<"/admin/customers/[id]">) {
  const { id } = await params;
  const customer = await getCustomer(id);
  if (!customer) notFound();

  const orders = mockOrders.filter((order) => order.customerId === id);
  const orderIds = new Set(orders.map((order) => order.id));
  const payments = mockPayments.filter((payment) => orderIds.has(payment.orderId));

  return <CustomerDetail customer={customer} orders={orders} payments={payments} />;
}
