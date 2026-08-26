"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { CustomerTable } from "@/components/admin/CustomerTable";
import { getCustomers } from "@/lib/admin/api";
import type { Customer } from "@/types/admin";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    getCustomers().then(setCustomers);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="Customers" description="Everyone who has shopped or signed up on Vylore." />
      <CustomerTable customers={customers} />
    </div>
  );
}
