import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { CustomerTable } from "@/components/admin/CustomerTable";
import { getCustomers } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Customers" };

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="space-y-6">
      <PageHeader title="Customers" description="Everyone who has shopped or signed up on Vylore." />
      <CustomerTable customers={customers} />
    </div>
  );
}
