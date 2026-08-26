import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomerDetail } from "@/components/admin/CustomerDetail";
import { getCustomer } from "@/lib/admin/api";

export async function generateMetadata({ params }: PageProps<"/admin/customers/[id]">): Promise<Metadata> {
  const { id } = await params;
  const result = await getCustomer(id);
  return { title: result?.customer.name ?? "Customer" };
}

export default async function CustomerDetailPage({ params }: PageProps<"/admin/customers/[id]">) {
  const { id } = await params;
  const result = await getCustomer(id);
  if (!result) notFound();

  return <CustomerDetail customer={result.customer} orders={result.orders} />;
}
