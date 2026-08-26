"use client";

import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { CustomerDetail } from "@/components/admin/CustomerDetail";
import { getCustomer } from "@/lib/admin/api";
import type { AdminOrder, Customer } from "@/types/admin";

export default function CustomerDetailPage({ params }: PageProps<"/admin/customers/[id]">) {
  const { id } = use(params);
  const [result, setResult] = useState<{ customer: Customer; orders: AdminOrder[] } | null | undefined>(undefined);

  useEffect(() => {
    getCustomer(id).then((value) => setResult(value ?? null));
  }, [id]);

  useEffect(() => {
    if (result) document.title = `${result.customer.name} | Vylore Admin`;
  }, [result]);

  if (result === undefined) return null;
  if (result === null) notFound();

  return <CustomerDetail customer={result.customer} orders={result.orders} />;
}
